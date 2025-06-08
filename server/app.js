import express from "express"

import {config}  from "dotenv"

import cookieParser from "cookie-parser"

import { connection } from "./database/dbconnection.js"

import cors from "cors"

import { errorMiddleware } from "./middlewares/errors.js"

import userRouter from "./routes/userRouter.js"

import { removeUnverifiedAccounts } from "./automation/removeunVerifiedAccount.js"

import portfolioRoutes from "./routes/portfolioRoutes.js" // New portfolio routes

export const app = express();



config({path: "./config.env"});



app.use(cors({
    origin : [process.env.FRONTEND_URL],

    methods: ["GET", "POST" , "PUT" , "DELETE"],

    credentials: true,
}));


app.use(cookieParser());   // create the tokens and send to backend and then backend responses accordely

app.use(express.json());    // express.json() parses (means to read and convert structured data into a usable format.)JSON request bodies and makes them available in req.body.

app.use(express.urlencoded({extended:true}))    //Parses URL-encoded form data

app.use("/api/v1/user",userRouter);

app.use("/api/v1/", portfolioRoutes); // New portfolio routes



 
removeUnverifiedAccounts();

connection();


app.use(errorMiddleware) 

