import MyLayout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import React from 'react';
import Show from '../components/Show';

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
        return (
            <MyLayout>
                <div>
                    <Show data={data} />
                </div>
            </MyLayout>
        )
    }
}

export default Index