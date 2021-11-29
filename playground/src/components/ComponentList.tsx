import React from "react";
import ComponentCard from "./ComponentCard";

function ComponentList(): React.ReactElement {
	const cards = [];

	for (let i = 0; i < 10; i++) cards.push(<ComponentCard />);

	return <div>{cards}</div>;
}

export default ComponentList;
