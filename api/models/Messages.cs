using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class Messages
    {
        public int MessageID {get; set;}
        public int UserID {get; set;}
        public string Message {get; set;}
        public string Email {get; set;}
        public string Timestamp {get; set;}
        public int ShelterID{get; set;}
    }
}