import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Stack,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { North, South } from "@mui/icons-material";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { ReportProps } from "./Report";

export default function ReportSorting(props: {
	reports: ReportProps[];
	setReports: Dispatch<SetStateAction<ReportProps[]>>;
}) {
	const [ascending, setAscending] = React.useState(false);
	const [sortProperty, setSortProperty] = React.useState("updatedAt");

	useEffect(() => {
		const value = ascending ? 1 : -1;

		const sorted = [...props.reports].sort((a: ReportProps, b: ReportProps) =>
			a[sortProperty as keyof ReportProps] > b[sortProperty as keyof ReportProps]
				? value
				: -value
		);

		props.setReports(sorted);
	}, [sortProperty, ascending]);

	return (
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
	);
}
