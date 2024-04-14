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
        [HttpGet("{UserID}", Name = "GetUserByID")]
        public User GetUserByID(int UserID)  // Change parameter name to 'id'
        {
            IGetUser readObject = new ReadUserData();
            return readObject.GetUser(UserID);  // Use the 'id' parameter to get the user
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
        [HttpPut("{UserID}")]
        public IActionResult Put(int UserID, [FromBody] User updatedUser)
        {
            if (UserID != updatedUser.UserID)
            {
                return BadRequest();
            }

            IUpdateUser updateObject = new UpdateUserData();
            updateObject.UpdateUser(UserID, updatedUser);

            return NoContent();
        }

        // DELETE: api/User/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{UserID}")]
        public IActionResult Delete(int UserID)
        {
            IDeleteUser deleteObject = new DeleteUserData();
            deleteObject.DeleteUser(UserID);

            return NoContent();
        }
    }
}
