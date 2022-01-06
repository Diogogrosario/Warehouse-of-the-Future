import * as THREE from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { BucketType, BucketManager } from "./BucketManager";

export interface ShelfConfig {
	height: number;
	bucketType: BucketType;
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

	static readonly shelfAngle = Math.PI / 48;
	static readonly frameThickness = 0.1;

	static readonly frameGeometries: Map<FrameIdentifier, THREE.BufferGeometry> = new Map();
	static readonly shelveGeometries: Map<ShelvesIdentifier, THREE.BufferGeometry> = new Map();

	private readonly width: number;
	private readonly depth: number;
	private readonly height: number;
	private readonly shelfHeightOffset: number;

	private readonly bucketManager: BucketManager;

	private object: THREE.Object3D;

	constructor(
		shelfConfig: ShelfConfig[],
		bucketManager: BucketManager,
		width = 2,
		depth = 1,
		height = 4
	) {
		const shelf = new THREE.Group();
		shelf.name = "Shelf";

		this.width = width;
		this.depth = depth;
		this.height = height;

		this.shelfHeightOffset = Math.tan(Shelf.shelfAngle) * (this.depth / 2);

		this.bucketManager = bucketManager;

		const frameMesh = new THREE.Mesh(this.getFrameGeometry(), Shelf.frameMaterial);
		frameMesh.name = "ShelfFrame";
		shelf.add(frameMesh);

		// Individual shelves
		const shelfGeometry = this.getShelveGeometry();
		for (const sh of shelfConfig) {
			const m = new THREE.Mesh(shelfGeometry, Shelf.shelveMaterial);
			m.name = `ShelfHeight${sh.height}`;
			m.translateY(sh.height - this.height / 2);
			shelf.add(m);

			// Buckets
			const bWidth = this.bucketManager.getWidth(sh.bucketType);
			const availableSpace = this.width - Shelf.frameThickness;
			const no_buckets = Math.floor(availableSpace / bWidth);

			const freeSpace = availableSpace - no_buckets * bWidth;
			const spacing = freeSpace / (no_buckets + 1);

			for (let i = 0; i < no_buckets; i++) {
				const bucket = new THREE.Group();
				bucket.name = "PlacedBucket";

				bucket.scale.multiply(new THREE.Vector3(1, 1, this.depth));
				bucket.rotateX(Shelf.shelfAngle);
				// CSS equivalent of space-evenly
				bucket.translateX(
					Shelf.frameThickness / 2 + spacing * (i + 1) + bWidth * (i + 0.5)
				);
				bucket.translateY(-0.05);
				bucket.translateZ(this.depth / 2);

				this.bucketManager.addBucket(sh.bucketType, bucket);

				m.add(bucket);
			}
		}

		shelf.position.add(new THREE.Vector3(-width / 2, height / 2, -depth / 2));
		this.object = shelf;
	}

	private getFrameGeometry(): THREE.BufferGeometry {
		const identifier = {
			width: this.width,
			depth: this.depth,
			height: this.height,
		};
		const geo = Shelf.frameGeometries.get(identifier);

		if (!geo) {
			const generated_geo = this.generateFrameGeometry();
			Shelf.frameGeometries.set(identifier, generated_geo);
			return generated_geo;
		} else return geo;
	}

	private generateFrameGeometry(): THREE.BufferGeometry {
		const geometries: THREE.BufferGeometry[] = [];
		const positionHelper = new THREE.Object3D();

		// Vertical beams
		for (let i = 0; i < 2; i++) {
			for (let j = 0; j < 2; j++) {
				const supportBeam = new THREE.BoxGeometry(0.1, this.height, 0.1);

				positionHelper.position.setX(this.width * i);
				positionHelper.position.setY(0);
				positionHelper.position.setZ(this.depth * j);

				positionHelper.updateMatrixWorld();
				supportBeam.applyMatrix4(positionHelper.matrixWorld);
				geometries.push(supportBeam);
			}
		}

		positionHelper.position.set(0, 0, 0);

		// Horizontal beams
		// Back
		const hBackBeam = new THREE.BoxGeometry(this.width, 0.1, 0.1);
		positionHelper.translateY(this.height / 2 - 0.05);
		positionHelper.translateX(this.width / 2);

		positionHelper.updateMatrixWorld();
		hBackBeam.applyMatrix4(positionHelper.matrixWorld);
		geometries.push(hBackBeam);

		positionHelper.position.set(0, 0, 0);

		// Side Neg X
		const hSideBeam = new THREE.BoxGeometry(0.1, 0.1, this.depth);
		positionHelper.translateY(this.height / 2 - 0.05);
		positionHelper.translateZ(this.depth / 2);

		positionHelper.updateMatrixWorld();
		hSideBeam.applyMatrix4(positionHelper.matrixWorld);
		geometries.push(hSideBeam);

		// Side Pos X
		const hSideBeam2 = new THREE.BoxGeometry(0.1, 0.1, this.depth);
		positionHelper.translateX(this.width);

		positionHelper.updateMatrixWorld();
		hSideBeam2.applyMatrix4(positionHelper.matrixWorld);
		geometries.push(hSideBeam2);

		positionHelper.position.set(0, 0, 0);

		// Diagonal beams
		const diagonalBeam = new THREE.BoxGeometry(
			0.1,
			Math.sqrt(this.depth ** 2 + this.height ** 2) - 0.025,
			0.1
		);
		const diagonalBeam2 = diagonalBeam.clone();

		// Diag Neg x
		positionHelper.rotateX(-Math.atan(this.depth / this.height));
		positionHelper.position.z = this.depth / 2;

		positionHelper.updateMatrixWorld();
		diagonalBeam.applyMatrix4(positionHelper.matrixWorld);
		geometries.push(diagonalBeam);

		// Diag Pos X
		positionHelper.position.x = this.width;

		positionHelper.updateMatrixWorld();
		diagonalBeam2.applyMatrix4(positionHelper.matrixWorld);
		geometries.push(diagonalBeam2);

		const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries, false);
		return mergedGeometry;
	}

	private getShelveGeometry(): THREE.BufferGeometry {
		const identifier = {
			width: this.width,
			depth: this.depth,
		};
		const geo = Shelf.shelveGeometries.get(identifier);

		if (!geo) {
			const generated_geo = this.generateShelveGeometry();
			Shelf.shelveGeometries.set(identifier, generated_geo);
			return generated_geo;
		} else return geo;
	}

	private generateShelveGeometry() {
		const positionHelper = new THREE.Object3D();
		const geometries: THREE.BufferGeometry[] = [];

		const edgeHeight = 0.075;

		const shelfGeometry = new THREE.BoxGeometry(this.width - 0.1, 0.025, this.depth);
		const shelfEdge = new THREE.BoxGeometry(this.width - 0.1, edgeHeight, 0.01);

		// Shelf base
		positionHelper.rotateX(Shelf.shelfAngle);
		positionHelper.position.set(this.width / 2, this.shelfHeightOffset, this.depth / 2);

		positionHelper.updateMatrixWorld();
		shelfGeometry.applyMatrix4(positionHelper.matrixWorld);
		geometries.push(shelfGeometry);

		// Edge
		positionHelper.translateY(edgeHeight / 2);
		positionHelper.translateZ(this.depth / 2);

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
