import React from "react";

interface TabPanelProps {
	children?: React.ReactNode;
	emptyComponent?: React.ReactNode;
	index: number;
	value: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TabPanel: React.FC<TabPanelProps & Record<string, any>> = (props) => {
	const { children, emptyComponent, index, value, ...other } = props;
	return (
		<div role="tabpanel" hidden={value !== index} {...other}>
			{value === index && (children ?? emptyComponent)}
		</div>
	);
};

export default TabPanel;
