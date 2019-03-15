'use strict';
class GreetingScriptFile extends React.Component {
	constructor() {
		super();
	}
	render() {
		return  (
                <p>
                Hello world from pure js file, tag=script, type=text/babel
                </p>
            )
		;
	}
}
ReactDOM.render(
    <GreetingScriptFile>
    </GreetingScriptFile>
, document.getElementById('sample-js-script-file'));
