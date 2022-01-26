import * as THREE from "three";

export enum ArrowType {
	neutral = "neutral",
	hop = "hop",
	final = "final",
	fail = "fail",
}

export class Device {
	private readonly id: number;

	public readonly device: THREE.Object3D;

	private static readonly controlPointDistance = 0.5;

	private static readonly neutralColor = 0x696969;
	private static readonly hopColor = 0x08a4bd;
	private static readonly finalColor = 0x1db933;
	private static readonly failColor = 0x931f1d;

	private static readonly coneHeight = 0.1;
	private static readonly cone = Device.genCone();

	private static readonly coneMaterials = {
		neutral: new THREE.MeshLambertMaterial({
			color: Device.neutralColor,
		}),
		hop: new THREE.MeshLambertMaterial({
			color: Device.hopColor,
		}),
		final: new THREE.MeshLambertMaterial({
			color: Device.finalColor,
		}),
		fail: new THREE.MeshLambertMaterial({
			color: Device.failColor,
		}),
	};

	private static readonly arrowMaterials = {
		neutral: new THREE.LineDashedMaterial({
			color: Device.neutralColor,
			linewidth: 2,
			dashSize: 0.03,
			gapSize: 0.01,
		}),
		hop: new THREE.LineBasicMaterial({
			color: Device.hopColor,
			linewidth: 2,
		}),
		final: new THREE.LineBasicMaterial({
			color: Device.finalColor,
			linewidth: 2,
		}),
		fail: new THREE.LineBasicMaterial({
			color: Device.failColor,
			linewidth: 2,
		}),
	};

	constructor(id: number, device: THREE.Object3D) {
		this.id = id;
		this.device = device;
	}

	public getId() {
		return this.id;
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

	public arrowTo(d: Device, scene: THREE.Object3D, type = ArrowType.neutral) {
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

		const arrowMat = Device.arrowMaterials[type];
		// Create the final object to add to the scene
		const arrow = new THREE.Line(lineGeo, arrowMat);
		arrow.computeLineDistances();
		arrow.name = `arrow-${this.id}-${d.id}`;
		scene.add(arrow);

		const coneMat = Device.coneMaterials[type];
		const coneMesh = new THREE.Mesh(Device.cone, coneMat);
		arrow.name = `arrowhead-${this.id}-${d.id}`;
		scene.add(coneMesh);

		const curvePointForArrow = 1 - Device.coneHeight / curve.getLength();
		const conePos = curve.getPointAt(curvePointForArrow);

		coneMesh.translateX(conePos.getComponent(0));
		coneMesh.translateY(conePos.getComponent(1));
		coneMesh.translateZ(conePos.getComponent(2));

		coneMesh.lookAt(to);
	}
}
