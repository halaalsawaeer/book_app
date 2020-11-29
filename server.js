'use strict';
require('dotenv').config();
const express = require('express');

const PORT = process.env.PORT || 3030;
const app = express();
const superagent = require('superagent');

app.use(express.static('./public'));


app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('pages/index');
})
app.get('/search', (req, res) => {
    res.render('pages/searches/new.ejs')
})

app.post('/searches', (req, res) => {
    var url;
    let bookSearch = req.body.bookname;
    
    if (req.body.myBook === 'title') {
        url = `https://www.googleapis.com/books/v1/volumes?q=${bookSearch}&intitle:${bookSearch}`;
    }
    else if (req.body.myBook === 'author') {
        url = `https://www.googleapis.com/books/v1/volumes?q=${bookSearch}&inauthor:${bookSearch}`;
    }

    superagent.get(url)
        .then(data => {
            let arr = data.body.items;
            let books = arr.map(book => {
                let bookObj = new Book(book);
                
                return bookObj;
            });
            res.render('pages/searches/show', { books: books })
        })
        .catch(error => {
            res.render(error,'pages/error');
        });
});
function Book(book) {
    this.title = book.volumeInfo.title;
    this.image = book.volumeInfo.imageLinks.smallThumbnail || `https://i.imgur.com/J5LVHEL.jpg`;
    this.authors = book.volumeInfo.authors || 'Not avilabile';
    this.description = book.volumeInfo.description || 'Not avilabile';

}
app.get('*', (req, res) => {
    res.status(404).send('You have a error in writing the route');
})

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})
