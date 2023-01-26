import React from 'react';
import { useForm } from 'react-hook-form';
import logo from '../assets/logo.webp';
import CommentItem from './CommentItem';
import { useDispatch, useSelector } from 'react-redux';
import './CommentPost.scss';
import { useEffect } from 'react';
import { addNewPost, fetchCommentPost } from '../redux/comments/commentAction';
import { commentApi } from '../api/commentApi';

function CommentPost({ handleShowViewPost, postSelected }) {
  const { register, handleSubmit, reset } = useForm();
  const { token, user } = useSelector((state) => state.user);
  const { comment } = useSelector((state) => state.comment);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCommentPost(postSelected._id, token));
  }, [dispatch, postSelected, token]);

  const submitComment = async (data) => {
    const value = {
      ...data,
      username: user.username,
      avatar: user.avatar,
      userId: user._id,
      postId: postSelected._id,
    };
    await commentApi.newComment(value, token);
    dispatch(addNewPost(value));
    reset();
  };

  return (
    <div className='comment d-flex justify-content-center algin-items-center '>
      <div className='box row'>
        <div className='col-4 d-flex flex-column justify-content-center'>
          <img
            src={`http://localhost:4000/public/images/${postSelected.image}`}
            width='100%'
            alt=''
          />
        </div>
        <div className='post__right col-8 d-flex flex-column  justify-content-between p-4'>
          <div className='user'>
            <div className='user__image d-flex'>
              <img src='' alt='' />
              <h5>{postSelected.username}</h5>
            </div>
            <p className='des'>{postSelected.description}</p>
          </div>

          <div className='comment__list  '>
            {comment.map((cm) => (
              <CommentItem key={cm._id} comment={cm} />
            ))}
          </div>
          <form onSubmit={handleSubmit(submitComment)} className='form d-flex '>
            <input
              type='text'
              {...register('text', { required: true })}
              placeholder='Comment ....'
              className=' form-control'
            />
            <button type='submit' className='btn btn-primary'>
              Post
            </button>
          </form>
        </div>
      </div>
      <div className='cancel' onClick={() => handleShowViewPost()}>
        <i className='fa-solid fa-xmark'></i>
      </div>
    </div>
  );
}

export default CommentPost;
