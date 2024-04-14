using System;
using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class UpdateMessages : IUpdateMessage
    {
        public void UpdateMessage(int id, Messages updatedMessage)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand();
            cmd.Connection = con;

            cmd.CommandText = @"UPDATE Messages 
                                SET UserID = @UserID, 
                                    Message = @Message, 
                                    Email = @Email, 
                                    Timestamp = @Timestamp, 
                                    ShelterID = @ShelterID 
                                WHERE MessageId = @MessageID";
            cmd.Parameters.AddWithValue("@MessageID", id);
            cmd.Parameters.AddWithValue("@UserID", updatedMessage.UserID);
            cmd.Parameters.AddWithValue("@Message", updatedMessage.Message);
            cmd.Parameters.AddWithValue("@Email", updatedMessage.Email);
            cmd.Parameters.AddWithValue("@Timestamp", updatedMessage.Timestamp);
            cmd.Parameters.AddWithValue("@ShelterID", updatedMessage.ShelterID);
            
            cmd.ExecuteNonQuery();
        }
    }
}