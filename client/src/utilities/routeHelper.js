import _ from "lodash";

/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export const indexRoute = () => '/';
export const searchRoute = () => indexRoute();
export const updateRoute = (id=':id') => `/update/${id}`;
export const createRoute = () => '/create';
export const cloneRoute = (id=':id') => `/clone/${id}`;
export const loginRoute =  () => '/login';
export const logoutRoute =  () => '/logout';
export const forbiddenRoute = () => '/forbidden';
export const catchAllRoute = () => '*';

export const routeIsAllowed = (requiredScope=[], currentScopes=[], isAuthenticated) =>
    isAuthenticated && _.intersection(currentScopes, requiredScope).length > 0;