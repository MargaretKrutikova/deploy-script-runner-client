module.exports.GetApiUrl = function() {
  if (process.env.NODE_ENV === 'production') {
    return "https://localhost/deployservice/";
  }
  return "/";
}