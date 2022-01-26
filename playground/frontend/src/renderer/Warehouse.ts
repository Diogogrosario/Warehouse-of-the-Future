import * as THREE from "three";

import { RackFactory, RackConfig } from "./RackFactory";
import { DummyDevice, BucketFactory, Coords3 } from "./BucketFactory";
import SceneManager from "./SceneManager";
import { SpaceEvenly } from "./utils/Spacing";
import {
	RecvMessages,
	SentMessages,
	ISimulationMessageObserver,
} from "../resources/SimulationInterfaces";
import { SimulationAPI } from "../resources/SimulationAPI";

export interface WarehouseDimensions {
	width: number;
	height: number;
	depth: number;
}

export interface WarehouseStructure {
	dimensions: WarehouseDimensions;
	racks: RackConfig[];
	orchestrator?: Coords3;
	dummyDevices?: DummyDevice[];
}

export class Warehouse implements ISimulationMessageObserver {
	private warehouse: THREE.Object3D;

	private planeGeometry = new THREE.PlaneGeometry(1, 1, 1, 1);

	private readonly loader: THREE.TextureLoader;

	private readonly sceneManager: SceneManager;
	private readonly bucketFactory: BucketFactory;
	private readonly rackFactory: RackFactory;

	private static readonly lightDistancing = 6;
	private structure: WarehouseStructure;

	constructor(sceneManager: SceneManager, structure: WarehouseStructure) {
		this.structure = structure;

		this.warehouse = new THREE.Group();
		this.warehouse.name = "Warehouse";

		this.sceneManager = sceneManager;
		this.bucketFactory = new BucketFactory(sceneManager);
		this.rackFactory = new RackFactory(sceneManager, this.bucketFactory);

		// Load textures
		const loadManager = new THREE.LoadingManager();
		this.loader = new THREE.TextureLoader(loadManager);

		loadManager.onLoad = () => {
			this.sceneManager.invalidate();
		};

		BucketFactory.fixBucketWidths(structure);

		this.buildWarehouse(this.structure);
		SimulationAPI.postLayout(this.bucketFactory.getDeviceLayout());
		SimulationAPI.subscribeMessages(this);
	}

	newSentMessages(msgs: SentMessages): void {
		this.bucketFactory.clearRenderedSentArrows();
		this.bucketFactory.renderSentArrows(msgs);
	}

	newRecvMessages(msgs: RecvMessages): void {
		this.bucketFactory.clearRenderedRecvArrows();
		this.bucketFactory.renderRecvArrows(msgs);
	}

	public addWarehouse(obj: THREE.Object3D) {
		obj.add(this.warehouse);
	}

	private buildWarehouse(structure: WarehouseStructure) {
		this.addWalls(structure.dimensions);
		this.addGround(structure.dimensions);

		this.addOrchestrator(structure);
		this.addDummyDevices(structure);

		for (const shelfConfig of structure.racks) {
			this.rackFactory.addRack(shelfConfig, structure.dimensions, this.warehouse);
		}

		this.addLights(structure.dimensions);
	}

	private addOrchestrator(structure: WarehouseStructure) {
		const pos = structure.orchestrator ?? {
			x: structure.dimensions.width / 2,
			y: structure.dimensions.height / 2,
			z: structure.dimensions.depth / 2,
		};

		this.bucketFactory.addOrchestrator(pos, structure.dimensions, this.warehouse);
	}

	private addDummyDevices(structure: WarehouseStructure) {
		if (this.structure.dummyDevices === undefined) return;

		const dummyGroup = new THREE.Group();
		dummyGroup.name = "DummyDevices";
		this.warehouse.add(dummyGroup);

		for (const d of this.structure.dummyDevices) {
			this.bucketFactory.addDummyDevice(d, structure.dimensions, dummyGroup);
		}
	}

