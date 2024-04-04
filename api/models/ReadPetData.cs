using api.Data;
using api.models.interfaces;
using System.Data;
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
                    Location = rdr.IsDBNull(5) ? null : rdr.GetString(5),
                    IntakeDate = rdr.IsDBNull(6) ? null : rdr.GetString(6),
                    Weight = rdr.IsDBNull(7) ? null : rdr.GetString(7),
                    Attitude = rdr.IsDBNull(8) ? null : rdr.GetString(8),
                    AboutMe = rdr.IsDBNull(9) ? null : rdr.GetString(9),
                    ShelterUserID = rdr.IsDBNull(10) ? 0 : rdr.GetInt32(10),
                    AdoptionStatus = rdr.IsDBNull(11) ? null : rdr.GetString(11),
                    Height = rdr.IsDBNull(12) ? null : rdr.GetString(12),
                    HouseTrained = rdr.IsDBNull(13) ? null : rdr.GetString(13),
                    PetType = rdr.IsDBNull(14) ? null : rdr.GetString(14),
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
                        Location = rdr.IsDBNull(5) ? null : rdr.GetString(5),
                        IntakeDate = rdr.IsDBNull(6) ? null : rdr.GetString(6),
                        Weight = rdr.IsDBNull(7) ? null : rdr.GetString(7),
                        Attitude = rdr.IsDBNull(8) ? null : rdr.GetString(8),
                        AboutMe = rdr.IsDBNull(9) ? null : rdr.GetString(9),
                        ShelterUserID = rdr.IsDBNull(10) ? 0 : rdr.GetInt32(10),
                        AdoptionStatus = rdr.IsDBNull(11) ? null : rdr.GetString(11),
                        Height = rdr.IsDBNull(12) ? null : rdr.GetString(12),
                        HouseTrained = rdr.IsDBNull(13) ? null : rdr.GetString(13),
                        PetType = rdr.IsDBNull(14) ? null : rdr.GetString(14),
                };
        }
    }
}