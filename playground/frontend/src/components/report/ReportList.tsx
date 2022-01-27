import React from "react";
import {
	Box,
	Button,
	ButtonGroup,
	InputBase,
	List,
	ListItem,
	Menu,
	MenuItem,
	Paper,
	TextField,
	Theme,
} from "@mui/material";
import { useResource, useSubscription } from "rest-hooks";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { North, South } from "@mui/icons-material";
import {
	DateRange,
	DateRangePickerDay,
	DateRangePickerDayProps,
	LocalizationProvider,
	StaticDateRangePicker,
} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import { ReportResource } from "../../resources/ReportResource";
import Coloring from "../../utils/coloring";
import LabelPicker from "../LabelPicker";
import { ActionResource } from "../../resources/ActionResource";
import Report from "./Report";

const labels = [
	{
		name: "warning",
		color: "warning.main",
		description: "Warning reports",
		group: "severity",
	},
	{
		name: "error",
		color: "error.main",
		description: "Error reports",
		group: "severity",
	},
	{
		name: "open",
		color: "green.main",
		description: "Open reports",
		group: "status",
	},
	{
		name: "closed",
		color: "purple.main",
		description: "Resolved reports",
		group: "status",
	},
];

const labelFilter: ((report: ReportResource) => boolean)[] = [
	(report) => report.severity == "warning",
	(report) => report.severity == "error",
	(report) => !report.resolved,
	(report) => report.resolved,
];

