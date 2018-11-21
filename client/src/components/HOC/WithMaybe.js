import React from 'react';

const WithMaybe = conditionalRenderingFn => Component => props => conditionalRenderingFn(props) ? <Component {...props} /> : null;

export default WithMaybe;