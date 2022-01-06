import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box, Checkbox, FormControlLabel, FormGroup, Stack, TextField } from "@mui/material";
import { ReportProps, Severity } from "./Report";
import DateRangePicker, { DateRange } from "@mui/lab/DateRangePicker";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

export default function ReportFiltering(props: {
	reports: ReportProps[];
	setReports: Dispatch<SetStateAction<ReportProps[]>>;
}) {
	const [includeWarning, setIncludeWarning] = useState(true);
	const [includeError, setIncludeError] = useState(true);
	const [createdAtRange, setCreatedAtRange] = useState<DateRange<Date>>([null, null]);

	useEffect(() => {
		[...props.reports].map((report) => {
			let disabled = false;

			disabled ||= report.warningLevel == Severity.Warning && !includeWarning;
			disabled ||= report.warningLevel == Severity.Error && !includeError;

			console.log(createdAtRange);

			if (!createdAtRange.every((date) => date === null))
				disabled ||= !(
					report.createdAt >= (createdAtRange[0] ?? new Date()) &&
					report.createdAt <= (createdAtRange[1] ?? new Date())
				);

			report.disabled = disabled;
		});

		props.setReports([...props.reports]);
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