	private addGround(dim: WarehouseDimensions) {
		const brickTexture = this.loader.load("assets/textures/brick_03.png");
		brickTexture.wrapS = THREE.RepeatWrapping;
		brickTexture.wrapT = THREE.RepeatWrapping;
		brickTexture.repeat = new THREE.Vector2(dim.width, dim.depth);

		const brickNormalMap = this.loader.load("assets/textures/brick_03_nrm.png");
		brickNormalMap.wrapS = THREE.RepeatWrapping;
		brickNormalMap.wrapT = THREE.RepeatWrapping;
		brickNormalMap.repeat = new THREE.Vector2(dim.width, dim.depth);

		const groundMaterial = new THREE.MeshPhongMaterial({
			color: 0x6d6c65,
			map: brickTexture,
			normalMap: brickNormalMap,
			normalScale: new THREE.Vector2(1, 1),
		});

		const groundMesh = new THREE.Mesh(this.planeGeometry, groundMaterial);
		groundMesh.name = "Ground";
		groundMesh.scale.set(dim.width, dim.depth, 1);
		groundMesh.rotateX(-Math.PI / 2);

		this.warehouse.add(groundMesh);
	}

	private addWalls(dim: WarehouseDimensions) {
		const concrete = this.loader.load("assets/textures/concrete_stripe.jpg");
		const wallMaterial = new THREE.MeshPhongMaterial({
			color: 0x828282,
			shininess: 3,
			map: concrete,
		});

		const wallNegX = new THREE.Mesh(this.planeGeometry, wallMaterial);
		wallNegX.name = "eastWall";
		wallNegX.scale.set(dim.depth, dim.height, 1);
		wallNegX.translateY(dim.height / 2);
		wallNegX.translateX(-dim.width / 2);
		wallNegX.rotateY(Math.PI / 2);

		const wallPosX = new THREE.Mesh(this.planeGeometry, wallMaterial);
		wallPosX.name = "westWall";
		wallPosX.scale.set(dim.depth, dim.height, 1);
		wallPosX.translateY(dim.height / 2);
		wallPosX.translateX(dim.width / 2);
		wallPosX.rotateY(-Math.PI / 2);

		const wallNegZ = new THREE.Mesh(this.planeGeometry, wallMaterial);
		wallNegZ.name = "southWall";
		wallNegZ.scale.set(dim.width, dim.height, 1);
		wallNegZ.translateY(dim.height / 2);
		wallNegZ.translateZ(-dim.depth / 2);

		const wallPosZ = new THREE.Mesh(this.planeGeometry, wallMaterial);
		wallPosZ.name = "northWall";
		wallPosZ.scale.set(dim.width, dim.height, 1);
		wallPosZ.translateY(dim.height / 2);
		wallPosZ.translateZ(dim.depth / 2);
		wallPosZ.rotateY(Math.PI);

		this.warehouse.add(wallNegX);
		this.warehouse.add(wallPosX);
		this.warehouse.add(wallNegZ);
		this.warehouse.add(wallPosZ);
	}

	private addLights(dim: WarehouseDimensions) {
		const ambient = new THREE.AmbientLight();
		ambient.color = new THREE.Color(0xdddddd);
		ambient.intensity = 0.2;
		this.warehouse.add(ambient);

		const xLights = Math.floor(dim.width / Warehouse.lightDistancing);
		const zLights = Math.floor(dim.depth / Warehouse.lightDistancing);

		const xSpacing = new SpaceEvenly(dim.width, Array(xLights).fill(0));
		const zSpacing = new SpaceEvenly(dim.width, Array(xLights).fill(0));

		for (let i = 0; i < xLights; i++) {
			for (let j = 0; j < zLights; j++) {
				const l = new THREE.PointLight();
				l.intensity = 0.5;
				l.position.set(
					xSpacing.position(i) - dim.width / 2,
					dim.height,
					zSpacing.position(j) - dim.depth / 2
				);
				this.warehouse.add(l);

				// const helper = new THREE.PointLightHelper(l);
				// this.warehouse.add(helper);
			}
		}
	}

	public dispose() {
		SimulationAPI.unsubscribeMessages(this);
	}

	public getObject(): THREE.Object3D {
		return this.warehouse;
	}
}
