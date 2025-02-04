This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## API Configuration

This project uses the [Sportmonks Football API](https://docs.sportmonks.com/football/) for fetching football data. You'll need to set up your API credentials before running the application.

### Environment Setup

Create a `.env.local` file in the root directory and add your Sportmonks API token:

```bash
SPORTMONKS_API_TOKEN=your_api_token_here
```

To obtain an API token, sign up at [Sportmonks](https://www.sportmonks.com/football-api/) and subscribe to a plan.

### API Integration Notes

- This application uses Sportmonks v3 API endpoints (replacing the previous OpenLigaDB integration)
- Base URL: `https://api.sportmonks.com/v3/football`
- Key endpoints used:
  - Leagues: `/leagues`
  - Teams: `/teams`
  - Matches: `/fixtures`
- The API responses are mapped to internal types (League, Team, Match) in `utils/api.ts`
- Rate limiting and API usage can be monitored in your Sportmonks dashboard

For detailed API documentation, refer to:
- [Sportmonks API Documentation](https://docs.sportmonks.com/football/)
- [API Endpoints Reference](https://docs.sportmonks.com/football/endpoints-and-entities)
- [Authentication Guide](https://docs.sportmonks.com/football/tutorials-and-guides/authentication)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## API Security Considerations

When deploying the application:
- Never commit your `.env.local` file to version control
- Set up proper environment variables in your deployment platform
- Consider using API route handlers to protect your API token
- Monitor your API usage and rate limits through the Sportmonks dashboard
