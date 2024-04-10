using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models.interfaces
{
    public interface IUpdateMessage
    {
        void UpdateMessage(int id, Messages updatedMessage);
    }
}