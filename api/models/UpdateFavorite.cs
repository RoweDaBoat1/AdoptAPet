using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class UpdateFavoriteData : IUpdateFavorite
    {
        public void UpdateFavorites(int id, Favorites updatedFavorites)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand();
            cmd.Connection = con;

            cmd.CommandText = @"UPDATE Favorites
                                SET PetID = @PetID, 
                                    UserID = @UserID, 
                                    FavoriteDate = @FavoriteDate 
                                WHERE UserID = @UserID";
            cmd.Parameters.AddWithValue("@UserID", updatedFavorites.UserID);
            cmd.Parameters.AddWithValue("@PetID", updatedFavorites.PetID);
            cmd.Parameters.AddWithValue("@FavoriteDate", updatedFavorites.FavoriteDate);
            
            cmd.ExecuteNonQuery();
        }
    }
}