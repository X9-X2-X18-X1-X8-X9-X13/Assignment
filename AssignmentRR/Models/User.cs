 using System.ComponentModel.DataAnnotations.Schema;
 
 namespace AssignmentBackend.Models
 {
    public class User
    {
        public int UserId { get; set; }  //PRIMARY Key
                  
        [Column("email")]  
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }

    }
 }