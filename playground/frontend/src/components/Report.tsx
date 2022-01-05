import React, { useCallback } from "react";
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
	Paper,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	ButtonGroup,
	Button,
} from "@mui/material";
import Box from "@mui/system/Box";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { ReportResource } from "../resources/ReportResource";
import { useController } from "rest-hooks";

export interface ReportProps {
	title: string;
	shortDescription: string;
	description: string;
	warningLevel: "warning" | "error";
	actions: [string, string][];
	resolved: boolean;
	reportId: number;
	createdAt: Date;
	updatedAt: Date;
}

const Report: React.FC<ReportProps> = (props: ReportProps) => {
	const { title, description, shortDescription, warningLevel, actions, reportId } = props;

	const controller = useController();
	const markSolved = useCallback(async () => {
		await controller.fetch(ReportResource.update(), { id: reportId }, { resolved: true });
	}, [controller, reportId]);

	const reportComponentId = `PlaygroundReport-${reportId}`;
	return (
		<Paper elevation={4} id={reportComponentId}>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls={`${reportComponentId}-content`}
					sx={{
						paddingLeft: 0,
						"& .MuiAccordionSummary-content": {
							margin: 0,
							minHeight: "inherit",
						},
						"& .MuiAccordionSummary-content.Mui-expanded": {
							margin: 0,
							minHeight: "inherit",
						},
					}}
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
							}}
						/>
					</Tooltip>
					<Typography
						variant="h5"
						component="h1"
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
							color: "text.secondary",
							margin: "10px 0 10px 20px",
						}}
					>
						{shortDescription}
					</Typography>
				</AccordionSummary>
				<Divider orientation="horizontal" flexItem />
				<AccordionDetails>
					<Stack
						direction="column"
						divider={<Divider orientation="horizontal" flexItem />}
						spacing={1}
					>
						<Typography variant="body1" component="span" align="left">
							{description}
						</Typography>
						<List
							aria-labelledby={`${reportComponentId}-action-list-subheader`}
							subheader={
								<ListSubheader
									id={`${reportComponentId}-action-list-subheader`}
									component="h6"
									sx={{
										textAlign: "start",
										margin: "0.5em 0",
									}}
								>
									Actions
								</ListSubheader>
							}
						>
							{actions.map((event: [string, string], index: number) => {
								const eventTimestamp = event[0];
								const eventDescription = event[1];

								return (
									<ListItem
										key={`${reportComponentId}-action-${index}`}
										id={`${reportComponentId}-action-${index}`}
										style={{ display: "flex" }}
									>
										<ListItemIcon>
											<ReceiptLongIcon />
										</ListItemIcon>
										<ListItemText>
											<Typography
												variant="h6"
												component="div"
												sx={{
													display: "flex",
													alignItems: "center",
													width: "10%",
													margin: "5px 0",
													padding: "0 10px",
												}}
											>
												{eventTimestamp}
											</Typography>
											<Typography
												variant="body2"
												component="span"
												align="left"
												sx={{
													display: "flex",
													alignItems: "center",
													margin: "5px 0",
													padding: "0 10px",
												}}
											>
												{eventDescription}
											</Typography>
										</ListItemText>
									</ListItem>
								);
							})}
						</List>
						<ButtonGroup variant="contained" aria-label="actions button">
							<Button
								startIcon={<AddIcon />}
								onClick={() => console.info(`ADD ACTION`)}
								color="primary"
								sx={{
									margin: "5px 10px",
								}}
							>
								Add Action
							</Button>
							<Button
								startIcon={<CheckIcon />}
								onClick={() => {
									markSolved();
								}}
								color="success"
								sx={{
									margin: "5px 10px",
								}}
							>
								Mark as resolved
							</Button>
						</ButtonGroup>
					</Stack>
				</AccordionDetails>
			</Accordion>
		</Paper>
	);
};

export default Report;
