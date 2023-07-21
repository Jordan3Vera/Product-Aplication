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
    public class SupplierController : ControllerBase
    {
        // GET: api/<SupplierController>
        [HttpGet]
        public IEnumerable<Supplier> GetSupplier()
        {
            return SupplierRepository.GetSupplier();
        }

        // GET api/<SupplierController>/5
        [HttpGet("{id}")]
        public Supplier GetSupplierId(int id)
        {
            var supplier = SupplierRepository.GetSupplierId(id);
            if(supplier == null)
            {
                BadRequest(ErrorHelper.Response(404, "Registro no encontrado"));
            }
            return supplier;
        }

        // POST api/<SupplierController>
        [HttpPost]
        public bool Post([FromBody] Supplier oSupplier)
        {
            if (!ModelState.IsValid)
            {
                BadRequest(ErrorHelper.GetModelStateErrors(ModelState));
            }
            SupplierRepository.PostSupplier(oSupplier);
            return true;
            //return Ok(ErrorHelper.Response(200, "El proveedor fue registrado correctamente"));
            /*return CreatedAtAction("GetSupplier",
                new
                {
                    nombre = oSupplier.Name,
                    apellido = oSupplier.Lastname,
                    nacimiento = oSupplier.Age
                });*/
        }

        // PUT api/<SupplierController>/5
        [HttpPut("{id}")]
        public bool Put([FromBody] Supplier oSupplier)
        {
            if (!ModelState.IsValid)
            {
                BadRequest(ErrorHelper.GetModelStateErrors(ModelState));
            }
            SupplierRepository.UpdateSupplier(oSupplier);
            
            return true;
            
        }

        // DELETE api/<SupplierController>/5
        [HttpDelete("{id}")]
        public bool DeleteSupplier(int id)
        {
            if (!ModelState.IsValid)
            {
                BadRequest(ErrorHelper.GetModelStateErrors(ModelState));
            }
            SupplierRepository.DeleteSupplier(id);
            return true;
            //return Ok(ErrorHelper.Response(200, "El proveedor se eliminó correctamente"));
        }
    }
}
