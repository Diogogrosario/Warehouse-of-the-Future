import React from "react";
import { Tab, Tabs, Theme, Typography } from "@mui/material";
import BarChartIcon from '@mui/icons-material/BarChart';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';

import Coloring from "../../utils/coloring";

const Simulation: React.FC = () => {
    const [selectedTab, setSelectedTab] = React.useState(0);

    return (
        <div
            style={{
                height: "100%",
                display: "grid",
                gridTemplateRows: "auto auto 1fr",
                gridTemplateAreas: `
                    "sim-header"
                    "sim-content"
                `,
                margin: "10px",
            }}
        >
            <div style={{ gridArea: "sim-header" }}>
                <Typography align="left" component="h3" variant="h5"
                    style={{
                        padding: "10px",
                        opacity: 0.8,
                    }}
                >
                    Mesh Communication
                </Typography>
                <Tabs
                    value={selectedTab}
                    onChange={(event: React.SyntheticEvent, newValue: number) => setSelectedTab(newValue) }
                    aria-label="simulation tabs"
                    variant="standard"
                    sx={{
                        gridArea: "sim-nav",
                        boxShadow: (theme: Theme) => `inset 0 -1px 0 ${Coloring.rgba(theme.palette.white.main, 0.2)}`,
                        ".MuiTabs-flexContainer > .MuiTab-root": {
                            color: "white.main",
                            borderBottom: "2px solid transparent",
                            "&:hover": {
                                borderBottomColor: (theme: Theme) => Coloring.rgba(theme.palette.white.main, 0.6),
                            }
                        },
                        ".MuiTabs-indicator": {
                            backgroundColor: (theme: Theme) => Coloring.rgba(theme.palette.amber.main, 0.8),
                        },
                    }}
                >
                    <Tab
                        id="sim-tab-0"
                        aria-controls="sim-tabpanel-0"
                        label="Metrics"
                        icon={<BarChartIcon />}
                        iconPosition="start"
                    />
                    <Tab
                        id="sim-tab-1"
                        aria-controls="sim-tabpanel-1"
                        label="Devices"
                        icon={<DeviceHubIcon />}
                        iconPosition="start"
                    />
                </Tabs>
            </div>
        </div>
    );
}

export default Simulation;