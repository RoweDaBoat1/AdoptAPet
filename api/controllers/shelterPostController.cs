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
    public class ShelterPostController : ControllerBase
    {
        // GET: api/ShelterPosts
        [EnableCors("OpenPolicy")]
        [HttpGet]
        public List<ShelterPost> GetAllShelterPost()
        {
            IGetAllShelterPosts readObject = new ReadShelterPostData();
            return readObject.GetAllShelterPosts();
        }

        // GET: api/ShelterPosts/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{ShelterPostID}", Name = "GetShelterPostByID")]
        public ShelterPost GetShelterPostByID(int ShelterPostID)
        {
            IGetShelterPost readObject = new ReadShelterPostData();
            return readObject.GetShelterPost(ShelterPostID);
        }

        // POST: api/ShelterPosts
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] ShelterPost value)
        {
            IInsertShelterPost insertObject = new SaveShelterPost();
            insertObject.InsertShelterPost(value);
        }

        // PUT: api/ShelterPosts/5
        [EnableCors("OpenPolicy")]
        [HttpPut("{ShelterPostID}")]
        public IActionResult Put(int ShelterPostID, [FromBody] ShelterPost updatedShelterPost)
        {
            if (ShelterPostID != updatedShelterPost.ShelterPostID)
            {
                return BadRequest();
            }

            IUpdateShelterPost updateObject = new UpdateShelterPostData();
            updateObject.UpdateShelterPost(ShelterPostID, updatedShelterPost);

            return NoContent();
        }

        // DELETE: api/ShelterPosts/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            IDeleteShelterPost deleteObject = new DeleteShelterPostData();
            deleteObject.DeleteShelterPost(id);

            return NoContent();
        }
    }
}
