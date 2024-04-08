using System;
using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class DeleteUserData : IDeleteUser
    {
        public void DeleteUser(int id)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand();
            cmd.Connection = con;

            cmd.CommandText = "DELETE FROM User WHERE UserId = @UserId";
            cmd.Parameters.AddWithValue("@UserId", id);
            
            cmd.ExecuteNonQuery();
        }
    }
}
