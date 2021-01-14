import fetch from 'node-fetch';
import { config } from '../config';

export function getManagementApiToken() : Promise<any> {
    return getApiToken(`https://${config.Auth0Domain}/api/v2/`);
}

export function getPackiApiToken() : Promise<any> {
    return getApiToken(config.Auth0PackiApiId);
}

export function getApiToken(audience: string) : Promise<any> {
    // from https://manage.auth0.com/#/applications/awRaG0ilBVlaHQ2xK5JgehLjkBzLNthp/quickstart
    // see also https://auth0.com/docs/api/management/v2/get-access-tokens-for-production
    return fetch(`https://${config.Auth0Domain}/oauth/token`,
    {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            client_id : config.Auth0PackiBackendAppId,
            client_secret: config.Auth0PackiBackendAppSecret,
            audience: audience,
            grant_type: "client_credentials"  
        })
    })
    .then(response=>response.json())
    .then((responseData) => {
        console.log('getApiToken.audience', audience, 'responseData',  responseData);
        return responseData;
    })
}

export async function getUsers() : Promise<any> {
    return getManagementApiToken().then(async (data: any) => {
        return fetch(`https://${config.Auth0Domain}/api/v2/users`, getOptions(data.access_token))
            .then((response) => response.json())
            .then((responseData) => {
            console.log(responseData);
            return responseData;
        });
    });
}

export async function getUser(userId: string) : Promise<any> {
    return getManagementApiToken().then(async (data: any) => {
        return fetch(`https://${config.Auth0Domain}/api/v2/users/${userId}`, getOptions(data.access_token))
            .then((response) => response.json())
            .then((responseData) => {
                console.log('getUser.userId', userId, 'responseData',  responseData);
                return responseData;
        });
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
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken,
    }
}