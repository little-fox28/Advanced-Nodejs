function Logout(req, res) {
    // const isLoggedIn = req.signedCookies.loggedIn;
    const isLoggedIn = req.user && req.session.user.visited;

    if (!isLoggedIn) {
        return res.status(404).json({ message: "Not Logged in!" });
    }

    // req.session.destroy((error) => {
    //     if (error) {
    //         return res.status(401).json({ message: error });
    //     }
    // });
    // res.cookie("loggedIn", "false", { maxAge: 0, signed: true, secure: true, httpOnly: true })

    // return res.status(200).json({ message: "Logged out!" });

    req.logout((error) => {
        if (error) {
            return res.status(401).json({ message: error });
        }
        return res.status(200).json({ message: "Logged out!" });
    });
}

export default Logout;
