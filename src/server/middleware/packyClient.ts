import * as path from 'path';
import * as parseUrl from 'parseurl';
import { Application, Request, Response, static as expressStatic } from 'express';
import { MiddlewareType } from '../features/app/types';

export const PackyClientMiddleware: MiddlewareType = (app: Application) => {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
        app.use('/dist', expressStatic(path.resolve(__dirname, '..', '..', '..', 'packy', 'dist')));
    } else {
        app.use((req: Request, res: Response, next) => {
            const webpack = require('webpack');
            const dev = require('webpack-dev-middleware');
            const config = require('../../webpack.config');
            
            const compiler = webpack(config);
            const middleware = dev(compiler, {
                publicPath: '/dist/',
                stats: 'minimal',
            });
            // Use webpack dev middleware in development
            app.use(async (ctx, next) => {
              await middleware(
                req,
                {
                  end: (content: string) => {
                    res.end(content);
                  },
                  setHeader: (name: string, value: string) => {
                    res.setHeader(name, value);
                  },
                },
                next
              );
            });
        });
    }
}
