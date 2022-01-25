export class SpaceEvenly {
	private positions: number[];

	constructor(available: number, widths: number[]) {
		const occupied = widths.reduce((a, b) => a + b);
		const spacing = (available - occupied) / (widths.length + 1);

		this.positions = [];
		let cur = spacing;
		for (const w of widths) {
			this.positions.push(cur + w / 2);
			cur += w + spacing;
		}
	}

	public position(index: number): number {
		return this.positions[index];
	}
}
