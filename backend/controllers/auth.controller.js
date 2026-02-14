import axios from "axios"
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../config/config.js"
import { generateCryptoString } from "../utils/generateCrypto.js"


// Github
export const github_oauth = (_req, res) => {
    const redirectUrl = "http://localhost:4001/api/auth/github/callback"
    const state = generateCryptoString();
    res.cookie('oauth_state', state, { httpOnly: true, secure: false });

    const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirectUrl}&scope=user:email&state=${state}`;

    res.redirect(url);
}
// Github callback
export const github_oauth_callback = async (req, res) => {
    const { code, state } = req.query;
    const savedState = req.cookies.oauth_state;

    if (!state || state !== savedState) {
        return res.status(403).json({
            success: false,
            message: "Invalid state: Possible CSRF attack."
        });
    }

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

        res.clearCookie('oauth_state');

        console.log("✅ GirHub usr:", {
            name: userRes.data.name,
            email
        });

        res.redirect("http://localhost:3000/success");

    } catch (error) {
        console.log("An error from tokenRes", error)
        res.send("Github, Login Failed")
    }


}

// Google
export const google_oauth = (req, res) => {

    const redirectUrl = "http://localhost:4001/api/auth/google/callback"

    const state = generateCryptoString();
    console.log("State from crypto: ", state);

    res.cookie('oauth_state', state, { httpOnly: true, secure: false });

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${redirectUrl}&response_type=code&scope=email profile&state=${state}&access_type=offline&prompt=consent`;

    res.redirect(url);
}

// Google oauth callback
export const google_oauth_callback = async (req, res) => {
    const { code, state } = req.query;
    const savedState = req.cookies.oauth_state;
    console.log("State from the req.query; ", state);
    console.log("savedState from the req.cookie; ", savedState);
    const redirectUrl = "http://localhost:4001/api/auth/google/callback"

    if (!state || state !== savedState) {
        return res.status(403).json({
            success: false,
            message: "Invalid state: Possible CSRF attack."
        });
    }

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

        res.clearCookie('oauth_state');

        console.log("google, User", {
            name: profileRes.data.name,
            email: profileRes.data.email
        });

        res.redirect("http://localhost:3000/success");

    } catch (error) {
        console.log("Error from /auth/google/callback", error)
        res.send("Google, Login Failed")
    }
}