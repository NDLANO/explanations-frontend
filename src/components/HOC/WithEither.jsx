/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

const WithEither = (conditionalRenderingFn, EitherComponent) => Component => props => conditionalRenderingFn(props) ? <Component {...props} /> : <EitherComponent {...props} />;

export default WithEither;