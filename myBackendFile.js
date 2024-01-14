const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/translate', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Lütfen çevirmek istediğiniz metni gönderin.' });
    }

    try {
        const apiKey = 'f7a06558-286c-e934-4e53-4eb260b89526'; // Deepl API anahtarınızı buraya ekleyin

        const response = await fetch('https://api.deepl.com/v1/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `auth_key=${apiKey}&text=${encodeURIComponent(text)}&source_lang=EN&target_lang=TR`,
        });

        const data = await response.json();

        if (response.ok) {
            res.json({ translations: [{ text: data.translations[0].text }] });
        } else {
            res.status(500).json({ error: 'Çeviri yapılamadı.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

