import React, { Component } from "react";
import SceneManager from "../renderer/SceneManager";
import Stats from "../renderer/Stats";

class WarehouseRenderer extends Component {
	private container?: HTMLDivElement;

	private requestID = 0;

	private sceneManager!: SceneManager;
	private stats?: Stats;

	private width = 0;
	private height = 0;
	private needsResize = false;

	componentDidMount() {
		this.stats = new Stats();
		this.container?.appendChild(this.stats.dom);

		this.sceneSetup();
		this.startAnimationLoop();

		if (this.container) {
			const ro = new ResizeObserver((entries) => {
				for (const entry of entries) {
					const cr = entry.contentRect;
					// Mark for resize
					this.width = cr.width;
					this.height = cr.height;
					this.needsResize = true;
				}
			});

			// Observe contaienr
			ro.observe(this.container);
		}
	}

	componentWillUnmount() {
		this.cancelAnimationLoop();
		this.sceneManager.dispose();
	}

	private sceneSetup() {
		// get container dimensions and use them for scene sizing
		this.sceneManager = new SceneManager(this.container, this.width, this.height);
		this.container?.appendChild(this.sceneManager.renderer.domElement);
	}

	animationLoop = () => {
		this.startAnimationLoop();
	};

	private startAnimationLoop() {
		this.stats?.update();

		if (this.needsResize) {
			this.resize();
			this.needsResize = false;
		}

		this.sceneManager.render();

		// The window.requestAnimationFrame() method tells the browser that you wish to perform
		// an animation and requests that the browser call a specified function
		// to update an animation before the next repaint
		this.requestID = window.requestAnimationFrame(this.animationLoop);
	}

	private cancelAnimationLoop() {
		window.cancelAnimationFrame(this.requestID);
	}

	private resize() {
		this.sceneManager.resize(this.width, this.height);
	}

	public render() {
		return (
			<div
				style={{
					flexGrow: 1,
					height: "100%",
					width: "100%",
					/* overflow: "hidden"; */
					display: "block",
					position: "relative",
				}}
				ref={(ref) => (this.container = ref ?? undefined)}
			/>
		);
	}
}

export default WarehouseRenderer;
