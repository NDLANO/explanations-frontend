/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import {Masthead, MastheadItem} from 'ndla-ui';
import BEMHelper from 'react-bem-helper';
import PropTypes from 'prop-types';

import LogInOrOut from './LoginOrOut'
import Navigation from "./Navigation";

import './style.css'


const classes = new BEMHelper({
    name: 'masthead',
    prefix: 'c-',
});

const Header = ({t, username, isLoggedIn}) => {
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
                    <LogInOrOut t={t} username={username} isLoggedIn={isLoggedIn}/>
                </MastheadItem>
            </div>
        </Masthead>
    );
};

Header.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
};

Header.defaultProps = {
    isLoggedIn: false,
    username: ''
};

export default Header;