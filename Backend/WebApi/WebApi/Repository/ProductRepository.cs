using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using WebApi.DB;
using WebApi.Model;

namespace WebApi.Repository
{
    public class ProductRepository
    {
        //Get
        public static IEnumerable<Product> GetProduct()
        {
            using (SqlConnection db = new SqlConnection(ConnectionDB.routeConnection))
            {
                try
                {
                    string sQuery = "sp_lsProducts";

                    var products = db.Query<Product, Supplier, Company, Product>(sQuery,
                        (product, supplier, company) =>
                        {
                           product.Suppliers = supplier;
                           product.Companys = company;

                            return product;
                        }, commandType: CommandType.StoredProcedure).ToList();
                    return products;

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
        public static Product GetProductId(int id)
        {
            using (SqlConnection db = new SqlConnection(ConnectionDB.routeConnection))
            {
                try
                {
                    //string sQuery = $@"sp_IdProduct @id";
                    string sQuery = $@"select *
                                    from dbo.Product as p
                                    inner join dbo.Supplier as s on p.id_supplier = s.id
                                    inner join dbo.Company as c on p.id_company = c.id
                                    where p.id = {id}";
                    db.Open();
                    var product = db.Query<Product, Supplier, Company, Product>(sQuery,
                        (product, supplier, company) => 
                        {
                            product.Suppliers = supplier;
                            product.Companys = company;

                            return product;
                        }).FirstOrDefault();
                    return product;
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
        public static bool PostProduct(Product oProduct)
        {
            using (SqlConnection db = new SqlConnection(ConnectionDB.routeConnection))
            {
                try
                {
                    string sQuery = "sp_insertProduct";
                    db.Open();

                    db.Execute(sQuery,
                       new
                        {
                            name = oProduct.Name,
                            gamma = oProduct.Gamma,
                            description = oProduct.Description,
                            stock = oProduct.Stock,
                            price = oProduct.Price,
                            id_supplier = oProduct.Suppliers.Id,
                            id_company = oProduct.Companys.Id,
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

        //Update {id}
        public static bool UpdateProduct(Product oProduct)
        {
            using (SqlConnection db = new SqlConnection(ConnectionDB.routeConnection))
            {
                try
                {
                    string sQuery = "sp_updateProduct";
                    db.Open();

                    db.Query<Product>(sQuery,
                    new
                    {
                        id = oProduct.Id,
                        name = oProduct.Name,
                        gamma = oProduct.Gamma,
                        description = oProduct.Description,
                        stock = oProduct.Stock,
                        price = oProduct.Price,
                        id_supplier = oProduct.Suppliers.Id,
                        id_company = oProduct.Companys.Id,
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

        //Delete {id}
        public static bool DeleteProduct(int id)
        {
            using (SqlConnection db = new SqlConnection(ConnectionDB.routeConnection))
            {
                try
                {
                    string sQuery = "sp_deleteProduct";
                    db.Open();
                    db.Query<Product>(sQuery, new { id = id},commandType: CommandType.StoredProcedure);

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
