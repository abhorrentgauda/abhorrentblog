import { Route, Routes } from 'react-router-dom';

import Layout from '../Layout';
import ArticleList from '../ArticleList';
import Article from '../Article';
import RegistrationForm from '../RegistrationForm';
import LoginForm from '../LoginForm';
import EditProfile from '../EditProfile';

import './App.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ArticleList />} />
        <Route path="articles/:slug" element={<Article />} />
        <Route path="sign-up" element={<RegistrationForm />} />
        <Route path="sign-in" element={<LoginForm />} />
        <Route path="profile" element={<EditProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
