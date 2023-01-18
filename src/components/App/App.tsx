import './App.scss';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '../Layout';
import ArticleList from '../ArticleList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticleList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
