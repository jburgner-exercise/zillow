var stMessage = 'Either city and state or zip must be entered';

var stURL = '/api/GetSearchResults/';           //local URL for proxy to API

var setRequired = function (jQObj, isRequired) {
    if (jQObj instanceof jQuery) { //check that this is a jQuery object
        if (jQObj.attr('required') !== isRequired) {
            jQObj.attr('required', isRequired);    //set required
        }
    }
};

var success = function (data, textStatus, jqXHR) {
    $('#status').text('Search results retrieved:');
    $('#dataTarget').text(data);
};

var failure = function (jqXHR, textStatus, errorThrown) {
    $('#status').text('Error: ' + errorThrown);
    $('#dataTarget').text('');
};

var callAPI = function (URL, parameters) {

    $('#status').text('Requesting data...');    //set status prior to call
    $('#dataTarget').text('');

    $.get(stURL + parameters.id + '/' + parameters.address + '/' + parameters.citystatezip).done(success).fail(failure);
};

var submitForm = function () {

    var stCityStateZip = '';

    var city = $('#tbCity');
    var state = $('#tbState');
    var zip = $('#tbZip');

    //concatenate city, state zip
    if (city.val() !== '' && state.val() !== '') {
        stCityStateZip = city.val() + ', ' + state.val() + ' ';
    }
    if (zip.val() !== '') {
        stCityStateZip += zip.val() + ' ';
    }
    stCityStateZip = stCityStateZip.slice(0, -1);   //remove trailing space

    callAPI(stURL, { 'id': 'X1-ZWz1dyb53fdhjf_6jziz', 'address': jQuery('#tbAddress').val(), citystatezip: stCityStateZip });

};

jQuery('#btnGo').on('click', function () {

    var city = $('#tbCity');
    var state = $('#tbState');
    var zip = $('#tbZip');

    if (city.val() === '' && state.val() === '') {
        if (zip.val() === '') {         //all inputs are empty.  mark all as required.
            setRequired(city, true);
            setRequired(state, true);
            setRequired(zip, true);
        } else {                        //zip has some value.  mark city and state as not required.
            setRequired(city, false);
            setRequired(state, false);
            setRequired(zip, true);
        }
    } else {                            //city or state has some value
        if (zip[0].checkValidity()) {   //if zip is valid, ignore city and state and use zip
            setRequired(city, false);
            setRequired(state, false);
            setRequired(zip, true);
        } else {                        //zip is invalid, use city and state
            setRequired(city, true);
            setRequired(state, true);
            setRequired(zip, false);
        }
    }

    if ($('#frmAddress')[0].checkValidity()) {  
        submitForm();                                                                       //form is valid. submit it
    } else {
        $('<input type="submit" />').hide().appendTo($('#frmAddress')).click().remove();    //form is invalid. fake submit button to trigger HTML5 validation
    }
});