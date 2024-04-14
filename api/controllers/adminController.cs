using api.models;
using api.models.interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        // GET: api/Admin
        [EnableCors("OpenPolicy")]
        [HttpGet]
        public List<Admin> GetAllAdmins()
        {
            IGetAllAdmins readObject = new ReadAdminData();
            return readObject.GetAllAdmins();
        }

        // GET: api/Admin/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{id}", Name = "GetAdminByID")]
        public Admin GetAdminByID(int id)  // Change parameter name to 'id'
        {
            IGetAdmin readObject = new ReadAdminData();
            return readObject.GetAdmin(id);  // Use the 'id' parameter to get the Admin
        }


        // POST: api/Admin
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] Admin value)
        {
            IInsertAdmin insertObject = new SaveAdmin();
            insertObject.InsertAdmin(value);
        }

        // PUT: api/Admin/5
        [EnableCors("OpenPolicy")]
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Admin updatedAdmin)
        {
            if (id != updatedAdmin.ID)
            {
                return BadRequest();
            }

            IUpdateAdmin updateObject = new UpdateAdminData();
            updateObject.UpdateAdmin(id, updatedAdmin);

            return NoContent();
        }

        // DELETE: api/Admin/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            IDeleteAdmin deleteObject = new DeleteAdminData();
            deleteObject.DeleteAdmin(id);

            return NoContent();
        }
    }
}
