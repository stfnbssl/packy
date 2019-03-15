import * as path from 'path'
import * as wizzi from 'wizzi'
import { ConfigType } from '../../features/config';
import wizzifile from './wizzifile';

export default async function start(config: ConfigType): Promise<void> {
    return new Promise((resolve, reject)=>{
        console.log('wizzifile', wizzifile);
        wizzi.startRunnerServer({
            cwd: __dirname,
            userid: 'stefi',
            role: 'admin',
            wizzifile: wizzifile
        }, function(err) {
            if (err) { return reject(err); }
            resolve();
        });
    })
} 

