using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
     class ReadPetData : IGetAllPets, IGetPet
    {
        public List<Pet> GetAllPets()
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = "SELECT * FROM Pets";
            using var cmd = new MySqlCommand(stm, con);


            using MySqlDataReader rdr = cmd.ExecuteReader();

            List<Pet> allPets = new List<Pet>();
            while(rdr.Read())
            {
                allPets.Add(new Pet()
                {
                    PetID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
                    Name = rdr.IsDBNull(1) ? null : rdr.GetString(1),
                    Breed = rdr.IsDBNull(2) ? null : rdr.GetString(2),
                    Age = rdr.IsDBNull(3) ? 0 : rdr.GetInt32(3),
                    Gender = rdr.IsDBNull(4) ? null : rdr.GetString(4),
                    IntakeDate = rdr.IsDBNull(5) ? null : rdr.GetString(5),
                    Weight = rdr.IsDBNull(6) ? null : rdr.GetString(6),
                    Attitude = rdr.IsDBNull(7) ? null : rdr.GetString(7),
                    AboutMe = rdr.IsDBNull(8) ? null : rdr.GetString(8),
                    Height = rdr.IsDBNull(9) ? null : rdr.GetString(9),
                    HouseTrained = rdr.IsDBNull(10) ? null : rdr.GetString(10),
                    PetType = rdr.IsDBNull(11) ? null : rdr.GetString(11),
                    AdoptionStatus = rdr.IsDBNull(12) ? null : rdr.GetString(12),
                    ShelterID = rdr.IsDBNull(13) ? 0 : rdr.GetInt32(13)
                });
            }

            return allPets;
        }

        public Pet GetPet(int ID)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = "SELECT * FROM Pets WHERE PetID = @ID";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@ID", ID);
            cmd.Prepare();
            using MySqlDataReader rdr = cmd.ExecuteReader();

            rdr.Read();
            return new Pet()
                {
                    PetID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
                    Name = rdr.IsDBNull(1) ? null : rdr.GetString(1),
                    Breed = rdr.IsDBNull(2) ? null : rdr.GetString(2),
                    Age = rdr.IsDBNull(3) ? 0 : rdr.GetInt32(3),
                    Gender = rdr.IsDBNull(4) ? null : rdr.GetString(4),
                    IntakeDate = rdr.IsDBNull(5) ? null : rdr.GetString(5),
                    Weight = rdr.IsDBNull(6) ? null : rdr.GetString(6),
                    Attitude = rdr.IsDBNull(7) ? null : rdr.GetString(7),
                    AboutMe = rdr.IsDBNull(8) ? null : rdr.GetString(8),
                    Height = rdr.IsDBNull(9) ? null : rdr.GetString(9),
                    HouseTrained = rdr.IsDBNull(10) ? null : rdr.GetString(10),
                    PetType = rdr.IsDBNull(11) ? null : rdr.GetString(11),
                    AdoptionStatus = rdr.IsDBNull(12) ? null : rdr.GetString(12),
                    ShelterID = rdr.IsDBNull(13) ? 0 : rdr.GetInt32(13)
                };
        }
    }
}