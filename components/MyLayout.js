/**
 * Created by zhangyuan on 2018/1/25.
 */
import Header from './Header'

import NavMenu from './NavMenu'

const layoutStyle = {
    background: '#D1F0EF',
    margin: '-8px'
};

const centerStyle = {
    display:'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'start',
};

export default (props) => (
    <div style={layoutStyle}>
        <Header />
        <div style={centerStyle}>
            <NavMenu/>
            {props.children}
        </div>
    </div>
)


