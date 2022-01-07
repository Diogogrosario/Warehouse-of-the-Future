import React, { Suspense } from "react";
import {
    Button,
    ButtonGroup,
    InputBase,
    List,
    ListItem,
    Menu,
    MenuItem,
    Paper,
    Theme
} from "@mui/material";
import { NetworkErrorBoundary, useResource, useSubscription } from "rest-hooks";
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from "@mui/icons-material/Sort";
import { North, South } from "@mui/icons-material";

import { ReportResource } from "../../resources/ReportResource";
import Coloring from "../../utils/coloring";
import LabelPicker, { Label } from "../LabelPicker";
import { ActionResource } from "../../resources/ActionResource";
import Report from "./Report";

interface AsyncBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ReactElement;
}

const AsyncBoundary : React.FC<AsyncBoundaryProps> = ({ children, fallback } : AsyncBoundaryProps) => {
    return (
        <Suspense fallback={fallback ?? <span>loading</span>}>
            <NetworkErrorBoundary>{children}</NetworkErrorBoundary>
        </Suspense>
    );
}

const labels = [
    {
        name: "warning",
        color: "warning.main",
        description: "Warning reports",
    },
    {
        name: "error",
        color: "error.main",
        description: "Error reports",
    },
    {
        name: "open",
        color: "green.main",
        description: "Open reports",
    },
    {
        name: "closed",
        color: "purple.main",
        description: "Resolved reports",
    },
];

const labelFilter : ((report : ReportResource) => boolean)[] = [
    (report) => report.severity == "warning",
    (report) => report.severity == "error",
    (report) => report.resolved,
    (report) => !report.resolved,
];

const ReportList : React.FC = () => {
    const reports = useResource(ReportResource.list(), {});
    useSubscription(ReportResource.list(), {});

    // Sorting
    const [ascending, setAscending] = React.useState(false);
    const sortMenuOptions = ["title", "severity", "createdAt", "updatedAt"];
	const sortMenuOptionText = ["Title (A-Z)", "Severity", "Time of creation", "Time of last update"];
	const [sortOption, setSortOption] = React.useState(3);

    const [sortMenuAnchorEl, setSortMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const sortMenuOpen = Boolean(sortMenuAnchorEl);

    // Filtering
    const [selectedLabels, setSelectedLabels] = React.useState<number[]>([]);
    
    return (
        <AsyncBoundary>
            <div style={{ height: "100%", display: "grid", gridTemplateRows: "auto 1fr" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto" }}>
                    <Paper
                        component="div"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            ml: "5px",
                            border: (theme : Theme) => Coloring.rgba(theme.palette.white.main, 0.2),
                            backgroundColor: "transparent",
                            "&:focus-within": {
                                border: "1px solid white.main",
                                backgroundColor: "dark.main",
                            },
                            "&:hover": {
                                border: (theme : Theme) => Coloring.rgba(theme.palette.white.main, 0.4),
                                backgroundColor: (theme : Theme) => Coloring.rgba(theme.palette.dark.main, 0.6),
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
                    <ButtonGroup variant="contained" aria-label="sorting options">
                        <Button
                            id="report-sort-button"
                            aria-label="select sort property for reports"
                            aria-controls="report-sort-menu"
                            aria-haspopup="true"
                            aria-expanded={sortMenuOpen ? "true" : undefined}
                            color="lightDark"
                            onClick={(event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => setSortMenuAnchorEl(event.currentTarget) }
					    >
                            <SortIcon />
                        </Button>
                        <Menu
                            id="report-sort-menu"
                            anchorEl={sortMenuAnchorEl}
                            open={sortMenuOpen}
                            onClose={ () => setSortMenuAnchorEl(null) }
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
                        <LabelPicker
                            labels={labels}
                            onSelectedLabelsChange={(newState : number[]) => setSelectedLabels(newState)}
                            buttonProps={{
                                color: "lightDark",
                            }}
                            style={{
                                marginLeft: "4px",
                                height: "inherit",
                            }}
                        />
                    </ButtonGroup>
                </div>
                <List style={{ overflow: "auto" }} >
                    {reports
                        .sort( (reportA : ReportResource, reportB : ReportResource) => (
                            (reportA[sortMenuOptions[sortOption] as keyof ReportResource] == reportB[sortMenuOptions[sortOption] as keyof ReportResource])
                                ? 0
                                : ((reportA[sortMenuOptions[sortOption] as keyof ReportResource] > reportB[sortMenuOptions[sortOption] as keyof ReportResource])
                                    ? (ascending ? 1 : -1)
                                    : (ascending ? -1 : 1)
                                )
                        )).map( (report : ReportResource, index : number) => (
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
                                    actions={report.actions.map( (action : ActionResource) => (
                                        [
                                            new Date(action.createdAt).toLocaleString("pt-PT"),
                                            action.description
                                        ]
                                    ))}
                                />
                            </ListItem>
                        ))
                    }
                </List>
            </div>
        </AsyncBoundary>
    );
}

export default ReportList;