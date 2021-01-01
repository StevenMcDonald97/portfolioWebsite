import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ImageErrorCatch from 'src/App/pages/ImageErrorCatch';
import { BackButton } from 'src/App/admin/helperComponents';

export default class Blog extends Component {
    constructor(props){
        super(props);
        this.state={
            title:"",
            text:"",
            posts:[],
            postTitle:"",
            postParagraphs:[],
            postDate:"",
            postImage:""
        }
        this.showPost=this.showPost.bind(this);
        this.returnToBlog=this.returnToBlog.bind(this);
        this.loadPage = this.loadPage.bind(this);
        this.createPosts=this.createPosts.bind(this);
    }

    componentDidMount(){
        this.loadPage();
    }

    showPost(title, paragraphs, image, date){
        this.setState({
            postTitle:title,
            postParagraphs:paragraphs,
            postDate:date,
            postImage:image
        });
    }

    returnToBlog(){
        this.setState({postTitle:"", postParagraphs:[], postDate:"", postImage:""});
    }

    loadPage = () =>{
        var self = this;
        axios.get('/api/getPage', {
            params: {
                pageId:this.props.pageId,
                pageType:"blog"
            }
        }).then(function(response){
            self.setState({
                title:response.data.title,
                text:response.data.text,
                posts:response.data.posts
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    createPosts = () =>{
        return(
            this.state.posts.map((post)=>
                <div className="blogPagePost" key={post._id} onClick={()=>this.showPost(post.title, post.paragraphs, post.imgName, post.date) }>
                    {post.imgName ? <ImageErrorCatch imgClass="blogPageImage" src={ post.imgName} description={ "Blog post Image" } clickImage={()=>{}}/> : null}
                    <div className="blogPageText">
                        <div className="mediumHeader blogPageTitle">{post.title}</div>
                        <div className="blogPageDate">{post.date}</div>
                        <div className="blogPageBlurb">{post.blurb}</div>
                    </div>
                </div>
            )
        )
    }

    render(){
        if (this.state.postTitle !== ""){
            return <BlogPost returnToBlog={this.returnToBlog} image={this.state.postImage} title={this.state.postTitle} paragraphs={this.state.postParagraphs} date={this.state.postDate}/>
        } else {
            return (
                <div className="page">
                    <div className="blog">
                        <h2 className="pageHeader blogTitle"> { this.state.title }</h2>
                        <div className="bodyText blogDescription"> { this.state.text }<p> - - - </p></div>
                        <div className="blogPosts">
                            { this.createPosts() }
                        </div>
                    </div>
                </div>
            );
        }

    }
}


const BlogPost = (props) => {
    return(
        <div className="blogPost">
            <BackButton backPage={props.returnToBlog}/>
            <div className="mediumHeader blogPostTitle">{ props.title }</div>
            <div className="blogDate">{ props.date }</div>
            {props.image ? <ImageErrorCatch imgClass="blogPostImage" src={ props.image } description={ "Blog post Image" } clickImage={()=>{}}/> : null}
            <div className="blogPostParagraphs">
                { 
                    props.paragraphs.map((paragraph, index) => {
                       return ( <p key={index} className="blogParagraph bodyText">
                                { paragraph }
                            </p>
                        )
                    })
                }
            </div>
        </div>
    )

}