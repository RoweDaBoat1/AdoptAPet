using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class DeleteDonationData : IDeleteDonation
    {
        public void DeleteDonation(int id)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand();
            cmd.Connection = con;

            cmd.CommandText = "DELETE FROM Donations WHERE DonationID = @DonationID";
            cmd.Parameters.AddWithValue("@DonationID", id);
            
            cmd.ExecuteNonQuery();
        }
    }
}