/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import _ from "lodash";

export const indexRoute = () => '/';
export const searchRoute = () => indexRoute();
export const updateRoute = (id=':id') => `/update/${id}`;
export const editConceptRoute = id => `/concept/${id}/edit`;
export const createRoute = () => '/create';
export const cloneRoute = (id=':id') => `/clone/${id}`;
export const loginRoute =  () => '/login';
export const embeddedRoute =  () => '/embedded';
export const logoutRoute =  () => '/logout';
export const notAuthorizedRoute = () => '/forbidden';
export const notFoundRoute = () => '/notFound';
export const conceptRoute = () => '/concept';
export const opsSomethingHappened = () => '/notFound';
export const catchAllRoute = () => '*';

export const routeIsAllowed = (requiredScope=[], currentScopes=[], isAuthenticated) =>
    isAuthenticated && _.intersection(currentScopes, requiredScope).length > 0;