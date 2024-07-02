function Logout(req, res) {
    // const isLoggedIn = req.signedCookies.loggedIn;
    const isLoggedIn = req.session.user.visited

    if (!isLoggedIn) {
        return res.status(404).json({ message: "Not Logged in!" });
    }

    res.cookie("loggedIn", "false", { maxAge: 0, signed: true, secure: true, httpOnly: true })

    return res.status(200).json({ message: "Logged out!" });
}

export default Logout;
