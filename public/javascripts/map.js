var map;
jQuery(document).ready(function(){

    map = new GMaps({
        div: '#map',
        lat: 49.263368,
        lng: -123.251087,
    });
    map.addMarker({
        lat: 49.263368,
        lng: -123.251087,
        title: 'Address',      
        infoWindow: {
            content: '<h5 class="title">Beaty Biodiversity Research Centre</h5><p><span class="region">Address line goes here</span><br><span class="postal-code">Postcode</span><br><span class="country-name">Country</span></p>'
        }
        
    });

});