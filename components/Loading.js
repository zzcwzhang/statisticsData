import React from 'react';

class Loading extends React.Component {
    static async getInitialProps({req}) {
        const data = {};
        return {
            data
        }
    }

    render() {
        const context = {
            width: '90vw',
            height: '40vw',
            display:'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize:150,
            color: '#065FB9'
        };
        return (
            <div style={context}>
                <p className="loader" ></p>
                <style jsx>
                    {`
.loader {
    position: relative;
    height: 150px;
    width: 150px;
}
.loader:before,
.loader:after {
    content: '';
    display: block;
    position: absolute;
    background-color: currentcolor;
    left: 50%;
    right: 0;
    top: 0;
    bottom: 50%;
    box-shadow: -.5em 0 0 currentcolor;
    -webkit-animation: loader 1s linear infinite;
    animation: loader 1s linear infinite;
}
.loader:after {
    top: 50%;
    bottom: 0;
    -webkit-animation-delay: .25s;
    animation-delay: .25s;
}
@-webkit-keyframes loader {
    0%, 100% {
        box-shadow: -.5em 0 0 transparent;
        background-color: currentcolor;
    }
    50% {
        box-shadow: -.5em 0 0 currentcolor;
        background-color: transparent;
    }
}
@keyframes loader {
    0%, 100% {
        box-shadow: -.5em 0 0 transparent;
        background-color: currentcolor;
    }
    50% {
        box-shadow: -.5em 0 0 currentcolor;
        background-color: transparent;
    }
}
`}
                </style>
            </div>
        )
    }
}

export default Loading;