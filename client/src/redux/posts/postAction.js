import postApi from '../../api/postApi';

export const GET__ALL__POST = 'GET__ALL__POST';
export const NEW__POST = 'NEW__POST';

export const DELETE__POST = 'DELETE__POST';

export const getListPostStart = (token) => {
  return async (dispatch) => {
    try {
      const posts = await postApi.fetchListPost(token);
      dispatch(getListPostSuccess(posts));
    } catch (error) {
      console.log(error);
    }
  };
};

const getListPostSuccess = (posts) => {
  return {
    type: GET__ALL__POST,
    payload: posts,
  };
};

export const deleteMyPost = (id) => {
  return {
    type: DELETE__POST,
    payload: id,
  };
};
