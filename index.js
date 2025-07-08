const { configDotenv } = require("dotenv");
const express = require("express");
const cors = require("cors");

configDotenv();

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "https://devdesk-chi.vercel.app/",
  })
);

const newsAPIKey = process.env.NEWS_API_KEY;
// console.log(newsAPIKey);
app.get("/api/news", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const apiRes = await fetch(
      `https://newsapi.org/v2/everything?q=india&language=en&pageSize=8&page=${page}&apiKey=${newsAPIKey}`
    );
    const data = await apiRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "News API error" });
  }
});

app.listen(port, () => console.log(`Server is running on port 3000`));
