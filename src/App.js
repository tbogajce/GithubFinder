import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import axios from 'axios';
import './App.css';

const github = axios.create({
    baseURL: 'https://api.github.com',
    timeout: 1000,
    headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN },
});

class App extends Component {
    state = {
        users: [],
        loading: false,
        alert: null,
    };

    // lifecycle method useful when we want to for example make HTTP request (in our case to github)
    // async componentDidMount() {
    //   this.setState({ loading: true });
    //   const res = await github.get('/users'); // https://developer.github.com/v3/users/#get-all-users
    //   this.setState({ users: res.data, loading: false });
    // }

    // Search Github users - https://developer.github.com/v3/search/#search-users
    searchUsers = async (text) => {
        this.setState({ loading: true, alert: null });
        const res = await github.get(`/search/users?q=${text}`);
        this.setState({ users: res.data.items, loading: false });
    };

    // Clear users from state
    clearUsers = () => {
        this.setState({ users: [], loading: false });
    };

    // Set Alert
    setAlert = (msg, type) => {
        this.setState({ alert: { msg, type } });

        // setTimeout(() => this.setState({ alert: null }), 5000);
    };

    render() {
        const { users, loading } = this.state;

        return (
            <div className='App'>
                <Navbar title='Github Finder' icon='fab fa-github' />
                <div className='container'>
                    <Alert alert={this.state.alert} />
                    <Search
                        searchUsers={this.searchUsers}
                        clearUsers={this.clearUsers}
                        showClear={users.length > 0 ? true : false}
                        setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                </div>
            </div>
        );
    }
}

export default App;
