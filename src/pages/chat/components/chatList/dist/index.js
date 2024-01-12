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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var Block_1 = require("../../../../utils/Block");
var Chatlist_1 = require("./Chatlist");
var chatCard_1 = require("../../../../components/chat/chatCard");
var Store_1 = require("../../../../utils/Store");
require("./Chatlist.scss");
var ChatList = /** @class */ (function (_super) {
    __extends(ChatList, _super);
    function ChatList(tagname, props) {
        return _super.call(this, (tagname = "div"), props) || this;
    }
    ChatList.prototype.render = function () {
        var chatList = Store_1["default"].getState().chats;
        this.children.chatList = chatList.map(function (chat) {
            return new chatCard_1["default"]({
                avatar: chat.avatar,
                created_by: chat.created_by,
                id: chat.id,
                last_message: chat.last_message,
                title: chat.title,
                unread_count: chat.unread_count,
                events: {
                    click: function () {
                        Store_1["default"].set("selectedChat", chat.id);
                    }
                }
            });
        });
        return this.compile(Chatlist_1["default"], this.props, "list-container");
    };
    return ChatList;
}(Block_1["default"]));
exports["default"] = Store_1.withStore(function (state) { return ({
    chats: __spreadArrays((state.chats || [])),
    selectedChat: state.selectedChat
}); })(ChatList);
// test99@gmail.com
// Login: Test99
// Password: Test99Test99
