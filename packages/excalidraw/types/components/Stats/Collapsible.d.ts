/// <reference types="react" />
interface CollapsibleProps {
	label: React.ReactNode;
	open: boolean;
	openTrigger: () => void;
	children: React.ReactNode;
}
declare const Collapsible: ({
	label,
	open,
	openTrigger,
	children,
}: CollapsibleProps) => JSX.Element;
export default Collapsible;
