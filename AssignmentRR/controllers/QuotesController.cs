using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AssignmentBackend.Data;
using AssignmentBackend.Models;
using Microsoft.AspNetCore.Authorization;

[Route("api/[controller]")]
[ApiController]
public class QuotesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public QuotesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Quote>>> GetQuotes()
    {
        var quotes = await _context.Quotes.ToListAsync();
        return Ok(quotes);
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteQuote(int id)
    {
        var quote = await _context.Quotes.FindAsync(id);
        if (quote == null)
        {
            return NotFound();
        }

        _context.Quotes.Remove(quote);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Quote>> AddQuote([FromBody] Quote newQuote)
    {
        if (newQuote == null || string.IsNullOrWhiteSpace(newQuote.Text) || string.IsNullOrWhiteSpace(newQuote.Author))
        {
            return BadRequest("Quote text and author are required.");
        }

        _context.Quotes.Add(newQuote);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetQuotes), new { id = newQuote.QuoteId }, newQuote);
    }
}
