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
            background: '#04477C'
        };
        const item = {
            color: '#049FF1',
            fontSize: '30px',
        };
        return (
            <div style={box}>
                <div style={item}>叭叭数据</div>
            </div>
        )
    }
}

export default NavMenu;