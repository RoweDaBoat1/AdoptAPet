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
        // GET: api/Shelters
        [EnableCors("OpenPolicy")]
        [HttpGet]
        public List<Shelter> GetAllShelters()
        {
            IGetAllShelters readObject = new ReadShelterData();
            return readObject.GetAllShelters();
        }

        // GET: api/Shelters/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{id}", Name = "GetShelterByID")]
        public Shelter GetShelterByID(int ID)
        {
            IGetShelter readObject = new ReadShelterData();
            return readObject.GetShelter(ID);
        }

        // POST: api/Shelters
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] Shelter value)
        {
            IInsertShelter insertObject = new SaveShelter();
            insertObject.InsertShelter(value);
        }

        // PUT: api/Shelters/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Shelters/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
