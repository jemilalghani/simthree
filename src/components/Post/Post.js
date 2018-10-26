import React, { Component } from 'react';
import Axios from 'axios';

export default class Post extends Component {
    constructor(){
        super();
        this.state={
            post:[],
            title:'',
            img:'',
            content:''
            
        }
        this.updateItem=this.updateItem.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeURL=this.handleChangeURL.bind(this);
    }
    componentDidMount(){
        Axios.get(`/api/posts/${this.props.match.params.postid}`).then(post=>{
            this.setState({post:post.data})
        })
    }
    updateItem(){
        Axios.put(`/api/posts/${this.props.match.params.postid}?name=${this.state.name}&img=${this.state.img}&content=${this.state.content}`).then((res)=>{
          console.log('yay')
        }).catch(error=>console.error("error updateItem", error))
      }
    handleChangeTitle(event){
        this.setState({title:event.target.value})
    }
    handleChangeURL(event){
        this.setState({img:event.target.value})
    }
    handleChangeContent(event){
        this.setState({content:event.target.value})
    }
    render() {
        let editpost = this.state.post.map(p=>{
            return(
                <div>
                    Edit Previous Post:
                    Title: <input placeholder={p.title} onChange={this.handleChangeTitle}></input>
                    Image URL <input placeholder={p.img} onChange={this.handleChangeURL}></input>
                    Content: <input placeholder={p.content} onChange={this.handleChangeContent}></input>
                    <button onClick={this.updateItem}>Save Changes</button>
                </div>
            )
        })
        console.log(this.props)
        return (
            <div>
                {editpost}

                {this.props.location.pathname === 'post/:postid' ? <button onClick={this.updateItem}>Save Changes</button> :
                <div>
                    Title: <input ></input>
                    Image URL:<input ></input>
                    Content: <input ></input>
                    <button>Post</button>

                </div>}

            </div>
        );
    }
}