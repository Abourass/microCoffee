const ip = require('ip');
const app = require('../app');

function normalizePort(val) { // ========================================| Normalize a port into a number, string, or false
  const port = parseInt(val, 10);
  if (typeof port !== 'number') { return val; }
  if (port >= 0) { return port; }
  return false;
}
const port = normalizePort(process.env.PORT || '2777'); // Get port from environment
app.listen(port);
