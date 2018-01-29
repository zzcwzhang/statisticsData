import React from 'react';

const menuBox = {
    height:'35vw',
    width:'5vw',
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: '#065FB9',
    color:'#70E1FF'
};

const cbtn = {
    background: '#fff',
    color:'#4499ee',
    width:'4vw',
    fontSize: '2vh',
    border: 0,
};
const btn = {
    background: '#4499ee',
    color:'#fff',
    width:'4vw',
    fontSize: '2vh',
    border: 0,
};

class EchartMenu extends React.Component {
    static async getInitialProps({req}) {
        const data = {};
        return {
            data
        }
    }

    render() {
        const { menu, choose, choosed } = this.props;
        return (
            <div>
                <div style={menuBox}>
                    <strong>Y 轴</strong>
                    { menu.map( (item, index) => {
                        const menubtn = <button style={index == choosed ? cbtn : btn } key={index} onClick={ ()=>choose({value:index,type:item.valueType})} >{item.showName}</button>;
                        return item.inMenu? menubtn : '';
                    })}
                </div>
            </div>
        )
    }
}

export default EchartMenu;