// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
// window.location.hash=""

export default hash;

// http://localhost:3000/#access_token=BQAL2XHD3sdmogp-AsCO4y_vUxO5o6Cbo
// &token_type=Bearer
//  &expires_in=3600