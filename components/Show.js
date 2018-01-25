import React from 'react';
import echarts from '../lib/echarts.min.js';


class Show extends React.Component {
    componentDidMount() {
        const { data } = this.props;

        const echartsData = data.map( (item) => {
            const rate = parseFloat(item.ansCount) / parseFloat(item.readCount) * 100 ;
            return [item.ansCount, item.readCount, item.name, item.href, rate.toFixed(3)]
        });
        const box = {
            type: 'scatter',
            data: echartsData,
            dimensions: [
                '回复数量',
                '点击量',
                'title',
                'rate'
            ],
            encode: {
                x: 1,
                y: 0
            }
        };
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
                formatter : function(p) {
                    return `标题: ${p.data[2]} <br/>&nbsp&nbsp点击量&nbsp:${p.data[1]} <br/>回复数量:${p.data[0]}<br/>回复率:${p.data[4]}%`;
                },
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
            series: box
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
            tmp.location=params.data[3];

        });
    }
    render() {
        return (
            <div>
                数据分析
                <div style={{height:'90vh',width:'90vw'}} ref="main"/>
            </div>
        )
    }
}

export default Show;