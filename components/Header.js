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
    </div>
)
