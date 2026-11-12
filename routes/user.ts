import { Router, Request, Response } from 'express';
import User from '../models/user';
import { createTokenForUser } from '../services/authenticationService';

const router = Router();

router.get('/signin', (req: Request, res: Response) => {
  return res.render('signin');
});

router.post('/signin', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res
      .cookie('token', token, { httpOnly: true })
      .redirect('/');
  } catch (error) {
    return res.render('signin', {
      error: 'Incorrect email or password',
    });
  }
});

router.get('/logout', (req: Request, res: Response) => {
  res.clearCookie('token').redirect('/');
});

router.get('/signup', (req: Request, res: Response) => {
  return res.render('signup');
});

router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;
    const newUser = await User.create({
      fullName,
      email,
      password,
    });

    const token = createTokenForUser(newUser);
    return res
      .cookie('token', token, { httpOnly: true })
      .redirect('/');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

export default router;
