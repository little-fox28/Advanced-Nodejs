function Logout(req, res) {
    if (!req.isAuthenticated()) {
        return res.status(401).json({message: "Not Logged in!"});
    }

    return req.logout((err) => {
        if (err) {
            return res.status(500).json({message: 'Logout failed'});
        }
        return res.json({message: 'Logout successful'});
    });
}

export default Logout;
