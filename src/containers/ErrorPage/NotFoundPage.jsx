/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */


import React from 'react';
import { OneColumn, ErrorMessage } from 'ndla-ui';
import { injectT } from 'ndla-i18n';
import StatusComponent from "./components/StatusComponent";

const NotFoundPage = ({ t }) => (
    <StatusComponent code={404}>
        <OneColumn cssModifier="clear">
            <ErrorMessage
                illustration={{
                    url: '/not-exist.gif',
                    altText: t('errorMessage.title'),
                }}
                messages={{
                    title: t('errorMessage.title'),
                    description: t('notFound.description'),
                    back: t('errorMessage.back'),
                    goToFrontPage: t('errorMessage.goToFrontPage'),
                }}
            />
        </OneColumn>
    </StatusComponent>
);

export default injectT(NotFoundPage);