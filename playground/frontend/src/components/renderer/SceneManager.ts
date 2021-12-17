import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class SceneManager {
	public scene: THREE.Scene;
	public renderer: THREE.Renderer;

	public camera: THREE.PerspectiveCamera;
	private controls: OrbitControls;

	private width: number;
	private height: number;

	private invalidFrame: boolean = true;

	private cube!: THREE.Mesh;
	private ground!: THREE.Mesh;

	constructor(
		container: HTMLElement | undefined,
		width: number,
		height: number,
		showStats: boolean = false
	) {
		this.width = width;
		this.height = height;

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(
			75, // fov = field of view
			width / height, // aspect ratio
			0.1, // near plane
			1000 // far plane
		);
		this.camera.position.z = 5; // is used here to set some distance from a cube that is located at z = 0

		// OrbitControls allow a camera to orbit around the object
		// https://threejs.org/docs/#examples/controls/OrbitControls
		this.controls = new OrbitControls(this.camera, container);
		this.controls.enableDamping = true;
		this.controls.dampingFactor = 0.95;

		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setSize(width, height);

		this.addCustomSceneObjects();
	}

	public render() {
		this.invalidFrame = this.invalidFrame || this.controls.update();

		if (this.invalidFrame) {
			this.renderer?.render(this.scene, this.camera);
			this.invalidFrame = false;
		}
	}

	public dispose() {
		this.controls.dispose();
	}

	public resize(width: number, height: number) {
		if (this.width == width && this.height == height) return;

		this.width = width;
		this.height = height;

		this.renderer.setSize(width, height);
		this.camera.aspect = width / height;

		// Note that after making changes to most of camera properties you have to call
		// .updateProjectionMatrix for the changes to take effect.
		this.camera.updateProjectionMatrix();

		this.invalidate();
	}

	public invalidate() {
		this.invalidFrame = true;
	}

	// Here should come custom code.
	// Code below is taken from Three.js BoxGeometry example
	// https://threejs.org/docs/#api/en/geometries/BoxGeometry
	addCustomSceneObjects = () => {
		const geometry = new THREE.BoxGeometry(2, 2, 2);
		const material = new THREE.MeshPhongMaterial({
			color: 0x156289,
			emissive: 0x072534,
			flatShading: true,
			side: THREE.DoubleSide,
		});

		const loader = new THREE.TextureLoader();
		const testmapMaterial = new THREE.MeshBasicMaterial({
			map: loader.load("textures/testmap.jpg", (onload = this.invalidate.bind(this))),
		});
		const planeGeometry = new THREE.PlaneGeometry(4, 4, 2, 2);
		this.ground = new THREE.Mesh(planeGeometry, testmapMaterial);
		this.scene.add(this.ground);

		this.cube = new THREE.Mesh(geometry, testmapMaterial);
		this.scene.add(this.cube);

		const rectLight = new THREE.RectAreaLight(0xffffff, 1, 50, 50);
		rectLight.position.set(5, 5, 0);
		rectLight.lookAt(0, 0, 0);

		const light = new THREE.DirectionalLight(0xffffff);
		light.position.set(0, 5, 0);
		this.scene.add(light);
		const helper = new THREE.DirectionalLightHelper(light, 5);
		this.scene.add(helper);
	};
}

export default SceneManager;
