function Authenticate(req, res, next) {
    const isAuthenticate = req.signedCookies.loggedIn

    if (isAuthenticate === 'true') {
        return next()
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

export default Authenticate;