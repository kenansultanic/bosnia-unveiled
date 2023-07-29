import { Pool, PoolConfig } from "pg";

const config: PoolConfig = {
    user: 'doypquff',
    database: 'doypquff',
    password: 'postgres://doypquff:PdeUDsuxhuH5IXj8anHbvjaspu298jh6@trumpet.db.elephantsql.com/doypquff',
    host: 'trumpet.db.elephantsql.com',
    port: 5432,
    max: 100,
    idleTimeoutMillis: 30000,
};

const pool: Pool = new Pool(config);
export default pool;
