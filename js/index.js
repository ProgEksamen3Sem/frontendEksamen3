import "https://unpkg.com/navigo";
import "https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.4.0/purify.min.js";
import { setActiveLink, renderHtml, loadHtml } from "./utils.js";


import { hotels } from "./hotels/hotels.js";



window.addEventListener("load", async () => {
  const templateHotels = await loadHtml("hotels.html");


  const router = new Navigo("/", { hash: true });
  window.router = router;

  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url);
        done();
      },
    })
    .on({
      "/": () => (document.getElementById("content").innerHTML =
        `<h2>Home</h2>
        <p style='margin-top:2em'>
          This is the content of the Home Route <br/>
          Observe that since this is so simple, all HTML is added in the on-handler for the route. 
          and not in a separate file.
        </p>`),

      "/hotels": () => {
        renderHtml(templateHotels, "content");
        // Additional initialization logic for hotels route, if needed
      },
    })
    .notFound(() => {
      renderHtml(templateNotFound, "content");
    })
    .resolve();
});

window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber +
    ' Column: ' + column + ' StackTrace: ' + errorObj);
};
