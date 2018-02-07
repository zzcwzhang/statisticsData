import React from 'react';
import Colors from '../../config/colors'
import Tools from '../../Tools/StringUtils'
import { List } from 'immutable'
//import ReactCSSTransitionGroup from 'react-transition-group'

const NORMAL = 'NORMAL';
const NUMBER = 'NUMBER';
const MONEY = 'MONEY';
const FUNCTION = 'FUNCTION';

class Body extends React.Component {
  static async getInitialProps({req}) {
    const data = {};
    return {
      data
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      sortIndex: 1
    }
    this.createRowByMenu = this.createRowByMenu.bind(this);
  }

  componentDidMount() {
  }

  componentDidUpdate() {

  }

  getSort(rows, sortIndex) {
    const sary = [];
    // 利用immutable做一下深拷贝
    const Rows = List(rows)
    if (Rows.size > 0) {
      if (sortIndex>=0) {
        // 使用var做一下变量提升
        var afterSort = Rows.sort((a,b) => (parseFloat(b[sortIndex])- parseFloat(a[sortIndex])))
      }
      const sary = afterSort || Rows;
      const res = [];
      // 只返回前10名
      const max = sary.size > 10 ? 10 : sary.size;
      for ( let i = 0; i< max ; i++) {
        const value = sary.get(i);
        res.push(value)
      }
      return res;
    } else {
      return [];
    }
  }



  // 通过menu的配置，来逐条生成展示tr的数据
  createRowByMenu(menu, data, sortIndex = -1) {
    const fdata = data.map( (row) => {
      const nrow = menu.map( menuItem => {
        switch (menuItem.type) {
          case NORMAL:
            return row[menuItem.field];
            break;
          case NUMBER:
            return Tools.intExt(row[menuItem.field]);
            break;
          case MONEY:
            return Tools.moneyExt(row[menuItem.field]);
            break;
          case FUNCTION:
            return menuItem.method(row);
            break;
        }
      })
      return nrow
    });
    if(sortIndex >= 0) {
      return fdata.sort(function(a,b) {return parseFloat(b[sortIndex]) - parseFloat(a[sortIndex])});
    }else {
      return fdata;
    }
}

  render() {
    // 头部样式
    const headerStyle = {
      height: 40,
      background: `#${Colors.c2}`
    }
    // 身体样式
    const rowStyle = {
      height: 40,
      background: `#${Colors.c3}`
    }
    const iconStyle = {
      color: `@#{Colors.c2}`,
      fontFamily:"iconfont" ,
      fontSize:14,
      fontStyle:"normal",
      WebkitTextStrokeWidth: 0.2,
      WebkitFontSommthing:'antialiased',
      MozOsxFontSmoothing:'grayscale',
      marginRight: '10px'
    };

    const chooseStyle = {
      background: `#${Colors.c3}`
    }
    const normalStyle ={
      background: `#${Colors.c2}`
    }

    const { menu, data } = this.props;
    const { sortIndex } = this.state;
    const getRows = this.createRowByMenu(menu, data, sortIndex);
    const sary = this.getSort(getRows, sortIndex)

    return (
      <table style={this.props.style}>
        <tbody>
        <tr style={headerStyle}>
          {menu.map((item, index) => {
            return <th key={index} style={index==this.state.sortIndex ? chooseStyle : normalStyle} onClick={()=>this.setState({sortIndex:index})} >{item.name}{index==this.state.sortIndex ? <i style={iconStyle}>&#xe604;</i> : ''}</th>
          })}
        </tr>
      { sary.length > 0? sary.map( (r,i) => {
        return (
          <tr key={i}>
            {r.map( (d,i) => {
              return <td key={i}>{d}</td>
            })}
          </tr>
        ) 
      }): <tr>
          <td>Loading</td>
      </tr>}

        </tbody>
      </table>
    )
  }
}

export default Body;
