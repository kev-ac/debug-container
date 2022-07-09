const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT ?? 3000;
const exposeEnv = Boolean(process.env.EXPOSE_ENV ?? false);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.disable("x-powered-by");

app.all('*', (req, res) => {
  const data = {
    success: true,
    path: req.path,
    method: req.method,
    headers: req.headers,
    body: req.body,
    cookies: req.cookies,
    env: exposeEnv ? process.env : undefined,
  };

  res.json(data);
});

const server = app.listen(port, () => {
  console.log(`Testing container listening on port ${port}${exposeEnv ? " with exposed environment variables." : ""}`);
});

const handleShutdown = (event) => {
  console.log(`Shutting down because of ${event} event.`);
  server.close(() => {
    process.exit(0);
  });
};

process.on("SIGTERM", handleShutdown);
process.on("SIGINT", handleShutdown);
