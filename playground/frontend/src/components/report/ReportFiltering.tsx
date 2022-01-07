import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box, Checkbox, FormControlLabel, FormGroup, Stack, TextField } from "@mui/material";
import { ReportProps, Severity } from "./Report";
import DateRangePicker, { DateRange } from "@mui/lab/DateRangePicker";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { ReportResource } from "../../resources/ReportResource";

export default function ReportFiltering(props: {
	reports: ReportResource[];
	setExcluded: Dispatch<SetStateAction<boolean[]>>;
}) {
	const [includeWarning, setIncludeWarning] = useState(true);
	const [includeError, setIncludeError] = useState(true);
	const [createdAtRange, setCreatedAtRange] = useState<DateRange<Date>>([null, null]);

	useEffect(() => {
		const excluded = props.reports.map(() => false);
		[...props.reports].map((report, i) => {
			let disabled = false;

			disabled ||= report.severity == "warning" && !includeWarning;
			disabled ||= report.severity == "error" && !includeError;

			const createdAt = new Date(report.createdAt);
			if (!createdAtRange.every((date) => date === null))
				disabled ||= !(
					createdAt >= (createdAtRange[0] ?? new Date()) &&
					createdAt <= (createdAtRange[1] ?? new Date())
				);

			excluded[i] = disabled;
		});

		props.setExcluded(excluded);
	}, [includeWarning, includeError, createdAtRange]);

	return (
		<Stack direction="row" justifyContent="center" alignItems="center" pr={2}>
			<FormGroup>
				<FormControlLabel
					control={
						<Checkbox
							checked={includeWarning}
							onChange={() => {
								setIncludeWarning(!includeWarning);
							}}
							color="warning"
						/>
					}
					label="Warning"
				/>

				<FormControlLabel
					control={
						<Checkbox
							checked={includeError}
							onChange={() => {
								setIncludeError(!includeError);
							}}
							color="error"
						/>
					}
					label="Error"
				/>
			</FormGroup>

			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<DateRangePicker
					onChange={(newValue) => {
						setCreatedAtRange(newValue);
					}}
					value={createdAtRange}
					renderInput={(startProps, endProps) => (
						<React.Fragment>
							<TextField {...startProps} />
							<Box sx={{ mx: 2 }}> to </Box>
							<TextField {...endProps} />
						</React.Fragment>
					)}
				/>
			</LocalizationProvider>
		</Stack>
	);
}
