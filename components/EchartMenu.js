import React from 'react';

class EchartMenu extends React.Component {
    static async getInitialProps({req}) {
        const data = {};
        return {
            data
        }
    }

    render() {
        const { menu } = this.props;
        return (
            <div>
                { menu.map( (item, index) => {
                    return <div key={index}>{item.showName}</div>
                })}
            </div>
        )
    }
}

export default EchartMenu;