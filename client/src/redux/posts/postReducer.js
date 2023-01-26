import { DELETE__POST, GET__ALL__POST } from './postAction';

const initialState = {
  post: [],
  myPost: [],
};

const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET__ALL__POST:
      const { post } = payload;
      return { ...state, post };

    case DELETE__POST:
      const postUpdated = deletePost(state.post, payload);
      return { ...state, post: postUpdated };
    default:
      return state;
  }
};

export default postReducer;

const deletePost = (posts, id) => posts.filter((post) => post._id !== id);
