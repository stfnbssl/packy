import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as socketio from 'socket.io';
import { ConfigType } from './features/config';
import { AppInitializerType } from './features/app/types';

class App {
    public app: express.Application;
    public config: ConfigType;
    public port: number;
    public server: any;
 
    constructor(initValues: AppInitializerType) {
        this.config = initValues.config;
        this.port = this.config.port;
        this.app = express();
        this.server = http.createServer(this.app);
        this.app.use(cors())
        this.app.use(bodyParser.json())
        initValues.middlewares.forEach((middleware) => {
            middleware(this.app);
        });
        initValues.controllers.forEach((controller) => {
            console.log('installing router on path: ', controller.path);
            controller.initialize(initValues);
            this.app.use('/', controller.router);
        });
        // Connecting sockets to the server and adding them to the request
        // so that we can access them later in the controller
        const io = socketio(this.server);
        io.set('transports', [
            'websocket', 
            'polling'
        ]);
        this.app.set('io', io);
        // Catch a start up request so that a sleepy server instance (p.e. Heroku) can
        // be responsive as soon as possible
        this.app.get('/wake-up', (req, res) =>
            res.send('👍'));
    }
 
    public listen() {
        this.server.listen(this.port, () => {
            console.log(`App listening at http://localhost:${this.port}`);
        });
        /* no socket
        this.app.listen(this.port, () => {
            console.log(`App listening at http://localhost:${this.port}`);
        }); */
    }
}
export default App;