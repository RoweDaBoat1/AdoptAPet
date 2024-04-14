using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models.interfaces
{
    public class Donations
    {
        public int DonationID {get; set;}
        public double Amount {get; set;}
        public DateTime DonationDate {get; set;}
        public string ShelterName{get;set;}
        public string Email{get;set;}
        public string FirstName {get; set;}
        public string LastName{get;set;}
    }
}