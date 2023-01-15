import './App.scss';

import Header from '../Header';
import ArticleContainer from '../ArticleContainer';
import ArticleList from '../ArticleList';
import ArticlePreview from '../ArticlePreview';
import Article from '../Article';

function App() {
  return (
    <>
      <Header />
      <ArticleContainer />
      <ArticleList />
      <Article />
      <ArticlePreview />
    </>
  );
}

export default App;
