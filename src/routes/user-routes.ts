import express from  'express'
const router = express.Router()
import { register} from '../controllers/user/register'
import { login } from '../controllers/user/login'
import { logout } from '../controllers/user/logout'
import { edit_profile, get_profile }  from '../controllers/user/profile'
import { authenticateUser } from '../middlewares/authenticateUser'
import { addTransaction } from '../controllers/orders/transaction'
router.post('/create-account', register)
 router.post('/signin', login)
router.get('/profile', authenticateUser, get_profile)

router.post('/edit-profile', authenticateUser, edit_profile)
router.post("/addTransaction", authenticateUser, addTransaction);
router.get('/logout', logout)




export default router



