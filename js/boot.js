
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// fill querystring values
window.platform = getParameterByName('platform')
window.querySid = getParameterByName('sid')

// FastClick configuration
FastClick.attach(document.body);

// Tooltips configuration
$(document).tooltip({ selector: '[data-toggle=tooltip]' });

// Download app with version & boot
$.ajax({
    type: "GET",
    url: '/js/app.js?v=' + window.ClientVersion,
    dataType: "script",
    cache: true,
    success: function () {
        System.import('boot').catch(console.error.bind(console))
    }
});

// Update loader for mobile devices
document.addEventListener('PlatformReady', function () {
    Mt.App.fireEvent('Loading', {
        visible: false,
        title: 'Starting...'
    });
});



(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//(function (d, s, id) {
//    var js, fjs = d.getElementsByTagName(s)[0];
//    if (d.getElementById(id)) return;
//    js = d.createElement(s); js.id = id;
//    js.src = "//connect.facebook.net/en_UK/sdk/xfbml.ad.js#xfbml=1&version=v2.5&appId=1145415865488073";
//    fjs.parentNode.insertBefore(js, fjs);
//}(document, 'script', 'facebook-jssdk-ad'));
