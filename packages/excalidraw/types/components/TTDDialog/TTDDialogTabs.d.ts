import type { ReactNode } from "react";
declare const TTDDialogTabs: {
	(
		props: {
			children: ReactNode;
		} & {
			dialog: "ttd";
			tab: "text-to-diagram" | "mermaid";
		},
	): JSX.Element;
	displayName: string;
};
export default TTDDialogTabs;
