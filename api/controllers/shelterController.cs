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
    public class sheltersController : ControllerBase
    {
        // GET: api/Shelter
        [EnableCors("OpenPolicy")]
        [HttpGet]
        public List<Shelter> GetAllShelters()
        {
            IGetAllShelters readObject = new ReadShelterData();
            return readObject.GetAllShelters();
        }

        // GET: api/Shelter/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{ShelterID}", Name = "GetShelterByID")]
        public Shelter GetShelterByID(int ShelterID)
        {
            IGetShelter readObject = new ReadShelterData();
            return readObject.GetShelter(ShelterID);
        }

        // // GET: api/Shelter/TuscaloosaMetro
        // [EnableCors("OpenPolicy")]
        // [HttpGet("{Shelter_Name}", Name = "GetShelterByName")]
        // public Shelter GetShelterByName(string Shelter_Name)
        // {
        //     IGetShelter readObject = new ReadShelterData();
        //     return readObject.GetShelterByName(Shelter_Name);
        // }

        // POST: api/Shelter
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] Shelter value)
        {
            IInsertShelter insertObject = new SaveShelter();
            insertObject.InsertShelter(value);
        }

        // PUT: api/Shelters/5
        [EnableCors("OpenPolicy")]
        [HttpPut("{ShelterID}")]
        public IActionResult Put(int ShelterID, [FromBody] Shelter updatedShelter)
        {
            if (ShelterID != updatedShelter.ShelterID)
            {
                return BadRequest();
            }

            IUpdateShelter updateObject = new UpdateShelterData();
            updateObject.UpdateShelter(ShelterID, updatedShelter);

            return NoContent();
        }

        // DELETE: api/Shelter/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{ShelterID}")]
        public IActionResult Delete(int ShelterID)
        {
            IDeleteShelter deleteObject = new DeleteShelterData();
            deleteObject.DeleteShelter(ShelterID);

            return NoContent();
        }
    }
}
