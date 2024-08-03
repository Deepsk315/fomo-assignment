import axios from 'axios';
import { Data } from '../models/Data';
import cron from 'node-cron';
import { Server } from 'socket.io';

const API_URL = 'https://api.livecoinwatch.com/coins/list';

export const fetchData = (io: Server) => {
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
          "x-api-key": "1eff2563-3346-4777-bc92-2a034599723e",
        }
      });

      const { data } = response;
      // console.log('data received : ', data);

      for (const item of data) {
        const newData = new Data({
          symbol: item.code,
          price: item.rate.toFixed(4),
        });

        await newData.save()
          .then(val => {
            // console.log(`${val.symbol} is saved to DB`);
            io.emit('dataUpdate', val); 
          })
          .catch(err => console.log('error with saving in DB : ', err));
      }
    } catch (error) {
      console.error('Error fetching data', error);
    }
  });
};
