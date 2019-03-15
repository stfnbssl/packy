import { Response } from 'express';

export const sendFailure = (res: Response, error:any, status: number) =>
{
    res.status(error && error.status ? error.status : status);
    res.type('application/json')
    res.send(error);
}

export const sendSuccess = (res: Response, message:any) =>
{
    res.status(200);
    res.type('application/json')
    res.send(message);
}

export function sendPromiseResult<T>(res: Response, message: Promise<T>) {
    message.then((result: T) => {
        // console.log('sendPromiseResult.ok', result);
        sendSuccess(res, result);
    }).catch((err: any)=>{
        console.log('sendPromiseResult.err', err);
        sendFailure(res, err, 500);
    });
}

export function sendPromiseLikeResult<T>(res: Response, message: PromiseLike<T>) {
    message.then((result: T) => {
        // console.log('sendPromiseLikeResult.ok', result);
        sendSuccess(res, result);
    });
}

