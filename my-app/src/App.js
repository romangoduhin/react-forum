import React from 'react';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import GlobalFeed from './pages/GlobalFeed';
import Article from './pages/Article';
import Authentication from './pages/Authentication';
import TopBar from './components/TopBar';
import { CurrentUserProvider } from './contexts/currentUser';

function App() {
  return (
    <CurrentUserProvider>
      <BrowserRouter>
        <TopBar />

        <Route exact path="/" component={GlobalFeed} />
        <Route path="/article/:articlePath" component={Article} />
        <Route path="/login" component={Authentication} />
        <Route path="/signup" component={Authentication} />

      </BrowserRouter>
    </CurrentUserProvider>
  );
}

export default App;
