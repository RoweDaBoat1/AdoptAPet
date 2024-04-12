using api.Data;
using api.models.interfaces;
using System.Data;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class ReadShelterPrivacyData : IGetAllShelterPrivacy, IGetShelterPrivacy
    {
        public List<ShelterPrivacy> GetAllShelterPrivacy()
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = "SELECT * FROM ShelterPrivacy";
            using var cmd = new MySqlCommand(stm, con);


            using MySqlDataReader rdr = cmd.ExecuteReader();

            List<ShelterPrivacy> allShelterPrivacy = new List<ShelterPrivacy>();
            while (rdr.Read())
            {
                allShelterPrivacy.Add(new ShelterPrivacy()
                {
                    ShelterID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
                    Breed = rdr.IsDBNull(1) ? false : rdr.GetBoolean(1),
                    Age = rdr.IsDBNull(2) ? false : rdr.GetBoolean(2),
                    Gender = rdr.IsDBNull(3) ? false : rdr.GetBoolean(3),
                    IntakeDate = rdr.IsDBNull(4) ? false : rdr.GetBoolean(4),
                    Weight = rdr.IsDBNull(5) ? false : rdr.GetBoolean(5),
                    Attitude = rdr.IsDBNull(6) ? false : rdr.GetBoolean(6),
                    AboutMe = rdr.IsDBNull(7) ? false : rdr.GetBoolean(7),
                    Height = rdr.IsDBNull(8) ? false : rdr.GetBoolean(8),
                    HouseTrained = rdr.IsDBNull(9) ? false : rdr.GetBoolean(9),
                    AdoptionStatus = rdr.IsDBNull(10) ? false : rdr.GetBoolean(10)
                });
            }

            return allShelterPrivacy;
        }

        public ShelterPrivacy GetShelterPrivacy(int ID)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = "SELECT * FROM ShelterPrivacy WHERE ShelterID = @ID";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@ID", ID);
            cmd.Prepare();
            using MySqlDataReader rdr = cmd.ExecuteReader();

            rdr.Read();
            return new ShelterPrivacy()
            {
                ShelterID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
                Breed = rdr.IsDBNull(1) ? false : rdr.GetBoolean(1),
                Age = rdr.IsDBNull(2) ? false : rdr.GetBoolean(2),
                Gender = rdr.IsDBNull(3) ? false : rdr.GetBoolean(3),
                IntakeDate = rdr.IsDBNull(4) ? false : rdr.GetBoolean(4),
                Weight = rdr.IsDBNull(5) ? false : rdr.GetBoolean(5),
                Attitude = rdr.IsDBNull(6) ? false : rdr.GetBoolean(6),
                AboutMe = rdr.IsDBNull(7) ? false : rdr.GetBoolean(7),
                Height = rdr.IsDBNull(8) ? false : rdr.GetBoolean(8),
                HouseTrained = rdr.IsDBNull(9) ? false : rdr.GetBoolean(9),
                AdoptionStatus = rdr.IsDBNull(10) ? false : rdr.GetBoolean(10)
            };
        }
    }
}