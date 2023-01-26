import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CommentPost from './components/CommentPost';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import GlobalStyles from './GlobalStyle/GlobalStyles';
import routes from './routes/route';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles>
        <Routes>
          {routes.map((r, index) => {
            let CurrentLayout = 'div';
            if (r.private) {
              CurrentLayout = Layout;
            } else {
              return <Route key={index} path={r.path} element={r.element} />;
            }
            return (
              <Route path='/' key={index} element={<PrivateRoute />}>
                <Route path={r.path} element={<CurrentLayout>{r.element}</CurrentLayout>} />
              </Route>
            );
          })}
        </Routes>
      </GlobalStyles>
    </BrowserRouter>
  );
}

export default App;
