using Microsoft.AspNetCore.Mvc;
using LoginApi.Models;

namespace LoginApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        [HttpPost]
        public IActionResult Post([FromBody] LoginRequest login)
        {
            string emailPadrao = "admin@gmail.com";
            string senhaPadrao = "1234";

            if(login.Email == emailPadrao && login.Senha == senhaPadrao)
            {
                return Ok(new
                {
                    sucesso = true,
                    mensagem = "Login realizado com sucesso!",
                    usuario = login.Email
                });
           
            }
             return Unauthorized(new
            {
                sucesso = false,
                mensagem = "Informações inválidas!"
            });
        }
    }
}