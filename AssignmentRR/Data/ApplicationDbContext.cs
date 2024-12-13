using Microsoft.EntityFrameworkCore;
using AssignmentBackend.Models;

namespace AssignmentBackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        // Define DbSets for your tables
        public DbSet<User> Users { get; set; }
        public DbSet<Quote> Quotes { get; set; }
        public DbSet<Book> Books { get; set; }

    }

}
