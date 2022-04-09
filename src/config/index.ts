import "dotenv/config"

const db = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.DB_SYNCHRONIZE === "true",
    logging: process.env.DB_LOGGING === "true",
    redisURL: process.env.REDISCLOUD_URL
}

const server = {
    port: process.env.SERVER_PORT,
    jwtSecret: process.env.JWT_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
    isProduction: process.env.NODE_ENV === "production",
}

export const config = {
    db,
    server
}

