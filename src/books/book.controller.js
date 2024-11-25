const Book = require('./book.model');



// post book
const postAbook = async (req, res) => {
    try {
        const newBook = await Book({...req.body});
        await newBook.save();
        res.status(200).send({messege: "Book posted succesfully", book: newBook})
    } catch (error) {
        console.error("error creating book", error)
        res.status(500).send({messege: "failed to create book"})
    }
}

// get book
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({createdAt: -1});
        res.status(200).send(books)
        
    } catch (error) {
        console.error("error fetching book", error)
        res.status(500).send({messege: "failed to fetch book"})
    }
}

// get single Book
const getSingleBook = async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id)
        if(!book){
            res.status(404).send({messege: "book not found"})
        }
        res.status(200).send(book)
    } catch (error) {
        console.error("error fetching book", error)
        res.status(500).send({messege: "failed to fetch book"})
    }
}

// update book data
const UpdateBook = async (req, res) => {
    try {
        const {id} = req.params;
        const UpdateBook = await Book.findByIdAndUpdate(id, req.body, {new: true});
        if(!UpdateBook){
            res.status(404).send({messege: "book not found"})
        }
        res.status(200).send({
            messege: "book updated succesfully", 
            book: UpdateBook
        })
    } catch (error) {
        console.error("error updating book", error)
        res.status(500).send({messege: "failed to update book"})
    }
}

// delete Book
const deleteABook = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedBook = await Book.findByIdAndDelete(id)
        if(!deletedBook){
            res.status(404).send({message: "Book not found"})
        }
        res.status(200).send({
            message: "book deleted succesfully",
            book: deletedBook
        })
    }catch(error) {
        console.error("error deleting a book");
        res.status(500).send({message: "faild to delete a book"})
    }
}


module.exports = {
    postAbook, 
    getAllBooks,
    getSingleBook,
    UpdateBook,
    deleteABook
}