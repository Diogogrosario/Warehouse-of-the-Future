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
import { ReportResource } from "../../resources/ReportResource";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function ReportSorting(props: {
	reports: ReportResource[];
	setSorted: Dispatch<SetStateAction<number[]>>;
}) {
	const [ascending, setAscending] = useState(false);
	const [sortProperty, setSortProperty] = useState("updatedAt");

	useEffect(() => {
		const value = ascending ? 1 : -1;

		const sorted = [...props.reports].sort((a: ReportResource, b: ReportResource) =>
			a[sortProperty as keyof ReportResource] > b[sortProperty as keyof ReportResource]
				? value
				: -value
		);

		props.setSorted(sorted.map((report) => report.id));
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
