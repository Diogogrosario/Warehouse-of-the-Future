import React from "react";
import {
	Autocomplete,
	autocompleteClasses,
	AutocompleteCloseReason,
	Box,
	Button,
	ButtonProps,
	Chip,
	ClickAwayListener,
	Container,
	InputBase,
	Popper,
	styled,
	Tooltip,
	Typography,
	Theme,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

import theme from "../styles/theme";
import Coloring from "../utils/coloring";

export interface Label {
	name: string;
	color: string;
	description?: string;
	group?: string;
}

interface PopperComponentProps {
	anchorEl?: HTMLElement | object | (() => object | HTMLElement) | null;
	disablePortal?: boolean;
	open: boolean;
}

const StyledPopper = styled(Popper)(({ theme }) => ({
	border: `1px solid ${Coloring.rgba(theme.palette.white.main, 0.2)}`,
	borderRadius: 6,
	width: 300,
	zIndex: theme.zIndex.modal,
	fontSize: 13,
	color: theme.palette.white.main,
	backgroundColor: theme.palette.lightDark.main,
}));

const StyledPopperComponent = styled("div")(({ theme }) => ({
	[`& .${autocompleteClasses.paper}`]: {
		boxShadow: "none",
		margin: 0,
		color: "inherit",
		fontSize: 13,
		backgroundColor: "inherit",
	},
	[`& .${autocompleteClasses.noOptions}`]: {
		color: Coloring.rgba(theme.palette.white.main, 0.6),
	},
	[`& .${autocompleteClasses.listbox}`]: {
		backgroundColor: theme.palette.lightDark.main,
		padding: 0,
		width: "inherit",
		[`& .${autocompleteClasses.option}`]: {
			minHeight: "auto",
			alignItems: "flex-start",
			padding: 8,
			borderBottom: `1px solid ${Coloring.rgba(theme.palette.white.main, 0.4)}`,
			'&[aria-selected="true"]': {
				backgroundColor: theme.palette.lightDark.main,
			},
			'&.Mui-focused, &[aria-selected="true"].Mui-focused': {
				backgroundColor: theme.palette.lightDarkBright.main,
			},
		},
		"> li": {
			"> .MuiListSubheader-root": {
				backgroundColor: theme.palette.dark.main,
				color: Coloring.rgba(theme.palette.white.main, 0.6),
				borderBottom: `1px solid ${Coloring.rgba(theme.palette.white.main, 0.4)}`,
			},
		},
	},
	[`&.${autocompleteClasses.popperDisablePortal}`]: {
		position: "relative",
	},
}));

const StyledOptionComponent = styled("li")(({ theme }) => ({
	backgroundColor: theme.palette.lightDark.main,
}));

const PopperComponent: React.FC<PopperComponentProps> = (props: PopperComponentProps) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { anchorEl, disablePortal, open, ...rest } = props;

	return <StyledPopperComponent {...rest} />;
};

