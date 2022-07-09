const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT ?? 3000;

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
  };

  res.json(data);
});

const server = app.listen(port, () => {
  console.log(`Testing container listening on port ${port}`);
});

const handleShutdown = (event) => {
  console.log(`Shutting down because of ${event} event.`);
  server.close(() => {
    process.exit(0);
  });
};

process.on("SIGTERM", handleShutdown);
process.on("SIGINT", handleShutdown);
