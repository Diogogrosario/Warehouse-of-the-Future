import React from "react";
import {
	Typography,
	Stack,
	Divider,
	List,
	ListSubheader,
	ListItem,
	ListItemText,
	ListItemIcon,
	Tooltip,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Button,
	Theme,
} from "@mui/material";
import Box from "@mui/system/Box";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

import Coloring from "../../utils/coloring";
import AddActionForm from "./AddActionForm";
import NoResultsOverlay from "../NoResultsOverlay";

export interface ReportProps {
	title: string;
	shortDescription: string;
	description: string;
	warningLevel: "warning" | "error" | string;
	actions: [string, string][];
	resolved: boolean;
	reportId: number;
	createdAt: Date;
	updatedAt: Date;
}

const Report: React.FC<ReportProps> = (props: ReportProps) => {
	const { title, description, shortDescription, resolved, warningLevel, actions, reportId } =
		props;

	const [actionFormOpen, setActionFormOpen] = React.useState(false);

	const reportComponentId = `playground-report-${reportId}`;
	const reportContentId = `playground-report-content-${reportId}`;

	return (
		<React.Fragment>
			<Accordion
				sx={{
					backgroundColor: "lightDark.main",
					color: "white.main",
					width: "100%",
					border: (theme: Theme) =>
						`1px solid ${Coloring.rgba(theme.palette.white.main, 0.2)}`,
					"&:hover": {
						".MuiAccordionSummary-root": {
							backgroundColor: "lightDarkBright.main",
						},
					},
				}}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls={`${reportComponentId}-content`}
					sx={{
						paddingLeft: 0,
						'&[aria-expanded="true"]': {
							borderBottom: (theme: Theme) =>
								`1px solid ${Coloring.rgba(theme.palette.white.main, 0.4)}`,
						},
						"& .MuiAccordionSummary-expandIconWrapper": {
							color: "white.main",
						},
						"& .MuiAccordionSummary-content": {
							margin: 0,
							minHeight: "inherit",
							"> span": {
								opacity: 0.6,
							},
						},
						"& .MuiAccordionSummary-content.Mui-expanded": {
							margin: 0,
							minHeight: "inherit",
						},
					}}
					id={reportComponentId}
				>
					<Tooltip title={warningLevel}>
						<Box
							component="div"
							sx={{
								display: "flex",
								...(warningLevel === "warning" && {
									backgroundColor: "warning.main",
								}),
								...(warningLevel === "error" && {
									backgroundColor: "error.main",
								}),
								width: "20px",
								margin: "0 10px 0 0",
								padding: 0,
								height: "inherit",
								borderTopLeftRadius: "4px",
								borderBottomLeftRadius: "4px",
							}}
						/>
					</Tooltip>
					<Typography
						variant="h5"
						component="span"
						align="center"
						sx={{
							display: "flex",
							alignItems: "center",
							maxWidth: "30%",
							margin: "10px 0",
							padding: "0 10px",
						}}
					>
						{title ?? `Report #${reportId}`}
					</Typography>
					<Typography
						variant="body1"
						component="span"
						align="left"
						sx={{
							display: "flex",
							alignItems: "center",
							width: "60%",
							margin: "10px 0 10px 20px",
						}}
					>
						{shortDescription}
					</Typography>
				</AccordionSummary>
				<Divider orientation="horizontal" flexItem />
				<AccordionDetails id={reportContentId}>
					<Stack
						direction="column"
						divider={<Divider orientation="horizontal" flexItem />}
						spacing={1}
						sx={{
							"> .MuiDivider-root": {
								borderColor: (theme: Theme) =>
									Coloring.rgba(theme.palette.white.main, 0.4),
							},
						}}
					>
						<Typography
							variant="body1"
							component="span"
							align="left"
							sx={{
								color: (theme: Theme) =>
									Coloring.rgba(theme.palette.white.main, 0.8),
							}}
						>
							{description}
						</Typography>
						<List
							aria-labelledby={`${reportComponentId}-action-list-subheader`}
							subheader={
								<ListSubheader
									id={`${reportComponentId}-action-list-subheader`}
									disableGutters
									disableSticky
									component="h6"
									sx={{
										textAlign: "start",
										margin: "0.5em 0",
										lineHeight: "normal",
										color: (theme: Theme) =>
											Coloring.rgba(theme.palette.white.main, 0.8),
									}}
								>
									Actions
								</ListSubheader>
							}
						>
							{actions.length ? (
								actions.map((event: [string, string], index: number) => {
									const eventTimestamp = event[0];
									const eventDescription = event[1];

									return (
										<ListItem
											key={`${reportComponentId}-action-${index}`}
											id={`${reportComponentId}-action-${index}`}
											sx={{
												display: "flex",
												"&:hover": {
													backgroundColor: "lightDarkBright.main",
												},
											}}
										>
											<ListItemIcon>
												<ReceiptLongIcon sx={{ color: "white.main" }} />
											</ListItemIcon>
											<ListItemText>
												<Typography
													variant="body2"
													component="span"
													sx={{
														display: "flex",
														alignItems: "center",
														width: "10%",
														margin: "2px 0",
														padding: "0 10px",
														color: (theme: Theme) =>
															Coloring.rgba(
																theme.palette.white.main,
																0.6
															),
													}}
												>
													{eventTimestamp}
												</Typography>
												<Typography
													variant="body1"
													component="span"
													align="left"
													sx={{
														display: "flex",
														alignItems: "center",
														margin: "2px 0",
														padding: "0 10px",
														color: "white.main",
													}}
												>
													{eventDescription}
												</Typography>
											</ListItemText>
										</ListItem>
									);
								})
							) : (
								<ListItem
									style={{ alignItems: "center", justifyContent: "center" }}
								>
									<NoResultsOverlay
										text="Report has no actions"
										iconSize={32}
										textSize="medium"
									/>
								</ListItem>
							)}
						</List>
						<Button
							startIcon={<AddIcon />}
							onClick={() => setActionFormOpen(true)}
							sx={{
								color: (theme: Theme) =>
									Coloring.rgba(theme.palette.white.main, 0.6),
								"&:hover": {
									color: "white.main",
								},
							}}
						>
							Add Action
						</Button>
					</Stack>
				</AccordionDetails>
			</Accordion>
			<AddActionForm
				open={actionFormOpen}
				onCancel={() => setActionFormOpen(false)}
				reportId={reportId}
				closed={resolved}
			/>
		</React.Fragment>
	);
};

export default Report;
