const express = require('express');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());

// endpoints that require valid token to work

app.listen(5000, () => console.log(
  'server running',
));