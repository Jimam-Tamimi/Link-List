// app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import AppleProvider from 'next-auth/providers/apple';
import axios from 'axios';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile: (profile) => ({
                id: profile.sub, // Use 'sub' as the unique ID
                name: profile.name,
                email: profile.email,
                image: profile.picture,
            }),
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_APP_ID!,
            clientSecret: process.env.FACEBOOK_APP_SECRET!,
            profile: (profile) => ({
                id: profile.id,
                name: profile.name,
                email: profile.email,
                image: profile.picture.data.url,  // Facebook image URL
            }),
        }),
        AppleProvider({
            clientId: process.env.APPLE_CLIENT_ID!,
            clientSecret: process.env.APPLE_CLIENT_SECRET!,
            profile: (profile) => ({
                id: profile.sub, // Use 'sub' as the unique ID for Apple
                name: profile.name,
                email: profile.email,
                image: null, // Apple does not provide a profile picture
            }),
        }),
    ],
    pages: {
        signIn: '/', // Custom sign-in page
    },
    callbacks: {
        async signIn({ account, profile }) { 
            console.log("jimam", account)
            console.log("profile", profile)
          },
        async jwt(token, user) {
            // Check if user exists (i.e., this is the first time the user is signing in)
            if (user) {
                try {
                    // Send user info to Django backend
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/token/`, {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        image: user.image,
                    });

                    // Check for success response and set access token
                    if (response.status === 200 && response.data.access_token) {
                        token.accessToken = response.data.access_token;
                    } else {
                        console.error("Failed to retrieve access token:", response.data);
                    }
                } catch (error) {
                    console.error("Error sending data to Django backend:", error);
                }
            }
            return token;
        },
        async session(session, token) {
            session.accessToken = token.accessToken; // Pass the access token to the session
            return session;
        },
    },
});

export { handler as GET, handler as POST };
