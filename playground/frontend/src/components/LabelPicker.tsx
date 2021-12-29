import { Autocomplete, AutocompleteChangeReason, autocompleteClasses, AutocompleteCloseReason, Box, Button, Chip, ClickAwayListener, Container, InputBase, Popper, styled, Tooltip, Typography } from "@mui/material";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import CircleIcon from '@mui/icons-material/Circle';

import theme from "../styles/theme";
import Coloring from "../utils/coloring";

interface Label {
    name: string;
    color: string;
    description?: string;
}

interface PopperComponentProps {
    anchorEl?: any;
    disablePortal?: boolean;
    open: boolean;
}

const StyledPopper = styled(Popper)( ({theme}) => ({
    border: `1px solid ${theme.palette.mode === "light" ? "#e1e4e8" : "#30363d"}`,
    boxShadow: `0 8px 24px ${theme.palette.mode === "light" ? "rgba(149, 157, 165, 0.2)" : "rgb(1, 4, 9)"}`,
    borderRadius: 6,
    width: 300,
    zIndex: theme.zIndex.modal,
    fontSize: 13,
    color: theme.palette.mode === "light" ? "#24292e" : "c9d1d9",
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1c2128",
}));

const StyledPopperComponent = styled("div")( ({theme}) => ({
    [`& .${autocompleteClasses.paper}`]: {
        boxShadow: "none",
        margin: 0,
        color: "inherit",
        fontSize: 13,
    },
    [`& .${autocompleteClasses.listbox}`]: {
        backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1c2128",
        padding: 0,
        width: "inherit",
        [`& .${autocompleteClasses.option}`]: {
            minHeight: "auto",
            alignItems: "flex-start",
            padding: 8,
            borderBottom: `1px solid ${theme.palette.mode === "light" ? "#eaecef" : "#30363d"}`,
            '&[aria-selected="true"]': {
                backgroundColor: "transparent",
            },
            '&[data-focus="true"], &[data-focus="true"][aria-selected="true"]': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    },
    [`&.${autocompleteClasses.popperDisablePortal}`]: {
        position: "relative",
    },
}));

const PopperComponent : React.FC<PopperComponentProps> = (props : PopperComponentProps) => {
    const { anchorEl, disablePortal, open, ...rest } = props;

    return (<StyledPopperComponent {...rest} />);
}

interface LabelPickerProps {
    labels: Label[];
}

const LabelPicker : React.FC<LabelPickerProps> = (props : LabelPickerProps) => {
    const { labels } = props;

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [selected, setSelected] = React.useState<Label[]>(labels);
    const [searchValue, setSearchValue] = React.useState<Label[]>([]);
    const open = Boolean(anchorEl);

    const closeLabelPicker = () => {
        setSelected(searchValue);
        if (anchorEl)
            anchorEl.focus();
        setAnchorEl(null);
    }

    const labelPickerId = open ? "label-picker" : undefined;
    
    return (
        <details>
            <Container component="summary" >
                <Button
                    disableRipple
                    aria-describedby={labelPickerId}
                    onClick={( event: React.MouseEvent<HTMLElement, MouseEvent> ) => {
                        setSearchValue(selected);
                        setAnchorEl(event.currentTarget);
                    }}
                    sx={{
                        width: "100%"
                    }}
                >
                    <Typography variant="button" component="span" sx={{ mr: "auto" }} >Labels</Typography>
                    <SettingsIcon />
                </Button>
                <Container component="div">
                    {selected?.map( (label) => (
                        <Tooltip arrow describeChild title={label.description ?? ""}>
                            <Chip
                                key={label.name}
                                label={label.name}
                                sx={[
                                    {
                                        mr: 1,
                                        mt: 1,
                                        border: "1px solid transparent",
                                    },
                                    () => {
                                        const [h, s, l, a] = Coloring.hexToHSLA(label.color);
                                        const [r, g, b, _] = Coloring.hextoRGBA(label.color);
                                        const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
                                        const lightness = (0.5 - luminance) * 100;
                                        return ({
                                            backgroundColor: `rgba(${r}, ${g}, ${b}, 0.18)`,
                                            color: `hsl(${h}, calc(${s} * 1%), calc((${l} + ${lightness}) * 1%))`,
                                            borderColor: `hsla(${h}, calc(${s} * 1%), calc((${l} + ${lightness}) * 1%), 0.3)`,
                                        });
                                    }
                                ]}
                            />
                        </Tooltip>
                    ))}
                </Container>
            </Container>
            <StyledPopper open={open} anchorEl={anchorEl} placement="bottom-start">
                <ClickAwayListener onClickAway={closeLabelPicker}>
                    <Container disableGutters component="div" sx={{ width: "300px" }}>
                        <Box
                            sx={{
                                padding: "8px 10px",
                                fontWeight: 600,
                                borderBottom: `1px solid ${theme.palette.mode === "light" ? "#eaecef" : "#30363d"}`,
                            }}
                        >
                            <Typography variant="subtitle2" component="span">
                                Filter by labels
                            </Typography>
                        </Box>
                        <Autocomplete
                            open
                            multiple
                            value={searchValue}
                            onClose={ (event : React.SyntheticEvent, reason: AutocompleteCloseReason) => {
                                if (reason === "escape")
                                    closeLabelPicker();
                            }}
                            onChange={ (event : React.SyntheticEvent, value : Label[], reason: AutocompleteChangeReason) => {
                                if (event.type === "keydown" &&
                                    (event as React.KeyboardEvent).key === "Backspace" &&
                                    reason === "removeOption")
                                    return;
                                
                                setSearchValue(value);
                            }}
                            disableCloseOnSelect
                            PopperComponent={PopperComponent}
                            renderTags={() => null}
                            noOptionsText="No tags"
                            options={
                                [...labels].sort( ( labelA, labelB ) => {
                                    let labelAIdx = selected!.indexOf(labelA);
                                    let labelBIdx = selected!.indexOf(labelB);
                                    labelAIdx = labelAIdx === -1 ? selected!.length + labels.indexOf(labelA) : labelAIdx;
                                    labelBIdx = labelBIdx === -1 ? selected!.length + labels.indexOf(labelB) : labelBIdx;
                                    return labelAIdx - labelBIdx;
                                })
                            }
                            renderOption={(props : React.HTMLAttributes<HTMLLIElement>, option, {selected}) => (
                                <li {...props}>
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
                                                color: theme.palette.mode === "light" ? '#586069' : '#8b949e',
                                            }
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
                                </li>
                            )}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <InputBase
                                    sx={{
                                        padding: 1,
                                        width: "100%",
                                        borderBottom: `1px solid ${theme.palette.mode === "light" ? "#eaecef" : "#30363d"}`,
                                        "& input": {
                                            borderRadius: 4,
                                            backgroundColor: theme.palette.mode === "light" ? "#fff" : "#0d1117",
                                            padding: 1,
                                            transition: theme.transitions.create(["border-color", "box-shadow"]),
                                            border: `1px solid ${theme.palette.mode === "light" ? "#eaecef" : "#30363d"}`,
                                            fontSize: 14,
                                            "&:focus": {
                                            boxShadow: `0px 0px 0px 3px ${
                                                theme.palette.mode === "light"
                                                ? "rgba(3, 102, 214, 0.3)"
                                                : "rgb(12, 45, 107)"
                                            }`,
                                            borderColor: theme.palette.mode === "light" ? "#0366d6" : "#388bfd",
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
}

export default LabelPicker;