using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class ShelterPrivacy
    {
        public int ShelterID{get;set;}
        public bool IntakeDatePrivate {get; set;}
        public bool WeightPrivate {get; set;}
        public bool AttitudePrivate {get; set;}
        public bool AboutMePrivate {get; set;}
        public bool HeightPrivate {get; set;}
        public bool HouseTrainedPrivate {get; set;}
        public string DistancePref {get; set;}
    }
}