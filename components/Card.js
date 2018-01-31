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
    constructor(props) {
        super(props);
        this.handler = this.handler.bind(this);
    }

    handler(type, tag) {
        const {data, addKey, addFilter ,removeKeyword, removeFilterword} = this.props;
        const name = data.name;
        console.log(name);
        switch(type) {
            case 'addkey':
                const kinput = this.refs.keyword.value;
                addKey(name,kinput);
                break;
            case 'addfilter':
                const finput = this.refs.filterword.value;
                addFilter(name,finput);
                break;
            case 'removeKeyword':
                removeKeyword(name, tag);
                break;
            case 'removeFilterword':
                removeFilterword(name, tag);
                break;
            default:
                console.log('other');
        }

    }


    render() {
        const {data, deleteHandler} = this.props;
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
        const addKeywordBox = {
            margin: 5,
            background: '#00CCFF',
            borderRadius: '6px',
            textAlign: 'center',
            width: 90,
            borderBottom: '1px solid #000'
        };
        const addKeywordInput = {
            background: '#00CCFF',
            border: 0,
            borderBottom: 1,
            width: 50,
            textAlign: 'center',
            borderBottom: '1px solid #000'
        };
        const addFilterwordBox = {
            margin: 5,
            background: '#FF8C05',
            borderRadius: '6px',
            textAlign: 'center',
            width: 90,
            borderBottom: '1px solid #000'
        };
        const addFilterwordInput = {
            background: '#FF8C05',
            border: 0,
            borderBottom: 1,
            width: 50,
            textAlign: 'center',
            borderBottom: '1px solid #000'
        };
        const add = {
            margin: 5,
            width: 22,
            height: 22,
            background: '#43A102',
            borderRadius: '11px',
            color: '#fff',
        };
        const headerStyle = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: 30
        };
        const iconStyle = {
            fontFamily:"iconfont" ,
            fontSize:21,
            fontStyle:"normal",
            WebkitTextStrokeWidth: 0.2,
            WebkitFontSommthing:'antialiased',
            MozOsxFontSmoothing:'grayscale',
            border: 0,
            background: '#fff',
        };
        return (
            <div style={cbody}>
                <div style={headerStyle}>
                    <p style={{fontSize:24,fontWeight:600}}>{name}</p>
                    <button style={iconStyle} onClick={() => deleteHandler(name)}>&#xe609;</button>
                </div>
                <hr/>
                <div>
                    { keywords ? keywords.map((item, index) => <button style={cbtn} onDoubleClick={()=>this.handler('removeKeyword',item)} key={index}>{item}</button>) : '' }
                    { filterwords ? filterwords.map((item, index) => <button style={fbtn} onDoubleClick={()=>this.handler('removeFilterword',item)} key={index}>{item}</button>) : '' }
                    <div style={addKeywordBox}>
                        <input type="text" style={addKeywordInput} ref="keyword" placeholder="关键字"/>
                        <button onClick={()=>this.handler('addkey')} style={add}>+</button>
                    </div>
                    <div style={addFilterwordBox}>
                        <input type="text" style={addFilterwordInput} ref="filterword" placeholder="过滤字"/>
                        <button onClick={()=>this.handler('addfilter')} style={add}>+</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;