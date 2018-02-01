import React from 'react';
// import echarts from '../lib/echarts.min.js';
import echarts from 'echarts/lib/echarts'
import moment from 'moment';
import StringUtils from '../Tools/StringUtils'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/component/title'
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/legend'
import Immutable from 'immutable';

class Show extends React.Component {
    formatterFactory(data) {
        // console.log( 'test ',data.componentType);
        const type = data.componentType;
        if  (type === 'markLine') {
            // console.log( 'test ',data);
            const vlu = data.data.value;
            const themeName = data.seriesName;
            return `${themeName} 平均值为 ${vlu}`;
        }
        if (type === 'series') {
            const { menu } = this.props;
            let strArray = menu.map( (menuItem, index) => {
                const name = menuItem.showName;
                let value = data.data[index];
                switch (menuItem.show) {
                    case 'none':
                        return '';
                        break;
                    case 'normal':
                        value = String(value);
                        break;
                    case 'count':
                        value = StringUtils.intExt(value);
                        break;
                    case 'time':
                        value = moment(value).format('YYYY年MM月DD日 hh:mm');
                        break;
                    case 'money':
                        value = StringUtils.moneyExt(value);
                        break;
                    case 'rate':
                        value = String(value)+' %';
                        break;
                }
                return name+ ' : '+value;
            },'');
            return strArray.filter( s => ( s === '' ? false : true)).join('<br/>');
        }
    }

    leaderFactory() {
        const { data } = this.props;
        const leaders = [];
        data.map( (val,key) => {
            const name = key;
            leaders.push(name);
        });
        return leaders;
    }

    DatasFactory(){
        const { data,menu, chooseY, chooseX } = this.props;
        const allTheme = data.map( (val,key) => {
            const name = key;
            const show = val.get('show');
            if (!show) {
                return null;
            }

            let datas = val.get('data');
            // 外层遍历 该主题的每条数据
            const getDataByMenu = datas.map( (v) => {
                // 从menu列表里取出Field名
                return menu.map( menuItem => {
                    const field = menuItem.field || '';
                    if (field) {
                        if (menuItem.value) {
                            return menuItem.value(v.get(field))
                        } else {
                            return v.get(field)
                        }

                    } else {
                        if (menuItem.value) {
                            return menuItem.value(v);
                            return '';
                        } else {
                            return "";
                        }
                    }
                })
            });
            const box = {
                name: name,
                type: 'scatter',
                data: getDataByMenu .toJS(),
                encode: {
                    x: chooseX.value,
                    y: chooseY.value
                },
                markLine: {
                    label: name,
                    data: [
                        {
                            name: '平均线',
                            type: 'average'
                        },
                    ]
                }
            };
            return box
        });
        const list = [];
        allTheme.map( v => {
            if (v) {
                list.push(v)
            }
        });
        return list;
    }

    rendEchart() {
        const { chooseY, chooseX } = this.props;
        const collection = this.DatasFactory();
        const leaders = this.leaderFactory();
        const eConfig = {
            title: {
                text:'天涯论坛：经济论坛-股市论坛',
                subtext:'数据收集时间 2018-01-28'
            },
            legend: {
                data:leaders
            },
            xAxis: {
                scale: true,
                type: chooseX.type
            },
            yAxis: {
                scale:true,
                type: chooseY.type,
            },
            tooltip : {
                trigger: 'item',
                showDelay : 0,
                formatter : data =>this.formatterFactory(data),
                axisPointer:{
                    show: true,
                    type : 'cross',
                    lineStyle: {
                        type : 'dashed',
                        width : 1
                    }
                }
            },
            dataZoom:[
                {
                    type: 'slider',
                    xAxisIndex: 0,
                    start:0,
                    end:100,
                },
                {
                    type: 'inside',
                    xAxisIndex: 0,
                    start:0,
                    end:100,
                },
                {
                    type: 'slider',
                    yAxisIndex: 0,
                    start:0,
                    end:100,
                },
                {
                    type: 'inside',
                    yAxisIndex: 0,
                    start:0,
                    end:100,
                }
            ],
            series: collection
        };
        this.myChart.setOption(eConfig);
    }

    componentDidMount() {
        const tg = this.refs.main;
        this.myChart = echarts.init(tg,'blue');
        this.myChart.on('click', (params) => {
            const tmp=window.open("about:blank","","fullscreen=1");
            tmp.moveTo(0,0);
            tmp.resizeTo(screen.width+20,screen.height);
            tmp.focus();
            tmp.location=params.data[0];
        });
        this.rendEchart();
        const { data }= this.props;
        this.old = data;
    }
    getShowCount( data ) {
        let showCount = 0;
        data.map( (val,key) => {
            const show = val.get('show');
            if (show) {
                showCount += 1;
            }
        });
        return showCount;
    }
    componentDidUpdate() {
        const { data }= this.props;
        // 优化render
        const oldCount = this.getShowCount( this.old );
        const newCount = this.getShowCount(data);
        if (newCount > 0) {
            if(!Immutable.is( data, this.old) && (newCount < oldCount)){
                this.myChart.clear();
            }
        }
        this.rendEchart();
        this.old = data;
    }
    render() {
        return (
            <div>
                <div style={{height:'35vw',width:'85vw'}} ref="main"/>
            </div>
        )
    }
}

export default Show;