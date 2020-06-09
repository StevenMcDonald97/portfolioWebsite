import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import './index.css';
import './CSS/header.css';
import './CSS/main.css';
import './CSS/portfolio.css';
import './CSS/footer.css';
import './CSS/modal.css';
import './CSS/contentPage.css';

import Portfolio from './components/portfolioPage';
import ContentPage from './components/contentPage';
import Contact from './components/contact';
import HomePage from './components/homePage';

import profileImg from "./profileimages/Profile-Pic.jpg";
import profile from './profile.json';

// import Modal from "./components/test-modal";
// import Portfolio from "./components/portfolioPage";

// import * as serviceWorker from './serviceWorker';

const links=[];
const testLink={name:"home", type:"home", path:"/"};
const aboutLink={name:"about", type:"about", path:"/about"};
const portfolioLink={name:"portfolio", type:"portfolio" , path:"/portfolio"};
const contactLink={name:"contact", type:"contact" , path:"/contact"};

links[0]=testLink;
links[1]=aboutLink;
links[2]=portfolioLink;
links[3]=contactLink;


// var homeText = `Steven is a nationally awarded plein air artist 
// living and working in the California Bay Area`;
// var HomeImage = "../testimages/home.jpg";
// var homeHeading = "Steven McDonald";
// var homeImageDescription="A Painting of Clouds over Marshland"

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    showMod: false,
  };


  showModal = e => {
    this.setState({
      showMod: !this.state.showMod
    });
  };

  render(){

    // render a link in the navbar for each link in props
		const  create_links = links.map((link) =>  
      <li key={link.name} className="navbar-link"><Link to={link.path} className="navbar-link">{link.name}</Link></li>
    );

    return (
      <React.StrictMode>
        <Router>

        <div className="header">
          <h1 className="page-title">{profile.Name}</h1>
          <div className="navbar">
            <ul className="navbar-links">
              { create_links }
            </ul>
          </div>
        </div>

      {/* code to dynamically create routes from links */}
        {/* {routes.map((r) => {
             return <Route path={r.path} background={r.bg} pageId={r.pageId} component={COMPONENT_MAP[r.component]}/>
           }}
        */}
        <Switch>
          <Route path="/portfolio">
            <OpenPortfolio />
          </Route>
          <Route path="/about">
            <OpenAbout />
          </Route>
          <Route path="/contact">
            <OpenContact />
          </Route>
          <Route path="/">
            <OpenHome />
          </Route>
        </Switch>
        </Router>
      </React.StrictMode>
      
    );
  }
}


function OpenPortfolio(){
	return <Portfolio imgDirectory='../testimages/'></Portfolio>
}

function OpenHome() {
	var homeText = profile.HomeText;
	var homeHeading = profile.name;
	var homeImageDescription=profile.HomeImageText
	
	return <HomePage heading={homeHeading}  homeText={homeText} imgDescription={homeImageDescription}></HomePage>;
}

function OpenText(textFields) {
	return <div></div>
}

function OpenContact(textFields) {
	return <Contact/>
}

function OpenAbout(){
	console.log("here");
	var title="About Me";
	var imgDescription = "A picture of the artist"
	var imgTag = <img className="mainImage" src={profileImg} alt={imgDescription} align="left"/>;
  
	return <ContentPage  title={title} image={imgTag} mainText={profile.About} secondaryText={profile.Resume}></ContentPage>
  
}