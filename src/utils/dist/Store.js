"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.withStore = exports.Store = void 0;
var helpers_1 = require("./helpers");
var EventBus_1 = require("./EventBus");
var StoreEvents;
(function (StoreEvents) {
    StoreEvents["Updated"] = "updated";
})(StoreEvents || (StoreEvents = {}));
var Store = /** @class */ (function (_super) {
    __extends(Store, _super);
    function Store() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        return _this;
    }
    Store.prototype.set = function (keypath, data) {
        helpers_1.set(this.state, keypath, data);
        this.emit(StoreEvents.Updated, this.getState());
    };
    Store.prototype.getState = function () {
        return this.state;
    };
    return Store;
}(EventBus_1["default"]));
exports.Store = Store;
var store = new Store();
function withStore(mapStateToProps) {
    return function wrap(Component) {
        return /** @class */ (function (_super) {
            __extends(WithStore, _super);
            function WithStore(props) {
                var _this = this;
                var previousState = mapStateToProps(store.getState());
                _this = _super.call(this, "", __assign(__assign({}, props), mapStateToProps(store.getState()))) || this;
                store.on(StoreEvents.Updated, function () {
                    var stateProps = mapStateToProps(store.getState());
                    if (helpers_1.isEqual(stateProps, previousState)) {
                        return;
                    }
                    previousState = stateProps;
                    _this.setProps(__assign({}, stateProps));
                });
                return _this;
            }
            return WithStore;
        }(Component));
    };
}
exports.withStore = withStore;
exports["default"] = store;
