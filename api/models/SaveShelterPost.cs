using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;
using api.Controllers;

namespace api.models
{
    public class SaveShelterPost : IInsertShelterPost
    {
        public void InsertShelterPost(ShelterPost value){

            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand(cs);

            cmd.Connection = con;
            cmd.CommandText = @"INSERT INTO ShelterPost (ShelterID, Title, Message) VALUES (@ShelterID, @Title, @Message)";
            cmd.Parameters.AddWithValue("@ShelterID", value.ShelterID);
            cmd.Parameters.AddWithValue("@Title", value.Title);
            cmd.Parameters.AddWithValue("@Message", value.Message);

            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }
    }
}