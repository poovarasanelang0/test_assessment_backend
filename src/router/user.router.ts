import {Router} from 'express';
import { saveUsers,getAllCourse,updateCourse,getSingleCourse,deletedCourse,getFilterCourse } from '../controller/user.controller';
import { checkQuery,checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { checkSession } from '../utils/tokenManager';
const router:Router=Router();

router.post('/', //create masters
basicAuthUser,
checkRequestBodyParams('email'),
saveUsers
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

router.get('/getSingleUser',  //get single user
    basicAuthUser,
    checkSession,
    checkQuery('_id'),
    getSingleCourse);

router.delete ('/',  //delete users',
    basicAuthUser,
    checkSession,
    checkQuery('_id'),
    deletedCourse);

router.put('/questionFilter',  //get filter for users',
    basicAuthUser,
    checkSession,
    checkRequestBodyParams('_id'),
    getFilterCourse);
export default router;