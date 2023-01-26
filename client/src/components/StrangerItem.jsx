import React, { useState } from 'react';
import PropTypes from 'prop-types';
import dog from '../assets/dog.jpg';
import { useSelector } from 'react-redux';

function StrangerItem({ stranger, followAct }) {
  const [follow, setFollow] = useState(true);

  const { user, token } = useSelector((state) => state.user);
  const handleFollow = () => {
    followAct(stranger._id, user._id, token);
    setFollow(!follow);
  };
  return (
    <div className='d-flex justify-content-around my-1 border align-items-center'>
      <img src={dog} alt='' className='circle avatar-small' />
      <h5>{stranger.username}</h5>
      <button
        onClick={() => {
          handleFollow();
        }}
        className='btn btn-danger'>
        {follow ? 'Follow' : 'Un Follow'}
      </button>
    </div>
  );
}

StrangerItem.propTypes = {};

export default StrangerItem;
