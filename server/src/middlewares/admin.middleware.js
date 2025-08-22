// Allways place this middleware after the user middleware
const admin = async (req, res, next) => {
	try {
		if (!req.user.isAdmin) {
			res.status(401);
			throw new Error("User is not authorized to perform this action");
		}
	} catch (err) {
		res.status(403).json({ error: err.message });
		return;
	}
	next();
};

module.exports = admin;
