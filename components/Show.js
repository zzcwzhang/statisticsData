import React from 'react';
import echarts from '../lib/echarts.min.js';

function createSHOW(item,list){
    return list.map( pn => item[pn])
}

const namelist = [
    'ansCount',
    'readCount',
    'name',
    'href'
];

function createBox(data) {
    const echartsData = data.map( (item) => {
        const rate = parseFloat(item.ansCount) / parseFloat(item.readCount) * 100 ;
        return createSHOW(item,namelist);
    });
    const box = {
        type: 'scatter',
        data: echartsData,
        encode: {
            x: 0,
            y: 1
        }
    };
    return box;

}

class Show extends React.Component {
    componentDidMount() {
        const { data } = this.props;
        console.log(data);

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
            series: [createBox(data)]
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
                <div style={{height:'90vh',width:'90vw'}} ref="main"/>
            </div>
        )
    }
}

export default Show;