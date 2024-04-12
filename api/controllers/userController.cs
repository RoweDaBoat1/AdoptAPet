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
        // GET: api/User
        [EnableCors("OpenPolicy")]
        [HttpGet]
        public List<User> GetAllUsers()
        {
            IGetAllUsers readObject = new ReadUserData();
            return readObject.GetAllUsers();
        }

        // GET: api/User/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{id}", Name = "GetUserByID")]
        public User GetUserByID(int id)  // Change parameter name to 'id'
        {
            IGetUser readObject = new ReadUserData();
            return readObject.GetUser(id);  // Use the 'id' parameter to get the user
        }


        // POST: api/User
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] User value)
        {
            IInsertUser insertObject = new SaveUser();
            insertObject.InsertUser(value);
        }

        // PUT: api/User/5
        [EnableCors("OpenPolicy")]
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] User updatedUser)
        {
            if (id != updatedUser.UserID)
            {
                return BadRequest();
            }

            IUpdateUser updateObject = new UpdateUserData();
            updateObject.UpdateUser(id, updatedUser);

            return NoContent();
        }

        // DELETE: api/User/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int ID)
        {
            IDeleteUser deleteObject = new DeleteUserData();
            deleteObject.DeleteUser(ID);

            return NoContent();
        }
    }
}
