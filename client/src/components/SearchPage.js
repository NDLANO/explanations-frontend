import React from 'react';
import { Hero, OneColumn, SearchField, Concept,LayoutItem } from 'ndla-ui';

import { addShowConceptDefinitionClickListeners } from 'ndla-article-scripts';
import {getConcepts} from "../api";

class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {search_term: '', search_result_text: '', result_as_content: [],concepts: [], search_query: ''};

        this.onSearch = this.onSearch.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    componentDidUpdate() {
     addShowConceptDefinitionClickListeners();
    }


    onSearch(e) {
        e.preventDefault(); // Prevent loading a new page

        getConcepts(this.state.search_query).then( data => {
            console.log(data.data)
            this.setState({concepts: data.data})
        });

    }

    onChange(event) {
        const term = event.target.value;
        const terms = term.split(",");
        let query = "";

        if (terms.length > 0) {
            query += "title=" +  terms[0].trimStart().trimEnd();
        }
        if (terms.length > 1) {
            query += "&language=" +  terms[1].trimStart().trimEnd();
        }
        this.setState({search_term: term, search_query: query})
    }


    renderConcept() {
        const {concepts} = this.state;
        if (!concepts || concepts.length === 0)
        return null;

        const list = concepts.map(concept =>
            {
                if (concept.content == null)
                    return null;
                if (concept.language === 'nn')
                    concept.id = concept.id + 1000;
                return <li key={`${concept.id}-${concept.language}`}>
                    <Concept
                        {...concept}
                        authors={[]}
                        messages={{
                            ariaLabel: 'Vis begrep beskrivelse',
                            close: 'Lukk',
                        }}>
                        {concept.title}
                    </Concept>
                </li>
            }
        )
        return (
            <ul>
                {list}
            </ul>
        )
    }

    render() {
        return (
            <LayoutItem layout="center">
                <Hero contentType="learning-path">
                </Hero>
                <OneColumn>
                    <SearchField placeholder="Søk etter begrep"
                                messages={{searchFieldTitle: "title"}}
                                value={this.state.search_term}
                                onSearch={this.onSearch}
                                onChange={this.onChange}
                                />
                </OneColumn>

                <Hero contentType="learning-path">

                    <LayoutItem>
                        {this.renderConcept()}
                    </LayoutItem>
                </Hero>
            </LayoutItem>
        );
    }
}

export default SearchPage;