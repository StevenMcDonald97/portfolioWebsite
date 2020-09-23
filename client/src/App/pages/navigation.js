import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import { slide as Menu } from "react-burger-menu";
import DropDown from 'react-bootstrap/DropDown';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	style:"top",
    	pageInfo:[]
    };
  }

  componentDidMount() {
    axios.get('/api/getPageInfo').then((response) => {
      this.setState({pageInfo:response.data});
    });
  }

  render(){


    if (this.state.style="split"){
    	return();
    } else if (this.state.style="sidebarFixed"){
    	const createLinks = this.state.pageInfo.map((page) => 
	      <Link key={page._id} to={`/${page.title.replace(/\s+/g, '')}`} className='navbar-link'>{page.title}</Link>
	    );

    	return();
    } else if (this.state.style="sidebarCollapsable"){
    	const createLinks = this.state.pageInfo.map((page) => 
	      <Link key={page._id} to={`/${page.title.replace(/\s+/g, '')}`} className='navbar-link'>{page.title}</Link>
	    );
    	return(
			<Menu {...props}>
			  { createLinks }
             <div onClick={ this.props.showContact } >Contact</div>
			</Menu>
    	);
    } else if (this.state.style="dropdown"){
    	
    	const createLinks = this.state.pageInfo.map((page) => 
			<Dropdown.Item as="button" key={page._id}><Link to={`/${page.title.replace(/\s+/g, '')}`} className='navbar-link'>{page.title}</Link></Dropdown.Item>
	    );

    	return(
			<DropdownButton id="dropdown-item-button" title="Dropdown button">
			</DropdownButton>


			<Dropdown>
			  <Dropdown.Toggle variant="success" id="dropdown-basic">
			    Dropdown Button
			  </Dropdown.Toggle>

				<Dropdown.Menu>
            		{ createLinks }
					<Dropdown.Item as="button"><div onClick={ this.props.showContact } >Contact</div></Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>




    	);
    } else {
    	const createLinks = this.state.pageInfo.map((page) => 
	      <li key={page._id} className={this.state.className}><Link to={`/${page.title.replace(/\s+/g, '')}`} className='navbar-link'>{page.title}</Link></li>
	    );
    	return(
    		<ErrorBoundary>
              <div className='topNavbar'>
                <ul className='topNavbarLinks'>
                  { createLinks }
                  <li key='contact' className='topNavbarLink'><div onClick={ this.props.showContact } >Contact</div></li>
                </ul>
              </div>
            </ErrorBoundary >
        );
    }
  }


}

const MenuContainer = styled("div")`
  display: ${(p) => (p.show ? "flex" : "none")};
  min-width: 150px;
  position: absolute;
  z-index: 1000;
  flex-direction: column;
  border: 1px solid #e5e5e5;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
`;



const createLinks = this.state.pageInfo.map((page) => 
	<button
        type="button"
        onClick={onClose}
        className="text-left hover:bg-brand-100 px-6 py-2"
      >
        <Link to={`/${page.title.replace(/\s+/g, '')}`} className='navbar-link'>{page.title}</Link>
    </button>
);

const Menu = ({ role }) => {
  const { show, onClose, props } = useDropdownMenu({
    flip: true,
    offset: [0, 8],
  });
  return (
    <MenuContainer {...props} role={role} show={show}>
      <button
        type="button"
        onClick={onClose}
        className="text-left hover:bg-brand-100 px-6 py-2"
      >
        Item 1
      </button>
      <button
        type="button"
        onClick={onClose}
        className="text-left hover:bg-brand-100 px-6 py-2"
      >
        Item 2
      </button>
    </MenuContainer>
  );
};

const Toggle = ({ id, children }) => {
  const [props, { show, toggle }] = useDropdownToggle();
  return (
    <button
      type="button"
      className="btn"
      id={id}
      {...props}
      onClick={toggle}
    >
      {children}
    </button>
  );
};


const [show, setShow] = useState(false);

const DropdownButton = ({
  show,
  onToggle,
  drop,
  alignEnd,
  title,
  role,
}) => (
  <Dropdown
    show={show}
    onToggle={onToggle}
    drop={drop}
    alignEnd={alignEnd}
    itemSelector="button:not(:disabled)"
  >
    {({ props }) => (
      <div {...props} className="relative inline-block">
        <Toggle id="example-toggle">{title}</Toggle>
        <Menu role={role} />
      </div>
    )}
  </Dropdown>
);


  <DropdownButton
    show={show}
    onToggle={(nextShow) => setShow(nextShow)}
    title={ &#x2261 }
  />


