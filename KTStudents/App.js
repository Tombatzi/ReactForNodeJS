import React from 'react';
import { NavLink, Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './components/home/Home';
import SearchForm from './components/searchForm/SearchForm';
import AddStudentForm from './components/addStudent/AddStudentForm'

const App = () => {
    return(
        <div>
            <div>
            <Router>
                <div className="nav">
                    <NavLink to="/"> Home </NavLink>
                    <NavLink to="/getStudents"> Search Students </NavLink>
                    <NavLink to="/addStudent"> Add Students </NavLink>
                </div>
                <div className="main">
                <Switch>
                    <Route exact path = "/"><Home/></Route>
                    <Route exact path = "/getStudents"><SearchForm/></Route>
                    <Route exact path = "/addStudent"><AddStudentForm/></Route>
                </Switch>
                </div>
            </Router>
        </div>
        </div>
    )
}
export default App;