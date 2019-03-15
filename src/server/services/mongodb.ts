import * as mongoose from 'mongoose';
import { ModelBuilderType } from '../features/app';
import { ConfigType } from '../features/config';

export default function start(config: ConfigType, modelBuilders: ModelBuilderType[]) {
    const {
        mongoUser,
        mongoPassword,
        mongoPath,
    } = config;
    const connectUrl = `mongodb://${mongoUser}:${mongoPassword}${mongoPath}`;
    console.log('Connecting to ', mongoPath)
    mongoose.connect(connectUrl, { useNewUrlParser: true });
    modelBuilders.forEach((builder) =>{
        builder.buildModel();
    })
}

export const close = () => {
    mongoose.connection.close();
}
  