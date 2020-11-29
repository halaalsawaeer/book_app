'use strict';

require('dotenv').config();
const express = require('express');
const { request } = require('http');
const { search } = require('superagent');

const superagent = require('superagent');

const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.static('./public'));
server.set('view engine', 'ejs');

server.use(express.urlencoded({ extended: true }));

server.get('/hello', (req, res) => {
    res.render('pages/index');

})
server.get('/searches/new', (req, res) => {
    res.render('pages/searches/new');
})
server.post('/searches', (req, res) => {
    var url;
    let bookN = req.body.search;
    console.log(search);

    if (req.body.book === 'title') {
         url = `https://www.googleapis.com/books/v1/volumes?q=${bookN}&intitle=${bookN}`;
    } else if (req.body.book === 'auther') {
         url = `https://www.googleapis.com/books/v1/volumes?q=${bookN}&inauthor=${bookN}`
    }
    superagent(url)
    .then(data =>{
        console.log(data.body.items);
        let arr = data.body.items;
        let bookData = arr.map(value =>{
            let bookObj=new Book(value);
            return bookObj ;
        })
        res.render('pages/searches/show',{books :bookData}
        )
    })
})

function Book(value) {
    this.bookName =value.volumeInfo.title;
    this.bookAuthor = value.volumeInfo.authors;
    this.bookDesc = value.volumeInfo.description;
    this.bookImg = value.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.thumbnail : `https://i.imgur.com/J5LVHEL.jpg`;

}
server.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
})