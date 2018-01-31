import Link from 'next/link'
const linkStyle = {
    marginRight: 15
};

const box = {
    height: '80px',
    width:'100%',
    display:'flex',
    flexDirection: 'cloumn',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: '#04477C'
};
const c1 = '04477C';
const c2 = '065FB9';
const c3 = '049ff1';
const c4 = '70E1FF';
const c5 = 'CBF3FB';
const item = {
    color: '#fff',
    margin: 10,
    fontSize: '30px',
    transition: '0.5s all ease;',
    textTransform: 'uppercase',
    textDecoration: 'none',
    textShadow: `
    1px 1px #${c1}, 2px 2px #${c1}, 3px 3px #${c1}, 4px 4px #${c1}, 5px 5px #${c1},
    6px 6px #${c2}, 7px 7px #${c2}, 8px 8px #${c2}, 9px 9px #${c2}, 10px 10px #${c2},
    11px 11px #${c3}, 12px 12px #${c3}, 13px 13px #${c3}, 14px 14px #${c3}, 15px 15px #${c3}
    `
};
const iconStyle = {
    color: '#fff',
    fontFamily:"iconfont" ,
    fontSize:34,
    fontStyle:"normal",
    WebkitTextStrokeWidth: 0.2,
    WebkitFontSommthing:'antialiased',
    MozOsxFontSmoothing:'grayscale',
    marginRight: '10px'
};

export default () => (
    <div style={box}>
        <div className="headlogo"><i style={iconStyle}>&#xe700;</i>叭叭数据</div>
        <style jsx global>{`
@font-face {font-family: "iconfont";
  src: url('iconfont.eot?t=1517394797793'); /* IE9*/
  src: url('iconfont.eot?t=1517394797793#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),
  url('iconfont.ttf?t=1517394797793') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('iconfont.svg?t=1517394797793#iconfont') format('svg'); /* iOS 4.1- */
}
.headlogo{
    color: #fff;
    margin: 10px;
    font-size: 30px;
    transition: 0.5s all ease;
    text-transform: uppercase;
    text-decoration: none;
    text-shadow:
            1px 1px #${c1}, 2px 2px #${c1}, 3px 3px #${c1}, 4px 4px #${c1}, 5px 5px #${c1},
            6px 6px #${c2}, 7px 7px #${c2}, 8px 8px #${c2}, 9px 9px #${c2}, 10px 10px #${c2},
            11px 11px #${c3}, 12px 12px #${c3}, 13px 13px #${c3}, 14px 14px #${c3}, 15px 15px #${c3};
    }
.headlogo:hover {
  text-shadow:
    1px 1px #${c1},
    2px 2px #${c2},
    3px 3px #${c3};
    }
    `}
        </style>
    </div>
)
