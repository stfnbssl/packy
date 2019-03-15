import { Application, Request, Response, RequestHandler } from 'express';
import * as jwt from 'express-jwt';
//TODO (missing @types/ declaration) import * as jwtAuthz from 'express-jwt-authz';
import * as jwksRsa from 'jwks-rsa';
import { MiddlewareType } from '../features/app/types';
import { config } from '../features/config';

export const checkJwt = jwt({
    // Dynamically provide a signing key based on the kid in the header and the singing keys 
    // provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.Auth0Domain}/.well-known/jwks.json`
    }),
    // Validate the audience and the issuer.
    audience: config.Auth0PackyApiId,
    issuer: `https://${config.Auth0Domain}/`,
    algorithms: ['RS256']
});

export const checkScopes = (scopes: string[]) => jwtAuthz(scopes);

export const Auth0Middleware: MiddlewareType = (app: Application) => {
    app.use(checkJwt);
}

// included module express-jwt-authz missing @types/ declaration
const jwtAuthz = (expectedScopes: string[], options?: any) => {
  if (!Array.isArray(expectedScopes)) {
    throw new Error(
      'Parameter expectedScopes must be an array of strings representing the scopes for the endpoint(s)'
    );
  }

  return (req: Request, res: Response, next: Function) => {
    const error = (res: Response) => {
      const err_message = 'Insufficient scope';

      if (options && options.failWithError) {
        return next({
          statusCode: 403,
          error: 'Forbidden',
          message: err_message
        });
      }

      res.append(
        'WWW-Authenticate',
        `Bearer scope="${expectedScopes.join(' ')}", error="${err_message}"`
      );
      res.status(403).send(err_message);
    };

    if (expectedScopes.length === 0) {
      return next();
    }
    if (!req.user || typeof req.user.scope !== 'string') {
      return error(res);
    }
    const scopes = req.user.scope.split(' ');
    const allowed = expectedScopes.some(scope => scopes.includes(scope));

    return allowed ? next() : error(res);
  };
};