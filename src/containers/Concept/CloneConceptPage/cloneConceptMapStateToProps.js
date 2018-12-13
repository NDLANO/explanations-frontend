/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {mapStateToPropsCommon} from '../conceptCommon';

export const mapStateToProps = state => {
    const {concept: {clone: {initialFormValues, flashMessage}}} = state;
    return {
        ...mapStateToPropsCommon(state),
        initialFormValues,
        flashMessage
    }
};