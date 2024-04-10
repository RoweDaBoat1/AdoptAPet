using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class DeleteDescriptionData : IDeleteDescription
    {
        public void DeleteDescription(int id)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand();
            cmd.Connection = con;

            cmd.CommandText = "DELETE FROM Description WHERE DescriptionID = @DescriptionID";
            cmd.Parameters.AddWithValue("@DescriptionID", id);
            
            cmd.ExecuteNonQuery();
        }
    }
}