import React from 'react';
import fetch from 'isomorphic-unfetch'
import MyLayout from '../components/MyLayout.js'
import Card from '../components/Card'

class screen extends React.PureComponent {
    // static async getInitialProps({req}) {
    //     const a = await fetch('http://localhost:3001/theme/all.do');
    //     const aj = await a.json();
    //     return {
    //         data: aj
    //     }
    // }


    constructor(props) {
        super(props);
        this.state = {
            themeInput: '',
            state: {},
        }
        this.handleAddTheme = this.handleAddTheme.bind(this);
    }

    getAllTheme() {
        fetch('http://localhost:3001/theme/all.do',{cache: 'no-store'}).then( res => {
            return res.json();
        } ).then( json => {
            console.log('json', json);
            this.setState({
                data: json
            })
        })
    }

    componentDidMount() {
        console.log('did mount');
        this.getAllTheme();
    }

    componentDidUpdate() {
        // console.log('update');
        // fetch('http://localhost:3001/theme/all.do',{cache: 'no-store'}).then( res => {
        //     return res.json();
        // } ).then( json => {
        //     console.log('json', json);
        //     this.setState({
        //         data: json
        //     })
        // })
    }

    handleAddTheme() {
        const input = this.refs.themeInput;
        const newTheme = input.value;
        console.log(newTheme);
        fetch('http://localhost:3001/theme/add/'+newTheme).then( res => {
            res.json().then( res => {
                console.log(res);
                this.setState({
                    themeInput: ''
                });
                this.getAllTheme();
            });
        })
    }

    render() {
        const { data } = this.state;
        // console.log(data);
        const context = {
            width: '90vw',
            height: '40vw',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        };
        const ibc = '#70E1FF';
        const addNewTheme = {
            background: ibc,
            color: '#FFF',
            position: 'fixed',
            fontSize: 30,
            height: '60px',
            width: '200px',
            bottom: '80px',
            right: '80px',
            borderRadius: '16px',
            border: 0,
            boxShadow: '10px 10px 5px #04477C',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        };
        const inputTheme = {
            background: ibc,
            color: '#FFF',
            fontSize: 30,
            border: 0,
            width: 100,
        };
        const addTheme = {
            background: ibc,
            color: '#FFF',
            fontSize: 30,
            border: 0,
            width: 100,

        };

        return (
            <MyLayout>
                <div style={context}>
                    { data ? data.map( (item, index) => (<Card key={item._id} data={item} />)) : '' }
                </div>
                <div style={addNewTheme}>
                    {this.themeInput}
                    <button style={addTheme} onClick={this.handleAddTheme} >添加</button> <input style={inputTheme} ref="themeInput" type="text" placeholder='新主题'/> </div>
            </MyLayout>
        )
    }
}

export default screen;