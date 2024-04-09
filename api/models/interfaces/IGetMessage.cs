using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models.interfaces
{
    public interface IGetMessage
    {
        Messages GetMessage(int ID);
    }
}