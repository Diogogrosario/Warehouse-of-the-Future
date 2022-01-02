import {
	Button,
	FormControl,
	InputLabel,
	List,
	ListItem,
	MenuItem,
	Select,
	SelectChangeEvent,
	Stack,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { North, South } from "@mui/icons-material";
import Report, { ReportProps } from "./Report";
import React, { useEffect, useState } from "react";

const testReports = [
	{
		title: "Report Testing A",
		description:
			"This is a testing report with a brief description on top of it. This line is just to make this description even longer than it should be",
		shortDescription: "This is a short description",
		warningLevel: "warning",
		actions: [
			["04:05", "Latest action to be performed"],
			["04:00", "Previous Action"],
		],
		resolved: false,
		reportId: 1,
		createdAt: new Date("2020-12-25"),
		updatedAt: new Date("2020-12-26"),
	},
	{
		title: "Report Testing B",
		description:
			"This is a testing report with a brief description on top of it. This line is just to make this description even longer than it should be",
		shortDescription: "A brief description of the problem",
		warningLevel: "error",
		actions: [
			["04:05", "Latest action to be performed"],
			["04:00", "Previous Action"],
		],
		resolved: false,
		reportId: 2,
		createdAt: new Date("2020-12-23"),
		updatedAt: new Date("2020-12-24"),
	},
	{
		title: "Report Testing C",
		description:
			"This is a testing report with a brief description on top of it. This line is just to make this description even longer than it should be",
		shortDescription: "A brief description of the problem",
		warningLevel: "error",
		actions: [
			["04:05", "Latest action to be performed"],
			["04:00", "Previous Action"],
		],
		resolved: false,
		reportId: 3,
		createdAt: new Date("2020-12-23"),
		updatedAt: new Date("2020-12-24"),
	},
	{
		title: "Report Testing D",
		description:
			"This is a testing report with a brief description on top of it. This line is just to make this description even longer than it should be",
		shortDescription: "A brief description of the problem",
		warningLevel: "error",
		actions: [
			["04:05", "Latest action to be performed"],
			["04:00", "Previous Action"],
		],
		resolved: false,
		reportId: 4,
		createdAt: new Date("2020-12-23"),
		updatedAt: new Date("2020-12-24"),
	},
	{
		title: "Report Testing E",
		description:
			"This is a testing report with a brief description on top of it. This line is just to make this description even longer than it should be",
		shortDescription: "A brief description of the problem",
		warningLevel: "error",
		actions: [
			["04:05", "Latest action to be performed"],
			["04:00", "Previous Action"],
		],
		resolved: false,
		reportId: 5,
		createdAt: new Date("2020-12-23"),
		updatedAt: new Date("2020-12-24"),
	},
	{
		title: "Report Testing F",
		description:
			"This is a testing report with a brief description on top of it. This line is just to make this description even longer than it should be",
		shortDescription: "A brief description of the problem",
		warningLevel: "error",
		actions: [
			["04:05", "Latest action to be performed"],
			["04:00", "Previous Action"],
		],
		resolved: false,
		reportId: 6,
		createdAt: new Date("2020-12-23"),
		updatedAt: new Date("2020-12-24"),
	},
];

export default function ReportList() {
	const [ascending, setAscending] = React.useState(false);
	const [sortProperty, setSortProperty] = React.useState("updatedAt");

	const [reports, setReports] = useState<ReportProps[]>(testReports as ReportProps[]);

	useEffect(() => {
		const value = ascending ? 1 : -1;

		const sorted = [...reports].sort((a: ReportProps, b: ReportProps) =>
			a[sortProperty as keyof ReportProps] > b[sortProperty as keyof ReportProps]
				? value
				: -value
		);

		setReports(sorted);
	}, [sortProperty, ascending]);

	return (
		<div>
			<Stack direction="row">
				<FormControl fullWidth sx={{ marginTop: "10px" }}>
					<InputLabel id="sort-by-select">Sort by</InputLabel>
					<Select
						label="Sort by"
						id="sort-by-select"
						onChange={(event: SelectChangeEvent) => {
							setSortProperty(event.target.value);
						}}
						value={sortProperty}
					>
						<MenuItem value={"title"}>Title (A-Z)</MenuItem>
						<MenuItem value={"shortDescription"}>Description (A-Z)</MenuItem>
						<MenuItem value={"warningLevel"}>Severity</MenuItem>
						<MenuItem value={"createdAt"}>Time of creation</MenuItem>
						<MenuItem value={"updatedAt"}>Time of last update</MenuItem>
					</Select>
				</FormControl>

				<Button
					onClick={() => {
						setAscending(!ascending);
					}}
				>
					<SortIcon />

					{ascending ? <South /> : <North />}
				</Button>
			</Stack>

			<List>
				{reports.map((report, i) => {
					return (
						<ListItem key={i}>
							<Report
								title={report.title}
								description={report.description}
								shortDescription={report.shortDescription}
								warningLevel={report.warningLevel}
								actions={report.actions}
								resolved={report.resolved}
								reportId={report.reportId}
								createdAt={report.createdAt}
								updatedAt={report.updatedAt}
							/>
						</ListItem>
					);
				})}
			</List>
		</div>
	);
}
