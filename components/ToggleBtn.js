import React from 'react';
import Color from '../config/colors'

class ToggleBtn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOn: this.props.def || true,
        };
    }

    render() {
        const { isOn, name, ToggleHandler } = this.props;
        const PRL = 15;
        const MRL = PRL;
        const box = {
            transition: '0.3s all ease',
            display: 'inline-block',
            zIndex:0,
            position: 'relative',
            paddingBottom: 5,
            paddingTop: 5,
            paddingRight: PRL,
            paddingLeft: PRL,
            background: '#'+(isOn ? Color.c5 : Color.c1),
            borderRadius: 15,
            border : `1px solid #${Color.c2}`,
        };
        const on = {
            position: 'absolute',
            zIndex:1,
            right: 7,
            color: `#${Color.c1}`
        };
        const off = {
            position: 'absolute',
            zIndex:1,
            left: 7,
            color: `#${Color.c5}`
        };

        const center = {
            transition: '0.3s all ease',
            zIndex:2,
            color: `#${Color.c5}`,
            position: 'relative',
            left: (isOn ? -MRL : MRL ),
            background: '#'+Color.c2,
            borderRadius: 15,
            paddingBottom: 5,
            paddingTop: 5,
            paddingRight: 15,
            paddingLeft: 15,
            // marginRight: -15,
            // marginLeft: -15,
            marginTop: -6,
            marginBottom: -6,
        };
        return (
            <div style={box} onClick={() => ToggleHandler(name)}>
                <span style={off}>关</span>
                <span style={center}>{name}</span>
                <span style={on}>开</span>
            </div>
        )
    }
}

export default ToggleBtn;