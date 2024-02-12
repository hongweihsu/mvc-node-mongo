import express from 'express'
import mongoose from 'mongoose'
import blogRoutes from './routes/blogRoutes.js'
// import path from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const app = express();

const user = 'dennisBlogDB'
const pwd = 'peacepongPong0507'
const dbName = 'blogDB'
const dbURI = `mongodb+srv://${user}:${pwd}@cluster0.qetcy3r.mongodb.net/${dbName}?retryWrites=true&w=majority`
console.log(dbURI)
mongoose.connect(dbURI)
.then((result) => console.log('connect to db'))
.then((result)=>app.listen(3000))
.catch((err) => console.log('connecting db err:', err))

// listen for requests
// app.listen(3000);

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res) => {
    res.redirect('/blogs')
  });

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});