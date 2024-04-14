using api.Data;
using api.models.interfaces;
using System.Data;
using MySql.Data.MySqlClient;



namespace api.models
{
    class ReadShelterData : IGetAllShelters, IGetShelter
    {
        public List<Shelter> GetAllShelters()
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = "SELECT * FROM Shelter";
            using var cmd = new MySqlCommand(stm, con);


            using MySqlDataReader rdr = cmd.ExecuteReader();

            List<Shelter> allShelters = new List<Shelter>();
            while (rdr.Read())
            {
                allShelters.Add(new Shelter()
                {
                    ShelterID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
                    PasswordHash = rdr.IsDBNull(1) ? null : rdr.GetString(1),
                    Salt = rdr.IsDBNull(2) ? null : rdr.GetString(2),
                    AddressLine = rdr.IsDBNull(3) ? null : rdr.GetString(3),
                    City = rdr.IsDBNull(4) ? null : rdr.GetString(4),
                    State = rdr.IsDBNull(5) ? null : rdr.GetString(5),
                    ZipCode = rdr.IsDBNull(6) ? null : rdr.GetString(6),
                    Phone_Number = rdr.IsDBNull(7) ? null : rdr.GetString(7),
                    Email = rdr.IsDBNull(8) ? null : rdr.GetString(8),
                    Shelter_Name = rdr.IsDBNull(9) ? null : rdr.GetString(9),
                    Role = rdr.IsDBNull(10) ? null : rdr.GetString(10),
                    Approval_Status = rdr.IsDBNull(11) ? null : rdr.GetString(11)
                });
            }

            return allShelters;
        }

        public Shelter GetShelter(int ID)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = "SELECT * FROM Shelter WHERE ShelterID = @ID";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@ID", ID);
            cmd.Prepare();
            using MySqlDataReader rdr = cmd.ExecuteReader();

            rdr.Read();
            return new Shelter()
            {
                ShelterID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
                PasswordHash = rdr.IsDBNull(1) ? null : rdr.GetString(1),
                Salt = rdr.IsDBNull(2) ? null : rdr.GetString(2),
                AddressLine = rdr.IsDBNull(3) ? null : rdr.GetString(3),
                City = rdr.IsDBNull(4) ? null : rdr.GetString(4),
                State = rdr.IsDBNull(5) ? null : rdr.GetString(5),
                ZipCode = rdr.IsDBNull(6) ? null : rdr.GetString(6),
                Phone_Number = rdr.IsDBNull(7) ? null : rdr.GetString(7),
                Email = rdr.IsDBNull(8) ? null : rdr.GetString(8),
                Shelter_Name = rdr.IsDBNull(9) ? null : rdr.GetString(9),
                Role = rdr.IsDBNull(10) ? null : rdr.GetString(10),
                Approval_Status = rdr.IsDBNull(11) ? null : rdr.GetString(11)
            };
        }
    }
}