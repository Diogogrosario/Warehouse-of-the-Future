import {
	List,
	ListItem
} from "@mui/material";
import Report from "./Report";
import React, { Suspense, useEffect, useState } from "react";
import { ReportResource } from "../../resources/ReportResource";
import { NetworkErrorBoundary, useResource, useSubscription } from "rest-hooks";
import ReportSorting from "./ReportSorting";
import ReportFiltering from "./ReportFiltering";

interface AsyncBoundaryProps {
	fallback?: React.ReactElement;
	children: React.ReactNode;
}

function AsyncBoundary({ children, fallback = <span>loading</span> }: AsyncBoundaryProps) {
	return (
		<Suspense fallback={fallback}>
			<NetworkErrorBoundary>{children}</NetworkErrorBoundary>
		</Suspense>
	);
}

export default function ReportList() {
	
	const reports =useResource(ReportResource.list(), {});
	useSubscription(ReportResource.list(), {});

	const [sorted, setSorted] = useState(reports.map((report) => report.id));

	const [excluded, setExcluded] = useState(reports.map(() => false));

	useEffect(() => {
		setSorted(reports.map((report) => report.id));
	}, [reports]);

	return (
		<AsyncBoundary>
			<div>
				<ReportSorting reports={reports} setSorted={setSorted} />
				<ReportFiltering reports={reports} setExcluded={setExcluded} />
				<List>
					{reports.length > 0 && sorted.map((id, i) => {
						const report = reports.find((report) => report.id == id) || reports[0];

						return !excluded[i] && (
							<ListItem key={i}>
								<Report
									title={report.title}
									description={report.description}
									shortDescription={"Imagina ter uma descrição :)"}
									warningLevel={report.severity}
									actions={report.actions.map((action) => {
										return [
											new Date(action["createdAt"]).toLocaleString("pt-PT"),
											action["description"],
										];
									})}
									resolved={report.resolved}
									reportId={report.id}
									createdAt={report.createdAt}
									updatedAt={report.updatedAt}
								/>
							</ListItem>
						);
					})}
				</List>
			</div>
		</AsyncBoundary>
	);
}
