import React from 'react'
import { Link, NavLink, Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import SearchCustomers from './components/RestApp'
import Home from './components/home/Home'
import AddCustomer from './components/addCustomer/AddCustomer';

const App = () => {

    return (
        <div>
            <Router>
                <div className="nav">
                    <NavLink to="/"> Home </NavLink>
                    <NavLink to="/getCustomer"> Search Customers </NavLink>
                    <NavLink to="addCustomer"> Add Customer </NavLink>
                </div>
                <div className="main">
                <Switch>
                    <Route exact path = "/"><Home/></Route>
                    <Route exact path = "/getCustomer"><SearchCustomers/></Route>
                    <Route exact path = "/addCustomer"><AddCustomer/></Route>
                    
                </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App;