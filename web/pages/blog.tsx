import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
class Blog extends Component {
    private historyPush() {
        const { push } = Router
        push('/')
    }
    render() {
        return <div>
            <button>
                <Link href="/"><a >页面跳转</a></Link>
            </button>
            <button onClick={this.historyPush}>
                跳转
            </button>
        </div>
    }
}

export default Blog