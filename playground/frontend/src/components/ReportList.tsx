import {
	Button,
	FormControl,
	InputLabel,
	List, ListItem,
	MenuItem,
	Select,
	SelectChangeEvent,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { North } from "@mui/icons-material";
import Report, { ReportProps } from "./Report";
import React from "react";

export default function ReportList() {
	const [sortBy, setSortBy] = React.useState("");

	const reports: ReportProps[] = [
		{
			title: "Report Testing",
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
			title: "Report Testing",
			description:
				"This is a testing report with a brief description on top of it. This line is just to make this description even longer than it should be",
			shortDescription: "A brief description of the problem",
			warningLevel: "error",
			actions: [
				["04:05", "Latest action to be performed"],
				["04:00", "Previous Action"],
			],
			resolved: false,
			reportId: 1,
		},
	];

	return (
		<div>
			<FormControl fullWidth sx={{ marginTop: "10px" }}>
				<InputLabel id="sort-by-select">Sort by</InputLabel>
				<Select
					label="Sort by"
					id="sort-by-select"
					onChange={(event: SelectChangeEvent) => {
						setSortBy(event.target.value);
					}}
				>
					<MenuItem value={10}>Time of creation</MenuItem>
					<MenuItem value={20}>Time of last update</MenuItem>
					<MenuItem value={30}>Time of last update</MenuItem>
					<MenuItem value={40}>Name (A-Z)</MenuItem>
					<MenuItem value={50}>Description (A-Z)</MenuItem>
					<MenuItem value={60}>Severity</MenuItem>
				</Select>
			</FormControl>

			<Button>
				<SortIcon />
				<North />
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

