import React from 'react';

const menuBox = {
    width:'89.6vw',
    height:'4.6vw',
    border: '0.2vw solid #1291A9',
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: '#72CFD7',
    color:'#70E1FF'
};

class ThemeMenu extends React.Component {
    static async getInitialProps({req}) {
        const data = {};
        return {
            data
        }
    }

    render() {
        return (
            <div style={menuBox}>
                context
            </div>
        )
    }
}

export default ThemeMenu;