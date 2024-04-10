using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class ShelterPrivacy
    {
        public int PetID{get;set;}
        public bool Breed {get; set;}
        public bool Age {get; set;}
        public bool Gender {get; set;}
        public bool IntakeDate {get; set;}
        public bool Weight {get; set;}
        public bool Attitude {get; set;}
        public bool AboutMe {get; set;}
        public bool Height {get; set;}
        public bool HouseTrained {get; set;}
        public bool AdoptionStatus {get; set;}
    }
}