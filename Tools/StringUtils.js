// test = 312314123.4;

function intExt(int) {
    const num = String(parseInt(int))
    const ary = num.split('');
    if(ary.length > 4) {
        ary.splice(-4,0,' 万 ')
    }
    if(ary.length > 9) {
        ary.splice(-9,0,' 亿 ')
    }
    return String(ary.join(''))
}

function moneyExt(money) {
    const num = parseFloat(money).toFixed(2);
    const ary = num.split('');
    if(ary.length > 7) {
        ary.splice(-7,0,' 万 ')
    }
    if(ary.length > 12) {
        ary.splice(-12,0,' 亿 ')
    }
    return String(ary.join(''))
}

export default {
    moneyExt,
    intExt
}

// const t = intExt(test);
// console.log(t)
// const e = moneyExt(test);
// console.log(e)
