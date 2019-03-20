/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {string} from "prop-types";

export const flashMessageShape = {
    title: string,
    message: string,
    severity: string,
    dismissText: string,
};