using Microsoft.AspNetCore.Mvc;
using LoginApi.Models;
using LoginApi.Data;
using Microsoft.EntityFrameworkCore;



namespace LoginApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegistrarController : ControllerBase
    {

    private readonly AppDbContext _context;

    public RegistrarController(AppDbContext context)
    {
        _context = context;
    }
    
    [HttpPost]

    public async Task<IActionResult> Registrar([FromBody] Usuario usuario)
    {
        bool existe = await _context.Usuarios.AnyAsync(u => u.Email == usuario.Email || u.Nome == usuario.Nome );
        if(existe)
        {
            return BadRequest("E-mail ou nome de usuario ja existem!");
        }

        _context.Usuarios.Add(usuario);
        await _context.SaveChangesAsync();

        return Ok("Usuario cadastrado com sucesso!");
    }
    }}