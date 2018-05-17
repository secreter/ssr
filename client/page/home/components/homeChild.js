
import style from './homeChild.less';

import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

class HomeChild extends React.Component{
    constructor(props){
        super(props);

        this.onclick = this.onclick.bind(this);
    }

    render(){
        return (
            <div className={style["home-child"]}>
                Child
                <button onClick={this.onclick}>redirect table</button>
            </div>
        );
    }

    onclick(){
        this.props.dispatch(push({
            pathname: '/page/table'
        }));
    }
}

const mapStateToProps = (state) => {
    return {
        home: state.home
    };
};

const mapDispatchToProps = (dispatch) => {
    return {dispatch};
};

export default connect(mapStateToProps,mapDispatchToProps)(HomeChild);