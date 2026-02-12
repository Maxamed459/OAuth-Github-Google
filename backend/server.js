import express from "express"
import dotenv from "dotenv"
import axios from "axios"

dotenv.config()

const PORT = process.env.PORT || 4001;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const app = express();

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Hello, the server is running successfully!"
    })
})

// Github
app.get("/auth/github", (_req, res) => {
    const redirectUrl = "http://localhost:4001/auth/github/callback"

    const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirectUrl}&scope=user:email`;

    res.redirect(url);
});

app.get("/auth/github/callback", async (req, res) => {
    const code = req.query.code;

    try {

        const tokenRes = await axios.post(
            "https://github.com/login/oauth/access_token",
            {
                client_id: GITHUB_CLIENT_ID,
                client_secret: GITHUB_CLIENT_SECRET,
                code,
            },
            {
                headers: {
                    Accept: "application/json"
                }
            }
        );
        const accessToken = tokenRes.data.access_token;

        const userRes = await axios.get("https://api.github.com/user", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });


        const emailRes = await axios.get("https://api.github.com/user/emails", {
            headers: { Authorization: `Bearer ${accessToken}` }
        });


        const email = emailRes.data.find((e) => e.primary && e.verified)?.email;

        console.log("✅ GirHub usr:", {
            name: userRes.data.name,
            email
        });

        res.redirect("http://localhost:3000/success");

    } catch (error) {
        console.log("An error from tokenRes", error)
        res.send("Github, Login Failed")
    }


});

// Google
app.get("/auth/google", (req, res) => {

    const redirectUrl = "http://localhost:4001/auth/google/callback"

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${redirectUrl}&response_type=code&scope=email profile&access_type=offline&prompt=consent`;

    res.redirect(url);
});

app.get("/auth/google/callback", async (req, res) => {
    const code = req.query.code;
    const redirectUrl = "http://localhost:4001/auth/google/callback"

    try {

        const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            code,
            redirect_uri: redirectUrl,
            grant_type: "authorization_code"
        });

        const accessToken = tokenRes.data.access_token;

        const profileRes = await axios.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        );

        // console.log("User Profile", profileRes)

        console.log("google, User", {
            name: profileRes.data.name,
            email: profileRes.data.email
        });

        res.redirect("http://localhost:3000/success");

    } catch (error) {
        console.log("Error from /auth/google/callback", error)
        res.send("Google, Login Failed")
    }
});

app.listen(PORT, () => {
    console.log(`app is running on port http://localhost:${PORT}`);
})