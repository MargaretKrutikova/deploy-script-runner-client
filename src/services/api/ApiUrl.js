module.exports.GetApiUrl = function() {
  if (process.env.NODE_ENV === 'production') {
    return window.appGlobalConfiguration.apiUrl;
  }
  return "/";
}