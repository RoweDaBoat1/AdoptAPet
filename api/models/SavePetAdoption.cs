using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class SavePetAdoption : IInsertPetAdoption
    {
        public void InsertPetAdoption(PetAdoption value)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand();
            cmd.Connection = con;
            cmd.CommandText = @"INSERT INTO Pets(AdoptionID, UserID, PetID, AdoptionDate) VALUES(@AdoptionID, @UserID, @PetID, @AdoptionDate)";
            cmd.Parameters.AddWithValue("@AdoptionID", value.AdoptionID);
            cmd.Parameters.AddWithValue("@UserID", value.UserID);
            cmd.Parameters.AddWithValue("@PetID", value.PetID);
            cmd.Parameters.AddWithValue("@AdoptionDate", value.AdoptionDate);
            
            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }
    }
}