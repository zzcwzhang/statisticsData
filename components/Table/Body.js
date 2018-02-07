import React from 'react';
import Colors from '../../config/colors'
import Tools from '../../Tools/StringUtils'
import { List } from 'immutable'

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
    const { menu, data } = this.props;
    const getRows = this.createRowByMenu(menu, data, this.state.sortIndex);
    getRows.then( fdata => {
      this.setState({
        rows: fdata
      })
    })
  }

  getSort() {
    const { rows, sortIndex } = this.state;
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
      for ( let i = 0; i< 10 ; i++) {
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
    return new Promise((resolve, reject) => {
      try {
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
          resolve(fdata.sort(function(a,b) {return parseFloat(b[sortIndex]) - parseFloat(a[sortIndex])}));
        }else {
          resolve(fdata)
        }
      } catch(err) {
        reject(err);
      }
    })
  }

  render() {
    const { menu } = this.props;
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

    const sary = this.getSort()

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
      }): ""}

        </tbody>
      </table>
    )
  }
}

export default Body;
