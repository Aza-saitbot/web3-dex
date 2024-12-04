import express, { Request, Response } from "express";
import Moralis from "moralis";
import cors from "cors";
import dotenv from "dotenv";
import {ITokenPriceQuery, ITokenPriceRes} from './models';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/token-price", async (req: Request<{}, {}, {}, ITokenPriceQuery>, res: Response) => {
  const { addressOne, addressTwo } = req.query;

  if (!addressOne || !addressTwo) {
    return res.status(400).json({ error: "yo bro you don't have the necessary parameters" });
  }

  try {
    const responseOne: ITokenPriceRes = await Moralis.EvmApi.token.getTokenPrice({
      address: addressOne,
    });

    const responseTwo: ITokenPriceRes = await Moralis.EvmApi.token.getTokenPrice({
      address: addressTwo,
    });

    const usdPrices = {
      tokenOne: responseOne.raw,
      tokenTwo: responseTwo.raw,
      ratio: responseOne.raw.usdPrice / responseTwo.raw.usdPrice,
    };

    return res.status(200).json(usdPrices);
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while fetching token prices." });
  }
});

const startServer = async () => {
  try {
    await Moralis.start({
      apiKey: process.env.MORALIS_KEY,
    });
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start Moralis:", error);
  }
};

startServer();
