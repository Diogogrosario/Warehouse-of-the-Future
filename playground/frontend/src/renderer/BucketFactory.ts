import * as THREE from "three";
import { Device } from "./Device";
import { BucketConfig, RackFactory } from "./RackFactory";
import SceneManager from "./SceneManager";
import { WarehouseStructure } from "./Warehouse";

// Internal
interface BucketIdentifier {
	width: number;
	height: number;
	depth: number;
}

export class BucketFactory {
	private readonly sceneManager;

	private readonly material: THREE.Material;
	private readonly deviceMaterial: THREE.Material;

	private readonly geometries: Map<BucketIdentifier, THREE.BufferGeometry> = new Map();
	private readonly deviceGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.025);

	public readonly devices: Map<number, Device> = new Map();

	constructor(sceneManager: SceneManager) {
		this.sceneManager = sceneManager;

		this.geometries = new Map();

		// 0x606c2e
		this.material = new THREE.MeshPhongMaterial({ color: 0x151226 });
		this.deviceMaterial = new THREE.MeshPhongMaterial({ color: 0xcc3204 });
	}

	public static fixBucketWidths(config: WarehouseStructure) {
		for (const rack of config.racks) {
			for (const sh of rack.shelves) {
				for (const bucket of sh.buckets) {
					bucket.width *= 0.85;
				}
			}
		}
	}

	public addBucket(bconfig: BucketConfig, depth: number, pos: number, obj: THREE.Object3D) {
		// TODO: Calculate decent default height
		const bheight = bconfig.height ?? 2;
		depth = depth - RackFactory.shelfEdgeDepth;

		const identifier = {
			width: bconfig.width,
			depth: depth - RackFactory.shelfEdgeDepth,
			height: bheight,
		};

		let geometry = this.geometries.get(identifier);
		if (!geometry) {
			geometry = this.generateBucket(identifier);
		}

		const bucket = new THREE.Mesh(geometry, this.material);
		obj.add(bucket);
		bucket.name = "Bucket " + bconfig.id;

		bucket.translateX(pos);
		bucket.translateZ(depth);

		// DEVICE
		const device = new THREE.Mesh(this.deviceGeometry, this.deviceMaterial);
		device.name = "Device  " + bconfig.id;
		bucket.add(device);

		device.translateX(bconfig.width / 2 - 0.05);
		device.translateY(bheight - 0.05);
		device.translateZ(0.025 / 2);

		this.devices.set(bconfig.id, new Device(bconfig.id, device));
	}

	private generateBucket(identifier: BucketIdentifier): THREE.BufferGeometry {
		const bucket = new THREE.BoxGeometry(identifier.width, identifier.height, identifier.depth);
		bucket.translate(0, identifier.height / 2, -identifier.depth / 2);

		return bucket;
	}
}
