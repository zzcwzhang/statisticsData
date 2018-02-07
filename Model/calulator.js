import { Map, fromJS, List, toJS } from 'immutable'


const sumByName = (datas, paramName) => {
   const sum = datas.reduce( (sum, next) => {
        const num = parseInt(next[paramName]);
        return sum + num;
    },0)
    return sum;
};

const averageByName = (datas, paramName) => {
    const sum = datas.reduce( (sum, next) => {
        const num = parseInt(next[paramName]);
        return sum + num;
    },0)
    return (sum / datas.length).toFixed(2);
};

const spliceByTheme = (theme, data) => new Promise ((resolve, rject) => {
    const Theme = fromJS(theme);
    const result = Theme.map( (v) => {
        const name = v.get('name');
        const keywords = v.get('keywords');
        const filterwords = v.get('filterwords');
        // console.log(name,keywords.toJS(),filterwords? filterwords.toJS() : []);
        const list = [];
        let keyreg = '';
        if (keywords && keywords.size > 0) {
            const kary = keywords.toJS();
            keyreg = `(${kary.join('|')})`;
        }
        let filterreg= '';
        if (filterwords && filterwords.size > 0) {
            const fary = filterwords.toJS();
            filterreg = `(${fary.join('|')})`;
        }
        data.map( t => {
            if (keyreg) {
                const Kreg = new RegExp(keyreg);
                const Name = t.name;
                if (Kreg.test(Name)) {
                    if (filterreg) {
                        const Freg = new RegExp(filterreg);
                        if (!Freg.test(Name)) {
                            list.push(t);
                        }
                    } else {
                        list.push(t);
                    }
                }
            }
        });
        const fv = v.set('data',list);
        return fv
    });
    resolve(result.toJS());
});

const spliceByWeek = (data) => new Promise((resolve, rject) => {
  const allWeek = [[],[],[],[],[],[],[]];
  
  const weekArray = data.forEach( item => {
    const ctime = item.createTime;
    const ct = new Date(ctime * 1000);
    const week = ct.getDay();
    allWeek[week].push(item);
  })

  resolve(allWeek);

});

const spliceByHour = (data) => new Promise((resolve, rject) => {
  const allHours = [];
  for(let i = 0; i < 24; i++) {
    allHours.push([])
  }
  
  const weekArray = data.forEach( item => {
    const ctime = item.createTime;
    const ct = new Date(ctime * 1000);
    const week = ct.getHours();
    allHours[week].push(item);
  })

  resolve(allHours);

});

// 根据创建时间祛除重复项
const unque = (array, name) => {
  if(array&&array.length > 0) {
    const r = array.sort((a,b) => {
      return a.createTime - b.createTime;
    });
    const res = [r[0]];
    for (let i = 0;i < r.length; i++) {
      let j = i+1;
      if( j< r.length) {
        if( r[j].name !== r[i].name) {
          res.push(r[i]);
        }
      }
    }
    return res;
  } else {
    return [];
  }
};

export default {
    spliceByTheme,
    sumByName,
    averageByName,
  spliceByWeek,
  spliceByHour,
  unque
}
