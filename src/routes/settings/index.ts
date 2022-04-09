import express from 'express'
import {userSettings, saveUserSettings} from '../../controllers/settings'
import {isLoggedIn} from '../../middlewares/auth/isLoggedin.middleware'
const SettingRoutes = express.Router()

SettingRoutes.get('/user', isLoggedIn, userSettings)
SettingRoutes.post('/user', isLoggedIn, saveUserSettings)



export default SettingRoutes