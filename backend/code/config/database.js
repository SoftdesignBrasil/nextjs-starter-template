
module.exports = {
    "development": {
      "username": process.env.POC_NEXTJS_DB_USERNAME || "root",
      "password": process.env.POC_NEXTJS_DB_PASSWORD || "1q2w3e4r",
      "database": process.env.POC_NEXTJS_DB_NAME || "nextjs",
      "host": process.env.POC_NEXTJS_DB_HOSTNAME || "localhost",
      "port": process.env.POC_NEXTJS_DB_HOSTPORT || 3306,
      "dialect": "mysql",
      "pool": {
        "max": 5,
        "min": 0,
        "acquire": 30000,
        "idle": 10000
      },
      "operatorsAliases": "false",
      "seederStorage": "sequelize"
    },
    "production": {
      "username": process.env.POC_NEXTJS_DB_USERNAME || "root",
      "password": process.env.POC_NEXTJS_DB_PASSWORD || "1q2w3e4r",
      "database": process.env.POC_NEXTJS_DB_NAME || "nextjs",
      "host": process.env.POC_NEXTJS_DB_HOSTNAME || "localhost",
      "port": process.env.POC_NEXTJS_DB_HOSTPORT || 3306,
      "dialect": "mysql",
      "pool": {
        "max": 5,
        "min": 0,
        "acquire": 30000,
        "idle": 10000
      },
      "operatorsAliases": "false",
      "seederStorage": "sequelize"
    }
};

