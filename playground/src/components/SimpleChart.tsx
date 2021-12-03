import React from "react";
import { Group } from "@visx/group";
import { curveBasis } from "@visx/curve";
import { LinePath } from "@visx/shape";
import { scaleTime, scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { GridRows, GridColumns } from "@visx/grid";

const batteryData = require(".//../../public/battery.json");

export const background = "#f3f3f3";

const timestamp = (d: any) => new Date(d["timestamp"] * 1000).valueOf();
const batteryPower = (d: any) => d["battery_power"];

const timeScale = scaleTime<number>({
	domain: [Math.min(...batteryData.map(timestamp)), Math.max(...batteryData.map(timestamp))],
});

const batteryPowerScale = scaleLinear<number>({
	domain: [0, 100],
	nice: true,
});

const defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 };

export type ThresholdProps = {
	width: number;
	height: number;
	margin?: { top: number; right: number; bottom: number; left: number };
};

export default function SimpleChart({ width, height, margin = defaultMargin }: ThresholdProps) {
	if (width < 10) return null;

	const xMax = width - margin.left - margin.right;
	const yMax = height - margin.top - margin.bottom;

	timeScale.range([0, xMax]);
	batteryPowerScale.range([yMax, 0]);

	return (
		<div>
			<svg width={width} height={height}>
				<rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
				<Group left={margin.left} top={margin.top}>
					<GridRows
						scale={batteryPowerScale}
						width={xMax}
						height={yMax}
						stroke="#e0e0e0"
					/>
					<GridColumns scale={timeScale} width={xMax} height={yMax} stroke="#e0e0e0" />

					<AxisBottom top={yMax} scale={timeScale} numTicks={width > 520 ? 10 : 5} />
					<AxisLeft scale={batteryPowerScale} />

					<text x="-70" y="15" transform="rotate(-90)" fontSize={10}>
						Battery power (%)
					</text>

					<LinePath
						data={batteryData}
						curve={curveBasis}
						x={(d: any) => timeScale(timestamp(d)) ?? 0}
						y={(d: any) => batteryPowerScale(batteryPower(d)) ?? 0}
						stroke="#222"
						strokeWidth={1.5}
					/>
				</Group>
			</svg>
		</div>
	);
}