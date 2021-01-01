import React, { Component } from 'react';
import axios from 'axios';
import { BackButton, UploadImage } from 'src/App/admin/helperComponents';
import BlogPostTemplate from 'src/App/admin/blogPostTemplate';
import { FaTrashAlt } from "react-icons/fa";  // Font Awesome
import PropTypes from "prop-types";

export default class BlogTemplate extends Component {
	constructor(props){
		super(props)
		this.state ={
			title:"",
			text:"",
			numPosts:0,
			posts:[],
			createPage:this.props.createPage,
			deleted:[],
			currentPost:null,
			postTitle:null,
			postBlurb:"",
            postParagraphs:[],
            postDate:"",
            postImage:"",
            postId:""
		}
		this.onChange=this.onChange.bind(this);
		this.openPostTemplate=this.openPostTemplate.bind(this);
		this.returnToBlogEditor=this.returnToBlogEditor.bind(this);
		this.addPost=this.addPost.bind(this);
		this.removePost=this.removePost.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
	}

	onChange(event){
		this.setState({[event.target.name]:event.target.value});
	}
	

	componentDidMount(){
		this.getPageData();
	}

    getPageData = () =>{
    	if (this.props.pageId){
	        axios.get('/api/getPage', { params: {pageId: this.props.pageId, pageType:"blog" } })
	        .then((response) => {
	          this.setState({
	            title:response.data.title, 
	            text:response.data.text,
	           	numPosts:response.data.posts.length,
	           	posts:response.data.posts
	            });
	        });
	    }
    }

	addPost(){
	    const values = [...this.state.posts];
		values.push({"create":"create", "title":"New Post", "blurb":"Edit Your post to add content", "image":"", paragraphs:[], 
			keyValue:new Date().getTime()});
		this.setState({posts:values}, 
			()=>this.setState({numPosts:this.state.numPosts+1}));
	}

	openPostTemplate( title, create, blurb, image, date, paragraphs, id){
        this.setState({postTitle:title, postCreate:create, postBlurb:blurb, postParagraphs:paragraphs, postDate:date, postImage:image, postId:id});
	}

	returnToBlogEditor(){
		this.setState({postTitle:null, create:"", postBlurb:"", postParagraphs:[], postDate:"", postImage:"", postId:""});
	}

	removePost(index){
	    const values = [...this.state.posts];
	    const deletedObjs = [...this.state.deleted];

	    deletedObjs.push(values[index]._id);

	    values.splice(index, 1);
	    for (var i=index; i<values.length; i++)	{
	    	values[i].num=values[i].num-1;
	    }

	   	this.setState({numObjs:this.state.numObjs-1},
	   		()=>this.setState({posts:values, deleted:deletedObjs}));
	}

	onSubmit(){
		var posts = this.state.posts;

		const PageData={"title":this.state.title, "text":this.state.text,
			"deleted":this.state.deleted, "id":this.props.pageId};
		if (this.state.createPage) { 
			axios.post('/upload/uploadBlog', PageData).then((response)=>alert(response.data));
		} else {
			axios.post('/edit/editBlog', PageData).then((response)=>alert(response.data));
		};
	}

	render(){
		const create_inputs = this.state.posts.map((post, index) =>{ 
		     	return <PostEditor key={post._id ? post._id : post.keyValue} 
		     		title={ post.title } 
		     		blurb={ post.blurb }
		     		create={ post.create }
		     		image={ post.imgName }
		     		paragraphs={ post.paragraphs }
		     		date={ post.date } 
		     		id={ post._id } 
		     		num={ index } 
		     		removePost={ this.removePost }
		     		openPostTemplate = { this.openPostTemplate }
		     	/>
		    }
	    );
		if (this.state.postTitle){
			return (
					<BlogPostTemplate 
						title={this.state.postTitle} 
						create={ this.state.postCreate }
						blurb={this.state.postBlurb} 
						paragraphs={this.state.postParagraphs} 
						date={this.state.postDate} 
						imgName={this.state.postImage} 
						id={this.state.postId}
						backPage={this.returnToBlogEditor}/>
				)
		} else {
			return(
				<div className="pageEditor">
					<BackButton backPage={this.props.backPage}/>
					<form className="pageForm">
						<div className='inputGroup'>
							<label className='inputLabel' htmlFor='title'>Title:</label>
							<input type='text' className='smallPageField' name='title' 
								value={this.state.title} 
								onChange={this.onChange}/>
						</div>
						<div className='inputGroup'>
							<label className='inputLabel' htmlFor='text'>Description:</label>
							<input type='text' className='smallPageField' name='text' 
								value={this.state.text} 
								onChange={this.onChange}/>
						</div>
						<div className="editingPostsList">
							{ create_inputs }
						</div>
						<button type="button" className="button" onClick={this.addPost}> 
							Create a new Post
						</button>
						<div className="editSubmitButtons">
							<button type="button" className="editSubmitButton" onClick={this.onSubmit}> Submit </button>
							<button type="button" className="editSubmitButton" onClick={this.props.backPage}>
								Cancel 
							</button>
						</div>
					</form>
				</div>
			)
		}
	}
}

BlogTemplate.propTypes = {
	pageId:PropTypes.string,
	createPage:PropTypes.bool,
	pageType:PropTypes.string,
	backPage:PropTypes.func.isRequired
}


class PostEditor extends Component {
	constructor(props){
		super(props);
		this.state={
			title:this.props.title,
			blurb:this.props.blurb
		}
	}

	render(){
		return(
	 		<li className="pageEditingObject">
	 			<div className="inputGroup">
					<div className="smallHeader"> {this.state.title} </div>
				</div>
				<div className="inputGroup editBlogPostField">
					<div className="bodyText"> {this.state.blurb} </div>
				</div>
				<button className="editSubmitButton" type="button" onClick={index=>this.props.openPostTemplate( this.props.title, this.props.create, this.props.blurb, this.props.image, this.props.date, this.props.paragraphs, this.props.id)}>
			    		Edit
				</button>
				<button type="button" name={this.props.num} className="editSubmitButton tooltip trashButton" 
					onClick={index=>this.props.removePost(this.props.num)}>
			    	<FaTrashAlt />
				    <span className="tooltiptext">Delete Post</span>
				</button>
			</li>
		)
	}
}

PostEditor.propTypes = {
	num:PropTypes.number,
	title:PropTypes.string,
	blurb:PropTypes.string,
	removePageObject:PropTypes.func
}
