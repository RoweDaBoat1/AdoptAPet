using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;

namespace api.models.interfaces
{
    public interface IInsertMessage
    {
        void InsertMessage(Messages value);
    }
}