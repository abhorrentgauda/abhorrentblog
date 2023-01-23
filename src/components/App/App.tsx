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

import './App.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<ArticleList />} />
        <Route path="articles" element={<ArticleList />} />
        <Route path="articles/:slug" element={<Article />} />
        <Route
          path="sign-up"
          element={
            <AlreadyAuth>
              <RegistrationForm />
            </AlreadyAuth>
          }
        />
        <Route
          path="sign-in"
          element={
            <AlreadyAuth>
              <LoginForm />
            </AlreadyAuth>
          }
        />
        <Route path="profile" element={<EditProfile />} />
        <Route
          path="new-article"
          element={
            <RequireAuth>
              <CreateArticle />
            </RequireAuth>
          }
        />
        <Route
          path="articles/:slug/edit"
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
