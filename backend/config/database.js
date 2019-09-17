const dbUser = "Esteban";
const dbPassword = "Esteban211997";
const dbDatabase = "nlpf";
const dbHost = "localhost";
const dbPORT = "27017";
const mongoURI = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPORT}/${dbDatabase}`;

module.exports =  {
    'host': dbHost,
    'user': dbUser,
    'password':dbPassword,
    'port' : dbPORT,
    'database' : dbDatabase,
    'mongoUri' : mongoURI
};