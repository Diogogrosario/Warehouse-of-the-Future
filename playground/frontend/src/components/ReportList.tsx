import {
	Button,
	ButtonGroup,
	InputBase,
	List,
	ListItem,
	Menu,
	MenuItem,
	Paper,
	Theme,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { North, South } from "@mui/icons-material";
import React from "react";
import SearchIcon from '@mui/icons-material/Search';

import Report, { ReportProps } from "./Report";
import LabelPicker from "./LabelPicker";
import Coloring from "../utils/coloring";

const testReports = [
	{
		title: "Report Testing A",
		description:
			"This is a testing report with a brief description on top of it. This line is just to make this description even longer than it should be",
		shortDescription: "This is a short description",
		warningLevel: "warning",
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
		warningLevel: "error",
		actions: [
			["04:05", "Latest action to be performed"],
			["04:00", "Previous Action"],
		],
		resolved: false,
		reportId: 2,
		createdAt: new Date("2020-12-23"),
		updatedAt: new Date("2020-12-24"),
	},
	{
		title: "Report Testing C",
		description:
			"This is a testing report with a brief description on top of it. This line is just to make this description even longer than it should be",
		shortDescription: "A brief description of the problem",
		warningLevel: "error",
		actions: [
			["04:05", "Latest action to be performed"],
			["04:00", "Previous Action"],
		],
		resolved: false,
		reportId: 3,
		createdAt: new Date("2020-12-23"),
		updatedAt: new Date("2020-12-24"),
	},
	{
		title: "Report Testing D",
		description:
			"This is a testing report with a brief description on top of it. This line is just to make this description even longer than it should be",
		shortDescription: "A brief description of the problem",
		warningLevel: "error",
		actions: [
			["04:05", "Latest action to be performed"],
			["04:00", "Previous Action"],
		],
		resolved: false,
		reportId: 4,
		createdAt: new Date("2020-12-23"),
		updatedAt: new Date("2020-12-24"),
	},
	{
		title: "Report Testing E",
		description:
			"This is a testing report with a brief description on top of it. This line is just to make this description even longer than it should be",
		shortDescription: "A brief description of the problem",
		warningLevel: "error",
		actions: [
			["04:05", "Latest action to be performed"],
			["04:00", "Previous Action"],
		],
		resolved: false,
		reportId: 5,
		createdAt: new Date("2020-12-23"),
		updatedAt: new Date("2020-12-24"),
	},
	{
		title: "Report Testing F",
		description:
			"This is a testing report with a brief description on top of it. This line is just to make this description even longer than it should be",
		shortDescription: "A brief description of the problem",
		warningLevel: "error",
		actions: [
			["04:05", "Latest action to be performed"],
			["04:00", "Previous Action"],
		],
		resolved: false,
		reportId: 6,
		createdAt: new Date("2020-12-23"),
		updatedAt: new Date("2020-12-24"),
	},
];

const testLabels = [
	{
	  name: 'good first issue',
	  color: '#7057ff',
	  description: 'Good for newcomers',
	},
	{
	  name: 'help wanted',
	  color: '#008672',
	  description: 'Extra attention is needed',
	},
	{
	  name: 'priority: critical',
	  color: '#b60205',
	  description: '',
	},
	{
	  name: 'priority: high',
	  color: '#d93f0b',
	  description: '',
	},
	{
	  name: 'priority: low',
	  color: '#0e8a16',
	  description: '',
	},
	{
	  name: 'priority: medium',
	  color: '#fbca04',
	  description: '',
	},
	{
	  name: "status: can't reproduce",
	  color: '#fec1c1',
	  description: '',
	},
	{
	  name: 'status: confirmed',
	  color: '#215cea',
	  description: '',
	},
	{
	  name: 'status: duplicate',
	  color: '#cfd3d7',
	  description: 'This issue or pull request already exists',
	},
	{
	  name: 'status: needs information',
	  color: '#fef2c0',
	  description: '',
	},
	{
	  name: 'status: wont do/fix',
	  color: '#eeeeee',
	  description: 'This will not be worked on',
	},
	{
	  name: 'type: bug',
	  color: '#d73a4a',
	  description: "Something isn't working",
	},
	{
	  name: 'type: discussion',
	  color: '#d4c5f9',
	  description: '',
	},
	{
	  name: 'type: documentation',
	  color: '#006b75',
	  description: '',
	},
	{
	  name: 'type: enhancement',
	  color: '#84b6eb',
	  description: '',
	},
	{
	  name: 'type: epic',
	  color: '#3e4b9e',
	  description: 'A theme of work that contain sub-tasks',
	},
	{
	  name: 'type: feature request',
	  color: '#fbca04',
	  description: 'New feature or request',
	},
	{
	  name: 'type: question',
	  color: '#d876e3',
	  description: 'Further information is requested',
	},
];

export default function ReportList() {
	const [ascending, setAscending] = React.useState(false);
	
	const [sortMenuAnchorEl, setSortMenuAnchorEl] = React.useState<null | HTMLElement>(null);
	const sortMenuOpen = Boolean(sortMenuAnchorEl);
	const sortMenuOptions = ["title", "warningLevel", "createdAt", "updatedAt"];
	const sortMenuOptionText = ["Title (A-Z)", "Severity", "Time of creation", "Time of last update"];
	const [sortOption, setSortOption] = React.useState(3);

	const reports = (testReports as ReportProps[]); // PROVISIONAL
	//const [reports, setReports] = useState<ReportProps[]>(testReports as ReportProps[]);
	const labels = testLabels; // PROVISIONAL

	return (
		<div style={{ height: "100%", display: "grid", gridTemplateRows: "auto 1fr" }} >
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr auto",
				}}
			>
				<Paper component="div"
					sx={{
						display: "flex",
						alignItems: "center",
						ml: "5px",
						border: (theme : Theme) => {
							const [r, g, b, a] = Coloring.hextoRGBA(theme.palette.white.main);
							return `1px solid rgba(${r}, ${g}, ${b}, 0.2)`;
						},
						backgroundColor: "transparent",
						"&:focus-within": {
							border: "1px solid white.main",
							backgroundColor: "dark.main",
						},
						"&:hover": {
							border: (theme : Theme) => {
								const [r, g, b, a] = Coloring.hextoRGBA(theme.palette.white.main);
								return `1px solid rgba(${r}, ${g}, ${b}, 0.4)`;
							},
							backgroundColor: (theme : Theme) => {
								const [r, g, b, a] = Coloring.hextoRGBA(theme.palette.dark.main);
								return `rgba(${r}, ${g}, ${b}, 0.6)`;
							},
						},
					}}
				>
					<SearchIcon fontSize="medium" sx={{ color: "white.main", margin: "0 16px" }} />
					<InputBase
						placeholder="Search reports"
						inputProps={{ "aria-label": "search reports" }}
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
				<ButtonGroup variant="contained" aria-label="listing options">
					<Button
						id="report-sort-button"
						aria-label="select sort property for reports"
						aria-controls="report-sort-menu"
						aria-haspopup="true"
						aria-expanded={sortMenuOpen ? "true" : undefined}
						color="lightDark"
						onClick={(event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => { setSortMenuAnchorEl(event.currentTarget); }}
					>
						<SortIcon />
					</Button>
					<Menu
						id="report-sort-menu"
						anchorEl={sortMenuAnchorEl}
						open={sortMenuOpen}
						onClose={ () => { setSortMenuAnchorEl(null); }}
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
						onClick={() => setAscending(prevState => !prevState)}
					>
						{ascending ? <South /> : <North />}
					</Button>
					<LabelPicker labels={labels} buttonProps={{ color: "lightDark" }} style={{ marginLeft: "4px", height: "inherit" }} />
				</ButtonGroup>
			</div>

			<List style={{ overflow: "auto" }} >
				{reports.sort((reportA : ReportProps, reportB : ReportProps) => (
					(reportA[sortMenuOptions[sortOption] as keyof ReportProps] == reportB[sortMenuOptions[sortOption] as keyof ReportProps])
						? 0
						: ((reportA[sortMenuOptions[sortOption] as keyof ReportProps] > reportB[sortMenuOptions[sortOption] as keyof ReportProps])
							? (ascending ? 1 : -1)
							: (ascending ? -1 : 1)
						)
				)).map((report, i) => {
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
