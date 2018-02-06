import React from 'react';
import Calulator from '../Model/calulator'
import Pie from '../components/Pie'
import ALoading from '../components/Loading';

class WeekRange extends React.Component {
  static async getInitialProps({req}) {
    const data = {};
    return {
      data
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const { data } = this.props;
    // 这一步把props传过来的data转化为自己的数组
    const res = Calulator.spliceByHour(data).then( da => {
      const seriesData = da.map( (item,index) => {
        const wek = item.length;
        let fix = '';
        if (index >0 && index < 7) {
          fix = '凌晨'
        }else if (index >= 7 && index < 9) {
          fix = '早上'
        }else if (index >= 9 && index <11) {
          fix = '上午'
        }else if (index >= 11 && index <14) {
          fix = '中午'
        }else if (index >= 14 && index < 18) {
          fix = '下午'
        }else {
          fix ='晚上'
        }
        let name = `${fix}${index}点`;
        return {value:wek,name}
      });
      this.setState({
        data: seriesData
      })
    })
  }

  render() {
    const { data } = this.state;
    console.log(data);
    return (
      <div>
      { data.length>0? (<Pie title="一天内发帖时间" data={data} style={{height:'40vw',width:'40vw'}}/>) :( <ALoading />) }
      </div>
    );
  }
}

export default WeekRange;
