import React from 'react';
import fetch from 'isomorphic-unfetch'

const Mcom = ({data}) => (
    <div>
        {data}
        hddd
    </div>
);
Mcom.getInitialProps = async ({req}) => {
    const res = await fetch('https://api.github.com/repos/zeit/next.js');
    const json = await res.json();
    return {data: sjon.stargazers_count};
};
export default Mcom;

// class Mcom extends React.Component {
//     static async getInitialProps({ req }) {
//         if( req ) {
//             console.log('server end');
//         }else {
//             console.log('front end');
//         }
//         const res = await fetch('http://localhost:3000/aaa');
//         const data = await res.json();
//         console.log('get data ',data);
//         return {
//             data:data,
//             name: 'name'
//         }
//     }
//
//     render() {
//         console.log('render');
//         return (
//             <div>
//                 Hello World {this.props.data}
//                 Hello World {this.props.name}
//             </div>
//         )
//     }
// }
//
// export default Mcom;