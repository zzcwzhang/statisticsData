import MyLayout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import React from 'react';
import Show from '../components/Show';
import EchartMenu from '../components/EchartMenu';

const layout = {
    display:'flex',
    flexDirection: 'cloumn',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: '#CBF3FB'
};

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            choose_x : 2,
            choose_y : {
                value: 3,
                type: 'value'
            }
        }
        this.handleChangeY = this.handleChangeY.bind(this);
    }
    static async getInitialProps({req}) {
        const a = await fetch('http://47.92.26.118:3000/all.do');
        const aj = await a.json();
        return {
            data:aj
        }
    }

    handleChangeY(y) {
        this.setState({
            choose_y: y
        });
    }


    render() {
        const { data } = this.props;
        const menu = [
            {
                field:'href',
                showName: '链接',
                value: data=>data,
                valueType:'value',
                show: false,
                inMenu: false
            },
            {
                field:'name',
                showName: '标题',
                value: data=>data,
                valueType:'value',
                show: true,
                inMenu: false
            },
            {
                field:'readCount',
                showName: '阅读量',
                value: data=>data,
                valueType:'value',
                show: true,
                inMenu: true
            },
            {
                field:'ansCount',
                showName: '回复量',
                value: data=>data,
                valueType:'value',
                show:true,
                inMenu: true
            },
            {
                field:'',
                showName: '回复率',
                valueType:'value',
                value: data=>{
                    const ans = data['ansCount'];
                    const read = data['readCount'];
                    const rate = parseFloat(ans) / parseFloat(read) * 100 ;
                    return rate.toFixed(2)
                },
                show:true,
                inMenu: true
            },
            {
                field:'saidTimes',
                showName: '楼主发言次数',
                value: data => data,
                valueType:'value',
                show:true,
                inMenu: true
            },
            {
                field:'createTime',
                showName: '创建时间',
                value: data => data,
                valueType:'time',
                show: true,
                inMenu: true
            },
        ];
        return (
            <MyLayout>
                <div style={layout}>
                    <EchartMenu menu={menu} choose={this.handleChangeY} choosed={this.state.choose_y.value} />
                    <Show data={data} menu={menu} chooseY={this.state.choose_y} />
                </div>
            </MyLayout>
        )
    }
}

export default Index