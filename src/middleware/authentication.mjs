function Authenticate(req, res, next) {
    // const isAuthenticate = req.signedCookies.loggedIn
    const isAuthenticate = req.user

    if (!isAuthenticate) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    return next()
}

export default Authenticate;