const ReportList: React.FC = () => {
	const reports = useResource(ReportResource.list(), {});
	useSubscription(ReportResource.list(), {});

	// Sorting
	const [ascending, setAscending] = React.useState(false);
	const sortMenuOptions = ["title", "severity", "createdAt", "updatedAt"];
	const sortMenuOptionText = [
		"Title (A-Z)",
		"Severity",
		"Time of creation",
		"Time of last update",
	];
	const [sortOption, setSortOption] = React.useState(3);

	const [sortMenuAnchorEl, setSortMenuAnchorEl] = React.useState<null | HTMLElement>(null);
	const sortMenuOpen = Boolean(sortMenuAnchorEl);

	// Filtering
	const [selectedLabels, setSelectedLabels] = React.useState<number[]>([]);
	const [dateRange, setDateRange] = React.useState<DateRange<Date>>([null, null]);
	const [filterDateMenuAnchorEl, setFilterDateMenuAnchorEl] = React.useState<null | HTMLElement>(
		null
	);
	const filterDateMenuOpen = Boolean(filterDateMenuAnchorEl);

	const [searchValue, setSearchValue] = React.useState("");

	return (
		<div style={{ height: "100%", display: "grid", gridTemplateRows: "auto 1fr" }}>
			<div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 2 }}>
				<Paper
					component="div"
					sx={{
						display: "flex",
						alignItems: "center",
						ml: "5px",
						borderColor: (theme: Theme) => Coloring.rgba(theme.palette.white.main, 0.2),
						backgroundColor: "transparent",
						"&:focus-within": {
							border: "1px solid white.main",
							backgroundColor: "dark.main",
						},
						"&:hover": {
							borderColor: (theme: Theme) =>
								Coloring.rgba(theme.palette.white.main, 0.4),
							backgroundColor: (theme: Theme) =>
								Coloring.rgba(theme.palette.dark.main, 0.6),
						},
					}}
				>
					<SearchIcon fontSize="medium" sx={{ color: "white.main", margin: "0 16px" }} />
					<InputBase
						id="report-list-search"
						placeholder="Search reports"
						inputProps={{ "aria-label": "search reports", type: "search" }}
						value={searchValue}
						onChange={(
							event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
						) => setSearchValue(event.target.value)}
						sx={{
							flex: "1 1 0",
							margin: "4px 0",
							fontSize: "16px",
							"> input": {
								color: "white.main",
								"&::placeholder": {
									opacity: 0.6,
								},
							},
						}}
					/>
				</Paper>
				<ButtonGroup variant="contained" aria-label="sorting options">
					<Button
						id="report-sort-button"
						aria-label="select sort property for reports"
						aria-controls="report-sort-menu"
						aria-haspopup="true"
						aria-expanded={sortMenuOpen ? "true" : undefined}
						color="lightDark"
						onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
							setSortMenuAnchorEl(event.currentTarget)
						}
					>
						<SortIcon />
					</Button>
					<Menu
						id="report-sort-menu"
						anchorEl={sortMenuAnchorEl}
						open={sortMenuOpen}
						onClose={() => setSortMenuAnchorEl(null)}
						MenuListProps={{
							"aria-labelledby": "report-sort-button",
							role: "listbox",
						}}
					>
						{sortMenuOptions.map((option, index) => (
							<MenuItem
								key={option}
								selected={sortOption === index}
								onClick={() => {
									setSortOption(index);
									setSortMenuAnchorEl(null);
								}}
							>
								{sortMenuOptionText[index]}
							</MenuItem>
						))}
					</Menu>
					<Button
						id="report-sort-order-button"
						aria-label="toggle report sorting order"
						color="lightDark"
						onClick={() => setAscending((prevState) => !prevState)}
					>
						{ascending ? <South /> : <North />}
					</Button>
				</ButtonGroup>
				<ButtonGroup variant="contained" aria-label="filter options">
					<Button
						id="report-filter-date-button"
						aria-label="filter reports by date range"
						aria-describedby="report-filter-date-menu"
						aria-haspopup="true"
						aria-expanded={filterDateMenuOpen ? "true" : undefined}
						color="lightDark"
						onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
							setFilterDateMenuAnchorEl(
								filterDateMenuAnchorEl ? null : event.currentTarget
							)
						}
						style={{
							borderTopRightRadius: 0,
							borderBottomRightRadius: 0,
							borderRight: "1px solid #bdbdbd",
							borderColor: "rgb(23, 23, 23)",
						}}
					>
						<DateRangeIcon />
					</Button>
					<Menu
						id="report-filter-date-menu"
						anchorEl={filterDateMenuAnchorEl}
						open={filterDateMenuOpen}
						onClose={() => setFilterDateMenuAnchorEl(null)}
						sx={{
							".MuiMenu-paper": {
								border: (theme: Theme) =>
									`1px solid ${Coloring.rgba(theme.palette.white.main, 0.2)}`,
							},
							".MuiMenu-list": {
								"> .MuiPickerStaticWrapper-root": {
									backgroundColor: "inherit",
									color: "inherit",
									"> div": {
										"> .PrivatePickersToolbar-root": {
											"> .MuiTypography-root": {
												color: (theme: Theme) =>
													Coloring.rgba(theme.palette.white.main, 0.6),
											},
											".MuiGrid-root > div": {
												"> .MuiTypography-root": {
													color: (theme: Theme) =>
														Coloring.rgba(
															theme.palette.white.main,
															0.6
														),
												},
												"> .MuiButton-root > .MuiTypography-root": {
													color: (theme: Theme) =>
														Coloring.rgba(
															theme.palette.white.main,
															0.8
														),
													"&:hover": {
														color: "white.main",
													},
												},
											},
										},
										"> div:nth-last-of-type(2)": {
											"> .MuiTypography-root": {
												color: (theme: Theme) =>
													Coloring.rgba(theme.palette.white.main, 0.6),
											},
										},
									},
								},
							},
						}}
					>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<StaticDateRangePicker
								allowSameDateSelection
								onChange={(newValue) => {
									setDateRange(newValue);
								}}
								value={dateRange}
								renderDay={(
									_: Date,
									dateRangePickerDayProps: DateRangePickerDayProps<Date>
								) => {
									return (
										<DateRangePickerDay
											{...dateRangePickerDayProps}
											sx={{
												color: (theme: Theme) =>
													Coloring.rgba(theme.palette.white.main, 0.6),
												"&:hover": {
													color: (theme: Theme) =>
														Coloring.rgba(
															theme.palette.white.main,
															0.8
														),
												},
											}}
										/>
									);
								}}
								componentsProps={{
									leftArrowButton: {
										color: "white",
									},
									rightArrowButton: {
										color: "white",
									},
								}}
								renderInput={(startProps, endProps) => (
									<React.Fragment>
										<TextField
											{...startProps}
											InputLabelProps={{
												shrink: true,
												sx: {
													color: (theme: Theme) =>
														Coloring.rgba(
															theme.palette.white.main,
															0.4
														),
												},
											}}
											InputProps={{
												sx: {
													color: (theme: Theme) =>
														Coloring.rgba(
															theme.palette.white.main,
															0.8
														),
													"&:hover": {
														color: "white.main",
														".MuiOutlinedInput-notchedOutline": {
															borderColor: (theme: Theme) =>
																Coloring.rgba(
																	theme.palette.white.main,
																	0.6
																),
														},
													},
													"&::placeholder": {
														opacity: 0.6,
													},
													".MuiOutlinedInput-notchedOutline": {
														borderColor: (theme: Theme) =>
															Coloring.rgba(
																theme.palette.white.main,
																0.2
															),
													},
												},
											}}
										/>
										<Box sx={{ mx: 2, opacity: 0.4 }}> to </Box>
										<TextField
											{...endProps}
											InputLabelProps={{
												shrink: true,
												sx: {
													color: (theme: Theme) =>
														Coloring.rgba(
															theme.palette.white.main,
															0.4
														),
												},
											}}
											InputProps={{
												sx: {
													color: (theme: Theme) =>
														Coloring.rgba(
															theme.palette.white.main,
															0.8
														),
													"&:hover": {
														color: "white.main",
														".MuiOutlinedInput-notchedOutline": {
															borderColor: (theme: Theme) =>
																Coloring.rgba(
																	theme.palette.white.main,
																	0.6
																),
														},
													},
													"&::placeholder": {
														opacity: 0.6,
													},
													".MuiOutlinedInput-notchedOutline": {
														borderColor: (theme: Theme) =>
															Coloring.rgba(
																theme.palette.white.main,
																0.2
															),
													},
												},
											}}
										/>
									</React.Fragment>
								)}
							/>
						</LocalizationProvider>
					</Menu>
					<LabelPicker
						labels={labels}
						onSelectedLabelsChange={(newState: number[]) => {
							setSelectedLabels(newState);
						}}
						buttonProps={{
							color: "lightDark",
							style: {
								borderTopLeftRadius: 0,
								borderBottomLeftRadius: 0,
							},
						}}
						style={{
							height: "inherit",
						}}
					/>
				</ButtonGroup>
			</div>
			<List style={{ overflow: "auto" }}>
				{reports
					.filter((report: ReportResource) => {
						if (
							selectedLabels.length &&
							!Object.values(
								selectedLabels.reduce(
									(prevValue: { [key: string]: number[] }, labelIdx: number) => {
										const key = labels[labelIdx].group;
										(prevValue[key] = prevValue[key] || []).push(labelIdx);
										return prevValue;
									},
									{}
								)
							).every((groupFilters: number[]) =>
								groupFilters.some((labelFilterIdx: number) =>
									labelFilter[labelFilterIdx](report)
								)
							)
						)
							return false;

						if (dateRange[0] && new Date(report.createdAt) < dateRange[0]) return false;

						if (dateRange[1] && new Date(report.createdAt) > dateRange[1]) return false;

						if (searchValue && report.title.toLowerCase().indexOf(searchValue) < 0)
							return false;

						return true;
					})
					.sort((reportA: ReportResource, reportB: ReportResource) =>
						reportA[sortMenuOptions[sortOption] as keyof ReportResource] ==
						reportB[sortMenuOptions[sortOption] as keyof ReportResource]
							? 0
							: reportA[sortMenuOptions[sortOption] as keyof ReportResource] >
							  reportB[sortMenuOptions[sortOption] as keyof ReportResource]
							? ascending
								? 1
								: -1
							: ascending
							? -1
							: 1
					)
					.map((report: ReportResource, index: number) => (
						<ListItem key={index}>
							<Report
								title={report.title}
								description={report.description}
								shortDescription="Placeholder"
								warningLevel={report.severity}
								resolved={report.resolved}
								reportId={report.id}
								createdAt={report.createdAt}
								updatedAt={report.updatedAt}
								actions={report.actions.map((action: ActionResource) => [
									new Date(action.createdAt).toLocaleString("pt-PT"),
									action.description,
								])}
							/>
						</ListItem>
					))}
			</List>
		</div>
	);
};

export default ReportList;
