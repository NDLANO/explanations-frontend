/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import {renderToString} from "react-dom/server";
import HTML from "./components/HTML";
import {config} from "../config";

export const renderHtmlString = (locale) =>
    renderToString(
        <HTML config={{...config.CLIENT}} state={{locale: locale}} />,
    );