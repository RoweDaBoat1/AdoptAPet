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

            string stm = "SELECT * FROM User";
            using var cmd = new MySqlCommand(stm, con);


            using MySqlDataReader rdr = cmd.ExecuteReader();

            List<User> allUsers = new List<User>();
            while(rdr.Read())
            {
                allUsers.Add(new User()
                {
                    UserID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
                    Email = rdr.IsDBNull(1) ? null : rdr.GetString(1),
                    PasswordHash = rdr.IsDBNull(2) ? null : rdr.GetString(2),
                    Salt = rdr.IsDBNull(3) ? null : rdr.GetString(3),
                    FirstName = rdr.IsDBNull(4) ? null : rdr.GetString(4),
                    LastName = rdr.IsDBNull(5) ? null : rdr.GetString(5),
                    ZipCode = rdr.IsDBNull(6) ? null : rdr.GetString(6),
                    PhoneNumber = rdr.IsDBNull(7) ? null : rdr.GetString(7),
                    FavoritePets = rdr.IsDBNull(8) ? null : rdr.GetString(8),
                    Role = rdr.IsDBNull(9) ? null : rdr.GetString(9)
                });
            }

            return allUsers;
        }


        public User GetUser(int UserID)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using (var con = new MySqlConnection(cs))
            {
                con.Open();

                string stm = "SELECT * FROM User WHERE UserID = @ID";
                using (var cmd = new MySqlCommand(stm, con))
                {
                    cmd.Parameters.AddWithValue("@ID", UserID);
                    using (MySqlDataReader rdr = cmd.ExecuteReader())
                    {
                        if (rdr.Read())
                        {
                            return new User()
                            {
                                UserID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
                                Email = rdr.IsDBNull(1) ? null : rdr.GetString(1),
                                PasswordHash = rdr.IsDBNull(2) ? null : rdr.GetString(2),
                                Salt = rdr.IsDBNull(3) ? null : rdr.GetString(3),
                                FirstName = rdr.IsDBNull(4) ? null : rdr.GetString(4),
                                LastName = rdr.IsDBNull(5) ? null : rdr.GetString(5),
                                ZipCode = rdr.IsDBNull(6) ? null : rdr.GetString(6),
                                PhoneNumber = rdr.IsDBNull(7) ? null : rdr.GetString(7),
                                FavoritePets = rdr.IsDBNull(8) ? null : rdr.GetString(8),
                                Role = rdr.IsDBNull(9) ? null : rdr.GetString(9)
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