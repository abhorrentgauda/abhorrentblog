import './App.scss';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '../Layout';
import ArticleList from '../ArticleList';
import Article from '../Article';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticleList />} />
          <Route path="articles/:slug" element={<Article />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
