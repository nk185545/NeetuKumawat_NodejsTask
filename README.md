# NeetuKumawat_NodejsTask


1) **List of all libraries** : 

        a) express : used for making the express app.
    
         b) body-parsor : In order to get access to the post data we have to use body-parser . Basically what the body-parser is which allows express to read the body and then parse that into a Json object that we can understand
    
        c) hbs : this is the file like HTML, but  these have ability to render DYNAMIC content.
    
        d) fs : for using the file system 
    
        e) express-fileupload : File uploading means a user from client machine requests to upload file to the server. we used for upload images etc.
    
        f) multer :  Multer is a node.js middleware which is used for handling multipart/form-data, which is mostly used library for uploading files(images).
    
        g) path : for working with file and directory paths 
    
        h) sqlite3 : for working with the SQLITE3 database
    
        i) localStorage : for working with localStorage 
    
    **Frameworks** : ExpressJS
    
    **Database** :  Sqlite3
    
 2) **PLUS POINTS** :
 
    a) **Use JSON for interactions/ communication through APIs** :
            -->> query1) Fetching all the patients in an order for a single psychiatrist (without photos).
             query2)Fetch the count of how many patients are registered for each psychiatrist in a hospital.This should return, hospital name, psychiatrist name, patients count.
              for this, I fetch data from the database and render them as a json format.(stored collection is postman)
              
     b) **Used SQLite3 to store all the data**
     
     c)**Used Postman to list APIs** 
     
     d)Couldn't perform unit test on APIs 
     
     e)**For user Authentication :** I have used the localStorage and database. when new user login then a new token is stored in browser memory and that is stord in database also along with email. Everytime token will be checked and if user has not a valid token then he will be thrown to login page. After logout that token will  be deleted from database and localStorage.
     
     
     

     
     
    
    
 
