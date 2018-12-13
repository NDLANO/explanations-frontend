/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react"

const DateTime = ({label, t, input, className}) => (
    <div  className={className}>
        <label htmlFor={input.id}>{t(label)}</label>
        <time {...input}>{input.value}</time>
    </div>
);
export default DateTime;