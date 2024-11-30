const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/token-price", async (req, res) => {

  const {query} = req;

  const responseOne = await Moralis.EvmApi.token.getTokenPrice({
    address: query.addressOne
  })

  const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
    address: query.addressTwo
  })

  const usdPrices = {
    tokenOne: responseOne.raw,
    tokenTwo: responseTwo.raw,
    ratio: responseOne.raw.usdPrice/responseTwo.raw.usdPrice
  }
  return res.status(200).json(usdPrices);
});

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
});
