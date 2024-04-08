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
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand(cs);

            cmd.CommandText = @"INSET INTO Shelter(ShelterId, PasswordHash, Address, PhoneNumber, Email, Shelter_Name, Pets_For_Adoption, Pets_Adopted, Approval_Status, Salt) VALUES(@ShelterId, @PasswordHash, @Address, @PhoneNumber, @Email, @Shelter_Name, @Pets_For_Adoption, @Pets_Adopted, @Message_From_User, @Approval_Status, @Salt))";
            cmd.Parameters.AddWithValue("@ShelterId", value.ShelterID);
            cmd.Parameters.AddWithValue("@PasswordHash", value.PasswordHash);
            cmd.Parameters.AddWithValue("@Address", value.Address);
            cmd.Parameters.AddWithValue("@PhoneNumber", value.Phone_Number);
            cmd.Parameters.AddWithValue("@Email", value.Email);
            cmd.Parameters.AddWithValue("@Shelter_Name", value.Shelter_Name);
            cmd.Parameters.AddWithValue("@Role", value.Role);
            cmd.Parameters.AddWithValue("@Pets_For_Adoption", value.Pets_For_Adoption);
            cmd.Parameters.AddWithValue("@Pets_Adopted", value.Pets_Adopted);
            cmd.Parameters.AddWithValue("@Approval_Status", value.Approval_Status);
            cmd.Parameters.AddWithValue("@Salt", value.Salt);
            cmd.Prepare();
            cmd.ExecuteNonQuery();
            
        }
    }
}