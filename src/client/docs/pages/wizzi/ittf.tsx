import React from 'react';
import DocsMarkdown from '../../DocsMarkdown';
const content = require('./ittf.md');
const title = 'Ittf';

type Props = {
    location: any;
};

function Page(props: Props) {
    return (
        <DocsMarkdown 
            title={title}
            content={content}
            location={props.location}
        >
        </DocsMarkdown>
    )
}

export default Page;