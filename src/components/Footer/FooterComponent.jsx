/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Footer, Logo} from '@ndla/ui';

import SelectLocale from '../../containers/SelectLocale/index';
import {indexRoute} from "../../utilities/routeHelper";


const FooterWrapper = ({ t, editorChief, editorManaging }) => (
    <Footer>
        <form className="footer-form">
            <label className="footer_label footer--bold" htmlFor="language-select">
                {t('footer.selectLanguage')}
            </label>

        <SelectLocale t={t} className="footer_language-select" />
        </form>
        <Footer.Ruler />
       <div className="footer-text-wrapper">
           <div>
               <Footer.Text>
                   <Footer.Editor
                       title={t('footer.footerEditiorInChief')}
                       name={editorChief}
                   />
                   <Footer.Editor
                       title={t('footer.footerManagingEditor')}
                       name={editorManaging}
                   />
               </Footer.Text>
               <Footer.Text>{t('footer.footerInfo')}</Footer.Text>
           </div>
           <div className="footer-logo">
               <Logo to={indexRoute()} label={t('logo.label')} />
           </div>
       </div>
    </Footer>
);

FooterWrapper.propTypes = {
    t: PropTypes.func.isRequired,

    // Optional
    editorChief: PropTypes.string,
    editorManaging: PropTypes.string,
};


FooterWrapper.defaultProps = {
    editorChief: 'Sigurd Trageton',
    editorManaging: 'Pål Frønsdal'
};

export default FooterWrapper;