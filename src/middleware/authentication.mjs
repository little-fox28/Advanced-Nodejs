function Authenticate(req, res, next) {
    const isAuthenticated = req.isAuthenticated()

    if (!isAuthenticated) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    return next()
}

export default Authenticate;