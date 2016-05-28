using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace ZillowExercise.Controllers
{
    public class GetSearchResultsController : ApiController
    {
        // GET api/getsearchresults
        /*public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }*/

        // GET api/getsearchresults/zws_id/address/citystatezip
        // Serves as local proxy to remote zillow web service to allow for same domain request on client side
        public async Task<String> Get(string id, string address, string citystatezip)
        {

            string stURL = "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=" + id + "&address=" + address + "&citystatezip=" + citystatezip; 

            HttpClient client = new HttpClient();

            HttpRequestMessage proxiedRequest = new HttpRequestMessage(HttpMethod.Get, stURL);

            var response = await client.SendAsync(proxiedRequest);

            return await response.Content.ReadAsStringAsync();
        }
    }
}
