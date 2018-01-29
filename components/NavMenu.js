import React from 'react';
import styled from 'styled-components';

class NavMenu extends React.Component {
    static async getInitialProps({req}) {
        const data = {};
        return {
            data
        }
    }

    render() {
        const box = {
            height: '50px',
            width:'100%',
            display:'flex',
            flexDirection: 'cloumn',
            justifyContent: 'space-around',
            alignItems: 'center',
            background: 'red'
        };
        const item = {
            color: '#FFF',
            fontSize: '30px',
        };
        return (
            <div style={box}>
                <div style={item}>首页</div>
                <div style={item}>贴吧数据</div>
            </div>
        )
    }
}

export default NavMenu;