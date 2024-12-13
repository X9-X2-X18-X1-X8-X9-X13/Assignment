using Microsoft.Extensions.FileProviders;
using Microsoft.EntityFrameworkCore;
using AssignmentBackend.Data;
using AssignmentBackend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Register ApplicationDbContext with MySQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddScoped<JwtService>(provider =>
{
    return new JwtService(builder.Configuration["Jwt:Secret"]);
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false, // Disable 'iss' validation
        ValidateAudience = false, // Disable 'aud' validation
        ValidateLifetime = true, // Ensure the token hasn't expired
        ValidateIssuerSigningKey = true, // Validate the signature
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("VGhpcyBpcyBhIHZlcnkgc2VjdXJlIGtleQ=="))
    };
});
var app = builder.Build();

// Serve Angular static files
app.UseDefaultFiles();
app.UseStaticFiles();

// Fallback for Angular routing
app.MapFallbackToFile("index.html");

app.MapControllers();
app.Run();
