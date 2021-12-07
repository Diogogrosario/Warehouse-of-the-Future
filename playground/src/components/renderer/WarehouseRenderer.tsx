import React, { Component, CSSProperties } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class WarehouseRenderer extends Component {

    private el: HTMLDivElement | undefined;

    private camera!: THREE.PerspectiveCamera;
    private controls!: OrbitControls;
    private scene!: THREE.Scene;
    private renderer!: THREE.WebGLRenderer;
    
    private requestID: number = 0;

    private cube!: THREE.Mesh;
    private ground!: THREE.Mesh;

  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    this.cancelAnimationLoop();
    this.controls.dispose();
  }

  // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
  // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
  sceneSetup = () => {
    // get container dimensions and use them for scene sizing
    const width = this.el?.clientWidth ?? 100;
    const height = this.el?.clientHeight ?? 100;  // TODO: Can I remove these bastards?

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
    this.controls = new OrbitControls(this.camera, this.el);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.el?.appendChild(this.renderer.domElement); // mount using React ref
  };

  // Here should come custom code.
  // Code below is taken from Three.js BoxGeometry example
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry
  addCustomSceneObjects = () => {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      flatShading: true,
      side: THREE.DoubleSide
    });

    const loader = new THREE.TextureLoader();
    const testmapMaterial = new THREE.MeshBasicMaterial({
      map: loader.load('images/testmap.jpg')
    });
    const planeGeometry = new THREE.PlaneGeometry(4, 4, 2, 2);
    this.ground = new THREE.Mesh(planeGeometry, testmapMaterial);
    this.scene.add(this.ground);

    this.cube = new THREE.Mesh(geometry, testmapMaterial);
    this.scene.add(this.cube);

    const rectLight = new THREE.RectAreaLight(0xffffff, 1, 50, 50);
    rectLight.position.set( 5, 5, 0 );
    rectLight.lookAt( 0, 0, 0 );

    const light = new THREE.DirectionalLight( 0xFFFFFF );
    light.position.set( 0, 5, 0 );
    this.scene.add( light );
    const helper = new THREE.DirectionalLightHelper( light, 5 );
    this.scene.add( helper );
  };

  startAnimationLoop = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer?.render(this.scene, this.camera);

    // The window.requestAnimationFrame() method tells the browser that you wish to perform
    // an animation and requests that the browser call a specified function
    // to update an animation before the next repaint
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  cancelAnimationLoop = () => {
    window.cancelAnimationFrame(this.requestID);
  }

  handleResize = () => {
    const width = this.el?.clientWidth ?? 100;
    const height = this.el?.clientHeight ?? 100;  // TODO: Can I remove these bastards? 

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    this.camera.updateProjectionMatrix();
  };

  render() {
    return <div id='warehouse-renderer' ref={ref => (this.el = ref ?? undefined)} />;
  }
}

export default WarehouseRenderer;
