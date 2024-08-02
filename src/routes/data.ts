import { Router, Request, Response } from 'express';
import { Data } from '../models/Data';

const router = Router();

router.get('/:symbol', async (req: Request, res: Response) => {
  console.log('route hit : ' )

  const { symbol } = req.params;
  console.log('route hit : ',symbol )

  try {
    const data = await Data.find({ symbol }).sort({ timestamp: -1 }).limit(20);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

export default router;
