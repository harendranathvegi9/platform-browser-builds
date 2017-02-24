/**
 * @license Angular v4.0.0-beta.8-41da599
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
import { PlatformLocation, ɵPLATFORM_BROWSER_ID, CommonModule } from '@angular/common';
import { PLATFORM_INITIALIZER, PLATFORM_ID, Sanitizer, platformCore, createPlatformFactory, ErrorHandler, APP_ID, ApplicationModule, Testability, RendererFactoryV2, RootRenderer, NgModule, SkipSelf, Optional, ɵNoOpAnimationPlayer, AUTO_STYLE, Injectable, Inject, InjectionToken, APP_INITIALIZER, setTestabilityGetter, ViewEncapsulation, NgZone, SecurityContext, isDevMode, ApplicationRef, Version } from '@angular/core';
import * as core from '@angular/core';

/**
 * \@experimental
 */
class NoOpAnimationDriver {
    /**
     * @param {?} element
     * @param {?} startingStyles
     * @param {?} keyframes
     * @param {?} duration
     * @param {?} delay
     * @param {?} easing
     * @param {?=} previousPlayers
     * @return {?}
     */
    animate(element, startingStyles, keyframes, duration, delay, easing, previousPlayers = []) {
        return new ɵNoOpAnimationPlayer();
    }
}
/**
 * \@experimental
 * @abstract
 */
class AnimationDriver {
    /**
     * @abstract
     * @param {?} element
     * @param {?} startingStyles
     * @param {?} keyframes
     * @param {?} duration
     * @param {?} delay
     * @param {?} easing
     * @param {?=} previousPlayers
     * @return {?}
     */
    animate(element, startingStyles, keyframes, duration, delay, easing, previousPlayers) { }
}
AnimationDriver.NOOP = new NoOpAnimationDriver();

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let /** @type {?} */ globalScope;
if (typeof window === 'undefined') {
    if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
        // TODO: Replace any with WorkerGlobalScope from lib.webworker.d.ts #3492
        globalScope = (self);
    }
    else {
        globalScope = (global);
    }
}
else {
    globalScope = (window);
}
// Need to declare a new variable for global here since TypeScript
// exports the original value of the symbol.
const /** @type {?} */ global$1 = globalScope;
// TODO: remove calls to assert in production environment
// Note: Can't just export this and import in in other files
// as `assert` is a reserved keyword in Dart
global$1.assert = function assert(condition) {
    // TODO: to be fixed properly via #2830, noop for now
};
/**
 * @param {?} obj
 * @return {?}
 */
function isPresent(obj) {
    return obj != null;
}
/**
 * @param {?} obj
 * @return {?}
 */
function isBlank(obj) {
    return obj == null;
}
/**
 * @param {?} token
 * @return {?}
 */
function stringify(token) {
    if (typeof token === 'string') {
        return token;
    }
    if (token == null) {
        return '' + token;
    }
    if (token.overriddenName) {
        return `${token.overriddenName}`;
    }
    if (token.name) {
        return `${token.name}`;
    }
    const /** @type {?} */ res = token.toString();
    const /** @type {?} */ newLineIndex = res.indexOf('\n');
    return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
}
/**
 * @param {?} global
 * @param {?} path
 * @param {?} value
 * @return {?}
 */
