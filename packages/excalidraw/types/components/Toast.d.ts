import type { CSSProperties } from "react";
import "./Toast.scss";
export declare const Toast: ({
	message,
	onClose,
	closable,
	duration,
	style,
}: {
	message: string;
	onClose: () => void;
	closable?: boolean | undefined;
	duration?: number | undefined;
	style?: CSSProperties | undefined;
}) => JSX.Element;
