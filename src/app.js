import { observer } from 'mobx-react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Exercise from './components/exercise';
import Footer from './footer';
import Header from './header';
import Home from './components/home';
import LessonBuilder from './components/lessonBuilder';
import Questions from './components/questions';
import Support from './components/support'
import Stats from './components/stats';
import About from './components/about';
import Results from './components/results';
import React from 'react';

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
                  <Route path="/support" component={Support}/>
                  <Route path="/about" component={About}/>
                  <Route path="/stats" component={Stats}/>
                  <Route path="/lesson-builder" component={LessonBuilder} />
                  <Route path="/exercise" component={Exercise}/>
                  <Route path="/questions" component={Questions}/>
                  <Route path="/results" component={Results}/>
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
