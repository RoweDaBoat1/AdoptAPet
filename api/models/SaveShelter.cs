using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;
using api.Controllers;

namespace api.models
{
    public class SaveShelter : IInsertShelter
    {
        public void InsertShelter(Shelter value){

            // Hash the password using PasswordHasher class
            string salt;
            string hashedPassword = PasswordHasher.HashPassword(value.PasswordHash, out salt);

            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand(cs);

            cmd.Connection = con;
            cmd.CommandText = @"INSERT INTO Shelter(ShelterId, PasswordHash, Salt, AddressLine, City, State, ZipCode, Phone_Number, Email, Shelter_Name, Role, Approval_Status) VALUES (@ShelterId, @PasswordHash, @Salt, @AddressLine, @City, @State, @ZipCode, @Phone_Number, @Email, @Shelter_Name, @Role, @Approval_Status)";
            cmd.Parameters.AddWithValue("@ShelterId", value.ShelterID);
            cmd.Parameters.AddWithValue("@PasswordHash", hashedPassword); // Use hashed password
            cmd.Parameters.AddWithValue("@Salt", salt); // Store salt in the database
            cmd.Parameters.AddWithValue("@AddressLine", value.AddressLine);
            cmd.Parameters.AddWithValue("@City", value.City);
            cmd.Parameters.AddWithValue("@State", value.State);
            cmd.Parameters.AddWithValue("@ZipCode", value.ZipCode);
            cmd.Parameters.AddWithValue("@Phone_Number", value.Phone_Number);
            cmd.Parameters.AddWithValue("@Email", value.Email);
            cmd.Parameters.AddWithValue("@Shelter_Name", value.Shelter_Name);
            cmd.Parameters.AddWithValue("@Role", value.Role);
            cmd.Parameters.AddWithValue("@Approval_Status", value.Approval_Status);
            cmd.Prepare();
            cmd.ExecuteNonQuery();
            
        }
    }
}