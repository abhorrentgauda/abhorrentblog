import { Route, Routes } from 'react-router-dom';

import Layout from '../Layout';
import ArticleList from '../ArticleList';
import Article from '../Article';
import RegistrationForm from '../RegistrationForm';
import LoginForm from '../LoginForm';
import EditProfile from '../EditProfile';
import CreateArticle from '../CreateArticle';
import EditArticle from '../EditArticle';
import RequireAuth from '../../hoc/RequireAuth';
import AlreadyAuth from '../../hoc/AlreadyAuth';
import {
  articlesPath,
  signUpPath,
  defaultPath,
  signInPath,
  newArticlePath,
  profilePath,
} from '../../paths';

import './App.scss';

function App() {
  return (
    <Routes>
      <Route path={defaultPath} element={<Layout />}>
        <Route path={defaultPath} element={<ArticleList />} />
        <Route path={articlesPath} element={<ArticleList />} />
        <Route path={`${articlesPath}/:slug`} element={<Article />} />
        <Route
          path={signUpPath}
          element={
            <AlreadyAuth>
              <RegistrationForm />
            </AlreadyAuth>
          }
        />
        <Route
          path={signInPath}
          element={
            <AlreadyAuth>
              <LoginForm />
            </AlreadyAuth>
          }
        />
        <Route
          path={profilePath}
          element={
            <RequireAuth>
              <EditProfile />
            </RequireAuth>
          }
        />
        <Route
          path={newArticlePath}
          element={
            <RequireAuth>
              <CreateArticle />
            </RequireAuth>
          }
        />
        <Route
          path={`${articlesPath}/:slug/edit`}
          element={
            <RequireAuth>
              <EditArticle />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
