using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;

namespace api.models.interfaces
{
    public interface IGetAllMessages
    {
        List<Messages> GetAllMessages();
    }
}