using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.models;
using api.models.interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdoptionController : ControllerBase
    {
        // GET: api/Adoption
        [EnableCors("OpenPolicy")]
        [HttpGet]
        public List<PetAdoption> GetAllAdoptions()
        {
            IGetAllPetAdoptions readObject = new ReadPetAdoptionData();
            return readObject.GetAllPetAdoptions();
        }

        // GET: api/Adoption/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{AdoptionID}", Name = "GetAdoptionByID")]
        public PetAdoption GetAdoptionByID(int AdoptionID)
        {
            IGetPetAdoption readObject = new ReadPetAdoptionData();
            return readObject.GetPetAdoption(AdoptionID);
        }

        // POST: api/Adoption
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] PetAdoption value)
        {
            IInsertPetAdoption insertObject = new SavePetAdoption();
            insertObject.InsertPetAdoption(value);
        }

        // PUT: api/Adoption/5
        [EnableCors("OpenPolicy")]
        [HttpPut("{AdoptionID}")]
        public IActionResult Put(int AdoptionID, [FromBody] PetAdoption updatedAdoption)
        {
            if (AdoptionID != updatedAdoption.AdoptionID)
            {
                return BadRequest();
            }

            IUpdatePetAdoption updateObject = new UpdatePetAdoptionData();
            updateObject.UpdatePetAdoption(AdoptionID, updatedAdoption);

            return NoContent();
        }

        // DELETE: api/Adoption/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{AdoptionID}")]
        public IActionResult Delete(int AdoptionID)
        {
            IDeletePetAdoption deleteObject = new DeletePetAdoptionData();
            deleteObject.DeletePetAdoption(AdoptionID);

            return NoContent();
        }
    }
}