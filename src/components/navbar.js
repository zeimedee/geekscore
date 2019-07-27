import React from 'react';
import 'App.css';

import AddPost from 'components/addpost';
import Posts from 'components/posts';
import Edit from 'components/editpost';
import Home from 'components/home'


import {BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';





function Navi() {
return(
    <Router>
    <div style={{paddingLeft:'10px'}}>
        <ul>
            <li className='text-lg'><Link to={'/home'}>HOME</Link></li>
            <li className='text-lg'><Link to={'/posts'}>Notes</Link></li>
            <li className='text-lg text-purple-500'><Link to={'/addpost'}>Add New Note</Link></li>
        </ul>



        <Switch>
        
        <Route  path='/home' component={Home}/>
        <Route  path='/posts' component={Posts}/>
        <Route  path='/addpost' component={AddPost}/>
        <Route path='/editpost' component={Edit}/>
    
        </Switch>


    </div>
    </Router>
);
}
export default Navi;