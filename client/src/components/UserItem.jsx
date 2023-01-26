import React from 'react';
import dog from '../assets/dog.jpg';
import PropTypes from 'prop-types';

import './UserItem.scss';
import userApi from '../api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { userDetails } from '../selector/selector';
import { IFollowPerson, unFollow } from '../redux/users/userActions';
function UserItem({ account, useritem }) {
  const { token, user } = useSelector(userDetails);

  const dispatch = useDispatch();
  const handleFollow = async () => {
    await userApi.follow({
      id: useritem._id,
      token,
      userId: user._id,
    });
    dispatch(unFollow(useritem._id));
  };
  return (
    <div className='d-flex justify-content-between align-items-center'>
      <div className='d-flex align-items-center'>
        <img src={dog} alt='' className={`circle ${account ? 'avatar-large' : 'avatar-small'} `} />
        <div className='mx-3'>
          <h5>{useritem.username}</h5>
          <p>cho co</p>
        </div>
      </div>
      <span onClick={() => handleFollow()} className='action'>
        {account ? 'You' : 'UnFollow'}
      </span>
    </div>
  );
}

UserItem.propTypes = {
  account: PropTypes.bool.isRequired,
  useritem: PropTypes.object.isRequired,
};

export default UserItem;
