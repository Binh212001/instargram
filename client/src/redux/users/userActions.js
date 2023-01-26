import userApi from '../../api/userApi';

export const USER__LOGIN = 'USER__LOGIN';
export const UNFOLLOW = 'UNFOLLOW';
export const USER__LOGIN__FAIL = 'USER__LOGIN__FAIL';
export const USER__LOGOUT = 'USER__LOGOUT';
export const GET__USER__ME__FOLLOW = 'GET__USER__ME__FOLLOW';
export const GET__USER__FOLLOW__ME = 'GET__USER__FOLLOW__ME';

export const startLogin = (data) => {
  return async (dispatch) => {
    try {
      const response = await userApi.logIn(data);
      if (response.user) {
        dispatch(loginSuccess(response));
      }
    } catch (error) {
      dispatch(loginFail());
    }
  };
};

export const loginSuccess = (data) => {
  return {
    type: USER__LOGIN,
    payload: data,
  };
};

export const loginFail = () => {
  return {
    type: USER__LOGIN__FAIL,
    payload: {
      message: 'User name or password invalid',
    },
  };
};

export const Logout = () => {
  return { type: USER__LOGOUT };
};

export const IFollowPerson = ({ id, token }) => {
  return async (dispatch) => {
    try {
      const response = await userApi.following({ id, token });
      dispatch({
        type: GET__USER__ME__FOLLOW,
        payload: response,
      });
    } catch (error) {}
  };
};

export const unFollow = (id) => {
  return { type: UNFOLLOW, payload: id };
};

export const GET__STRANGER = 'GET__STRANGER';
export const getStranger = (id) => {
  return async (dispatch) => {
    try {
      const res = await userApi.stranger(id);
      dispatch({
        type: GET__STRANGER,
        payload: res,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
