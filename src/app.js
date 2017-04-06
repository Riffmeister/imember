import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Footer from './footer';
import Header from './header';
import React from 'react';
import Exercise from './components/exercise';
import Home from './components/home';
import { observer } from 'mobx-react';
require('./app.less')

@observer
class App extends React.Component {

  render() {
    return (
      <section id='app'>
          <section className='body'>
            <Router>
            <div className='route-wrapper'>
            <Header />
              <div className='body-content'>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/exercise" component={Exercise}/>
                <Route render={() => <h1>Page Not Found</h1>}/>
              </Switch>
              </div>
            </div>
            </Router>
          </section>
      </section>
    );
  }
}
export default App;
