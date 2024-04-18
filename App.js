import "dotenv/config";
import express from 'express'
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";

import UserRoutes from "./Users/routes.js";
import Hello from "./Hello.js"
import Lab5 from "./Lab5.js";
import CourseRoutes from "./kanbas/courses/routes.js";
import ModuleRoutes from "./kanbas/Modules/routes.js";
import AssignmentsRoutes from "./kanbas/Assignments/routes.js";


const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING);

const app = express()
app.use(cors({
        credentials: true,
        origin: [process.env.FRONTEND_URL, "http://localhost:3000"]
    })
);
app.use(express.json());
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.HTTP_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));

console.log("setting up")
CourseRoutes(app);
console.log("routes set up")
ModuleRoutes(app);
AssignmentsRoutes(app);
Lab5(app);
Hello(app)
UserRoutes(app);
app.listen(process.env.PORT || 4000);