// Controllers/BooksController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AssignmentBackend.Models;
using AssignmentBackend.Data;
using Microsoft.AspNetCore.Authorization;


    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BooksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/Books
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Book>> AddBook(Book book)
        {
            if (book == null)
            {
                return BadRequest("Invalid book data.");
            }

            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBook), new { id = book.BookId }, book);
        }



  [HttpGet("{id}")]
    public async Task<ActionResult<Book>> GetBook(int id)
    {
        var book = await _context.Books.FindAsync(id);
        if (book == null)
        {
            return NotFound();
        }

        return Ok(book);
    }
        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult<Book>> GetBooks()
         {
            try
            {
                var books = await _context.Books.ToListAsync();
                
                // Check if no books found
                if (books == null || books.Count == 0)
                {
                    return NotFound("No books found.");
                }

                return Ok(books);
            }
            catch (Exception ex)
            {
                // Log the exception if necessary and return a bad request error
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        // DELETE: api/Books/{id}
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound(new { message = "Book not found." });
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Book deleted successfully." });
        }
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, Book book)
        {
            if (id != book.BookId)
            {
                return BadRequest("Book ID mismatch.");
            }

            // Check if the book exists in the database
            var existingBook = await _context.Books.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound($"Book with ID {id} not found.");
            }

            // Update the book details
            existingBook.Title = book.Title;
            existingBook.Author = book.Author;
            existingBook.PublicationDate = book.PublicationDate;
            existingBook.ImageUrl = book.ImageUrl;

            // Save changes to the database
            await _context.SaveChangesAsync();

            // Return a response with the updated book
            return Ok(existingBook);
        }

    }

