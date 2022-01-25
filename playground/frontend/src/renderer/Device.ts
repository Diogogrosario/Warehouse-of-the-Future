import * as THREE from "three";

export class Device {
	private readonly id: number;

	public readonly device: THREE.Object3D;

	private static readonly controlPointDistance = 0.5;

	private static readonly successColor = 0x00ff00;
	private static readonly failColor = 0xff0000;

	private static readonly coneHeight = 0.1;
	private static readonly cone = Device.genCone();

	private static readonly coneSuccessMaterial = new THREE.MeshLambertMaterial({
		color: Device.successColor,
	});
	private static readonly coneFailMaterial = new THREE.MeshLambertMaterial({
		color: Device.failColor,
	});

	private static readonly arrowSuccessMaterial = new THREE.LineBasicMaterial({
		color: Device.successColor,
		linewidth: 2,
	});
	private static readonly arrowFailMaterial = new THREE.LineBasicMaterial({
		color: Device.failColor,
		linewidth: 2,
	});

	constructor(id: number, device: THREE.Object3D) {
		this.id = id;
		this.device = device;
	}

	private static genCone(): THREE.ConeGeometry {
		const cone = new THREE.ConeGeometry(0.025, Device.coneHeight);
		cone.translate(0, Device.coneHeight / 2 - 0.025 / 2, 0);

		cone.rotateX(Math.PI / 2);

		return cone;
	}

	public getPosition() {
		const position = new THREE.Vector3();
		this.device.getWorldPosition(position);

		return position;
	}

	public arrowTo(d: Device, scene: THREE.Object3D, failed = false) {
		const from = this.getPosition();
		const fromDir = new THREE.Vector3();
		this.device.getWorldDirection(fromDir);
		fromDir.multiplyScalar(Device.controlPointDistance).add(from);

		const to = d.getPosition();
		const toDir = new THREE.Vector3();
		d.device.getWorldDirection(toDir);
		toDir.multiplyScalar(Device.controlPointDistance).add(to);

		const curve = new THREE.CubicBezierCurve3(from, fromDir, toDir, to);

		// render more points when points are further away
		const noPoints = Math.max(40, from.distanceTo(to) * 15);

		const allPoints = curve.getPoints(noPoints);
		// Remove points too close to destination that will be represented by the arrow
		const points: THREE.Vector3[] = [];
		for (const p of allPoints) {
			if (p.distanceTo(to) > Device.coneHeight * 0.9) {
				points.push(p);
			}
		}
		const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

		// Create the final object to add to the scene
		const arrow = new THREE.Line(
			lineGeo,
			failed ? Device.arrowFailMaterial : Device.arrowSuccessMaterial
		);
		scene.add(arrow);

		const coneMesh = new THREE.Mesh(
			Device.cone,
			failed ? Device.coneFailMaterial : Device.coneSuccessMaterial
		);
		scene.add(coneMesh);

		const curvePointForArrow = 1 - Device.coneHeight / curve.getLength();
		const conePos = curve.getPointAt(curvePointForArrow);

		coneMesh.translateX(conePos.getComponent(0));
		coneMesh.translateY(conePos.getComponent(1));
		coneMesh.translateZ(conePos.getComponent(2));

		coneMesh.lookAt(to);
	}
}
