/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import FlashMessage from './FlashMessageComponent';

export {SEVERITY} from './FlashMessageComponent';
export const emptyFlashMessage = {message: '', title: '', severity: ''};
export const updateFlashMessage = (type, message) => ({type, payload: message});
export const clearFlashMessage = type => ({type, payload: emptyFlashMessage});


export {flashMessageShape} from './FlashMessageShape'

export default FlashMessage;

