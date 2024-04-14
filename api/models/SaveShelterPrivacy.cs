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

            cmd.Connection = con;
            cmd.CommandText = @"INSERT INTO ShelterPrivacy(ShelterID, IntakeDatePrivate, WeightPrivate, AttitudePrivate, AboutMePrivate, HeightPrivate, HouseTrainedPrivate, DistancePref) VALUES(@ShelterID, @IntakeDatePrivate, @WeightPrivate, @AttitudePrivate, @AboutMePrivate, @HeightPrivate, @HouseTrainedPrivate, @DistancePref)";
            cmd.Parameters.AddWithValue("@ShelterID", value.ShelterID);
            cmd.Parameters.AddWithValue("@IntakeDatePrivate", value.IntakeDatePrivate);
            cmd.Parameters.AddWithValue("@WeightPrivate", value.WeightPrivate);
            cmd.Parameters.AddWithValue("@AttitudePrivate", value.AttitudePrivate);
            cmd.Parameters.AddWithValue("@AboutMePrivate", value.AboutMePrivate);
            cmd.Parameters.AddWithValue("@HeightPrivate", value.HeightPrivate);
            cmd.Parameters.AddWithValue("@HouseTrainedPrivate", value.HouseTrainedPrivate);
            cmd.Parameters.AddWithValue("@DistancePref", value.DistancePref);
            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }
    }
}