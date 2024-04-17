using System;
using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class DeleteAdminData : IDeleteAdmin
    {
        public void DeleteAdmin(int AdminID)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand();
            cmd.Connection = con;

            cmd.CommandText = "DELETE FROM Admin WHERE AdminID = @AdminID";
            cmd.Parameters.AddWithValue("AdminID", AdminID);
            
            cmd.ExecuteNonQuery();
        }
    }
}
