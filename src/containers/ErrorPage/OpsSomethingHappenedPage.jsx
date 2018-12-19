/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */


import React from 'react';
import { injectT } from 'ndla-i18n';
import ErrorComponent from "./components/ErrorComponent";
import PropTypes from "prop-types";

const OpsSomethingHappenedPage = ({ t, message }) => <ErrorComponent gif='/oops.gif' statusCode={500} description={message} t={t} />;

OpsSomethingHappenedPage.propTypes = {
    t: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
};

export default injectT(OpsSomethingHappenedPage);