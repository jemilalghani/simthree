import React, { Component } from 'react';

export default class Dashboard extends Component {
    constructor(){
        super();
        this.state={
            searchBar:'',
            check:true
        }
        this.handleSearchBar=this.handleSearchBar.bind(this);
    }
    handleSearchBar(event){
        this.setState({
            searchBar:event.target.value
        })
    }
    render() {
        return (
            <div>
                <input value={this.state.searchBar} onChange={this.handleSearchBar}></input>
                <button>Search</button>
                <button>Reset</button>
                <input type="checkbox" name="My Post"></input>
            </div>
        );
    }
}