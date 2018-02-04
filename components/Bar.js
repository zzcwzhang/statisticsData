import React from 'react';
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/chart/line'

class Bar extends React.Component {
    static async getInitialProps({req}) {
        const data = {};
        return {
            data
        }
    }

    componentDidMount() {
        const tg = this.refs.main;
        this.myChart = echarts.init(tg,'blue');
        this.myChart.setOption(this.props.option);
    }
    componentDidUpdate() {
        this.myChart.clear();
        this.myChart.setOption(this.props.option);
    }
    render() {
        return (
            <div ref="main" style={this.props.style}></div>
        )
    }
}

export default Bar;