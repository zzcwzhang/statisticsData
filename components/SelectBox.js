import React from 'react';
import Color from '../config/colors';

class SelectBox extends React.Component {
    static async getInitialProps({req}) {
        const data = {};
        return {
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            checked: 0
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(index) {
        const { list,handleCheck } = this.props;
        this.setState({
            checked:index
        });
        handleCheck(list[index]);
    }

    render() {
        const { list,handleCheck } = this.props;
        const container = {
            background: `#${Color.c1}`,
            height: 50,
            width: 220,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        };
        const normal = {
            height:50,
            width: 110,
            background: `#${Color.c3}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 20,
            color: `#${Color.c2}`
        };
        const checked = {
            height:50,
            width: 110,
            background: `#${Color.c2}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 30,
            color: '#fff'
        };
        return (
            <div style={container}>
                { list.map( (item, index) => {
                    return <div key={index} style={this.state.checked === index ?  checked : normal} onClick={()=>this.handleClick(index)}>{item}</div>
                })}
            </div>
        )
    }
}

export default SelectBox;