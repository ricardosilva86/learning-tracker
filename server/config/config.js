const passwd = process.env.MONGO_PASSWD;

module.exports = {
	mongoConnectionString: `mongodb://admin:${passwd}@ds131743.mlab.com:31743/learning-tracker`
};