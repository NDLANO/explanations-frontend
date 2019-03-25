/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import BEMHelper from 'react-bem-helper';
import Button from '@ndla/button';
import PropTypes from "prop-types";
import { Plus, Minus } from '@ndla/icons/action';
import { Link } from 'react-router-dom';
import {DetailSearch} from '@ndla/icons/editor';

import {searchRoute, createConceptRoute, createRoute} from "../../../utilities/routeHelper";
import {matchProps} from "../../../utilities/commonShapes";

export const classes = new BEMHelper({
    name: 'navigation',
    prefix: 'c-',
});

export class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.toggleOpen = this.toggleOpen.bind(this);
    }

    toggleOpen() {
        this.setState(prevState => ({ open: !prevState.open }));
    }

    render() {
        const { t, match } = this.props;
        return (
            <div>
                <Button
                    onClick={this.toggleOpen}
                    stripped
                    {...classes('open-button', '', 'c-masthead-header__open-button')}>
                    <Plus
                        {...classes(
                            'icon',
                            this.state.open ? 'hidden' : 'show',
                            'c-icon--medium',
                        )}
                    />
                    <Minus
                        {...classes(
                            'icon',
                            !this.state.open ? 'hidden' : 'show',
                            'c-icon--medium',
                        )}
                    />
                </Button>
                <div
                    {...classes(
                        'container',
                        !this.state.open ? 'hidden' : ['absolute', 'brand-color-secondary'],
                    )}>
                    <div {...classes('items')}>
                        <Link to={searchRoute()}
                              {...classes('item')}
                              onClick={this.toggleOpen}>
                            <DetailSearch className="c-icon--large" />
                            <span>{t('subNavigation.search')}</span>
                        </Link>
                        <Link to={createRoute(match, createConceptRoute())}
                              {...classes('item')}
                              onClick={this.toggleOpen}>
                            <Plus className="c-icon--large" />
                            <span>{t('subNavigation.create')}</span>
                        </Link>
                    </div>
                </div>
                {this.state.open ? (
                    <div
                        role="presentation"
                        onKeyPress={this.toggleOpen}
                        onClick={this.toggleOpen}
                        {...classes('overlay')}
                    />
                ) : (
                    ''
                )}
            </div>
        );
    }
}

Navigation.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
    match: PropTypes.shape(matchProps).isRequired,
};

export default Navigation;