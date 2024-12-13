namespace AssignmentBackend.Models
{
    public class Book
    {
        public int BookId { get; set; }  // Primary key
        public string Title { get; set; }
        public string Author { get; set; }
        public string? PublicationDate { get; set; }
        public string? ImageUrl { get; set; }  
    }
}
