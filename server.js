const express = require('express');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());

function numberPicker(req, res) {
  const number = Math.floor((Math.random() * 4))
  const selection = {POSITION: number}
  res.json(selection)
}

// endpoint to get wheel position
app.get('/spinner', numberPicker);
app.listen(process.env.port || 5000, () => {
  console.log('server running')
});
