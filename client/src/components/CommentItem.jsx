import React from 'react';
import { commentApi } from '../api/commentApi';
import { useDispatch, useSelector } from 'react-redux';
import dog from '../assets/dog.jpg';
import { removeCommentAction } from '../redux/comments/commentAction';

function CommentItem({ comment }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleRemoveComment = async () => {
    const commentId = comment._id;
    await commentApi.deleteComment(commentId);
    dispatch(removeCommentAction(commentId));
  };
  return (
    <div className='d-flex justify-content-between align-items-center'>
      <div className=' d-flex align-items-center'>
        <div className='d-flex align-items-center'>
          <img src={dog} alt='' className='circle avatar-small mx-4' />
          <div>
            <h5 className='m-0'>{comment.username}</h5>
            <p className='m-0'>{comment.text}</p>
          </div>
        </div>
      </div>
      <div onClick={() => handleRemoveComment()}>{user._id === comment.userId ? 'Xoa' : ''}</div>
    </div>
  );
}

export default CommentItem;
