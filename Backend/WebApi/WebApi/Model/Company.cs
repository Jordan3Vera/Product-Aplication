using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Model
{
    [Table("Company")]
    public class Company
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "No puede haber más de 50 caracteres")]
        [DataType(DataType.Text)]
        public string Name { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido")]
        [StringLength(50, ErrorMessage = "No puede haber más de 50 caracteres")]
        [DataType(DataType.Text)]

        public string City { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido")]
        [StringLength(50, ErrorMessage = "No puede haber más de 50 caracteres")]
        [DataType(DataType.Text)]
        public string Region { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido")]
        [StringLength(50, ErrorMessage = "No puede haber más de 50 caracteres")]
        [DataType(DataType.Text)]
        public string Country { get; set; }
    }
}
