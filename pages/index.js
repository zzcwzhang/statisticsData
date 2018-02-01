import MyLayout from '../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'
import React from 'react';
import Show from '../components/Show';
import EchartMenu from '../components/EchartMenu';
import EchartMenuX from '../components/EchartMenuX';
import ThemeMenu from '../components/ThemeMenu';
import ALoading from '../components/Loading';
import { Map, fromJS } from 'immutable';


class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            choose_x : {
                value: 2,
                type: 'value'
            },
            choose_y : {
                value: 3,
                type: 'value'
            },
            data: Map({}),
            theme: '股票'
        };
        this.handleChangeY = this.handleChangeY.bind(this);
        this.handleChangeX = this.handleChangeX.bind(this);
        this.handleChooseTheme = this.handleChooseTheme.bind(this);
        this.getDatas = this.getDatas.bind(this);
    }
    // static async getInitialProps({req}) {
        // const a = await fetch('http://47.92.26.118:3001/all.do');
        // const aj = await a.json();
        // return {
        //     data:aj
        // }
    // }

    getDatas(ptheme) {
        const themeName = ptheme || "全部";
        const that = this;
        const oldData = that.state.data;
        let Url;
        if (themeName !== '全部') {
            Url = 'http://47.92.26.118:3001/theme/scan/'+themeName;
        }else {
            Url = 'http://47.92.26.118:3001/all.do'
        }
        // 判断是否已经抓取
        const tagTheme = oldData.getIn([themeName,'show']);
        if (tagTheme) {
            const ndata = oldData.setIn([themeName,'show'], false);
            this.setState({
                data: ndata
            })
        } else {
            // 请求数据
            fetch(Url).then(
                res => {
                    res.json().then( json => {
                        const newData = oldData.set(themeName,fromJS({'data': json,'show':true}));
                        this.setState({
                            data: newData
                        })
                    })
                }
            )
        }
    }

    componentDidMount() {
        this.getDatas();
    }

    handleChooseTheme(theme) {
        this.getDatas(theme);
    }

    handleChangeY(y) {
        this.setState({
            choose_y: y
        });
    }
    handleChangeX(x) {
        this.setState({
            choose_x: x
        });
    }

    render() {
        const { data } = this.state;
        const menu = [
            {
                field:'href',
                showName: '链接',
                // value: data=>data,
                valueType:'value',
                show: 'none',
                inMenu: false
            },
            {
                field:'name',
                showName: '标题',
                // value: data=>data,
                valueType:'value',
                show: 'normal',
                inMenu: false
            },
            {
                field:'readCount',
                showName: '阅读量',
                // value: data=>data,
                valueType:'value',
                show: 'count',
                inMenu: true
            },
            {
                field:'ansCount',
                showName: '回复量',
                // value: data=>data,
                valueType:'value',
                show: 'count',
                inMenu: true
            },
            {
                field:'',
                showName: '回复率',
                valueType:'value',
                value: data=>{
                    // const ans = data['ansCount'];
                    const ans = data.get('ansCount');
                    // const read = data['readCount'];
                    const read = data.get('readCount');
                    const rate = parseFloat(ans) / parseFloat(read) * 100 ;
                    return rate.toFixed(2)
                },
                show: 'rate',
                inMenu: true
            },
            {
                field:'saidTimes',
                showName: '楼主发言次数',
                // value: data => data,
                valueType:'value',
                show: 'count',
                inMenu: true
            },
            {
                field:'maryanePeopleCount',
                showName: '打赏人数',
                // value: data => data,
                valueType:'value',
                show: 'count',
                inMenu: false
            },
            {
                field:'maryaneMone',
                showName: '打赏金额',
                value: data => data * 0.01,
                valueType:'value',
                show: 'money',
                inMenu: true
            },
            {
                field:'createTime',
                showName: '创建时间',
                value: data => (data * 1000),
                valueType:'time',
                show: 'time',
                inMenu: true
            },
        ];

        const layout = {
            background: '#CBF3FB'
        };
        const centerLayout = {
            height: '80vw',
            width: '40vw',
            display:'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        };
        const context = {
            display:'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        };
        const Main = (
            <div style={layout}>
                <div style={context}>
                    <EchartMenu menu={menu} choose={this.handleChangeY} choosed={this.state.choose_y.value} />
                    <Show data={data} menu={menu} chooseY={this.state.choose_y} chooseX={this.state.choose_x} />
                </div>
                <EchartMenuX menu={menu} choose={this.handleChangeX} choosed={this.state.choose_x.value} />
                <ThemeMenu chooseTheme={this.handleChooseTheme} />
            </div>
        );
        return (
            <MyLayout>
                {/*{data.length > 0 ? Main : ALoading}*/}
                {Main}
            </MyLayout>
        )
    }
}

export default Index