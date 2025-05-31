const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let token = req.cookies.token;

    if (!token) return res.redirect('/login');
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.clearCookie("token",{
                httpOnly: true
            });
            console.log(err);
        //  return res.redirect('/login');
    }

}
module.exports = { verifyToken };