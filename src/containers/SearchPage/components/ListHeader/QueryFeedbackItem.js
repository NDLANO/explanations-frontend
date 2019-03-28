/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import PropTypes from 'prop-types';


const QueryFeedbackItem = ({text, t}) => <li>{t('searchPage.noResultsFor')}&nbsp;<strong>{text}</strong></li>;

QueryFeedbackItem.propTypes = {
    text: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
};

export default QueryFeedbackItem;