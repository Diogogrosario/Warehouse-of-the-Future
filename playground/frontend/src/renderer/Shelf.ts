import * as THREE from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";

export enum BucketType {
	SMALL,
	REGULAR,
	LARGE,
}

export interface ShelfConfig {
	height: number;
	buckets: number;
	bucketType: BucketType;
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

	private object: THREE.Object3D;

	constructor(shelfConfig: ShelfConfig[], width = 2, depth = 1, height = 4) {
		const group = new THREE.Group();
		group.name = "Shelf";

		const frameMesh = new THREE.Mesh(
			this.generateShelfFrameGeometry(width, depth, height),
			Shelf.frameMaterial
		);
		frameMesh.name = "ShelfFrame";
		group.add(frameMesh);

		// Individual shelves
		const shelfGeometry = this.generateShelfGeometry(width, depth);
		for (const sh of shelfConfig) {
			const m = new THREE.Mesh(shelfGeometry, Shelf.shelveMaterial);
			m.name = `ShelfHeight${sh.height}`;
			m.position.y += sh.height - height / 2;
			group.add(m);
		}

		group.position.add(new THREE.Vector3(-width / 2, height / 2, -depth / 2));
		this.object = group;
	}

	private generateShelfFrameGeometry(
		width: number,
		depth: number,
		height: number
	): THREE.BufferGeometry {
		const geometries: THREE.BufferGeometry[] = [];
		const positionHelper = new THREE.Object3D();

		// Vertical beams
		for (let i = 0; i < 2; i++) {
			for (let j = 0; j < 2; j++) {
				const supportBeam = new THREE.BoxGeometry(0.1, height, 0.1);

				positionHelper.position.setX(width * i);
				positionHelper.position.setY(0);
				positionHelper.position.setZ(depth * j);

				console.log(positionHelper.position);

				positionHelper.updateMatrixWorld();
				supportBeam.applyMatrix4(positionHelper.matrixWorld);
				geometries.push(supportBeam);
			}
		}

		positionHelper.position.set(0, 0, 0);

		// Horizontal beams
		// Back
		const hBackBeam = new THREE.BoxGeometry(width, 0.1, 0.1);
		positionHelper.translateY(height / 2 - 0.05);
		positionHelper.translateX(width / 2);

		positionHelper.updateMatrixWorld();
		hBackBeam.applyMatrix4(positionHelper.matrixWorld);
		geometries.push(hBackBeam);

		positionHelper.position.set(0, 0, 0);

		// Side Neg X
		const hSideBeam = new THREE.BoxGeometry(0.1, 0.1, depth);
		positionHelper.translateY(height / 2 - 0.05);
		positionHelper.translateZ(depth / 2);

		positionHelper.updateMatrixWorld();
		hSideBeam.applyMatrix4(positionHelper.matrixWorld);
		geometries.push(hSideBeam);

		// Side Pos X
		const hSideBeam2 = new THREE.BoxGeometry(0.1, 0.1, depth);
		positionHelper.translateX(width);

		positionHelper.updateMatrixWorld();
		hSideBeam2.applyMatrix4(positionHelper.matrixWorld);
		geometries.push(hSideBeam2);

		positionHelper.position.set(0, 0, 0);

		// Diagonal beams
		const diagonalBeam = new THREE.BoxGeometry(
			0.1,
			Math.sqrt(depth ** 2 + height ** 2) - 0.025,
			0.1
		);
		const diagonalBeam2 = diagonalBeam.clone();

		// Diag Neg x
		positionHelper.rotateX(-Math.atan(depth / height));
		positionHelper.position.z = depth / 2;

		positionHelper.updateMatrixWorld();
		diagonalBeam.applyMatrix4(positionHelper.matrixWorld);
		geometries.push(diagonalBeam);

		// Diag Pos X
		positionHelper.position.x = width;

		positionHelper.updateMatrixWorld();
		diagonalBeam2.applyMatrix4(positionHelper.matrixWorld);
		geometries.push(diagonalBeam2);

		const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries, false);
		return mergedGeometry;
	}

	private generateShelfGeometry(width: number, depth: number) {
		const positionHelper = new THREE.Object3D();
		const geometries: THREE.BufferGeometry[] = [];

		const edgeHeight = 0.075;
		const shelfHeightOffset = 0.06; // TODO: Calculate this height

		const shelfGeometry = new THREE.BoxGeometry(width - 0.1, 0.025, depth);
		const shelfEdge = new THREE.BoxGeometry(width - 0.1, edgeHeight, 0.01);

		// Shelf base
		positionHelper.rotateX(Shelf.shelfAngle);
		positionHelper.position.set(width / 2, shelfHeightOffset, depth / 2);

		positionHelper.updateMatrixWorld();
		shelfGeometry.applyMatrix4(positionHelper.matrixWorld);
		geometries.push(shelfGeometry);

		// Edge
		positionHelper.translateY(edgeHeight / 2);
		positionHelper.translateZ(depth / 2);

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
