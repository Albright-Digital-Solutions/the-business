import app from '../server.js';

export default function handler(req, res) {
  return app(req, res);
}

// Start server if not running in Vercel Serverless environment
if (!process.env.VERCEL) {
  const port = 3001;
  app.listen(port, () => {
    console.log(`Backend API running at http://localhost:${port}`);
  });
}
