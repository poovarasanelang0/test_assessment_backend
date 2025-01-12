import {Router} from "express";
const router:Router = Router();
import { createResult, } from "../controller/result.controller";
import {basicAuthUser} from "../middleware/checkAuth";
import {checkSession} from "../utils/tokenManager";
import { checkQuery,checkRequestBodyParams } from "../middleware/Validators";

router.post('/', //save Course
    basicAuthUser,
    checkSession,
    createResult
)
export default router;