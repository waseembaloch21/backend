const express = require("express")
const app = express()
const path = require('path')
const raditdata = require('./data.json')
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid');

app.listen(5000, () => {
    console.log(`app is listning on 5000`);
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render('home')
})

let comments = [
    {id:uuid(),  username: "saif", comment: "This is the first comment." },
    {id:uuid(), username: "adnan", comment: "Here's another comment!" },
    {id:uuid(),  username: "waseem", comment: "Loving the discussion here." },
    {id:uuid(),  username: "Ali", comment: "Great insights, everyone!" }
  ];

  app.get('/comments', (req,res) => {
    res.render('comments/index', {comments})
  })
  
  app.get('/comments/new', (req,res) => {
    res.render('comments/new')
  })

  app.post('/comments', (req,res) => {
    const {username,comment} = req.body;
    comments.push({username,comment,id:uuid() })
    res.redirect('/comments')
  })

  app.get('/comments/:id', (req,res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', {comment})
  })

  app.get('/comments/:id/edit', (req,res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', {comment})
    res.redirect('/comments')

  })

  app.patch('/comments/:id', (req,res) => {
    const {id} = req.params;
    const newComment = req.body.comment
    const foundComment = comments.find(c => c.id === id)
    foundComment.comment = newComment
    res.redirect('/comments')
  })

  app.delete('/comments/:id', (req,res) => {
    const {id} = req.params;
    comments = comments.filter(c => c.id !== id)
    res.redirect('/comments')
  })










  
app.get('/navbar', (req, res) => {
    res.sendFile(express.static(path.join(__dirname, "index.html")));
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/random', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1
    res.render('random', { num })
})

app.get('/cats', (req, res) => {
    const cats = ['red', 'blue', 'pink', 'purple', 'cyan', 'orange']
    res.render('cats', { cats })
})

app.get('/waseem', (req,res) => {
    res.send(`my name is waseem`)
})

app.get('/index',(req,res) => {
    res.send(`<p>Saify bro is amazing and katarnak</p>`)
})

app.get('/saif', (req,res) => {
    res.send(`my name is saif`)
})

app.get('/adnan', (req,res) => {
    res.send(`my name is adnan`)
})



app.get('/search/:postid', (req,res) => {
    let {postid} = req.params
    res.send(`hey bro ${postid}`)
})

    app.get('/r' , (req,res) => {
        res.render('r')
    })
    
    app.get('/r/:subredit', (req,res) => {
        const {subredit} = req.params
              const data = raditdata.users.find(u => u.names === subredit)
  res.render('subredit', {...data})
  

    })

    app.get('/tacos', (req,res) => {
        res.send('recived my get request from Html')
    })

    app.post('/tacos', (req,res) => {
        const {meat,qty} = req.body
        res.send(`i got my order it is ${qty} ${meat}`)
    })


    app.get('/w/:saify/:id',(req,res) => {
        const {saify,id} = req.params;
    res.send(`Welcome to ${saify} PAge your id is ${id}`) 

    })

    app.get('/search', (req,res) => {
        const {q} = req.query
        if(!q){
            res.send('Get out learn to search')
        }
        res.send(`Search results for: ${q}`)

    })

app.get('*', (req, res) => {
    res.send('page is not Found fix your path')
})












