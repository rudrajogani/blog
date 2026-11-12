import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user';
import blogRoutes from './routes/blog';
import { checkForAuthenticationCookie } from './middlewares/authentication';

const app = express();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/blog')
  .then(() => console.log('MongoDB connected!'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));

app.use('/user', userRoutes);
app.use('/blog', blogRoutes);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home', {
    user: req.user,
  });
});

app.listen(4000, () => {
  console.log('Server is running at port 4000');
});
