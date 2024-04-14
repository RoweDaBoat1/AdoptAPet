using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class ReadDonationData : IGetAllDonations, IGetDonation
    {
        public List<Donations> GetAllDonations()
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = "SELECT * FROM Donations";
            using var cmd = new MySqlCommand(stm, con);


            using MySqlDataReader rdr = cmd.ExecuteReader();

            List<Donations> allDonations = new List<Donations>();
            while(rdr.Read())
            {
                allDonations.Add(new Donations()
                {
                    DonationID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
                    Amount = rdr.IsDBNull(1) ? 0 : rdr.GetDouble(1),
                    DonationDate = rdr.IsDBNull(2) ? DateTime.MinValue : rdr.GetDateTime(2),
                    ShelterName = rdr.IsDBNull(3) ? null : rdr.GetString(3),
                    Email = rdr.IsDBNull(4) ? null : rdr.GetString(4),
                    FirstName = rdr.IsDBNull(5) ? null : rdr.GetString(5),
                    LastName = rdr.IsDBNull(6) ? null : rdr.GetString(6)
                });
            }

            return allDonations;
        }

        public Donations GetDonation(int ID)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = "SELECT * FROM Donations WHERE DonationID = @ID";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@ID", ID);
            cmd.Prepare();
            using MySqlDataReader rdr = cmd.ExecuteReader();

            rdr.Read();
            return new Donations()
                {
                    DonationID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
                    Amount = rdr.IsDBNull(1) ? 0 : rdr.GetDouble(1),
                    DonationDate = rdr.IsDBNull(2) ? DateTime.MinValue : rdr.GetDateTime(2),
                    ShelterName = rdr.IsDBNull(3) ? null : rdr.GetString(3),
                    Email = rdr.IsDBNull(4) ? null : rdr.GetString(4),
                    FirstName = rdr.IsDBNull(5) ? null : rdr.GetString(5),
                    LastName = rdr.IsDBNull(6) ? null : rdr.GetString(6)
                };
        }
    }
}