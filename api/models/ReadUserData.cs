using api.Data;
using api.models.interfaces;
using System.Data;
using MySql.Data.MySqlClient;

namespace api.models
{
    class ReadUserData : IGetAllUsers, IGetUser
    {
        public List<User> GetAllUsers()
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = "SELECT * FROM Users";
            using var cmd = new MySqlCommand(stm, con);


            using MySqlDataReader rdr = cmd.ExecuteReader();

            List<User> allUsers = new List<User>();
            while(rdr.Read())
            {
                allUsers.Add(new User()
                {
                    UserID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
                    Email = rdr.IsDBNull(1) ? null : rdr.GetString(1),
                    Username = rdr.IsDBNull(2) ? null : rdr.GetString(2),
                    PasswordHash = rdr.IsDBNull(3) ? null : rdr.GetString(3),
                    Salt = rdr.IsDBNull(4) ? null : rdr.GetString(4),
                    FirstName = rdr.IsDBNull(5) ? null : rdr.GetString(5),
                    LastName = rdr.IsDBNull(6) ? null : rdr.GetString(6),
                    Address = rdr.IsDBNull(7) ? null : rdr.GetString(7),
                    PhoneNumber = rdr.IsDBNull(8) ? null : rdr.GetString(8),
                    UserType = rdr.IsDBNull(9) ? null : rdr.GetString(9),
                    FavoritePets = rdr.IsDBNull(10) ? null : rdr.GetString(10)
                });
            }

            return allUsers;
        }

        // public User GetUser(int ID)
        // {
        //     ConnectionString myConnection = new ConnectionString();
        //     string cs = myConnection.cs;

        //     using var con = new MySqlConnection(cs);
        //     con.Open();

        //     string stm = "SELECT * FROM Users WHERE UserID = @ID";
        //     using var cmd = new MySqlCommand(stm, con);
        //     cmd.Parameters.AddWithValue("@ID", ID);
        //     cmd.Prepare();
        //     using MySqlDataReader rdr = cmd.ExecuteReader();

        //     rdr.Read();
        //     return new User()
        //         {
        //             UserID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
        //             Email = rdr.IsDBNull(1) ? null : rdr.GetString(1),
        //             Username = rdr.IsDBNull(2) ? null : rdr.GetString(2),
        //             PasswordHash = rdr.IsDBNull(3) ? null : rdr.GetString(3),
        //             Salt = rdr.IsDBNull(4) ? null : rdr.GetString(4),
        //             FirstName = rdr.IsDBNull(5) ? null : rdr.GetString(5),
        //             LastName = rdr.IsDBNull(6) ? null : rdr.GetString(6),
        //             Address = rdr.IsDBNull(7) ? null : rdr.GetString(7),
        //             PhoneNumber = rdr.IsDBNull(8) ? null : rdr.GetString(8),
        //             UserType = rdr.IsDBNull(9) ? null : rdr.GetString(9),
        //             FavoritePets = rdr.IsDBNull(10) ? null : rdr.GetString(10)
        //         };
        // }

        public User GetUser(int ID)
{
    ConnectionString myConnection = new ConnectionString();
    string cs = myConnection.cs;

    using (var con = new MySqlConnection(cs))
    {
        con.Open();

        string stm = "SELECT * FROM Users WHERE UserID = @ID";
        using (var cmd = new MySqlCommand(stm, con))
        {
            cmd.Parameters.AddWithValue("@ID", ID);
            using (MySqlDataReader rdr = cmd.ExecuteReader())
            {
                if (rdr.Read())
                {
                    return new User()
                    {
                        UserID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
                        Email = rdr.IsDBNull(1) ? null : rdr.GetString(1),
                        Username = rdr.IsDBNull(2) ? null : rdr.GetString(2),
                        PasswordHash = rdr.IsDBNull(3) ? null : rdr.GetString(3),
                        Salt = rdr.IsDBNull(4) ? null : rdr.GetString(4),
                        FirstName = rdr.IsDBNull(5) ? null : rdr.GetString(5),
                        LastName = rdr.IsDBNull(6) ? null : rdr.GetString(6),
                        Address = rdr.IsDBNull(7) ? null : rdr.GetString(7),
                        PhoneNumber = rdr.IsDBNull(8) ? null : rdr.GetString(8),
                        UserType = rdr.IsDBNull(9) ? null : rdr.GetString(9),
                        FavoritePets = rdr.IsDBNull(10) ? null : rdr.GetString(10)
                    };
                }
                else
                {
                    // Handle case where user with given ID is not found
                    return null;
                }
            }
        }
    }
}
    }
}