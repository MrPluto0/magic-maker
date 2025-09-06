/// <reference types="react" />
import "./TextInput.scss";
import "./ProjectName.scss";
type Props = {
	value: string;
	onChange: (value: string) => void;
	label: string;
	ignoreFocus?: boolean;
};
export declare const ProjectName: (props: Props) => JSX.Element;
export {};
