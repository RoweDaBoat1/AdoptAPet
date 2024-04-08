using System;
using System.Security.Cryptography;
using System.Text;

namespace api.models
{
    public class PasswordHasher
    {
        // Method to generate a random salt
        private static string GenerateSalt()
        {
            // Define the length of the salt (e.g., 16 bytes)
            int saltLength = 16;

            // Generate a random salt
            byte[] saltBytes = new byte[saltLength];
            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetNonZeroBytes(saltBytes);
            }
            return Convert.ToBase64String(saltBytes);
        }

        // Method to hash password with salt
        public static string HashPassword(string password, out string salt)
        {
            // Generate salt
            salt = GenerateSalt();

            // Combine password and salt
            string saltedPassword = password + salt;

            // Hash password with salt
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(saltedPassword));
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }

        public static string AuthenticationHashPassword(string password, string salt)
        {
            // Combine password and salt
            string saltedPassword = password + salt;

            // Hash password with salt
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(saltedPassword));
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }
    }
}

