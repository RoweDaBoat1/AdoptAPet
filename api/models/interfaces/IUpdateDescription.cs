using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models.interfaces
{
    public interface IUpdateDescription
    {
        void UpdateDescription(int id, Descriptions updatedDescription);
    }
}