using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class Shelter
    {
        public int ShelterID {get;set;}
        public string PasswordHash {get;set;}
        public string Address {get;set;}
        public string Phone_Number{get;set;}
        public string Email {get;set;}
        public string Shelter_Name{get;set;}
        public string Role{get;set;}
        public int Pets_For_Adoption {get;set;}
        public int Pets_Adopted {get;set;}
        public bool Approval_Status {get;set;}
        public string Salt {get;set;}
    }
}