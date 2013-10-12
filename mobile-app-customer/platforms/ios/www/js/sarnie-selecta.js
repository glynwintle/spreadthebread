
/*** PAGE TRANSITIONS ***/

function visit_sandwich_detail(sandwich_index) {
    CURRENT_SANDWICH_INDEX = sandwich_index;
    jQuery.mobile.changePage('sandwich-detail.html', { transition: 'slide' });
}

/*** PAGE LOAD EVENTS ***/

$(document).delegate('#sandwich-list', 'pageshow', load_sandwich_list);
$(document).delegate('#sandwich-detail', 'pageshow', display_current_sandwich_detail);

function load_sandwich_list() { /*remote_retrieve_sandwiches();*/ fake_retrieve_sandwiches(); }

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

function fake_retrieve_sandwiches() {
    SANDWICH_DATA = FAKE_SANDWICHES;
    populate_sandwich_list(SANDWICH_DATA);
}

/*** UI DISPLAY METHODS ***/

/**
 * sandwiches: [ { name, price, image } ... ]
 **/
function populate_sandwich_list(sandwiches) {
    var ul = '';
    for (var i = 0; i < sandwiches.length; i++) {
        var sandwich = sandwiches[i];
        
        var li =
            '<li>' +
                '<a onclick="visit_sandwich_detail(' + i + ')">' +
                    '<img src="' + sandwich.image + '" />' +
                    '<h3>' + sandwich.name + '</h3>' +
                    '<p>' + sandwich.price + '</p>' +
                '</a>' +
                '<a onclick="visit_sandwich_detail(' + i + ')"></a>' +
            '</li>';
        ul += li;
    }

    $('#sandwich-list-ul').html(ul);
    $('#sandwich-list-ul').attr('data-split-icon', 'arrow-r');
    
    $('#sandwich-list-ul').listview('refresh');
}

function display_current_sandwich_detail() {
    
    var sandwich = SANDWICH_DATA[CURRENT_SANDWICH_INDEX];
    //alert('sandwich index: ' + CURRENT_SANDWICH_INDEX);    
    
    $('#sandwich-name').html(sandwich.name);
    $('#sandwich-price').html(sandwich.price);
    $('#sandwich-description').html(sandwich.description);
    
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
