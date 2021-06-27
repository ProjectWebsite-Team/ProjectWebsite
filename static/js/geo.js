function geoplugin_request() { return '157.33.54.75'; }
function geoplugin_status() { return '200'; }
function geoplugin_credit() { return 'Some of the returned data includes GeoLite data created by MaxMind, available from <a href=\'http://www.maxmind.com\'>http://www.maxmind.com</a>.'; }
function geoplugin_delay() { return '1ms'; }
function geoplugin_city() { return 'Pune'; }
function geoplugin_region() { return 'Maharashtra'; }
function geoplugin_regionCode() { return 'MH'; }
function geoplugin_regionName() { return 'Maharashtra'; }
function geoplugin_areaCode() { return ''; }
function geoplugin_dmaCode() { return ''; }
function geoplugin_countryCode() { return 'IN'; }
function geoplugin_countryName() { return 'India'; }
function geoplugin_inEU() { return 0; }
function geoplugin_euVATrate() { return; }
function geoplugin_continentCode() { return 'AS'; }
function geoplugin_latitude() { return '18.5196'; }
function geoplugin_longitude() { return '73.8554'; }
function geoplugin_locationAccuracyRadius() { return '200'; }
function geoplugin_timezone() { return 'Asia/Kolkata'; }
function geoplugin_currencyCode() { return 'INR'; }
function geoplugin_currencySymbol() { return '&#8377;'; }
function geoplugin_currencySymbol_UTF8() { return '₹'; }
function geoplugin_currencyConverter(amt, symbol) {
    if (!amt) { return false; }
    var converted = amt * 74.2205;
    if (converted < 0) { return false; }
    if (symbol === false) { return Math.round(converted * 100) / 100; }
    else { return '&#8377;' + (Math.round(converted * 100) / 100); }
    return false;
}