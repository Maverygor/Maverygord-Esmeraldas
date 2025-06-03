const express = require('express');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = '6op05oK6wKUQfE1TY6PzrvmBnm'; // tu clave secreta PayU
const MERCHANT_ID = '1024933'; // tu merchantId

app.post('/generar-firma', (req, res) => {
  const { referenceCode, amount, currency } = req.body;

  if (!referenceCode || !amount || !currency) {
    return res.status(400).json({ error: "Faltan datos necesarios" });
  }

  const signatureString = `${API_KEY}~${MERCHANT_ID}~${referenceCode}~${amount}~${currency}`;
  const signature = crypto.createHash('md5').update(signatureString).digest('hex');

  res.json({ signature });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
