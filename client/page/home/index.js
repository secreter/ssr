
import style from './index.less';

import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Rate,Switch} from 'antd';

import HomeChild from './components/homeChild';

class Home extends React.Component {
    render() {
        let b = _.isEqual('1','2');

        return (
            <div className={style['home']}>
                my color is red
                <Rate/>
                <Switch/>
                <HomeChild/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        home: state.home
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps,mapDispatchToProps)(Home);