using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TelerikCrud.Models;

namespace TelerikCrud.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetAllEmployees()
        {
            List<Employee> employees = new List<Employee>();
            using(MyDBEntities db = new MyDBEntities())
            {
                employees = db.Employees.ToList();
            }
            return Json(employees, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SaveEmployee(Employee emp)
        {
            using (MyDBEntities db = new MyDBEntities())
            {
                if (emp.Id == 0)
                {
                    db.Employees.Add(emp);
                }
                else
                {
                    db.Entry(emp).State = System.Data.Entity.EntityState.Modified;
                }
              
                db.SaveChanges();
            }
            return Json("Employee saved successfully", JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteEmployee(int id)
        {
            using (MyDBEntities db = new MyDBEntities())
            {
                var emp = db.Employees.Find(id);
                db.Employees.Remove(emp);
                db.SaveChanges();
            }
            return Json("Employee deleted successfully", JsonRequestBehavior.AllowGet);
        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}