import {Router} from 'express';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { loginEmail } from '../controller/login.controller';
const router:Router=Router();

router.post('/',   //for master login
    basicAuthUser,
    checkRequestBodyParams('email'),
    loginEmail
         
);


export default router;