// Simple interactive behavior for the Elviana Luxe sample site
(function(){
// WhatsApp primary button opens chat with the first number
var btn = document.getElementById('whatsappPrimary');
btn && btn.addEventListener('click', function(){
// opens the first WhatsApp contact in a new tab
window.open('https://wa.me/2347063327418', '_blank');
});


// Lightweight image placeholder fallback: if an image fails to load, show a subtle placeholder
document.querySelectorAll('.card img').forEach(function(img){
img.addEventListener('error', function(){
img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%230a0a0a"/><text x="50%" y="50%" fill="%239a9a9a" font-family="Verdana" font-size="20" dominant-baseline="middle" text-anchor="middle">Image not available</text></svg>';
});
});


})();

// Show the custom alert when page loads
window.onload = function() {
  document.getElementById('overlay').style.display = 'flex';
}

// Close the alert
function closeAlert() {
  document.getElementById('overlay').style.display = 'none';
}
 