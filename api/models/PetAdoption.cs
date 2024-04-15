using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class PetAdoption
    {
        public int AdoptionID{get;set;}
        public int UserID{get;set;}
        public int PetID{get;set;}
        public DateTime AdoptionDate {get;set;}
    }
}