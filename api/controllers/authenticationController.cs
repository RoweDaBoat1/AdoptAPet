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
    public class authenticationController : ControllerBase
    {

        [HttpPost("login")]
        public IActionResult Login(string username, string password)
        {
            IAuthService authObject = new AuthenticationManager();

            // Call authentication manager to validate credentials
            bool isAuthenticated = authObject.AuthenticateUser(username, password);

            if (isAuthenticated)
            {
                return Ok("Authentication successful"); // Return success message on successful login
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
