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
        public string Salt {get; set;}
        public string Address {get;set;}
        public string Phone_Number{get;set;}
        public string Email {get;set;}
        public string Shelter_Name{get;set;}
        public string Role {get; set;}
        public string Pets_For_Adoption {get;set;}
        public string Pets_Adopted {get;set;}
        public string Approval_Status {get;set;}
    }
}