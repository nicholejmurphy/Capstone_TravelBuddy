# TravelBuddy

_"Everything you need in a travel app."_

This is my final capstone project for my Software Engineering course with Springboard.

## General Overview

TravelBuddy is a mobile friendly full-stack single page web application that emphasizes user ease and customization. TravelBuddy allows users to search for attractions, restaurants, hotels, and general geographic locations from across the globe and receive a fun trivia fact along the way.

## Tech Stack

- PostgreSQL database: RDBMS to store and manipulate user data
- Validation: Implemented middleware to handle user authorization for backend routing & JSON schema validation with JSONschema.
- Testing: unit and integration tests using Jest
- Error handling: customized error handling features
- Dependency management: with Node Package Manager
- Environment variables: using Dotenv
- Security: Bcrypt password hashing
- Styling: Material UI v4

## Focus

In building this application, I wanted to be very intentional with the planning process and spent a great amount of time organizing the databases, sorting through API responses, planning the models structures, and mapping user flows for a thoughtful user experience.
![Notes & Planning](/documentation/Planning.jpg)
My intentions with this application were to practice skills in building an efficient and intentional Single Page Application that is also mobile friendly with a responsive design. I introduced myself to Material UI v4 for this application and wanted to achieve a modern and eye catching design.

## Documentation

### APIs

TravelBuddy utilizes multiple external APIs, allowing user's access to a wide variety of information to support their travel needs.
APIs used:

1. TripAdvisor https://api.content.tripadvisor.com/api/v1/location
2. API Ninjas https://api.api-ninjas.com/v1/trivia?category=geography
3. DeepL https://www.deepl.com/docs-api/api-access
4. ExchangeRate http://api.exchangerate.host

Privacy:
All API calls are handled in the backend. API keys are stored in a .env file which is listed in .gitignore to keep private.

### Backend Overview

TravelBuddy is built on a backend Node.js server and a Frontend React.js server. The backend is a Node.js RESTful API used to store, update, and access user data. The backend also handles all external API calls behind the scenes for the React server. Users can create an account to save information for quick access at any time.

![Node.js Routes Diagram](/documentation/BackendRoutes.jpg)

#### The Database

The backend server utilizes a PostgreSQL database for storing user data from simple user input with light API data (location_id). This database simply uses one to many relationships in storing basic saved data from external APIs to generate a customized experience for the user. Passwords are hashed and stored using bcrypt encoding with a work factor of 12. Direct SQL queries are made from backend models which are called in the backend routes.

![Entity Relationship Diagram](/documentation/ERD.jpg)

### Frontend Overview

The frontend application is styled and designed with Material UI v4 as a modern and responsive Single Page Application. Below is the general React.js component layout.
TravelBuddy uses a Context provider for wrapping components with basic user data to allow for reduced prop drilling and ease of information sharing. Routes within the purple dashed box signify private routes which authorizes only logged in users to be able to access designated parts of the application.

![React.js Routes and Components Diagram](/documentation/ReactComponentMap.jpg)

### Deployment

TravelBuddy is currently deployed on two servers using an ElephantSQL database paired with the OnRender cloud service. They are deployed as a web application (backend) and a static site (frontend). The API keys for external sources are saved as environment variables which are pulled from 'dotenv' in the backend.
You can see TravelBuddy deployed [here](https://travelbuddy-egbq.onrender.com/).

> **Please note** <br/>
> The deployment of TravelBuddy is hosted on a free cloud service which can often cause delays in loading. Due to the free version's limitations, the server will go to sleep after a period of inactivity.

#### Installation

> You will need an API access key from the APIs listed above to gain full functionality access

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
const CONVERSION_API_KEY = "";

module.exports = {
  TRAVEL_API_KEY,
  TRIVIA_API_KEY,
  CONVERSION_API_KEY
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

## Reflections

### Learning Curves

- Learning MUI v4 for more modern styling implementations
- Responsiveness for building a mobile friendly SPA across all viewport sizes
- 429 Error code API limits for dynamic data needs
- User experience architecture with Location Details modal vs separate route
- Mock testing frontend and building a mock context provider

### Next Implementations

I will be adding in a currency converter and language translator functionality that will allow users a quick access to additional resources.

### Future Project Growth

- **404 WITH HISTORY ON DEPLOYMENT:** The currently deployed application on render is not functioning properly with page history navigation. It is currently throwing 404s when using the 'back' feature on the browser for most pages. This is not occuring on locally deployed application. Likely this is caused by slowed deployment service.
- **API IMPLEMENTATION:** Adding a translator and conversion API as additional features for the app including functionality to save translations and common currency conversions to a user's account. This will involve implementing more tables within the TravelBuddy pSQL database and with RESTful routes to access and manipulate.
- **PHOTO DETAILS** Add modals and info for photos in locationDetails for each location. This will share credit and additional details for each listed photo in information.
- **API LIMIT** Include error handling 429 code on locations
  - To mitigate error responses, I will pass up photo api calls to parent with set timer to avoid api call limit error
- **PHOTO DISPLAY** Handle LocationCard no photo to display for locations without a photo.
- **UPDATE THEMEPROVIDER** Consolidate styling to reduce duplication and to create consistent theming
- **MOCK TESTING** Add mock user context for testing
- On signup "cannot perform state update on unmounted component"
- **USEEFFECT DEPENDENCIES** HasSaved in useEffect of locationDetails move up for entire comp. rerendering.. break into smaller comp.
- **STREAMLINE MUI IMPORTS** For MUI Dependencies should {deconstruct} or individual import?
