import Dropdown from "../../../../components/Dropdown";
import SearchField from "../SearchField";

export const FIELDS = {
    title: {
        id: "title",
        name: "title",
        component: SearchField
    },
    language: {
        id: "language",
        name: "language",
        component: Dropdown
    },
    subject: {
        id: "subject",
        name: "subject",
        component: Dropdown
    }
};