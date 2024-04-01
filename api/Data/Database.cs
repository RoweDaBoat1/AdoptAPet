using System.Reflection.Metadata.Ecma335;
using MySql.Data.MySqlClient;

namespace api.Data
{
    public class Database
    {
        private string server = "wm63be5w8m7gs25a.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
        private string port = "3306";
        private string user = "g4c41xhtc7ijtkxd";
        private string schema = "cjdic9hrkbhzny5e";
        private string password = "qt1hsv20ohcyt3tv";

        public MySqlConnection GetPublicConnection()
        {
            string cs = $"server={server};user={user};database={schema};port={port};password={password}";
            var con = new MySqlConnection(cs);
        }
        
    }

}