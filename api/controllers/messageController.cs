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
    public class messageController : ControllerBase
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
        [HttpGet("{MessageID}", Name = "GetMessageByID")]
        public Messages GetMessageByID(int MessageID)
        {
            IGetMessage readObject = new ReadMessageData();
            return readObject.GetMessage(MessageID);
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
        [HttpPut("{MessageID}")]
        public IActionResult Put(int MessageID, [FromBody] Messages updatedMessage)
        {
            if (MessageID != updatedMessage.MessageID)
            {
                return BadRequest();
            }

            IUpdateMessage updateObject = new UpdateMessages();
            updateObject.UpdateMessage(MessageID, updatedMessage);

            return NoContent();
        }

        // DELETE: api/Message/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{MessageID}")]
        public IActionResult Delete(int MessageID)
        {
            IDeleteMessage deleteObject = new DeleteMessages();
            deleteObject.DeleteMessage(MessageID);

            return NoContent();
        }
    }
}
