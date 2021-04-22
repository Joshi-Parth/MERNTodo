import React, { Component } from 'react'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import  Todolist  from "./components/Todolist";
import EditTodo from './components/EditTodo';
import CreateTodo from './components/CreateTodo';

class App extends Component {
  render(){
    return (
      <Router>
        <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">ProductivityX</Link>
            <div className="navbar-collapse">
              <ul className="navbar-nav">
                <li className="navbar-item m-1">
                  <Link to="/edit/:id" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item m-1">
                  <Link to="/create" className="nav-link">Create Todo</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={Todolist} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
        </div>
      </Router>
      
    );
  }
  
}

export default App;
