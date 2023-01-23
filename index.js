//Proper Annotation: Aaron Cheng, Odd 7-8, 1/22/23

//The REFLECTION:
/*
    1) Programs communicate to do certain actions like Get, Post, Put, and Delete by sending requests from the POSTMAN app
    to the back end server, which processes the request by doing the action of Get, Post, Put, or Delete and then returning a value that the request asked for back to POSTMAN
    However, that is only for this case. A more broad way to describe this would be a front end service sending a http request to the back end service
    and then the back end service doing whatever action it needs to do and then returning the value the request wanted.
    2) In this project, I learned how to filter requests; common mistakes that happen when coding a program like this including forgetting to add backslashes to urls,
    putting the curly brackets, parentheses, and semi colon in the wrong order, and mixing up variable names; and how to send http requests in general.
    3) This project can be further extended by possibly creating a front end website that utilizes this back end service to display information to the user
*/

/*Tools: code editor, browser, command line utility, 
application and server utility, API platform
*/
const express = require('express');
const app = express();
app.use(express.json());
app.get('/', (req,res)=>{
    res.send("Welcome to Aaron's Music App!")
});

const genres = [
    {
        'id': 1,
        'name': 'pop',
        'year': 2023,
        'month': 1,
        'day': 2 //The addition of the the filter day is the extra feature for the extra credit
    },
    {
        'id': 2,
        'name': 'hip hop',
        'year': 2023,
        'month': 5,
        'day': 3
    },
    {
        'id': 3,
        'name': 'rap',
        'year': 2021,
        'month': 5,
        'day': 9
    },
    {
        'id': 4,
        'name': 'classical',
        'year': 2013,
        'month': 4,
        'day' : 30
    },
    {
        'id': 5,
        'name': 'rock',
        'year': 1776,
        'month': 3,
        'day': 23
    },
    {
        'id': 6,
        'name': 'jazz',
        'year': 1900,
        'month': 2,
        'day': 30
    },
    {
        'id': 7,
        'name': 'blues',
        'year': 1900,
        'month': 3,
        'day': 22
    },
    {
        'id': 8,
        'name': 'electronic',
        'year': 1,
        'month': 2,
        'day': 12
    }
];


//=========== ROUTES FOR HTTP GET REQUESTS ==========

app.get('/api/genres', (req,res)=>{
    res.send(genres);
});

app.get('/api/genres/:year/:month', (req,res)=>{
    const years = genres.filter(genre => genre.year == parseInt(req.params.year));
    const result = years.filter(genre => genre.month == parseInt(req.params.month));
    if (result.length == 0){
        res.status(404).send("The genre with the given year and month was not found");
        return
    }
    res.send(result);
    return "Year: " + parseInt(req.params.year) + " Month: " + parseInt(req.params.month);
});

app.get('/api/genres/:year/:month/:day', (req,res)=>{
    const years = genres.filter(genre => genre.year == parseInt(req.params.year));

    const months = years.filter(genre => genre.month == parseInt(req.params.month));
    const result = months.filter(genre => genre.day == parseInt(req.params.day));
    if (result.length == 0){
        res.status(404).send("The genre with the given year, month, and day was not found");
        return
    }
    res.send(result);
    return "Year: " + parseInt(req.params.year) + " Month: " + parseInt(req.params.month) + " Day: " + parseInt(req.params.day);
});

app.get('/api/genres/:id', (req,res)=>{
    const genre = genres.find(g=> g.id === parseInt(req.params.id));
    if (!genre){
        res.status(404).send("The genre with the given ID was not found");
        return
    }
    res.send(genre);
});

// app.get('/api/:year', (req,res)=>{
//     const result = genres.filter(genre => genre.year == parseInt(req.params.year));
//     if (result.length == 0){
//         res.status(404).send("The genre with the given year was not found");
//         return
//     }
//     res.send(result);
//     return "Year: " + parseInt(req.params.year);
// });


//=========== ROUTES FOR HTTP POST REQUESTS ==========

app.post('/api/genres', (req,res) => {
        if (req.body.name.length > 2){
        const genre ={
            //we assign an ID and a name property
            id: genres[genres.length-1].id + 1,
            name:req.body.name,
            year: req.body.year,
            month: req.body.month,
            day: req.body.day
        }
        genres.push(genre);
        res.send(genres);
    }
    else{
        res.status(404).send("The genre with the given name is shorter than 3 characters");
        return
    }     
});


//=========== ROUTES FOR HTTP PUT REQUESTS ==========

app.put('/api/genres/:id', (req,res)=>{
    if (req.body.name.length == 0){
        res.status(400).send("Name is required");
        return
    }
    else if (req.body.name.length < 3){
        res.status(400).send("Name has to be at least 3 characters long");
        return
    }
    let genre = genres.find(g=> g.id === parseInt(req.params.id));
    if (!genre){
        res.status(400).send("The genre with the given ID was not found");
        return
    }
    else{
        genre.name = req.body.name;
        genre.year = req.body.year;
        genre.month = req.body.month;
        genre.day = req.body.day;
        res.send(genre);
    }
        
});




//=========== ROUTES FOR HTTP DELETE REQUESTS ==========

app.delete('/api/genres/:id', (req,res)=>{
        const genre = genres.find(g=> g.id === parseInt(req.params.id));
        if (!genre){
            res.status(404).send("The genre with the given ID was not found");
            return
        }
        else{
            const index = genres.indexOf(genre);
            res.send(genres.splice(index, 1));
        }
});

    
    
app.listen(3000, () => {
    console.log('Listening on port 3000 ...');
})