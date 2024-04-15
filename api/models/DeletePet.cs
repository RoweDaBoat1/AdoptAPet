using System;
using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class DeletePetData : IDeletePet
    {
        public void DeletePet(int id)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand();
            cmd.Connection = con;

            cmd.CommandText = "DELETE FROM Pets WHERE PetID = @PetID";
            cmd.Parameters.AddWithValue("@PetID", id);
            
            cmd.ExecuteNonQuery();
        }
    }
}
