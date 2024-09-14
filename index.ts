// index.ts
import express, { type Express, type Request, type Response } from "express";
import path from "path";
import fs from 'fs/promises';
import { config } from "dotenv";

config();

const app: Express  = express();
const PORT: string | number = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.post("/endpoints", async (req: Request, res: Response) => {
  const imageDataURL: string = req.body.image;

  if (!imageDataURL || !imageDataURL.startsWith('data:image/jpeg;base64,' )) {
    return res.status(400).send('Invalid image data');
  }

  const base64Data: string = imageDataURL.split(',')[1];
  const buffer: Buffer = Buffer.from(base64Data, 'base64');
  const filename: string = `image-${Date.now()}.png`;
  const filePath: string = path.join(__dirname, "public", "uploads", filename);

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
});