import React from 'react';

class Tip extends React.Component {
    static async getInitialProps({req}) {
        const data = {};
        return {
            data
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            bottom: -100
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                bottom: 0
            })
            setTimeout(() => {
                this.setState({
                    bottom: -100
                })
            },3000)
        },1000)
    }

    render() {
        const st = {
            position: 'fixed',
            transition: 'all .8s',
            color: "#fff",
            left: '50%',
            height: 40,
            bottom: this.state.bottom,
            background: '#2EC8E9',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px 30px 10px 30px'
        };
        return (
            <div style={st}>
                {this.props.children}
            </div>
        )
    }
}

export default Tip;