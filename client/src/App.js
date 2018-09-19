import React from 'react';

import IntlProvider from 'ndla-i18n';
import { getLocaleInfoFromPath } from './i18n';
import {  PageContainer, Masthead, MastheadItem, Logo } from 'ndla-ui';

import SearchPage from './components/SearchPage';

const { abbreviation, messages } = getLocaleInfoFromPath(
    window.location.pathname,
  );

const App = () => {
  return (
      <IntlProvider locale={abbreviation} messages={messages}>
        <PageContainer background={true}>
            <Masthead fixed>
                <MastheadItem right>
                    <Logo to="/" label="Nasjonal digital læringsarena" />
                </MastheadItem>
            </Masthead>
            <SearchPage />
        </PageContainer >
    </IntlProvider>
  )
}

export default App;