/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\dist\server\ittf\demo\ttech\javascript\controls\treeview\step_1\index.js.ittf
    utc time: Thu, 17 Jan 2019 13:21:04 GMT
*/
'use strict';
if (typeof Array.isArray === 'undefined') {
    Array.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };
}
(function() {
    var wz = window.wz = {};
    var rclass = /[\n\t\r]/g;
    var rnotwhite = (/\S+/g);
    class wz_EventTarget {
        constructor() {
            this.handlers = {};
        }
        __is_Event(name) {
            return Array.isArray(this.events) == false || this.events.indexOf(name) > -1;
        }
        emit(name) {
            var args = [].slice.call(arguments, 1);
            // log 'wz_EventTarget.emit.args', arguments, args
            if (this.__is_Event(name)) {
                if (this.handlers[name] instanceof Array) {
                    var i, i_items=this.handlers[name], i_len=this.handlers[name].length, handle;
                    for (i=0; i<i_len; i++) {
                        handle = this.handlers[name][i];
                        // log 'handle.context', handle.context
                        handle.callback.apply(handle.context, args);
                    }
                }
            }
            else {
                throw new Error(name + ' event cannot be found on TreeView.');
            }
        }
        on(name, callback, scope) {
            // log 'EventTarget.on.name,scope', name, scope
            if (this.__is_Event(name)) {
                if (!this.handlers[name]) {
                    this.handlers[name] = [];
                }
                this.handlers[name].push({
                    callback: callback, 
                    context: scope
                });
            }
            else {
                throw new Error(name + ' is not supported by TreeView.');
            }
        }
        off(name, callback) {
            var index,
                found = false;
            if (this.handlers[name] instanceof Array) {
                this.handlers[name].forEach(function(handle, i) {
                    index = i;
                    if (handle.callback === callback && !found) {
                        found = true;
                    }
                });
                if (found) {
                    this.handlers[name].splice(index, 1);
                }
            }
        }
    }
    wz.EventTarget = wz_EventTarget;
    class wz_global  extends  wz.EventTarget {
        constructor() {
            super();
        }
    }
    wz.global = new wz_global();
    (function() {
        if (document.addEventListener) {
            window.addEvent = function(elem, type, handler, useCapture) {
                elem.addEventListener(type, handler, !(!(useCapture)));
                return handler;
            };
            window.removeEvent = function(elem, type, handler, useCapture) {
                elem.removeEventListener(type, handler, !(!(useCapture)));
                return true;
            };
        }
        else if (document.attachEvent) {
            window.addEvent = function(elem, type, handler) {
                type = ("on" + type);
                var boundedHandler = function() {
                    return handler.apply(elem, arguments);
                };
                elem.attachEvent(type, boundedHandler);
                return boundedHandler;
            };
            window.removeEvent = function(elem, type, handler) {
                type = ("on" + type);
                elem.detachEvent(type, handler);
                return true;
            };
        }
    })();
    wz.isString = function(test) {
        return test !== null && typeof(test) === 'string';
    };
    wz.isEmpty = function(test) {
        return wz.isString(test) == false || test.length == 0;
    };
    wz.isObject = function(test) {
        if (test === null || typeof(test) === 'undefined') {
            return false;
        }
        return {}.toString.call(test) === '[object Object]';
    };
    wz.isArray = function(test) {
        if (test === null || typeof(test) === 'undefined') {
            return false;
        }
        if (Array.isArray) {
            return Array.isArray(test);
        }
        return {}.toString.call(test) === '[object Array]';
    };
    wz.clone = function(obj) {
        if (wz.isArray(obj)) {
            var ret = [];
            var i, i_items=obj, i_len=obj.length, item;
            for (i=0; i<i_len; i++) {
                item = obj[i];
                var value = clone(item);
                if (value !== null) {
                    ret.push(value);
                }
            }
            return ret;
        }
        else if (wz.isObject(obj)) {
            var ret = {};
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    ret[prop] = clone(obj[prop]);
                }
            }
            return ret;
        }
        else {
            return obj;
        }
    };
    wz.replace = function(text, find, replace) {
        if (wz.isEmpty(text)) {
            return text;
        }
        return text.replace(new RegExp(wz.escapeRegExp(find), 'g'), replace);
    };
    wz.escapeRegExp = function(text) {
        if (wz.isEmpty(text)) {
            return text;
        }
        return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    };
    wz.element = function(element) {
        if (typeof element === 'string') {
            var e = document.querySelector(element);
            if (!e) {
                try {
                    e = document.querySelector("#" + element);
                } 
                catch (ex) {
                    return null;
                } 
            }
            return e;
        }
        else {
            return element;
        }
    };
    wz.hide = function(element) {
        var e = wz.element(element);
        e.style.display = 'none';
    };
    wz.show = function(element) {
        var e = wz.element(element);
        e.style.display = 'block';
    };
    wz.hasClass = function(element, selector) {
        var e = wz.element(element);
        if ((" " + e.className + " ").replace(rclass, " ").indexOf(" " + selector + " ") > -1) {
            return true;
        }
        return false;
    };
    wz.addClass = function(element, value) {
        var e = wz.element(element);
        var classes, cur, finalValue;
        if (value && typeof value === "string") {
            classes = ( value || "" ).match( rnotwhite ) || [];
            if (!e.className && classes.length === 1) {
                e.className = value;
            }
            else {
                cur = " " + e.className + " ";
                var i, i_items=classes, i_len=classes.length, clazz;
                for (i=0; i<i_len; i++) {
                    clazz = classes[i];
                    if (cur.indexOf( " " + clazz + " " ) < 0) {
                        cur += clazz + " ";
                    }
                }
                finalValue = cur.trim();
                if (e.className !== finalValue) {
                    e.className = finalValue;
                }
            }
        }
    };
    wz.removeClass = function(element, value) {
        var e = wz.element(element);
        var classes, cur, finalValue;
        if (value && typeof value === "string") {
            classes = ( value || "" ).match( rnotwhite ) || [];
            cur = e.className ? ( " " + e.className + " " ).replace( rclass, " " ) : "";
            var i, i_items=classes, i_len=classes.length, clazz;
            for (i=0; i<i_len; i++) {
                clazz = classes[i];
                while (cur.indexOf( " " + clazz + " " ) >= 0) {
                    cur = cur.replace( " " + clazz + " ", " " );
                }
            }
            finalValue = cur.trim();
            if (e.className !== finalValue) {
                e.className = finalValue;
            }
        }
    };
    wz.toggleClass = function(element, value) {
        if (wz.hasClass(element, value)) {
            wz.removeClass(element, value);
        }
        else {
            wz.addClass(element, value);
        }
    };
    wz.attribute = function(element, name, value) {
        var e = wz.element(element);
        if (typeof value === 'undefined') {
            return e.getAttribute(name);
        }
        else {
            e.setAttribute(name, value);
        }
    };
    wz.style = function(element, name, value) {
        var e = wz.element(element);
        if (typeof value === 'undefined') {
            return e.style[name];
        }
        else {
            e.style[name] = value;
        }
    };
    wz.text = function(element, value) {
        var e = wz.element(element);
        if (typeof value === 'undefined') {
            return e.textContent;
        }
        else if (e.textContent !== value) {
            e.textContent = value;
        }
    };
    wz.html = function(element, html) {
        var saveElementForLog = element;
        if (typeof element === "string") {
            element = wz.element(element);
        }
        if (!element) {
            console.log('element', saveElementForLog);
            throw new Error('In wz.html the element parameter must be an html element or the id of an html element. Received: ' + saveElementForLog);
        }
        if (typeof html === 'undefined') {
            return element.innerHTML;
        }
        else {
            element.innerHTML = html;
        }
    };
    wz.htmlEscaped = function(element, html) {
        wz.html(element, escapeHtml(html));
    };
    wz.replaceChildren = function(element, nodes) {
        var saveElementForLog = element;
        if (typeof element === "string") {
            element = wz.element(element);
        }
        if (!element) {
            console.log('element', saveElementForLog);
            throw new Error('In wz.replaceChildren the element parameter must be an html element or the id of an html element. Received: ' + saveElementForLog);
        }
        element.innerHTML = '';
        if (nodes.length) {
            var i, i_items=nodes, i_len=nodes.length, node;
            for (i=0; i<i_len; i++) {
                node = nodes[i];
                element.appendChild( node );
            }
        }
        else {
            element.appendChild( nodes );
        }
    };
    wz.value = function(element, value) {
        var saveElementForLog = element;
        if (typeof element === "string") {
            element = wz.element(element);
        }
        if (!element) {
            console.log('element', saveElementForLog);
            throw new Error('In wz.value the element parameter must be an html element or the id of an html element. Received: ' + saveElementForLog);
        }
        if (typeof value === 'undefined') {
            return element.value;
        }
        else if (element.value !== value) {
            element.value = value;
        }
    };
    wz.val = wz.value;
    wz.click = function(element, handler, useCapture) {
        window.addEvent(wz.element(element), 'click', handler, useCapture);
    };
    wz.unclick = function(element, handler, useCapture) {
        window.removeEvent(wz.element(element), 'click', handler, useCapture);
    };
    wz.blur = function(element, handler, useCapture) {
        window.addEvent(wz.element(element), 'blur', handler, useCapture);
    };
    wz.unblur = function(element, handler, useCapture) {
        window.removeEvent(wz.element(element), 'blur', handler, useCapture);
    };
    wz.change = function(element, handler, useCapture) {
        window.addEvent(wz.element(element), 'change', handler, useCapture);
    };
    wz.unchange = function(element, handler, useCapture) {
        window.removeEvent(wz.element(element), 'change', handler, useCapture);
    };
    wz.contextmenu = function(element, handler, useCapture) {
        window.addEvent(wz.element(element), 'contextmenu', handler, useCapture);
    };
    wz.uncontextmenu = function(element, handler, useCapture) {
        window.removeEvent(wz.element(element), 'contextmenu', handler, useCapture);
    };
    wz.keypress = function(element, handler, useCapture) {
        window.addEvent(wz.element(element), 'keypress', handler, useCapture);
    };
    wz.unkeypress = function(element, handler, useCapture) {
        window.removeEvent(wz.element(element), 'keypress', handler, useCapture);
    };
    wz.contentLoaded = function(fn) {
        // from Diego Perini https://raw.githubusercontent.com/dperini/ContentLoaded/master/src/contentloaded.js
        var done = false,
            top = true,
            doc = window.document,
            root = doc.documentElement,
            modern = doc.addEventListener,
            add = modern ? 'addEventListener' : 'attachEvent',
            rem = modern ? 'removeEventListener' : 'detachEvent',
            pre = modern ? '' : 'on',
            init = function(e) {
                if ((e.type == 'readystatechange') && (doc.readyState != 'complete')) {
                    return ;
                }
                (e.type == 'load' ? window : doc)[rem](pre + e.type, init, false);
                if (!(done) && (done = true)) {
                    fn.call(window, (e.type || e));
                }
            },
            poll = function() {
                try {
                    root.doScroll('left');
                } 
                catch (e) {
                    setTimeout(poll, 50);
                    return ;
                } 
                init('poll');
            };
        if (doc.readyState == 'complete') {
            fn.call(window, 'lazy');
        }
        else {
            if (!(modern) && root.doScroll) {
                try {
                    top = !(window.frameElement);
                } 
                catch (e) {
                } 
                if (top) {
                    poll();
                }
            }
            doc[add](pre + 'DOMContentLoaded', init, false);
            doc[add](pre + 'readystatechange', init, false);
            window[add](pre + 'load', init, false);
        }
    };
    wz.loaded = wz.contentLoaded;
    var entityMap = {
        '&': '&amp;', 
        '<': '&lt;', 
        '>': '&gt;', 
        '"': '&quot;', 
        "'": '&#39;', 
        '/': '&#x2F;', 
        '`': '&#x60;', 
        '=': '&#x3D;'
    };
    function escapeHtml(string) {
        return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
                return entityMap[s];
            });
    }
    wz.unescapeHtml = function(string) {
        return wz.replace(wz.replace(wz.replace(string, '&lt;', '<'), '&gt;', '>'), '&amp;', '&');
    };
})();
if (!window.wz) {
    window.wz = {};
}
wz.node = {};
wz.node.remove = function(node) {
    if (!node.parent) {
        throw new Error('Node must have a parent');
    }
    if (!node.parent.children) {
        throw new Error('Node parent must must have a children property');
    }
    var index = node.parent.children.indexOf(node);
    if (index < 0) {
        throw new Error('Node must be child of its parent property');
    }
    node.parent.children.splice(index, 1);
    return index;
};
wz.node.replace = function(node, newnode) {
    if (!node.parent) {
        throw new Error('Node must have a parent');
    }
    if (!node.parent.children) {
        throw new Error('Node parent must must have a children property');
    }
    var index = node.parent.children.indexOf(node);
    if (index < 0) {
        throw new Error('Node must be child of its parent property');
    }
    newnode.parent = node.parent;
    node.parent.children[index] = newnode();
};
var AceEditor_mimemap = {
    js: 'javascript'
};
var AceEditor_defaults = {
    key: 'ace', 
    editorElementId: 'aceEditor', 
    mode: 'text', 
    theme: 'monokai', 
    fontSize: '11pt'
};
class AceEditor {
    constructor(options) {
        /**
             params
             { options
             string editorElementId
             string mode
             string theme
             number width
             number height
        */
        this.options = Object.assign(AceEditor_defaults, options);
        this.elementId = this.options.editorElementId;
        this.key = this.options.key;
        this.editor = null;
        this.events = {};
    }
    getValue() {
        if (this.editor) {
            return this.editor.getValue();
        }
    }
    setValue(value) {
        if (!this.editor) {
            this.initialize();
        }
        this.editor.setValue(value, 1);
    }
    setMime(value) {
        this.setMode(AceEditor_mimemap[value] || value);
    }
    setMode(value) {
        if (this.editor) {
            this.editor.getSession().setMode("ace/mode/" + value);
        }
    }
    setTheme(value) {
        if (this.editor) {
            this.editor.setTheme("ace/theme/" + value);
        }
    }
    readOnly(value) {
        if (typeof value === 'undefined') {
            return this.editor.getReadOnly();
        }
        else {
            this.editor.setReadOnly(value);
        }
    }
    onChange(handler) {
        this.onChange = handler;
    }
    initialize() {
        if (this.editor) {
            return ;
        }
        console.log('AceEditor.initialize start on', this.options.editorElementId);
        if (typeof ace === 'undefined' || !ace.edit) {
            throw new Error('wz.ace initialize methods requires the `ace` component. Check that the ace script has been included.');
        }
        this.element = wz.element('#' + this.options.editorElementId);
        if (!this.element) {
            throw new Error('wz.ace initialize methods requires an existing `options.editorElementId` : ' + this.options.editorElementId + ' html element.');
        }
        wz.style(this.element, 'width', this.options.width);
        wz.style(this.element, 'height', this.options.height);
        this.editor = ace.edit(this.options.editorElementId);
        this.editor.setOptions({
            fontSize: this.options.fontSize
        });
        this.setMode(this.options.mode);
        this.setTheme(this.options.theme);
        var that = this;
        this.editor.getSession().on('change', function() {
            that.fire('change', [
                that.getValue()
            ]);
        });
        console.log('AceEditor.initialize end');
    }
    on(name, handler) {
        if (this.events.hasOwnProperty(name)) {
            this.events[name].push(handler);
        }
        else {
            this.events[name] =	[handler];
        }
    }
    off(name, handler) {
        if (!this.events.hasOwnProperty(name)) {
            return ;
        }
        var index = this.events[name].indexOf(handler);
        if (index != -1) {
            this.events[name].splice(index, 1);
        }
    }
    fire(name, args) {
        if (!this.events.hasOwnProperty(name)) {
            return ;
        }
        if (!args || !args.length) {
            args = [];
        }
        var i, i_items=this.events[name], i_len=this.events[name].length, ev;
        for (i=0; i<i_len; i++) {
            ev = this.events[name][i];
            ev.apply(null, args);
        }
    }
}
function wzNodeRemove(item) {
    if (!item.parent) {
        throw new Error('wzNodeRemove. Missing item.parent of:' + item.tag + ',' + item.id);
    }
    var nodes = item.parent.elements;
    item.parent.elements = [];
    var i, i_items=nodes, i_len=nodes.length, child;
    for (i=0; i<i_len; i++) {
        child = nodes[i];
        if (child !== item) {
            item.parent.elements.push(child);
        }
    }
}
function wzNodeReplace(item, newNode) {
    if (!item.parent) {
        throw new Error('wzNodeReplace. Missing item.parent of:' + item.tag + ',' + item.id);
    }
    var nodes = item.parent.elements;
    item.parent.elements = [];
    var i, i_items=nodes, i_len=nodes.length, child;
    for (i=0; i<i_len; i++) {
        child = nodes[i];
        if (child !== item) {
            item.parent.elements.push(child);
        }
        else {
            item.parent.elements.push(newNode);
        }
    }
}
class wzHtmlNode {
    constructor(tag, attrs, textContent) {
        if (typeof textContent !== 'undefined') {
            this.textContent = textContent;
        }
        else {
            this.tag = tag;
            this.id = tag;
            this.parent = null;
            this.attributes = {};
            this.elements = [];
            if (attrs) {
                for (var k in attrs) {
                    if (attrs.hasOwnProperty(k)) {
                        if (k === 'id') {
                            this.id = attrs[k];
                        }
                        if (k === '_text') {
                            this.text(attrs[k]);
                        }
                        else {
                            this.attributes[k] = attrs[k];
                        }
                    }
                }
            }
        }
    }
    add(tag, attrs) {
        if (tag.tag) {
            tag.parent = this;
            this.elements.push(tag);
            return tag;
        }
        else {
            var node = new wzHtmlNode(tag, attrs);
            node.parent = this;
            this.elements.push(node);
            return node;
        }
    }
    set(name, value) {
        this.attributes[name] = value;
        return this;
    }
    text(content) {
        var node = new wzHtmlNode(null, null, content);
        this.elements.push(node);
        return this;
    }
    textReplace(content) {
        var done = false;
        var i, i_items=this.elements, i_len=this.elements.length, item;
        for (i=0; i<i_len; i++) {
            item = this.elements[i];
            if (!done && typeof item.textContent !== 'undefined') {
                item.textContent = content;
                done = true;
            }
        }
        if (!done) {
            this.text(content);
        }
        return this;
    }
    get(elementId, attributeId) {
        if (this.id === elementId) {
            if (typeof attributeId !== 'undefined') {
                return this.attributes[attributeId];
            }
            else {
                return this;
            }
        }
        else {
            if (this.elements) {
                var found;
                var i, i_items=this.elements, i_len=this.elements.length, item;
                for (i=0; i<i_len; i++) {
                    item = this.elements[i];
                    found = item.get(elementId, attributeId);
                    if (found) {
                        return found;
                    }
                }
            }
            return null;
        }
    }
    wrap(tag, attrs) {
        var wrapper = new wzHtmlNode(tag, attrs);
        wzNodeReplace(this, wrapper);
        wrapper.add(this);
        return wrapper;
    }
    unwrap() {
        // unwrap means : replace the parent with this
        wzNodeReplace(this.parent, this);
    }
    remove() {
        // unwrap means : replace the parent with this
        wzNodeRemove(this);
    }
    toHtml(indent) {
        indent = indent || 0;
        if (typeof this.textContent !== 'undefined') {
            return this.textContent;
        }
        else {
            var ret = [ new Array(indent).join(' ') ];
            ret.push('<' + this.tag);
            var i, i_items=Object.keys(this.attributes), i_len=Object.keys(this.attributes).length, name;
            for (i=0; i<i_len; i++) {
                name = Object.keys(this.attributes)[i];
                if (i > 0) {
                    ret.push('\n' + new Array(indent+2).join(' '));
                }
                var value = this.attributes[name];
                if (typeof value === 'undefined') {
                    ret.push(' ' + name);
                }
                else {
                    ret.push(' ' + name + '="' + value + '"');
                }
            }
            ret.push('>');
            var i, i_items=this.elements, i_len=this.elements.length, node;
            for (i=0; i<i_len; i++) {
                node = this.elements[i];
                ret.push(node.toHtml(indent + 1));
            }
            ret.push('</' + this.tag + '>');
            ret.push('\n');
            return ret.join('');
        }
    }
}
class wzHtmlBuilder {
    constructor(options) {
        options = options || {};
        this.elementId = options.id;
        this.elements = [];
        this.current = null;
    }
    prettyResult(elementId) {
        this.prettyResultId = elementId;
    }
    add(tag, attrs) {
        var node;
        if (this.current) {
            node = this.current.add(tag, attrs);
        }
        else {
            node = new wzHtmlNode(tag, attrs);
            node.parent = this;
            this.elements.push(node);
        }
        this.current = node;
        this.update();
        return node;
    }
    addTop(tag, attrs) {
        this.current = null;
        return this.add(tag, attrs);
    }
    set(attributeName, attributeValue) {
        this.current.set(attributeName, attributeValue);
        this.update();
        return this;
    }
    text(content) {
        this.current.text(content);
        this.update();
        return this;
    }
    textReplace(content) {
        this.current.textReplace(content);
        this.update();
        return this;
    }
    toHtml() {
        var ret = [];
        var i, i_items=this.elements, i_len=this.elements.length, item;
        for (i=0; i<i_len; i++) {
            item = this.elements[i];
            ret.push(item.toHtml());
        }
        return ret.join('\n');
    }
    select(id) {
        var found;
        var i, i_items=this.elements, i_len=this.elements.length, item;
        for (i=0; i<i_len; i++) {
            item = this.elements[i];
            found = item.get(id);
            console.log('select.item', id, item.id, found);
            if (found) {
                break;
            }
        }
        console.log('select', id, found);
        if (!found) {
            return false;
        }
        this.current = found;
        return true;
    }
    wrap(id, wrapperTag, wrapperId) {
        var found = this.select(id);
        if (!found) {
            throw new Error("wzHtmlBuilder can't wrap id=" + id + ". Not found.");
        }
        this.current = this.current.wrap(wrapperTag, wrapperId);
        this.update();
    }
    unwrap(id) {
        // unwrap means : replace the parent of id with id
        var found = this.select(id);
        if (!found) {
            throw new Error("wzHtmlBuilder can't unwrap id=" + id + ". Not found.");
        }
        this.current = this.current.unwrap();
        this.update();
    }
    remove(id) {
        var found = this.select(id);
        if (!found) {
            return ;
        }
        this.current.remove();
    }
    update() {
        if (this.elementId) {
            wz.html(wz.element('#' + this.elementId), this.toHtml());
        }
        if (this.prettyResultId) {
            wz.htmlEscaped(wz.element('#' + this.prettyResultId), this.toHtml());
        }
    }
}
if (!window.wz) {
    window.wz = {};
}
class wz_ContextMenu {
    constructor(options) {
        options = options || {};
        this.menusContainerId = options.menusContainerId || 'wz-menus-container';
        this.onClose = () => {
        };
    }
    create(meta) {
        // log 'wz.ContextMenu.create'
        this.meta = meta;
        var menusContainer = wz.element('#' + this.menusContainerId);
        if (!menusContainer) {
            menusContainer = document.createElement('div');
            menusContainer.setAttribute('id', this.menusContainerId);
            document.body.appendChild(menusContainer);
        }
        this.menuDiv = document.createElement("div");
        this.menuDiv.setAttribute('id', meta.menu.id);
        this.menuDiv.setAttribute('class', 'wz-context-menu');
        var itemsDiv = this._createMenuItemsDiv(meta.menu);
        menusContainer.appendChild(this.menuDiv);
        this.menuDiv.appendChild(itemsDiv);
        this.menuDiv.onclick = (event) => {
            var command = event.target.dataset['command'];
            // log 'clickListener.target', event.target, command
            if (meta.onClick) {
                meta.onClick({
                    command: command, 
                    payload: this.payload, 
                    event: event
                });
            }
        };
        wz.click(document, () => {
            // log 'document.onclick', meta.menu.id
            this.handleClose();
        });
        wz.global.on('wz.contextMenu.clear', function(target) {
            // log 'wz.contextMenu.clear.target', target, meta.menu.id
            if (target !== meta.menu.id) {
                this.handleClose();
            }
        }, this);
    }
    replace(menuMeta) {
        // log 'wz.ContextMenu.replace'
        // _createMenuItemsDiv removes the previous div
        var itemsDiv = this._createMenuItemsDiv(menuMeta);
        this.menuDiv.appendChild(itemsDiv);
    }
    _createMenuItemsDiv(menuMeta) {
        var hb = new wzHtmlBuilder();
        var hUl = hb.add('ul', {});
        var i, i_items=menuMeta.items, i_len=menuMeta.items.length, item;
        for (i=0; i<i_len; i++) {
            item = menuMeta.items[i];
            var hLi = hUl.add('li', {});
            hLi.add('a', {
                href: '#', 
                ['data-command']: item.command || item.label, 
                _text: item.label
            });
        }
        if (this.menuItemsDiv) {
            this.menuItemsDiv.parentNode.removeChild(this.menuItemsDiv);
        }
        this.menuItemsDiv = document.createElement("div");
        wz.html(this.menuItemsDiv, hb.toHtml('\n'));
        return this.menuItemsDiv;
    }
    handleRightClick(evt, payload) {
        wz.global.emit('wz.contextMenu.clear', this.meta.menu.id);
        this.payload = payload;
        evt = (evt) ? evt : ((event) ? event : null);
        var posnX = (evt.pageX) ? evt.pageX : ((evt.offsetX) ? evt.offsetX + 10 : null);
        var posnY = (evt.pageY) ? evt.pageY : ((evt.offsetY) ? evt.offsetY + 10 : null);
        var menu = wz.element('#' + this.meta.menu.id);
        menu.style.left = posnX + 'px';
        menu.style.top = posnY + 'px';
        menu.style.display = 'block';
        if (typeof evt.preventDefault != "undefined") {
            evt.preventDefault();
        }
        else {
            evt.returnValue = false;
        }
    }
    handleClose() {
        wz.hide('#' + this.meta.menu.id);
        // log 'handleClose', this.onClose
        this.onClose();
    }
}
wz.ContextMenu = wz_ContextMenu;
(function() {
    if (!window.wz) {
        window.wz = {};
    }
    if (!wizziStandalone || !wizziStandalone.default) {
        throw new Error('Missing component: wizziStandalone.default');
    }
    console.log('standalone', wizziStandalone.default);
    wz.wf = wizziStandalone.default;
    wz.tools = wizziStandalone.default.wizziTools;
    wz.utils = wizziStandalone.default.wizziUtils;
    wz.git = wizziStandalone.default.wizziGit;
    wz.canGen = function(schemaName, callback) {
        return wz.wf.canGen(schemaName, callback);
    };
    /**
         param
         { options
         { modelContext
         optional
         { artifactContext
         optional
         string artifactName
         optional
    */
    wz.gen = function(filePath, options, callback) {
        if (typeof callback === 'undefined') {
            callback = options;
            options = {};
        }
        wz.wf.gen(filePath, options, function(err, artifactText) {
            if (err) {
                return callback(err);
            }
            // log 'wz.gen', artifactText
            return callback(null, artifactText);
        });
    };
    wz.genFromText = function(ittfContent, options, callback) {
        if (typeof callback === 'undefined') {
            callback = options;
            options = {};
        }
        wz.wf.genFromText(ittfContent, options, function(err, artifactText) {
            if (err) {
                return callback(err);
            }
            // log 'wz.gen', artifactText
            return callback(null, artifactText);
        });
    };
    wz.canWizzify = function(schemaName) {
        return wz.tools.canBeWizzified(schemaName);
    };
    wz.wizzify = function(schemaName, snippet, callback) {
        wz.tools.wizzify(schemaName, snippet, callback);
    };
    wz.getCodeAST = function(mime, snippet, callback) {
        wz.tools[mime + 'wizzifier'].getCodeAST(snippet, {}, callback);
    };
    wz.mtree = function(filePath, context, callback) {
        if (typeof callback === 'undefined') {
            callback = context;
            context = {};
        }
        wz.wf.mtree(filePath, {
            moduleContext: context
        }, callback);
    };
    wz.mtreeDebug = function(filePath, context, callback) {
        if (typeof callback === 'undefined') {
            callback = context;
            context = {};
        }
        wz.wf.mtreeDebug(filePath, {
            moduleContext: context
        }, callback);
    };
    /**
         param
         { options
         { productionOptions
         { globalContext
    */
    wz.wizziJob = function(filePath, options, callback) {
        if (typeof callback === 'undefined') {
            callback = options;
            options = {};
        }
        wz.wf.wizziJob(filePath, options, callback);
    };
    wz.fsGit = function(options, callback) {
        if (typeof callback === 'undefined') {
            callback = options;
            options = {};
        }
        console.log('wz.fsGit', options);
        wz.git.fsGit({
            storeName: options.storeName || wz.fs.storeName
        }, function(err, fsGit) {
            if (err) {
                return callback(err);
            }
            console.log('created fs', fsGit);
            return callback(null, fsGit);
        });
    };
    wz.fs = {
        kind: 'browserfs', 
        storeName: 'wizziRepo'
    };
    wz.fs.infoByPath = function(path, isFolder) {
        var basename = path.substr(path.lastIndexOf('/')+1);
        var dirname = path.substr(0, path.lastIndexOf('/'));
        // TODO isFolder must be set by wizzi-utils.vfile.getFolders(..)
        var ss = basename.split('.');
        if (ss[ss.length-1] === 'ittf') {
            return {
                    path: path, 
                    fullPath: path, 
                    name: basename, 
                    basename: basename, 
                    dirname: dirname, 
                    isFolder: isFolder, 
                    isIttfDocument: true, 
                    isFragment: path.indexOf('/t/') > -1, 
                    schema: ss[ss.length-2], 
                    isJob: ss[ss.length-2] === 'wfjob', 
                    isSchema: ss[ss.length-2] === 'wfschema', 
                    mime: isFolder ? '' : ss[ss.length-2]
                };
        }
        else {
            return {
                    path: path, 
                    fullPath: path, 
                    name: basename, 
                    basename: basename, 
                    dirname: dirname, 
                    isFolder: isFolder, 
                    mime: isFolder ? '' : ss[ss.length-1]
                };
        }
    };
    wz.fs.getFs = function(options, callback) {
        if (typeof callback === 'undefined') {
            callback = options;
            options = {};
        }
        // log 'wz.fs.getFs', options
        wz.utils.vfile({
            storeName: options.storeName || wz.fs.storeName
        }, function(err, fs) {
            if (err) {
                return callback(err);
            }
            // log 'created fs', fs
            return callback(null, fs);
        });
    };
    wz.fs.getFolders = function(folderPath, options, callback) {
        if (typeof callback === 'undefined') {
            callback = options;
            options = {};
        }
        wz.fs.getFs(function(err, fs) {
            if (err) {
                return callback(err);
            }
            fs.getFolders(folderPath, options, callback);
        });
    };
    wz.fs.getFiles = function(folderPath, options, callback) {
        if (typeof callback === 'undefined') {
            callback = options;
            options = {};
        }
        wz.fs.getFs(function(err, fs) {
            if (err) {
                return callback(err);
            }
            fs.getFiles(folderPath, options, callback);
        });
    };
    wz.fs.getTreeFolderView = function(folderPath, callback) {
        var ret = [];
        wz.fs.getFolders(folderPath, {
            deep: false
        }, function(err, folders) {
            if (err) {
                return callback(err);
            }
            var i, i_items=folders, i_len=folders.length, f;
            for (i=0; i<i_len; i++) {
                f = folders[i];
                ret.push(wz.fs.infoByPath(f.fullPath, true));
            }
            wz.fs.getFiles(folderPath, {
                documentContent: true, 
                deep: false
            }, function(err, files) {
                if (err) {
                    return callback(err);
                }
                var i, i_items=files, i_len=files.length, f;
                for (i=0; i<i_len; i++) {
                    f = files[i];
                    var temp = wz.fs.infoByPath(f.fullPath, false);
                    temp.content = f.content;
                    ret.push(temp);
                }
                return callback(null, ret);
            });
        });
    };
})();
/**
     params
     { props
     string key
     string elementId
     string theme
     string language
     boolean readOnly
*/
class EditorControl {
    constructor(props) {
        this.props = props;
        this.key = props.key;
        this.elementId = props.elementId;
        this.theme = props.theme || 'github';
        this.language = props.language || 'js';
        this.isSettingValue = false;
    }
    initialize() {
        if (this.editor) {
            return ;
        }
        this.editor = new AceEditor({
            key: this.key, 
            editorElementId: this.elementId
        });
        this.editor.initialize();
        this.editor.setMime(this.language);
        this.editor.setTheme(this.theme);
        if (this.props.readOnly) {
            this.editor.readOnly(true);
        }
        this.editor.on('change', (value) => {
            if (this.isSettingValue == false) {
                console.log('editvaluechanged', this.key, value);
                glEventHub.emit('editvaluechanged', {
                    key: this.key, 
                    value: value, 
                    defer: true
                });
            }
        });
        glEventHub.on('seteditvalue', (data) => {
            console.log('on seteditvalue', data);
            var key = data.key;
            var value = data.value;
            console.log('seteditvalue', key, value);
            if (key === this.key) {
                this.isSettingValue = true;
                this.value(value);
                this.isSettingValue = false;
            }
        });
        console.log('EditorControl initialized');
    }
    theme(value) {
        if (typeof value === 'undefined') {
            return this.theme;
        }
        else {
            this.editor.setTheme(value);
            this.theme = value;
        }
    }
    language(value) {
        if (typeof value === 'undefined') {
            return this.language;
        }
        else {
            this.editor.setMime(value);
            this.language = value;
        }
    }
    value(value) {
        if (this.editor) {
            if (typeof value === 'undefined') {
                return this.editor.getValue();
            }
            else {
                this.editor.setValue(value);
            }
        }
    }
}
var itemUtils = {};
itemUtils.cloneItem = function(item) {
    var cloned = {
        name: item.name, 
        basename: item.basename, 
        dirname: item.dirname, 
        path: item.path, 
        isFolder: item.isFolder, 
        schema: item.schema, 
        isIttfDocument: item.isIttfDocument, 
        isFragment: item.isFragment, 
        content: item.content, 
        children: [
            
        ]
    };
    var i, i_items=item.children, i_len=item.children.length, child;
    for (i=0; i<i_len; i++) {
        child = item.children[i];
        cloned.children.push(itemUtils.cloneItem(child));
    }
    return cloned;
};
itemUtils.setDirname = function(item, newDirname) {
    item.dirname = newDirname;
    item.path = newDirname + '/' + item.basename;
    if (item.children && item.children.length > 0) {
        var i, i_items=item.children, i_len=item.children.length, child;
        for (i=0; i<i_len; i++) {
            child = item.children[i];
            itemUtils.setDirname(child, item.path);
        }
    }
};
itemUtils.rename = function(item, newName) {
    var newItem = wz.fs.infoByPath(item.dirname + '/' + newName, item.isFolder);
    item.name = newItem.name;
    item.basename = newItem.basename;
    item.dirname = newItem.dirname;
    item.path = newItem.path;
    item.isFolder = newItem.isFolder;
    if (item.isFolder == false) {
        item.schema = newItem.schema;
        item.isIttfDocument = newItem.isIttfDocument;
        item.isFragment = newItem.isFragment;
    }
    console.log('itemUtils.rename.renamed', item);
};
/**
     dependencies
     . g/js/wz/core.js.ittf
     . g/js/wz/contextMenu.js.ittf
     params
     { item
     string name
     boolean isFolder
     boolean expanded
     date loadedAt
     [ children
     { treeView
     func emit
     func populate
     func handleContextMenu
     func rename
*/
class TreeNode {
    constructor(item, treeView) {
        this.item = item;
        this.treeView = treeView;
        this.parent = null;
        this.rendered = false;
        this.children = [];
        if (item.children && item.children.length > 0) {
            var i, i_items=item.children, i_len=item.children.length, child;
            for (i=0; i<i_len; i++) {
                child = item.children[i];
                this.addItem(child);
            }
        }
    }
    getRoot() {
        return this.parent ? this.parent.getRoot() : this;
    }
    getTreeview() {
        return this.getRoot().treeView;
    }
    addItem(item) {
        var node = new TreeNode(item);
        node.parent = this;
        this.children.push(node);
        if (this.rendered) {
            var childLeaf = node.render();
            if (!this.childrenEl) {
                this.childrenEl = document.createElement('div');
                this.childrenEl.setAttribute('class', 'tree-child-leaves');
                this.el.appendChild(this.childrenEl);
            }
            this.childrenEl.appendChild(childLeaf);
        }
        return node;
    }
    replace(populatedItem) {
        // populatedItem is the same object of item (the parent has not been changed)
        this.item = populatedItem;
        this.rendered = false;
        var i, i_items=populatedItem.children, i_len=populatedItem.children.length, child;
        for (i=0; i<i_len; i++) {
            child = populatedItem.children[i];
            this.addItem(child);
        }
        var oldEl = this.el;
        var newEl = this.render();
        // log 'replace', newEl, this.el
        oldEl.parentNode.replaceChild(newEl, oldEl);
    }
    render() {
        this.rendered = true;
        var item = this.item;
        this.el = document.createElement('div');
        this.el.setAttribute('class', 'tree-node');
        this.contentEl = document.createElement('div');
        this.contentEl.setAttribute('class', 'tree-node-content');
        var itemEl = this.getItemEl(item);
        this.contentEl.appendChild(itemEl);
        this.el.appendChild(this.contentEl);
        if (this.children.length > 0) {
            this.childrenEl = document.createElement('div');
            this.childrenEl.setAttribute('class', 'tree-child-leaves');
            var i, i_items=this.children, i_len=this.children.length, child;
            for (i=0; i<i_len; i++) {
                child = this.children[i];
                var childLeaf = child.render();
                this.childrenEl.appendChild(childLeaf);
            }
            if (!item.expanded) {
                this.childrenEl.classList.add('hidden');
            }
            this.el.appendChild(this.childrenEl);
        }
        var clickThis = (event) => {
            console.log('clickThis', 'expanded', this.item.expanded, 'needs populate',  this.children.length == 0 && !this.item.loadedAt && this.item.isFolder);
            var selectThis = () => {
                if (this.item.isFolder) {
                    if (this.item.expanded) {
                        this.collapse(this.childrenEl);
                    }
                    else {
                        this.expand(this.childrenEl);
                    }
                }
                else {
                    if (this.getTreeview().selectedItemEl) {
                        wz.removeClass(this.getTreeview().selectedItemEl, 'selected');
                    }
                    wz.addClass(itemEl, 'selected');
                    this.getTreeview().selectedItemEl = itemEl;
                }
                this.getTreeview().selectTreeNode(this);
            };
            if (this.children.length == 0 && !this.item.loadedAt && this.item.isFolder) {
                this.getTreeview().populate(this);
            }
            selectThis();
        };
        wz.click(this.contentEl, clickThis);
        var contextmenu = (event) => {
            wz.addClass(this.contentEl, 'tree-node-context-menu-on');
            this.getTreeview().handleContextMenu({
                target: event, 
                treeNode: this, 
                data: this.item
            });
        };
        wz.contextmenu(this.contentEl, contextmenu);
        return this.el;
    }
    expand(skipEmit) {
        svg['folder-opened'](this.svg);
        console.log('expand', this.children.length);
        if (this.children.length > 0) {
            var childrenEl = this.el.querySelector('.tree-child-leaves');
            childrenEl.classList.remove('hidden');
        }
        this.item.expanded = true;
        if (skipEmit) {
            return ;
        }
        this.getTreeview().emit('expand', {
            treeNode: this
        });
    }
    collapse(skipEmit) {
        svg['folder-closed'](this.svg);
        console.log('collapse', this.children.length);
        if (this.children.length > 0) {
            var childrenEl = this.el.querySelector('.tree-child-leaves');
            childrenEl.classList.add('hidden');
        }
        this.item.expanded = false;
        if (skipEmit) {
            return ;
        }
        this.getTreeview().emit('collapse', {
            treeNode: this
        });
    }
    renameStart() {
        console.log('renameStart', this);
        if (!this.input) {
            this.input = document.createElement('input');
            this.input.setAttribute('style', 'margin: 1px 4px;');
            wz.value(this.input, this.item.name);
            this.input.setSelectionRange(0, this.input.value.length);
        }
        this.text.parentNode.replaceChild(this.input, this.text);
        var editOnInputKeyPress = (event) => {
            // log 'keypress', event.keyCode
            if (event.keyCode == 13) {
                editOnDocumentClick({
                    target: null
                });
            }
        };
        var editOnDocumentClick = (event) => {
            if (event.target != this.input) {
                wz.unkeypress(document, editOnInputKeyPress);
                wz.unclick(document, editOnDocumentClick);
                this.renameFinish();
            }
        };
        window.setTimeout(() => {
            wz.keypress(this.input, editOnInputKeyPress);
            wz.click(document, editOnDocumentClick);
            this.input.focus();
        }, 100);
    }
    renameFinish() {
        var newName = wz.value(this.input);
        console.log('renameFinish', newName, this.item.name);
        if (newName !== this.item.name) {
            this.getTreeview().rename(this, newName, (err, result) => {
                if (err) {
                    console.log('err', err);
                    throw err;
                }
                itemUtils.rename(this.item, newName);
                this.text.textContent = newName;
                this.input.parentNode.replaceChild(this.text, this.input);
                this.getTreeview().emit('select', this, event);
            });
        }
        else {
            this.getTreeview().emit('select', this, event);
        }
    }
    copyCutStart(oper) {
        console.log('copyCutStart', oper, this);
        wz.addClass(this.el, oper === 'copy' ? 'copying' : 'cutting');
    }
    copyCutFinish() {
        console.log('copyCutFinish', this);
        wz.removeClass(this.el, 'copying');
        wz.removeClass(this.el, 'cutting');
    }
    remove() {
        wz.node.remove(this);
        this.el.parentNode.removeChild(this.el);
    }
    getItemEl(item) {
        var kind;
        // log 'getItemEl', item
        if (item.isFolder) {
            kind = item.expanded ? 'folder-opened' : 'folder-closed';
        }
        else {
            kind = isImage(item.mime) ? 'image' : 'document';
        }
        var itemEl = document.createElement('div');
        itemEl.className = 'icon-item-group';
        var itemTextEl = document.createElement('span');
        itemTextEl.className = 'item-name';
        itemTextEl.textContent = item.name;
        this.svg = svg.getSvg();
        itemEl.appendChild(svg[kind](this.svg));
        itemEl.appendChild(itemTextEl);
        this.text = itemTextEl;
        return itemEl;
    }
}
var svg = {
    'folder-closed': function(svgEl) {
        while (svgEl.firstChild) {
            svgEl.removeChild(svgEl.firstChild);
        }
        var pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathEl.setAttribute('d', "M7.25,4 L7.5,4 L7.5,3 L7,3.5 L7,2 L15,2 L15,4 L7.25,4 Z M6.75,4 L5,4 L7,2 L7,3.5 L6.5,4 L6.75,4 Z M1,4 L15,4 L15,14 L1,14 L1,4 Z M7.5,3 L7.5,4 L14,4 L14,3 L7.5,3 Z");
        svgEl.appendChild(pathEl);
        return svgEl;
    }, 
    'folder-opened': function(svgEl) {
        while (svgEl.firstChild) {
            svgEl.removeChild(svgEl.firstChild);
        }
        var gEl = document.createElementNS("http://www.w3.org/2000/svg", "g");
        var pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathEl.setAttribute('d', "M7.5,5 L2,5 L2,13 L7.75,13 L14,13 L14,4 L15,4 L15,14 L1,14 L1,4 L6.5,4 L5.5,5 L7.5,5 L7.5,4.5 L7.5,5 Z M14,4 L14,3 L7.5,3 L7.5,3.5 L7.5,3 L7,3.5 L7,2 L15,2 L15,4 L14,4 Z M6.5,4 L5,4 L7,2 L7,3.5 L6.5,4 Z");
        var polyEl = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polyEl.setAttribute('points', "0 7 13 7 14 14 1 14");
        gEl.appendChild(pathEl);
        gEl.appendChild(polyEl);
        svgEl.appendChild(gEl);
        return svgEl;
    }, 
    'document': function(svgEl) {
        while (svgEl.firstChild) {
            svgEl.removeChild(svgEl.firstChild);
        }
        var pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathEl.setAttribute('d', "M3,2 L13,2 L13,14 L3,14 L3,2 Z M9,2 L13,6 L13,2 L9,2 Z M9,6 L9,2 L8,2 L8,7 L13,7 L13,6 L9,6 Z");
        svgEl.appendChild(pathEl);
        return svgEl;
    }, 
    'image': function(svgEl) {
        while (svgEl.firstChild) {
            svgEl.removeChild(svgEl.firstChild);
        }
        var gEl = document.createElementNS("http://www.w3.org/2000/svg", "g");
        var circleEl = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circleEl.setAttribute('cx', "5");
        circleEl.setAttribute('cy', "5");
        circleEl.setAttribute('r', "1");
        var polyEl = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polyEl.setAttribute('points', "5.71428571 8.41176471 8 11.2352941 10.8571429 7 14 13 2 13");
        var pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathEl.setAttribute('d', "M3,3 L3,13 L13,13 L13,3 L3,3 Z M3,2 L13,2 C13.5522847,2 14,2.44771525 14,3 L14,13 C14,13.5522847 13.5522847,14 13,14 L3,14 C2.44771525,14 2,13.5522847 2,13 L2,3 C2,2.44771525 2.44771525,2 3,2 Z");
        gEl.appendChild(circleEl);
        gEl.appendChild(polyEl);
        gEl.appendChild(pathEl);
        svgEl.appendChild(gEl);
        return svgEl;
    }, 
    getSvg: function() {
        var svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgEl.setAttribute('class', 'fl-icon');
        svgEl.setAttribute('viewBox', '0 0 16 16');
        return svgEl;
    }
};
function isImage(mime) {
    return /\.(bmp|jpg|jpeg|png|gif|svg)$/.test(mime);
}
/**
     dependencies
     . g/js/wz/core.js.ittf
     . g/js/wz/contextMenu.js.ittf
     params
     { props
     string key
     { app
     { filesystem
     func getFolderRoot
     func folderContextmenuItems
     func fileContextmenuItems
     func populateFolderItem
     func createFolder
     func createFile
     func deleteFolder
     func deleteFile
     func updateFile
     func rename
     func copyCutStart
     func pasteTo
*/
class TreeView  extends  wz.EventTarget {
    constructor(props) {
        super();
        this.events = [
            'expand', 
            'change', 
            'collapse', 
            'select'
        ];
        this.props = props;
        this.key = props.key || 'default';
        this.app = props.app;
        this.filesystem = props.filesystem;
        this.handlers = {};
        this.selectedTreeNode = null;
    }
    render(rootItem, callback) {
        if (typeof callback === 'undefined') {
            callback = rootItem;
            rootItem = null;
        }
        // set this.rootNode = new TreeNode(data, this)
        if (this.filesystem) {
            this.filesystem.getFolderRoot((err, data) => {
                if (err) {
                    console.log('err', err);
                    throw err;
                }
                // log 'TreeView.folderRoot', data
                this.rootNode = new TreeNode(data, this);
                return callback(null, this.rootNode.render());
            });
        }
        else if (rootItem) {
            this.rootNode = new TreeNode(rootItem, this);
            return callback(null, this.rootNode.render());
        }
        else {
            callback({
                message: 'TreeView.render error: no data for treeNode'
            });
        }
    }
    handleContextMenu(payload) {
        // log 'handleContextMenu.payload', payload, payload.data
        if (this.filesystem) {
            if (payload.data.isFolder) {
                this.handleContextMenuFolder(payload);
            }
            else {
                this.handleContextMenuFile(payload);
            }
        }
    }
    handleContextMenuFolder(context) {
        var that = this;
        if (!this.contextmenuFolder) {
            this.contextmenuFolder = new wz.ContextMenu({
                menusContainerId: this.props.formsContainerId
            });
            this.contextmenuFolder.create({
                menu: {
                    id: (this.props.id || 'treeview') + '-contextmenuFolder', 
                    items: this.filesystem.folderContextmenuItems(context.treeNode)
                }, 
                onClick: (data) => {
                    // log 'handleContextMenu_ittfDocument.onClick', data
                    if (data.command === 'rename') {
                        data.payload.treeNode.renameStart();
                    }
                    else if (data.command === 'create folder') {
                        this.createFolder(data.payload.treeNode);
                    }
                    else if (data.command === 'create file') {
                        this.createFile(data.payload.treeNode);
                    }
                    else if (data.command === 'clone repo') {
                        this.cloneRepo(data.payload.treeNode);
                    }
                    else if (data.command === 'checkout repo') {
                        this.checkoutRepo(data.payload.treeNode);
                    }
                    else if (data.command === 'copy' || data.command === 'cut') {
                        this.copyCutStart(data.payload.treeNode, data.command);
                    }
                    else if (data.command === 'paste') {
                        this.pasteTo(data.payload.treeNode);
                    }
                    else if (data.command === 'delete') {
                        this.deleteFolder(data.payload.treeNode);
                    }
                }
            });
        }
        else {
            this.contextmenuFolder.replace({
                items: this.filesystem.folderContextmenuItems(context.treeNode)
            });
        }
        this.contextmenuFolder.handleRightClick(event, {
            data: context.data, 
            treeNode: context.treeNode
        });
        this.contextmenuFolder.onClose = () =>
            wz.removeClass(context.treeNode.contentEl, 'tree-node-context-menu-on');
    }
    handleContextMenuFile(context) {
        var that = this;
        if (!this.contextmenuFile) {
            this.contextmenuFile = new wz.ContextMenu({
                menusContainerId: this.props.formsContainerId
            });
            this.contextmenuFile.create({
                menu: {
                    id: (this.props.id || 'treeview') + '-contextmenuFile', 
                    items: this.filesystem.fileContextmenuItems(context.treeNode)
                }, 
                onClick: (data) => {
                    // log 'handleContextMenu_ittfDocument.onClick', data
                    if (data.command === 'rename') {
                        data.payload.treeNode.renameStart();
                    }
                    else if (data.command === 'copy' || data.command === 'cut') {
                        this.copyCutStart(data.payload.treeNode, data.command);
                    }
                    else if (data.command === 'paste') {
                        this.pasteTo(data.payload.treeNode);
                    }
                    else if (data.command === 'delete') {
                        this.deleteFile(data.payload.treeNode);
                    }
                }
            });
        }
        else {
            this.contextmenuFile.replace({
                items: this.filesystem.fileContextmenuItems(context.treeNode)
            });
        }
        this.contextmenuFile.handleRightClick(event, {
            data: context.data, 
            treeNode: context.treeNode
        });
        this.contextmenuFile.onClose = () =>
            wz.removeClass(context.treeNode.contentEl, 'tree-node-context-menu-on');
    }
    populate(treeNode, callback) {
        this.filesystem.populateFolderItem(treeNode.item, (err, populatedItem) => {
            if (err) {
                console.log('err', err);
                throw err;
            }
            // log 'TreeView.populate', populatedItem
            treeNode.replace(populatedItem);
            if (callback) {
                return callback(null);
            }
        });
    }
    selectTreeNode(treeNode) {
        this.selectedTreeNode = treeNode;
        glEventHub.emit('select-tree-node', {
            key: this.key, 
            treeNode: treeNode
        });
    }
    createFolder(treeNode) {
        var createExec = () =>
            this.filesystem.createFolder(treeNode.item, (err, newItem) => {
                if (err) {
                    console.log('err', err);
                    throw err;
                }
                console.log('createFolder.1', newItem);
                var newNode = treeNode.addItem(newItem);
                treeNode.expand();
                newNode.renameStart();
            });
        if (!treeNode.item.loadedAt) {
            console.log('createFolder.populate');
            this.populate(treeNode, (err, notUsed) => {
                if (err) {
                    console.log('err', err);
                    throw err;
                }
                createExec();
            });
        }
        else {
            createExec();
        }
    }
    deleteFolder(treeNode) {
        this.filesystem.deleteFolder(treeNode.item, (err, result) => {
            if (err) {
                console.log('err', err);
                throw err;
            }
            treeNode.remove();
        });
    }
    createFile(treeNode) {
        var createExec = () =>
            this.filesystem.createFile(treeNode.item, (err, newItem) => {
                if (err) {
                    console.log('err', err);
                    throw err;
                }
                var newNode = treeNode.addItem(newItem);
                treeNode.expand();
                newNode.renameStart();
            });
        if (!treeNode.item.loadedAt) {
            this.populate(treeNode, (err, notUsed) => {
                if (err) {
                    console.log('err', err);
                    throw err;
                }
                createExec();
            });
        }
        else {
            createExec();
        }
    }
    cloneRepo(treeNode) {
        var cloneExec = async () => {
            await gitClone({
                filepath: treeNode.item.path, 
                glEventHub: glEventHub
            });
            /**
                this.filesystem.cloneFolder(treeNode.item, (err, newItem) => {
                    if (err) {
                        console.log('err', err);
                        throw err;
                    }
                    console.log('cloneFolder.1', newItem);
                    var newNode = treeNode.addItem(newItem);
                    treeNode.expand();
                    newNode.renameStart();
                })*/
        };
        if (!treeNode.item.loadedAt) {
            console.log('cloneFolder.populate');
            this.populate(treeNode, (err, notUsed) => {
                if (err) {
                    console.log('err', err);
                    throw err;
                }
                cloneExec();
            });
        }
        else {
            cloneExec();
        }
    }
    checkoutRepo(treeNode) {
        var checkoutExec = async () => {
            await gitCheckout({
                filepath: treeNode.item.path, 
                glEventHub: glEventHub
            });
            /**
                this.filesystem.checkoutFolder(treeNode.item, (err, newItem) => {
                    if (err) {
                        console.log('err', err);
                        throw err;
                    }
                    console.log('checkoutFolder.1', newItem);
                    var newNode = treeNode.addItem(newItem);
                    treeNode.expand();
                    newNode.renameStart();
                })*/
        };
        if (!treeNode.item.loadedAt) {
            console.log('checkoutFolder.populate');
            this.populate(treeNode, (err, notUsed) => {
                if (err) {
                    console.log('err', err);
                    throw err;
                }
                checkoutExec();
            });
        }
        else {
            checkoutExec();
        }
    }
    updateFile(treeNode, newContent) {
        this.filesystem.updateFile(treeNode.item, newContent, (err, result) => {
            if (err) {
                console.log('err', err);
                throw err;
            }
            treeNode.item.content = newContent;
            glEventHub.emit('tree-node-updated', {
                key: this.key, 
                treeNode: treeNode
            });
        });
    }
    deleteFile(treeNode) {
        this.filesystem.deleteFile(treeNode.item, (err, result) => {
            if (err) {
                console.log('err', err);
                throw err;
            }
            treeNode.remove();
        });
    }
    rename(treeNode, newName, callback) {
        this.filesystem.rename(treeNode.item, newName, callback);
    }
    copyCutStart(treeNode, oper) {
        treeNode.copyCutStart(oper);
        this.filesystem.copyCutStart(treeNode.item, treeNode, oper);
    }
    pasteTo(treeNode) {
        this.filesystem.pasteTo(treeNode.item, (err, from) => {
            if (err) {
                console.log('err', err);
                throw err;
            }
            console.log('treeView.pasteTo', 'from', from, 'to', treeNode.item);
            if (from.action === 'copyFile' || from.action === 'copyFolder') {
                var newItem = itemUtils.cloneItem(from.context.item);
                itemUtils.setDirname(newItem, treeNode.item.dirname);
                treeNode.addItem(newItem);
                from.context.copyCutFinish();
            }
            if (from.action === 'moveFile' || from.action === 'moveFolder') {
                var newItem = itemUtils.cloneItem(from.context.item);
                itemUtils.setDirname(newItem, treeNode.item.dirname);
                treeNode.addItem(newItem);
                from.context.remove();
            }
        });
    }
}
/**
     dependencies
     . g/js/wz/standalone.js.ittf
     - wz.fs.infoByPath
     params
     { ctx
     { fsAdapter (BrowserFilesystem, ...)
*/
class TreeFileSystem {
    constructor(ctx) {
        this.fsAdapter = ctx.fsAdapter;
        // the fs item
        this.copyCutItem = null;
        // the TreeNode containing the copy/cut fs item
        this.copyCutContext = null;
        // oneOf( 'copy', 'cut' )
        this.copyCutOper = null;
    }
    getChildName(item, name) {
        var c = 0;
        var result, ok = false;
        while (ok == false) {
            result = name + (c == 0 ? '' : c);
            ok = true;
            var i, i_items=item.children, i_len=item.children.length, child;
            for (i=0; i<i_len; i++) {
                child = item.children[i];
                if (child.name === result) {
                    ok = false;
                }
            }
            c++;
        }
        return result;
    }
    getFolderRoot(callback) {
        this.fsAdapter.getFolderItem(callback);
    }
    populateFolderItem(parentItem, callback) {
        this.fsAdapter.getFolderItem(parentItem, callback);
    }
    createFolder(parentItem, callback) {
        var newName = this.getChildName(parentItem, 'new folder');
        var newPath = parentItem.path + '/' + newName;
        this.fsAdapter.createFolder(newPath, (err, result) => {
            if (err) {
                console.log('err', err);
                throw err;
            }
            var newItem = wz.fs.infoByPath(newPath, true);
            newItem.name = newItem.basename;
            newItem.children = [];
            callback(null, newItem);
        });
    }
    deleteFolder(item, callback) {
        this.fsAdapter.deleteFolder(item.path, callback);
    }
    createFile(parentItem, callback) {
        var newName = this.getChildName(parentItem, 'new file');
        var newPath = parentItem.path + '/' + newName;
        var newContent = '...';
        this.fsAdapter.writeFile(newPath, newContent, (err, result) => {
            if (err) {
                console.log('err', err);
                throw err;
            }
            var newItem = wz.fs.infoByPath(newPath, false);
            newItem.name = newItem.basename;
            newItem.children = [];
            callback(null, newItem);
        });
    }
    updateFile(item, content, callback) {
        this.fsAdapter.writeFile(item.path, content, callback);
    }
    deleteFile(item, callback) {
        this.fsAdapter.deleteFile(item.path, callback);
    }
    rename(item, newName, callback) {
        console.log('treeFileSystem.rename', item, newName);
        if (item.isFolder) {
            this.fsAdapter.renameFolder(item.path, item.dirname + '/' + newName, callback);
        }
        else {
            this.fsAdapter.renameFile(item.path, item.dirname + '/' + newName, callback);
        }
    }
    copyCutStart(item, context, oper) {
        /**
             params
                { item
                 is a TreeNode.item
                { context
                 is a TreeNode
                { item
                 oneOf( 'copy', 'cut' )
        */
        this.copyCutItem = item;
        this.copyCutContext = context;
        this.copyCutOper = oper;
    }
    copyCutClear() {
        this.copyCutItem = null;
        this.copyCutContext = null;
        this.copyCutOper = null;
    }
    pasteTo(item, callback) {
        console.log('TreeFileSystem.pasteTo', item, 'from', this.copyCutItem);
        var action;
        if (this.copyCutOper === 'copy') {
            if (this.copyCutItem.isFolder) {
                action = 'copyFolder';
            }
            else {
                action = 'copyFile';
            }
        }
        else {
            if (this.copyCutItem.isFolder) {
                action = 'moveFolder';
            }
            else {
                action = 'moveFile';
            }
        }
        this.fsAdapter[action](this.copyCutItem.path, item.path + '/' + this.copyCutItem.basename, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, {
                item: this.copyCutItem, 
                context: this.copyCutContext, 
                oper: this.copyCutOper, 
                action: action
            });
            this.copyCutClear();
        });
    }
    folderContextmenuItems(item) {
        var canPaste = this.copyCutItem && item !== this.copyCutItem;
        var items = [
            {
                label: 'create folder'
            }, 
            {
                label: 'create file'
            }, 
            {
                label: 'clone repo'
            }, 
            {
                label: 'checkout repo'
            }
        ];
        if (canPaste) {
            items.push({
                label: 'paste'
            });
        }
        items = items.concat([
            {
                label: 'copy'
            }, 
            {
                label: 'cut'
            }, 
            {
                label: 'rename'
            }, 
            {
                label: 'delete'
            }
        ]);
        return items;
    }
    fileContextmenuItems(item) {
        var canPaste = this.copyCutItem && item !== this.copyCutItem;
        var items = [];
        if (canPaste) {
            items.push({
                label: 'paste'
            });
        }
        items = items.concat([
            {
                label: 'copy'
            }, 
            {
                label: 'cut'
            }, 
            {
                label: 'rename'
            }, 
            {
                label: 'delete'
            }
        ]);
        return items;
    }
}
/**
     dependencies
     . g/js/wz/standalone.js.ittf
     - wz.fs.getFs
     - wz.fs.getTreeFolderView
*/
class BrowserFileSystem {
    constructor(options) {
        options = options || {};
        this.storeName = options.storeName || 'wizziRepo';
        this.rootFolder = options.rootFolder || '/ixdb';
    }
    initialize(callback) {
        wz.fs.getFs({
            storeName: this.storeName
        }, (err, fs) => {
            if (err) {
                return callback(err);
            }
            this.fs = fs;
            return callback(null);
        });
    }
    createFolder(folderPath, callback) {
        this.fs.mkdir(folderPath, callback);
    }
    writeFile(filePath, content, callback) {
        this.fs.write(filePath, content, callback);
    }
    deleteFolder(folderPath, callback) {
        this.fs.deleteFolder(folderPath, callback);
    }
    deleteFile(filePath, callback) {
        this.fs.unlink(filePath, callback);
    }
    renameFolder(oldPath, newPath, callback) {
        this.fs.rename(oldPath, newPath, callback);
    }
    renameFile(oldPath, newPath, callback) {
        this.fs.rename(oldPath, newPath, callback);
    }
    copyFile(fromPath, destPath, callback) {
        console.log('copyFile', fromPath, 'to', destPath);
        this.fs.copyFile(fromPath, destPath, callback);
    }
    copyFolder(fromPath, destPath, callback) {
        console.log('copyFolder', fromPath, 'to', destPath);
        this.fs.copyFolder(fromPath, destPath, callback);
    }
    moveFile(fromPath, destPath, callback) {
        console.log('moveFile', fromPath, 'to', destPath);
        this.fs.moveFile(fromPath, destPath, callback);
    }
    moveFolder(fromPath, destPath, callback) {
        console.log('moveFolder', fromPath, 'to', destPath);
        this.fs.moveFolder(fromPath, destPath, callback);
    }
    getFolderItem(parentItem, callback) {
        if (typeof callback === 'undefined') {
            callback = parentItem;
            parentItem = null;
        }
        if (!parentItem) {
            parentItem = {
                name: 'root', 
                isFolder: true, 
                path: this.rootFolder, 
                children: [
                    
                ]
            };
        }
        wz.fs.getTreeFolderView(parentItem.path, (err, result) => {
            if (err) {
                console.log('err', err);
                throw err;
            }
            console.log('BrowserFileSystem.getTreeFolderView.result', '\n', JSON.stringify(result, null, 2));
            var i, i_items=result, i_len=result.length, f;
            for (i=0; i<i_len; i++) {
                f = result[i];
                var item = {
                    name: f.basename, 
                    basename: f.basename, 
                    expanded: false, 
                    isFolder: f.isFolder, 
                    path: f.fullPath, 
                    fullPath: f.fullPath, 
                    dirname: f.dirname, 
                    mime: f.mime, 
                    children: [
                        
                    ]
                };
                if (f.isFolder) {
                }
                else {
                    item.content = f.content;
                    item.isIttfDocument = f.isIttfDocument;
                    item.isFragment = f.isFragment;
                    item.isJob = f.isJob;
                    item.isSchema = f.isSchema;
                    item.schema = f.schema;
                }
                parentItem.children.push(item);
            }
            parentItem.expanded = true;
            parentItem.loadedAt = Date.now();
            return callback(null, parentItem);
        });
    }
}
async function gitInit({filepath, glEventHub}) {
    const dir = filepath;
    await git.init({
            fs, 
            dir
        });
}
async function gitClone({filepath, glEventHub}) {
    let url = await prompt({
            text: 'Git URL to clone', 
            input: 'text', 
            placeholder: 'https://github.com/', 
            confirmButtonText: 'Clone Now'
        });
    ;
    glEventHub.emit('setFolderStateData', {
        fullpath: filepath, 
        key: 'busy', 
        value: true
    });
    let dir = path.join(filepath, path.basename(url));
    let proxyurl = url.replace(/^https?:\/\//, '');
    glEventHub.emit('setFolderStateData', {
        fullpath: dir, 
        key: 'busy', 
        value: true
    });
    const updateProgressBar = (e) => {
        let value = e.loaded === e.total ? undefined : e.loaded / e.total;
        glEventHub.emit('setFolderStateData', {
            fullpath: dir, 
            key: 'progress', 
            value
        });
    };
    try {
        await git.clone({
                fs, 
                dir, 
                depth: 1, 
                onprogress: updateProgressBar, 
                url: `https://cors-buster-jfpactjnem.now.sh/${proxyurl}`
            });
        await git.config({
                fs, 
                dir, 
                path: 'remote.origin.host', 
                value: new URL('https://' + proxyurl).hostname
            });
    } 
    finally {
        glEventHub.emit('setFolderStateData', {
            fullpath: dir, 
            key: 'busy', 
            value: false
        });
        glEventHub.emit('setFolderStateData', {
            fullpath: filepath, 
            key: 'busy', 
            value: false
        });
    } 
}
async function gitCheckout({filepath, glEventHub}) {
    const dir = filepath;
    let branches = await git.listBranches({
            fs, 
            dir
        });
    ;
    let branchesObject = {};
    for (let b of branches) {
        branchesObject[b] = b;
    }
    let ref = await prompt({
            title: 'Checkout branch', 
            text: 'Select branch', 
            input: 'select', 
            inputOptions: branchesObject, 
            confirmButtonText: 'Checkout', 
            showCancelButton: true
        });
    ;
    console.log('checkout.ref', ref);
    glEventHub.emit('setFolderStateData', {
        fullpath: filepath, 
        key: 'busy', 
        value: true
    });
    try {
        await git.checkout({
                fs, 
                dir, 
                ref
            });
    } 
    finally {
        glEventHub.emit('refreshGitStatusDir', filepath);
        glEventHub.emit('setFolderStateData', {
            fullpath: filepath, 
            key: 'busy', 
            value: false
        });
    } 
}
async function gitStage({filepath, glEventHub}) {
    let dir;
    await git.findRoot({
            fs, 
            filepath
        });
    let rpath = path.relative(dir, filepath);
    await git.add({
            fs, 
            dir, 
            filepath: rpath
        });
    glEventHub.emit('refreshGitStatusFile', filepath);
}
async function gitCommit({filepath, glEventHub}) {
    const dir = filepath;
    let author = await git.config({
            fs, 
            dir, 
            path: 'user.name'
        });
    ;
    let email = await git.config({
            fs, 
            dir, 
            path: 'user.email'
        });
    ;
    if (!author) {
        author = await prompt({
                text: 'Author Name', 
                input: 'text'
            });
        ;
        await git.config({
                fs, 
                dir, 
                path: 'user.name', 
                value: author
            });
    }
    if (!email) {
        email = await prompt({
                text: 'Author Email', 
                input: 'text'
            });
        ;
        await git.config({
                fs, 
                dir, 
                path: 'user.email', 
                value: email
            });
    }
    // signingkey = 9609B8A5928BA6B9
    let msg = await prompt({
            text: 'Commit Message', 
            input: 'text'
        });
    ;
    try {
        glEventHub.emit('setFolderStateData', {
            fullpath: filepath, 
            key: 'busy', 
            value: true
        });
        await git.commit({
                fs, 
                dir, 
                author: {
                    name: author, 
                    email
                }, 
                message: msg
            });
    } 
    finally {
        glEventHub.emit('refreshGitStatusDir', filepath);
        glEventHub.emit('setFolderStateData', {
            fullpath: filepath, 
            key: 'busy', 
            value: false
        });
    } 
}
async function gitPush({filepath, glEventHub}) {
    const dir = filepath;
    let host = await git.config({
            fs, 
            dir, 
            path: 'remote.origin.host'
        });
    ;
    host = 'https://' + host;
    let helper = await git.config({
            fs, 
            dir, 
            path: `credential "${host}".helper`
        });
    ;
    let authPassword = null;
    let authUsername = null;
    // WIP: Prompt to save push credentials in the browser credential manager
    if (helper === 'navigator.credentials' && navigator.credentials && navigator.credentials.preventSilentAccess) {
        // The new Credential Management API is available
        let cred = await navigator.credentials.get({
                password: true, 
                mediation: 'required'
            });
        ;
        await navigator.credentials.preventSilentAccess();
        if (cred) {
            authUsername = cred.id;
            authPassword = cred.password;
        }
    }
    if (authUsername === null) {
        authUsername = await git.config({
                fs, 
                dir, 
                path: `credential "${host}".username`
            });
        ;
    }
    const offerStorePassword = !!!authPassword && !authUsername;
    if (authPassword === null) {
        /**
            
             authUsername = authUsername || await prompt({
             text: `Enter username (for ${host})`,
             input: 'text'
             })
             let token = await prompt({
             text: `Enter access token`,
             input: 'password'
             })
            
        */
        authPassword = token;
    }
    // WIP: Prompt to save push credentials in the browser credential manager
    if (offerStorePassword && navigator.credentials && navigator.credentials.preventSilentAccess) {
        // The new Credential Management API is available
        let cred = await navigator.credentials.create({
                password: {
                    id: authUsername, 
                    name: host, 
                    iconURL: host + '/favicon.ico', 
                    password: authPassword
                }
            });
        ;
        try {
            // TODO: Awaiting a response from the @ChromiumDev team as to how to tell whether the
            // password was stored successfully or not.
            let c = await navigator.credentials.store(cred);
            ;
            console.log('saving to config', c);
            await git.config({
                    fs, 
                    dir, 
                    path: `credential "${host}".helper`, 
                    value: 'navigator.credentials'
                });
            await navigator.credentials.preventSilentAccess();
        } 
        catch (ex) {
            let offer = await prompt({
                    title: 'Opt out of password manager integration', 
                    inputPlaceholder: `Don't offer to remember this again`, 
                    input: 'checkbox'
                });
            ;
        } 
    }
    glEventHub.emit('setFolderStateData', {
        fullpath: filepath, 
        key: 'busy', 
        value: true
    });
    try {
        await git.push({
                fs, 
                dir, 
                authUsername, 
                authPassword, 
                remote: 'origin', 
                ref: 'refs/heads/master'
            });
    } 
    finally {
        glEventHub.emit('refreshGitStatusDir', filepath);
        glEventHub.emit('setFolderStateData', {
            fullpath: filepath, 
            key: 'busy', 
            value: false
        });
    } 
}
async function gitFetch({filepath, glEventHub}) {
    const dir = filepath;
    let ref = await prompt({
            title: 'Fetch branch', 
            text: 'Name of remote branch', 
            input: 'text', 
            confirmButtonText: 'Fetch', 
            showCancelButton: true
        });
    ;
    glEventHub.emit('setFolderStateData', {
        fullpath: filepath, 
        key: 'busy', 
        value: true
    });
    try {
        await git.fetch({
                fs, 
                dir, 
                remote: 'origin', 
                ref
            });
    } 
    catch (err) {
        console.log('err =', err);
    } 
    finally {
        glEventHub.emit('setFolderStateData', {
            fullpath: filepath, 
            key: 'busy', 
            value: false
        });
    } 
}
async function gitRemove({filepath, glEventHub}) {
    let dir = await git.findRoot({
            fs, 
            filepath
        });
    ;
    let rpath = path.relative(dir, filepath);
    await git.remove({
            fs, 
            dir, 
            filepath: rpath
        });
    glEventHub.emit('refreshGitStatusFile', filepath);
}
class SplashControl {
    constructor(props) {
        this.props = props || {};
        this.key = props.key || 'default';
        this.splashEl = null;
        this.state = [];
        this.visible == false;
    }
    initialize() {
        var containerEl = wz.element(this.props.container);
        this.splashEl = document.createElement('div');
        this.splashEl.setAttribute('class', this.props.className);
        containerEl.appendChild(this.splashEl);
        this.show();
        glEventHub.on('splash-hide', (data) => {
            console.log('splash-hide', 1, data.key, this.key);
            if (data.key !== this.key) {
                return ;
            }
            console.log('splash-hide', 2);
            this.hide();
        });
        glEventHub.on('splash-show', (data) => {
            if (data.key !== this.key) {
                return ;
            }
            this.show();
        });
    }
    hide() {
        if (this.visible == false) {
            return ;
        }
        this.visible = false;
        var containerEl = wz.element(this.props.container);
        var i, i_items=containerEl.children, i_len=containerEl.children.length, item;
        for (i=0; i<i_len; i++) {
            item = containerEl.children[i];
            if (item != this.splashEl) {
                wz.show(item);
            }
            if (this.state[item]) {
                item.style.display = this.state[item];
            }
        }
        wz.hide(this.splashEl);
    }
    show() {
        if (this.visible) {
            return ;
        }
        this.visible = true;
        var containerEl = wz.element(this.props.container);
        wz.show(this.splashEl);
        var i, i_items=containerEl.children, i_len=containerEl.children.length, item;
        for (i=0; i<i_len; i++) {
            item = containerEl.children[i];
            if (item != this.splashEl) {
                this.state[item] = item.style.display;
                wz.hide(item);
            }
        }
    }
}
class AppManager  extends  wz.EventTarget {
    constructor(props) {
        super();
        this.props = props;
        this.props.rootFolder = props.rootFolder || '/ixdb';
        this.props.formsContainerId = props.formsContainerId || 'forms-container';
        this.selectedTreeNode = null;
        this.lastTreeNodeUpdate = null;
        this.ittfResultKind = 'gen';
        this.snippetResultKind = 'wizzify';
        this.timers = {};
    }
    start() {
        this.editBrowse = new EditBrowseController({});
        this.editorSplash = new SplashControl({
            key: 'editor-splash', 
            container: 'editor-container', 
            className: 'splash-editor'
        });
        this.editorSplash.initialize();
        this.resultSplash = new SplashControl({
            key: 'result-splash', 
            container: 'result-container', 
            className: 'splash-result'
        });
        this.resultSplash.initialize();
        this.browserFs = new BrowserFileSystem({
            rootFolder: this.props.rootFolder
        });
        wz.fsGit((err, fsGit) => {
            if (err) {
                console.log('err', err);
                throw err;
            }
            window.git = fsGit.git;
            this.browserFs.initialize((err, notUsed) => {
                if (err) {
                    console.log('err', err);
                    throw err;
                }
                this.treeFs = new TreeFileSystem({
                    fsAdapter: this.browserFs
                });
                this.treeView = new TreeView({
                    app: this, 
                    filesystem: this.treeFs, 
                    formsContainerId: this.props.formsContainerId
                });
                this.treeView.render((err, element) => {
                    if (err) {
                        console.log('err', err);
                        throw err;
                    }
                    wz.replaceChildren('tree-view', element);
                    var editManager = new IttfEditManager({
                        app: this, 
                        treeView: this.treeView, 
                        ittfEditorTitle: 'ittf-editor-title'
                    });
                    editManager.initialize();
                    var browseManager = new BrowseManager({
                        app: this, 
                        treeView: this.treeView, 
                        resultBrowserTitle: 'result-browser-title'
                    });
                    browseManager.initialize();
                    this.createCommandBars();
                    glEventHub.on('select-tree-node', (data) => {
                        if (data.key !== 'default') {
                            return ;
                        }
                        // log 'AppManager.treeView.select', data.treeNode
                        var treeNode = data.treeNode;
                        var item = treeNode.item;
                        if (!!item.isFolder == false) {
                            glEventHub.emit('splash-hide', {
                                key: 'editor-splash'
                            });
                            this.resultBar.setState({
                                isIttf: (treeNode.item.isIttfDocument && !treeNode.item.isFragment), 
                                schema: treeNode.item.schema, 
                                mime: treeNode.item.mime
                            });
                            this.selectedTreeNode = treeNode;
                            editManager.setCurrentFile(treeNode);
                            this.onTreeNodeUpdate(this.selectedTreeNode, {
                                immediate: true
                            });
                        }
                    });
                    glEventHub.on('tree-node-updated', (data) => {
                        if (data.key !== 'default') {
                            return ;
                        }
                        // log 'AppManager.treeView.updated', data.treeNode
                        var treeNode = data.treeNode;
                        var item = treeNode.item;
                        this.selectedTreeNode = treeNode;
                        this.onTreeNodeUpdate(this.selectedTreeNode, {
                            immediate: true
                        });
                    });
                });
            });
        });
    }
    createCommandBars() {
        this.resultBar = new ResultBar();
        wz.element('result-bar').appendChild(this.resultBar.render())
    }
    onTreeNodeUpdate(treeNode, options) {
        options = options || {};
        this.editBrowse.onEditValueChange(treeNode.item, options);
    }
}
/**
     params
     { props
     { treeView
     string ittfEditorTitle
*/
class IttfEditManager {
    constructor(props) {
        this.props = props;
        this.treeView = props.treeView;
        this.editorControl = null;
        this.currentItem = null;
        this.settingValue = false;
    }
    initialize() {
        this.editorControl = new EditorControl({
            key: 'ittf-editor', 
            elementId: 'editorContainer'
        });
        glEventHub.on('editvaluechanged', (data) => {
            console.log('on editvaluechanged', data);
            var key = data.key;
            var value = data.value;
            if (key === 'ittf-editor') {
                if (this.settingValue == false) {
                    this.treeView.updateFile(this.currentTreeNode, value);
                }
            }
        });
        this.editorControl.initialize();
    }
    setCurrentFile(treeNode) {
        this.currentTreeNode = treeNode;
        this.currentItem = treeNode.item;
        this.setFilePath(this.currentItem.name);
        this.settingValue = true;
        this.editorControl.value(this.currentItem.content);
        this.settingValue = false;
    }
    setFilePath(path) {
        wz.text(this.props.ittfEditorTitle, path);
    }
}
class BrowseManager {
    constructor(props) {
        this.props = props;
        this.key = props.key || 'default';
        this.app = props.app;
        this.treeView = props.treeView;
        this.textBrowserControl = null;
        this.textBrowserControl = null;
        this.browsers = {};
        this.activeBrowserKind = null;
    }
    initialize() {
        this.browsers['text'] = new TextBrowserControl({
            browserContainerId: 'result-text-container', 
            browserControlId: 'result-text-control'
        });
        this.browsers['text'].initBrowser();
        this.browsers['json'] = new JsonBrowserControl({
            browserContainerId: 'result-json-container', 
            browserControlId: 'result-json-control'
        });
        this.browsers['json'].initBrowser();
        this.browsers['diff'] = new DiffBrowserControl({
            browserContainerId: 'result-diff-container', 
            browserControlId: 'result-diff-control'
        });
        this.browsers['diff'].initBrowser();
        this.browsers['html'] = new HtmlBrowserControl({
            browserContainerId: 'result-html-container', 
            browserControlId: 'result-html-control'
        });
        this.browsers['html'].initBrowser();
        this.initializeHandlers();
    }
    initializeHandlers() {
        glEventHub.on('text-result', (data) => {
            if (data.key !== this.key) {
                return ;
            }
            console.log('BrowseManager.text-result', data.result, data.item);
            if (data.item && data.item.item && data.item.item) {
                this.setOptionsBrowser({
                    mime: data.item.item.mime
                });
            }
            this.activateBrowser('text', data.result);
        });
        glEventHub.on('json-result', (data) => {
            if (data.key !== this.key) {
                return ;
            }
            console.log('BrowseManager.json-result', data.result, data.item);
            this.activateBrowser('json', data.result);
        });
        glEventHub.on('diff-result', (data) => {
            if (data.key !== this.key) {
                return ;
            }
            console.log('BrowseManager.diff-result', data.result, data.item);
            this.activateBrowser('diff', data.result);
        });
        glEventHub.on('html-result', (data) => {
            if (data.key !== this.key) {
                return ;
            }
            console.log('BrowseManager.html-result', data.result, data.item);
            this.activateBrowser('html', data.result, data.item);
        });
    }
    setOptionsBrowser(options) {
        var i, i_items=Object.keys(this.browsers), i_len=Object.keys(this.browsers).length, k;
        for (i=0; i<i_len; i++) {
            k = Object.keys(this.browsers)[i];
            this.browsers[k].setOptions(options);
        }
    }
    activateBrowser(kind, value, item) {
        this.currentResult = value;
        if (this.activeBrowserKind !== kind) {
            var i, i_items=Object.keys(this.browsers), i_len=Object.keys(this.browsers).length, k;
            for (i=0; i<i_len; i++) {
                k = Object.keys(this.browsers)[i];
                this.browsers[k].deactivate();
            }
            this.browsers[kind].activate();
            this.activeBrowserKind = kind;
        }
        this.browsers[kind].value(value, item);
    }
    setFilePath(path) {
        wz.text(this.props.ittfBrowserTitle, path);
    }
}
class TextBrowserControl {
    constructor(options) {
        this.options = options || {};
        this.mime = options.mime;
    }
    initBrowser() {
        if (this.editor) {
            return ;
        }
        this.containerEl = document.querySelector('#' + this.options.browserContainerId);
        this.controlEl = document.querySelector('#' + this.options.browserControlId);
        this.editor = new AceEditor({
            theme: this.options.theme || 'github', 
            key: this.options.key || 'result-browser', 
            editorElementId: this.options.browserControlId
        });
        this.editor.initialize();
        this.editor.readOnly(true);
    }
    activate() {
        wz.show(this.containerEl);
    }
    deactivate() {
        wz.hide(this.containerEl);
    }
    setOptions(options) {
        if (this.editor) {
            if (options.mime && options.mime !== this.mime) {
                this.editor.setMime(options.mime);
                this.mime = options.mime;
            }
            if (options.theme && options.theme !== this.theme) {
                this.editor.setTheme(options.theme);
                this.theme = options.theme;
            }
        }
    }
    value(value) {
        if (this.editor) {
            if (typeof value === 'undefined') {
                return this.editor.getValue();
            }
            else {
                this.editor.setValue(value);
            }
        }
    }
}
class JsonBrowserControl {
    constructor(options) {
        this.options = options;
    }
    initBrowser() {
        this.containerEl = document.querySelector('#' + this.options.browserContainerId);
        this.controlEl = document.querySelector('#' + this.options.browserControlId);
        this.el = document.createElement('div');
        this.el.setAttribute('style', 'padding: 1rem;');
        this.controlEl.appendChild(this.el);
    }
    activate() {
        wz.show(this.containerEl);
    }
    deactivate() {
        wz.hide(this.containerEl);
    }
    setOptions(options) {
    }
    value(value) {
        var jsonFormatter = new JSONFormatter.default(value, 2, {
            hoverPreviewEnabled: true
        });
        wz.replaceChildren(this.el, jsonFormatter.render());
    }
}
class DiffBrowserControl {
    constructor(options) {
        this.options = options;
    }
    initBrowser() {
        this.containerEl = document.querySelector('#' + this.options.browserContainerId);
        this.controlEl = document.querySelector('#' + this.options.browserControlId);
        this.el = document.createElement('div');
        this.el.setAttribute('style', 'padding: 1rem;');
        this.controlEl.appendChild(this.el);
    }
    activate() {
        wz.show(this.containerEl);
    }
    deactivate() {
        wz.hide(this.containerEl);
    }
    setOptions(options) {
    }
    value(value) {
        function valFromPath(obj, path, index) {
            if (typeof index === 'undefined') {
                index = 0;
            }
            if (typeof obj === 'undefined') {
                return null;
            }
            console.log('value', obj, path, index, path[index], v);
            var v = obj[path[index]];
            if (index == path.length - 1) {
                return v;
            }
            else {
                return valFromPath( v, path, index+1 );
            }
        }
        var diff = DeepDiff(value.snippetAst, value.wizzifiedAst, (path, key) => {
            console.log('DiffBrowserControl', path, key);
            var l = valFromPath(value.snippedAst, path);
            var r = valFromPath(value.wizzifiedAst, path);
            return l && l[key] === 'CommentBlock' || r && r[key] === 'CommentBlock' || ['comments', 'leadingComments'].indexOf(key) > -1;
        });
        console.log('DiffBrowserControl.diff', diff);
        var jsonFormatter = new JSONFormatter.default(diff || 'no difference', 2, {
            hoverPreviewEnabled: true
        });
        wz.replaceChildren(this.el, jsonFormatter.render());
    }
}
class HtmlBrowserControl {
    constructor(options) {
        this.options = options;
    }
    initBrowser() {
        this.containerEl = document.querySelector('#' + this.options.browserContainerId);
        this.controlEl = document.querySelector('#' + this.options.browserControlId);
        this.el = document.createElement('iframe');
        this.el.setAttribute('class', 'result-iframe');
        this.controlEl.appendChild(this.el);
    }
    activate() {
        wz.show(this.containerEl);
    }
    deactivate() {
        wz.hide(this.containerEl);
    }
    setOptions(options) {
    }
    value(value, item) {
        if (item.mime === 'md') {
            marked.setOptions({
                highlight: function(code) {
                    console.log('highlight', code);
                    return hljs.highlightAuto(code).value;
                }
            });
            var html = [
                '<html><head>', 
                '<link href="/static/lib/marked/github.css" rel="stylesheet" />', 
                '<link href="/static/lib/highlight/styles/github.css" rel="stylesheet" />', 
                '</head><body>', 
                marked(value), 
                '</body></html>'
            ].join('\n');
            this.el.setAttribute('srcdoc', html);
        }
        else {
            this.el.setAttribute('srcdoc', value);
        }
    }
}
/**
     dependencies
     . g/js/wz/core.js.ittf
     . g/js/wz/standalone.js.ittf
     - canGen
     - canWizzify
*/
class ResultBar  extends  wz.EventTarget {
    constructor(props) {
        super();
        props = props || {};
        this.key = props.key || 'default';
        this.state = {};
        this.commandEls = {};
    }
    setState(state) {
        var i, i_items=Object.keys(state), i_len=Object.keys(state).length, k;
        for (i=0; i<i_len; i++) {
            k = Object.keys(state)[i];
            this.state[k] = state[k];
        }
        this.refresh();
    }
    refresh() {
        console.log('ResultBar.refresh', this.state);
        var toactivate = [];
        if (this.state.isIttf == true) {
            if (['wfjob', 'wfschema'].indexOf(this.state.schema) > -1) {
                toactivate.push('exec');
                toactivate.push('mtree');
                toactivate.push('debug');
            }
            else {
                wz.canGen(this.state.schema, (err, ok) => {
                    if (err) {
                        console.log('err', err);
                        throw err;
                    }
                    if (ok) {
                        toactivate.push('gen');
                        toactivate.push('mtree');
                        toactivate.push('debug');
                        if (['html', 'svg', 'md'].indexOf(this.state.schema) > -1) {
                            toactivate.push('view');
                        }
                    }
                    else {
                        toactivate.push('mtree');
                        toactivate.push('debug');
                    }
                });
            }
        }
        else if (wz.canWizzify(this.state.mime)) {
            if (['js', 'css'].indexOf(this.state.mime) > -1) {
                toactivate.push('wizzify');
                toactivate.push('ast');
                toactivate.push('diff');
            }
            else {
                toactivate.push('wizzify');
                toactivate.push('diff');
            }
        }
        this.setActives(toactivate);
    }
    setActives(commands) {
        var i, i_items=Object.keys(this.commandEls), i_len=Object.keys(this.commandEls).length, k;
        for (i=0; i<i_len; i++) {
            k = Object.keys(this.commandEls)[i];
            wz.hide(this.commandEls[k]);
        }
        var i, i_items=commands, i_len=commands.length, k;
        for (i=0; i<i_len; i++) {
            k = commands[i];
            wz.show(this.commandEls[k]);
        }
    }
    render() {
        var barEl = document.createElement('div');
        barEl.setAttribute('class', 'result-bar');
        barEl.appendChild(this.createCommand({
            name: 'gen', 
            label: 'gen'
        }));
        barEl.appendChild(this.createCommand({
            name: 'mtree', 
            label: 'mTree'
        }));
        barEl.appendChild(this.createCommand({
            name: 'debug', 
            label: 'debug'
        }));
        barEl.appendChild(this.createCommand({
            name: 'view', 
            label: 'view'
        }));
        barEl.appendChild(this.createCommand({
            name: 'wizzify', 
            label: 'wizzify'
        }));
        barEl.appendChild(this.createCommand({
            name: 'ast', 
            label: 'AST'
        }));
        barEl.appendChild(this.createCommand({
            name: 'diff', 
            label: 'diff'
        }));
        barEl.appendChild(this.createCommand({
            name: 'exec', 
            label: 'exec'
        }));
        return barEl;
    }
    createCommand(options) {
        var cmdEl = document.createElement('div');
        cmdEl.setAttribute('class', 'result-cmd');
        var cmdButton = document.createElement('button');
        cmdButton.setAttribute('class', 'result-cmd-btn');
        if (options.label) {
            cmdButton.textContent = options.label;
        }
        wz.click(cmdButton, () => {
            this.emit('command', options.name);
            glEventHub.emit('command', {
                key: this.key, 
                name: options.name
            });
        });
        cmdEl.style.display = 'none';
        cmdEl.appendChild(cmdButton);
        this.commandEls[options.name] = cmdEl;
        return cmdEl;
    }
}
var sampleTreeData = {
    name: 'ttech', 
    expanded: true, 
    isFolder: true, 
    path: '/ittf/demo/ttech', 
    children: [
        {
            name: 'javascript', 
            expanded: true, 
            isFolder: true, 
            path: '/ittf/demo/ttech/javascript', 
            children: [
                {
                    name: 'splitter.js.ittf', 
                    expanded: true, 
                    isFolder: false, 
                    path: '/ittf/demo/ttech/javascript/splitter.js.ittf', 
                    content: 'module\n\tjskind'
                }, 
                {
                    name: 'treeview.js.ittf', 
                    expanded: true, 
                    isFolder: false, 
                    path: '/ittf/demo/ttech/javascript/treeview.js.ittf', 
                    content: 'module\n\tjskind'
                }
            ]
        }, 
        {
            name: 'css', 
            expanded: true, 
            isFolder: true, 
            path: '/ittf/demo/ttech/css'
        }
    ]
};
/**
     dependencies
     . g/js/wz/standalone.js.ittf
     - wz.canGen
     - wz.mtree
     - wz.mtreeDebug
     - wz.gen
     - wz.wizziJob
     - wz.getCodeAST
     - wz.canWizzify
     - wz.wizzify
     - wz.genFromText
*/
class EditBrowseController {
    constructor(props) {
        this.key = props.key || 'default';
        this.ittfResultKind = props.ittfResultKind || 'gen';
        this.snippetResultKind = props.snippetResultKind || 'wizzify';
        this.selectedItem = null;
        this.timers = {};
        this.initialize();
    }
    initialize() {
        glEventHub.on('command', (options) => {
            if (options.key !== this.key) {
                return ;
            }
            var name = options.name;
            console.log('command name', name);
            if (['gen', 'mtree', 'debug', 'view', 'exec'].indexOf(name) > -1) {
                this.ittfResultKind = name;
                if (this.selectedItem != null) {
                    this.onEditValueChange(this.selectedItem, {
                        immediate: true
                    });
                }
            }
            else if (['wizzify', 'ast', 'diff'].indexOf(name) > -1) {
                this.snippetResultKind = name;
                if (this.selectedItem != null) {
                    this.onEditValueChange(this.selectedItem, {
                        immediate: true
                    });
                }
            }
        });
    }
    onEditValueChange(item, options) {
        /**
             { item
             boolean isIttfDocument
             boolean isFragment
             string schema
             string mime
             string content
        */
        /**
             { options
             boolean immediate
        */
        options = options || {};
        this.selectedItem = item;
        console.log('onEditValueChange', item, this.ittfResultKind);
        if (this.timers['gen']) {
            clearTimeout(this.timers['gen']);
            // log 'EditBrowseController.onEditValueChange. Cleared previous gen schedule.', new Date()
        }
        if (item == null) {
            return ;
        }
        if (item.isIttfDocument) {
            if (!item.isFragment) {
                if (this.ittfResultKind === 'gen') {
                    wz.canGen(item.schema, (err, ok) => {
                        if (err) {
                            console.log('err', err);
                            throw err;
                        }
                        if (ok) {
                            if (options.immediate) {
                                this.generate(item);
                            }
                            else {
                                this.timers['gen'] = setTimeout(() =>
                                    this.generate(item), 2 * 1500);
                            }
                        }
                        else {
                            glEventHub.emit('splash-hide', {
                                key: 'result-splash'
                            });
                            wz.mtree(item.path, (err, result) => {
                                if (err) {
                                    glEventHub.emit('json-result', {
                                        key: this.key, 
                                        err: err, 
                                        item: item
                                    });
                                }
                                else {
                                    glEventHub.emit('text-result', {
                                        key: this.key, 
                                        result: result.toIttf(), 
                                        item: item
                                    });
                                }
                            });
                        }
                    });
                }
                else if (this.ittfResultKind === 'mtree') {
                    glEventHub.emit('splash-hide', {
                        key: 'result-splash'
                    });
                    wz.mtree(item.path, (err, result) => {
                        if (err) {
                            glEventHub.emit('json-result', {
                                key: this.key, 
                                err: err, 
                                item: item
                            });
                        }
                        else {
                            glEventHub.emit('text-result', {
                                key: this.key, 
                                result: result.toIttf(), 
                                item: item
                            });
                        }
                    });
                }
                else if (this.ittfResultKind === 'debug') {
                    glEventHub.emit('splash-hide', {
                        key: 'result-splash'
                    });
                    wz.mtreeDebug(item.path, (err, result) => {
                        if (err) {
                            glEventHub.emit('json-result', {
                                key: this.key, 
                                err: err, 
                                item: item
                            });
                        }
                        else {
                            glEventHub.emit('text-result', {
                                key: this.key, 
                                result: result.mTreeBuildUpScript, 
                                item: item
                            });
                        }
                    });
                }
                else if (this.ittfResultKind === 'view') {
                    glEventHub.emit('splash-hide', {
                        key: 'result-splash'
                    });
                    if (options.immediate) {
                        wz.gen(item.path, (err, result) => {
                            if (err) {
                                glEventHub.emit('json-result', {
                                    key: this.key, 
                                    err: err, 
                                    item: item
                                });
                            }
                            else {
                                glEventHub.emit('html-result', {
                                    key: this.key, 
                                    result: result, 
                                    item: item
                                });
                            }
                        });
                    }
                    else {
                        this.timers['gen'] = setTimeout(() =>
                            wz.gen(item.path, (err, result) => {
                                if (err) {
                                    glEventHub.emit('json-result', {
                                        key: this.key, 
                                        err: err, 
                                        item: item
                                    });
                                }
                                else {
                                    glEventHub.emit('html-result', {
                                        key: this.key, 
                                        result: result, 
                                        item: item
                                    });
                                }
                            }), 2 * 1000);
                    }
                }
                else if (this.ittfResultKind === 'exec') {
                    glEventHub.emit('splash-hide', {
                        key: 'result-splash'
                    });
                    wz.wizziJob(item.path, (err, result) => {
                        if (err) {
                            glEventHub.emit('json-result', {
                                key: this.key, 
                                err: err, 
                                item: item
                            });
                        }
                        else {
                            glEventHub.emit('json-result', {
                                key: this.key, 
                                result: result, 
                                item: item
                            });
                        }
                    });
                }
                else {
                    glEventHub.emit('splash-show', {
                        key: 'result-splash'
                    });
                }
            }
            else {
                glEventHub.emit('splash-show', {
                    key: 'result-splash'
                });
            }
        }
        else {
            if (this.snippetResultKind === 'ast') {
                glEventHub.emit('splash-hide', {
                    key: 'result-splash'
                });
                wz.getCodeAST(item.mime, item.content, (err, result) => {
                    if (err) {
                        glEventHub.emit('json-result', {
                            key: this.key, 
                            err: err, 
                            item: item
                        });
                    }
                    else {
                        glEventHub.emit('json-result', {
                            key: this.key, 
                            result: result, 
                            item: item
                        });
                    }
                });
            }
            else if (this.snippetResultKind === 'diff') {
                glEventHub.emit('splash-hide', {
                    key: 'result-splash'
                });
                var result = {};
                wz.getCodeAST(item.mime, item.content, (err, ast1) => {
                    if (err) {
                        glEventHub.emit('json-result', {
                            key: this.key, 
                            err: err, 
                            item: item
                        });
                    }
                    else {
                        result.snippetAst = ast1;
                        wz.wizzify(item.mime, item.content, (err, wizzified1) => {
                            if (err) {
                                glEventHub.emit('json-result', {
                                    key: this.key, 
                                    err: err, 
                                    item: item
                                });
                            }
                            else {
                                wz.genFromText(wizzified1, {
                                    schema: item.mime, 
                                    artifactContext: {
                                        noUseStrict: true, 
                                        noGeneratorComments: true
                                    }
                                }, (err, artifactText) => {
                                    if (err) {
                                        glEventHub.emit('json-result', {
                                            key: this.key, 
                                            err: err, 
                                            item: item
                                        });
                                    }
                                    else {
                                        wz.getCodeAST(item.mime, artifactText, (err, ast2) => {
                                            if (err) {
                                                glEventHub.emit('json-result', {
                                                    key: this.key, 
                                                    err: err, 
                                                    item: item
                                                });
                                            }
                                            else {
                                                result.wizzifiedAst = ast2;
                                                glEventHub.emit('diff-result', {
                                                    key: this.key, 
                                                    result: result, 
                                                    item: item
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
            else if (this.snippetResultKind === 'wizzify' && wz.canWizzify(item.mime)) {
                glEventHub.emit('splash-hide', {
                    key: 'result-splash'
                });
                wz.wizzify(item.mime, item.content, (err, result) => {
                    if (err) {
                        glEventHub.emit('json-result', {
                            key: this.key, 
                            err: err, 
                            item: item
                        });
                    }
                    else {
                        glEventHub.emit('text-result', {
                            key: this.key, 
                            result: result, 
                            item: item
                        });
                    }
                });
            }
            else {
                glEventHub.emit('splash-show', {
                    key: 'result-splash'
                });
            }
        }
    }
    generate(item) {
        glEventHub.emit('splash-hide', {
            key: 'result-splash'
        });
        wz.gen(item.path, (err, result) => {
            if (err) {
                glEventHub.emit('json-result', {
                    key: this.key, 
                    err: err, 
                    item: item
                });
            }
            else {
                glEventHub.emit('text-result', {
                    key: this.key, 
                    result: result, 
                    item: item
                });
            }
        });
        // log 'EditBrowseController.generate. gen executed.', new Date()
    }
}
let glEventHub = new EventEmitter3();
window.glEventHub = glEventHub;
window.path = wz.utils.path;
async function prompt(text) {
    if (typeof text === 'string') {
        return Swal({
                text, 
                input: 'text', 
                useRejections: true
            });
    }
    else {
        if (typeof text === 'object') {
            if (text.input === undefined) {
                text.input = 'text';
            }
            text.useRejections = true;
            return Swal(text);
        }
    }
}
var app = new AppManager({
    rootFolder: '/ixdb', 
    formsContainerId: 'forms-container'
});
app.start();
