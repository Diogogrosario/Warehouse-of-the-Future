import * as THREE from "three";
import { ArrowType, Device } from "./Device";
import {
	RecvMessages,
	RecvMessage,
	SentMessage,
	SentMessages,
} from "../resources/SimulationInterfaces";
import { BucketConfig, RackFactory } from "./RackFactory";
import SceneManager from "./SceneManager";
import { WarehouseDimensions, WarehouseStructure } from "./Warehouse";

export interface Coords3 {
	x: number;
	y: number;
	z: number;
}

export interface DeviceLayout {
	[key: number]: [Coords3];
}

export interface DummyDevice {
	id: number;
	x: number;
	y: number;
	z: number;
}

// Internal
interface BucketIdentifier {
	width: number;
	height: number;
	depth: number;
}

export class BucketFactory {
	private readonly sentArrowsHolder: THREE.Object3D;
	private readonly recvArrowsHolder: THREE.Object3D;

	private readonly material = new THREE.MeshPhongMaterial({ color: 0x151226 });
	private readonly deviceMaterial = new THREE.MeshPhongMaterial({ color: 0xcc3204 });
	private readonly dummyDeviceMaterial = new THREE.MeshPhongMaterial({ color: 0x2e4057 });

	private readonly geometries: Map<BucketIdentifier, THREE.BufferGeometry> = new Map();
	private readonly deviceGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.025);

	public readonly devices: Map<number, Device> = new Map();

	private readonly sceneManager: SceneManager;

	constructor(sceneManager: SceneManager) {
		this.sceneManager = sceneManager;

		this.sentArrowsHolder = new THREE.Group();
		this.sentArrowsHolder.name = "sent-arrows-holder";
		sceneManager.scene.add(this.sentArrowsHolder);

		this.recvArrowsHolder = new THREE.Group();
		this.recvArrowsHolder.name = "recv-arrows-holder";
		sceneManager.scene.add(this.recvArrowsHolder);
	}

	public getDeviceLayout(): DeviceLayout {
		const layout: DeviceLayout = {};

		for (const device of this.devices.values()) {
			const pos = device.getPosition();
			layout[device.getId()] = [
				{
					x: Math.round(pos.getComponent(0) * 1000),
					y: Math.round(pos.getComponent(1) * 1000),
					z: Math.round(pos.getComponent(2) * 1000),
				},
			];
		}

		return layout;
	}

	public renderSentArrows(msgs: SentMessages) {
		for (const [id, targets] of Object.entries(msgs) as [string, SentMessage[]][]) {
			const origin = this.devices.get(Number(id));
			if (origin === undefined) continue;

			for (const t of targets) {
				const dest = this.devices.get(Number(t.hop));
				if (dest === undefined) continue;

				origin.arrowTo(dest, this.sentArrowsHolder, ArrowType.neutral);
			}
		}

		this.sceneManager.invalidate();
	}

	// TODO: Probably has memory leak
	public clearRenderedSentArrows() {
		const arr = this.sentArrowsHolder.children;
		const len = arr.length;
		for (let i = 0; i < len; i++) {
			const mesh = arr[0] as THREE.Mesh;
			mesh.removeFromParent();
			mesh.geometry.dispose();
		}

		this.sceneManager.invalidate();
	}

	public renderRecvArrows(msgs: RecvMessages) {
		for (const [id, targets] of Object.entries(msgs) as [string, RecvMessage[]][]) {
			const origin = this.devices.get(Number(id));
			if (origin === undefined) continue;

			for (const t of targets) {
				const dest = this.devices.get(Number(t.hop));
				if (dest === undefined) continue;

				let type: ArrowType;
				if (t.failed) {
					type = ArrowType.fail;
				} else if (t.hop == t.final) {
					type = ArrowType.final;
				} else {
					type = ArrowType.hop;
				}

				origin.arrowTo(dest, this.recvArrowsHolder, type);
			}
		}

		this.sceneManager.invalidate();
	}

	// TODO: Probably has memory leak
	public clearRenderedRecvArrows() {
		const arr = this.recvArrowsHolder.children;
		const len = arr.length;
		for (let i = 0; i < len; i++) {
			const mesh = arr[0] as THREE.Mesh;
			mesh.removeFromParent();
			mesh.geometry.dispose();
		}

		this.sceneManager.invalidate();
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

	public addDummyDevice(config: DummyDevice, dim: WarehouseDimensions, obj: THREE.Object3D) {
		// DEVICE
		const device = new THREE.Mesh(this.deviceGeometry, this.dummyDeviceMaterial);
		device.name = "Dummy  " + config.id;
		obj.add(device);

		device.translateX(config.x - dim.width / 2);
		device.translateY(config.y);
		device.translateZ(config.z - dim.depth / 2);

		this.devices.set(config.id, new Device(config.id, device));
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

	public addOrchestrator(pos: Coords3, dim: WarehouseDimensions, obj: THREE.Object3D) {
		const radius = 0.1;
		const widthSegments = 6;
		const heightSegments = 3;
		const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
		const thresholdAngle = 1; // ui: thresholdAngle
		const edges = new THREE.EdgesGeometry(sphereGeometry, thresholdAngle);
		const orchestrator = new THREE.LineSegments(
			edges,
			new THREE.LineBasicMaterial({ color: 0xffffff })
		);
		orchestrator.name = "Orchestrator";
		orchestrator.translateX(pos.x - dim.width / 2);
		orchestrator.translateY(pos.y);
		orchestrator.translateZ(pos.z - dim.depth / 2);

		obj.add(orchestrator);

		this.devices.set(0, new Device(0, orchestrator));
	}

	private generateBucket(identifier: BucketIdentifier): THREE.BufferGeometry {
		const bucket = new THREE.BoxGeometry(identifier.width, identifier.height, identifier.depth);
		bucket.translate(0, identifier.height / 2, -identifier.depth / 2);

		return bucket;
	}
}
