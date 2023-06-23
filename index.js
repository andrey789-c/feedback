import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))

app.post('/feedback', (req, res) => {
  console.log(req.body)
  return res.send(JSON.stringify(req.body))
})
app.listen(3000, () => console.log('Start'))