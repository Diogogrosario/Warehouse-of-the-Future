import React from "react";
import { Group } from "@visx/group";
import { curveBasis } from "@visx/curve";
import { LinePath } from "@visx/shape";
import { scaleTime, scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { GridRows, GridColumns } from "@visx/grid";
import { ScaleSVG } from "@visx/responsive";

export const background = "#F3F3F3";

interface batteryTick {
	timestamp: number;
	battery_power: string;
}

const timestamp = (d: batteryTick) => new Date(d["timestamp"] * 1000).valueOf();
const batteryPower = (d: batteryTick) => parseFloat(d["battery_power"]);

const batteryPowerScale = scaleLinear<number>({
	domain: [0, 100],
	nice: true,
});

const defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 };

interface ThresholdProps {
	width: number;
	height: number;
	batteryData: batteryTick[];
	margin?: { top: number; right: number; bottom: number; left: number };
}

export default function BatteryChart({
	width,
	height,
	batteryData,
	margin = defaultMargin,
}: ThresholdProps) {
	const timeScale = scaleTime<number>({
		domain: [Math.min(...batteryData.map(timestamp)), Math.max(...batteryData.map(timestamp))],
	});

	if (width < 10) return null;

	const xMax = width - margin.left - margin.right;
	const yMax = height - margin.top - margin.bottom;

	timeScale.range([0, xMax]);
	batteryPowerScale.range([yMax, 0]);

	// console.log(batteryData);

	return (
		<div>
			<ScaleSVG width={width} height={height}>
				<linearGradient
					id="gradient"
					gradientUnits="userSpaceOnUse"
					x1="0"
					x2="0"
					y1={batteryPowerScale(0)}
					y2={batteryPowerScale(100)}
				>
					<stop offset="0%" stopColor="#FF5900" />
					<stop offset="18%" stopColor="#FF5900" />
					<stop offset="22%" stopColor="#FCBA03" />
					<stop offset="48%" stopColor="#FCBA03" />
					<stop offset="52%" stopColor="#67C202" />
					<stop offset="100%" stopColor="#67C202" />
				</linearGradient>

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
						x={(d: batteryTick) => timeScale(timestamp(d)) ?? 0}
						y={(d: batteryTick) => batteryPowerScale(batteryPower(d)) ?? 0}
						stroke="url(#gradient)"
						strokeWidth={1.5}
					/>
				</Group>
			</ScaleSVG>
		</div>
	);
}
