using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class Descriptions
    {
        public int DescriptionID {get; set;}
        public int LocationID {get; set;}
        public string Description {get; set;}
        public string Location {get; set;}
    }
}