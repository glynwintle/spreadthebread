
/*** PAGE TRANSITIONS ***/

function visit_sandwich_detail(sandwich_index) {
//    CURRENT_SANDWICH_INDEX = sandwich_index;
//    jQuery.mobile.changePage('sandwich-detail.html', { transition: 'slide' });
}

/*** PAGE LOAD EVENTS ***/

$(document).delegate('#sandwich-list', 'pageshow', load_sandwich_list);
$(document).delegate('#accepted-orders', 'pageshow', display_current_sandwich_detail);
$(document).delegate('#map_page', 'pageshow', display_delivery_sandwich_detail);

function load_sandwich_list() { /*remote_retrieve_sandwiches();*/ fake_retrieve_sandwiches();populate_sandwich_list(SANDWICH_DATA); }
function display_current_sandwich_detail() { /*remote_retrieve_sandwiches();*/ fake_retrieve_sandwiches();populate_accepted_orders_detail(FAKE_ORDERS); }
function display_delivery_sandwich_detail() { /*remote_retrieve_sandwiches();*/ fake_retrieve_sandwiches();populate_delivery_address_detail(FAKE_ORDERS); }

/*** SHARED_DATA ***/

var SANDWICH_DATA;
var CURRENT_SANDWICH_INDEX;

/*** REMOTE API CALL METHODS ***/

var REMOTE_SERVER = "http://dans.server.com/";
var PATH_RETRIEVE_ALL_SANDWICHES = "stb/getAllSandwiches";

function remote_retrieve_sandwiches() {
    $.ajax({ type: "GET",
        contenttype: "application/json; charset=utf-8",
        data: "{null}",
        url: REMOTE_SERVER + PATH_RETRIEVE_ALL_SANDWICHES,
        dataType:"json",
        success: function(res) {
            var obj = JSON.parse(res);
            SANDWICH_DATA = obj;
            populate_sandwich_list(SANDWICH_DATA);
        },
        error: function(err,status,statusTxt) {
            alert('An error occurred retrieving sandwiches: ' + statusTxt);
        }
    });                    
}

//function fake_retrieve_sandwiches() {
//    SANDWICH_DATA = FAKE_SANDWICHES;
//    populate_sandwich_list(SANDWICH_DATA);
//}

function fake_retrieve_sandwiches() {
    SANDWICH_DATA = FAKE_ORDERS;
    
}

/*** UI DISPLAY METHODS ***/

/**
 * orders: [ { name, location} ... ]
 **/
function populate_sandwich_list(sandwiches) {
    var ul = '';
    for (var i = 0; i < sandwiches.length; i++) {
        var sandwich = sandwiches[i];
        
        var li =
            '<li>' +
                '<a onclick="visit_sandwich_detail(' + i + ')">' +
                    '<h3>' + sandwich.product + '</h3>' +
                    '<p>' + sandwich.location + '</p>' +
                '</a>' +
                '<a data-role="button" data-icon="delete" onclick="visit_sandwich_detail(' + i + ')">Reject</a>' +
            '</li>';
        ul += li;
    }

    $('#sandwich-list-ul').html(ul);
    $('#sandwich-list-ul').attr('data-split-icon', 'arrow-r');
    
    $('#sandwich-list-ul').listview('refresh');
}

function populate_accepted_orders_detail(sandwiches) {
    ul = '';
    for (var i = 0; i < sandwiches.length; i++) {
        var sandwich = sandwiches[i];
        
        var li =
            '<li>' +
                '<address>' +
                    sandwich.uid +' - '+ sandwich.product + '<br />' +
                    sandwich.name + '<br />' +
                    sandwich.location + '<br />' +
                    sandwich.postcode + '<br />' +
                '</address>' +
            '</li>';
        ul += li;
    }
    
    $('#accepted-orders-list').html(ul);
    $('#accepted-orders-list').listview('refresh');
}

function populate_delivery_address_detail(sandwiches) {
    if (sandwiches.length >0) {
        var sandwich = sandwiches[0];
	var firstAddress = sandwich.uid +' - '+ sandwich.product + '<br />' +
                    sandwich.name + '<br />' +
                    sandwich.location + '<br />' +
                    sandwich.postcode;
        $('#first-delivery-address').html(firstAddress);
    } else {
        orderDone();
    }
    ul = '';
    for (var i = 1; i < sandwiches.length; i++) {
        var sandwich = sandwiches[i];
        
        var li =
            '<li>' +
                sandwich.uid +' - '+ sandwich.product + '<br />' +
                    sandwich.name + '<br />' +
                    sandwich.location + '<br />' +
                    sandwich.postcode +
            '</li>';
        ul += li;
    }
//alert(ul);
    $('#upcomming-deliveries-list').html(ul);
    $('#upcomming-deliveries-list').listview('refresh');
    ul=null;
}

/*** UI HELPER METHODS ***/

function getQueryStringParams(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
    return null;
}

function orderDone() {
    if (SANDWICH_DATA.length <2) {
         SANDWICH_DATA={};
         FAKE_ORDERS={};
         $.mobile.changePage("#done")
    } else {
        SANDWICH_DATA.shift();
        populate_delivery_address_detail(SANDWICH_DATA);
        calculateRoute();
    }
}
