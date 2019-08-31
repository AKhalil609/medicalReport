import React, { Component } from 'react';
import { connect } from "react-redux";

import { fetchResults, setLoading } from "../actions/resultsActions";
import List from "./Dashboard";

export class Results extends Component {

    async componentDidMount(){
        await this.props.fetchResults();
        await this.props.setLoading();
        console.log("done");
        
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