/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import {Masthead, MastheadItem} from '@ndla/ui';
import BEMHelper from 'react-bem-helper';
import PropTypes from 'prop-types';

import LogInOrOut from './LoginOrOut'
import Navigation from "./Navigation";
import {matchShape} from "../../utilities/commonShapes";

const classes = new BEMHelper({
    name: 'masthead',
    prefix: 'c-',
});

const Header = ({t, username, isLoggedIn, match}) => {
    return (
        <Masthead>
            <div {...classes('component')}>
                <MastheadItem>
                    <Navigation t={t} match={match} />
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
    match: PropTypes.shape(matchShape).isRequired,

    // Optional
    username: PropTypes.string,
    isLoggedIn: PropTypes.bool,
};

Header.defaultProps = {
    username: '',
    isLoggedIn: false,
};

export default Header;