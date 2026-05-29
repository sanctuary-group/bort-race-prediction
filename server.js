const express = require('express');
const http = require('http');
const { URL } = require('url');
const path = require('path');

const app = express();

const API_TARGET = process.env.API_TARGET || 'http://localhost:3000';
const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT || 8080;

if (!API_KEY) {
  console.error('ERROR: API_KEY environment variable is required');
  process.exit(1);
}

// /v2/*, /health をバックエンドAPIへプロキシ
function proxyToApi(req, res) {
  const target = new URL(API_TARGET);
  const options = {
    hostname: target.hostname,
    port: target.port,
    path: req.originalUrl,
    method: req.method,
    headers: {
      ...req.headers,
      host: target.host,
      'x-api-key': API_KEY,
    },
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error('Proxy error:', err.message);
    res.status(502).json({ error: 'Bad Gateway' });
  });

  req.pipe(proxyReq);
}

app.use('/v2', proxyToApi);
app.use('/health', proxyToApi);

// 静的ファイル配信
app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
  console.log(`BFF server running on http://localhost:${PORT}`);
  console.log(`API proxy target: ${API_TARGET}`);
});
