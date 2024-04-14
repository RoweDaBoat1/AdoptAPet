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
    public class ShelterPrivacyController : ControllerBase
    {
        // GET: api/ShelterPrivacys
        [EnableCors("OpenPolicy")]
        [HttpGet]
        public List<ShelterPrivacy> GetAllShelterPrivacy()
        {
            IGetAllShelterPrivacy readObject = new ReadShelterPrivacyData();
            return readObject.GetAllShelterPrivacy();
        }

        // GET: api/ShelterPrivacys/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{ShelterID}", Name = "GetShelterPrivacyByID")]
        public ShelterPrivacy GetShelterPrivacyByID(int ShelterID)
        {
            IGetShelterPrivacy readObject = new ReadShelterPrivacyData();
            return readObject.GetShelterPrivacy(ShelterID);
        }

        // POST: api/ShelterPrivacys
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] ShelterPrivacy value)
        {
            IInsertShelterPrivacy insertObject = new SaveShelterPrivacy();
            insertObject.InsertShelterPrivacy(value);
        }

        // PUT: api/ShelterPrivacys/5
        [EnableCors("OpenPolicy")]
        [HttpPut("{ShelterID}")]
        public IActionResult Put(int ShelterID, [FromBody] ShelterPrivacy updatedShelterPrivacy)
        {
            if (ShelterID != updatedShelterPrivacy.ShelterID)
            {
                return BadRequest();
            }

            IUpdateShelterPrivacy updateObject = new UpdateShelterPrivacyData();
            updateObject.UpdateShelterPrivacy(ShelterID, updatedShelterPrivacy);

            return NoContent();
        }

        // DELETE: api/ShelterPrivacys/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{ShelterID}")]
        public IActionResult Delete(int ShelterID)
        {
            IDeleteShelterPrivacy deleteObject = new DeleteShelterPrivacyData();
            deleteObject.DeleteShelterPrivacy(ShelterID);

            return NoContent();
        }
    }
}
