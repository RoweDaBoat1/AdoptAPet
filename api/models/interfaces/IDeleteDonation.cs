using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models.interfaces
{
    public interface IDeleteDonation
    {
        void DeleteDonation(int DonationID);
    }
}