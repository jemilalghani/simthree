import React, { Component } from 'react';
import Post from '../Post/Post';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Dashboard extends Component {
    constructor(){
        super();
        this.state={
            searchBar:'',
            check:true,
            posts:[]
        }
        this.handleSearchBar=this.handleSearchBar.bind(this);
        this.getall=this.getall.bind(this);
    }
    componentDidMount(){
        this.getall();
    }
    getall(){
        axios.get('/api/posts').then(posts=>{
            this.setState({posts:posts.data})
        })
    }
    handleSearchBar(event){
        this.setState({
            searchBar:event.target.value
        })
    }
    render() {
        let display = this.state.posts.map(post=>{
            return (
                <div>
                    <h1>{post.title}</h1>
                    <p>{post.name}</p>
                    <p>{post.content}</p>
                    <img src={post.img}/>
                    <Link to={`/post/${post.author_id}`} className='links'><button>Edit</button></Link>
                </div>
            )
        })
        return (
            <div>
                {this.props.match.path=='/post/:postid' ? <Post match={this.props.match} getAll={this.getall}/> : display}
                <input value={this.state.searchBar} onChange={this.handleSearchBar}></input>
                <button>Search</button>
                <button>Reset</button>
                <input type="checkbox" name="My Post"></input>
            </div>
        );
    }
}