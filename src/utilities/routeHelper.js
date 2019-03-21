/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import _ from "lodash";

export const indexRoute =                       () => '';
export const searchRoute =                      () => indexRoute();
export const conceptRoute =                     () => '/concept';
export const createConceptRoute =               () => `${conceptRoute()}/new`;
export const editConceptRoute =                 id => `/${id}/edit`;
export const copyConceptRoute =                 id => `/${id}/copy`;
export const createLanguageVariationRoute =     id => `/${id}/newLanguageVariation`;
export const loginRoute =                       () => '/login';
export const embeddedRoute =                    () => '/embedded';
export const siteRoute =                        () => '/site';
export const logoutRoute =                      () => '/logout';
export const notAuthorizedRoute =               () => 'forbidden';
export const notFoundRoute =                    () => 'notFound';
export const catchAllRoute =                    () => '*';

export const routeIsAllowed = (requiredScope=[], currentScopes=[], isAuthenticated) =>
    isAuthenticated && _.intersection(currentScopes, requiredScope).length > 0;

export const createRoute = (match, to) => match.url + to;