using System;
using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class UpdateUserData : IUpdateUser
    {
        public void UpdateUser(int id, User updatedUser)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand();
            cmd.Connection = con;

            cmd.CommandText = @"UPDATE User 
                                SET Email = @Email, 
                                    Username = @Username, 
                                    PasswordHash = @PasswordHash, 
                                    FirstName = @FirstName, 
                                    LastName = @LastName, 
                                    Address = @Address, 
                                    PhoneNumber = @PhoneNumber, 
                                    FavoritePets = @FavoritePets 
                                WHERE UserId = @UserId";
            cmd.Parameters.AddWithValue("@UserId", id);
            cmd.Parameters.AddWithValue("@Email", updatedUser.Email);
            cmd.Parameters.AddWithValue("@Username", updatedUser.Username);
            cmd.Parameters.AddWithValue("@PasswordHash", updatedUser.PasswordHash);
            cmd.Parameters.AddWithValue("@FirstName", updatedUser.FirstName);
            cmd.Parameters.AddWithValue("@LastName", updatedUser.LastName);
            cmd.Parameters.AddWithValue("@Address", updatedUser.Address);
            cmd.Parameters.AddWithValue("@PhoneNumber", updatedUser.PhoneNumber);
            cmd.Parameters.AddWithValue("@FavoritePets", updatedUser.FavoritePets);
            
            cmd.ExecuteNonQuery();
        }
    }
}
