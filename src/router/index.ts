import {Router} from 'express';
const router : Router = Router();
 

import Master from './master.router';
import Login from './login.router';


import Course from './course.router';
import Question from './questions.router';
import User from './user.router';
import Result from './result.router';


router.use('/master',Master);
router.use('/login',Login);
router.use('/user',User);
router.use('/course',Course);
router.use('/question',Question);
router.use('/result',Result);

export default router