using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class UpdateDescriptionData : IUpdateDescription
    {
        public void UpdateDescription(int id, Descriptions updatedDescription)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand();
            cmd.Connection = con;

            cmd.CommandText = @"UPDATE Descriptions
                                SET DescriptionID = @DescriptionID, 
                                    LocationID = @LocationID, 
                                    Description = @Description, 
                                    Location = @Location
                                WHERE DescriptionID = @DescriptionID";
            cmd.Parameters.AddWithValue("@DescriptionID", updatedDescription.DescriptionID);
            cmd.Parameters.AddWithValue("@LocationID", updatedDescription.LocationID);
            cmd.Parameters.AddWithValue("@Description", updatedDescription.Description);
            cmd.Parameters.AddWithValue("@Location", updatedDescription.Location);
            
            cmd.ExecuteNonQuery();
        }
    }
}