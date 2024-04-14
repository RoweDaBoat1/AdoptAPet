using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
    public class ReadFavoriteData : IGetAllFavorites, IGetFavorite
    {
        public List<Favorites> GetAllFavorites()
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = "SELECT * FROM Favorites";
            using var cmd = new MySqlCommand(stm, con);


            using MySqlDataReader rdr = cmd.ExecuteReader();

            List<Favorites> allFavorites = new List<Favorites>();
            while(rdr.Read())
            {
                allFavorites.Add(new Favorites()
                {
                    UserID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
                    PetID = rdr.IsDBNull(1) ? 0 : rdr.GetInt32(1),
                    FavoriteDate = rdr.IsDBNull(2) ? DateTime.MinValue : rdr.GetDateTime(2)
                });
            }

            return allFavorites;
        }

        public Favorites GetFavorite(int ID)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = "SELECT * FROM Favorites WHERE UserID = @ID";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@ID", ID);
            cmd.Prepare();
            
            using MySqlDataReader rdr = cmd.ExecuteReader();

            rdr.Read();
            return new Favorites()
                {
                    UserID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
                    PetID = rdr.IsDBNull(1) ? 0 : rdr.GetInt32(1),
                    FavoriteDate = rdr.IsDBNull(2) ? DateTime.MinValue : rdr.GetDateTime(2)
                };
        }
    }
}