import * as THREE from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { BucketFactory } from "./BucketFactory";
import { WarehouseDimensions } from "./Warehouse";
import SceneManager from "./SceneManager";
import { SpaceEvenly } from "./utils/Spacing";
import { Device } from "./Device";

export interface BucketConfig {
	height?: number;
	width: number;
	id: number;
}

export interface ShelfConfig {
	y: number;
	grounded?: boolean;
	buckets: BucketConfig[];
}

enum Orientation {
	NORTH = "north",
	SOUTH = "south",
	EAST = "east",
	WEST = "west",
}

export interface RackConfig {
	orientation: Orientation;
	x: number;
	z: number;
	width: number;
	depth: number;
	height: number;
	shelves: ShelfConfig[];
	hasFrame?: boolean;
}

// Internal mapping only
interface FrameIdentifier {
	width: number;
	depth: number;
	height: number;
}

interface ShelvesIdentifier {
	width: number;
	depth: number;
}

export class RackFactory {
	private frameMaterial: THREE.Material;
	private shelfMaterial: THREE.Material;

	public static readonly frameThickness = 0.1;

	public static readonly shelfAngle = Math.PI / 48;
	public static readonly shelfEdgeHeight = 0.075;
	public static readonly shelfEdgeDepth = 0.01;

	private readonly frameGeometries: Map<FrameIdentifier, THREE.BufferGeometry> = new Map();
	private readonly shelfGeometries: Map<ShelvesIdentifier, THREE.BufferGeometry> = new Map();

	private readonly bucketManager: BucketFactory;

	private readonly devices: Map<number, Device> = new Map();

	constructor(sceneManager: SceneManager, bucketManager: BucketFactory) {
		this.bucketManager = bucketManager;

		this.frameMaterial = new THREE.MeshPhongMaterial({
			color: 0x002b82,
			shininess: 40,
		});

		this.shelfMaterial = new THREE.MeshPhongMaterial({
			color: 0xc2c2c2,
			shininess: 5,
		});
	}

	public addRack(config: RackConfig, dimensions: WarehouseDimensions, obj: THREE.Object3D) {
		const rack = new THREE.Group();
		rack.name = "Rack";
		obj.add(rack);

		const frameMesh = new THREE.Mesh();

		if (config.hasFrame !== false) {
			frameMesh.geometry = this.getFrameGeometry(config);
			frameMesh.material = this.frameMaterial;
		}

		frameMesh.translateX(-config.width / 2);
		frameMesh.translateZ(-config.depth / 2);
		frameMesh.name = "RackFrame";
		rack.add(frameMesh);

		this.addShelves(rack, config);

		this.positionRack(rack, config, dimensions);
	}

	private positionRack(
		rack: THREE.Object3D,
		config: RackConfig,
		dimensions: WarehouseDimensions
	) {
		// Update position
		switch (config.orientation) {
			case Orientation.NORTH:
			case Orientation.SOUTH:
				rack.translateX(config.x + config.width / 2);
				rack.translateZ(config.z + config.depth / 2);
				break;
			case Orientation.EAST:
			case Orientation.WEST:
				rack.translateX(config.x + config.depth / 2);
				rack.translateZ(config.z + config.width / 2);
				break;
		}

		rack.translateY(config.height / 2);
		rack.translateX(-dimensions.width / 2);
		rack.translateZ(-dimensions.depth / 2);

		// Update rotation
		switch (config.orientation) {
			case Orientation.NORTH:
				rack.rotateY(Math.PI);
				break;
			case Orientation.EAST:
				rack.rotateY(Math.PI / 2);
				break;
			case Orientation.WEST:
				rack.rotateY(-Math.PI / 2);
				break;
		}
	}

	private addShelves(rack: THREE.Object3D, config: RackConfig) {
		for (const sh of config.shelves) {
			if (sh.y >= config.height) console.warn("Shelf contains level higher than its height");

			const shelf = new THREE.Mesh();
			shelf.name = `ShelfHeight${sh.y}`;

			// Move to rack coordinate system
			shelf.translateX(-config.width / 2);
			shelf.translateZ(-config.depth / 2);
			shelf.translateY(sh.y - config.height / 2);

			if (sh.grounded === undefined || sh.grounded === false) {
				shelf.geometry = this.getShelveGeometry(config);
				shelf.material = this.shelfMaterial;

				const shelfAngleHeightOffset = Math.tan(RackFactory.shelfAngle) * config.depth;
				shelf.translateY(shelfAngleHeightOffset);
				shelf.rotateX(RackFactory.shelfAngle);
			}
			rack.add(shelf);

			// Add Buckets
			const spacing = new SpaceEvenly(
				config.width - RackFactory.frameThickness * 2,
				sh.buckets.map((bucketConfig: BucketConfig) => bucketConfig.width)
			);
			for (let i = 0; i < sh.buckets.length; i++) {
				const pos = RackFactory.frameThickness + spacing.position(i);

				this.bucketManager.addBucket(sh.buckets[i], config.depth, pos, shelf);
			}
		}
	}

	private getFrameGeometry(config: RackConfig): THREE.BufferGeometry {
		const identifier = {
			width: config.width,
			depth: config.depth,
			height: config.height,
		};
		const geo = this.frameGeometries.get(identifier);

		if (!geo) {
			const generated_geo = this.generateFrameGeometry(config);
			this.frameGeometries.set(identifier, generated_geo);
			return generated_geo;
		} else return geo;
	}

	private generateFrameGeometry(config: RackConfig): THREE.BufferGeometry {
		const geometries: THREE.BufferGeometry[] = [];
		const positionHelper = new THREE.Object3D();

		// Vertical beams
		for (let i = 0; i < 2; i++) {
			for (let j = 0; j < 2; j++) {
				const supportBeam = new THREE.BoxGeometry(
					RackFactory.frameThickness,
					config.height,
					RackFactory.frameThickness
				);

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

	private getShelveGeometry(config: RackConfig): THREE.BufferGeometry {
		const identifier = {
			width: config.width,
			depth: config.depth,
		};
		const geo = this.shelfGeometries.get(identifier);

		if (!geo) {
			const generated_geo = this.generateShelveGeometry(config);
			this.shelfGeometries.set(identifier, generated_geo);
			return generated_geo;
		} else return geo;
	}

	private generateShelveGeometry(config: RackConfig) {
		const positionHelper = new THREE.Object3D();
		const geometries: THREE.BufferGeometry[] = [];

		const realShelfDepth = config.depth / Math.cos(RackFactory.shelfAngle);

		const shelfGeometry = new THREE.BoxGeometry(
			config.width - RackFactory.frameThickness,
			0.025,
			realShelfDepth
		);
		const shelfEdge = new THREE.BoxGeometry(
			config.width - RackFactory.frameThickness,
			RackFactory.shelfEdgeHeight,
			RackFactory.shelfEdgeDepth
		);

		// Shelf base
		positionHelper.position.set(config.width / 2, 0, realShelfDepth / 2);

		positionHelper.updateMatrixWorld();
		shelfGeometry.applyMatrix4(positionHelper.matrixWorld);
		geometries.push(shelfGeometry);

		// Edge
		positionHelper.translateZ(realShelfDepth / 2);
		positionHelper.translateY(RackFactory.shelfEdgeHeight / 2);

		positionHelper.updateMatrixWorld();
		shelfEdge.applyMatrix4(positionHelper.matrixWorld);
		geometries.push(shelfEdge);

		const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries, false);
		mergedGeometry.translate(0, 0, 0);
		return mergedGeometry;
	}
}
