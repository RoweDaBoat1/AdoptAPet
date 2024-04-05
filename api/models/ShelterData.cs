using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class Shelter
    {
        public int ShelterID {get;set;}
        public string Username {get;set;}
        public string PasswordHash {get;set;}
        public int Pets_Uploaded {get;set;}
        public string Address {get;set;}
        public string Phone_Number{get;set;}
        public string Email {get;set;}
        public string Shelter_Name{get;set;}
        public static string UserType = "Shelter";
        public int Pets_For_Adoption {get;set;}
        public int Pets_Adopted {get;set;}
        public string Message_From_User {get;set;}
        public string Approval_Status {get;set;}
    }
}