using System.Reflection.Metadata.Ecma335;

namespace api.Data
{
    public class Connectionstring
    {
        public ConnectionString()
        {
            private string server = "wm63be5w8m7gs25a.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            private string port = "3306";
            private string user = "g4c41xhtc7ijtkxd";
            private string schema = "cjdic9hrkbhzny5e";
            private string password = "qt1hsv20ohcyt3tv";
            string cs = $"server={server};user={user};database={schema};port={port};password={password}";
        }
    }
}