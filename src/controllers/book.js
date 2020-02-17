import BookDAO from '../dao/book';

export default class BookController {
    static async apiGetBooks(req, res) {
        try {
            const books = await BookDAO.getBooks();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(books);
            return books;
        } catch(error) {
            res.status(500);
            res.json({error});
            return error;
        }
    }
}
