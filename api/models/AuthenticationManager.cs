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
        public (bool, string) AuthenticateUser(string email, string password, string role)
        {
            string hashedPasswordFromDatabase;
            string saltFromDatabase;
            string userId;
            string approvalStatus;

            // Your database connection string
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            // Query to fetch hashed password, salt, user ID, and approval status from the database based on the provided email
            string query = $"SELECT PasswordHash, Salt, {role}ID, Approval_Status FROM {role} WHERE Email = @Email";


            using (MySqlConnection connection = new MySqlConnection(cs))
            {
                connection.Open();

                using (MySqlCommand cmd = new MySqlCommand(query, connection))
                {
                    cmd.Parameters.AddWithValue("@Email", email);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            hashedPasswordFromDatabase = reader.GetString("PasswordHash");
                            saltFromDatabase = reader.GetString("Salt");
                            userId = reader.GetInt32($"{role}ID").ToString();
                            approvalStatus = reader.GetString("Approval_Status");
                        }
                        else
                        {
                            // Email not found in the database
                            return (false, null);
                        }
                    }
                }
            }

            // For Shelter role, check if ApprovalStatus is "Approved"
            if (role == "Shelter" && approvalStatus != "Approved")
            {
                // Shelter account not approved, deny login
                return (false, null);
            }

            // Hash the provided password using the retrieved salt
            string hashedPasswordEntered = PasswordHasher.AuthenticationHashPassword(password, saltFromDatabase);

            // Compare the hashed passwords
            bool isAuthenticated = hashedPasswordFromDatabase == hashedPasswordEntered;

            return (isAuthenticated, userId);
        }

    }

}
