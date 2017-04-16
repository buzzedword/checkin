import React from 'react';
import { Route, Switch } from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';

import Layout from '../pages/layout';
import loadHome from 'bundle-loader?lazy!../pages/home';
import loadAdmin from 'bundle-loader?lazy!../pages/admin';
import PageNotFound from '../pages/pagenotfound';

const lazy = loader => {
    class LazyLoader extends React.Component {
        state = {
            // short for "module" but that's a keyword in js, so "mod"
            Component: null,
        };

        componentWillMount() {
            this.load();
        }

        load = props => {
            this.setState({
                Component: null,
            }, () => loader(mod => this.setState({
                Component: mod.default ? mod.default : mod,
            })));
        }

        render() {
            const {Component} = this.state;

            if (Component !== null) {
                return <Component />;
            } else {
                return (
                    <div className="center-center-loader">
                        <CircularProgress className="center-center" />
                    </div>
                );
            }
        }
    }

    return LazyLoader;
}

export default class AppContainer extends React.Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route exact path="/" component={lazy(loadHome)} />
                    <Route path="/admin" component={lazy(loadAdmin)} />
                    <Route component={PageNotFound} />
                </Switch>
            </Layout>
        );
    }
}
