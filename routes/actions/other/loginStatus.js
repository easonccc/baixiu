module.exports = async (req, res) => {
	if (req.session && req.session.userInfo) {
		res.send('var isLogin = true')
	}else {
		res.send('var isLogin = false')
	}
};
