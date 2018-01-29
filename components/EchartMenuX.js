import React from 'react';

const menuBox = {
    width:'100%',
    height:'10vh',
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: '#065FB9',
    color:'#70E1FF'
};

const cbtn = {
    background: '#fff',
    color:'#4499ee',
    width:'8vh',
    fontSize: '2vh',
    border: 0,
};
const btn = {
    background: '#4499ee',
    color:'#fff',
    width:'8vw',
    fontSize: '2vh',
    border: 0,
};

class EchartMenuX extends React.Component {
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
                    <strong>X 轴</strong>
                    { menu.map( (item, index) => {
                        const menubtn = <button style={index == choosed ? cbtn : btn } key={index} onClick={ ()=>choose({value:index,type:item.valueType})} >{item.showName}</button>;
                        return item.inMenu? menubtn : '';
                    })}
                </div>
            </div>
        )
    }
}

export default EchartMenuX;