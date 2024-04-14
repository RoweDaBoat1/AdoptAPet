using System.Data;
using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
   public class ReadMessageData : IGetAllMessages, IGetMessage
    {
        public List<Messages> GetAllMessages()
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = "SELECT * FROM Messages";
            using var cmd = new MySqlCommand(stm, con);


            using MySqlDataReader rdr = cmd.ExecuteReader();

            List<Messages> allMessages = new List<Messages>();
            while(rdr.Read())
            {
                allMessages.Add(new Messages()
                {
                    MessageID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
                    UserID = rdr.IsDBNull(1) ? 0 : rdr.GetInt32(1),
                    Message = rdr.IsDBNull(2) ? null : rdr.GetString(2),
                    Email = rdr.IsDBNull(3) ? null : rdr.GetString(3),
                    Timestamp = rdr.IsDBNull(4) ? DateTime.MinValue : rdr.GetDateTime(4),
                    ShelterID = rdr.IsDBNull(5) ? 0 : rdr.GetInt32(5)
                });
            }

            return allMessages;
        }

        public Messages GetMessage(int ID)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = "SELECT * FROM Messages WHERE MessageID = @ID";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@ID", ID);
            cmd.Prepare();
            using MySqlDataReader rdr = cmd.ExecuteReader();

            rdr.Read();
            return new Messages()
                {
                    MessageID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
                    UserID = rdr.IsDBNull(1) ? 0 : rdr.GetInt32(1),
                    Message = rdr.IsDBNull(2) ? null : rdr.GetString(2),
                    Email = rdr.IsDBNull(3) ? null : rdr.GetString(3),
                    Timestamp = rdr.IsDBNull(4) ? DateTime.MinValue : rdr.GetDateTime(4),
                    ShelterID = rdr.IsDBNull(5) ? 0 : rdr.GetInt32(5)
                };
        }
    }
}