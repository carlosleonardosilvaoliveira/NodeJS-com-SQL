module.exports = {
    HOST: "DESKTOP-5PCEINU",
    PORT: "1433",
    USER: "leonardo",
    PASSWORD: "leo123456",
    DB: "estudo",
    dialect: "mssql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};