![Logo](https://raw.githubusercontent.com/aidenfine/DataMind/main/public/logo.png?token=GHSAT0AAAAAACA4D7P7DAYSORYVKUI57AKCZKO4KBA)

## [DataMind.ai](https://data-mind.vercel.app/)

An open source all in one AI tool to boost productivity. This project uses [ChatGPT API](https://openai.com/) and [Replicate AI](https://replicate.com/). Datamind can generate conversations, code, images, videos, and music all based on user text input. The project is open source meaning you can add tools customize the AI and more. Keep reading for more information on how to customize Datamind to its full potential

## Where to get my API Keys?

First create an account on \
[openAI](https://openai.com/) \
[Replicate](https://replicate.com/) \
[Clerk](https://clerk.com/) (Visit live site if you dont want to modify user auth) \
[Stripe](https://stripe.com/) (May not be required.) \
In the future I want to make this project soley depend on one API key for easier local access

## How to run locally

This project is built with `Next.JS` and `TailwindCSS`. \
Add all required env variables and remove .example from the `.env.example` file name

Install packages

```bash
  npm install
```

Run Locally

```bash
  npm run dev
```

## FAQ

**Why is the live demo API not working?** \
The reason for the live demo api calls failing is because the site is hosted on free tier for vercel. Many of the API calls will be timed out by vercel. If this occurs often please install locally and you will not run into these issues.
