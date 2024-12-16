import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY
// const SYMBOL = process.env.SYMBOL;
const SYMBOL = 'IBM'

if (!ALPHA_VANTAGE_API_KEY || !SYMBOL) {
  throw new Error('Missing required environment variables');
}

const getStockPrice = async (symbol: string): Promise<void> => {
  try {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${ALPHA_VANTAGE_API_KEY}`;
    const response = await axios.get(url);
    const timeSeries = response.data['Time Series (1min)'];
    const latestTime = Object.keys(timeSeries)[0];
    const latestPrice = timeSeries[latestTime]['1. open'];
    console.log(`The latest price of ${symbol} is ${latestPrice}`);
  } catch (error) {
    console.error('Error fetching stock data:', error);
  }
};

getStockPrice(SYMBOL);