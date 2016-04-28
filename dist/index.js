(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './GoogleApiComponent', './components/Marker', '/Users/auser/Development/fullstack/GoogleMapComponent/node_modules/redbox-react/lib/index.js', '/Users/auser/Development/fullstack/GoogleMapComponent/node_modules/react-transform-catch-errors/lib/index.js', 'react', '/Users/auser/Development/fullstack/GoogleMapComponent/node_modules/react-transform-hmr/lib/index.js', 'react-dom', './lib/String', './lib/cancelablePromise'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./GoogleApiComponent'), require('./components/Marker'), require('/Users/auser/Development/fullstack/GoogleMapComponent/node_modules/redbox-react/lib/index.js'), require('/Users/auser/Development/fullstack/GoogleMapComponent/node_modules/react-transform-catch-errors/lib/index.js'), require('react'), require('/Users/auser/Development/fullstack/GoogleMapComponent/node_modules/react-transform-hmr/lib/index.js'), require('react-dom'), require('./lib/String'), require('./lib/cancelablePromise'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.GoogleApiComponent, global.Marker, global.index, global.index, global.react, global.index, global.reactDom, global.String, global.cancelablePromise);
    global.index = mod.exports;
  }
})(this, function (module, exports, _GoogleApiComponent, _Marker, _index, _index3, _react2, _index5, _reactDom, _String, _cancelablePromise) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Map = exports.Marker = exports.GoogleApiWrapper = undefined;
  Object.defineProperty(exports, 'GoogleApiWrapper', {
    enumerable: true,
    get: function () {
      return _GoogleApiComponent.wrapper;
    }
  });
  Object.defineProperty(exports, 'Marker', {
    enumerable: true,
    get: function () {
      return _Marker.Marker;
    }
  });

  var _index2 = _interopRequireDefault(_index);

  var _index4 = _interopRequireDefault(_index3);

  var _react3 = _interopRequireDefault(_react2);

  var _index6 = _interopRequireDefault(_index5);

  var _reactDom2 = _interopRequireDefault(_reactDom);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var _components = {
    Map: {
      displayName: 'Map'
    }
  };

  var _UsersAuserDevelopmentFullstackGoogleMapComponentNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
    filename: 'src/index.js',
    components: _components,
    locals: [module],
    imports: [_react3.default]
  });

  var _UsersAuserDevelopmentFullstackGoogleMapComponentNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
    filename: 'src/index.js',
    components: _components,
    locals: [],
    imports: [_react3.default, _index2.default]
  });

  function _wrapComponent(id) {
    return function (Component) {
      return _UsersAuserDevelopmentFullstackGoogleMapComponentNode_modulesReactTransformHmrLibIndexJs2(_UsersAuserDevelopmentFullstackGoogleMapComponentNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
    };
  }

  var mapStyles = {
    container: {
      position: 'absolute',
      width: '100%',
      height: '100%'
    },
    map: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0
    }
  };

  var evtNames = ['ready', 'click', 'dragend', 'recenter'];

  var Map = exports.Map = _wrapComponent('Map')(function (_React$Component) {
    _inherits(Map, _React$Component);

    function Map(props) {
      _classCallCheck(this, Map);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Map).call(this, props));

      _this.listeners = {};
      _this.state = {
        currentLocation: {
          lat: _this.props.initialCenter.lat,
          lng: _this.props.initialCenter.lng
        }
      };
      return _this;
    }

    _createClass(Map, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        if (this.props.centerAroundCurrentLocation) {
          if (navigator && navigator.geolocation) {
            this.geoPromise = (0, _cancelablePromise.makeCancelable)(new Promise(function (resolve, reject) {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            }));

            this.geoPromise.promise.then(function (pos) {
              var coords = pos.coords;
              _this2.setState({
                currentLocation: {
                  lat: coords.latitude,
                  lng: coords.longitude
                }
              });
            }).catch(function (e) {
              return e;
            });
          }
        }
        this.loadMap();
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
          this.loadMap();
        }
        if (this.props.visible !== prevProps.visible) {
          this.restyleMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
          this.recenterMap();
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var _this3 = this;

        var google = this.props.google;

        if (this.geoPromise) {
          this.geoPromise.cancel();
        }
        Object.keys(this.listeners).forEach(function (e) {
          google.maps.event.removeListener(_this3.listeners[e]);
        });
      }
    }, {
      key: 'loadMap',
      value: function loadMap() {
        var _this4 = this;

        if (this.props && this.props.google) {
          var google = this.props.google;

          var maps = google.maps;

          var mapRef = this.refs.map;
          var node = _reactDom2.default.findDOMNode(mapRef);
          var curr = this.state.currentLocation;
          var center = new maps.LatLng(curr.lat, curr.lng);

          var mapConfig = Object.assign({}, {
            center: center,
            zoom: this.props.zoom
          });

          this.map = new maps.Map(node, mapConfig);

          evtNames.forEach(function (e) {
            _this4.listeners[e] = _this4.map.addListener(e, _this4.handleEvent(e));
          });
          maps.event.trigger(this.map, 'ready');
          this.forceUpdate();
        }
      }
    }, {
      key: 'handleEvent',
      value: function handleEvent(evtName) {
        var _this5 = this;

        var timeout = void 0;
        var handlerName = 'on' + (0, _String.camelize)(evtName);

        return function (e) {
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          timeout = setTimeout(function () {
            if (_this5.props[handlerName]) {
              _this5.props[handlerName](_this5.props, _this5.map, e);
            }
          }, 0);
        };
      }
    }, {
      key: 'recenterMap',
      value: function recenterMap() {
        var map = this.map;
        var curr = this.state.currentLocation;

        var google = this.props.google;

        var maps = google.maps;

        if (map) {
          var center = new maps.LatLng(curr.lat, curr.lng);
          // map.panTo(center)
          map.setCenter(center);
          maps.event.trigger(map, 'recenter');
        }
      }
    }, {
      key: 'restyleMap',
      value: function restyleMap() {
        if (this.map) {
          var google = this.props.google;

          google.maps.event.trigger(this.map, 'resize');
        }
      }
    }, {
      key: 'renderChildren',
      value: function renderChildren() {
        var _this6 = this;

        var children = this.props.children;


        if (!children) return;

        return _react3.default.Children.map(children, function (c) {
          return _react3.default.cloneElement(c, {
            map: _this6.map,
            google: _this6.props.google,
            mapCenter: _this6.state.currentLocation
          });
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var style = Object.assign({}, mapStyles.map, this.props.style, {
          display: this.props.visible ? 'inherit' : 'none'
        });

        return _react3.default.createElement(
          'div',
          { style: mapStyles.container, className: this.props.className },
          _react3.default.createElement(
            'div',
            { style: style, ref: 'map' },
            'Loading map...'
          ),
          this.renderChildren()
        );
      }
    }]);

    return Map;
  }(_react3.default.Component));

  ;

  Map.propTypes = {
    google: _react2.PropTypes.object,
    zoom: _react2.PropTypes.number,
    centerAroundCurrentLocation: _react2.PropTypes.bool,
    initialCenter: _react2.PropTypes.object,
    className: _react2.PropTypes.string,
    style: _react2.PropTypes.object,
    visible: _react2.PropTypes.bool
  };

  evtNames.forEach(function (e) {
    return Map.propTypes[(0, _String.camelize)(e)] = _react2.PropTypes.func;
  });

  Map.defaultProps = {
    zoom: 14,
    initialCenter: {
      lat: 37.774929,
      lng: -122.419416
    },
    centerAroundCurrentLocation: true,
    style: {},
    visible: true
  };

  exports.default = Map;
});