function setValueOnPath(global, path, value) {
    const /** @type {?} */ parts = path.split('.');
    let /** @type {?} */ obj = global;
    while (parts.length > 1) {
        const /** @type {?} */ name = parts.shift();
        if (obj.hasOwnProperty(name) && obj[name] != null) {
            obj = obj[name];
        }
        else {
            obj = obj[name] = {};
        }
    }
    if (obj === undefined || obj === null) {
        obj = {};
    }
    obj[parts.shift()] = value;
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let /** @type {?} */ _DOM = null;
/**
 * @return {?}
 */
function getDOM() {
    return _DOM;
}
/**
 * @param {?} adapter
 * @return {?}
 */
function setRootDomAdapter(adapter) {
    if (!_DOM) {
        _DOM = adapter;
    }
}
/**
 * Provides DOM operations in an environment-agnostic way.
 *
 * \@security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 * @abstract
 */
class DomAdapter {
    constructor() {
        this.resourceLoaderType = null;
    }
    /**
     * @abstract
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    hasProperty(element, name) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(el, name, value) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    getProperty(el, name) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    invoke(el, methodName, args) { }
    /**
     * @abstract
     * @param {?} error
     * @return {?}
     */
    logError(error) { }
    /**
     * @abstract
     * @param {?} error
     * @return {?}
     */
    log(error) { }
    /**
     * @abstract
     * @param {?} error
     * @return {?}
     */
    logGroup(error) { }
    /**
     * @abstract
     * @return {?}
     */
    logGroupEnd() { }
    /**
     * Maps attribute names to their corresponding property names for cases
     * where attribute name doesn't match property name.
     * @return {?}
     */
    get attrToPropMap() { return this._attrToPropMap; }
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    set attrToPropMap(value) { this._attrToPropMap = value; }
    ;
    /**
     * @abstract
     * @param {?} templateHtml
     * @return {?}
     */
    parse(templateHtml) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    querySelector(el, selector) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    querySelectorAll(el, selector) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    on(el, evt, listener) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    onAndCancel(el, evt, listener) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    dispatchEvent(el, evt) { }
    /**
     * @abstract
     * @param {?} eventType
     * @return {?}
     */
    createMouseEvent(eventType) { }
    /**
     * @abstract
     * @param {?} eventType
     * @return {?}
     */
    createEvent(eventType) { }
    /**
     * @abstract
     * @param {?} evt
     * @return {?}
     */
    preventDefault(evt) { }
    /**
     * @abstract
     * @param {?} evt
     * @return {?}
     */
    isPrevented(evt) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    getInnerHTML(el) { }
    /**
     * Returns content if el is a <template> element, null otherwise.
     * @abstract
     * @param {?} el
     * @return {?}
     */
    getTemplateContent(el) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    getOuterHTML(el) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    nodeName(node) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    nodeValue(node) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    type(node) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    content(node) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    firstChild(el) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    nextSibling(el) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    parentElement(el) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    childNodes(el) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    childNodesAsList(el) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    clearNodes(el) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    appendChild(el, node) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    removeChild(el, node) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} newNode
     * @param {?} oldNode
     * @return {?}
     */
    replaceChild(el, newNode, oldNode) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    remove(el) { }
    /**
     * @abstract
     * @param {?} parent
     * @param {?} ref
     * @param {?} node
     * @return {?}
     */
    insertBefore(parent, ref, node) { }
    /**
     * @abstract
     * @param {?} parent
     * @param {?} ref
     * @param {?} nodes
     * @return {?}
     */
    insertAllBefore(parent, ref, nodes) { }
    /**
     * @abstract
     * @param {?} parent
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    insertAfter(parent, el, node) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setInnerHTML(el, value) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    getText(el) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setText(el, value) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    getValue(el) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setValue(el, value) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    getChecked(el) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setChecked(el, value) { }
    /**
     * @abstract
     * @param {?} text
     * @return {?}
     */
    createComment(text) { }
    /**
     * @abstract
     * @param {?} html
     * @return {?}
     */
    createTemplate(html) { }
    /**
     * @abstract
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    createElement(tagName, doc) { }
    /**
     * @abstract
     * @param {?} ns
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    createElementNS(ns, tagName, doc) { }
    /**
     * @abstract
     * @param {?} text
     * @param {?=} doc
     * @return {?}
     */
    createTextNode(text, doc) { }
    /**
     * @abstract
     * @param {?} attrName
     * @param {?} attrValue
     * @param {?=} doc
     * @return {?}
     */
    createScriptTag(attrName, attrValue, doc) { }
    /**
     * @abstract
     * @param {?} css
     * @param {?=} doc
     * @return {?}
     */
    createStyleElement(css, doc) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    createShadowRoot(el) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    getShadowRoot(el) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    getHost(el) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    getDistributedNodes(el) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    clone /*<T extends Node>*/(node) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getElementsByClassName(element, name) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getElementsByTagName(element, name) { }
    /**
     * @abstract
     * @param {?} element
     * @return {?}
     */
    classList(element) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    addClass(element, className) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    removeClass(element, className) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    hasClass(element, className) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    setStyle(element, styleName, styleValue) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    removeStyle(element, styleName) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    getStyle(element, styleName) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    hasStyle(element, styleName, styleValue) { }
    /**
     * @abstract
     * @param {?} element
     * @return {?}
     */
    tagName(element) { }
    /**
     * @abstract
     * @param {?} element
     * @return {?}
     */
    attributeMap(element) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    hasAttribute(element, attribute) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    hasAttributeNS(element, ns, attribute) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    getAttribute(element, attribute) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    getAttributeNS(element, ns, attribute) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttribute(element, name, value) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttributeNS(element, ns, name, value) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    removeAttribute(element, attribute) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    removeAttributeNS(element, ns, attribute) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    templateAwareRoot(el) { }
    /**
     * @abstract
     * @return {?}
     */
    createHtmlDocument() { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    getBoundingClientRect(el) { }
    /**
     * @abstract
     * @param {?} doc
     * @return {?}
     */
    getTitle(doc) { }
    /**
     * @abstract
     * @param {?} doc
     * @param {?} newTitle
     * @return {?}
     */
    setTitle(doc, newTitle) { }
    /**
     * @abstract
     * @param {?} n
     * @param {?} selector
     * @return {?}
     */
    elementMatches(n, selector) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    isTemplateElement(el) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    isTextNode(node) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    isCommentNode(node) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    isElementNode(node) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    hasShadowRoot(node) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    isShadowRoot(node) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    importIntoDoc /*<T extends Node>*/(node) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    adoptNode /*<T extends Node>*/(node) { }
    /**
     * @abstract
     * @param {?} element
     * @return {?}
     */
    getHref(element) { }
    /**
     * @abstract
     * @param {?} event
     * @return {?}
     */
    getEventKey(event) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} baseUrl
     * @param {?} href
     * @return {?}
     */
    resolveAndSetHref(element, baseUrl, href) { }
    /**
     * @abstract
     * @return {?}
     */
    supportsDOMEvents() { }
    /**
     * @abstract
     * @return {?}
     */
    supportsNativeShadowDOM() { }
    /**
     * @abstract
     * @param {?} doc
     * @param {?} target
     * @return {?}
     */
    getGlobalEventTarget(doc, target) { }
    /**
     * @abstract
     * @return {?}
     */
    getHistory() { }
    /**
     * @abstract
     * @return {?}
     */
    getLocation() { }
    /**
     * @abstract
     * @param {?} doc
     * @return {?}
     */
    getBaseHref(doc) { }
    /**
     * @abstract
     * @return {?}
     */
    resetBaseElement() { }
    /**
     * @abstract
     * @return {?}
     */
    getUserAgent() { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setData(element, name, value) { }
    /**
     * @abstract
     * @param {?} element
     * @return {?}
     */
    getComputedStyle(element) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getData(element, name) { }
    /**
     * @abstract
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setGlobalVar(name, value) { }
    /**
     * @abstract
     * @return {?}
     */
    supportsWebAnimation() { }
    /**
     * @abstract
     * @return {?}
     */
    performanceNow() { }
    /**
     * @abstract
     * @return {?}
     */
    getAnimationPrefix() { }
    /**
     * @abstract
     * @return {?}
     */
    getTransitionEnd() { }
    /**
     * @abstract
     * @return {?}
     */
    supportsAnimation() { }
    /**
     * @abstract
     * @return {?}
     */
    supportsCookies() { }
    /**
     * @abstract
     * @param {?} name
     * @return {?}
     */
    getCookie(name) { }
    /**
     * @abstract
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setCookie(name, value) { }
}

class WebAnimationsPlayer {
    /**
     * @param {?} element
     * @param {?} keyframes
     * @param {?} options
     * @param {?=} previousPlayers
     */
    constructor(element, keyframes, options, previousPlayers = []) {
        this.element = element;
        this.keyframes = keyframes;
        this.options = options;
        this._onDoneFns = [];
        this._onStartFns = [];
        this._onDestroyFns = [];
        this._initialized = false;
        this._finished = false;
        this._started = false;
        this._destroyed = false;
        this.parentPlayer = null;
        this._duration = options['duration'];
        this.previousStyles = {};
        previousPlayers.forEach(player => {
            let styles = player._captureStyles();
            Object.keys(styles).forEach(prop => this.previousStyles[prop] = styles[prop]);
        });
    }
    /**
     * @return {?}
     */
    _onFinish() {
        if (!this._finished) {
            this._finished = true;
            this._onDoneFns.forEach(fn => fn());
            this._onDoneFns = [];
        }
    }
    /**
     * @return {?}
     */
    init() {
        if (this._initialized)
            return;
        this._initialized = true;
        const /** @type {?} */ keyframes = this.keyframes.map(styles => {
            const /** @type {?} */ formattedKeyframe = {};
            Object.keys(styles).forEach((prop, index) => {
                let /** @type {?} */ value = styles[prop];
                if (value == AUTO_STYLE) {
                    value = _computeStyle(this.element, prop);
                }
                if (value != undefined) {
                    formattedKeyframe[prop] = value;
                }
            });
            return formattedKeyframe;
        });
        const /** @type {?} */ previousStyleProps = Object.keys(this.previousStyles);
        if (previousStyleProps.length) {
            let /** @type {?} */ startingKeyframe = keyframes[0];
            let /** @type {?} */ missingStyleProps = [];
            previousStyleProps.forEach(prop => {
                if (!isPresent(startingKeyframe[prop])) {
                    missingStyleProps.push(prop);
                }
                startingKeyframe[prop] = this.previousStyles[prop];
            });
            if (missingStyleProps.length) {
                const /** @type {?} */ self = this;
                // tslint:disable-next-line
                for (var /** @type {?} */ i = 1; i < keyframes.length; i++) {
                    let /** @type {?} */ kf = keyframes[i];
                    // tslint:disable-next-line
                    missingStyleProps.forEach(function (prop) {
                        kf[prop] = _computeStyle(self.element, prop);
                    });
                }
            }
        }
        this._player = this._triggerWebAnimation(this.element, keyframes, this.options);
        this._finalKeyframe = _copyKeyframeStyles(keyframes[keyframes.length - 1]);
        // this is required so that the player doesn't start to animate right away
        this._resetDomPlayerState();
        this._player.addEventListener('finish', () => this._onFinish());
    }
    /**
     * \@internal
     * @param {?} element
     * @param {?} keyframes
     * @param {?} options
     * @return {?}
     */
    _triggerWebAnimation(element, keyframes, options) {
        // jscompiler doesn't seem to know animate is a native property because it's not fully
        // supported yet across common browsers (we polyfill it for Edge/Safari) [CL #143630929]
        return (element['animate'](keyframes, options));
    }
    /**
     * @return {?}
     */
    get domPlayer() { return this._player; }
    /**
     * @param {?} fn
     * @return {?}
     */
    onStart(fn) { this._onStartFns.push(fn); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onDone(fn) { this._onDoneFns.push(fn); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onDestroy(fn) { this._onDestroyFns.push(fn); }
    /**
     * @return {?}
     */
    play() {
        this.init();
        if (!this.hasStarted()) {
            this._onStartFns.forEach(fn => fn());
            this._onStartFns = [];
            this._started = true;
        }
        this._player.play();
    }
    /**
     * @return {?}
     */
    pause() {
        this.init();
        this._player.pause();
    }
    /**
     * @return {?}
     */
    finish() {
        this.init();
        this._onFinish();
        this._player.finish();
    }
    /**
     * @return {?}
     */
    reset() {
        this._resetDomPlayerState();
        this._destroyed = false;
        this._finished = false;
        this._started = false;
    }
    /**
     * @return {?}
     */
    _resetDomPlayerState() {
        if (this._player) {
            this._player.cancel();
        }
    }
    /**
     * @return {?}
     */
    restart() {
        this.reset();
        this.play();
    }
    /**
     * @return {?}
     */
    hasStarted() { return this._started; }
    /**
     * @return {?}
     */
    destroy() {
        if (!this._destroyed) {
            this._resetDomPlayerState();
            this._onFinish();
            this._destroyed = true;
            this._onDestroyFns.forEach(fn => fn());
            this._onDestroyFns = [];
        }
    }
    /**
     * @return {?}
     */
    get totalTime() { return this._duration; }
    /**
     * @param {?} p
     * @return {?}
     */
    setPosition(p) { this._player.currentTime = p * this.totalTime; }
    /**
     * @return {?}
     */
    getPosition() { return this._player.currentTime / this.totalTime; }
    /**
     * @return {?}
     */
    _captureStyles() {
        const /** @type {?} */ styles = {};
        if (this.hasStarted()) {
            Object.keys(this._finalKeyframe).forEach(prop => {
                if (prop != 'offset') {
                    styles[prop] =
                        this._finished ? this._finalKeyframe[prop] : _computeStyle(this.element, prop);
                }
            });
        }
        return styles;
    }
}
/**
 * @param {?} element
 * @param {?} prop
 * @return {?}
 */
function _computeStyle(element, prop) {
    return getDOM().getComputedStyle(element)[prop];
}
/**
 * @param {?} styles
 * @return {?}
 */
function _copyKeyframeStyles(styles) {
    const /** @type {?} */ newStyles = {};
    Object.keys(styles).forEach(prop => {
        if (prop != 'offset') {
            newStyles[prop] = styles[prop];
        }
    });
    return newStyles;
}

class WebAnimationsDriver {
    /**
     * @param {?} element
     * @param {?} startingStyles
     * @param {?} keyframes
     * @param {?} duration
     * @param {?} delay
     * @param {?} easing
     * @param {?=} previousPlayers
     * @return {?}
     */
    animate(element, startingStyles, keyframes, duration, delay, easing, previousPlayers = []) {
        let /** @type {?} */ formattedSteps = [];
        let /** @type {?} */ startingStyleLookup = {};
        if (isPresent(startingStyles)) {
            startingStyleLookup = _populateStyles(startingStyles, {});
        }
        keyframes.forEach((keyframe) => {
            const /** @type {?} */ data = _populateStyles(keyframe.styles, startingStyleLookup);
            data['offset'] = Math.max(0, Math.min(1, keyframe.offset));
            formattedSteps.push(data);
        });
        // Styling passed into element.animate() must always be balanced.
        // The special cases below can occur if only style() calls exist
        // within an animation or when a style() calls are used prior
        // to a group() animation being issued or if the renderer is
        // invoked by the user directly.
        if (formattedSteps.length == 0) {
            formattedSteps = [startingStyleLookup, startingStyleLookup];
        }
        else if (formattedSteps.length == 1) {
            const /** @type {?} */ start = startingStyleLookup;
            const /** @type {?} */ end = formattedSteps[0];
            end['offset'] = null;
            formattedSteps = [start, end];
        }
        const /** @type {?} */ playerOptions = {
            'duration': duration,
            'delay': delay,
            'fill': 'both' // we use `both` because it allows for styling at 0% to work with `delay`
        };
        // we check for this to avoid having a null|undefined value be present
        // for the easing (which results in an error for certain browsers #9752)
        if (easing) {
            playerOptions['easing'] = easing;
        }
        // there may be a chance a NoOp player is returned depending
        // on when the previous animation was cancelled
        previousPlayers = previousPlayers.filter(filterWebAnimationPlayerFn);
        return new WebAnimationsPlayer(element, formattedSteps, playerOptions, /** @type {?} */ (previousPlayers));
    }
}
/**
 * @param {?} styles
 * @param {?} defaultStyles
 * @return {?}
 */
function _populateStyles(styles, defaultStyles) {
    const /** @type {?} */ data = {};
    styles.styles.forEach((entry) => { Object.keys(entry).forEach(prop => { data[prop] = entry[prop]; }); });
    Object.keys(defaultStyles).forEach(prop => {
        if (!isPresent(data[prop])) {
            data[prop] = defaultStyles[prop];
        }
    });
    return data;
}
/**
 * @param {?} player
 * @return {?}
 */
function filterWebAnimationPlayerFn(player) {
    return player instanceof WebAnimationsPlayer;
}

/**
 * Provides DOM operations in any browser environment.
 *
 * \@security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 * @abstract
 */
class GenericBrowserDomAdapter extends DomAdapter {
    constructor() {
        super();
        this._animationPrefix = null;
        this._transitionEnd = null;
        try {
            const element = this.createElement('div', document);
            if (isPresent(this.getStyle(element, 'animationName'))) {
                this._animationPrefix = '';
            }
            else {
                const domPrefixes = ['Webkit', 'Moz', 'O', 'ms'];
                for (let i = 0; i < domPrefixes.length; i++) {
                    if (isPresent(this.getStyle(element, domPrefixes[i] + 'AnimationName'))) {
                        this._animationPrefix = '-' + domPrefixes[i].toLowerCase() + '-';
                        break;
                    }
                }
            }
            const transEndEventNames = {
                WebkitTransition: 'webkitTransitionEnd',
                MozTransition: 'transitionend',
                OTransition: 'oTransitionEnd otransitionend',
                transition: 'transitionend'
            };
            Object.keys(transEndEventNames).forEach((key) => {
                if (isPresent(this.getStyle(element, key))) {
                    this._transitionEnd = transEndEventNames[key];
                }
            });
        }
        catch (e) {
            this._animationPrefix = null;
            this._transitionEnd = null;
        }
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getDistributedNodes(el) { return ((el)).getDistributedNodes(); }
    /**
     * @param {?} el
     * @param {?} baseUrl
     * @param {?} href
     * @return {?}
     */
    resolveAndSetHref(el, baseUrl, href) {
        el.href = href == null ? baseUrl : baseUrl + '/../' + href;
    }
    /**
     * @return {?}
     */
    supportsDOMEvents() { return true; }
    /**
     * @return {?}
     */
    supportsNativeShadowDOM() {
        return typeof ((document.body)).createShadowRoot === 'function';
    }
    /**
     * @return {?}
     */
    getAnimationPrefix() { return this._animationPrefix ? this._animationPrefix : ''; }
    /**
     * @return {?}
     */
    getTransitionEnd() { return this._transitionEnd ? this._transitionEnd : ''; }
    /**
     * @return {?}
     */
    supportsAnimation() {
        return isPresent(this._animationPrefix) && isPresent(this._transitionEnd);
    }
}

const /** @type {?} */ _attrToPropMap = {
    'class': 'className',
    'innerHtml': 'innerHTML',
    'readonly': 'readOnly',
    'tabindex': 'tabIndex',
};
const /** @type {?} */ DOM_KEY_LOCATION_NUMPAD = 3;
// Map to convert some key or keyIdentifier values to what will be returned by getEventKey
const /** @type {?} */ _keyMap = {
    // The following values are here for cross-browser compatibility and to match the W3C standard
    // cf http://www.w3.org/TR/DOM-Level-3-Events-key/
    '\b': 'Backspace',
    '\t': 'Tab',
    '\x7F': 'Delete',
    '\x1B': 'Escape',
    'Del': 'Delete',
    'Esc': 'Escape',
    'Left': 'ArrowLeft',
    'Right': 'ArrowRight',
    'Up': 'ArrowUp',
    'Down': 'ArrowDown',
    'Menu': 'ContextMenu',
    'Scroll': 'ScrollLock',
    'Win': 'OS'
};
// There is a bug in Chrome for numeric keypad keys:
// https://code.google.com/p/chromium/issues/detail?id=155654
// 1, 2, 3 ... are reported as A, B, C ...
const /** @type {?} */ _chromeNumKeyPadMap = {
    'A': '1',
    'B': '2',
    'C': '3',
    'D': '4',
    'E': '5',
    'F': '6',
    'G': '7',
    'H': '8',
    'I': '9',
    'J': '*',
    'K': '+',
    'M': '-',
    'N': '.',
    'O': '/',
    '\x60': '0',
    '\x90': 'NumLock'
};
class BrowserDomAdapter extends GenericBrowserDomAdapter {
    /**
     * @param {?} templateHtml
     * @return {?}
     */
    parse(templateHtml) { throw new Error('parse not implemented'); }
    /**
     * @return {?}
     */
    static makeCurrent() { setRootDomAdapter(new BrowserDomAdapter()); }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    hasProperty(element, name) { return name in element; }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(el, name, value) { ((el))[name] = value; }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    getProperty(el, name) { return ((el))[name]; }
    /**
     * @param {?} el
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    invoke(el, methodName, args) { ((el))[methodName](...args); }
    /**
     * @param {?} error
     * @return {?}
     */
    logError(error) {
        if (window.console) {
            if (console.error) {
                console.error(error);
            }
            else {
                console.log(error);
            }
        }
    }
    /**
     * @param {?} error
     * @return {?}
     */
    log(error) {
        if (window.console) {
            window.console.log && window.console.log(error);
        }
    }
    /**
     * @param {?} error
     * @return {?}
     */
    logGroup(error) {
        if (window.console) {
            window.console.group && window.console.group(error);
        }
    }
    /**
     * @return {?}
     */
    logGroupEnd() {
        if (window.console) {
            window.console.groupEnd && window.console.groupEnd();
        }
    }
    /**
     * @return {?}
     */
    get attrToPropMap() { return _attrToPropMap; }
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    querySelector(el, selector) { return el.querySelector(selector); }
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    querySelectorAll(el, selector) { return el.querySelectorAll(selector); }
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    on(el, evt, listener) { el.addEventListener(evt, listener, false); }
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    onAndCancel(el, evt, listener) {
        el.addEventListener(evt, listener, false);
        // Needed to follow Dart's subscription semantic, until fix of
        // https://code.google.com/p/dart/issues/detail?id=17406
        return () => { el.removeEventListener(evt, listener, false); };
    }
    /**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    dispatchEvent(el, evt) { el.dispatchEvent(evt); }
    /**
     * @param {?} eventType
     * @return {?}
     */
    createMouseEvent(eventType) {
        const /** @type {?} */ evt = document.createEvent('MouseEvent');
        evt.initEvent(eventType, true, true);
        return evt;
    }
    /**
     * @param {?} eventType
     * @return {?}
     */
    createEvent(eventType) {
        const /** @type {?} */ evt = document.createEvent('Event');
        evt.initEvent(eventType, true, true);
        return evt;
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    preventDefault(evt) {
        evt.preventDefault();
        evt.returnValue = false;
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    isPrevented(evt) {
        return evt.defaultPrevented || isPresent(evt.returnValue) && !evt.returnValue;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getInnerHTML(el) { return el.innerHTML; }
    /**
     * @param {?} el
     * @return {?}
     */
    getTemplateContent(el) {
        return 'content' in el && el instanceof HTMLTemplateElement ? el.content : null;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getOuterHTML(el) { return el.outerHTML; }
    /**
     * @param {?} node
     * @return {?}
     */
    nodeName(node) { return node.nodeName; }
    /**
     * @param {?} node
     * @return {?}
     */
    nodeValue(node) { return node.nodeValue; }
    /**
     * @param {?} node
     * @return {?}
     */
    type(node) { return node.type; }
    /**
     * @param {?} node
     * @return {?}
     */
    content(node) {
        if (this.hasProperty(node, 'content')) {
            return ((node)).content;
        }
        else {
            return node;
        }
    }
    /**
     * @param {?} el
     * @return {?}
     */
    firstChild(el) { return el.firstChild; }
    /**
     * @param {?} el
     * @return {?}
     */
    nextSibling(el) { return el.nextSibling; }
    /**
     * @param {?} el
     * @return {?}
     */
    parentElement(el) { return el.parentNode; }
    /**
     * @param {?} el
     * @return {?}
     */
    childNodes(el) { return el.childNodes; }
    /**
     * @param {?} el
     * @return {?}
     */
    childNodesAsList(el) {
        const /** @type {?} */ childNodes = el.childNodes;
        const /** @type {?} */ res = new Array(childNodes.length);
        for (let /** @type {?} */ i = 0; i < childNodes.length; i++) {
            res[i] = childNodes[i];
        }
        return res;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    clearNodes(el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    appendChild(el, node) { el.appendChild(node); }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    removeChild(el, node) { el.removeChild(node); }
    /**
     * @param {?} el
     * @param {?} newChild
     * @param {?} oldChild
     * @return {?}
     */
    replaceChild(el, newChild, oldChild) { el.replaceChild(newChild, oldChild); }
    /**
     * @param {?} node
     * @return {?}
     */
    remove(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
        return node;
    }
    /**
     * @param {?} parent
     * @param {?} ref
     * @param {?} node
     * @return {?}
     */
    insertBefore(parent, ref, node) { parent.insertBefore(node, ref); }
    /**
     * @param {?} parent
     * @param {?} ref
     * @param {?} nodes
     * @return {?}
     */
    insertAllBefore(parent, ref, nodes) {
        nodes.forEach((n) => parent.insertBefore(n, ref));
    }
    /**
     * @param {?} parent
     * @param {?} ref
     * @param {?} node
     * @return {?}
     */
    insertAfter(parent, ref, node) { parent.insertBefore(node, ref.nextSibling); }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setInnerHTML(el, value) { el.innerHTML = value; }
    /**
     * @param {?} el
     * @return {?}
     */
    getText(el) { return el.textContent; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setText(el, value) { el.textContent = value; }
    /**
     * @param {?} el
     * @return {?}
     */
    getValue(el) { return el.value; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setValue(el, value) { el.value = value; }
    /**
     * @param {?} el
     * @return {?}
     */
    getChecked(el) { return el.checked; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setChecked(el, value) { el.checked = value; }
    /**
     * @param {?} text
     * @return {?}
     */
    createComment(text) { return document.createComment(text); }
    /**
     * @param {?} html
     * @return {?}
     */
    createTemplate(html) {
        const /** @type {?} */ t = document.createElement('template');
        t.innerHTML = html;
        return t;
    }
    /**
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    createElement(tagName, doc = document) { return doc.createElement(tagName); }
    /**
     * @param {?} ns
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    createElementNS(ns, tagName, doc = document) {
        return doc.createElementNS(ns, tagName);
    }
    /**
     * @param {?} text
     * @param {?=} doc
     * @return {?}
     */
    createTextNode(text, doc = document) { return doc.createTextNode(text); }
    /**
     * @param {?} attrName
     * @param {?} attrValue
     * @param {?=} doc
     * @return {?}
     */
    createScriptTag(attrName, attrValue, doc = document) {
        const /** @type {?} */ el = (doc.createElement('SCRIPT'));
        el.setAttribute(attrName, attrValue);
        return el;
    }
    /**
     * @param {?} css
     * @param {?=} doc
     * @return {?}
     */
    createStyleElement(css, doc = document) {
        const /** @type {?} */ style = (doc.createElement('style'));
        this.appendChild(style, this.createTextNode(css));
        return style;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    createShadowRoot(el) { return ((el)).createShadowRoot(); }
    /**
     * @param {?} el
     * @return {?}
     */
    getShadowRoot(el) { return ((el)).shadowRoot; }
    /**
     * @param {?} el
     * @return {?}
     */
    getHost(el) { return ((el)).host; }
    /**
     * @param {?} node
     * @return {?}
     */
    clone(node) { return node.cloneNode(true); }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getElementsByClassName(element, name) {
        return element.getElementsByClassName(name);
    }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getElementsByTagName(element, name) {
        return element.getElementsByTagName(name);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    classList(element) { return Array.prototype.slice.call(element.classList, 0); }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    addClass(element, className) { element.classList.add(className); }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    removeClass(element, className) { element.classList.remove(className); }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    hasClass(element, className) {
        return element.classList.contains(className);
    }
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    setStyle(element, styleName, styleValue) {
        element.style[styleName] = styleValue;
    }
    /**
     * @param {?} element
     * @param {?} stylename
     * @return {?}
     */
    removeStyle(element, stylename) {
        // IE requires '' instead of null
        // see https://github.com/angular/angular/issues/7916
        element.style[stylename] = '';
    }
    /**
     * @param {?} element
     * @param {?} stylename
     * @return {?}
     */
    getStyle(element, stylename) { return element.style[stylename]; }
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    hasStyle(element, styleName, styleValue = null) {
        const /** @type {?} */ value = this.getStyle(element, styleName) || '';
        return styleValue ? value == styleValue : value.length > 0;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    tagName(element) { return element.tagName; }
    /**
     * @param {?} element
     * @return {?}
     */
    attributeMap(element) {
        const /** @type {?} */ res = new Map();
        const /** @type {?} */ elAttrs = element.attributes;
        for (let /** @type {?} */ i = 0; i < elAttrs.length; i++) {
            const /** @type {?} */ attrib = elAttrs[i];
            res.set(attrib.name, attrib.value);
        }
        return res;
    }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    hasAttribute(element, attribute) {
        return element.hasAttribute(attribute);
    }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    hasAttributeNS(element, ns, attribute) {
        return element.hasAttributeNS(ns, attribute);
    }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    getAttribute(element, attribute) {
        return element.getAttribute(attribute);
    }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @return {?}
     */
    getAttributeNS(element, ns, name) {
        return element.getAttributeNS(ns, name);
    }
    /**
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttribute(element, name, value) { element.setAttribute(name, value); }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttributeNS(element, ns, name, value) {
        element.setAttributeNS(ns, name, value);
    }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    removeAttribute(element, attribute) { element.removeAttribute(attribute); }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @return {?}
     */
    removeAttributeNS(element, ns, name) {
        element.removeAttributeNS(ns, name);
    }
    /**
     * @param {?} el
     * @return {?}
     */
    templateAwareRoot(el) { return this.isTemplateElement(el) ? this.content(el) : el; }
    /**
     * @return {?}
     */
    createHtmlDocument() {
        return document.implementation.createHTMLDocument('fakeTitle');
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getBoundingClientRect(el) {
        try {
            return el.getBoundingClientRect();
        }
        catch (e) {
            return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
        }
    }
    /**
     * @param {?} doc
     * @return {?}
     */
    getTitle(doc) { return document.title; }
    /**
     * @param {?} doc
     * @param {?} newTitle
     * @return {?}
     */
    setTitle(doc, newTitle) { document.title = newTitle || ''; }
    /**
     * @param {?} n
     * @param {?} selector
     * @return {?}
     */
    elementMatches(n, selector) {
        if (n instanceof HTMLElement) {
            return n.matches && n.matches(selector) ||
                n.msMatchesSelector && n.msMatchesSelector(selector) ||
                n.webkitMatchesSelector && n.webkitMatchesSelector(selector);
        }
        return false;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    isTemplateElement(el) {
        return el instanceof HTMLElement && el.nodeName == 'TEMPLATE';
    }
    /**
     * @param {?} node
     * @return {?}
     */
    isTextNode(node) { return node.nodeType === Node.TEXT_NODE; }
    /**
     * @param {?} node
     * @return {?}
     */
    isCommentNode(node) { return node.nodeType === Node.COMMENT_NODE; }
    /**
     * @param {?} node
     * @return {?}
     */
    isElementNode(node) { return node.nodeType === Node.ELEMENT_NODE; }
    /**
     * @param {?} node
     * @return {?}
     */
    hasShadowRoot(node) {
        return isPresent(node.shadowRoot) && node instanceof HTMLElement;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    isShadowRoot(node) { return node instanceof DocumentFragment; }
    /**
     * @param {?} node
     * @return {?}
     */
    importIntoDoc(node) { return document.importNode(this.templateAwareRoot(node), true); }
    /**
     * @param {?} node
     * @return {?}
     */
    adoptNode(node) { return document.adoptNode(node); }
    /**
     * @param {?} el
     * @return {?}
     */
    getHref(el) { return ((el)).href; }
    /**
     * @param {?} event
     * @return {?}
     */
    getEventKey(event) {
        let /** @type {?} */ key = event.key;
        if (isBlank(key)) {
            key = event.keyIdentifier;
            // keyIdentifier is defined in the old draft of DOM Level 3 Events implemented by Chrome and
            // Safari cf
            // http://www.w3.org/TR/2007/WD-DOM-Level-3-Events-20071221/events.html#Events-KeyboardEvents-Interfaces
            if (isBlank(key)) {
                return 'Unidentified';
            }
            if (key.startsWith('U+')) {
                key = String.fromCharCode(parseInt(key.substring(2), 16));
                if (event.location === DOM_KEY_LOCATION_NUMPAD && _chromeNumKeyPadMap.hasOwnProperty(key)) {
                    // There is a bug in Chrome for numeric keypad keys:
                    // https://code.google.com/p/chromium/issues/detail?id=155654
                    // 1, 2, 3 ... are reported as A, B, C ...
                    key = ((_chromeNumKeyPadMap))[key];
                }
            }
        }
        return _keyMap[key] || key;
    }
    /**
     * @param {?} doc
     * @param {?} target
     * @return {?}
     */
    getGlobalEventTarget(doc, target) {
        if (target === 'window') {
            return window;
        }
        if (target === 'document') {
            return document;
        }
        if (target === 'body') {
            return document.body;
        }
    }
    /**
     * @return {?}
     */
    getHistory() { return window.history; }
    /**
     * @return {?}
     */
    getLocation() { return window.location; }
    /**
     * @param {?} doc
     * @return {?}
     */
    getBaseHref(doc) {
        const /** @type {?} */ href = getBaseElementHref();
        return isBlank(href) ? null : relativePath(href);
    }
    /**
     * @return {?}
     */
    resetBaseElement() { baseElement = null; }
    /**
     * @return {?}
     */
    getUserAgent() { return window.navigator.userAgent; }
    /**
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setData(element, name, value) {
        this.setAttribute(element, 'data-' + name, value);
    }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getData(element, name) {
        return this.getAttribute(element, 'data-' + name);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    getComputedStyle(element) { return getComputedStyle(element); }
    /**
     * @param {?} path
     * @param {?} value
     * @return {?}
     */
    setGlobalVar(path, value) { setValueOnPath(global$1, path, value); }
    /**
     * @return {?}
     */
    supportsWebAnimation() {
        return typeof ((Element)).prototype['animate'] === 'function';
    }
    /**
     * @return {?}
     */
    performanceNow() {
        // performance.now() is not available in all browsers, see
        // http://caniuse.com/#search=performance.now
        return window.performance && window.performance.now ? window.performance.now() :
            new Date().getTime();
    }
    /**
     * @return {?}
     */
    supportsCookies() { return true; }
    /**
     * @param {?} name
     * @return {?}
     */
    getCookie(name) { return parseCookieValue(document.cookie, name); }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setCookie(name, value) {
        // document.cookie is magical, assigning into it assigns/overrides one cookie value, but does
        // not clear other cookies.
        document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    }
}
let /** @type {?} */ baseElement = null;
/**
 * @return {?}
 */
function getBaseElementHref() {
    if (!baseElement) {
        baseElement = document.querySelector('base');
        if (!baseElement) {
            return null;
        }
    }
    return baseElement.getAttribute('href');
}
// based on urlUtils.js in AngularJS 1
let /** @type {?} */ urlParsingNode;
/**
 * @param {?} url
 * @return {?}
 */
function relativePath(url) {
    if (!urlParsingNode) {
        urlParsingNode = document.createElement('a');
    }
    urlParsingNode.setAttribute('href', url);
    return (urlParsingNode.pathname.charAt(0) === '/') ? urlParsingNode.pathname :
        '/' + urlParsingNode.pathname;
}
/**
 * @param {?} cookieStr
 * @param {?} name
 * @return {?}
 */
function parseCookieValue(cookieStr, name) {
    name = encodeURIComponent(name);
    for (const /** @type {?} */ cookie of cookieStr.split(';')) {
        const /** @type {?} */ eqIndex = cookie.indexOf('=');
        const [cookieName, cookieValue] = eqIndex == -1 ? [cookie, ''] : [cookie.slice(0, eqIndex), cookie.slice(eqIndex + 1)];
        if (cookieName.trim() === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}

/**
 * A DI Token representing the main rendering context. In a browser this is the DOM Document.
 *
 * Note: Document might not be available in the Application Context when Application and Rendering
 * Contexts are not the same (e.g. when running the application into a Web Worker).
 *
 * @stable
 */
const /** @type {?} */ DOCUMENT = new InjectionToken('DocumentToken');

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 * @return {?}
 */
function supportsState() {
    return !!window.history.pushState;
}

/**
 * `PlatformLocation` encapsulates all of the direct calls to platform APIs.
 * This class should not be used directly by an application developer. Instead, use
 * {\@link Location}.
 */
class BrowserPlatformLocation extends PlatformLocation {
    /**
     * @param {?} _doc
     */
    constructor(_doc) {
        super();
        this._doc = _doc;
        this._init();
    }
    /**
     * \@internal
     * @return {?}
     */
    _init() {
        this._location = getDOM().getLocation();
        this._history = getDOM().getHistory();
    }
    /**
     * @return {?}
     */
    get location() { return this._location; }
    /**
     * @return {?}
     */
    getBaseHrefFromDOM() { return getDOM().getBaseHref(this._doc); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onPopState(fn) {
        getDOM().getGlobalEventTarget(this._doc, 'window').addEventListener('popstate', fn, false);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onHashChange(fn) {
        getDOM().getGlobalEventTarget(this._doc, 'window').addEventListener('hashchange', fn, false);
    }
    /**
     * @return {?}
     */
    get pathname() { return this._location.pathname; }
    /**
     * @return {?}
     */
    get search() { return this._location.search; }
    /**
     * @return {?}
     */
    get hash() { return this._location.hash; }
    /**
     * @param {?} newPath
     * @return {?}
     */
    set pathname(newPath) { this._location.pathname = newPath; }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    pushState(state, title, url) {
        if (supportsState()) {
            this._history.pushState(state, title, url);
        }
        else {
            this._location.hash = url;
        }
    }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    replaceState(state, title, url) {
        if (supportsState()) {
            this._history.replaceState(state, title, url);
        }
        else {
            this._location.hash = url;
        }
    }
    /**
     * @return {?}
     */
    forward() { this._history.forward(); }
    /**
     * @return {?}
     */
    back() { this._history.back(); }
}
BrowserPlatformLocation.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BrowserPlatformLocation.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];

/**
 * A service that can be used to get and add meta tags.
 *
 * \@experimental
 */
class Meta {
    /**
     * @param {?} _doc
     */
    constructor(_doc) {
        this._doc = _doc;
        this._dom = getDOM();
    }
    /**
     * @param {?} tag
     * @param {?=} forceCreation
     * @return {?}
     */
    addTag(tag, forceCreation = false) {
        if (!tag)
            return null;
        return this._getOrCreateElement(tag, forceCreation);
    }
    /**
     * @param {?} tags
     * @param {?=} forceCreation
     * @return {?}
     */
    addTags(tags, forceCreation = false) {
        if (!tags)
            return [];
        return tags.reduce((result, tag) => {
            if (tag) {
                result.push(this._getOrCreateElement(tag, forceCreation));
            }
            return result;
        }, []);
    }
    /**
     * @param {?} attrSelector
     * @return {?}
     */
    getTag(attrSelector) {
        if (!attrSelector)
            return null;
        return this._dom.querySelector(this._doc, `meta[${attrSelector}]`);
    }
    /**
     * @param {?} attrSelector
     * @return {?}
     */
    getTags(attrSelector) {
        if (!attrSelector)
            return [];
        const /** @type {?} */ list /*NodeList*/ = this._dom.querySelectorAll(this._doc, `meta[${attrSelector}]`);
        return list ? [].slice.call(list) : [];
    }
    /**
     * @param {?} tag
     * @param {?=} selector
     * @return {?}
     */
    updateTag(tag, selector) {
        if (!tag)
            return null;
        selector = selector || this._parseSelector(tag);
        const /** @type {?} */ meta = this.getTag(selector);
        if (meta) {
            return this._setMetaElementAttributes(tag, meta);
        }
        return this._getOrCreateElement(tag, true);
    }
    /**
     * @param {?} attrSelector
     * @return {?}
     */
    removeTag(attrSelector) { this.removeTagElement(this.getTag(attrSelector)); }
    /**
     * @param {?} meta
     * @return {?}
     */
    removeTagElement(meta) {
        if (meta) {
            this._dom.remove(meta);
        }
    }
    /**
     * @param {?} meta
     * @param {?=} forceCreation
     * @return {?}
     */
    _getOrCreateElement(meta, forceCreation = false) {
        if (!forceCreation) {
            const /** @type {?} */ selector = this._parseSelector(meta);
            const /** @type {?} */ elem = this.getTag(selector);
            // It's allowed to have multiple elements with the same name so it's not enough to
            // just check that element with the same name already present on the page. We also need to
            // check if element has tag attributes
            if (elem && this._containsAttributes(meta, elem))
                return elem;
        }
        const /** @type {?} */ element = (this._dom.createElement('meta'));
        this._setMetaElementAttributes(meta, element);
        const /** @type {?} */ head = this._dom.getElementsByTagName(this._doc, 'head')[0];
        this._dom.appendChild(head, element);
        return element;
    }
    /**
     * @param {?} tag
     * @param {?} el
     * @return {?}
     */
    _setMetaElementAttributes(tag, el) {
        Object.keys(tag).forEach((prop) => this._dom.setAttribute(el, prop, tag[prop]));
        return el;
    }
    /**
     * @param {?} tag
     * @return {?}
     */
    _parseSelector(tag) {
        const /** @type {?} */ attr = tag.name ? 'name' : 'property';
        return `${attr}="${tag[attr]}"`;
    }
    /**
     * @param {?} tag
     * @param {?} elem
     * @return {?}
     */
    _containsAttributes(tag, elem) {
        return Object.keys(tag).every((key) => this._dom.getAttribute(elem, key) === tag[key]);
    }
}
Meta.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Meta.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];

/**
 * An id that identifies a particular application being bootstrapped, that should
 * match across the client/server boundary.
 */
const /** @type {?} */ TRANSITION_ID = new InjectionToken('TRANSITION_ID');
/**
 * @param {?} transitionId
 * @param {?} document
 * @return {?}
 */
function bootstrapListenerFactory(transitionId, document) {
    const /** @type {?} */ factory = () => {
        const /** @type {?} */ dom = getDOM();
        const /** @type {?} */ styles = Array.prototype.slice.apply(dom.querySelectorAll(document, `style[ng-transition]`));
        styles.filter(el => dom.getAttribute(el, 'ng-transition') === transitionId)
            .forEach(el => dom.remove(el));
    };
    return factory;
}
const /** @type {?} */ SERVER_TRANSITION_PROVIDERS = [
    {
        provide: APP_INITIALIZER,
        useFactory: bootstrapListenerFactory,
        deps: [TRANSITION_ID, DOCUMENT],
        multi: true
    },
];

class BrowserGetTestability {
    /**
     * @return {?}
     */
    static init() { setTestabilityGetter(new BrowserGetTestability()); }
    /**
     * @param {?} registry
     * @return {?}
     */
    addToWindow(registry) {
        global$1.getAngularTestability = (elem, findInAncestors = true) => {
            const /** @type {?} */ testability = registry.findTestabilityInTree(elem, findInAncestors);
            if (testability == null) {
                throw new Error('Could not find testability for element.');
            }
            return testability;
        };
        global$1.getAllAngularTestabilities = () => registry.getAllTestabilities();
        global$1.getAllAngularRootElements = () => registry.getAllRootElements();
        const /** @type {?} */ whenAllStable = (callback /** TODO #9100 */) => {
            const /** @type {?} */ testabilities = global$1.getAllAngularTestabilities();
            let /** @type {?} */ count = testabilities.length;
            let /** @type {?} */ didWork = false;
            const /** @type {?} */ decrement = function (didWork_ /** TODO #9100 */) {
                didWork = didWork || didWork_;
                count--;
                if (count == 0) {
                    callback(didWork);
                }
            };
            testabilities.forEach(function (testability /** TODO #9100 */) {
                testability.whenStable(decrement);
            });
        };
        if (!global$1['frameworkStabilizers']) {
            global$1['frameworkStabilizers'] = [];
        }
        global$1['frameworkStabilizers'].push(whenAllStable);
    }
    /**
     * @param {?} registry
     * @param {?} elem
     * @param {?} findInAncestors
     * @return {?}
     */
    findTestabilityInTree(registry, elem, findInAncestors) {
        if (elem == null) {
            return null;
        }
        const /** @type {?} */ t = registry.getTestability(elem);
        if (isPresent(t)) {
            return t;
        }
        else if (!findInAncestors) {
            return null;
        }
        if (getDOM().isShadowRoot(elem)) {
            return this.findTestabilityInTree(registry, getDOM().getHost(elem), true);
        }
        return this.findTestabilityInTree(registry, getDOM().parentElement(elem), true);
    }
}

/**
 * A service that can be used to get and set the title of a current HTML document.
 *
 * Since an Angular application can't be bootstrapped on the entire HTML document (`<html>` tag)
 * it is not possible to bind to the `text` property of the `HTMLTitleElement` elements
 * (representing the `<title>` tag). Instead, this service can be used to set and get the current
 * title value.
 *
 * \@experimental
 */
class Title {
    /**
     * @param {?} _doc
     */
    constructor(_doc) {
        this._doc = _doc;
    }
    /**
     * Get the title of the current HTML document.
     * @return {?}
     */
    getTitle() { return getDOM().getTitle(this._doc); }
    /**
     * Set the title of the current HTML document.
     * @param {?} newTitle
     * @return {?}
     */
    setTitle(newTitle) { getDOM().setTitle(this._doc, newTitle); }
}
Title.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Title.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];

/**
 * Wraps Javascript Objects
 */
class StringMapWrapper {
    /**
     * @param {?} m1
     * @param {?} m2
     * @return {?}
     */
    static merge(m1, m2) {
        const /** @type {?} */ m = {};
        for (const /** @type {?} */ k of Object.keys(m1)) {
            m[k] = m1[k];
        }
        for (const /** @type {?} */ k of Object.keys(m2)) {
            m[k] = m2[k];
        }
        return m;
    }
    /**
     * @param {?} m1
     * @param {?} m2
     * @return {?}
     */
    static equals(m1, m2) {
        const /** @type {?} */ k1 = Object.keys(m1);
        const /** @type {?} */ k2 = Object.keys(m2);
        if (k1.length != k2.length) {
            return false;
        }
        for (let /** @type {?} */ i = 0; i < k1.length; i++) {
            const /** @type {?} */ key = k1[i];
            if (m1[key] !== m2[key]) {
                return false;
            }
        }
        return true;
    }
}

/**
 * @stable
 */
const /** @type {?} */ EVENT_MANAGER_PLUGINS = new InjectionToken('EventManagerPlugins');
/**
 * \@stable
 */
class EventManager {
    /**
     * @param {?} plugins
     * @param {?} _zone
     */
    constructor(plugins, _zone) {
        this._zone = _zone;
        this._eventNameToPlugin = new Map();
        plugins.forEach(p => p.manager = this);
        this._plugins = plugins.slice().reverse();
    }
    /**
     * @param {?} element
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */
    addEventListener(element, eventName, handler) {
        const /** @type {?} */ plugin = this._findPluginFor(eventName);
        return plugin.addEventListener(element, eventName, handler);
    }
    /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */
    addGlobalEventListener(target, eventName, handler) {
        const /** @type {?} */ plugin = this._findPluginFor(eventName);
        return plugin.addGlobalEventListener(target, eventName, handler);
    }
    /**
     * @return {?}
     */
    getZone() { return this._zone; }
    /**
     * \@internal
     * @param {?} eventName
     * @return {?}
     */
    _findPluginFor(eventName) {
        const /** @type {?} */ plugin = this._eventNameToPlugin.get(eventName);
        if (plugin) {
            return plugin;
        }
        const /** @type {?} */ plugins = this._plugins;
        for (let /** @type {?} */ i = 0; i < plugins.length; i++) {
            const /** @type {?} */ plugin = plugins[i];
            if (plugin.supports(eventName)) {
                this._eventNameToPlugin.set(eventName, plugin);
                return plugin;
            }
        }
        throw new Error(`No event manager plugin found for event ${eventName}`);
    }
}
EventManager.decorators = [
    { type: Injectable },
];
/** @nocollapse */
EventManager.ctorParameters = () => [
    { type: Array, decorators: [{ type: Inject, args: [EVENT_MANAGER_PLUGINS,] },] },
    { type: NgZone, },
];
/**
 * @abstract
 */
class EventManagerPlugin {
    /**
     * @param {?} _doc
     */
    constructor(_doc) {
        this._doc = _doc;
    }
    /**
     * @abstract
     * @param {?} eventName
     * @return {?}
     */
    supports(eventName) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */
    addEventListener(element, eventName, handler) { }
    /**
     * @param {?} element
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */
    addGlobalEventListener(element, eventName, handler) {
        const /** @type {?} */ target = getDOM().getGlobalEventTarget(this._doc, element);
        if (!target) {
            throw new Error(`Unsupported event target ${target} for event ${eventName}`);
        }
        return this.addEventListener(target, eventName, handler);
    }
    ;
}

class SharedStylesHost {
    constructor() {
        /** @internal */
        this._stylesSet = new Set();
    }
    /**
     * @param {?} styles
     * @return {?}
     */
    addStyles(styles) {
        const /** @type {?} */ additions = new Set();
        styles.forEach(style => {
            if (!this._stylesSet.has(style)) {
                this._stylesSet.add(style);
                additions.add(style);
            }
        });
        this.onStylesAdded(additions);
    }
    /**
     * @param {?} additions
     * @return {?}
     */
    onStylesAdded(additions) { }
    /**
     * @return {?}
     */
    getAllStyles() { return Array.from(this._stylesSet); }
}
SharedStylesHost.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SharedStylesHost.ctorParameters = () => [];
class DomSharedStylesHost extends SharedStylesHost {
    /**
     * @param {?} _doc
     */
    constructor(_doc) {
        super();
        this._doc = _doc;
        this._hostNodes = new Set();
        this._styleNodes = new Set();
        this._hostNodes.add(_doc.head);
    }
    /**
     * @param {?} styles
     * @param {?} host
     * @return {?}
     */
    _addStylesToHost(styles, host) {
        styles.forEach((style) => {
            const /** @type {?} */ styleEl = this._doc.createElement('style');
            styleEl.textContent = style;
            this._styleNodes.add(host.appendChild(styleEl));
        });
    }
    /**
     * @param {?} hostNode
     * @return {?}
     */
    addHost(hostNode) {
        this._addStylesToHost(this._stylesSet, hostNode);
        this._hostNodes.add(hostNode);
    }
    /**
     * @param {?} hostNode
     * @return {?}
     */
    removeHost(hostNode) { this._hostNodes.delete(hostNode); }
    /**
     * @param {?} additions
     * @return {?}
     */
    onStylesAdded(additions) {
        this._hostNodes.forEach(hostNode => this._addStylesToHost(additions, hostNode));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() { this._styleNodes.forEach(styleNode => getDOM().remove(styleNode)); }
}
DomSharedStylesHost.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DomSharedStylesHost.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];

const /** @type {?} */ NAMESPACE_URIS = {
    'xlink': 'http://www.w3.org/1999/xlink',
    'svg': 'http://www.w3.org/2000/svg',
    'xhtml': 'http://www.w3.org/1999/xhtml',
    'xml': 'http://www.w3.org/XML/1998/namespace'
};
const /** @type {?} */ TEMPLATE_COMMENT_TEXT = 'template bindings={}';
const /** @type {?} */ TEMPLATE_BINDINGS_EXP = /^template bindings=(.*)$/;
/**
 * @abstract
 */
class DomRootRenderer {
    /**
     * @param {?} document
     * @param {?} eventManager
     * @param {?} sharedStylesHost
     * @param {?} animationDriver
     * @param {?} appId
     */
    constructor(document, eventManager, sharedStylesHost, animationDriver, appId) {
        this.document = document;
        this.eventManager = eventManager;
        this.sharedStylesHost = sharedStylesHost;
        this.animationDriver = animationDriver;
        this.appId = appId;
        this.registeredComponents = new Map();
    }
    /**
     * @param {?} componentProto
     * @return {?}
     */
    renderComponent(componentProto) {
        let /** @type {?} */ renderer = this.registeredComponents.get(componentProto.id);
        if (!renderer) {
            renderer = new DomRenderer(this, componentProto, this.animationDriver, `${this.appId}-${componentProto.id}`);
            this.registeredComponents.set(componentProto.id, renderer);
        }
        return renderer;
    }
}
class DomRootRenderer_ extends DomRootRenderer {
    /**
     * @param {?} _document
     * @param {?} _eventManager
     * @param {?} sharedStylesHost
     * @param {?} animationDriver
     * @param {?} appId
     */
    constructor(_document, _eventManager, sharedStylesHost, animationDriver, appId) {
        super(_document, _eventManager, sharedStylesHost, animationDriver, appId);
        throw new Error('RootRenderer is no longer supported. Please use the `RendererFactoryV2` instead!');
    }
}
DomRootRenderer_.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DomRootRenderer_.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: EventManager, },
    { type: DomSharedStylesHost, },
    { type: AnimationDriver, },
    { type: undefined, decorators: [{ type: Inject, args: [APP_ID,] },] },
];
const /** @type {?} */ DIRECT_DOM_RENDERER = {
    /**
     * @param {?} node
     * @return {?}
     */
    remove(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    },
    /**
     * @param {?} node
     * @param {?} parent
     * @return {?}
     */
    appendChild(node, parent) { parent.appendChild(node); },
    /**
     * @param {?} node
     * @param {?} refNode
     * @return {?}
     */
    insertBefore(node, refNode) { refNode.parentNode.insertBefore(node, refNode); },
    /**
     * @param {?} node
     * @return {?}
     */
    nextSibling(node) { return node.nextSibling; },
    /**
     * @param {?} node
     * @return {?}
     */
    parentElement(node) { return (node.parentNode); }
};
class DomRenderer {
    /**
     * @param {?} _rootRenderer
     * @param {?} componentProto
     * @param {?} _animationDriver
     * @param {?} styleShimId
     */
    constructor(_rootRenderer, componentProto, _animationDriver, styleShimId) {
        this._rootRenderer = _rootRenderer;
        this.componentProto = componentProto;
        this._animationDriver = _animationDriver;
        this.directRenderer = DIRECT_DOM_RENDERER;
        this._styles = flattenStyles(styleShimId, componentProto.styles, []);
        if (componentProto.encapsulation !== ViewEncapsulation.Native) {
            this._rootRenderer.sharedStylesHost.addStyles(this._styles);
        }
        if (this.componentProto.encapsulation === ViewEncapsulation.Emulated) {
            this._contentAttr = shimContentAttribute(styleShimId);
            this._hostAttr = shimHostAttribute(styleShimId);
        }
        else {
            this._contentAttr = null;
            this._hostAttr = null;
        }
    }
    /**
     * @param {?} selectorOrNode
     * @param {?} debugInfo
     * @return {?}
     */
    selectRootElement(selectorOrNode, debugInfo) {
        let /** @type {?} */ el;
        if (typeof selectorOrNode === 'string') {
            el = this._rootRenderer.document.querySelector(selectorOrNode);
            if (!el) {
                throw new Error(`The selector "${selectorOrNode}" did not match any elements`);
            }
        }
        else {
            el = selectorOrNode;
        }
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
        return el;
    }
    /**
     * @param {?} parent
     * @param {?} name
     * @param {?} debugInfo
     * @return {?}
     */
    createElement(parent, name, debugInfo) {
        let /** @type {?} */ el;
        if (isNamespaced(name)) {
            const /** @type {?} */ nsAndName = splitNamespace(name);
            el = document.createElementNS((NAMESPACE_URIS)[nsAndName[0]], nsAndName[1]);
        }
        else {
            el = document.createElement(name);
        }
        if (this._contentAttr) {
            el.setAttribute(this._contentAttr, '');
        }
        if (parent) {
            parent.appendChild(el);
        }
        return el;
    }
    /**
     * @param {?} hostElement
     * @return {?}
     */
    createViewRoot(hostElement) {
        let /** @type {?} */ nodesParent;
        if (this.componentProto.encapsulation === ViewEncapsulation.Native) {
            nodesParent = ((hostElement)).createShadowRoot();
            this._rootRenderer.sharedStylesHost.addHost(nodesParent);
            for (let /** @type {?} */ i = 0; i < this._styles.length; i++) {
                const /** @type {?} */ styleEl = document.createElement('style');
                styleEl.textContent = this._styles[i];
                nodesParent.appendChild(styleEl);
            }
        }
        else {
            if (this._hostAttr) {
                hostElement.setAttribute(this._hostAttr, '');
            }
            nodesParent = hostElement;
        }
        return nodesParent;
    }
    /**
     * @param {?} parentElement
     * @param {?} debugInfo
     * @return {?}
     */
    createTemplateAnchor(parentElement, debugInfo) {
        const /** @type {?} */ comment = document.createComment(TEMPLATE_COMMENT_TEXT);
        if (parentElement) {
            parentElement.appendChild(comment);
        }
        return comment;
    }
    /**
     * @param {?} parentElement
     * @param {?} value
     * @param {?} debugInfo
     * @return {?}
     */
    createText(parentElement, value, debugInfo) {
        const /** @type {?} */ node = document.createTextNode(value);
        if (parentElement) {
            parentElement.appendChild(node);
        }
        return node;
    }
    /**
     * @param {?} parentElement
     * @param {?} nodes
     * @return {?}
     */
    projectNodes(parentElement, nodes) {
        if (!parentElement)
            return;
        appendNodes(parentElement, nodes);
    }
    /**
     * @param {?} node
     * @param {?} viewRootNodes
     * @return {?}
     */
    attachViewAfter(node, viewRootNodes) { moveNodesAfterSibling(node, viewRootNodes); }
    /**
     * @param {?} viewRootNodes
     * @return {?}
     */
    detachView(viewRootNodes) {
        for (let /** @type {?} */ i = 0; i < viewRootNodes.length; i++) {
            const /** @type {?} */ node = viewRootNodes[i];
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        }
    }
    /**
     * @param {?} hostElement
     * @param {?} viewAllNodes
     * @return {?}
     */
    destroyView(hostElement, viewAllNodes) {
        if (this.componentProto.encapsulation === ViewEncapsulation.Native && hostElement) {
            this._rootRenderer.sharedStylesHost.removeHost(((hostElement)).shadowRoot);
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    listen(renderElement, name, callback) {
        return this._rootRenderer.eventManager.addEventListener(renderElement, name, decoratePreventDefault(callback));
    }
    /**
     * @param {?} target
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    listenGlobal(target, name, callback) {
        return this._rootRenderer.eventManager.addGlobalEventListener(target, name, decoratePreventDefault(callback));
    }
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    setElementProperty(renderElement, propertyName, propertyValue) {
        ((renderElement))[propertyName] = propertyValue;
    }
    /**
     * @param {?} renderElement
     * @param {?} attributeName
     * @param {?} attributeValue
     * @return {?}
     */
    setElementAttribute(renderElement, attributeName, attributeValue) {
        let /** @type {?} */ attrNs;
        let /** @type {?} */ attrNameWithoutNs = attributeName;
        if (isNamespaced(attributeName)) {
            const /** @type {?} */ nsAndName = splitNamespace(attributeName);
            attrNameWithoutNs = nsAndName[1];
            attributeName = nsAndName[0] + ':' + nsAndName[1];
            attrNs = NAMESPACE_URIS[nsAndName[0]];
        }
        if (isPresent(attributeValue)) {
            if (attrNs) {
                renderElement.setAttributeNS(attrNs, attributeName, attributeValue);
            }
            else {
                renderElement.setAttribute(attributeName, attributeValue);
            }
        }
        else {
            if (isPresent(attrNs)) {
                renderElement.removeAttributeNS(attrNs, attrNameWithoutNs);
            }
            else {
                renderElement.removeAttribute(attributeName);
            }
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    setBindingDebugInfo(renderElement, propertyName, propertyValue) {
        if (renderElement.nodeType === Node.COMMENT_NODE) {
            const /** @type {?} */ existingBindings = renderElement.nodeValue.replace(/\n/g, '').match(TEMPLATE_BINDINGS_EXP);
            const /** @type {?} */ parsedBindings = JSON.parse(existingBindings[1]);
            parsedBindings[propertyName] = propertyValue;
            renderElement.nodeValue =
                TEMPLATE_COMMENT_TEXT.replace('{}', JSON.stringify(parsedBindings, null, 2));
        }
        else {
            // Attribute names with `$` (eg `x-y$`) are valid per spec, but unsupported by some browsers
            propertyName = propertyName.replace(/\$/g, '_');
            this.setElementAttribute(renderElement, propertyName, propertyValue);
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    setElementClass(renderElement, className, isAdd) {
        if (isAdd) {
            renderElement.classList.add(className);
        }
        else {
            renderElement.classList.remove(className);
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    setElementStyle(renderElement, styleName, styleValue) {
        if (isPresent(styleValue)) {
            ((renderElement.style))[styleName] = stringify(styleValue);
        }
        else {
            // IE requires '' instead of null
            // see https://github.com/angular/angular/issues/7916
            ((renderElement.style))[styleName] = '';
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    invokeElementMethod(renderElement, methodName, args) {
        ((renderElement))[methodName].apply(renderElement, args);
    }
    /**
     * @param {?} renderNode
     * @param {?} text
     * @return {?}
     */
    setText(renderNode, text) { renderNode.nodeValue = text; }
    /**
     * @param {?} element
     * @param {?} startingStyles
     * @param {?} keyframes
     * @param {?} duration
     * @param {?} delay
     * @param {?} easing
     * @param {?=} previousPlayers
     * @return {?}
     */
    animate(element, startingStyles, keyframes, duration, delay, easing, previousPlayers = []) {
        if (this._rootRenderer.document.body.contains(element)) {
            return this._animationDriver.animate(element, startingStyles, keyframes, duration, delay, easing, previousPlayers);
        }
        return new ɵNoOpAnimationPlayer();
    }
}
/**
 * @param {?} sibling
 * @param {?} nodes
 * @return {?}
 */
function moveNodesAfterSibling(sibling, nodes) {
    const /** @type {?} */ parent = sibling.parentNode;
    if (nodes.length > 0 && parent) {
        const /** @type {?} */ nextSibling = sibling.nextSibling;
        if (nextSibling) {
            for (let /** @type {?} */ i = 0; i < nodes.length; i++) {
                parent.insertBefore(nodes[i], nextSibling);
            }
        }
        else {
            for (let /** @type {?} */ i = 0; i < nodes.length; i++) {
                parent.appendChild(nodes[i]);
            }
        }
    }
}
/**
 * @param {?} parent
 * @param {?} nodes
 * @return {?}
 */
function appendNodes(parent, nodes) {
    for (let /** @type {?} */ i = 0; i < nodes.length; i++) {
        parent.appendChild(nodes[i]);
    }
}
/**
 * @param {?} eventHandler
 * @return {?}
 */
function decoratePreventDefault(eventHandler) {
    return (event) => {
        const /** @type {?} */ allowDefaultBehavior = eventHandler(event);
        if (allowDefaultBehavior === false) {
            // TODO(tbosch): move preventDefault into event plugins...
            event.preventDefault();
            event.returnValue = false;
        }
    };
}
const /** @type {?} */ COMPONENT_REGEX = /%COMP%/g;
const /** @type {?} */ COMPONENT_VARIABLE = '%COMP%';
const /** @type {?} */ HOST_ATTR = `_nghost-${COMPONENT_VARIABLE}`;
const /** @type {?} */ CONTENT_ATTR = `_ngcontent-${COMPONENT_VARIABLE}`;
/**
 * @param {?} componentShortId
 * @return {?}
 */
function shimContentAttribute(componentShortId) {
    return CONTENT_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
/**
 * @param {?} componentShortId
 * @return {?}
 */
function shimHostAttribute(componentShortId) {
    return HOST_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
/**
 * @param {?} compId
 * @param {?} styles
 * @param {?} target
 * @return {?}
 */
function flattenStyles(compId, styles, target) {
    for (let /** @type {?} */ i = 0; i < styles.length; i++) {
        let /** @type {?} */ style = styles[i];
        if (Array.isArray(style)) {
            flattenStyles(compId, style, target);
        }
        else {
            style = style.replace(COMPONENT_REGEX, compId);
            target.push(style);
        }
    }
    return target;
}
const /** @type {?} */ NS_PREFIX_RE = /^:([^:]+):(.+)$/;
/**
 * @param {?} name
 * @return {?}
 */
function isNamespaced(name) {
    return name[0] === ':';
}
/**
 * @param {?} name
 * @return {?}
 */
function splitNamespace(name) {
    const /** @type {?} */ match = name.match(NS_PREFIX_RE);
    return [match[1], match[2]];
}
class DomRendererFactoryV2 {
    /**
     * @param {?} eventManager
     * @param {?} sharedStylesHost
     */
    constructor(eventManager, sharedStylesHost) {
        this.eventManager = eventManager;
        this.sharedStylesHost = sharedStylesHost;
        this.rendererByCompId = new Map();
        this.defaultRenderer = new DefaultDomRendererV2(eventManager);
    }
    ;
    /**
     * @param {?} element
     * @param {?} type
     * @return {?}
     */
    createRenderer(element, type) {
        if (!element || !type) {
            return this.defaultRenderer;
        }
        switch (type.encapsulation) {
            case ViewEncapsulation.Emulated: {
                let /** @type {?} */ renderer = this.rendererByCompId.get(type.id);
                if (!renderer) {
                    renderer = new EmulatedEncapsulationDomRendererV2(this.eventManager, this.sharedStylesHost, type);
                    this.rendererByCompId.set(type.id, renderer);
                }
                ((renderer)).applyToHost(element);
                return renderer;
            }
            case ViewEncapsulation.Native:
                return new ShadowDomRenderer(this.eventManager, this.sharedStylesHost, element, type);
            default: {
                if (!this.rendererByCompId.has(type.id)) {
                    const /** @type {?} */ styles = flattenStyles(type.id, type.styles, []);
                    this.sharedStylesHost.addStyles(styles);
                    this.rendererByCompId.set(type.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
        }
    }
}
DomRendererFactoryV2.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DomRendererFactoryV2.ctorParameters = () => [
    { type: EventManager, },
    { type: DomSharedStylesHost, },
];
class DefaultDomRendererV2 {
    /**
     * @param {?} eventManager
     */
    constructor(eventManager) {
        this.eventManager = eventManager;
    }
    /**
     * @return {?}
     */
    destroy() { }
    /**
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    createElement(name, namespace) {
        if (namespace) {
            return document.createElementNS(NAMESPACE_URIS[namespace], name);
        }
        return document.createElement(name);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    createComment(value) { return document.createComment(value); }
    /**
     * @param {?} value
     * @return {?}
     */
    createText(value) { return document.createTextNode(value); }
    /**
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    appendChild(parent, newChild) { parent.appendChild(newChild); }
    /**
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */
    insertBefore(parent, newChild, refChild) {
        if (parent) {
            parent.insertBefore(newChild, refChild);
        }
    }
    /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    removeChild(parent, oldChild) {
        if (parent) {
            parent.removeChild(oldChild);
        }
    }
    /**
     * @param {?} selectorOrNode
     * @return {?}
     */
    selectRootElement(selectorOrNode) {
        let /** @type {?} */ el = typeof selectorOrNode === 'string' ? document.querySelector(selectorOrNode) :
            selectorOrNode;
        if (!el) {
            throw new Error(`The selector "${selectorOrNode}" did not match any elements`);
        }
        el.textContent = '';
        return el;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    parentNode(node) { return node.parentNode; }
    /**
     * @param {?} node
     * @return {?}
     */
    nextSibling(node) { return node.nextSibling; }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    setAttribute(el, name, value, namespace) {
        if (namespace) {
            el.setAttributeNS(NAMESPACE_URIS[namespace], namespace + ':' + name, value);
        }
        else {
            el.setAttribute(name, value);
        }
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    removeAttribute(el, name, namespace) {
        if (namespace) {
            el.removeAttributeNS(NAMESPACE_URIS[namespace], name);
        }
        else {
            el.removeAttribute(name);
        }
    }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    addClass(el, name) { el.classList.add(name); }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    removeClass(el, name) { el.classList.remove(name); }
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} hasVendorPrefix
     * @param {?} hasImportant
     * @return {?}
     */
    setStyle(el, style, value, hasVendorPrefix, hasImportant) {
        if (hasVendorPrefix || hasImportant) {
            el.style.setProperty(style, value, hasImportant ? 'important' : '');
        }
        else {
            el.style[style] = value;
        }
    }
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} hasVendorPrefix
     * @return {?}
     */
    removeStyle(el, style, hasVendorPrefix) {
        if (hasVendorPrefix) {
            el.style.removeProperty(style);
        }
        else {
            // IE requires '' instead of null
            // see https://github.com/angular/angular/issues/7916
            el.style[style] = '';
        }
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(el, name, value) { el[name] = value; }
    /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    setValue(node, value) { node.nodeValue = value; }
    /**
     * @param {?} target
     * @param {?} event
     * @param {?} callback
     * @return {?}
     */
    listen(target, event, callback) {
        if (typeof target === 'string') {
            return (this.eventManager.addGlobalEventListener(target, event, decoratePreventDefault(callback)));
        }
        return ((this.eventManager.addEventListener(target, event, decoratePreventDefault(callback))));
    }
}
class EmulatedEncapsulationDomRendererV2 extends DefaultDomRendererV2 {
    /**
     * @param {?} eventManager
     * @param {?} sharedStylesHost
     * @param {?} component
     */
    constructor(eventManager, sharedStylesHost, component) {
        super(eventManager);
        this.component = component;
        const styles = flattenStyles(component.id, component.styles, []);
        sharedStylesHost.addStyles(styles);
        this.contentAttr = shimContentAttribute(component.id);
        this.hostAttr = shimHostAttribute(component.id);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    applyToHost(element) { super.setAttribute(element, this.hostAttr, ''); }
    /**
     * @param {?} parent
     * @param {?} name
     * @return {?}
     */
    createElement(parent, name) {
        const /** @type {?} */ el = super.createElement(parent, name);
        super.setAttribute(el, this.contentAttr, '');
        return el;
    }
}
class ShadowDomRenderer extends DefaultDomRendererV2 {
    /**
     * @param {?} eventManager
     * @param {?} sharedStylesHost
     * @param {?} hostEl
     * @param {?} component
     */
    constructor(eventManager, sharedStylesHost, hostEl, component) {
        super(eventManager);
        this.sharedStylesHost = sharedStylesHost;
        this.hostEl = hostEl;
        this.component = component;
        this.shadowRoot = hostEl.createShadowRoot();
        this.sharedStylesHost.addHost(this.shadowRoot);
        const styles = flattenStyles(component.id, component.styles, []);
        for (let i = 0; i < styles.length; i++) {
            const styleEl = document.createElement('style');
            styleEl.textContent = styles[i];
            this.shadowRoot.appendChild(styleEl);
        }
    }
    /**
     * @param {?} node
     * @return {?}
     */
    nodeOrShadowRoot(node) { return node === this.hostEl ? this.shadowRoot : node; }
    /**
     * @return {?}
     */
    destroy() { this.sharedStylesHost.removeHost(this.shadowRoot); }
    /**
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    appendChild(parent, newChild) {
        return super.appendChild(this.nodeOrShadowRoot(parent), newChild);
    }
    /**
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */
    insertBefore(parent, newChild, refChild) {
        return super.insertBefore(this.nodeOrShadowRoot(parent), newChild, refChild);
    }
    /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    removeChild(parent, oldChild) {
        return super.removeChild(this.nodeOrShadowRoot(parent), oldChild);
    }
    /**
     * @param {?} node
     * @return {?}
     */
    parentNode(node) {
        return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(node)));
    }
}

const /** @type {?} */ CORE_TOKENS = {
    'ApplicationRef': core.ApplicationRef,
    'NgZone': core.NgZone,
};
const /** @type {?} */ INSPECT_GLOBAL_NAME = 'ng.probe';
const /** @type {?} */ CORE_TOKENS_GLOBAL_NAME = 'ng.coreTokens';
/**
 * Returns a {\@link DebugElement} for the given native DOM element, or
 * null if the given native element does not have an Angular view associated
 * with it.
 * @param {?} element
 * @return {?}
 */
function inspectNativeElement(element) {
    return core.getDebugNode(element);
}
/**
 * Deprecated. Use the one from '\@angular/core'.
 * @deprecated
 */
class NgProbeToken {
    /**
     * @param {?} name
     * @param {?} token
     */
    constructor(name, token) {
        this.name = name;
        this.token = token;
    }
}
/**
 * @param {?} rootRenderer
 * @param {?} extraTokens
 * @param {?} coreTokens
 * @return {?}
 */
function _createConditionalRootRenderer(rootRenderer, extraTokens, coreTokens) {
    return core.isDevMode() ?
        _createRootRenderer(rootRenderer, (extraTokens || []).concat(coreTokens || [])) :
        rootRenderer;
}
/**
 * @param {?} rootRenderer
 * @param {?} extraTokens
 * @return {?}
 */
function _createRootRenderer(rootRenderer, extraTokens) {
    getDOM().setGlobalVar(INSPECT_GLOBAL_NAME, inspectNativeElement);
    getDOM().setGlobalVar(CORE_TOKENS_GLOBAL_NAME, StringMapWrapper.merge(CORE_TOKENS, _ngProbeTokensToMap(extraTokens || [])));
    return new core.ɵDebugDomRootRenderer(rootRenderer);
}
/**
 * @param {?} tokens
 * @return {?}
 */
function _ngProbeTokensToMap(tokens) {
    return tokens.reduce((prev, t) => (prev[t.name] = t.token, prev), {});
}
/**
 * Providers which support debugging Angular applications (e.g. via `ng.probe`).
 */
const /** @type {?} */ ELEMENT_PROBE_PROVIDERS = [
    {
        provide: core.RootRenderer,
        useFactory: _createConditionalRootRenderer,
        deps: [
            DomRootRenderer,
            [NgProbeToken, new core.Optional()],
            [core.NgProbeToken, new core.Optional()],
        ],
    },
];

class DomEventsPlugin extends EventManagerPlugin {
    /**
     * @param {?} doc
     */
    constructor(doc) { super(doc); }
    /**
     * @param {?} eventName
     * @return {?}
     */
    supports(eventName) { return true; }
    /**
     * @param {?} element
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */
    addEventListener(element, eventName, handler) {
        element.addEventListener(eventName, /** @type {?} */ (handler), false);
        return () => element.removeEventListener(eventName, /** @type {?} */ (handler), false);
    }
}
DomEventsPlugin.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DomEventsPlugin.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];

const /** @type {?} */ EVENT_NAMES = {
    // pan
    'pan': true,
    'panstart': true,
    'panmove': true,
    'panend': true,
    'pancancel': true,
    'panleft': true,
    'panright': true,
    'panup': true,
    'pandown': true,
    // pinch
    'pinch': true,
    'pinchstart': true,
    'pinchmove': true,
    'pinchend': true,
    'pinchcancel': true,
    'pinchin': true,
    'pinchout': true,
    // press
    'press': true,
    'pressup': true,
    // rotate
    'rotate': true,
    'rotatestart': true,
    'rotatemove': true,
    'rotateend': true,
    'rotatecancel': true,
    // swipe
    'swipe': true,
    'swipeleft': true,
    'swiperight': true,
    'swipeup': true,
    'swipedown': true,
    // tap
    'tap': true,
};
/**
 * A DI token that you can use to provide{@link HammerGestureConfig} to Angular. Use it to configure
 * Hammer gestures.
 *
 * @experimental
 */
const /** @type {?} */ HAMMER_GESTURE_CONFIG = new InjectionToken('HammerGestureConfig');
/**
 * \@experimental
 */
class HammerGestureConfig {
    constructor() {
        this.events = [];
        this.overrides = {};
    }
    /**
     * @param {?} element
     * @return {?}
     */
    buildHammer(element) {
        const /** @type {?} */ mc = new Hammer(element);
        mc.get('pinch').set({ enable: true });
        mc.get('rotate').set({ enable: true });
        for (const /** @type {?} */ eventName in this.overrides) {
            mc.get(eventName).set(this.overrides[eventName]);
        }
        return mc;
    }
}
HammerGestureConfig.decorators = [
    { type: Injectable },
];
/** @nocollapse */
HammerGestureConfig.ctorParameters = () => [];
class HammerGesturesPlugin extends EventManagerPlugin {
    /**
     * @param {?} doc
     * @param {?} _config
     */
    constructor(doc, _config) {
        super(doc);
        this._config = _config;
    }
    /**
     * @param {?} eventName
     * @return {?}
     */
    supports(eventName) {
        if (!EVENT_NAMES.hasOwnProperty(eventName.toLowerCase()) && !this.isCustomEvent(eventName)) {
            return false;
        }
        if (!((window)).Hammer) {
            throw new Error(`Hammer.js is not loaded, can not bind ${eventName} event`);
        }
        return true;
    }
    /**
     * @param {?} element
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */
    addEventListener(element, eventName, handler) {
        const /** @type {?} */ zone = this.manager.getZone();
        eventName = eventName.toLowerCase();
        return zone.runOutsideAngular(() => {
            // Creating the manager bind events, must be done outside of angular
            const /** @type {?} */ mc = this._config.buildHammer(element);
            const /** @type {?} */ callback = function (eventObj) {
                zone.runGuarded(function () { handler(eventObj); });
            };
            mc.on(eventName, callback);
            return () => mc.off(eventName, callback);
        });
    }
    /**
     * @param {?} eventName
     * @return {?}
     */
    isCustomEvent(eventName) { return this._config.events.indexOf(eventName) > -1; }
}
HammerGesturesPlugin.decorators = [
    { type: Injectable },
];
/** @nocollapse */
HammerGesturesPlugin.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: HammerGestureConfig, decorators: [{ type: Inject, args: [HAMMER_GESTURE_CONFIG,] },] },
];

const /** @type {?} */ MODIFIER_KEYS = ['alt', 'control', 'meta', 'shift'];
const /** @type {?} */ MODIFIER_KEY_GETTERS = {
    'alt': (event) => event.altKey,
    'control': (event) => event.ctrlKey,
    'meta': (event) => event.metaKey,
    'shift': (event) => event.shiftKey
};
/**
 * \@experimental
 */
class KeyEventsPlugin extends EventManagerPlugin {
    /**
     * @param {?} doc
     */
    constructor(doc) { super(doc); }
    /**
     * @param {?} eventName
     * @return {?}
     */
    supports(eventName) { return KeyEventsPlugin.parseEventName(eventName) != null; }
    /**
     * @param {?} element
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */
    addEventListener(element, eventName, handler) {
        const /** @type {?} */ parsedEvent = KeyEventsPlugin.parseEventName(eventName);
        const /** @type {?} */ outsideHandler = KeyEventsPlugin.eventCallback(parsedEvent['fullKey'], handler, this.manager.getZone());
        return this.manager.getZone().runOutsideAngular(() => {
            return getDOM().onAndCancel(element, parsedEvent['domEventName'], outsideHandler);
        });
    }
    /**
     * @param {?} eventName
     * @return {?}
     */
    static parseEventName(eventName) {
        const /** @type {?} */ parts = eventName.toLowerCase().split('.');
        const /** @type {?} */ domEventName = parts.shift();
        if ((parts.length === 0) || !(domEventName === 'keydown' || domEventName === 'keyup')) {
            return null;
        }
        const /** @type {?} */ key = KeyEventsPlugin._normalizeKey(parts.pop());
        let /** @type {?} */ fullKey = '';
        MODIFIER_KEYS.forEach(modifierName => {
            const /** @type {?} */ index = parts.indexOf(modifierName);
            if (index > -1) {
                parts.splice(index, 1);
                fullKey += modifierName + '.';
            }
        });
        fullKey += key;
        if (parts.length != 0 || key.length === 0) {
            // returning null instead of throwing to let another plugin process the event
            return null;
        }
        const /** @type {?} */ result = {};
        result['domEventName'] = domEventName;
        result['fullKey'] = fullKey;
        return result;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    static getEventFullKey(event) {
        let /** @type {?} */ fullKey = '';
        let /** @type {?} */ key = getDOM().getEventKey(event);
        key = key.toLowerCase();
        if (key === ' ') {
            key = 'space'; // for readability
        }
        else if (key === '.') {
            key = 'dot'; // because '.' is used as a separator in event names
        }
        MODIFIER_KEYS.forEach(modifierName => {
            if (modifierName != key) {
                const /** @type {?} */ modifierGetter = MODIFIER_KEY_GETTERS[modifierName];
                if (modifierGetter(event)) {
                    fullKey += modifierName + '.';
                }
            }
        });
        fullKey += key;
        return fullKey;
    }
    /**
     * @param {?} fullKey
     * @param {?} handler
     * @param {?} zone
     * @return {?}
     */
    static eventCallback(fullKey, handler, zone) {
        return (event /** TODO #9100 */) => {
            if (KeyEventsPlugin.getEventFullKey(event) === fullKey) {
                zone.runGuarded(() => handler(event));
            }
        };
    }
    /**
     * \@internal
     * @param {?} keyName
     * @return {?}
     */
    static _normalizeKey(keyName) {
        // TODO: switch to a Map if the mapping grows too much
        switch (keyName) {
            case 'esc':
                return 'escape';
            default:
                return keyName;
        }
    }
}
KeyEventsPlugin.decorators = [
    { type: Injectable },
];
/** @nocollapse */
KeyEventsPlugin.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];

/**
 * A pattern that recognizes a commonly useful subset of URLs that are safe.
 *
 * This regular expression matches a subset of URLs that will not cause script
 * execution if used in URL context within a HTML document. Specifically, this
 * regular expression matches if (comment from here on and regex copied from
 * Soy's EscapingConventions):
 * (1) Either a protocol in a whitelist (http, https, mailto or ftp).
 * (2) or no protocol.  A protocol must be followed by a colon. The below
 *     allows that by allowing colons only after one of the characters [/?#].
 *     A colon after a hash (#) must be in the fragment.
 *     Otherwise, a colon after a (?) must be in a query.
 *     Otherwise, a colon after a single solidus (/) must be in a path.
 *     Otherwise, a colon after a double solidus (//) must be in the authority
 *     (before port).
 *
 * The pattern disallows &, used in HTML entity declarations before
 * one of the characters in [/?#]. This disallows HTML entities used in the
 * protocol name, which should never happen, e.g. "h&#116;tp" for "http".
 * It also disallows HTML entities in the first path part of a relative path,
 * e.g. "foo&lt;bar/baz".  Our existing escaping functions should not produce
 * that. More importantly, it disallows masking of a colon,
 * e.g. "javascript&#58;...".
 *
 * This regular expression was taken from the Closure sanitization library.
 */
const /** @type {?} */ SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
/** A pattern that matches safe data URLs. Only matches image, video and audio types. */
const /** @type {?} */ DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
/**
 * @param {?} url
 * @return {?}
 */
function sanitizeUrl(url) {
    url = String(url);
    if (url.match(SAFE_URL_PATTERN) || url.match(DATA_URL_PATTERN))
        return url;
    if (isDevMode()) {
        getDOM().log(`WARNING: sanitizing unsafe URL value ${url} (see http://g.co/ng/security#xss)`);
    }
    return 'unsafe:' + url;
}
/**
 * @param {?} srcset
 * @return {?}
 */
function sanitizeSrcset(srcset) {
    srcset = String(srcset);
    return srcset.split(',').map((srcset) => sanitizeUrl(srcset.trim())).join(', ');
}

/** A <body> element that can be safely used to parse untrusted HTML. Lazily initialized below. */
let /** @type {?} */ inertElement = null;
/** Lazily initialized to make sure the DOM adapter gets set before use. */
let /** @type {?} */ DOM = null;
/**
 * Returns an HTML element that is guaranteed to not execute code when creating elements in it.
 * @return {?}
 */
function getInertElement() {
    if (inertElement)
        return inertElement;
    DOM = getDOM();
    // Prefer using <template> element if supported.
    const /** @type {?} */ templateEl = DOM.createElement('template');
    if ('content' in templateEl)
        return templateEl;
    const /** @type {?} */ doc = DOM.createHtmlDocument();
    inertElement = DOM.querySelector(doc, 'body');
    if (inertElement == null) {
        // usually there should be only one body element in the document, but IE doesn't have any, so we
        // need to create one.
        const /** @type {?} */ html = DOM.createElement('html', doc);
        inertElement = DOM.createElement('body', doc);
        DOM.appendChild(html, inertElement);
        DOM.appendChild(doc, html);
    }
    return inertElement;
}
/**
 * @param {?} tags
 * @return {?}
 */
function tagSet(tags) {
    const /** @type {?} */ res = {};
    for (const /** @type {?} */ t of tags.split(','))
        res[t] = true;
    return res;
}
/**
 * @param {...?} sets
 * @return {?}
 */
function merge(...sets) {
    const /** @type {?} */ res = {};
    for (const /** @type {?} */ s of sets) {
        for (const /** @type {?} */ v in s) {
            if (s.hasOwnProperty(v))
                res[v] = true;
        }
    }
    return res;
}
// Good source of info about elements and attributes
// http://dev.w3.org/html5/spec/Overview.html#semantics
// http://simon.html5.org/html-elements
// Safe Void Elements - HTML5
// http://dev.w3.org/html5/spec/Overview.html#void-elements
const /** @type {?} */ VOID_ELEMENTS = tagSet('area,br,col,hr,img,wbr');
// Elements that you can, intentionally, leave open (and which close themselves)
// http://dev.w3.org/html5/spec/Overview.html#optional-tags
const /** @type {?} */ OPTIONAL_END_TAG_BLOCK_ELEMENTS = tagSet('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr');
const /** @type {?} */ OPTIONAL_END_TAG_INLINE_ELEMENTS = tagSet('rp,rt');
const /** @type {?} */ OPTIONAL_END_TAG_ELEMENTS = merge(OPTIONAL_END_TAG_INLINE_ELEMENTS, OPTIONAL_END_TAG_BLOCK_ELEMENTS);
// Safe Block Elements - HTML5
const /** @type {?} */ BLOCK_ELEMENTS = merge(OPTIONAL_END_TAG_BLOCK_ELEMENTS, tagSet('address,article,' +
    'aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,' +
    'h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'));
// Inline Elements - HTML5
const /** @type {?} */ INLINE_ELEMENTS = merge(OPTIONAL_END_TAG_INLINE_ELEMENTS, tagSet('a,abbr,acronym,audio,b,' +
    'bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,' +
    'samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'));
const /** @type {?} */ VALID_ELEMENTS = merge(VOID_ELEMENTS, BLOCK_ELEMENTS, INLINE_ELEMENTS, OPTIONAL_END_TAG_ELEMENTS);
// Attributes that have href and hence need to be sanitized
const /** @type {?} */ URI_ATTRS = tagSet('background,cite,href,itemtype,longdesc,poster,src,xlink:href');
// Attributes that have special href set hence need to be sanitized
const /** @type {?} */ SRCSET_ATTRS = tagSet('srcset');
const /** @type {?} */ HTML_ATTRS = tagSet('abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,' +
    'compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,' +
    'ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,' +
    'scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,' +
    'valign,value,vspace,width');
// NB: This currently conciously doesn't support SVG. SVG sanitization has had several security
// issues in the past, so it seems safer to leave it out if possible. If support for binding SVG via
// innerHTML is required, SVG attributes should be added here.
// NB: Sanitization does not allow <form> elements or other active elements (<button> etc). Those
// can be sanitized, but they increase security surface area without a legitimate use case, so they
// are left out here.
const /** @type {?} */ VALID_ATTRS = merge(URI_ATTRS, SRCSET_ATTRS, HTML_ATTRS);
/**
 * SanitizingHtmlSerializer serializes a DOM fragment, stripping out any unsafe elements and unsafe
 * attributes.
 */
class SanitizingHtmlSerializer {
    constructor() {
        this.sanitizedSomething = false;
        this.buf = [];
    }
    /**
     * @param {?} el
     * @return {?}
     */
    sanitizeChildren(el) {
        // This cannot use a TreeWalker, as it has to run on Angular's various DOM adapters.
        // However this code never accesses properties off of `document` before deleting its contents
        // again, so it shouldn't be vulnerable to DOM clobbering.
        let /** @type {?} */ current = el.firstChild;
        while (current) {
            if (DOM.isElementNode(current)) {
                this.startElement(/** @type {?} */ (current));
            }
            else if (DOM.isTextNode(current)) {
                this.chars(DOM.nodeValue(current));
            }
            else {
                // Strip non-element, non-text nodes.
                this.sanitizedSomething = true;
            }
            if (DOM.firstChild(current)) {
                current = DOM.firstChild(current);
                continue;
            }
            while (current) {
                // Leaving the element. Walk up and to the right, closing tags as we go.
                if (DOM.isElementNode(current)) {
                    this.endElement(/** @type {?} */ (current));
                }
                if (DOM.nextSibling(current)) {
                    current = DOM.nextSibling(current);
                    break;
                }
                current = DOM.parentElement(current);
            }
        }
        return this.buf.join('');
    }
    /**
     * @param {?} element
     * @return {?}
     */
    startElement(element) {
        const /** @type {?} */ tagName = DOM.nodeName(element).toLowerCase();
        if (!VALID_ELEMENTS.hasOwnProperty(tagName)) {
            this.sanitizedSomething = true;
            return;
        }
        this.buf.push('<');
        this.buf.push(tagName);
        DOM.attributeMap(element).forEach((value, attrName) => {
            const /** @type {?} */ lower = attrName.toLowerCase();
            if (!VALID_ATTRS.hasOwnProperty(lower)) {
                this.sanitizedSomething = true;
                return;
            }
            // TODO(martinprobst): Special case image URIs for data:image/...
            if (URI_ATTRS[lower])
                value = sanitizeUrl(value);
            if (SRCSET_ATTRS[lower])
                value = sanitizeSrcset(value);
            this.buf.push(' ');
            this.buf.push(attrName);
            this.buf.push('="');
            this.buf.push(encodeEntities(value));
            this.buf.push('"');
        });
        this.buf.push('>');
    }
    /**
     * @param {?} current
     * @return {?}
     */
    endElement(current) {
        const /** @type {?} */ tagName = DOM.nodeName(current).toLowerCase();
        if (VALID_ELEMENTS.hasOwnProperty(tagName) && !VOID_ELEMENTS.hasOwnProperty(tagName)) {
            this.buf.push('</');
            this.buf.push(tagName);
            this.buf.push('>');
        }
    }
    /**
     * @param {?} chars
     * @return {?}
     */
    chars(chars /** TODO #9100 */) { this.buf.push(encodeEntities(chars)); }
}
// Regular Expressions for parsing tags and attributes
const /** @type {?} */ SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
// ! to ~ is the ASCII range.
const /** @type {?} */ NON_ALPHANUMERIC_REGEXP = /([^\#-~ |!])/g;
/**
 * Escapes all potentially dangerous characters, so that the
 * resulting string can be safely inserted into attribute or
 * element text.
 * @param {?} value
 * @return {?}
 */
function encodeEntities(value) {
    return value.replace(/&/g, '&amp;')
        .replace(SURROGATE_PAIR_REGEXP, function (match) {
        const /** @type {?} */ hi = match.charCodeAt(0);
        const /** @type {?} */ low = match.charCodeAt(1);
        return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';
    })
        .replace(NON_ALPHANUMERIC_REGEXP, function (match) { return '&#' + match.charCodeAt(0) + ';'; })
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
/**
 * When IE9-11 comes across an unknown namespaced attribute e.g. 'xlink:foo' it adds 'xmlns:ns1'
 * attribute to declare ns1 namespace and prefixes the attribute with 'ns1' (e.g. 'ns1:xlink:foo').
 *
 * This is undesirable since we don't want to allow any of these custom attributes. This method
 * strips them all.
 * @param {?} el
 * @return {?}
 */
function stripCustomNsAttrs(el) {
    DOM.attributeMap(el).forEach((_, attrName) => {
        if (attrName === 'xmlns:ns1' || attrName.indexOf('ns1:') === 0) {
            DOM.removeAttribute(el, attrName);
        }
    });
    for (const /** @type {?} */ n of DOM.childNodesAsList(el)) {
        if (DOM.isElementNode(n))
            stripCustomNsAttrs(/** @type {?} */ (n));
    }
}
/**
 * Sanitizes the given unsafe, untrusted HTML fragment, and returns HTML text that is safe to add to
 * the DOM in a browser environment.
 * @param {?} defaultDoc
 * @param {?} unsafeHtmlInput
 * @return {?}
 */
function sanitizeHtml(defaultDoc, unsafeHtmlInput) {
    try {
        const /** @type {?} */ containerEl = getInertElement();
        // Make sure unsafeHtml is actually a string (TypeScript types are not enforced at runtime).
        let /** @type {?} */ unsafeHtml = unsafeHtmlInput ? String(unsafeHtmlInput) : '';
        // mXSS protection. Repeatedly parse the document to make sure it stabilizes, so that a browser
        // trying to auto-correct incorrect HTML cannot cause formerly inert HTML to become dangerous.
        let /** @type {?} */ mXSSAttempts = 5;
        let /** @type {?} */ parsedHtml = unsafeHtml;
        do {
            if (mXSSAttempts === 0) {
                throw new Error('Failed to sanitize html because the input is unstable');
            }
            mXSSAttempts--;
            unsafeHtml = parsedHtml;
            DOM.setInnerHTML(containerEl, unsafeHtml);
            if (defaultDoc.documentMode) {
                // strip custom-namespaced attributes on IE<=11
                stripCustomNsAttrs(containerEl);
            }
            parsedHtml = DOM.getInnerHTML(containerEl);
        } while (unsafeHtml !== parsedHtml);
        const /** @type {?} */ sanitizer = new SanitizingHtmlSerializer();
        const /** @type {?} */ safeHtml = sanitizer.sanitizeChildren(DOM.getTemplateContent(containerEl) || containerEl);
        // Clear out the body element.
        const /** @type {?} */ parent = DOM.getTemplateContent(containerEl) || containerEl;
        for (const /** @type {?} */ child of DOM.childNodesAsList(parent)) {
            DOM.removeChild(parent, child);
        }
        if (isDevMode() && sanitizer.sanitizedSomething) {
            DOM.log('WARNING: sanitizing HTML stripped some content (see http://g.co/ng/security#xss).');
        }
        return safeHtml;
    }
    catch (e) {
        // In case anything goes wrong, clear out inertElement to reset the entire DOM structure.
        inertElement = null;
        throw e;
    }
}

/**
 * Regular expression for safe style values.
 *
 * Quotes (" and ') are allowed, but a check must be done elsewhere to ensure they're balanced.
 *
 * ',' allows multiple values to be assigned to the same property (e.g. background-attachment or
 * font-family) and hence could allow multiple values to get injected, but that should pose no risk
 * of XSS.
 *
 * The function expression checks only for XSS safety, not for CSS validity.
 *
 * This regular expression was taken from the Closure sanitization library, and augmented for
 * transformation values.
 */
const /** @type {?} */ VALUES = '[-,."\'%_!# a-zA-Z0-9]+';
const /** @type {?} */ TRANSFORMATION_FNS = '(?:matrix|translate|scale|rotate|skew|perspective)(?:X|Y|3d)?';
const /** @type {?} */ COLOR_FNS = '(?:rgb|hsl)a?';
const /** @type {?} */ GRADIENTS = '(?:repeating-)?(?:linear|radial)-gradient';
const /** @type {?} */ CSS3_FNS = '(?:calc|attr)';
const /** @type {?} */ FN_ARGS = '\\([-0-9.%, #a-zA-Z]+\\)';
const /** @type {?} */ SAFE_STYLE_VALUE = new RegExp(`^(${VALUES}|` +
    `(?:${TRANSFORMATION_FNS}|${COLOR_FNS}|${GRADIENTS}|${CSS3_FNS})` +
    `${FN_ARGS})$`, 'g');
/**
 * Matches a `url(...)` value with an arbitrary argument as long as it does
 * not contain parentheses.
 *
 * The URL value still needs to be sanitized separately.
 *
 * `url(...)` values are a very common use case, e.g. for `background-image`. With carefully crafted
 * CSS style rules, it is possible to construct an information leak with `url` values in CSS, e.g.
 * by observing whether scroll bars are displayed, or character ranges used by a font face
 * definition.
 *
 * Angular only allows binding CSS values (as opposed to entire CSS rules), so it is unlikely that
 * binding a URL value without further cooperation from the page will cause an information leak, and
 * if so, it is just a leak, not a full blown XSS vulnerability.
 *
 * Given the common use case, low likelihood of attack vector, and low impact of an attack, this
 * code is permissive and allows URLs that sanitize otherwise.
 */
const /** @type {?} */ URL_RE = /^url\(([^)]+)\)$/;
/**
 * Checks that quotes (" and ') are properly balanced inside a string. Assumes
 * that neither escape (\) nor any other character that could result in
 * breaking out of a string parsing context are allowed;
 * see http://www.w3.org/TR/css3-syntax/#string-token-diagram.
 *
 * This code was taken from the Closure sanitization library.
 * @param {?} value
 * @return {?}
 */
function hasBalancedQuotes(value) {
    let /** @type {?} */ outsideSingle = true;
    let /** @type {?} */ outsideDouble = true;
    for (let /** @type {?} */ i = 0; i < value.length; i++) {
        const /** @type {?} */ c = value.charAt(i);
        if (c === '\'' && outsideDouble) {
            outsideSingle = !outsideSingle;
        }
        else if (c === '"' && outsideSingle) {
            outsideDouble = !outsideDouble;
        }
    }
    return outsideSingle && outsideDouble;
}
/**
 * Sanitizes the given untrusted CSS style property value (i.e. not an entire object, just a single
 * value) and returns a value that is safe to use in a browser environment.
 * @param {?} value
 * @return {?}
 */
function sanitizeStyle(value) {
    value = String(value).trim(); // Make sure it's actually a string.
    if (!value)
        return '';
    // Single url(...) values are supported, but only for URLs that sanitize cleanly. See above for
    // reasoning behind this.
    const /** @type {?} */ urlMatch = value.match(URL_RE);
    if ((urlMatch && sanitizeUrl(urlMatch[1]) === urlMatch[1]) ||
        value.match(SAFE_STYLE_VALUE) && hasBalancedQuotes(value)) {
        return value; // Safe style values.
    }
    if (isDevMode()) {
        getDOM().log(`WARNING: sanitizing unsafe style value ${value} (see http://g.co/ng/security#xss).`);
    }
    return 'unsafe';
}

/**
 * DomSanitizer helps preventing Cross Site Scripting Security bugs (XSS) by sanitizing
 * values to be safe to use in the different DOM contexts.
 *
 * For example, when binding a URL in an `<a [href]="someValue">` hyperlink, `someValue` will be
 * sanitized so that an attacker cannot inject e.g. a `javascript:` URL that would execute code on
 * the website.
 *
 * In specific situations, it might be necessary to disable sanitization, for example if the
 * application genuinely needs to produce a `javascript:` style link with a dynamic value in it.
 * Users can bypass security by constructing a value with one of the `bypassSecurityTrust...`
 * methods, and then binding to that value from the template.
 *
 * These situations should be very rare, and extraordinary care must be taken to avoid creating a
 * Cross Site Scripting (XSS) security bug!
 *
 * When using `bypassSecurityTrust...`, make sure to call the method as early as possible and as
 * close as possible to the source of the value, to make it easy to verify no security bug is
 * created by its use.
 *
 * It is not required (and not recommended) to bypass security if the value is safe, e.g. a URL that
 * does not start with a suspicious protocol, or an HTML snippet that does not contain dangerous
 * code. The sanitizer leaves safe values intact.
 *
 * \@security Calling any of the `bypassSecurityTrust...` APIs disables Angular's built-in
 * sanitization for the value passed in. Carefully check and audit all values and code paths going
 * into this call. Make sure any user data is appropriately escaped for this security context.
 * For more detail, see the [Security Guide](http://g.co/ng/security).
 *
 * \@stable
 * @abstract
 */
class DomSanitizer {
    /**
     * Sanitizes a value for use in the given SecurityContext.
     *
     * If value is trusted for the context, this method will unwrap the contained safe value and use
     * it directly. Otherwise, value will be sanitized to be safe in the given context, for example
     * by replacing URLs that have an unsafe protocol part (such as `javascript:`). The implementation
     * is responsible to make sure that the value can definitely be safely used in the given context.
     * @abstract
     * @param {?} context
     * @param {?} value
     * @return {?}
     */
    sanitize(context, value) { }
    /**
     * Bypass security and trust the given value to be safe HTML. Only use this when the bound HTML
     * is unsafe (e.g. contains `<script>` tags) and the code should be executed. The sanitizer will
     * leave safe HTML intact, so in most situations this method should not be used.
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     * @abstract
     * @param {?} value
     * @return {?}
     */
    bypassSecurityTrustHtml(value) { }
    /**
     * Bypass security and trust the given value to be safe style value (CSS).
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     * @abstract
     * @param {?} value
     * @return {?}
     */
    bypassSecurityTrustStyle(value) { }
    /**
     * Bypass security and trust the given value to be safe JavaScript.
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     * @abstract
     * @param {?} value
     * @return {?}
     */
    bypassSecurityTrustScript(value) { }
    /**
     * Bypass security and trust the given value to be a safe style URL, i.e. a value that can be used
     * in hyperlinks or `<img src>`.
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     * @abstract
     * @param {?} value
     * @return {?}
     */
    bypassSecurityTrustUrl(value) { }
    /**
     * Bypass security and trust the given value to be a safe resource URL, i.e. a location that may
     * be used to load executable code from, like `<script src>`, or `<iframe src>`.
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     * @abstract
     * @param {?} value
     * @return {?}
     */
    bypassSecurityTrustResourceUrl(value) { }
}
class DomSanitizerImpl extends DomSanitizer {
    /**
     * @param {?} _doc
     */
    constructor(_doc) {
        super();
        this._doc = _doc;
    }
    /**
     * @param {?} ctx
     * @param {?} value
     * @return {?}
     */
    sanitize(ctx, value) {
        if (value == null)
            return null;
        switch (ctx) {
            case SecurityContext.NONE:
                return value;
            case SecurityContext.HTML:
                if (value instanceof SafeHtmlImpl)
                    return value.changingThisBreaksApplicationSecurity;
                this.checkNotSafeValue(value, 'HTML');
                return sanitizeHtml(this._doc, String(value));
            case SecurityContext.STYLE:
                if (value instanceof SafeStyleImpl)
                    return value.changingThisBreaksApplicationSecurity;
                this.checkNotSafeValue(value, 'Style');
                return sanitizeStyle(value);
            case SecurityContext.SCRIPT:
                if (value instanceof SafeScriptImpl)
                    return value.changingThisBreaksApplicationSecurity;
                this.checkNotSafeValue(value, 'Script');
                throw new Error('unsafe value used in a script context');
            case SecurityContext.URL:
                if (value instanceof SafeResourceUrlImpl || value instanceof SafeUrlImpl) {
                    // Allow resource URLs in URL contexts, they are strictly more trusted.
                    return value.changingThisBreaksApplicationSecurity;
                }
                this.checkNotSafeValue(value, 'URL');
                return sanitizeUrl(String(value));
            case SecurityContext.RESOURCE_URL:
                if (value instanceof SafeResourceUrlImpl) {
                    return value.changingThisBreaksApplicationSecurity;
                }
                this.checkNotSafeValue(value, 'ResourceURL');
                throw new Error('unsafe value used in a resource URL context (see http://g.co/ng/security#xss)');
            default:
                throw new Error(`Unexpected SecurityContext ${ctx} (see http://g.co/ng/security#xss)`);
        }
    }
    /**
     * @param {?} value
     * @param {?} expectedType
     * @return {?}
     */
    checkNotSafeValue(value, expectedType) {
        if (value instanceof SafeValueImpl) {
            throw new Error(`Required a safe ${expectedType}, got a ${value.getTypeName()} ` +
                `(see http://g.co/ng/security#xss)`);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    bypassSecurityTrustHtml(value) { return new SafeHtmlImpl(value); }
    /**
     * @param {?} value
     * @return {?}
     */
    bypassSecurityTrustStyle(value) { return new SafeStyleImpl(value); }
    /**
     * @param {?} value
     * @return {?}
     */
    bypassSecurityTrustScript(value) { return new SafeScriptImpl(value); }
    /**
     * @param {?} value
     * @return {?}
     */
    bypassSecurityTrustUrl(value) { return new SafeUrlImpl(value); }
    /**
     * @param {?} value
     * @return {?}
     */
    bypassSecurityTrustResourceUrl(value) {
        return new SafeResourceUrlImpl(value);
    }
}
DomSanitizerImpl.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DomSanitizerImpl.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];
/**
 * @abstract
 */
class SafeValueImpl {
    /**
     * @param {?} changingThisBreaksApplicationSecurity
     */
    constructor(changingThisBreaksApplicationSecurity) {
        this.changingThisBreaksApplicationSecurity = changingThisBreaksApplicationSecurity;
        // empty
    }
    /**
     * @abstract
     * @return {?}
     */
    getTypeName() { }
    /**
     * @return {?}
     */
    toString() {
        return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity}` +
            ` (see http://g.co/ng/security#xss)`;
    }
}
class SafeHtmlImpl extends SafeValueImpl {
    /**
     * @return {?}
     */
    getTypeName() { return 'HTML'; }
}
class SafeStyleImpl extends SafeValueImpl {
    /**
     * @return {?}
     */
    getTypeName() { return 'Style'; }
}
class SafeScriptImpl extends SafeValueImpl {
    /**
     * @return {?}
     */
    getTypeName() { return 'Script'; }
}
class SafeUrlImpl extends SafeValueImpl {
    /**
     * @return {?}
     */
    getTypeName() { return 'URL'; }
}
class SafeResourceUrlImpl extends SafeValueImpl {
    /**
     * @return {?}
     */
    getTypeName() { return 'ResourceURL'; }
}

const /** @type {?} */ INTERNAL_BROWSER_PLATFORM_PROVIDERS = [
    { provide: PLATFORM_ID, useValue: ɵPLATFORM_BROWSER_ID },
    { provide: PLATFORM_INITIALIZER, useValue: initDomAdapter, multi: true },
    { provide: PlatformLocation, useClass: BrowserPlatformLocation },
    { provide: DOCUMENT, useFactory: _document, deps: [] },
];
/**
 * @security Replacing built-in sanitization providers exposes the application to XSS risks.
 * Attacker-controlled data introduced by an unsanitized provider could expose your
 * application to XSS risks. For more detail, see the [Security Guide](http://g.co/ng/security).
 * @experimental
 */
const /** @type {?} */ BROWSER_SANITIZATION_PROVIDERS = [
    { provide: Sanitizer, useExisting: DomSanitizer },
    { provide: DomSanitizer, useClass: DomSanitizerImpl },
];
/**
 * @stable
 */
const /** @type {?} */ platformBrowser = createPlatformFactory(platformCore, 'browser', INTERNAL_BROWSER_PLATFORM_PROVIDERS);
/**
 * @return {?}
 */
function initDomAdapter() {
    BrowserDomAdapter.makeCurrent();
    BrowserGetTestability.init();
}
/**
 * @return {?}
 */
function errorHandler() {
    return new ErrorHandler();
}
/**
 * @return {?}
 */
function _document() {
    return document;
}
/**
 * @return {?}
 */
function _resolveDefaultAnimationDriver() {
    if (getDOM().supportsWebAnimation()) {
        return new WebAnimationsDriver();
    }
    return AnimationDriver.NOOP;
}
/**
 * The ng module for the browser.
 *
 * \@stable
 */
class BrowserModule {
    /**
     * @param {?} parentModule
     */
    constructor(parentModule) {
        if (parentModule) {
            throw new Error(`BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.`);
        }
    }
    /**
     * Configures a browser-based application to transition from a server-rendered app, if
     * one is present on the page. The specified parameters must include an application id,
     * which must match between the client and server applications.
     *
     * \@experimental
     * @param {?} params
     * @return {?}
     */
    static withServerTransition(params) {
        return {
            ngModule: BrowserModule,
            providers: [
                { provide: APP_ID, useValue: params.appId },
                { provide: TRANSITION_ID, useExisting: APP_ID },
                SERVER_TRANSITION_PROVIDERS,
            ],
        };
    }
}
BrowserModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    BROWSER_SANITIZATION_PROVIDERS,
                    { provide: ErrorHandler, useFactory: errorHandler, deps: [] },
                    { provide: EVENT_MANAGER_PLUGINS, useClass: DomEventsPlugin, multi: true },
                    { provide: EVENT_MANAGER_PLUGINS, useClass: KeyEventsPlugin, multi: true },
                    { provide: EVENT_MANAGER_PLUGINS, useClass: HammerGesturesPlugin, multi: true },
                    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig },
                    { provide: DomRootRenderer, useClass: DomRootRenderer_ },
                    { provide: RootRenderer, useExisting: DomRootRenderer },
                    DomRendererFactoryV2,
                    { provide: RendererFactoryV2, useExisting: DomRendererFactoryV2 },
                    { provide: SharedStylesHost, useExisting: DomSharedStylesHost },
                    { provide: AnimationDriver, useFactory: _resolveDefaultAnimationDriver },
                    DomSharedStylesHost,
                    Testability,
                    EventManager,
                    ELEMENT_PROBE_PROVIDERS,
                    Meta,
                    Title,
                ],
                exports: [CommonModule, ApplicationModule]
            },] },
];
/** @nocollapse */
BrowserModule.ctorParameters = () => [
    { type: BrowserModule, decorators: [{ type: Optional }, { type: SkipSelf },] },
];

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * JS version of browser APIs. This library can only run in the browser.
 */
const /** @type {?} */ win = typeof window !== 'undefined' && window || ({});

class ChangeDetectionPerfRecord {
    /**
     * @param {?} msPerTick
     * @param {?} numTicks
     */
    constructor(msPerTick, numTicks) {
        this.msPerTick = msPerTick;
        this.numTicks = numTicks;
    }
}
/**
 * Entry point for all Angular profiling-related debug tools. This object
 * corresponds to the `ng.profiler` in the dev console.
 */
class AngularProfiler {
    /**
     * @param {?} ref
     */
    constructor(ref) { this.appRef = ref.injector.get(ApplicationRef); }
    /**
     * Exercises change detection in a loop and then prints the average amount of
     * time in milliseconds how long a single round of change detection takes for
     * the current state of the UI. It runs a minimum of 5 rounds for a minimum
     * of 500 milliseconds.
     *
     * Optionally, a user may pass a `config` parameter containing a map of
     * options. Supported options are:
     *
     * `record` (boolean) - causes the profiler to record a CPU profile while
     * it exercises the change detector. Example:
     *
     * ```
     * ng.profiler.timeChangeDetection({record: true})
     * ```
     * @param {?} config
     * @return {?}
     */
    timeChangeDetection(config) {
        const /** @type {?} */ record = config && config['record'];
        const /** @type {?} */ profileName = 'Change Detection';
        // Profiler is not available in Android browsers, nor in IE 9 without dev tools opened
        const /** @type {?} */ isProfilerAvailable = isPresent(win.console.profile);
        if (record && isProfilerAvailable) {
            win.console.profile(profileName);
        }
        const /** @type {?} */ start = getDOM().performanceNow();
        let /** @type {?} */ numTicks = 0;
        while (numTicks < 5 || (getDOM().performanceNow() - start) < 500) {
            this.appRef.tick();
            numTicks++;
        }
        const /** @type {?} */ end = getDOM().performanceNow();
        if (record && isProfilerAvailable) {
            // need to cast to <any> because type checker thinks there's no argument
            // while in fact there is:
            //
            // https://developer.mozilla.org/en-US/docs/Web/API/Console/profileEnd
            ((win.console.profileEnd))(profileName);
        }
        const /** @type {?} */ msPerTick = (end - start) / numTicks;
        win.console.log(`ran ${numTicks} change detection cycles`);
        win.console.log(`${msPerTick.toFixed(2)} ms per check`);
        return new ChangeDetectionPerfRecord(msPerTick, numTicks);
    }
}

const /** @type {?} */ PROFILER_GLOBAL_NAME = 'ng.profiler';
/**
 * Enabled Angular debug tools that are accessible via your browser's
 * developer console.
 *
 * Usage:
 *
 * 1. Open developer console (e.g. in Chrome Ctrl + Shift + j)
 * 1. Type `ng.` (usually the console will show auto-complete suggestion)
 * 1. Try the change detection profiler `ng.profiler.timeChangeDetection()`
 *    then hit Enter.
 *
 * \@experimental All debugging apis are currently experimental.
 * @param {?} ref
 * @return {?}
 */
function enableDebugTools(ref) {
    getDOM().setGlobalVar(PROFILER_GLOBAL_NAME, new AngularProfiler(ref));
    return ref;
}
/**
 * Disables Angular tools.
 *
 * \@experimental All debugging apis are currently experimental.
 * @return {?}
 */
function disableDebugTools() {
    getDOM().setGlobalVar(PROFILER_GLOBAL_NAME, null);
}

/**
 * Predicates for use with {\@link DebugElement}'s query functions.
 *
 * \@experimental All debugging apis are currently experimental.
 */
class By {
    /**
     * Match all elements.
     *
     * ## Example
     *
     * {\@example platform-browser/dom/debug/ts/by/by.ts region='by_all'}
     * @return {?}
     */
    static all() { return (debugElement) => true; }
    /**
     * Match elements by the given CSS selector.
     *
     * ## Example
     *
     * {\@example platform-browser/dom/debug/ts/by/by.ts region='by_css'}
     * @param {?} selector
     * @return {?}
     */
    static css(selector) {
        return (debugElement) => {
            return isPresent(debugElement.nativeElement) ?
                getDOM().elementMatches(debugElement.nativeElement, selector) :
                false;
        };
    }
    /**
     * Match elements that have the given directive present.
     *
     * ## Example
     *
     * {\@example platform-browser/dom/debug/ts/by/by.ts region='by_directive'}
     * @param {?} type
     * @return {?}
     */
    static directive(type) {
        return (debugElement) => debugElement.providerTokens.indexOf(type) !== -1;
    }
}

/**
 * @stable
 */
const /** @type {?} */ VERSION = new Version('4.0.0-beta.8-41da599');

export { BrowserModule, platformBrowser, Meta, Title, disableDebugTools, enableDebugTools, AnimationDriver, By, NgProbeToken, DOCUMENT, EVENT_MANAGER_PLUGINS, EventManager, HAMMER_GESTURE_CONFIG, HammerGestureConfig, DomSanitizer, VERSION, BROWSER_SANITIZATION_PROVIDERS as ɵBROWSER_SANITIZATION_PROVIDERS, INTERNAL_BROWSER_PLATFORM_PROVIDERS as ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS, initDomAdapter as ɵinitDomAdapter, BrowserDomAdapter as ɵBrowserDomAdapter, BrowserPlatformLocation as ɵBrowserPlatformLocation, TRANSITION_ID as ɵTRANSITION_ID, BrowserGetTestability as ɵBrowserGetTestability, ELEMENT_PROBE_PROVIDERS as ɵELEMENT_PROBE_PROVIDERS, DomAdapter as ɵDomAdapter, getDOM as ɵgetDOM, setRootDomAdapter as ɵsetRootDomAdapter, DomRendererFactoryV2 as ɵDomRendererFactoryV2, DomRootRenderer as ɵDomRootRenderer, DomRootRenderer_ as ɵDomRootRenderer_, NAMESPACE_URIS as ɵNAMESPACE_URIS, flattenStyles as ɵflattenStyles, isNamespaced as ɵisNamespaced, shimContentAttribute as ɵshimContentAttribute, shimHostAttribute as ɵshimHostAttribute, splitNamespace as ɵsplitNamespace, DomEventsPlugin as ɵDomEventsPlugin, HammerGesturesPlugin as ɵHammerGesturesPlugin, KeyEventsPlugin as ɵKeyEventsPlugin, DomSharedStylesHost as ɵDomSharedStylesHost, SharedStylesHost as ɵSharedStylesHost, WebAnimationsDriver as ɵWebAnimationsDriver, _document as ɵb, _resolveDefaultAnimationDriver as ɵc, errorHandler as ɵa, GenericBrowserDomAdapter as ɵi, SERVER_TRANSITION_PROVIDERS as ɵh, bootstrapListenerFactory as ɵg, _createConditionalRootRenderer as ɵd, EventManagerPlugin as ɵe, DomSanitizerImpl as ɵf };