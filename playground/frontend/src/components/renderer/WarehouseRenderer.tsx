import React, { Component } from "react";
import SceneManager from "./SceneManager";
import Stats from "./Stats";

class WarehouseRenderer extends Component {
	private container?: HTMLDivElement;

	private requestID: number = 0;

	private sceneManager!: SceneManager;
	private stats?: Stats;

	componentDidMount() {
		this.stats = new Stats();
		this.container?.appendChild(this.stats.dom);

		this.sceneSetup();
		this.startAnimationLoop();
		window.addEventListener("resize", this.handleResize);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.handleResize);
		this.cancelAnimationLoop();
		this.sceneManager.dispose();
	}

	sceneSetup = () => {
		// get container dimensions and use them for scene sizing
		const width = this.container?.clientWidth ?? 100;
		const height = this.container?.clientHeight ?? 100; // TODO: Can I remove these bastards?

		this.sceneManager = new SceneManager(this.container, width, height, true);

		this.container?.appendChild(this.sceneManager.renderer.domElement); // mount using React ref
	};

	startAnimationLoop = () => {
		this.stats?.update();

		this.sceneManager.render();

		// The window.requestAnimationFrame() method tells the browser that you wish to perform
		// an animation and requests that the browser call a specified function
		// to update an animation before the next repaint
		this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
	};

	cancelAnimationLoop = () => {
		window.cancelAnimationFrame(this.requestID);
	};

	handleResize = () => {
		const width = this.container?.clientWidth ?? 100;
		const height = this.container?.clientHeight ?? 100; // TODO: Can I remove these bastards?

		this.sceneManager.resize(width, height);
	};

	render() {
		return <div id="warehouse-renderer" ref={(ref) => (this.container = ref != null ? ref : undefined)} />;
	}
}

export default WarehouseRenderer;
