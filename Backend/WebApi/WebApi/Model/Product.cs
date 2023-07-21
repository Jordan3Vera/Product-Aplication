using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Model
{
    [Table("Product")]
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Display(Name ="Nombre del producto")]
        [DataType(DataType.Text)]
        public string Name { get; set; }

        [Required]
        [DataType(DataType.Text)]
        public string Gamma { get; set; }

        [Required]
        [DataType(DataType.Text)]
        public string Description { get; set; }

        [Required]
        [DataType(DataType.Text)]
        public int Stock { get; set; }

        [Required]
        [DataType(DataType.Text)]
        public int Price { get; set; }

        public Supplier Suppliers { get; set; }

        public Company Companys { get; set; }

    }
}
