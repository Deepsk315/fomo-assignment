import axios from 'axios';
import { Data } from '../models/Data';
import cron from 'node-cron';

const API_URL = 'https://api.livecoinwatch.com/coins/list';

export const fetchData = () => {
  cron.schedule('*/5 * * * * *', async () => {
    try {
      const response = await axios.post(API_URL, {
        currency: "USD",
        sort: "rank",
        order: "ascending",
        offset: 0,
        limit: 5,
        meta: false,
      }, {
        headers: {
          "content-type": "application/json",
          "x-api-key": "b5dfbbe7-ff3e-41d3-85fb-3b4873aad9ec",
        }
      });

      const { data } = response; 
      console.log('data received : ', data);

      for (const item of data) {
        const newData = new Data({
          symbol: item.code, 
          price: item.rate.toFixed(4), 
        });

        await newData.save().then(val  => console.log(`${val.symbol} is saved to DB`)).catch(err => console.log('error with saving in DB : ',err));
      }
    } catch (error) {
      console.error('Error fetching data', error);
    }
  });
};
