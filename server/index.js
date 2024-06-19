require("dotenv").config();
const cors = require("cors");
//including express module
const express = require("express"); //express used to start our server
//importing connectDB file
const connectDB = require("./connectDB");
const Book = require('./models/Books');
const multer = require("multer");

const app = express();
//setting the port number, 8000 is default port number
const PORT = process.env.PORT || 8000;


connectDB();
//using middleware
app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use("/uploads", express.static(static(path.join(__dirname, 'uploads')))); 

//creating a route
app.get("/api/books", async (req,res) => {
    try {
        const category = req.query.category;
        const filter = category ? { category } : {};
        const data = await Book.find(filter);
        res.json(data);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ error: "An error occurred while fetching books." });
    }
});

//getting route the details of book
app.get("/api/books/:slug", async (req,res) => {
    try {
        const slugParam = req.params.slug;
        const data = await Book.findOne({ slug: slugParam});
        res.json(data);
    } catch (error) {
        console.error("Error fetching book details:", error);
        res.status(500).json({error: "An error occured while fetching books."});
    }
});

//multer code
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage})

//uploading pictures
app.post("/api/books", upload.single("thumbnail"), async (req,res) => {
    try {
        console.log(req.body);
        console.log(req.file);

        const newBook = new Book({
            title: req.body.title,
            slug: req.body.slug,
            stars: req.body.stars,
            description: req.body.description,
            category: req.body.category,
            thumbnail: req.file.filename,
        })

        //  await Book.create(newBook);
        await newBook.save();
        res.json("Data Submitted");
    } catch (error) {
        console.error("Error submitting book data:", error);
        res.status(500).json({error: "An error occured while fetching books."});
    }
});


app.put("/api/books", upload.single("thumbnail"), async (req,res) => {
    try {

        const bookId = req.body.bookId;

        const updateBook = {
            title: req.body.title,
            slug: req.body.slug,
            stars: req.body.stars,
            description: req.body.description,
            category: req.body.category,
            thumbnail: req.body.thumbnail,
        }

        if(req.file){
            updateBook.thumbnail = req.file.filename;
        }

        await Book.findByIdAndUpdate(bookId, updateBook)
        res.json("Data Submitted");
    } catch (error) {
        console.error("Error updating book data:", error);
        res.status(500).json({error: "An error occured while fetching books."});
    }
});
/*app.post("/api/books", async (req,res) => {
    try {
        console.log(req.body);

        const newBook = new Book({
            title: req.body.title,
            slug: req.body.slug,
            stars: req.body.stars,
            description: req.body.description,
            category: req.body.category,
            //thumbnail: req.body.thumbnail,
        })

        await Book.create(newBook);
        res.json("Data Submitted");
    } catch (error) {
        res.status(500).json({error: "An error occured while fetching books."});
    }
});*/

app.get("*", (req,res) => {
    res.sendStatus("404");
});

app.listen(PORT, ()=> {
    console.log(`Server is running on the Port: ${PORT}`);
});

app.delete("/api/books/:id", async (req, res) => {
    const bookId = req.params.id;

    try {
        await Book.deleteOne({_id: bookId});
        res.json("Delete " + req.body.bookId);
    } catch (error) {
        res.json(error);
    }
});


