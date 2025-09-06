/// <reference types="react" />
import "./ScrollableList.scss";
interface ScrollableListProps {
	className?: string;
	placeholder: string;
	children: React.ReactNode;
}
export declare const ScrollableList: ({
	className,
	placeholder,
	children,
}: ScrollableListProps) => JSX.Element;
export {};
