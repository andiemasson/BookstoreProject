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
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, bool sortAscending = true)
        {
            var booksQuery = _context.Books.AsQueryable();

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
        
    }
    
}