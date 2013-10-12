
/*** PAGE TRANSITIONS ***/

function visit_something() { jQuery.mobile.changePage('something.html', { transition: 'slide' }); }

/*** PAGE LOAD EVENTS ***/

// sample from detox

$(document).delegate('#sandwich-list', 'pageshow', load_sandwich_list);

function load_sandwich_list() { /*remote_retrieve_sandwiches();*/ fake_retrieve_sandwiches(); }

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
            populate_sandwich_list(obj);
        },
        error: function(err,status,statusTxt) {
            alert('An error occurred retrieving sandwiches: ' + statusTxt);
        }
    });                    
}

function fake_retrieve_sandwiches() {
    populate_sandwich_list(FAKE_SANDWICHES);
}

/**
 * sandwiches: [ { name, price } ... ]
 **/
function populate_sandwich_list(sandwiches) {
    var ul = '';
    for (var i = 0; i < sandwiches.length; i++) {
        var sandwich = sandwiches[i];
        
        var li =
            '<li>' +
                '<a>' +
                    //'<img src="images/sandwich-generic.jpg" />' +
                    '<img src="icons/32x32/square.png" />' +
                    '<h3>' + sandwich.name + '</h3>' +
                    '<p>' + sandwich.price + '</p>' +
                '</a>' +
                '<a href="#" onclick="alert(\'Sandwich information not yet implemented.\');"></a>' +
            '</li>';
        ul += li;
    }

    /*    
    if (posts.length == 0) {
        $('#posts-list-ul').hide();
        $('#no-posts-div').show();
    } else {
        $('#no-posts-div').hide();
        $('#posts-list-ul').show();
    */

    $('#sandwich-list-ul').html(ul);
    $('#sandwich-list-ul').attr('data-split-icon', 'gear');
    
    alert('listview-incoming!');
    
    $('#sandwich-list-ul').listview();
    
    //}
}
