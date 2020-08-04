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

// authentication
import Login from './securePages/login';
import withAuth from './securePages/withAuth';
import Register from './securePages/registerUser';

// page types
import Portfolio from './pages/portfolioPage';
import ContentPage from './pages/contentPage';
import Contact from './pages/contact';
import HomePage from './pages/homePage';
import Modal from './pages/modal';
import Secure from './securePages/secure';
import UploadImages from './securePages/uploadImages';
import EditStyle from './securePages/editStyle';

// profile information
import profileImg from "./profileimages/Profile-Pic.jpg";
import profile from './profile.json';

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
      isLoading: false,
      routes: [],   
      showContact: false,

    }
    this.setState = this.setState.bind(this);
  }

  showContact = e => {
    console.log("test");
    this.setState({
      showContact: !this.state.showContact
    });
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getRoutes();
  }

   // Retrieves the list of items from the Express app
  getRoutes = () => {
    fetch('/api/getRoutes')
    .then(res => res.json())
    .then(data => this.setState({ routes: data.Links, isLoading: false }));
  }

  render(){
    const { routes } = this.state;

    // render a link in the navbar for each route in the database
    const create_links = routes.map((route) =>  
      <li key={route.name} className="navbar-link"><Link to={route.path} className="navbar-link">{route.name}</Link></li>
    );

    const Contact = <Contact />;
    
    return (
      <React.StrictMode>
      <div>
        <Modal onClose={ this.showContact } show={ this.state.showContact} 
            content={ Contact }/>
        <Router>
          <div>
            <div className="header">
              <h1 className="page-title">{profile.Name}</h1>
              <div className="navbar">
                <ul className="navbar-links">
                  { create_links }
                  <li key="contact" className="navbar-link"><div className="navbar-link" onClick={ this.showContact } >Contact</div></li>
                  <li key="login" className="navbar-link"><Link to ="/contact" className="navbar-link">Login</Link></li>
                  <li key="register" className="navbar-link"><Link to="/register" className="navbar-link">Register</Link></li>
                  <li key="upload" className="navbar-link"><Link to="/uploadImages" className="navbar-link">Upload</Link></li>

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
              <Route exact path="/secret" component={withAuth(Secure)} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/uploadImages" component={UploadImages} />
              <Route exact path="/styleEditor" component={EditStyle} />
              <Route path="/:id" component={OpenPage} />
            </Switch>
          </div>
        </Router>
        </div>
      </React.StrictMode>
      
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
      
    } else {  
      return <HomePage heading={profile.name}  homeText={profile.HomeText} imgDescription={profile.HomeImageText}></HomePage>;
    }
  }

}




