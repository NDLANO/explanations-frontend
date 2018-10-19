/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import BEMHelper from 'react-bem-helper';
import { Plus, Minus } from 'ndla-icons/action';
import { Button } from 'ndla-ui';
import { injectT } from 'ndla-i18n';
import { withRouter, Link } from 'react-router-dom';
import {DetailSearch} from 'ndla-icons/editor';
import {SearchRoute, CreateRoute} from "../../../routes";

import './style.css'

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
        const { t } = this.props;
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
                        <Link
                            to={SearchRoute}
                            {...classes('item')}
                            onClick={this.toggleOpen}>
                            <DetailSearch className="c-icon--large" />
                            <span>{t('subNavigation.search')}</span>
                        </Link>
                        <Link
                            to={CreateRoute}
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

export default withRouter(injectT(Navigation));