import * as THREE from "three";

export enum BucketType {
	SMALL,
	NORMAL,
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

	private object: THREE.Object3D;

	constructor(
		shelfConfig: ShelfConfig[],
		width: number = 2,
		depth: number = 1,
		height: number = 4
	) {
		const group = new THREE.Group();
		group.name = "Shelf";

		const supportBeam = new THREE.BoxGeometry(0.1, height, 0.1);
		for (let i = 0; i < 2; i++) {
			for (let j = 0; j < 2; j++) {
				const beamMesh = new THREE.Mesh(supportBeam, Shelf.frameMaterial);
				beamMesh.position.setX(width * i);
				beamMesh.position.setZ(depth * j);
				group.add(beamMesh);
			}
		}

		const diagonalBeam = new THREE.BoxGeometry(0.1, Math.sqrt(depth ** 2 + height ** 2), 0.1);
		const diagMesh1 = new THREE.Mesh(diagonalBeam, Shelf.frameMaterial);
		diagMesh1.rotateX(-Math.atan(depth / height));
		diagMesh1.position.z = depth / 2;
		group.add(diagMesh1);

		const diagMesh2 = diagMesh1.clone();
		diagMesh1.position.x = width;
		group.add(diagMesh2);

		const shelf = new THREE.Group();
		const shelfGeometry = new THREE.BoxGeometry(width - 0.1, 0.025, depth);
		const edgeHeight = 0.075;
		const shelfEdge = new THREE.BoxGeometry(width - 0.1, edgeHeight, 0.01);
		shelfEdge.translate(0, edgeHeight / 2, depth / 2);
		shelf.add(
			new THREE.Mesh(shelfGeometry, Shelf.shelveMaterial).add(
				new THREE.Mesh(shelfEdge, Shelf.shelveMaterial)
			)
		);
		shelf.rotateX(Math.PI / 48);
		shelf.position.set(width / 2, 0, depth / 2);

		const shelfHeightOffset = 0.06;
		for (let sh of shelfConfig) {
			const m = shelf.clone();
			m.position.y = sh.height - height / 2 + shelfHeightOffset;
			group.add(m);
		}

		group.position.add(new THREE.Vector3(-width / 2, height / 2, -depth / 2));
		this.object = group;
	}

	public getObject(): THREE.Object3D {
		return this.object;
	}
}
