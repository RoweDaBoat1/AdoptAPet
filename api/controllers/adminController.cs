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
        [HttpGet("{AdminID}", Name = "GetAdminByID")]
        public Admin GetAdminByID(int AdminID)  // Change parameter name to 'id'
        {
            IGetAdmin readObject = new ReadAdminData();
            return readObject.GetAdmin(AdminID);  // Use the 'id' parameter to get the Admin
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
        [HttpPut("{AdminID}")]
        public IActionResult Put(int AdminID, [FromBody] Admin updatedAdmin)
        {
            if (AdminID != updatedAdmin.AdminID)
            {
                return BadRequest();
            }

            IUpdateAdmin updateObject = new UpdateAdminData();
            updateObject.UpdateAdmin(AdminID, updatedAdmin);

            return NoContent();
        }

        // DELETE: api/Admin/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{AdminID}")]
        public IActionResult Delete(int AdminID)
        {
            IDeleteAdmin deleteObject = new DeleteAdminData();
            deleteObject.DeleteAdmin(AdminID);

            return NoContent();
        }
    }
}
