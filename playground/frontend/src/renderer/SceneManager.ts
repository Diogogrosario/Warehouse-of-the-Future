import * as THREE from "three";
import CameraControls from "camera-controls";

import { WarehouseStructure } from "./WarehouseStructure";

CameraControls.install({ THREE: THREE });

export default class SceneManager {
	public scene: THREE.Scene;
	public renderer: THREE.Renderer;

	public camera: THREE.PerspectiveCamera;
	private cameraControls?: CameraControls;

	private clock = new THREE.Clock();

	private width: number;
	private height: number;

	private invalidFrame = true;

	constructor(container: HTMLElement | undefined, width: number, height: number) {
		this.width = width;
		this.height = height;

		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0xffffff);

		this.camera = new THREE.PerspectiveCamera(
			75, // fov = field of view
			width / height, // aspect ratio
			0.1, // near plane
			1000 // far plane
		);
		this.camera.position.x = 5;
		this.camera.position.y = 5;
		this.camera.position.z = 5;

		// OrbitControls allow a camera to orbit around the object
		if (container) this.cameraControls = new CameraControls(this.camera, container);
		this.cameraControls?.setTarget(0, 2, 0);

		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setSize(width, height);

		this.renderer.domElement.setAttribute("tabIndex", "0");

		this.renderer.domElement.style.touchAction = "none";
		this.renderer.domElement.addEventListener("touchmove", function (event: Event) {
			event.stopPropagation();
			event.preventDefault();
		});

		this.addCustomSceneObjects();
		this.addLighting();
		this.addAxes();
	}

	public render() {
		const delta = this.clock.getDelta();
		const controlsUpdated = this.cameraControls?.update(delta);

		if (this.invalidFrame || controlsUpdated) {
			this.renderer?.render(this.scene, this.camera);
			this.invalidFrame = false;
		}
	}

	public dispose() {
		this.cameraControls?.dispose();
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

	// The X axis is red. The Y axis is green. The Z axis is blue.
	private addAxes() {
		const axesHelper = new THREE.AxesHelper(5);
		this.scene.add(axesHelper);
	}

	private addCustomSceneObjects() {
		const whStructure = new WarehouseStructure(this);
		this.scene.add(whStructure.getObject());
	}

	private addLighting() {
		const color = 0xffffff;
		const light = new THREE.AmbientLight(color, 1);
		this.scene.add(light);

		const rectLight = new THREE.SpotLight();
		rectLight.angle = Math.PI / 2;
		rectLight.position.set(0, 40, 0);
		rectLight.lookAt(0, 0, 0);
		this.scene.add(rectLight);
	}
}
