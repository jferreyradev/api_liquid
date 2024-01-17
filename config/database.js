module.exports = {
  dbPool: {
    user: "US_SUELDO",
    password: "usuario",
    connectString: process.env.DB || "localhost:1521/LIQUID",
    //connectString: process.env.DB || "trancas.ddns.net:1521/LIQUID",
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0,
    poolTimeout: 0
  },
  jwtSecretKey: "SueldosMuni098Burru"
};