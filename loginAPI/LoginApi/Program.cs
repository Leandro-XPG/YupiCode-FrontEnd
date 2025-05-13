using Microsoft.EntityFrameworkCore;
using LoginApi.Data;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, new MySqlServerVersion(new Version(8,0,29))));

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",policy =>
    {
        policy.WithOrigins("https://leandro-xpg.github.io/YupiCode/")
                .AllowAnyHeader()
                .AllowAnyMethod();
    });
});
var app = builder.Build();

app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.MapControllers();
app.Run();

