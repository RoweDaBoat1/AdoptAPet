using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class ReadDescriptionData : IGetAllDescriptions, IGetDescription
    {
        public List<Descriptions> GetAllDescriptions()
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = "SELECT * FROM Description";
            using var cmd = new MySqlCommand(stm, con);


            using MySqlDataReader rdr = cmd.ExecuteReader();

            List<Descriptions> allDescriptions = new List<Descriptions>();
            while(rdr.Read())
            {
                allDescriptions.Add(new Descriptions()
                {
                    DescriptionID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
                    LocationID = rdr.IsDBNull(1) ? 0 : rdr.GetInt32(1),
                    Description = rdr.IsDBNull(2) ? null : rdr.GetString(2),
                    Location = rdr.IsDBNull(3) ? null : rdr.GetString(3)
                });
            }

            return allDescriptions;
        }

        public Descriptions GetDescription(int ID)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = "SELECT * FROM Description WHERE DescriptionID = @ID";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@ID", ID);
            cmd.Prepare();
            using MySqlDataReader rdr = cmd.ExecuteReader();

            rdr.Read();
            return new Descriptions()
                {
                    DescriptionID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
                    LocationID = rdr.IsDBNull(1) ? 0 : rdr.GetInt32(1),
                    Description = rdr.IsDBNull(2) ? null : rdr.GetString(2),
                    Location = rdr.IsDBNull(3) ? null : rdr.GetString(3)
                };
        }
    }
}