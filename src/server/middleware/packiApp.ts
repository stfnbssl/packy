import * as path from 'path';
import * as parseUrl from 'parseurl';
import { Application, Request, Response, static as expressStatic } from 'express';
import { MiddlewareType } from '../features/app/types';

export const PackiAppMiddleware: MiddlewareType = (app: Application) => {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
        app.use('/dist', expressStatic(path.resolve(__dirname, '..', '..', '..', 'packi', 'dist')));
    } else {
        const webpack = require('webpack');
        const webpackDevMiddleware = require('webpack-dev-middleware');
        const config = require('../../../webpack.config');
        const compiler = webpack(config);
        app.use(webpackDevMiddleware(compiler, {
          publicPath: '/dist'
        }));
    }
}
