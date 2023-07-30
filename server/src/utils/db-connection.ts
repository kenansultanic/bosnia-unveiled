import { config } from "dotenv";
import { Sequelize } from "sequelize";
import { UserMap } from "../models";

config();

const sequelize = new Sequelize(process.env.DB_URI!, { logging: false });

const connect = async () => {
    try {
        await sequelize.authenticate();
        await UserMap(sequelize);
        console.info('Connected to database');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default connect;