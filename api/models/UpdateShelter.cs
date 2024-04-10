using System;
using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class UpdateShelterData : IUpdateShelter
    {
        public void UpdateShelter(int id, Shelter updatedShelter)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand();
            cmd.Connection = con;

            cmd.CommandText = @"UPDATE Shelter 
                                SET Username = @Username, 
                                    PasswordHash = @PasswordHash, 
                                    Salt = @Salt,
                                    Pets_Uploaded = @Pets_Uploaded, 
                                    Address = @Address, 
                                    PhoneNumber = @PhoneNumber, 
                                    Email = @Email, 
                                    Shelter_Name = @Shelter_Name, 
                                    Pets_For_Adoption = @Pets_For_Adoption, 
                                    Pets_Adopted = @Pets_Adopted, 
                                    Message_From_User = @Message_From_User, 
                                    Approval_Status = @Approval_Status,
                                WHERE ShelterId = @ShelterId";
            cmd.Parameters.AddWithValue("@ShelterId", id);
            cmd.Parameters.AddWithValue("@PasswordHash", updatedShelter.PasswordHash);
            cmd.Parameters.AddWithValue("@Salt", updatedShelter.Salt);
            cmd.Parameters.AddWithValue("@Address", updatedShelter.Address);
            cmd.Parameters.AddWithValue("@PhoneNumber", updatedShelter.Phone_Number);
            cmd.Parameters.AddWithValue("@Email", updatedShelter.Email);
            cmd.Parameters.AddWithValue("@Shelter_Name", updatedShelter.Shelter_Name);
            cmd.Parameters.AddWithValue("@Pets_For_Adoption", updatedShelter.Pets_For_Adoption);
            cmd.Parameters.AddWithValue("@Pets_Adopted", updatedShelter.Pets_Adopted);
            cmd.Parameters.AddWithValue("@Approval_Status", updatedShelter.Approval_Status);
            
            cmd.ExecuteNonQuery();
        }
    }
}
