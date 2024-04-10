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
    public class FavoriteController : ControllerBase
    {
        // GET: api/Favorite
        [EnableCors("OpenPolicy")]
        [HttpGet]
        public List<Favorites> GetAllFavorites()
        {
            IGetAllFavorites readObject = new ReadFavoriteData();
            return readObject.GetAllFavorites();
        }

        // GET: api/Favorite/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{id}", Name = "GetFavoriteByID")]
        public Favorites GetFavoriteByID(int ID)
        {
            IGetFavorite readObject = new ReadFavoriteData();
            return readObject.GetFavorite(ID);
        }

        // POST: api/Favorite
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] Favorites value)
        {
            IInsertFavorite insertObject = new SaveFavorite();
            insertObject.InsertFavorite(value);
        }

        // PUT: api/Favorite/5
        [EnableCors("OpenPolicy")]
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Favorites updatedFavorite)
        {
            if (id != updatedFavorite.PetID)
            {
                return BadRequest();
            }

            IUpdateFavorite updateObject = new UpdateFavoriteData();
            updateObject.UpdateFavorites(id, updatedFavorite);

            return NoContent();
        }

        // DELETE: api/Favorite/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            IDeleteFavorite deleteObject = new DeleteFavoriteData();
            deleteObject.DeleteFavorite(id);

            return NoContent();
        }
    }
}