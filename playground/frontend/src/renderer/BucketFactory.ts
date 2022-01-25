import * as THREE from "three";
import { ArrowType, Device, RecvMessages, RecvMessage, SentMessage, SentMessages } from "./Device";
import { BucketConfig, RackFactory } from "./RackFactory";
import SceneManager from "./SceneManager";
import { WarehouseStructure } from "./Warehouse";

export interface Coords3 {
	x: number,
	y: number,
	z: number
}

export interface DeviceLayout {
	[key: number]: [Coords3]
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

	private readonly material: THREE.Material;
	private readonly deviceMaterial: THREE.Material;

	private readonly geometries: Map<BucketIdentifier, THREE.BufferGeometry> = new Map();
	private readonly deviceGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.025);

	public readonly devices: Map<number, Device> = new Map();

	constructor(sceneManager: SceneManager) {
		this.sentArrowsHolder = new THREE.Group();
		this.sentArrowsHolder.name = "sent-arrows-holder";
		sceneManager.scene.add(this.sentArrowsHolder);

		this.recvArrowsHolder = new THREE.Group();
		this.recvArrowsHolder.name = "recv-arrows-holder";
		sceneManager.scene.add(this.recvArrowsHolder);

		this.geometries = new Map();

		// 0x606c2e
		this.material = new THREE.MeshPhongMaterial({ color: 0x151226 });
		this.deviceMaterial = new THREE.MeshPhongMaterial({ color: 0xcc3204 });
	}

	public getDeviceLayout(): DeviceLayout {
		const layout: DeviceLayout = {};

		for (const device of this.devices.values()) {
			const pos = device.getPosition();
			layout[device.getId()] = [{
				x: pos.getComponent(0),
				y: pos.getComponent(1),
				z: pos.getComponent(2)
			}];
		}
		
		return layout;
	}

	public renderSentArrows(msgs: SentMessages) {
		for (const [id, targets] of Object.entries(msgs) as [string, SentMessage[]][]) {
			const origin = this.devices.get(Number(id));
			if (origin === undefined)
				continue;

			for (const t of targets) {
				const dest = this.devices.get(Number(t.hop));
				if (dest === undefined)
					continue;
				
				origin.arrowTo(dest, this.sentArrowsHolder, ArrowType.neutral);
			}
		}
	}

	public clearRenderedSentArrows() {
		for (const arrow of this.sentArrowsHolder.children as THREE.Mesh[]) {
			arrow.removeFromParent();
			arrow.geometry.dispose();
		}
	}

	public renderRecvArrows(msgs: RecvMessages) {
		for (const [id, targets] of Object.entries(msgs) as [string, RecvMessage[]][]) {
			const origin = this.devices.get(Number(id));
			if (origin === undefined)
				continue;

			for (const t of targets) {
				const dest = this.devices.get(Number(t.hop));
				if (dest === undefined)
					continue;
				
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
	}

	public clearRenderedRecvArrows() {
		for (const arrow of this.recvArrowsHolder.children as THREE.Mesh[]) {
			arrow.removeFromParent();
			arrow.geometry.dispose();
		}
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

	public addOrchestrator(pos: Coords3, obj: THREE.Object3D) {
		const radius = 0.1;
		const widthSegments = 6;
		const heightSegments = 3;
		const sphereGeometry = new THREE.SphereGeometry(
			radius, widthSegments, heightSegments);
		const thresholdAngle = 1;  // ui: thresholdAngle
		const edges = new THREE.EdgesGeometry(sphereGeometry, thresholdAngle);
		const orchestrator = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
		orchestrator.name = 'Orchestrator';
		orchestrator.translateX(pos.x);
		orchestrator.translateY(pos.y);
		orchestrator.translateZ(pos.z);

		obj.add(orchestrator);

		this.devices.set(0, new Device(0, orchestrator));
	}

	private generateBucket(identifier: BucketIdentifier): THREE.BufferGeometry {
		const bucket = new THREE.BoxGeometry(identifier.width, identifier.height, identifier.depth);
		bucket.translate(0, identifier.height / 2, -identifier.depth / 2);

		return bucket;
	}
}
