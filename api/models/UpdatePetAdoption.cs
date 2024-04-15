using System;
using System.Collections.Generic;
using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class UpdatePetAdoptionData : IUpdatePetAdoption
    {
        public void UpdatePetAdoption(int id, PetAdoption updatedPetAdoption)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            
            using var cmd = new MySqlCommand();
            cmd.Connection = con;

            cmd.CommandText = @"UPDATE PetAdoptions 
                                SET AdoptionID = @AdoptionID, 
                                    UserID = @UserID, 
                                    PetID = @PetID, 
                                    AdoptionDate = @AdoptionDate,
                                WHERE AdoptionID = @AdoptionID";
            cmd.Parameters.AddWithValue("@AdoptionID", id);
            cmd.Parameters.AddWithValue("@UserID", updatedPetAdoption.UserID);
            cmd.Parameters.AddWithValue("@PetID", updatedPetAdoption.PetID);
            cmd.Parameters.AddWithValue("@AdoptionDate", updatedPetAdoption.AdoptionDate);

            cmd.ExecuteNonQuery();
            
        }
    }
}