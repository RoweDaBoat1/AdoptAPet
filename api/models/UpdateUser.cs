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
                                    PasswordHash = @PasswordHash, 
                                    Salt = @Salt
                                    FirstName = @FirstName, 
                                    LastName = @LastName, 
                                    ZipCode = @ZipCode, 
                                    PhoneNumber = @PhoneNumber, 
                                    FavoritePets = @FavoritePets 
                                WHERE UserId = @UserId";
            cmd.Parameters.AddWithValue("@UserId", id);
            cmd.Parameters.AddWithValue("@Email", updatedUser.Email);
            cmd.Parameters.AddWithValue("@Username", updatedUser.Username);
            cmd.Parameters.AddWithValue("@PasswordHash", updatedUser.PasswordHash);
            cmd.Parameters.AddWithValue("@Salt", updatedUser.Salt);
            cmd.Parameters.AddWithValue("@FirstName", updatedUser.FirstName);
            cmd.Parameters.AddWithValue("@LastName", updatedUser.LastName);
            cmd.Parameters.AddWithValue("@ZipCode", updatedUser.ZipCode);
            cmd.Parameters.AddWithValue("@PhoneNumber", updatedUser.PhoneNumber);
            cmd.Parameters.AddWithValue("@FavoritePets", updatedUser.FavoritePets);
            
            cmd.ExecuteNonQuery();
        }
    }
}
