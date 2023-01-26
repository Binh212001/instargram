import * as React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

function CustomLink({ children, to, icon, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <li className='linkItem px-5' style={{ backgroundColor: match ? 'gainsboro' : 'white' }}>
      <Link className='d-block ' style={{ fontWeight: match ? 'bold' : '400' }} to={to} {...props}>
        {icon}
        {children}
      </Link>
    </li>
  );
}

export default CustomLink;
