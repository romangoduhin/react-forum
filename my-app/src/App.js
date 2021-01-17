import React from 'react';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import GlobalFeed from './pages/GlobalFeed';
import Article from './pages/Article';
import TopBar from './components/TopBar';
import Authentication from './pages/Authentication';

function App() {
  return (
    <BrowserRouter>
      <TopBar />

      <Route exact path="/" render={() => <GlobalFeed />} />
      <Route path="/article/:articlePath" render={() => <Article />} />
      <Route path="/login" render={() => <Authentication />} />
      <Route path="/signup" render={() => <Authentication />} />

    </BrowserRouter>
  );
}

export default App;
