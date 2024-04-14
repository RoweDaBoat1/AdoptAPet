using System;
using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class DeleteShelterPostData : IDeleteShelterPost
    {
        public void DeleteShelterPost(int id)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand();
            cmd.Connection = con;

            cmd.CommandText = "DELETE FROM ShelterPost WHERE ShelterPostID = @ShelterPostID";
            cmd.Parameters.AddWithValue("@ShelterPostID", id);
            
            cmd.ExecuteNonQuery();
        }
    }
}