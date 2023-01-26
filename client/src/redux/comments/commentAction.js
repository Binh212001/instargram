import { commentApi } from '../../api/commentApi';

export const FETCH__COMMENT__START = 'FETCH__COMMENT__START';

export const FETCH__COMMENT__SUCCESS = 'FETCH__COMMENT__SUCCESS';

export const FETCH__COMMENT__FAIL = 'FETCH__COMMENT__FAIL';

export const DELETE__COMMENT = 'DELETE__COMMENT';

export const NEW__POST = 'NEW__POST';
export const fetchCommentPost = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await commentApi.getAllComment(id, token);
      console.log('🚀 ~ file: commentAction.js:15 ~ return ~ res', res);
      dispatch({
        type: FETCH__COMMENT__SUCCESS,
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: FETCH__COMMENT__FAIL,
      });
    }
  };
};

export const addNewPost = (post) => {
  console.log('🚀 ~ file: commentAction.js:30 ~ addNewPost ~ post', post);
  return {
    type: NEW__POST,
    payload: post,
  };
};

export const REMOVE__COMMENT = 'REMOVE__COMMENT';
export const removeCommentAction = (id) => {
  return {
    type: REMOVE__COMMENT,
    payload: id,
  };
};
