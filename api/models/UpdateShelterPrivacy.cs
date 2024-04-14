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
                                SET IntakeDatePrivate  = @IntakeDatePrivate, 
                                    WeightPrivatePrivate = @WeightPrivate, 
                                    AttitudePrivate = @AttitudePrivate, 
                                    AboutMePrivate = @AboutMePrivate, 
                                    HeightPrivate = @HeightPrivate, 
                                    HouseTrainedPrivate = @HouseTrainedPrivate,
                                    DistancePref = @DistancePref,
                                WHERE ShelterID = @ShelterID";
            cmd.Parameters.AddWithValue("@ShelterID", id);
            cmd.Parameters.AddWithValue("@IntakeDate", updatedShelterPrivacy.IntakeDatePrivate);
            cmd.Parameters.AddWithValue("@Weight", updatedShelterPrivacy.WeightPrivate);
            cmd.Parameters.AddWithValue("@Attitude", updatedShelterPrivacy.AttitudePrivate);
            cmd.Parameters.AddWithValue("@AboutMe", updatedShelterPrivacy.AboutMePrivate);
            cmd.Parameters.AddWithValue("@Height", updatedShelterPrivacy.HeightPrivate);
            cmd.Parameters.AddWithValue("@HouseTrained", updatedShelterPrivacy.HouseTrainedPrivate);
            cmd.Parameters.AddWithValue("@DistancePref", updatedShelterPrivacy.DistancePref);
            
            cmd.ExecuteNonQuery();
        }
    }
}