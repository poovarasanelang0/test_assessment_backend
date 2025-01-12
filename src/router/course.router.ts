import {Router} from "express";
const router:Router = Router();
import { saveCourse,getAllCourse,updateCourse,getSingleCourse,deletedCourse,getFilterCourse } from "../controller/course.controller";
import {basicAuthUser} from "../middleware/checkAuth";
import {checkSession} from "../utils/tokenManager";
import { checkQuery,checkRequestBodyParams } from "../middleware/Validators";

router.post('/', //save Course
    basicAuthUser,
    checkSession,
    saveCourse
)

router.get('/', //get all 
    basicAuthUser,
    checkSession,
    getAllCourse
    );
    
router.put('/', //update Course
    basicAuthUser,
    checkSession,
    checkRequestBodyParams('_id'),
    updateCourse
    ) ;   

router.get('/getSingleCourse',  //get single user
    basicAuthUser,
    checkSession,
    checkQuery('_id'),
    getSingleCourse);

router.delete ('/',  //delete users',
    basicAuthUser,
    checkSession,
    checkQuery('_id'),
    deletedCourse);

router.put('/userFilter',  //get filter for users',
    basicAuthUser,
    checkSession,
    checkRequestBodyParams('_id'),
    getFilterCourse);


export default router;
