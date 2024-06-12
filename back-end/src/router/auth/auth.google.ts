import { Router } from "express";
import passport from "../../lib/passport";
import { read } from "fs";

const CLIENT_URL = "http://localhost:3000/auth/login";
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || "";
const router = Router();
console.log(GOOGLE_CALLBACK_URL);


router.get("/login/success", (req, res) => {
    res.status(200).json({
        success: true,
        message: "successful",
        data: req.user,
        //cookies: req.cookies,
    });
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});

router.get("/logout", (req: any, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
});

router.get(
    "/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login/failed" }), (req, res) => {
    const user = req.user as any; // Adjust the type as per your user type
    const userData = encodeURIComponent(JSON.stringify(user));
    res.redirect(`${process.env.GOOGLE_CALLBACK_URL}?user=${userData}`);
});

/*router.get("/google/callback", passport.authenticate("google"), (req, res) => {
    console.log("đây là req.user:");
    
    console.log(req.user);
    //res.redirect(GOOGLE_CALLBACK_URL);
    res.json(req.user);
});*/

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    res.send("This is the callback route");
});


export default router;

