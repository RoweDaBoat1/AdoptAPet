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
        [HttpGet("{id}", Name = "GetShelterByID")]
        public Shelter GetShelterByID(int ID)
        {
            IGetShelter readObject = new ReadShelterData();
            return readObject.GetShelter(ID);
        }

        // POST: api/Shelter
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] Shelter value)
        {
            IInsertShelter insertObject = new SaveShelter();
            insertObject.InsertShelter(value);
        }

        // PUT: api/Shelter/5
        [EnableCors("OpenPolicy")]
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Shelter updatedShelter)
        {
            if (id != updatedShelter.ShelterID)
            {
                return BadRequest();
            }

            IUpdateShelter updateObject = new UpdateShelterData();
            updateObject.UpdateShelter(id, updatedShelter);

            return NoContent();
        }

        // DELETE: api/Shelter/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            IDeleteShelter deleteObject = new DeleteShelterData();
            deleteObject.DeleteShelter(id);

            return NoContent();
        }
    }
}
