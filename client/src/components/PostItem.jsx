import React from 'react';
import PropTypes from 'prop-types';
import dog from '../assets/dog.jpg';
import { useState } from 'react';
import CommentItem from './CommentItem';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { commentApi } from '../api/commentApi';
import { deleteMyPost } from '../redux/posts/postAction';
import postApi from '../api/postApi';

function PostItem({ post, handleShowViewPost, selectViewPostComment }) {
  const [myComment, setMyComment] = useState([]);

  const { user, token } = useSelector((state) => state.user);
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();
  //@@@New comment
  const submitComment = async (data) => {
    setMyComment((prev) => [
      ...prev,
      { ...data, username: user.username, avatar: user.avatar, userId: user._id },
    ]);

    await commentApi.newComment(
      {
        ...data,
        username: user.username,
        avatar: user.avatar,
        userId: user._id,
        postId: post._id,
      },
      token,
    );
  };

  // @@@@Show view Post
  const showView = () => {
    selectViewPostComment(post);
    handleShowViewPost();
  };

  ///@@@Delete post

  const deletePost = () => {
    dispatch(deleteMyPost(post._id));
    postApi.delPost(post._id);
  };
  return (
    <div className='post'>
      <div className='card'>
        <div className='card-body'>
          <div className='d-flex align-items-center justify-content-between mb-3'>
            <div className='d-flex align-items-center'>
              <img
                src={post?.image ? `http://localhost:4000/public/images/${post.image}` : dog}
                alt=''
                className='avatar-small circle mx-3'
              />
              <div>
                <h5 className='card-title'>{post.username}</h5>
                <h6 className='card-subtitle mb-2 text-muted '>Card subtitle</h6>
              </div>
            </div>
            {post.userId === user._id ? (
              <i onClick={() => deletePost()} class='fa-solid fa-ban'></i>
            ) : (
              ''
            )}
          </div>
          <img
            src={post?.image ? `http://localhost:4000/public/images/${post.image}` : null}
            className='post__image'
            alt=''
          />
          <div className='interactive d-flex justify-content-between mt-3'>
            <div className='interactive__right'>
              <i className='fa-regular fa-heart mx-3 ' aria-hidden='true'></i>
              <i className='fa-regular fa-comment  mx-3' aria-hidden='true'></i>
              <i className='fa-solid fa-share  mx-3' aria-hidden='true'></i>
            </div>
            <div className='interactive__left'>
              <i className='fa fa-save' aria-hidden='true'></i>
            </div>
          </div>
          <p className='card-text mt-3'>{post.description}</p>
          <p onClick={() => showView()}>View all comment</p>
          {myComment.map((cm, index) => {
            return <CommentItem key={index} comment={cm} />;
          })}
          <hr />

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
    </div>
  );
}

PostItem.propTypes = {
  post: PropTypes.object,
};

export default PostItem;
