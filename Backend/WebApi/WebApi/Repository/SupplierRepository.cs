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

namespace WebApi.Repository
{
    public class SupplierRepository
    {
        //Get
        public static IEnumerable<Supplier> GetSupplier()
        {
            using(SqlConnection db = new SqlConnection(ConnectionDB.routeConnection))
            {
                try
                {
                    string sQuery = "SELECT * FROM dbo.Supplier";
                    db.Open();
                    return db.Query<Supplier>(sQuery).ToList();
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
        public static Supplier GetSupplierId(int id)
        {
            using (SqlConnection db = new SqlConnection(ConnectionDB.routeConnection))
            {
                try
                {
                    string sQuery = @"SELECT * FROM dbo.Supplier WHERE id = @id";
                    db.Open();
                    return db.Query<Supplier>(sQuery, new { id = id }).FirstOrDefault();
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
        public static bool PostSupplier(Supplier oSupplier)
        {
            using (SqlConnection db = new SqlConnection(ConnectionDB.routeConnection))
            {
                try
                {
                    string sQuery = @"INSERT INTO dbo.Supplier VALUES(@name,@lastname,@date,@phone)";
                    db.Open();
                    db.Execute(sQuery,oSupplier);
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

        public static bool UpdateSupplier(Supplier oSupplier)
        {
            using (SqlConnection db = new SqlConnection(ConnectionDB.routeConnection))
            {
                try
                {
                    string sQuery = @"UPDATE dbo.Supplier SET name=@name, lastname=@lastname, date=@date WHERE id =@id";
                    db.Open();
                    db.Query<Supplier>(sQuery,
                        new
                        {
                            id = oSupplier.Id,
                            name = oSupplier.Name,
                            lastname = oSupplier.Lastname,
                            date = oSupplier.Date,
                            phone = oSupplier.Phone
                        });
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

        public static bool DeleteSupplier(int id)
        {
            using (SqlConnection db = new SqlConnection(ConnectionDB.routeConnection))
            {
                try
                {
                    string sQuery = @"DELETE FROM dbo.Supplier WHERE id=@id";
                    db.Open();
                    db.Execute(sQuery, new { id = id });
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
