import React from 'react';

class Header extends React.Component {
  static async getInitialProps({req}) {
    const data = {};
    return {
      data
    }
  }

  render() {
    const { menu } = this.props;
    return (
      <tr>
        {menu.map((item, index) => {
          return <th key={index}>{item.name}</th>
        })}
      </tr>
    )
  }
}

export default Header;
