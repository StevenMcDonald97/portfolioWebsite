import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import '../index.css';
import './CSS/header.css';
import './CSS/main.css';
import './CSS/portfolio.css';
import './CSS/footer.css';
import './CSS/modal.css';
import './CSS/contentPage.css';

import Portfolio from './pages/portfolioPage';
import ContentPage from './pages/contentPage';
import Contact from './pages/contact';
import HomePage from './pages/homePage';

import profileImg from "./profileimages/Profile-Pic.jpg";
import profile from './profile.json';
import pageInfo from './pages.json';

// import Modal from "./components/test-modal";
// import Portfolio from "./components/portfolioPage";

// import * as serviceWorker from './serviceWorker';

// var homeText = `Steven is a nationally awarded plein air artist 
// living and working in the California Bay Area`;
// var HomeImage = "../testimages/home.jpg";
// var homeHeading = "Steven McDonald";
// var homeImageDescription="A Painting of Clouds over Marshland"

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMod: false,
      routes: [],
    }
  }

  showModal = e => {
    this.setState({
      showMod: !this.state.showMod
    });
  };

  componentDidMount() {
    this.getRoutes();
  }

   // Retrieves the list of items from the Express app
  getRoutes = () => {
    fetch('/api/getRoutes')
    .then(res => res.json())
    .then(routes => this.setState({ routes }))
  }



  render(){
    const { routes } = this.state;
    console.log(routes);

    // render a link in the navbar for each link in props
    const create_links = pageInfo.Links.map((page) =>  
      <li key={page.name} className="navbar-link"><Link to={page.path} className="navbar-link">{page.name}</Link></li>
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
            <Route exact path="/" component={OpenPage} />
            <Route path="/:id" component={OpenPage} />
          </Switch>
        </Router>
      </React.StrictMode>
      
    );
  }
}

class Hero extends Component {
  render() {
    return (
      <div>
        {this.props.match.params.id}
      </div>
    );
  }
}

class OpenPage extends Component {
  render(){
    if (this.props.match.params.id===""){
      return <HomePage heading={profile.name}  homeText={profile.HomeText} imgDescription={profile.HomeImageText}></HomePage>;

    } else if (this.props.match.params.id==="portfolio"){
      return <Portfolio imgDirectory='../testimages/'></Portfolio>

    }else if (this.props.match.params.id==="about"){
      var title="About Me";
      var imgDescription = "A picture of the artist"
      var imgTag = <img className="mainImage" src={profileImg} alt={imgDescription} align="left"/>;
      
      return <ContentPage  title={title} image={imgTag} mainText={profile.About} secondaryText={profile.Resume}></ContentPage>
      
    }else if (this.props.match.params.id==="contact"){
      return <Contact/>

    } else {  
      return <HomePage heading={profile.name}  homeText={profile.HomeText} imgDescription={profile.HomeImageText}></HomePage>;
    }
  }

}




