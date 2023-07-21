using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Helper;
using WebApi.Model;
using WebApi.Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        // GET: api/<CompanyController>
        [HttpGet]
        public IEnumerable<Company> GetSuppplier()
        {
            return CompanyRepository.GetCompany();
        }

        // GET api/<CompanyController>/5
        [HttpGet("{id}")]
        public Company GetCompanyId(int id)
        {
            var company = CompanyRepository.GetCompanyId(id);
            if(company == null)
            {
                BadRequest(ErrorHelper.Response(404, "Registro no encontrado"));
            }
            return company;

        }

        // POST api/<CompanyController>
        [HttpPost]
        public bool PostCompany([FromBody] Company oCompany)
        {
            if (!ModelState.IsValid)
            {
                BadRequest(ErrorHelper.GetModelStateErrors(ModelState));
            }
            CompanyRepository.PostCompany(oCompany);
            return true;
        }

        // PUT api/<CompanyController>/5
        [HttpPut("{id}")]
        public bool PutCompany([FromBody] Company oCompany)
        {
            if (!ModelState.IsValid)
            {
                BadRequest(ErrorHelper.GetModelStateErrors(ModelState));
            }
            CompanyRepository.UpdateCompany(oCompany);
            return true;
        }

        // DELETE api/<CompanyController>/5
        [HttpDelete("{id}")]
        public ActionResult DeleteSupplier(int id)
        {
            if (!ModelState.IsValid)
            {
                BadRequest(ErrorHelper.GetModelStateErrors(ModelState));
            }

            CompanyRepository.DeleteCompany(id);
            return Ok(ErrorHelper.Response(200, "El registro se elimnó correctamente"));
        }
    }
}
