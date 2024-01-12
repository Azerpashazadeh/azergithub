const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/cevir', async (req, res) => {
  try {
    const apiKey = 'f7a06558-286c-e934-4e53-4eb260b89526'; // Deepl API anahtarınızı buraya ekleyin
    const apiUrl = 'https://api-free.deepl.com/v2/translate';

    const { text, targetLanguage } = req.body;

    const response = await axios.post(apiUrl, {
      auth_key: apiKey,
      text,
      target_lang: targetLanguage,
    });

    res.json({ translation: response.data.translations[0].text });
  } catch (error) {
    console.error('Çeviri isteği sırasında bir hata oluştu:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Çeviri servisi ${port} portunda çalışıyor.`);
});
