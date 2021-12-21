import * as THREE from "three";
import { BufferGeometry } from "three";

import { Shelf, ShelfConfig, BucketType } from "./Shelf";

export class WarehouseStructure {
	private obj: THREE.Object3D;

	private static planeGeometry = new THREE.PlaneGeometry(1, 1, 1, 1);
	private static groundMaterial = new THREE.MeshPhongMaterial({ color: 0x6d6c65 });
	private static wallMaterial = new THREE.MeshPhongMaterial({ color: 0x828282 });

	constructor(width: number = 16, depth: number = 20, height: number = 6) {
		this.obj = new THREE.Group();
		this.obj.name = "Warehouse";

		this.addGround(width, depth);
		this.addWalls(width, depth, height);
		this.addShelves();
	}

	private addGround(width: number, depth: number) {
		const groundMesh = new THREE.Mesh(
			WarehouseStructure.planeGeometry,
			WarehouseStructure.groundMaterial
		);
		groundMesh.scale.set(width, depth, 1);
		groundMesh.rotateX(-Math.PI / 2);

		this.obj.add(groundMesh);
	}

	private addWalls(width: number, depth: number, height: number) {
		const wallNegX = new THREE.Mesh(
			WarehouseStructure.planeGeometry,
			WarehouseStructure.wallMaterial
		);
		wallNegX.scale.set(depth, height, 1);
		wallNegX.translateY(height / 2);
		wallNegX.translateX(-width / 2);
		wallNegX.rotateY(Math.PI / 2);

		const wallPosX = new THREE.Mesh(
			WarehouseStructure.planeGeometry,
			WarehouseStructure.wallMaterial
		);
		wallPosX.scale.set(depth, height, 1);
		wallPosX.translateY(height / 2);
		wallPosX.translateX(width / 2);
		wallPosX.rotateY(-Math.PI / 2);

		const wallNegZ = new THREE.Mesh(
			WarehouseStructure.planeGeometry,
			WarehouseStructure.wallMaterial
		);
		wallNegZ.scale.set(width, height, 1);
		wallNegZ.translateY(height / 2);
		wallNegZ.translateZ(-depth / 2);

		const wallPosZ = new THREE.Mesh(
			WarehouseStructure.planeGeometry,
			WarehouseStructure.wallMaterial
		);
		wallPosZ.scale.set(width, height, 1);
		wallPosZ.translateY(height / 2);
		wallPosZ.translateZ(depth / 2);
		wallPosZ.rotateY(Math.PI);

		this.obj.add(wallNegX);
		this.obj.add(wallPosX);
		this.obj.add(wallNegZ);
		this.obj.add(wallPosZ);
	}

	private addShelves() {
		// SHELVES
		const shelf = new Shelf([
			{
				height: 0,
				buckets: 4,
				bucketType: BucketType.NORMAL,
			},
			{
				height: 1,
				buckets: 4,
				bucketType: BucketType.NORMAL,
			},
			{
				height: 2,
				buckets: 4,
				bucketType: BucketType.NORMAL,
			},
			{
				height: 3,
				buckets: 4,
				bucketType: BucketType.NORMAL,
			},
		]);
		this.obj.add(shelf.getObject());
	}

	public getObject(): THREE.Object3D {
		return this.obj;
	}
}
