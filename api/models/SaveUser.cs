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
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand(cs);

            cmd.CommandText = @"INSET INTO User(UserId, Email, Username, PasswordHash, FirstName, LastName, Address, PhoneNumber, FavoritePets) VALUES(@UserId, @Email, @Username, @PasswordHash, @FirstName, @LastName, @Address, @PhoneNumber, @FavoritePets))";
            cmd.Parameters.AddWithValue("@UserId", value.UserID);
            cmd.Parameters.AddWithValue("@Email", value.Email);
            cmd.Parameters.AddWithValue("@UserName", value.Username);
            cmd.Parameters.AddWithValue("@PasswordHash", value.PasswordHash);
            cmd.Parameters.AddWithValue("@FirstName", value.FirstName);
            cmd.Parameters.AddWithValue("@LastName", value.LastName);
            cmd.Parameters.AddWithValue("@Address", value.Address);
            cmd.Parameters.AddWithValue("@PhoneNumber", value.PhoneNumber);
            // cmd.Parameters.AddWithValue("@UserType", value.UserType);
            cmd.Parameters.AddWithValue("@FavoritePets", value.FavoritePets);
            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }
    }
}