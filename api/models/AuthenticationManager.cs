using System;
using System.Security.Cryptography;
using System.Text;
using api.Data;
using api.models;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class AuthenticationManager : IAuthService
    {

        public AuthenticationManager()
        {
        }

        // Method to authenticate user
        public bool AuthenticateUser(string username, string password)
        {
            // Retrieve hashed password and salt from the database based on the provided username
            string hashedPasswordFromDatabase;
            string saltFromDatabase;

            // Your database connection string
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            
            // Query to fetch hashed password and salt from the database
            string query = "SELECT PasswordHash, Salt FROM Users WHERE Username = @Username";

            using (MySqlConnection connection = new MySqlConnection(cs))
            {
                connection.Open();

                using (MySqlCommand cmd = new MySqlCommand(query, connection))
                {
                    cmd.Parameters.AddWithValue("@Username", username);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            hashedPasswordFromDatabase = reader.GetString("PasswordHash");
                            saltFromDatabase = reader.GetString("Salt");
                        }
                        else
                        {
                            // Username not found in the database
                            return false;
                        }
                    }
                }
            }

            // Hash the provided password using the retrieved salt
            string hashedPasswordEntered = PasswordHasher.AuthenticationHashPassword(password, saltFromDatabase);

            // Compare the hashed passwords
            return hashedPasswordFromDatabase == hashedPasswordEntered;
        }
    }
}
