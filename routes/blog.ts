import { Router, Request, Response } from 'express';

const router = Router();

router.get('/add-new', (req: Request, res: Response) => {
  return res.render('blog', {
    user: req.user,
  });
});

router.post('/', (req: Request, res: Response) => {
  console.log(req.body);
  return res.redirect('/');
});

export default router;
