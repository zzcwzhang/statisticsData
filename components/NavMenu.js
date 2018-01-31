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
        const c1 = '#4499EE';
        const c2 = '#04477C';
        const linkStyle= {
            height: '40px',
            color: '#049FF1',
            fontSize: '24px',
            width: '90%',
            border:0,
            outline:'none',
            textAlign:'center',
            textDecoration: 'none',
            textShadow: '0 1px 1px rgba(0,0,0,.3)',
            borderRadius: 10,
            boxShadow: '2px 1px 2px rgba(0,0,0,.2)',
        };
        const iconStyle = {
            color: '#049FF1',
            fontFamily:"iconfont" ,
            fontSize:24,
            fontStyle:"normal",
            WebkitTextStrokeWidth: 0.2,
            WebkitFontSommthing:'antialiased',
            MozOsxFontSmoothing:'grayscale',
            marginRight: '10px'
        };
        return (
            <div style={box}>
                <Link href="/index">
                    <a style={linkStyle}><i style={iconStyle}>&#xeaae;</i>散点图</a>
                </Link>
                <Link href="/screen">
                    <a style={linkStyle}><i style={iconStyle}>&#xe69c;</i>筛选器</a>
                </Link>
            </div>
        )
    }
}

export default NavMenu;