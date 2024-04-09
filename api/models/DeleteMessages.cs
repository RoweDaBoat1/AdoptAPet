using System;
using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class DeleteMessages : IDeleteMessage
    {
        public void DeleteMessage(int MessageID)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand();
            cmd.Connection = con;

            cmd.CommandText = "DELETE FROM Messages WHERE MessageId = @MessageId";
            cmd.Parameters.AddWithValue("@MessageId", MessageID);
            
            cmd.ExecuteNonQuery();
        }
    }
}