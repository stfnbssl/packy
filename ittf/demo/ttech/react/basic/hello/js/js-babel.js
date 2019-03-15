'use strict';
class GreetingScriptFile extends React.Component {
	constructor() {
		super();
	}
	render() {
		return  (
                <p>
                Hello world from pure js file, tag=js-babel
                </p>
            )
		;
	}
}
ReactDOM.render(
    <GreetingScriptFile>
    </GreetingScriptFile>
, document.getElementById('sample-js-script-file-tag-js-babel'));
