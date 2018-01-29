import React from 'react';
import echarts from '../lib/echarts.min.js';

function createByMenu(datas,menu) {
    //datas是总数据
    const allData = datas.map( (odata, index) => {
        return menu.map( menuItem => {

            //根据field从 odata原始数据对象里取值
            // return odata[menuItem.field]
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
            x: 2,
            y: 3
        }
    };
    return box;
}

function createToolTipByMenu(data, menu) {
    const strArray = menu.map( (menuItem, index) => {
        if (menuItem.show) {
            const name = menuItem.showName;
            const value = data.data[index];
            const line = name+ ' : '+String(value);
            return line;
        }
        return '';
    },'');
    const str = strArray.join('<br/>');
    return str;
}

class Show extends React.Component {
    componentDidMount() {
        const { data,menu } = this.props;
        console.log(menu);
        const testMenu = createByMenu(data,menu);
        console.log(testMenu);

        const eConfig = {
            xAxis: {
                scale: true,
                type: 'value',
            },
            yAxis: {
                scale:true,
                type: 'value',
            },
            // legend: {
            //     formatter: function (name) {
            //         return echarts.format.truncateText(name, 40, '14px Microsoft Yahei', '…');
            //     },
            //     tooltip: {
            //         show:false
            //     },
            //     selectedMode: true
            //
            // },
            tooltip : {
                trigger: 'item',
                showDelay : 0,
                // formatter : function(p) {
                //     return `标题: ${p.data[2]} <br/>&nbsp&nbsp点击量&nbsp:${p.data[1]} <br/>回复数量:${p.data[0]}<br/>回复率:${p.data[4]}%`;
                // },
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
            // console.log(params.data[3]);
            const tmp=window.open("about:blank","","fullscreen=1")
            tmp.moveTo(0,0);
            tmp.resizeTo(screen.width+20,screen.height);
            tmp.focus();
            tmp.location=params.data[0];
        });
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