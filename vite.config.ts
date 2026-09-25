import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { handler } from './netlify/functions/recommend';

dotenv.config();

function netlifyFunctionsDev(): Plugin {
  return {
    name: 'netlify-functions-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/.netlify/functions/recommend')) {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', async () => {
              try {
                const event: any = {
                  httpMethod: 'POST',
                  headers: req.headers,
                  body,
                };
                const result = await handler(event, {} as any);
                res.statusCode = result?.statusCode || 200;
                if (result?.headers) {
                  for (const [key, val] of Object.entries(result.headers)) {
                    res.setHeader(key, String(val));
                  }
                }
                res.end(result?.body || '');
              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    error: "We couldn't generate recommendations right now. Please try again.",
                  })
                );
              }
            });
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), netlifyFunctionsDev()],
  server: {
    port: 5173,
  },
});