interface LabelPickerProps {
	labels: Label[];
	onSelectedLabelsChange?: (selectedLabels: number[]) => void;
	buttonProps?: ButtonProps;
	showSelectedLabels?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LabelPicker: React.FC<LabelPickerProps & Record<string, any>> = (props) => {
	const { labels, onSelectedLabelsChange, buttonProps, showSelectedLabels, ...rest } = props;

	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
	const [selected, setSelected] = React.useState<Label[]>([]);
	const [searchValue, setSearchValue] = React.useState<string>("");
	const open = Boolean(anchorEl);

	const closeLabelPicker = () => {
		if (anchorEl) anchorEl.focus();
		setAnchorEl(null);
	};

	const labelPickerId = open ? "label-picker" : undefined;

	return (
		<details {...rest}>
			<Container component="summary" style={{ padding: 0, height: "100%" }}>
				<Button
					disableRipple
					aria-describedby={labelPickerId}
					{...buttonProps}
					onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) =>
						setAnchorEl(event.currentTarget)
					}
					endIcon={<SettingsIcon />}
					sx={{
						width: "100%",
						height: "inherit",
					}}
				>
					<Typography variant="button" component="span">
						Labels
					</Typography>
				</Button>
				{showSelectedLabels && (
					<Container component="div">
						{selected?.map((label) => (
							<Tooltip
								arrow
								describeChild
								title={label.description ?? ""}
								key={label.name}
							>
								<Chip
									label={label.name}
									sx={[
										{
											mr: 1,
											mt: 1,
											border: "1px solid transparent",
										},
										() => {
											const [h, s, l, _1] = Coloring.hexToHSLA(label.color);
											const [r, g, b, _2] = Coloring.hextoRGBA(label.color);
											const luminance =
												(0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
											const lightness = (0.5 - luminance) * 100;
											return {
												backgroundColor: `rgba(${r}, ${g}, ${b}, 0.18)`,
												color: `hsl(${h}, calc(${s} * 1%), calc((${l} + ${lightness}) * 1%))`,
												borderColor: `hsla(${h}, calc(${s} * 1%), calc((${l} + ${lightness}) * 1%), 0.3)`,
											};
										},
									]}
								/>
							</Tooltip>
						))}
					</Container>
				)}
			</Container>
			<StyledPopper open={open} anchorEl={anchorEl} placement="bottom-start">
				<ClickAwayListener onClickAway={closeLabelPicker}>
					<Container
						disableGutters
						component="div"
						sx={{
							width: "300px",
							backgroundColor: "lightDark.main",
							color: "white.main",
						}}
					>
						<Box
							sx={{
								padding: "8px 10px",
								fontWeight: 600,
								borderBottom: `1px solid white.main`,
							}}
						>
							<Typography variant="subtitle2" component="span">
								Filter by labels
							</Typography>
						</Box>
						<Autocomplete
							open
							multiple
							value={selected}
							groupBy={(option: Label) => option.group ?? ""}
							onClose={(
								event: React.SyntheticEvent,
								reason: AutocompleteCloseReason
							) => {
								if (reason === "escape") closeLabelPicker();
							}}
							onChange={(_: React.SyntheticEvent, value: Label[]) => {
								setSelected(value);
								onSelectedLabelsChange?.(
									value.map((label) => labels.indexOf(label))
								);
							}}
							disableCloseOnSelect
							PopperComponent={PopperComponent}
							renderTags={() => null}
							noOptionsText="No tags"
							options={labels}
							sx={{
								backgroundColor: "inherit",
							}}
							renderOption={(
								props: React.HTMLAttributes<HTMLLIElement>,
								option,
								{ selected }
							) => (
								<StyledOptionComponent {...props}>
									<Box
										component={DoneIcon}
										sx={{
											width: 17,
											height: 17,
											mr: "5px",
											ml: "-2px",
											visibility: selected ? "visible" : "hidden",
										}}
									/>
									<Box
										component="span"
										sx={{
											width: 14,
											height: 14,
											flexShrink: 0,
											borderRadius: "7px",
											mr: 1,
											mt: "2px",
											backgroundColor: option.color,
										}}
									/>
									<Box
										sx={{
											flexGrow: 1,
											"& span": {
												color: (theme: Theme) =>
													Coloring.rgba(theme.palette.white.main, 0.6),
											},
										}}
									>
										<Typography variant="body1" component="h6">
											{option.name}
										</Typography>
										<br />
										<Typography variant="body2" component="span">
											{option.description}
										</Typography>
									</Box>
									<Box
										component={CloseIcon}
										sx={{
											opacity: 0.6,
											width: 18,
											height: 18,
											visibility: selected ? "visible" : "hidden",
										}}
									/>
								</StyledOptionComponent>
							)}
							getOptionLabel={(option) => option.name}
							inputValue={searchValue}
							onInputChange={(
								_: React.SyntheticEvent,
								value: string,
								reason: string
							) => {
								if (reason !== "reset") setSearchValue(value);
							}}
							renderInput={(params) => (
								<InputBase
									sx={{
										width: "100%",
										padding: "16px",
										borderBottom: (theme: Theme) => {
											const [r, g, b, _] = Coloring.hextoRGBA(
												theme.palette.white.main
											);
											return `1px solid rgba(${r}, ${g}, ${b}, 0.2)`;
										},
										backgroundColor: "inherit",
										"> input": {
											color: (theme: Theme) =>
												Coloring.rgba(theme.palette.white.main, 0.6),
											padding: "8px",
											"&::placeholder": {
												opacity: 0.6,
											},
											borderRadius: 4,
											border: (theme: Theme) => {
												const [r, g, b, _] = Coloring.hextoRGBA(
													theme.palette.white.main
												);
												return `1px solid rgba(${r}, ${g}, ${b}, 0.2)`;
											},
											transition: theme.transitions.create([
												"border-color",
												"box-shadow",
											]),
											"&:hover": {
												border: (theme: Theme) => {
													const [r, g, b, _] = Coloring.hextoRGBA(
														theme.palette.white.main
													);
													return `1px solid rgba(${r}, ${g}, ${b}, 0.4)`;
												},
												backgroundColor: (theme: Theme) => {
													const [r, g, b, _] = Coloring.hextoRGBA(
														theme.palette.dark.main
													);
													return `rgba(${r}, ${g}, ${b}, 0.6)`;
												},
												color: (theme: Theme) =>
													Coloring.rgba(theme.palette.white.main, 0.8),
											},
											"&:focus": {
												boxShadow: (theme: Theme) =>
													`0px 0px 0px 3px ${theme.palette.blue.dark}`,
												border: (theme: Theme) =>
													`1px solid ${theme.palette.white.main}`,
												backgroundColor: "dark.main",
												color: "white.main",
											},
										},
									}}
									ref={params.InputProps.ref}
									inputProps={params.inputProps}
									autoFocus
									placeholder="Filter labels"
								/>
							)}
						/>
					</Container>
				</ClickAwayListener>
			</StyledPopper>
		</details>
	);
};

export default LabelPicker;
