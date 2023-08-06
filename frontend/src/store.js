import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';
import { noteCreateReducer, noteDeleteReducer, noteListReducer, noteUpdateReducer } from './reducers/noteReducers';

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister:userRegisterReducer,
  noteList:noteListReducer,
  noteCreate:noteCreateReducer,
  noteUpdate:noteUpdateReducer,
  noteDelete:noteDeleteReducer,
  userUpdate:userUpdateReducer
});

const userInfoDromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
const initialState = {
  userLogin:{userInfo:userInfoDromStorage}
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
