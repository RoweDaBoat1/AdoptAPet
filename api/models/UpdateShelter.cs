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
                                    AddressLine = @AddressLine, 
                                    City = @City, 
                                    State = @State, 
                                    ZipCode = @ZipCode, 
                                    PhoneNumber = @PhoneNumber, 
                                    Email = @Email, 
                                    Shelter_Name = @Shelter_Name, 
                                    Message_From_User = @Message_From_User, 
                                    Approval_Status = @Approval_Status,
                                WHERE ShelterId = @ShelterId";
            cmd.Parameters.AddWithValue("@ShelterId", id);
            cmd.Parameters.AddWithValue("@PasswordHash", updatedShelter.PasswordHash);
            cmd.Parameters.AddWithValue("@Salt", updatedShelter.Salt);
            cmd.Parameters.AddWithValue("@AddressLine", updatedShelter.AddressLine);
            cmd.Parameters.AddWithValue("@City", updatedShelter.City);
            cmd.Parameters.AddWithValue("@State", updatedShelter.State);
            cmd.Parameters.AddWithValue("@ZipCode", updatedShelter.ZipCode);
            cmd.Parameters.AddWithValue("@PhoneNumber", updatedShelter.Phone_Number);
            cmd.Parameters.AddWithValue("@Email", updatedShelter.Email);
            cmd.Parameters.AddWithValue("@Shelter_Name", updatedShelter.Shelter_Name);
            cmd.Parameters.AddWithValue("@Role", updatedShelter.Role);
            cmd.Parameters.AddWithValue("@Approval_Status", updatedShelter.Approval_Status);
            
            cmd.ExecuteNonQuery();
        }
    }
}
