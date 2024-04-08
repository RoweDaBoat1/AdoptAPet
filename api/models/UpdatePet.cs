using System;
using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class UpdatePetData : IUpdatePet
    {
        public void UpdatePet(int id, Pet updatedPet)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand();
            cmd.Connection = con;

            cmd.CommandText = @"UPDATE Pet 
                                SET Name = @Name, 
                                    Breed = @Breed, 
                                    Age = @Age, 
                                    Gender = @Gender, 
                                    Location = @Location, 
                                    IntakeDate = @IntakeDate, 
                                    Weight = @Weight, 
                                    Attitude = @Attitude, 
                                    AboutMe = @AboutMe, 
                                    ShelterID = @ShelterID, 
                                    AdoptionStatus = @AdoptionStatus, 
                                    Height = @Height, 
                                    HouseTrained = @HouseTrained, 
                                    PetType = @PetType 
                                WHERE PetId = @PetId";
            cmd.Parameters.AddWithValue("@PetId", id);
            cmd.Parameters.AddWithValue("@Name", updatedPet.Name);
            cmd.Parameters.AddWithValue("@Breed", updatedPet.Breed);
            cmd.Parameters.AddWithValue("@Age", updatedPet.Age);
            cmd.Parameters.AddWithValue("@Gender", updatedPet.Gender);
            cmd.Parameters.AddWithValue("@Location", updatedPet.Location);
            cmd.Parameters.AddWithValue("@IntakeDate", updatedPet.IntakeDate);
            cmd.Parameters.AddWithValue("@Weight", updatedPet.Weight);
            cmd.Parameters.AddWithValue("@Attitude", updatedPet.Attitude);
            cmd.Parameters.AddWithValue("@AboutMe", updatedPet.AboutMe);
            cmd.Parameters.AddWithValue("@ShelterID", updatedPet.ShelterID);
            cmd.Parameters.AddWithValue("@AdoptionStatus", updatedPet.AdoptionStatus);
            cmd.Parameters.AddWithValue("@Height", updatedPet.Height);
            cmd.Parameters.AddWithValue("@HouseTrained", updatedPet.HouseTrained);
            cmd.Parameters.AddWithValue("@PetType", updatedPet.PetType);
            
            cmd.ExecuteNonQuery();
        }
    }
}
