using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class Favorites
    {
        public int UserID {get; set;}
        public int PetID {get; set;}
        public DateTime FavoriteDate {get; set;}
    }
}