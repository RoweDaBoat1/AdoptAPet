using System;
using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class DeleteShelterPrivacyData : IDeleteShelterPrivacy
    {
        public void DeleteShelterPrivacy(int id)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand();
            cmd.Connection = con;

            cmd.CommandText = "DELETE FROM ShelterPrivacy WHERE ShelterID = @ShelterID";
            cmd.Parameters.AddWithValue("@ShelterID", id);
            
            cmd.ExecuteNonQuery();
        }
    }
}