import React, { Component } from 'react';
import composedStore from './store/store';
import { Provider, connect } from 'react-redux';
import { Router, Link, Redirect, Location } from '@reach/router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Container } from 'reactstrap';

import Loader from './components/loader/loader';
import { Nav } from './components/nav';
import { HerosList, DetailView } from './components/heros';


const store = composedStore();

const FadedTransitionRouter = props => (
  <Location>
    {({ location }) => (
      <TransitionGroup className="transition-group">
        <CSSTransition key={location.key} classNames="fade" timeout={500}>
          <Router location={location} className="router">
            {props.children}
          </Router>
        </CSSTransition>
      </TransitionGroup>
    )}
  </Location>
);

const Page = props => <div className="page">{props.page}</div>;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Nav />
          <Container>
            <Loader />
            <FadedTransitionRouter>
              <HerosList path="/" />
              <DetailView path="/heros/:id" />
            </FadedTransitionRouter>
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
