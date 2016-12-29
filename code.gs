function getaAdminService() {
  // Create a new service with the given name. The name will be used when
  // persisting the authorized token, so ensure it is unique within the
  // scope of the property store.
  return OAuth2.createService('admin')

      // Set the endpoint URLs, which are the same for all Google services.
      .setAuthorizationBaseUrl('https://accounts.google.com/o/oauth2/auth')
      .setTokenUrl('https://accounts.google.com/o/oauth2/token')

      // Set the client ID and secret, from the Google Developers Console.
      .setClientId('709055758789-r730sciul3ufh5pmq8qpd3kthgupmi7g.apps.googleusercontent.com')
      .setClientSecret('gv196vTjVeGiP33jRNH0GG5R')

      // Set the name of the callback function in the script referenced
      // above that should be invoked to complete the OAuth flow.
      .setCallbackFunction('authCallback')

      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getUserProperties())

      // Set the scopes to request (space-separated for Google services).
      .setScope('https://www.googleapis.com/auth/admin.directory.device.chromeos.readonly')
}

function getAdminService() {
  // Create a new service with the given name. The name will be used when
  // persisting the authorized token, so ensure it is unique within the
  // scope of the property store.
  
  var jsonKey = JSON.parse(PropertiesService.getScriptProperties().getProperty("jsonKey"));  
  var privateKey = jsonKey.private_key;
  var serviceAccountEmail = jsonKey.client_email; 
  
  return OAuth2.createService('admin')

      // Set the endpoint URLs, which are the same for all Google services.
      .setTokenUrl('https://accounts.google.com/o/oauth2/token')

      // Set the client ID and secret, from the Google Developers Console.
      .setPrivateKey(privateKey)
      .setIssuer(serviceAccountEmail)

      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getUserProperties())

      // Set the scopes to request (space-separated for Google services).
      .setScope('https://www.googleapis.com/auth/admin.directory.device.chromeos.readonly')
}

function makeRequest() {
  var adminService = getAdminService();

  if (adminService.hasAccess()) {
    var response = UrlFetchApp.fetch('https://www.googleapis.com/admin/directory/v1/customer/somerset.lib.nj.us/devices/chromeos?maxResults=10&projections=FULL');
    var json = response.getContentText();
    var devices = JSON.parse(json);
    Logger.log(JSON.stringify(devices, null, 2));  
  } 
  else {
    Logger.log(adminService.getLastError());
  }
 
}
