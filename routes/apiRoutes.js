// Call Required Dependencies
const fs = require("fs");

// import npm package for unique id
const { v4: uuidv4 } = require('uuid');

// routing calls
module.exports = function (app) {

    // get API
    app.get("/api/notes", (request, response) => {
        
        console.log("\n\nExecuting the GET notes request");

        // Reading 'db.json' file 
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        
        console.log("\nGET request - Returning notes data: " + JSON.stringify(data));
        
        // Send read data to response of 'GET' request
        response.json(data);
    });


    // API POST Request
    app.post("/api/notes", (request, response) => {

        // Extracted new note from request body.  
        const newNote = request.body;
        
        console.log("\n\nPOST request - New Note : " + JSON.stringify(newNote));

        // Assign unique id from unique ID package
        newNote.id = uuidv4();

        // Read data from 'db.json' file
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    
        // Pushed new note in notes file 'db.json'
        data.push(newNote);

        // Written notes data to 'db.json' file
        fs.writeFileSync('./db/db.json', JSON.stringify(data));
        
        console.log("\nSuccessfully added new note to 'db.json' file!");

        // Send response
        response.json(data);
    });


    // API DELETE request
    app.delete("/api/notes/:id", (request, response) => {

        // Fetched id to delete
        let noteId = request.params.id.toString();
        
        console.log(`\n\nDELETE note request for noteId: ${noteId}`);

        // Read data from 'db.json' file
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        // filter data to get notes except the one to delete
        const newData = data.filter( note => note.id.toString() !== noteId );

        // Writing new data to a 'db.json' formatted file
        fs.writeFileSync('./db/db.json', JSON.stringify(newData));
        
        console.log(`\nSuccessfully deleted note with id : ${noteId}`);

        // sending response back
        response.json(newData);
    });
};