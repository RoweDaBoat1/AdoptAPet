using System;
using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class UpdateShelterPrivacyData : IUpdateShelterPrivacy
    {
        public void UpdateShelterPrivacy(int id, ShelterPrivacy updatedShelterPrivacy)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand();
            cmd.Connection = con;

            cmd.CommandText = @"UPDATE ShelterPrivacy 
                                SET Breed = @Breed, 
                                    Age = @Age, 
                                    Gender = @Gender,
                                    IntakeDate = @IntakeDate, 
                                    Weight = @Weight, 
                                    Attitude = @Attitude, 
                                    AboutMe = @AboutMe, 
                                    Height = @Height,
                                    HouseTrained = @HouseTrained,
                                    AdoptionStatus = @AdoptionStatus,
                                WHERE ShelterID = @ShelterID";
            cmd.Parameters.AddWithValue("@ShelterID", id);
            cmd.Parameters.AddWithValue("@Breed", updatedShelterPrivacy.Breed);
            cmd.Parameters.AddWithValue("@Age", updatedShelterPrivacy.Age);
            cmd.Parameters.AddWithValue("@Gender", updatedShelterPrivacy.Gender);
            cmd.Parameters.AddWithValue("@IntakeDate", updatedShelterPrivacy.IntakeDate);
            cmd.Parameters.AddWithValue("@Weight", updatedShelterPrivacy.Weight);
            cmd.Parameters.AddWithValue("@Attitude", updatedShelterPrivacy.Attitude);
            cmd.Parameters.AddWithValue("@AboutMe", updatedShelterPrivacy.AboutMe);
            cmd.Parameters.AddWithValue("@Height", updatedShelterPrivacy.Height);
            cmd.Parameters.AddWithValue("@HouseTrained", updatedShelterPrivacy.HouseTrained);
            cmd.Parameters.AddWithValue("@AdoptionStatus", updatedShelterPrivacy.AdoptionStatus);
            
            cmd.ExecuteNonQuery();
        }
    }
}