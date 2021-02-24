function list(req, res, next) {
	console.log('api list');
	return res.status(200).send({ success: true });
}

module.exports = {
	list: list
};
