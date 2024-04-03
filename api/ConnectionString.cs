using System.Reflection.Metadata.Ecma335;

namespace api.Data
{
    public class ConnectionString
    {
        public string cs {get; set;}
        public ConnectionString()
        {
            string server = "wm63be5w8m7gs25a.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            string port = "3306";
            string user = "g4c41xhtc7ijtkxd";
            string schema = "cjdic9hrkbhzny5e";
            string password = "qt1hsv20ohcyt3tv";

            cs = $"server={server};user={user};database={schema};port={port};password={password}";
        }
    }
}