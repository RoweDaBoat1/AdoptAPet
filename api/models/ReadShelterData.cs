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
            while(rdr.Read())
            {
                allShelters.Add(new Shelter()
                {
                    ShelterID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
                    Username = rdr.IsDBNull(1) ? null : rdr.GetString(1),
                    PasswordHash = rdr.IsDBNull(2) ? null : rdr.GetString(2),
                    Pets_Uploaded = rdr.IsDBNull(3) ? 0 : rdr.GetInt32(3),
                    Address = rdr.IsDBNull(4) ? null : rdr.GetString(4),
                    Phone_Number = rdr.IsDBNull(5) ? null : rdr.GetString(5),
                    Email = rdr.IsDBNull(6) ? null : rdr.GetString(6),
                    Shelter_Name = rdr.IsDBNull(7) ? null : rdr.GetString(7),
                    Pets_For_Adoption = rdr.IsDBNull(8) ? null : rdr.GetInt32(8),
                    Pets_Adopted  = rdr.IsDBNull(9) ? null : rdr.GetInt32(9),
                    Message_From_User = rdr.IsDBNull(10) ? null : rdr.GetString(10),
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
                    Username = rdr.IsDBNull(1) ? null : rdr.GetString(1),
                    PasswordHash = rdr.IsDBNull(2) ? null : rdr.GetString(2),
                    Pets_Uploaded = rdr.IsDBNull(3) ? 0 : rdr.GetInt32(3),
                    Address = rdr.IsDBNull(4) ? null : rdr.GetString(4),
                    Phone_Number = rdr.IsDBNull(5) ? null : rdr.GetString(5),
                    Email = rdr.IsDBNull(6) ? null : rdr.GetString(6),
                    Shelter_Name = rdr.IsDBNull(7) ? null : rdr.GetString(7),
                    Pets_For_Adoption = rdr.IsDBNull(8) ? null : rdr.GetInt32(8),
                    Pets_Adopted  = rdr.IsDBNull(9) ? null : rdr.GetInt32(9),
                    Message_From_User = rdr.IsDBNull(10) ? null : rdr.GetString(10),
                    Approval_Status = rdr.IsDBNull(11) ? null : rdr.GetString(11)
                };
        }
    }
}