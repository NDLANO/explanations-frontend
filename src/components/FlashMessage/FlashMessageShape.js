// Required
import {shape, string} from "prop-types";

export const flashMessageShape = shape({
    dismissText: string.isRequired,

    // Optional
    title: string,
    message: string,
    severity: string,
});