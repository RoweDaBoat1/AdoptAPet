using System;
using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class DeleteFavoriteData : IDeleteFavorite
    {
        public void DeleteFavorite(int UserID, int PetID)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand();
            cmd.Connection = con;

            cmd.CommandText = "DELETE FROM Favorites WHERE UserID = @UserID AND PetID = @PetID";
            cmd.Parameters.AddWithValue("@UserID", UserID);
            cmd.Parameters.AddWithValue("@PetID", PetID);
            
            cmd.ExecuteNonQuery();
        }
    }
}