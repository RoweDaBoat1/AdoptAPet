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
    public class donationController : ControllerBase
    {
        // GET: api/Donation
        [EnableCors("OpenPolicy")]
        [HttpGet]
        public List<Donations> GetAllDonations()
        {
            IGetAllDonations readObject = new ReadDonationData();
            return readObject.GetAllDonations();
        }

        // GET: api/Donation/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{id}", Name = "GetDonationByID")]
        public Donations GetDonationByID(int ID)
        {
            IGetDonation readObject = new ReadDonationData();
            return readObject.GetDonation(ID);
        }

        // POST: api/Donation
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] Donations value)
        {
            IInsertDonation insertObject = new SaveDonation();
            insertObject.InsertDonation(value);
        }

        // PUT: api/Donation/5
        [EnableCors("OpenPolicy")]
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Donations updatedDonation)
        {
            if (id != updatedDonation.DonationID)
            {
                return BadRequest();
            }

            IUpdateDonation updateObject = new UpdateDonationData();
            updateObject.UpdateDonations(id, updatedDonation);

            return NoContent();
        }

        // DELETE: api/Donation/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            IDeleteDonation deleteObject = new DeleteDonationData();
            deleteObject.DeleteDonation(id);

            return NoContent();
        }
    }
}