using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using WebApi.DB;
using Dapper;
using WebApi.Model;
using System.Linq;
using System.Data;

namespace WebApi.Repository
{
    public class StoreRepository
    {
        //Get Store
        public static List<Store> GetStore()
        {
            using(SqlConnection db = new SqlConnection(ConnectionDB.routeConnection))
            {
                try
                {
                    string sQuery = @"SELECT * FROM dbo.Store as s 
                                      INNER JOIN dbo.Product as p ON s.id_product = p.id
                                      INNER JOIN dbo.Supplier as sp ON p.id_supplier = sp.id
                                      INNER JOIN dbo.Company as c ON p.id_company = c.id";

                    //string sQuery = "sp_lsStores";
                    db.Open();
                    var stores = db.Query<Store, Product, Supplier, Company, Store>(sQuery,
                        (store, product, supplier, company) =>
                        {
                            store.Products = product;
                            store.Products.Suppliers = supplier;
                            store.Products.Companys = company;

                            return store;
                        }).ToList();
                    return stores;
                }
                catch(Exception ex)
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
        public static Store GetStoreId(int id)
        {
            using(SqlConnection db = new SqlConnection(ConnectionDB.routeConnection))
            {
                try
                {
                    string sQuery = $@"SELECT * FROM dbo.Store as s 
                                      INNER JOIN dbo.Product as p ON s.id_product = p.id
                                      INNER JOIN dbo.Supplier as sp ON p.id_supplier = sp.id
                                      INNER JOIN dbo.Company as c ON p.id_company = c.id
                                      WHERE s.id = {id}";
                    db.Open();
                    var store = db.Query<Store, Product, Supplier, Company, Store>(sQuery,
                       (store, product, supplier, company) =>
                       {
                           //store.Id = id;
                           store.Products = product;
                           store.Products.Suppliers = supplier;
                           store.Products.Companys = company;

                           return store;
                       }).FirstOrDefault();
                    return store;

                }
                catch(Exception ex)
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
        public static bool PostStore(Store oStore)
        {
            using (SqlConnection db = new SqlConnection(ConnectionDB.routeConnection))
            {
                try
                {
                    string sQuery = "sp_insertStore";
                    db.Open();
                    db.Execute(sQuery,
                        new
                        {
                            name = oStore.Name,
                            id_product = oStore.Products.Id

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

        //Put
        public static bool PutStore(Store oStore)
        {
            using(SqlConnection db = new SqlConnection(ConnectionDB.routeConnection))
            {
                try
                {
                    string sQuery = "sp_updateStore";
                    db.Open();
                    db.Query<Store>(sQuery,
                        new
                        {
                            id = oStore.Id,
                            name = oStore.Name,
                            id_product = oStore.Products.Id
                        }, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch(Exception ex)
                {
                    throw new Exception(ex.Message);
                }
                finally
                {
                    db.Close();
                }
            }
        }

        //Delete
        public static bool DeleteStore(int id)
        {
            using(SqlConnection db = new SqlConnection(ConnectionDB.routeConnection))
            {
                try
                {
                    string sQuery = "sp_deleteStore";
                    db.Open();
                    db.Query<Store>(sQuery, new { id = id }, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch(Exception ex)
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
