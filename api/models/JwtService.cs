using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;


namespace api.models
{
    public class JwtService
{
    private readonly string _secretKey;
        private readonly string _issuer;

        public JwtService(string secretKey = null, string issuer = null)
        {
            // Use default values if not provided
            _secretKey = secretKey ?? "64mD9vM6xilc+NZTDrsAJPR3cfClCLYulsTbet1YpTg=";
            _issuer = issuer ?? "AdoptAPet";
        }

    public string GenerateToken(string email, string role)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Convert.FromBase64String(_secretKey);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.Role, role)
            }),
            Expires = DateTime.UtcNow.AddDays(1), // Token expiration time
            Issuer = _issuer,
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
}