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
        public void InsertPet(Pet value){
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand(cs);

            cmd.CommandText = @"INSET INTO Pet(PetId, Name, Breed, Age, Gender, Location, IntakeDate, Weight, Attitude, AboutMe, ShelterID, AdoptionStatus, Height, HouseTrained, PetType) VALUES(@PetID, @Name, @Breed, @Age, @Gender, @Location, @IntakeDate, @Weight, @Attitude, @AboutMe, @ShelterID, @AdoptionStatus, @Height, @HouseTrained, @PetType))";
            cmd.Parameters.AddWithValue("@PetId", value.PetID);
            cmd.Parameters.AddWithValue("@Name", value.Name);
            cmd.Parameters.AddWithValue("@Breed", value.Breed);
            cmd.Parameters.AddWithValue("@Age", value.Age);
            cmd.Parameters.AddWithValue("@Gender", value.Gender);
            cmd.Parameters.AddWithValue("@Location", value.Location);
            cmd.Parameters.AddWithValue("@IntakeDate", value.IntakeDate);
            cmd.Parameters.AddWithValue("@Weight", value.Weight);
            // cmd.Parameters.AddWithValue("@UserType", value.UserType);
            cmd.Parameters.AddWithValue("@Attitude", value.Attitude);
            cmd.Parameters.AddWithValue("@AboutMe", value.AboutMe);
            cmd.Parameters.AddWithValue("@ShelterID", value.ShelterID);
            cmd.Parameters.AddWithValue("@AdoptionStatus", value.AdoptionStatus);
            cmd.Parameters.AddWithValue("@Height", value.Height);
            cmd.Parameters.AddWithValue("@HouseTrained", value.HouseTrained);
            cmd.Parameters.AddWithValue("@PetType", value.PetType);
            cmd.Prepare();
            cmd.ExecuteNonQuery();
            
        }
    }
}