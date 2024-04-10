using System;
using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class UpdateShelterPostData : IUpdateShelterPost
    {
        public void UpdateShelterPost(int id, ShelterPost updatedShelterPost)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand();
            cmd.Connection = con;

            cmd.CommandText = @"UPDATE ShelterPost 
                                SET ShelterID = @ShelterID, 
                                    Title = @Title, 
                                    Message = @Message,
                                WHERE UserId = @PetID";
            cmd.Parameters.AddWithValue("@ShelterID", id);
            cmd.Parameters.AddWithValue("@Title", updatedShelterPost.Title);
            cmd.Parameters.AddWithValue("@Message", updatedShelterPost.Message);
            
            cmd.ExecuteNonQuery();
        }
    }
}