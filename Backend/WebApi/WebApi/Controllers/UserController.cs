using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using WebApi.Model;
using WebApi.Repository;
using WebApi.Helper;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;
using System.Data.SqlClient;
using WebApi.DB;
using Dapper;
using System.Linq;
using WebApi.Model.ViewModel;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public List<User> user = new List<User>();

        // GET: api/<UserController>
        [HttpGet]
        public IEnumerable<User> GetUser()
        {
           return UserRepository.GetUser();
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public User GetUserId(int id)
        {
            var user = UserRepository.GetUserId(id);

            if(user == null)
            {
                BadRequest(ErrorHelper.Response(404, "Registro no encontrado"));
            }

            return user;
        }

        // POST api/<UserController>
        [HttpPost]
        public bool PostUser([FromBody] User oUser)
        {
            if (!ModelState.IsValid)
            {
                BadRequest(ErrorHelper.GetModelStateErrors(ModelState));
            }

            UserRepository.PostUser(oUser);
            return true;

        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public bool PutUser([FromBody] loginVM oUser)
        {
            if (!ModelState.IsValid)
            {
                BadRequest(ErrorHelper.GetModelStateErrors(ModelState));
            }

            UserRepository.PutUser(oUser);
            Ok(ErrorHelper.Response(201, "Usuario actualizado correctamente"));
            return true;
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public ActionResult DeleteUser(int id)
        {
            if (!ModelState.IsValid)
            {
                BadRequest(ErrorHelper.GetModelStateErrors(ModelState));
            }

            UserRepository.DeleteUser(id);
            return Ok(ErrorHelper.Response(200,"El registro se eleminó correctamente"));
        }
    }
}
