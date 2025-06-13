# Charity Card Club

A platform where groups can create fundraising campaigns based on soccer cards (yellow and red) received during matches.

## Features

- Create and manage fundraising campaigns
- Track yellow and red cards for soccer matches
- Real-time donation tracking
- Campaign progress visualization
- User authentication and profile management

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/charity_card_club"
   NEXT_PUBLIC_API_URL="http://localhost:3000"
   ```

3. Initialize the database:
   ```bash
   npx prisma db push
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- React
- Heroicons

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
