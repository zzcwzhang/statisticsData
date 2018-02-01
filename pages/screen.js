import React from 'react';
import fetch from 'isomorphic-unfetch'
import swal from 'sweetalert2'
import MyLayout from '../components/MyLayout.js'
import Card from '../components/Card'
import Tip from '../components/Tip'

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
        };
        this.handleAddTheme = this.handleAddTheme.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddKey = this.handleAddKey.bind(this);
        this.handleAddFilter = this.handleAddFilter.bind(this);
        this.handleDeleteKeyword = this.handleDeleteKeyword.bind(this);
        this.handleDeleteFilterword = this.handleDeleteFilterword.bind(this);
    }

    getAllTheme() {
        fetch('http://47.92.26.118:3001/theme/all.do',{cache: 'no-store'}).then( res => {
            return res.json();
        } ).then( json => {
            this.setState({
                data: json
            })
        })
    }

    handleDelete(name) {
        swal({
            title: `确定删除 ${name} 主题?`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: "确定",
            cancelButtonText: "取消"
        }).then( result => {
            if (result.value) {
                if (name) {
                    const delurl = 'http://47.92.26.118:3001/theme/'+name;
                    fetch(delurl,{
                        method: 'DELETE'
                    }).then( res => {
                        res.json().then( json => {
                            // console.log(json);
                        });
                        this.getAllTheme();
                    })
                }
            }
        });
    }

    handleAddKey(theme = '', word = '') {
        if (theme && word) {
            const akurl = `http://47.92.26.118:3001/theme/key/${theme}/${word}`;
            fetch(akurl).then( res => {
                res.json().then( json => {
                    // console.log(json);
                })
                this.getAllTheme();
            })
        }
    }

    handleAddFilter(theme = '', word = '') {
        if (theme && word) {
            const afurl = `http://47.92.26.118:3001/theme/filter/${theme}/${word}`;
            fetch(afurl).then( res => {
                res.json().then( json => {
                    // console.log(json);
                });
                this.getAllTheme();
            })
        }
    }

    handleDeleteKeyword(theme = '', word = '') {
        const that = this;
        if (theme && word) {
            const dwurl = `http://47.92.26.118:3001/keyword/${theme}/${word}`;
            fetch(dwurl,{
                method: 'DELETE'
            }).then( res => {
                res.json().then( json => {
                    // console.log(json);
                    that.getAllTheme();
                })
            })
        }
    }

    handleDeleteFilterword(theme = '', word = '') {
        const that = this;
        if (theme && word) {
            const dwurl = `http://47.92.26.118:3001/filterword/${theme}/${word}`;
            fetch(dwurl,{
                method: 'DELETE'
            }).then( res => {
                res.json().then( json => {
                    // console.log(json);
                    that.getAllTheme();
                })
            })
        }
    }

    componentDidMount() {
        // console.log('did mount');
        this.getAllTheme();
    }

    componentDidUpdate() {
    }

    handleAddTheme(e) {
        const that= this;
        if (e.keyCode == 13) {
            const word = e.target.value;
            e.target.value = '';
            fetch('http://47.92.26.118:3001/theme/add/'+word).then( res => {
                res.json().then( res => {
                    // console.log(res);
                    this.setState({
                        themeInput: ''
                    });
                    that.getAllTheme();
                });
            })
        }
    }

    render() {
        const { data } = this.state;
        // console.log(data);
        const context = {
            width: '90vw',
            height: '40vw',
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignContent: 'space-around',
            alignItems: 'baseline',
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
            width: 150,
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
                    { data ? data.map( (item, index) => (
                        <Card
                            key={item._id}
                            data={item}
                            addKey={this.handleAddKey}
                            addFilter={this.handleAddFilter}
                            removeKeyword={this.handleDeleteKeyword}
                            removeFilterword={this.handleDeleteFilterword}
                            deleteHandler={this.handleDelete}
                        />
                    )) : '' }
                </div>
                <div style={addNewTheme}>
                    <input style={inputTheme} ref="themeInput" type="text" placeholder='添加新主题' onKeyDown={this.handleAddTheme}/>
                </div>
                <Tip><strong>双击 关键词 或 过滤字 即可删除</strong></Tip>
            </MyLayout>
        )
    }
}

export default screen;