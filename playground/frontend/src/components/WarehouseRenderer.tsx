import React, { Component } from "react";

import SceneManager from "../renderer/SceneManager";
import Stats from "../renderer/Stats";

interface WarehouseRendererProps {
	background?: string;
	fpsCounter?: boolean;
}

class WarehouseRenderer extends Component<WarehouseRendererProps> {
	private container?: HTMLDivElement;

	private requestID = 0;

	private sceneManager!: SceneManager;
	private stats?: Stats;

	private width = 0;
	private height = 0;
	private needsResize = false;

	static defaultProps: Partial<WarehouseRendererProps> = {
		background: "#ffffff",
		fpsCounter: false,
	};

	constructor(props: WarehouseRendererProps) {
		super(props);
	}

	componentDidMount() {
		if (this.props.fpsCounter) {
			this.stats = new Stats();
			this.container?.appendChild(this.stats.dom);
		}

		this.sceneSetup();
		if (this.props.background) this.sceneManager.updateBackgroundColor(this.props.background);
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

	componentDidUpdate(prevProps: WarehouseRendererProps) {
		if (this.props.background !== prevProps.background && this.props.background)
			this.sceneManager.updateBackgroundColor(this.props.background);

		if (this.props.fpsCounter !== prevProps.fpsCounter) {
			if (this.props.fpsCounter) {
				if (this.stats === undefined) {
					this.stats = new Stats();
				}
				this.container?.appendChild(this.stats.dom);
			} else if (this.stats) {
				this.container?.removeChild(this.stats.dom);
			}
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
