import React from "react";
import ReportIcon from '@mui/icons-material/Report';
import { Grid, Theme, Tooltip, Typography } from "@mui/material";
import DataUsageIcon from '@mui/icons-material/DataUsage';
import Battery20Icon from '@mui/icons-material/Battery20';
import Battery50Icon from '@mui/icons-material/Battery50';
import Battery90Icon from '@mui/icons-material/Battery90';
import BatteryAlertIcon from '@mui/icons-material/BatteryAlert';

import Coloring from "../../utils/coloring";

export interface MetricsProps {
	ticks: number;
    batTick: number;
    batCommunication: number;
    failed: number;
} 

const Metrics: React.FC<MetricsProps> = (props : MetricsProps) => {
    const {
        ticks,
        batTick,
        batCommunication,
        failed
    } = props;

    const avgUsage = (batCommunication / ticks);
    const lowUsageLimit = avgUsage * 0.9;
    const highUsageLimit = avgUsage * 1.1;
    const criticalUsageLimit = avgUsage * 1.2;

    const batteryUsageTooltip =
                (batTick < lowUsageLimit) ?
                    "Low battery usage" :
                    (batTick > criticalUsageLimit) ?
                        "Critical battery usage" :
                        (batTick > highUsageLimit) ?
                            "High battery usage" :
                            "Normal battery usage";

    return (
        <Grid
            container
            rowSpacing={8}
            direction="column"
            style={{
                height: "100%",
                margin: "32px 0",
            }}
        >
            <Grid
                item
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography
                    variant="h4"
                    component="h6"
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {failed}
                    <ReportIcon color="error" fontSize="large" style={{ margin: "0 8px" }} />
                </Typography>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography
                        variant="h6"
                        component="span"
                        style={{ opacity: 0.8 }}
                    >
                        Devices Failed
                    </Typography>
                    <Typography
                        variant="body2"
                        component="span"
                        style={{ opacity: 0.4 }}
                        fontSize="small"
                    >
                        Total number of failures in the system
                    </Typography>

                </div>
            </Grid>

            <Grid
                item
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Tooltip title={batteryUsageTooltip}>
                    <Typography
                        variant="h4"
                        component="h6"
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {batTick}mAh
                        <Typography
                            variant="h5"
                            component="span"
                            sx={{
                                marginLeft: "8px",
                                opacity: 1.0,
                                ...(batTick < lowUsageLimit && {
                                    color: "success.main",  
                                }),
                                ...(batTick > criticalUsageLimit && {
                                    color: "error.main",  
                                }),
                                ...((batTick > highUsageLimit && batTick <= criticalUsageLimit) && {
                                    color: "warning.main",
                                }),
                                ...((batTick >= lowUsageLimit && batTick <= highUsageLimit) && {
                                    color: "white.main",  
                                }),
                            }}
                        >
                            ({batTick >= avgUsage ? "+" : ""}{((batTick/avgUsage - 1) * 100).toFixed(2)}%)
                        </Typography>
                        {batTick < lowUsageLimit &&
                            <Battery20Icon color="success" fontSize="large" />
                        }
                        {batTick > criticalUsageLimit &&
                            <BatteryAlertIcon color="error" fontSize="large" />
                        }
                        {(batTick > highUsageLimit && batTick <= criticalUsageLimit) &&
                            <Battery90Icon color="warning" fontSize="large" />
                        }
                        {(batTick >= lowUsageLimit && batTick <= highUsageLimit) &&
                            <Battery50Icon color="inherit" fontSize="large" />
                        }
                    </Typography>
                </Tooltip>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography
                        variant="h6"
                        component="span"
                        style={{ opacity: 0.8 }}
                    >
                        Battery consumption
                    </Typography>
                    <Typography
                        variant="body2"
                        component="span"
                        style={{ opacity: 0.4 }}
                        fontSize="small"
                    >
                        Battery consumed in the last tick
                    </Typography>

                </div>
            </Grid>

            <Grid
                item
                style={{
                    gridArea: "consum-total",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography
                    variant="h4"
                    component="h6"
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {batCommunication}mAh
                    <DataUsageIcon color="info" fontSize="large" style={{ margin: "0 8px" }} />
                </Typography>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography
                        variant="h6"
                        component="span"
                        style={{ opacity: 0.8 }}
                    >
                        Total consumption
                    </Typography>
                    <Typography
                        variant="body2"
                        component="span"
                        style={{ opacity: 0.4 }}
                        fontSize="small"
                    >
                        Total battery consumption in the communication
                    </Typography>

                </div>
            </Grid>

        </Grid>
    );
}

export default Metrics;