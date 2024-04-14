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
                    ShelterPostID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
                    ShelterID = rdr.IsDBNull(1) ? 0 : rdr.GetInt32(1),
                    Title = rdr.IsDBNull(2) ? null : rdr.GetString(2),
                    Message = rdr.IsDBNull(3) ? null : rdr.GetString(3)
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

            string stm = "SELECT * FROM ShelterPost WHERE ShelterPostID = @ID";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@ID", ID);
            cmd.Prepare();
            using MySqlDataReader rdr = cmd.ExecuteReader();

            rdr.Read();
            return new ShelterPost()
            {
                ShelterPostID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
                ShelterID = rdr.IsDBNull(1) ? 0 : rdr.GetInt32(1),
                Title = rdr.IsDBNull(2) ? null : rdr.GetString(2),
                Message = rdr.IsDBNull(3) ? null : rdr.GetString(3)
            };
        }
    }
}