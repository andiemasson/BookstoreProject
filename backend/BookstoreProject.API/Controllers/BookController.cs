using BookstoreProject.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft .AspNetCore.Http;
using System.Linq;

namespace BookstoreProject.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
        
    public class BookController : ControllerBase
    {
        private BookStoreContext _context;

        public BookController(BookStoreContext temp) => _context = temp;
        
        [HttpGet]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, bool sortAscending = true, [FromQuery] List<string>? bookCategory = null)
        {
            var booksQuery = _context.Books.AsQueryable();
            
            if (bookCategory != null && bookCategory.Any())
            {
                booksQuery = booksQuery.Where(b => bookCategory.Contains(b.Category));
            }

            booksQuery = sortAscending 
                ? booksQuery.OrderByDescending(x => x.Title) 
                : booksQuery.OrderBy(x => x.Title);
            
            var books = booksQuery
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            
            var totalNumBooks = _context.Books.Count();

            var response = new
            {
                Books = books,
                TotalNumBooks = totalNumBooks
            };

            return Ok(response);
        }

        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes()
        {
            var bookTypes = _context.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();
                
            return Ok(bookTypes);
        }
        
        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Books newBook)
        {
            _context.Books.Add(newBook);
            _context.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Books updatedBook)
        {
            var existingBook = _context.Books.Find(bookId);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.Classification = updatedBook.Classification;

            _context.Books.Update(existingBook);
            _context.SaveChanges();

            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var book = _context.Books.Find(bookId);

            if (book == null)
            {
                return NotFound(new {message = "Book not found"});
            }

            _context.Books.Remove(book);
            _context.SaveChanges();

            return NoContent();
        }
    }

    
}