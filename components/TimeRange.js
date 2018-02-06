import React from 'react';
import Calulator from '../Model/calulator'
import Pie from '../components/Pie'
import ALoading from '../components/Loading';

class TimeRange extends React.Component {
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

  getSumParamData(paramName, showName = '') {
    const { data } = this.props;
    const promise = new Promise( (resolve, reject) => {
      const res = Calulator.spliceByHour(data).then( da => {
        // 发帖数量
        const seriesData = da.map( (item,index) => {
          const sum = Calulator.averageByName(item, paramName)
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
          return {value:sum, name}
        });
        this.setState({
          data: seriesData
        })
      })

    })

  }

  getSumData() {
    const { data } = this.props;
    const promise = new Promise( (resolve, reject) => {
      const res = Calulator.spliceByHour(data).then( da => {
        // 发帖数量
        const seriesData = da.map( (item,index) => {
          const sum = item.length;
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
          return {value:sum,name}
        });
        this.setState({
          data: seriesData
        })
      })

    })
  }

  componentDidMount() {
    // this.getSumParamData('readCount');
    this.getSumData();
  }

  render() {
    const { data } = this.state;
    console.log(data);
    return (
      <div>
      { data.length>0? (<Pie title="发帖时间分布图" data={data} style={{height:'40vw',width:'40vw'}}/>) :( <ALoading />) }
      </div>
    );
  }
}

export default TimeRange;
