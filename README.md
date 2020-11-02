# portfolioWebsite

Example website: www.stevencmdonaldart.com

A tool for easily building and editing a portfolio website using React, for the help of professional and amateur artists, graphic designers, or other producers  
  
This app is designed for artists to easily develop and deploy professional portfolio sites. The public side of the app shows the users portfolio site. Users can register their admin account by going to {site-host-name}/register (which will redirect if an account has already been created). They can then access the admin side by logging in in at {site-host-name}/login, where they have options for customizing the content, color scheme, fonts, and layout of the website. The user can also create and edit images, portfolios, an about page, gallery pages, workshop pages, and event pages.

To deploy using NPM, run the express server from the root directory and run npm build (after installing dependencies) from the client directory. The site will then be available on port 5000, which can be forwarded to port 80 or 443 using a server such as NGINX. It is recommended to run npm run watch in the client directory to have the client code rebuild whenever a change is made to the hardcoded parts of the site (such as images). 

Requirements:
  Node.js  
  Express.js  
  React.js  
  MongoDB  
  
Backend packages:
  "bcrypt": "^5.0.0",  
  "body-parser": "^1.19.0",  
  "cookie-parser": "^1.4.5",  
  "cors": "^2.8.5",  
  "express": "^4.16.3",  
  "filereader": "^0.10.3",  
  "fs": "0.0.1-security",  
  "jsonwebtoken": "^8.5.1",  
  "mongodb": "^3.6.0",  
  "mongoose": "^5.9.19",  
  "multer": "^1.4.2",  
  "node-sass": "^4.14.1",  
  "nodemailer": "^6.4.11"  
  
Frontend pacakges:
    "axios": "^0.19.2",
    "formik": "^2.1.5",
    "node-sass": "^4.14.1",
    "npm-watch": "^0.7.0",
    "prop-types": "^15.7.2",
    "react": "^16.4.1",
    "react-color": "^2.17.3",
    "react-confirm-bootstrap": "^5.3.1",
    "react-dom": "^16.13.1",
    "react-icons": "^3.10.0",
    "react-images-upload": "^1.2.8",
    "react-router-dom": "^4.3.1",
    "react-scripts": "^3.4.3",
    "react-slideshow-image": "^3.3.0",
    "yup": "^0.29.3"
