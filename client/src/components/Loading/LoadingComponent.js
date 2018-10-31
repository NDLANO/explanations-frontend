import React from 'react';
import {OneColumn} from "ndla-ui";
import BEMHelper from "react-bem-helper";


const classes = new BEMHelper({
    name: 'loading',
    prefix: 'c-',
});

const Loading = () =>
    <OneColumn {...classes()}>
        <div {...classes('content')}>Loading ...</div>
    </OneColumn>;

export default Loading;