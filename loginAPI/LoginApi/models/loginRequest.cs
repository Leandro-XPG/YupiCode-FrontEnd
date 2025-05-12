namespace LoginApi.Models
{
    public class LoginRequest
    {
        public int Id { get; set;}
        public string Nome {get; set;}
        public string Email {get; set;}
        public string Senha {get; set;}

        public NivelEnum Nivel {get; set;}

    }

    public enum NivelEnum 
    {
        Iniciante,
        Intermediario,
        Avancado
    }
}