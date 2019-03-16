export async function callApi(method: string, url: string, path: string, data?: any) {
    console.log('callApi', method, url, path, data);
    console.log('url', `${url}/${path}`);
    const res = await fetch(`${url}/${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await res.json();
}

