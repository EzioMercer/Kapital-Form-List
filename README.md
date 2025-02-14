# Kapital-Form-List

# Requirements

+ To be able to run back you have to install `node` version which supports typescript natively. Recommended:  `23.7.0`
+ You have to [install MongoDB](https://www.mongodb.com/try/download/community). Recommended:  `8.0`
+ Create `.env` file in `back` folder with next variables:
  + PORT - port of your local server (e.g. `3000`)
  + ALLOWED_ORIGIN_PORT - port of your local NextJS application (e.g. `3001`)
  + DB_HOST - host of MongoDB connection (e.g. `127.0.0.1`) 
  + DB_PORT - port of your MongoDB connection (e.g. `27017`)


# How to start

1. Start your MongoDB by running `mongod` command
2. Start BackEnd by running `npm start` in `back` folder
3. Start FrontEnd by running `npm run dev` in `front` folder
