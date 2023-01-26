import apiInstance from './apiInstance';

const postApi = {
  fetchListPost: (token) => {
    const url = '/post';
    return apiInstance.get(url, {
      headers: {
        Authorization: token,
      },
    });
  },
  addNewPost: (post, token) => {
    const url = '/post/new';

    return apiInstance.post(url, post, {
      headers: {
        Authorization: token,
      },
    });
  },

  delPost: (id) => {
    const url = '/post/delete/' + id;
    return apiInstance.delete(url);
  },
};

export default postApi;
