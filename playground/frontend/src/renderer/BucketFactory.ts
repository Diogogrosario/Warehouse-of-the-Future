import * as THREE from "three";
import SceneManager from "./SceneManager";


// Internal
interface BucketIdentifier {
	width: number;
	height: number;
	depth: number;
}

export class BucketFactory {
	private readonly sceneManager;

	private readonly material: THREE.Material;

	private readonly geometries: Map<BucketIdentifier, THREE.BufferGeometry> = new Map();

	constructor(sceneManager: SceneManager) {
		this.sceneManager = sceneManager;

		this.geometries = new Map();

		// 0x606c2e
		this.material = new THREE.MeshPhongMaterial({ color: 0x151226 });
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

	private generateBucket(identifier: BucketIdentifier): THREE.BufferGeometry {
		return new THREE.BoxGeometry(identifier.width, identifier.height, identifier.depth);
	}
}
