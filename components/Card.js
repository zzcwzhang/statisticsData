import React from 'react';
// import Icon from '../font/iconfont'
// import '../font/iconfont.js'

class Card extends React.Component {
    static async getInitialProps({req}) {
        const data = {};
        return {
            data
        }
    }

    render() {
        const {data} = this.props;
        console.log(data);
        const name = data.name;
        const keywords = data.keywords || null;
        const filterwords = data.filterwords || null;
        // console.log(keywords, filterwords);
        const cbody = {
            background: '#FFF',
            border: '2px solid #049FF1',
            borderRadius: '10px',
            padding: '4px',
            minWidth: '200px',
            minHeight: '150px',
            boxShadow: '10px 10px 5px #04477C'
        };
        const cbtn = {
            margin: 5,
            background: '#00CCFF',
            borderRadius: '6px',
        };
        const fbtn = {
            margin: 5,
            background: '#FF8C05',
            borderRadius: '6px',
        };
        const add = {
            margin: 5,
            width: 22,
            height: 22,
            background: '#43A102',
            borderRadius: '11px',
            color: '#fff',
            border: 0
        };
        const iconStyle = {
            fontFamily:"iconfont" ,
            fontSize:21,
            fontStyle:"normal",
            WebkitTextStrokeWidth: 0.2,
            WebkitFontSommthing:'antialiased',
            MozOsxFontSmoothing:'grayscale',
        };
        return (
            <div style={cbody}>
                <div style={{fontSize:'24px'}}>
                    {name}
                    <i style={iconStyle}>&#xe609;</i>
                </div>
                <hr/>
                <div>
                    { keywords ? keywords.map((item, index) => <button style={cbtn} key={index}>{item}</button>) : '' }
                    { filterwords ? filterwords.map((item, index) => <button style={fbtn} key={index}>{item}</button>) : '' }
                    <button style={add}>+</button>
                </div>
            </div>
        )
    }
}

export default Card;