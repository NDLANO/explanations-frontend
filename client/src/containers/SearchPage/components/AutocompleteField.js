import {Search as SearchIcon} from "ndla-icons/es/common";
import SearchField from "./SearchField";
import React from "react";


class AutoCompleteField extends React.Component {

    render() {
        const {p, ...props} = this.props;
        return (
            <SearchField {...props} />
        )
    }
}

export default AutoCompleteField;