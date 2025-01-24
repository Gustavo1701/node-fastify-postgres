import pg from 'pg';
const { Pool } = pg;

export const pool = new Pool({
    user: 'neondb_owner',
    password: 'npg_3Ifv6DJZlXzY',
    host: 'ep-still-snowflake-a5ncrhlo-pooler.us-east-2.aws.neon.tech',
    port: '5432',
    database: 'neondb',
    ssl: {
        rejectUnauthorized: false,
    },
});
