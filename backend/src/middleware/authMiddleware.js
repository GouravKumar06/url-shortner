import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
    try{
        const accessToken = req.headers.authorization.split(" ")[1];
        if (!accessToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(
          accessToken,
          process.env.ACCESS_TOKEN_SECRET
        );

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = decoded;
        next();
    }catch(err){
        console.log(err);
        return res.status(401).json({message: "Unauthorized"});
    }
}