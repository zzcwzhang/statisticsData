import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import React from 'react';
import Show from '../components/Show';

class Index extends React.Component {
    static async getInitialProps({req}) {
        const a = await fetch('http://localhost:3000/data/tygp');
        const aj = await a.json();
        return {
            data:aj
        }
    }

    render() {
        const { data } = this.props;
        return (
            <div>
                <Show data={data} />
            </div>
        )
    }
}

export default Index