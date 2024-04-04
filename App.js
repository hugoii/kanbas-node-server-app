import express from 'express'
import Hello from "./Hello.js"
import Lab5 from "./Lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./Modules/routes.js";
import AssignmentsRoutes from "./Assignments/routes.js";
import cors from "cors";

const app = express()
app.use(cors());
app.use(express.json());
CourseRoutes(app);
ModuleRoutes(app);
AssignmentsRoutes(app);
Lab5(app);
Hello(app)
app.listen(process.env.PORT || 4000);