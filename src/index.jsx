import ReactDOM from 'react-dom';
import React from 'react';
import {
    BrowserRouter as Router, NavLink, Route, Switch,
} from 'react-router-dom';

import CSS from './index.module.css';

import CustomButton from './InfiniteLoad/Examples/CustomButton';

const exampleComponents = [
    {
        path: '/InfiniteLoad/CustomButton',
        component: CustomButton,
    },
];

const Index = () => {
    const links = [];
    const routes = [];

    exampleComponents.forEach((component) => {
        routes.push(<Route exact path={component.path} component={component.component} />);
        links.push((
            <NavLink className={CSS.LinkStyle} to={component.path} exact>{component.path}</NavLink>
        ));
    });

    return (
        <Router>
            <ul style={{ display: 'flex' }}>{links}</ul>
            <Switch>{routes}</Switch>
        </Router>

    );
};

ReactDOM.render(<Index />, document.getElementById('root'));
