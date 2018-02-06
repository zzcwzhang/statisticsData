import React from 'react';
import echarts from 'echarts/lib/echarts'
import Color from '../config/colors'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/tooltip'

const config = (vdata, title) => {
    return {
        title: {
            text: title,
            left: 'center',
            top: 20,
            textStyle: {
                color: `#${Color.c1}`
            }
        },

        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series : [
            {
                name:'建贴时间',
                type:'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data:vdata.sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                    normal: {
                        textStyle: {
                            color: `#${Color.c3}`,
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: `#${Color.c3}`,
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: `#${Color.c2}`,
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    }
};

class Pie extends React.Component {
    static async getInitialProps({req}) {
        const data = {};
        return {
            data
        }
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
      const { data, title } = this.props;
      const tg = this.refs.main;
      this.myChart = echarts.init(tg,'blue');
      const configE = config(data, title);
      console.log(configE);
      this.myChart.setOption(configE);
    }

    render() {
        return (
            <div ref="main" style={this.props.style}></div>
        )
    }
}

export default Pie;
