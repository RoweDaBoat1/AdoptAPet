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
        [HttpGet("{UserID}", Name = "GetFavoriteByID")]
        public Favorites GetFavoriteByID(int UserID)
        {
            IGetFavorite readObject = new ReadFavoriteData();
            return readObject.GetFavorite(UserID);
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
        [HttpPut("{UserID}")]
        public IActionResult Put(int UserID, [FromBody] Favorites updatedFavorite)
        {
            if (UserID != updatedFavorite.UserID)
            {
                return BadRequest();
            }

            IUpdateFavorite updateObject = new UpdateFavoriteData();
            updateObject.UpdateFavorites(UserID, updatedFavorite);

            return NoContent();
        }

        // DELETE: api/Favorite/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{UserID}/{PetID}")] // Add PetID to the route
        public IActionResult Delete(int UserID, int PetID) // Modify the method signature
        {
            IDeleteFavorite deleteObject = new DeleteFavoriteData();
            deleteObject.DeleteFavorite(UserID, PetID); // Pass both UserID and PetID

            return NoContent();
        }

    }
}