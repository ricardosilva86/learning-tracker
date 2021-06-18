const mongoServer = process.env.MONGO_DB_URL; //ds131743.mlab.com:31743
const mongoDbName = process.env.MONGO_DB_NAME; //learning-tracker
const mongoDbUser = process.env.MONGO_DB_USER; //admin
const mongoDBpass = process.env.MONGO_PASSWD;
//const passwdAtlas = process.env.MONGO_PASSWD_ATLAS;

module.exports = {
	//mongoConnectionString: `mongodb://${mongoDbUser}:${mongoDBpass}@${mongoServer}/${mongoDbName}`
	mongoConnectionString: `mongodb+srv://${mongoDbUser}:${mongoDBpass}@${mongoDbName}.${mongoServer}/${mongoDbName}?retryWrites=true&w=majority`
};
