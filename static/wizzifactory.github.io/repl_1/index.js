/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\dist\server\ittf\demo\ttech\wizzi\play\repl_1\index.js.ittf
    utc time: Thu, 17 Jan 2019 13:21:05 GMT
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
class LocalStorage {
    constructor(keyprefix) {
        this.keyprefix = keyprefix;
    }
    k(key) {
        return this.keyprefix + '.' + key;
    }
    get(key, defaultValue, setDefault) {
        key = this.k(key);
        var ret = localStorage.getItem(key);
        if (ret === null) {
            if (typeof defaultValue !== 'undefined') {
                ret = defaultValue;
                if (setDefault) {
                    localStorage[key] = defaultValue;
                }
            }
        }
        try {
            ret = JSON.parse(ret);
            return ret;
        } 
        catch (ex) {
        } 
        return ret;
    }
    set(key, value) {
        key = this.k(key);
        value = typeof value === 'undefined' ? null : value;
        if (value === null) {
            localStorage[key] = value;
        }
        else {
            localStorage[key] = JSON.stringify(value);
        }
        return value;
    }
    append(key, value) {
        key = this.k(key);
        var s = this.get(key, '', true);
        this.set(key, s + value);
    }
    replace(key, search, replace) {
        key = this.k(key);
        var value = this.get(key);
        if (typeof value === 'string') {
            this.set(key, value.replace(search, replace));
        }
    }
    remove(key) {
        key = this.k(key);
        localStorage.removeItem(key);
    }
    isTrue(key, value) {
        key = this.k(key);
        if (typeof value === 'undefined') {
            return this.get(key) === 'true';
        }
        else {
            this.set(key, value ? 'true' : 'false');
        }
    }
    float(key, value) {
        key = this.k(key);
        if (typeof value === 'undefined') {
            return parseFloat(this.get(key));
        }
        else {
            this.set(key, value);
        }
    }
    increment(key) {
        key = this.k(key);
        value = this.get(key, "0", true);
        value = parseFloat(value) + 1;
        this.set(key, value);
    }
    unique(collectionName, propertyName, baseValue) {
        var items = this.get(collectionName);
        var item = this._find(items, propertyName, baseValue);
        if (item === null) {
            return baseValue;
        }
        else {
            var n = 1;
            while (item !== null) {
                n++;
                item = this._find(items, propertyName, baseValue + n);
            }
            return baseValue + n;
        }
    }
    _find(collection, propertyName, value) {
        var i, i_items=collection, i_len=collection.length, item;
        for (i=0; i<i_len; i++) {
            item = collection[i];
            if (item[propertyName] === value) {
                return item;
            }
        }
        return null;
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
class SplashControl {
    constructor(props) {
        this.props = props;
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
var initialSnippets = {
    js: 'function hello(name) { console.log("hello"); }', 
    html: '<html><head></head><body></body></html>', 
    css: 'body { margin:0 }'
};
var initialIttfs = {
    js: 'module\n\tkind react\n\treact Mycomponent', 
    html: 'html\n\thead\n\tbody\n\t\th1 hello world', 
    css: 'css\n\t< body\n\t\tmargin 0'
};
class AppManager {
    constructor(props) {
        this.props = props;
        this.store = null;
        this.timers = {};
    }
    start() {
        this.dataManager = new DataManager({});
        this.treeManager = new TreeManager({});
        this.initStore();
        this.createEditors();
        this.setEvents();
        this.createOptions();
    }
    initStore() {
        this.store = new LocalStorage('wizzify');
        if (!this.store.get('lastSchema')) {
            this.store.set('lastSchema', 'js');
        }
    }
    createOptions() {
        this.selectedSchema = this.store.get('lastSchema');
        wz.value('selectedSchema', this.selectedSchema);
        // _ this.setIttfContentFromStore
        // _ this.setSnippetContentFromStore
        wz.change('selectedSchema', () => {
            console.log('onChangeSchema', event.target.value);
            this.selectedSchema = event.target.value;
            glEventHub.emit('schema-selected', {
                name: this.selectedSchema
            });
            this.store.set('lastSchema', this.selectedSchema);
            // _ this.setIttfContentFromStore
            // _ this.setSnippetContentFromStore
        });
        glEventHub.emit('schema-selected', {
            name: this.selectedSchema
        });
        wz.show('selectedSchema');
    }
    setIttfContentFromStore() {
        var content = this.store.get(this.selectedSchema + '_ittf_content', initialIttfs[this.selectedSchema] || this.selectedSchema, true);
        glEventHub.emit('seteditvalue', {
            key: 'gen-ittf', 
            value: content
        });
    }
    setSnippetContentFromStore() {
        var content = this.store.get(this.selectedSchema + '_snippet_content', initialSnippets[this.selectedSchema] || this.selectedSchema, true);
        glEventHub.emit('seteditvalue', {
            key: 'snippet-source', 
            value: content
        });
    }
    createEditors() {
        this.genIttfEditor = new EditorControl({
            key: 'gen-ittf', 
            elementId: 'gen-ittf-editor'
        });
        this.genIttfEditor.initialize();
        this.genResultEditor = new EditorControl({
            key: 'gen-result', 
            elementId: 'gen-result-editor', 
            readOnly: true
        });
        this.genResultEditor.initialize();
        this.snippetSourceEditor = new EditorControl({
            key: 'snippet-source', 
            elementId: 'snippet-source-editor'
        });
        this.snippetSourceEditor.initialize();
        this.snippetResultEditor = new EditorControl({
            key: 'snippet-result', 
            elementId: 'snippet-result-editor', 
            readOnly: true
        });
        this.snippetResultEditor.initialize();
    }
    setEvents() {
        glEventHub.on('editvaluechanged', (data) => {
            console.log('on editvaluechanged', data);
            var key = data.key;
            var value = data.value;
            var defer = data.defer;
            var elapse = data.defer ? 2 * 1500 : 100;
            if (key === 'gen-ittf') {
                if (this.timers['gen']) {
                    clearTimeout(this.timers['gen']);
                }
                this.timers['gen'] = setTimeout(() =>
                    this.generate(value), elapse);
                this.store.set(this.selectedSchema + '_ittf_content', value);
            }
            else if (key === 'snippet-source') {
                if (this.timers['wizzify']) {
                    clearTimeout(this.timers['wizzify']);
                }
                this.timers['wizzify'] = setTimeout(() =>
                    this.wizzify(value), elapse);
                this.store.set(this.selectedSchema + '_snippet_content', value);
            }
        });
    }
    generate(value) {
        wz.genFromText(value, {
            schema: this.selectedSchema || 'js'
        }, (err, result) => {
            if (err) {
                glEventHub.emit('seteditvalue', {
                    key: 'gen-result', 
                    value: JSON.stringify(err, null, 2)
                });
            }
            else {
                glEventHub.emit('artifactgenerated', {
                    content: result
                });
                glEventHub.emit('seteditvalue', {
                    key: 'gen-result', 
                    value: result
                });
            }
        });
    }
    wizzify(value) {
        wz.wizzify(this.selectedSchema || 'js', value, (err, result) => {
            if (err) {
                glEventHub.emit('seteditvalue', {
                    key: 'snippet-result', 
                    value: JSON.stringify(err, null, 2)
                });
            }
            else {
                glEventHub.emit('artifactwizzified', {
                    content: result
                });
                glEventHub.emit('seteditvalue', {
                    key: 'snippet-result', 
                    value: result
                });
            }
        });
    }
}
class DataManager {
    constructor(props) {
        this.props = props;
        this.schemaDatas = {};
        this.selectedSchema = null;
        this.initialize();
    }
    initialize() {
        glEventHub.on('schema-selected', (data) => {
            console.log('on schema-selected', data);
            this.selectedSchema = data.name;
            this.getSchemaData(data.name);
        });
        glEventHub.on('select-tree-node', (data) => {
            console.log('on select-tree-node', data);
            if (data.treeNode.item.isFolder) {
                return ;
            }
            var item = this.schemaDatas[this.selectedSchema].itemsDict[data.treeNode.item.id];
            glEventHub.emit('seteditvalue', {
                key: 'gen-ittf', 
                value: wz.replace(item.ittfWrapped, '\\n', '\n')
            });
            glEventHub.emit('editvaluechanged', {
                key: 'gen-ittf', 
                value: wz.replace(item.ittfWrapped, '\\n', '\n')
            });
            glEventHub.emit('seteditvalue', {
                key: 'snippet-source', 
                value: wz.unescapeHtml(wz.replace(item.generated, '\\n', '\n'))
            });
            glEventHub.emit('editvaluechanged', {
                key: 'snippet-source', 
                value: wz.unescapeHtml(wz.replace(item.generated, '\\n', '\n'))
            });
        });
    }
    getSchemaData(name) {
        if (this.schemaDatas[name]) {
            glEventHub.emit('schema-selected-ready', {
                name: name, 
                data: this.schemaDatas[name]
            });
        }
        else {
            fetch('https://wizzifactory.github.io/cheatsheets/' + name + '.json').then((response) => {
                return response.json();
            }).then((json) => {
                json = this.setIds(json);
                this.schemaDatas[name] = json;
                glEventHub.emit('schema-selected-ready', {
                    name: name, 
                    json: json
                });
            }).catch((err) => {
                // FIXME
                console.log('getSchemaData error', err);
            })
        }
    }
    setIds(json) {
        json.itemsDict = {};
        var c = 1;
        var i, i_items=json.elements, i_len=json.elements.length, e;
        for (i=0; i<i_len; i++) {
            e = json.elements[i];
            var j, j_items=e.items, j_len=e.items.length, item;
            for (j=0; j<j_len; j++) {
                item = e.items[j];
                item.id = 'k' + c++;
                json.itemsDict[item.id] = item;
            }
        }
        return json;
    }
}
class TreeManager {
    constructor(props) {
        this.props = props;
        this.schemaTreeViews = {};
        this.initialize();
    }
    initialize() {
        glEventHub.on('schema-selected-ready', (data) => {
            console.log('on schema-selected-ready', data);
            this.getSchemaTreeView(data.name, data.json);
        });
    }
    getSchemaTreeView(name, json) {
        if (this.schemaTreeViews[name]) {
            wz.replaceChildren('items-tree-view', this.schemaTreeViews[name]);
        }
        else {
            var treeView = new TreeView({
                app: this, 
                filesystem: null, 
                formsContainerId: null
            });
            treeView.render(jsonToItemTree(name, json), (err, element) => {
                if (err) {
                    console.log('err', err);
                    throw err;
                }
                console.log('treeView.render', element);
                this.schemaTreeViews[name] = element;
                wz.replaceChildren('items-tree-view', element);
            });
        }
    }
}
function jsonToItemTree(schemaName, json) {
    var root = {
        name: schemaName, 
        isFolder: true, 
        expanded: true, 
        children: [
            
        ]
    };
    var i, i_items=json.elements, i_len=json.elements.length, e;
    for (i=0; i<i_len; i++) {
        e = json.elements[i];
        var item = {
            name: e.name, 
            isFolder: true, 
            expanded: true, 
            children: [
                
            ]
        };
        root.children.push(item);
        var j, j_items=e.items, j_len=e.items.length, e2;
        for (j=0; j<j_len; j++) {
            e2 = e.items[j];
            var item2 = {
                name: e2.title, 
                id: e2.id, 
                isFolder: false, 
                children: [
                    
                ]
            };
            item.children.push(item2);
        }
    }
    return root;
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
function initHandlers() {
    currentSchema = store.get('lastSchema');
    wz.value('selectedSchema', currentSchema);
    currentEditContent = store.get(currentSchema + '_content', currentSchema, true);
    editor.value(currentEditContent);
    wizzify();
    wz.change('selectedSchema', () => {
        console.log('onChangeSchema', event.target.value);
        currentSchema = event.target.value;
        store.set('lastSchema', currentSchema);
        currentEditContent = store.get(currentSchema + '_content', currentSchema, true);
        editor.value(currentEditContent);
        wizzify();
    });
}
var app = new AppManager({});
app.start();
