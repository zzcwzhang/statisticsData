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
  src: url('iconfont.eot?t=1517968276945'); /* IE9*/
  src: url('iconfont.eot?t=1517968276945#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),
  url('iconfont.ttf?t=1517968276945') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('iconfont.svg?t=1517968276945#iconfont') format('svg'); /* iOS 4.1- */
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
