using api.Data;
using api.models.interfaces;
using System.Data;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class ReadShelterPostData : IGetAllShelterPosts, IGetShelterPost
    {
        public List<ShelterPost> GetAllShelterPosts()
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = "SELECT * FROM ShelterPost";
            using var cmd = new MySqlCommand(stm, con);


            using MySqlDataReader rdr = cmd.ExecuteReader();

            List<ShelterPost> allShelterPost = new List<ShelterPost>();
            while (rdr.Read())
            {
                allShelterPost.Add(new ShelterPost()
                {
                    ShelterID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
                    Title = rdr.IsDBNull(1) ? null : rdr.GetString(1),
                    Message = rdr.IsDBNull(2) ? null : rdr.GetString(2)
                });
            }

            return allShelterPost;
        }

        public ShelterPost GetShelterPost(int ID)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = "SELECT * FROM ShelterPost WHERE ShelterID = @ID";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@ID", ID);
            cmd.Prepare();
            using MySqlDataReader rdr = cmd.ExecuteReader();

            rdr.Read();
            return new ShelterPost()
            {
                ShelterID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
                Title = rdr.IsDBNull(1) ? null : rdr.GetString(1),
                Message = rdr.IsDBNull(2) ? null : rdr.GetString(2)
            };
        }
    }
}