import React from 'react';
import DocsMarkdown from '../../DocsMarkdown';
const content = require('./jobs.md');
const title = 'Wizzi jobs';

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