import * as THREE from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { BucketType, BucketManager } from "./BucketManager";
import { WarehouseDimensions } from "./Warehouse";

export interface ShelfLevelConfig {
	height: number;
	bucketType: BucketType;
}

enum Orientation {
	NORTH = "north",
	SOUTH = "south",
	EAST = "east",
	WEST = "west",
}

export interface ShelfConfig {
	orientation: Orientation;
	x: number;
	z: number;
	width: number;
	depth: number;
	height: number;
	levels: ShelfLevelConfig[];
}

interface FrameIdentifier {
	width: number;
	depth: number;
	height: number;
}

interface ShelvesIdentifier {
	width: number;
	depth: number;
}

export class Shelf {
	static frameMaterial = new THREE.MeshLambertMaterial({
		color: 0x002b82,
	});

	static shelveMaterial = new THREE.MeshLambertMaterial({
		color: 0xc2c2c2,
	});

	static readonly frameThickness = 0.1;

	static readonly shelfAngle = Math.PI / 48;
	static readonly levelEdgeHeight = 0.075;

	static readonly frameGeometries: Map<FrameIdentifier, THREE.BufferGeometry> = new Map();
	static readonly shelveGeometries: Map<ShelvesIdentifier, THREE.BufferGeometry> = new Map();

	private readonly bucketManager: BucketManager;

	private object: THREE.Object3D;

	constructor(config: ShelfConfig, dimensions: WarehouseDimensions, bucketManager: BucketManager) {
		const shelf = new THREE.Group();
		shelf.name = "Shelf";

		this.bucketManager = bucketManager;

		const frameMesh = new THREE.Mesh(this.getFrameGeometry(config), Shelf.frameMaterial);
		frameMesh.translateX(-config.width / 2);
		frameMesh.translateZ(-config.depth / 2);
		frameMesh.name = "ShelfFrame";
		shelf.add(frameMesh);

		this.addLevels(shelf, config);

		this.positionShelf(shelf, config, dimensions);
		
		this.object = shelf;
	}

	private positionShelf(shelf: THREE.Object3D, config: ShelfConfig, dimensions: WarehouseDimensions) {

		// Update position
		switch (config.orientation) {
			case Orientation.NORTH:
			case Orientation.SOUTH:
				shelf.translateX(config.x + config.width / 2);
				shelf.translateZ(config.z + config.depth / 2);
				break;
			case Orientation.EAST:
			case Orientation.WEST:
				shelf.translateX(config.x + config.depth / 2);
				shelf.translateZ(config.z + config.width / 2);
				break;
		}

		shelf.translateY(config.height / 2);
		shelf.translateX(-dimensions.width / 2);
		shelf.translateZ(-dimensions.depth / 2);

		// Update rotation
		switch (config.orientation) {
			case Orientation.NORTH:
				shelf.rotateY(Math.PI);
				break;
			case Orientation.EAST:
				shelf.rotateY(Math.PI / 2);
				break;
			case Orientation.WEST:
				shelf.rotateY(-Math.PI / 2);
				break;
		}

	}

	private addLevels(shelf: THREE.Object3D, config: ShelfConfig) {
		// Individual shelves
		const shelfGeometry = this.getShelveGeometry(config);

		for (const sh of config.levels) {

			if (sh.height >= config.height)
				console.warn("Shelf contains level higher than its height");

			const m = new THREE.Mesh(shelfGeometry, Shelf.shelveMaterial);
			m.name = `ShelfHeight${sh.height}`;

			m.translateX(-config.width / 2);
			m.translateZ(-config.depth / 2);
			m.translateY(sh.height - config.height / 2);
			
			shelf.add(m);

			// Buckets
			const bWidth = this.bucketManager.getWidth(sh.bucketType);
			const availableSpace = config.width - Shelf.frameThickness;
			const no_buckets = Math.floor(availableSpace / bWidth);

			const freeSpace = availableSpace - no_buckets * bWidth;
			const spacing = freeSpace / (no_buckets + 1);

			for (let i = 0; i < no_buckets; i++) {
				const bucket = new THREE.Group();
				bucket.name = "PlacedBucket";

				bucket.scale.multiply(new THREE.Vector3(1, 1, config.depth));
				bucket.rotateX(Shelf.shelfAngle);
				// CSS equivalent of space-evenly
				bucket.translateX(
					Shelf.frameThickness / 2 + spacing * (i + 1) + bWidth * (i + 0.5)
				);
				bucket.translateY(-0.05);
				bucket.translateZ(config.depth / 2);

				this.bucketManager.addBucket(sh.bucketType, bucket);

				m.add(bucket);
			}
		}
	}

