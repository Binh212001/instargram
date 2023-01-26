import { FETCH__COMMENT__SUCCESS, NEW__POST, REMOVE__COMMENT } from './commentAction';

const initialState = {
  comment: [],
};

const commentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH__COMMENT__SUCCESS:
      const { comment } = payload;
      return { ...state, comment };

    case NEW__POST:
      return { ...state, comment: [payload, ...state.comment] };

    case REMOVE__COMMENT:
      const updateComment = deleteComment(state.comment, payload);
      return {
        ...state,
        comment: updateComment,
      };

    default:
      return { ...state };
  }
};

export default commentReducer;

const deleteComment = (comment, id) => {
  return comment.filter((c) => c._id !== id);
};
