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
    public class descriptionController : ControllerBase
    {
        // GET: api/Description
        [EnableCors("OpenPolicy")]
        [HttpGet]
        public List<Descriptions> GetAllDescription()
        {
            IGetAllDescriptions readObject = new ReadDescriptionData();
            return readObject.GetAllDescriptions();
        }

        // GET: api/Description/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{id}", Name = "GetDescriptionByID")]
        public Descriptions GetDescriptionByID(int ID)
        {
            IGetDescription readObject = new ReadDescriptionData();
            return readObject.GetDescription(ID);
        }

        // POST: api/Description
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] Descriptions value)
        {
            IInsertDescription insertObject = new SaveDescription();
            insertObject.InsertDescription(value);
        }

        // PUT: api/Description/5
        [EnableCors("OpenPolicy")]
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Descriptions updatedDescription)
        {
            if (id != updatedDescription.DescriptionID)
            {
                return BadRequest();
            }

            IUpdateDescription updateObject = new UpdateDescriptionData();
            updateObject.UpdateDescription(id, updatedDescription);

            return NoContent();
        }

        // DELETE: api/Description/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            IDeleteDescription deleteObject = new DeleteDescriptionData();
            deleteObject.DeleteDescription(id);

            return NoContent();
        }
    }
}
