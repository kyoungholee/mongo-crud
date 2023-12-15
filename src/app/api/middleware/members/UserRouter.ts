import { Router } from 'express';
import { UserController } from '../../controllers/UserController';

const router = Router();


router.use('/signup', UserController.signUp);
router.use('/login', UserController.logIn);

export default router;
 