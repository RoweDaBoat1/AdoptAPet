using api.Data;
using api.models.interfaces;
using System.Data;
using MySql.Data.MySqlClient;

namespace api.models
{
    class ReadAdminData : IGetAllAdmins, IGetAdmin
    {
        public List<Admin> GetAllAdmins()
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = "SELECT * FROM Admin";
            using var cmd = new MySqlCommand(stm, con);


            using MySqlDataReader rdr = cmd.ExecuteReader();

            List<Admin> allAdmins = new List<Admin>();
            while(rdr.Read())
            {
                allAdmins.Add(new Admin()
                {
                    ID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
                    Email = rdr.IsDBNull(1) ? null : rdr.GetString(1),
                    FirstName = rdr.IsDBNull(2) ? null : rdr.GetString(2),
                    LastName = rdr.IsDBNull(3) ? null : rdr.GetString(3),
                    PasswordHash = rdr.IsDBNull(4) ? null : rdr.GetString(4),
                    Salt = rdr.IsDBNull(5) ? null : rdr.GetString(5),
                    Role = rdr.IsDBNull(6) ? null : rdr.GetString(6)
                });
            }

            return allAdmins;
        }


        public Admin GetAdmin(int ID)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using (var con = new MySqlConnection(cs))
            {
                con.Open();

                string stm = "SELECT * FROM Admin WHERE ID = @ID";
                using (var cmd = new MySqlCommand(stm, con))
                {
                    cmd.Parameters.AddWithValue("@ID", ID);
                    using (MySqlDataReader rdr = cmd.ExecuteReader())
                    {
                        if (rdr.Read())
                        {
                            return new Admin()
                            {
                                ID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
                                Email = rdr.IsDBNull(1) ? null : rdr.GetString(1),
                                FirstName = rdr.IsDBNull(2) ? null : rdr.GetString(2),
                                LastName = rdr.IsDBNull(3) ? null : rdr.GetString(3),
                                PasswordHash = rdr.IsDBNull(4) ? null : rdr.GetString(4),
                                Salt = rdr.IsDBNull(5) ? null : rdr.GetString(5),
                                Role = rdr.IsDBNull(6) ? null : rdr.GetString(6)
                            };
                        }
                        else
                        {
                            // Handle case where Admin with given ID is not found
                            return null;
                        }
                    }
                }
            }
        }
    }
}