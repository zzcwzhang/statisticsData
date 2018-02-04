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
  src: url('iconfont.eot?t=1517538101337'); /* IE9*/
  src: url('iconfont.eot?t=1517538101337#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),
  url('iconfont.ttf?t=1517538101337') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('iconfont.svg?t=1517538101337#iconfont') format('svg'); /* iOS 4.1- */
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
