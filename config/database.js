module.exports = {
  dbPool: {
    user: process.env.USERDB,
    password: process.env.PASSWORD,
    //connectString: process.env.DB || "200.55.244.26:1521/LIQUID",
    //connectString: process.env.DB || "trancas.ddns.net:1521/LIQUID",
    //connectString: process.env.DB || "www.serverdesa.duckdns.org:1521/orcl",
    //connectString: process.env.DB || "localhost:1521/orcl",
    connectionString : process.env.CONNECTIONSTRING,
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0,
    poolTimeout: 0
  },
  jwtSecretKey: "SueldosMuni098Burru"
};