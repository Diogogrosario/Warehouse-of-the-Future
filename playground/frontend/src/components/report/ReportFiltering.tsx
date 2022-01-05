import React, { Dispatch, SetStateAction, useState } from "react";
import { Box, Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";
import { ReportProps } from "./Report";
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

	return (
		<div>
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
		</div>
	);
}
