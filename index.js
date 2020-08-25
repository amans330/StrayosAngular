import 'ol/ol.css';
import {Map, View, Overlay} from 'ol';
import TileLayer from 'ol/layer/Tile';
import {Tile} from 'ol/layer';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import {DragRotateAndZoom} from 'ol/interaction';
import XYZ from 'ol/source/XYZ';

var app = angular.module('myApp', []);
var locationLonLat;
app.controller('myCtrl', function($scope, $http) {
  $http.get("http://devx.strayos.com/user_serve/john/data.json")
    .then(function(response) {
      $scope.profileData = response.data;
      $scope.address = response.data.address;
      var cood = $scope.address.coordinates;
      const locationLonLatOnMap = fromLonLat(cood.split(",").reverse());
      var interaction = new DragRotateAndZoom();

      var overlay = new Overlay({
        position: locationLonLatOnMap,
        element: document.getElementById('overlay'),
        dragging: true
      });

      const map = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
            }),
          }) ],
        view: new View({
          center: locationLonLatOnMap,
          zoom: 15
        }),
        interactions: [interaction],
        overlays: [overlay]
      });
    });
});

