Read Me - Eat Safe Foods

This project tackles food safety, allowing users to generate a report based off information from the Prince George Health Department. It also allows users to report and view Covid-19 related information. 

Currently Eat Safe Foods is fully compatible with Microsoft Edge Version 87.0.664.60. 

[Link to User Manual](EATSAFEFOODS/docs/user.md)

Developer Manual 

Installation: 
Either GitHub Desktop or Git Bash: Git Clone are good tools to use in cloning this repository. The repository is available [here](https://github.com/tvo1026/eatsafefoods).git.

Dependencies:
Once the repository is available, install all node dependencies using npm install in the console. This will install all dependencies listed below:
•	body-parser@1.19.0 - Node.js body parsing middleware.
•	cors@2.8.5 - node.js package for providing a Connect/Express middleware 
•	dotenv@8.2.0 - a zero-dependency module that loads environment variables from a .env file into process.env.
•	express@4.17.1 - Node.js server framework
•	mocha@8.2.1 - A feature-rich JavaScript test framework running on Node.js
•	moment@2.29.1 - A JavaScript date library for parsing, validating, manipulating, and formatting dates.
•	mongoose@5.10.18 - A MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.
•	mongoose-auto-increment@5.0.1 - Mongoose plugin that auto-increments any ID field on your schema every time a document is saved.

Deployment:
Start the application server using the command npm start in the console.

Testing:
Test by entering npm test in the console.

Server API Endpoints:
POST:
•	POST request is used to create an user.
•	POST requests can be submitted to /users.
•	POST requests must be in JSON form.
•	POST requests return either a JSON object or an error message once completed.
GET:
•	GET requests are used to get either all users or specific users based on zip code.
•	GET requests can be submitted to /users or /users/<zipcode>.
•	GET requests return an array of all users, JSON objects when getting specific users by zip code, or an error message when completed.
PUT:
•	PUT requests Are used to update users.
•	PUT requests can be submitted to /users/<userName>.
•	PUT requests must be in JSON form.
•	PUT requests return either a JSON object or an error message once completed.
DELETE:
•	DELETE requests are used to delete users.
•	DELETE requests can be submitted to /users/<userName>.
•	DELETE requests return either a confirmation message or an error message once completed.

Known Bugs:
Application is currently only compatible with Microsoft Edge, there will be issues with generating reports in other browsers. Outside of this there are no known errors or bugs.

Road-map for future developments:
•	Compatibility for other major browsers and mobile devices.
•	Combine data available with another API (perhaps Google) to remove closed restaurants from search results.
•	Implement Covid-19 tracking map feature, React JS suggested.