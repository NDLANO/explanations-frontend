/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Dropdown from "../../../../components/Dropdown";
import SearchField from "./SearchFieldComponent";

export const FIELDS = {
    title: {
        id: "title",
        name: "title",
        placeholder: "search.input.placeholder",
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