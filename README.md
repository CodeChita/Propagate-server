# Propagate

## Description

Propagate is a web app trading place for plants. 
Made by [George Brooks](https://github.com/gdsbrooks) and [Codechita](https://github.com/CodeChita/)

## User Stories

- **Landing page** - The landing page has a small preview of the map function. The ability to log in with Google authentication or with a Propagation user.
- **sign up** - The User can create an account with Google or with an email and password.
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account.
- **Private landing page** - After your logged in you get acces to the complete map function and navigation.
- **Private profile** - On the private profile there is a list of the propagations the user listed. The ability to edit your profile.
- **Edit profile** - The user is able to edit their picture, nickname, about me, email. Also the user will be able to delete the whole profile here. 
- **Public profile** - Other users will able to see the name of the user the profile picture, the small bio and all the listings the user offers.
- **Map search** - The user is able to fill in a city and check which listings are offert.
- **Plant search** - The user will be able to write the common plant name and get a list of offers (sorted accordently to distance).
- **Message** - The user will be able to see all the chats the users has and be able to click on one to chat.
- **Chat** - The user will be able to chat amongst eachother to arrange an exchange.
- **Adding plant** - The User can take a picture of a plant. Define what part of the plant you pictured and choose the right naming from the api. At last the user can specify which city the propagation is available and write something short about progation.
- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

## Backlog
- **Picture** - Users will be able to activate their own camera and take the picture 
-

Homepage
- ...


## ROUTES:

- GET / 
  - renders the homepage
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username
    - email
    - password
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password
- POST /auth/logout
  - body: (empty)

- GET /events
  - renders the event list + the create form
- POST /events/create 
  - redirects to / if user is anonymous
  - body: 
    - name
    - date
    - location
    - description
- GET /events/:id
  - renders the event detail page
  - includes the list of attendees
  - attend button if user not attending yet
- POST /events/:id/attend 
  - redirects to / if user is anonymous
  - body: (empty - the user is already stored in the session)


## Models

User model
 
```
username: String
password: String
```

Event model

```
owner: ObjectId<User>
name: String
description: String
date: Date
location: String
attendees: [ObjectId<User>]
``` 

## Links
### Wireframe
https://whimsical.com/propagate-FypVbAYLogtrK36AobkdeB

### Trello
https://trello.com/b/EOm8KhXQ/propgate

### Git

The url to your repository and to your deployed project

- [Repository client side](http://github.com)
- [Repository server side](https://github.com/CodeChita/Propagate-server)


[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)

