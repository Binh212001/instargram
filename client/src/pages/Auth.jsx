import React from 'react';
import Phone from '../assets/phone.png';
import logo from '../assets/logo.png';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startLogin } from '../redux/users/userActions';
function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  //@@@@Login and Register
  const onSubmit = async (data) => {
    if (!isRegister) {
      await dispatch(startLogin(data));
      navigate('/');
    }
  };

  const openRegister = () => {
    setIsRegister(!isRegister);
  };
  return (
    <div
      className='row '
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
      }}>
      <div className=' p-5'>
        <img src={Phone} alt='Phone' />
      </div>
      <div className='p-5'>
        <div className=''>
          <form onSubmit={handleSubmit(onSubmit)} className='form outline-primary'>
            <img src={logo} alt='' />
            <br />
            <label htmlFor='username'>Username:</label>
            <input
              type='text'
              {...register('username', { required: true })}
              className='form-control'
            />
            <label htmlFor='Password'>Password:</label>
            <input
              type='password'
              {...register('password', { required: true })}
              className='form-control'
            />
            {isRegister ? (
              <div>
                <label htmlFor='Confirm Password'>Confirm Password:</label>
                <input type='text' className='form-control' />
              </div>
            ) : null}
            {!isRegister ? (
              <>
                <div className='btn-group d-flex  mt-3'>
                  <button type='submit' className='btn btn-primary'>
                    Login
                  </button>
                </div>

                <div className='btn-group d-flex  mt-3'>
                  <button className='btn btn-danger' onClick={() => openRegister()}>
                    Register
                  </button>
                </div>
              </>
            ) : null}

            {isRegister ? (
              <div>
                <div className='btn-group d-flex  mt-3'>
                  <button className='btn btn-primary'>Submit</button>
                </div>
                <div className='btn-group d-flex  mt-3'>
                  <button className='btn btn-warning' onClick={() => openRegister()}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;
