import React from 'react';
import './App.css';
import { HashRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Store.js'

// Pages
import HomePage from './pages/Home/'

//Components
import SidePane from './components/sidepane/SidePane.js'
import CustomerBanner from './components/CustomerBanner/CustomerBanner.js'

let env = store.getState().env;

if (env === 'dev') {
  console.log(store.getState())
  store.subscribe(() =>
    console.log(store.getState())
  )
}

function App() {
  return (
    <Provider store={store}>
        <Router>
          <div id="app">
            <Route exact path="/" component={SidePane}/>
            <Route path="/lookup/:tag" component={SidePane}/>

            <section id="content">
              <Route exact path="/" component={CustomerBanner}/>
              <Route path="/lookup/:tag" component={CustomerBanner}/>
              <Route path="/lookup/:tag" component={HomePage}/>
            </section>
          </div>
        </Router>
    </Provider>

  );
}

export default App;
