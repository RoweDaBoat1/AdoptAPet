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
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/pets/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/pets/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
