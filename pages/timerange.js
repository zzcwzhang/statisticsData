import React from 'react';
import URL from '../config/systemConfig'
import MyLayout from '../components/MyLayout.js'
import TimeRange from '../components/TimeRange';
import ALoading from '../components/Loading';
import Calulator from '../Model/calulator'


class timerange extends React.Component {
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

  render() {
    const { data } = this.state;
    return (
      <MyLayout>
        {data.length === 0 ?  <ALoading/> : <TimeRange style={{height: '20vw', width: '40vw'}} data={data}/>}
      </MyLayout>
    )
  }
}

export default timerange;
