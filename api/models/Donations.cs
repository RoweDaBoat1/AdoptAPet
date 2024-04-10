using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models.interfaces
{
    public class Donations
    {
        public int DonationID {get; set;}
        public int UserID {get; set;}
        public int Amount {get; set;}
        public string DonationDate {get; set;}
        public string Name {get; set;}
    }
}