/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */


import React from 'react';
import PropTypes from "prop-types";
import { injectT } from '@ndla/i18n';
import ErrorComponent from "./components/ErrorComponent";

const NotFoundPage = ({ t }) => <ErrorComponent gif='/not-exist.gif' statusCode={404} t={t} />;

NotFoundPage.propTypes = {
    t: PropTypes.func.isRequired,
};

export default injectT(NotFoundPage);