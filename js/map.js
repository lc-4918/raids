//Leaflet configuration javascript file
//Luc Clément	

//	Elevation statistics global variables
var dplus;
var dmoins;

//	LatLng to center the map
var saintCouat = [42.996200, 2.107704];
//	LEAFLET Map Object
var map = L.map('map', {zoomControl: true, maxZoom: 20}).setView(saintCouat, 6);

//	0.	MapBox Topo
var mpO = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZHVuY2FuZ3JhaGFtIiwiYSI6IlJJcWdFczQifQ.9HUpTV1es8IjaGAf_s64VQ', {
    maxZoom: 21
});

//	1.	MapBox Outdoors (Topo)
var mapBox = L.tileLayer('https://{s}.tiles.mapbox.com/v4/matt.f714d988/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZHVuY2FuZ3JhaGFtIiwiYSI6IlJJcWdFczQifQ.9HUpTV1es8IjaGAf_s64VQ', {
    maxZoom: 21
}).addTo(map);


//	4.	Google Street
var googleLayer = L.tileLayer('http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});


//	ELEVATION CONTROL CUSTOMIZATION
//	same options in js/elevation/Leaflet.Elevation-0.0.2.min.js
//	all used options are the default values
var el = L.control.elevation({
    position: 'bottomright',
    theme: 'steelblue-theme', //default: lime-theme
    width: 600,
    height: 130,
    margins: {
        top: 40,
        right: 30,
        bottom: 5,
        left: 50
    },
    useHeightIndicator: true, //if false a marker is drawn at map position
    interpolation: 'linear', //see https://github.com/mbostock/d3/wiki/SVG-Shapes#wiki-area_interpolate
    hoverNumber: {
        decimalsX: 2, //decimals on distance (always in km)
        decimalsY: 0, //deciamls on hehttps://www.npmjs.com/package/leaflet.coordinatesight (always in m)
        formatter: undefined //custom formatter function may be injected
    },
    xTicks: undefined, //number of ticks in x axis, calculated by default according to width
    yTicks: undefined, //number of ticks on y axis, calculated by default according to height
    collapsed: false,  //collapsed mode, show chart on click or mouseover
    imperial: false    //display imperial units instead of metric

});

//	Add elevation-profile to map
el.addTo(map);

var elDiv = $('.leaflet-control.elevation');

//	Toggle elevation profile function
function toggleEl() {
    if (elDiv.not('visible')) {
        elDiv.fadeIn('fast');
    }
}

//	Add data to elevation profile control
function addData(e) {
    var el = L.control.elevation();
    el.addData(e);
    map.addControl(el);
}

//	Load Close Button Elevation Profile
$('<span class="elClose" id="elClose"><i class="fa fa-window-close" aria-hidden="true"></i></span>').appendTo(elDiv);


//	Close button action with Jquery
$('#elClose').click(function () {
    elDiv.fadeOut('fast');
    $(this).blur();
});

var tabCouleurs = ['#ff3135', '#009b2e', '#ce06cb', '#3399ff', '#2d867c', '#9c3030'];

function fin(feature) {
    return {
        color: tabCouleurs[feature.properties.id - 1],
        weight: 3,
        opacity: 1
    };
}

function onEachFeature(feature, layer) {
    layer.on('click', function (e) {
        $('.area').css('fill', tabCouleurs[feature.properties.id - 1]);
        map.fitBounds(layer.getBounds());
        toggleEl();
        el.clear();
        el.addData(feature)
        $('<span id="titre">' + feature.properties.name + '</span>').appendTo(elDiv);
        // $('<span class="dl-link">'+feature.properties.desc+'</span>').appendTo('.leaflet-control.elevation');


    });
}

// CYCLO
var merid = L.geoJson(panamrejson, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var lyonAix = L.geoJson(viarhonajson, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var loirevelo = L.geoJson(loirevelojson, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var strasLyon = L.geoJson(strasLyonjson, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var lyonBdx = L.geoJson(lyonbdxjson, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var bdxArg = L.geoJson(bdxargjson, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

// VTT
var morvan = L.geoJson(gtmorvjson, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var sistGap = L.geoJson(sisgapjson, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var gtpyr = L.geoJson(gtpyrjson, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var pwade = L.geoJson(poweradejson, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var bcnCdz = L.geoJson(bcnCdzjson, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var transib = L.geoJson(transibjson, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var gijSan = L.geoJson(camnortejson, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var sanlis = L.geoJson(camporjson, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var lisMad = L.geoJson(lismadjson, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var madVal = L.geoJson(madvaljson, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var rutaCid = L.geoJson(rutacidjson, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var burvit = L.geoJson(burvitjson, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var vitpuen = L.geoJson(vitpuenjson, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var viatol = L.geoJson(viatoljson, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

// FAIT
var nantHend = L.geoJson(json_NantesHendaye, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var aixCan = L.geoJson(json_AixCannes, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var bdxMois = L.geoJson(json_BordeauxMoissac, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var cheminNav = L.geoJson(chemnavjson, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var gtmc = L.geoJson(json_GTMC, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var hendSseb = L.geoJson(json_HendayeSSebastian, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var liVelod = L.geoJson(json_LiaisonVelodyssee, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var gtmn = L.geoJson(json_TraverseeMontagneNoire, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var vtd = L.geoJson(json_VelorouteTarnDordogne1, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var tmde = L.geoJson(json_ToulouseMirandadeEbro2, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);

var revelAix = L.geoJson(json_RevelAixenProvence4, {
    onEachFeature: onEachFeature,
    style: fin
}).addTo(map);


// LAYER GROUPS
var overLayers = [
    {
        group: 'Cyclo',
        collapsed: true,
        layers: [
            {
                active: true,
                name: 'Méridienne Verte',
                layer: merid
            },
            {
                active: true,
                name: 'Lyon - Aix',
                layer: lyonAix
            },
            {
                active: true,
                name: 'Nantes - Strasbourg',
                layer: loirevelo
            },
            {
                active: true,
                name: 'Strasbourg - Lyon',
                layer: strasLyon
            },
            {
                active: true,
                name: 'Lyon - Bordeaux',
                layer: lyonBdx
            },
            {
                active: true,
                name: 'Bordeaux - Argelès',
                layer: bdxArg
            }
        ]
    },
    {
        group: 'VTT',
        collapsed: true,
        layers: [
            {
                active: true,
                name: 'GT Pyrenées',
                layer: gtpyr
            },
            {
                active: true,
                name: 'San Sebastian - Barcelone',
                layer: pwade
            },
            {
                active: true,
                name: 'GT Morvan',
                layer: morvan
            },
            {
                active: true,
                name: 'Sisteron - Gap',
                layer: sistGap
            },
            {
                active: true,
                name: 'Barcelone - Cadiz',
                layer: bcnCdz
            },
            {
                active: true,
                name: 'Cadiz - Gijon',
                layer: transib
            },
            {
                active: true,
                name: 'Gijon - Santiago',
                layer: gijSan
            },
            {
                active: true,
                name: 'Santiago - Lisbonne',
                layer: sanlis
            },
            {
                active: true,
                name: 'Lisbonne - Madrid',
                layer: lisMad
            },
            {
                active: true,
                name: 'Madrid - Valence',
                layer: madVal
            },
            {
                active: true,
                name: 'Valence - Burgos',
                layer: rutaCid
            },
            {
                active: true,
                name: 'Burgos - Vitoria',
                layer: burvit
            }
        ]
    },
    {
        group: 'Déjà Fait',
        collapsed: true,
        layers: [
            {
                active: true,
                name: 'Nantes - Hendaye',
                layer: nantHend
            },
            {
                active: true,
                name: 'Aix - Cannes',
                layer: aixCan
            },
            {
                active: true,
                name: 'Bordeaux - Moissac',
                layer: bdxMois
            },
            {
                active: true,
                name: 'St Jean PdP - Santiago',
                layer: cheminNav
            },
            {
                active: true,
                name: 'Gt Massif Central',
                layer: gtmc
            }
        ]
    }
];
var baseLayers = [
    {
        name: 'Mapbox Outdoors',
        layer: mapBox
    },
    {
        name: 'Street',
        layer: googleLayer
    }

];

//		Panel Layers
var panelLayers = new L.Control.PanelLayers(baseLayers, overLayers, {
    compact: true,
    collapsed: true,
    collapsibleGroups: true
});
map.addControl(panelLayers);

//	Add Scale control to map
L.control.scale({imperial: false}).addTo(map);

//  On load
map.doubleClickZoom.disable();
//	On click
map.on('click', function (e) {
    elDiv.fadeOut('fast');
});

elDiv.hide();


$('.leaflet-panel-layers-grouplabel:contains("Cyclo")').append('<input type="button" class="laySelect" id="cycSelect" value="Aucun" />');
$('.leaflet-panel-layers-grouplabel:contains("VTT")').append('<input type="button" class="laySelect" id="mtbSelect" value="Aucun" />');
$('.leaflet-panel-layers-grouplabel:contains("Fait")').append('<input type="button" class="laySelect" id="oldSelect" value="Aucun" />');

$('.leaflet-panel-layers-group:contains("Cyclo")').find('input[type=checkbox]').addClass('cyclo-element');
$('.leaflet-panel-layers-group:contains("VTT")').find('input[type=checkbox]').addClass('mtb-element');
$('.leaflet-panel-layers-group:contains("Fait")').find('input[type=checkbox]').addClass('fait-element');



$(document).ready(function () {

    var cycloSelector = $('#cycSelect');
    var cycloItems = $('.cyclo-element');

    var mtbSelector = $('#mtbSelect');
    var mtbItems = $('.mtb-element');

    var oldSelector = $('#oldSelect');
    var oldItems = $('.fait-element');

    cycloSelector.click(function () {
        if (cycloSelector.val() === 'Tous') {
            cycloItems.prop('checked', true);

            console.clear();
            cycloItems.each(function () {
                var text = $(this).next('span').text() + ' affiché';
                console.log(text);
            });

            loirevelo.addTo(map);
            bdxArg.addTo(map);
            lyonBdx.addTo(map);
            strasLyon.addTo(map);
            lyonAix.addTo(map);
            merid.addTo(map);

            cycloSelector.val('Aucun');
        } else if (cycloSelector.val() === 'Aucun') {
            cycloItems.prop('checked', false);
            console.clear();
            cycloItems.each(function () {
                var text = $(this).next('span').text() + ' masqué';
                console.log(text);
            });
            map.removeLayer(loirevelo);
            map.removeLayer(bdxArg);
            map.removeLayer(lyonBdx);
            map.removeLayer(strasLyon);
            map.removeLayer(lyonAix);
            map.removeLayer(merid);
            cycloSelector.val('Tous');
        }
    });
    mtbSelector.click(function () {
        if (mtbSelector.val() === 'Tous') {
            mtbItems.prop('checked', true);
            console.clear();
            mtbItems.each(function () {
                var text = $(this).next('span').text() + ' affiché';
                console.log(text);
            });
            morvan.addTo(map);
            sistGap.addTo(map);
            gtpyr.addTo(map);
            pwade.addTo(map);
            bcnCdz.addTo(map);
            transib.addTo(map);
            gijSan.addTo(map);
            sanlis.addTo(map);
            lisMad.addTo(map);
            madVal.addTo(map);
            rutaCid.addTo(map);
            burvit.addTo(map);
            vitpuen.addTo(map);
            viatol.addTo(map);

            mtbSelector.val('Aucun');
        } else if (mtbSelector.val() === 'Aucun') {
            mtbItems.prop('checked', false);
            console.clear();
            mtbItems.each(function () {
                var text = $(this).next('span').text() + ' masqué';
                console.log(text);
            });
            map.removeLayer(morvan);
            map.removeLayer(sistGap);
            map.removeLayer(gtpyr);
            map.removeLayer(pwade);
            map.removeLayer(bcnCdz);
            map.removeLayer(transib);
            map.removeLayer(gijSan);
            map.removeLayer(sanlis);
            map.removeLayer(lisMad);
            map.removeLayer(madVal);
            map.removeLayer(rutaCid);
            map.removeLayer(burvit);
            map.removeLayer(vitpuen);
            map.removeLayer(viatol);
            mtbSelector.val('Tous');
        }
    });
    oldSelector.click(function () {
        if (oldSelector.val() === 'Tous') {
            oldItems.prop('checked', true);
            console.clear();
            oldItems.each(function () {
                var text = $(this).next('span').text() + ' affiché';
                console.log(text);
            });
            nantHend.addTo(map);
            aixCan.addTo(map);
            bdxMois.addTo(map);
            cheminNav.addTo(map);
            gtmc.addTo(map);
            hendSseb.addTo(map);
            liVelod.addTo(map);
            gtmn.addTo(map);
            vtd.addTo(map);
            tmde.addTo(map);
            revelAix.addTo(map);
            oldSelector.val('Aucun');
        } else if (oldSelector.val() === 'Aucun') {
            oldItems.prop('checked', false);
            console.clear();
            oldItems.each(function () {
                var text = $(this).next('span').text() + ' masqué';
                console.log(text);
            });
            map.removeLayer(nantHend);
            map.removeLayer(aixCan);
            map.removeLayer(bdxMois);
            map.removeLayer(cheminNav);
            map.removeLayer(gtmc);
            map.removeLayer(hendSseb);
            map.removeLayer(liVelod);
            map.removeLayer(gtmn);
            map.removeLayer(vtd);
            map.removeLayer(tmde);
            map.removeLayer(revelAix);
            oldSelector.val('Tous');
        }
    });
});

			
		
		