using api.Data;
using api.models.interfaces;
using MySql.Data.MySqlClient;

namespace api.models
{
     public class ReadPetAdoptionData : IGetAllPetAdoptions, IGetPetAdoption
{
    public List<PetAdoption> GetAllPetAdoptions()
    {
        ConnectionString myConnection = new ConnectionString();
        string cs = myConnection.cs;

        using var con = new MySqlConnection(cs);
        con.Open();

        string stm = "SELECT PetAdoptionID, UserID, PetID, AdoptionDate FROM PetAdoptions";
        using var cmd = new MySqlCommand(stm, con);

        using MySqlDataReader rdr = cmd.ExecuteReader();

        List<PetAdoption> allPetAdoption = new List<PetAdoption>();
        while (rdr.Read())
        {
            allPetAdoption.Add(new PetAdoption()
            {
                AdoptionID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
                UserID = rdr.IsDBNull(1) ? 0 : rdr.GetInt32(1),
                PetID = rdr.IsDBNull(2) ? 0 : rdr.GetInt32(2),
                AdoptionDate = rdr.IsDBNull(3) ?  DateTime.MinValue : rdr.GetDateTime(3)
            });
            }

            return allPetAdoption;
        }
    

    public PetAdoption GetPetAdoption(int ID)
    {
        ConnectionString myConnection = new ConnectionString();
        string cs = myConnection.cs;

        using var con = new MySqlConnection(cs);
        con.Open();

        string stm = "SELECT PetAdoptionID, UserID, PetID, AdoptionDate FROM PetAdoptions WHERE PetAdoptionID = @ID";
        using var cmd = new MySqlCommand(stm, con);
        cmd.Parameters.AddWithValue("@ID", ID);
        cmd.Prepare();
        using MySqlDataReader rdr = cmd.ExecuteReader();

        rdr.Read();
        return new PetAdoption()
        {
            AdoptionID = rdr.IsDBNull(0) ? 0 : rdr.GetInt32(0),
            UserID = rdr.IsDBNull(1) ? 0 : rdr.GetInt32(1),
            PetID = rdr.IsDBNull(2) ? 0 : rdr.GetInt32(2),
            AdoptionDate = rdr.IsDBNull(3) ?  DateTime.MinValue : rdr.GetDateTime(3)
        };
    }
}

}