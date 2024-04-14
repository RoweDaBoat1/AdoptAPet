using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.models;
using api.models.interfaces;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly JwtService _jwtService;

        public AuthenticationController(JwtService jwtService)
        {
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public IActionResult Login(string email, string password, string role)
        {
            IAuthService authObject = new AuthenticationManager();

            // Call authentication manager to validate credentials
            bool isAuthenticated = authObject.AuthenticateUser(email, password, role);

            if (isAuthenticated)
            {
                // Generate JWT token using JwtService
                var token = _jwtService.GenerateToken(email, role);
                return Ok(new { token }); // Return the token
            }

            return Unauthorized("Authentication failed"); // Return unauthorized status if authentication fails
        }

        // PUT: api/authentication/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/authentication/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        // GET: api/authentication
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/authentication/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }
    }
}
