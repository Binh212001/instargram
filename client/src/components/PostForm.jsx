import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './PostForm.scss';

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { userDetails } from '../selector/selector';
import postApi from '../api/postApi';
import apiInstance from '../api/apiInstance';
import { getListPostStart } from '../redux/posts/postAction';

function PostForm({ closeForm }) {
  const [file, setFile] = useState();
  const { register, handleSubmit } = useForm();

  const { token, user } = useSelector(userDetails);

  const dispatch = useDispatch();

  const handleChangFile = (e) => {
    setFile(e.target.files[0]);
  };

  const newPost = async (data) => {
    const fileName = Date.now() + file.name;
    const formData = new FormData();
    formData.append('fileName', fileName);
    formData.append('post', file);

    await postApi.addNewPost(
      {
        ...data,
        image: fileName,
        userId: user._id,
      },
      token,
    );
    await apiInstance.post('/upload/image', formData, {
      headers: {
        ContentType: 'application/json',
      },
    });
    dispatch(getListPostStart(token));
    closeForm();
  };

  return (
    <div className='post__form'>
      <h3 className='text-center'> New Post</h3>
      <form onSubmit={handleSubmit(newPost)}>
        <textarea
          {...register('description', { required: true })}
          className='form-control my-3'
          type='text'
          id=''></textarea>
        <input
          type='file'
          onChange={(e) => {
            handleChangFile(e);
          }}
          className='form-control'
        />
        <div className='post__image'>
          <img src={file ? file : null} alt='' />
        </div>

        <button type='submit' className='btn btn-primary'>
          Post
        </button>
      </form>
      <div className='cancel'>
        <i onClick={() => closeForm()} className='fa-solid fa-xmark'></i>
      </div>
    </div>
  );
}

PostForm.propTypes = {
  closeForm: PropTypes.func.isRequired,
};

export default PostForm;
