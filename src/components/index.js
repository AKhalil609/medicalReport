import React, { Component } from 'react';
import { connect } from "react-redux";

import { fetchResults, setLoading } from "../actions/resultsActions";
import List from "./Dashboard";

export class Results extends Component {
    // life cycle method
    async componentDidMount(){
        // puts the data in the store
        await this.props.fetchResults();
        // sets loading = false
        await this.props.setLoading();
        
    }

    render() {
        if (this.props.data.results.loading) return (<h1>loading ...</h1>)
        return (
            <div>
                <List data={this.props.data}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data: state
  });

export default connect(
    mapStateToProps,
    { fetchResults, setLoading }
  )(Results);