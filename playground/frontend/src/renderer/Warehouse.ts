import * as THREE from "three";

import { ShelfFactory, ShelfConfig } from "./ShelfFactory";
import { BucketManager } from "./BucketManager";
import SceneManager from "./SceneManager";

export interface WarehouseDimensions {
	width: number;
	height: number;
	depth: number;
}

interface WarehouseLights {
	x: number,
	y: number,
	z: number
}

export interface WarehouseStructure {
	dimensions: WarehouseDimensions;
	shelves: ShelfConfig[];
	lights: WarehouseLights[];
}

export class Warehouse {
	private obj: THREE.Object3D;

	private planeGeometry = new THREE.PlaneGeometry(1, 1, 1, 1);

	private readonly loader: THREE.TextureLoader;

	private readonly sceneManager: SceneManager;
	private readonly shelfFactory: ShelfFactory;

	private readonly structure: WarehouseStructure;

	constructor(sceneManager: SceneManager, structure: WarehouseStructure) {
		this.obj = new THREE.Group();
		this.obj.name = "Warehouse";

		this.sceneManager = sceneManager;
		const bucketManager = new BucketManager(sceneManager);
		this.shelfFactory = new ShelfFactory(sceneManager, bucketManager);

		this.structure = structure;

		// Load textures
		const loadManager = new THREE.LoadingManager();
		this.loader = new THREE.TextureLoader(loadManager);

		loadManager.onLoad = () => {
			this.sceneManager.invalidate();
		};

		this.buildWarehouse();
	}

	private buildWarehouse() {
		this.addWalls(
			this.structure.dimensions.width,
			this.structure.dimensions.depth,
			this.structure.dimensions.height
		);
		this.addGround(this.structure.dimensions.width, this.structure.dimensions.depth);

		for (const shelfConfig of this.structure.shelves) {
			this.obj.add(this.shelfFactory.getShelf(shelfConfig, this.structure.dimensions));
		}
	}

	private addGround(width: number, depth: number) {
		const brickTexture = this.loader.load("assets/textures/brick_03.png");
		brickTexture.wrapS = THREE.RepeatWrapping;
		brickTexture.wrapT = THREE.RepeatWrapping;
		brickTexture.repeat = new THREE.Vector2(width, depth);

		const brickNormalMap = this.loader.load("assets/textures/brick_03_nrm.png");
		brickNormalMap.wrapS = THREE.RepeatWrapping;
		brickNormalMap.wrapT = THREE.RepeatWrapping;
		brickNormalMap.repeat = new THREE.Vector2(width, depth);

		const groundMaterial = new THREE.MeshPhongMaterial({
			color: 0x6d6c65,
			map: brickTexture,
			normalMap: brickNormalMap,
			normalScale: new THREE.Vector2(1, 1),
		});

		const groundMesh = new THREE.Mesh(this.planeGeometry, groundMaterial);
		groundMesh.scale.set(width, depth, 1);
		groundMesh.rotateX(-Math.PI / 2);

		this.obj.add(groundMesh);
	}

	private addWalls(width: number, depth: number, height: number) {
		const wallMaterial = new THREE.MeshPhongMaterial({ color: 0x828282 });

		const wallNegX = new THREE.Mesh(this.planeGeometry, wallMaterial);
		wallNegX.scale.set(depth, height, 1);
		wallNegX.translateY(height / 2);
		wallNegX.translateX(-width / 2);
		wallNegX.rotateY(Math.PI / 2);

		const wallPosX = new THREE.Mesh(this.planeGeometry, wallMaterial);
		wallPosX.scale.set(depth, height, 1);
		wallPosX.translateY(height / 2);
		wallPosX.translateX(width / 2);
		wallPosX.rotateY(-Math.PI / 2);

		const wallNegZ = new THREE.Mesh(this.planeGeometry, wallMaterial);
		wallNegZ.scale.set(width, height, 1);
		wallNegZ.translateY(height / 2);
		wallNegZ.translateZ(-depth / 2);

		const wallPosZ = new THREE.Mesh(this.planeGeometry, wallMaterial);
		wallPosZ.scale.set(width, height, 1);
		wallPosZ.translateY(height / 2);
		wallPosZ.translateZ(depth / 2);
		wallPosZ.rotateY(Math.PI);

		this.obj.add(wallNegX);
		this.obj.add(wallPosX);
		this.obj.add(wallNegZ);
		this.obj.add(wallPosZ);
	}

	public getObject(): THREE.Object3D {
		return this.obj;
	}
}
