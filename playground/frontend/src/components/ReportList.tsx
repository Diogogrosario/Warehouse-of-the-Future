import { Checkbox, FormControlLabel, FormGroup, List, ListItem, Slider } from "@mui/material";
import Report, { ReportProps, Severity } from "./Report";
import React, { useState } from "react";
import ReportSorting from "./ReportSorting";

export default function ReportList() {
	const [filterProperty, setFilterProperty] = React.useState("");
	const [reports, setReports] = useState<ReportProps[]>([
		{
			title: "Report Testing A",
			description:
				"This is a testing report with a brief description on top of it. This line is just to make this description even longer than it should be",
			shortDescription: "This is a short description",
			warningLevel: Severity.Warning,
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
			warningLevel: Severity.Error,
			actions: [
				["04:05", "Latest action to be performed"],
				["04:00", "Previous Action"],
			],
			resolved: false,
			reportId: 2,
			createdAt: new Date("2020-12-23"),
			updatedAt: new Date("2020-12-24"),
		},
	]);

	return (
		<div>
			<ReportSorting reports={reports} setReports={setReports} />

			{/* Filtering */}
			<FormGroup>
				<FormControlLabel
					control={<Checkbox defaultChecked color="warning" />}
					label="Warning"
				/>
				<FormControlLabel
					control={<Checkbox defaultChecked color="error" />}
					label="Error"
				/>

				<Slider value={[10, 20]} onChange={() => {}} valueLabelDisplay="auto" />
			</FormGroup>

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
