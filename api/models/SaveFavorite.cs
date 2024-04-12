using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class SaveFavorite : IInsertFavorite
    {
        public void InsertFavorite(Favorites value){
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand(cs);

            cmd.CommandText = @"INSERT INTO Favorites(UserID, PetID, FavoriteDate) VALUES(@UserID, @PetID, @FavoriteDate))";
            cmd.Parameters.AddWithValue("@UserID", value.UserID);
            cmd.Parameters.AddWithValue("@PetID", value.PetID);
            cmd.Parameters.AddWithValue("@FavoriteDate", value.FavoriteDate);
            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }
    }
}