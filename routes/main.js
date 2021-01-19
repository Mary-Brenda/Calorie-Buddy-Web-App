module.exports = function (app) {
    /**
     * This method is called on the Express app object, when the app 
     * receives a request to the root route using the GET method, 
     * to retrieve and render the home page.
     * @param type Receives a request to the root route via the HTTP GET method.
     * @return Returns and renders the corresponding HTML page of the home page.
    */    
    app.get("/", (req, res) => res.render("index.html"));
    

    /**
     * This method is called on the Express app object, when the app 
     * receives a request to the about route using the GET method, 
     * to retrieve and render the about page.
     * @param type Receives a request to the about route via the HTTP GET method.
     * @return Returns and renders the corresponding HTML page of the about page.
    */
    app.get("/about", (req, res) => res.render("about.html"));


    /**
     * This method is called on the Express app object, when the app 
     * receives a request to the add route using the GET method, 
     * to retrieve and render the Add Food page.
     * @param type Receives a request to the add route via the HTTP GET method.
     * @return Returns and renders the corresponding HTML page of the Add Food page.
    */
    app.get("/add", (req, res) => res.render("addFood.html"));


    /**
     * This method is called on the Express app object, when the app 
     * receives a request to the search route using the GET method, 
     * to retrieve and render the search page.
     * @param type Receives a request to the search route via the HTTP GET method.
     * @return Returns and renders the corresponding HTML page of the search page 
     * and a variable storing the page heading to be passed to the EJS template.
    */
    app.get("/search", (req, res) => res.render("searchFood.html", 
                                                {pageName: "Search for a Food Item"}));


    /**
     * This method is called on the Express app object, when the app 
     * receives a request to the searchToUpdate route using the GET method, 
     * to retrieve and render the search page with the intention of updating the result.
     * @param type Receives a request to the searchToUpdate route via the HTTP GET method.
     * @return Returns and renders the corresponding HTML page of the search page 
     * and a variable storing the page heading to be passed to the EJS template.
    */    
    app.get("/searchToUpdate", (req, res) => res.render("searchFood.html", 
                                                        {pageName: "Search for a Food Item to Update"}));
    

    /**
     * This method is called on the Express app object when the app 
     * receives a request to the search-result route using the GET method,
     * collects the search form data, and searches the database to retrieve and 
     * render the results of the search if the search keyword exists in the database 
     * or to inform the user if it is non-existent.
     * @param type Receives a request, including the data inside the request query, 
     * to the search-result route via the HTTP GET method.
     * @return Renders the corresponding HTML page of the list page, but only showing
     * the requested food which was stored as a variable to be passed to the template 
     * or if not available, a message stating that the food is non-existent 
     * and providing a link to add the food. 
    */
    app.get("/search-result", (req, res) => {
        // Storing keyword to be searched for in the database.
        let word = [ '%' + req.query.keyword + '%' ];

        /**
         * This SQL command retrieves the record of the food item 
         * given part of the food item's name.
         * @param type Receives part of the food item's name.
         * @return Returns the record/row values of that food item or food items.
        */  
        let sqlQuery = "SELECT * FROM Foods WHERE Name LIKE ?";
        
        /**
         * This method executes the SQL command to retrieve the record or records 
         * of all food items containing the given part of the food item's name.
         * @param type Receives the SQL query, the part of the food item's name 
         * (i.e. search keyword), results of the query and/or errors if any.
         * @return Returns the record/row values of that food item or food items as objects
         * stored in a variable and to be rendered on the listFoods page.
        */ 
        db.query(sqlQuery, word, (err, result) => {
            if (err)
            {
                return console.error(`No food found with the keyword you have entered: 
                                      ${req.query.keyword}. 
                                      Error: ${err.message}`);
            }
            else 
            {
                res.render ('listFoods.html', {availableFoods: result});    
            }
        });
    });


    /**
     * This method is called on the Express app object, when the app 
     * receives a request to the update route using the GET method and 
     * passing the food item id, to search the database for the required 
     * food item and retrieve and render the updateFood page with the food 
     * item's values prepopulated and with the intention of updating these values.
     * @param type Receives a request, including the food item's id as params, 
     * to the update route via the HTTP GET method.
     * @return Renders the corresponding HTML page of the updateFood page 
     * and a variable storing the food item's values to be passed to the EJS template,
     * thus, prepopulating the form with these values and before update.
    */    
    app.get("/update/:id", (req, res) => {
        // Store the id of the food item to update.
        let recordToUpdate = [req.params.id];

        /**
         * This SQL command retrieves the record of the food item given its id.
         * @param type Receives the id of a food item.
         * @return Returns the record/row values of that food item.
        */          
        let sqlQuery = "SELECT * FROM Foods WHERE id=?";

        /**
         * This method queries the database to retrieve the record of 
         * the food item given its id.
         * @param type Receives the SQL command, id of the food item, 
         * result of the query and/or errors if any.
         * @return Returns the record/row values of that food item as an object 
         * stored in a variable and to be rendered on the updateFood page.
        */ 
        db.query(sqlQuery, recordToUpdate, (err, result) => {
            if (err)
            {
                // If database query errors, redirect to home page.
                res.redirect("/topic7/midterm/");
            }
            if (result.length > 0)
            {
                res.render("updateFood.html", {foodToBeUpdated: result});
            }
        });
    });


    /**
     * This method is called on the Express app object, when the app 
     * receives a request to the list route using the GET method, 
     * to retrieve and render the listFoods page containing all foods from the database.
     * @param type Receives a request to the list route via the HTTP GET method.
     * @return Renders the corresponding HTML page of the listFoods page 
     * and a variable storing all the food items' values from the database 
     * to be passed to the EJS template.
    */   
    app.get("/list", (req, res) => {
        /**
         * This SQL command retrieves the records of all food items in the database,
         * sorted by name in ascending order.
         * @param type No params.
         * @return Returns the record/row values of all food items, sorted by name.
        */ 
        let sqlQuery = "SELECT * FROM Foods ORDER BY Name";

        /**
         * This method queries the database to retrieve the records of all food items,
         * sorted by name, and pass these records to be rendered on the listFoods page.
         * @param type Receives the SQL command, result of the query and/or errors if any.
         * @return Returns the records of all food items as objects 
         * stored in a variable to be rendered on the listFoods page.
        */ 
        db.query(sqlQuery, (err, result) => {
            if (err)
            {
                // If database query errors, redirect to home page.
                res.redirect("/topic7/midterm/");
            }
            res.render("listFoods.html", {availableFoods: result});
        });
    });


    /**
     * This method is called on the Express app object, when the app 
     * receives a request to the foodAdded route using the POST method, 
     * to insert the new food into the database and output a confirmation page.
     * @param type Receives a request to the foodAdded route via the HTTP POST method.
     * @return Renders a confirmation page indicating that the food has 
     * been added to the database.
    */      
    app.post("/foodAdded", (req, res) => {
        /**
         * This SQL command inserts a new food item record into the database.
         * @param type Receives all nine values for each field in the Foods table.
         * @return No return.
        */ 
        let sqlQuery = `INSERT INTO Foods
                        (Name, TypicalValues, UnitOfTheTypicalValue, 
                         Calories, Carbs, Fat, Protein, Salt, Sugar) 
                        VALUES(?,?,?,?,?,?,?,?,?)`;
        
        // Storing data to be inserted into the database.
        let newRecord = [req.body.Name, 
                         req.body.TypicalValues, 
                         req.body.UnitOfTheTypicalValue, 
                         req.body.Calories, 
                         req.body.Carbs, 
                         req.body.Fat, 
                         req.body.Protein, 
                         req.body.Salt, 
                         req.body.Sugar];

        /**
         * This method executes the SQL command to store the new food record in the database
         * and renders a confirmation page indicating that the food has been added.
         * @param type Receives the SQL command, the values of the new record to be inserted 
         * (stored in the request body), result of the query (not required in this case) 
         * and/or errors if any.
         * @return No return, but stores the name of the food item as an object 
         * stored in a variable to be rendered on the confirmation page.
        */ 
        db.query(sqlQuery, newRecord, (err, result) => {
            if (err)
            {
                return console.error(err.message);
            }
            else
            {
                res.render("confirmationPage.html", {message: req.body.Name + " added"});
            }
        });
    });


    /**
     * This method is called on the Express app object, when the app 
     * receives a request to the foodUpdated route using the POST method 
     * and including the food's id, to update the food's values in the database 
     * and output a confirmation page.
     * @param type Receives a request to the foodUpdated route via the HTTP POST method 
     * and including the id of the food item to be updated.
     * @return Renders a confirmation page indicating that the food has 
     * been updated in the database.
    */      
    app.post("/foodUpdated/:id", (req, res) => {
        /**
         * This SQL command updates a food item record in the database given the food's id.
         * @param type Receives all values for each food item field to be 
         * updated in the Foods table and the id of that food item.
         * @return No return.
        */ 
        let sqlQuery = `UPDATE Foods
                        SET Name = ?, TypicalValues = ?, UnitOfTheTypicalValue = ?, 
                        Calories = ?, Carbs = ?, Fat = ?, Protein = ?, Salt = ?, Sugar = ?
                        WHERE id=?`;

        // Storing data to be updated in the database.
        let newRecord = [req.body.Name, 
                         req.body.TypicalValues, 
                         req.body.UnitOfTheTypicalValue, 
                         req.body.Calories, 
                         req.body.Carbs, 
                         req.body.Fat, 
                         req.body.Protein, 
                         req.body.Salt, 
                         req.body.Sugar,
                         req.params.id];

        /**
         * This method executes the SQL command to update the existing food record in the database
         * and renders a confirmation page indicating that the food has been updated.
         * @param type Receives the SQL command, the values for the record to be updated 
         * (stored in the request body with the food item's id stored with it), 
         * the result of the query (not required in this case) and/or errors if any.
         * @return No return, but stores the name of the food item as an object 
         * stored in a variable to be rendered on the confirmation page.
        */ 
        db.query(sqlQuery, newRecord, (err, result) => {
            if (err)
            {
                return console.error(err.message);
            }
            else
            {
                res.render("confirmationPage.html", {message: req.body.Name + " updated"});
            }
        });
    });


    /**
     * This method is called on the Express app object, when the app 
     * receives a request to the foodDeleted route using the POST method 
     * and including the food's id and name, to delete the food record from the database 
     * and output a confirmation page.
     * @param type Receives a request to the foodDeleted route via the HTTP POST method 
     * and including the id and name of the food item to be deleted.
     * @return Renders a confirmation page indicating that the food has 
     * been deleted from the database.
    */      
    app.post("/foodDeleted/:id/:Name", (req, res) => {
        /**
         * This SQL command deletes a food item record from the database given the food's id.
         * @param type Receives the id of the food item to be deleted.
         * @return No return.
        */ 
        let sqlQuery = `DELETE FROM Foods WHERE id=?`;
        
        // Storing the id of the food item to be deleted.
        let recordToDelete = [req.params.id];

        // Storing the name of the food item to be deleted.
        let deletedFood = [req.params.Name];

        /**
         * This method executes the SQL command to delete the existing 
         * food record from the database and renders a confirmation page 
         * indicating that the food has been deleted.
         * @param type Receives the SQL command, the id of the record to be deleted 
         * (stored in the request params), the result of the query 
         * (not required in this case) and/or errors if any.
         * @return No return, but stores the name of the food item as an object 
         * stored in a variable to be rendered on the confirmation page.
        */         
        db.query(sqlQuery, recordToDelete, (err, result) => {
            if (err)
            {
                return console.error(err.message);
            }
            else
            {
                res.render("confirmationPage.html", {message: deletedFood + " deleted"});
            }
        });
    });
}