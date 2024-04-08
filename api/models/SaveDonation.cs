using System.Threading.Tasks;
using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class SaveDonation : IInsertDonation
    {
        public void InsertDonation(Donations value){
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand(cs);

            cmd.CommandText = @"INSET INTO Donations(DonationId, UserID, Amount, DonationDate, Name) VALUES(@DonationId, @UserID, @Amount, @DonationDate, @Name))";
            cmd.Parameters.AddWithValue("@DonationId", value.DonationID);
            cmd.Parameters.AddWithValue("@UserID", value.UserID);
            cmd.Parameters.AddWithValue("@Amount", value.Amount);
            cmd.Parameters.AddWithValue("@DonationDate", value.DonationDate);
            cmd.Parameters.AddWithValue("@Name", value.Name);
            cmd.Prepare();
            cmd.ExecuteNonQuery();
            
        }
    }
}