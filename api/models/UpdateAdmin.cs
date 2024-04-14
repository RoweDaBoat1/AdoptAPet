using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class UpdateAdminData : IUpdateAdmin
    {
        public void UpdateAdmin(int id, Admin updatedAdmin)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand();
            cmd.Connection = con;

            cmd.CommandText = @"UPDATE Admin 
                                SET Email = @Email, 
                                    FirstName = @FirstName, 
                                    LastName = @LastName,
                                    PasswordHash = @PasswordHash, 
                                    Salt = @Salt,
                                    Role = @Role,
                                WHERE ID = @ID";
            cmd.Parameters.AddWithValue("@AdminId", id);
            cmd.Parameters.AddWithValue("@Email", updatedAdmin.Email);
            cmd.Parameters.AddWithValue("@FirstName", updatedAdmin.FirstName);
            cmd.Parameters.AddWithValue("@LastName", updatedAdmin.LastName);
            cmd.Parameters.AddWithValue("@PasswordHash", updatedAdmin.PasswordHash);
            cmd.Parameters.AddWithValue("@Salt", updatedAdmin.Salt);
            cmd.Parameters.AddWithValue("@Role", updatedAdmin.Role);
            
            cmd.ExecuteNonQuery();
        }
    }
}