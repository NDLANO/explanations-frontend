/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from "react-bem-helper";
import { injectT } from '@ndla/i18n';
import { OneColumn } from '@ndla/ui';

import Status from '../components/StatusComponent';

const classes = new BEMHelper({
    name: 'forbidden-elements',
    prefix: 'c-',
});

const NotAuthorizedPageContainer = ({ t }) => (
    <Status code={403}>
        <OneColumn>
            <div {...classes()}>
                <h2>403</h2>
                <p>{t('forbiddenPage.description')}</p>
            </div>
        </OneColumn>
    </Status>
);

NotAuthorizedPageContainer.propTypes = {
    t: PropTypes.func.isRequired,
};


export default injectT(NotAuthorizedPageContainer);