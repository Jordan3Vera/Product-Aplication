using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebApi.Model.Validations;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Model
{
    public class User
    {
        /*Lo que se intenta hacer con esto que cifrar el id.
         Hasta ahora si se quiere mostrar una lista de usuarios, aparentemente si se mostrarán los id,
         pero si se busca por filtro id desde sawagger o en cuyo caso también el front, el "id" estará 
         cifrado*/
        protected User()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }

        [Required(ErrorMessage ="El campo {0} no puede quedar vacío")]
        [StringLength(20, ErrorMessage ="No puede haber más de 20 caracteres")]
        [Display(Name = "Nombre de usuario")]
        [DataType(DataType.Text)]
        [RegularExpression("^[a-zA-Z0-9]+$", ErrorMessage ="Solo se aceptan número y letras")]
        public string Username { get; set; }

        [Required(ErrorMessage = "El campo {0} no puede quedar vacío")]
        [StringLength(30, ErrorMessage ="No puede haber más de 30 caracteres")]
        [Display(Name = "Correo electrónico")]
        [DataType(DataType.EmailAddress)]
        [EmailAddress(ErrorMessage = "Debe tener el formato de correo")]
        [EmailAtt(allowedDomain: "hotmail.com", ErrorMessage ="El dominio del correo debe ser: hotmail.com")]
        [UsernameAtt]
        public string Email { get; set; }

        [Required(ErrorMessage = "El campo {0} no puede quedar vacío")]
        [StringLength(16, ErrorMessage ="No puede haber más de 16 caracteres")]
        [MinLength(4,ErrorMessage ="Debe tener al menos 4 caracteres")]
        [DataType(DataType.Password)]
        [Display(Name ="Contraseña")]
        public string Password { get; set; }

        [Required(ErrorMessage = "El campo {0} no puede quedar vacío")]
        [Compare("Password", ErrorMessage ="Las contraseñas son distintas")]
        [DataType(DataType.Password)]
        [Display(Name ="Confirmar contraseña")]
        [NotMapped]
        public string ConfirmPassword { get; set; }

        public string Token { get; set; }
    }
}
