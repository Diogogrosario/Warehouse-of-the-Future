import {
	Button,
	FormControl,
	InputLabel,
	List,
	ListItem,
	MenuItem,
	Select,
	SelectChangeEvent,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { North, South } from "@mui/icons-material";
import Report, { ReportProps } from "./Report";
import React, { useEffect, useState } from "react";

export default function ReportList() {
	const [ascending, setAscending] = React.useState(true);
	const [sortProperty, setSortProperty] = React.useState("title");

	const [reports, setReports]: [ReportProps[], any] = useState([
		{
			title: "Report Testing A",
			description:
				"This is a testing report with a brief description on top of it. This line is just to make this description even longer than it should be",
			shortDescription: "A brief description of the problem",
			warningLevel: "warning",
			actions: [
				["04:05", "Latest action to be performed"],
				["04:00", "Previous Action"],
			],
			resolved: false,
			reportId: 1,
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
		},
	]);

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
					<MenuItem value={"createdAt"}>Time of creation</MenuItem>
					<MenuItem value={"updatedAt"}>Time of last update</MenuItem>
					<MenuItem value={"title"}>Title (A-Z)</MenuItem>
					<MenuItem value={"description"}>Description (A-Z)</MenuItem>
					<MenuItem value={"warningLevel"}>Severity</MenuItem>
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
							/>
						</ListItem>
					);
				})}
			</List>
		</div>
	);
}

