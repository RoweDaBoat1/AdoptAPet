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
    public class descriptionsController : ControllerBase
    {
        // GET: api/Descriptions
        [EnableCors("OpenPolicy")]
        [HttpGet]
        public List<Descriptions> GetAllDescription()
        {
            IGetAllDescriptions readObject = new ReadDescriptionData();
            return readObject.GetAllDescriptions();
        }

        // GET: api/Descriptions/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{DescriptionID}", Name = "GetDescriptionByID")]
        public Descriptions GetDescriptionByID(int DescriptionID)
        {
            IGetDescription readObject = new ReadDescriptionData();
            return readObject.GetDescription(DescriptionID);
        }

        // POST: api/Descriptions
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] Descriptions value)
        {
            IInsertDescription insertObject = new SaveDescription();
            insertObject.InsertDescription(value);
        }

        // PUT: api/Descriptions/5
        [EnableCors("OpenPolicy")]
        [HttpPut("{DescriptionID}")]
        public IActionResult Put(int DescriptionID, [FromBody] Descriptions updatedDescription)
        {
            if (DescriptionID != updatedDescription.DescriptionID)
            {
                return BadRequest();
            }

            IUpdateDescription updateObject = new UpdateDescriptionData();
            updateObject.UpdateDescription(DescriptionID, updatedDescription);

            return NoContent();
        }

        // DELETE: api/Descriptions/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{DescriptionID}")]
        public IActionResult Delete(int DescriptionID)
        {
            IDeleteDescription deleteObject = new DeleteDescriptionData();
            deleteObject.DeleteDescription(DescriptionID);

            return NoContent();
        }
    }
}
