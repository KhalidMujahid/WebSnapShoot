// index.js
require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.post("/endpoints", async (req, res) => {
  const imageDataURL = req.body.image;

  if (!imageDataURL || !imageDataURL.startsWith('data:image/jpeg;base64,' )) {
    return res.status(400).send('Invalid image data');
  }

  const base64Data = imageDataURL.split(',')[1];
  const buffer = Buffer.from(base64Data, 'base64');
  const filename = `image-${Date.now()}.png`;
  const filePath = path.join(__dirname, "public", "uploads", filename);

  try {

    await fs.mkdir(path.join(__dirname, "public", "uploads"), { recursive: true });


    await fs.writeFile(filePath, buffer);
    console.log(`Image saved as: ${filename}`);
    res.send(true);
  } catch (err) {
    console.error('Error saving image:', err);
    res.status(500).send('Error saving image');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});R