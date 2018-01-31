import Link from 'next/link'
const linkStyle = {
    marginRight: 15
};

const box = {
    height: '50px',
    width:'100%',
    display:'flex',
    flexDirection: 'cloumn',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: '#04477C'
};
const item = {
    color: '#049FF1',
    fontSize: '30px',
};
export default () => (
    <div style={box}>
        <div style={item}>叭叭数据</div>
        <style jsx global>{`
    @font-face {font-family: "iconfont";
    src: url(/static/font/iconfont.eot?t=1517360142452); /* IE9*/
    src: url(/static/font/iconfont.eot?t=1517360142452#iefix) format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAU8AAsAAAAAB9AAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFZW7kfzY21hcAAAAYAAAABdAAABhplcBr5nbHlmAAAB4AAAAW8AAAG4OuMLjWhlYWQAAANQAAAALwAAADYQTa4ZaGhlYQAAA4AAAAAcAAAAJAfeA4RobXR4AAADnAAAAAwAAAAMC+kAAGxvY2EAAAOoAAAACAAAAAgAdgDcbWF4cAAAA7AAAAAfAAAAIAESAF1uYW1lAAAD0AAAAUUAAAJtPlT+fXBvc3QAAAUYAAAAJAAAADXX5FB7eJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2Bk/sE4gYGVgYOpk+kMAwNDP4RmfM1gxMjBwMDEwMrMgBUEpLmmMDgwVDzjZG7438AQw9zA0AAUZgTJAQAkBwx1eJzFkMENgDAMAy9tqVTEIDwYiBdzdOKuUUwoDyaoJceKYylRgAWI4iEmsAvjwSnX3I+s7ifPZKkRqK30rv5TRTTLrkElMw02b/Ufm9d9dPoKdVAntvKScANkFwuzAAAAeJw9j7tOwzAUhn1skqY3hzjXJr3k0tagQiXSEAZE6cBSxIDExAYPAANLF4YsSAwMPANC4iU69FGK4AnYG3BQwTo+/3ds/9Y5SELo+53MiYN0tIX20Ak6RwjkAYQUtyDgyRAPwAwk0zYo4REPSlE4JEdgh7JhxWnSt+WSrAKFNoyCOOVDzGE/GeNDiK0WQMNzL1ivycgzVBzefshP8QuYnaipjnfz6c6xEfu6Mqsx1mDsSZElScF4Q6VwY1tlqVyR81dJdc15Zxt3oNbg7tll3ffY9WNy2+rZZYAsA93z6dux5moi7l1LZ43SZl1x3HrUNWD2WXX0Wqv/gcQiYtYFycgEVZEtJkUQhP0kFX1bhtyLCi7aNmQptkytDfZIS9IC/3UMB2ukUAqGwEVFrlYTyhjFC5HzryLTX7yjDLrehDVZJvbE64IQmKZ5lk6B4eJwfSdiwWjuiyfYL/yr5Z+KH2BZYO4Ll3AXFUI/XJVIhQB4nGNgZGBgAGI9B9aT8fw2Xxm4WRhA4Np0Uz4E/f8ACwOzA5DLwcAEEgUA7Y4IXQB4nGNgZGBgbvjfwBDDwgACQJKRARUwAwBHCQJsBAAAAAPpAAAEAAAAAAAAAAB2ANx4nGNgZGBgYGYIZGBlAAEmIOYCQgaG/2A+AwAQ9wFwAHicZY9NTsMwEIVf+gekEqqoYIfkBWIBKP0Rq25YVGr3XXTfpk6bKokjx63UA3AejsAJOALcgDvwSCebNpbH37x5Y08A3OAHHo7fLfeRPVwyO3INF7gXrlN/EG6QX4SbaONVuEX9TdjHM6bCbXRheYPXuGL2hHdhDx18CNdwjU/hOvUv4Qb5W7iJO/wKt9Dx6sI+5l5XuI1HL/bHVi+cXqnlQcWhySKTOb+CmV7vkoWt0uqca1vEJlODoF9JU51pW91T7NdD5yIVWZOqCas6SYzKrdnq0AUb5/JRrxeJHoQm5Vhj/rbGAo5xBYUlDowxQhhkiMro6DtVZvSvsUPCXntWPc3ndFsU1P9zhQEC9M9cU7qy0nk6T4E9XxtSdXQrbsuelDSRXs1JErJCXta2VELqATZlV44RelzRiT8oZ0j/AAlabsgAAAB4nGNgYoAALgbsgJmRiZGZkYWBsYK9OCMxLzmjlIEBABo+A4Y=') format('woff'),
    url(/static/font/iconfont.ttf?t=1517360142452) format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
    url(/static/font/iconfont.svg?t=1517360142452#iconfont) format('svg'); /* iOS 4.1- */
    }
    `}
        </style>
    </div>
)
