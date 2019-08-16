const passwd = process.env.MONGO_PASSWD;
const passwdAtlas = process.env.MONGO_PASSWD_ATLAS;

module.exports = {
	//mongoConnectionString: `mongodb+srv://admin:${passwdAtlas}@learning-tracker-7puau.gcp.mongodb.net/test?retryWrites=true&w=majority`
	mongoConnectionString: `mongodb://admin:${passwd}@ds131743.mlab.com:31743/learning-tracker`
};
