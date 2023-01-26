import React from 'react';
import { useDispatch } from 'react-redux';
import logo from '../assets/logo.webp';
import { Logout } from '../redux/users/userActions';
import CustomLink from './CustomLink';

const LinkList = [
  {
    to: '/',
    title: 'Home',
    icon: <i className='fa fa-home' aria-hidden='true'></i>,
  },

  {
    to: '/stranger',
    title: 'Stranger',
    icon: <i className='fa fa-group' aria-hidden='true'></i>,
  },
];
function Sidebar() {
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(Logout());
  };
  return (
    <div className=' p-0 sidebar pt-3'>
      <div className='text-center mb-3'>
        <img src={logo} alt='Logos' width={50} />
      </div>
      <ul className='p-0'>
        {LinkList.map((link, index) => {
          return (
            <CustomLink key={index} icon={link.icon} to={link.to}>
              {link.title}
            </CustomLink>
          );
        })}
        <li className='linkItem px-5 pointer' onClick={() => logOut()}>
          Logout
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
