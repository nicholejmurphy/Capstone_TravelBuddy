# TravelBuddy

_"Everything you need in a travel app."_

TravelBuddy is a full-stack web application that allows a user to seemlesly achieve all of their travel needs in one location.

## General Overview

TravelBuddy is a mobile friendly application that allows users to search for attractions, resturaunts, hotels, and general geographic locations. In the same place, a user can create instant language translations, currency conversions, and simply check the weather for their destination. This is a single page application that emphasizes user ease and customization.

## Documentation

TravelBuddy Utiilizes a backend Node.js RESTful API to store, update, and access user data. Users can create an account to save information for quick access at anytime.

### PostgreSQL Database

![Entity Relationship Diagram](/documentaion/ERD.jpg)

### Backend Node.js Overview

![Node.js Routes Diagram](/documentaion/Node.jsRoutes.jpg)

### Frontend React.js Overview

![React.js Routes and Compnents Diagram](/documentaion/React.jsRoutesComponents.jpg)

TravelBuddy utilizes multiple external APIs as well.

1. TripAdvisor
2. Translator [TBD]
3. Currency Converter [TBD]
4. Weather [TBD]

![React.js API Calls list](/documentaion/React.jsAPICalls.jpg)

Notes:

- error handling 429 code on locations
- key prop for anon skeletons loading locations
- saved locations test invaild save and clear
- Check for and Delete loading component

- install
- Using for standardizing typography styling
