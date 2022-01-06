import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import SceneManager from "./SceneManager";

export enum BucketType {
	SMALL = "S",
	REGULAR = "R",
	LARGE = "L",
}

export class BucketManager {
	private readonly sceneManager;
	private readonly gltfLoader = new GLTFLoader();

	private readonly materials: Map<BucketType, THREE.Material> = new Map();

	private readonly meshes: Map<BucketType, THREE.Mesh> = new Map();
	private readonly toAdd: Map<BucketType, THREE.Object3D[]> = new Map();

	constructor(sceneManager: SceneManager) {
		this.sceneManager = sceneManager;

		this.meshes = new Map();
		this.toAdd = new Map();

		this.materials.set(BucketType.SMALL, new THREE.MeshLambertMaterial({ color: 0xfc0595 }));
		this.materials.set(BucketType.REGULAR, new THREE.MeshLambertMaterial({ color: 0x606c2e }));
		this.materials.set(BucketType.LARGE, new THREE.MeshLambertMaterial({ color: 0x151226 }));

		for (const k of Object.values(BucketType)) {
			this.toAdd.set(k, []);
			this.loadObj(k);
		}
	}

	private getModelUrl(bucketType: BucketType): string {
		switch (bucketType) {
			case BucketType.SMALL:
				return "";
			case BucketType.REGULAR:
				return "assets/models/bucket_regular.glb";
			case BucketType.LARGE:
				return "";
		}
	}

	public getWidth(bucketType: BucketType): number {
		switch (bucketType) {
			case BucketType.SMALL:
				return 0;
			case BucketType.REGULAR:
				return 0.5;
			case BucketType.LARGE:
				return 0;
		}
	}

	private loadObj(type: BucketType) {
		const material = this.materials.get(type);
		if (!material) {
			console.error(`Could not load ${type} Bucket material`);
		}

		this.gltfLoader.load(this.getModelUrl(type), (gltf) => {
			const root = gltf.scene;
			root.name = "Bucket";

			const mesh = root.children[0] as THREE.Mesh;
			this.meshes.set(type, mesh);

			if (material) mesh.material = material;
			mesh.scale.multiplyScalar(0.475);

			console.log(mesh);

			const toAdd = this.toAdd.get(type);
			if (toAdd && toAdd.length > 0) {
				for (const obj of toAdd) {
					obj.add(mesh.clone());
				}
			}

			this.sceneManager.invalidate();
		});
	}

	public addBucket(type: BucketType, obj: THREE.Object3D) {
		const mesh = this.meshes.get(type);
		if (mesh) {
			obj.add(mesh.clone());
			return;
		}

		const waitingList = this.toAdd.get(type);
		if (waitingList) waitingList.push(obj);
		else console.error("Bucked cannot be added");
	}
}
