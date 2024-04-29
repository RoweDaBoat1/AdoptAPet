using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;


namespace api.models
{
    public class SaveUser : IInsertUser
    {
        public void InsertUser(User value){

            // Hash the password using PasswordHasher class
            string salt;
            string hashedPassword = PasswordHasher.HashPassword(value.PasswordHash, out salt);

            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand(cs);

            cmd.Connection = con;
            cmd.CommandText = @"INSERT INTO User(UserId, Email, PasswordHash, Salt, FirstName, LastName, ZipCode, PhoneNumber, Role) VALUES(@UserId, @Email, @PasswordHash, @Salt, @FirstName, @LastName, @ZipCode, @PhoneNumber, @Role)";
            cmd.Parameters.AddWithValue("@UserId", value.UserID);
            cmd.Parameters.AddWithValue("@Email", value.Email);
            cmd.Parameters.AddWithValue("@PasswordHash", hashedPassword); // Use hashed password
            cmd.Parameters.AddWithValue("@Salt", salt); // Store salt in the database
            cmd.Parameters.AddWithValue("@FirstName", value.FirstName);
            cmd.Parameters.AddWithValue("@LastName", value.LastName);
            cmd.Parameters.AddWithValue("@ZipCode", value.ZipCode);
            cmd.Parameters.AddWithValue("@PhoneNumber", value.PhoneNumber);
            cmd.Parameters.AddWithValue("@Role", value.Role);
            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }
    }
}