using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class SavePet : IInsertPet
    {
        public void InsertPet(Pet value)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand();
            cmd.Connection = con;
            cmd.CommandText = @"INSERT INTO Pets(PetID, Name, Breed, Age, Gender, IntakeDate, PostDate, Weight, Attitude, AboutMe, Height, HouseTrained, PetType, ShelterID, AdoptionStatus) VALUES(@PetID, @Name, @Breed, @Age, @Gender, @IntakeDate, @PostDate, @Weight, @Attitude, @AboutMe, @Height, @HouseTrained, @PetType, @ShelterID, @AdoptionStatus)";
            cmd.Parameters.AddWithValue("@PetID", value.PetID);
            cmd.Parameters.AddWithValue("@Name", value.Name);
            cmd.Parameters.AddWithValue("@Breed", value.Breed);
            cmd.Parameters.AddWithValue("@Age", value.Age);
            cmd.Parameters.AddWithValue("@Gender", value.Gender);
            cmd.Parameters.AddWithValue("@IntakeDate", value.IntakeDate);
            cmd.Parameters.AddWithValue("@PostDate", value.PostDate);
            cmd.Parameters.AddWithValue("@Weight", value.Weight);
            cmd.Parameters.AddWithValue("@Attitude", value.Attitude);
            cmd.Parameters.AddWithValue("@AboutMe", value.AboutMe);
            cmd.Parameters.AddWithValue("@Height", value.Height);
            cmd.Parameters.AddWithValue("@HouseTrained", value.HouseTrained);
            cmd.Parameters.AddWithValue("@PetType", value.PetType);
            cmd.Parameters.AddWithValue("@AdoptionStatus", value.AdoptionStatus);
            cmd.Parameters.AddWithValue("@ShelterID", value.ShelterID);
            //cmd.Parameters.AddWithValue("@ImagePath", value.ImagePath);
            //add back into insert statement when ready
            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }
    }
}
