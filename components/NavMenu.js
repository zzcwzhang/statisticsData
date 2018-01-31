import React from 'react';
import Link from 'next/link'

class NavMenu extends React.Component {
    static async getInitialProps({req}) {
        const data = {};
        return {
            data
        }
    }

    render() {
        const box = {
            height: '45vw',
            width:'9vw',
            display:'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            background: '#04477C'
        };
        const item = {
            color: '#049FF1',
            fontSize: '30px',
        };
        const linkStyle= {
            height: '30px',
            color: '#049FF1',
            fontSize: '24px'
        }
        return (
            <div style={box}>
                <Link href="/index">
                    <a style={linkStyle}>散点图</a>
                </Link>
                <Link href="/screen">
                    <a style={linkStyle}>筛选器</a>
                </Link>
            </div>
        )
    }
}

export default NavMenu;