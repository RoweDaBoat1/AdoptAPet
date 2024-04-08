using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class UpdateDonationData : IUpdateDonation
    {
        public void UpdateDonations(int id, Donations updatedDonation)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand();
            cmd.Connection = con;

            cmd.CommandText = @"UPDATE Donations
                                SET DonationId = @DonationID, 
                                    UserID = @UserID, 
                                    Amount= @Amount, 
                                    DonationDate = @DonationDate, 
                                    Name = @Name, 
                                WHERE DonationId = @DonationId";
            cmd.Parameters.AddWithValue("@DonationId", updatedDonation.DonationID);
            cmd.Parameters.AddWithValue("@UserID", updatedDonation.UserID);
            cmd.Parameters.AddWithValue("@Amount", updatedDonation.Amount);
            cmd.Parameters.AddWithValue("@DonationDate", updatedDonation.DonationDate);
            cmd.Parameters.AddWithValue("@Name", updatedDonation.Name);
            
            cmd.ExecuteNonQuery();
        }
    }
}