import * as THREE from "three";

export function dumpObject(
	obj: THREE.Object3D,
	lines: string[] = [],
	isLast = true,
	prefix = ""
): string[] {
	const localPrefix = isLast ? "└─" : "├─";
	lines.push(`${prefix}${prefix ? localPrefix : ""}${obj.name || "*no-name*"} [${obj.type}]`);
	const newPrefix = prefix + (isLast ? "  " : "│ ");
	const lastNdx = obj.children.length - 1;
	obj.children.forEach((child: THREE.Object3D, ndx: number) => {
		const isLast = ndx === lastNdx;
		dumpObject(child, lines, isLast, newPrefix);
	});
	return lines;
}

export function dumpObjectToConsole(obj: THREE.Object3D): void {
	console.log(dumpObject(obj).join("\n"));
}
