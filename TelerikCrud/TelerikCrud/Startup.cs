using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TelerikCrud.Startup))]
namespace TelerikCrud
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
