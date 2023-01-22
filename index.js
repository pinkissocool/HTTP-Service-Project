//Proper Annotation: Aaron Cheng, Odd 7-8, 1/22/23

/*Tools: code editor, browser, command line utility, 
application and server utility, API platform
*/
const express = require('express');
const app = express();
app.use(express.json);
app.get('/', (req,res)=>{
    res.send("Welcome to Aaron's Music App!")
});

const genres = [
    {
        'id': 1,
        'name': 'pop',
        'year': 2023,
        'month': 1
    },
    {
        'id': 2,
        'name': 'hip hop',
        'year': 2023,
        'month': 5
    },
    {
        'id': 3,
        'name': 'rap',
        'year': 2021,
        'month': 5
    },
    {
        'id': 4,
        'name': 'classical',
        'year': 2013,
        'month': 4
    },
    {
        'id': 5,
        'name': 'rock',
        'year': 1776,
        'month': 3
    },
    {
        'id': 6,
        'name': 'jazz',
        'year': 1900,
        'month': 2
    },
    {
        'id': 7,
        'name': 'blues',
        'year': 1900,
        'month': 3
    },
    {
        'id': 8,
        'name': 'electronic',
        'year': 1,
        'month': 2
    }
];


//=========== ROUTES FOR HTTP GET REQUESTS ==========

app.get('/api/genres', (req,res)=>{
    res.send(genres);
});

app.get('/api/genres/:id', (req,res)=>{
    const genre = genre.find(g=> g.id === parseInt(req.params.id));
    if (!genre){
        res.status(404).send("The genre with the given ID was not found");
        return
    }
    res.send(genre);
});

app.get('/api/:year', (req,res)=>{
    const result = genres.filter(genre => genre.year == parseInt(req.params.year));
    if (result.length == 0){
        res.status(404).send("The genre with the given year was not found");
        return
    }
    res.send(result);
    return "Year: " + parseInt(req.params.year);
});

app.get('/api/:year/:month', (req,res)=>{
    const years = genres.filter(genre => genre.year == parseInt(req.params.year));
    const result = years.filter(genre => genre.month == parseInt(req.params.month));
    if (result.length == 0){
        res.status(404).send("The genre with the given year and month was not found");
        return
    }
    res.send(result);
    return "Year: " + parseInt(req.params.year) + " Month: " + parseInt(req.params.month);
});


//=========== ROUTES FOR HTTP POST REQUESTS ==========

app.post('/api/genre', (req,res) => {
        if (req.body.name.length > 2){
        const genre ={
            //we assign an ID and a name property
            id: genres.length +1,
            name:req.body.name,
            year: 2023,
            month: 1
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
    if (parseString(req.params.name).length != 0){
        res.status(400).send("Name is required");
        return
    }
    else if (parseString(req.params.name).length < 3){
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
        res.send(course);
    }
    //Write the code in order to look up the course, if not existing return a 404
            //otherwise 
                    //update the course
                    //return the updated course
        
});




//=========== ROUTES FOR HTTP DELETE REQUESTS ==========

app.delete('/api/genres/:id', (req,res)=>{
        const course = genres.find(g=> g.id === parseInt(req.params.id));
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
});