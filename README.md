# TravelBuddy

_"Everything you need in a travel app."_

This is my final captstone project for my Software Engineering course with Springboard.

## General Overview

TravelBuddy is a mobile friendly full-stack single page web application that emphasizes user ease and customization. TravelBuddy allows users to search for attractions, resturaunts, hotels, and general geographic locations from across the globe and recieve a fun trivia fact along the way.

## Documentation

TravelBuddy is built on a backend Node.js server and and a Frontend React.js server. The backend is a Node.js RESTful API used to store, update, and access user data. The backend also handles all external APIs behind the scenes for the React server. Users can create an account to save information for quick access at anytime.

### Backend Node.js Overview

![Node.js Routes Diagram](/documentation/BackendRoutes.jpg)

### Frontend React.js Overview

![React.js Routes and Compnents Diagram](/documentation/ReactComponentMap.jpg)
![React.js API Calls list](/documentation/FrontendAPI.jpg)

The backend server utilizes a PostgreSQL database for storing user data. This database simply uses a one to many relationship in storing basic saved data from external APIs to generate a customized experience for the user. Passwords are hashed and stored using bcrypt encoding with a work factor of 12.

### PostgreSQL Database

![Entity Relationship Diagram](/documentation/ERD.jpg)

The frontend application is styled and designed with Material UI v4 as a modern and responsive Single Page Application.

TravelBuddy utilizes multiple external APIs as well.

1. TripAdvisor
2. Translator [TBD]
3. Currency Converter [TBD]
4. Weather [TBD]

### Deployment

TravelBuddy is currently deployed using an ElephantSQL database paired with the OnRender cloud service.
You can see TravelBuddy deployed [here](https://travelbuddy-egbq.onrender.com/).

_Please note_ <br/>
The deployment of TravelBuddy is hosted on a free cloud service which can often cause delays in loading. Due to the free version's limitations, the server will go to sleep after a period of inactivity.

Notes:

- Adding translator and conversion API
- Add modal and info for photos in locationDetails
- error handling 429 code on locations
  - Pass up photo api calls to parent with set timer to avoid api call limit error
  - Handle LocCard no photo to display
- ThemeProvider Styling
- Add mock user context for testing
- On signup "cannot preform state update on unmounted component"
- HasSaved in useEffect of locationDetails toos up for entire comp. rerendering.. break into smaller comp.
- For MUI Dependencies should {deconstruct} or indv import?
