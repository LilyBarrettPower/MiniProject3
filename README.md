# MiniProject3

Q1 - WHat was the requirements gathering process?

I searched the free JSON API's and there was one for space flight data so I wanted to do something with space flight and found the SpaceX API and it was free and the structure suited my project well
I then chose what data from the API I wanted to store in my database 
I then did a logical and physical model to understand what my entities were and how they were related 
After doing my models, I decided to use a SQL based database and decided on MySQL and Sequelize as the package

Q2 - Give a high level overview of your application:

My application is an express server that fetches data from the SpaceX API on past rocket launches
The application has a specific route for fetching the data (which is filtered to only fetch the data I am interested in) 
The application then has another route to populate the data base with the fetched data 
The populateDB route will only add new data to the database to ensure there is no double ups of data in the database 
There are routes to get, create, update and delete your own data for flights, rockets and launchsites in the database 
I did this using ThunderClient 

Q3 - Where does the data come from?

The data comes from the free external SpaceX API https://api.spacexdata.com/v2/launches

Q4 - How is your data inserted into you database?

Uisng the route /spaceapi/populateDB will utilise the spaceXlibrary 
the spaceXlibrary fetches the data from the API 
the spaceXlibrary is imported into the populateDBcontroller which uses sequelise to add NEW data to the database using .findOrCreate 
the populateDBcontroller uses promises 
the populateDBcontroller is then imported into the spaceXcontroller where it is called in the populateDB function which is imported into the route

Q5 - How is the data structured?

The data is structured into 3 tables 
- flights
- rockets
- launchsites
rockets have a one to many relationship with flights
launchsites have a one to many relationship with flights
flights have a one to one relationship with rockets and launchsites

Q6 - How is the application structured into MVC?

the spaceXlibrary fetches the data 
the controllers handle the business logic for filtering the fetched data, populating the database, performing CRUD operations on flights, rockets and launchsites 
the models have the schemas for flights, rockets and launchsite tables to be inserted into the database 
the routes handle the routes for fetching the data, populating the database and performing CRUD operations on flights, rockets and launchsites 
the .env file holds my environment variables 
the server.js file creates the server and base routes 
the dbconnect.js file connects my server with the database using sequelize 

Q7 - Does you application cover all 4 CRUD operations?

Yes, using .findAll(), .create(), .update(), .destroy() sequelize methods 
the update and destroy methods use 
- flightNumber
- rocketID
- siteID
to find the correct data to update/delete

Q8 - How might using a database instead of an external API benefit an application?

A database gives you full control over the data and the models 
Querying a database could be quicker than querying an external API 
external APIs may have fetching limits 
Data in a database is accessible offline 
Security is easier to implement with a database than with an external API 

Q9 - How might you extend your application in future?

Create a front end 
Create authentication for the front end so only logged in users can modify/create data 


