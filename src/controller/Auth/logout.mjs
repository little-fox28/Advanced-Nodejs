function Logout(req, res) {
    const isLoggedIn = req.isAuthenticated()

    if (!isLoggedIn) {
        return res.status(404).json({message: "Not Logged in!"});
    }

    req.logOut((error) => {
        if (error) {
            return res.status(401).json({ message: error });
        }
        return res.status(200).json({ message: "Logged out!" });
    });
}

export default Logout;
