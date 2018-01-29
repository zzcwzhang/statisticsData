import React from 'react';
import echarts from '../lib/echarts.min.js';
import moment from 'moment';
import 'echarts/lib/component/title'

function createByMenu(datas,menu,y,x) {
    //datas是总数据
    const allData = datas.map( (odata, index) => {
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
            x: x.value,
            y: y.value
        }
    };
    return box;
}
// TODO: 目前无法显示百分比 因为valueType用来对应echarts的?Alxs的type，需要一个参数来设置ToolTip的再加工
function createToolTipByMenu(data, menu) {
    let strArray = menu.map( (menuItem, index) => {
        if (menuItem.show) {
            const name = menuItem.showName;
            let value = data.data[index];
            switch (menuItem.valueType) {
                case 'time':
                    value = moment(value).format('YYYY-MM-DD');
                    break;
                default:
                    value = String(value)
            }
            const line = name+ ' : '+value;
            return line;
        }
        return '';
    },'');
    return strArray.filter( s => ( s === '' ? false : true)).join('<br/>');
}

class Show extends React.Component {
    rendEchart(data, menu, chooseY, chooseX) {
        const testMenu = createByMenu(data,menu,chooseY, chooseX);
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
                formatter : data =>createToolTipByMenu(data,menu),
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
                    start:10,
                    end:60,
                },
                {
                    type: 'inside',
                    xAxisIndex: 0,
                    start:10,
                    end:60,
                },
                {
                    type: 'slider',
                    yAxisIndex: 0,
                    start:10,
                    end:60,
                },
                {
                    type: 'inside',
                    yAxisIndex: 0,
                    start:10,
                    end:60,
                }
            ],
            series: testMenu
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
        const { data,menu, chooseY, chooseX } = this.props;
        this.rendEchart(data, menu, chooseY, chooseX);
    }
    componentDidUpdate() {
        const { data,menu, chooseY, chooseX } = this.props;
        this.rendEchart(data, menu, chooseY, chooseX);
    }
    render() {
        return (
            <div>
                <div style={{height:'35vw',width:'90vw'}} ref="main"/>
            </div>
        )
    }
}

export default Show;