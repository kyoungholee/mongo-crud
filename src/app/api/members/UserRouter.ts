import { Router } from 'express';
출처: https://iot624.tistory.com/159 [JOBCHAE:티스토리]
import { UserController } from '../../../controllers/UserController';

const router = Router();


router.use('/signup', UserController.signUp);
router.use('/login', UserController.logIn);

export default router;
 