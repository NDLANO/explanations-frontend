/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const postcssNext = require('postcss-cssnext');
const postcssNested = require('postcss-nested');
const postcssFocus = require('postcss-focus');
const postcssImport = require('postcss-import');

module.exports = {
    plugins: [
        postcssImport({
            glob: true,
        }),
        postcssFocus(), // Add a :focus to every :hover
        postcssNested(),
        postcssNext({
            // Allow future CSS features to be used, also auto-prefixes the CSS...
            browsers: ['last 2 versions', 'IE >= 10'], // ...based on this browser list
        }),
    ],
};