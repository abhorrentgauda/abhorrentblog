import './App.scss';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '../Layout';
import ArticleList from '../ArticleList';
import Article from '../Article';
import RegistrationForm from '../RegistrationForm';
import LoginForm from '../LoginForm';
import EditProfile from '../EditProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticleList />} />
          <Route path="articles/:slug" element={<Article />} />
          <Route path="register" element={<RegistrationForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
