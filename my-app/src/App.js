import React from 'react';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import GlobalFeed from './pages/GlobalFeed';
import Article from './pages/Article';
import Authentication from './pages/Authentication';
import TopBar from './components/TopBar';
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import CurrentUserChecker from './components/CurrentUserChecker';
import TagsFeed from './pages/TagsFeed';
import YourFeed from './pages/YourFeed';
import CreateArticle from './pages/CreateArticle';
import EditArticle from './pages/EditArticle';

function App() {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <BrowserRouter>
          <TopBar />

          <Route exact path="/" component={GlobalFeed} />
          <Route path="/feed" component={YourFeed} />
          <Route path="/tags/:tag" component={TagsFeed} />
          <Route path="/articles/new/" component={CreateArticle} />
          <Route exact path="/article/:articlePath/edit" component={EditArticle} />
          <Route exact path="/article/:articlePath" component={Article} />
          <Route path="/login" component={Authentication} />
          <Route path="/signup" component={Authentication} />
        </BrowserRouter>
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
}

export default App;
