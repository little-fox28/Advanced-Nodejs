function Authenticate(req, res, next) {
    // const isAuthenticate = req.signedCookies.loggedIn
    const isAuthenticate = req.session.user

    if (isAuthenticate) {
        return next()
    } else {
        return res.status(401).json({message: 'Unauthorized'});
    }
}

export default Authenticate;