import * as THREE from "three";
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
					bucket.width *= 0.9;
				}
			}
		}
	}


	public addBucketToExistingMesh(width: number, depth: number, height: number, mesh: THREE.Mesh) {
		const identifier = {
			width: width,
			depth: depth,
			height: height
		}

		let geometry = this.geometries.get(identifier);
		if (!geometry) {
			geometry = this.generateBucket(identifier);
		}

		mesh.geometry = geometry;
		mesh.material = this.material;
	}

	public addDeviceToExistingMesh(width: number, depth: number, height: number, mesh: THREE.Mesh){
		const identifier = {
			width: width,
			depth: depth,
			height: height
		}

		let geometry = this.geometries.get(identifier);
		if (!geometry) {
			geometry = this.generateDevice(identifier);
		}

		mesh.geometry = geometry;
		mesh.material = this.deviceMaterial;
	}

	private generateDevice(identifier: BucketIdentifier): THREE.BufferGeometry {
		return new THREE.BoxGeometry(identifier.width, identifier.height, identifier.depth);
	}

	private generateBucket(identifier: BucketIdentifier): THREE.BufferGeometry {
		const bucket = new THREE.BoxGeometry(identifier.width, identifier.height, identifier.depth);
		bucket.translate(0, identifier.height / 2, 0);

		return bucket;
	}
}
