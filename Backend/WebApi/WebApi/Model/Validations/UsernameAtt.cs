using System;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.SqlClient;
using WebApi.DB;
using Dapper;
using System.Collections.Generic;
using System.Linq;

namespace WebApi.Model.Validations
{
    public class UsernameAtt : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            /*using(SqlConnection db = new SqlConnection(ConnectionDB.routeConnection))
            {
                string email = (string)value;
                var sQuery = $"SELECT * FROM dbo.Users WHERE email = {email}";
                //IEnumerable<User> user = db.Query<User>(sQuery);
                if(user.Count() > 0)
                {
                    return new ValidationResult("Este correo ya existe");
                }
                                
            }*/
            return ValidationResult.Success;
        }
    }
}
