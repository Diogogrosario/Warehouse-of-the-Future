import { List, ListItem } from "@mui/material";
import Report, { ReportProps, Severity } from "./Report";
import React, { useState } from "react";
import ReportSorting from "./ReportSorting";
import ReportFiltering from "./ReportFiltering";

export default function ReportList() {
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
			disabled: false,
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
			disabled: false,
		},
	]);

	return (
		<div>
			<ReportSorting reports={reports} setReports={setReports} />
			<ReportFiltering reports={reports} setReports={setReports} />

			<List>
				{reports.map((report, i) => (
					<ListItem key={i}>
						{!report.disabled && (
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
								disabled={report.disabled}
							/>
						)}
					</ListItem>
				))}
			</List>
		</div>
	);
}
