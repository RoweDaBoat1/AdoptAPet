using System;
using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models{
    public class DeleteShelterData : IDeleteShelter
    {
        public void DeleteShelter(int id)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand();
            cmd.Connection = con;

            cmd.CommandText = "DELETE FROM Shelter WHERE ShelterId = @ShelterId";
            cmd.Parameters.AddWithValue("@ShelterId", id);
            
            cmd.ExecuteNonQuery();
        }
    }
}