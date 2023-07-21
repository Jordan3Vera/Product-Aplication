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
    public class ProductController : ControllerBase
    {
        // GET: api/<ProductController>
        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return ProductRepository.GetProduct();
        }

        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public Product Get(int id)
        {
            var product = ProductRepository.GetProductId(id);
            if(product == null)
            {
                BadRequest(ErrorHelper.Response(404, "Registro no encontrado"));
            }
            return product;
        }

        // POST api/<ProductController>
        [HttpPost]
        public bool Post([FromBody] Product oProduct)
        {
            if (!ModelState.IsValid)
            {
                BadRequest(ErrorHelper.GetModelStateErrors(ModelState));
            }

            ProductRepository.PostProduct(oProduct);
            return true;
        }

        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        public bool Put([FromBody] Product oProduct)
        {
            if (!ModelState.IsValid)
            {
                BadRequest(ErrorHelper.GetModelStateErrors(ModelState));
            }

            if(oProduct == null)
            {
                BadRequest(ErrorHelper.Response(404,"Registro no encontrado"));
            }

            ProductRepository.UpdateProduct(oProduct);
            return true;
        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                BadRequest(ErrorHelper.GetModelStateErrors(ModelState));
            }

            ProductRepository.DeleteProduct(id);
            return Ok(ErrorHelper.Response(200, "El registro se eliminó correctamente"));
        }
    }
}
