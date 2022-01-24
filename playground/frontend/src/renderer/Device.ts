import * as THREE from "three"

export class Device {

    private readonly id;
    private readonly mesh: THREE.Mesh;

    constructor(id: number, mesh: THREE.Mesh) {
        this.id = id;
        this.mesh = mesh;
    }
}