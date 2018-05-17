import style from './menu.less';

import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Menu as MenuAntd} from 'antd';

class Menu extends React.Component{
    render(){
        return (
            <div>
                <div className={style["menu-log"]}></div>
                <MenuAntd
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
                    <MenuAntd.Item><Link to="/page/home">home</Link></MenuAntd.Item>
                    <MenuAntd.Item><Link to="/page/table">table</Link></MenuAntd.Item>
                </MenuAntd>
            </div>
        );
    }
}

export default connect()(Menu);