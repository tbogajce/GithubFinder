import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';

import GithubState from './context/github/GithubState';

import './App.css';

const App = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const github = axios.create({
        baseURL: 'https://api.github.com',
        timeout: 1000,
        headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN },
    });

    // lifecycle method useful when we want to for example make HTTP request (in our case to github)
    // async componentDidMount() {
    //   this.setState({ loading: true });
    //   const res = await github.get('/users'); // https://developer.github.com/v3/users/#get-all-users
    //   this.setState({ users: res.data, loading: false });
    // }

    // Search Github users - https://developer.github.com/v3/search/#search-users
    const searchUsers = async (text) => {
        setLoading(true);
        setAlert(null);

        const res = await github.get(`/search/users?q=${text}`);

        setUsers(res.data.items);
        setLoading(false);
    };

    // Get single Github user - https://developer.github.com/v3/users/#get-a-single-user
    const getUser = async (username) => {
        setLoading(true);

        const res = await github.get(`/users/${username}`);

        setUser(res.data);
        setLoading(false);
    };

    // Get users repos - https://developer.github.com/v3/repos/#list-repositories-for-a-user
    const getUserRepos = async (username) => {
        setLoading(true);

        const res = await github.get(`/users/${username}/repos?per_page=5&sort=created:asc`);

        setRepos(res.data);
        setLoading(false);
    };

    // Clear users from state
    const clearUsers = () => {
        setUsers([]);
        setLoading(false);
    };

    // Set Alert
    const showAlert = (msg, type) => {
        setAlert({ msg, type });
        // instead of changing state in different methods we can set timeout
        // setTimeout(() => this.setState({ alert: null }), 5000);
    };

    return (
        <GithubState>
            <Router>
                <div className='App'>
                    <Navbar title='Github Finder' icon='fab fa-github' />
                    <div className='container'>
                        <Switch>
                            <Route
                                exact
                                path='/'
                                render={(props) => (
                                    <Fragment>
                                        <Alert alert={alert} />
                                        <Search
                                            searchUsers={searchUsers}
                                            clearUsers={clearUsers}
                                            showClear={users.length > 0 ? true : false}
                                            setAlert={showAlert}
                                        />
                                        <Users loading={loading} users={users} />
                                    </Fragment>
                                )}
                            />
                            <Route exact path='/about' component={About} />
                            <Route
                                exact
                                path='/user/:login'
                                render={(props) => (
                                    <User
                                        {...props}
                                        getUser={getUser}
                                        getUserRepos={getUserRepos}
                                        user={user}
                                        repos={repos}
                                        loading={loading}
                                    />
                                )}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        </GithubState>
    );
};

export default App;
