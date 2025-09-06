/// <reference types="react" />
import "./Spinner.scss";
declare const Spinner: ({
	size,
	circleWidth,
	synchronized,
	className,
}: {
	size?: string | number | undefined;
	circleWidth?: number | undefined;
	synchronized?: boolean | undefined;
	className?: string | undefined;
}) => JSX.Element;
export default Spinner;
