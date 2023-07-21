using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using WebApi.Helper;
using WebApi.Model;
using WebApi.Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        // GET: api/<StoreController>
        [HttpGet]
        public IEnumerable<Store> GetStore()
        {
            return StoreRepository.GetStore();
        }

        // GET api/<StoreController>/5
        [HttpGet("{id}")]
        public Store Get(int id)
        {
            var store = StoreRepository.GetStoreId(id);
            if(store == null)
            {
                BadRequest(ErrorHelper.Response(404, "Registro no encontrado"));
            }

            return store;
        }

        // POST api/<StoreController>
        [HttpPost]
        public bool Post([FromBody] Store oStore)
        {
            if (!ModelState.IsValid)
            {
                BadRequest(ErrorHelper.GetModelStateErrors(ModelState));
            }

            StoreRepository.PostStore(oStore);
            return true;
        }

        // PUT api/<StoreController>/5
        [HttpPut("{id}")]
        public bool Put([FromBody] Store oStore)
        {
            if (!ModelState.IsValid)
            {
                BadRequest(ErrorHelper.GetModelStateErrors(ModelState));
            }

            if (oStore == null)
            {
                NoContent();
            }

            StoreRepository.PutStore(oStore);

            return true;
        }

        // DELETE api/<StoreController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                BadRequest(ErrorHelper.GetModelStateErrors(ModelState));
            }

            StoreRepository.DeleteStore(id);
            return Ok(BadRequest(ErrorHelper.Response(201,"Registro eliminado correctamente")));
        }
    }
}
