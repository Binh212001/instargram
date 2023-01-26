import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getStranger, unFollow } from '../redux/users/userActions';
import { useState } from 'react';
import StrangerItem from '../components/StrangerItem';
import userApi from '../api/userApi';

function Stranger() {
  const { user, stranger } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStranger(user._id));
  }, [user, dispatch]);

  const handleFollow = async (id, userId, token) => {
    await userApi.follow({
      id: id,
      token,
      userId: userId,
    });
    dispatch(unFollow(userId));
  };

  return (
    <div className='container my-5   '>
      {stranger.map((data, index) => {
        if (data._id !== user._id)
          return <StrangerItem stranger={data} key={index} followAct={handleFollow} />;
      })}
    </div>
  );
}

export default Stranger;
