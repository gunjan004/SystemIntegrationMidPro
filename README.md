# System Integration Midterm: Backend
SI Midterm Backend Project documentation

API can be used to easily authenticate users for Gamezz web application. The API is also used to add games to the repository, delete game from repository and also to fetch all games present in the repository. The server is hosted on AWS EC2.

## Table of content
* [Get Started](#get-started)
    * [Login](#login)
    * [Sign Up](#sign-up)
    * [Get My Games](#get-my-games)
    * [Add New Games](#add-new-games)
    * [Delete Game](#delete-game)
* [Database Schema](#database-schema)
* [References](#references)

## Get Started
User-Authentication-API can be used to login, signup user and get user specific information. The other APIs are used to get, add and delete games to and from the repository.

> In the examples on this page, you would replace [TOKEN] with the token returned by this API after user SignUp/Login.

### Login 

> http://52.45.142.77:80/api/user/login

* Method - POST 

* Request Payload - 
 
 ```  
 {
     "email" : "joey@gmail.com",
     "password" : "123456"
 }
```
   
* Response Payload- 
    
```
 {
    "status": 200,
    "id": "5dcd443345f9d61daf65ff9b",
    "token":"[TOKEN]",
    "name": "Joey Tribbiani",
    "email": "joey@gmail.com"
 } 
```

* Status codes -
   * 200 - success
   * 400 - Invalid email/password
   
* Messages - 

```
   {
    "status": 400,
    "message": "Email does not exist, please register!"
   }
```

### Sign Up

> http://52.45.142.77:80/api/user/signUp

* Method - POST

* Request Payload(Header) -

```
“token” :[TOKEN]
```

* Request Payload(Body) -
```
{
    "firstName" : "Barney",
    "lastName" : "Stinson",
    "gender" : "Male",
    "contactNo" : "1234567890",
    "email" : "barney@gmail.com",
    "password" : "123456"
}
```

* Response Payload- 
```
{
    "status": 200,
    "token": [TOKEN],
    "userId": "5dd0d3ca7a75547086b267e1",
    "name": "Barney Stinson",
    "email": "barney@gmail.com",
    "contactNo": "1234567890"
}
```

* Status codes - 
   * 200 - success
   * 400 - Access denied.. Token not provided
   * 401 - Invalid token

* Messages - 
```
{
    "status": 400,
    "message": "Email already exist.Try to Login.."
}
```

### Get My Games

> http://52.45.142.77:80/api/user/getAllGames

* Method - GET

* Request Payload(Header) -

```
“token” :[TOKEN]
```

* Response Payload- 
```
{
    "status": 200,
    "game": [
        {
            "_id": "5dcd1d419a01ec6098c40216",
            "name": "Dark Soul",
            "category": "Action and Adventure",
            "imageUrl": "/resources/action.jpg",
            "description": "123",
            "rating": "1",
            "__v": 0
        },
        {
            "_id": "5dd0befbb6a34e3f9bfa6da9",
            "name": "Sports",
            "category": "Sports",
            "imageUrl": "/resources/fps.jpg",
            "description": "desc",
            "rating": "1",
            "__v": 0
        }
    ]
}
```

* Status codes - 
   * 200 - success
   * 400 - Access denied.. Token not provided
   * 401 - Invalid token


### Add New Games

> http://52.45.142.77:80/api/user/addGame

* Method - POST

* Request Payload(Header) -

```
“token” :[TOKEN]
```

* Request Payload(Body) -
```
{
    "name" : "Car race",
    "category" : "Sports",
    "imageUrl" : "/resources/sports.png",
    "description" : "description data",
    "rating" : "4"
}
```

* Response Payload- 
```
{
    "status": 200,
    "message": "Game added successfully."
}
```

* Status codes - 
   * 200 - success
   * 400 - Access denied.. Token not provided
   * 401 - Invalid token

* Messages - 
```
{
    "status": 400,
    "message": "\"name\" is not allowed to be empty"
}
```

### Delete Game
> http://52.45.142.77:80/api/user/deleteGame
* Method - DELETE
* Request Payload(Header) -

```
“token” :[TOKEN]
```

* Request Payload(Body) -
```
{
    "gameID": "5dd0befbb6a34e3f9bfa6da9"
}
```

* Response Payload- 
```
{
    "status": 200,
    "message": "Game deleted successfully."
}
```

* Status codes - 
   * 200 - success
   * 400 - Access denied.. Token not provided
   * 401 - Invalid token

* Messages - 
```
{
    "status": 400,
    "message": "Access denied.. Token not provided"
}
```

## Database Schema

MongoDB Atlas Database 

* User Schema

```
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        max : 255
    },
    password : {
        type : String,
        min : 6,
        required : true
    },
    gender: {
        type :String,
        required : true
    },
    contactNo: {
        type:String,
        min : 10,
        max : 10,
        required: true
    }
});
```

* Game Schema

```
const gamesSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    rating: {
        type :String,
        required : true
    }
});
```

## References

- [JWT](https://jwt.io)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com)
- [@hapi/joi](https://www.npmjs.com/package/@hapi/joi)
