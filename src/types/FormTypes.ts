import { ErrorOption } from "react-hook-form";
import { object } from "yup";

export type InputFieldType = {
    type: string;
    placeholder: string;
    name: string;
    label: string;
    register: any;
    error: undefined | ErrorOption;
}