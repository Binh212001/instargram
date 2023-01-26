import Auth from '../pages/Auth';
import Home from '../pages/Home';
import Stranger from '../pages/Stranger';
import RouteConfig from './RouteConfig';

const routes = [
  {
    path: RouteConfig.home,
    element: <Home />,
    private: true,
  },
  {
    path: RouteConfig.auth,
    element: <Auth />,
    private: false,
  },
  {
    path: RouteConfig.stranger,
    element: <Stranger />,
    private: true,
  },
];

export default routes;
