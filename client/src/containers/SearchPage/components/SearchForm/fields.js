import React from "react";
import Dropdown from "../../../../components/Dropdown";
import SearchField from "../SearchField";

export const FIELDS = {
    conceptTitle: {
        id: "conceptTitle",
        name: "conceptTitle",
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