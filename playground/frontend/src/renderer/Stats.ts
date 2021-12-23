// Code adapted from https://github.com/mrdoob/three.js/blob/dev/examples/jsm/libs/stats.module.js

class StatsPanel {
	readonly PR: number;
	readonly WIDTH: number;
	readonly HEIGHT: number;
	readonly TEXT_X: number;
	readonly TEXT_Y: number;
	readonly GRAPH_X: number;
	readonly GRAPH_Y: number;
	readonly GRAPH_WIDTH: number;
	readonly GRAPH_HEIGHT: number;

	public dom: HTMLCanvasElement;

	readonly name: string;
	readonly fg: string;
	readonly bg: string;

	private min: number;
	private max: number;

	readonly context: CanvasRenderingContext2D | null;
	readonly canvas: HTMLCanvasElement;

	constructor(name: string, fg: string, bg: string) {
		this.name = name;
		this.fg = fg;
		this.bg = bg;

		this.min = Infinity;
		this.max = 0;

		this.PR = Math.round(window.devicePixelRatio || 1);
		this.WIDTH = 80 * this.PR;
		this.HEIGHT = 48 * this.PR;
		this.TEXT_X = 3 * this.PR;
		this.TEXT_Y = 2 * this.PR;
		this.GRAPH_X = 3 * this.PR;
		this.GRAPH_Y = 15 * this.PR;
		this.GRAPH_WIDTH = 74 * this.PR;
		this.GRAPH_HEIGHT = 30 * this.PR;

		this.canvas = document.createElement("canvas");
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
		this.canvas.style.cssText = "width:80px;height:48px";
		this.dom = this.canvas;

		this.context = this.canvas.getContext("2d");
		if (this.context) {
			this.context.font = "bold " + 9 * this.PR + "px Helvetica,Arial,sans-serif";
			this.context.textBaseline = "top";

			this.context.fillStyle = bg;
			this.context.fillRect(0, 0, this.WIDTH, this.HEIGHT);

			this.context.fillStyle = fg;
			this.context.fillText(name, this.TEXT_X, this.TEXT_Y);
			this.context.fillRect(this.GRAPH_X, this.GRAPH_Y, this.GRAPH_WIDTH, this.GRAPH_HEIGHT);

			this.context.fillStyle = bg;
			this.context.globalAlpha = 0.9;
			this.context.fillRect(this.GRAPH_X, this.GRAPH_Y, this.GRAPH_WIDTH, this.GRAPH_HEIGHT);
		}
	}

	public update(value: number, maxValue: number) {
		this.min = Math.min(this.min, value);
		this.max = Math.max(this.max, value);

		if (this.context) {
			this.context.fillStyle = this.bg;
			this.context.globalAlpha = 1;
			this.context.fillRect(0, 0, this.WIDTH, this.GRAPH_Y);
			this.context.fillStyle = this.fg;
			this.context.fillText(
				Math.round(value) +
					" " +
					name +
					" (" +
					Math.round(this.min) +
					"-" +
					Math.round(this.max) +
					")",
				this.TEXT_X,
				this.TEXT_Y
			);

			this.context.drawImage(
				this.canvas,
				this.GRAPH_X + this.PR,
				this.GRAPH_Y,
				this.GRAPH_WIDTH - this.PR,
				this.GRAPH_HEIGHT,
				this.GRAPH_X,
				this.GRAPH_Y,
				this.GRAPH_WIDTH - this.PR,
				this.GRAPH_HEIGHT
			);

			this.context.fillRect(
				this.GRAPH_X + this.GRAPH_WIDTH - this.PR,
				this.GRAPH_Y,
				this.PR,
				this.GRAPH_HEIGHT
			);

			this.context.fillStyle = this.bg;
			this.context.globalAlpha = 0.9;
			this.context.fillRect(
				this.GRAPH_X + this.GRAPH_WIDTH - this.PR,
				this.GRAPH_Y,
				this.PR,
				Math.round((1 - value / maxValue) * this.GRAPH_HEIGHT)
			);
		}
	}
}

class Stats {
	public dom: HTMLDivElement;
	public domElement: HTMLDivElement;
	private container: HTMLDivElement;

	private mode: number;

	private beginTime: number;
	private prevTime: number;
	private frames: number;

	readonly fpsPanel: StatsPanel;
	readonly msPanel: StatsPanel;
	readonly memPanel?: StatsPanel;

	constructor() {
		this.mode = 0;

		this.container = document.createElement("div");
		this.domElement = this.container;
		this.dom = this.container;
		this.container.style.cssText =
			"position:absolute;top:0;left:0;cursor:pointer;opacity:0.8;z-index:10000";
		this.container.addEventListener(
			"click",
			(event) => {
				event.preventDefault();
				this.showPanel(++this.mode % this.container.children.length);
			},
			false
		);

		this.beginTime = (performance || Date).now();
		this.prevTime = this.beginTime;
		this.frames = 0;

		this.fpsPanel = this.addPanel(new StatsPanel("FPS", "#0ff", "#002"));
		this.msPanel = this.addPanel(new StatsPanel("MS", "#0f0", "#020"));

		// MDN says it should not be used: https://github.com/microsoft/TypeScript/issues/33155
		// if ( self.performance && self.performance.memory ) {
		// 	this.memPanel = this.addPanel( new StatsPanel( 'MB', '#f08', '#201' ) );
		// }

		this.showPanel(0);
	}

	private addPanel(panel: StatsPanel): StatsPanel {
		this.container.appendChild(panel.dom);
		return panel;
	}

	private showPanel(id: number) {
		for (let i = 0; i < this.container.children.length; i++) {
			const child = this.container.children[i] as HTMLElement;
			child.style.display = i === id ? "block" : "none";
		}

		this.mode = id;
	}

	public setMode(id: number) {
		this.showPanel(id);
	}

	public begin() {
		this.beginTime = (performance || Date).now();
	}

	public end(): number {
		this.frames++;

		const time = (performance || Date).now();

		this.msPanel.update(time - this.beginTime, 200);

		if (time >= this.prevTime + 1000) {
			this.fpsPanel.update((this.frames * 1000) / (time - this.prevTime), 100);

			this.prevTime = time;
			this.frames = 0;

			// MDN says it should not be used: https://github.com/microsoft/TypeScript/issues/33155
			// if ( this.memPanel ) {
			// 	var memory = performance.memory;
			// 	this.memPanel?.update( memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576 );
			// }
		}

		return time;
	}

	public update() {
		this.beginTime = this.end();
	}
}

export default Stats;
