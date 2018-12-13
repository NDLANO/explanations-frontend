/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react"
import Moment from 'react-moment';

const DateTime = ({label, t, input, className, locale}) =>
    <div className={className}>
        <label htmlFor={input.id}>{t(label)}</label>
        <Moment locale={locale} >{input.value}</Moment>
    </div>;


export default DateTime;