using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class SaveMessages : IInsertMessage
    {
        public void InsertMessage(Messages value){
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand(cs);

            cmd.CommandText = @"INSET INTO Messages(MessageId, UserID, Message, Email, Timestamp, ShelterID) VALUES(@MessageID, @UserID, @Message, @Email, @Timestamp, @ShelterID))";
            cmd.Parameters.AddWithValue("@MessageId", value.MessageID);
            cmd.Parameters.AddWithValue("@UserID", value.UserID);
            cmd.Parameters.AddWithValue("@Message", value.Message);
            cmd.Parameters.AddWithValue("@Email", value.Email);
            cmd.Parameters.AddWithValue("@Timestamp", value.Timestamp);
            cmd.Parameters.AddWithValue("@ShelterID", value.ShelterID);
            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }
    }
}