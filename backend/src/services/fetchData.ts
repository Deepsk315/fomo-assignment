import axios from 'axios';
import { Data } from '../models/Data';
import cron from 'node-cron';

const API_URL = 'https://api.example.com'; // Replace with actual API URL

export const fetchData = () => {
  cron.schedule('*/5 * * * * *', async () => {
    try {
      const response = await axios.get(`${API_URL}/path-to-endpoint`);
      const { data } = response;

      for (const item of data) {
        const newData = new Data({
          symbol: item.symbol,
          price: item.price,
        });

        await newData.save();
      }
    } catch (error) {
      console.error('Error fetching data', error);
    }
  });
};
