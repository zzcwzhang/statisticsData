import React from 'react';
import echarts from '../lib/echarts.min.js';
import moment from 'moment';
import StringUtils from '../Tools/StringUtils'
import 'echarts/lib/component/title'

class Show extends React.Component {
    formatterFactory(data) {
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

    DatasFactory(){
        const { data,menu, chooseY, chooseX } = this.props;
        const allData = data.map( (odata) => {
            return menu.map( menuItem => {
                //根据field从 odata原始数据对象里取值
                const fieldValue = menuItem.field||'';
                if (fieldValue) {
                    return menuItem.value(odata[menuItem.field])
                } else {
                    return menuItem.value(odata)
                }
            })
        });
        const box = {
            type: 'scatter',
            data: allData,
            encode: {
                x: chooseX.value,
                y: chooseY.value
            }
        };
        return box;

    }

    rendEchart() {
        const { chooseY, chooseX } = this.props;
        const collection = this.DatasFactory();
        const eConfig = {
            title: {
                text:'天涯论坛：经济论坛-股市论坛',
                subtext:'数据收集时间 2018-01-28'
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
        const tg = this.refs.main;
        const myChart = echarts.init(tg,'blue');
        myChart.setOption(eConfig);
        myChart.on('click', (params) => {
            const tmp=window.open("about:blank","","fullscreen=1");
            tmp.moveTo(0,0);
            tmp.resizeTo(screen.width+20,screen.height);
            tmp.focus();
            tmp.location=params.data[0];
        });
    }

    componentDidMount() {
        this.rendEchart();
    }
    componentDidUpdate() {
        this.rendEchart();
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