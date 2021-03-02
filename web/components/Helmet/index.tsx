import React from 'react'
import { Helmet } from 'react-helmet'
interface IHProps {
    title?: string
    iconHref?: string
}
const Head = (props: IHProps) => (
    <Helmet>
        <title>{props.title}</title>
        <link rel="canonical" href={props.iconHref} />
    </Helmet>)
export default Head
