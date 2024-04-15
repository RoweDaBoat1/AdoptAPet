using System;
using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class DeletePetAdoptionData : IDeletePetAdoption
    {
        public void DeletePetAdoption(int id)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand();
            cmd.Connection = con;

            cmd.CommandText = "DELETE FROM PetAdoptions WHERE AdoptionID = @AdoptionID";
            cmd.Parameters.AddWithValue("@AdoptionID", id);
            
            cmd.ExecuteNonQuery();
        }
    }
}
