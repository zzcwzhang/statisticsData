import React from 'react';
import URL from '../config/systemConfig'
import MyLayout from '../components/MyLayout.js'
import ALoading from '../components/Loading';
import Colors from '../config/colors'
import Calulator from '../Model/calulator'
import Body from '../components/Table/Body'
import ToggleBtn from '../components/ToggleBtn'
import moment from 'moment'

const LINK = 'LINK';
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
      data : [],
      allOn : true
    }
    this.handleToggleAll = this.handleToggleAll.bind(this);
    this.handleToggleTheme = this.handleToggleTheme.bind(this);
  }

  handleToggleAll() {
    // 全部开关，当点击这个开关为开时，其他主题全部关闭，但不改变状态，这样方便下次记忆上次结果。
    this.setState({
      allOn: !this.state.allOn
    })
  }

  handleToggleTheme(themeName) {
    const old = this.state.themedata;
    for (let t in old) {
      if (old[t].name === themeName){
        const nt = old[t];
        nt.isOn = !nt.isOn;
        old[t] = nt;
        this.setState({
          themedata: old,
          allOn: false
        })
      }
    }
  }

  getChooseDatas() {
    // 如果开启全部则直接返回全部数据
    if (this.state.allOn) {
      return this.state.alldata;
    }
    const pool = [];
    this.state.themedata.forEach( item => {
      if( item.isOn === true ) {
        pool.push.apply(pool,item.data)
      }
    })
    const afterUnque = Calulator.unque(pool,'name') || [];
    return afterUnque;
  }

  componentDidMount() {
    fetch( URL + '/all.do').then( res => {
      return res.json();
    } ).then(  data => {
      fetch( URL + '/theme/all.do').then( res => {
        return res.json();
      }).then( theme => {
        // 把数据根据主题分割成字典数组
        Calulator.spliceByTheme(theme,data).then(
          (res) => {
            // 把所有主题的开关默认为关
            const fres = res.map( item => {
              return {
                ...item,
                isOn: false
              }
            })
            // 把全部数据也当成一个主题,并且默认为开启
            this.setState({
              themedata: fres,
              alldata: data
            })
          }
        );
      });
    })
  }

  createTableConfig() {
    // 当type字段为NORMAL时必须设置field属性，表示直接使用该属性的值,type为FUNCTION时必须设置method参数，该参数接受一个函数，该函数有一个参数用来接收该条信息的整个对象，之后必须返回一个值作为结果。
    const menu = [
        {
          name:'标题',
          field: 'name',
          url: data=>data.href,
          type: LINK
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
          name: '平均点击量（每天）',
          field: 'rate',
          type: FUNCTION,
          method: data => {
            const now = Date.parse(new Date) * 1000;
            const cha = now - data.createTime * 1000;
            const days = cha / ( 24 * 3600 * 1000);
            return (data.readCount / days).toPrecision(3);
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
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }
    const menuStyle = {
      height:'5vw',
      width: '90vw',
      background: `#${Colors.c2}`,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    }
    const data = this.getChooseDatas();
    const menu = this.createTableConfig();
    const { themedata } = this.state;
    return (
      <MyLayout>
        <div style={layout}>
          <div style={menuStyle}>
            <ToggleBtn name='全部' isOn={this.state.allOn} ToggleHandler={this.handleToggleAll}/>
            { themedata&&themedata.length>0 ? themedata.map(( theme,index ) => {
              return <ToggleBtn key={index} ToggleHandler={this.handleToggleTheme} name={theme.name} isOn={ !this.state.allOn&&theme.isOn}/>
            }) : <span>Loading</span> }
          </div>
          { data&&data.length > 0 ? <Body menu={menu} data={data} style={{height:'35vw',width:'80vw'}}/> : <ALoading />}
        </div>
      </MyLayout>
    )
  }


}

export default rank;
