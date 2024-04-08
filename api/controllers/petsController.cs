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
    public class petsController : ControllerBase
    {
        // GET: api/pets
        [EnableCors("OpenPolicy")]
        [HttpGet]
        public List<Pet> GetAllPets()
        {
            IGetAllPets readObject = new ReadPetData();
            return readObject.GetAllPets();
        }

        // GET: api/pets/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{id}", Name = "GetPetByID")]
        public Pet GetPetByID(int ID)
        {
            IGetPet readObject = new ReadPetData();
            return readObject.GetPet(ID);
        }

        // POST: api/pets
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] Pet value)
        {
            IInsertPet insertObject = new SavePet();
            insertObject.InsertPet(value);
        }

        // PUT: api/pets/5
        [EnableCors("OpenPolicy")]
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Pet updatedPet)
        {
            if (id != updatedPet.PetID)
            {
                return BadRequest();
            }

            IUpdatePet updateObject = new UpdatePetData();
            updateObject.UpdatePet(id, updatedPet);

            return NoContent();
        }

        // DELETE: api/pets/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            IDeletePet deleteObject = new DeletePetData();
            deleteObject.DeletePet(id);

            return NoContent();
        }
    }
}
