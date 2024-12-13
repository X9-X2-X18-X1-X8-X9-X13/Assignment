using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace AssignmentBackend.Services
{
    public class JwtService
    {
        private readonly string _jwtSecret;

        public JwtService(string jwtSecret)
        {
            _jwtSecret = jwtSecret;
        }

    private static readonly string secretKey = "VGhpcyBpcyBhIHZlcnkgc2VjdXJlIGtleQ=="; // Example Base64 key
    public static string GenerateToken(string email)
{
    
    var tokenHandler = new JwtSecurityTokenHandler();
    var key = Encoding.ASCII.GetBytes(secretKey);

    var tokenDescriptor = new SecurityTokenDescriptor
    {
        Subject = new ClaimsIdentity(new[]
        {
            new Claim(ClaimTypes.Email, email)
        }),
        Expires = DateTime.UtcNow.AddHours(1),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
    };

    var token = tokenHandler.CreateToken(tokenDescriptor);
    return tokenHandler.WriteToken(token);
}

    }
    
}
