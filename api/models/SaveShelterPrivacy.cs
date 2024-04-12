using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;
using api.Controllers;

namespace api.models
{
    public class SaveShelterPrivacy : IInsertShelterPrivacy
    {
        public void InsertShelterPrivacy(ShelterPrivacy value){

            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand(cs);

            cmd.CommandText = @"INSERT INTO ShelterPrivacy(ShelterID, Breed, Age, Gender, IntakeDate, Weight, Attitude, AboutMe, Height, HouseTrained, AdoptionStatus) VALUES(@ShelterID, @Breed, @Age, @Gender, @IntakeDate, @Weight, @Attitude, @AboutMe, @Height, @HouseTrained, @AdoptionStatus))";
            cmd.Parameters.AddWithValue("@ShelterID", value.ShelterID);
            cmd.Parameters.AddWithValue("@Breed", value.Breed);
            cmd.Parameters.AddWithValue("@Age", value.Age);
            cmd.Parameters.AddWithValue("@Gender", value.Gender);
            cmd.Parameters.AddWithValue("@IntakeDate", value.IntakeDate);
            cmd.Parameters.AddWithValue("@Weight", value.Weight);
            cmd.Parameters.AddWithValue("@Attitude", value.Attitude);
            cmd.Parameters.AddWithValue("@AboutMe", value.AboutMe);
            cmd.Parameters.AddWithValue("@Height", value.Height);
            cmd.Parameters.AddWithValue("@HouseTrained", value.HouseTrained);
            cmd.Parameters.AddWithValue("@AdoptionStatus", value.AdoptionStatus);
            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }
    }
}