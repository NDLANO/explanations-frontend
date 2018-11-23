/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { Masthead, MastheadItem } from 'ndla-ui';
import BEMHelper from 'react-bem-helper';

import Navigation from "./Navigation";

import './style.css'


const classes = new BEMHelper({
    name: 'masthead',
    prefix: 'c-',
});

const Header = ({t}) => {
    return (
        <Masthead>
            <div {...classes('component')}>
                <MastheadItem>
                    <Navigation t={t} />
                </MastheadItem>
                <MastheadItem>
                    <h1>{t('header.title')}</h1>
                </MastheadItem>
                <MastheadItem>
                </MastheadItem>
            </div>
        </Masthead>
    );
};
export default Header;