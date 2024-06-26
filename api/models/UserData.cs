using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class User
    {
        public int UserID {get; set;}
        public string Email {get; set;}
        public string PasswordHash {get; set;}
        public string Salt {get; set;}
        public string FirstName {get; set;}
        public string LastName {get; set;}
        public string ZipCode {get; set;}
        public string PhoneNumber {get; set;}
        public string Role{get;set;}
    }
}