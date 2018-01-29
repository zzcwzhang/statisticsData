import MyLayout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import React from 'react';
import Show from '../components/Show';
import EchartMenu from '../components/EchartMenu';

class Index extends React.Component {
    static async getInitialProps({req}) {
        const a = await fetch('http://47.92.26.118:3000/all.do');
        const aj = await a.json();
        return {
            data:aj
        }
    }
    //回复率
    //点击量
    //回复量
    //时间
    //赏金
    //赏金人数
    //楼主发言次数

    //帖子类型
    // 财经 股票
    // 问答 普通 关闭

    render() {
        const { data } = this.props;
        const menu = [
            {
                field:'href',
                showName: '链接',
                value: data=>data,
                show: false
            },
            {
                field:'name',
                showName: '标题',
                value: data=>data,
                show: true
            },
            {
                field:'readCount',
                showName: '阅读量',
                value: data=>data,
                show: true
            },
            {
                field:'ansCount',
                showName: '回复量',
                value: data=>data,
                show:true
            },
            {
                field:'',
                showName: '回复率',
                value: data=>{
                    const ans = data['ansCount'];
                    const read = data['readCount'];
                    const rate = parseFloat(ans) / parseFloat(read) * 100 ;
                    return String(rate.toFixed(2))+'%';
                },
                show:true
            },
        ];
        return (
            <MyLayout>
                <div>
                    <EchartMenu menu={menu} />
                    <Show data={data} menu={menu} />
                </div>
            </MyLayout>
        )
    }
}

export default Index