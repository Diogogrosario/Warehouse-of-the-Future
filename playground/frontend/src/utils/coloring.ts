function hextoRGBA(hex: string): [number, number, number, number] {
	const rgba = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{2})?$/i.exec(hex);

	const r = parseInt(rgba?.[1] ?? "00", 16),
		g = parseInt(rgba?.[2] ?? "00", 16),
		b = parseInt(rgba?.[3] ?? "00", 16),
		alpha = parseInt(rgba?.[4] ?? "00", 16);

	return [r, g, b, alpha];
}

function hexToHSLA(hex: string): [number, number, number, number] {
	let [r, g, b, alpha] = hextoRGBA(hex);

	(r /= 255), (g /= 255), (b /= 255), (alpha /= 255);
	const max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	let hue,
		sat,
		lightness = (max + min) / 2;

	if (max == min) {
		hue = sat = 0;
	} else {
		const delta = max - min;
		sat = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
		switch (max) {
			case r:
				hue = (g - b) / delta + (g < b ? 6 : 0);
				break;
			case g:
				hue = (b - r) / delta + 2;
				break;
			case b:
				hue = (r - g) / delta + 4;
				break;
			default:
				hue = 0;
		}
		hue /= 6;
	}

	sat = Math.round(sat * 100);
	lightness = Math.round(lightness * 100);
	hue = Math.round(hue * 360);

	return [hue, sat, lightness, alpha];
}

function rgba(hex: string, alpha: number): string {
	const rgba = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{2})?$/i.exec(hex);

	const r = parseInt(rgba?.[1] ?? "00", 16),
		g = parseInt(rgba?.[2] ?? "00", 16),
		b = parseInt(rgba?.[3] ?? "00", 16);

	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const Coloring = {
	hextoRGBA,
	hexToHSLA,
	rgba,
};

export default Coloring;
