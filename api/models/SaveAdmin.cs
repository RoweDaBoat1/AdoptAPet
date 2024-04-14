using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;


namespace api.models
{
    public class SaveAdmin : IInsertAdmin
    {
        public void InsertAdmin(Admin value){

            // Hash the password using PasswordHasher class
            string salt;
            string hashedPassword = PasswordHasher.HashPassword(value.PasswordHash, out salt);

            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand(cs);

            cmd.Connection = con;
            cmd.CommandText = @"INSERT INTO Admin(ID, Email, PasswordHash, Salt, FirstName, LastName, Role) VALUES(@ID, @Email, @PasswordHash, @Salt, @FirstName, @LastName, @Role)";
            cmd.Parameters.AddWithValue("@ID", value.ID);
            cmd.Parameters.AddWithValue("@Email", value.Email);
            cmd.Parameters.AddWithValue("@PasswordHash", hashedPassword); 
            cmd.Parameters.AddWithValue("@Salt", salt); 
            cmd.Parameters.AddWithValue("@FirstName", value.FirstName);
            cmd.Parameters.AddWithValue("@LastName", value.LastName);
            cmd.Parameters.AddWithValue("@Role", value.Role);
            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }
    }
}