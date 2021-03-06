This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Steps to reproduce baseline

## Initializing a new Next project
```
yarn create next-app

# ? What is your project named? › amplify-next

cd amplify-next

touch tsconfig.json

mv pages src/pages

yarn add --dev typescript @types/react @types/node

```

## Initializing Amplify on the project
```
# Make sure that Amplify CLI is installed
sudo npm install -g @aws-amplify/cli

amplify init
# Select defaults
# Rewrite the start command
# ? Start Command: npm run-script dev
```

## Adding Facebook authentication
```
amplify add auth

# How do you want users to be able to sign in? Username
# Do you want to configure advanced settings? No, I am done.
# Enter your redirect signin URI: http://localhost:3000/
# Enter your redirect signout URI: http://localhost:3000/
# Select the social providers you want to configure for your user pool: Facebook

# Provide app credentials

amplify push
```