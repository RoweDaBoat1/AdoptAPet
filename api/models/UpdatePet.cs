using System;
using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class UpdatePetData : IUpdatePet
    {
        public void UpdatePet(int id, Pet updatedPet)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            // Check if the ShelterID exists in the Shelter table before updating the pet
            if (ShelterExists(con, updatedPet.ShelterID))
            {
                using var cmd = new MySqlCommand();
                cmd.Connection = con;

                cmd.CommandText = @"UPDATE Pets 
                                    SET Name = @Name, 
                                        Breed = @Breed, 
                                        Age = @Age, 
                                        Gender = @Gender, 
                                        IntakeDate = @IntakeDate, 
                                        PostDate = @PostDate, 
                                        Weight = @Weight, 
                                        Attitude = @Attitude, 
                                        AboutMe = @AboutMe,
                                        Height = @Height, 
                                        HouseTrained = @HouseTrained, 
                                        PetType = @PetType,
                                        AdoptionStatus = @AdoptionStatus, 
                                        ShelterID = @ShelterID
                                    WHERE PetId = @PetId";
                cmd.Parameters.AddWithValue("@PetId", id);
                cmd.Parameters.AddWithValue("@Name", updatedPet.Name);
                cmd.Parameters.AddWithValue("@Breed", updatedPet.Breed);
                cmd.Parameters.AddWithValue("@Age", updatedPet.Age);
                cmd.Parameters.AddWithValue("@Gender", updatedPet.Gender);
                cmd.Parameters.AddWithValue("@IntakeDate", updatedPet.IntakeDate);
                cmd.Parameters.AddWithValue("@PostDate", updatedPet.PostDate);
                cmd.Parameters.AddWithValue("@Weight", updatedPet.Weight);
                cmd.Parameters.AddWithValue("@Attitude", updatedPet.Attitude);
                cmd.Parameters.AddWithValue("@AboutMe", updatedPet.AboutMe);
                cmd.Parameters.AddWithValue("@Height", updatedPet.Height);
                cmd.Parameters.AddWithValue("@HouseTrained", updatedPet.HouseTrained);
                cmd.Parameters.AddWithValue("@PetType", updatedPet.PetType);
                cmd.Parameters.AddWithValue("@AdoptionStatus", updatedPet.AdoptionStatus);
                cmd.Parameters.AddWithValue("@ShelterID", updatedPet.ShelterID);

                cmd.ExecuteNonQuery();
            }
            else
            {
                // Handle the case where the ShelterID does not exist
                // You can throw an exception, log an error, or handle it based on your application logic
                throw new Exception("The specified ShelterID does not exist.");
            }
        }

        // Helper method to check if the ShelterID exists in the Shelter table
        private bool ShelterExists(MySqlConnection con, int shelterId)
        {
            using var cmd = new MySqlCommand("SELECT COUNT(*) FROM Shelter WHERE ShelterID = @ShelterID", con);
            cmd.Parameters.AddWithValue("@ShelterID", shelterId);
            int count = Convert.ToInt32(cmd.ExecuteScalar());
            return count > 0;
        }
    }
}
