using System.ComponentModel.DataAnnotations;

namespace api.models
{
    public class LoginRequestModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Role { get; set; }
        }
}