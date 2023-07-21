using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using WebApi.DB;
using WebApi.Helper;
using Dapper;
using WebApi.Model;
using System.Linq;
using System.Configuration;
using System.Data;

namespace WebApi.Repository
{
    public class CompanyRepository
    {
        //Get
        public static IEnumerable<Company> GetCompany()
        {
            using (SqlConnection db = new SqlConnection(ConnectionDB.routeConnection))
            {
                try
                {
                    string sQuery = "sp_Company";
                    db.Open();
                    return db.Query<Company>(sQuery,commandType: CommandType.StoredProcedure).ToList();
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

        //Get {id}
        public static Company GetCompanyId(int id)
        {
            using (SqlConnection db = new SqlConnection(ConnectionDB.routeConnection))
            {
                try
                {
                    string sQuery = @"sp_viewCompany @id";
                    db.Open();
                    return db.Query<Company>(sQuery, new { id = id }).FirstOrDefault();
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

        //Post
        public static bool PostCompany(Company oCompany)
        {
            using (SqlConnection db = new SqlConnection(ConnectionDB.routeConnection))
            {
                try
                {
                    string sQuery = @"sp_insertCompany";
                    db.Open();
                    db.Execute(sQuery, 
                        new
                        {
                            name = oCompany.Name,
                            city = oCompany.City,
                            region = oCompany.Region,
                            country = oCompany.Country
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

        //Update {id}
        public static bool UpdateCompany(Company oCompany)
        {
            using (SqlConnection db = new SqlConnection(ConnectionDB.routeConnection))
            {
                try
                {
                    string sQuery = "sp_updateCompany";
                    db.Open();
                    db.Query<Company>(sQuery,
                        new
                        {
                            id = oCompany.Id,
                            name = oCompany.Name,
                            city = oCompany.City,
                            region = oCompany.Region,
                            country = oCompany.Country
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

        //Delete {id}
        public static bool DeleteCompany(int id)
        {
            using (SqlConnection db = new SqlConnection(ConnectionDB.routeConnection))
            {
                try
                {
                    string sQuery = "sp_deleteCompany";
                    db.Open();
                    db.Execute(sQuery, new { id = id },commandType: CommandType.StoredProcedure);
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
