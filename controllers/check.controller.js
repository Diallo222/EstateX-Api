import jwt from "jsonwebtoken";

export const shouldBeLoggedIn = async (req, res) => {
    res.status(200).json({message: "You are authenticated" });
};

export const shouldBeAdmin = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload ) => {
        if (err) return res.status(403).json({ message: "invalid token" });
        if (!payload.isAdmin) return res.status(403).json({ message: "Unauthorized" });
        res.status(200).json({message: "You are authenticated", payload });
    });
}