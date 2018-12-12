import React from 'react';

const WithEither = (conditionalRenderingFn, EitherComponent) => Component => props => conditionalRenderingFn(props) ? <Component {...props} /> : <EitherComponent {...props} />;

export default WithEither;