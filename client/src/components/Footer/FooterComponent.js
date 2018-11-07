/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import {Footer, Logo} from 'ndla-ui';

import SelectLocale from '../../containers/SelectLocale/index';
import './style.css';

const FooterWrapper = ({ t }) => (
    <Footer>
        <form className="footer_form">
            <label className="footer_label footer--bold" htmlFor="language-select">
                {t('footer.selectLanguage')}
            </label>

        <SelectLocale id="language-select" className="footer_language-select" />
        </form>
        <Footer.Ruler />
       <div className="footer-text-wrapper">
           <div>
               <Footer.Text>
                   <Footer.Editor
                       title={t('footer.footerEditiorInChief')}
                       name="Christer Gundersen"
                   />
                   <Footer.Editor
                       title={t('footer.footerManagingEditor')}
                       name="Pål Frønsdal"
                   />
               </Footer.Text>
               <Footer.Text>{t('footer.footerInfo')}</Footer.Text>
           </div>
           <div className="footer-logo">
               <Logo to="/" label={t('logo.label')} />
           </div>
       </div>
    </Footer>
);

export default FooterWrapper;