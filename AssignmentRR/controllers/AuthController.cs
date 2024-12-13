using Microsoft.AspNetCore.Mvc;
using AssignmentBackend.Data;
using AssignmentBackend.Models;
using AssignmentBackend.Services;

namespace AssignmentBackend.Controllers 
{
    [ApiController]
    [Route("api/[controller]")] // The base route will be `api/auth`

    public class AuthController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private readonly JwtService _jwtService;

           // Inject ApplicationDbContext via constructor
          public AuthController(ApplicationDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        // Login POST endpoint
        [HttpPost("login")] // Full route: api/auth/login
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Example validation logic
            try{
                if(IsValid(request))
                    {
                    var token = JwtService.GenerateToken(request.Email);
                        return Ok(new { Token = token, Message = "Login successful!" });
                    }
                    
                return Unauthorized(new { Message = "Invalid credentials" });
            
            }catch( Exception ex ){
                   // Log the exception for debugging
                Console.WriteLine(ex.Message);
                     // Return a JSON-formatted error response
                return StatusCode(500, new { Message = "An unexpected error occurred." });
            }
           

        }



        // SignUp POST endpoint
        [HttpPost("signup")] // Full route: api/auth/signup
        public IActionResult SignUp([FromBody] SignUpRequest request)
        {
            // Check if user already exists with the same email
            var existingUser = _context.Users.FirstOrDefault(u => u.Email == request.Email);
            if (existingUser != null)
            {
                return BadRequest(new { Message = "User with this email already exists" });
            }

            // Hash the password
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);

            // Create new user
            var newUser = new User
            {
                Email = request.Email,
                PasswordHash = hashedPassword
            };

            // Save user to database
            _context.Users.Add(newUser);
            _context.SaveChanges();

            return Ok(new { Message = "User registered successfully!" });
        }



        public Boolean IsValid(LoginRequest r){
             // Query the database for the user
            var user =  _context.Users.FirstOrDefault(u => u.Email == r.Email);
            if(user != null)
                {
                    return BCrypt.Net.BCrypt.Verify(r.Password, user.PasswordHash);
                }

            return false;
        }
    }

    // Request data model
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
        // SignUp request data model
    public class SignUpRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
 
}
