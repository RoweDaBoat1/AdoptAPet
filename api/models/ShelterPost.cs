using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class ShelterPost
    {
        public int ShelterPostID{get; set;}
        public int ShelterID{get;set;}
        public string Title{get;set;}
        public string Message{get;set;}
    }
}