# InfluenceHub Frontend

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It is containerized using Docker for easy development and deployment.

## Prerequisites

- Docker and Docker Compose installed on your machine.
- Node.js (if running without Docker).
- A `.env` file in the root directory with necessary environment variables (see `.env.example` for reference).

## Docker Setup

### Development Mode

1. Clone the repository:

   ```bash
   git clone https://github.com/codewithashim/InfluenceHub-Frontend.git
   cd influence-hub
   ```

2. Ensure you have a `.env` file configured.

3. Build and run the application in development mode:

   ```bash
   docker-compose up --build
   ```

   This will start the development server with hot reloading enabled. Open [http://localhost:3000](http://localhost:3000) to view the app.

4. To stop the container:

   ```bash
   docker-compose down
   ```

### Production Mode

For production, update the `Dockerfile` CMD to `["npm", "start"]` and remove the `volumes` from `docker-compose.yaml`, then rebuild:

```bash
docker-compose up --build
```

This uses a multistage Docker build to create a slim production image.

### Manual Docker Commands

- Build the Docker image:

  ```bash
  docker build -t influence-hub .
  ```

- Run the container:

  ```bash
  docker run -p 3000:3000 --env-file .env influence-hub
  ```

## Local Development (Without Docker)

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Building for Production

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env` file based on `.env.example`. Key variables include:

- `NODE_ENV`: Set to `development` or `production`.
- Other app-specific variables as needed.

## Project Structure

- `src/`: Source code
- `public/`: Static assets
- `Dockerfile`: Multistage Docker build configuration
- `docker-compose.yaml`: Docker Compose setup for easy container management

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
