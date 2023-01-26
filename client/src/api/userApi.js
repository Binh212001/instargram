import apiInstance from './apiInstance';

const userApi = {
  logIn: (data) => {
    const url = '/login';
    return apiInstance.post(url, data);
  },
  following: ({ id, token }) => {
    const url = '/following/' + id;
    return apiInstance.get(url, {
      headers: {
        Authorization: token,
      },
    });
  },
  follow: ({ id, token, userId }) => {
    const url = '/follow/' + userId;
    return apiInstance.put(
      url,
      { id },
      {
        headers: {
          Authorization: token,
        },
      },
    );
  },
  stranger: (id) => {
    const url = '/stranger/' + id;
    return apiInstance.get(url);
  },
};

export default userApi;
