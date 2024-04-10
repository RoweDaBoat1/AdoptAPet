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
            cmd.CommandText = @"INSERT INTO Shelter(ShelterId, PasswordHash, Salt, Address, Phone_Number, Email, Shelter_Name, Role, Pets_For_Adoption, Pets_Adopted, Approval_Status) VALUES (@ShelterId, @PasswordHash, @Salt, @Address, @Phone_Number, @Email, @Shelter_Name, @Role, @Pets_For_Adoption, @Pets_Adopted, @Approval_Status)";
            cmd.Parameters.AddWithValue("@ShelterId", value.ShelterID);
            cmd.Parameters.AddWithValue("@PasswordHash", hashedPassword); // Use hashed password
            cmd.Parameters.AddWithValue("@Salt", salt); // Store salt in the database
            cmd.Parameters.AddWithValue("@Address", value.Address);
            cmd.Parameters.AddWithValue("@Phone_Number", value.Phone_Number);
            cmd.Parameters.AddWithValue("@Email", value.Email);
            cmd.Parameters.AddWithValue("@Shelter_Name", value.Shelter_Name);
            cmd.Parameters.AddWithValue("@Role", value.Role);
            cmd.Parameters.AddWithValue("@Pets_For_Adoption", value.Pets_For_Adoption);
            cmd.Parameters.AddWithValue("@Pets_Adopted", value.Pets_Adopted);
            cmd.Parameters.AddWithValue("@Approval_Status", value.Approval_Status);
            cmd.Prepare();
            cmd.ExecuteNonQuery();
            
        }
    }
}