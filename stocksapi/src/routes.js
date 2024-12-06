import { Router } from 'express';
import watchlist_views from './views/watchlist.js';
import susi_views from './views/user.js';

const router = Router();
watchlist_views(router)
susi_views(router);


export default router;
