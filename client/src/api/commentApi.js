import apiInstance from './apiInstance';

export const commentApi = {
  getAllComment: (id, token) => {
    const url = '/comment/' + id;
    return apiInstance.get(url, {
      headers: {
        Authorization: token,
      },
    });
  },

  newComment: (comment, token) => {
    const url = '/comment/new';
    apiInstance.post(url, comment, {
      headers: {
        Authorization: token,
      },
    });
  },
  deleteComment: (id) => {
    const url = '/comment/delete/' + id;
    apiInstance.delete(url);
  },
};
