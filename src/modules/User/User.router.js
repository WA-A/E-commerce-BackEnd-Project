import { Router } from "express";
const router = Router();
import * as UserController from './User.controller.js'
import { auth } from "../../MiddleWare/auth.js";
import { EndPoints } from "./User.Role.js";


router.get('/getuser',auth(EndPoints.GatUsers),UserController.GetUsers);


export default router