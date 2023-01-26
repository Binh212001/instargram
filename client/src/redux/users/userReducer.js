import {
  GET__STRANGER,
  GET__USER__ME__FOLLOW,
  UNFOLLOW,
  USER__LOGIN,
  USER__LOGIN__FAIL,
  USER__LOGOUT,
} from './userActions';

const initialState = {
  user: null,
  message: '',
  token: '',
  followings: [],
  stranger: [],
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER__LOGIN:
      const { user, token } = payload;
      return { ...state, user, token, message: '' };
    case USER__LOGIN__FAIL:
      return { ...state, message: payload.message, user: null, token: '' };
    case USER__LOGOUT: {
      return { ...state, message: '', user: null, token: '' };
    }
    case GET__USER__ME__FOLLOW:
      return { ...state, followings: payload };

    case UNFOLLOW:
      const followings = unfollow(state.followings, payload);
      return {
        ...state,
        followings,
      };
    case GET__STRANGER:
      return {
        ...state,
        stranger: payload,
      };
    default:
      return state;
  }
};

export default userReducer;

const unfollow = (data, id) => data.filter((x) => x._id !== id);
