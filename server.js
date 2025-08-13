require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, message, token } = req.body;

  // Validate reCAPTCHA with Google
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;

  try {
    const response = await axios.post(verificationURL);
    if (!response.data.success) {
      return res.status(400).json({ success: false, message: 'Failed CAPTCHA verification.' });
    }

    // (Optional) Save or email the form data here

    res.json({ success: true, message: 'Form submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error verifying CAPTCHA' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
