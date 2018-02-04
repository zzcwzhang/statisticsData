import React from 'react';
import MyLayout from '../components/MyLayout.js'
import Calulator from '../Model/calulator';
import URL from '../config/systemConfig'
import ALoading from '../components/Loading';
import Bar from '../components/Bar';
import SelectBox from '../components/SelectBox';
import ToggleBtn from '../components/ToggleBtn.js';

class pieBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            etype: '总量',
            shows: {
                '数量':true,
                '阅读量':true,
                '回复量':true,
                '总赏金':true
            }
        };
        this.createBar = this.createBar.bind(this);
        this.createSeries = this.createSeries.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(name) {
        const  shows = this.state.shows;
        shows[name] = !shows[name];
        this.setState({
            shows
        });
    }


    componentDidMount() {
        fetch( URL + '/all.do').then( res => {
            return res.json();
        } ).then(  data => {
            fetch( URL + '/theme/all.do').then( res => {
                return res.json();
            }).then( theme => {
                Calulator.spliceByTheme(theme,data).then(
                    (res) => {
                        this.setState({
                            themedata: res
                        })
                    }
                );
            });
        })
    }

    createSeries() {
        const { themedata, etype, shows } = this.state;
        const nameList = [];
        const countList = [];
        const readSumList = [];
        const ansSumList = [];
        const maryaneSumList = [];
        const result = [];
        let calulator = null;
        if(etype === '总量') {
            calulator = Calulator.sumByName;
        } else (
            calulator = Calulator.averageByName
        );
        if (themedata) {
            for (let d of themedata) {
                const name = d.name;
                nameList.push(name);
                const t1 = d.data;
                countList.push(d.data.length);
                const sumReadCount = calulator(t1, 'readCount');
                readSumList.push(sumReadCount);
                const sumAnsCount = calulator(t1, 'ansCount');
                ansSumList.push(sumAnsCount);
                const maryaneMone = calulator(t1, 'maryaneMone');
                maryaneSumList.push((maryaneMone * 0.01).toFixed(2));
            }

            if (shows['数量']) {
                result.push({
                    name:'数量',
                    type:'bar',
                    data: countList,
                })
            }

            if (shows['阅读量']) {
                result.push({
                    name:'阅读量',
                    type:'bar',
                    data: readSumList,
                })
            }
            if (shows['回复量']) {
                result.push({
                    name:'回复量',
                    type:'bar',
                    data: ansSumList,
                })
            }

            if (shows['总赏金']) {
                result.push({
                    name:'总赏金',
                    type:'bar',
                    data: maryaneSumList,
                })
            }
        }
        return result;
    }

    createBar() {
        const { themedata } = this.state;
        const nameList = [];
        const that = this;
        if (themedata) {
            for (let d of themedata) {
                const name = d.name;
                nameList.push(name);
            }
            return {
                title : {
                    text: '主题统计',
                    subtext: '主题之间有交集'
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['数量','阅读量','回复量','总赏金']
                },
                toolbox: {
                    show : true,
                    feature : {
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        data : nameList
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : that.createSeries()
            };
        }
        return '';
    }

    render() {
        const { shows } = this.state;
        const getBarOption = this.createBar();
        const menuBox = {
            height:'5vw',width:'90vw',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'baseline ',
        };
        const ToggleBox = {
            height:'5vw',width:'40vw',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'baseline ',
        };
        return (
            <MyLayout>
                <div>
                    <div style={menuBox}>
                        <SelectBox list={['总量','平均值']} handleCheck={e=>this.setState({etype:e})} />
                        <div style={ToggleBox}>
                            <ToggleBtn name="数量" isOn={shows["数量"]} ToggleHandler={n=>this.handleToggle(n)}/>
                            <ToggleBtn name="阅读量" isOn={shows["阅读量"]} ToggleHandler={n=>this.handleToggle(n)}/>
                            <ToggleBtn name="回复量" isOn={shows["回复量"]} ToggleHandler={n=>this.handleToggle(n)}/>
                            <ToggleBtn name="总赏金" isOn={shows["总赏金"]} ToggleHandler={n=>this.handleToggle(n)}/>
                        </div>
                    </div>
                    <div style={{height:'35vw',width:'90vw'}}>
                        { getBarOption ? (<Bar option={getBarOption} style={{height:'35vw',width:'90vw'}} />) : <ALoading></ALoading>}
                    </div>
                </div>
            </MyLayout>
        )
    }
}

export default pieBar;