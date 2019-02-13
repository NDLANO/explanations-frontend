/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */


import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import { appLocales } from '../../i18n';
import {updateLocale} from "./actions";
import {locationShape} from "../../utilities/commonShapes";
import Dropdown from "../../components/Dropdown";


class SelectLocale extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange({value, label}) {
        const { location: { pathname, search }, updateLocale } = this.props;

        // Next 3 lines is to trim previous locale
        let path = pathname.slice();
        appLocales.forEach(l => path = path.replace(`/${l.abbreviation}/`, ''));
        path = path.startsWith('/') ? path.substring(1) : path;
        createHistory().push(`/${value}/${path}${search}`); // Need create new history or else basename is included
        window.location.reload();
        updateLocale(value)
    }
    render() {
        const { locale, t } = this.props;
        const currentLocale = appLocales.find(x => x.abbreviation === locale);
        const selectedLocale = {
            label: 'Ukjent',
            value: 'ukjent'
        };
        if (currentLocale){
            selectedLocale.value = currentLocale.abbreviation;
            selectedLocale.label = currentLocale.name;
        }
        return (
            <Dropdown
                t={t}
                onChange={this.handleChange}
                selected={selectedLocale}
                options={appLocales.map(l => ({value: l.abbreviation, label: l.name}))}>
            </Dropdown>
        )
    }
}
/*
const SelectLocale = ({ locale, location: { pathname, search }, updateLocale }) => {
    const handleChange = ({value, label}) => {
        // Next 3 lines is to trim previous locale
        let path = pathname.slice();
        appLocales.forEach(l => path = path.replace(`/${l.abbreviation}/`, ''));
        path = path.startsWith('/') ? path.substring(1) : path;
        createHistory().push(`/${value}/${path}${search}`); // Need create new history or else basename is included
        window.location.reload();
        updateLocale(value)
    };

    const currentLocale = appLocales.find(x => x.abbreviation === locale);
    const selectedLocale = {
        label: 'Ukjent',
        value: 'ukjent'
    };
    if (currentLocale){
        selectedLocale.value = currentLocale.abbreviation;
        selectedLocale.label = currentLocale.name;
    }

    return (
        <Dropdown
            t={l => console.log("ad", l)}
            onChange={handleChange}
            selected={selectedLocale}
            options={appLocales.map(l => ({value: l.abbreviation, label: l.name}))}>
        </Dropdown>
    )
    /* return (
         <select
             onChange={evt => handleChange(evt.target.value)}
             value={locale}>
             {appLocales.map(l => (
                 <option key={l.abbreviation} value={l.abbreviation}>
                     {l.name}
                 </option>
             ))}
         </select>
     );
};
*/
SelectLocale.propTypes = {
    location: locationShape.isRequired,
    locale: PropTypes.string.isRequired,
    updateLocale: PropTypes.func.isRequired,
};

const mapStateToProps = ({locale}) => ({
    locale,
});



export default withRouter(connect(mapStateToProps, {updateLocale})(SelectLocale));