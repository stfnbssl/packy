import React from 'react';
import DocsMarkdown from '../../DocsMarkdown';
const content = require('./firstpacki.md');
const title = 'First Packi';

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