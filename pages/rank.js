import React from 'react';
import URL from '../config/systemConfig'
import MyLayout from '../components/MyLayout.js'
import ALoading from '../components/Loading';
import Calulator from '../Model/calulator'
import Body from '../components/Table/Body'
import moment from 'moment'

const NORMAL = 'NORMAL';
const NUMBER = 'NUMBER';
const MONEY = 'MONEY';
const FUNCTION = 'FUNCTION';

class rank extends React.Component {
    static async getInitialProps({req}) {
        const data = {};
        return {
            data
        }
    }

  constructor(props) {
    super(props);
    this.state = {
      data : []
    }
  }

  componentDidMount() {
    fetch( URL + '/all.do').then( res => {
      return res.json();
    } ).then(  data => {
      this.setState({
        data
      })
    })
  }

  createTableConfig() {
    const menu = [
        {
          name:'标题',
          field: 'name',
          type: NORMAL
        },{
          name:'点击量',
          field: 'readCount',
          type: NORMAL
        },{
          name: '回复量',
          field: 'ansCount',
          type: NORMAL
        },{
          name: '创建时间',
          field: 'createTime',
          type: FUNCTION,
          method: data => {
            const time = moment(data.createTime*1000);
            return time.format('YYYY-MM-DD');
          }
        },{
          name: '回复率 （%）',
          field: 'rate',
          type: FUNCTION,
          method: data => {
            return parseFloat(data.ansCount / data.readCount).toFixed(2)
          }
        },{
          name: '平均点击时间（天）',
          field: 'rate',
          type: FUNCTION,
          method: data => {
            const now = Date.parse(new Date) * 1000;
            const cha = now - data.createTime * 1000;
            const days = cha / ( 24 * 3600 * 1000);
            return data.readCount / days;
          }
        }
    ]
    return menu;
  }

  render() {
    const layout = {
      height: '40vw',
      width: '90vw',
      display:'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',

    }
    const { data } = this.state;
    const menu = this.createTableConfig();
    return (
      <MyLayout>
        <div style={layout}>
          { data.length > 0 ? <Body menu={menu} data={data} style={{height:'40vw',width:'80vw'}}/> : <ALoading />}
        </div>
      </MyLayout>
    )
  }


}

export default rank;
