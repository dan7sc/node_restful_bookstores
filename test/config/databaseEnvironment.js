import Sequelize from 'sequelize';
import path from 'path';
import { importModel, associateModels, readContentDirectory } from '../../utils/utils';
import NodeEnvironment from 'jest-environment-node';

export default class DatabaseEnvironment extends NodeEnvironment {
    async setup() {
        if (!this.global.appClient) {
            this.global.appClient = await new Sequelize(
                process.env.DATABASE,
                process.env.USERNAME,
                process.env.PASSWORD,
                {
                    host: process.env.HOST,
                    dialect: process.env.DIALECT,
                    pool: {
                        max: 5,
                        min: 0,
                        acquire: 30000,
                        idle: 10000
                    },
                    logging:false
                }
            );

            await this.global.appClient.authenticate()
                .then(async () => {
                    const dir = path.join(__dirname, '../../src/','models');
                    const contentDir = await readContentDirectory(dir);
                    const models = await importModel(this.global.appClient, contentDir, dir);
                    this.global.appClient.models = models;
                    await associateModels(this.global.appClient);
                    await this.global.appClient.sync();
                })
                .catch(error => {
                    console.log(`Unable to connect to the database: ${error}`);
                    process.exit(1);
                });

            await super.setup();
        }
    }

    async teardrown() {
        await super.teardown();
    }

    async runScript() {
        await super.runScript(script);
    }
}
