# TravelBuddy

_"Everything you need in a travel app."_

This is my final captstone project for my Software Engineering course with Springboard.

## General Overview

TravelBuddy is a mobile friendly full-stack single page web application that emphasizes user ease and customization. TravelBuddy allows users to search for attractions, resturaunts, hotels, and general geographic locations from across the globe and recieve a fun trivia fact along the way.

## Documentation

### PostgreSQL Database

The backend server utilizes a PostgreSQL database for storing user data. This database simply uses a one to many relationship in storing basic saved data from external APIs to generate a customized experience for the user. Passwords are hashed and stored using bcrypt encoding with a work factor of 12.

Below is the Entity Relationship Diagram for this project.

![Entity Relationship Diagram](/documentation/ERD.jpg)

### Backend Node.js Overview

TravelBuddy is built on a backend Node.js server and and a Frontend React.js server. The backend is a Node.js RESTful API used to store, update, and access user data. The backend also handles all external API calls behind the scenes for the React server. Users can create an account to save information for quick access at anytime.

Below is a flow chart of the Node.js routes
![Node.js Routes Diagram](/documentation/BackendRoutes.jpg)

### Frontend React.js Overview

The frontend application is styled and designed with Material UI v4 as a modern and responsive Single Page Application. Below is the general React.js component layout.
TravelBuddy uses a Context provider for wrapping components with basic user data to allow for reduced prop drilling and and ease of information shairng. Routes within the purple dashed box signify private routes which authorizes only logged in users to be able to acces designated parts of the application.

Below is a diagram of the React.js routes and components.
![React.js Routes and Compnents Diagram](/documentation/ReactComponentMap.jpg)

### API Documentation

TravelBuddy utilizes multiple external APIs, allowing usser's access to a wide variety of information to support their travel needs.

1. TripAdvisor (Location data, reviews, & photos)
2. API Ninjas (Trivia)
3. Translator [To be implemented]
4. Currency Converter [To be implemented]

### Deployment

TravelBuddy is currently deployed using an ElephantSQL database paired with the OnRender cloud service.
You can see TravelBuddy deployed [here](https://travelbuddy-egbq.onrender.com/).

> **Please note** <br/>
> The deployment of TravelBuddy is hosted on a free cloud service which can often cause delays in loading. Due to the free version's limitations, the server will go to sleep after a period of inactivity.

### Installation

> You will need an API access key from the APIs listed above to gain full functioanlity access

If you prefer to deploy manually, follow these steps:

Clone the repository:
Install dependencies for the front and backend:

```
 cd frontend
 npm install
```

```
 cd ../backend
 npm install
```

Create and seed a database to get started:

```
# You will need to have PostgreSQL downloaded on your computer
backend/ $ psql < tb.sql
```

Create a keys.js file to add your API keys to and export as:

```
const TRAVEL_API_KEY = "";
const TRIVIA_API_KEY = "";

module.exports = {
  TRAVEL_API_KEY,
  TRIVIA_API_KEY,
};
```

Testing:

```
# Either in the frontend/ or backend/ directory, run:
npm test
```

Running locally, to start both servers:

```
# in frontend/ directory
npm start

# in backend/ directory
npm start
```

### Technologies used

- PostgreSQL database: RDBMS to store and manipulate user data
- Validation: Implemented middleware to handle user authorization for backend routing & JSON schema validation with jsonschema.
- Testing: unit and integration tests using Jest
- Error handling: customized error handling features
- Dependency management: with node package manager
- Environment variables: using dotenv
- Security: bcrypt password hashing
- Styling: Material UI v4

## Focus

- SPA w/ Material UI
- Mobile friendly
- Heavy planning stages, starting with API returns vs database structures

## Data Model

- Simple user input with light API data (location_id)
- PostgreSQL database and direct SQL queries from backend models which are called in the BE routes
- One to many relationships users > savedLocations

## API & Routing Design

- All API calls are handled in the BE, keys.js are in .gitignore
- User data RESTful
- Separate route files for

## Frontend

- React
- See component hierarchy

## Learning Curves

- MUI v4
- Responsiveness
- 429 Error code API limits
- Location Details modal vs route.. user sharing/access experience
- Mock testing FE

## Additional Features:

- Trivia, conversion, translator

## Deployment & Next steps

- Deployed on Render with ElephantSQL
- 2 servers
-

## Future Project Updates:

- **API IMPLEMENTATION:** Adding a translator and conversion API as additional features for the app including functionality to save translations and common currrency conversions to a user's account. This will involve implementing more tables within the TravelBuddy pSQL database and with RESTful routes to access and manipulate.
- **PHOTO DETAILS** Add modals and info for photos in locationDetails for each location. This will share credit and additional details for each listed photo in information.
- **API LIMIT** Include error handling 429 code on locations
  - To mitigate error responses, I will pass up photo api calls to parent with set timer to avoid api call limit error
- **PHOTO DISPLAY** Handle LocationCard no photo to display for locations without a photo.
- **UPDATE THEMEPROVIDER** Consolidate styling to reduce duplication and to create consistant themeing
- **MOCK TESTING** Add mock user context for testing
- On signup "cannot preform state update on unmounted component"
- **USEEFFECT DEPENDENCIES** HasSaved in useEffect of locationDetails toos up for entire comp. rerendering.. break into smaller comp.
- **STREAMLINE MUI IMPORTS** For MUI Dependencies should {deconstruct} or indv import?
