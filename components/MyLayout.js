/**
 * Created by zhangyuan on 2018/1/25.
 */
// import Header from './Header'

import NavMenu from './NavMenu'

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD'
};

export default (props) => (
    <div style={layoutStyle}>
        <NavMenu />
        {props.children}
    </div>
)


