import {combineReducers} from 'redux'
import { userReducer } from './userReducer'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key:'root',
    version:1,
    storage,
}

const rootReducer = combineReducers({
    user:userReducer
})

const persistedReducer = persistReducer(persistConfig,rootReducer)


export default persistedReducer