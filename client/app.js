import './public/css/common.less';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router,Route,IndexRoute,Redirect} from 'react-router';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './store';
import {Layout} from 'antd';
const {Header,Content} = Layout;

import Menu from './public/components/menu';
import Home from './page/home';
import Table from './page/table';


class Main extends React.Component {
    render(){
        return (
            <div>
                <Layout>
                    <Header>

                        <Menu/>
                    </Header>
                    <Content>{this.props.children}</Content>
                </Layout>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        let {store,history,persistor} = configureStore();

        return (
            <Provider store={store}>
                <PersistGate  loading={null} persistor={persistor}>
                    <Router history={history}>
                        <Route path="/page" component={Main}>
                            <IndexRoute component={Home} />
                            <Route path="table" component={Table}/>
                        </Route>
                        <Redirect from="/**" to="/page" />
                    </Router>
                </PersistGate>
            </Provider>
        );
    }
}

ReactDOM.render(<App/>,document.getElementById('main'));