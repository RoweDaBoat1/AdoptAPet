using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.models;
using api.models.interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class userController : ControllerBase
    {
        // GET: api/Users
        [EnableCors("OpenPolicy")]
        [HttpGet]
        public List<User> GetAllUsers()
        {
            IGetAllUsers readObject = new ReadUserData();
            return readObject.GetAllUsers();
        }

        // GET: api/Users/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{id}", Name = "GetUserByID")]
        public User GetUserByID(int ID)
        {
            IGetUser readObject = new ReadUserData();
            return readObject.GetUser(ID);
        }

        // POST: api/Users
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] User value)
        {
            IInsertUser insertObject = new SaveUser();
            insertObject.InsertUser(value);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
