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
                                SET DonationID = @DonationID, 
                                    Amount = @Amount, 
                                    DonationDate = @DonationDate, 
                                    ShelterName = @ShelterName, 
                                    Email = @Email, 
                                    FirstName = @FirstName, 
                                    LastName = @LastName
                                WHERE DonationID = @DonationID";
            cmd.Parameters.AddWithValue("@DonationID", updatedDonation.DonationID);
            cmd.Parameters.AddWithValue("@Amount", updatedDonation.Amount);
            cmd.Parameters.AddWithValue("@DonationDate", updatedDonation.DonationDate);
            cmd.Parameters.AddWithValue("@ShelterName", updatedDonation.ShelterName);
            cmd.Parameters.AddWithValue("@Email", updatedDonation.Email);
            cmd.Parameters.AddWithValue("@FirstName", updatedDonation.FirstName);
            cmd.Parameters.AddWithValue("@LastName", updatedDonation.LastName);
            
            cmd.ExecuteNonQuery();
        }
    }
}