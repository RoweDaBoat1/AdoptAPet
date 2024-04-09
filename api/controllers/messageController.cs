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
    public class MessageController : ControllerBase
    {
        // GET: api/Message
        [EnableCors("OpenPolicy")]
        [HttpGet]
        public List<Messages> GetAllMessages()
        {
            IGetAllMessages readObject = new ReadMessageData();
            return readObject.GetAllMessages();
        }

        // GET: api/Message/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{id}", Name = "GetMessageByID")]
        public Messages GetMessageByID(int ID)
        {
            IGetMessage readObject = new ReadMessageData();
            return readObject.GetMessage(ID);
        }

        // POST: api/Message
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] Messages value)
        {
            IInsertMessage insertObject = new SaveMessages();
            insertObject.InsertMessage(value);
        }

        // PUT: api/Message/5
        [EnableCors("OpenPolicy")]
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Messages updatedMessage)
        {
            if (id != updatedMessage.MessageID)
            {
                return BadRequest();
            }

            IUpdateMessage updateObject = new UpdateMessages();
            updateObject.UpdateMessage(id, updatedMessage);

            return NoContent();
        }

        // DELETE: api/Message/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            IDeleteMessage deleteObject = new DeleteMessages();
            deleteObject.DeleteMessage(id);

            return NoContent();
        }
    }
}
