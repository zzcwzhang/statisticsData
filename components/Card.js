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
        this.handleAddKey = this.handleAddKey.bind(this);
        this.handleAddFilter= this.handleAddFilter.bind(this);
    }

    handleAddKey(e) {
        const {data, addKey} = this.props;
        const name = data.name;
        if (e.keyCode == 13) {
            const word = e.target.value;
            e.target.value = '';
            addKey(name, word);
        }
    }

    handleAddFilter(e) {
        const {data, addFilter} = this.props;
        const name = data.name;
        if (e.keyCode == 13) {
            const word = e.target.value;
            e.target.value = '';
            addFilter(name, word);
        }
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
            margin: '5px',
            background: '#FFF',
            borderRadius: '10px',
            padding: '4px',
            minWidth: '200px',
            maxWidth: '300px',
            minHeight: '150px',
            boxShadow: '0px 0px 5px #BEC0C2',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
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
            background: '#00CCFF',
            borderRadius: '6px 0 0 6px',
            textAlign: 'center',
            width: '50%',
            borderBottom: '1px solid #000'
        };
        const addKeywordInput = {
            background: '#00CCFF',
            border: 0,
            width: 80,
            textAlign: 'center',
            // borderBottom: '1px solid #000'
        };
        const addFilterwordBox = {
            background: '#FF8C05',
            borderRadius: '0 6px 6px 0',
            textAlign: 'center',
            width: '50%',
            borderBottom: '1px solid #000'
        };
        const addFilterwordInput = {
            background: '#FF8C05',
            border: 0,
            width: 80,
            textAlign: 'center',
            // borderBottom: '1px solid #000'
        };
        const add = {
            margin: 5,
            width: 22,
            border: 0,
            // height: 22,
            background: '#43A102',
            // borderRadius: '11px',
            color: '#fff',
        };
        const headerStyle = {
            display: 'flex',
            paddingRight: '10px',
            paddingLeft: '10px',
            paddingBottom: '5px',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 30,
            borderBottom: '1px solid #000'
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
        const centerStyle = {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'start',
            alignItems: 'start',
        };
        const bottom = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: 30
        };
        return (
            <div style={cbody}>
                <div style={headerStyle}>
                    <p style={{fontSize:24,fontWeight:600}}>{name}</p>
                    <button style={iconStyle} onClick={() => deleteHandler(name)}>&#xe609;</button>
                </div>
                <div style={centerStyle}>
                    { keywords ? keywords.map((item, index) => <button style={cbtn} onDoubleClick={()=>this.handler('removeKeyword',item)} key={index}>{item}</button>) : '' }
                    { filterwords ? filterwords.map((item, index) => <button style={fbtn} onDoubleClick={()=>this.handler('removeFilterword',item)} key={index}>{item}</button>) : '' }
                </div>
                <div style={bottom}>
                    <div style={addKeywordBox}>
                        <input type="text" style={addKeywordInput} ref="keyword" placeholder="添加关键字" onKeyDown={this.handleAddKey}/>
                        {/*<button onClick={()=>this.handler('addkey')} style={add}>+</button>*/}
                    </div>
                    <div style={addFilterwordBox}>
                        <input type="text" style={addFilterwordInput} ref="filterword" placeholder="添加过滤字" onKeyDown={this.handleAddFilter}/>
                        {/*<button onClick={()=>this.handler('addfilter')} style={add}>+</button>*/}
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;