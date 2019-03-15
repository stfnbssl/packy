import fetch from 'node-fetch';

export async function getRepositories(accessToken: string) : Promise<any> {
    return fetch(`https://api.github.com/user/repos`, getOptions(accessToken))
        .then((response) => response.json())
        .then((responseData) => {
            console.log('getRepositories.responseData',  responseData);
            return responseData;
    });
}

function getOptions(accessToken: string) {
    return {
        method: 'GET',
        headers: headers(accessToken)
    }
}

function postOptions(accessToken: string) {
    return {
        method: 'POST',
        headers: headers(accessToken)
    }
}

function headers(accessToken: string) {
    return {
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Authorization': 'token ' + accessToken,
    }
}