import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {useAuth} from "@/components/auth-provider.jsx";

export function LoginComponent({ setShowLogin }) {
    const [googleLoaded, setGoogleLoaded] = useState(false);
    const { updateUser } = useAuth();
    // Dynamically load Google Identity Services API
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => setGoogleLoaded(true);
        document.body.appendChild(script);

        return () => document.body.removeChild(script);
    }, []);

    // Google Login
    const handleGoogleLogin = () => {
        if (!googleLoaded || !window.google) {
            console.error("Google API not loaded yet");
            return;
        }

        google.accounts.id.initialize({
            client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace with your Google client ID
            callback: handleGoogleResponse,
        });

        google.accounts.id.prompt(); // Show the One Tap / login popup
    };

    const handleGoogleResponse = (response) => {
        const jwt = response.credential;
        // Send JWT to your backend for verification and to get user info
        fetch("/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: jwt }),
        })
            .then((res) => res.json())
            .then((userData) => {
                //user data maybe needs processing
                updateUser(userData);
                setShowLogin(false);
            })
            .catch((err) => console.error("Google login error:", err));
    };

    // GitHub Login
    const handleGitHubLogin = () => {
        // Redirect to backend GitHub OAuth endpoint
        // Your backend handles GitHub OAuth2 flow
        window.location.href = "/api/auth";
    };

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>Choose a login method below</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleGitHubLogin}
                >
                    Login with GitHub
                </Button>
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogleLogin}
                >
                    Login with Google
                </Button>
            </CardContent>
            <CardFooter>
                <Button variant="link" onClick={() => console.log("Redirect to Sign Up")}>
                    Sign Up
                </Button>
            </CardFooter>
        </Card>
    );
}