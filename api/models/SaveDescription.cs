using System.Threading.Tasks;
using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class SaveDescription : IInsertDescription
    {
        public void InsertDescription(Descriptions value){
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand(cs);

            cmd.CommandText = @"INSET INTO Description(DescriptionID, LocationID, Description, Location) VALUES(@DescriptionID, @LocationID, @Description, @Location))";
            cmd.Parameters.AddWithValue("@DescriptionID", value.DescriptionID);
            cmd.Parameters.AddWithValue("@LocationID", value.LocationID);
            cmd.Parameters.AddWithValue("@Description", value.Description);
            cmd.Parameters.AddWithValue("@Location", value.Location);
            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }
    }
}