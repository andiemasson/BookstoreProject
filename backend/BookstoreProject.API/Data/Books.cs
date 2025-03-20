using System.ComponentModel.DataAnnotations;

namespace BookstoreProject.API.Data;

public class Books
{
    [Key]
    public int BookId { get; set; }
    
    public required string Title { get; set; }
    
    public required string Author { get; set; }

    public required string Publisher { get; set; }
 
    public required string ISBN { get; set; }

    public required string Classification { get; set; }
 
    public required string Category { get; set; }
  
    public required int PageCount { get; set; }
 
    public required string Price { get; set; }
}