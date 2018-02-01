import React from 'react';
import LButton from './LikeButton';

const menuBox = {
    width:'89.6vw',
    height:'4.6vw',
    border: '0.2vw solid #049ff1',
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: '#065FB9',
    color:'#049FF1'
};


class ThemeMenu extends React.Component {
    static async getInitialProps({req}) {
        const data = {};
        return {
            data
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            data:{}
        }
    }
    getAllTheme() {
        fetch('http://localhost:3001/theme/all.do',{cache: 'no-store'}).then( res => {
            return res.json();
        } ).then( json => {
            this.setState({
                data: json
            })
        })
    }
    componentDidMount() {
        this.getAllTheme();
    }

    render() {
        const { data } = this.state;
        const { chooseTheme } = this.props;
        const Main = data.length > 0 ? data.map( item => {
                    return (
                        <LButton onClick={()=> chooseTheme(item.name)} key={item._id}>{item.name}</LButton>
                    );
                }) : <h2>Loading</h2>;
        return (
            <div style={menuBox}>
                <LButton onClick={()=> chooseTheme('全部')}>全部</LButton>
                {Main}
            </div>
        )
    }
}

export default ThemeMenu;