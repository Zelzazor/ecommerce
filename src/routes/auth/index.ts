import express from 'express'
import {signUp, signIn, signInView, signOut, signUpView} from '../../controllers/auth'
import { isLoggedIn } from '../../middlewares/auth/isLoggedin.middleware'
const AuthRoutes = express.Router()


AuthRoutes.get('/register', signUpView)
AuthRoutes.post('/register', signUp)
AuthRoutes.post('/login', signIn)
AuthRoutes.get('/login', signInView)
AuthRoutes.get('/logout', isLoggedIn ,signOut)



export default AuthRoutes


