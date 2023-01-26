import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import commentReducer from './comments/commentReducer';
import postReducer from './posts/postReducer';
import userReducer from './users/userReducer';

const rootPersistConfig = {
  key: 'root',
  storage: storage,
};

const authPersistConfig = {
  key: 'user',
  storage: storage,
};

let rootReducer = combineReducers({
  user: persistReducer(authPersistConfig, userReducer),
  post: postReducer,
  comment: commentReducer,
});

export default rootReducer = persistReducer(rootPersistConfig, rootReducer);
