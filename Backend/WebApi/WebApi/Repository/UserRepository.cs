using System;
using System.Data;
using System.Collections.Generic;
using System.Data.SqlClient;
using WebApi.DB;
using WebApi.Helper;
using Dapper;
using WebApi.Model;
using System.Linq;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Configuration;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApi.Model.ViewModel;

namespace WebApi.Repository
{
    public class UserRepository
    {
        public static readonly IConfiguration _config;

        //Método para obtener la lista de usuario
        public static IEnumerable<User> GetUser()
        {
            using (SqlConnection db = new SqlConnection(ConnectionDB.routeConnection))
            {
                try
                {
                    string sQuery = "sp_lsUser";
                    db.Open();
                    return db.Query<User>(sQuery, commandType: CommandType.StoredProcedure);
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
                finally { db.Close(); }
            }
            
        }

        //Get id
        public static User GetUserId(int id)
        {
            using (SqlConnection db = new SqlConnection(ConnectionDB.routeConnection))
            {
                try
                {
                    string sQuery = "sp_userId";
                    db.Open();
                    return db.Query<User>(sQuery,new {id = id},commandType: CommandType.StoredProcedure).FirstOrDefault();
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
                finally
                {
                    db.Close();
                }
            }
           
        }

        //Post Agregar un usuario
        public static bool PostUser(User oUser)
        {
            using (SqlConnection db = new SqlConnection(ConnectionDB.routeConnection))
            {
                try
                {
                    //HashedPassword hash = HashHelper.Hash(oUser.Password);
                    //oUser.Password = hash.Password; //Para que encripte la contraseña


                    HashedToken hashtoken = HashHelper.HashTokens(oUser.Password); //Para encriptar o crear un token desde el backend
                    oUser.Token = hashtoken.Token;

                    #region Para crear el token
                     /*var secretKey = _config.GetValue<string>("SecretKey");
                     var key = Encoding.ASCII.GetBytes(secretKey);
                     var claims = new ClaimsIdentity();
                     claims.AddClaim(new Claim(ClaimTypes.NameIdentifier, oUser.Email));
                     var tokenDescriptor = new SecurityTokenDescriptor
                     {
                         Subject = claims,
                         Expires = DateTime.UtcNow.AddHours(8760),
                         SigningCredentials = new SigningCredentials(new
                             SymmetricSecurityKey(key),
                             SecurityAlgorithms.HmacSha256Signature)
                     };
                     var tokenHandler = new JwtSecurityTokenHandler();
                     var createdToken = tokenHandler.CreateToken(tokenDescriptor);

                    oUser.Token = tokenHandler.WriteToken(createdToken);*/
                    #endregion


                    string sQuery = @"sp_insertUser";

                    db.Open();

                    db.Execute(sQuery, new
                    {
                        username = oUser.Username,
                        email = oUser.Email,
                        password = oUser.Password,  
                        token = oUser.Token,
                    }, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
                finally
                {
                    db.Close();
                }
            }
            
        }

        //Put Actualizar un usuario
        public static bool PutUser(loginVM oUser)
        {
            using (SqlConnection db = new SqlConnection(ConnectionDB.routeConnection))
            {
                try
                {
                    string sQuery = @"sp_updateUser";
                    HashedPassword hash = HashHelper.Hash(oUser.Password);
                    oUser.Password = hash.Password;

                    db.Open();
                    db.Query<User>(sQuery, new
                    {
                        id = oUser.id,
                        password = oUser.Password
                    },commandType: CommandType.StoredProcedure);
                    
                    return true;
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
                finally
                {
                    db.Close();
                }
            }
           
        }

        //Delete Para eliminar un registro
        public static bool DeleteUser(int id)
        {
            using (SqlConnection db = new SqlConnection(ConnectionDB.routeConnection))
            {
                try
                {
                    string sQuery = @"sp_deleteUser";
                    db.Open();
                    db.Execute(sQuery, new 
                        { 
                            id = id 
                    }, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
                finally 
                { 
                    db.Close(); 
                }
            }
            
        }
    }
}