	private getFrameGeometry(config: ShelfConfig): THREE.BufferGeometry {
		const identifier = {
			width: config.width,
			depth: config.depth,
			height: config.height,
		};
		const geo = Shelf.frameGeometries.get(identifier);

		if (!geo) {
			const generated_geo = this.generateFrameGeometry(config);
			Shelf.frameGeometries.set(identifier, generated_geo);
			return generated_geo;
		} else return geo;
	}

	private generateFrameGeometry(config: ShelfConfig): THREE.BufferGeometry {
		const geometries: THREE.BufferGeometry[] = [];
		const positionHelper = new THREE.Object3D();

		// Vertical beams
		for (let i = 0; i < 2; i++) {
			for (let j = 0; j < 2; j++) {
				const supportBeam = new THREE.BoxGeometry(0.1, config.height, 0.1);

				positionHelper.position.setX(config.width * i);
				positionHelper.position.setY(0);
				positionHelper.position.setZ(config.depth * j);

				positionHelper.updateMatrixWorld();
				supportBeam.applyMatrix4(positionHelper.matrixWorld);
				geometries.push(supportBeam);
			}
		}

		positionHelper.position.set(0, 0, 0);

		// Horizontal beams
		// Back
		const hBackBeam = new THREE.BoxGeometry(config.width, 0.1, 0.1);
		positionHelper.translateY(config.height / 2 - 0.05);
		positionHelper.translateX(config.width / 2);

		positionHelper.updateMatrixWorld();
		hBackBeam.applyMatrix4(positionHelper.matrixWorld);
		geometries.push(hBackBeam);

		positionHelper.position.set(0, 0, 0);

		// Side Neg X
		const hSideBeam = new THREE.BoxGeometry(0.1, 0.1, config.depth);
		positionHelper.translateY(config.height / 2 - 0.05);
		positionHelper.translateZ(config.depth / 2);

		positionHelper.updateMatrixWorld();
		hSideBeam.applyMatrix4(positionHelper.matrixWorld);
		geometries.push(hSideBeam);

		// Side Pos X
		const hSideBeam2 = new THREE.BoxGeometry(0.1, 0.1, config.depth);
		positionHelper.translateX(config.width);

		positionHelper.updateMatrixWorld();
		hSideBeam2.applyMatrix4(positionHelper.matrixWorld);
		geometries.push(hSideBeam2);

		positionHelper.position.set(0, 0, 0);

		// Diagonal beams
		const diagonalBeam = new THREE.BoxGeometry(
			0.1,
			Math.sqrt(config.depth ** 2 + config.height ** 2) - 0.025,
			0.1
		);
		const diagonalBeam2 = diagonalBeam.clone();

		// Diag Neg x
		positionHelper.rotateX(-Math.atan(config.depth / config.height));
		positionHelper.position.z = config.depth / 2;

		positionHelper.updateMatrixWorld();
		diagonalBeam.applyMatrix4(positionHelper.matrixWorld);
		geometries.push(diagonalBeam);

		// Diag Pos X
		positionHelper.position.x = config.width;

		positionHelper.updateMatrixWorld();
		diagonalBeam2.applyMatrix4(positionHelper.matrixWorld);
		geometries.push(diagonalBeam2);

		const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries, false);
		return mergedGeometry;
	}

	private getShelveGeometry(config: ShelfConfig): THREE.BufferGeometry {
		const identifier = {
			width: config.width,
			depth: config.depth,
		};
		const geo = Shelf.shelveGeometries.get(identifier);

		if (!geo) {
			const generated_geo = this.generateShelveGeometry(config);
			Shelf.shelveGeometries.set(identifier, generated_geo);
			return generated_geo;
		} else return geo;
	}

	private generateShelveGeometry(config: ShelfConfig) {
		const positionHelper = new THREE.Object3D();
		const geometries: THREE.BufferGeometry[] = [];

		const shelfHeightOffset = Math.tan(Shelf.shelfAngle) * (config.depth / 2);

		const shelfGeometry = new THREE.BoxGeometry(config.width - 0.1, 0.025, config.depth);
		const shelfEdge = new THREE.BoxGeometry(config.width - 0.1, Shelf.levelEdgeHeight, 0.01);

		// Shelf base
		positionHelper.rotateX(Shelf.shelfAngle);
		positionHelper.position.set(config.width / 2, shelfHeightOffset, config.depth / 2);

		positionHelper.updateMatrixWorld();
		shelfGeometry.applyMatrix4(positionHelper.matrixWorld);
		geometries.push(shelfGeometry);

		// Edge
		positionHelper.translateY(Shelf.levelEdgeHeight / 2);
		positionHelper.translateZ(config.depth / 2);

		positionHelper.updateMatrixWorld();
		shelfEdge.applyMatrix4(positionHelper.matrixWorld);
		geometries.push(shelfEdge);

		const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries, false);
		return mergedGeometry;
	}

	public getObject(): THREE.Object3D {
		return this.object;
	}
}
