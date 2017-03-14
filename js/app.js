var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("Modules/Platforms/Common/platform.provider", ['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1;
    var PlatformProvider;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            PlatformProvider = (function (_super) {
                __extends(PlatformProvider, _super);
                function PlatformProvider() {
                    _super.apply(this, arguments);
                    this.isStoreReady = null;
                }
                PlatformProvider.REQUEST_SAVE_TOKEN_EVENT = "REQUEST_SAVE_TOKEN_EVENT";
                PlatformProvider.VIEW_PROFILE_EVENT = "VIEW_PROFILE_EVENT";
                PlatformProvider = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], PlatformProvider);
                return PlatformProvider;
            }(EventEmitter));
            exports_1("PlatformProvider", PlatformProvider);
        }
    }
});
System.register("Modules/Platforms/browser.provider", ['angular2/core', 'angular2/router', "Modules/Platforms/Common/platform.provider"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_2, router_1, platform_provider_1;
    var BrowserPlatformProvider;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (platform_provider_1_1) {
                platform_provider_1 = platform_provider_1_1;
            }],
        execute: function() {
            BrowserPlatformProvider = (function (_super) {
                __extends(BrowserPlatformProvider, _super);
                function BrowserPlatformProvider(router) {
                    _super.call(this);
                    this.router = router;
                    this.cache = {};
                }
                BrowserPlatformProvider.prototype.playAudio = function (name, ext) {
                    if (ext === void 0) { ext = 'mp3'; }
                    var audio = this.cache[name + ext] || new Audio('/audios/' + name + '.' + ext);
                    this.cache[name + ext] = audio;
                    try {
                        audio.pause();
                        audio.currentTime = 0;
                        audio.play();
                    }
                    catch (err) { }
                };
                BrowserPlatformProvider.prototype.initStore = function (hideLoader) { };
                BrowserPlatformProvider.prototype.buyItem = function (productId) { };
                BrowserPlatformProvider.prototype.initGameCenter = function () { };
                BrowserPlatformProvider.prototype.submitScore = function (score) { };
                BrowserPlatformProvider.prototype.checkInternetConnection = function () { };
                BrowserPlatformProvider.prototype.showLoading = function (title) { };
                BrowserPlatformProvider.prototype.hideLoading = function () { };
                BrowserPlatformProvider.prototype.saveToken = function (token) { };
                BrowserPlatformProvider.prototype.deviceRegistration = function () { };
                BrowserPlatformProvider.prototype.login = function (returnUrl) {
                    this.router.navigate(['/Login', { returnUrl: returnUrl }]);
                };
                BrowserPlatformProvider.prototype.viewProfile = function (userid) {
                    this.emit(platform_provider_1.PlatformProvider.VIEW_PROFILE_EVENT, userid);
                };
                BrowserPlatformProvider = __decorate([
                    core_2.Injectable(), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], BrowserPlatformProvider);
                return BrowserPlatformProvider;
            }(platform_provider_1.PlatformProvider));
            exports_2("BrowserPlatformProvider", BrowserPlatformProvider);
        }
    }
});
System.register("Modules/Platforms/ios.provider", ['angular2/core', 'angular2/router', "Modules/Platforms/Common/platform.provider"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_3, router_2, platform_provider_2;
    var IOSPlatformProvider;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
            },
            function (platform_provider_2_1) {
                platform_provider_2 = platform_provider_2_1;
            }],
        execute: function() {
            IOSPlatformProvider = (function (_super) {
                __extends(IOSPlatformProvider, _super);
                function IOSPlatformProvider(router) {
                    _super.call(this);
                    this.router = router;
                    this.registerCallbackHandlers();
                    setTimeout(this.registerCallbackHandlers.bind(this), 1000);
                    setTimeout(this.registerCallbackHandlers.bind(this), 3000);
                }
                IOSPlatformProvider.prototype.registerCallbackHandlers = function () {
                    var _this = this;
                    try {
                        if (Platform.StoreInitializationSuccess)
                            return;
                        Platform.StoreInitializationSuccess = function (products) {
                            _this.isStoreReady = true;
                            _this.emit('StoreInitializationSuccess', products);
                        };
                        Platform.StoreInitializationFailed = function (error) { return _this.emit('StoreInitializationFailed', error); };
                        Platform.GlobalPurchaseError = function (error) { return _this.emit('GlobalPurchaseError', error); };
                        Platform.PurchaseSuccess = function (productId, result) { return _this.emit('PurchaseSuccess', productId, result); };
                        Platform.PurchaseFailed = function (productId, error) { return _this.emit('PurchaseFailed', productId, error); };
                        Platform.DeviceRegistrationResult = function (isSuccess, sid) { return _this.emit('DeviceRegistrationResult', isSuccess, sid); };
                    }
                    catch (err) {
                    }
                };
                IOSPlatformProvider.prototype.playAudio = function (name, ext) {
                    if (ext === void 0) { ext = 'mp3'; }
                    try {
                        Mt.App.fireEvent('PlayAudioEffect', {
                            name: name,
                            ext: ext
                        });
                    }
                    catch (err) {
                        console.error('IOSPlatformProvider.playAudio', err);
                    }
                };
                IOSPlatformProvider.prototype.initStore = function (hideLoader) {
                    if (hideLoader === void 0) { hideLoader = true; }
                    try {
                        this.isStoreReady = false;
                        Mt.App.fireEvent('AppStoreInit', {
                            HideLoader: hideLoader
                        });
                    }
                    catch (err) {
                        console.error('IOSPlatformProvider.initStore', err);
                    }
                };
                IOSPlatformProvider.prototype.buyItem = function (productId) {
                    try {
                        Mt.App.fireEvent('BuyItem', {
                            ID: productId,
                            ShowLoader: true
                        });
                    }
                    catch (err) {
                        console.error('IOSPlatformProvider.buyItem', err);
                    }
                };
                IOSPlatformProvider.prototype.initGameCenter = function () {
                    try {
                        Mt.App.fireEvent('GameCenterInit', {});
                    }
                    catch (err) {
                        console.error('IOSPlatformProvider.initGameCenter', err);
                    }
                };
                IOSPlatformProvider.prototype.submitScore = function (score) {
                    try {
                        Mt.App.fireEvent('SubmitScore', {
                            score: score
                        });
                    }
                    catch (err) {
                        console.error('IOSPlatformProvider.submitScore', err);
                    }
                };
                IOSPlatformProvider.prototype.checkInternetConnection = function () {
                    try {
                        Mt.App.fireEvent('CheckConnection', {});
                    }
                    catch (err) {
                        console.error('IOSPlatformProvider.checkInternetConnection', err);
                    }
                };
                IOSPlatformProvider.prototype.showLoading = function (title) {
                    try {
                        Mt.App.fireEvent('Loading', {
                            visible: true,
                            title: title
                        });
                    }
                    catch (err) {
                        console.error('IOSPlatformProvider.showLoading', err);
                    }
                };
                IOSPlatformProvider.prototype.hideLoading = function () {
                    try {
                        Mt.App.fireEvent('Loading', {
                            visible: false
                        });
                    }
                    catch (err) {
                        console.error('IOSPlatformProvider.hideLoading', err);
                    }
                };
                IOSPlatformProvider.prototype.saveToken = function (token) {
                    try {
                        Mt.App.fireEvent('Token', {
                            Token: token
                        });
                    }
                    catch (err) {
                        console.error('IOSPlatformProvider.saveToken', err);
                    }
                };
                IOSPlatformProvider.prototype.deviceRegistration = function () {
                    try {
                        Mt.App.fireEvent('DeviceRegistration', {});
                    }
                    catch (err) {
                        alert(err);
                        console.error('IOSPlatformProvider.deviceRegistration', err);
                    }
                };
                IOSPlatformProvider.prototype.login = function (returnUrl) {
                    this.router.navigate(['/Login', { returnUrl: returnUrl }]);
                };
                IOSPlatformProvider.prototype.viewProfile = function (userid) {
                    this.emit(platform_provider_2.PlatformProvider.VIEW_PROFILE_EVENT, userid);
                };
                IOSPlatformProvider = __decorate([
                    core_3.Injectable(), 
                    __metadata('design:paramtypes', [router_2.Router])
                ], IOSPlatformProvider);
                return IOSPlatformProvider;
            }(platform_provider_2.PlatformProvider));
            exports_3("IOSPlatformProvider", IOSPlatformProvider);
        }
    }
});
System.register("Modules/Platforms/android.provider", ['angular2/core', 'angular2/router', "Modules/Platforms/Common/platform.provider"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var core_4, router_3, platform_provider_3;
    var AndroidPlatformProvider;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            },
            function (router_3_1) {
                router_3 = router_3_1;
            },
            function (platform_provider_3_1) {
                platform_provider_3 = platform_provider_3_1;
            }],
        execute: function() {
            AndroidPlatformProvider = (function (_super) {
                __extends(AndroidPlatformProvider, _super);
                function AndroidPlatformProvider(router) {
                    _super.call(this);
                    this.router = router;
                    this.registerCallbackHandlers();
                    setTimeout(this.registerCallbackHandlers.bind(this), 1000);
                    setTimeout(this.registerCallbackHandlers.bind(this), 3000);
                }
                AndroidPlatformProvider.prototype.registerCallbackHandlers = function () {
                    var _this = this;
                    try {
                        if (Platform.StoreInitializationSuccess)
                            return;
                        Platform.StoreInitializationSuccess = function (products) {
                            _this.isStoreReady = true;
                            _this.emit('StoreInitializationSuccess', products);
                        };
                        Platform.StoreInitializationFailed = function (error) { return _this.emit('StoreInitializationFailed', error); };
                        Platform.GlobalPurchaseError = function (error) { return _this.emit('GlobalPurchaseError', error); };
                        Platform.PurchaseSuccess = function (productId, result) { return _this.emit('PurchaseSuccess', productId, result); };
                        Platform.PurchaseFailed = function (productId, error) { return _this.emit('PurchaseFailed', productId, error); };
                        Platform.DeviceRegistrationResult = function (isSuccess, sid) { return _this.emit('DeviceRegistrationResult', isSuccess, sid); };
                    }
                    catch (err) {
                    }
                };
                AndroidPlatformProvider.prototype.playAudio = function (name, ext) {
                    if (ext === void 0) { ext = 'mp3'; }
                    try {
                        Platform.PlayAudio(name, ext);
                    }
                    catch (err) {
                        console.error('AndroidPlatformProvider.playAudio', err);
                    }
                };
                AndroidPlatformProvider.prototype.initStore = function (hideLoader) {
                    if (hideLoader === void 0) { hideLoader = true; }
                    try {
                        Platform.InitStore(hideLoader);
                    }
                    catch (err) {
                        console.error('AndroidPlatformProvider.initStore', err);
                    }
                };
                AndroidPlatformProvider.prototype.buyItem = function (productId) {
                    try {
                        Platform.BuyItem(productId);
                    }
                    catch (err) {
                        console.error('AndroidPlatformProvider.buyItem', err);
                    }
                };
                AndroidPlatformProvider.prototype.initGameCenter = function () {
                    try {
                        Platform.InitGameCenter();
                    }
                    catch (err) {
                        console.error('AndroidPlatformProvider.initGameCenter', err);
                    }
                };
                AndroidPlatformProvider.prototype.submitScore = function (score) {
                    try {
                        Platform.SubmitScore(score);
                    }
                    catch (err) {
                        console.error('AndroidPlatformProvider.submitScore', err);
                    }
                };
                AndroidPlatformProvider.prototype.checkInternetConnection = function () {
                    try {
                        Platform.CheckInternetConnection();
                    }
                    catch (err) {
                        console.error('AndroidPlatformProvider.checkInternetConnection', err);
                    }
                };
                AndroidPlatformProvider.prototype.showLoading = function (title) {
                    try {
                        Platform.ShowLoading(title);
                    }
                    catch (err) {
                        console.error('AndroidPlatformProvider.showLoading', err);
                    }
                };
                AndroidPlatformProvider.prototype.hideLoading = function () {
                    try {
                        Platform.HideLoading();
                    }
                    catch (err) {
                        console.error('AndroidPlatformProvider.hideLoading', err);
                    }
                };
                AndroidPlatformProvider.prototype.saveToken = function (token) {
                    try {
                        Platform.SaveToken(token);
                    }
                    catch (err) {
                        console.error('AndroidPlatformProvider.saveToken', err);
                    }
                };
                AndroidPlatformProvider.prototype.deviceRegistration = function () {
                    try {
                        Platform.DeviceRegistration();
                    }
                    catch (err) {
                        alert(err);
                        console.error('IOSPlatformProvider.deviceRegistration', err);
                    }
                };
                AndroidPlatformProvider.prototype.login = function (returnUrl) {
                    this.router.navigate(['/Login', { returnUrl: returnUrl }]);
                };
                AndroidPlatformProvider.prototype.viewProfile = function (userid) {
                    this.emit(platform_provider_3.PlatformProvider.VIEW_PROFILE_EVENT, userid);
                };
                AndroidPlatformProvider = __decorate([
                    core_4.Injectable(), 
                    __metadata('design:paramtypes', [router_3.Router])
                ], AndroidPlatformProvider);
                return AndroidPlatformProvider;
            }(platform_provider_3.PlatformProvider));
            exports_4("AndroidPlatformProvider", AndroidPlatformProvider);
        }
    }
});
System.register("Modules/Platforms/wp.provider", ['angular2/core', 'angular2/router', "Modules/Platforms/Common/platform.provider"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var core_5, router_4, platform_provider_4;
    var WindowsPhonePlatformProvider;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (router_4_1) {
                router_4 = router_4_1;
            },
            function (platform_provider_4_1) {
                platform_provider_4 = platform_provider_4_1;
            }],
        execute: function() {
            WindowsPhonePlatformProvider = (function (_super) {
                __extends(WindowsPhonePlatformProvider, _super);
                function WindowsPhonePlatformProvider(router) {
                    _super.call(this);
                    this.router = router;
                    this.cache = {};
                    this.registerCallbackHandlers();
                    setTimeout(this.registerCallbackHandlers.bind(this), 1000);
                    setTimeout(this.registerCallbackHandlers.bind(this), 3000);
                }
                WindowsPhonePlatformProvider.prototype.registerCallbackHandlers = function () {
                    var _this = this;
                    try {
                        if (Platform.StoreInitializationSuccess)
                            return;
                        Platform.StoreInitializationSuccess = function (products) {
                            _this.isStoreReady = true;
                            _this.emit('StoreInitializationSuccess', products);
                        };
                        Platform.StoreInitializationFailed = function (error) { return _this.emit('StoreInitializationFailed', error); };
                        Platform.GlobalPurchaseError = function (error) { return _this.emit('GlobalPurchaseError', error); };
                        Platform.PurchaseSuccess = function (productId, result) { return _this.emit('PurchaseSuccess', productId, result); };
                        Platform.PurchaseFailed = function (productId, error) { return _this.emit('PurchaseFailed', productId, error); };
                        Platform.DeviceRegistrationResult = function (isSuccess, sid) { return _this.emit('DeviceRegistrationResult', isSuccess, sid); };
                    }
                    catch (err) {
                    }
                };
                WindowsPhonePlatformProvider.prototype.playAudio = function (name, ext) {
                    if (ext === void 0) { ext = 'mp3'; }
                    try {
                        var audio = this.cache[name + ext] || new Audio('/audios/' + name + '.' + ext);
                        this.cache[name + ext] = audio;
                        try {
                            audio.pause();
                            audio.currentTime = 0;
                            audio.play();
                        }
                        catch (err) { }
                    }
                    catch (err) {
                        console.error('WindowsPhonePlatformProvider.playAudio', err);
                    }
                };
                WindowsPhonePlatformProvider.prototype.initStore = function (hideLoader) {
                    if (hideLoader === void 0) { hideLoader = true; }
                    try {
                        Mt.App.fireEvent('AppStoreInit', {
                            HideLoader: hideLoader
                        });
                    }
                    catch (err) {
                        console.error('IOSPlatformProvider.initStore', err);
                    }
                };
                WindowsPhonePlatformProvider.prototype.buyItem = function (productId) {
                    try {
                        Mt.App.fireEvent('BuyItem', {
                            ID: productId,
                            ShowLoader: true
                        });
                    }
                    catch (err) {
                        console.error('IOSPlatformProvider.buyItem', err);
                    }
                };
                WindowsPhonePlatformProvider.prototype.initGameCenter = function () {
                    try {
                        Mt.App.fireEvent('GameCenterInit', {});
                    }
                    catch (err) {
                        console.error('IOSPlatformProvider.initGameCenter', err);
                    }
                };
                WindowsPhonePlatformProvider.prototype.submitScore = function (score) {
                    try {
                        Mt.App.fireEvent('SubmitScore', {
                            score: score
                        });
                    }
                    catch (err) {
                        console.error('IOSPlatformProvider.submitScore', err);
                    }
                };
                WindowsPhonePlatformProvider.prototype.checkInternetConnection = function () {
                    try {
                        Mt.App.fireEvent('CheckConnection', {});
                    }
                    catch (err) {
                        console.error('IOSPlatformProvider.checkInternetConnection', err);
                    }
                };
                WindowsPhonePlatformProvider.prototype.showLoading = function (title) {
                    try {
                        Mt.App.fireEvent('Loading', {
                            visible: true,
                            title: title
                        });
                    }
                    catch (err) {
                        console.error('IOSPlatformProvider.showLoading', err);
                    }
                };
                WindowsPhonePlatformProvider.prototype.hideLoading = function () {
                    try {
                        Mt.App.fireEvent('Loading', {
                            visible: false
                        });
                    }
                    catch (err) {
                        console.error('IOSPlatformProvider.hideLoading', err);
                    }
                };
                WindowsPhonePlatformProvider.prototype.saveToken = function (token) {
                    try {
                        Mt.App.fireEvent('Token', {
                            Token: token
                        });
                    }
                    catch (err) {
                        console.error('IOSPlatformProvider.saveToken', err);
                    }
                };
                WindowsPhonePlatformProvider.prototype.deviceRegistration = function () {
                    try {
                        Mt.App.fireEvent('DeviceRegistration', {});
                    }
                    catch (err) {
                        alert(err);
                        console.error('IOSPlatformProvider.deviceRegistration', err);
                    }
                };
                WindowsPhonePlatformProvider.prototype.login = function (returnUrl) {
                    this.router.navigate(['/Login', { returnUrl: returnUrl }]);
                };
                WindowsPhonePlatformProvider.prototype.viewProfile = function (userid) {
                    this.emit(platform_provider_4.PlatformProvider.VIEW_PROFILE_EVENT, userid);
                };
                WindowsPhonePlatformProvider = __decorate([
                    core_5.Injectable(), 
                    __metadata('design:paramtypes', [router_4.Router])
                ], WindowsPhonePlatformProvider);
                return WindowsPhonePlatformProvider;
            }(platform_provider_4.PlatformProvider));
            exports_5("WindowsPhonePlatformProvider", WindowsPhonePlatformProvider);
        }
    }
});
System.register("Common/Cookie", [], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var Cookie;
    return {
        setters:[],
        execute: function() {
            Cookie = (function () {
                function Cookie() {
                }
                Cookie.getCookie = function (name) {
                    var myWindow = window;
                    name = myWindow.escape(name);
                    var regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
                    var result = regexp.exec(document.cookie);
                    return (result === null) ? null : myWindow.unescape(result[1]);
                };
                Cookie.setCookie = function (name, value, expires, path, domain) {
                    var myWindow = window;
                    var cookieStr = myWindow.escape(name) + '=' + myWindow.escape(value) + ';';
                    if (expires) {
                        var dtExpires = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);
                        cookieStr += 'expires=' + dtExpires.toUTCString() + ';';
                    }
                    if (path) {
                        cookieStr += 'path=' + path + ';';
                    }
                    if (domain) {
                        cookieStr += 'domain=' + domain + ';';
                    }
                    document.cookie = cookieStr;
                };
                Cookie.deleteCookie = function (name, path, domain) {
                    if (Cookie.getCookie(name)) {
                        Cookie.setCookie(name, '', -1, path, domain);
                    }
                };
                return Cookie;
            }());
            exports_6("Cookie", Cookie);
        }
    }
});
System.register("Common/Providers/ConfigProvider", ['angular2/core', 'angular2/http', "Common/Cookie", 'Jok/Platforms'], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_6, http_1, Cookie_1, Platforms_1;
    var ConfigProvider;
    return {
        setters:[
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Cookie_1_1) {
                Cookie_1 = Cookie_1_1;
            },
            function (Platforms_1_1) {
                Platforms_1 = Platforms_1_1;
            }],
        execute: function() {
            ConfigProvider = (function () {
                function ConfigProvider(http) {
                    var _this = this;
                    this.http = http;
                    this.gameId = 12;
                    this.gameClientVersion = 'ng2-' + window.ClientVersion;
                    this.channel = 'test';
                    this.mode = 1;
                    this.gameServerUrl = 'https://jok.io:8082';
                    this.portalServerUrl = 'https://jok-realtime-server.herokuapp.com:443';
                    this.exitUrl = 'http://jok.io/game/lobby/matrix';
                    this.apiUrl = 'https://api.jok.io';
                    this.loginUrl = 'http://jok.io/joinus?returnUrl=';
                    this.enableMessageLogging = true;
                    this.protocols = ['polling', 'websocket'];
                    this.sid = localStorage['sid'] || Cookie_1.Cookie.getCookie('sid');
                    this.playUrl = location.origin + location.pathname + (location.pathname.lastIndexOf('/') == location.pathname.length - 1 ? '' : '/');
                    this.playPublicUrl2 = location.origin + '/quickplay';
                    this.playPublicUrl = location.origin + '/play';
                    this.playPublic9Url = location.origin + '/play/mode/1';
                    this.platform = Platforms_1.Platform.Get();
                    this.langMap = {
                        1: 'ka',
                        2: 'en',
                        3: 'ru'
                    };
                    window.Config = this;
                    var audiosEnabled = localStorage['audio-enabled'];
                    this.activeLang = localStorage['lang'];
                    this.isAudioEffectsEnabled = (audiosEnabled == undefined) ? true : (audiosEnabled === 'true');
                    this.refreshCompactMode();
                    $(window).resize(function () { return _this.refreshCompactMode(); });
                    this.refreshConfig();
                    setInterval(function () { return _this.refreshConfig(); }, 1000 * 60 * 3);
                }
                ConfigProvider.prototype.isMobile = function () {
                    return !!~[Platforms_1.Platforms.IOS, Platforms_1.Platforms.Android, Platforms_1.Platforms.WindowsPhone].indexOf(this.platform);
                };
                ConfigProvider.prototype.isSocialPlatform = function () {
                    return !!~[Platforms_1.Platforms.Facebook].indexOf(this.platform);
                };
                ConfigProvider.prototype.changeAudioOption = function (isOn) {
                    this.isAudioEffectsEnabled = isOn;
                    localStorage['audio-enabled'] = isOn;
                };
                ConfigProvider.prototype.save = function () {
                    localStorage['sid'] = this.sid;
                    localStorage['lang'] = this.activeLang;
                    Cookie_1.Cookie.setCookie('sid', this.sid, 1024, '/', this.getHostName());
                };
                ConfigProvider.prototype.refreshCompactMode = function () {
                    this.isCompact = this.isMobile() || ($(window).height() < 600);
                };
                ConfigProvider.prototype.getHostName = function () {
                    try {
                        var host = location.hostname;
                        var parts = host.split('.');
                        if (parts.length <= 1)
                            return host;
                        return ['', parts[parts.length - 2], parts[parts.length - 1]].join('.');
                    }
                    catch (err) {
                        return location.hostname;
                    }
                };
                ConfigProvider.prototype.getLanguageId = function (lang) {
                    if (this.langMap[2] == lang)
                        return 2;
                    if (this.langMap[3] == lang)
                        return 3;
                    return 1;
                };
                ConfigProvider.prototype.refreshConfig = function () {
                    var _this = this;
                    this.http.get(this.apiUrl + '/Joker/Config').subscribe(function (res) {
                        var serverConfig = res.json();
                        if (!serverConfig || !serverConfig.IsSuccess)
                            return;
                        _this.gameServerUrl = serverConfig.GameServerUrl;
                        _this.portalServerUrl = serverConfig.PortalServerUrl;
                    });
                };
                ConfigProvider = __decorate([
                    core_6.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ConfigProvider);
                return ConfigProvider;
            }());
            exports_7("ConfigProvider", ConfigProvider);
        }
    }
});
System.register("Common/Providers/UsersProvider", ['angular2/core', 'angular2/http', "Common/Providers/ConfigProvider"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var core_7, http_2, ConfigProvider_1;
    var UsersProvider, UserRelationStatuses;
    return {
        setters:[
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            },
            function (ConfigProvider_1_1) {
                ConfigProvider_1 = ConfigProvider_1_1;
            }],
        execute: function() {
            UsersProvider = (function () {
                function UsersProvider(config, http) {
                    this.config = config;
                    this.http = http;
                    this.cache = {};
                }
                UsersProvider.prototype.getCurrent = function (cb) {
                    var _this = this;
                    var sid = this.config.sid;
                    var url = this.config.apiUrl + '/user/infobysid/' + sid + '?getBlockedUserIds=true&gameid=' + this.config.gameId + '&sid=' + this.config.sid;
                    this.http.get(url)
                        .map(function (x) { return x.json(); })
                        .subscribe(function (data) {
                        if (data && data.UserID)
                            _this.cache[data.UserID] = data;
                        cb(data);
                    });
                };
                UsersProvider.prototype.get = function (userid, cb, forceNew) {
                    var _this = this;
                    if (forceNew === void 0) { forceNew = false; }
                    var cacheItem = this.cache[userid];
                    if (!forceNew && cacheItem) {
                        cb(cacheItem);
                        return;
                    }
                    var url = this.config.apiUrl + '/user/info/' + userid + '?gameid=' + this.config.gameId + '&sid=' + this.config.sid;
                    this.http.get(url)
                        .map(function (x) { return x.json(); })
                        .subscribe(function (data) {
                        _this.cache[userid] = data;
                        cb(data);
                    });
                };
                UsersProvider.prototype.block = function (userid) {
                    var url = this.config.apiUrl + '/user/block/' + userid + '?gameid=' + this.config.gameId + '&sid=' + this.config.sid;
                    this.http.post(url, null).subscribe();
                };
                UsersProvider.prototype.unblock = function (userid) {
                    var url = this.config.apiUrl + '/user/unblock/' + userid + '?gameid=' + this.config.gameId + '&sid=' + this.config.sid;
                    this.http.post(url, null).subscribe();
                };
                UsersProvider.prototype.sendFriendRequest = function (userid) {
                    var url = this.config.apiUrl + '/User/SendFriendRequest/' + userid + '?sid=' + this.config.sid;
                    this.http.get(url).subscribe();
                };
                UsersProvider.Items = {};
                UsersProvider = __decorate([
                    core_7.Injectable(), 
                    __metadata('design:paramtypes', [ConfigProvider_1.ConfigProvider, http_2.Http])
                ], UsersProvider);
                return UsersProvider;
            }());
            exports_8("UsersProvider", UsersProvider);
            (function (UserRelationStatuses) {
                UserRelationStatuses[UserRelationStatuses["New"] = 1] = "New";
                UserRelationStatuses[UserRelationStatuses["Accepted"] = 2] = "Accepted";
                UserRelationStatuses[UserRelationStatuses["Rejected"] = 3] = "Rejected";
                UserRelationStatuses[UserRelationStatuses["Pending"] = 4] = "Pending";
                UserRelationStatuses[UserRelationStatuses["Removed"] = 5] = "Removed";
            })(UserRelationStatuses || (UserRelationStatuses = {}));
            exports_8("UserRelationStatuses", UserRelationStatuses);
        }
    }
});
System.register("Common/Providers/ProfileProvider", ['angular2/core'], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var core_8;
    var ProfileProvider;
    return {
        setters:[
            function (core_8_1) {
                core_8 = core_8_1;
            }],
        execute: function() {
            ProfileProvider = (function () {
                function ProfileProvider() {
                    var _this = this;
                    this.activateEvent = new core_8.EventEmitter();
                    this.chatBubbleEvent = new core_8.EventEmitter();
                    this.activateCompletedEvent = new core_8.EventEmitter();
                    this.stopActivateEvent = new core_8.EventEmitter();
                    this.activateCompletedCallback = null;
                    this.activateCompletedEvent.subscribe(function () {
                        _this.activateCompletedCallback && _this.activateCompletedCallback();
                    });
                }
                ProfileProvider.prototype.activate = function (userid, duration, cb) {
                    this.activateEvent.emit({
                        UserId: userid,
                        Duration: duration
                    });
                    this.activateCompletedCallback = cb;
                };
                ProfileProvider.prototype.stopActivate = function () {
                    this.stopActivateEvent.emit(null);
                };
                ProfileProvider.prototype.chatBubble = function (msg, userid) {
                    this.chatBubbleEvent.emit({
                        Message: msg,
                        UserId: userid
                    });
                };
                ProfileProvider = __decorate([
                    core_8.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ProfileProvider);
                return ProfileProvider;
            }());
            exports_9("ProfileProvider", ProfileProvider);
        }
    }
});
System.register("Common/Providers/CurrentUserProvider", ['angular2/core', 'angular2/http', 'ng2-translate', "Common/Providers/ConfigProvider", "Common/Providers/UsersProvider", 'Jok/Platforms'], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var core_9, http_3, ng2_translate_1, ConfigProvider_2, UsersProvider_1, Platforms_2;
    var CurrentUserProvider;
    return {
        setters:[
            function (core_9_1) {
                core_9 = core_9_1;
            },
            function (http_3_1) {
                http_3 = http_3_1;
            },
            function (ng2_translate_1_1) {
                ng2_translate_1 = ng2_translate_1_1;
            },
            function (ConfigProvider_2_1) {
                ConfigProvider_2 = ConfigProvider_2_1;
            },
            function (UsersProvider_1_1) {
                UsersProvider_1 = UsersProvider_1_1;
            },
            function (Platforms_2_1) {
                Platforms_2 = Platforms_2_1;
            }],
        execute: function() {
            CurrentUserProvider = (function (_super) {
                __extends(CurrentUserProvider, _super);
                function CurrentUserProvider(config, users, translate, platform, zone, http) {
                    var _this = this;
                    _super.call(this);
                    this.config = config;
                    this.users = users;
                    this.translate = translate;
                    this.platform = platform;
                    this.zone = zone;
                    this.http = http;
                    this.defaultLang = 'en';
                    this.langMap = {
                        1: 'ka',
                        2: 'en',
                        3: 'ru'
                    };
                    this.GamesHistory = [];
                    this.setFirstLoadLanguage();
                    this.setPlayerLevels();
                    this.platform.on(Platforms_2.PlatformProvider.REQUEST_SAVE_TOKEN_EVENT, function (sid) {
                        _this.refreshUserData(sid);
                        document.location.reload();
                    });
                }
                CurrentUserProvider.prototype.isBuyAllowed = function () {
                    return this.platform.isStoreReady && this.Data;
                };
                CurrentUserProvider.prototype.isAdmin = function () {
                    return this.UserId == 32;
                };
                CurrentUserProvider.prototype.onReady = function (cb) {
                    var _this = this;
                    if (this.Data) {
                        cb(this.Data);
                        return;
                    }
                    this.onUserLoaded = function () { return cb(_this.Data); };
                };
                CurrentUserProvider.prototype.useLang = function (lang, skipPosting) {
                    if (skipPosting === void 0) { skipPosting = false; }
                    this.translate.use(lang);
                    this.config.activeLang = lang;
                    this.config.save();
                    $('html').attr('lang', lang);
                    if (skipPosting)
                        return;
                    var url = this.config.apiUrl + '/User/UpdateLanguage/' + lang + '?sid=' + this.config.sid;
                    this.http.post(url, null).subscribe();
                    this.emit(CurrentUserProvider.LanguageChangeEvent, lang, this.getLanguageId(lang));
                };
                CurrentUserProvider.prototype.getLanguageId = function (lang) {
                    if (this.langMap[2] == lang)
                        return 2;
                    if (this.langMap[3] == lang)
                        return 3;
                    return 1;
                };
                CurrentUserProvider.prototype.refreshUserData = function (sid, cb) {
                    var _this = this;
                    var isSidChanged = false;
                    if (sid) {
                        isSidChanged = (this.config.sid != sid);
                        this.config.sid = sid;
                        this.config.save();
                        this.platform.saveToken(sid);
                    }
                    this.users.getCurrent(function (user) { return _this.zone.run(function () {
                        _this.Data = user.IsSuccess ? user : null;
                        if (_this.Data) {
                            _this.UserId = _this.Data.UserID;
                            _this.RatingStars = (_this.Data.Game && _this.Data.Game.RatingStars) ? _this.Data.Game.RatingStars : 0;
                            try {
                                ga('set', 'userId', _this.UserId);
                            }
                            catch (err) { }
                            _this.useLang(_this.langMap[user.LanguageID] || _this.defaultLang, !sid);
                            if (isSidChanged) {
                                try {
                                    _this.emit(CurrentUserProvider.AuthentificationChangeEvent);
                                }
                                catch (err) {
                                    console.warn('Catch', 'AuthentificationChangeEvent', err);
                                }
                            }
                        }
                        cb && cb(_this.Data);
                    }); });
                };
                CurrentUserProvider.prototype.logout = function () {
                    this.config.sid = '';
                    this.config.save();
                    this.platform.saveToken('');
                    if (!this.config.isMobile()) {
                        var url = 'https://' + 'jok.io/portal/setsid?sid=' + '&returnUrl=' + location.toString();
                        document.location.assign(url);
                    }
                    else {
                        document.location.reload();
                    }
                };
                CurrentUserProvider.prototype.getPlayerLevel = function (rating) {
                    if (!rating && this.RatingStars === undefined)
                        return null;
                    if (!rating && rating != 0)
                        rating = this.RatingStars;
                    return Math.floor(rating / 4);
                };
                CurrentUserProvider.prototype.getPlayerLevelName = function (rating) {
                    var level = this.getPlayerLevel(rating);
                    if (level == undefined)
                        level = this.getPlayerLevel();
                    var overLevel = 0;
                    if (level < 0)
                        level = 0;
                    if (level > 5) {
                        overLevel = level - 5;
                        level = 5;
                    }
                    return 'playerLevels.Level' + (level + 1);
                };
                CurrentUserProvider.prototype.getLevelStars = function (level) {
                    return level * 4;
                };
                CurrentUserProvider.prototype.getOverLevel = function (rating) {
                    if (!rating)
                        return 0;
                    var maxLevelStars = this.getLevelStars(5);
                    var overLevels = Math.floor((rating - maxLevelStars) / 4);
                    if (overLevels <= 0)
                        return 0;
                    return overLevels + 1;
                };
                CurrentUserProvider.prototype.refreshGamesHistory = function (skip, take) {
                    var _this = this;
                    if (!skip)
                        this.GamesHistory = [];
                    this.GamesHistoryInProgress = true;
                    this.http.get(this.config.apiUrl + '/Joker/GamesLog' + '?skip=' + skip + '&take=' + take + '&sid=' + this.config.sid).subscribe(function (x) {
                        _this.GamesHistoryInProgress = false;
                        var res = x.json();
                        if (!res || !res.IsSuccess)
                            return;
                        _this.GamesHistoryLastGetItemsCount = res.Data.length;
                        _this.GamesHistory = _this.GamesHistory.concat(res.Data);
                    });
                };
                CurrentUserProvider.prototype.setFirstLoadLanguage = function () {
                    var _this = this;
                    this.translate.setDefaultLang(this.defaultLang);
                    var userLang = (navigator.language ? navigator.language.split('-')[0] : '') || document.documentElement.lang;
                    userLang = /(ka|en|ru)/gi.test(userLang) ? userLang : this.defaultLang;
                    userLang = this.defaultLang;
                    if (!this.config.activeLang)
                        this.config.activeLang = userLang;
                    this.useLang(this.config.activeLang, true);
                    this.refreshUserData(null, function () { return _this.onUserLoaded && _this.onUserLoaded(); });
                };
                CurrentUserProvider.prototype.setPlayerLevels = function () {
                    var levels = [];
                    for (var i = 0; i < 6; i++) {
                        levels.push({
                            Stars: i * 4,
                            Name: 'playerLevels.Level' + (i + 1)
                        });
                    }
                    this.AllLevels = levels;
                };
                CurrentUserProvider.AuthentificationChangeEvent = 'AuthentificationChangeEvent';
                CurrentUserProvider.LanguageChangeEvent = 'LanguageChangeEvent';
                CurrentUserProvider = __decorate([
                    core_9.Injectable(), 
                    __metadata('design:paramtypes', [ConfigProvider_2.ConfigProvider, UsersProvider_1.UsersProvider, ng2_translate_1.TranslateService, Platforms_2.PlatformProvider, core_9.NgZone, http_3.Http])
                ], CurrentUserProvider);
                return CurrentUserProvider;
            }(EventEmitter));
            exports_10("CurrentUserProvider", CurrentUserProvider);
        }
    }
});
System.register("Common/Providers/PortalProvider", ['rxjs/Rx', 'angular2/core', "Common/Providers/CurrentUserProvider", "Common/Providers/ConfigProvider"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var core_10, CurrentUserProvider_1, ConfigProvider_3;
    var PortalProvider, ServerCommands, ClientCommands, RoomConfirmationPlayerAnswer;
    return {
        setters:[
            function (_1) {},
            function (core_10_1) {
                core_10 = core_10_1;
            },
            function (CurrentUserProvider_1_1) {
                CurrentUserProvider_1 = CurrentUserProvider_1_1;
            },
            function (ConfigProvider_3_1) {
                ConfigProvider_3 = ConfigProvider_3_1;
            }],
        execute: function() {
            PortalProvider = (function (_super) {
                __extends(PortalProvider, _super);
                function PortalProvider(currentUser, config, zone) {
                    _super.call(this);
                    this.currentUser = currentUser;
                    this.config = config;
                    this.zone = zone;
                    this.MusicChannelTracks = {};
                    this.Rooms = [];
                    this.RoomConfirmations = null;
                    this.IsConfirmationButtonsAllowed = true;
                    this.pendingReceivingRoomEvents = [];
                    if (currentUser.UserId)
                        this.start();
                    else
                        currentUser.onReady(this.onReady.bind(this));
                    this.currentUser.on(CurrentUserProvider_1.CurrentUserProvider.AuthentificationChangeEvent, this.restart.bind(this));
                }
                PortalProvider.prototype.onReady = function () {
                    this.start();
                    while (this.pendingReceivingRoomEvents.length) {
                        this.startReceivingRoomEvents(this.pendingReceivingRoomEvents.pop());
                    }
                    this.currentUser.onReady(function () { });
                };
                PortalProvider.prototype.restart = function () {
                };
                PortalProvider.prototype.start = function () {
                    var _this = this;
                    var url = this.config.portalServerUrl + '?gameid=' + 6 + '&userinfo=' + this.btoa(this.currentUser.UserId);
                    this.socket = eio.Socket(url);
                    this.socket.send = function (command, data, fn) {
                        this.sendPacket('message', JSON.stringify({ c: command, d: data }), fn);
                        return this;
                    };
                    this.socket.on('message', function (msg) {
                        try {
                            msg = JSON.parse(msg);
                        }
                        catch (err) {
                            return;
                        }
                        if (!msg || !msg.c)
                            return;
                        _this.zone.run(function () { return _this.emit(msg.c, msg.d); });
                    });
                    this.on(ClientCommands.OnlineUsersCount, this.onOnlineUsersCount.bind(this));
                    this.on(ClientCommands.MusicChannelUpdate, this.onMusicChannelUpdate.bind(this));
                    this.on(ClientCommands.RoomCreate, this.onRoomCreate.bind(this));
                    this.on(ClientCommands.RoomInfo, this.onRoomInfo.bind(this));
                    this.on(ClientCommands.RoomRemove, this.onRoomRemove.bind(this));
                    this.on(ClientCommands.RoomUserJoinFailed, this.onRoomUserJoinFailed.bind(this));
                    this.on(ClientCommands.RoomConfirmationStart, this.onRoomConfirmationStart.bind(this));
                    this.on(ClientCommands.RoomConfirmationUpdate, this.onRoomConfirmationUpdate.bind(this));
                    this.on(ClientCommands.RoomConfirmationFinish, this.onRoomConfirmationFinish.bind(this));
                };
                PortalProvider.prototype.stop = function () {
                    this.removeEvent();
                    if (this.socket)
                        this.socket.close();
                    else
                        this.socket = null;
                };
                PortalProvider.prototype.send = function (command, data, fn) {
                    this.socket.sendPacket('message', JSON.stringify({ c: command, d: data }), fn);
                };
                PortalProvider.prototype.startReceivingRoomEvents = function (gameId) {
                    window.Rooms = this.Rooms = [];
                    if (!this.socket) {
                        this.pendingReceivingRoomEvents.push(gameId);
                        return;
                    }
                    this.send(ServerCommands.RoomEventsSubscribe, { GameID: gameId });
                };
                PortalProvider.prototype.stopReceivingRoomEvents = function (gameId) {
                    this.send(ServerCommands.RoomEventsUnsubscribe, { GameID: gameId });
                };
                PortalProvider.prototype.createRoom = function (levelControl, gameoption, gameid) {
                    this.send(ServerCommands.RoomCreate, {
                        GameID: gameid,
                        LevelControl: levelControl.toString(),
                        GameOption: gameoption
                    });
                };
                PortalProvider.prototype.joinRoom = function (roomid, gameid) {
                    this.send(ServerCommands.RoomJoin, {
                        GameID: gameid,
                        RoomID: roomid
                    });
                };
                PortalProvider.prototype.leaveRoom = function (roomid, gameid) {
                    this.send(ServerCommands.RoomLeave, {
                        GameID: gameid,
                        RoomID: roomid
                    });
                };
                PortalProvider.prototype.kickPlayer = function (roomid, userid, gameid) {
                    this.send(ServerCommands.RoomUserKick, {
                        GameID: gameid,
                        RoomID: roomid,
                        KickUserID: userid
                    });
                };
                PortalProvider.prototype.confirmationAnswer = function (roomid, isReady, gameid) {
                    this.IsConfirmationButtonsAllowed = false;
                    this.send(ServerCommands.RoomConfirmationAnswer, {
                        GameID: gameid,
                        RoomID: roomid,
                        Answer: isReady ? 1 : 2
                    });
                };
                PortalProvider.prototype.confirmationHide = function () {
                    this.RoomConfirmations = null;
                };
                PortalProvider.prototype.onOnlineUsersCount = function (count) {
                    count = parseInt(count);
                    if (!count)
                        return;
                    this.OnlineUsersCount = count;
                };
                PortalProvider.prototype.onMusicChannelUpdate = function (data) {
                    var channelid = data.MusicChannelID;
                    var trackInfo = data.TrackInfo;
                    var trackid = data.TrackID;
                    if (!channelid || !trackInfo || !trackid) {
                        delete this.MusicChannelTracks[channelid];
                        return;
                    }
                    this.MusicChannelTracks[channelid] = {
                        Id: trackid,
                        Description: trackInfo
                    };
                };
                PortalProvider.prototype.onRoomCreate = function (data) {
                    var gameid = data.GameID;
                    var roomid = data.RoomID;
                    var levelControl = data.LevelControl;
                    var gameOption = data.GameOption;
                    var kickedUsers = data.KickedUsers || [];
                    this.Rooms.push({
                        Id: roomid,
                        GameId: gameid,
                        LevelControl: levelControl,
                        GameOption: gameOption,
                        KickedUsers: kickedUsers,
                        IsHigherLevel: false,
                        Players: []
                    });
                };
                PortalProvider.prototype.onRoomInfo = function (data) {
                    var roomid = data.RoomID;
                    var users = data.Users;
                    var kickedUsers = data.KickedUsers;
                    var gameOption = data.GameOption;
                    var levelControl = data.LevelControl;
                    var room = this.Rooms.filter(function (x) { return x.Id == roomid; })[0];
                    if (!room)
                        return;
                    room.KickedUsers = kickedUsers;
                    room.GameOption = gameOption;
                    room.LevelControl = levelControl;
                    room.Players = users.map(function (x) { return {
                        UserId: x.UserID,
                        Nick: x.Nick,
                        LevelId: x.LevelId
                    }; });
                };
                PortalProvider.prototype.onRoomRemove = function (data) {
                    var roomid = data.RoomID;
                    var room = this.Rooms.filter(function (x) { return x.Id == roomid; })[0];
                    if (!room)
                        return;
                    var index = this.Rooms.indexOf(room);
                    if (!~index)
                        return;
                    this.Rooms.splice(index, 1);
                };
                PortalProvider.prototype.onRoomUserJoinFailed = function () {
                };
                PortalProvider.prototype.onRoomConfirmationStart = function (data) {
                    var users = data.Users;
                    if (users.length != 4)
                        return;
                    this.IsConfirmationButtonsAllowed = true;
                    this.RoomConfirmations = users.map(function (x) { return {
                        Nick: x.Nick,
                        Answer: x.Answer
                    }; });
                };
                PortalProvider.prototype.onRoomConfirmationUpdate = function (data) {
                    var users = data.Users;
                    if (users.length != 4)
                        return;
                    this.RoomConfirmations = users.map(function (x) { return {
                        Nick: x.Nick,
                        Answer: x.Answer
                    }; });
                };
                PortalProvider.prototype.onRoomConfirmationFinish = function (data) {
                    var roomid = data.RoomID;
                    var gameOption = data.GameOption;
                    var isSuccess = data.IsGameStarting;
                };
                PortalProvider.prototype.btoa = function (str) {
                    if (window.btoa)
                        return window.btoa(str);
                    return '';
                };
                PortalProvider = __decorate([
                    core_10.Injectable(), 
                    __metadata('design:paramtypes', [CurrentUserProvider_1.CurrentUserProvider, ConfigProvider_3.ConfigProvider, core_10.NgZone])
                ], PortalProvider);
                return PortalProvider;
            }(EventEmitter));
            exports_11("PortalProvider", PortalProvider);
            (function (ServerCommands) {
                ServerCommands[ServerCommands["GameOfferSend"] = 1] = "GameOfferSend";
                ServerCommands[ServerCommands["GameOfferAccept"] = 2] = "GameOfferAccept";
                ServerCommands[ServerCommands["GameOfferDecline"] = 3] = "GameOfferDecline";
                ServerCommands[ServerCommands["GameOfferCancel"] = 4] = "GameOfferCancel";
                ServerCommands[ServerCommands["ChatRequest"] = 5] = "ChatRequest";
                ServerCommands[ServerCommands["ChatMessage"] = 6] = "ChatMessage";
                ServerCommands[ServerCommands["RoomEventsSubscribe"] = 7] = "RoomEventsSubscribe";
                ServerCommands[ServerCommands["RoomEventsUnsubscribe"] = 8] = "RoomEventsUnsubscribe";
                ServerCommands[ServerCommands["RoomCreate"] = 9] = "RoomCreate";
                ServerCommands[ServerCommands["RoomJoin"] = 10] = "RoomJoin";
                ServerCommands[ServerCommands["RoomLeave"] = 11] = "RoomLeave";
                ServerCommands[ServerCommands["RoomUserKick"] = 12] = "RoomUserKick";
                ServerCommands[ServerCommands["RoomConfirmationStart"] = 13] = "RoomConfirmationStart";
                ServerCommands[ServerCommands["RoomConfirmationAnswer"] = 14] = "RoomConfirmationAnswer";
            })(ServerCommands || (ServerCommands = {}));
            (function (ClientCommands) {
                ClientCommands[ClientCommands["MusicChannelUpdate"] = 1] = "MusicChannelUpdate";
                ClientCommands[ClientCommands["FriendListClear"] = 2] = "FriendListClear";
                ClientCommands[ClientCommands["FriendCameOnline"] = 3] = "FriendCameOnline";
                ClientCommands[ClientCommands["FriendGoneOffline"] = 4] = "FriendGoneOffline";
                ClientCommands[ClientCommands["GameOffer"] = 5] = "GameOffer";
                ClientCommands[ClientCommands["GameOfferAccepted"] = 6] = "GameOfferAccepted";
                ClientCommands[ClientCommands["GameOfferDeclined"] = 7] = "GameOfferDeclined";
                ClientCommands[ClientCommands["GameOfferCanceled"] = 8] = "GameOfferCanceled";
                ClientCommands[ClientCommands["ChatStart"] = 9] = "ChatStart";
                ClientCommands[ClientCommands["ChatReceiveMessage"] = 10] = "ChatReceiveMessage";
                ClientCommands[ClientCommands["RoomCreate"] = 11] = "RoomCreate";
                ClientCommands[ClientCommands["RoomInfo"] = 12] = "RoomInfo";
                ClientCommands[ClientCommands["RoomRemove"] = 13] = "RoomRemove";
                ClientCommands[ClientCommands["RoomUserJoinFailed"] = 14] = "RoomUserJoinFailed";
                ClientCommands[ClientCommands["RoomConfirmationStart"] = 15] = "RoomConfirmationStart";
                ClientCommands[ClientCommands["RoomConfirmationUpdate"] = 16] = "RoomConfirmationUpdate";
                ClientCommands[ClientCommands["RoomConfirmationFinish"] = 17] = "RoomConfirmationFinish";
                ClientCommands[ClientCommands["OnlineUsersCount"] = 18] = "OnlineUsersCount";
            })(ClientCommands || (ClientCommands = {}));
            exports_11("ClientCommands", ClientCommands);
            (function (RoomConfirmationPlayerAnswer) {
                RoomConfirmationPlayerAnswer[RoomConfirmationPlayerAnswer["Waiting"] = 0] = "Waiting";
                RoomConfirmationPlayerAnswer[RoomConfirmationPlayerAnswer["Ready"] = 1] = "Ready";
                RoomConfirmationPlayerAnswer[RoomConfirmationPlayerAnswer["NotReady"] = 2] = "NotReady";
                RoomConfirmationPlayerAnswer[RoomConfirmationPlayerAnswer["Timeout"] = 3] = "Timeout";
            })(RoomConfirmationPlayerAnswer || (RoomConfirmationPlayerAnswer = {}));
            exports_11("RoomConfirmationPlayerAnswer", RoomConfirmationPlayerAnswer);
        }
    }
});
System.register("Common/Providers/All", ["Common/Providers/ConfigProvider", "Common/Providers/UsersProvider", "Common/Providers/ProfileProvider", "Common/Providers/CurrentUserProvider", "Common/Providers/PortalProvider"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_12(exports);
    }
    return {
        setters:[
            function (ConfigProvider_4_1) {
                exportStar_1(ConfigProvider_4_1);
            },
            function (UsersProvider_2_1) {
                exportStar_1(UsersProvider_2_1);
            },
            function (ProfileProvider_1_1) {
                exportStar_1(ProfileProvider_1_1);
            },
            function (CurrentUserProvider_2_1) {
                exportStar_1(CurrentUserProvider_2_1);
            },
            function (PortalProvider_1_1) {
                exportStar_1(PortalProvider_1_1);
            }],
        execute: function() {
        }
    }
});
System.register("Modules/Platforms/facebook.provider", ['angular2/core', 'angular2/http', 'angular2/router', "Modules/Platforms/Common/platform.provider", "Common/Providers/All"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var core_11, http_4, router_5, platform_provider_5, All_1;
    var FacebookPlatformProvider;
    return {
        setters:[
            function (core_11_1) {
                core_11 = core_11_1;
            },
            function (http_4_1) {
                http_4 = http_4_1;
            },
            function (router_5_1) {
                router_5 = router_5_1;
            },
            function (platform_provider_5_1) {
                platform_provider_5 = platform_provider_5_1;
            },
            function (All_1_1) {
                All_1 = All_1_1;
            }],
        execute: function() {
            FacebookPlatformProvider = (function (_super) {
                __extends(FacebookPlatformProvider, _super);
                function FacebookPlatformProvider(router, http, config) {
                    _super.call(this);
                    this.router = router;
                    this.http = http;
                    this.config = config;
                    this.cache = {};
                    this.APPID = '1145415865488073';
                }
                FacebookPlatformProvider.prototype.playAudio = function (name, ext) {
                    if (ext === void 0) { ext = 'mp3'; }
                    var audio = this.cache[name + ext] || new Audio('/audios/' + name + '.' + ext);
                    this.cache[name + ext] = audio;
                    try {
                        audio.pause();
                        audio.currentTime = 0;
                        audio.play();
                    }
                    catch (err) { }
                };
                FacebookPlatformProvider.prototype.initStore = function (hideLoader) {
                    var appid = this.APPID;
                    var initFunc = function () {
                        FB.init({
                            appId: appid,
                            xfbml: true,
                            version: 'v2.6'
                        });
                    };
                    if (typeof FB == "undefined") {
                        window.fbAsyncInit = initFunc;
                    }
                    else {
                        initFunc();
                    }
                };
                FacebookPlatformProvider.prototype.buyItem = function (productId) { };
                FacebookPlatformProvider.prototype.initGameCenter = function () { };
                FacebookPlatformProvider.prototype.submitScore = function (score) { };
                FacebookPlatformProvider.prototype.checkInternetConnection = function () { };
                FacebookPlatformProvider.prototype.showLoading = function (title) { };
                FacebookPlatformProvider.prototype.hideLoading = function () { };
                FacebookPlatformProvider.prototype.saveToken = function (token) { };
                FacebookPlatformProvider.prototype.deviceRegistration = function () { };
                FacebookPlatformProvider.prototype.login = function (returnUrl) {
                    var _this = this;
                    FB.login(function (response) {
                        if (response.status === 'connected') {
                            var token = response.authResponse.accessToken;
                            var languageId = _this.config.getLanguageId(_this.config.activeLang);
                            _this.http.post(_this.config.apiUrl + '/User/FacebookLogin?fbToken=' + token + '&languageId=' + languageId, null).subscribe(function (res) {
                                var result = res.json();
                                if (!result || !result.IsSuccess) {
                                    alert('Facebook login failed');
                                    console.warn(result);
                                    return;
                                }
                                _this.emit(platform_provider_5.PlatformProvider.REQUEST_SAVE_TOKEN_EVENT, result.Token);
                                setTimeout(function () {
                                    if (returnUrl)
                                        document.location.assign(returnUrl);
                                }, 500);
                            });
                        }
                        else if (response.status === 'not_authorized') {
                        }
                        else {
                        }
                    }, { scope: "email,public_profile,user_friends" });
                };
                FacebookPlatformProvider.prototype.viewProfile = function (userid) {
                    this.emit(platform_provider_5.PlatformProvider.VIEW_PROFILE_EVENT, userid);
                };
                FacebookPlatformProvider = __decorate([
                    core_11.Injectable(), 
                    __metadata('design:paramtypes', [router_5.Router, http_4.Http, All_1.ConfigProvider])
                ], FacebookPlatformProvider);
                return FacebookPlatformProvider;
            }(platform_provider_5.PlatformProvider));
            exports_13("FacebookPlatformProvider", FacebookPlatformProvider);
        }
    }
});
System.register("Modules/Platforms/Common/platform", ["Modules/Platforms/ios.provider", "Modules/Platforms/android.provider", "Modules/Platforms/wp.provider", "Modules/Platforms/facebook.provider", "Modules/Platforms/browser.provider"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var ios_provider_1, android_provider_1, wp_provider_1, facebook_provider_1, browser_provider_1;
    var Platform, Platforms;
    return {
        setters:[
            function (ios_provider_1_1) {
                ios_provider_1 = ios_provider_1_1;
            },
            function (android_provider_1_1) {
                android_provider_1 = android_provider_1_1;
            },
            function (wp_provider_1_1) {
                wp_provider_1 = wp_provider_1_1;
            },
            function (facebook_provider_1_1) {
                facebook_provider_1 = facebook_provider_1_1;
            },
            function (browser_provider_1_1) {
                browser_provider_1 = browser_provider_1_1;
            }],
        execute: function() {
            Platform = (function () {
                function Platform() {
                }
                Platform.Get = function () {
                    var result, platform = localStorage.getItem('platform') || window.platform;
                    switch (platform) {
                        case 'ios':
                            result = Platforms.IOS;
                            break;
                        case 'android':
                            result = Platforms.Android;
                            break;
                        case 'wp':
                            result = Platforms.WindowsPhone;
                            break;
                        case 'facebook':
                            result = Platforms.Facebook;
                            break;
                        default:
                            result = Platforms.Browser;
                            break;
                    }
                    if (result != Platforms.Browser && result != Platforms.Facebook)
                        localStorage.setItem('platform', platform);
                    return result;
                };
                Platform.GetPlatform = function () {
                    switch (Platform.Get()) {
                        case Platforms.IOS:
                            return ios_provider_1.IOSPlatformProvider;
                        case Platforms.Android:
                            return android_provider_1.AndroidPlatformProvider;
                        case Platforms.WindowsPhone:
                            return wp_provider_1.WindowsPhonePlatformProvider;
                        case Platforms.Facebook:
                            return facebook_provider_1.FacebookPlatformProvider;
                        default:
                            return browser_provider_1.BrowserPlatformProvider;
                    }
                };
                Platform.IsMobile = function () {
                    var platform = Platform.Get();
                    return !!~[Platforms.IOS, Platforms.Android, Platforms.WindowsPhone].indexOf(platform);
                };
                return Platform;
            }());
            exports_14("Platform", Platform);
            (function (Platforms) {
                Platforms[Platforms["Browser"] = 1] = "Browser";
                Platforms[Platforms["IOS"] = 2] = "IOS";
                Platforms[Platforms["Android"] = 3] = "Android";
                Platforms[Platforms["WindowsPhone"] = 4] = "WindowsPhone";
                Platforms[Platforms["Facebook"] = 5] = "Facebook";
            })(Platforms || (Platforms = {}));
            exports_14("Platforms", Platforms);
        }
    }
});
System.register("Common/Pipes/PastDatePipe", ['angular2/core'], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var core_12;
    var PastDatePipe;
    return {
        setters:[
            function (core_12_1) {
                core_12 = core_12_1;
            }],
        execute: function() {
            PastDatePipe = (function () {
                function PastDatePipe() {
                }
                PastDatePipe.prototype.transform = function (value, args) {
                    if (!value)
                        return '';
                    var result = PastDatePipe.GetPeriodCount(value);
                    switch (result.Mode) {
                        case 'now': return 'common.Periods.Now';
                        case 'hours': return 'common.Periods.Hours';
                        case 'minutes': return 'common.Periods.Minutes';
                        case 'yesterday': return 'common.Periods.Yesterday';
                        case 'days': return 'common.Periods.DaysAgo';
                        case 'months': return 'common.Periods.MonthsAgo';
                        case 'years': return 'common.Periods.YearsAgo';
                        default: return '';
                    }
                };
                PastDatePipe.GetPeriodCount = function (dateString) {
                    dateString += '+04:00';
                    var oneMinuteMilliseconds = 1000 * 60;
                    var oneHourMilliseconds = oneMinuteMilliseconds * 60;
                    var oneDayMilliseconds = oneHourMilliseconds * 24;
                    var date = new Date(dateString);
                    var diff = new Date() - date;
                    var days = Math.floor(diff / oneDayMilliseconds);
                    var mode = 'days';
                    var count = days;
                    if (days < 2) {
                        mode = 'yesterday';
                    }
                    if (days < 1) {
                        if (diff / oneHourMilliseconds < 24) {
                            mode = 'hours';
                            count = Math.floor(diff / oneHourMilliseconds);
                            if (count == 0) {
                                mode = 'minutes';
                                count = Math.floor(diff / oneMinuteMilliseconds);
                                if (count == 0) {
                                    mode = 'now';
                                }
                            }
                        }
                    }
                    if (days > 30) {
                        mode = 'months';
                        count = Math.floor(days / 30);
                    }
                    if (days > 365) {
                        mode = 'years';
                        count = Math.floor(days / 365);
                    }
                    return {
                        Count: count,
                        Mode: mode
                    };
                };
                PastDatePipe = __decorate([
                    core_12.Pipe({ name: 'pastdate' }), 
                    __metadata('design:paramtypes', [])
                ], PastDatePipe);
                return PastDatePipe;
            }());
            exports_15("PastDatePipe", PastDatePipe);
        }
    }
});
System.register("Common/Components/levelprogress", ['angular2/core', "Common/Providers/CurrentUserProvider"], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var core_13, CurrentUserProvider_3;
    var UILevelProgress;
    return {
        setters:[
            function (core_13_1) {
                core_13 = core_13_1;
            },
            function (CurrentUserProvider_3_1) {
                CurrentUserProvider_3 = CurrentUserProvider_3_1;
            }],
        execute: function() {
            UILevelProgress = (function () {
                function UILevelProgress(currentUser) {
                    this.currentUser = currentUser;
                    this.nameOnly = false;
                }
                UILevelProgress.prototype.getCurrentStars = function () {
                    var playerLevel = this.currentUser.getPlayerLevel(this.stars);
                    var levelStars = this.currentUser.getLevelStars(playerLevel);
                    var leftStars = this.stars - levelStars;
                    var result = [leftStars > 0, leftStars > 1, leftStars > 2, leftStars > 3];
                    return result;
                };
                UILevelProgress.prototype.getLevelName = function () {
                    var result = this.currentUser.getPlayerLevelName(this.stars);
                    return (result || '');
                };
                UILevelProgress.prototype.getOverLevel = function () {
                    return this.currentUser.getOverLevel(this.stars);
                };
                __decorate([
                    core_13.Input(), 
                    __metadata('design:type', Number)
                ], UILevelProgress.prototype, "stars", void 0);
                __decorate([
                    core_13.Input(), 
                    __metadata('design:type', Boolean)
                ], UILevelProgress.prototype, "nameOnly", void 0);
                UILevelProgress = __decorate([
                    core_13.Component({
                        selector: 'levelprogress',
                        styles: [".levelprogress span {  margin-right: 10px; }.levelprogress i.fa {  color: #F4CB37;  margin-left: 3px;  margin-right: 3px; }.levelprogress.nameOnly span {  margin-right: 0; }.levelprogress.nameOnly i.fa {  display: none; }"],
                        template: '<div class="levelprogress" [class.nameOnly]="nameOnly"><span>{{getLevelName() | translate}} <span *ngIf="currentUser.getOverLevel()">({{currentUser.getOverLevel()}})</span></span> <i *ngFor="#item of getCurrentStars()" class="fa" [class.fa-star]="item" [class.fa-star-o]="!item" aria-hidden="true"></i></div>'
                    }), 
                    __metadata('design:paramtypes', [CurrentUserProvider_3.CurrentUserProvider])
                ], UILevelProgress);
                return UILevelProgress;
            }());
            exports_16("UILevelProgress", UILevelProgress);
        }
    }
});
System.register("Common/Components/achievement", ['angular2/core'], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var core_14;
    var UIAchievement;
    return {
        setters:[
            function (core_14_1) {
                core_14 = core_14_1;
            }],
        execute: function() {
            UIAchievement = (function () {
                function UIAchievement() {
                }
                __decorate([
                    core_14.Input(), 
                    __metadata('design:type', String)
                ], UIAchievement.prototype, "title", void 0);
                __decorate([
                    core_14.Input(), 
                    __metadata('design:type', String)
                ], UIAchievement.prototype, "pretitle", void 0);
                __decorate([
                    core_14.Input(), 
                    __metadata('design:type', String)
                ], UIAchievement.prototype, "description", void 0);
                UIAchievement = __decorate([
                    core_14.Component({
                        selector: 'achievement',
                        styles: [".achievement {  display: inline-block;  width: 100px;  background: rgba(52, 73, 94, 0.84);  border-radius: 5px;  padding-bottom: 10px; }  .achievement div.place {    height: 90px;    margin-top: 5px;    border-bottom: 1px solid rgba(255, 255, 255, 0.17);    margin-bottom: 10px; }    .achievement div.place > span.big {      font-size: 40px;      display: block;      height: 64px; }    .achievement div.place > span {      font-size: 14px;      opacity: .8; }    .achievement div.place > span.pretitle {      opacity: .4; }  .achievement div.place_last {    border-radius: 100%;    border: 1px solid rgba(0, 0, 0, 0.8);    background: rgba(0, 0, 0, 0.4);    color: rgba(52, 73, 94, 0.84); }  .achievement > span {    color: #F4CB37;    display: inline-block;    text-shadow: 0 0 1px black;    font-size: 16px; }"],
                        template: '<div class="achievement" data-toggle="tooltip" data-placement="top" title="{{description}}"><div class="place"><span class="big"><ng-content select="[logo]"></ng-content></span> <span *ngIf="pretitle" class="pretitle">{{pretitle}}</span> <span>{{title}}</span></div><span><ng-content select="[bonusinfo]"></ng-content></span></div>'
                    }), 
                    __metadata('design:paramtypes', [])
                ], UIAchievement);
                return UIAchievement;
            }());
            exports_17("UIAchievement", UIAchievement);
        }
    }
});
System.register("Common/Components/playerinfo", ['angular2/core', 'angular2/http', 'Jok/Platforms', "Common/Providers/UsersProvider", "Common/Providers/ConfigProvider", "Common/Providers/CurrentUserProvider", "Common/Pipes/PastDatePipe", "Common/Components/levelprogress", "Common/Components/achievement"], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var core_15, http_5, Platforms_3, UsersProvider_3, ConfigProvider_5, CurrentUserProvider_4, PastDatePipe_1, levelprogress_1, achievement_1;
    var UIPlayerInfo;
    return {
        setters:[
            function (core_15_1) {
                core_15 = core_15_1;
            },
            function (http_5_1) {
                http_5 = http_5_1;
            },
            function (Platforms_3_1) {
                Platforms_3 = Platforms_3_1;
            },
            function (UsersProvider_3_1) {
                UsersProvider_3 = UsersProvider_3_1;
            },
            function (ConfigProvider_5_1) {
                ConfigProvider_5 = ConfigProvider_5_1;
            },
            function (CurrentUserProvider_4_1) {
                CurrentUserProvider_4 = CurrentUserProvider_4_1;
            },
            function (PastDatePipe_1_1) {
                PastDatePipe_1 = PastDatePipe_1_1;
            },
            function (levelprogress_1_1) {
                levelprogress_1 = levelprogress_1_1;
            },
            function (achievement_1_1) {
                achievement_1 = achievement_1_1;
            }],
        execute: function() {
            UIPlayerInfo = (function () {
                function UIPlayerInfo(zone, users, currentUser, http, config, platform) {
                    this.zone = zone;
                    this.users = users;
                    this.currentUser = currentUser;
                    this.http = http;
                    this.config = config;
                    this.platform = platform;
                    this.viewMode = 1;
                    this.changeNickStatus = 0;
                }
                UIPlayerInfo.prototype.ngOnInit = function () {
                    var _this = this;
                    this.users.get(this.userid, function (user) { return _this.player = user; }, true);
                    this.isNickChangeInProgress = false;
                };
                UIPlayerInfo.prototype.isMe = function () {
                    return this.currentUser.UserId == this.userid;
                };
                UIPlayerInfo.prototype.isFriend = function () {
                    return this.player && this.player.RelationStatusID2 == UsersProvider_3.UserRelationStatuses.Accepted;
                };
                UIPlayerInfo.prototype.isFriendRequestSent = function () {
                    return this.player && this.player.RelationStatusID == UsersProvider_3.UserRelationStatuses.Pending;
                };
                UIPlayerInfo.prototype.getLeaveRate = function () {
                    if (!this.player || !this.player.Game)
                        return;
                    if (!this.player.Game.GameCount)
                        return 0;
                    return Math.round((this.player.Game.LeaveCount || 0) / this.player.Game.GameCount * 100);
                };
                UIPlayerInfo.prototype.getPeriodCount = function (dateString) {
                    return PastDatePipe_1.PastDatePipe.GetPeriodCount(dateString).Count;
                };
                UIPlayerInfo.prototype.getNick = function () {
                    if (!this.player)
                        return;
                    if (this.newNick)
                        return this.newNick;
                    return this.player.Nick;
                };
                UIPlayerInfo.prototype.onClick = function (e) {
                    e.stopPropagation();
                };
                UIPlayerInfo.prototype.onNewNickKeyUp = function (e, newNick) {
                    var _this = this;
                    this.changeNickStatus = 0;
                    this.newNick = newNick;
                    if (!newNick || newNick.length <= 3)
                        return;
                    if (this.checkNickTimeout)
                        clearTimeout(this.checkNickTimeout);
                    this.checkNickTimeout = setTimeout(function () {
                        if (_this.checkNickSubscription)
                            _this.checkNickSubscription.unsubscribe();
                        _this.changeNickStatus = 1;
                        _this.checkNickSubscription = _this.http.get(_this.config.apiUrl + '/User/IsNickValid?nick=' + newNick + '&sid=' + _this.config.sid).subscribe(function (x) {
                            _this.checkNickSubscription = null;
                            var res = x.json();
                            if (!res || !res.IsSuccess) {
                                _this.changeNickStatus = 2;
                                return;
                            }
                            _this.changeNickStatus = res.IsValid ? 3 : 2;
                            _this.newNick = newNick;
                        });
                    }, 300);
                };
                UIPlayerInfo.prototype.onNickChange = function () {
                    var _this = this;
                    if (this.changeNickStatus != 3)
                        return;
                    this.changeNickStatus = 1;
                    this.isNickChangeInProgress = true;
                    this.http.post(this.config.apiUrl + '/User/NickChange?nick=' + this.newNick + '&sid=' + this.config.sid, null).subscribe(function (x) {
                        var res = x.json();
                        if (!res || !res.IsSuccess) {
                            _this.changeNickStatus = 5;
                            return;
                        }
                        _this.changeNickStatus = 4;
                        _this.currentUser.refreshUserData(null, function (user) { return _this.player = user; });
                    }, function (err) {
                        _this.changeNickStatus = 5;
                    });
                };
                UIPlayerInfo.prototype.onNickChangeBack = function () {
                    this.viewMode = 1;
                    this.newNick = '';
                    this.changeNickStatus = 0;
                };
                UIPlayerInfo.prototype.onNickKeyPress = function (e) {
                    return [32, 44, 46].indexOf(e.charCode) == -1;
                };
                UIPlayerInfo.prototype.onBuyNickChange = function () {
                    this.platform.buyItem('io.jok.nickchange');
                };
                UIPlayerInfo.prototype.onClose = function () {
                    this.callbacks && this.callbacks.onClose && this.callbacks.onClose();
                };
                UIPlayerInfo.prototype.onListenChannel = function (e) {
                    e.stopPropagation();
                };
                UIPlayerInfo.prototype.onViewJokProfile = function () {
                    if (!this.player)
                        return;
                    window.open('http://jok.io/' + this.player.UserID);
                };
                __decorate([
                    core_15.Input(), 
                    __metadata('design:type', Number)
                ], UIPlayerInfo.prototype, "userid", void 0);
                __decorate([
                    core_15.Input(), 
                    __metadata('design:type', Boolean)
                ], UIPlayerInfo.prototype, "isCompact", void 0);
                __decorate([
                    core_15.Input(), 
                    __metadata('design:type', Object)
                ], UIPlayerInfo.prototype, "callbacks", void 0);
                UIPlayerInfo = __decorate([
                    core_15.Component({
                        selector: 'player-info',
                        styles: [".playerinfo {  position: fixed;  width: 500px;  left: 50%;  margin-left: -250px;  top: 100px;  text-align: center;  background: #34495e;  border: 1px solid #2b3c4e;  padding: 10px;  border-radius: 10px;  z-index: 50;  box-shadow: 0 0 90px black;  text-align: center; }  .playerinfo .loading {    font-size: 24px;    color: white;    margin-top: 50px;    margin-bottom: 50px; }  .playerinfo header {    padding-top: 10px;    color: white;    border-bottom: 1px solid rgba(255, 255, 255, 0.05); }    .playerinfo header img {      height: 100px; }    .playerinfo header div.nick {      font-size: 22px;      margin-top: 10px;      margin-bottom: 10px;      /*div.actions {                padding-top: 7px;                margin-bottom: 15px;                button {                    font-size: 13px;                    display: inline-block;                    margin-left: auto;                    margin-right: auto;                    margin-bottom: 15px;                    min-width: 120px;                }            }*/ }      .playerinfo header div.nick i.fa {        font-size: 15px;        margin-left: 5px;        margin-right: -21px;        opacity: .5;        cursor: pointer;        display: none; }        .playerinfo header div.nick i.fa:hover {          opacity: 1; }    .playerinfo header levelprogress {      display: block;      margin-bottom: 10px; }      .playerinfo header levelprogress.ispublic {        opacity: 0.6; }    .playerinfo header .close_button {      position: absolute;      top: 6px;      right: 12px;      color: #466380;      text-shadow: 0 1px 0px #1c2c3c;      font-size: 30px;      cursor: pointer; }    .playerinfo header .relation_status {      position: absolute;      left: 12px;      top: 14px;      color: rgba(255, 255, 255, 0.48);      background: rgba(0, 0, 0, 0.17);      padding: 6px 20px;      border-radius: 20px; }  .playerinfo group section.title {    border-bottom: 1px solid #3e5266;    padding-bottom: 15px;    color: silver;    font-size: 18px;    padding-top: 14px; }    .playerinfo group section.title i.fa {      font-size: 15px;      margin-right: -21px;      margin-left: 5px; }  .playerinfo group section.body {    color: white;    padding: 10px 20px;    border-bottom: 1px solid rgba(255, 255, 255, 0.05);    height: 145px; }    .playerinfo group section.body div.item {      display: inline-block;      margin: 10px 20px;      color: silver;      width: 150px;      text-align: left; }      .playerinfo group section.body div.item span {        color: white; }      .playerinfo group section.body div.item.leaverate span {        color: orange; }      .playerinfo group section.body div.item.leaverate.cool span {        color: limegreen; }      .playerinfo group section.body div.item.leaverate.bad span {        color: #e66363; }    .playerinfo group section.body .body_sub_title {      opacity: .5; }  .playerinfo group section.achievements {    color: white;    display: none; }    .playerinfo group section.achievements achievement {      display: inline-block;      margin-left: 10px;      margin-right: 10px;      margin-bottom: 40px;      border: 1px solid rgba(255, 255, 255, 0.06);      margin-top: 30px;      color: #f4f4f4; }      .playerinfo group section.achievements achievement .bonusinfo {        color: silver; }  .playerinfo group section.actions {    margin-top: 25px;    margin-bottom: 5px; }    .playerinfo group section.actions button {      font-size: 13px;      display: inline-block;      margin-left: auto;      margin-right: auto;      margin-bottom: 15px;      min-width: 120px; }  .playerinfo group section.nickchange input {    margin-top: 20px;    display: inline-block;    width: 200px;    text-align: center; }.playerinfo.compact {  top: 0;  bottom: 0;  border-radius: 0; }  .playerinfo.compact group section.actions {    margin-top: 10px; }"],
                        template: '<div class="playerinfo" [class.compact]="isCompact" (click)="onClick($event)"><div *ngIf="!player" class="loading"><i class="fa fa-spin fa-spinner"></i></div><header *ngIf="player"><div class="close_button"><i class="fa fa-times" [class.fa-spin]="spinCloseButton" (mouseenter)="spinCloseButton=true" (mouseleave)="spinCloseButton=false" (click)="onClose()" aria-hidden="true"></i></div><img class="avatar" [src]="player.AvatarUrl"><div class="nick">{{getNick()}}</div><levelprogress [stars]="(player.Game ? player.Game.RatingStars : 0)" [class.ispublic]="!isMe() && !isFriend()" [nameOnly]="!isMe() && !isFriend()"></levelprogress><div class="relation_status" *ngIf="isMe() || isFriend()"><span *ngIf="isMe()">{{\'playerinfo.Me\' | translate}}</span> <span *ngIf="!isMe() && isFriend()">{{\'playerinfo.Friend\' | translate}}</span> <span *ngIf="!isMe() && !isFriend()">{{\'playerinfo.SendFriendRequest\' | translate}}</span></div></header><group *ngIf="viewMode == 1 && player"><section *ngIf="player.Fullname" class="title">{{player.Fullname}} <i class="fa fa-lock" aria-hidden="true" data-toggle="tooltip" data-placement="top" [title]="\'playerinfo.VisibleOnlyForFriends\' | translate"></i></section><section *ngIf="player.Game" class="body text-right"><div class="item">{{\'playerinfo.GameCount\' | translate}}:<br><span>{{player.Game.GameCount}}</span></div><div class="item leaverate" [class.cool]="getLeaveRate() == 0" [class.bad]="getLeaveRate() > 40">{{\'playerinfo.LeaveRate\' | translate}}:<br><span>{{getLeaveRate()}}%</span></div><div *ngIf="!player.Game.LastRankedGame" class="item">{{\'playerinfo.LastPlayDate\' | translate}}:<br><span>{{player.Game.LastLoginDate | pastdate | translate: { count: getPeriodCount(player.Game.LastLoginDate) } }}</span></div><div *ngIf="player.Game.LastRankedGame" class="item">{{\'playerinfo.LastRankedGame\' | translate}}:<br><span>{{player.Game.LastRankedGame | pastdate | translate: { count: getPeriodCount(player.Game.LastLoginDate) } }}</span></div><div class="item">{{\'playerinfo.JoinDate\' | translate}}:<br><span>{{player.Game.CreateDate | pastdate | translate: { count: getPeriodCount(player.Game.CreateDate) } }}</span></div></section><section *ngIf="false && player.Game" class="achievements"><achievement [title]="\'achievements.TitlePremia\' | translate"><span logo><i class="fa fa-diamond" aria-hidden="true"></i></span> <span bonusinfo class="bonusinfo">5x</span></achievement><achievement [title]="\'achievements.Title9From9\' | translate"><span logo>9/9</span> <span bonusinfo class="bonusinfo">20x</span></achievement></section><section class="actions"><div *ngIf="isMe()"><button *ngIf="player.IsNickChangeAllowed" class="btn btn-primary" (click)="viewMode=2">{{\'playerinfo.ChangeNickname\' | translate}}</button> <button class="btn btn-primary hidden" (click)="viewMode=3">{{\'Change Avatar\' | translate}}</button></div><button *ngIf="!isMe() && !isCompact" class="btn btn-primary" (click)="onViewJokProfile()">{{\'playerinfo.ViewJokProfile\' | translate}}</button></section></group><group *ngIf="viewMode == 2 && player"><section *ngIf="player.Fullname" class="title">Change Nick</section><section class="body text-center nickchange"><div *ngIf="player.IsNickChangeAllowed || isNickChangeInProgress"><input type="text" autofocus class="form-control" placeholder="New Nickname" maxlength="10" (keypress)="onNickKeyPress($event)" (keyup)="onNewNickKeyUp($event, newNick.value)" #newNick><br><br><span *ngIf="changeNickStatus == 1"><i class="fa fa-spin fa-spinner"></i></span> <span *ngIf="changeNickStatus == 2" class="label label-warning">Not Available</span> <span *ngIf="changeNickStatus == 3" class="label label-success">Available</span> <span *ngIf="changeNickStatus == 4" class="label label-success">Changed Successfully!</span> <span *ngIf="changeNickStatus == 5" class="label label-danger">Problem, Please try again little bit later</span></div><div *ngIf="!player.IsNickChangeAllowed && !isNickChangeInProgress"><span class="body_sub_title">You don\'t have any nick change left</span><br><br><div *ngIf="platform.isStoreReady != null"><button class="btn btn-success" [class.disabled]="platform.isStoreReady == false" (click)="onBuyNickChange()">Buy 1x Nick Change</button></div><div *ngIf="platform.isStoreReady == null"><div class="body_sub_title">You can buy this service only on following platforms:</div><br><a href="https://itunes.apple.com/us/app/online-joker/id1109734625" class="btn btn-primary" target="_blank"><i class="fa fa-apple"></i></a></div></div></section><section class="actions"><button class="btn btn-primary" (click)="onNickChangeBack()">Back</button> <button *ngIf="changeNickStatus != 3" class="btn btn-primary" disabled (click)="onNickChange()">Change</button> <button *ngIf="changeNickStatus == 3" class="btn btn-success" (click)="onNickChange()">Change</button></section></group><group *ngIf="viewMode == 3 && player"><section *ngIf="player.Fullname" class="title">Change Avatar</section><section class="body text-center">...</section><section class="actions"><button class="btn btn-primary" (click)="viewMode=1">Back</button> <button class="btn btn-warning" (click)="viewMode=1">Save</button></section></group></div>',
                        directives: [levelprogress_1.UILevelProgress, achievement_1.UIAchievement],
                        pipes: [PastDatePipe_1.PastDatePipe]
                    }), 
                    __metadata('design:paramtypes', [core_15.NgZone, UsersProvider_3.UsersProvider, CurrentUserProvider_4.CurrentUserProvider, http_5.Http, ConfigProvider_5.ConfigProvider, Platforms_3.PlatformProvider])
                ], UIPlayerInfo);
                return UIPlayerInfo;
            }());
            exports_18("UIPlayerInfo", UIPlayerInfo);
        }
    }
});
System.register("Modules/Music/music.model", [], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("Modules/Music/music.provider", ['angular2/core', 'angular2/http', "Common/Providers/All"], function(exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var core_16, http_6, All_2;
    var MusicProvider;
    return {
        setters:[
            function (core_16_1) {
                core_16 = core_16_1;
            },
            function (http_6_1) {
                http_6 = http_6_1;
            },
            function (All_2_1) {
                All_2 = All_2_1;
            }],
        execute: function() {
            MusicProvider = (function (_super) {
                __extends(MusicProvider, _super);
                function MusicProvider(config, http) {
                    var _this = this;
                    _super.call(this);
                    this.config = config;
                    this.http = http;
                    this.channels = [];
                    this.searchText = '';
                    this.channelGroups = [[], [], []];
                    this.http.get(this.config.apiUrl + '/music/channels/all?sid=' + this.config.sid).subscribe(function (response) {
                        var res = response.json();
                        if (!res.IsSuccess)
                            return;
                        res.Data.forEach(function (x) { return x.Name = x.Name.toUpperCase(); });
                        _this.channels = res.Data;
                        _this.refreshChannels();
                        _this.loadLastListeningChannel();
                    });
                    this.audioStream = new Audio();
                    this.audioStream.addEventListener('playing', this.audioPlayingStarted.bind(this), false);
                    this.audioStream.addEventListener('error', this.audioPlayingError.bind(this), false);
                    this.refreshChannels();
                    this.stop();
                }
                MusicProvider.prototype.play = function (channelName) {
                    if (!this.channels || !this.channels.length) {
                        console.warn('no channels');
                        return;
                    }
                    this.isPlaying = true;
                    this.activeChannel = this.channels.filter(function (x) { return x.Name == channelName; })[0] || this.activeChannel || this.channels[0];
                    this.playStream(this.activeChannel.Source);
                    localStorage.setItem('music_channel', this.activeChannel.Name.toUpperCase());
                    this.emit(MusicProvider.PLAY, this.activeChannel);
                };
                MusicProvider.prototype.stop = function () {
                    this.isPlaying = false;
                    this.audioStream.pause();
                    try {
                        this.audioStream.src = '';
                    }
                    catch (err) { }
                    this.emit(MusicProvider.STOP);
                };
                MusicProvider.prototype.nextChannel = function () {
                    if (!this.channels || !this.channels.length)
                        return;
                    var index = this.channels.indexOf(this.activeChannel);
                    this.activeChannel = this.channels[index + 1 >= this.channels.length ? 0 : ++index];
                    this.play(this.activeChannel.Name);
                };
                MusicProvider.prototype.prevChannel = function () {
                    if (!this.channels || !this.channels.length)
                        return;
                    var index = this.channels.indexOf(this.activeChannel);
                    this.activeChannel = this.channels[index - 1 < 0 ? this.channels.length - 1 : --index];
                    this.play(this.activeChannel.Name);
                };
                MusicProvider.prototype.getChannelName = function (id) {
                    var channel = this.channels.filter(function (x) { return x.ID == id; })[0];
                    return channel ? channel.Name : null;
                };
                MusicProvider.prototype.refreshChannels = function () {
                    var _this = this;
                    var favorites = this.channels.filter(function (x) { return x.IsFavorite && !x.IsOffline && _this.search(x, _this.searchText); });
                    var featured = this.channels.filter(function (x) { return x.IsFeatured && !x.IsOffline && _this.search(x, _this.searchText); });
                    var other = this.channels.filter(function (x) { return !x.IsFavorite && !x.IsFeatured && !x.IsOffline && _this.search(x, _this.searchText); });
                    this.channelGroups = [
                        favorites,
                        featured,
                        other
                    ];
                };
                MusicProvider.prototype.search = function (channel, text) {
                    if (!text)
                        return true;
                    text = text.toString().toUpperCase();
                    if (~channel.Name.indexOf(text))
                        return true;
                    if (~channel.TrackInfo.indexOf(text))
                        return true;
                    return false;
                };
                MusicProvider.prototype.audioPlayingStarted = function () {
                    this.emit(MusicProvider.STARTED_PLAYING);
                };
                MusicProvider.prototype.audioPlayingError = function () {
                    this.emit(MusicProvider.FAILED_PLAYING);
                };
                MusicProvider.prototype.loadLastListeningChannel = function () {
                    var isMusicPlaying = localStorage.getItem('isMusicPlaying');
                    var channel = localStorage.getItem('music_channel');
                    if (isMusicPlaying != '1') {
                        if (channel)
                            this.activeChannel = this.channels.filter(function (c) { return c.Name.toUpperCase() == channel; })[0];
                        return;
                    }
                    this.play(channel);
                };
                MusicProvider.prototype.playStream = function (url) {
                    this.audioStream.src = url;
                    this.audioStream.play();
                    this.audioStream.volume = 0.6;
                };
                MusicProvider.PLAY = 'PLAY';
                MusicProvider.STOP = 'STOP';
                MusicProvider.STARTED_PLAYING = 'STARTED_PLAYING';
                MusicProvider.FAILED_PLAYING = 'FAILED_PLAYING';
                MusicProvider = __decorate([
                    core_16.Injectable(), 
                    __metadata('design:paramtypes', [All_2.ConfigProvider, http_6.Http])
                ], MusicProvider);
                return MusicProvider;
            }(EventEmitter));
            exports_20("MusicProvider", MusicProvider);
        }
    }
});
System.register("Modules/Music/player.component", ['angular2/core', 'angular2/http', "Common/Providers/All", "Modules/Music/music.provider"], function(exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var core_17, http_7, All_3, music_provider_1;
    var UIMusicPlayer;
    return {
        setters:[
            function (core_17_1) {
                core_17 = core_17_1;
            },
            function (http_7_1) {
                http_7 = http_7_1;
            },
            function (All_3_1) {
                All_3 = All_3_1;
            },
            function (music_provider_1_1) {
                music_provider_1 = music_provider_1_1;
            }],
        execute: function() {
            UIMusicPlayer = (function () {
                function UIMusicPlayer(el, http, config, music) {
                    this.el = el;
                    this.http = http;
                    this.config = config;
                    this.music = music;
                    this.isMinimized = true;
                }
                UIMusicPlayer.prototype.ngOnInit = function () {
                    var _this = this;
                    this.music.on(music_provider_1.MusicProvider.PLAY, function (channel) {
                        _this.title = UIMusicPlayer.TitleLoading;
                        _this.channelName = channel.Name;
                        _this.channelLogoUrl = channel.LogoUrl;
                    });
                    this.music.on(music_provider_1.MusicProvider.STARTED_PLAYING, function () { return _this.title = UIMusicPlayer.TitlePlaying; });
                    this.music.on(music_provider_1.MusicProvider.FAILED_PLAYING, function () { return _this.title = UIMusicPlayer.TitleFailed; });
                };
                UIMusicPlayer.prototype.ngOnDestroy = function () {
                    this.stop();
                };
                UIMusicPlayer.prototype.play = function (channelName) {
                    if (typeof (channelName) != 'string')
                        channelName = null;
                    this.music.play(channelName);
                };
                UIMusicPlayer.prototype.stop = function () {
                    this.music.stop();
                };
                UIMusicPlayer.prototype.playNext = function () {
                    this.music.nextChannel();
                };
                UIMusicPlayer.prototype.playPrevious = function () {
                    this.music.prevChannel();
                };
                UIMusicPlayer.prototype.toggleMinimized = function () {
                    var _this = this;
                    this.isMinimized = !this.isMinimized;
                    if (!this.isMinimized) {
                        setTimeout(function () { return $(_this.el.nativeElement).find('.search input').select(); }, 400);
                    }
                };
                UIMusicPlayer.EVENT_PLAY = "MusicPlayerPlay";
                UIMusicPlayer.EVENT_PLAYING = "MusicPlayerPlaying";
                UIMusicPlayer.EVENT_STOP = "MusicPlayerStop";
                UIMusicPlayer.EVENT_PLAY_NEXT = "MusicPlayerPlayNext";
                UIMusicPlayer.EVENT_PLAY_PREVIOUS = "MusicPlayerPlayPrevious";
                UIMusicPlayer.TitleLoading = 'LOADING...';
                UIMusicPlayer.TitlePlaying = 'PLAYING';
                UIMusicPlayer.TitleFailed = 'Streaming Failed...';
                UIMusicPlayer.TitleFavoriteChannels = 'Favorites';
                UIMusicPlayer.TitleChannels = 'Channels';
                UIMusicPlayer = __decorate([
                    core_17.Component({
                        selector: 'musicplayer',
                        styles: [".musicplayer {  position: relative;  width: 240px;  color: white;  z-index: 1060;  font-size: 19px;  -webkit-user-select: none;  -moz-user-select: none;  -ms-user-select: none;  user-select: none;  text-align: center;  background-color: #145730;  border-radius: 8px;  height: 355px;  border: 1px solid rgba(0, 0, 0, 0.2);  -moz-transition: linear 100ms;  -o-transition: linear 100ms;  -webkit-transition: linear 100ms;  transition: linear 100ms;  overflow: hidden;  font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Segoe UI Light','Helvetica Neue','Arial','Helvetica'; }  .musicplayer .header {    border-bottom: 1px solid rgba(255, 255, 255, 0.1);    height: 60px;    z-index: 10; }    .musicplayer .header .play_button {      position: absolute;      left: 12px;      top: 3px;      font-size: 33px;      opacity: .6;      cursor: pointer;      padding-left: 10px;      padding-right: 16px;      margin-left: -10px;      padding-bottom: 5px; }      .musicplayer .header .play_button:hover {        opacity: 1; }    .musicplayer .header .menu_button {      font-size: 20px;      right: 14px;      top: 15px;      color: white;      position: absolute;      cursor: pointer;      opacity: .5; }      .musicplayer .header .menu_button:hover {        opacity: 1; }  .musicplayer .search {    margin-top: 5px;    margin-bottom: 20px; }    .musicplayer .search input {      color: white;      border-radius: 20px;      background: rgba(255, 255, 255, 0.1); }  .musicplayer .playing {    border-bottom: 1px solid rgba(255, 255, 255, 0.1);    height: 61px;    padding-top: 5px;    position: relative;    display: none;    z-index: 10; }    .musicplayer .playing .jok-music-active-channellogo {      float: left;      margin-left: 5px; }      .musicplayer .playing .jok-music-active-channellogo img {        width: 50px;        height: 50px;        border-radius: 100%; }    .musicplayer .playing .jok-music-active-channelname {      font-size: 14px;      float: left;      margin-top: 12px;      margin-left: 9px;      width: 120px;      text-align: left;      white-space: nowrap;      overflow: hidden;      -ms-text-overflow: ellipsis;      -o-text-overflow: ellipsis;      text-overflow: ellipsis; }    .musicplayer .playing .playing-status {      position: absolute;      top: 34px;      color: rgba(16, 255, 0, 0.65);      font-size: 9px;      left: 65px;      width: 100px;      text-align: left; }    .musicplayer .playing .stop_button {      font-size: 26px;      position: absolute;      left: 19px;      top: 11px;      cursor: pointer;      text-shadow: 0 0 20px black;      opacity: 0.8; }      .musicplayer .playing .stop_button:hover {        /*color: #ED7676;*/        opacity: 1; }    .musicplayer .playing .menu_button {      font-size: 20px;      right: 14px;      top: 15px;      color: white;      position: absolute;      cursor: pointer;      opacity: .5; }      .musicplayer .playing .menu_button:hover {        opacity: 1; }  .musicplayer .content {    position: absolute;    top: 60px;    bottom: 0;    height: unset;    left: 7px;    padding-top: 6px;    overflow-y: scroll;    right: 0; }    .musicplayer .content .group_header {      font-size: 13px;      color: silver;      margin-top: 10px;      margin-bottom: 5px;      opacity: 0.6;      text-align: right;      border-bottom: 1px solid rgba(255, 255, 255, 0.12);      padding-bottom: 4px; }    .musicplayer .content .group_footer {      margin-bottom: 20px;      opacity: 0.2;      font-weight: bold;      display: block;      margin-top: 12px; }      .musicplayer .content .group_footer a {        color: silver; }        .musicplayer .content .group_footer a:hover {          color: white;          text-decoration: none; }    .musicplayer .content .item {      font-size: 14px;      padding-top: 5px;      padding-bottom: 10px;      cursor: default;      position: relative;      cursor: pointer; }      .musicplayer .content .item.offline {        opacity: .5; }      .musicplayer .content .item:hover {        padding-left: 5px; }      .musicplayer .content .item img {        width: 20px;        height: 20px;        border-radius: 13px;        float: left;        margin-right: 8px; }      .musicplayer .content .item div {        text-align: left; }  .musicplayer.playing .header {    display: none; }  .musicplayer.playing .playing {    display: block; }  .musicplayer.minimized {    height: 60px; }    .musicplayer.minimized .header .menu_button {      display: none; }    .musicplayer.minimized:not(.playing) {      width: 60px; }    .musicplayer.minimized .content {      display: none; }"],
                        template: '<div class="musicplayer" [class.minimized]="isMinimized" [class.playing]="music.isPlaying"><div class="header"><span *ngIf="!music.isPlaying" class="item play_button jok-music-play-button" (click)="play()"><i class="fa fa-music"></i></span><div class="menu_button" (click)="toggleMinimized()"><i class="fa fa-bars"></i></div></div><div class="playing"><div *ngIf="music.isPlaying" class="jok-music-active-channellogo"><img [src]="channelLogoUrl"></div><div *ngIf="music.isPlaying" class="jok-music-active-channelname">{{channelName}}</div><div class="playing-status">{{title}}</div><span *ngIf="music.isPlaying" class="stop_button" (click)="stop()"><i class="fa fa-pause"></i></span><div class="menu_button" (click)="toggleMinimized()"><i class="fa fa-bars"></i></div></div><div class="content ios-scroll"><div class="search"><input type="text" class="form-control" [placeholder]="\'musicplayer.Search\' | translate" [(ngModel)]="music.searchText" (keyup)="music.refreshChannels()"></div><div *ngIf="music.channelGroups[0].length"><div class="group_header">{{\'musicplayer.FavoriteChannels\' | translate}}</div><div class="favorites"><div class="item" *ngFor="#item of music.channelGroups[0]" (click)="play(item.Name)" [class.offline]="item.IsOffline"><img [src]="item.LogoUrl" alt="logo"><div>{{item.Name}}</div></div></div></div><div *ngIf="music.channelGroups[1].length"><div class="group_header">{{\'musicplayer.FeaturedChannels\' | translate}}</div><div class="favorites"><div class="item" *ngFor="#item of music.channelGroups[1]" (click)="play(item.Name)" [class.offline]="item.IsOffline"><img [src]="item.LogoUrl" alt="logo"><div>{{item.Name}}</div></div></div></div><div class="group_header others">{{\'musicplayer.OtherChannels\' | translate}}</div><div class="others"><div class="item" *ngFor="#item of music.channelGroups[2]" (click)="play(item.Name)" [class.offline]="item.IsOffline"><img [src]="item.LogoUrl" alt="logo"><div>{{item.Name}}</div></div></div><div class="group_footer"><a href="http://jok.fm" target="_blank">JOK.FM</a></div></div></div>'
                    }), 
                    __metadata('design:paramtypes', [core_17.ElementRef, http_7.Http, All_3.ConfigProvider, music_provider_1.MusicProvider])
                ], UIMusicPlayer);
                return UIMusicPlayer;
            }());
            exports_21("UIMusicPlayer", UIMusicPlayer);
        }
    }
});
System.register("Modules/Joker/Models/Enums", [], function(exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var CardColor, CardLevel, VizualDealMode, TableStatuses, KozirMode, GameModes, NotificationType, ColorSelectionMode, Table_Type;
    return {
        setters:[],
        execute: function() {
            (function (CardColor) {
                CardColor[CardColor["Blue"] = 0] = "Blue";
                CardColor[CardColor["Orange"] = 1] = "Orange";
                CardColor[CardColor["Red"] = 2] = "Red";
                CardColor[CardColor["Purple"] = 3] = "Purple";
                CardColor[CardColor["None"] = 4] = "None";
            })(CardColor || (CardColor = {}));
            exports_22("CardColor", CardColor);
            (function (CardLevel) {
                CardLevel[CardLevel["_6"] = 0] = "_6";
                CardLevel[CardLevel["_7"] = 1] = "_7";
                CardLevel[CardLevel["_8"] = 2] = "_8";
                CardLevel[CardLevel["_9"] = 3] = "_9";
                CardLevel[CardLevel["_10"] = 4] = "_10";
                CardLevel[CardLevel["Valet"] = 5] = "Valet";
                CardLevel[CardLevel["Queen"] = 6] = "Queen";
                CardLevel[CardLevel["King"] = 7] = "King";
                CardLevel[CardLevel["Ace"] = 8] = "Ace";
                CardLevel[CardLevel["J"] = 9] = "J";
            })(CardLevel || (CardLevel = {}));
            exports_22("CardLevel", CardLevel);
            (function (VizualDealMode) {
                VizualDealMode[VizualDealMode["Normal"] = 0] = "Normal";
                VizualDealMode[VizualDealMode["First"] = 1] = "First";
                VizualDealMode[VizualDealMode["Last"] = 2] = "Last";
                VizualDealMode[VizualDealMode["Special"] = 3] = "Special";
            })(VizualDealMode || (VizualDealMode = {}));
            exports_22("VizualDealMode", VizualDealMode);
            (function (TableStatuses) {
                TableStatuses[TableStatuses["New"] = 1] = "New";
                TableStatuses[TableStatuses["Started"] = 2] = "Started";
                TableStatuses[TableStatuses["Stopped"] = 3] = "Stopped";
                TableStatuses[TableStatuses["Finished"] = 4] = "Finished";
            })(TableStatuses || (TableStatuses = {}));
            exports_22("TableStatuses", TableStatuses);
            (function (KozirMode) {
                KozirMode[KozirMode["Card"] = 0] = "Card";
                KozirMode[KozirMode["Color"] = 1] = "Color";
            })(KozirMode || (KozirMode = {}));
            exports_22("KozirMode", KozirMode);
            (function (GameModes) {
                GameModes[GameModes["Normal_200"] = 0] = "Normal_200";
                GameModes[GameModes["Only9_200"] = 1] = "Only9_200";
                GameModes[GameModes["Normal_Spec"] = 2] = "Normal_Spec";
                GameModes[GameModes["Only9_Spec"] = 3] = "Only9_Spec";
                GameModes[GameModes["Normal_500"] = 4] = "Normal_500";
                GameModes[GameModes["Only9_500"] = 5] = "Only9_500";
                GameModes[GameModes["Normal_1000"] = 6] = "Normal_1000";
                GameModes[GameModes["Only9_1000"] = 7] = "Only9_1000";
            })(GameModes || (GameModes = {}));
            exports_22("GameModes", GameModes);
            (function (NotificationType) {
                NotificationType[NotificationType["None"] = 0] = "None";
                NotificationType[NotificationType["Connecting"] = 1] = "Connecting";
                NotificationType[NotificationType["Authenticating"] = 2] = "Authenticating";
                NotificationType[NotificationType["RequireAuthorization"] = 3] = "RequireAuthorization";
                NotificationType[NotificationType["WaitingForOpponent"] = 4] = "WaitingForOpponent";
                NotificationType[NotificationType["WaitingForFriend"] = 5] = "WaitingForFriend";
                NotificationType[NotificationType["ConnectionClosed"] = 6] = "ConnectionClosed";
                NotificationType[NotificationType["GameFinished"] = 7] = "GameFinished";
                NotificationType[NotificationType["GameStarting"] = 8] = "GameStarting";
            })(NotificationType || (NotificationType = {}));
            exports_22("NotificationType", NotificationType);
            (function (ColorSelectionMode) {
                ColorSelectionMode[ColorSelectionMode["ColorSelection"] = 1] = "ColorSelection";
                ColorSelectionMode[ColorSelectionMode["WantTakeSelection"] = 2] = "WantTakeSelection";
                ColorSelectionMode[ColorSelectionMode["WantColorSelection"] = 3] = "WantColorSelection";
                ColorSelectionMode[ColorSelectionMode["TakeColorSelection"] = 4] = "TakeColorSelection";
            })(ColorSelectionMode || (ColorSelectionMode = {}));
            exports_22("ColorSelectionMode", ColorSelectionMode);
            (function (Table_Type) {
                Table_Type[Table_Type["normal"] = 0] = "normal";
                Table_Type[Table_Type["only9"] = 1] = "only9";
            })(Table_Type || (Table_Type = {}));
            exports_22("Table_Type", Table_Type);
        }
    }
});
System.register("Modules/Joker/Models/CardType", ["Modules/Joker/Models/Enums"], function(exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var Enums_1;
    var CardType;
    return {
        setters:[
            function (Enums_1_1) {
                Enums_1 = Enums_1_1;
            }],
        execute: function() {
            CardType = (function () {
                function CardType() {
                }
                CardType.Create = function (color, level, isEnabled) {
                    if (isEnabled === void 0) { isEnabled = true; }
                    var item = new CardType();
                    item.CardColor = color;
                    item.CardLevel = level;
                    item.IsVisible = true;
                    item.IsEnabled = isEnabled;
                    item.IsDominated = false;
                    return item;
                };
                CardType.IsSpecial = function (card) {
                    var result = (card.CardColor == Enums_1.CardColor.Red || card.CardColor == Enums_1.CardColor.Purple) && (card.CardLevel == Enums_1.CardLevel._6);
                    return result;
                };
                return CardType;
            }());
            exports_23("CardType", CardType);
        }
    }
});
System.register("Modules/Joker/Models/CheckTextResult", [], function(exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var CheckTextResult;
    return {
        setters:[],
        execute: function() {
            CheckTextResult = (function () {
                function CheckTextResult() {
                }
                return CheckTextResult;
            }());
            exports_24("CheckTextResult", CheckTextResult);
        }
    }
});
System.register("Modules/Joker/Models/DeclarationModel", [], function(exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var DeclarationModel;
    return {
        setters:[],
        execute: function() {
            DeclarationModel = (function () {
                function DeclarationModel(Count, Ignore, Recommend) {
                    this.Count = Count;
                    this.Ignore = Ignore;
                    this.Recommend = Recommend;
                }
                return DeclarationModel;
            }());
            exports_25("DeclarationModel", DeclarationModel);
        }
    }
});
System.register("Modules/Joker/Models/FinishInfoModel", [], function(exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var FinishInfoModel, FinishInfoPlayer;
    return {
        setters:[],
        execute: function() {
            FinishInfoModel = (function () {
                function FinishInfoModel() {
                    this.PlaceStars = null;
                    this.LowLevelToLoseStars = null;
                    this.AddedStars = null;
                    this.NewStarsCount = null;
                    this.IsLowLevelPlayersGame = null;
                    this.IsIgnored = null;
                }
                return FinishInfoModel;
            }());
            exports_26("FinishInfoModel", FinishInfoModel);
            FinishInfoPlayer = (function () {
                function FinishInfoPlayer() {
                }
                return FinishInfoPlayer;
            }());
            exports_26("FinishInfoPlayer", FinishInfoPlayer);
        }
    }
});
System.register("Modules/Joker/Models/GamePlayer", [], function(exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var GamePlayerDTO, GamePlayer;
    return {
        setters:[],
        execute: function() {
            GamePlayerDTO = (function () {
                function GamePlayerDTO() {
                }
                return GamePlayerDTO;
            }());
            GamePlayer = (function (_super) {
                __extends(GamePlayer, _super);
                function GamePlayer() {
                    _super.apply(this, arguments);
                }
                GamePlayer.CreateMock = function (userId, nick, avatar, isOnline) {
                    if (isOnline === void 0) { isOnline = true; }
                    var item = new GamePlayer();
                    item.Nick = nick;
                    item.UserID = userId;
                    item.AvatarUri = avatar;
                    item.Want = 2;
                    item.Took = Math.round(Math.random() * 3);
                    item.IsOnline = isOnline;
                    item.LevelName = "პროფესიონალი";
                    item.MusicChannelName = "HITS d daawd wadawdawa";
                    return item;
                };
                return GamePlayer;
            }(GamePlayerDTO));
            exports_27("GamePlayer", GamePlayer);
        }
    }
});
System.register("Modules/Joker/Models/GameTable", [], function(exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var GameTable;
    return {
        setters:[],
        execute: function() {
            GameTable = (function () {
                function GameTable() {
                }
                return GameTable;
            }());
            exports_28("GameTable", GameTable);
        }
    }
});
System.register("Modules/Joker/Models/MatrixGameResultsModel", [], function(exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var MatrixTableResult, MatrixTableResultType;
    return {
        setters:[],
        execute: function() {
            MatrixTableResult = (function () {
                function MatrixTableResult(ResultType, SectionNo, LineNo, PlayerScore, Position, PlayerWant, PlayerTook) {
                    this.ResultType = ResultType;
                    this.SectionNo = SectionNo;
                    this.LineNo = LineNo;
                    this.PlayerScore = PlayerScore;
                    this.Position = Position;
                    this.PlayerWant = PlayerWant;
                    this.PlayerTook = PlayerTook;
                }
                return MatrixTableResult;
            }());
            exports_29("MatrixTableResult", MatrixTableResult);
            (function (MatrixTableResultType) {
                MatrixTableResultType[MatrixTableResultType["Result"] = 0] = "Result";
                MatrixTableResultType[MatrixTableResultType["SectionResult"] = 1] = "SectionResult";
                MatrixTableResultType[MatrixTableResultType["Bonus"] = 2] = "Bonus";
                MatrixTableResultType[MatrixTableResultType["Raiting"] = 3] = "Raiting";
                MatrixTableResultType[MatrixTableResultType["Total"] = 4] = "Total";
            })(MatrixTableResultType || (MatrixTableResultType = {}));
            exports_29("MatrixTableResultType", MatrixTableResultType);
        }
    }
});
System.register("Modules/Joker/Models/PlayerStatusChangeModel", [], function(exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    var PlayerStatusChangeModel;
    return {
        setters:[],
        execute: function() {
            PlayerStatusChangeModel = (function () {
                function PlayerStatusChangeModel() {
                }
                return PlayerStatusChangeModel;
            }());
            exports_30("PlayerStatusChangeModel", PlayerStatusChangeModel);
        }
    }
});
System.register("Modules/Joker/Models/ReportUserModel", [], function(exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var ReportUserModel;
    return {
        setters:[],
        execute: function() {
            ReportUserModel = (function () {
                function ReportUserModel() {
                }
                return ReportUserModel;
            }());
            exports_31("ReportUserModel", ReportUserModel);
        }
    }
});
System.register("Modules/Joker/Models/ResultsModel", [], function(exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var ResultsModel, ResultSection, ResultSectionItems, ResultItem;
    return {
        setters:[],
        execute: function() {
            ResultsModel = (function () {
                function ResultsModel() {
                }
                return ResultsModel;
            }());
            exports_32("ResultsModel", ResultsModel);
            ResultSection = (function () {
                function ResultSection() {
                }
                return ResultSection;
            }());
            exports_32("ResultSection", ResultSection);
            ResultSectionItems = (function () {
                function ResultSectionItems() {
                }
                return ResultSectionItems;
            }());
            exports_32("ResultSectionItems", ResultSectionItems);
            ResultItem = (function () {
                function ResultItem() {
                }
                ResultItem.prototype.isGood = function () {
                    return (this.Score >= 100 || (this.Want == 0 && this.Score == 50)) && !this.isPending();
                };
                ResultItem.prototype.isBad = function () {
                    return !this.isGood() && !this.isPending();
                };
                ResultItem.prototype.isPending = function () {
                    return (this.Want == undefined) || (this.Want == null) || (this.Score == undefined) || (this.Score == null);
                };
                ResultItem.Create = function (want, score, isBonus, isRemoved) {
                    if (isBonus === void 0) { isBonus = false; }
                    if (isRemoved === void 0) { isRemoved = false; }
                    var item = new ResultItem();
                    item.Want = want;
                    item.Score = score;
                    item.IsBonus = isBonus;
                    item.IsRemoved = isRemoved;
                    return item;
                };
                return ResultItem;
            }());
            exports_32("ResultItem", ResultItem);
        }
    }
});
System.register("Modules/Joker/Models/All", ["Modules/Joker/Models/CardType", "Modules/Joker/Models/CheckTextResult", "Modules/Joker/Models/DeclarationModel", "Modules/Joker/Models/Enums", "Modules/Joker/Models/FinishInfoModel", "Modules/Joker/Models/GamePlayer", "Modules/Joker/Models/GameTable", "Modules/Joker/Models/MatrixGameResultsModel", "Modules/Joker/Models/PlayerStatusChangeModel", "Modules/Joker/Models/ReportUserModel", "Modules/Joker/Models/ResultsModel"], function(exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    function exportStar_2(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_33(exports);
    }
    return {
        setters:[
            function (CardType_1_1) {
                exportStar_2(CardType_1_1);
            },
            function (CheckTextResult_1_1) {
                exportStar_2(CheckTextResult_1_1);
            },
            function (DeclarationModel_1_1) {
                exportStar_2(DeclarationModel_1_1);
            },
            function (Enums_2_1) {
                exportStar_2(Enums_2_1);
            },
            function (FinishInfoModel_1_1) {
                exportStar_2(FinishInfoModel_1_1);
            },
            function (GamePlayer_1_1) {
                exportStar_2(GamePlayer_1_1);
            },
            function (GameTable_1_1) {
                exportStar_2(GameTable_1_1);
            },
            function (MatrixGameResultsModel_1_1) {
                exportStar_2(MatrixGameResultsModel_1_1);
            },
            function (PlayerStatusChangeModel_1_1) {
                exportStar_2(PlayerStatusChangeModel_1_1);
            },
            function (ReportUserModel_1_1) {
                exportStar_2(ReportUserModel_1_1);
            },
            function (ResultsModel_1_1) {
                exportStar_2(ResultsModel_1_1);
            }],
        execute: function() {
        }
    }
});
System.register("Modules/Joker/Pipes/EscapeWantZero", ['angular2/core'], function(exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    var core_18;
    var EscapeWantZero;
    return {
        setters:[
            function (core_18_1) {
                core_18 = core_18_1;
            }],
        execute: function() {
            EscapeWantZero = (function () {
                function EscapeWantZero() {
                }
                EscapeWantZero.prototype.transform = function (value, args) {
                    return value == 0 ? '-' : value;
                };
                EscapeWantZero = __decorate([
                    core_18.Pipe({ name: 'escapeWantZero' }), 
                    __metadata('design:paramtypes', [])
                ], EscapeWantZero);
                return EscapeWantZero;
            }());
            exports_34("EscapeWantZero", EscapeWantZero);
        }
    }
});
System.register("Modules/Joker/Pipes/Result", ['angular2/core'], function(exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    var core_19;
    var Result;
    return {
        setters:[
            function (core_19_1) {
                core_19 = core_19_1;
            }],
        execute: function() {
            Result = (function () {
                function Result() {
                }
                Result.prototype.transform = function (value, args) {
                    if (!value)
                        return '';
                    var result = parseInt(value);
                    return result < 0 ? '|---|' : result;
                };
                Result = __decorate([
                    core_19.Pipe({ name: 'result' }), 
                    __metadata('design:paramtypes', [])
                ], Result);
                return Result;
            }());
            exports_35("Result", Result);
        }
    }
});
System.register("Modules/Joker/Pipes/TotalResult", ['angular2/core'], function(exports_36, context_36) {
    "use strict";
    var __moduleName = context_36 && context_36.id;
    var core_20;
    var TotalResult;
    return {
        setters:[
            function (core_20_1) {
                core_20 = core_20_1;
            }],
        execute: function() {
            TotalResult = (function () {
                function TotalResult() {
                }
                TotalResult.prototype.transform = function (value, args) {
                    if (!value && value != '0')
                        return '';
                    var result = Math.round(parseInt(value) / 10) / 10;
                    if (!result)
                        return '0.0';
                    if (this.isInt(result)) {
                        return result + '.0';
                    }
                    return result;
                };
                TotalResult.prototype.isInt = function (n) {
                    return n % 1 === 0;
                };
                TotalResult = __decorate([
                    core_20.Pipe({ name: 'totalResult' }), 
                    __metadata('design:paramtypes', [])
                ], TotalResult);
                return TotalResult;
            }());
            exports_36("TotalResult", TotalResult);
        }
    }
});
System.register("Modules/CommunicationClient/communication.provider", ['angular2/core'], function(exports_37, context_37) {
    "use strict";
    var __moduleName = context_37 && context_37.id;
    var core_21;
    var CommunicationClientProvider;
    return {
        setters:[
            function (core_21_1) {
                core_21 = core_21_1;
            }],
        execute: function() {
            CommunicationClientProvider = (function (_super) {
                __extends(CommunicationClientProvider, _super);
                function CommunicationClientProvider(zone) {
                    _super.call(this);
                    this.zone = zone;
                    this.messagesLog = [];
                    this.enableMessageLogging = false;
                }
                CommunicationClientProvider.prototype.setOptions = function (options) {
                    this.options = options;
                    this.enableMessageLogging = options.enableMessageLogging || false;
                };
                CommunicationClientProvider.prototype.send = function (event) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    try {
                        var parameters = [event];
                        parameters.push.apply(parameters, args);
                        this.sendInternal(parameters);
                    }
                    catch (err) {
                        console.error('[Send Failed]', event, args, err);
                    }
                };
                CommunicationClientProvider.prototype.messageReceived = function (data) {
                    var _this = this;
                    this.zone.run(function () {
                        _this.emit('MessageProceed', data);
                        if (_this.enableMessageLogging) {
                            _this.messagesLog.push(data);
                        }
                        _this.emit.apply(_this, data);
                        _this.emit('MessageProceedCompleted', data);
                    });
                };
                CommunicationClientProvider = __decorate([
                    core_21.Injectable(), 
                    __metadata('design:paramtypes', [core_21.NgZone])
                ], CommunicationClientProvider);
                return CommunicationClientProvider;
            }(EventEmitter));
            exports_37("CommunicationClientProvider", CommunicationClientProvider);
        }
    }
});
System.register("Modules/CommunicationClient/mock.provider", ['angular2/core', "Modules/CommunicationClient/communication.provider"], function(exports_38, context_38) {
    "use strict";
    var __moduleName = context_38 && context_38.id;
    var core_22, communication_provider_1;
    var MockClientProvider;
    return {
        setters:[
            function (core_22_1) {
                core_22 = core_22_1;
            },
            function (communication_provider_1_1) {
                communication_provider_1 = communication_provider_1_1;
            }],
        execute: function() {
            MockClientProvider = (function (_super) {
                __extends(MockClientProvider, _super);
                function MockClientProvider(zone) {
                    _super.call(this, zone);
                }
                MockClientProvider.prototype.start = function () {
                    console.log('[Mock Communication Started]');
                    this.emit('online');
                };
                MockClientProvider.prototype.stop = function () {
                    console.log('[Mock Communication Stopped]');
                    this.emit('offline');
                };
                MockClientProvider.prototype.sendInternal = function (parameters) {
                    console.log('[Mock Send]', parameters);
                };
                MockClientProvider = __decorate([
                    core_22.Injectable(), 
                    __metadata('design:paramtypes', [core_22.NgZone])
                ], MockClientProvider);
                return MockClientProvider;
            }(communication_provider_1.CommunicationClientProvider));
            exports_38("MockClientProvider", MockClientProvider);
        }
    }
});
System.register("Modules/CommunicationClient/signalr.provider", ['angular2/core', "Modules/CommunicationClient/communication.provider"], function(exports_39, context_39) {
    "use strict";
    var __moduleName = context_39 && context_39.id;
    var core_23, communication_provider_2;
    var SignalRClientProvider;
    return {
        setters:[
            function (core_23_1) {
                core_23 = core_23_1;
            },
            function (communication_provider_2_1) {
                communication_provider_2 = communication_provider_2_1;
            }],
        execute: function() {
            SignalRClientProvider = (function (_super) {
                __extends(SignalRClientProvider, _super);
                function SignalRClientProvider(zone) {
                    _super.call(this, zone);
                }
                SignalRClientProvider.prototype.start = function () {
                    var connection = $.hubConnection();
                    connection.stateChanged(this.stateChange.bind(this));
                    connection.qs = { token: this.options.token, channel: this.options.channel };
                    $(connection).bind('onReceived', this.onMessageReceived.bind(this));
                    this.options.transports = this.options.transports || ['longPolling'];
                    if (this.options.url)
                        connection.url = this.options.url;
                    this.hub = connection.createHubProxy(this.options.hubName);
                    this.hub.on('close', this.close.bind(this));
                    this.hub.connection.start({ transport: this.options.transports });
                };
                SignalRClientProvider.prototype.stop = function () {
                    try {
                        if (!this.hub)
                            return;
                        this.hub.connection.stop();
                    }
                    catch (err) {
                        console.warn(err);
                    }
                };
                SignalRClientProvider.prototype.sendInternal = function (parameters) {
                    this.hub.invoke.apply(this.hub, parameters);
                };
                SignalRClientProvider.prototype.stateChange = function (change) {
                    var _this = this;
                    switch (change.newState) {
                        case $.signalR.connectionState.connected:
                            this.connect();
                            this.reconnectSec = 0;
                            break;
                        case $.signalR.connectionState.reconnecting:
                            this.disconnect();
                            break;
                        case $.signalR.connectionState.disconnected:
                            if (change.oldState == $.signalR.connectionState.connected)
                                this.disconnect();
                            if (!this.tryReconnect)
                                return;
                            if (this.reconnectSec < 10)
                                this.reconnectSec++;
                            console.log('connection lost, reconnecting in ' + this.reconnectSec + ' sec.');
                            setTimeout(function () {
                                _this.start();
                            }, this.reconnectSec * 1000);
                            break;
                    }
                };
                SignalRClientProvider.prototype.connect = function () {
                    this.emit('online');
                };
                SignalRClientProvider.prototype.disconnect = function () {
                    this.emit('offline');
                };
                SignalRClientProvider.prototype.close = function (reason) {
                    console.log('Connection closed', reason);
                    this.tryReconnect = false;
                    this.hub.connection.stop();
                    this.emit('offline');
                };
                SignalRClientProvider.prototype.onMessageReceived = function (e, data) {
                    this.emit('MessageReceived', data);
                    try {
                        if (data && data.E) {
                            console.warn(data.E);
                            return;
                        }
                        if (data && data.I) {
                            console.warn(data.I);
                            return;
                        }
                        if (!data || data.H.toLowerCase() != this.hub.hubName.toLowerCase()) {
                            console.log('skipped message', data);
                            return;
                        }
                    }
                    catch (err) {
                        console.warn('Error while message receved', err, data);
                    }
                    var parameters = [data.M];
                    parameters.push.apply(parameters, data.A);
                    this.messageReceived(parameters);
                };
                SignalRClientProvider = __decorate([
                    core_23.Injectable(), 
                    __metadata('design:paramtypes', [core_23.NgZone])
                ], SignalRClientProvider);
                return SignalRClientProvider;
            }(communication_provider_2.CommunicationClientProvider));
            exports_39("SignalRClientProvider", SignalRClientProvider);
        }
    }
});
System.register("Modules/CommunicationClient/socketio.provider", ['angular2/core', "Modules/CommunicationClient/communication.provider"], function(exports_40, context_40) {
    "use strict";
    var __moduleName = context_40 && context_40.id;
    var core_24, communication_provider_3;
    var SocketIOClientProvider;
    return {
        setters:[
            function (core_24_1) {
                core_24 = core_24_1;
            },
            function (communication_provider_3_1) {
                communication_provider_3 = communication_provider_3_1;
            }],
        execute: function() {
            SocketIOClientProvider = (function (_super) {
                __extends(SocketIOClientProvider, _super);
                function SocketIOClientProvider(zone) {
                    _super.call(this, zone);
                }
                SocketIOClientProvider.prototype.start = function () {
                    this.url = this.options.url + '?' +
                        ["token", this.options.token].join('=') + '&' +
                        ["channel", this.options.channel].join('=') + '&' +
                        ["levelControl", this.options.levelControl].join('=') + '&' +
                        ["starsControl", this.options.starsControl].join('=') + '&' +
                        ["clientAppInfo", this.options.clientAppInfo].join('=') + '&' +
                        ["mode", this.options.gameMode].join('=');
                    this.socket = io(this.url, { transports: this.options.transports, forceNew: true });
                    this.socket.onevent = this.onMessageReceived.bind(this);
                    this.socket.on('connect', this.connect.bind(this));
                    this.socket.on('disconnect', this.disconnect.bind(this));
                    this.socket.on('close', this.close.bind(this));
                };
                SocketIOClientProvider.prototype.stop = function () {
                    if (!this.socket)
                        return;
                    this.socket.close();
                };
                SocketIOClientProvider.prototype.sendInternal = function (parameters) {
                    this.socket.emit.apply(this.socket, parameters);
                };
                SocketIOClientProvider.prototype.connect = function () {
                    this.emit('online');
                };
                SocketIOClientProvider.prototype.disconnect = function () {
                    this.emit('offline');
                };
                SocketIOClientProvider.prototype.close = function (reason) {
                    console.log('Connection closed', reason);
                    this.emit('offline');
                };
                SocketIOClientProvider.prototype.onMessageReceived = function (pkg) {
                    this.emit('MessageReceived', pkg);
                    try {
                        if (pkg.type != 2) {
                            console.warn(pkg);
                            return;
                        }
                    }
                    catch (err) {
                        console.warn('Error while message receved', err, pkg.data);
                    }
                    this.messageReceived(pkg.data);
                };
                SocketIOClientProvider = __decorate([
                    core_24.Injectable(), 
                    __metadata('design:paramtypes', [core_24.NgZone])
                ], SocketIOClientProvider);
                return SocketIOClientProvider;
            }(communication_provider_3.CommunicationClientProvider));
            exports_40("SocketIOClientProvider", SocketIOClientProvider);
        }
    }
});
System.register("Modules/Cards/card.model", [], function(exports_41, context_41) {
    "use strict";
    var __moduleName = context_41 && context_41.id;
    var CardType, CardColor, CardLevel;
    return {
        setters:[],
        execute: function() {
            CardType = (function () {
                function CardType() {
                }
                CardType.Create = function (color, level, isEnabled) {
                    if (isEnabled === void 0) { isEnabled = true; }
                    var item = new CardType();
                    item.CardColor = color;
                    item.CardLevel = level;
                    item.IsVisible = true;
                    item.IsEnabled = isEnabled;
                    item.IsDominated = false;
                    return item;
                };
                CardType.IsSpecial = function (card) {
                    var result = (card.CardColor == CardColor.Red || card.CardColor == CardColor.Purple) && (card.CardLevel == CardLevel._6);
                    return result;
                };
                CardType.Sort = function (c1, c2) {
                    var result = 10 * ((c2.CardColor + 1) * (c2.IsDominated ? 10 : 1) - (c1.CardColor + 1) * (c1.IsDominated ? 10 : 1)) + (c1.CardLevel - c2.CardLevel);
                    if (CardType.IsSpecial(c1))
                        result = -1;
                    if (CardType.IsSpecial(c2))
                        result = 1;
                    return result;
                };
                CardType.SortWithDominatedLast = function (c1, c2) {
                    var result = 10 * ((c2.CardColor + 1) * (!c2.IsDominated ? 10 : 1) - (c1.CardColor + 1) * (!c1.IsDominated ? 10 : 1)) + (c1.CardLevel - c2.CardLevel);
                    if (CardType.IsSpecial(c1))
                        result = 1;
                    if (CardType.IsSpecial(c2))
                        result = 1;
                    return result;
                };
                return CardType;
            }());
            exports_41("CardType", CardType);
            (function (CardColor) {
                CardColor[CardColor["Blue"] = 0] = "Blue";
                CardColor[CardColor["Orange"] = 1] = "Orange";
                CardColor[CardColor["Red"] = 2] = "Red";
                CardColor[CardColor["Purple"] = 3] = "Purple";
                CardColor[CardColor["None"] = 4] = "None";
            })(CardColor || (CardColor = {}));
            exports_41("CardColor", CardColor);
            (function (CardLevel) {
                CardLevel[CardLevel["_6"] = 0] = "_6";
                CardLevel[CardLevel["_7"] = 1] = "_7";
                CardLevel[CardLevel["_8"] = 2] = "_8";
                CardLevel[CardLevel["_9"] = 3] = "_9";
                CardLevel[CardLevel["_10"] = 4] = "_10";
                CardLevel[CardLevel["Valet"] = 5] = "Valet";
                CardLevel[CardLevel["Queen"] = 6] = "Queen";
                CardLevel[CardLevel["King"] = 7] = "King";
                CardLevel[CardLevel["Ace"] = 8] = "Ace";
                CardLevel[CardLevel["J"] = 9] = "J";
            })(CardLevel || (CardLevel = {}));
            exports_41("CardLevel", CardLevel);
        }
    }
});
System.register("Common/Directives/drag", ['angular2/core'], function(exports_42, context_42) {
    "use strict";
    var __moduleName = context_42 && context_42.id;
    var core_25;
    var DragDirective;
    return {
        setters:[
            function (core_25_1) {
                core_25 = core_25_1;
            }],
        execute: function() {
            DragDirective = (function () {
                function DragDirective(el) {
                    var _this = this;
                    this.el = el;
                    this.dragclick = new core_25.EventEmitter();
                    var $el = $(el.nativeElement);
                    el.nativeElement.addEventListener('touchstart', function (e) { return _this.onTouchStart(e, $el); });
                    el.nativeElement.addEventListener('touchmove', function (e) { return _this.onTouchMove(e, $el); });
                    el.nativeElement.addEventListener('touchend', function (e) { return _this.onTouchEnd(e, $el); });
                }
                DragDirective.prototype.onTouchStart = function (e, $el) {
                    if (!this.isEnabled)
                        return;
                    this.originalPageY = e.touches[0].pageY;
                    this.moveLog = [];
                    this.lastLogDate = Date.now();
                    this.lastLogDate2 = Date.now();
                };
                DragDirective.prototype.onTouchEnd = function (e, $el) {
                    if (!this.isEnabled)
                        return;
                    var delta = 0;
                    $el.css({
                        transform: 'translateY(' + delta + 'px)',
                        MozTransform: 'translateY(' + delta + 'px)',
                        WebkitTransform: 'translateY(' + delta + 'px)',
                        msTransform: 'translateY(' + delta + 'px)'
                    });
                    if (!this.moveLog || !this.moveLog.length)
                        return;
                    this.moveLog.reverse();
                    var isMoveForward = true;
                    var sum = this.moveLog.reduce(function (x, y, a) {
                        isMoveForward = isMoveForward && ((x - y) > 0);
                        return y;
                    });
                    this.moveLog = null;
                    if (isMoveForward) {
                        this.dragclick.emit(null);
                    }
                };
                DragDirective.prototype.onTouchMove = function (e, $el) {
                    if (!this.isEnabled)
                        return;
                    e.preventDefault();
                    var limit = 200;
                    var delta = e.changedTouches[0].pageY - this.originalPageY;
                    if (delta > 0)
                        delta = 0;
                    if (delta < -limit)
                        delta = -limit;
                    delta = Math.round(delta);
                    var d = Date.now();
                    if (d - this.lastLogDate > 100) {
                        this.lastLogDate = d;
                        if (!this.moveLog)
                            this.moveLog = [];
                        this.moveLog.push(Math.abs(delta));
                        while (this.moveLog.length > 4)
                            this.moveLog.shift();
                    }
                    var d = Date.now();
                    if (d - this.lastLogDate2 > 40) {
                        this.lastLogDate2 = d;
                        $el.css({
                            transform: 'translateY(' + delta + 'px)',
                            MozTransform: 'translateY(' + delta + 'px)',
                            WebkitTransform: 'translateY(' + delta + 'px)',
                            msTransform: 'translateY(' + delta + 'px)'
                        });
                    }
                };
                __decorate([
                    core_25.Input('dragEnabled'), 
                    __metadata('design:type', Boolean)
                ], DragDirective.prototype, "isEnabled", void 0);
                __decorate([
                    core_25.Output(), 
                    __metadata('design:type', Object)
                ], DragDirective.prototype, "dragclick", void 0);
                DragDirective = __decorate([
                    core_25.Directive({
                        selector: '[drag]'
                    }), 
                    __metadata('design:paramtypes', [core_25.ElementRef])
                ], DragDirective);
                return DragDirective;
            }());
            exports_42("DragDirective", DragDirective);
        }
    }
});
System.register("Modules/Cards/card", ['angular2/core', 'angular2/common', "Modules/Cards/card.model", "Common/Directives/drag"], function(exports_43, context_43) {
    "use strict";
    var __moduleName = context_43 && context_43.id;
    var core_26, common_1, card_model_1, drag_1;
    var UICard;
    return {
        setters:[
            function (core_26_1) {
                core_26 = core_26_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (card_model_1_1) {
                card_model_1 = card_model_1_1;
            },
            function (drag_1_1) {
                drag_1 = drag_1_1;
            }],
        execute: function() {
            UICard = (function () {
                function UICard() {
                    this.classMap = {
                        dominated_color: this.card && this.card.IsDominated,
                        mini: this.mini,
                        enabled: this.card && this.card.IsEnabled
                    };
                }
                UICard.prototype.getLevel = function () {
                    return card_model_1.CardType.IsSpecial(this.card) ? card_model_1.CardLevel.J : this.card.CardLevel;
                };
                UICard.prototype.isSpecial = function () {
                    return card_model_1.CardType.IsSpecial(this.card);
                };
                UICard.prototype.getColor = function () {
                    if (card_model_1.CardType.IsSpecial(this.card)) {
                        return (this.card.SpecialColor >= 0) ? this.card.SpecialColor : 4;
                    }
                    return this.card.CardColor;
                };
                UICard.prototype.isCardWithPicture = function () {
                    return (this.card.CardLevel > card_model_1.CardLevel._10) || card_model_1.CardType.IsSpecial(this.card);
                };
                UICard.prototype.getCardNumber = function () {
                    switch (this.card.CardLevel) {
                        case card_model_1.CardLevel._6:
                            return 6;
                        case card_model_1.CardLevel._7:
                            return 7;
                        case card_model_1.CardLevel._8:
                            return 8;
                        case card_model_1.CardLevel._9:
                            return 9;
                        case card_model_1.CardLevel._10:
                            return 10;
                    }
                };
                UICard.prototype.getCardImageUrl = function () {
                    switch (this.card.CardLevel) {
                        case card_model_1.CardLevel.Valet:
                            return '/images/Cards/officer.png';
                        case card_model_1.CardLevel.Queen:
                            return '/images/Cards/queen.png';
                        case card_model_1.CardLevel.King:
                            return '/images/Cards/king.png';
                        case card_model_1.CardLevel.Ace:
                            return '/images/Cards/star.png';
                    }
                    return '';
                };
                UICard.prototype.getCardImageTitle = function () {
                    if (card_model_1.CardType.IsSpecial(this.card))
                        return 'Magic';
                    switch (this.card.CardLevel) {
                        case card_model_1.CardLevel.Valet:
                            return 'Valet';
                        case card_model_1.CardLevel.Queen:
                            return 'Queen';
                        case card_model_1.CardLevel.King:
                            return 'King';
                        case card_model_1.CardLevel.Ace:
                            return 'Star';
                    }
                };
                UICard.prototype.onClick = function () {
                    if (!this.card.IsVisible || !this.card.IsEnabled || !this.isSelectionAllowed)
                        return;
                    this.callbacks && this.callbacks.onClick && this.callbacks.onClick(this.card);
                };
                __decorate([
                    core_26.Input(), 
                    __metadata('design:type', card_model_1.CardType)
                ], UICard.prototype, "card", void 0);
                __decorate([
                    core_26.Input(), 
                    __metadata('design:type', Boolean)
                ], UICard.prototype, "isSelectionAllowed", void 0);
                __decorate([
                    core_26.Input(), 
                    __metadata('design:type', Boolean)
                ], UICard.prototype, "mini", void 0);
                __decorate([
                    core_26.Input(), 
                    __metadata('design:type', Boolean)
                ], UICard.prototype, "isCompact", void 0);
                __decorate([
                    core_26.Input(), 
                    __metadata('design:type', Boolean)
                ], UICard.prototype, "enableShadows", void 0);
                __decorate([
                    core_26.Input(), 
                    __metadata('design:type', Boolean)
                ], UICard.prototype, "forceHideTitle", void 0);
                __decorate([
                    core_26.Input(), 
                    __metadata('design:type', Object)
                ], UICard.prototype, "callbacks", void 0);
                UICard = __decorate([
                    core_26.Component({
                        selector: 'card',
                        styles: [".jok_card {  height: 191px;  width: 130px;  font-family: 'Segoe UI Light', Tahoma, Geneva, Verdana, sans-serif;  border: 1px solid rgba(255, 255, 255, 0.45);  vertical-align: bottom;  padding: 7px 16px;  min-width: 31px;  border-radius: 17px;  font-size: 30px;  position: relative;  color: rgba(255, 255, 255, 0.8);  cursor: default;  display: inline-block;  text-align: left;  -moz-transition: all linear 50ms;  -o-transition: all linear 50ms;  -webkit-transition: all linear 50ms;  transition: all linear 50ms; }  .jok_card.enableShadows {    box-shadow: 0 0 3px #464646; }  .jok_card.mini.enableShadows {    box-shadow: 0 0 2px #404040; }  .jok_card .image, .jok_card .number, .jok_card .special {    position: absolute;    bottom: 15px;    right: 11px;    opacity: .5;    font-size: 20px;    text-align: center; }    .jok_card .image img, .jok_card .number img, .jok_card .special img {      width: 50px; }    .jok_card .image .title, .jok_card .number .title, .jok_card .special .title {      text-shadow: 0 0 1px rgba(0, 0, 0, 0.35); }  .jok_card .special {    opacity: .9;    display: none; }  .jok_card.mini {    width: 90px;    height: 120px;    border-radius: 12px;    padding: 4px 12px; }    .jok_card.mini .image, .jok_card.mini .number, .jok_card.mini .special {      position: absolute;      bottom: 10px;      right: 7px; }      .jok_card.mini .image img, .jok_card.mini .number img, .jok_card.mini .special img {        width: 40px; }      .jok_card.mini .image div.title, .jok_card.mini .number div.title, .jok_card.mini .special div.title {        display: none; }    .jok_card.mini .special {      display: block; }  .jok_card.enabled {    cursor: pointer; }  .jok_card.enabled:hover:not(.ignore_hover), .jok_card.enabled.hover:not(.ignore_hover) {    -moz-transform: translateY(-10px);    -ms-transform: translateY(-10px);    -o-transform: translateY(-10px);    -webkit-transform: translateY(-10px);    transform: translateY(-10px); }  .jok_card.disabled::before {    position: absolute;    top: 0;    left: 0;    right: 0;    bottom: 0;    background: rgba(0, 0, 0, 0.1);    border-radius: 17px;    content: ' '; }  .jok_card.disabled.mini::before {    border-radius: 12px; }  .jok_card:not(.enabled):hover {    cursor: not-allowed; }  .jok_card.dominated_color:not(.mini):not(.level_9) {    padding: 7px 16px; }  .jok_card.dominated_color:not(.level_9) {    border: 1px dashed rgba(255, 255, 255, 0.5) !important; }  .jok_card.color_0 {    background-color: #2980b9;    border-color: #126195;    border-width: 1px; }  .jok_card.color_1 {    background-color: #e67e22;    border-color: #c46816;    border-width: 1px; }  .jok_card.color_2 {    background-color: #bf3902;    border-color: #882c07;    border-width: 1px; }  .jok_card.color_3 {    background-color: #9b59b6;    border-color: #793c92;    border-width: 1px; }  .jok_card.color_4 {    color: gray;    background-image: url(\"/Images/matrix.png\");    background-size: 33px;    background-position: 50% 40%;    background-repeat: no-repeat no-repeat;    box-shadow: none;    background: #565656 !important;    border-width: 1px !important; }    .jok_card.color_4 .title {      color: white;      font-weight: bold;      bottom: 23px;      text-shadow: 0 0 2px black;      opacity: 1; }  .jok_card.level_0::after {    content: '6'; }  .jok_card.level_1::after {    content: '7'; }  .jok_card.level_2::after {    content: '8'; }  .jok_card.level_3::after {    content: '9'; }  .jok_card.level_4::after {    content: '10'; }  .jok_card.level_5::after {    content: 'J';    font-weight: bold; }  .jok_card.level_6::after {    content: 'Q';    font-weight: bold; }  .jok_card.level_7::after {    content: 'K';    font-weight: bold; }  .jok_card.level_8::after {    content: 'A';    font-weight: bold; }  .jok_card.level_9::after {    content: ' ';    background: url(\"/images/joklogo.png\") no-repeat;    background-size: 40px;    width: 40px;    height: 40px;    position: absolute;    left: 4px;    top: 4px; }  .jok_card.mini.level_9::after {    left: 3px;    background-size: 35px;    top: 5px; }  .jok_card .sign {    color: #FFF;    opacity: 0.5;    font-size: 11px;    font-family: Arial;    position: absolute;    top: 1px;    right: 2px; }  .jok_card.mini::after {    font-weight: normal;    font-size: 27px;    top: 3px;    position: absolute;    left: 11px; }.jok_card.compact {  -moz-transition: all linear 40ms;  -o-transition: all linear 40ms;  -webkit-transition: all linear 40ms;  transition: all linear 40ms; }.jok_card_color.color_0 {  background-color: #2980b9;  border: 1px solid #2980b9;  color: white; }.jok_card_color.color_1 {  background-color: #e67e22;  border: 1px solid #e67e22;  color: white; }.jok_card_color.color_1:hover {  border-color: #c46816; }.jok_card_color.color_2 {  background-color: #9b59b6;  border: 1px solid #9b59b6;  color: white; }.jok_card_color.color_2:hover {  border-color: #793c92; }.jok_card_color.color_3 {  background-color: #bf3902;  border: 1px solid #bf3902;  color: white; }.jok_card_color.color_3:hover {  border-color: #882c07; }.jok_card_color.color_4 {  background-color: white;  border: 1px solid white;  color: black; }.jok_card_color.color_4:hover {  border-color: silver; }"],
                        template: '<div drag class="card jok_card {{isCompact ? \'ignore_hover\' : \'\' }} color_{{getColor()}} level_{{getLevel()}} {{mini ? \'mini\' : \'\'}} {{(card.IsDominated) ? \'dominated_color\' : \'\'}} {{(card.IsEnabled && isSelectionAllowed) ? \'enabled\' : \'\'}} {{isSelectionAllowed && !card.IsEnabled ? \'disabled\':\'\'}} {{isCompact ? \'compact\':\'\'}} {{enableShadows ? \'enableShadows\' : \'\'}}" [dragEnabled]="isCompact && card && card.IsEnabled && isSelectionAllowed" (click)="onClick()" (dragclick)="onClick()"><div class="number" *ngIf="!isCardWithPicture() && !isSpecial()"></div><div class="image" *ngIf="isCardWithPicture() && !isSpecial()"><img [src]="getCardImageUrl()"><div class="title">{{ (\'card.\' + getCardImageTitle()) | translate }}</div></div><div *ngIf="isSpecial() && !forceHideTitle" class="special">{{(card.IsActivated ? \'card.Want\' : \'card.Take\') | translate}}</div></div>',
                        directives: [common_1.NgClass, drag_1.DragDirective]
                    }), 
                    __metadata('design:paramtypes', [])
                ], UICard);
                return UICard;
            }());
            exports_43("UICard", UICard);
        }
    }
});
System.register("Modules/Cards/cards", ['angular2/core', "Modules/Cards/card"], function(exports_44, context_44) {
    "use strict";
    var __moduleName = context_44 && context_44.id;
    var core_27, card_1;
    var UICards;
    return {
        setters:[
            function (core_27_1) {
                core_27 = core_27_1;
            },
            function (card_1_1) {
                card_1 = card_1_1;
            }],
        execute: function() {
            UICards = (function () {
                function UICards() {
                }
                UICards.prototype.visibleCards = function () {
                    return this.source.filter(function (x) { return x.IsVisible; });
                };
                UICards.prototype.getMiniCards = function () {
                    return new Array(this.miniCardsCount);
                };
                __decorate([
                    core_27.Input(), 
                    __metadata('design:type', Array)
                ], UICards.prototype, "source", void 0);
                __decorate([
                    core_27.Input(), 
                    __metadata('design:type', Boolean)
                ], UICards.prototype, "isSelectionAllowed", void 0);
                __decorate([
                    core_27.Input(), 
                    __metadata('design:type', Boolean)
                ], UICards.prototype, "isVisible", void 0);
                __decorate([
                    core_27.Input(), 
                    __metadata('design:type', Object)
                ], UICards.prototype, "callbacks", void 0);
                __decorate([
                    core_27.Input(), 
                    __metadata('design:type', Number)
                ], UICards.prototype, "miniCardsCount", void 0);
                __decorate([
                    core_27.Input(), 
                    __metadata('design:type', Boolean)
                ], UICards.prototype, "enableShadows", void 0);
                __decorate([
                    core_27.Input(), 
                    __metadata('design:type', Boolean)
                ], UICards.prototype, "isCompact", void 0);
                UICards = __decorate([
                    core_27.Component({
                        selector: 'cards',
                        styles: [".cards .item {  position: absolute;  bottom: 0;  left: 0;  -webkit-transition: top 0.3s ease, left 0.3s ease;  -moz-transition: top 0.3s ease, left 0.3s ease;  -o-transition: top 0.3s ease, left 0.3s ease;  transition: top 0.3s ease, left 0.3s ease;  -moz-transform-origin: center bottom;  -ms-transform-origin: center bottom;  -o-transform-origin: center bottom;  -webkit-transform-origin: center bottom;  transform-origin: center bottom;  display: none; }.cards .minicard {  height: 60px;  width: 40px;  border: 1px solid #1c9699;  border-radius: 7px;  cursor: default;  display: inline-block;  -moz-transition: all linear 50ms;  -o-transition: all linear 50ms;  -webkit-transition: all linear 50ms;  transition: all linear 50ms;  background: #34495E;  color: transparent;  font-size: 24px;  font-family: Arial;  text-align: center;  padding-top: 12px; }.cards .length_19_1 .item:nth-child(19) {  display: block;  left: 380px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(90deg);  -moz-transform: rotate(90deg);  -o-transform: rotate(90deg);  -ms-transform: rotate(90deg);  transform: rotate(90deg); }.cards .length_19_1 .item:nth-child(18) {  display: block;  left: 340px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(80deg);  -moz-transform: rotate(80deg);  -o-transform: rotate(80deg);  -ms-transform: rotate(80deg);  transform: rotate(80deg); }.cards .length_19_1 .item:nth-child(17) {  display: block;  left: 300px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(70deg);  -moz-transform: rotate(70deg);  -o-transform: rotate(70deg);  -ms-transform: rotate(70deg);  transform: rotate(70deg); }.cards .length_19_1 .item:nth-child(16) {  display: block;  left: 260px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(60deg);  -moz-transform: rotate(60deg);  -o-transform: rotate(60deg);  -ms-transform: rotate(60deg);  transform: rotate(60deg); }.cards .length_19_1 .item:nth-child(15) {  display: block;  left: 220px;  bottom: 16px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(50deg);  -moz-transform: rotate(50deg);  -o-transform: rotate(50deg);  -ms-transform: rotate(50deg);  transform: rotate(50deg); }.cards .length_19_1 .item:nth-child(14) {  display: block;  left: 180px;  bottom: 20px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(40deg);  -moz-transform: rotate(40deg);  -o-transform: rotate(40deg);  -ms-transform: rotate(40deg);  transform: rotate(40deg); }.cards .length_19_1 .item:nth-child(13) {  display: block;  left: 140px;  bottom: 24px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(30deg);  -moz-transform: rotate(30deg);  -o-transform: rotate(30deg);  -ms-transform: rotate(30deg);  transform: rotate(30deg); }.cards .length_19_1 .item:nth-child(12) {  display: block;  left: 100px;  bottom: 28px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(20deg);  -moz-transform: rotate(20deg);  -o-transform: rotate(20deg);  -ms-transform: rotate(20deg);  transform: rotate(20deg); }.cards .length_19_1 .item:nth-child(11) {  display: block;  left: 60px;  bottom: 32px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(10deg);  -moz-transform: rotate(10deg);  -o-transform: rotate(10deg);  -ms-transform: rotate(10deg);  transform: rotate(10deg); }.cards .length_19_1 .item:nth-child(10) {  display: block;  left: 20px;  bottom: 36px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(0deg);  -moz-transform: rotate(0deg);  -o-transform: rotate(0deg);  -ms-transform: rotate(0deg);  transform: rotate(0deg); }.cards .length_19_1 .item:nth-child(9) {  display: block;  left: -20px;  bottom: 36px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-10deg);  -moz-transform: rotate(-10deg);  -o-transform: rotate(-10deg);  -ms-transform: rotate(-10deg);  transform: rotate(-10deg); }.cards .length_19_1 .item:nth-child(8) {  display: block;  left: -60px;  bottom: 32px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-20deg);  -moz-transform: rotate(-20deg);  -o-transform: rotate(-20deg);  -ms-transform: rotate(-20deg);  transform: rotate(-20deg); }.cards .length_19_1 .item:nth-child(7) {  display: block;  left: -100px;  bottom: 28px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-30deg);  -moz-transform: rotate(-30deg);  -o-transform: rotate(-30deg);  -ms-transform: rotate(-30deg);  transform: rotate(-30deg); }.cards .length_19_1 .item:nth-child(6) {  display: block;  left: -140px;  bottom: 24px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-40deg);  -moz-transform: rotate(-40deg);  -o-transform: rotate(-40deg);  -ms-transform: rotate(-40deg);  transform: rotate(-40deg); }.cards .length_19_1 .item:nth-child(5) {  display: block;  left: -180px;  bottom: 20px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-50deg);  -moz-transform: rotate(-50deg);  -o-transform: rotate(-50deg);  -ms-transform: rotate(-50deg);  transform: rotate(-50deg); }.cards .length_19_1 .item:nth-child(4) {  display: block;  left: -220px;  bottom: 16px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-60deg);  -moz-transform: rotate(-60deg);  -o-transform: rotate(-60deg);  -ms-transform: rotate(-60deg);  transform: rotate(-60deg); }.cards .length_19_1 .item:nth-child(3) {  display: block;  left: -260px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-70deg);  -moz-transform: rotate(-70deg);  -o-transform: rotate(-70deg);  -ms-transform: rotate(-70deg);  transform: rotate(-70deg); }.cards .length_19_1 .item:nth-child(2) {  display: block;  left: -300px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-80deg);  -moz-transform: rotate(-80deg);  -o-transform: rotate(-80deg);  -ms-transform: rotate(-80deg);  transform: rotate(-80deg); }.cards .length_19_1 .item:nth-child(1) {  display: block;  left: -340px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-90deg);  -moz-transform: rotate(-90deg);  -o-transform: rotate(-90deg);  -ms-transform: rotate(-90deg);  transform: rotate(-90deg); }.cards .length_18_1 .item:nth-child(18) {  display: block;  left: 360px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(85deg);  -moz-transform: rotate(85deg);  -o-transform: rotate(85deg);  -ms-transform: rotate(85deg);  transform: rotate(85deg); }.cards .length_18_1 .item:nth-child(17) {  display: block;  left: 320px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(75deg);  -moz-transform: rotate(75deg);  -o-transform: rotate(75deg);  -ms-transform: rotate(75deg);  transform: rotate(75deg); }.cards .length_18_1 .item:nth-child(16) {  display: block;  left: 280px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(65deg);  -moz-transform: rotate(65deg);  -o-transform: rotate(65deg);  -ms-transform: rotate(65deg);  transform: rotate(65deg); }.cards .length_18_1 .item:nth-child(15) {  display: block;  left: 240px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(55deg);  -moz-transform: rotate(55deg);  -o-transform: rotate(55deg);  -ms-transform: rotate(55deg);  transform: rotate(55deg); }.cards .length_18_1 .item:nth-child(14) {  display: block;  left: 200px;  bottom: 16px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(45deg);  -moz-transform: rotate(45deg);  -o-transform: rotate(45deg);  -ms-transform: rotate(45deg);  transform: rotate(45deg); }.cards .length_18_1 .item:nth-child(13) {  display: block;  left: 160px;  bottom: 20px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(35deg);  -moz-transform: rotate(35deg);  -o-transform: rotate(35deg);  -ms-transform: rotate(35deg);  transform: rotate(35deg); }.cards .length_18_1 .item:nth-child(12) {  display: block;  left: 120px;  bottom: 24px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(25deg);  -moz-transform: rotate(25deg);  -o-transform: rotate(25deg);  -ms-transform: rotate(25deg);  transform: rotate(25deg); }.cards .length_18_1 .item:nth-child(11) {  display: block;  left: 80px;  bottom: 28px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(15deg);  -moz-transform: rotate(15deg);  -o-transform: rotate(15deg);  -ms-transform: rotate(15deg);  transform: rotate(15deg); }.cards .length_18_1 .item:nth-child(10) {  display: block;  left: 40px;  bottom: 32px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(5deg);  -moz-transform: rotate(5deg);  -o-transform: rotate(5deg);  -ms-transform: rotate(5deg);  transform: rotate(5deg); }.cards .length_18_1 .item:nth-child(9) {  display: block;  left: 0px;  bottom: 36px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-5deg);  -moz-transform: rotate(-5deg);  -o-transform: rotate(-5deg);  -ms-transform: rotate(-5deg);  transform: rotate(-5deg); }.cards .length_18_1 .item:nth-child(8) {  display: block;  left: -40px;  bottom: 32px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-15deg);  -moz-transform: rotate(-15deg);  -o-transform: rotate(-15deg);  -ms-transform: rotate(-15deg);  transform: rotate(-15deg); }.cards .length_18_1 .item:nth-child(7) {  display: block;  left: -80px;  bottom: 28px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-25deg);  -moz-transform: rotate(-25deg);  -o-transform: rotate(-25deg);  -ms-transform: rotate(-25deg);  transform: rotate(-25deg); }.cards .length_18_1 .item:nth-child(6) {  display: block;  left: -120px;  bottom: 24px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-35deg);  -moz-transform: rotate(-35deg);  -o-transform: rotate(-35deg);  -ms-transform: rotate(-35deg);  transform: rotate(-35deg); }.cards .length_18_1 .item:nth-child(5) {  display: block;  left: -160px;  bottom: 20px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-45deg);  -moz-transform: rotate(-45deg);  -o-transform: rotate(-45deg);  -ms-transform: rotate(-45deg);  transform: rotate(-45deg); }.cards .length_18_1 .item:nth-child(4) {  display: block;  left: -200px;  bottom: 16px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-55deg);  -moz-transform: rotate(-55deg);  -o-transform: rotate(-55deg);  -ms-transform: rotate(-55deg);  transform: rotate(-55deg); }.cards .length_18_1 .item:nth-child(3) {  display: block;  left: -240px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-65deg);  -moz-transform: rotate(-65deg);  -o-transform: rotate(-65deg);  -ms-transform: rotate(-65deg);  transform: rotate(-65deg); }.cards .length_18_1 .item:nth-child(2) {  display: block;  left: -280px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-75deg);  -moz-transform: rotate(-75deg);  -o-transform: rotate(-75deg);  -ms-transform: rotate(-75deg);  transform: rotate(-75deg); }.cards .length_18_1 .item:nth-child(1) {  display: block;  left: -320px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-85deg);  -moz-transform: rotate(-85deg);  -o-transform: rotate(-85deg);  -ms-transform: rotate(-85deg);  transform: rotate(-85deg); }.cards .length_17_1 .item:nth-child(17) {  display: block;  left: 340px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(80deg);  -moz-transform: rotate(80deg);  -o-transform: rotate(80deg);  -ms-transform: rotate(80deg);  transform: rotate(80deg); }.cards .length_17_1 .item:nth-child(16) {  display: block;  left: 300px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(70deg);  -moz-transform: rotate(70deg);  -o-transform: rotate(70deg);  -ms-transform: rotate(70deg);  transform: rotate(70deg); }.cards .length_17_1 .item:nth-child(15) {  display: block;  left: 260px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(60deg);  -moz-transform: rotate(60deg);  -o-transform: rotate(60deg);  -ms-transform: rotate(60deg);  transform: rotate(60deg); }.cards .length_17_1 .item:nth-child(14) {  display: block;  left: 220px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(50deg);  -moz-transform: rotate(50deg);  -o-transform: rotate(50deg);  -ms-transform: rotate(50deg);  transform: rotate(50deg); }.cards .length_17_1 .item:nth-child(13) {  display: block;  left: 180px;  bottom: 16px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(40deg);  -moz-transform: rotate(40deg);  -o-transform: rotate(40deg);  -ms-transform: rotate(40deg);  transform: rotate(40deg); }.cards .length_17_1 .item:nth-child(12) {  display: block;  left: 140px;  bottom: 20px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(30deg);  -moz-transform: rotate(30deg);  -o-transform: rotate(30deg);  -ms-transform: rotate(30deg);  transform: rotate(30deg); }.cards .length_17_1 .item:nth-child(11) {  display: block;  left: 100px;  bottom: 24px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(20deg);  -moz-transform: rotate(20deg);  -o-transform: rotate(20deg);  -ms-transform: rotate(20deg);  transform: rotate(20deg); }.cards .length_17_1 .item:nth-child(10) {  display: block;  left: 60px;  bottom: 28px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(10deg);  -moz-transform: rotate(10deg);  -o-transform: rotate(10deg);  -ms-transform: rotate(10deg);  transform: rotate(10deg); }.cards .length_17_1 .item:nth-child(9) {  display: block;  left: 20px;  bottom: 32px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(0deg);  -moz-transform: rotate(0deg);  -o-transform: rotate(0deg);  -ms-transform: rotate(0deg);  transform: rotate(0deg); }.cards .length_17_1 .item:nth-child(8) {  display: block;  left: -20px;  bottom: 32px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-10deg);  -moz-transform: rotate(-10deg);  -o-transform: rotate(-10deg);  -ms-transform: rotate(-10deg);  transform: rotate(-10deg); }.cards .length_17_1 .item:nth-child(7) {  display: block;  left: -60px;  bottom: 28px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-20deg);  -moz-transform: rotate(-20deg);  -o-transform: rotate(-20deg);  -ms-transform: rotate(-20deg);  transform: rotate(-20deg); }.cards .length_17_1 .item:nth-child(6) {  display: block;  left: -100px;  bottom: 24px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-30deg);  -moz-transform: rotate(-30deg);  -o-transform: rotate(-30deg);  -ms-transform: rotate(-30deg);  transform: rotate(-30deg); }.cards .length_17_1 .item:nth-child(5) {  display: block;  left: -140px;  bottom: 20px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-40deg);  -moz-transform: rotate(-40deg);  -o-transform: rotate(-40deg);  -ms-transform: rotate(-40deg);  transform: rotate(-40deg); }.cards .length_17_1 .item:nth-child(4) {  display: block;  left: -180px;  bottom: 16px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-50deg);  -moz-transform: rotate(-50deg);  -o-transform: rotate(-50deg);  -ms-transform: rotate(-50deg);  transform: rotate(-50deg); }.cards .length_17_1 .item:nth-child(3) {  display: block;  left: -220px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-60deg);  -moz-transform: rotate(-60deg);  -o-transform: rotate(-60deg);  -ms-transform: rotate(-60deg);  transform: rotate(-60deg); }.cards .length_17_1 .item:nth-child(2) {  display: block;  left: -260px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-70deg);  -moz-transform: rotate(-70deg);  -o-transform: rotate(-70deg);  -ms-transform: rotate(-70deg);  transform: rotate(-70deg); }.cards .length_17_1 .item:nth-child(1) {  display: block;  left: -300px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-80deg);  -moz-transform: rotate(-80deg);  -o-transform: rotate(-80deg);  -ms-transform: rotate(-80deg);  transform: rotate(-80deg); }.cards .length_16_1 .item:nth-child(16) {  display: block;  left: 320px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(75deg);  -moz-transform: rotate(75deg);  -o-transform: rotate(75deg);  -ms-transform: rotate(75deg);  transform: rotate(75deg); }.cards .length_16_1 .item:nth-child(15) {  display: block;  left: 280px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(65deg);  -moz-transform: rotate(65deg);  -o-transform: rotate(65deg);  -ms-transform: rotate(65deg);  transform: rotate(65deg); }.cards .length_16_1 .item:nth-child(14) {  display: block;  left: 240px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(55deg);  -moz-transform: rotate(55deg);  -o-transform: rotate(55deg);  -ms-transform: rotate(55deg);  transform: rotate(55deg); }.cards .length_16_1 .item:nth-child(13) {  display: block;  left: 200px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(45deg);  -moz-transform: rotate(45deg);  -o-transform: rotate(45deg);  -ms-transform: rotate(45deg);  transform: rotate(45deg); }.cards .length_16_1 .item:nth-child(12) {  display: block;  left: 160px;  bottom: 16px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(35deg);  -moz-transform: rotate(35deg);  -o-transform: rotate(35deg);  -ms-transform: rotate(35deg);  transform: rotate(35deg); }.cards .length_16_1 .item:nth-child(11) {  display: block;  left: 120px;  bottom: 20px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(25deg);  -moz-transform: rotate(25deg);  -o-transform: rotate(25deg);  -ms-transform: rotate(25deg);  transform: rotate(25deg); }.cards .length_16_1 .item:nth-child(10) {  display: block;  left: 80px;  bottom: 24px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(15deg);  -moz-transform: rotate(15deg);  -o-transform: rotate(15deg);  -ms-transform: rotate(15deg);  transform: rotate(15deg); }.cards .length_16_1 .item:nth-child(9) {  display: block;  left: 40px;  bottom: 28px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(5deg);  -moz-transform: rotate(5deg);  -o-transform: rotate(5deg);  -ms-transform: rotate(5deg);  transform: rotate(5deg); }.cards .length_16_1 .item:nth-child(8) {  display: block;  left: 0px;  bottom: 32px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-5deg);  -moz-transform: rotate(-5deg);  -o-transform: rotate(-5deg);  -ms-transform: rotate(-5deg);  transform: rotate(-5deg); }.cards .length_16_1 .item:nth-child(7) {  display: block;  left: -40px;  bottom: 28px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-15deg);  -moz-transform: rotate(-15deg);  -o-transform: rotate(-15deg);  -ms-transform: rotate(-15deg);  transform: rotate(-15deg); }.cards .length_16_1 .item:nth-child(6) {  display: block;  left: -80px;  bottom: 24px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-25deg);  -moz-transform: rotate(-25deg);  -o-transform: rotate(-25deg);  -ms-transform: rotate(-25deg);  transform: rotate(-25deg); }.cards .length_16_1 .item:nth-child(5) {  display: block;  left: -120px;  bottom: 20px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-35deg);  -moz-transform: rotate(-35deg);  -o-transform: rotate(-35deg);  -ms-transform: rotate(-35deg);  transform: rotate(-35deg); }.cards .length_16_1 .item:nth-child(4) {  display: block;  left: -160px;  bottom: 16px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-45deg);  -moz-transform: rotate(-45deg);  -o-transform: rotate(-45deg);  -ms-transform: rotate(-45deg);  transform: rotate(-45deg); }.cards .length_16_1 .item:nth-child(3) {  display: block;  left: -200px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-55deg);  -moz-transform: rotate(-55deg);  -o-transform: rotate(-55deg);  -ms-transform: rotate(-55deg);  transform: rotate(-55deg); }.cards .length_16_1 .item:nth-child(2) {  display: block;  left: -240px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-65deg);  -moz-transform: rotate(-65deg);  -o-transform: rotate(-65deg);  -ms-transform: rotate(-65deg);  transform: rotate(-65deg); }.cards .length_16_1 .item:nth-child(1) {  display: block;  left: -280px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-75deg);  -moz-transform: rotate(-75deg);  -o-transform: rotate(-75deg);  -ms-transform: rotate(-75deg);  transform: rotate(-75deg); }.cards .length_15_1 .item:nth-child(15) {  display: block;  left: 300px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(70deg);  -moz-transform: rotate(70deg);  -o-transform: rotate(70deg);  -ms-transform: rotate(70deg);  transform: rotate(70deg); }.cards .length_15_1 .item:nth-child(14) {  display: block;  left: 260px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(60deg);  -moz-transform: rotate(60deg);  -o-transform: rotate(60deg);  -ms-transform: rotate(60deg);  transform: rotate(60deg); }.cards .length_15_1 .item:nth-child(13) {  display: block;  left: 220px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(50deg);  -moz-transform: rotate(50deg);  -o-transform: rotate(50deg);  -ms-transform: rotate(50deg);  transform: rotate(50deg); }.cards .length_15_1 .item:nth-child(12) {  display: block;  left: 180px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(40deg);  -moz-transform: rotate(40deg);  -o-transform: rotate(40deg);  -ms-transform: rotate(40deg);  transform: rotate(40deg); }.cards .length_15_1 .item:nth-child(11) {  display: block;  left: 140px;  bottom: 16px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(30deg);  -moz-transform: rotate(30deg);  -o-transform: rotate(30deg);  -ms-transform: rotate(30deg);  transform: rotate(30deg); }.cards .length_15_1 .item:nth-child(10) {  display: block;  left: 100px;  bottom: 20px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(20deg);  -moz-transform: rotate(20deg);  -o-transform: rotate(20deg);  -ms-transform: rotate(20deg);  transform: rotate(20deg); }.cards .length_15_1 .item:nth-child(9) {  display: block;  left: 60px;  bottom: 24px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(10deg);  -moz-transform: rotate(10deg);  -o-transform: rotate(10deg);  -ms-transform: rotate(10deg);  transform: rotate(10deg); }.cards .length_15_1 .item:nth-child(8) {  display: block;  left: 20px;  bottom: 28px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(0deg);  -moz-transform: rotate(0deg);  -o-transform: rotate(0deg);  -ms-transform: rotate(0deg);  transform: rotate(0deg); }.cards .length_15_1 .item:nth-child(7) {  display: block;  left: -20px;  bottom: 28px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-10deg);  -moz-transform: rotate(-10deg);  -o-transform: rotate(-10deg);  -ms-transform: rotate(-10deg);  transform: rotate(-10deg); }.cards .length_15_1 .item:nth-child(6) {  display: block;  left: -60px;  bottom: 24px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-20deg);  -moz-transform: rotate(-20deg);  -o-transform: rotate(-20deg);  -ms-transform: rotate(-20deg);  transform: rotate(-20deg); }.cards .length_15_1 .item:nth-child(5) {  display: block;  left: -100px;  bottom: 20px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-30deg);  -moz-transform: rotate(-30deg);  -o-transform: rotate(-30deg);  -ms-transform: rotate(-30deg);  transform: rotate(-30deg); }.cards .length_15_1 .item:nth-child(4) {  display: block;  left: -140px;  bottom: 16px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-40deg);  -moz-transform: rotate(-40deg);  -o-transform: rotate(-40deg);  -ms-transform: rotate(-40deg);  transform: rotate(-40deg); }.cards .length_15_1 .item:nth-child(3) {  display: block;  left: -180px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-50deg);  -moz-transform: rotate(-50deg);  -o-transform: rotate(-50deg);  -ms-transform: rotate(-50deg);  transform: rotate(-50deg); }.cards .length_15_1 .item:nth-child(2) {  display: block;  left: -220px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-60deg);  -moz-transform: rotate(-60deg);  -o-transform: rotate(-60deg);  -ms-transform: rotate(-60deg);  transform: rotate(-60deg); }.cards .length_15_1 .item:nth-child(1) {  display: block;  left: -260px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-70deg);  -moz-transform: rotate(-70deg);  -o-transform: rotate(-70deg);  -ms-transform: rotate(-70deg);  transform: rotate(-70deg); }.cards .length_14_1 .item:nth-child(14) {  display: block;  left: 280px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(65deg);  -moz-transform: rotate(65deg);  -o-transform: rotate(65deg);  -ms-transform: rotate(65deg);  transform: rotate(65deg); }.cards .length_14_1 .item:nth-child(13) {  display: block;  left: 240px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(55deg);  -moz-transform: rotate(55deg);  -o-transform: rotate(55deg);  -ms-transform: rotate(55deg);  transform: rotate(55deg); }.cards .length_14_1 .item:nth-child(12) {  display: block;  left: 200px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(45deg);  -moz-transform: rotate(45deg);  -o-transform: rotate(45deg);  -ms-transform: rotate(45deg);  transform: rotate(45deg); }.cards .length_14_1 .item:nth-child(11) {  display: block;  left: 160px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(35deg);  -moz-transform: rotate(35deg);  -o-transform: rotate(35deg);  -ms-transform: rotate(35deg);  transform: rotate(35deg); }.cards .length_14_1 .item:nth-child(10) {  display: block;  left: 120px;  bottom: 16px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(25deg);  -moz-transform: rotate(25deg);  -o-transform: rotate(25deg);  -ms-transform: rotate(25deg);  transform: rotate(25deg); }.cards .length_14_1 .item:nth-child(9) {  display: block;  left: 80px;  bottom: 20px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(15deg);  -moz-transform: rotate(15deg);  -o-transform: rotate(15deg);  -ms-transform: rotate(15deg);  transform: rotate(15deg); }.cards .length_14_1 .item:nth-child(8) {  display: block;  left: 40px;  bottom: 24px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(5deg);  -moz-transform: rotate(5deg);  -o-transform: rotate(5deg);  -ms-transform: rotate(5deg);  transform: rotate(5deg); }.cards .length_14_1 .item:nth-child(7) {  display: block;  left: 0px;  bottom: 28px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-5deg);  -moz-transform: rotate(-5deg);  -o-transform: rotate(-5deg);  -ms-transform: rotate(-5deg);  transform: rotate(-5deg); }.cards .length_14_1 .item:nth-child(6) {  display: block;  left: -40px;  bottom: 24px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-15deg);  -moz-transform: rotate(-15deg);  -o-transform: rotate(-15deg);  -ms-transform: rotate(-15deg);  transform: rotate(-15deg); }.cards .length_14_1 .item:nth-child(5) {  display: block;  left: -80px;  bottom: 20px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-25deg);  -moz-transform: rotate(-25deg);  -o-transform: rotate(-25deg);  -ms-transform: rotate(-25deg);  transform: rotate(-25deg); }.cards .length_14_1 .item:nth-child(4) {  display: block;  left: -120px;  bottom: 16px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-35deg);  -moz-transform: rotate(-35deg);  -o-transform: rotate(-35deg);  -ms-transform: rotate(-35deg);  transform: rotate(-35deg); }.cards .length_14_1 .item:nth-child(3) {  display: block;  left: -160px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-45deg);  -moz-transform: rotate(-45deg);  -o-transform: rotate(-45deg);  -ms-transform: rotate(-45deg);  transform: rotate(-45deg); }.cards .length_14_1 .item:nth-child(2) {  display: block;  left: -200px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-55deg);  -moz-transform: rotate(-55deg);  -o-transform: rotate(-55deg);  -ms-transform: rotate(-55deg);  transform: rotate(-55deg); }.cards .length_14_1 .item:nth-child(1) {  display: block;  left: -240px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-65deg);  -moz-transform: rotate(-65deg);  -o-transform: rotate(-65deg);  -ms-transform: rotate(-65deg);  transform: rotate(-65deg); }.cards .length_13_1 .item:nth-child(13) {  display: block;  left: 260px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(60deg);  -moz-transform: rotate(60deg);  -o-transform: rotate(60deg);  -ms-transform: rotate(60deg);  transform: rotate(60deg); }.cards .length_13_1 .item:nth-child(12) {  display: block;  left: 220px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(50deg);  -moz-transform: rotate(50deg);  -o-transform: rotate(50deg);  -ms-transform: rotate(50deg);  transform: rotate(50deg); }.cards .length_13_1 .item:nth-child(11) {  display: block;  left: 180px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(40deg);  -moz-transform: rotate(40deg);  -o-transform: rotate(40deg);  -ms-transform: rotate(40deg);  transform: rotate(40deg); }.cards .length_13_1 .item:nth-child(10) {  display: block;  left: 140px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(30deg);  -moz-transform: rotate(30deg);  -o-transform: rotate(30deg);  -ms-transform: rotate(30deg);  transform: rotate(30deg); }.cards .length_13_1 .item:nth-child(9) {  display: block;  left: 100px;  bottom: 16px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(20deg);  -moz-transform: rotate(20deg);  -o-transform: rotate(20deg);  -ms-transform: rotate(20deg);  transform: rotate(20deg); }.cards .length_13_1 .item:nth-child(8) {  display: block;  left: 60px;  bottom: 20px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(10deg);  -moz-transform: rotate(10deg);  -o-transform: rotate(10deg);  -ms-transform: rotate(10deg);  transform: rotate(10deg); }.cards .length_13_1 .item:nth-child(7) {  display: block;  left: 20px;  bottom: 24px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(0deg);  -moz-transform: rotate(0deg);  -o-transform: rotate(0deg);  -ms-transform: rotate(0deg);  transform: rotate(0deg); }.cards .length_13_1 .item:nth-child(6) {  display: block;  left: -20px;  bottom: 24px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-10deg);  -moz-transform: rotate(-10deg);  -o-transform: rotate(-10deg);  -ms-transform: rotate(-10deg);  transform: rotate(-10deg); }.cards .length_13_1 .item:nth-child(5) {  display: block;  left: -60px;  bottom: 20px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-20deg);  -moz-transform: rotate(-20deg);  -o-transform: rotate(-20deg);  -ms-transform: rotate(-20deg);  transform: rotate(-20deg); }.cards .length_13_1 .item:nth-child(4) {  display: block;  left: -100px;  bottom: 16px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-30deg);  -moz-transform: rotate(-30deg);  -o-transform: rotate(-30deg);  -ms-transform: rotate(-30deg);  transform: rotate(-30deg); }.cards .length_13_1 .item:nth-child(3) {  display: block;  left: -140px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-40deg);  -moz-transform: rotate(-40deg);  -o-transform: rotate(-40deg);  -ms-transform: rotate(-40deg);  transform: rotate(-40deg); }.cards .length_13_1 .item:nth-child(2) {  display: block;  left: -180px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-50deg);  -moz-transform: rotate(-50deg);  -o-transform: rotate(-50deg);  -ms-transform: rotate(-50deg);  transform: rotate(-50deg); }.cards .length_13_1 .item:nth-child(1) {  display: block;  left: -220px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-60deg);  -moz-transform: rotate(-60deg);  -o-transform: rotate(-60deg);  -ms-transform: rotate(-60deg);  transform: rotate(-60deg); }.cards .length_12_1 .item:nth-child(12) {  display: block;  left: 240px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(55deg);  -moz-transform: rotate(55deg);  -o-transform: rotate(55deg);  -ms-transform: rotate(55deg);  transform: rotate(55deg); }.cards .length_12_1 .item:nth-child(11) {  display: block;  left: 200px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(45deg);  -moz-transform: rotate(45deg);  -o-transform: rotate(45deg);  -ms-transform: rotate(45deg);  transform: rotate(45deg); }.cards .length_12_1 .item:nth-child(10) {  display: block;  left: 160px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(35deg);  -moz-transform: rotate(35deg);  -o-transform: rotate(35deg);  -ms-transform: rotate(35deg);  transform: rotate(35deg); }.cards .length_12_1 .item:nth-child(9) {  display: block;  left: 120px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(25deg);  -moz-transform: rotate(25deg);  -o-transform: rotate(25deg);  -ms-transform: rotate(25deg);  transform: rotate(25deg); }.cards .length_12_1 .item:nth-child(8) {  display: block;  left: 80px;  bottom: 16px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(15deg);  -moz-transform: rotate(15deg);  -o-transform: rotate(15deg);  -ms-transform: rotate(15deg);  transform: rotate(15deg); }.cards .length_12_1 .item:nth-child(7) {  display: block;  left: 40px;  bottom: 20px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(5deg);  -moz-transform: rotate(5deg);  -o-transform: rotate(5deg);  -ms-transform: rotate(5deg);  transform: rotate(5deg); }.cards .length_12_1 .item:nth-child(6) {  display: block;  left: 0px;  bottom: 24px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-5deg);  -moz-transform: rotate(-5deg);  -o-transform: rotate(-5deg);  -ms-transform: rotate(-5deg);  transform: rotate(-5deg); }.cards .length_12_1 .item:nth-child(5) {  display: block;  left: -40px;  bottom: 20px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-15deg);  -moz-transform: rotate(-15deg);  -o-transform: rotate(-15deg);  -ms-transform: rotate(-15deg);  transform: rotate(-15deg); }.cards .length_12_1 .item:nth-child(4) {  display: block;  left: -80px;  bottom: 16px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-25deg);  -moz-transform: rotate(-25deg);  -o-transform: rotate(-25deg);  -ms-transform: rotate(-25deg);  transform: rotate(-25deg); }.cards .length_12_1 .item:nth-child(3) {  display: block;  left: -120px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-35deg);  -moz-transform: rotate(-35deg);  -o-transform: rotate(-35deg);  -ms-transform: rotate(-35deg);  transform: rotate(-35deg); }.cards .length_12_1 .item:nth-child(2) {  display: block;  left: -160px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-45deg);  -moz-transform: rotate(-45deg);  -o-transform: rotate(-45deg);  -ms-transform: rotate(-45deg);  transform: rotate(-45deg); }.cards .length_12_1 .item:nth-child(1) {  display: block;  left: -200px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-55deg);  -moz-transform: rotate(-55deg);  -o-transform: rotate(-55deg);  -ms-transform: rotate(-55deg);  transform: rotate(-55deg); }.cards .length_11_1 .item:nth-child(11) {  display: block;  left: 220px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(50deg);  -moz-transform: rotate(50deg);  -o-transform: rotate(50deg);  -ms-transform: rotate(50deg);  transform: rotate(50deg); }.cards .length_11_1 .item:nth-child(10) {  display: block;  left: 180px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(40deg);  -moz-transform: rotate(40deg);  -o-transform: rotate(40deg);  -ms-transform: rotate(40deg);  transform: rotate(40deg); }.cards .length_11_1 .item:nth-child(9) {  display: block;  left: 140px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(30deg);  -moz-transform: rotate(30deg);  -o-transform: rotate(30deg);  -ms-transform: rotate(30deg);  transform: rotate(30deg); }.cards .length_11_1 .item:nth-child(8) {  display: block;  left: 100px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(20deg);  -moz-transform: rotate(20deg);  -o-transform: rotate(20deg);  -ms-transform: rotate(20deg);  transform: rotate(20deg); }.cards .length_11_1 .item:nth-child(7) {  display: block;  left: 60px;  bottom: 16px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(10deg);  -moz-transform: rotate(10deg);  -o-transform: rotate(10deg);  -ms-transform: rotate(10deg);  transform: rotate(10deg); }.cards .length_11_1 .item:nth-child(6) {  display: block;  left: 20px;  bottom: 20px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(0deg);  -moz-transform: rotate(0deg);  -o-transform: rotate(0deg);  -ms-transform: rotate(0deg);  transform: rotate(0deg); }.cards .length_11_1 .item:nth-child(5) {  display: block;  left: -20px;  bottom: 20px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-10deg);  -moz-transform: rotate(-10deg);  -o-transform: rotate(-10deg);  -ms-transform: rotate(-10deg);  transform: rotate(-10deg); }.cards .length_11_1 .item:nth-child(4) {  display: block;  left: -60px;  bottom: 16px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-20deg);  -moz-transform: rotate(-20deg);  -o-transform: rotate(-20deg);  -ms-transform: rotate(-20deg);  transform: rotate(-20deg); }.cards .length_11_1 .item:nth-child(3) {  display: block;  left: -100px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-30deg);  -moz-transform: rotate(-30deg);  -o-transform: rotate(-30deg);  -ms-transform: rotate(-30deg);  transform: rotate(-30deg); }.cards .length_11_1 .item:nth-child(2) {  display: block;  left: -140px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-40deg);  -moz-transform: rotate(-40deg);  -o-transform: rotate(-40deg);  -ms-transform: rotate(-40deg);  transform: rotate(-40deg); }.cards .length_11_1 .item:nth-child(1) {  display: block;  left: -180px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-50deg);  -moz-transform: rotate(-50deg);  -o-transform: rotate(-50deg);  -ms-transform: rotate(-50deg);  transform: rotate(-50deg); }.cards .length_10_1 .item:nth-child(10) {  display: block;  left: 200px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(45deg);  -moz-transform: rotate(45deg);  -o-transform: rotate(45deg);  -ms-transform: rotate(45deg);  transform: rotate(45deg); }.cards .length_10_1 .item:nth-child(9) {  display: block;  left: 160px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(35deg);  -moz-transform: rotate(35deg);  -o-transform: rotate(35deg);  -ms-transform: rotate(35deg);  transform: rotate(35deg); }.cards .length_10_1 .item:nth-child(8) {  display: block;  left: 120px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(25deg);  -moz-transform: rotate(25deg);  -o-transform: rotate(25deg);  -ms-transform: rotate(25deg);  transform: rotate(25deg); }.cards .length_10_1 .item:nth-child(7) {  display: block;  left: 80px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(15deg);  -moz-transform: rotate(15deg);  -o-transform: rotate(15deg);  -ms-transform: rotate(15deg);  transform: rotate(15deg); }.cards .length_10_1 .item:nth-child(6) {  display: block;  left: 40px;  bottom: 16px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(5deg);  -moz-transform: rotate(5deg);  -o-transform: rotate(5deg);  -ms-transform: rotate(5deg);  transform: rotate(5deg); }.cards .length_10_1 .item:nth-child(5) {  display: block;  left: 0px;  bottom: 20px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-5deg);  -moz-transform: rotate(-5deg);  -o-transform: rotate(-5deg);  -ms-transform: rotate(-5deg);  transform: rotate(-5deg); }.cards .length_10_1 .item:nth-child(4) {  display: block;  left: -40px;  bottom: 16px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-15deg);  -moz-transform: rotate(-15deg);  -o-transform: rotate(-15deg);  -ms-transform: rotate(-15deg);  transform: rotate(-15deg); }.cards .length_10_1 .item:nth-child(3) {  display: block;  left: -80px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-25deg);  -moz-transform: rotate(-25deg);  -o-transform: rotate(-25deg);  -ms-transform: rotate(-25deg);  transform: rotate(-25deg); }.cards .length_10_1 .item:nth-child(2) {  display: block;  left: -120px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-35deg);  -moz-transform: rotate(-35deg);  -o-transform: rotate(-35deg);  -ms-transform: rotate(-35deg);  transform: rotate(-35deg); }.cards .length_10_1 .item:nth-child(1) {  display: block;  left: -160px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-45deg);  -moz-transform: rotate(-45deg);  -o-transform: rotate(-45deg);  -ms-transform: rotate(-45deg);  transform: rotate(-45deg); }.cards .length_9_1 .item:nth-child(9) {  display: block;  left: 180px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(40deg);  -moz-transform: rotate(40deg);  -o-transform: rotate(40deg);  -ms-transform: rotate(40deg);  transform: rotate(40deg); }.cards .length_9_1 .item:nth-child(8) {  display: block;  left: 140px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(30deg);  -moz-transform: rotate(30deg);  -o-transform: rotate(30deg);  -ms-transform: rotate(30deg);  transform: rotate(30deg); }.cards .length_9_1 .item:nth-child(7) {  display: block;  left: 100px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(20deg);  -moz-transform: rotate(20deg);  -o-transform: rotate(20deg);  -ms-transform: rotate(20deg);  transform: rotate(20deg); }.cards .length_9_1 .item:nth-child(6) {  display: block;  left: 60px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(10deg);  -moz-transform: rotate(10deg);  -o-transform: rotate(10deg);  -ms-transform: rotate(10deg);  transform: rotate(10deg); }.cards .length_9_1 .item:nth-child(5) {  display: block;  left: 20px;  bottom: 16px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(0deg);  -moz-transform: rotate(0deg);  -o-transform: rotate(0deg);  -ms-transform: rotate(0deg);  transform: rotate(0deg); }.cards .length_9_1 .item:nth-child(4) {  display: block;  left: -20px;  bottom: 16px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-10deg);  -moz-transform: rotate(-10deg);  -o-transform: rotate(-10deg);  -ms-transform: rotate(-10deg);  transform: rotate(-10deg); }.cards .length_9_1 .item:nth-child(3) {  display: block;  left: -60px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-20deg);  -moz-transform: rotate(-20deg);  -o-transform: rotate(-20deg);  -ms-transform: rotate(-20deg);  transform: rotate(-20deg); }.cards .length_9_1 .item:nth-child(2) {  display: block;  left: -100px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-30deg);  -moz-transform: rotate(-30deg);  -o-transform: rotate(-30deg);  -ms-transform: rotate(-30deg);  transform: rotate(-30deg); }.cards .length_9_1 .item:nth-child(1) {  display: block;  left: -140px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-40deg);  -moz-transform: rotate(-40deg);  -o-transform: rotate(-40deg);  -ms-transform: rotate(-40deg);  transform: rotate(-40deg); }.cards .length_8_1 .item:nth-child(8) {  display: block;  left: 160px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(35deg);  -moz-transform: rotate(35deg);  -o-transform: rotate(35deg);  -ms-transform: rotate(35deg);  transform: rotate(35deg); }.cards .length_8_1 .item:nth-child(7) {  display: block;  left: 120px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(25deg);  -moz-transform: rotate(25deg);  -o-transform: rotate(25deg);  -ms-transform: rotate(25deg);  transform: rotate(25deg); }.cards .length_8_1 .item:nth-child(6) {  display: block;  left: 80px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(15deg);  -moz-transform: rotate(15deg);  -o-transform: rotate(15deg);  -ms-transform: rotate(15deg);  transform: rotate(15deg); }.cards .length_8_1 .item:nth-child(5) {  display: block;  left: 40px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(5deg);  -moz-transform: rotate(5deg);  -o-transform: rotate(5deg);  -ms-transform: rotate(5deg);  transform: rotate(5deg); }.cards .length_8_1 .item:nth-child(4) {  display: block;  left: 0px;  bottom: 16px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-5deg);  -moz-transform: rotate(-5deg);  -o-transform: rotate(-5deg);  -ms-transform: rotate(-5deg);  transform: rotate(-5deg); }.cards .length_8_1 .item:nth-child(3) {  display: block;  left: -40px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-15deg);  -moz-transform: rotate(-15deg);  -o-transform: rotate(-15deg);  -ms-transform: rotate(-15deg);  transform: rotate(-15deg); }.cards .length_8_1 .item:nth-child(2) {  display: block;  left: -80px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-25deg);  -moz-transform: rotate(-25deg);  -o-transform: rotate(-25deg);  -ms-transform: rotate(-25deg);  transform: rotate(-25deg); }.cards .length_8_1 .item:nth-child(1) {  display: block;  left: -120px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-35deg);  -moz-transform: rotate(-35deg);  -o-transform: rotate(-35deg);  -ms-transform: rotate(-35deg);  transform: rotate(-35deg); }.cards .length_7_1 .item:nth-child(7) {  display: block;  left: 140px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(30deg);  -moz-transform: rotate(30deg);  -o-transform: rotate(30deg);  -ms-transform: rotate(30deg);  transform: rotate(30deg); }.cards .length_7_1 .item:nth-child(6) {  display: block;  left: 100px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(20deg);  -moz-transform: rotate(20deg);  -o-transform: rotate(20deg);  -ms-transform: rotate(20deg);  transform: rotate(20deg); }.cards .length_7_1 .item:nth-child(5) {  display: block;  left: 60px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(10deg);  -moz-transform: rotate(10deg);  -o-transform: rotate(10deg);  -ms-transform: rotate(10deg);  transform: rotate(10deg); }.cards .length_7_1 .item:nth-child(4) {  display: block;  left: 20px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(0deg);  -moz-transform: rotate(0deg);  -o-transform: rotate(0deg);  -ms-transform: rotate(0deg);  transform: rotate(0deg); }.cards .length_7_1 .item:nth-child(3) {  display: block;  left: -20px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-10deg);  -moz-transform: rotate(-10deg);  -o-transform: rotate(-10deg);  -ms-transform: rotate(-10deg);  transform: rotate(-10deg); }.cards .length_7_1 .item:nth-child(2) {  display: block;  left: -60px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-20deg);  -moz-transform: rotate(-20deg);  -o-transform: rotate(-20deg);  -ms-transform: rotate(-20deg);  transform: rotate(-20deg); }.cards .length_7_1 .item:nth-child(1) {  display: block;  left: -100px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-30deg);  -moz-transform: rotate(-30deg);  -o-transform: rotate(-30deg);  -ms-transform: rotate(-30deg);  transform: rotate(-30deg); }.cards .length_6_1 .item:nth-child(6) {  display: block;  left: 120px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(25deg);  -moz-transform: rotate(25deg);  -o-transform: rotate(25deg);  -ms-transform: rotate(25deg);  transform: rotate(25deg); }.cards .length_6_1 .item:nth-child(5) {  display: block;  left: 80px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(15deg);  -moz-transform: rotate(15deg);  -o-transform: rotate(15deg);  -ms-transform: rotate(15deg);  transform: rotate(15deg); }.cards .length_6_1 .item:nth-child(4) {  display: block;  left: 40px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(5deg);  -moz-transform: rotate(5deg);  -o-transform: rotate(5deg);  -ms-transform: rotate(5deg);  transform: rotate(5deg); }.cards .length_6_1 .item:nth-child(3) {  display: block;  left: 0px;  bottom: 12px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-5deg);  -moz-transform: rotate(-5deg);  -o-transform: rotate(-5deg);  -ms-transform: rotate(-5deg);  transform: rotate(-5deg); }.cards .length_6_1 .item:nth-child(2) {  display: block;  left: -40px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-15deg);  -moz-transform: rotate(-15deg);  -o-transform: rotate(-15deg);  -ms-transform: rotate(-15deg);  transform: rotate(-15deg); }.cards .length_6_1 .item:nth-child(1) {  display: block;  left: -80px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-25deg);  -moz-transform: rotate(-25deg);  -o-transform: rotate(-25deg);  -ms-transform: rotate(-25deg);  transform: rotate(-25deg); }.cards .length_5_1 .item:nth-child(5) {  display: block;  left: 100px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(20deg);  -moz-transform: rotate(20deg);  -o-transform: rotate(20deg);  -ms-transform: rotate(20deg);  transform: rotate(20deg); }.cards .length_5_1 .item:nth-child(4) {  display: block;  left: 60px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(10deg);  -moz-transform: rotate(10deg);  -o-transform: rotate(10deg);  -ms-transform: rotate(10deg);  transform: rotate(10deg); }.cards .length_5_1 .item:nth-child(3) {  display: block;  left: 20px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(0deg);  -moz-transform: rotate(0deg);  -o-transform: rotate(0deg);  -ms-transform: rotate(0deg);  transform: rotate(0deg); }.cards .length_5_1 .item:nth-child(2) {  display: block;  left: -20px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-10deg);  -moz-transform: rotate(-10deg);  -o-transform: rotate(-10deg);  -ms-transform: rotate(-10deg);  transform: rotate(-10deg); }.cards .length_5_1 .item:nth-child(1) {  display: block;  left: -60px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-20deg);  -moz-transform: rotate(-20deg);  -o-transform: rotate(-20deg);  -ms-transform: rotate(-20deg);  transform: rotate(-20deg); }.cards .length_4_1 .item:nth-child(4) {  display: block;  left: 80px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(15deg);  -moz-transform: rotate(15deg);  -o-transform: rotate(15deg);  -ms-transform: rotate(15deg);  transform: rotate(15deg); }.cards .length_4_1 .item:nth-child(3) {  display: block;  left: 40px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(5deg);  -moz-transform: rotate(5deg);  -o-transform: rotate(5deg);  -ms-transform: rotate(5deg);  transform: rotate(5deg); }.cards .length_4_1 .item:nth-child(2) {  display: block;  left: 0px;  bottom: 8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-5deg);  -moz-transform: rotate(-5deg);  -o-transform: rotate(-5deg);  -ms-transform: rotate(-5deg);  transform: rotate(-5deg); }.cards .length_4_1 .item:nth-child(1) {  display: block;  left: -40px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-15deg);  -moz-transform: rotate(-15deg);  -o-transform: rotate(-15deg);  -ms-transform: rotate(-15deg);  transform: rotate(-15deg); }.cards .length_3_1 .item:nth-child(3) {  display: block;  left: 60px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(10deg);  -moz-transform: rotate(10deg);  -o-transform: rotate(10deg);  -ms-transform: rotate(10deg);  transform: rotate(10deg); }.cards .length_3_1 .item:nth-child(2) {  display: block;  left: 20px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(0deg);  -moz-transform: rotate(0deg);  -o-transform: rotate(0deg);  -ms-transform: rotate(0deg);  transform: rotate(0deg); }.cards .length_3_1 .item:nth-child(1) {  display: block;  left: -20px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-10deg);  -moz-transform: rotate(-10deg);  -o-transform: rotate(-10deg);  -ms-transform: rotate(-10deg);  transform: rotate(-10deg); }.cards .length_2_1 .item:nth-child(2) {  display: block;  left: 40px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(5deg);  -moz-transform: rotate(5deg);  -o-transform: rotate(5deg);  -ms-transform: rotate(5deg);  transform: rotate(5deg); }.cards .length_2_1 .item:nth-child(1) {  display: block;  left: 0px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-5deg);  -moz-transform: rotate(-5deg);  -o-transform: rotate(-5deg);  -ms-transform: rotate(-5deg);  transform: rotate(-5deg); }.cards .length_1_1 .item:nth-child(1) {  display: block;  left: 20px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(0deg);  -moz-transform: rotate(0deg);  -o-transform: rotate(0deg);  -ms-transform: rotate(0deg);  transform: rotate(0deg); }.cards .length_19_2 .item:nth-child(19) {  display: block;  left: -24px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(95deg);  -moz-transform: rotate(95deg);  -o-transform: rotate(95deg);  -ms-transform: rotate(95deg);  transform: rotate(95deg); }.cards .length_19_2 .item:nth-child(18) {  display: block;  left: -28px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(85deg);  -moz-transform: rotate(85deg);  -o-transform: rotate(85deg);  -ms-transform: rotate(85deg);  transform: rotate(85deg); }.cards .length_19_2 .item:nth-child(17) {  display: block;  left: -32px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(75deg);  -moz-transform: rotate(75deg);  -o-transform: rotate(75deg);  -ms-transform: rotate(75deg);  transform: rotate(75deg); }.cards .length_19_2 .item:nth-child(16) {  display: block;  left: -36px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(65deg);  -moz-transform: rotate(65deg);  -o-transform: rotate(65deg);  -ms-transform: rotate(65deg);  transform: rotate(65deg); }.cards .length_19_2 .item:nth-child(15) {  display: block;  left: -40px;  bottom: 3.2px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(55deg);  -moz-transform: rotate(55deg);  -o-transform: rotate(55deg);  -ms-transform: rotate(55deg);  transform: rotate(55deg); }.cards .length_19_2 .item:nth-child(14) {  display: block;  left: -44px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(45deg);  -moz-transform: rotate(45deg);  -o-transform: rotate(45deg);  -ms-transform: rotate(45deg);  transform: rotate(45deg); }.cards .length_19_2 .item:nth-child(13) {  display: block;  left: -48px;  bottom: 4.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(35deg);  -moz-transform: rotate(35deg);  -o-transform: rotate(35deg);  -ms-transform: rotate(35deg);  transform: rotate(35deg); }.cards .length_19_2 .item:nth-child(12) {  display: block;  left: -52px;  bottom: 5.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(25deg);  -moz-transform: rotate(25deg);  -o-transform: rotate(25deg);  -ms-transform: rotate(25deg);  transform: rotate(25deg); }.cards .length_19_2 .item:nth-child(11) {  display: block;  left: -56px;  bottom: 6.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(15deg);  -moz-transform: rotate(15deg);  -o-transform: rotate(15deg);  -ms-transform: rotate(15deg);  transform: rotate(15deg); }.cards .length_19_2 .item:nth-child(10) {  display: block;  left: -60px;  bottom: 7.2px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(5deg);  -moz-transform: rotate(5deg);  -o-transform: rotate(5deg);  -ms-transform: rotate(5deg);  transform: rotate(5deg); }.cards .length_19_2 .item:nth-child(9) {  display: block;  left: -64px;  bottom: 7.2px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-5deg);  -moz-transform: rotate(-5deg);  -o-transform: rotate(-5deg);  -ms-transform: rotate(-5deg);  transform: rotate(-5deg); }.cards .length_19_2 .item:nth-child(8) {  display: block;  left: -68px;  bottom: 6.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-15deg);  -moz-transform: rotate(-15deg);  -o-transform: rotate(-15deg);  -ms-transform: rotate(-15deg);  transform: rotate(-15deg); }.cards .length_19_2 .item:nth-child(7) {  display: block;  left: -72px;  bottom: 5.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-25deg);  -moz-transform: rotate(-25deg);  -o-transform: rotate(-25deg);  -ms-transform: rotate(-25deg);  transform: rotate(-25deg); }.cards .length_19_2 .item:nth-child(6) {  display: block;  left: -76px;  bottom: 4.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-35deg);  -moz-transform: rotate(-35deg);  -o-transform: rotate(-35deg);  -ms-transform: rotate(-35deg);  transform: rotate(-35deg); }.cards .length_19_2 .item:nth-child(5) {  display: block;  left: -80px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-45deg);  -moz-transform: rotate(-45deg);  -o-transform: rotate(-45deg);  -ms-transform: rotate(-45deg);  transform: rotate(-45deg); }.cards .length_19_2 .item:nth-child(4) {  display: block;  left: -84px;  bottom: 3.2px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-55deg);  -moz-transform: rotate(-55deg);  -o-transform: rotate(-55deg);  -ms-transform: rotate(-55deg);  transform: rotate(-55deg); }.cards .length_19_2 .item:nth-child(3) {  display: block;  left: -88px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-65deg);  -moz-transform: rotate(-65deg);  -o-transform: rotate(-65deg);  -ms-transform: rotate(-65deg);  transform: rotate(-65deg); }.cards .length_19_2 .item:nth-child(2) {  display: block;  left: -92px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-75deg);  -moz-transform: rotate(-75deg);  -o-transform: rotate(-75deg);  -ms-transform: rotate(-75deg);  transform: rotate(-75deg); }.cards .length_19_2 .item:nth-child(1) {  display: block;  left: -96px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-85deg);  -moz-transform: rotate(-85deg);  -o-transform: rotate(-85deg);  -ms-transform: rotate(-85deg);  transform: rotate(-85deg); }.cards .length_18_2 .item:nth-child(18) {  display: block;  left: -27px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(90deg);  -moz-transform: rotate(90deg);  -o-transform: rotate(90deg);  -ms-transform: rotate(90deg);  transform: rotate(90deg); }.cards .length_18_2 .item:nth-child(17) {  display: block;  left: -31px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(80deg);  -moz-transform: rotate(80deg);  -o-transform: rotate(80deg);  -ms-transform: rotate(80deg);  transform: rotate(80deg); }.cards .length_18_2 .item:nth-child(16) {  display: block;  left: -35px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(70deg);  -moz-transform: rotate(70deg);  -o-transform: rotate(70deg);  -ms-transform: rotate(70deg);  transform: rotate(70deg); }.cards .length_18_2 .item:nth-child(15) {  display: block;  left: -39px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(60deg);  -moz-transform: rotate(60deg);  -o-transform: rotate(60deg);  -ms-transform: rotate(60deg);  transform: rotate(60deg); }.cards .length_18_2 .item:nth-child(14) {  display: block;  left: -43px;  bottom: 3.2px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(50deg);  -moz-transform: rotate(50deg);  -o-transform: rotate(50deg);  -ms-transform: rotate(50deg);  transform: rotate(50deg); }.cards .length_18_2 .item:nth-child(13) {  display: block;  left: -47px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(40deg);  -moz-transform: rotate(40deg);  -o-transform: rotate(40deg);  -ms-transform: rotate(40deg);  transform: rotate(40deg); }.cards .length_18_2 .item:nth-child(12) {  display: block;  left: -51px;  bottom: 4.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(30deg);  -moz-transform: rotate(30deg);  -o-transform: rotate(30deg);  -ms-transform: rotate(30deg);  transform: rotate(30deg); }.cards .length_18_2 .item:nth-child(11) {  display: block;  left: -55px;  bottom: 5.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(20deg);  -moz-transform: rotate(20deg);  -o-transform: rotate(20deg);  -ms-transform: rotate(20deg);  transform: rotate(20deg); }.cards .length_18_2 .item:nth-child(10) {  display: block;  left: -59px;  bottom: 6.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(10deg);  -moz-transform: rotate(10deg);  -o-transform: rotate(10deg);  -ms-transform: rotate(10deg);  transform: rotate(10deg); }.cards .length_18_2 .item:nth-child(9) {  display: block;  left: -63px;  bottom: 7.2px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(0deg);  -moz-transform: rotate(0deg);  -o-transform: rotate(0deg);  -ms-transform: rotate(0deg);  transform: rotate(0deg); }.cards .length_18_2 .item:nth-child(8) {  display: block;  left: -67px;  bottom: 6.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-10deg);  -moz-transform: rotate(-10deg);  -o-transform: rotate(-10deg);  -ms-transform: rotate(-10deg);  transform: rotate(-10deg); }.cards .length_18_2 .item:nth-child(7) {  display: block;  left: -71px;  bottom: 5.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-20deg);  -moz-transform: rotate(-20deg);  -o-transform: rotate(-20deg);  -ms-transform: rotate(-20deg);  transform: rotate(-20deg); }.cards .length_18_2 .item:nth-child(6) {  display: block;  left: -75px;  bottom: 4.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-30deg);  -moz-transform: rotate(-30deg);  -o-transform: rotate(-30deg);  -ms-transform: rotate(-30deg);  transform: rotate(-30deg); }.cards .length_18_2 .item:nth-child(5) {  display: block;  left: -79px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-40deg);  -moz-transform: rotate(-40deg);  -o-transform: rotate(-40deg);  -ms-transform: rotate(-40deg);  transform: rotate(-40deg); }.cards .length_18_2 .item:nth-child(4) {  display: block;  left: -83px;  bottom: 3.2px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-50deg);  -moz-transform: rotate(-50deg);  -o-transform: rotate(-50deg);  -ms-transform: rotate(-50deg);  transform: rotate(-50deg); }.cards .length_18_2 .item:nth-child(3) {  display: block;  left: -87px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-60deg);  -moz-transform: rotate(-60deg);  -o-transform: rotate(-60deg);  -ms-transform: rotate(-60deg);  transform: rotate(-60deg); }.cards .length_18_2 .item:nth-child(2) {  display: block;  left: -91px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-70deg);  -moz-transform: rotate(-70deg);  -o-transform: rotate(-70deg);  -ms-transform: rotate(-70deg);  transform: rotate(-70deg); }.cards .length_18_2 .item:nth-child(1) {  display: block;  left: -95px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-80deg);  -moz-transform: rotate(-80deg);  -o-transform: rotate(-80deg);  -ms-transform: rotate(-80deg);  transform: rotate(-80deg); }.cards .length_17_2 .item:nth-child(17) {  display: block;  left: -30px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(85deg);  -moz-transform: rotate(85deg);  -o-transform: rotate(85deg);  -ms-transform: rotate(85deg);  transform: rotate(85deg); }.cards .length_17_2 .item:nth-child(16) {  display: block;  left: -34px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(75deg);  -moz-transform: rotate(75deg);  -o-transform: rotate(75deg);  -ms-transform: rotate(75deg);  transform: rotate(75deg); }.cards .length_17_2 .item:nth-child(15) {  display: block;  left: -38px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(65deg);  -moz-transform: rotate(65deg);  -o-transform: rotate(65deg);  -ms-transform: rotate(65deg);  transform: rotate(65deg); }.cards .length_17_2 .item:nth-child(14) {  display: block;  left: -42px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(55deg);  -moz-transform: rotate(55deg);  -o-transform: rotate(55deg);  -ms-transform: rotate(55deg);  transform: rotate(55deg); }.cards .length_17_2 .item:nth-child(13) {  display: block;  left: -46px;  bottom: 3.2px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(45deg);  -moz-transform: rotate(45deg);  -o-transform: rotate(45deg);  -ms-transform: rotate(45deg);  transform: rotate(45deg); }.cards .length_17_2 .item:nth-child(12) {  display: block;  left: -50px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(35deg);  -moz-transform: rotate(35deg);  -o-transform: rotate(35deg);  -ms-transform: rotate(35deg);  transform: rotate(35deg); }.cards .length_17_2 .item:nth-child(11) {  display: block;  left: -54px;  bottom: 4.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(25deg);  -moz-transform: rotate(25deg);  -o-transform: rotate(25deg);  -ms-transform: rotate(25deg);  transform: rotate(25deg); }.cards .length_17_2 .item:nth-child(10) {  display: block;  left: -58px;  bottom: 5.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(15deg);  -moz-transform: rotate(15deg);  -o-transform: rotate(15deg);  -ms-transform: rotate(15deg);  transform: rotate(15deg); }.cards .length_17_2 .item:nth-child(9) {  display: block;  left: -62px;  bottom: 6.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(5deg);  -moz-transform: rotate(5deg);  -o-transform: rotate(5deg);  -ms-transform: rotate(5deg);  transform: rotate(5deg); }.cards .length_17_2 .item:nth-child(8) {  display: block;  left: -66px;  bottom: 6.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-5deg);  -moz-transform: rotate(-5deg);  -o-transform: rotate(-5deg);  -ms-transform: rotate(-5deg);  transform: rotate(-5deg); }.cards .length_17_2 .item:nth-child(7) {  display: block;  left: -70px;  bottom: 5.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-15deg);  -moz-transform: rotate(-15deg);  -o-transform: rotate(-15deg);  -ms-transform: rotate(-15deg);  transform: rotate(-15deg); }.cards .length_17_2 .item:nth-child(6) {  display: block;  left: -74px;  bottom: 4.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-25deg);  -moz-transform: rotate(-25deg);  -o-transform: rotate(-25deg);  -ms-transform: rotate(-25deg);  transform: rotate(-25deg); }.cards .length_17_2 .item:nth-child(5) {  display: block;  left: -78px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-35deg);  -moz-transform: rotate(-35deg);  -o-transform: rotate(-35deg);  -ms-transform: rotate(-35deg);  transform: rotate(-35deg); }.cards .length_17_2 .item:nth-child(4) {  display: block;  left: -82px;  bottom: 3.2px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-45deg);  -moz-transform: rotate(-45deg);  -o-transform: rotate(-45deg);  -ms-transform: rotate(-45deg);  transform: rotate(-45deg); }.cards .length_17_2 .item:nth-child(3) {  display: block;  left: -86px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-55deg);  -moz-transform: rotate(-55deg);  -o-transform: rotate(-55deg);  -ms-transform: rotate(-55deg);  transform: rotate(-55deg); }.cards .length_17_2 .item:nth-child(2) {  display: block;  left: -90px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-65deg);  -moz-transform: rotate(-65deg);  -o-transform: rotate(-65deg);  -ms-transform: rotate(-65deg);  transform: rotate(-65deg); }.cards .length_17_2 .item:nth-child(1) {  display: block;  left: -94px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-75deg);  -moz-transform: rotate(-75deg);  -o-transform: rotate(-75deg);  -ms-transform: rotate(-75deg);  transform: rotate(-75deg); }.cards .length_16_2 .item:nth-child(16) {  display: block;  left: -33px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(80deg);  -moz-transform: rotate(80deg);  -o-transform: rotate(80deg);  -ms-transform: rotate(80deg);  transform: rotate(80deg); }.cards .length_16_2 .item:nth-child(15) {  display: block;  left: -37px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(70deg);  -moz-transform: rotate(70deg);  -o-transform: rotate(70deg);  -ms-transform: rotate(70deg);  transform: rotate(70deg); }.cards .length_16_2 .item:nth-child(14) {  display: block;  left: -41px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(60deg);  -moz-transform: rotate(60deg);  -o-transform: rotate(60deg);  -ms-transform: rotate(60deg);  transform: rotate(60deg); }.cards .length_16_2 .item:nth-child(13) {  display: block;  left: -45px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(50deg);  -moz-transform: rotate(50deg);  -o-transform: rotate(50deg);  -ms-transform: rotate(50deg);  transform: rotate(50deg); }.cards .length_16_2 .item:nth-child(12) {  display: block;  left: -49px;  bottom: 3.2px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(40deg);  -moz-transform: rotate(40deg);  -o-transform: rotate(40deg);  -ms-transform: rotate(40deg);  transform: rotate(40deg); }.cards .length_16_2 .item:nth-child(11) {  display: block;  left: -53px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(30deg);  -moz-transform: rotate(30deg);  -o-transform: rotate(30deg);  -ms-transform: rotate(30deg);  transform: rotate(30deg); }.cards .length_16_2 .item:nth-child(10) {  display: block;  left: -57px;  bottom: 4.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(20deg);  -moz-transform: rotate(20deg);  -o-transform: rotate(20deg);  -ms-transform: rotate(20deg);  transform: rotate(20deg); }.cards .length_16_2 .item:nth-child(9) {  display: block;  left: -61px;  bottom: 5.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(10deg);  -moz-transform: rotate(10deg);  -o-transform: rotate(10deg);  -ms-transform: rotate(10deg);  transform: rotate(10deg); }.cards .length_16_2 .item:nth-child(8) {  display: block;  left: -65px;  bottom: 6.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(0deg);  -moz-transform: rotate(0deg);  -o-transform: rotate(0deg);  -ms-transform: rotate(0deg);  transform: rotate(0deg); }.cards .length_16_2 .item:nth-child(7) {  display: block;  left: -69px;  bottom: 5.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-10deg);  -moz-transform: rotate(-10deg);  -o-transform: rotate(-10deg);  -ms-transform: rotate(-10deg);  transform: rotate(-10deg); }.cards .length_16_2 .item:nth-child(6) {  display: block;  left: -73px;  bottom: 4.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-20deg);  -moz-transform: rotate(-20deg);  -o-transform: rotate(-20deg);  -ms-transform: rotate(-20deg);  transform: rotate(-20deg); }.cards .length_16_2 .item:nth-child(5) {  display: block;  left: -77px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-30deg);  -moz-transform: rotate(-30deg);  -o-transform: rotate(-30deg);  -ms-transform: rotate(-30deg);  transform: rotate(-30deg); }.cards .length_16_2 .item:nth-child(4) {  display: block;  left: -81px;  bottom: 3.2px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-40deg);  -moz-transform: rotate(-40deg);  -o-transform: rotate(-40deg);  -ms-transform: rotate(-40deg);  transform: rotate(-40deg); }.cards .length_16_2 .item:nth-child(3) {  display: block;  left: -85px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-50deg);  -moz-transform: rotate(-50deg);  -o-transform: rotate(-50deg);  -ms-transform: rotate(-50deg);  transform: rotate(-50deg); }.cards .length_16_2 .item:nth-child(2) {  display: block;  left: -89px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-60deg);  -moz-transform: rotate(-60deg);  -o-transform: rotate(-60deg);  -ms-transform: rotate(-60deg);  transform: rotate(-60deg); }.cards .length_16_2 .item:nth-child(1) {  display: block;  left: -93px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-70deg);  -moz-transform: rotate(-70deg);  -o-transform: rotate(-70deg);  -ms-transform: rotate(-70deg);  transform: rotate(-70deg); }.cards .length_15_2 .item:nth-child(15) {  display: block;  left: -36px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(75deg);  -moz-transform: rotate(75deg);  -o-transform: rotate(75deg);  -ms-transform: rotate(75deg);  transform: rotate(75deg); }.cards .length_15_2 .item:nth-child(14) {  display: block;  left: -40px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(65deg);  -moz-transform: rotate(65deg);  -o-transform: rotate(65deg);  -ms-transform: rotate(65deg);  transform: rotate(65deg); }.cards .length_15_2 .item:nth-child(13) {  display: block;  left: -44px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(55deg);  -moz-transform: rotate(55deg);  -o-transform: rotate(55deg);  -ms-transform: rotate(55deg);  transform: rotate(55deg); }.cards .length_15_2 .item:nth-child(12) {  display: block;  left: -48px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(45deg);  -moz-transform: rotate(45deg);  -o-transform: rotate(45deg);  -ms-transform: rotate(45deg);  transform: rotate(45deg); }.cards .length_15_2 .item:nth-child(11) {  display: block;  left: -52px;  bottom: 3.2px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(35deg);  -moz-transform: rotate(35deg);  -o-transform: rotate(35deg);  -ms-transform: rotate(35deg);  transform: rotate(35deg); }.cards .length_15_2 .item:nth-child(10) {  display: block;  left: -56px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(25deg);  -moz-transform: rotate(25deg);  -o-transform: rotate(25deg);  -ms-transform: rotate(25deg);  transform: rotate(25deg); }.cards .length_15_2 .item:nth-child(9) {  display: block;  left: -60px;  bottom: 4.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(15deg);  -moz-transform: rotate(15deg);  -o-transform: rotate(15deg);  -ms-transform: rotate(15deg);  transform: rotate(15deg); }.cards .length_15_2 .item:nth-child(8) {  display: block;  left: -64px;  bottom: 5.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(5deg);  -moz-transform: rotate(5deg);  -o-transform: rotate(5deg);  -ms-transform: rotate(5deg);  transform: rotate(5deg); }.cards .length_15_2 .item:nth-child(7) {  display: block;  left: -68px;  bottom: 5.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-5deg);  -moz-transform: rotate(-5deg);  -o-transform: rotate(-5deg);  -ms-transform: rotate(-5deg);  transform: rotate(-5deg); }.cards .length_15_2 .item:nth-child(6) {  display: block;  left: -72px;  bottom: 4.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-15deg);  -moz-transform: rotate(-15deg);  -o-transform: rotate(-15deg);  -ms-transform: rotate(-15deg);  transform: rotate(-15deg); }.cards .length_15_2 .item:nth-child(5) {  display: block;  left: -76px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-25deg);  -moz-transform: rotate(-25deg);  -o-transform: rotate(-25deg);  -ms-transform: rotate(-25deg);  transform: rotate(-25deg); }.cards .length_15_2 .item:nth-child(4) {  display: block;  left: -80px;  bottom: 3.2px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-35deg);  -moz-transform: rotate(-35deg);  -o-transform: rotate(-35deg);  -ms-transform: rotate(-35deg);  transform: rotate(-35deg); }.cards .length_15_2 .item:nth-child(3) {  display: block;  left: -84px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-45deg);  -moz-transform: rotate(-45deg);  -o-transform: rotate(-45deg);  -ms-transform: rotate(-45deg);  transform: rotate(-45deg); }.cards .length_15_2 .item:nth-child(2) {  display: block;  left: -88px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-55deg);  -moz-transform: rotate(-55deg);  -o-transform: rotate(-55deg);  -ms-transform: rotate(-55deg);  transform: rotate(-55deg); }.cards .length_15_2 .item:nth-child(1) {  display: block;  left: -92px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-65deg);  -moz-transform: rotate(-65deg);  -o-transform: rotate(-65deg);  -ms-transform: rotate(-65deg);  transform: rotate(-65deg); }.cards .length_14_2 .item:nth-child(14) {  display: block;  left: -39px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(70deg);  -moz-transform: rotate(70deg);  -o-transform: rotate(70deg);  -ms-transform: rotate(70deg);  transform: rotate(70deg); }.cards .length_14_2 .item:nth-child(13) {  display: block;  left: -43px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(60deg);  -moz-transform: rotate(60deg);  -o-transform: rotate(60deg);  -ms-transform: rotate(60deg);  transform: rotate(60deg); }.cards .length_14_2 .item:nth-child(12) {  display: block;  left: -47px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(50deg);  -moz-transform: rotate(50deg);  -o-transform: rotate(50deg);  -ms-transform: rotate(50deg);  transform: rotate(50deg); }.cards .length_14_2 .item:nth-child(11) {  display: block;  left: -51px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(40deg);  -moz-transform: rotate(40deg);  -o-transform: rotate(40deg);  -ms-transform: rotate(40deg);  transform: rotate(40deg); }.cards .length_14_2 .item:nth-child(10) {  display: block;  left: -55px;  bottom: 3.2px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(30deg);  -moz-transform: rotate(30deg);  -o-transform: rotate(30deg);  -ms-transform: rotate(30deg);  transform: rotate(30deg); }.cards .length_14_2 .item:nth-child(9) {  display: block;  left: -59px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(20deg);  -moz-transform: rotate(20deg);  -o-transform: rotate(20deg);  -ms-transform: rotate(20deg);  transform: rotate(20deg); }.cards .length_14_2 .item:nth-child(8) {  display: block;  left: -63px;  bottom: 4.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(10deg);  -moz-transform: rotate(10deg);  -o-transform: rotate(10deg);  -ms-transform: rotate(10deg);  transform: rotate(10deg); }.cards .length_14_2 .item:nth-child(7) {  display: block;  left: -67px;  bottom: 5.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(0deg);  -moz-transform: rotate(0deg);  -o-transform: rotate(0deg);  -ms-transform: rotate(0deg);  transform: rotate(0deg); }.cards .length_14_2 .item:nth-child(6) {  display: block;  left: -71px;  bottom: 4.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-10deg);  -moz-transform: rotate(-10deg);  -o-transform: rotate(-10deg);  -ms-transform: rotate(-10deg);  transform: rotate(-10deg); }.cards .length_14_2 .item:nth-child(5) {  display: block;  left: -75px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-20deg);  -moz-transform: rotate(-20deg);  -o-transform: rotate(-20deg);  -ms-transform: rotate(-20deg);  transform: rotate(-20deg); }.cards .length_14_2 .item:nth-child(4) {  display: block;  left: -79px;  bottom: 3.2px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-30deg);  -moz-transform: rotate(-30deg);  -o-transform: rotate(-30deg);  -ms-transform: rotate(-30deg);  transform: rotate(-30deg); }.cards .length_14_2 .item:nth-child(3) {  display: block;  left: -83px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-40deg);  -moz-transform: rotate(-40deg);  -o-transform: rotate(-40deg);  -ms-transform: rotate(-40deg);  transform: rotate(-40deg); }.cards .length_14_2 .item:nth-child(2) {  display: block;  left: -87px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-50deg);  -moz-transform: rotate(-50deg);  -o-transform: rotate(-50deg);  -ms-transform: rotate(-50deg);  transform: rotate(-50deg); }.cards .length_14_2 .item:nth-child(1) {  display: block;  left: -91px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-60deg);  -moz-transform: rotate(-60deg);  -o-transform: rotate(-60deg);  -ms-transform: rotate(-60deg);  transform: rotate(-60deg); }.cards .length_13_2 .item:nth-child(13) {  display: block;  left: -42px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(65deg);  -moz-transform: rotate(65deg);  -o-transform: rotate(65deg);  -ms-transform: rotate(65deg);  transform: rotate(65deg); }.cards .length_13_2 .item:nth-child(12) {  display: block;  left: -46px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(55deg);  -moz-transform: rotate(55deg);  -o-transform: rotate(55deg);  -ms-transform: rotate(55deg);  transform: rotate(55deg); }.cards .length_13_2 .item:nth-child(11) {  display: block;  left: -50px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(45deg);  -moz-transform: rotate(45deg);  -o-transform: rotate(45deg);  -ms-transform: rotate(45deg);  transform: rotate(45deg); }.cards .length_13_2 .item:nth-child(10) {  display: block;  left: -54px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(35deg);  -moz-transform: rotate(35deg);  -o-transform: rotate(35deg);  -ms-transform: rotate(35deg);  transform: rotate(35deg); }.cards .length_13_2 .item:nth-child(9) {  display: block;  left: -58px;  bottom: 3.2px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(25deg);  -moz-transform: rotate(25deg);  -o-transform: rotate(25deg);  -ms-transform: rotate(25deg);  transform: rotate(25deg); }.cards .length_13_2 .item:nth-child(8) {  display: block;  left: -62px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(15deg);  -moz-transform: rotate(15deg);  -o-transform: rotate(15deg);  -ms-transform: rotate(15deg);  transform: rotate(15deg); }.cards .length_13_2 .item:nth-child(7) {  display: block;  left: -66px;  bottom: 4.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(5deg);  -moz-transform: rotate(5deg);  -o-transform: rotate(5deg);  -ms-transform: rotate(5deg);  transform: rotate(5deg); }.cards .length_13_2 .item:nth-child(6) {  display: block;  left: -70px;  bottom: 4.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-5deg);  -moz-transform: rotate(-5deg);  -o-transform: rotate(-5deg);  -ms-transform: rotate(-5deg);  transform: rotate(-5deg); }.cards .length_13_2 .item:nth-child(5) {  display: block;  left: -74px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-15deg);  -moz-transform: rotate(-15deg);  -o-transform: rotate(-15deg);  -ms-transform: rotate(-15deg);  transform: rotate(-15deg); }.cards .length_13_2 .item:nth-child(4) {  display: block;  left: -78px;  bottom: 3.2px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-25deg);  -moz-transform: rotate(-25deg);  -o-transform: rotate(-25deg);  -ms-transform: rotate(-25deg);  transform: rotate(-25deg); }.cards .length_13_2 .item:nth-child(3) {  display: block;  left: -82px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-35deg);  -moz-transform: rotate(-35deg);  -o-transform: rotate(-35deg);  -ms-transform: rotate(-35deg);  transform: rotate(-35deg); }.cards .length_13_2 .item:nth-child(2) {  display: block;  left: -86px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-45deg);  -moz-transform: rotate(-45deg);  -o-transform: rotate(-45deg);  -ms-transform: rotate(-45deg);  transform: rotate(-45deg); }.cards .length_13_2 .item:nth-child(1) {  display: block;  left: -90px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-55deg);  -moz-transform: rotate(-55deg);  -o-transform: rotate(-55deg);  -ms-transform: rotate(-55deg);  transform: rotate(-55deg); }.cards .length_12_2 .item:nth-child(12) {  display: block;  left: -45px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(60deg);  -moz-transform: rotate(60deg);  -o-transform: rotate(60deg);  -ms-transform: rotate(60deg);  transform: rotate(60deg); }.cards .length_12_2 .item:nth-child(11) {  display: block;  left: -49px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(50deg);  -moz-transform: rotate(50deg);  -o-transform: rotate(50deg);  -ms-transform: rotate(50deg);  transform: rotate(50deg); }.cards .length_12_2 .item:nth-child(10) {  display: block;  left: -53px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(40deg);  -moz-transform: rotate(40deg);  -o-transform: rotate(40deg);  -ms-transform: rotate(40deg);  transform: rotate(40deg); }.cards .length_12_2 .item:nth-child(9) {  display: block;  left: -57px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(30deg);  -moz-transform: rotate(30deg);  -o-transform: rotate(30deg);  -ms-transform: rotate(30deg);  transform: rotate(30deg); }.cards .length_12_2 .item:nth-child(8) {  display: block;  left: -61px;  bottom: 3.2px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(20deg);  -moz-transform: rotate(20deg);  -o-transform: rotate(20deg);  -ms-transform: rotate(20deg);  transform: rotate(20deg); }.cards .length_12_2 .item:nth-child(7) {  display: block;  left: -65px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(10deg);  -moz-transform: rotate(10deg);  -o-transform: rotate(10deg);  -ms-transform: rotate(10deg);  transform: rotate(10deg); }.cards .length_12_2 .item:nth-child(6) {  display: block;  left: -69px;  bottom: 4.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(0deg);  -moz-transform: rotate(0deg);  -o-transform: rotate(0deg);  -ms-transform: rotate(0deg);  transform: rotate(0deg); }.cards .length_12_2 .item:nth-child(5) {  display: block;  left: -73px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-10deg);  -moz-transform: rotate(-10deg);  -o-transform: rotate(-10deg);  -ms-transform: rotate(-10deg);  transform: rotate(-10deg); }.cards .length_12_2 .item:nth-child(4) {  display: block;  left: -77px;  bottom: 3.2px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-20deg);  -moz-transform: rotate(-20deg);  -o-transform: rotate(-20deg);  -ms-transform: rotate(-20deg);  transform: rotate(-20deg); }.cards .length_12_2 .item:nth-child(3) {  display: block;  left: -81px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-30deg);  -moz-transform: rotate(-30deg);  -o-transform: rotate(-30deg);  -ms-transform: rotate(-30deg);  transform: rotate(-30deg); }.cards .length_12_2 .item:nth-child(2) {  display: block;  left: -85px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-40deg);  -moz-transform: rotate(-40deg);  -o-transform: rotate(-40deg);  -ms-transform: rotate(-40deg);  transform: rotate(-40deg); }.cards .length_12_2 .item:nth-child(1) {  display: block;  left: -89px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-50deg);  -moz-transform: rotate(-50deg);  -o-transform: rotate(-50deg);  -ms-transform: rotate(-50deg);  transform: rotate(-50deg); }.cards .length_11_2 .item:nth-child(11) {  display: block;  left: -48px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(55deg);  -moz-transform: rotate(55deg);  -o-transform: rotate(55deg);  -ms-transform: rotate(55deg);  transform: rotate(55deg); }.cards .length_11_2 .item:nth-child(10) {  display: block;  left: -52px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(45deg);  -moz-transform: rotate(45deg);  -o-transform: rotate(45deg);  -ms-transform: rotate(45deg);  transform: rotate(45deg); }.cards .length_11_2 .item:nth-child(9) {  display: block;  left: -56px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(35deg);  -moz-transform: rotate(35deg);  -o-transform: rotate(35deg);  -ms-transform: rotate(35deg);  transform: rotate(35deg); }.cards .length_11_2 .item:nth-child(8) {  display: block;  left: -60px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(25deg);  -moz-transform: rotate(25deg);  -o-transform: rotate(25deg);  -ms-transform: rotate(25deg);  transform: rotate(25deg); }.cards .length_11_2 .item:nth-child(7) {  display: block;  left: -64px;  bottom: 3.2px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(15deg);  -moz-transform: rotate(15deg);  -o-transform: rotate(15deg);  -ms-transform: rotate(15deg);  transform: rotate(15deg); }.cards .length_11_2 .item:nth-child(6) {  display: block;  left: -68px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(5deg);  -moz-transform: rotate(5deg);  -o-transform: rotate(5deg);  -ms-transform: rotate(5deg);  transform: rotate(5deg); }.cards .length_11_2 .item:nth-child(5) {  display: block;  left: -72px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-5deg);  -moz-transform: rotate(-5deg);  -o-transform: rotate(-5deg);  -ms-transform: rotate(-5deg);  transform: rotate(-5deg); }.cards .length_11_2 .item:nth-child(4) {  display: block;  left: -76px;  bottom: 3.2px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-15deg);  -moz-transform: rotate(-15deg);  -o-transform: rotate(-15deg);  -ms-transform: rotate(-15deg);  transform: rotate(-15deg); }.cards .length_11_2 .item:nth-child(3) {  display: block;  left: -80px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-25deg);  -moz-transform: rotate(-25deg);  -o-transform: rotate(-25deg);  -ms-transform: rotate(-25deg);  transform: rotate(-25deg); }.cards .length_11_2 .item:nth-child(2) {  display: block;  left: -84px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-35deg);  -moz-transform: rotate(-35deg);  -o-transform: rotate(-35deg);  -ms-transform: rotate(-35deg);  transform: rotate(-35deg); }.cards .length_11_2 .item:nth-child(1) {  display: block;  left: -88px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-45deg);  -moz-transform: rotate(-45deg);  -o-transform: rotate(-45deg);  -ms-transform: rotate(-45deg);  transform: rotate(-45deg); }.cards .length_10_2 .item:nth-child(10) {  display: block;  left: -51px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(50deg);  -moz-transform: rotate(50deg);  -o-transform: rotate(50deg);  -ms-transform: rotate(50deg);  transform: rotate(50deg); }.cards .length_10_2 .item:nth-child(9) {  display: block;  left: -55px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(40deg);  -moz-transform: rotate(40deg);  -o-transform: rotate(40deg);  -ms-transform: rotate(40deg);  transform: rotate(40deg); }.cards .length_10_2 .item:nth-child(8) {  display: block;  left: -59px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(30deg);  -moz-transform: rotate(30deg);  -o-transform: rotate(30deg);  -ms-transform: rotate(30deg);  transform: rotate(30deg); }.cards .length_10_2 .item:nth-child(7) {  display: block;  left: -63px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(20deg);  -moz-transform: rotate(20deg);  -o-transform: rotate(20deg);  -ms-transform: rotate(20deg);  transform: rotate(20deg); }.cards .length_10_2 .item:nth-child(6) {  display: block;  left: -67px;  bottom: 3.2px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(10deg);  -moz-transform: rotate(10deg);  -o-transform: rotate(10deg);  -ms-transform: rotate(10deg);  transform: rotate(10deg); }.cards .length_10_2 .item:nth-child(5) {  display: block;  left: -71px;  bottom: 4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(0deg);  -moz-transform: rotate(0deg);  -o-transform: rotate(0deg);  -ms-transform: rotate(0deg);  transform: rotate(0deg); }.cards .length_10_2 .item:nth-child(4) {  display: block;  left: -75px;  bottom: 3.2px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-10deg);  -moz-transform: rotate(-10deg);  -o-transform: rotate(-10deg);  -ms-transform: rotate(-10deg);  transform: rotate(-10deg); }.cards .length_10_2 .item:nth-child(3) {  display: block;  left: -79px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-20deg);  -moz-transform: rotate(-20deg);  -o-transform: rotate(-20deg);  -ms-transform: rotate(-20deg);  transform: rotate(-20deg); }.cards .length_10_2 .item:nth-child(2) {  display: block;  left: -83px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-30deg);  -moz-transform: rotate(-30deg);  -o-transform: rotate(-30deg);  -ms-transform: rotate(-30deg);  transform: rotate(-30deg); }.cards .length_10_2 .item:nth-child(1) {  display: block;  left: -87px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-40deg);  -moz-transform: rotate(-40deg);  -o-transform: rotate(-40deg);  -ms-transform: rotate(-40deg);  transform: rotate(-40deg); }.cards .length_9_2 .item:nth-child(9) {  display: block;  left: -54px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(45deg);  -moz-transform: rotate(45deg);  -o-transform: rotate(45deg);  -ms-transform: rotate(45deg);  transform: rotate(45deg); }.cards .length_9_2 .item:nth-child(8) {  display: block;  left: -58px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(35deg);  -moz-transform: rotate(35deg);  -o-transform: rotate(35deg);  -ms-transform: rotate(35deg);  transform: rotate(35deg); }.cards .length_9_2 .item:nth-child(7) {  display: block;  left: -62px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(25deg);  -moz-transform: rotate(25deg);  -o-transform: rotate(25deg);  -ms-transform: rotate(25deg);  transform: rotate(25deg); }.cards .length_9_2 .item:nth-child(6) {  display: block;  left: -66px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(15deg);  -moz-transform: rotate(15deg);  -o-transform: rotate(15deg);  -ms-transform: rotate(15deg);  transform: rotate(15deg); }.cards .length_9_2 .item:nth-child(5) {  display: block;  left: -70px;  bottom: 3.2px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(5deg);  -moz-transform: rotate(5deg);  -o-transform: rotate(5deg);  -ms-transform: rotate(5deg);  transform: rotate(5deg); }.cards .length_9_2 .item:nth-child(4) {  display: block;  left: -74px;  bottom: 3.2px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-5deg);  -moz-transform: rotate(-5deg);  -o-transform: rotate(-5deg);  -ms-transform: rotate(-5deg);  transform: rotate(-5deg); }.cards .length_9_2 .item:nth-child(3) {  display: block;  left: -78px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-15deg);  -moz-transform: rotate(-15deg);  -o-transform: rotate(-15deg);  -ms-transform: rotate(-15deg);  transform: rotate(-15deg); }.cards .length_9_2 .item:nth-child(2) {  display: block;  left: -82px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-25deg);  -moz-transform: rotate(-25deg);  -o-transform: rotate(-25deg);  -ms-transform: rotate(-25deg);  transform: rotate(-25deg); }.cards .length_9_2 .item:nth-child(1) {  display: block;  left: -86px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-35deg);  -moz-transform: rotate(-35deg);  -o-transform: rotate(-35deg);  -ms-transform: rotate(-35deg);  transform: rotate(-35deg); }.cards .length_8_2 .item:nth-child(8) {  display: block;  left: -57px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(40deg);  -moz-transform: rotate(40deg);  -o-transform: rotate(40deg);  -ms-transform: rotate(40deg);  transform: rotate(40deg); }.cards .length_8_2 .item:nth-child(7) {  display: block;  left: -61px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(30deg);  -moz-transform: rotate(30deg);  -o-transform: rotate(30deg);  -ms-transform: rotate(30deg);  transform: rotate(30deg); }.cards .length_8_2 .item:nth-child(6) {  display: block;  left: -65px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(20deg);  -moz-transform: rotate(20deg);  -o-transform: rotate(20deg);  -ms-transform: rotate(20deg);  transform: rotate(20deg); }.cards .length_8_2 .item:nth-child(5) {  display: block;  left: -69px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(10deg);  -moz-transform: rotate(10deg);  -o-transform: rotate(10deg);  -ms-transform: rotate(10deg);  transform: rotate(10deg); }.cards .length_8_2 .item:nth-child(4) {  display: block;  left: -73px;  bottom: 3.2px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(0deg);  -moz-transform: rotate(0deg);  -o-transform: rotate(0deg);  -ms-transform: rotate(0deg);  transform: rotate(0deg); }.cards .length_8_2 .item:nth-child(3) {  display: block;  left: -77px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-10deg);  -moz-transform: rotate(-10deg);  -o-transform: rotate(-10deg);  -ms-transform: rotate(-10deg);  transform: rotate(-10deg); }.cards .length_8_2 .item:nth-child(2) {  display: block;  left: -81px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-20deg);  -moz-transform: rotate(-20deg);  -o-transform: rotate(-20deg);  -ms-transform: rotate(-20deg);  transform: rotate(-20deg); }.cards .length_8_2 .item:nth-child(1) {  display: block;  left: -85px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-30deg);  -moz-transform: rotate(-30deg);  -o-transform: rotate(-30deg);  -ms-transform: rotate(-30deg);  transform: rotate(-30deg); }.cards .length_7_2 .item:nth-child(7) {  display: block;  left: -60px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(35deg);  -moz-transform: rotate(35deg);  -o-transform: rotate(35deg);  -ms-transform: rotate(35deg);  transform: rotate(35deg); }.cards .length_7_2 .item:nth-child(6) {  display: block;  left: -64px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(25deg);  -moz-transform: rotate(25deg);  -o-transform: rotate(25deg);  -ms-transform: rotate(25deg);  transform: rotate(25deg); }.cards .length_7_2 .item:nth-child(5) {  display: block;  left: -68px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(15deg);  -moz-transform: rotate(15deg);  -o-transform: rotate(15deg);  -ms-transform: rotate(15deg);  transform: rotate(15deg); }.cards .length_7_2 .item:nth-child(4) {  display: block;  left: -72px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(5deg);  -moz-transform: rotate(5deg);  -o-transform: rotate(5deg);  -ms-transform: rotate(5deg);  transform: rotate(5deg); }.cards .length_7_2 .item:nth-child(3) {  display: block;  left: -76px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-5deg);  -moz-transform: rotate(-5deg);  -o-transform: rotate(-5deg);  -ms-transform: rotate(-5deg);  transform: rotate(-5deg); }.cards .length_7_2 .item:nth-child(2) {  display: block;  left: -80px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-15deg);  -moz-transform: rotate(-15deg);  -o-transform: rotate(-15deg);  -ms-transform: rotate(-15deg);  transform: rotate(-15deg); }.cards .length_7_2 .item:nth-child(1) {  display: block;  left: -84px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-25deg);  -moz-transform: rotate(-25deg);  -o-transform: rotate(-25deg);  -ms-transform: rotate(-25deg);  transform: rotate(-25deg); }.cards .length_6_2 .item:nth-child(6) {  display: block;  left: -63px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(30deg);  -moz-transform: rotate(30deg);  -o-transform: rotate(30deg);  -ms-transform: rotate(30deg);  transform: rotate(30deg); }.cards .length_6_2 .item:nth-child(5) {  display: block;  left: -67px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(20deg);  -moz-transform: rotate(20deg);  -o-transform: rotate(20deg);  -ms-transform: rotate(20deg);  transform: rotate(20deg); }.cards .length_6_2 .item:nth-child(4) {  display: block;  left: -71px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(10deg);  -moz-transform: rotate(10deg);  -o-transform: rotate(10deg);  -ms-transform: rotate(10deg);  transform: rotate(10deg); }.cards .length_6_2 .item:nth-child(3) {  display: block;  left: -75px;  bottom: 2.4px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(0deg);  -moz-transform: rotate(0deg);  -o-transform: rotate(0deg);  -ms-transform: rotate(0deg);  transform: rotate(0deg); }.cards .length_6_2 .item:nth-child(2) {  display: block;  left: -79px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-10deg);  -moz-transform: rotate(-10deg);  -o-transform: rotate(-10deg);  -ms-transform: rotate(-10deg);  transform: rotate(-10deg); }.cards .length_6_2 .item:nth-child(1) {  display: block;  left: -83px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-20deg);  -moz-transform: rotate(-20deg);  -o-transform: rotate(-20deg);  -ms-transform: rotate(-20deg);  transform: rotate(-20deg); }.cards .length_5_2 .item:nth-child(5) {  display: block;  left: -66px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(25deg);  -moz-transform: rotate(25deg);  -o-transform: rotate(25deg);  -ms-transform: rotate(25deg);  transform: rotate(25deg); }.cards .length_5_2 .item:nth-child(4) {  display: block;  left: -70px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(15deg);  -moz-transform: rotate(15deg);  -o-transform: rotate(15deg);  -ms-transform: rotate(15deg);  transform: rotate(15deg); }.cards .length_5_2 .item:nth-child(3) {  display: block;  left: -74px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(5deg);  -moz-transform: rotate(5deg);  -o-transform: rotate(5deg);  -ms-transform: rotate(5deg);  transform: rotate(5deg); }.cards .length_5_2 .item:nth-child(2) {  display: block;  left: -78px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-5deg);  -moz-transform: rotate(-5deg);  -o-transform: rotate(-5deg);  -ms-transform: rotate(-5deg);  transform: rotate(-5deg); }.cards .length_5_2 .item:nth-child(1) {  display: block;  left: -82px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-15deg);  -moz-transform: rotate(-15deg);  -o-transform: rotate(-15deg);  -ms-transform: rotate(-15deg);  transform: rotate(-15deg); }.cards .length_4_2 .item:nth-child(4) {  display: block;  left: -69px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(20deg);  -moz-transform: rotate(20deg);  -o-transform: rotate(20deg);  -ms-transform: rotate(20deg);  transform: rotate(20deg); }.cards .length_4_2 .item:nth-child(3) {  display: block;  left: -73px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(10deg);  -moz-transform: rotate(10deg);  -o-transform: rotate(10deg);  -ms-transform: rotate(10deg);  transform: rotate(10deg); }.cards .length_4_2 .item:nth-child(2) {  display: block;  left: -77px;  bottom: 1.6px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(0deg);  -moz-transform: rotate(0deg);  -o-transform: rotate(0deg);  -ms-transform: rotate(0deg);  transform: rotate(0deg); }.cards .length_4_2 .item:nth-child(1) {  display: block;  left: -81px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-10deg);  -moz-transform: rotate(-10deg);  -o-transform: rotate(-10deg);  -ms-transform: rotate(-10deg);  transform: rotate(-10deg); }.cards .length_3_2 .item:nth-child(3) {  display: block;  left: -72px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(15deg);  -moz-transform: rotate(15deg);  -o-transform: rotate(15deg);  -ms-transform: rotate(15deg);  transform: rotate(15deg); }.cards .length_3_2 .item:nth-child(2) {  display: block;  left: -76px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(5deg);  -moz-transform: rotate(5deg);  -o-transform: rotate(5deg);  -ms-transform: rotate(5deg);  transform: rotate(5deg); }.cards .length_3_2 .item:nth-child(1) {  display: block;  left: -80px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(-5deg);  -moz-transform: rotate(-5deg);  -o-transform: rotate(-5deg);  -ms-transform: rotate(-5deg);  transform: rotate(-5deg); }.cards .length_2_2 .item:nth-child(2) {  display: block;  left: -75px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(10deg);  -moz-transform: rotate(10deg);  -o-transform: rotate(10deg);  -ms-transform: rotate(10deg);  transform: rotate(10deg); }.cards .length_2_2 .item:nth-child(1) {  display: block;  left: -79px;  bottom: 0.8px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(0deg);  -moz-transform: rotate(0deg);  -o-transform: rotate(0deg);  -ms-transform: rotate(0deg);  transform: rotate(0deg); }.cards .length_1_2 .item:nth-child(1) {  display: block;  left: -78px;  bottom: 0px;  margin-left: 3px;  margin-right: 3px;  -webkit-transform: rotate(5deg);  -moz-transform: rotate(5deg);  -o-transform: rotate(5deg);  -ms-transform: rotate(5deg);  transform: rotate(5deg); }.cards.compact .item {  -webkit-transition: none;  -moz-transition: none;  -o-transition: none;  transition: none; }.cards.compact .minicard {  -moz-transition: none;  -webkit-transition: none;  -o-transition: none;  transition: none; }"],
                        template: '<div class="cards" [class.compact]="isCompact"><div *ngIf="isVisible && source && !miniCardsCount" class="length_{{visibleCards().length}}_1"><card *ngFor="#card of visibleCards()" class="item" [card]="card" [isCompact]="isCompact" [isSelectionAllowed]="isSelectionAllowed" [enableShadows]="enableShadows" [callbacks]="callbacks"></card></div><div *ngIf="isVisible && miniCardsCount && miniCardsCount" class="length_{{getMiniCards().length}}_2"><div *ngFor="#card of getMiniCards()" class="minicard item">{{miniCardsCount}}</div></div></div>',
                        directives: [card_1.UICard]
                    }), 
                    __metadata('design:paramtypes', [])
                ], UICards);
                return UICards;
            }());
            exports_44("UICards", UICards);
        }
    }
});
System.register("Modules/Cards/colorselection.model", [], function(exports_45, context_45) {
    "use strict";
    var __moduleName = context_45 && context_45.id;
    var ColorSelectionMode;
    return {
        setters:[],
        execute: function() {
            (function (ColorSelectionMode) {
                ColorSelectionMode[ColorSelectionMode["ColorSelection"] = 1] = "ColorSelection";
                ColorSelectionMode[ColorSelectionMode["WantTakeSelection"] = 2] = "WantTakeSelection";
                ColorSelectionMode[ColorSelectionMode["WantColorSelection"] = 3] = "WantColorSelection";
                ColorSelectionMode[ColorSelectionMode["TakeColorSelection"] = 4] = "TakeColorSelection";
            })(ColorSelectionMode || (ColorSelectionMode = {}));
            exports_45("ColorSelectionMode", ColorSelectionMode);
        }
    }
});
System.register("Modules/Cards/colorselection", ['angular2/core', "Modules/Cards/colorselection.model"], function(exports_46, context_46) {
    "use strict";
    var __moduleName = context_46 && context_46.id;
    var core_28, colorselection_model_1;
    var UIColorSelection;
    return {
        setters:[
            function (core_28_1) {
                core_28 = core_28_1;
            },
            function (colorselection_model_1_1) {
                colorselection_model_1 = colorselection_model_1_1;
            }],
        execute: function() {
            UIColorSelection = (function () {
                function UIColorSelection() {
                    this.items = [0, 1, 2, 3, 4];
                    this.items2 = [0, 1, 2, 3];
                }
                __decorate([
                    core_28.Input(), 
                    __metadata('design:type', Number)
                ], UIColorSelection.prototype, "mode", void 0);
                __decorate([
                    core_28.Input(), 
                    __metadata('design:type', Object)
                ], UIColorSelection.prototype, "callbacks", void 0);
                UIColorSelection = __decorate([
                    core_28.Component({
                        selector: 'colorselection',
                        styles: [".colorselection {  position: relative;  width: 200px;  border: 1px solid rgba(24, 134, 112, 0.5);  border-radius: 10px;  padding: 10px 15px;  background: rgba(0, 0, 0, 0.74); }  .colorselection header {    color: white;    position: relative;    left: 0;    right: 0;    text-align: center;    bottom: 100%;    border-radius: 3px;    padding: 5px;    font-size: 13px; }    .colorselection header img {      height: 35px;      vertical-align: middle; }  .colorselection section {    position: relative; }    .colorselection section div {      min-height: 45px;      text-align: center;      padding: 12px;      padding-bottom: 0;      font-size: 12px;      -moz-transition: all 100ms;      -o-transition: all 100ms;      -webkit-transition: all 100ms;      transition: all 100ms;      cursor: pointer; }      .colorselection section div:first-child {        border-radius: 7px 7px 0 0; }      .colorselection section div:last-child {        border-radius: 0 0 7px 7px; }      .colorselection section div span {        display: none; }      .colorselection section div:hover {        -moz-transform: scale(1.1);        -ms-transform: scale(1.1);        -o-transform: scale(1.1);        -webkit-transform: scale(1.1);        transform: scale(1.1);        border-radius: 7px;        z-index: 20; }        .colorselection section div:hover span {          display: inline-block; }.jok_card_color.color_0 {  background-color: #2980b9;  border: 1px solid #2980b9;  color: white; }.jok_card_color.color_0:hover {  border-color: #126195; }.jok_card_color.color_1 {  background-color: #e67e22;  border: 1px solid #e67e22;  color: white; }.jok_card_color.color_1:hover {  border-color: #c46816; }.jok_card_color.color_2 {  background-color: #bf3902;  border: 1px solid #bf3902;  color: white; }.jok_card_color.color_2:hover {  border-color: #882c07; }.jok_card_color.color_3 {  background-color: #9b59b6;  border: 1px solid #9b59b6;  color: white; }.jok_card_color.color_3:hover {  border-color: #793c92; }.jok_card_color.color_4 {  background-color: white;  border: 1px solid white;  color: gray; }.jok_card_color.color_4:hover {  border-color: silver; }.jok_card_color.color_5 {  background-color: #0a4c3f;  border: 1px solid rgba(0, 0, 0, 0.14);  color: white; }"],
                        template: '<div class="colorselection" *ngIf="mode" [ngSwitch]="mode"><template [ngSwitchWhen]="1"><header>{{ \'colorselection.PleaseSelectDominatedColor\' | translate }}</header><section><template ngFor #item [ngForOf]="items" #i="index"><div class="jok_card_color color_{{item}}" (click)="callbacks?.onSelectDominatedColor(item)"><span>{{ (item == 4 ? \'colorselection.NoDominatedColor\' : \'colorselection.Select\') | translate }}</span></div></template></section></template><template [ngSwitchWhen]="2"><header><div><img src="/images/joklogo.png"></div>{{ \'colorselection.WantTakeLabel\' | translate }}</header><section><div class="jok_card_color color_5" (click)="callbacks?.onWantTakeClick(true)">{{ \'colorselection.WantAction\' | translate }}</div><div class="jok_card_color color_5" (click)="callbacks?.onWantTakeClick(false)">{{ \'colorselection.TakeAction\' | translate }}</div></section></template><template [ngSwitchWhen]="3"><header><div><img src="/images/joklogo.png"></div>{{ \'colorselection.WantLabel\' | translate }}</header><section><template ngFor #item [ngForOf]="items2" #i="index"><div class="jok_card_color color_{{item}}" (click)="callbacks?.onSelectWantColor(item)"><span>{{ (item == 4 ? \'colorselection.NoDominatedColor\' : \'colorselection.Select\') | translate }}</span></div></template></section></template><template [ngSwitchWhen]="4"><header><div><img src="/images/joklogo.png"></div>{{ \'colorselection.TakeLabel\' | translate }}</header><section><template ngFor #item [ngForOf]="items2" #i="index"><div class="jok_card_color color_{{item}}" (click)="callbacks?.onSelectTakeColor(item)"><span>{{ (item == 4 ? \'colorselection.NoDominatedColor\' : \'colorselection.Select\') | translate }}</span></div></template></section></template></div>'
                    }), 
                    __metadata('design:paramtypes', [])
                ], UIColorSelection);
                return UIColorSelection;
            }());
            exports_46("UIColorSelection", UIColorSelection);
        }
    }
});
System.register("Modules/Cards/downcards.provider", ['angular2/core'], function(exports_47, context_47) {
    "use strict";
    var __moduleName = context_47 && context_47.id;
    var core_29;
    var DownCardsProvider;
    return {
        setters:[
            function (core_29_1) {
                core_29 = core_29_1;
            }],
        execute: function() {
            DownCardsProvider = (function () {
                function DownCardsProvider() {
                    var _this = this;
                    this.animateEvent = new core_29.EventEmitter();
                    this.animateCompletedEvent = new core_29.EventEmitter();
                    this.animateCompletedCallback = null;
                    this.animateCompletedEvent.subscribe(function () {
                        _this.animateCompletedCallback && _this.animateCompletedCallback();
                    });
                }
                DownCardsProvider.prototype.animate = function (position, cb) {
                    this.animateEvent.emit(position);
                    this.animateCompletedCallback = cb;
                };
                DownCardsProvider = __decorate([
                    core_29.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], DownCardsProvider);
                return DownCardsProvider;
            }());
            exports_47("DownCardsProvider", DownCardsProvider);
        }
    }
});
System.register("Modules/Cards/downcards", ['angular2/core', 'angular2/common', "Modules/Cards/downcards.provider", "Modules/Cards/card"], function(exports_48, context_48) {
    "use strict";
    var __moduleName = context_48 && context_48.id;
    var core_30, common_2, downcards_provider_1, card_2;
    var UIDownCards;
    return {
        setters:[
            function (core_30_1) {
                core_30 = core_30_1;
            },
            function (common_2_1) {
                common_2 = common_2_1;
            },
            function (downcards_provider_1_1) {
                downcards_provider_1 = downcards_provider_1_1;
            },
            function (card_2_1) {
                card_2 = card_2_1;
            }],
        execute: function() {
            UIDownCards = (function () {
                function UIDownCards(downCardsProvider, zone) {
                    this.downCardsProvider = downCardsProvider;
                    this.zone = zone;
                    this.animateMap = {
                        animate_left: false,
                        animate_top: false,
                        animate_right: false,
                        animate_bottom: false,
                    };
                }
                UIDownCards.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.isAnimationEnabled)
                        return;
                    this.downCardsProvider.animateEvent.subscribe(function (x) {
                        _this.zone.run(function () {
                            _this.animatePosition = x;
                            _this.emptyAnimateMap();
                            setTimeout(function () { return _this.refreshAnimateMap(); }, 10);
                            clearTimeout(_this.completeTimeout);
                            _this.completeTimeout = setTimeout(function () { return _this.downCardsProvider.animateCompletedEvent.emit(null); }, 1200);
                        });
                    });
                    this.downCardsProvider.animateCompletedEvent.subscribe(function (x) {
                        _this.zone.run(function () {
                            _this.animatePosition = null;
                            _this.refreshAnimateMap();
                        });
                    });
                };
                UIDownCards.prototype.getZIndexes = function () {
                    if (this.lastActivePlayerPosition == 1)
                        return [3, 4, 1, 2];
                    if (this.lastActivePlayerPosition == 2)
                        return [2, 3, 4, 1];
                    if (this.lastActivePlayerPosition == 3)
                        return [1, 2, 3, 4];
                    return [4, 1, 2, 3];
                };
                UIDownCards.prototype.refreshAnimateMap = function () {
                    this.animateMap = {
                        animate_left: this.animatePosition == 2,
                        animate_top: this.animatePosition == 3,
                        animate_right: this.animatePosition == 4,
                        animate_bottom: this.animatePosition == 1,
                    };
                };
                UIDownCards.prototype.emptyAnimateMap = function () {
                    this.animateMap = {
                        animate_left: false,
                        animate_top: false,
                        animate_right: false,
                        animate_bottom: false,
                    };
                };
                __decorate([
                    core_30.Input(), 
                    __metadata('design:type', Array)
                ], UIDownCards.prototype, "source", void 0);
                __decorate([
                    core_30.Input(), 
                    __metadata('design:type', Number)
                ], UIDownCards.prototype, "lastActivePlayerPosition", void 0);
                __decorate([
                    core_30.Input(), 
                    __metadata('design:type', Boolean)
                ], UIDownCards.prototype, "isAnimationEnabled", void 0);
                __decorate([
                    core_30.Input(), 
                    __metadata('design:type', Boolean)
                ], UIDownCards.prototype, "mode2cards", void 0);
                UIDownCards = __decorate([
                    core_30.Component({
                        selector: 'downcards',
                        styles: [".downcards {  position: relative; }  .downcards card.player_1 {    position: absolute;    left: -7px;    top: 50px;    z-index: 4; }  .downcards.mode2cards card.player_1 {    left: -28px;    top: 0px; }  .downcards card.player_2 {    position: absolute;    left: -50px;    top: 0;    z-index: 1; }  .downcards card.player_3 {    position: absolute;    left: 3px;    top: -78px;    z-index: 2; }  .downcards card.player_4 {    position: absolute;    left: 50px;    top: 0;    z-index: 3; }  .downcards card.player_1:hover,  .downcards card.player_4:hover {    z-index: 10 !important; }  .downcards card.animate_left {    -webkit-animation: take-animate-left 0.4s linear 0.8s;    -moz-animation: take-animate-left 0.4s linear 0.8s;    -o-animation: take-animate-left 0.4s linear 0.8s;    animation: take-animate-left 0.4s linear 0.8s; }@-webkit-keyframes take-animate-left {  60% {    opacity: 1; }  100% {    left: -200px;    top: 0;    opacity: 0; } }@-moz-keyframes take-animate-left {  60% {    opacity: 1; }  100% {    left: -200px;    top: 0;    opacity: 0; } }@-o-keyframes take-animate-left {  60% {    opacity: 1; }  100% {    left: -200px;    top: 0;    opacity: 0; } }@keyframes take-animate-left {  60% {    opacity: 1; }  100% {    left: -200px;    top: 0;    opacity: 0; } }  .downcards card.animate_right {    -webkit-animation: take-animate-right 0.4s linear 0.8s;    -moz-animation: take-animate-right 0.4s linear 0.8s;    -o-animation: take-animate-right 0.4s linear 0.8s;    animation: take-animate-right 0.4s linear 0.8s; }@-webkit-keyframes take-animate-right {  60% {    opacity: 1; }  100% {    left: 200px;    top: 0;    opacity: 0; } }@-moz-keyframes take-animate-right {  60% {    opacity: 1; }  100% {    left: 200px;    top: 0;    opacity: 0; } }@-o-keyframes take-animate-right {  60% {    opacity: 1; }  100% {    left: 200px;    top: 0;    opacity: 0; } }@keyframes take-animate-right {  60% {    opacity: 1; }  100% {    left: 200px;    top: 0;    opacity: 0; } }  .downcards card.animate_top {    -webkit-animation: take-animate-top 0.4s linear 0.8s;    -moz-animation: take-animate-top 0.4s linear 0.8s;    -o-animation: take-animate-top 0.4s linear 0.8s;    animation: take-animate-top 0.4s linear 0.8s; }@-webkit-keyframes take-animate-top {  60% {    opacity: 1; }  100% {    left: 0;    top: -140px;    opacity: 0; } }@-moz-keyframes take-animate-top {  60% {    opacity: 1; }  100% {    left: 0;    top: -140px;    opacity: 0; } }@-o-keyframes take-animate-top {  60% {    opacity: 1; }  100% {    left: 0;    top: -140px;    opacity: 0; } }@keyframes take-animate-top {  60% {    opacity: 1; }  100% {    left: 0;    top: -140px;    opacity: 0; } }  .downcards card.animate_bottom {    -webkit-animation: take-animate-bottom 0.4s linear 0.8s;    -moz-animation: take-animate-bottom 0.4s linear 0.8s;    -o-animation: take-animate-bottom 0.4s linear 0.8s;    animation: take-animate-bottom 0.4s linear 0.8s; }@-webkit-keyframes take-animate-bottom {  60% {    opacity: 1; }  100% {    left: 0;    top: 140px;    opacity: 0; } }@-moz-keyframes take-animate-bottom {  60% {    opacity: 1; }  100% {    left: 0;    top: 140px;    opacity: 0; } }@-o-keyframes take-animate-bottom {  60% {    opacity: 1; }  100% {    left: 0;    top: 140px;    opacity: 0; } }@keyframes take-animate-bottom {  60% {    opacity: 1; }  100% {    left: 0;    top: 140px;    opacity: 0; } }"],
                        template: '<div class="downcards" [class.mode2cards]="mode2cards"><card [ngClass]="animateMap" *ngIf="source && source[0]" [card]="source[0]" class="player_1" [mini]="true" [style.zIndex]="getZIndexes()[0]"></card><card [ngClass]="animateMap" *ngIf="source && source[1]" [card]="source[1]" class="player_2" [mini]="true" [style.zIndex]="getZIndexes()[1]"></card><card [ngClass]="animateMap" *ngIf="source && source[2]" [card]="source[2]" class="player_3" [mini]="true" [style.zIndex]="getZIndexes()[2]"></card><card [ngClass]="animateMap" *ngIf="source && source[3]" [card]="source[3]" class="player_4" [mini]="true" [style.zIndex]="getZIndexes()[3]"></card></div>',
                        directives: [card_2.UICard, common_2.NgClass]
                    }), 
                    __metadata('design:paramtypes', [downcards_provider_1.DownCardsProvider, core_30.NgZone])
                ], UIDownCards);
                return UIDownCards;
            }());
            exports_48("UIDownCards", UIDownCards);
        }
    }
});
System.register("Modules/Chat/chat.model", [], function(exports_49, context_49) {
    "use strict";
    var __moduleName = context_49 && context_49.id;
    var ChatItem, ChatItemMode, ChatItemTemplate;
    return {
        setters:[],
        execute: function() {
            ChatItem = (function () {
                function ChatItem() {
                }
                return ChatItem;
            }());
            exports_49("ChatItem", ChatItem);
            (function (ChatItemMode) {
                ChatItemMode[ChatItemMode["Jok"] = 0] = "Jok";
                ChatItemMode[ChatItemMode["CurrentPlayer"] = 1] = "CurrentPlayer";
                ChatItemMode[ChatItemMode["player2"] = 2] = "player2";
                ChatItemMode[ChatItemMode["player3"] = 3] = "player3";
                ChatItemMode[ChatItemMode["player4"] = 4] = "player4";
            })(ChatItemMode || (ChatItemMode = {}));
            exports_49("ChatItemMode", ChatItemMode);
            (function (ChatItemTemplate) {
                ChatItemTemplate[ChatItemTemplate["Default"] = 0] = "Default";
                ChatItemTemplate[ChatItemTemplate["ServerPublicTable"] = 1] = "ServerPublicTable";
                ChatItemTemplate[ChatItemTemplate["ServerPrivateTable"] = 2] = "ServerPrivateTable";
                ChatItemTemplate[ChatItemTemplate["ServerInviteFriend"] = 3] = "ServerInviteFriend";
                ChatItemTemplate[ChatItemTemplate["GameStarting"] = 4] = "GameStarting";
            })(ChatItemTemplate || (ChatItemTemplate = {}));
            exports_49("ChatItemTemplate", ChatItemTemplate);
        }
    }
});
System.register("Modules/Chat/chat.provider", ['angular2/core', "Modules/Chat/chat.model"], function(exports_50, context_50) {
    "use strict";
    var __moduleName = context_50 && context_50.id;
    var core_31, chat_model_1;
    var ChatProvider;
    return {
        setters:[
            function (core_31_1) {
                core_31 = core_31_1;
            },
            function (chat_model_1_1) {
                chat_model_1 = chat_model_1_1;
            }],
        execute: function() {
            ChatProvider = (function (_super) {
                __extends(ChatProvider, _super);
                function ChatProvider() {
                    _super.apply(this, arguments);
                    this.smilesLocation = 'http://jok.io/content/images/skype/';
                    this.UseNewSmiles = true;
                    this.IsMobile = false;
                    this.Items = [];
                    this.smiles = {
                        'hi': ['\\(wave\\)'],
                        'smile': [':\\)'],
                        'bigsmile': [':D', ':d', ':დ'],
                        'itwasntme': ['\\(wasntme\\)'],
                        'angel': [],
                        'kiss': [':\\*'],
                        'tongueout': [':P', ':p', ':პ'],
                        'wait': [],
                        'punch': [],
                        'angry': [],
                        'crying': [';\\('],
                        'sadsmile': ['\\:\\('],
                        'headbang': [],
                        'heart': [],
                        'inlove': [],
                        'cool': ['8-\\)'],
                        'sleepy': [],
                        'music': [],
                        'bear': ['\\(hug\\)'],
                        'phone': [],
                        'coffee': [],
                        'handshake': [],
                        'yes': ['\\(y\\)'],
                        'no': ['\\(n\\)'],
                        'bandit': [],
                        'beer': [],
                        'blush': [],
                        'bow': [],
                        'brokenheart': [],
                        'bug': [],
                        'cake': ['\\(^\\)'],
                        'call': [],
                        'cash': ['\\($\\)'],
                        'clapping': [],
                        'dance': [],
                        'devil': [],
                        'doh': [],
                        'drink': ['\\(d\\)'],
                        'drunk': [],
                        'emo': [],
                        'envy': [],
                        'evilgrin': ['\\]:\\)'],
                        'flower': ['\\(f\\)'],
                        'fubar': [],
                        'giggle': [],
                        'happy': [],
                        'heidy': [],
                        'lipssealed': [':X', ':x', ':ხ'],
                        'mail': [],
                        'makeup': [],
                        'middlefinger': [],
                        'mmm': ['\\(mm\\)'],
                        'mooning': [],
                        'movie': [],
                        'muscle': ['\\(flex\\)'],
                        'dull': ['\\|:\\('],
                        'nerd': [],
                        'ninja': [],
                        'nod': [],
                        'party': [],
                        'pizza': ['\\(pi\\)'],
                        'poolparty': [],
                        'puke': [],
                        'rain': [],
                        'rock': [],
                        'rofl': [],
                        'shake': [],
                        'smirk': [],
                        'smoke': [],
                        'speechless': [':\\|'],
                        'star': ['\\(\\*\\)'],
                        'sun': [],
                        'surprised': [':O'],
                        'swear': [],
                        'sweating': ['\\(:\\|'],
                        'talking': ['\\(talk\\)'],
                        'thinking': ['\\(think\\)'],
                        'time': [],
                        'tmi': [],
                        'toivo': [],
                        'whew': [],
                        'wink': [';\\)'],
                        'wondering': [':^\\)'],
                        'worried': [':s', ':ს', ':შ'],
                        'yawn': [':o'],
                    };
                }
                ChatProvider.prototype.configure = function (userId, nick, avatarUrl) {
                    this.UserId = userId;
                    this.Nick = nick;
                    this.AvatarUrl = avatarUrl;
                };
                ChatProvider.prototype.sendMessage = function (message) {
                    this.emit('HideSmilesBox');
                    var id = this.getMessageId();
                    this.addItem(chat_model_1.ChatItemMode.CurrentPlayer, this.Nick, message, chat_model_1.ChatItemTemplate.Default, id, this.UserId, this.AvatarUrl);
                    this.emit('SendMessage', message, id);
                };
                ChatProvider.prototype.sendEmotion = function (smilename) {
                    this.emit('HideSmilesBox');
                    var id = this.getMessageId();
                    var message = '(' + smilename + ')';
                    this.addItem(chat_model_1.ChatItemMode.CurrentPlayer, this.Nick, message, chat_model_1.ChatItemTemplate.Default, id, this.UserId, this.AvatarUrl);
                    this.emit('SendMessage', message, id);
                };
                ChatProvider.prototype.addItem = function (mode, nick, message, template, messageId, userId, avatarUrl) {
                    if (template === void 0) { template = chat_model_1.ChatItemTemplate.Default; }
                    try {
                        if (!messageId)
                            messageId = this.getMessageId();
                        if (message) {
                            message = this.escapeHtml(message);
                        }
                        if (mode == chat_model_1.ChatItemMode.Jok)
                            this.removeJokItems();
                        var isSamePerson = (this.Items.length != 0) && (this.Items[this.Items.length - 1].Nick == nick);
                        if (!this.isNewItemRequired(mode) && isSamePerson) {
                            var item = this.Items[this.Items.length - 1];
                            if (item.MessageIds.filter(function (x) { return x === messageId; }).length)
                                return;
                            item.MessageIds.push(messageId);
                            item.Messages.push(message);
                            return;
                        }
                        var item = new chat_model_1.ChatItem();
                        item.Nick = nick;
                        item.MessageIds = [messageId];
                        item.Messages = [message];
                        item.Mode = mode;
                        item.Template = template;
                        item.UserId = userId;
                        item.AvatarUrl = avatarUrl;
                        item.Timestamp = new Date();
                        item.ShowHeader = !isSamePerson;
                        this.Items.push(item);
                    }
                    finally {
                        this.emit('ItemAdded', message, userId, mode);
                    }
                };
                ChatProvider.prototype.removeJokItems = function () {
                    var _this = this;
                    var removeItems = this.Items.filter(function (x) { return x.Mode == chat_model_1.ChatItemMode.Jok; });
                    if (!removeItems.length)
                        return;
                    removeItems.forEach(function (x) { return _this.Items.splice(_this.Items.indexOf(x), 1); });
                };
                ChatProvider.prototype.replaceSmiles = function (msg, replaceWithStatic) {
                    if (replaceWithStatic === void 0) { replaceWithStatic = true; }
                    if (!msg)
                        return '';
                    msg = String(msg);
                    try {
                        for (var name in this.smiles) {
                            var from = ['\\(', name, '\\)'].join('');
                            var to = this.buildImageUrl(name, replaceWithStatic);
                            msg = msg.replace(new RegExp(from, 'g'), to);
                            if (this.smiles[name].length > 0) {
                                for (var i = 0; i < this.smiles[name].length; i++) {
                                    from = this.smiles[name][i];
                                    msg = msg.replace(new RegExp(from, 'g'), to);
                                }
                            }
                        }
                    }
                    catch (err) {
                        console.log('replaceSmiles', msg, err);
                        return '';
                    }
                    return msg;
                };
                ChatProvider.prototype.reset = function () {
                    var _this = this;
                    if (!this.Items || !this.Items.length)
                        return;
                    this.Items.splice(0, this.Items.length);
                    setTimeout(function () { return _this.emit('Refresh'); }, 50);
                };
                ChatProvider.prototype.isNewItemRequired = function (mode) {
                    return mode in [chat_model_1.ChatItemMode.Jok];
                };
                ChatProvider.prototype.getMessageId = function () {
                    var s4 = function () {
                        return Math.floor((1 + Math.random()) * 0x10000)
                            .toString(16)
                            .substring(1);
                    };
                    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
                };
                ChatProvider.prototype.escapeHtml = function (s) {
                    return s;
                };
                ChatProvider.prototype.buildImageUrl = function (name, replaceWithStatic) {
                    var animatedImageUrl = this.UseNewSmiles ? ('/images/smilesV2/' + name + '.gif') : (this.smilesLocation + name + '.gif');
                    var script = 'var $this = $(this); setTimeout(function() { $this.parent().removeClass(\'animated\') }, 3500)';
                    if (!replaceWithStatic)
                        script = 'void(0)';
                    var imgTag = ['<span class="inchatbox animated"><span class="emotion ', name, '"></span><img src="', animatedImageUrl, '" class="smile" alt="', name, '" onload="javascript:', script, '" /></span>'].join('');
                    return imgTag;
                };
                ChatProvider = __decorate([
                    core_31.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ChatProvider);
                return ChatProvider;
            }(EventEmitter));
            exports_50("ChatProvider", ChatProvider);
        }
    }
});
System.register("Modules/Chat/emotions.pipe", ['angular2/core', "Modules/Chat/chat.provider"], function(exports_51, context_51) {
    "use strict";
    var __moduleName = context_51 && context_51.id;
    var core_32, chat_provider_1;
    var EmotionsPipe;
    return {
        setters:[
            function (core_32_1) {
                core_32 = core_32_1;
            },
            function (chat_provider_1_1) {
                chat_provider_1 = chat_provider_1_1;
            }],
        execute: function() {
            EmotionsPipe = (function () {
                function EmotionsPipe(chat) {
                    this.chat = chat;
                }
                EmotionsPipe.prototype.transform = function (value, args) {
                    if (!value)
                        return;
                    var skipReplacingWithStatic = args[0] && (args[0] == true);
                    return this.chat.replaceSmiles(value, !skipReplacingWithStatic);
                };
                EmotionsPipe = __decorate([
                    core_32.Pipe({ name: 'emotions' }), 
                    __metadata('design:paramtypes', [chat_provider_1.ChatProvider])
                ], EmotionsPipe);
                return EmotionsPipe;
            }());
            exports_51("EmotionsPipe", EmotionsPipe);
        }
    }
});
System.register("Common/clipboard", ['angular2/core'], function(exports_52, context_52) {
    "use strict";
    var __moduleName = context_52 && context_52.id;
    var core_33;
    var ClipboardDirective;
    return {
        setters:[
            function (core_33_1) {
                core_33 = core_33_1;
            }],
        execute: function() {
            ClipboardDirective = (function () {
                function ClipboardDirective(el) {
                    var $el = $(el.nativeElement);
                    var clipboard = new Clipboard(el.nativeElement);
                    $el.attr('title', 'Copy to clipboard');
                    $el.tooltip();
                    clipboard.on('success', function (e) {
                        $el.tooltip('destroy');
                        $el.attr('title', 'Copied!');
                        $el.tooltip('show');
                        e.clearSelection();
                        var timeout = $el.data('timeout');
                        clearTimeout(timeout);
                        timeout = setTimeout(function () { return $el.tooltip('destroy'); }, 3000);
                        $el.data('timeout', timeout);
                    });
                    clipboard.on('error', function (e) {
                        $el.tooltip('destroy');
                        $el.attr('title', 'Press Ctrl+C to copy');
                        $el.tooltip('show');
                        var timeout = $el.data('timeout');
                        clearTimeout(timeout);
                        timeout = setTimeout(function () { return $el.tooltip('destroy'); }, 7000);
                        $el.data('timeout', timeout);
                    });
                }
                ClipboardDirective = __decorate([
                    core_33.Directive({
                        selector: '[clipboard]'
                    }), 
                    __metadata('design:paramtypes', [core_33.ElementRef])
                ], ClipboardDirective);
                return ClipboardDirective;
            }());
            exports_52("ClipboardDirective", ClipboardDirective);
        }
    }
});
System.register("Modules/Chat/chatsmiles", ['angular2/core', "Modules/Chat/chat.provider"], function(exports_53, context_53) {
    "use strict";
    var __moduleName = context_53 && context_53.id;
    var core_34, chat_provider_2;
    var UIChatSmiles, SmilesGroup, SmileGroupItem;
    return {
        setters:[
            function (core_34_1) {
                core_34 = core_34_1;
            },
            function (chat_provider_2_1) {
                chat_provider_2 = chat_provider_2_1;
            }],
        execute: function() {
            UIChatSmiles = (function () {
                function UIChatSmiles(chat) {
                    this.chat = chat;
                    this.isRightAligned = false;
                    this.smilesGroups = [
                        new SmilesGroup('recent', 'chatsmiles.LabelRecent'),
                        new SmilesGroup('normal', 'chatsmiles.LabelEmotions'),
                        new SmilesGroup('vip', 'chatsmiles.LabelVIPEmotions')
                    ];
                    this.excludedSmiles = ['surprised'];
                }
                UIChatSmiles.prototype.ngOnInit = function () {
                    var recent = (localStorage.getItem('recentSmiles') || '').split(',');
                    var number = 0;
                    for (var name in this.chat.smiles) {
                        if (~this.excludedSmiles.indexOf(name))
                            continue;
                        number++;
                        var title = name;
                        var smilesGroup = this.smilesGroups[(number <= 24) ? 1 : 2];
                        smilesGroup.Items.push({
                            Name: name,
                            Title: title
                        });
                        if (~recent.indexOf(name)) {
                            this.smilesGroups[0].Items.push({
                                Name: name,
                                Title: title
                            });
                        }
                    }
                };
                UIChatSmiles.prototype.onSmileSelect = function (name) {
                    if (!this.isSmileAllowed(name))
                        return;
                    this.chat.sendEmotion(name);
                };
                UIChatSmiles.prototype.isSmileAllowed = function (name) {
                    if (this.isVIPMember)
                        return true;
                    if (this.smilesGroups[1].Items.filter(function (x) { return x.Name == name; }).length)
                        return true;
                    return false;
                };
                __decorate([
                    core_34.Input(), 
                    __metadata('design:type', Boolean)
                ], UIChatSmiles.prototype, "isVIPMember", void 0);
                __decorate([
                    core_34.Input(), 
                    __metadata('design:type', Boolean)
                ], UIChatSmiles.prototype, "isRightAligned", void 0);
                UIChatSmiles = __decorate([
                    core_34.Component({
                        selector: 'chatsmiles',
                        styles: [".chatsmiles {  width: 270px;  height: 277px;  background: #34495E;  box-shadow: 0 0 2px rgba(0, 0, 0, 0.7);  z-index: 900;  border-radius: 3px;  margin: 5px;  margin-bottom: 0;  padding-top: 10px;  overflow-x: hidden;  overflow-y: auto; }  .chatsmiles section {    margin-bottom: 8px; }  .chatsmiles .smiles_container, .chatsmiles .vip_smiles_container {    margin: 5px;    margin-top: 0;    margin-left: 10px; }  .chatsmiles .more,  .chatsmiles .less {    float: right;    color: gray;    margin-right: 10px;    cursor: pointer;    font-size: 12px; }  .chatsmiles .more:hover,  .chatsmiles .less:hover {    color: blue;    text-decoration: underline; }  .chatsmiles .vip_smiles {    display: none; }  .chatsmiles .item {    width: 40px;    height: 40px;    border: 1px solid transparent;    cursor: pointer;    display: inline-block;    border-radius: 5px;    margin-bottom: 2px; }  .chatsmiles .item:hover {    background: rgba(255, 255, 255, 0.2); }  .chatsmiles .vip_smiles_container.disabled .item {    cursor: default; }  .chatsmiles .vip_smiles_container.disabled .item span {    background-image: url(\"/images/smiles/emotionsV2_disabled.png\");    opacity: .6; }  .chatsmiles .vip_smiles_container .item span.disabled {    background-image: url(\"/images/smiles/emotionsV2_disabled.png\");    opacity: .6; }  .chatsmiles .vip_smiles_container.disabled .item:hover {    border: 1px solid transparent;    border-radius: 0px;    background: transparent; }  .chatsmiles .headline {    margin-bottom: 3px;    text-align: center;    color: white; }  .chatsmiles .headline.vip {    margin-top: 100px;    text-align: left;    margin-left: 10px;    color: #808080;    font-weight: bold;    font-size: 12px; }  .chatsmiles .emotion {    margin-left: 0px;    margin-top: 0px; }.arrow_box {  position: relative;  background: #34495E;  margin-bottom: 5px; }  .arrow_box:after {    top: 100%;    left: 50%;    border: solid transparent;    content: \" \";    height: 0;    width: 0;    position: absolute;    pointer-events: none;    border-color: rgba(52, 73, 94, 0);    border-top-color: #34495E;    border-width: 10px;    margin-left: -10px; }  .arrow_box.right:after {    right: 14px;    left: unset;    margin-top: -1px; }"],
                        template: '<div class="chatsmiles ios-scroll"><div *ngFor="#group of smilesGroups"><section *ngIf="group.Items.length"><div class="headline"><span>{{group.Name | translate}}</span></div><div class="smiles_container" [class.vip_smiles_container]="group.Key == \'vip\'" [class.disabled]="(group.Key == \'vip\') && !isVIPMember"><div *ngFor="#item of group.Items" (click)="onSmileSelect(item.Name)" class="item" data-toggle="tooltip" data-delay="500" data-placement="top" title="({{ item.Title }})"><span class="emotion {{item.Name}}" [class.disabled]="!isSmileAllowed(item.Name)"></span></div></div></section></div></div><div class="arrow_box" [class.right]="isRightAligned"></div>'
                    }), 
                    __metadata('design:paramtypes', [chat_provider_2.ChatProvider])
                ], UIChatSmiles);
                return UIChatSmiles;
            }());
            exports_53("UIChatSmiles", UIChatSmiles);
            SmilesGroup = (function () {
                function SmilesGroup(Key, Name) {
                    this.Key = Key;
                    this.Name = Name;
                    this.Items = [];
                }
                return SmilesGroup;
            }());
            SmileGroupItem = (function () {
                function SmileGroupItem() {
                }
                return SmileGroupItem;
            }());
        }
    }
});
System.register("Modules/Chat/chatbox", ['angular2/core', 'angular2/common', "Common/clipboard", "Modules/Chat/emotions.pipe", "Modules/Chat/chat.provider", "Modules/Chat/chatsmiles"], function(exports_54, context_54) {
    "use strict";
    var __moduleName = context_54 && context_54.id;
    var core_35, common_3, clipboard_1, emotions_pipe_1, chat_provider_3, chatsmiles_1;
    var UIChatBox;
    return {
        setters:[
            function (core_35_1) {
                core_35 = core_35_1;
            },
            function (common_3_1) {
                common_3 = common_3_1;
            },
            function (clipboard_1_1) {
                clipboard_1 = clipboard_1_1;
            },
            function (emotions_pipe_1_1) {
                emotions_pipe_1 = emotions_pipe_1_1;
            },
            function (chat_provider_3_1) {
                chat_provider_3 = chat_provider_3_1;
            },
            function (chatsmiles_1_1) {
                chatsmiles_1 = chatsmiles_1_1;
            }],
        execute: function() {
            UIChatBox = (function () {
                function UIChatBox(elem, chat) {
                    this.elem = elem;
                    this.chat = chat;
                    this.jokImageUrl = '/Images/harley.png';
                    this.isMessageBoxFixed = true;
                    this.source = chat.Items;
                }
                UIChatBox.prototype.ngOnInit = function () {
                    var _this = this;
                    this.chat.on('HideSmilesBox', function () { return _this.showSmiles = false; });
                    this.chat.on('ItemAdded', function () { _this.refreshMessageBoxFixed(); _this.scrollToBottom(); });
                    this.chat.on('Refresh', function () { _this.refreshMessageBoxFixed(); _this.scrollToBottom(); });
                    this.chat.on('SendMessage', function () { _this.refreshMessageBoxFixed(); _this.scrollToBottom(); });
                    this.refreshMessageBoxFixed();
                };
                UIChatBox.prototype.onGlobalClick = function (ev) {
                };
                UIChatBox.prototype.onGlobalKeyUp = function (ev) {
                    this.showSmiles = false;
                    if (ev.keyCode == 13 || ev.keyCode == 67) {
                        $(this.elem.nativeElement).find('.new-message').focus();
                        return;
                    }
                    if (ev.keyCode == 27) {
                        return;
                    }
                };
                UIChatBox.prototype.onKeyUp = function (ev) {
                    if (ev.keyCode == 13) {
                        if (!this.messageText) {
                            $(this.elem.nativeElement).find('.new-message').blur();
                            return;
                        }
                        this.sendMessage(this.messageText);
                        this.messageText = '';
                        return;
                    }
                    if (ev.keyCode == 27) {
                        this.messageText = '';
                        $(this.elem.nativeElement).find('.new-message').blur();
                        this.showSmiles = false;
                        return;
                    }
                };
                UIChatBox.prototype.onSmilesClick = function () {
                    this.showSmiles = !this.showSmiles;
                };
                UIChatBox.prototype.refreshMessageBoxFixed = function () {
                    this.isMessageBoxFixed = $(this.elem.nativeElement).find('.chat-history').outerHeight() < $(window).height() - 100;
                };
                UIChatBox.prototype.shareTwitter = function (shareUrl) {
                    var text = '#jokchellenge';
                    var url = "https://twitter.com/intent/tweet?via=JokEntertainers&text=" + encodeURIComponent(text) + "&source=tweetbutton&url=" + encodeURIComponent(shareUrl);
                    var _openWindow = function (url) {
                        var g = 640;
                        var m = 460;
                        var f = window.screen.height / 2 - (m / 2);
                        var i = window.screen.width / 2 - (g / 2);
                        var l = window.open(url, "Share", "status=1,height=" + m + ",width=" + g + ",top=" + f + ",left=" + i + ",resizable=0");
                    };
                    _openWindow(url);
                };
                UIChatBox.prototype.sendMessage = function (msg) {
                    this.chat.sendMessage(msg);
                    this.scrollToBottom();
                    this.refreshMessageBoxFixed();
                };
                UIChatBox.prototype.scrollToBottom = function () {
                    try {
                        var $el = $(this.elem.nativeElement).find('.chatbox');
                        $($el).stop();
                        $($el).animate({ scrollTop: $el[0].scrollHeight });
                    }
                    catch (err) { }
                };
                __decorate([
                    core_35.Input(), 
                    __metadata('design:type', Number)
                ], UIChatBox.prototype, "gameStartingSeconds", void 0);
                __decorate([
                    core_35.Input(), 
                    __metadata('design:type', Boolean)
                ], UIChatBox.prototype, "isVIPMember", void 0);
                __decorate([
                    core_35.Input(), 
                    __metadata('design:type', Boolean)
                ], UIChatBox.prototype, "onlyEmotions", void 0);
                UIChatBox = __decorate([
                    core_35.Component({
                        host: {
                            '(document:keyup)': 'onGlobalKeyUp($event)',
                            '(document:click)': 'onGlobalClick($event)',
                        },
                        selector: 'chatbox',
                        styles: ["/*#0B9A49;*/.chatbox {  width: 100%;  height: 100%;  position: absolute;  overflow-y: scroll;  overflow-x: hidden; }  .chatbox input.new-message {    width: 100%;    padding: 10px 15px;    padding-right: 30px;    color: white;    font-size: 14px;    background: transparent;    -moz-transition: all linear 70ms;    -o-transition: all linear 70ms;    -webkit-transition: all linear 70ms;    transition: all linear 70ms;    border-radius: 100px;    border: 1px solid #0B9A49; }    .chatbox input.new-message::-webkit-input-placeholder {      /* WebKit, Blink, Edge */      color: rgba(255, 255, 255, 0.28); }    .chatbox input.new-message:-moz-placeholder {      /* Mozilla Firefox 4 to 18 */      color: rgba(255, 255, 255, 0.28);      opacity: 1; }    .chatbox input.new-message::-moz-placeholder {      /* Mozilla Firefox 19+ */      color: rgba(255, 255, 255, 0.28);      opacity: 1; }    .chatbox input.new-message:-ms-input-placeholder {      /* Internet Explorer 10-11 */      color: rgba(255, 255, 255, 0.28); }    .chatbox input.new-message:placeholder-shown {      /* Standard (https://drafts.csswg.org/selectors-4/#placeholder) */      color: rgba(255, 255, 255, 0.28); }    .chatbox input.new-message:hover:not(:disabled), .chatbox input.new-message:focus:not(:disabled) {      border: 1px solid #027936;      background: #45BD79; }  .chatbox chatsmiles {    bottom: 100%;    position: absolute;    left: 9px;    z-index: 2000; }.chat-area .chat {  border-top-right-radius: 5px;  border-bottom-right-radius: 5px;  color: #434651; }  .chat-area .chat .emptyheight {    min-height: 310px; }  .chat-area .chat .chat-history {    padding: 23px 15px 30px;    min-height: 310px; }    .chat-area .chat .chat-history ul {      padding: 0;      margin: 0;      list-style: none; }    .chat-area .chat .chat-history .message-data {      margin-bottom: 10px; }      .chat-area .chat .chat-history .message-data > i {        display: none; }    .chat-area .chat .chat-history .message-data-name {      color: white; }    .chat-area .chat .chat-history .message-data-time {      color: white;      padding-left: 6px;      display: none; }    .chat-area .chat .chat-history li.is-first {      margin-top: 20px; }    .chat-area .chat .chat-history li .message {      box-shadow: 0 0 2px rgba(0, 0, 0, 0.39);      color: white;      padding: 12px 20px;      line-height: 26px;      border-radius: 7px;      margin-bottom: 5px;      max-width: 90%;      position: relative;      font-size: 14px;      background: #45BD79;      width: auto; }      .chat-area .chat .chat-history li .message.is-first {        /*&:after {\n                        bottom: 100%;\n                        left: 25px;\n                        border: solid transparent;\n                        content: \" \";\n                        height: 0;\n                        width: 0;\n                        position: absolute;\n                        pointer-events: none;\n                        border-bottom-color: $green;\n                        border-width: 10px;\n                        margin-left: -10px;\n                    }*/ }        .chat-area .chat .chat-history li .message.is-first:after {          content: '';          position: absolute;          border-style: solid;          border-width: 0 6px 7px;          border-color: #45BD79 transparent;          display: block;          width: 0;          z-index: 1;          top: -7px;          left: 15px; }        .chat-area .chat .chat-history li .message.is-first:before {          content: '';          position: absolute;          border-style: solid;          border-width: 0 6px 7px;          border-color: #229653 transparent;          display: block;          width: 0;          z-index: 0;          top: -8px;          left: 15px; }    .chat-area .chat .chat-history li.mode_0 img {      width: 40px;      margin-bottom: 5px; }    .chat-area .chat .chat-history li.mode_0 .input-group {      margin-top: 10px; }    .chat-area .chat .chat-history li.mode_0 .share-items {      margin-top: 15px;      text-align: center; }      .chat-area .chat .chat-history li.mode_0 .share-items a {        color: white;        font-size: 28px;        margin-left: 4px;        margin-right: 4px;        -moz-transition: .1s;        -o-transition: .1s;        -webkit-transition: .1s;        transition: .1s; }        .chat-area .chat .chat-history li.mode_0 .share-items a:hover {          color: #f3f3f3; }    .chat-area .chat .chat-history li.mode_0 .message-data {      text-align: right; }    .chat-area .chat .chat-history li.mode_0 .message {      box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);      background: #4389AB;      float: right;      text-align: center; }      .chat-area .chat .chat-history li.mode_0 .message.is-first:before {        left: auto;        right: 12px; }      .chat-area .chat .chat-history li.mode_0 .message.is-first:after {        left: auto;        right: 12px;        border-bottom-color: #4389AB; }    .chat-area .chat .chat-history li.mode_1 .message {      background: #45BD79;      float: left; }      .chat-area .chat .chat-history li.mode_1 .message.is-first:after {        border-bottom-color: #45BD79; }    .chat-area .chat .chat-history li.mode_2 .message-data,    .chat-area .chat .chat-history li.mode_3 .message-data,    .chat-area .chat .chat-history li.mode_4 .message-data {      text-align: right; }    .chat-area .chat .chat-history li.mode_2 .message,    .chat-area .chat .chat-history li.mode_3 .message,    .chat-area .chat .chat-history li.mode_4 .message {      background: #45BD79;      float: right; }      .chat-area .chat .chat-history li.mode_2 .message.is-first:before,      .chat-area .chat .chat-history li.mode_3 .message.is-first:before,      .chat-area .chat .chat-history li.mode_4 .message.is-first:before {        left: auto;        right: 12px; }      .chat-area .chat .chat-history li.mode_2 .message.is-first:after,      .chat-area .chat .chat-history li.mode_3 .message.is-first:after,      .chat-area .chat .chat-history li.mode_4 .message.is-first:after {        left: auto;        right: 12px;        border-bottom-color: #45BD79; }.chat-area .chat-message {  padding: 20px 15px;  padding-top: 0;  position: relative; }  .chat-area .chat-message.is-fixed {    position: absolute;    left: 0;    right: 0;    bottom: 0; }  .chat-area .chat-message .sendemotion {    position: absolute;    right: 0;    top: 0;    font-size: 20px;    color: #60C38A;    cursor: pointer;    padding: 4px 23px 4px 23px; }    .chat-area .chat-message .sendemotion:hover {      color: #34495E; }  .chat-area .chat-message input.disabled {    display: none; }  .chat-area .chat-message.emotions_only input {    display: none; }  .chat-area .chat-message.emotions_only .sendemotion {    right: 38%; }  .chat-area .chat-message.emotions_only input.disabled {    display: block; }.clearfix:after {  visibility: hidden;  display: block;  font-size: 0;  content: \" \";  clear: both;  height: 0; }"],
                        template: '<div class="chatbox ios-scroll"><div class="chat-area"><div class="chat"><div class="chat-history"><ul><li *ngFor="#item of source" [ngSwitch]="item.Template" class="clearfix mode_{{item.Mode}} {{item.ShowHeader ? \'is-first\' : \'\'}}"><div *ngSwitchWhen="0"><div *ngIf="item.ShowHeader" class="message-data"><span class="message-data-time">{{item.Timestamp}}</span> <span class="message-data-name">{{item.Nick}}</span> <i class="fa fa-circle me"></i></div><div class="message {{item.ShowHeader ? \'is-first\' : \'\'}}"><div *ngFor="#message of item.Messages" [innerHTML]="message | emotions"></div></div></div><div *ngSwitchWhen="1"><div *ngIf="item.ShowHeader" class="message-data"><span class="message-data-time">{{item.Timestamp}}</span> <span class="message-data-name">{{item.Nick}}</span> <i class="fa fa-circle me"></i> <img [src]="jokImageUrl"></div><div class="message {{item.ShowHeader ? \'is-first\' : \'\'}}">{{ \'chatbox.PublicTableTitle\' | translate | emotions }}</div></div><div *ngSwitchWhen="2"><div *ngIf="item.ShowHeader" class="message-data"><span class="message-data-time">{{item.Timestamp}}</span> <span class="message-data-name">{{item.Nick}}</span> <i class="fa fa-circle me"></i> <img [src]="jokImageUrl"></div><div class="message {{item.ShowHeader ? \'is-first\' : \'\'}}"><div [innerHtml]="\'chatbox.PrivateTableTitle\' | translate | emotions"></div><div class="input-group"><input #shareTableLink type="text" class="form-control" [value]="item.Messages[0]" readonly id="ShareTableLink"> <span class="input-group-btn"><button class="btn btn-default" type="button" clipboard data-clipboard-target="#ShareTableLink" data-toggle="tooltip" data-placement="top">{{ \'common.Copy\' | translate }}</button></span></div><div class="share-items"><a href="javascript:void(0)" *ngIf="false"><i class="fa fa-facebook-square"></i></a> <a href="javascript:void(0)" (click)="shareTwitter(shareTableLink.value)"><i class="fa fa-twitter-square"></i></a> <a href="javascript:void(0)" *ngIf="false"><i class="fa fa-odnoklassniki-square"></i></a></div></div></div><div *ngSwitchWhen="3"><div *ngIf="item.ShowHeader" class="message-data"><span class="message-data-time">{{item.Timestamp}}</span> <span class="message-data-name">{{item.Nick}}</span> <i class="fa fa-circle me"></i></div><div class="message {{item.ShowHeader ? \'is-first\' : \'\'}}">{{item.Messages[0]}} let\'s be friends<br></div></div><div *ngSwitchWhen="4"><div *ngIf="item.ShowHeader" class="message-data"><span class="message-data-time">{{item.Timestamp}}</span> <span class="message-data-name">{{item.Nick}}</span> <i class="fa fa-circle me"></i> <img [src]="jokImageUrl"></div><div class="message {{item.ShowHeader ? \'is-first\' : \'\'}}">{{ \'chatbox.GameStarting\' | translate : { seconds: gameStartingSeconds } }}</div></div></li></ul></div><div class="chat-message clearfix" [class.is-fixed]="isMessageBoxFixed" [class.emotions_only]="onlyEmotions"><input type="text" class="form-control new-message" [(ngModel)]="messageText" [placeholder]="\'chatbox.TypeMessageHere\' | translate" (keyup)="onKeyUp($event)"> <input type="text" class="form-control new-message disabled" disabled><div class="sendemotion" data-toggle="tooltip" data-placement="top" [title]="\'chatbox.SendEmotion\' | translate" (click)="onSmilesClick()"><i class="fa fa-smile-o"></i></div><chatsmiles *ngIf="showSmiles" [isRightAligned]="!onlyEmotions" [isVIPMember]="isVIPMember"></chatsmiles></div></div></div></div>',
                        directives: [common_3.NgClass, clipboard_1.ClipboardDirective, chatsmiles_1.UIChatSmiles],
                        pipes: [emotions_pipe_1.EmotionsPipe]
                    }), 
                    __metadata('design:paramtypes', [core_35.ElementRef, chat_provider_3.ChatProvider])
                ], UIChatBox);
                return UIChatBox;
            }());
            exports_54("UIChatBox", UIChatBox);
        }
    }
});
System.register("Modules/Joker/Providers/ViewModelProvider", ['angular2/core', 'Jok/Cards', "Modules/Joker/Models/All"], function(exports_55, context_55) {
    "use strict";
    var __moduleName = context_55 && context_55.id;
    var core_36, Cards_1, All_4;
    var ViewModelProvider, MockViewModelProvider, mockViewModel, ViewModel;
    return {
        setters:[
            function (core_36_1) {
                core_36 = core_36_1;
            },
            function (Cards_1_1) {
                Cards_1 = Cards_1_1;
            },
            function (All_4_1) {
                All_4 = All_4_1;
            }],
        execute: function() {
            ViewModelProvider = (function () {
                function ViewModelProvider() {
                    this.VM = this.getEmpty();
                    window.VM = this.VM;
                }
                ViewModelProvider.prototype.getEmpty = function () {
                    var result = new ViewModel();
                    result.Players = [];
                    result.ResultPlayers = [];
                    result.PositionSelectionPlayers = [];
                    result.CurrentPlayerCards = [];
                    result.CurrentPlayer = new All_4.GamePlayer();
                    result.DownCards = [null, null, null, null];
                    result.Results = ViewModelProvider.EmptyResults();
                    result.ChatItems = [];
                    result.DominatedColor = null;
                    return result;
                };
                ViewModelProvider.EmptyResults = function (existingPlayers) {
                    function mockResultSectionPlayer() {
                        return {
                            Items: [
                                All_4.ResultItem.Create(null, null),
                                All_4.ResultItem.Create(null, null),
                                All_4.ResultItem.Create(null, null),
                                All_4.ResultItem.Create(null, null),
                                All_4.ResultItem.Create(null, null),
                                All_4.ResultItem.Create(null, null),
                                All_4.ResultItem.Create(null, null),
                                All_4.ResultItem.Create(null, null),
                            ],
                            Total: null,
                            IsBonus: false,
                            IsRemoved: false,
                            UserID: 1,
                            Position: 1,
                            BonusScore: 0
                        };
                    }
                    function mockResultSection() {
                        return {
                            Players: [
                                mockResultSectionPlayer(),
                                mockResultSectionPlayer(),
                                mockResultSectionPlayer(),
                                mockResultSectionPlayer(),
                            ],
                            IsActive: false
                        };
                    }
                    var mockResults = {
                        Sections: [
                            mockResultSection(),
                            mockResultSection(),
                            mockResultSection(),
                            mockResultSection()
                        ]
                    };
                    if (existingPlayers && existingPlayers.length == 4) {
                        mockResults.Sections.forEach(function (y) { return y.Players.forEach(function (p, i) {
                            p.UserID = existingPlayers[i].UserID;
                            p.Position = existingPlayers[i].Position;
                        }); });
                    }
                    return mockResults;
                };
                ViewModelProvider.MockResults = function (existingPlayers) {
                    function mockResultSectionPlayer() {
                        return {
                            Items: [
                                All_4.ResultItem.Create(2, 200, false, false),
                                All_4.ResultItem.Create(3, -100, false, false),
                                All_4.ResultItem.Create(1, 100, true, false),
                                All_4.ResultItem.Create(1, 100, false, true),
                                All_4.ResultItem.Create(2, 20, false, false),
                                All_4.ResultItem.Create(2, 30, false, false),
                                All_4.ResultItem.Create(2, 40, false, false),
                                All_4.ResultItem.Create(2, 10, false, false),
                            ],
                            Total: 0,
                            IsBonus: true,
                            IsRemoved: true,
                            UserID: 1,
                            Position: 1,
                            BonusScore: 0
                        };
                    }
                    function mockResultSection() {
                        return {
                            Players: [
                                mockResultSectionPlayer(),
                                mockResultSectionPlayer(),
                                mockResultSectionPlayer(),
                                mockResultSectionPlayer(),
                            ],
                            IsActive: true
                        };
                    }
                    var mockResults = {
                        Sections: [
                            mockResultSection(),
                            mockResultSection(),
                            mockResultSection(),
                            mockResultSection()
                        ]
                    };
                    if (existingPlayers && existingPlayers.length == 4) {
                        mockResults.Sections.forEach(function (y) { return y.Players.forEach(function (p, i) {
                            p.UserID = existingPlayers[i].UserID;
                            p.Position = existingPlayers[i].Position;
                        }); });
                    }
                    return mockResults;
                };
                ViewModelProvider = __decorate([
                    core_36.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ViewModelProvider);
                return ViewModelProvider;
            }());
            exports_55("ViewModelProvider", ViewModelProvider);
            MockViewModelProvider = (function () {
                function MockViewModelProvider() {
                    this.VM = JSON.parse(JSON.stringify(mockViewModel));
                    window.VM = this.VM;
                }
                MockViewModelProvider = __decorate([
                    core_36.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], MockViewModelProvider);
                return MockViewModelProvider;
            }());
            exports_55("MockViewModelProvider", MockViewModelProvider);
            mockViewModel = {
                IsConnectionClosed: false,
                Status: All_4.TableStatuses.Started,
                NotificationType: All_4.NotificationType.GameStarting,
                TableChannel: '',
                TableType: 1,
                InviteLink: '',
                PositionSelectionPlayers: [
                    All_4.GamePlayer.CreateMock(32, 'PlayerX', 'https://jok.io/portal/avatar/~base_skin_01b~Clothes_14~Eyes_01~Mouth_02~Eyebrows_07~~Hair_03~Accessories_03~8587496071003593649'),
                    All_4.GamePlayer.CreateMock(14073, 'Test', 'https://jok.io/portal/avatar/~base_skin_01b~Clothes_06~Eyes_10~Mouth_04~Eyebrows_14~~Hair_13~Accessories_03~8588257384446650451'),
                    All_4.GamePlayer.CreateMock(1080267, 'Babt', 'https://jok.io/portal/avatar/~base_skin_01b~Clothes_18~Eyes_02~Mouth_06~Eyebrows_07~Facialhair_13~Hair_07~~8587909997471245499'),
                    All_4.GamePlayer.CreateMock(1080260, 'Omg', 'https://jok.io/portal/avatar/~base_skin_01b~Clothes_04~Eyes_06~Mouth_06~Eyebrows_09~Facialhair_03~Hair_09~Accessories_18~8587815618725741787'),
                ],
                ActivePlayerUserID: 32,
                CurrentPlayer: All_4.GamePlayer.CreateMock(32, 'PlayerX', 'https://jok.io/portal/avatar/~base_skin_01b~Clothes_14~Eyes_01~Mouth_02~Eyebrows_07~~Hair_03~Accessories_03~8587496071003593649'),
                Players: [
                    All_4.GamePlayer.CreateMock(32, 'PlayerX', 'https://jok.io/portal/avatar/~base_skin_01b~Clothes_14~Eyes_01~Mouth_02~Eyebrows_07~~Hair_03~Accessories_03~8587496071003593649'),
                    All_4.GamePlayer.CreateMock(14073, 'Test', 'https://jok.io/portal/avatar/~base_skin_01b~Clothes_06~Eyes_10~Mouth_04~Eyebrows_14~~Hair_13~Accessories_03~8588257384446650451'),
                    All_4.GamePlayer.CreateMock(1080267, 'Babt', 'https://jok.io/portal/avatar/~base_skin_01b~Clothes_18~Eyes_02~Mouth_06~Eyebrows_07~Facialhair_13~Hair_07~~8587909997471245499'),
                    All_4.GamePlayer.CreateMock(1080260, 'Omg', 'https://jok.io/portal/avatar/~base_skin_01b~Clothes_04~Eyes_06~Mouth_06~Eyebrows_09~Facialhair_03~Hair_09~Accessories_18~8587815618725741787'),
                ],
                ResultPlayers: [
                    All_4.GamePlayer.CreateMock(32, 'PlayerX', 'https://jok.io/portal/avatar/~base_skin_01b~Clothes_14~Eyes_01~Mouth_02~Eyebrows_07~~Hair_03~Accessories_03~8587496071003593649'),
                    All_4.GamePlayer.CreateMock(14073, 'Test', 'https://jok.io/portal/avatar/~base_skin_01b~Clothes_06~Eyes_10~Mouth_04~Eyebrows_14~~Hair_13~Accessories_03~8588257384446650451'),
                    All_4.GamePlayer.CreateMock(1080267, 'Babt', 'https://jok.io/portal/avatar/~base_skin_01b~Clothes_18~Eyes_02~Mouth_06~Eyebrows_07~Facialhair_13~Hair_07~~8587909997471245499', false),
                    All_4.GamePlayer.CreateMock(1080260, 'Omg', 'https://jok.io/portal/avatar/~base_skin_01b~Clothes_04~Eyes_06~Mouth_06~Eyebrows_09~Facialhair_03~Hair_09~Accessories_18~8587815618725741787'),
                ],
                IsCardSelectionEnabled: true,
                IsCurrentCardsVisible: true,
                ConnectionCloseReason: '',
                CurrentPlayerCards: [
                    Cards_1.CardType.Create(Cards_1.CardColor.Purple, Cards_1.CardLevel._6),
                    Cards_1.CardType.Create(Cards_1.CardColor.Purple, Cards_1.CardLevel._9),
                    Cards_1.CardType.Create(Cards_1.CardColor.Purple, Cards_1.CardLevel.Queen, true),
                    Cards_1.CardType.Create(Cards_1.CardColor.Purple, Cards_1.CardLevel.Ace, true),
                    Cards_1.CardType.Create(Cards_1.CardColor.Blue, Cards_1.CardLevel._8, true),
                    Cards_1.CardType.Create(Cards_1.CardColor.Blue, Cards_1.CardLevel.Valet, true),
                    Cards_1.CardType.Create(Cards_1.CardColor.Blue, Cards_1.CardLevel.Queen),
                    Cards_1.CardType.Create(Cards_1.CardColor.Orange, Cards_1.CardLevel._10),
                    Cards_1.CardType.Create(Cards_1.CardColor.Red, Cards_1.CardLevel.King),
                ],
                LastTakenCards: [
                    Cards_1.CardType.Create(Cards_1.CardColor.Purple, Cards_1.CardLevel._6),
                    Cards_1.CardType.Create(Cards_1.CardColor.Purple, Cards_1.CardLevel._9),
                    Cards_1.CardType.Create(Cards_1.CardColor.Purple, Cards_1.CardLevel.Queen, false),
                    Cards_1.CardType.Create(Cards_1.CardColor.Purple, Cards_1.CardLevel.Ace)
                ],
                DownCards: [
                    null,
                    null,
                    null,
                    null,
                ],
                DownCardsAnimated: [
                    null,
                    null,
                    null,
                    null,
                ],
                Declaration: null,
                ColorSelectionMode: null,
                IsFirstCard: true,
                DominatedColor: Cards_1.CardColor.Red,
                IsTableInfoReceived: true,
                Dring: -200,
                Results: ViewModelProvider.MockResults(),
                FinishInfo: {
                    Players: [
                        {
                            UserID: 32,
                            Nick: 'PlayerX',
                            IsOnline: true,
                            Place: 1,
                            Score: 27.2,
                            Points: 272,
                            Rating: 23
                        },
                        {
                            UserID: 33,
                            Nick: 'Test',
                            IsOnline: true,
                            Place: 2,
                            Score: 10.2,
                            Points: 102,
                            Rating: 11
                        },
                        {
                            UserID: 34,
                            Nick: 'Babt',
                            IsOnline: false,
                            Place: 3,
                            Score: 9.1,
                            Points: 91,
                            Rating: '~'
                        },
                        {
                            UserID: 35,
                            Nick: 'Omg',
                            IsOnline: true,
                            Place: 4,
                            Score: 7.3,
                            Points: 73,
                            Rating: -21
                        }
                    ],
                    Key: '123',
                    Achievements: {
                        Place1: false,
                        Place2: false,
                        Place3: true,
                        Place4: false,
                        Premia: 0,
                        Full9: 0
                    },
                    AddedStars: 2,
                    NewStarsCount: 17,
                    IsLowLevelPlayersGame: false,
                    IsIgnored: false,
                    PlaceStars: 5
                },
                GameStartSeconds: 10,
                LastActivePlayerPosition: 1,
                ChatItems: [],
                Player2CardsCount: 9,
                Player3CardsCount: 3,
                Player4CardsCount: 7,
                BalanceNumber: -7
            };
            ViewModel = (function () {
                function ViewModel() {
                }
                return ViewModel;
            }());
            exports_55("ViewModel", ViewModel);
        }
    }
});
System.register("Modules/Joker/Providers/GameProvider", ['angular2/core', 'angular2/platform/browser', 'angular2/router', 'ng2-translate', 'Jok/Communication', 'Jok/Cards', 'Jok/Chat', 'Jok/Platforms', 'Jok/Music', "Common/Providers/All", "Modules/Joker/Providers/ViewModelProvider", "Modules/Joker/Models/All"], function(exports_56, context_56) {
    "use strict";
    var __moduleName = context_56 && context_56.id;
    var core_37, browser_1, router_6, ng2_translate_2, Communication_1, Cards_2, Chat_1, Platforms_4, Music_1, All_5, ViewModelProvider_1, All_6;
    var GameProvider, PlayAudioModes, PostJokerGamePlayerResult;
    return {
        setters:[
            function (core_37_1) {
                core_37 = core_37_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (router_6_1) {
                router_6 = router_6_1;
            },
            function (ng2_translate_2_1) {
                ng2_translate_2 = ng2_translate_2_1;
            },
            function (Communication_1_1) {
                Communication_1 = Communication_1_1;
            },
            function (Cards_2_1) {
                Cards_2 = Cards_2_1;
            },
            function (Chat_1_1) {
                Chat_1 = Chat_1_1;
            },
            function (Platforms_4_1) {
                Platforms_4 = Platforms_4_1;
            },
            function (Music_1_1) {
                Music_1 = Music_1_1;
            },
            function (All_5_1) {
                All_5 = All_5_1;
            },
            function (ViewModelProvider_1_1) {
                ViewModelProvider_1 = ViewModelProvider_1_1;
            },
            function (All_6_1) {
                All_6 = All_6_1;
            }],
        execute: function() {
            GameProvider = (function () {
                function GameProvider(router, viewModelProvider, translate, config, usersProvider, downCardsProvider, profileProvider, server, chat, zone, windowTitle, currentUser, platform, music) {
                    this.router = router;
                    this.viewModelProvider = viewModelProvider;
                    this.translate = translate;
                    this.config = config;
                    this.usersProvider = usersProvider;
                    this.downCardsProvider = downCardsProvider;
                    this.profileProvider = profileProvider;
                    this.server = server;
                    this.chat = chat;
                    this.zone = zone;
                    this.windowTitle = windowTitle;
                    this.currentUser = currentUser;
                    this.platform = platform;
                    this.music = music;
                    this.CHAT_SENDER_JOK = ' ';
                    this.VM = viewModelProvider.VM;
                    this.blockedUserIds = [];
                }
                GameProvider.prototype.start = function () {
                    var _this = this;
                    this.VM.NotificationType = All_6.NotificationType.Authenticating;
                    this.VM.Results = ViewModelProvider_1.ViewModelProvider.EmptyResults();
                    this.VM.IsConnectionClosed = false;
                    this.chat.reset();
                    this.usersProvider.getCurrent(function (user) {
                        if (!user.IsSuccess) {
                            _this.serverRequireAuthorization();
                            return;
                        }
                        _this.blockedUserIds = user.BlockedUserIds || [];
                        _this.VM.CurrentPlayer.UserID = _this.config.currentUserId = user.UserID;
                        _this.VM.CurrentPlayer.Nick = user.Nick;
                        _this.VM.CurrentPlayer.AvatarUri = user.AvatarUrl;
                        _this.VM.NotificationType = All_6.NotificationType.Connecting;
                        _this.chat.configure(user.UserID, user.Nick, user.AvatarUrl);
                        _this.chat.on('ItemAdded', function (message, userid, mode) {
                            if (!userid || mode == Chat_1.ChatItemMode.Jok)
                                return;
                            _this.profileProvider.chatBubble(message, userid);
                        });
                        _this.connectServer();
                    });
                    this.music.on(Music_1.MusicProvider.PLAY, this.onMusicPlay.bind(this));
                    this.music.on(Music_1.MusicProvider.STOP, this.onMusicStop.bind(this));
                };
                GameProvider.prototype.stop = function () {
                    this.VM.IsConnectionClosed = true;
                    this.server.stop();
                    this.server.removeEvent();
                    this.music.off(Music_1.MusicProvider.PLAY, this.onMusicPlay);
                    this.music.off(Music_1.MusicProvider.STOP, this.onMusicStop);
                };
                GameProvider.prototype.connectServer = function () {
                    var _this = this;
                    this.startWindowTitleNotification();
                    this.server.setOptions({
                        hubName: 'GameHub',
                        url: this.config.gameServerUrl,
                        token: this.config.sid,
                        channel: this.config.channel,
                        gameMode: this.config.mode,
                        transports: this.config.protocols,
                        levelControl: this.config.levelControl,
                        starsControl: this.config.starsControl,
                        enableMessageLogging: this.config.enableMessageLogging,
                        clientAppInfo: 'NG: ' + window.ClientVersion
                    });
                    this.server.on('MessageReceived', this.serverMessageReceived.bind(this));
                    this.server.on('MessageProceedCompleted', this.serverMessageProceedCompleted.bind(this));
                    this.server.on('online', this.serverOnline.bind(this));
                    this.server.on('offline', this.serverOffline.bind(this));
                    this.server.on('Error', this.serverError.bind(this));
                    this.server.on('Close', this.serverClose.bind(this));
                    this.server.on('RequireAuthorization', this.serverRequireAuthorization.bind(this));
                    this.server.on('RegisterSuccess', this.serverRegisterSuccess.bind(this));
                    this.server.on('GameStarting', this.serverGameStarting.bind(this));
                    this.server.on('GameFinished', this.serverGameFinished.bind(this));
                    this.server.on('PlayerSelectedChannel', this.serverPlayerSelectedChannel.bind(this));
                    this.server.on('CurrentTable', this.CurrentTable.bind(this));
                    this.server.on('CurrentTableUsers', this.CurrentTableUsers.bind(this));
                    this.server.on('TableResetDownCards', this.TableResetDownCards.bind(this));
                    this.server.on('TableReset', this.TableReset.bind(this));
                    this.server.on('CurrentCards', this.CurrentCards.bind(this));
                    this.server.on('GameCard', this.GameCard.bind(this));
                    this.server.on('GameVizualDeal', this.GameVizualDeal.bind(this));
                    this.server.on('GameWantRequest', this.GameWantRequest.bind(this));
                    this.server.on('GameCardRequest', this.GameCardRequest.bind(this));
                    this.server.on('GameKozirRequest', this.GameKozirRequest.bind(this));
                    this.server.on('GameActivetePlayer', this.GameActivetePlayer.bind(this));
                    this.server.on('GameDescCardCount', this.GameDescCardCount.bind(this));
                    this.server.on('GameSetKozir', this.GameSetKozir.bind(this));
                    this.server.on('GameSetCardsPermission', this.GameSetCardsPermission.bind(this));
                    this.server.on('GameSetCardsVisible', this.GameSetCardsVisible.bind(this));
                    this.server.on('GamePlayerLeft', this.GamePlayerLeft.bind(this));
                    this.server.on('GamePlayerIsBack', this.GamePlayerIsBack.bind(this));
                    this.server.on('PlayerCoeficient', this.PlayerCoeficient.bind(this));
                    this.server.on('GameStatsInfo', this.GameStatsInfo.bind(this));
                    this.server.on('ResultsPlayerWant', this.ResultsPlayerWant.bind(this));
                    this.server.on('ResultsUpdatePlayerTaken', this.ResultsUpdatePlayerTaken.bind(this));
                    this.server.on('ResultsPlayer', this.ResultsPlayer.bind(this));
                    this.server.on('ChatMessage', this.ChatMessage.bind(this));
                    this.server.on('ChatBanned', this.ChatBanned.bind(this));
                    this.server.on('UserListeningMusic', this.UserListeningMusic.bind(this));
                    this.server.on('ShowRatingResult', this.ShowRatingResult.bind(this));
                    this.server.start();
                    this.chat.on('SendMessage', function (msg) { return _this.server.send('SendMessage', _this.tableId, msg); });
                };
                GameProvider.prototype.blockUser = function (userid) {
                    this.usersProvider.block(userid);
                    if (this.blockedUserIds.indexOf(userid) > -1)
                        return;
                    this.blockedUserIds.push(userid);
                };
                GameProvider.prototype.unblockUser = function (userid) {
                    this.usersProvider.unblock(userid);
                    var index = this.blockedUserIds.indexOf(userid);
                    if (index == -1)
                        return;
                    this.blockedUserIds.splice(index, 1);
                };
                GameProvider.prototype.sendFriendRequest = function (userid) {
                    var _this = this;
                    this.usersProvider.sendFriendRequest(userid);
                    var player = this.VM.Players.filter(function (x) { return x.UserID == userid; })[0];
                    if (player)
                        player.IsFrendRequestSent = true;
                    this.usersProvider.get(userid, function (user) {
                        return _this.translate.get('common.BeFriends').subscribe(function (text) {
                            _this.chat.sendMessage(user.Nick + ' ' + text);
                        });
                    });
                };
                GameProvider.prototype.isRanked = function () {
                    return !this.VM.TableChannel || this.config.starsControl > 0;
                };
                GameProvider.prototype.onMusicPlay = function (channel) {
                    this.server.send('UserListensMusicChannel', '', true, channel.ID);
                };
                GameProvider.prototype.onMusicStop = function () {
                    this.server.send('UserListensMusicChannel', '', false, '');
                };
                GameProvider.prototype.uiPositionSelection = function (pos) {
                    var _this = this;
                    if (this.VM.CurrentPlayer && !this.VM.PositionSelectionPlayers[pos - 1]) {
                        this.VM.PositionSelectionPlayers.forEach(function (p, i) {
                            if (p == _this.VM.CurrentPlayer)
                                _this.VM.PositionSelectionPlayers[i] = null;
                        });
                        this.VM.PositionSelectionPlayers[pos - 1] = this.VM.CurrentPlayer;
                    }
                    this.server.send('SelectPosition', pos);
                };
                GameProvider.prototype.uiCardClick = function (card) {
                    if (Cards_2.CardType.IsSpecial(card)) {
                        this.lastCard = card;
                        this.VM.ColorSelectionMode = Cards_2.ColorSelectionMode.WantTakeSelection;
                        return;
                    }
                    var index = this.VM.CurrentPlayerCards.indexOf(card);
                    if (~index)
                        this.VM.CurrentPlayerCards[index].IsVisible = false;
                    this.cardSelected(card);
                };
                GameProvider.prototype.uiDeclarationClick = function (want) {
                    this.VM.Declaration = null;
                    this.VM.ActivePlayerUserID = null;
                    this.profileProvider.stopActivate();
                    this.server.send('SelectWant', want);
                };
                GameProvider.prototype.uiDominatedColorSelect = function (dominatedColor) {
                    this.VM.ColorSelectionMode = null;
                    this.VM.DominatedColor = dominatedColor;
                    this.VM.CurrentPlayerCards.filter(function (x) { return x.CardColor == dominatedColor; }).forEach(function (x) { return x.IsDominated = true; });
                    this.VM.ActivePlayerUserID = null;
                    this.profileProvider.stopActivate();
                    this.server.send('SelectKozir', dominatedColor);
                };
                GameProvider.prototype.uiWantTakeClick = function (isWant) {
                    if (this.VM.IsFirstCard) {
                        this.VM.ColorSelectionMode = isWant ? Cards_2.ColorSelectionMode.WantColorSelection : Cards_2.ColorSelectionMode.TakeColorSelection;
                        return;
                    }
                    var index = this.VM.CurrentPlayerCards.indexOf(this.lastCard);
                    if (~index)
                        this.VM.CurrentPlayerCards[index].IsVisible = false;
                    this.lastCard.IsActivated = isWant;
                    this.cardSelected(this.lastCard, isWant);
                };
                GameProvider.prototype.uiWantColorSelect = function (wantColor) {
                    var index = this.VM.CurrentPlayerCards.indexOf(this.lastCard);
                    if (~index)
                        this.VM.CurrentPlayerCards[index].IsVisible = false;
                    this.lastCard.SpecialColor = wantColor;
                    this.lastCard.IsActivated = true;
                    this.cardSelected(this.lastCard, true, wantColor);
                };
                GameProvider.prototype.uiTakeColorSelect = function (takeColor) {
                    var index = this.VM.CurrentPlayerCards.indexOf(this.lastCard);
                    if (~index)
                        this.VM.CurrentPlayerCards[index].IsVisible = false;
                    this.lastCard.SpecialColor = takeColor;
                    this.lastCard.IsActivated = false;
                    this.cardSelected(this.lastCard, false, takeColor);
                };
                GameProvider.prototype.uiListenChannel = function (channel) {
                    this.music.play(channel);
                };
                GameProvider.prototype.uiPlayNewGame = function () {
                    document.location.assign(this.VM.TableType == All_6.Table_Type.only9 ? this.config.playPublic9Url : this.config.playPublicUrl);
                };
                GameProvider.prototype.uiExit = function () {
                    this.router.navigate(['/Lobby']);
                };
                GameProvider.prototype.serverMessageReceived = function (pkg) {
                };
                GameProvider.prototype.serverMessageProceedCompleted = function (data) {
                    this.zone.run(function () { });
                };
                GameProvider.prototype.serverOnline = function () {
                    console.log('game server: connected');
                    this.VM.NotificationType = null;
                };
                GameProvider.prototype.serverOffline = function () {
                    console.log('game server: disconnected');
                    this.serverClose('Connection lost', true);
                };
                GameProvider.prototype.serverClose = function (reason, skipClosing) {
                    this.VM.NotificationType = All_6.NotificationType.ConnectionClosed;
                    if (skipClosing)
                        return;
                    this.VM.ConnectionCloseReason = reason;
                    this.stop();
                };
                GameProvider.prototype.serverError = function (info) {
                    console.warn('connection error', info);
                    this.serverClose('Connection lost', true);
                };
                GameProvider.prototype.serverRequireAuthorization = function () {
                    this.VM.NotificationType = All_6.NotificationType.RequireAuthorization;
                    this.platform.login();
                };
                GameProvider.prototype.serverRegisterSuccess = function () {
                };
                GameProvider.prototype.serverGameStarting = function () {
                    this.chat.removeJokItems();
                    var existingPlayers = this.VM.Results && this.VM.Results.Sections[0] && this.VM.Results.Sections[0].Players;
                    this.VM.Results = ViewModelProvider_1.ViewModelProvider.EmptyResults(existingPlayers);
                    this.VM.FinishInfo = {
                        Players: [
                            {
                                UserID: null,
                                Nick: null,
                                IsOnline: null,
                                Place: null,
                                Score: null,
                                Points: null,
                                Rating: null
                            },
                            {
                                UserID: null,
                                Nick: null,
                                IsOnline: null,
                                Place: null,
                                Score: null,
                                Points: null,
                                Rating: null
                            },
                            {
                                UserID: null,
                                Nick: null,
                                IsOnline: null,
                                Place: null,
                                Score: null,
                                Points: null,
                                Rating: null
                            },
                            {
                                UserID: null,
                                Nick: null,
                                IsOnline: null,
                                Place: null,
                                Score: null,
                                Points: null,
                                Rating: null
                            }
                        ],
                        Key: '',
                        Achievements: null,
                        AddedStars: null,
                        NewStarsCount: null,
                        IsLowLevelPlayersGame: null,
                        IsIgnored: null,
                        PlaceStars: null,
                        LowLevelToLoseStars: null
                    };
                    this.startWindowTitleNotification();
                };
                GameProvider.prototype.serverGameFinished = function () {
                };
                GameProvider.prototype.serverPlayerSelectedChannel = function (userID, channelID) {
                };
                GameProvider.prototype.CurrentTable = function (table, channel) {
                    var _this = this;
                    this.tableId = table.ID;
                    this.VM.Status = table.Status;
                    this.VM.Dring = table.Xishti;
                    this.VM.TableChannel = table.Channel;
                    this.VM.TableType = table.Type;
                    this.VM.IsTableInfoReceived = true;
                    this.TableReset();
                    switch (this.VM.Status) {
                        case All_6.TableStatuses.New: {
                            if (table.Channel) {
                                this.VM.InviteLink = location.origin + location.pathname + (location.pathname.lastIndexOf('/') == location.pathname.length - 1 ? '' : '/');
                                this.chat.addItem(Chat_1.ChatItemMode.Jok, this.CHAT_SENDER_JOK, this.VM.InviteLink, Chat_1.ChatItemTemplate.ServerPrivateTable, null, null, null);
                            }
                            else {
                                this.chat.addItem(Chat_1.ChatItemMode.Jok, this.CHAT_SENDER_JOK, this.VM.InviteLink, Chat_1.ChatItemTemplate.ServerPublicTable, null, null, null);
                            }
                            this.VM.Results.Sections.forEach(function (x) { return x.IsActive = false; });
                            this.VM.Results.Sections[0].IsActive = true;
                            break;
                        }
                        case All_6.TableStatuses.Started:
                        case All_6.TableStatuses.Stopped: {
                            this.VM.NotificationType = null;
                            this.VM.Results.Sections.forEach(function (x) { return x.IsActive = false; });
                            this.VM.Results.Sections[0].IsActive = true;
                            this.TableReset();
                            break;
                        }
                        case All_6.TableStatuses.Finished: {
                            this.VM.Results.Sections.forEach(function (x) { return x.IsActive = false; });
                            this.VM.Results.Sections[3].IsActive = true;
                            var winners = [];
                            table.Players.forEach(function (p, i) {
                                var item = {
                                    UserID: p.UserID,
                                    Nick: null,
                                    IsOnline: p.IsOnline,
                                    Place: p.Place,
                                    Points: p.AddedPoints,
                                    Rating: p.AddedRating,
                                    Score: ''
                                };
                                _this.usersProvider.get(p.UserID, function (u) { return item.Nick = u.Nick; });
                                winners.push(item);
                            });
                            table.Players = table.Players.sort(function (a, b) {
                                return a.Place - b.Place;
                            });
                            this.VM.FinishInfo.Key = table.FinishResultKey;
                            this.VM.FinishInfo.Players = winners;
                            break;
                        }
                    }
                    this.CurrentTableUsers(table.Players);
                };
                GameProvider.prototype.CurrentTableUsers = function (players) {
                    var _this = this;
                    if (!this.lastPlayersCount || (this.lastPlayersCount < players.length)) {
                        this.playAudio(PlayAudioModes.PlayerLogin);
                    }
                    this.lastPlayersCount = players.length;
                    this.VM.NotificationType = null;
                    if (players) {
                        players.forEach(function (x) {
                            if (!x)
                                return;
                            x.LevelName = 'playerLevels.Refreshing';
                            x.MusicChannelName = _this.music.getChannelName(x.MusicChannelID);
                            _this.usersProvider.get(x.UserID, function (user) {
                                x.Nick = user.Nick;
                                x.AvatarUri = user.AvatarUrl;
                                x.LevelName = user.Game ? _this.currentUser.getPlayerLevelName(user.Game.RatingStars) : '';
                                x.RelationStatusID = x.IsFrendRequestSent ? All_5.UserRelationStatuses.Pending : user.RelationStatusID2;
                                x.IsBlocked = _this.blockedUserIds.indexOf(user.UserID) > -1;
                            });
                        });
                    }
                    if (players.length == 4) {
                        this.VM.Players = [null, null, null, null];
                        this.VM.ResultPlayers = [null, null, null, null];
                        if (this.VM.Status == All_6.TableStatuses.New) {
                            players.forEach(function (x, i) { return _this.VM.Players[i] = x; });
                            this.VM.ResultPlayers = this.VM.Players;
                            this.VM.NotificationType = All_6.NotificationType.GameStarting;
                            if (!this.startCountDownInterval) {
                                this.VM.GameStartSeconds = 10;
                                clearInterval(this.startCountDownInterval);
                                this.startCountDownInterval = setInterval(function () {
                                    if (--_this.VM.GameStartSeconds == 1)
                                        clearInterval(_this.startCountDownInterval);
                                }, 1000);
                            }
                        }
                        else {
                            players.forEach(function (x) { return x.Position && (_this.VM.Players[x.Position - 1] = x); });
                            this.VM.ResultPlayers = this.VM.Players.slice();
                            this.VM.Results.Sections.forEach(function (x) { return x.Players.forEach(function (p, i) {
                                p.UserID = _this.VM.ResultPlayers[i].UserID;
                                p.Position = _this.VM.ResultPlayers[i].Position;
                            }); });
                            var currentPlayerPosition = players.filter(function (x) { return x.UserID == _this.config.currentUserId; }).map(function (x) { return x.Position; })[0];
                            var rotateRate = 4 - (currentPlayerPosition - 1);
                            for (var i = 0; i < rotateRate; i++) {
                                this.VM.Players.unshift(this.VM.Players.pop());
                            }
                        }
                    }
                    else {
                        clearInterval(this.startCountDownInterval);
                        this.startCountDownInterval = null;
                        if (this.VM.Status == All_6.TableStatuses.New) {
                            if (this.VM.TableChannel) {
                                this.VM.InviteLink = location.origin + location.pathname + (location.pathname.lastIndexOf('/') == location.pathname.length - 1 ? '' : '/');
                            }
                            else {
                            }
                        }
                    }
                    this.VM.CurrentPlayer = players.filter(function (x) { return x.UserID == _this.config.currentUserId; })[0];
                    switch (this.VM.Status) {
                        case All_6.TableStatuses.New: {
                            this.VM.PositionSelectionPlayers = [null, null, null, null];
                            if (players) {
                                players.forEach(function (x) { return x.Position && (_this.VM.PositionSelectionPlayers[x.Position - 1] = x); });
                                this.VM.ResultPlayers = this.VM.Players = players;
                            }
                            break;
                        }
                        case All_6.TableStatuses.Started:
                        case All_6.TableStatuses.Stopped: {
                            break;
                        }
                        case All_6.TableStatuses.Finished: {
                            break;
                        }
                    }
                };
                GameProvider.prototype.TableResetDownCards = function (PlayerNo) {
                    var _this = this;
                    this.VM.DownCardsAnimated = this.VM.LastTakenCards = this.VM.DownCards;
                    this.VM.DownCards = [null, null, null, null];
                    if (!PlayerNo)
                        return;
                    this.tableResetReceived = false;
                    this.VM.IsCardSelectionEnabled = false;
                    var player = this.VM.Players.filter(function (x) { return x.Position == PlayerNo; })[0];
                    if (!player)
                        return;
                    var index = this.VM.Players.indexOf(player);
                    this.downCardsProvider.animate(index + 1, function () {
                        _this.VM.DownCardsAnimated = null;
                    });
                };
                GameProvider.prototype.TableReset = function () {
                    this.tableResetReceived = true;
                    this.VM.IsCardSelectionEnabled = false;
                    this.VM.IsCurrentCardsVisible = false;
                    this.VM.ActivePlayerUserID = null;
                    this.VM.ColorSelectionMode = null;
                    this.VM.Declaration = null;
                    this.VM.DominatedColor = null;
                    this.VM.CurrentPlayerCards.forEach(function (x) { return x = null; });
                    this.VM.Players.forEach(function (x) { return x && (x.Want = x.Took = null); });
                    this.VM.DownCards = [null, null, null, null];
                    this.VM.LastTakenCards = null;
                    this.VM.BalanceNumber = null;
                    this.profileProvider.stopActivate();
                    clearInterval(this.startCountDownInterval);
                };
                GameProvider.prototype.CurrentCards = function (cards) {
                    this.VM.CurrentPlayerCards = cards;
                    this.VM.CurrentPlayerCards.forEach(function (x) { return x.IsVisible = true; });
                };
                GameProvider.prototype.GameCard = function (PlayerNo, CardColor, CardLevel, cardid, isActivated, specialColor, wasFirstPlayer) {
                    var player = this.VM.Players.filter(function (x) { return x.Position == PlayerNo; })[0];
                    if (!player)
                        return;
                    if (player.UserID == this.config.currentUserId && this.VM.DownCards[0])
                        return;
                    var index = this.VM.Players.indexOf(player);
                    var card = Cards_2.CardType.Create(CardColor, CardLevel, false);
                    card.IsDominated = (CardColor == this.VM.DominatedColor);
                    card.IsActivated = isActivated;
                    card.SpecialColor = wasFirstPlayer ? specialColor : 4;
                    this.VM.DownCards[index] = card;
                    this.VM.LastActivePlayerPosition = index;
                    var currentPlayerCard = this.VM.CurrentPlayerCards.filter(function (x) { return x.ID == cardid; })[0];
                    if (currentPlayerCard) {
                        var cardIndex = this.VM.CurrentPlayerCards.indexOf(currentPlayerCard);
                        if (~cardIndex)
                            this.VM.CurrentPlayerCards[cardIndex].IsVisible = false;
                    }
                    this.playAudio(Cards_2.CardType.IsSpecial(card) ? PlayAudioModes.SpecialCard : PlayAudioModes.Card);
                    this.VM.Declaration = this.VM.ColorSelectionMode = null;
                };
                GameProvider.prototype.GameVizualDeal = function (Mode, CardCount) {
                    if (Mode != All_6.VizualDealMode.Special)
                        this.VM.Player2CardsCount = this.VM.Player3CardsCount = this.VM.Player4CardsCount = CardCount;
                    if (Mode == All_6.VizualDealMode.First) {
                        this.VM.CurrentPlayerCards.forEach(function (x) { return x.IsVisible = false; });
                        this.VM.CurrentPlayerCards[0].IsVisible = true;
                        this.VM.CurrentPlayerCards[1].IsVisible = true;
                        this.VM.CurrentPlayerCards[2].IsVisible = true;
                        this.VM.Player2CardsCount = this.VM.Player3CardsCount = this.VM.Player4CardsCount = 3;
                    }
                    if (Mode == All_6.VizualDealMode.Last) {
                        this.VM.CurrentPlayerCards.forEach(function (x) { return x.IsVisible = true; });
                        this.VM.Player2CardsCount = this.VM.Player3CardsCount = this.VM.Player4CardsCount = 9;
                    }
                    if (Mode != All_6.VizualDealMode.First)
                        this.VM.CurrentPlayerCards = this.VM.CurrentPlayerCards.sort(function (c1, c2) { return c1.CardLevel - c2.CardLevel + 10 * (c2.CardColor - c1.CardColor); });
                    this.VM.IsCurrentCardsVisible = true;
                };
                GameProvider.prototype.GameWantRequest = function (CardCount, WantLimit, AutoSelect, FillRequired) {
                    this.VM.Declaration = new All_6.DeclarationModel(CardCount, WantLimit, FillRequired);
                    this.startWindowTitleNotification();
                };
                GameProvider.prototype.GameCardRequest = function (IsFirstCard) {
                    this.VM.IsFirstCard = IsFirstCard;
                    this.VM.IsCardSelectionEnabled = true;
                    this.startWindowTitleNotification();
                };
                GameProvider.prototype.GameKozirRequest = function () {
                    this.VM.ColorSelectionMode = Cards_2.ColorSelectionMode.ColorSelection;
                    this.startWindowTitleNotification();
                };
                GameProvider.prototype.GameActivetePlayer = function (PlayerNo, userid) {
                    var player = this.VM.Players.filter(function (x) { return x.Position == PlayerNo; })[0];
                    if (!player)
                        return;
                    this.VM.ActivePlayerUserID = player.UserID;
                    this.profileProvider.activate(player.UserID, player.IsOnline ? 15000 : 5000);
                };
                GameProvider.prototype.GameDescCardCount = function (PlayerNo, userid) {
                    var player = this.VM.Players.filter(function (x) { return x.Position == PlayerNo; })[0];
                    if (!player)
                        return;
                    var index = this.VM.Players.indexOf(player);
                    if (index == 1)
                        this.VM.Player2CardsCount--;
                    if (index == 2)
                        this.VM.Player3CardsCount--;
                    if (index == 3)
                        this.VM.Player4CardsCount--;
                    if (this.VM.Player2CardsCount < 0)
                        this.VM.Player2CardsCount = 0;
                    if (this.VM.Player3CardsCount < 0)
                        this.VM.Player3CardsCount = 0;
                    if (this.VM.Player4CardsCount < 0)
                        this.VM.Player4CardsCount = 0;
                };
                GameProvider.prototype.GameSetKozir = function (Mode, CardColor, CardLevel) {
                    this.VM.ColorSelectionMode = null;
                    this.VM.DominatedColor = CardColor;
                    this.VM.CurrentPlayerCards.forEach(function (x) { return x.IsDominated = x.CardColor == CardColor; });
                };
                GameProvider.prototype.GameSetCardsPermission = function (permissions) {
                    var _this = this;
                    if (!permissions)
                        return;
                    this.VM.CurrentPlayerCards.forEach(function (x) { return x.IsEnabled = false; });
                    permissions.split('').forEach(function (x, i) { return _this.VM.CurrentPlayerCards[i] && (_this.VM.CurrentPlayerCards[i].IsEnabled = x == '1'); });
                };
                GameProvider.prototype.GameSetCardsVisible = function (VirtualPosition, CardsVisibleString) {
                    var _this = this;
                    if (VirtualPosition != 0 || !CardsVisibleString) {
                        var cardsCount = CardsVisibleString.split('').filter(function (x) { return x == '1'; }).length;
                        if (VirtualPosition == 1)
                            this.VM.Player2CardsCount = cardsCount;
                        if (VirtualPosition == 2)
                            this.VM.Player3CardsCount = cardsCount;
                        if (VirtualPosition == 3)
                            this.VM.Player4CardsCount = cardsCount;
                        return;
                    }
                    CardsVisibleString.split('').forEach(function (x, i) { return _this.VM.CurrentPlayerCards[i] && (_this.VM.CurrentPlayerCards[i].IsVisible = x == '1'); });
                };
                GameProvider.prototype.GamePlayerLeft = function (PlayerNo, IsDisconnect, Message, userid) {
                    var player = this.VM.Players.filter(function (x) { return x.Position == PlayerNo; })[0];
                    if (!player)
                        return;
                    player.IsOnline = !IsDisconnect;
                };
                GameProvider.prototype.GamePlayerIsBack = function (PlayerNo, userid) {
                    var player = this.VM.Players.filter(function (x) { return x.Position == PlayerNo; })[0];
                    if (!player)
                        return;
                    player.IsOnline = true;
                };
                GameProvider.prototype.PlayerCoeficient = function (Position, Coeficient) {
                };
                GameProvider.prototype.GameStatsInfo = function (Status, Count, Message) {
                    this.VM.BalanceNumber = (Status > 0 ? 1 : -1) * Count;
                };
                GameProvider.prototype.ResultsPlayerWant = function (PlayerNo, Section, LineNo, Want, userid) {
                    var _this = this;
                    var player = this.VM.Players.filter(function (x) { return x.Position == PlayerNo; })[0];
                    if (!player)
                        return;
                    player.Want = Want;
                    this.translate.get('declaration.Pass').subscribe(function (passText) {
                        return _this.profileProvider.chatBubble(Want == 0 ? passText : Want, player.UserID);
                    });
                    if (player.UserID == this.config.currentUserId)
                        this.VM.Declaration = null;
                    var sectionPlayer = this.VM.Results.Sections[Section - 1].Players.filter(function (x) { return x.Position == PlayerNo; })[0];
                    if (!sectionPlayer)
                        return;
                    sectionPlayer.Items[LineNo - 1].Want = Want;
                    this.VM.Results.Sections.forEach(function (x) { return x.IsActive = false; });
                    var activeSection = this.VM.Results.Sections.filter(function (x) { return x.IsActive; })[0];
                    var newActiveSection = this.VM.Results.Sections[Section - 1];
                    newActiveSection.IsActive = true;
                    var prevSection = (Section - 2 >= 0) ? this.VM.Results.Sections[Section - 2] : null;
                    if (prevSection && (activeSection != newActiveSection)) {
                        newActiveSection.Players.forEach(function (p, i) {
                            if (!p.Total)
                                p.Total = prevSection.Players[i].Total + prevSection.Players[i].BonusScore;
                        });
                    }
                };
                GameProvider.prototype.ResultsUpdatePlayerTaken = function (PlayerNo, Have, Want, userid) {
                    var player = this.VM.Players.filter(function (x) { return x.Position == PlayerNo; })[0];
                    if (!player)
                        return;
                    player.Want = Want;
                    player.Took = Have;
                };
                GameProvider.prototype.ResultsPlayer = function (PlayerNo, Results) {
                    var _this = this;
                    Results.forEach(function (r) {
                        switch (r.ResultType) {
                            case All_6.MatrixTableResultType.Result:
                                {
                                    var sectionPlayer = _this.VM.Results.Sections[r.SectionNo - 1].Players.filter(function (x) { return x.Position == r.Position + 1; })[0];
                                    if (!sectionPlayer)
                                        return;
                                    sectionPlayer.Items[r.LineNo - 1].Want = r.PlayerWant;
                                    sectionPlayer.Items[r.LineNo - 1].Score = r.PlayerScore;
                                }
                                break;
                            case All_6.MatrixTableResultType.SectionResult:
                                {
                                    var sectionPlayer = _this.VM.Results.Sections[r.SectionNo - 1].Players.filter(function (x) { return x.Position == r.Position + 1; })[0];
                                    if (!sectionPlayer)
                                        return;
                                    sectionPlayer.Total = r.PlayerScore;
                                }
                                break;
                            case All_6.MatrixTableResultType.Bonus:
                                {
                                    var sectionPlayer = _this.VM.Results.Sections[r.SectionNo - 1].Players.filter(function (x) { return x.Position == r.Position + 1; })[0];
                                    if (!sectionPlayer)
                                        return;
                                    var line = sectionPlayer.Items[r.LineNo - 1];
                                    if (!line)
                                        return;
                                    if (r.PlayerScore > 0) {
                                        sectionPlayer.IsBonus = true;
                                        line.IsBonus = true;
                                    }
                                    if (r.PlayerScore < 0) {
                                        sectionPlayer.IsRemoved = true;
                                        line.IsRemoved = true;
                                    }
                                    sectionPlayer.BonusScore = r.PlayerScore;
                                }
                                break;
                        }
                        _this.VM.Results.Sections.forEach(function (x) { return x.IsActive = false; });
                        _this.VM.Results.Sections[r.SectionNo - 1].IsActive = true;
                    });
                };
                GameProvider.prototype.ShowRatingResult = function (isRatingsEnabled, playerResult) {
                    if (!isRatingsEnabled)
                        return;
                    this.VM.FinishInfo.PlaceStars = playerResult.PlaceStars;
                    this.VM.FinishInfo.LowLevelToLoseStars = playerResult.LowLevelToLoseStars;
                    this.VM.FinishInfo.AddedStars = playerResult.AddedStars;
                    this.VM.FinishInfo.NewStarsCount = playerResult.Stars;
                    this.VM.FinishInfo.IsLowLevelPlayersGame = playerResult.IsLowLevelPlayersGame;
                    this.VM.FinishInfo.IsIgnored = playerResult.IsIgnored;
                    this.VM.FinishInfo.Achievements = {
                        Place1: playerResult.Place == 1,
                        Place2: playerResult.Place == 2,
                        Place3: playerResult.Place == 3,
                        Place4: playerResult.Place == 4,
                        Premia: playerResult.Achievements ? playerResult.Achievements.PremiaCount : 0,
                        Full9: playerResult.Achievements ? playerResult.Achievements.Total9TakesCount : 0
                    };
                    this.OnFinishAnimation && this.OnFinishAnimation(playerResult.AddedStars, playerResult.Stars);
                    this.currentUser.refreshUserData();
                };
                GameProvider.prototype.ChatMessage = function (userid, msg, msgId) {
                    var _this = this;
                    if (this.blockedUserIds.indexOf(userid) > -1)
                        return;
                    this.usersProvider.get(userid, function (user) {
                        var player = _this.VM.Players.filter(function (x) { return x.UserID == userid; })[0];
                        _this.chat.addItem(Chat_1.ChatItemMode.player2, user.Nick, msg, Chat_1.ChatItemTemplate.Default, msgId, user.UserID, user.AvatarUrl);
                    });
                };
                GameProvider.prototype.ChatBanned = function (days) {
                };
                GameProvider.prototype.UserListeningMusic = function (userid, isListening, channelID) {
                    var player = this.VM.Players.filter(function (x) { return x.UserID == userid; })[0];
                    if (!player)
                        return;
                    var channelName = this.music.getChannelName(channelID);
                    if (isListening) {
                        player.MusicChannelID = channelID;
                        player.MusicChannelName = channelName;
                    }
                    else {
                        player.MusicChannelID = null;
                        player.MusicChannelName = null;
                    }
                };
                GameProvider.prototype.cardSelected = function (card, isWant, wantColor) {
                    if (isWant === void 0) { isWant = false; }
                    if (wantColor === void 0) { wantColor = -1; }
                    this.VM.ColorSelectionMode = null;
                    this.VM.Declaration = null;
                    this.VM.DownCards[0] = card;
                    this.VM.DownCards[0].IsEnabled = false;
                    this.VM.IsCardSelectionEnabled = false;
                    this.VM.LastActivePlayerPosition = 0;
                    this.VM.ActivePlayerUserID = null;
                    this.profileProvider.stopActivate();
                    this.playAudio(Cards_2.CardType.IsSpecial(card) ? PlayAudioModes.SpecialCard : PlayAudioModes.Card);
                    this.server.send('SelectCard', card.ID, isWant, wantColor);
                };
                GameProvider.prototype.playAudio = function (mode) {
                    var audios = {
                        cardDown: 'carddown',
                        cardDown2: 'carddown2',
                        specialCardDown: 'special_card_down',
                        playerLogin: 'PlayerLoginNotification',
                        addStar: 'addstar',
                        removeStar: 'removestar',
                        levelUp: 'levelup'
                    };
                    var sound;
                    if (!this.config.isAudioEffectsEnabled)
                        return;
                    if (mode == PlayAudioModes.SpecialCard) {
                        sound = audios.specialCardDown;
                    }
                    if (mode == PlayAudioModes.Card) {
                        if (Math.floor(Math.random() * 2) == 0)
                            sound = audios.cardDown;
                        else
                            sound = audios.cardDown2;
                    }
                    if (mode == PlayAudioModes.PlayerLogin) {
                        sound = audios.playerLogin;
                    }
                    if (mode == PlayAudioModes.AddStar) {
                        sound = audios.addStar;
                    }
                    if (mode == PlayAudioModes.RemoveStar) {
                        sound = audios.removeStar;
                    }
                    if (mode == PlayAudioModes.LevelUp) {
                        sound = audios.levelUp;
                    }
                    if (!sound)
                        return;
                    this.platform.playAudio(sound);
                };
                GameProvider.prototype.startWindowTitleNotification = function () {
                    var _this = this;
                    var originalWindowTitle = this.windowTitle.getTitle();
                    var symbols = ['👻', '❤️‍', '🐓', '🐥', '🐙', '🙈'];
                    var interval = setInterval(function () {
                        if (!document.hidden) {
                            _this.windowTitle.setTitle(originalWindowTitle);
                            clearInterval(interval);
                            return;
                        }
                        var symbol = symbols[Date.now() % symbols.length];
                        var newTitle = ((_this.windowTitle.getTitle() != originalWindowTitle) ? '' : symbol + ' ') + originalWindowTitle;
                        _this.windowTitle.setTitle(newTitle);
                    }, 300);
                };
                GameProvider = __decorate([
                    core_37.Injectable(), 
                    __metadata('design:paramtypes', [router_6.Router, ViewModelProvider_1.ViewModelProvider, ng2_translate_2.TranslateService, All_5.ConfigProvider, All_5.UsersProvider, Cards_2.DownCardsProvider, All_5.ProfileProvider, Communication_1.CommunicationClientProvider, Chat_1.ChatProvider, core_37.NgZone, browser_1.Title, All_5.CurrentUserProvider, Platforms_4.PlatformProvider, Music_1.MusicProvider])
                ], GameProvider);
                return GameProvider;
            }());
            exports_56("GameProvider", GameProvider);
            (function (PlayAudioModes) {
                PlayAudioModes[PlayAudioModes["Card"] = 0] = "Card";
                PlayAudioModes[PlayAudioModes["SpecialCard"] = 1] = "SpecialCard";
                PlayAudioModes[PlayAudioModes["PlayerLogin"] = 2] = "PlayerLogin";
                PlayAudioModes[PlayAudioModes["AddStar"] = 3] = "AddStar";
                PlayAudioModes[PlayAudioModes["RemoveStar"] = 4] = "RemoveStar";
                PlayAudioModes[PlayAudioModes["LevelUp"] = 5] = "LevelUp";
            })(PlayAudioModes || (PlayAudioModes = {}));
            exports_56("PlayAudioModes", PlayAudioModes);
            PostJokerGamePlayerResult = (function () {
                function PostJokerGamePlayerResult() {
                }
                return PostJokerGamePlayerResult;
            }());
            exports_56("PostJokerGamePlayerResult", PostJokerGamePlayerResult);
        }
    }
});
System.register("Modules/Joker/declaration", ['angular2/core', "Modules/Joker/Models/All"], function(exports_57, context_57) {
    "use strict";
    var __moduleName = context_57 && context_57.id;
    var core_38, All_7;
    var UIDeclaration;
    return {
        setters:[
            function (core_38_1) {
                core_38 = core_38_1;
            },
            function (All_7_1) {
                All_7 = All_7_1;
            }],
        execute: function() {
            UIDeclaration = (function () {
                function UIDeclaration() {
                    this.items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                }
                __decorate([
                    core_38.Input(), 
                    __metadata('design:type', All_7.DeclarationModel)
                ], UIDeclaration.prototype, "source", void 0);
                __decorate([
                    core_38.Input(), 
                    __metadata('design:type', Object)
                ], UIDeclaration.prototype, "callbacks", void 0);
                UIDeclaration = __decorate([
                    core_38.Component({
                        selector: 'declaration',
                        styles: [".declaration {  background: #04201a;  padding: 10px 5px;  text-align: center;  position: relative;  margin-left: 10px;  margin-right: 10px;  border-radius: 8px;  color: white;  box-shadow: 0 0 5px #213A34; }  .declaration header {    color: rgba(255, 255, 255, 0.8);    position: absolute;    text-align: center;    bottom: 62px;    background: #04201a;    padding: 3px 16px;    left: 10px;    width: auto;    border-radius: 3px 3px 0 0; }  .declaration div.item {    display: inline-block;    padding: 12px 19px;    cursor: pointer;    border: 1px solid rgba(160, 160, 160, 0.22);    border-radius: 4px;    margin-left: 5px;    margin-right: 5px;    position: relative;    background: rgba(255, 255, 255, 0.12); }    .declaration div.item.pass {      padding: 12px 10px; }    .declaration div.item .requireToFill {      position: absolute;      left: -8px;      background: #213a34;      padding: 4px 10px;      border-radius: 5px;      bottom: -40px;      border: 1px solid rgba(160, 160, 160, 0.22);      font-size: 12px;      margin-right: -100px;      display: none; }      .declaration div.item .requireToFill:after {        content: '';        position: absolute;        border-style: solid;        border-width: 0 4px 6px;        border-color: #213a34 transparent;        display: block;        width: 0;        z-index: 1;        top: -6px;        left: 26px; }      .declaration div.item .requireToFill:before {        content: '';        position: absolute;        border-style: solid;        border-width: 0 4px 6px;        border-color: #7F7F7F transparent;        display: block;        width: 0;        z-index: 0;        top: -7px;        left: 26px; }    .declaration div.item:hover:not(.ignored) {      background: rgba(255, 255, 255, 0.09); }    .declaration div.item.ignored {      cursor: not-allowed;      opacity: .2; }    .declaration div.item.recommended {      background: rgba(255, 255, 255, 0.12); }      .declaration div.item.recommended .requireToFill {        display: block; }"],
                        template: '<div class="declaration" *ngIf="source"><header>{{ \'declaration.MainLabel\' | translate }}</header><template ngFor #item [ngForOf]="items" #i="index"><div *ngIf="(source.Count > item - 1)" class="item" [ngClass]="{ ignored: (item === source.Ignore), recommended: (item === source.Recommend), pass: (item == 0) }" (click)="(item !== source.Ignore) && callbacks?.onSelect(item)"><span *ngIf="item == 0">{{ \'declaration.Pass\' | translate }}</span> <span *ngIf="item > 0">{{ item }}</span><div class="requireToFill bubble" [innerHtml]="\'declaration.RequireToFill\' | translate"></div></div></template></div>'
                    }), 
                    __metadata('design:paramtypes', [])
                ], UIDeclaration);
                return UIDeclaration;
            }());
            exports_57("UIDeclaration", UIDeclaration);
        }
    }
});
System.register("Common/Components/account", ['angular2/core', 'angular2/router'], function(exports_58, context_58) {
    "use strict";
    var __moduleName = context_58 && context_58.id;
    var core_39, router_7;
    var UIAccount, ViewMode;
    return {
        setters:[
            function (core_39_1) {
                core_39 = core_39_1;
            },
            function (router_7_1) {
                router_7 = router_7_1;
            }],
        execute: function() {
            UIAccount = (function () {
                function UIAccount(accountElement) {
                    this.accountElement = accountElement;
                    this.audioOnClass = this.getAudioOnClassMap();
                    this.audioOffClass = this.getAudioOffClassMap();
                }
                UIAccount.prototype.ngOnInit = function () {
                    this.changeAudioOption(this.isAudioEffectsEnabled);
                };
                UIAccount.prototype.onGlobalClick = function () {
                    this.showSubmenu = false;
                };
                UIAccount.prototype.onHeaderClick = function (e) {
                    this.showSubmenu = !this.showSubmenu;
                    e.stopPropagation();
                };
                UIAccount.prototype.getAudioOnClassMap = function () {
                    return {
                        'btn-primary': !!this.isAudioEffectsEnabled,
                        'btn-default': !this.isAudioEffectsEnabled,
                        'active': !!this.isAudioEffectsEnabled
                    };
                };
                UIAccount.prototype.getAudioOffClassMap = function () {
                    return {
                        'btn-warning': !this.isAudioEffectsEnabled,
                        'btn-default': !!this.isAudioEffectsEnabled,
                        'active': !this.isAudioEffectsEnabled
                    };
                };
                UIAccount.prototype.changeAudioOption = function (isOn) {
                    this.callbacks && this.callbacks.onChangeAudioOption && this.callbacks.onChangeAudioOption(isOn);
                    this.isAudioEffectsEnabled = isOn;
                    this.audioOnClass = this.getAudioOnClassMap();
                    this.audioOffClass = this.getAudioOffClassMap();
                    this.showSubmenu = false;
                };
                UIAccount.prototype.viewProfile = function () {
                    this.callbacks && this.callbacks.onViewProfile && this.callbacks.onViewProfile();
                    this.showSubmenu = false;
                };
                UIAccount.prototype.exit = function () {
                    this.callbacks && this.callbacks.onExit && this.callbacks.onExit();
                    this.showSubmenu = false;
                };
                UIAccount.prototype.clearChat = function () {
                    this.callbacks && this.callbacks.onClearChat && this.callbacks.onClearChat();
                    this.showSubmenu = false;
                };
                __decorate([
                    core_39.Input(), 
                    __metadata('design:type', Boolean)
                ], UIAccount.prototype, "isAdmin", void 0);
                __decorate([
                    core_39.Input(), 
                    __metadata('design:type', String)
                ], UIAccount.prototype, "nick", void 0);
                __decorate([
                    core_39.Input(), 
                    __metadata('design:type', String)
                ], UIAccount.prototype, "avatarUrl", void 0);
                __decorate([
                    core_39.Input(), 
                    __metadata('design:type', String)
                ], UIAccount.prototype, "info", void 0);
                __decorate([
                    core_39.Input(), 
                    __metadata('design:type', Boolean)
                ], UIAccount.prototype, "isAudioEffectsEnabled", void 0);
                __decorate([
                    core_39.Input(), 
                    __metadata('design:type', Boolean)
                ], UIAccount.prototype, "isMobile", void 0);
                __decorate([
                    core_39.Input(), 
                    __metadata('design:type', Number)
                ], UIAccount.prototype, "mode", void 0);
                __decorate([
                    core_39.Input(), 
                    __metadata('design:type', Object)
                ], UIAccount.prototype, "callbacks", void 0);
                UIAccount = __decorate([
                    core_39.Component({
                        host: {
                            '(document:click)': 'onGlobalClick($event)',
                        },
                        selector: 'account',
                        styles: [".account header {  background: #34495E;  overflow: hidden;  cursor: pointer;  border-color: #34495E;  padding-left: 5px;  font-size: 13px;  padding-right: 45px;  min-width: 140px;  text-align: left; }  .account header:hover, .account header:active, .account header:focus {    text-decoration: none; }  .account header:hover {    border-color: #34495E; }  .account header div.avatar {    float: left;    width: 37px;    height: 40px; }    .account header div.avatar img {      height: 40px;      margin-right: 7px;      opacity: 0;      -moz-transition: all linear .1s;      -o-transition: all linear .1s;      -webkit-transition: all linear .1s;      transition: all linear .1s; }      .account header div.avatar img.transparent {        opacity: 0; }      .account header div.avatar img.loaded {        opacity: 1; }  .account header div.nick {    position: relative;    color: white;    margin-top: 4px; }  .account header div.info {    position: relative;    color: silver; }.account section {  background: rgba(0, 0, 0, 0.75);  padding: 15px;  position: absolute;  left: 0;  margin-top: 10px;  border-radius: 4px;  border: 1px solid #16a085;  min-width: 150px; }  .account section .btn-group {    margin-top: 5px;    margin-bottom: 10px; }  .account section button {    text-align: center; }  .account section:after, .account section:before {    bottom: 100%;    left: 24px;    border: solid transparent;    content: \" \";    height: 0;    width: 0;    position: absolute;    pointer-events: none; }  .account section:after {    border-color: rgba(24, 134, 112, 0);    border-bottom-color: rgba(0, 0, 0, 0.65);    border-width: 7px;    margin-left: -7px; }  .account section:before {    border-color: rgba(22, 160, 133, 0);    border-bottom-color: #16a085;    border-width: 8px;    margin-left: -8px; }"],
                        template: '<div class="account"><header (click)="onHeaderClick($event)" class="btn btn-default" (blur)="showSubmenu = false"><div class="avatar"><img [src]="avatarUrl" onload="javascript:$(this).addClass(\'loaded\')" [class.transparent]="!avatarUrl"></div><div class="nick"><span>{{nick}}</span></div><div class="info">{{info}}</div></header><section *ngIf="showSubmenu && (mode == 1)" class="menu"><div class="btn-group btn-group-justified" role="group"><a role="button" class="btn btn-primary btn-block" (click)="viewProfile()">{{\'account.ViewProfile\' | translate}}</a></div><div role="group"><button type="button" class="btn btn-danger btn-block" (click)="exit()">{{\'account.Logout\' | translate}}</button></div><div *ngIf="isAdmin" role="group"><hr><a type="button" class="btn btn-block btn-warning" href="https://jokerx.jok.io?platform=ios">Dev Portal</a> <button type="button" class="btn btn-block btn-warning" [routerLink]="[\'/Play\', \'Mock\']">Play Mock</button></div></section><section *ngIf="showSubmenu && (mode == 2)" class="menu"><div *ngIf="false" class="btn-group btn-group-justified" role="group"><a class="btn btn-primary btn-block">{{\'account.Feedback\' | translate}}</a></div><div *ngIf="!isMobile" class="btn-group btn-group-justified" role="group"><a class="btn btn-primary btn-block" (click)="clearChat()">{{\'account.ClearChat\' | translate}}</a></div><div class="btn-group btn-group-justified" role="group"><a role="button" class="btn" [ngClass]="audioOffClass" (click)="changeAudioOption(false)"><i class="fa fa-volume-off"></i></a> <a role="button" class="btn" [ngClass]="audioOnClass" (click)="changeAudioOption(true)"><i class="fa fa-volume-up"></i></a></div><div class role="group"><button type="button" class="btn btn-danger btn-block" (click)="exit()">{{\'account.LeaveGame\' | translate}}</button></div></section></div>',
                        directives: [router_7.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [core_39.ElementRef])
                ], UIAccount);
                return UIAccount;
            }());
            exports_58("UIAccount", UIAccount);
            (function (ViewMode) {
                ViewMode[ViewMode["Portal"] = 1] = "Portal";
                ViewMode[ViewMode["Game"] = 2] = "Game";
            })(ViewMode || (ViewMode = {}));
        }
    }
});
System.register("Common/Components/profile", ['angular2/core', "Common/Providers/UsersProvider", "Common/Providers/ProfileProvider"], function(exports_59, context_59) {
    "use strict";
    var __moduleName = context_59 && context_59.id;
    var core_40, UsersProvider_4, ProfileProvider_2;
    var UIProfile, ProfileModes, GamePlayer;
    return {
        setters:[
            function (core_40_1) {
                core_40 = core_40_1;
            },
            function (UsersProvider_4_1) {
                UsersProvider_4 = UsersProvider_4_1;
            },
            function (ProfileProvider_2_1) {
                ProfileProvider_2 = ProfileProvider_2_1;
            }],
        execute: function() {
            UIProfile = (function () {
                function UIProfile(profile, zone) {
                    this.profile = profile;
                    this.zone = zone;
                    this.rightToLeft = false;
                    this.enablePositionSelection = true;
                    this.chatmessage = '';
                    this.showBubble = false;
                }
                UIProfile.prototype.ngOnInit = function () {
                    var _this = this;
                    this.profile.activateEvent.subscribe(this.onActivateEvent.bind(this));
                    this.profile.stopActivateEvent.subscribe(function (x) { return _this.stopActivate(); });
                    this.profile.chatBubbleEvent.subscribe(function (x) { return _this.showChatBubble(x); });
                };
                UIProfile.prototype.onGlobalKeyUp = function () {
                    this.showSubmenu = false;
                };
                UIProfile.prototype.onGlobalClick = function () {
                    this.showSubmenu = false;
                };
                UIProfile.prototype.onActivateEvent = function (x) {
                    var _this = this;
                    this.zone.run(function () {
                        return _this.player && (_this.player.UserID == x.UserId) && _this.activate(x.Duration);
                    });
                };
                UIProfile.prototype.getMiniResult = function () {
                    var want = this.player.Want ? this.player.Want : (this.player.Want == 0 ? '0' : null);
                    return this.player.Took ? (this.player.Took + ' / ' + want) : (want == 0 ? '-' : want);
                };
                UIProfile.prototype.takenNeed = function () {
                    return this.player.Took && this.player.Want > this.player.Took;
                };
                UIProfile.prototype.takenCool = function () {
                    return this.player.Took && this.player.Want == this.player.Took;
                };
                UIProfile.prototype.takenOver = function () {
                    return this.player.Took && this.player.Want < this.player.Took;
                };
                UIProfile.prototype.getDisplayMode = function () {
                    if (!this.player)
                        return ProfileModes.PositionSelection;
                    if (this.mini)
                        return ProfileModes.MiniPlayer;
                    return ProfileModes.Player;
                };
                UIProfile.prototype.isFriend = function () {
                    return this.player && this.player.RelationStatusID == UsersProvider_4.UserRelationStatuses.Accepted;
                };
                UIProfile.prototype.isFriendRequestSent = function () {
                    return this.player && this.player.RelationStatusID == UsersProvider_4.UserRelationStatuses.Pending;
                };
                UIProfile.prototype.activate = function (duration) {
                    var _this = this;
                    this.stopActivate();
                    var maxAnimationDuration = 10 * 1000;
                    this.activateIndicatorWidth = 100;
                    var startDuration = duration > maxAnimationDuration ? duration - maxAnimationDuration : 0;
                    var animationDuration = duration > maxAnimationDuration ? maxAnimationDuration : duration;
                    this.activateTimeout = setTimeout(function () {
                        _this.activateInterval = setInterval(function () {
                            _this.activateIndicatorWidth--;
                            if (_this.activateIndicatorWidth <= 0)
                                _this.stopActivate();
                        }, animationDuration / 100);
                    }, startDuration);
                };
                UIProfile.prototype.stopActivate = function () {
                    var _this = this;
                    this.zone.run(function () {
                        clearTimeout(_this.activateTimeout);
                        clearInterval(_this.activateInterval);
                        _this.activateIndicatorWidth = 0;
                    });
                };
                UIProfile.prototype.getChatBubbleDirection = function () {
                    if (this.position == 1)
                        return this.mini ? 'bottomToUp' : 'leftToRight';
                    if (this.position == 2)
                        return 'leftToRight';
                    if (this.position == 3)
                        return this.mini ? 'rightToLeft' : 'leftToRight';
                    if (this.position == 4)
                        return 'rightToLeft';
                    return 'leftToRight';
                };
                UIProfile.prototype.onClick = function (ev) {
                    this.showBubble = false;
                    if (this.player && this.currentUserId != this.player.UserID) {
                        ev.stopPropagation();
                        this.showSubmenu = !this.showSubmenu;
                    }
                    else {
                        this.showSubmenu = false;
                    }
                    this.callbacks && this.callbacks.onClick && this.callbacks.onClick(ev, this.position, this.player ? this.player.UserID : null);
                };
                UIProfile.prototype.showChatBubble = function (info) {
                    var _this = this;
                    this.zone.run(function () {
                        if (!_this.player || info.UserId != _this.player.UserID)
                            return;
                        _this.chatmessage = info.Message;
                        _this.showBubble = false;
                        setTimeout(function () { return _this.showBubble = !_this.showBubble; }, 10);
                    });
                };
                UIProfile.prototype.onFriendRequest = function () {
                    this.player.RelationStatusID = UsersProvider_4.UserRelationStatuses.Pending;
                    this.callbacks && this.callbacks.onSendFriendRequest(this.player.UserID);
                };
                UIProfile.prototype.onBlock = function () {
                    this.player.IsBlocked = true;
                    this.callbacks && this.callbacks.onBlock(this.player.UserID);
                };
                UIProfile.prototype.onUnblock = function () {
                    this.player.IsBlocked = false;
                    this.callbacks && this.callbacks.onUnblock(this.player.UserID);
                };
                UIProfile.prototype.onListenChannel = function (e) {
                    e.stopPropagation();
                    this.callbacks.onListenChannel(this.player.MusicChannelName);
                };
                __decorate([
                    core_40.Input(), 
                    __metadata('design:type', GamePlayer)
                ], UIProfile.prototype, "player", void 0);
                __decorate([
                    core_40.Input(), 
                    __metadata('design:type', Number)
                ], UIProfile.prototype, "position", void 0);
                __decorate([
                    core_40.Input(), 
                    __metadata('design:type', Boolean)
                ], UIProfile.prototype, "mini", void 0);
                __decorate([
                    core_40.Input(), 
                    __metadata('design:type', Boolean)
                ], UIProfile.prototype, "isActive", void 0);
                __decorate([
                    core_40.Input(), 
                    __metadata('design:type', Number)
                ], UIProfile.prototype, "currentUserId", void 0);
                __decorate([
                    core_40.Input(), 
                    __metadata('design:type', Boolean)
                ], UIProfile.prototype, "rightToLeft", void 0);
                __decorate([
                    core_40.Input(), 
                    __metadata('design:type', Object)
                ], UIProfile.prototype, "callbacks", void 0);
                __decorate([
                    core_40.Input(), 
                    __metadata('design:type', Boolean)
                ], UIProfile.prototype, "enablePositionSelection", void 0);
                __decorate([
                    core_40.Input(), 
                    __metadata('design:type', Boolean)
                ], UIProfile.prototype, "isMusicPlayerAllowed", void 0);
                UIProfile = __decorate([
                    core_40.Component({
                        host: {
                            '(document:keyup)': 'onGlobalKeyUp($event)',
                            '(document:click)': 'onGlobalClick($event)',
                        },
                        selector: 'profile',
                        styles: [".profile {  position: relative;  text-align: center;  background: #34495e;  border: 1px solid #27AE60;  padding: 10px;  border-radius: 10px;  height: 172px;  width: 101px;  z-index: 50;  cursor: pointer; }  .profile.hide_pointer {    cursor: default; }  .profile .free_text {    margin-top: 50px; }    .profile .free_text div {      position: absolute;      bottom: 10px;      left: 0;      right: 0;      text-align: center;      font-size: 12px;      opacity: .4; }  .profile .nick {    color: white;    margin-top: 5px;    -moz-transition: all linear 50ms;    -o-transition: all linear 50ms;    -webkit-transition: all linear 50ms;    transition: all linear 50ms;    font-size: 13px;    padding: 1px;    white-space: nowrap;    border-radius: 3px;    position: relative; }    .profile .nick .inner {      position: absolute;      left: 0;      top: 0;      bottom: 0;      width: 100%;      z-index: -1;      border-radius: 2px;      -moz-transition: all 100ms linear;      -o-transition: all 100ms linear;      -webkit-transition: all 100ms linear;      transition: all 100ms linear; }  .profile.mini {    height: 60px;    padding: 5px;    border-top-width: 0; }    .profile.mini .nick {      margin-top: 0; }    .profile.mini:hover .nick {      -moz-transform: translate(0, -1px);      -ms-transform: translate(0, -1px);      -o-transform: translate(0, -1px);      -webkit-transform: translate(0, -1px);      transform: translate(0, -1px); }  .profile .music_player {    background-image: url(\"/images/musicplayer/speakers.png\");    background-size: 100% 100%;    position: absolute;    left: -6px;    top: -36px;    width: 105px;    height: 115px; }  .profile.vip .music_player {    background-image: url(\"/images/musicplayer/speakers_vip.png\");    background-size: 100% 100%; }  .profile .muted {    font-size: 20px;    position: absolute;    left: 8px;    top: 80px;    z-index: 21;    color: #D9534F; }  .profile .music_channel {    position: absolute;    top: 168px;    left: -28px;    color: white;    padding: 3px;    cursor: pointer;    border-radius: 10px;    z-index: 100;    right: -3px;    text-align: right; }    .profile .music_channel i {      opacity: .3; }    .profile .music_channel span {      display: inline-block;      width: 100px;      white-space: nowrap;      overflow: hidden;      -ms-text-overflow: ellipsis;      -o-text-overflow: ellipsis;      text-overflow: ellipsis;      vertical-align: bottom;      background-color: #34495e;      border-radius: 6px;      text-align: center;      padding-left: 5px;      padding-right: 5px; }    .profile .music_channel:hover i {      opacity: .8; }    .profile .music_channel:hover span {      background-color: rgba(0, 0, 0, 0.7); }  .profile img.avatar {    max-height: 100px;    width: 75px;    -moz-transition: all linear 50ms;    -o-transition: all linear 50ms;    -webkit-transition: all linear 50ms;    transition: all linear 50ms;    z-index: 10;    position: relative;    height: 100px; }  .profile:hover img.avatar {    -moz-transform: translate(0, -3px);    -ms-transform: translate(0, -3px);    -o-transform: translate(0, -3px);    -webkit-transform: translate(0, -3px);    transform: translate(0, -3px); }  .profile .level {    color: white;    font-size: 12px;    opacity: .6;    margin-top: 8px;    margin-left: -10px;    margin-right: -10px; }  .profile .mini_result {    text-align: center;    border-top: 1px solid #48627B;    z-index: 20;    margin-top: 3px;    padding-top: 4px; }    .profile .mini_result.need {      color: #FFB878; }    .profile .mini_result.cool {      color: #27ae60; }    .profile .mini_result.over {      color: #F77A48; }  .profile.activated .nick .inner {    background: #5cb85c;    -webkit-animation: BackgroundBitting 2s infinite;    -moz-animation: BackgroundBitting 2s infinite;    -o-animation: BackgroundBitting 2s infinite;    animation: BackgroundBitting 2s infinite; }  .profile .waiting {    color: white;    font-size: 20px;    margin-top: 40px;    margin-bottom: 30px; }  .profile .offline {    display: block;    background-color: #34495e;    border-radius: 3px;    color: silver;    position: absolute;    left: 15px;    right: 15px;    bottom: -11px;    z-index: 20;    border: 1px solid #27AE60;    font-size: 11px; }  .profile .chat_bubble {    position: absolute;    min-height: 60px;    min-width: 110px;    background: #F6FCFF;    max-width: 160px;    border: 1px solid #188670;    border-radius: 6px;    text-align: center;    z-index: 20;    visibility: collapse; }    .profile .chat_bubble div.inner {      justify-content: center;      margin: 17px;      -ms-text-overflow: ellipsis;      -o-text-overflow: ellipsis;      text-overflow: ellipsis;      overflow: hidden;      color: #34495E;      max-height: 121px; }    .profile .chat_bubble.leftToRight {      top: 25px;      left: 91px; }      .profile .chat_bubble.leftToRight:after {        content: '';        position: absolute;        border-style: solid;        border-width: 5px 8px 5px 0;        border-color: transparent #FFFFFF;        display: block;        width: 0;        z-index: 1;        margin-top: -5px;        left: -8px;        top: 25px; }      .profile .chat_bubble.leftToRight:before {        content: '';        position: absolute;        border-style: solid;        border-width: 5px 8px 5px 0;        border-color: transparent #7F7F7F;        display: block;        width: 0;        z-index: 0;        margin-top: -5px;        left: -9px;        top: 25px; }    .profile .chat_bubble.rightToLeft {      top: 25px;      right: 91px; }      .profile .chat_bubble.rightToLeft:after {        content: '';        position: absolute;        border-style: solid;        border-width: 5px 0 5px 8px;        border-color: transparent #FFFFFF;        display: block;        width: 0;        z-index: 1;        margin-top: -5px;        right: -8px;        top: 25px; }      .profile .chat_bubble.rightToLeft:before {        content: '';        position: absolute;        border-style: solid;        border-width: 5px 0 5px 8px;        border-color: transparent #7F7F7F;        display: block;        width: 0;        z-index: 0;        margin-top: -5px;        right: -9px;        top: 25px; }    .profile .chat_bubble.leftToRight.bubble, .profile .chat_bubble.rightToLeft.bubble {      -webkit-animation: Bubbling 5s linear;      -moz-animation: Bubbling 5s linear;      -o-animation: Bubbling 5s linear;      animation: Bubbling 5s linear; }    .profile .chat_bubble.bottomToUp {      bottom: 65px;      left: -6px;      width: 110px; }      .profile .chat_bubble.bottomToUp:after {        content: '';        position: absolute;        border-style: solid;        border-width: 8px 5px 0;        border-color: #FFFFFF transparent;        display: block;        width: 0;        z-index: 1;        margin-left: -5px;        bottom: -8px;        left: 50%; }      .profile .chat_bubble.bottomToUp:before {        content: '';        position: absolute;        border-style: solid;        border-width: 8px 5px 0;        border-color: #7F7F7F transparent;        display: block;        width: 0;        z-index: 0;        margin-left: -5px;        bottom: -9px;        left: 50%; }      .profile .chat_bubble.bottomToUp.bubble {        -webkit-animation: Bubbling 1.5s linear;        -moz-animation: Bubbling 1.5s linear;        -o-animation: Bubbling 1.5s linear;        animation: Bubbling 1.5s linear; }  .profile section {    background: white;    padding: 10px;    position: absolute;    left: 50%;    margin-top: 10px;    border-radius: 4px;    padding-bottom: 5px;    z-index: 30;    width: 200px;    margin-left: -100px;    box-shadow: 0 0 4px rgba(0, 0, 0, 0.4); }    .profile section [role=group] {      margin-top: 5px;      margin-bottom: 5px; }    .profile section:after, .profile section:before {      bottom: 100%;      left: 50%;      border: solid transparent;      content: \" \";      height: 0;      width: 0;      position: absolute;      pointer-events: none; }    .profile section:after {      border-color: rgba(24, 134, 112, 0);      border-bottom-color: white;      border-width: 7px;      margin-left: -7px; }    .profile section:before {      border-color: rgba(22, 160, 133, 0);      border-bottom-color: #16a085;      border-width: 8px;      margin-left: -8px; }    .profile section.invert {      bottom: 100%; }      .profile section.invert:after, .profile section.invert:before {        bottom: auto;        top: 100%; }      .profile section.invert:after {        border-bottom-color: transparent;        border-top-color: white; }      .profile section.invert:before {        border-bottom-color: transparent;        border-top-color: #16a085; }    .profile section .lvl-info {      color: black;      margin-top: 5px;      margin-bottom: 10px; }@-webkit-keyframes Bubbling {  0% {    visibility: visible;    opacity: 1; }  90% {    visibility: visible;    opacity: 1; }  100% {    visibility: collapse;    opacity: 0; } }@-moz-keyframes Bubbling {  0% {    visibility: visible;    opacity: 1; }  90% {    visibility: visible;    opacity: 1; }  100% {    visibility: collapse;    opacity: 0; } }@-o-keyframes Bubbling {  0% {    visibility: visible;    opacity: 1; }  90% {    visibility: visible;    opacity: 1; }  100% {    visibility: collapse;    opacity: 0; } }@keyframes Bubbling {  0% {    visibility: visible;    opacity: 1; }  90% {    visibility: visible;    opacity: 1; }  100% {    visibility: collapse;    opacity: 0; } }@-webkit-keyframes BackgroundBitting {  50% {    background: lime; } }@-moz-keyframes BackgroundBitting {  50% {    background: lime; } }@-o-keyframes BackgroundBitting {  50% {    background: lime; } }@keyframes BackgroundBitting {  50% {    background: lime; } }"],
                        template: '<div class="profile vip" (click)="onClick($event)" [class.mini]="mini" [class.activated]="isActive" [ngSwitch]="getDisplayMode()" [class.hide_pointer]="!enablePositionSelection && getDisplayMode() == 2"><template [ngSwitchWhen]="2"><div class="free_text" *ngIf="enablePositionSelection">{{ \'profile.Free\' | translate }}<br><div>{{ \'profile.TapToSit\' | translate }}</div></div><div class="free_text" *ngIf="!enablePositionSelection">{{ \'profile.Opponent\' | translate }}<br><div>{{ \'profile.WaitingForOpponent\' | translate }}</div></div></template><template [ngSwitchWhen]="3"><div class="music_player" *ngIf="isMusicPlayerAllowed && player.MusicChannelName"></div><img class="avatar" src="{{player.AvatarUri}}" style="display: inline;"><div class="waiting" style="display: none;"><i class="fa fa-circle-o-notch fa-spin"></i></div><div class="nick"><div class="inner" [style.width]="activateIndicatorWidth + \'%\'"></div>{{player.Nick}}</div><div *ngIf="!getMiniResult()" class="level">{{(player.LevelName || \'\') | translate}}</div><div *ngIf="!player.IsOnline" class="offline">{{ \'common.Offline\' | translate }}</div><div class="wins" style="display: none;"></div><div class="chat_bubble {{getChatBubbleDirection()}}" [class.bubble]="showBubble"><div class="inner bigsmile" [innerHtml]="chatmessage | emotions: true"></div></div><div *ngIf="player.IsBlocked" class="muted"><i class="fa fa-ban"></i></div><div class="music_channel" *ngIf="isMusicPlayerAllowed && player.MusicChannelName && !showSubmenu"><i class="fa fa-music"></i> <span data-toggle="tooltip" data-placement="bottom" [title]="\'profile.ListenSameChannel\' | translate" (click)="onListenChannel($event)">{{player.MusicChannelName}}</span></div><div *ngIf="getMiniResult()" class="mini_result" [class.need]="takenNeed()" [class.cool]="takenCool()" [class.over]="takenOver()">{{getMiniResult()}}</div></template><template [ngSwitchWhen]="4"><div class="nick"><div class="inner" [style.width]="activateIndicatorWidth + \'%\'"></div><span *ngIf="position == 1">{{ \'profile.Me\' | translate }}</span> <span *ngIf="position != 1">{{ player.Nick }}</span></div><div *ngIf="!getMiniResult()" class="level">{{(player.LevelName || \'\') | translate}}</div><div *ngIf="getMiniResult()" class="mini_result" [class.need]="takenNeed()" [class.cool]="takenCool()" [class.over]="takenOver()">{{getMiniResult()}}</div><div class="chat_bubble {{getChatBubbleDirection()}}" [class.bubble]="showBubble"><div class="inner" [innerHtml]="chatmessage | emotions: true"></div></div></template><section *ngIf="showSubmenu && player" class="menu" [class.invert]="position == 1"><div class="lvl-info">{{player.LevelName | translate}}</div><div role="group"><button *ngIf="!isFriend() && !isFriendRequestSent()" type="button" class="btn btn-default btn-block" (click)="onFriendRequest()">{{ \'profile.FriendRequest\' | translate }} <i class="fa fa-user"></i></button> <button *ngIf="isFriendRequestSent()" type="button" class="btn btn-default btn-block disabled">{{ \'profile.FriendRequestSent\' | translate }} <i class="fa fa-user"></i></button> <button *ngIf="isFriend()" type="button" class="btn btn-default btn-block disabled">{{ \'profile.Friend\' | translate }} <i class="fa fa-user"></i></button></div><div role="group"><button *ngIf="!player.IsBlocked" type="button" class="btn btn-danger btn-block" (click)="onBlock()">{{ \'profile.Block\' | translate }} <i class="fa fa-ban"></i></button> <button *ngIf="player.IsBlocked" type="button" class="btn btn-danger btn-block" (click)="onUnblock()">{{ \'profile.Unblock\' | translate }}</button></div></section></div>'
                    }), 
                    __metadata('design:paramtypes', [ProfileProvider_2.ProfileProvider, core_40.NgZone])
                ], UIProfile);
                return UIProfile;
            }());
            exports_59("UIProfile", UIProfile);
            (function (ProfileModes) {
                ProfileModes[ProfileModes["Empty"] = 1] = "Empty";
                ProfileModes[ProfileModes["PositionSelection"] = 2] = "PositionSelection";
                ProfileModes[ProfileModes["Player"] = 3] = "Player";
                ProfileModes[ProfileModes["MiniPlayer"] = 4] = "MiniPlayer";
            })(ProfileModes || (ProfileModes = {}));
            GamePlayer = (function () {
                function GamePlayer() {
                }
                return GamePlayer;
            }());
        }
    }
});
System.register("Common/Components/languages", ['angular2/core', "Common/Providers/ConfigProvider", "Common/Providers/CurrentUserProvider"], function(exports_60, context_60) {
    "use strict";
    var __moduleName = context_60 && context_60.id;
    var core_41, ConfigProvider_6, CurrentUserProvider_5;
    var UILanguages;
    return {
        setters:[
            function (core_41_1) {
                core_41 = core_41_1;
            },
            function (ConfigProvider_6_1) {
                ConfigProvider_6 = ConfigProvider_6_1;
            },
            function (CurrentUserProvider_5_1) {
                CurrentUserProvider_5 = CurrentUserProvider_5_1;
            }],
        execute: function() {
            UILanguages = (function () {
                function UILanguages(currentUser, config) {
                    this.currentUser = currentUser;
                    this.config = config;
                    this.languages = ['en', 'ka', 'ru'];
                    this.isOpen = false;
                }
                UILanguages.prototype.getLanguages = function () {
                    var tempLanguages = this.languages;
                    var count = 0;
                    while (tempLanguages.indexOf(this.config.activeLang) != 0 && count < 3) {
                        tempLanguages.unshift(tempLanguages.pop());
                        count++;
                    }
                    return tempLanguages;
                };
                UILanguages.prototype.selectLanguage = function (lang) {
                    var isActive = this.languages.indexOf(lang) == 0;
                    if (isActive) {
                        this.isOpen = !this.isOpen;
                        return;
                    }
                    this.isOpen = false;
                    this.currentUser.useLang(lang);
                };
                UILanguages = __decorate([
                    core_41.Component({
                        selector: 'languages',
                        styles: [".languages > div {  margin-bottom: 20px;  text-align: right;  color: rgba(255, 255, 255, 0.7);  padding: 10px 15px 10px 20px;  display: none;  text-shadow: 0 0 1px gray;  min-width: 150px; }  .languages > div.active {    display: block; }  .languages > div > img {    max-height: 30px;    vertical-align: middle;    margin-left: 10px; }  .languages > div:hover {    background: rgba(0, 0, 0, 0.57);    border-radius: 3px;    cursor: pointer; }.languages.open > div {  display: block;  color: rgba(255, 255, 255, 0.9); }"],
                        template: '<div class="languages" [class.open]="isOpen"><div *ngFor="#lang of getLanguages()" [class.active]="languages.indexOf(lang) == 0" (click)="selectLanguage(lang)">{{\'common.Languages.\' + lang | translate}} <img src="/images/flags/{{lang}}.png" [alt]="lang"></div></div>'
                    }), 
                    __metadata('design:paramtypes', [CurrentUserProvider_5.CurrentUserProvider, ConfigProvider_6.ConfigProvider])
                ], UILanguages);
                return UILanguages;
            }());
            exports_60("UILanguages", UILanguages);
        }
    }
});
System.register("Common/Components/All", ["Common/Components/account", "Common/Components/profile", "Common/Components/languages", "Common/Components/achievement", "Common/Components/levelprogress"], function(exports_61, context_61) {
    "use strict";
    var __moduleName = context_61 && context_61.id;
    function exportStar_3(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_61(exports);
    }
    return {
        setters:[
            function (account_1_1) {
                exportStar_3(account_1_1);
            },
            function (profile_1_1) {
                exportStar_3(profile_1_1);
            },
            function (languages_1_1) {
                exportStar_3(languages_1_1);
            },
            function (achievement_2_1) {
                exportStar_3(achievement_2_1);
            },
            function (levelprogress_2_1) {
                exportStar_3(levelprogress_2_1);
            }],
        execute: function() {
        }
    }
});
System.register("Modules/Joker/finishinfo", ['angular2/core', "Common/Components/All", "Common/Providers/CurrentUserProvider", "Modules/Joker/Models/All", "Modules/Joker/Providers/GameProvider"], function(exports_62, context_62) {
    "use strict";
    var __moduleName = context_62 && context_62.id;
    var core_42, All_8, CurrentUserProvider_6, All_9, GameProvider_1;
    var UIFinishInfo;
    return {
        setters:[
            function (core_42_1) {
                core_42 = core_42_1;
            },
            function (All_8_1) {
                All_8 = All_8_1;
            },
            function (CurrentUserProvider_6_1) {
                CurrentUserProvider_6 = CurrentUserProvider_6_1;
            },
            function (All_9_1) {
                All_9 = All_9_1;
            },
            function (GameProvider_1_1) {
                GameProvider_1 = GameProvider_1_1;
            }],
        execute: function() {
            UIFinishInfo = (function () {
                function UIFinishInfo(game, currentUser) {
                    this.game = game;
                    this.currentUser = currentUser;
                    this.playerIndexes = [0, 1, 2, 3];
                    game.OnFinishAnimation = this.onFinishAnimation.bind(this);
                }
                UIFinishInfo.prototype.getAddedRating = function () {
                    var _this = this;
                    if (!this.source || !this.source.Players || !this.currentUser || !this.currentUser.Data)
                        return;
                    var pr = this.source.Players.filter(function (x) { return x.UserID == _this.currentUser.Data.UserID; })[0];
                    if (!pr)
                        return;
                    if (!pr.Rating)
                        return '+';
                    if (pr.Rating > 0)
                        return '+' + pr.Rating;
                    return pr.Rating;
                };
                UIFinishInfo.prototype.getPlaceStars = function () {
                    return (this.game.VM.FinishInfo.PlaceStars > 0 ? '+' : '') + this.game.VM.FinishInfo.PlaceStars;
                };
                UIFinishInfo.prototype.playNewGame = function () {
                    this.game.uiPlayNewGame();
                };
                UIFinishInfo.prototype.viewProfile = function (userid) {
                    window.open('http://jok.io/' + userid);
                };
                UIFinishInfo.prototype.exit = function () {
                    console.log(this.currentUser.Data);
                    this.game.uiExit();
                };
                UIFinishInfo.prototype.onFinishAnimation = function (addedStars, newStars) {
                    var _this = this;
                    if (this.source.IsIgnored)
                        return;
                    console.log('stars was', this.currentUser.RatingStars);
                    this.stars = this.currentUser.RatingStars;
                    if ((this.stars + addedStars != newStars) && (addedStars + newStars > 0)) {
                        this.stars = newStars - addedStars;
                    }
                    var isPositive = addedStars > 0;
                    if (!addedStars)
                        return;
                    setTimeout(function () {
                        var interval = setInterval(function () {
                            if (!addedStars) {
                                clearInterval(interval);
                                return;
                            }
                            _this.stars += isPositive ? 1 : -1;
                            addedStars -= isPositive ? 1 : -1;
                            if (_this.stars % 4 == 0 && isPositive)
                                _this.game.playAudio(GameProvider_1.PlayAudioModes.LevelUp);
                            else
                                _this.game.playAudio(isPositive ? GameProvider_1.PlayAudioModes.AddStar : GameProvider_1.PlayAudioModes.RemoveStar);
                        }, 500);
                    }, 1000);
                };
                __decorate([
                    core_42.Input(), 
                    __metadata('design:type', All_9.FinishInfoModel)
                ], UIFinishInfo.prototype, "source", void 0);
                UIFinishInfo = __decorate([
                    core_42.Component({
                        selector: 'finishinfo',
                        styles: [".finishinfo {  z-index: 1; }  .finishinfo table {    z-index: 1;    background: #34495E;    color: white;    font-size: 12px;    text-align: center;    border-radius: 4px; }    .finishinfo table td {      padding: 9px;      min-width: 110px; }    .finishinfo table thead {      z-index: 1; }      .finishinfo table thead tr {        z-index: 1; }        .finishinfo table thead tr td {          z-index: 1;          padding: 19px 5px;          font-size: 14px;          border-bottom: 1px solid #596B7C;          vertical-align: top;          cursor: pointer; }          .finishinfo table thead tr td:hover {            background: rgba(255, 255, 255, 0.1); }          .finishinfo table thead tr td div.player {            margin-top: 12px; }            .finishinfo table thead tr td div.player .score {              display: inline-block;              min-width: 40px;              background: #3d5165; }          .finishinfo table thead tr td div.place {            font-size: 30px;            float: left;            color: rgba(255, 255, 255, 0.3); }    .finishinfo table tbody {      z-index: 1; }      .finishinfo table tbody tr {        z-index: 1;        font-size: 14px; }        .finishinfo table tbody tr td {          z-index: 1; }        .finishinfo table tbody tr div {          opacity: .3; }      .finishinfo table tbody tr.place {        font-size: 30px;        border-bottom: 1px solid #596B7C; }      .finishinfo table tbody tr.score {        display: none; }        .finishinfo table tbody tr.score td {          padding: 10px 5px;          padding-top: 20px; }      .finishinfo table tbody tr.levelprogress {        border-bottom: 1px solid #596B7C; }        .finishinfo table tbody tr.levelprogress levelprogress {          font-size: 16px;          margin-bottom: 10px;          margin-top: 10px;          display: inline-block; }        .finishinfo table tbody tr.levelprogress .limitwidth {          max-width: 400px;          margin-left: auto;          margin-right: auto;          margin-bottom: 0; }        .finishinfo table tbody tr.levelprogress div {          font-size: 13px;          opacity: 1; }      .finishinfo table tbody tr.points {        border-bottom: 1px solid #596B7C; }        .finishinfo table tbody tr.points td {          padding-top: 20px;          padding-bottom: 20px; }        .finishinfo table tbody tr.points span {          color: orange; }      .finishinfo table tbody tr.achievements {        border-bottom: 1px solid #596B7C; }        .finishinfo table tbody tr.achievements.disable_stars achievement span.info {          color: silver; }      .finishinfo table tbody tr.rating {        border-bottom: 1px solid #596B7C;        margin-bottom: 10px; }        .finishinfo table tbody tr.rating td {          padding-top: 20px;          padding-bottom: 20px; }        .finishinfo table tbody tr.rating span {          color: #27ae60; }          .finishinfo table tbody tr.rating span.negative {            color: indianred; }      .finishinfo table tbody tr.actions td {        padding-top: 15px;        padding-bottom: 15px; }        .finishinfo table tbody tr.actions td button {          min-width: 205px; }  .finishinfo achievement {    display: inline-block;    margin-left: 20px;    margin-right: 20px;    background: #72818f;    border-radius: 5px; }"],
                        template: '<div class="finishinfo"><table class><thead><tr><td *ngFor="#i of playerIndexes" (click)="viewProfile(source.Players[i].UserID)"><div class="place">{{ source.Players[i].Place }}</div><div *ngIf="source.Players[i]" class="player"><div class="nick">{{ source.Players[i].Nick }}</div><div class="label label-success score">{{ source.Players[i].Score }}</div></div></td></tr></thead><tbody><tr class="place hidden"><td *ngFor="#i of playerIndexes">{{source.Players[i].Place}}</td></tr><tr *ngIf="false" class="score"><td *ngFor="#i of playerIndexes"><span>{{source.Players[i].Score}}</span></td></tr><tr class="points hidden"><td *ngFor="#i of playerIndexes"><span>+{{source.Players[i].Points}}</span><div>{{ \'common.Points\' | translate }}</div></td></tr><tr class="rating hidden" *ngIf="getAddedRating()"><td colspan="4" class="text-center"><span [class.negative]="getAddedRating() < 0">{{getAddedRating()}}</span><div>{{ \'common.Rating\' | translate }}</div></td></tr><tr *ngIf="stars >= 0 && !source.IsIgnored" class="levelprogress"><td colspan="4"><levelprogress [stars]="stars"></levelprogress></td></tr><tr *ngIf="source.IsIgnored" class="levelprogress"><td colspan="4"><div *ngIf="source.IsLowLevelPlayersGame" class="alert alert-info limitwidth">{{\'finishinfo.LowLevelPlayersGameInfo\' | translate}}</div></td></tr><tr *ngIf="source.Achievements" class="achievements" [class.disable_stars]="source.IsIgnored"><td colspan="4"><achievement *ngIf="source.Achievements.Place1" [title]="\'achievements.TitlePlace\' | translate"><span logo>1</span> <span bonusinfo class="info">{{getPlaceStars()}} <i class="fa fa-star" aria-hidden="true"></i></span></achievement><achievement *ngIf="source.Achievements.Place2" [title]="\'achievements.TitlePlace\' | translate"><span logo>2</span> <span bonusinfo class="info">{{getPlaceStars()}} <i class="fa fa-star" aria-hidden="true"></i></span></achievement><achievement *ngIf="source.Achievements.Place3" [title]="\'achievements.TitlePlace\' | translate"><span logo>3</span> <span bonusinfo class="info">{{getPlaceStars()}} <i class="fa fa-star" aria-hidden="true"></i></span></achievement><achievement *ngIf="source.Achievements.Place4" [title]="\'achievements.TitlePlace\' | translate"><span logo>4</span> <span bonusinfo class="info">{{getPlaceStars()}} <i class="fa fa-star" aria-hidden="true"></i></span></achievement><achievement *ngIf="source.Achievements.Premia" [pretitle]="(source.Achievements.Premia > 1 ? (source.Achievements.Premia + \'x \') : \'\')" [title]="\'achievements.TitlePremia\' | translate"><span logo><i class="fa fa-diamond" aria-hidden="true"></i></span> <span bonusinfo class="info">+{{source.Achievements.Premia}} <i class="fa fa-star" aria-hidden="true"></i></span></achievement><achievement *ngIf="source.Achievements.Full9" [pretitle]="(source.Achievements.Full9 > 1 ? (source.Achievements.Full9 + \'x \') : \'\')" [title]="\'achievements.Title9From9\' | translate"><span logo>9/9</span> <span bonusinfo class="info">+{{source.Achievements.Full9 * 2}} <i class="fa fa-star" aria-hidden="true"></i></span></achievement></td></tr><tr class="actions"><td colspan="4"><button class="btn btn-danger pull-left" (click)="exit()">{{ \'finishinfo.LeaveGame\' | translate }}</button> <button class="btn btn-primary pull-right" (click)="playNewGame()">{{ \'finishinfo.NewGame\' | translate }}</button><br><br></td></tr></tbody></table></div>',
                        directives: [All_8.UIAchievement, All_8.UILevelProgress]
                    }), 
                    __metadata('design:paramtypes', [GameProvider_1.GameProvider, CurrentUserProvider_6.CurrentUserProvider])
                ], UIFinishInfo);
                return UIFinishInfo;
            }());
            exports_62("UIFinishInfo", UIFinishInfo);
        }
    }
});
System.register("Modules/Joker/infopanel", ['angular2/core', 'ng2-translate'], function(exports_63, context_63) {
    "use strict";
    var __moduleName = context_63 && context_63.id;
    var core_43, ng2_translate_3;
    var UIInfoPanel;
    return {
        setters:[
            function (core_43_1) {
                core_43 = core_43_1;
            },
            function (ng2_translate_3_1) {
                ng2_translate_3 = ng2_translate_3_1;
            }],
        execute: function() {
            UIInfoPanel = (function () {
                function UIInfoPanel(translate) {
                    this.translate = translate;
                }
                UIInfoPanel.prototype.hasDominatedColor = function () {
                    return this.dominatedcolor != null && this.dominatedcolor >= 0;
                };
                UIInfoPanel.prototype.getDringText = function () {
                    return this.dring ? -this.dring : this.translate.get('infopanel.Special');
                };
                UIInfoPanel.prototype.isShetenva = function () {
                    return this.balanceNumber > 0;
                };
                UIInfoPanel.prototype.getBalance = function () {
                    return Math.abs(this.balanceNumber);
                };
                UIInfoPanel.prototype.getDring = function () {
                    return -Math.abs(this.dring);
                };
                UIInfoPanel.prototype.getChannel = function () {
                    if (!parseInt(this.channel) || !/^\d+$/.test(this.channel) || this.hasDominatedColor())
                        return '';
                    return this.channel;
                };
                __decorate([
                    core_43.Input(), 
                    __metadata('design:type', String)
                ], UIInfoPanel.prototype, "channel", void 0);
                __decorate([
                    core_43.Input(), 
                    __metadata('design:type', Number)
                ], UIInfoPanel.prototype, "dring", void 0);
                __decorate([
                    core_43.Input(), 
                    __metadata('design:type', Number)
                ], UIInfoPanel.prototype, "dominatedcolor", void 0);
                __decorate([
                    core_43.Input(), 
                    __metadata('design:type', Number)
                ], UIInfoPanel.prototype, "balanceNumber", void 0);
                UIInfoPanel = __decorate([
                    core_43.Component({
                        selector: 'infopanel',
                        styles: [".infopanel {  position: absolute;  padding: 10px;  text-align: center;  padding-top: 3px;  border-radius: 4px;  font-size: 14px;  min-width: 190px; }  .infopanel header {    padding: 14px;    color: #ffffff;    text-align: center;    margin-top: 27px;    border: 1px solid rgba(255, 255, 255, 0.09);    border-top: 0;    border-left: 0;    border-radius: 0 0 25px 0; }    .infopanel header i {      margin-right: 10px; }    .infopanel header span {      min-width: 30px; }    .infopanel header span.lessOpacity {      opacity: .6; }    .infopanel header span.jok_card_color {      margin-left: 10px;      height: 10px;      width: 50px;      display: inline-block;      border-radius: 2px; }    .infopanel header img {      margin-left: 8px;      vertical-align: middle;      height: 20px; }  .infopanel section {    background: #34495E;    padding: 9px;    border-radius: 5px;    display: none;    position: absolute;    top: 0;    left: 0;    right: 0; }    .infopanel section .item {      margin-top: 5px;      margin-bottom: 5px;      color: rgba(255, 255, 255, 0.7);      text-align: center;      padding-left: 10px;      padding-right: 10px;      font-size: 13px; }      .infopanel section .item span {        color: rgba(255, 255, 255, 0.9); }      .infopanel section .item img.emoji {        height: 45px;        margin-top: 5px; }    .infopanel section .dominated_color {      margin-bottom: 10px;      padding: 5px 14px;      border-radius: 4px;      font-size: 13px;      margin-top: 10px; }  .infopanel:hover section {    display: block; }.jok_card_color.color_0 {  background-color: #2980b9;  border: 1px solid #126195;  color: rgba(255, 255, 255, 0.9); }.jok_card_color.color_1 {  background-color: #e67e22;  border: 1px solid #c46816;  color: rgba(255, 255, 255, 0.9); }.jok_card_color.color_2 {  background-color: #bf3902;  border: 1px solid #882c07;  color: rgba(255, 255, 255, 0.9); }.jok_card_color.color_3 {  background-color: #9b59b6;  border: 1px solid #793c92;  color: rgba(255, 255, 255, 0.9); }.jok_card_color.color_4 {  background-color: white;  border: 1px solid silver;  color: gray; }.jok_card_color.dominated_color {  border: 1px dashed rgba(255, 255, 255, 0.498039); }"],
                        template: '<div class="infopanel"><header><span *ngIf="getChannel()"><span class="lessOpacity">{{\'infopanel.Room\' | translate}}:</span><br>{{getChannel()}}</span> <span *ngIf="dring && !getChannel()">{{ getDring() }}</span> <span *ngIf="!dring && !getChannel()">{{ \'infopanel.Special\' | translate }}</span> <span *ngIf="hasDominatedColor()" class="jok_card_color color_{{dominatedcolor}}"></span> <span *ngIf="balanceNumber"><img *ngIf="isShetenva()" draggable="false" class="emoji" alt="??" src="/images/shetenva.png" style="margin-top: -6px;"> <img *ngIf="!isShetenva()" draggable="false" class="emoji" alt="?" src="/images/waglejva3.png"> {{ getBalance() }}</span></header><section><div class="item">{{ \'infopanel.LabelDring\' | translate }}: <span *ngIf="dring">{{ getDring() }}</span> <span *ngIf="!dring">{{ \'infopanel.Special\' | translate }}</span></div><div *ngIf="hasDominatedColor()" class="dominated_color jok_card_color color_{{dominatedcolor}}">{{ (dominatedcolor == 4 ? \'infopanel.NoDominatedColor\' : \'infopanel.DominatedColor\') | translate }}</div><div *ngIf="balanceNumber" class="item"><img *ngIf="isShetenva()" draggable="false" class="emoji" alt="??" src="/images/shetenva.png"> <img *ngIf="!isShetenva()" draggable="false" class="emoji" alt="?" src="/images/waglejva3.png"></div><div *ngIf="balanceNumber">{{ (isShetenva() ? \'infopanel.LabelBalanceExtraCards\' : \'infopanel.LabelBalanceInsufficiency\') | translate }} {{ getBalance() }}</div></section></div>'
                    }), 
                    __metadata('design:paramtypes', [ng2_translate_3.TranslateService])
                ], UIInfoPanel);
                return UIInfoPanel;
            }());
            exports_63("UIInfoPanel", UIInfoPanel);
        }
    }
});
System.register("Common/ignoreContextMenu", ['angular2/core'], function(exports_64, context_64) {
    "use strict";
    var __moduleName = context_64 && context_64.id;
    var core_44;
    var IgnoreContextMenu;
    return {
        setters:[
            function (core_44_1) {
                core_44 = core_44_1;
            }],
        execute: function() {
            IgnoreContextMenu = (function () {
                function IgnoreContextMenu(el) {
                    this.preventLongPressMenu(el.nativeElement);
                }
                IgnoreContextMenu.prototype.absorbEvent_ = function (event) {
                    var e = event || window.event;
                    e.preventDefault && e.preventDefault();
                    e.stopPropagation && e.stopPropagation();
                    e.cancelBubble = true;
                    e.returnValue = false;
                    return false;
                };
                IgnoreContextMenu.prototype.preventLongPressMenu = function (node) {
                    node.ontouchstart = this.absorbEvent_;
                    node.ontouchmove = this.absorbEvent_;
                    node.ontouchend = this.absorbEvent_;
                    node.ontouchcancel = this.absorbEvent_;
                };
                IgnoreContextMenu = __decorate([
                    core_44.Directive({
                        selector: '[ignoreContextMenu]'
                    }), 
                    __metadata('design:paramtypes', [core_44.ElementRef])
                ], IgnoreContextMenu);
                return IgnoreContextMenu;
            }());
            exports_64("IgnoreContextMenu", IgnoreContextMenu);
        }
    }
});
System.register("Modules/Joker/notification", ['angular2/core', "Modules/Joker/Models/All"], function(exports_65, context_65) {
    "use strict";
    var __moduleName = context_65 && context_65.id;
    var core_45, All_10;
    var UINotification;
    return {
        setters:[
            function (core_45_1) {
                core_45 = core_45_1;
            },
            function (All_10_1) {
                All_10 = All_10_1;
            }],
        execute: function() {
            UINotification = (function () {
                function UINotification() {
                }
                UINotification.prototype.reconnect = function () {
                    document.location.reload(true);
                };
                __decorate([
                    core_45.Input(), 
                    __metadata('design:type', Number)
                ], UINotification.prototype, "type", void 0);
                __decorate([
                    core_45.Input(), 
                    __metadata('design:type', String)
                ], UINotification.prototype, "inviteLink", void 0);
                __decorate([
                    core_45.Input(), 
                    __metadata('design:type', String)
                ], UINotification.prototype, "playerNick", void 0);
                __decorate([
                    core_45.Input(), 
                    __metadata('design:type', Number)
                ], UINotification.prototype, "gameStartSeconds", void 0);
                UINotification = __decorate([
                    core_45.Component({
                        selector: 'notification',
                        styles: [".notification .content {  background: #34495E;  border: 1px solid #20374D;  text-align: center;  padding: 10px;  border-radius: 10px;  width: 400px;  position: absolute;  left: 50%;  margin-left: -200px;  top: 50%;  margin-top: -50px;  z-index: 3000; }  .notification .content._6 {    margin-top: -100px; }    .notification .content._6 div {      margin-top: 10px;      margin-bottom: 10px; }    .notification .content._6 ul {      margin-top: 15px;      margin-bottom: 15px;      opacity: 0.6; }.notification input {  background: #5B728A;  color: white; }"],
                        template: '<div class="notification" *ngIf="type"><div [ngSwitch]="type" class="content _{{type}}"><template [ngSwitchWhen]="1">{{\'notification.ConnectingServerLabel\' | translate}} {{ playerNick }} ...</template><template [ngSwitchWhen]="2">{{\'notification.AuthenticatingLabel\' | translate}}</template><template [ngSwitchWhen]="3">{{\'notification.RequireAuthorizationLabel\' | translate}}</template><template [ngSwitchWhen]="4">{{\'notification.WaitingForOpponentLabel\' | translate}}</template><template [ngSwitchWhen]="6"><div>{{\'notification.ConnectionClosedLabel\' | translate}}</div><div><ul class="text-left"><li>{{ \'notification.ConnectionClosedReason1\' | translate }}</li><li>{{ \'notification.ConnectionClosedReason2\' | translate }}</li></ul></div><div><button class="btn btn-default" (click)="reconnect()">{{ \'notification.ReconnectButton\' | translate }}</button></div></template><template [ngSwitchWhen]="8">{{\'notification.GameStartingLabel\' | translate : { seconds: gameStartSeconds } }}</template></div></div>'
                    }), 
                    __metadata('design:paramtypes', [])
                ], UINotification);
                return UINotification;
            }());
            exports_65("UINotification", UINotification);
        }
    }
});
System.register("Common/hover", ['angular2/core'], function(exports_66, context_66) {
    "use strict";
    var __moduleName = context_66 && context_66.id;
    var core_46;
    var HoverDirective;
    return {
        setters:[
            function (core_46_1) {
                core_46 = core_46_1;
            }],
        execute: function() {
            HoverDirective = (function () {
                function HoverDirective(el) {
                    var $el = $(el.nativeElement);
                    $el.on('touchstart', function (e) {
                        e.stopPropagation();
                        if (!$el.hasClass('hover'))
                            $el.addClass('hover');
                    });
                    $el.on('touchend', function (e) {
                        e.stopPropagation();
                        $el.removeClass('hover');
                    });
                    $el.on('touchcancel', function (e) {
                        e.stopPropagation();
                        $el.removeClass('hover');
                    });
                }
                HoverDirective = __decorate([
                    core_46.Directive({
                        selector: '[hover]'
                    }), 
                    __metadata('design:paramtypes', [core_46.ElementRef])
                ], HoverDirective);
                return HoverDirective;
            }());
            exports_66("HoverDirective", HoverDirective);
        }
    }
});
System.register("Modules/Joker/results", ['angular2/core', 'angular2/common', 'Jok/Platforms', "Common/hover", "Modules/Joker/Pipes/EscapeWantZero", "Modules/Joker/Pipes/TotalResult", "Modules/Joker/Pipes/Result"], function(exports_67, context_67) {
    "use strict";
    var __moduleName = context_67 && context_67.id;
    var core_47, common_4, Platforms_5, hover_1, EscapeWantZero_1, TotalResult_1, Result_1;
    var UIResults;
    return {
        setters:[
            function (core_47_1) {
                core_47 = core_47_1;
            },
            function (common_4_1) {
                common_4 = common_4_1;
            },
            function (Platforms_5_1) {
                Platforms_5 = Platforms_5_1;
            },
            function (hover_1_1) {
                hover_1 = hover_1_1;
            },
            function (EscapeWantZero_1_1) {
                EscapeWantZero_1 = EscapeWantZero_1_1;
            },
            function (TotalResult_1_1) {
                TotalResult_1 = TotalResult_1_1;
            },
            function (Result_1_1) {
                Result_1 = Result_1_1;
            }],
        execute: function() {
            UIResults = (function () {
                function UIResults(platform) {
                    this.platform = platform;
                    this.playerIndexes = [0, 1, 2, 3];
                    this.sectionItemsStandard = [[1, 2, 3, 4, 5, 6, 7, 8], [9, 9, 9, 9], [8, 7, 6, 5, 4, 3, 2, 1], [9, 9, 9, 9]];
                    this.sectionItems9 = [[9, 9, 9, 9], [9, 9, 9, 9], [9, 9, 9, 9], [9, 9, 9, 9]];
                }
                UIResults.prototype.getStructure = function () {
                    return this.isStandard ? this.sectionItemsStandard : this.sectionItems9;
                };
                UIResults.prototype.onViewProfile = function (userid) {
                    this.platform.viewProfile(userid);
                };
                __decorate([
                    core_47.Input(), 
                    __metadata('design:type', Array)
                ], UIResults.prototype, "source", void 0);
                __decorate([
                    core_47.Input(), 
                    __metadata('design:type', Array)
                ], UIResults.prototype, "players", void 0);
                __decorate([
                    core_47.Input(), 
                    __metadata('design:type', Boolean)
                ], UIResults.prototype, "isStandard", void 0);
                __decorate([
                    core_47.Input(), 
                    __metadata('design:type', Boolean)
                ], UIResults.prototype, "isCompact", void 0);
                UIResults = __decorate([
                    core_47.Component({
                        selector: 'results',
                        styles: [".results table {  font-size: 12px;  width: 100%;  border-collapse: collapse;  background: #34495e;  color: white;  border-radius: 15px 0 15px 10px;  border: 3px solid #27AE60;  display: block;  table-layout: fixed; }  .results table thead td {    border-left: 1px solid #596b7c;    height: 100px;    width: 68px;    text-align: center;    vertical-align: top; }    .results table thead td:first-child {      border-left: 0;      width: 25px; }    .results table thead td .player {      cursor: pointer; }      .results table thead td .player img.avatar {        height: 60px;        margin-top: 10px; }      .results table thead td .player div.nick {        width: 64px;        overflow: hidden;        white-space: nowrap;        -ms-text-overflow: ellipsis;        -o-text-overflow: ellipsis;        text-overflow: ellipsis;        height: 24px;        margin-top: 5px;        color: #A9A9A9; }      .results table thead td .player div.level {        opacity: .3;        color: white;        border-top: 1px solid rgba(192, 192, 192, 0.23);        padding-top: 3px;        padding-bottom: 3px;        width: 64px;        overflow: hidden;        white-space: nowrap;        -ms-text-overflow: ellipsis;        -o-text-overflow: ellipsis;        text-overflow: ellipsis; }      .results table thead td .player.offline {        opacity: .5; }      .results table thead td .player:hover img.avatar {        transform: translateY(-3px); }  .results table tbody {    overflow-y: visible;    display: none; }    .results table tbody.active {      display: table-row-group; }    .results table tbody tr:first-child td {      border-top: 1px solid #596b7c; }    .results table tbody td:first-child {      color: silver; }      .results table tbody td:first-child.active {        color: white; }    .results table tbody td {      padding: 2px 4px;      height: 22px; }      .results table tbody td.bad {        color: #A9A9A9; }      .results table tbody td.good {        color: #27AE60; }      .results table tbody td.double div::before {        content: '2x ';        position: absolute;        color: #6ECE98;        margin-left: -10px;        font-weight: normal;        font-size: 10px;        margin-top: 2px; }      .results table tbody td.ignored div {        text-decoration: line-through; }    .results table tbody tr:not(.totals) td {      border-left: 1px solid #596b7c;      text-align: center; }      .results table tbody tr:not(.totals) td:first-child {        border-left: 0;        width: 26px;        text-align: center; }      .results table tbody tr:not(.totals) td span {        width: 14px;        opacity: .5;        float: left; }    .results table tbody tr.totals td {      border-left: 1px solid #596b7c;      height: 25px;      width: 70px;      border-top: 1px solid #596b7c;      text-align: center;      color: rgba(255, 255, 255, 0.9); }      .results table tbody tr.totals td:first-child {        border-left: 0; }      .results table tbody tr.totals td.premia {        color: #6ECE98; }  .results table tbody:last-child tr:last-child td {    border-bottom: 0; }.results:hover table tbody {  display: table-row-group; }.results.compact table tbody tr:not(.totals) {  display: none; }.results.compact:hover table tbody {  display: none; }  .results.compact:hover table tbody tr:not(.totals) {    display: table-row; }.results.compact:hover table tbody.active {  display: table-row-group; }"],
                        template: '<div class="results" [class.compact]="isCompact"><table><thead><tr><td></td><td *ngFor="#i of playerIndexes"><div *ngIf="players[i]" class="player" [class.offline]="!players[i].IsOnline" (click)="onViewProfile(players[i].UserID)"><img src="{{players[i].AvatarUri}}" class="avatar"><div class="nick">{{players[i].Nick}}</div><div class="level">{{players[i].LevelName | translate}}</div></div></td></tr></thead><tbody *ngFor="#section of getStructure(); #si=index" [class.active]="source.Sections[si].IsActive"><tr *ngFor="#item of section; #ii=index"><td [class.active]="false">{{item}}</td><template ngFor #i [ngForOf]="playerIndexes"><template ngFor #rItem [ngForOf]="[source.Sections[si].Players[i].Items[ii]]"><td [class.bad]="rItem.isBad()" [class.good]="rItem.isGood()" [class.double]="rItem.IsBonus" [class.ignored]="rItem.IsRemoved"><span>{{rItem.Want | escapeWantZero}}</span><div>{{rItem.Score | result}}</div></td></template></template></tr><tr class="section{{si+1}} totals"><td></td><td *ngFor="#pi of playerIndexes" [class.premia]="source.Sections[si].Players[pi].IsBonus"><span *ngIf="source.Sections[si].Players[pi].Total || source.Sections[si].Players[pi].Total == 0">{{ (source.Sections[si].Players[pi].Total + source.Sections[si].Players[pi].BonusScore) | totalResult}}</span></td></tr></tbody></table></div>',
                        pipes: [EscapeWantZero_1.EscapeWantZero, TotalResult_1.TotalResult, Result_1.Result],
                        directives: [common_4.NgClass, hover_1.HoverDirective]
                    }), 
                    __metadata('design:paramtypes', [Platforms_5.PlatformProvider])
                ], UIResults);
                return UIResults;
            }());
            exports_67("UIResults", UIResults);
        }
    }
});
System.register("Modules/Joker/game", ['angular2/core', 'angular2/router', 'Jok/Cards', 'Jok/Chat', "Common/ignoreContextMenu", "Common/Components/All", "Common/Providers/All", "Modules/Joker/Models/All", "Modules/Joker/Providers/ViewModelProvider", "Modules/Joker/Providers/GameProvider", "Modules/Joker/declaration", "Modules/Joker/finishinfo", "Modules/Joker/infopanel", "Modules/Joker/notification", "Modules/Joker/results"], function(exports_68, context_68) {
    "use strict";
    var __moduleName = context_68 && context_68.id;
    var core_48, router_8, Cards_3, Chat_2, ignoreContextMenu_1, All_11, All_12, All_13, ViewModelProvider_2, GameProvider_2, declaration_1, finishinfo_1, infopanel_1, notification_1, results_1;
    var UIGame;
    return {
        setters:[
            function (core_48_1) {
                core_48 = core_48_1;
            },
            function (router_8_1) {
                router_8 = router_8_1;
            },
            function (Cards_3_1) {
                Cards_3 = Cards_3_1;
            },
            function (Chat_2_1) {
                Chat_2 = Chat_2_1;
            },
            function (ignoreContextMenu_1_1) {
                ignoreContextMenu_1 = ignoreContextMenu_1_1;
            },
            function (All_11_1) {
                All_11 = All_11_1;
            },
            function (All_12_1) {
                All_12 = All_12_1;
            },
            function (All_13_1) {
                All_13 = All_13_1;
            },
            function (ViewModelProvider_2_1) {
                ViewModelProvider_2 = ViewModelProvider_2_1;
            },
            function (GameProvider_2_1) {
                GameProvider_2 = GameProvider_2_1;
            },
            function (declaration_1_1) {
                declaration_1 = declaration_1_1;
            },
            function (finishinfo_1_1) {
                finishinfo_1 = finishinfo_1_1;
            },
            function (infopanel_1_1) {
                infopanel_1 = infopanel_1_1;
            },
            function (notification_1_1) {
                notification_1 = notification_1_1;
            },
            function (results_1_1) {
                results_1 = results_1_1;
            }],
        execute: function() {
            UIGame = (function () {
                function UIGame(viewModelProvider, chat, gameProvider, currentUser, routeParams, config) {
                    var _this = this;
                    this.viewModelProvider = viewModelProvider;
                    this.chat = chat;
                    this.gameProvider = gameProvider;
                    this.currentUser = currentUser;
                    this.routeParams = routeParams;
                    this.config = config;
                    this.chatOnlyEmotions = false;
                    this.AccountCallbacks = {
                        onChangeAudioOption: function (isOn) { return _this.config.changeAudioOption(isOn); },
                        onExit: function () { return _this.gameProvider.uiExit(); },
                        onClearChat: function () { return _this.chat.reset(); }
                    };
                    this.CardsCallbacks = {
                        onClick: function (card) { return _this.gameProvider.uiCardClick(card); }
                    };
                    this.ColorSelectionCallbacks = {
                        onSelectDominatedColor: function (color) { return _this.gameProvider.uiDominatedColorSelect(color); },
                        onSelectWantColor: function (color) { return _this.gameProvider.uiWantColorSelect(color); },
                        onSelectTakeColor: function (color) { return _this.gameProvider.uiTakeColorSelect(color); },
                        onWantTakeClick: function (isWant) { return _this.gameProvider.uiWantTakeClick(isWant); },
                        onDeclarationClick: function (want) { return _this.gameProvider.uiDeclarationClick(want); }
                    };
                    this.DeclarationCallbacks = {
                        onSelect: function (want) { return _this.gameProvider.uiDeclarationClick(want); }
                    };
                    this.ProfileCallbacks = {
                        onClick: function (ev, position, userid) {
                            if (_this.Game.Status != All_13.TableStatuses.New) {
                                if (_this.Game.CurrentPlayer.UserID == userid) {
                                    _this.showSmiles = !_this.showSmiles;
                                    ev.stopPropagation();
                                }
                                return;
                            }
                            _this.gameProvider.uiPositionSelection(position);
                        },
                        onSendFriendRequest: function (userid) { return _this.gameProvider.sendFriendRequest(userid); },
                        onBlock: function (userid) { return _this.gameProvider.blockUser(userid); },
                        onUnblock: function (userid) { return _this.gameProvider.unblockUser(userid); },
                        onListenChannel: function (channel) { return _this.gameProvider.uiListenChannel(channel); }
                    };
                    this.Game = viewModelProvider.VM;
                }
                UIGame.prototype.ngOnInit = function () {
                    var _this = this;
                    this.config.channel = this.routeParams.get('channel') || '';
                    this.config.mode = parseInt(this.routeParams.get('mode')) || 0;
                    this.config.levelControl = 0;
                    this.config.starsControl = parseInt(this.routeParams.get('stars')) || 0;
                    this.chat.on('HideSmilesBox', function () { return _this.showSmiles = false; });
                    this.gameProvider.start();
                    this.chatOnlyEmotions = !this.config.channel;
                };
                UIGame.prototype.ngOnDestroy = function () {
                    this.gameProvider.stop();
                };
                UIGame.prototype.onGlobalKeyUp = function (ev) {
                    this.isLastTakenCardsVisible = false;
                };
                UIGame.prototype.onGlobalClick = function (ev) {
                    this.isLastTakenCardsVisible = false;
                    this.showSmiles = false;
                };
                UIGame.prototype.isTableTypeStandard = function () {
                    return (this.Game.TableType == All_13.Table_Type.normal);
                };
                UIGame.prototype.isPositionSelection = function () {
                    return !this.Game.IsConnectionClosed && (this.Game.Status == All_13.TableStatuses.New);
                };
                UIGame.prototype.isGameStarted = function () {
                    return !this.Game.IsConnectionClosed && (this.Game.Status == All_13.TableStatuses.Started || this.Game.Status == All_13.TableStatuses.Stopped);
                };
                UIGame.prototype.isFinished = function () {
                    return !this.Game.IsConnectionClosed && (this.Game.Status == All_13.TableStatuses.Finished);
                };
                UIGame.prototype.isLoaded = function () {
                    return this.isPositionSelection() || this.isGameStarted() || this.isFinished();
                };
                UIGame.prototype.isRanked = function () {
                    return this.gameProvider.isRanked();
                };
                UIGame.prototype.showLastTakenCards = function (ev, isClick) {
                    this.isLastTakenCardsVisible = true;
                    if (isClick && this.config.isCompact)
                        return;
                    if (ev) {
                        ev.stopPropagation();
                        ev.preventDefault();
                    }
                };
                UIGame.prototype.hideLastTakenCards = function () {
                    this.isLastTakenCardsVisible = false;
                };
                UIGame = __decorate([
                    core_48.Component({
                        host: {
                            '(document:keyup)': 'onGlobalKeyUp($event)',
                            '(document:click)': 'onGlobalClick($event)',
                            'style': 'overflow: hidden'
                        },
                        selector: 'game',
                        styles: [".game {  background: #27ae60;  color: white;  min-height: 700px; }  .game .inner {    position: absolute;    top: 0;    bottom: 0;    right: 0;    width: 760px;    min-height: 450px;    left: 50%;    margin-left: -380px; }  .game #Player1 {    position: absolute;    bottom: 10px;    left: 50%;    margin-left: -50px;    z-index: 510; }  .game:not(.gameStarted):not(.compact) #Player1 {    bottom: 22px; }  .game account {    position: fixed;    top: 10px;    left: 10px;    z-index: 3000; }  .game chatbox {    position: fixed;    left: 3px;    bottom: 3px;    top: 3px;    width: 300px;    border-right: 1px dashed rgba(255, 255, 255, 0.25);    background: transparent;    z-index: 100; }  .game chatsmiles {    position: absolute;    z-index: 10002;    bottom: -20px;    left: 50%;    margin-left: -140px; }  .game #Player2 {    position: absolute;    top: 50%;    left: 10px;    margin-top: -80px;    z-index: 200; }  .game #Player3 {    position: absolute;    top: 10px;    left: 50%;    margin-left: -50px; }  .game #Player4 {    position: absolute;    top: 50%;    right: 10px;    margin-top: -80px; }  .game cards#CurrentPlayerCards {    position: absolute;    left: 50%;    right: 0;    text-align: center;    bottom: 50px;    margin-left: -88px;    z-index: 500; }  .game .player2cards {    position: absolute;    left: 50px;    top: 50%;    padding-top: 80px;    width: 70px; }    .game .player2cards cards {      position: absolute;      -webkit-transform: rotate(90deg);      -moz-transform: rotate(90deg);      -ms-transform: rotate(90deg);      -o-transform: rotate(90deg);      transform: rotate(90deg);      left: 0; }  .game .player3cards {    position: absolute;    left: 50%;    top: 100px;    width: 200px;    height: 21px;    text-align: left;    margin-left: 45px; }    .game .player3cards cards {      position: absolute;      -moz-transform: rotate(10deg) rotateY(180deg);      -ms-transform: rotate(10deg) rotateY(180deg);      -o-transform: rotate(10deg) rotateY(180deg);      -webkit-transform: rotate(10deg) rotateY(180deg);      transform: rotate(180deg) rotateY(180deg); }  .game .player4cards {    position: absolute;    right: 50px;    top: 50%;    width: 70px;    margin-top: 80px; }    .game .player4cards cards {      position: absolute;      -webkit-transform: rotate(90deg) rotateX(180deg);      -moz-transform: rotate(90deg) rotateX(180deg);      -ms-transform: rotate(90deg) rotateX(180deg);      -o-transform: rotate(90deg) rotateX(180deg);      transform: rotate(90deg) rotateX(180deg);      right: 0; }  .game #LastTakenCards {    position: absolute;    right: 13px;    bottom: 20px;    z-index: 2000;    width: 210px;    height: 272px;    background: #34495e;    padding-left: 60px;    padding-top: 90px;    border-radius: 5px;    border: 1px solid #20374D; }  .game #ShowLastTakenCards {    position: absolute;    right: 75px;    bottom: 15px;    cursor: pointer;    font-size: 28px;    z-index: 100;    color: rgba(255, 255, 255, 0.5);    padding: 8px; }    .game #ShowLastTakenCards:hover {      color: rgba(255, 255, 255, 0.8); }  .game #GameTable {    position: absolute;    top: 100px;    bottom: 100px;    left: 70px;    right: 70px;    border: 1px solid #188670;    background: #16a085;    border-radius: 55px; }    .game #GameTable.ranked {      border: 1px solid #188670;      background: #1c9699; }    .game #GameTable.started {      /*bottom: 40px;*/ }    .game #GameTable #RankedGame {      position: absolute;      top: 47%;      left: 30%;      opacity: .2;      font-size: 20px;      width: 250px;      text-align: center; }    .game #GameTable downcards {      position: absolute;      left: 50%;      top: 50%;      margin-top: -40px;      margin-left: -47px; }    .game #GameTable declaration {      position: absolute;      left: -1px;      right: -1px;      bottom: 200px;      z-index: 200; }    .game #GameTable colorselection {      position: absolute;      left: 50%;      margin-left: -100px;      bottom: 50%;      margin-bottom: -100px;      z-index: 10001; }  .game results {    position: absolute;    right: 3px;    top: 3px;    width: 300px;    z-index: 10000; }  .game finishinfo {    position: absolute;    left: 50%;    top: 50%;    margin-left: -217px;    margin-top: -190px;    z-index: 50000;    box-shadow: 0 0 20px black;    border-radius: 5px; }  .game infopanel {    position: absolute;    left: 2px;    top: -24px; }.game.compact {  min-height: 0; }  .game.compact.gameStarted cards#CurrentPlayerCards {    bottom: -60px; }  .game.compact.gameStarted .player2cards,  .game.compact.gameStarted .player3cards,  .game.compact.gameStarted .player4cards {    display: none; }  .game.compact.gameStarted #GameTable {    top: 60px; }    .game.compact.gameStarted #GameTable declaration {      bottom: 90px; }  .game.compact.gameStarted #Player2, .game.compact.gameStarted #Player4 {    margin-top: -52px; }  .game.compact.gameStarted #ShowLastTakenCards {    right: 5px; }  .game.compact.gameStarted #LastTakenCards {    right: 0; }"],
                        template: '<div class="game" [class.compact]="config.isCompact" [class.gameStarted]="isGameStarted()"><account *ngIf="Game.CurrentPlayer.Nick" [nick]="Game.CurrentPlayer.Nick" [info]="currentUser.getPlayerLevelName() | translate" [avatarUrl]="Game.CurrentPlayer.AvatarUri" [isAudioEffectsEnabled]="config.isAudioEffectsEnabled" [mode]="2" [isMobile]="config.isMobile()" [callbacks]="AccountCallbacks"></account><chatbox *ngIf="isLoaded() && !config.isCompact" [isVIPMember]="Game.CurrentPlayer && Game.CurrentPlayer.IsVIP" [onlyEmotions]="chatOnlyEmotions" class="visible-lg"></chatbox><div class="inner"><profile *ngIf="isPositionSelection() || isGameStarted() || (isFinished() && !config.isCompact)" id="Player1" [mini]="isGameStarted() ? true : false" [callbacks]="ProfileCallbacks" [currentUserId]="Game.CurrentPlayer.UserID" [player]="isPositionSelection() ? Game.PositionSelectionPlayers[0] : Game.Players[0]" [isActive]="Game.Players[0] && (Game.ActivePlayerUserID == Game.Players[0].UserID)" [isMusicPlayerAllowed]="!config.isCompact" [position]="1"></profile><profile *ngIf="isPositionSelection() || isGameStarted() || (isFinished() && !config.isCompact)" id="Player2" [mini]="isGameStarted() ? config.isCompact : false" [callbacks]="ProfileCallbacks" [currentUserId]="Game.CurrentPlayer.UserID" [player]="isPositionSelection() ? Game.PositionSelectionPlayers[1] : Game.Players[1]" [isActive]="Game.Players[1] && (Game.ActivePlayerUserID == Game.Players[1].UserID)" [isMusicPlayerAllowed]="!config.isCompact" [position]="2"></profile><profile *ngIf="isPositionSelection() || isGameStarted() || (isFinished() && !config.isCompact)" id="Player3" [mini]="isGameStarted() ? config.isCompact : false" [callbacks]="ProfileCallbacks" [currentUserId]="Game.CurrentPlayer.UserID" [player]="isPositionSelection() ? Game.PositionSelectionPlayers[2] : Game.Players[2]" [isActive]="Game.Players[2] && (Game.ActivePlayerUserID == Game.Players[2].UserID)" [isMusicPlayerAllowed]="!config.isCompact" [position]="3"></profile><profile *ngIf="isPositionSelection() || isGameStarted() || (isFinished() && !config.isCompact)" id="Player4" [mini]="isGameStarted() ? config.isCompact : false" [callbacks]="ProfileCallbacks" [currentUserId]="Game.CurrentPlayer.UserID" [player]="isPositionSelection() ? Game.PositionSelectionPlayers[3] : Game.Players[3]" [isActive]="Game.Players[3] && (Game.ActivePlayerUserID == Game.Players[3].UserID)" [isMusicPlayerAllowed]="!config.isCompact" [rightToLeft]="true" [position]="4"></profile><downcards id="LastTakenCards" ignoreContextMenu *ngIf="isGameStarted() && Game.LastTakenCards && isLastTakenCardsVisible" [source]="Game.LastTakenCards" [lastActivePlayerPosition]="0"></downcards><div id="ShowLastTakenCards" ignoreContextMenu *ngIf="isGameStarted() && Game.LastTakenCards" (click)="showLastTakenCards($event, true)" (touchstart)="showLastTakenCards($event)" (touchend)="hideLastTakenCards()"><i class="fa fa-history"></i></div><cards id="CurrentPlayerCards" *ngIf="isGameStarted()" [source]="Game.CurrentPlayerCards" [isSelectionAllowed]="Game.IsCardSelectionEnabled" [isVisible]="Game.IsCurrentCardsVisible" [isCompact]="config.isCompact" [callbacks]="CardsCallbacks"></cards><div id="GameTable" [class.started]="isGameStarted()" [class.ranked]="isRanked()" *ngIf="(isPositionSelection() || isGameStarted())"><div id="RankedGame" *ngIf="isRanked() && isPositionSelection() && !Game.NotificationType">{{\'common.RankedGame\' | translate}}</div><downcards [source]="Game.DownCards" [lastActivePlayerPosition]="Game.LastActivePlayerPosition"></downcards><downcards [source]="Game.DownCardsAnimated" [lastActivePlayerPosition]="Game.LastActivePlayerPosition" *ngIf="true || Game.DownCardsAnimated" [isAnimationEnabled]="true"></downcards><declaration [source]="Game.Declaration" [callbacks]="DeclarationCallbacks"></declaration><colorselection [mode]="Game.ColorSelectionMode" [callbacks]="ColorSelectionCallbacks"></colorselection><infopanel *ngIf="Game.IsTableInfoReceived" [channel]="Game.TableChannel" [dring]="Game.Dring" [dominatedcolor]="Game.DominatedColor" [balanceNumber]="Game.BalanceNumber"></infopanel><chatsmiles *ngIf="showSmiles && !Game.IsConnectionClosed" [isVIPMember]="Game.CurrentPlayer && Game.CurrentPlayer.IsVIP"></chatsmiles><div class="player2cards" [title]="\'common.OpponentCardsTooltip\' | translate : { count: Game.Player2CardsCount }"><cards [miniCardsCount]="Game.Player2CardsCount" [isVisible]="true"></cards></div><div class="player3cards" [title]="\'common.OpponentCardsTooltip\' | translate : { count: Game.Player3CardsCount }"><cards [miniCardsCount]="Game.Player3CardsCount" [isVisible]="true"></cards></div><div class="player4cards" [title]="\'common.OpponentCardsTooltip\' | translate : { count: Game.Player4CardsCount }"><cards [miniCardsCount]="Game.Player4CardsCount" [isVisible]="true"></cards></div></div><finishinfo *ngIf="isFinished()" [source]="Game.FinishInfo"></finishinfo><notification id="Notification" [type]="Game.NotificationType" [inviteLink]="Game.InviteLink" [playerNick]="Game.CurrentPlayer.Nick" [gameStartSeconds]="Game.GameStartSeconds"></notification></div><results *ngIf="isLoaded() && (!isFinished() || !config.isCompact)" [players]="Game.ResultPlayers" [source]="Game.Results" [isCompact]="config.isCompact" [isStandard]="isTableTypeStandard()"></results></div>',
                        directives: [
                            All_11.UIProfile,
                            Cards_3.UICards,
                            notification_1.UINotification,
                            Cards_3.UIDownCards,
                            declaration_1.UIDeclaration,
                            Cards_3.UIColorSelection,
                            results_1.UIResults,
                            finishinfo_1.UIFinishInfo,
                            All_11.UIAccount,
                            Chat_2.UIChatBox,
                            Chat_2.UIChatSmiles,
                            infopanel_1.UIInfoPanel,
                            ignoreContextMenu_1.IgnoreContextMenu],
                        providers: [
                            GameProvider_2.GameProvider,
                            Cards_3.DownCardsProvider,
                            All_12.ProfileProvider
                        ]
                    }), 
                    __metadata('design:paramtypes', [ViewModelProvider_2.ViewModelProvider, Chat_2.ChatProvider, GameProvider_2.GameProvider, All_12.CurrentUserProvider, router_8.RouteParams, All_12.ConfigProvider])
                ], UIGame);
                return UIGame;
            }());
            exports_68("UIGame", UIGame);
        }
    }
});
System.register("Modules/Joker/Pages/play", ['angular2/core', 'Jok/Communication', "Modules/Joker/game", "Modules/Joker/Providers/ViewModelProvider"], function(exports_69, context_69) {
    "use strict";
    var __moduleName = context_69 && context_69.id;
    var core_49, Communication_2, game_1, ViewModelProvider_3;
    var UIPlay;
    return {
        setters:[
            function (core_49_1) {
                core_49 = core_49_1;
            },
            function (Communication_2_1) {
                Communication_2 = Communication_2_1;
            },
            function (game_1_1) {
                game_1 = game_1_1;
            },
            function (ViewModelProvider_3_1) {
                ViewModelProvider_3 = ViewModelProvider_3_1;
            }],
        execute: function() {
            UIPlay = (function () {
                function UIPlay() {
                }
                UIPlay = __decorate([
                    core_49.Component({
                        selector: 'play',
                        styles: ["game {  position: absolute;  left: 0;  right: 0;  top: 0;  bottom: 0; }"],
                        template: '<game></game>',
                        directives: [game_1.UIGame],
                        providers: [
                            ViewModelProvider_3.ViewModelProvider,
                            core_49.provide(Communication_2.CommunicationClientProvider, { useClass: Communication_2.SocketIOClientProvider }),
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], UIPlay);
                return UIPlay;
            }());
            exports_69("UIPlay", UIPlay);
        }
    }
});
System.register("Modules/Joker/Pages/mock", ['angular2/core', 'Jok/Communication', "Modules/Joker/game", "Modules/Joker/Providers/ViewModelProvider"], function(exports_70, context_70) {
    "use strict";
    var __moduleName = context_70 && context_70.id;
    var core_50, Communication_3, game_2, ViewModelProvider_4;
    var UIMock;
    return {
        setters:[
            function (core_50_1) {
                core_50 = core_50_1;
            },
            function (Communication_3_1) {
                Communication_3 = Communication_3_1;
            },
            function (game_2_1) {
                game_2 = game_2_1;
            },
            function (ViewModelProvider_4_1) {
                ViewModelProvider_4 = ViewModelProvider_4_1;
            }],
        execute: function() {
            UIMock = (function () {
                function UIMock() {
                }
                UIMock = __decorate([
                    core_50.Component({
                        selector: 'mock',
                        styles: ["game {  position: absolute;  left: 0;  right: 0;  top: 0;  bottom: 0; }"],
                        template: '<game></game>',
                        directives: [game_2.UIGame],
                        providers: [
                            core_50.provide(ViewModelProvider_4.ViewModelProvider, { useClass: ViewModelProvider_4.MockViewModelProvider }),
                            core_50.provide(Communication_3.CommunicationClientProvider, { useClass: Communication_3.MockClientProvider }),
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], UIMock);
                return UIMock;
            }());
            exports_70("UIMock", UIMock);
        }
    }
});
System.register("Modules/Joker/Pages/route", ['angular2/core', 'angular2/router', "Modules/Joker/Pages/play", "Modules/Joker/Pages/mock"], function(exports_71, context_71) {
    "use strict";
    var __moduleName = context_71 && context_71.id;
    var core_51, router_9, play_1, mock_1;
    var Route;
    return {
        setters:[
            function (core_51_1) {
                core_51 = core_51_1;
            },
            function (router_9_1) {
                router_9 = router_9_1;
            },
            function (play_1_1) {
                play_1 = play_1_1;
            },
            function (mock_1_1) {
                mock_1 = mock_1_1;
            }],
        execute: function() {
            Route = (function () {
                function Route() {
                }
                Route = __decorate([
                    core_51.Component({
                        selector: 'joker',
                        template: '<router-outlet></router-outlet>',
                        directives: [router_9.ROUTER_DIRECTIVES]
                    }),
                    router_9.RouteConfig([
                        { path: '/', name: 'Public', component: play_1.UIPlay, useAsDefault: true },
                        { path: '/mode/:mode', name: 'PublicWithMode', component: play_1.UIPlay },
                        { path: '/mock', name: 'Mock', component: mock_1.UIMock },
                        { path: '/:channel/:mode', name: 'PrivateWithMode', component: play_1.UIPlay },
                        { path: '/:channel', name: 'Private', component: play_1.UIPlay },
                    ]), 
                    __metadata('design:paramtypes', [])
                ], Route);
                return Route;
            }());
            exports_71("Route", Route);
        }
    }
});
System.register("Modules/JapJoker/finishinfo.model", [], function(exports_72, context_72) {
    "use strict";
    var __moduleName = context_72 && context_72.id;
    var FinishInfoModel, FinishInfoPlayer;
    return {
        setters:[],
        execute: function() {
            FinishInfoModel = (function () {
                function FinishInfoModel() {
                }
                return FinishInfoModel;
            }());
            exports_72("FinishInfoModel", FinishInfoModel);
            FinishInfoPlayer = (function () {
                function FinishInfoPlayer() {
                }
                return FinishInfoPlayer;
            }());
            exports_72("FinishInfoPlayer", FinishInfoPlayer);
        }
    }
});
System.register("Modules/JapJoker/game.model", [], function(exports_73, context_73) {
    "use strict";
    var __moduleName = context_73 && context_73.id;
    var GamePlayer, TableStatuses, NotificationType, PlayAudioModes, ServerCardColor, ServerCardLevel;
    return {
        setters:[],
        execute: function() {
            GamePlayer = (function () {
                function GamePlayer() {
                }
                GamePlayer.CreateMock = function (userId, nick, avatar, isOnline) {
                    if (isOnline === void 0) { isOnline = true; }
                    var item = new GamePlayer();
                    item.Nick = nick;
                    item.UserID = userId;
                    item.AvatarUri = avatar;
                    item.Want = 2;
                    item.Took = Math.round(Math.random() * 3);
                    item.IsOnline = isOnline;
                    return item;
                };
                return GamePlayer;
            }());
            exports_73("GamePlayer", GamePlayer);
            (function (TableStatuses) {
                TableStatuses[TableStatuses["New"] = 1] = "New";
                TableStatuses[TableStatuses["Started"] = 2] = "Started";
                TableStatuses[TableStatuses["Stopped"] = 3] = "Stopped";
                TableStatuses[TableStatuses["Finished"] = 4] = "Finished";
            })(TableStatuses || (TableStatuses = {}));
            exports_73("TableStatuses", TableStatuses);
            (function (NotificationType) {
                NotificationType[NotificationType["None"] = 0] = "None";
                NotificationType[NotificationType["Connecting"] = 1] = "Connecting";
                NotificationType[NotificationType["Authenticating"] = 2] = "Authenticating";
                NotificationType[NotificationType["RequireAuthorization"] = 3] = "RequireAuthorization";
                NotificationType[NotificationType["WaitingForOpponent"] = 4] = "WaitingForOpponent";
                NotificationType[NotificationType["WaitingForFriend"] = 5] = "WaitingForFriend";
                NotificationType[NotificationType["ConnectionClosed"] = 6] = "ConnectionClosed";
                NotificationType[NotificationType["GameFinished"] = 7] = "GameFinished";
                NotificationType[NotificationType["GameStarting"] = 8] = "GameStarting";
            })(NotificationType || (NotificationType = {}));
            exports_73("NotificationType", NotificationType);
            (function (PlayAudioModes) {
                PlayAudioModes[PlayAudioModes["Card"] = 0] = "Card";
                PlayAudioModes[PlayAudioModes["SpecialCard"] = 1] = "SpecialCard";
                PlayAudioModes[PlayAudioModes["PlayerLogin"] = 2] = "PlayerLogin";
                PlayAudioModes[PlayAudioModes["Buzz"] = 3] = "Buzz";
            })(PlayAudioModes || (PlayAudioModes = {}));
            exports_73("PlayAudioModes", PlayAudioModes);
            (function (ServerCardColor) {
                ServerCardColor[ServerCardColor["Color1"] = 0] = "Color1";
                ServerCardColor[ServerCardColor["Color2"] = 1] = "Color2";
                ServerCardColor[ServerCardColor["Color3"] = 2] = "Color3";
                ServerCardColor[ServerCardColor["Color4"] = 3] = "Color4";
                ServerCardColor[ServerCardColor["None"] = 4] = "None";
            })(ServerCardColor || (ServerCardColor = {}));
            exports_73("ServerCardColor", ServerCardColor);
            (function (ServerCardLevel) {
                ServerCardLevel[ServerCardLevel["_6"] = 6] = "_6";
                ServerCardLevel[ServerCardLevel["_7"] = 7] = "_7";
                ServerCardLevel[ServerCardLevel["_8"] = 8] = "_8";
                ServerCardLevel[ServerCardLevel["_9"] = 9] = "_9";
                ServerCardLevel[ServerCardLevel["_10"] = 10] = "_10";
                ServerCardLevel[ServerCardLevel["Valet"] = 11] = "Valet";
                ServerCardLevel[ServerCardLevel["Queen"] = 12] = "Queen";
                ServerCardLevel[ServerCardLevel["King"] = 13] = "King";
                ServerCardLevel[ServerCardLevel["Ace"] = 14] = "Ace";
                ServerCardLevel[ServerCardLevel["Joker"] = 15] = "Joker";
            })(ServerCardLevel || (ServerCardLevel = {}));
            exports_73("ServerCardLevel", ServerCardLevel);
        }
    }
});
System.register("Modules/JapJoker/viewmodel.provider", ['angular2/core', 'Jok/Cards', "Modules/JapJoker/game.model", "Modules/JapJoker/finishinfo.model"], function(exports_74, context_74) {
    "use strict";
    var __moduleName = context_74 && context_74.id;
    var core_52, Cards_4, game_model_1, finishinfo_model_1;
    var ViewModelProvider, MockViewModelProvider, mockViewModel, ViewModel;
    return {
        setters:[
            function (core_52_1) {
                core_52 = core_52_1;
            },
            function (Cards_4_1) {
                Cards_4 = Cards_4_1;
            },
            function (game_model_1_1) {
                game_model_1 = game_model_1_1;
            },
            function (finishinfo_model_1_1) {
                finishinfo_model_1 = finishinfo_model_1_1;
            }],
        execute: function() {
            ViewModelProvider = (function () {
                function ViewModelProvider() {
                    this.VM = this.getEmpty();
                    window.VM = this.VM;
                }
                ViewModelProvider.prototype.getEmpty = function () {
                    var result = new ViewModel();
                    result.CurrentPlayer = new game_model_1.GamePlayer();
                    result.OpponentPlayer = new game_model_1.GamePlayer();
                    result.CurrentPlayerCards = [];
                    result.CurrentPlayerOpenCards = [];
                    result.OpponentPlayerOpenCards = [];
                    result.DownCards = [null, null, null, null];
                    result.DominatedColor = null;
                    result.FinishInfo = new finishinfo_model_1.FinishInfoModel();
                    result.FinishInfo.Players = [new finishinfo_model_1.FinishInfoPlayer(), new finishinfo_model_1.FinishInfoPlayer()];
                    return result;
                };
                ViewModelProvider = __decorate([
                    core_52.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ViewModelProvider);
                return ViewModelProvider;
            }());
            exports_74("ViewModelProvider", ViewModelProvider);
            MockViewModelProvider = (function () {
                function MockViewModelProvider() {
                    this.VM = JSON.parse(JSON.stringify(mockViewModel));
                    window.VM = this.VM;
                }
                MockViewModelProvider = __decorate([
                    core_52.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], MockViewModelProvider);
                return MockViewModelProvider;
            }());
            exports_74("MockViewModelProvider", MockViewModelProvider);
            mockViewModel = {
                IsConnectionClosed: false,
                Status: game_model_1.TableStatuses.Finished,
                NotificationType: game_model_1.NotificationType.RequireAuthorization,
                TableChannel: '',
                TableType: 0,
                InviteLink: '',
                ActivePlayerUserID: 32,
                CurrentPlayer: game_model_1.GamePlayer.CreateMock(32, 'PlayerX', 'https://jok.io/portal/avatar/~base_skin_01b~Clothes_14~Eyes_01~Mouth_02~Eyebrows_07~~Hair_03~Accessories_03~8587496071003593649'),
                OpponentPlayer: game_model_1.GamePlayer.CreateMock(14073, 'Test', 'https://jok.io/portal/avatar/~base_skin_01b~Clothes_14~Eyes_01~Mouth_02~Eyebrows_07~~Hair_03~Accessories_03~8587496071003593649'),
                IsCardSelectionEnabled: true,
                ConnectionCloseReason: '',
                CurrentPlayerCards: [
                    Cards_4.CardType.Create(Cards_4.CardColor.Purple, Cards_4.CardLevel._6),
                    Cards_4.CardType.Create(Cards_4.CardColor.Purple, Cards_4.CardLevel._9),
                    Cards_4.CardType.Create(Cards_4.CardColor.Purple, Cards_4.CardLevel.Queen, true),
                    Cards_4.CardType.Create(Cards_4.CardColor.Purple, Cards_4.CardLevel.Ace, true),
                    Cards_4.CardType.Create(Cards_4.CardColor.Blue, Cards_4.CardLevel._8, true),
                    Cards_4.CardType.Create(Cards_4.CardColor.Blue, Cards_4.CardLevel.Valet, true),
                    Cards_4.CardType.Create(Cards_4.CardColor.Blue, Cards_4.CardLevel.Queen),
                    Cards_4.CardType.Create(Cards_4.CardColor.Orange, Cards_4.CardLevel._10),
                    Cards_4.CardType.Create(Cards_4.CardColor.Red, Cards_4.CardLevel.King),
                ],
                CurrentPlayerOpenCards: [],
                OpponentPlayerOpenCards: [],
                LastTakenCards: [
                    Cards_4.CardType.Create(Cards_4.CardColor.Purple, Cards_4.CardLevel._6),
                    Cards_4.CardType.Create(Cards_4.CardColor.Purple, Cards_4.CardLevel._9),
                    Cards_4.CardType.Create(Cards_4.CardColor.Purple, Cards_4.CardLevel.Queen, false),
                    Cards_4.CardType.Create(Cards_4.CardColor.Purple, Cards_4.CardLevel.Ace)
                ],
                DownCards: [
                    null,
                    null,
                    null,
                    null,
                ],
                DownCardsAnimated: [
                    null,
                    null,
                    null,
                    null,
                ],
                ColorSelectionMode: null,
                DominatedColor: Cards_4.CardColor.Red,
                IsTableInfoReceived: true,
                FinishInfo: {
                    Players: [
                        {
                            UserID: 32,
                            Nick: 'PlayerX',
                            IsOnline: true,
                            Place: 2,
                            Score: 0,
                            Points: 272,
                            Rating: 23
                        },
                        {
                            UserID: 33,
                            Nick: 'Test',
                            IsOnline: true,
                            Place: 1,
                            Score: 1,
                            Points: 102,
                            Rating: 11
                        },
                        {
                            UserID: 34,
                            Nick: 'Babt',
                            IsOnline: false,
                            Place: 3,
                            Score: 9.1,
                            Points: 91,
                            Rating: '~'
                        },
                        {
                            UserID: 35,
                            Nick: 'Omg',
                            IsOnline: true,
                            Place: 4,
                            Score: 7.3,
                            Points: 73,
                            Rating: -21
                        }
                    ],
                    Key: '123'
                },
                GameStartSeconds: 10,
                IsFirstCard: true,
                OpponentCardsCount: 9,
            };
            ViewModel = (function () {
                function ViewModel() {
                }
                return ViewModel;
            }());
            exports_74("ViewModel", ViewModel);
        }
    }
});
System.register("Modules/JapJoker/game.provider", ['angular2/core', 'angular2/platform/browser', 'angular2/router', 'ng2-translate', 'Jok/Communication', 'Jok/Cards', 'Jok/Chat', 'Jok/Platforms', "Common/Providers/All", "Modules/JapJoker/viewmodel.provider", "Modules/JapJoker/game.model", "Modules/JapJoker/finishinfo.model"], function(exports_75, context_75) {
    "use strict";
    var __moduleName = context_75 && context_75.id;
    var core_53, browser_2, router_10, ng2_translate_4, Communication_4, Cards_5, Chat_3, Platforms_6, All_14, viewmodel_provider_1, game_model_2, finishinfo_model_2;
    var GameProvider;
    return {
        setters:[
            function (core_53_1) {
                core_53 = core_53_1;
            },
            function (browser_2_1) {
                browser_2 = browser_2_1;
            },
            function (router_10_1) {
                router_10 = router_10_1;
            },
            function (ng2_translate_4_1) {
                ng2_translate_4 = ng2_translate_4_1;
            },
            function (Communication_4_1) {
                Communication_4 = Communication_4_1;
            },
            function (Cards_5_1) {
                Cards_5 = Cards_5_1;
            },
            function (Chat_3_1) {
                Chat_3 = Chat_3_1;
            },
            function (Platforms_6_1) {
                Platforms_6 = Platforms_6_1;
            },
            function (All_14_1) {
                All_14 = All_14_1;
            },
            function (viewmodel_provider_1_1) {
                viewmodel_provider_1 = viewmodel_provider_1_1;
            },
            function (game_model_2_1) {
                game_model_2 = game_model_2_1;
            },
            function (finishinfo_model_2_1) {
                finishinfo_model_2 = finishinfo_model_2_1;
            }],
        execute: function() {
            GameProvider = (function () {
                function GameProvider(router, viewModelProvider, translate, config, usersProvider, downCardsProvider, profileProvider, server, currentUser, chat, zone, windowTitle, platform) {
                    this.router = router;
                    this.viewModelProvider = viewModelProvider;
                    this.translate = translate;
                    this.config = config;
                    this.usersProvider = usersProvider;
                    this.downCardsProvider = downCardsProvider;
                    this.profileProvider = profileProvider;
                    this.server = server;
                    this.currentUser = currentUser;
                    this.chat = chat;
                    this.zone = zone;
                    this.windowTitle = windowTitle;
                    this.platform = platform;
                    this.CHAT_SENDER_JOK = ' ';
                    this.VM = viewModelProvider.VM;
                    this.blockedUserIds = [];
                }
                GameProvider.prototype.start = function () {
                    var _this = this;
                    this.VM.NotificationType = game_model_2.NotificationType.Authenticating;
                    this.VM.IsConnectionClosed = false;
                    this.chat.reset();
                    this.usersProvider.getCurrent(function (user) {
                        if (!user.IsSuccess) {
                            _this.serverRequireAuthorization();
                            return;
                        }
                        _this.blockedUserIds = user.BlockedUserIds || [];
                        _this.VM.CurrentPlayer.UserID = _this.config.currentUserId = user.UserID;
                        _this.VM.CurrentPlayer.Nick = user.Nick;
                        _this.VM.CurrentPlayer.AvatarUri = user.AvatarUrl;
                        _this.VM.CurrentPlayer.LevelName = _this.currentUser.getPlayerLevelName(user.Game.RatingStars);
                        _this.VM.CurrentPlayer.IsOnline = true;
                        _this.VM.NotificationType = game_model_2.NotificationType.Connecting;
                        _this.chat.configure(user.UserID, user.Nick, user.AvatarUrl);
                        _this.chat.on('ItemAdded', function (message, userid, mode) {
                            if (!userid || mode == Chat_3.ChatItemMode.Jok)
                                return;
                            _this.profileProvider.chatBubble(message, userid);
                        });
                        _this.connectServer();
                    });
                };
                GameProvider.prototype.stop = function () {
                    this.VM.IsConnectionClosed = true;
                    this.server.stop();
                    this.server.removeEvent();
                };
                GameProvider.prototype.connectServer = function () {
                    var _this = this;
                    this.startWindowTitleNotification();
                    this.server.setOptions({
                        hubName: 'GameHub',
                        url: 'https://jok.io/JapMatrixServer/signalr',
                        token: this.config.sid,
                        channel: this.config.channel,
                        gameMode: this.config.mode,
                        levelControl: 0,
                        starsControl: 0,
                        transports: ['longPolling'],
                        enableMessageLogging: true
                    });
                    this.server.on('MessageReceived', this.serverMessageReceived.bind(this));
                    this.server.on('MessageProceedCompleted', this.serverMessageProceedCompleted.bind(this));
                    this.server.on('online', this.serverOnline.bind(this));
                    this.server.on('offline', this.serverOffline.bind(this));
                    this.server.on('Close', this.serverClose.bind(this));
                    this.server.on('GameStarting', this.serverGameStarting.bind(this));
                    this.server.on('GameFinished', this.serverGameFinished.bind(this));
                    this.server.on('CurrentTable', this.serverCurrentTable.bind(this));
                    this.server.on('UserCards', this.serverUserCards.bind(this));
                    this.server.on('KozirRequest', this.serverKozirRequest.bind(this));
                    this.server.on('UserCardPermissions', this.serverUserCardPermissions.bind(this));
                    this.server.on('CardRequest', this.serverCardRequest.bind(this));
                    this.server.on('UserCardDown', this.serverUserCardDown.bind(this));
                    this.server.on('OpenUserCard', this.serverOpenUserCard.bind(this));
                    this.server.on('HideOpponentPair', this.serverHideOpponentPair.bind(this));
                    this.server.on('UserSelectedKozir', this.serverUserSelectedKozir.bind(this));
                    this.server.on('UserTook', this.serverUserTook.bind(this));
                    this.server.on('ActivateUser', this.serverActivateUser.bind(this));
                    this.server.on('CardDownNotification', this.serverCardDownNotification.bind(this));
                    this.server.on('UpdateUserOnlineStatus', this.serverUpdateUserOnlineStatus.bind(this));
                    this.server.on('OpponentCardsCount', this.serverOpponentCardsCount.bind(this));
                    this.server.on('GameFinishResult', this.serverGameFinishResult.bind(this));
                    this.server.on('Buzz', this.serverBuzz.bind(this));
                    this.server.on('ChatMessage', this.serverChatMessage.bind(this));
                    this.server.on('UserListeningMusic', this.serverUserListeningMusic.bind(this));
                    this.server.start();
                    this.chat.on('SendMessage', function (msg) { return _this.server.send('ChatMessage', msg); });
                };
                GameProvider.prototype.blockUser = function (userid) {
                    this.usersProvider.block(userid);
                    if (this.blockedUserIds.indexOf(userid) > -1)
                        return;
                    this.blockedUserIds.push(userid);
                };
                GameProvider.prototype.unblockUser = function (userid) {
                    this.usersProvider.unblock(userid);
                    var index = this.blockedUserIds.indexOf(userid);
                    if (index == -1)
                        return;
                    this.blockedUserIds.splice(index, 1);
                };
                GameProvider.prototype.sendFriendRequest = function (userid) {
                    var _this = this;
                    this.usersProvider.sendFriendRequest(userid);
                    if (this.VM.OpponentPlayer && this.VM.OpponentPlayer.UserID == userid)
                        this.VM.OpponentPlayer.IsFrendRequestSent = true;
                    this.usersProvider.get(userid, function (user) {
                        return _this.translate.get('common.BeFriends').subscribe(function (text) {
                            _this.chat.sendMessage(user.Nick + ' ' + text);
                        });
                    });
                };
                GameProvider.prototype.uiCardClick = function (card) {
                    if (Cards_5.CardType.IsSpecial(card)) {
                        this.lastCard = card;
                        this.VM.ColorSelectionMode = Cards_5.ColorSelectionMode.WantTakeSelection;
                        return;
                    }
                    var index = this.VM.CurrentPlayerCards.indexOf(card);
                    if (~index)
                        this.VM.CurrentPlayerCards[index].IsVisible = false;
                    this.cardSelected(card);
                };
                GameProvider.prototype.uiDominatedColorSelect = function (dominatedColor) {
                    this.VM.ColorSelectionMode = null;
                    this.VM.DominatedColor = dominatedColor;
                    this.VM.CurrentPlayerCards.filter(function (x) { return x.CardColor == dominatedColor; }).forEach(function (x) { return x.IsDominated = true; });
                    this.VM.ActivePlayerUserID = null;
                    this.profileProvider.stopActivate();
                    this.server.send('SelectKozir', dominatedColor);
                };
                GameProvider.prototype.uiWantTakeClick = function (isWant) {
                    if (this.VM.IsFirstCard) {
                        this.VM.ColorSelectionMode = isWant ? Cards_5.ColorSelectionMode.WantColorSelection : Cards_5.ColorSelectionMode.TakeColorSelection;
                        return;
                    }
                    var index = this.VM.CurrentPlayerCards.indexOf(this.lastCard);
                    if (~index)
                        this.VM.CurrentPlayerCards[index].IsVisible = false;
                    this.lastCard.IsActivated = isWant;
                    this.cardSelected(this.lastCard, isWant);
                };
                GameProvider.prototype.uiWantColorSelect = function (wantColor) {
                    var index = this.VM.CurrentPlayerCards.indexOf(this.lastCard);
                    if (~index)
                        this.VM.CurrentPlayerCards[index].IsVisible = false;
                    this.lastCard.SpecialColor = wantColor;
                    this.lastCard.IsActivated = true;
                    this.cardSelected(this.lastCard, true, wantColor);
                };
                GameProvider.prototype.uiTakeColorSelect = function (takeColor) {
                    var index = this.VM.CurrentPlayerCards.indexOf(this.lastCard);
                    if (~index)
                        this.VM.CurrentPlayerCards[index].IsVisible = false;
                    this.lastCard.SpecialColor = takeColor;
                    this.lastCard.IsActivated = false;
                    this.cardSelected(this.lastCard, false, takeColor);
                };
                GameProvider.prototype.uiListenChannel = function (channel) {
                };
                GameProvider.prototype.uiPlayNewGame = function () {
                    document.location.reload();
                };
                GameProvider.prototype.uiExit = function () {
                    this.router.navigate(['/Lobby']);
                };
                GameProvider.prototype.serverMessageReceived = function (pkg) {
                };
                GameProvider.prototype.serverMessageProceedCompleted = function (data) {
                    console.log(data);
                };
                GameProvider.prototype.serverOnline = function () {
                    console.log('game server: connected');
                    this.VM.NotificationType = null;
                };
                GameProvider.prototype.serverOffline = function () {
                    console.log('game server: disconnected');
                    this.serverClose('Connection lost', true);
                };
                GameProvider.prototype.serverClose = function (reason, skipClosing) {
                    this.VM.NotificationType = game_model_2.NotificationType.ConnectionClosed;
                    if (skipClosing)
                        return;
                    this.VM.ConnectionCloseReason = reason;
                    this.stop();
                };
                GameProvider.prototype.serverRequireAuthorization = function () {
                    this.VM.NotificationType = game_model_2.NotificationType.RequireAuthorization;
                    this.platform.login();
                };
                GameProvider.prototype.serverGameStarting = function () {
                    this.chat.removeJokItems();
                    this.startWindowTitleNotification();
                    this.VM.CurrentPlayer.TakenCount = 0;
                    if (this.VM.OpponentPlayer)
                        this.VM.OpponentPlayer.TakenCount = 0;
                };
                GameProvider.prototype.serverGameFinished = function () {
                    var _this = this;
                    this.stop();
                    this.VM.IsConnectionClosed = this.VM.NotificationType = null;
                    setTimeout(function () {
                        _this.VM.CurrentPlayer.Want = null;
                        _this.VM.OpponentPlayer.Want = null;
                    }, 2000);
                };
                GameProvider.prototype.serverCurrentTable = function (table, channel) {
                    var _this = this;
                    this.tableId = table.ID;
                    this.VM.Status = table.Status;
                    this.VM.TableChannel = table.Channel;
                    this.VM.IsTableInfoReceived = true;
                    this.VM.NotificationType = null;
                    this.VM.OpponentPlayer = null;
                    if (!this.lastPlayersCount || (this.lastPlayersCount < table.Players.length)) {
                        this.playAudio(game_model_2.PlayAudioModes.PlayerLogin);
                    }
                    this.lastPlayersCount = table.Players.length;
                    if (table.Players.length > 1) {
                        var opponentUser = table.Players.filter(function (x) { return x.UserID != _this.VM.CurrentPlayer.UserID; })[0];
                        if (opponentUser) {
                            this.VM.OpponentPlayer = new game_model_2.GamePlayer();
                            this.VM.OpponentPlayer.UserID = opponentUser.UserID;
                            this.VM.OpponentPlayer.IsOnline = opponentUser.IsOnline;
                            this.usersProvider.get(opponentUser.UserID, function (user) {
                                _this.VM.OpponentPlayer.Nick = user.Nick;
                                _this.VM.OpponentPlayer.AvatarUri = user.AvatarUrl;
                                _this.VM.OpponentPlayer.LevelName = user.Game ? _this.currentUser.getPlayerLevelName(user.Game.RatingStars) : '';
                                _this.VM.OpponentPlayer.RelationStatusID = _this.VM.OpponentPlayer.IsFrendRequestSent ? All_14.UserRelationStatuses.Pending : user.RelationStatusID2;
                                _this.VM.OpponentPlayer.IsBlocked = _this.blockedUserIds.indexOf(user.UserID) > -1;
                            });
                        }
                    }
                    switch (this.VM.Status) {
                        case game_model_2.TableStatuses.New: {
                            if (table.Channel) {
                                this.VM.InviteLink = this.config.playUrl + '?channel=' + table.Channel;
                                this.chat.addItem(Chat_3.ChatItemMode.Jok, this.CHAT_SENDER_JOK, this.VM.InviteLink, Chat_3.ChatItemTemplate.ServerPrivateTable, null, null, null);
                            }
                            else {
                                this.chat.addItem(Chat_3.ChatItemMode.Jok, this.CHAT_SENDER_JOK, this.VM.InviteLink, Chat_3.ChatItemTemplate.ServerPublicTable, null, null, null);
                            }
                            break;
                        }
                        case game_model_2.TableStatuses.Started:
                        case game_model_2.TableStatuses.Stopped: {
                            break;
                        }
                        case game_model_2.TableStatuses.Finished: {
                            var users = table.Players;
                            var player1 = users[0].UserID == this.config.currentUserId ? users[0] : users[1];
                            var player2 = users[0].UserID == this.config.currentUserId ? users[1] : users[0];
                            var areBothOnline = player1.IsOnline && player2.IsOnline;
                            this.VM.DownCards = null;
                            this.VM.DominatedColor = null;
                            var player1Place = player1.Score > player2.Score ? 1 : 2;
                            var player2Place = player2.Score > player1.Score ? 1 : 2;
                            if (player1.Score == player2.Score) {
                                player1Place = player2Place = 0;
                            }
                            var winnerPoints = this.VM.FinishInfo.Players[0].Points;
                            this.VM.FinishInfo = new finishinfo_model_2.FinishInfoModel();
                            this.VM.FinishInfo.Players = [
                                {
                                    UserID: this.VM.CurrentPlayer.UserID,
                                    Nick: this.VM.CurrentPlayer.Nick,
                                    Score: player1.Score,
                                    Points: winnerPoints,
                                    Rating: 0,
                                    IsOnline: this.VM.CurrentPlayer.IsOnline,
                                    Place: player1Place
                                },
                                {
                                    UserID: this.VM.OpponentPlayer.UserID,
                                    Nick: this.VM.OpponentPlayer.Nick,
                                    Score: player2.Score,
                                    Points: 0,
                                    Rating: 0,
                                    IsOnline: this.VM.OpponentPlayer.IsOnline,
                                    Place: player2Place
                                }
                            ];
                            break;
                        }
                    }
                };
                GameProvider.prototype.serverUserCards = function (cards, cardPairs, opponentOpenCards) {
                    var _this = this;
                    this.VM.CurrentPlayerCards = cards.map(function (x) { return _this.convertServerCard(x); }).filter(function (x) { return x.IsVisible; }).sort(Cards_5.CardType.Sort);
                    this.VM.CurrentPlayerOpenCards = cardPairs.map(function (x) { return _this.convertServerCard(x.OpenCard); }).filter(function (x) { return x.IsVisible; }).sort(Cards_5.CardType.SortWithDominatedLast);
                    this.VM.OpponentPlayerOpenCards = opponentOpenCards.map(function (x) { return _this.convertServerCard(x); }).filter(function (x) { return x.IsVisible; }).sort(Cards_5.CardType.SortWithDominatedLast);
                };
                GameProvider.prototype.serverKozirRequest = function () {
                    this.VM.DominatedColor = null;
                    this.VM.ColorSelectionMode = Cards_5.ColorSelectionMode.ColorSelection;
                    this.startWindowTitleNotification();
                };
                GameProvider.prototype.serverUserCardPermissions = function (permissions) {
                    var _this = this;
                    if (!permissions || !permissions.length)
                        return;
                    permissions.forEach(function (p) {
                        var card = _this.VM.CurrentPlayerOpenCards.filter(function (x) { return x.ID == p.CardID; })[0];
                        if (!card)
                            card = _this.VM.CurrentPlayerCards.filter(function (x) { return x.ID == p.CardID; })[0];
                        if (!card)
                            return;
                        card.IsEnabled = p.IsEnabled;
                    });
                };
                GameProvider.prototype.serverCardRequest = function (IsFirstCard) {
                    this.VM.IsFirstCard = IsFirstCard;
                    this.VM.IsCardSelectionEnabled = true;
                };
                GameProvider.prototype.serverUserCardDown = function (userid, card) {
                    var isOpponentCard = (this.config.currentUserId != userid);
                    var searchCard = null;
                    if (!isOpponentCard) {
                        searchCard = this.VM.CurrentPlayerCards.filter(function (x) { return x.ID == card.ID; })[0];
                        if (!searchCard)
                            searchCard = this.VM.CurrentPlayerOpenCards.filter(function (x) { return x.ID == card.ID; })[0];
                    }
                    else {
                        searchCard = this.VM.OpponentPlayerOpenCards.filter(function (x) { return x.ID == card.ID; })[0];
                    }
                    if (searchCard)
                        searchCard.IsVisible = false;
                    this.removeFromCardsCollection(card.ID, this.VM.CurrentPlayerOpenCards);
                    this.removeFromCardsCollection(card.ID, this.VM.OpponentPlayerOpenCards);
                    var convertedCard = this.convertServerCard(card);
                    if (Cards_5.CardType.IsSpecial(convertedCard)) {
                        convertedCard.IsActivated = this.isActivated;
                        convertedCard.SpecialColor = this.specialColor;
                    }
                    this.VM.DownCards[isOpponentCard ? 2 : 0] = convertedCard;
                    this.VM.LastActivePlayerPosition = isOpponentCard ? 2 : 0;
                    this.playAudio(Cards_5.CardType.IsSpecial(convertedCard) ? game_model_2.PlayAudioModes.SpecialCard : game_model_2.PlayAudioModes.Card);
                    this.VM.ActivePlayerUserID = null;
                    this.VM.ColorSelectionMode = null;
                };
                GameProvider.prototype.serverOpenUserCard = function (cardid, card) {
                    var newCard = this.convertServerCard(card);
                    this.VM.CurrentPlayerCards.push(newCard);
                };
                GameProvider.prototype.serverHideOpponentPair = function (cardid) {
                };
                GameProvider.prototype.serverUserSelectedKozir = function (cardColor) {
                    this.VM.ColorSelectionMode = null;
                    this.VM.DominatedColor = cardColor;
                    this.VM.CurrentPlayerCards.forEach(function (x) { return x.IsDominated = x.CardColor == cardColor; });
                    this.VM.CurrentPlayerOpenCards.forEach(function (x) { return x.IsDominated = x.CardColor == cardColor; });
                    this.VM.OpponentPlayerOpenCards.forEach(function (x) { return x.IsDominated = x.CardColor == cardColor; });
                };
                GameProvider.prototype.serverUserTook = function (userid, takenCount) {
                    var _this = this;
                    this.VM.IsFirstCard = true;
                    this.VM.ActivePlayerUserID = null;
                    this.VM.DownCardsAnimated = this.VM.LastTakenCards = this.VM.DownCards;
                    this.VM.DownCards = [null, null, null, null];
                    var currentUserTook = this.config.currentUserId == userid;
                    this.downCardsProvider.animate(currentUserTook ? 1 : 3, function () {
                        _this.VM.DownCardsAnimated = null;
                        if (currentUserTook)
                            _this.VM.CurrentPlayer.Want = takenCount;
                        else
                            _this.VM.OpponentPlayer.Want = takenCount;
                    });
                };
                GameProvider.prototype.serverActivateUser = function (userid) {
                    var players = [this.VM.CurrentPlayer, this.VM.OpponentPlayer];
                    var player = players.filter(function (x) { return x.UserID == userid; })[0];
                    if (!player)
                        return;
                    this.VM.ActivePlayerUserID = player.UserID;
                    this.profileProvider.activate(player.UserID, (!player.IsOnline) ? 3000 : 15000);
                };
                GameProvider.prototype.serverCardDownNotification = function (isActivated, specialColor) {
                    this.isActivated = isActivated;
                    this.specialColor = specialColor - 0;
                };
                GameProvider.prototype.serverUpdateUserOnlineStatus = function (userid, isOnline) {
                    if (userid == this.config.currentUserId)
                        return;
                    this.VM.OpponentPlayer.IsOnline = isOnline;
                };
                GameProvider.prototype.serverOpponentCardsCount = function (count) {
                    this.VM.OpponentCardsCount = count;
                };
                GameProvider.prototype.serverGameFinishResult = function (result) {
                    this.VM.FinishInfo.Players[0].Points = result.AddedPoints;
                };
                GameProvider.prototype.serverBuzz = function () {
                    var _this = this;
                    this.playAudio(game_model_2.PlayAudioModes.Buzz);
                    setTimeout(function () { return _this.profileProvider.chatBubble('Buzz', _this.VM.OpponentPlayer.UserID); }, 2000);
                };
                GameProvider.prototype.serverChatMessage = function (userid, msg, msgId) {
                    var _this = this;
                    if (this.blockedUserIds.indexOf(userid) > -1)
                        return;
                    this.usersProvider.get(userid, function (user) {
                        _this.chat.addItem(Chat_3.ChatItemMode.player2, user.Nick, msg, Chat_3.ChatItemTemplate.Default, msgId, user.UserID, user.AvatarUrl);
                    });
                };
                GameProvider.prototype.serverChatBanned = function (days) {
                    this.chat.addItem(Chat_3.ChatItemMode.Jok, this.CHAT_SENDER_JOK, 'Chat is blocked for {DAYS} days, reason: censorship. You can only use smiles.'.replace('{DAYS}', days));
                };
                GameProvider.prototype.serverUserListeningMusic = function (userid, isListening, channelID) {
                    if (this.config.currentUserId == userid)
                        return;
                    this.VM.OpponentPlayer.MusicChannel = channelID;
                    this.VM.OpponentPlayer.IsListening = isListening;
                };
                GameProvider.prototype.cardSelected = function (card, isWant, wantColor) {
                    if (isWant === void 0) { isWant = false; }
                    if (wantColor === void 0) { wantColor = -1; }
                    this.VM.ColorSelectionMode = null;
                    this.VM.DownCards[0] = card;
                    this.VM.DownCards[0].IsEnabled = false;
                    this.VM.IsCardSelectionEnabled = false;
                    this.VM.ActivePlayerUserID = null;
                    this.VM.LastActivePlayerPosition = 0;
                    this.profileProvider.stopActivate();
                    this.removeFromCardsCollection(card.ID, this.VM.CurrentPlayerOpenCards);
                    this.playAudio(Cards_5.CardType.IsSpecial(card) ? game_model_2.PlayAudioModes.SpecialCard : game_model_2.PlayAudioModes.Card);
                    this.server.send('SelectCard', card.ID, isWant, wantColor);
                };
                GameProvider.prototype.playAudio = function (mode) {
                    var audios = {
                        cardDown: 'carddown',
                        cardDown2: 'carddown2',
                        specialCardDown: 'special_card_down',
                        playerLogin: 'PlayerLoginNotification',
                        Buzz: 'Buzz'
                    };
                    var sound;
                    if (!this.config.isAudioEffectsEnabled)
                        return;
                    if (mode == game_model_2.PlayAudioModes.SpecialCard) {
                        sound = audios.specialCardDown;
                    }
                    if (mode == game_model_2.PlayAudioModes.Card) {
                        if (Math.floor(Math.random() * 2) == 0)
                            sound = audios.cardDown;
                        else
                            sound = audios.cardDown2;
                    }
                    if (mode == game_model_2.PlayAudioModes.PlayerLogin) {
                        sound = audios.playerLogin;
                    }
                    if (!sound)
                        return;
                    this.platform.playAudio(sound);
                };
                GameProvider.prototype.startWindowTitleNotification = function () {
                    var _this = this;
                    var originalWindowTitle = this.windowTitle.getTitle();
                    var symbols = ['👻', '❤️‍', '🐓', '🐥', '🐙', '🙈'];
                    var interval = setInterval(function () {
                        if (!document.hidden) {
                            _this.windowTitle.setTitle(originalWindowTitle);
                            clearInterval(interval);
                            return;
                        }
                        var symbol = symbols[Date.now() % symbols.length];
                        var newTitle = ((_this.windowTitle.getTitle() != originalWindowTitle) ? '' : symbol + ' ') + originalWindowTitle;
                        _this.windowTitle.setTitle(newTitle);
                    }, 300);
                };
                GameProvider.prototype.convertServerCard = function (x) {
                    var card = new Cards_5.CardType();
                    card.ID = x.ID;
                    card.CardColor = x.Color - 0;
                    card.CardLevel = x.Level - 6;
                    card.IsVisible = x.IsVisible;
                    card.IsDominated = card.CardColor == this.VM.DominatedColor;
                    card.IsEnabled = false;
                    if (x.Level == 15) {
                        card.CardLevel = Cards_5.CardLevel._6;
                        card.CardColor = Cards_5.CardColor.Red;
                    }
                    return card;
                };
                GameProvider.prototype.removeFromCardsCollection = function (cardid, cardsCollection) {
                    var card = cardsCollection.filter(function (x) { return x.ID == cardid; })[0];
                    var openCardIndex = cardsCollection.indexOf(card);
                    if (~openCardIndex) {
                        cardsCollection.splice(openCardIndex, 1);
                        if (cardsCollection.length == 1) {
                            cardsCollection.splice(0, 1);
                        }
                    }
                };
                GameProvider = __decorate([
                    core_53.Injectable(), 
                    __metadata('design:paramtypes', [router_10.Router, viewmodel_provider_1.ViewModelProvider, ng2_translate_4.TranslateService, All_14.ConfigProvider, All_14.UsersProvider, Cards_5.DownCardsProvider, All_14.ProfileProvider, Communication_4.CommunicationClientProvider, All_14.CurrentUserProvider, Chat_3.ChatProvider, core_53.NgZone, browser_2.Title, Platforms_6.PlatformProvider])
                ], GameProvider);
                return GameProvider;
            }());
            exports_75("GameProvider", GameProvider);
        }
    }
});
System.register("Modules/JapJoker/finishinfo", ['angular2/core', "Common/Providers/CurrentUserProvider", "Modules/JapJoker/finishinfo.model", "Modules/JapJoker/game.provider"], function(exports_76, context_76) {
    "use strict";
    var __moduleName = context_76 && context_76.id;
    var core_54, CurrentUserProvider_7, finishinfo_model_3, game_provider_1;
    var UIFinishInfo;
    return {
        setters:[
            function (core_54_1) {
                core_54 = core_54_1;
            },
            function (CurrentUserProvider_7_1) {
                CurrentUserProvider_7 = CurrentUserProvider_7_1;
            },
            function (finishinfo_model_3_1) {
                finishinfo_model_3 = finishinfo_model_3_1;
            },
            function (game_provider_1_1) {
                game_provider_1 = game_provider_1_1;
            }],
        execute: function() {
            UIFinishInfo = (function () {
                function UIFinishInfo(game, currentUser) {
                    this.game = game;
                    this.currentUser = currentUser;
                    this.playerIndexes = [0, 1];
                }
                UIFinishInfo.prototype.getAddedRating = function () {
                    return;
                };
                UIFinishInfo.prototype.getAddedPoints = function () {
                    return this.source.Players[0].Points;
                };
                UIFinishInfo.prototype.playNewGame = function () {
                    this.game.uiPlayNewGame();
                };
                UIFinishInfo.prototype.exit = function () {
                    console.log(this.currentUser.Data);
                    this.game.uiExit();
                };
                __decorate([
                    core_54.Input(), 
                    __metadata('design:type', finishinfo_model_3.FinishInfoModel)
                ], UIFinishInfo.prototype, "source", void 0);
                UIFinishInfo = __decorate([
                    core_54.Component({
                        selector: 'finishinfo',
                        styles: [".finishinfo {  z-index: 1; }  .finishinfo table {    z-index: 1;    background: #34495E;    color: white;    font-size: 12px;    text-align: center;    border-radius: 4px; }    .finishinfo table td {      padding: 9px;      min-width: 100px; }    .finishinfo table thead {      z-index: 1; }      .finishinfo table thead tr {        z-index: 1; }        .finishinfo table thead tr td {          z-index: 1;          padding: 19px 5px;          font-size: 14px;          border-bottom: 1px solid #596B7C;          min-width: 160px; }    .finishinfo table tbody {      z-index: 1; }      .finishinfo table tbody tr {        z-index: 1; }        .finishinfo table tbody tr td {          z-index: 1; }        .finishinfo table tbody tr span {          font-size: 14px; }        .finishinfo table tbody tr div {          opacity: .3; }      .finishinfo table tbody tr.place {        font-size: 30px;        border-bottom: 1px solid #596B7C; }      .finishinfo table tbody tr.score {        display: none; }        .finishinfo table tbody tr.score td {          padding: 10px 5px;          padding-top: 20px; }      .finishinfo table tbody tr.points {        border-bottom: 1px solid #596B7C; }        .finishinfo table tbody tr.points td {          padding-top: 20px;          padding-bottom: 20px; }        .finishinfo table tbody tr.points span {          color: orange; }      .finishinfo table tbody tr.rating {        border-bottom: 1px solid #596B7C;        margin-bottom: 10px; }        .finishinfo table tbody tr.rating td {          padding-top: 20px;          padding-bottom: 20px; }        .finishinfo table tbody tr.rating span {          color: #27ae60; }          .finishinfo table tbody tr.rating span.negative {            color: indianred; }      .finishinfo table tbody tr.actions td {        padding-top: 15px;        padding-bottom: 15px; }"],
                        template: '<div class="finishinfo"><table class><thead><tr><td *ngFor="#i of playerIndexes"><div *ngIf="source.Players[i]"><div class="nick">{{source.Players[i].Nick}}</div><div *ngIf="!source.Players[i].IsOnline" class="label label-default">{{ \'common.Offline\' | translate }}</div></div><div [ngSwitch]="source.Players[i].Place"><template [ngSwitchWhen]="0"><span style="color: #808080;">Draw</span></template><template [ngSwitchWhen]="1"><span style="color: #27AE60;">Winner</span></template><template [ngSwitchWhen]="2"><span style="color: #D9534F;">Looser</span></template></div></td></tr></thead><tbody><tr class="place"><td *ngFor="#i of playerIndexes">{{source.Players[i].Score}}</td></tr><tr class="points"><td colspan="2" class="text-center"><span>+{{getAddedPoints()}}</span><div>{{ \'common.Points\' | translate }}</div></td></tr><tr class="rating" *ngIf="getAddedRating()"><td colspan="2" class="text-center"><span [class.negative]="getAddedRating() < 0">{{getAddedRating()}}</span><div>{{ \'common.Rating\' | translate }}</div></td></tr><tr class="actions"><td colspan="2"><button class="btn btn-default" (click)="playNewGame()">{{ \'finishinfo.NewGame\' | translate }}</button><br><br><button class="btn btn-danger" (click)="exit()">{{ \'finishinfo.LeaveGame\' | translate }}</button></td></tr></tbody></table></div>'
                    }), 
                    __metadata('design:paramtypes', [game_provider_1.GameProvider, CurrentUserProvider_7.CurrentUserProvider])
                ], UIFinishInfo);
                return UIFinishInfo;
            }());
            exports_76("UIFinishInfo", UIFinishInfo);
        }
    }
});
System.register("Modules/JapJoker/infopanel", ['angular2/core', 'ng2-translate'], function(exports_77, context_77) {
    "use strict";
    var __moduleName = context_77 && context_77.id;
    var core_55, ng2_translate_5;
    var UIInfoPanel;
    return {
        setters:[
            function (core_55_1) {
                core_55 = core_55_1;
            },
            function (ng2_translate_5_1) {
                ng2_translate_5 = ng2_translate_5_1;
            }],
        execute: function() {
            UIInfoPanel = (function () {
                function UIInfoPanel(translate) {
                    this.translate = translate;
                }
                UIInfoPanel.prototype.hasDominatedColor = function () {
                    return this.dominatedcolor != null && this.dominatedcolor >= 0;
                };
                UIInfoPanel.prototype.getDringText = function () {
                    return this.dring ? -this.dring : this.translate.get('infopanel.Special');
                };
                UIInfoPanel.prototype.isShetenva = function () {
                    return this.balanceNumber > 0;
                };
                UIInfoPanel.prototype.getBalance = function () {
                    return Math.abs(this.balanceNumber);
                };
                UIInfoPanel.prototype.getDring = function () {
                    return -Math.abs(this.dring);
                };
                UIInfoPanel.prototype.getChannel = function () {
                    if (!parseInt(this.channel) || this.hasDominatedColor())
                        return '';
                    return this.channel;
                };
                __decorate([
                    core_55.Input(), 
                    __metadata('design:type', String)
                ], UIInfoPanel.prototype, "channel", void 0);
                __decorate([
                    core_55.Input(), 
                    __metadata('design:type', Number)
                ], UIInfoPanel.prototype, "dring", void 0);
                __decorate([
                    core_55.Input(), 
                    __metadata('design:type', Number)
                ], UIInfoPanel.prototype, "dominatedcolor", void 0);
                __decorate([
                    core_55.Input(), 
                    __metadata('design:type', Number)
                ], UIInfoPanel.prototype, "balanceNumber", void 0);
                UIInfoPanel = __decorate([
                    core_55.Component({
                        selector: 'infopanel',
                        styles: [".infopanel {  position: absolute;  padding: 10px;  text-align: center;  padding-top: 3px;  border-radius: 4px;  font-size: 14px;  min-width: 190px; }  .infopanel header {    padding: 14px;    color: #ffffff;    text-align: center;    margin-top: 27px;    border: 1px solid rgba(255, 255, 255, 0.09);    border-top: 0;    border-left: 0;    border-radius: 0 0 25px 0; }    .infopanel header i {      margin-right: 10px; }    .infopanel header span {      min-width: 30px; }    .infopanel header span.lessOpacity {      opacity: .6; }    .infopanel header span.jok_card_color {      margin-left: 10px;      height: 10px;      width: 50px;      display: inline-block;      border-radius: 2px; }    .infopanel header img {      margin-left: 8px;      vertical-align: middle;      height: 20px; }  .infopanel section {    background: #34495E;    padding: 9px;    border-radius: 5px;    display: none;    position: absolute;    top: 0;    left: 0;    right: 0; }    .infopanel section .item {      margin-top: 5px;      margin-bottom: 5px;      color: rgba(255, 255, 255, 0.7);      text-align: center;      padding-left: 10px;      padding-right: 10px;      font-size: 13px; }      .infopanel section .item span {        color: rgba(255, 255, 255, 0.9); }      .infopanel section .item img.emoji {        height: 45px;        margin-top: 5px; }    .infopanel section .dominated_color {      margin-bottom: 10px;      padding: 5px 14px;      border-radius: 4px;      font-size: 13px;      margin-top: 10px; }  .infopanel:hover section {    display: block; }.jok_card_color.color_0 {  background-color: #2980b9;  border: 1px solid #126195;  color: rgba(255, 255, 255, 0.9); }.jok_card_color.color_1 {  background-color: #e67e22;  border: 1px solid #c46816;  color: rgba(255, 255, 255, 0.9); }.jok_card_color.color_2 {  background-color: #bf3902;  border: 1px solid #882c07;  color: rgba(255, 255, 255, 0.9); }.jok_card_color.color_3 {  background-color: #9b59b6;  border: 1px solid #793c92;  color: rgba(255, 255, 255, 0.9); }.jok_card_color.color_4 {  background-color: white;  border: 1px solid silver;  color: gray; }.jok_card_color.dominated_color {  border: 1px dashed rgba(255, 255, 255, 0.498039); }"],
                        template: '<div class="infopanel"><header><span *ngIf="getChannel()"><span class="lessOpacity">{{\'infopanel.Room\' | translate}}:</span><br>{{getChannel()}}</span> <span *ngIf="!getChannel()">{{ \'infopanel.QuickPlay\' | translate }}</span><span *ngIf="hasDominatedColor()" class="jok_card_color color_{{dominatedcolor}}"></span> <span *ngIf="balanceNumber"><img *ngIf="isShetenva()" draggable="false" class="emoji" alt="??" src="/images/shetenva.png" style="margin-top: -6px;"> <img *ngIf="!isShetenva()" draggable="false" class="emoji" alt="?" src="/images/waglejva3.png"> {{ getBalance() }}</span></header><section><div class="item">{{ \'infopanel.QuickPlay\' | translate }}</div><div *ngIf="hasDominatedColor()" class="dominated_color jok_card_color color_{{dominatedcolor}}">{{ (dominatedcolor == 4 ? \'infopanel.NoDominatedColor\' : \'infopanel.DominatedColor\') | translate }}</div><div *ngIf="balanceNumber" class="item"><img *ngIf="isShetenva()" draggable="false" class="emoji" alt="??" src="/images/shetenva.png"> <img *ngIf="!isShetenva()" draggable="false" class="emoji" alt="?" src="/images/waglejva3.png"></div><div *ngIf="balanceNumber">{{ (isShetenva() ? \'infopanel.LabelBalanceExtraCards\' : \'infopanel.LabelBalanceInsufficiency\') | translate }} {{ getBalance() }}</div></section></div>'
                    }), 
                    __metadata('design:paramtypes', [ng2_translate_5.TranslateService])
                ], UIInfoPanel);
                return UIInfoPanel;
            }());
            exports_77("UIInfoPanel", UIInfoPanel);
        }
    }
});
System.register("Modules/JapJoker/notification", ['angular2/core'], function(exports_78, context_78) {
    "use strict";
    var __moduleName = context_78 && context_78.id;
    var core_56;
    var UINotification;
    return {
        setters:[
            function (core_56_1) {
                core_56 = core_56_1;
            }],
        execute: function() {
            UINotification = (function () {
                function UINotification() {
                }
                UINotification.prototype.reconnect = function () {
                    document.location.reload(true);
                };
                __decorate([
                    core_56.Input(), 
                    __metadata('design:type', Number)
                ], UINotification.prototype, "type", void 0);
                __decorate([
                    core_56.Input(), 
                    __metadata('design:type', String)
                ], UINotification.prototype, "inviteLink", void 0);
                __decorate([
                    core_56.Input(), 
                    __metadata('design:type', String)
                ], UINotification.prototype, "playerNick", void 0);
                __decorate([
                    core_56.Input(), 
                    __metadata('design:type', Number)
                ], UINotification.prototype, "gameStartSeconds", void 0);
                UINotification = __decorate([
                    core_56.Component({
                        selector: 'notification',
                        styles: [".notification .content {  background: #34495E;  border: 1px solid #20374D;  text-align: center;  padding: 10px;  border-radius: 10px;  width: 400px;  position: absolute;  left: 50%;  margin-left: -200px;  top: 50%;  margin-top: -50px;  z-index: 3000; }  .notification .content._6 {    margin-top: -100px; }    .notification .content._6 div {      margin-top: 10px;      margin-bottom: 10px; }    .notification .content._6 ul {      margin-top: 15px;      margin-bottom: 15px;      opacity: 0.6; }.notification input {  background: #5B728A;  color: white; }"],
                        template: '<div class="notification" *ngIf="type"><div [ngSwitch]="type" class="content _{{type}}"><template [ngSwitchWhen]="1">{{\'notification.ConnectingServerLabel\' | translate}} {{ playerNick }} ...</template><template [ngSwitchWhen]="2">{{\'notification.AuthenticatingLabel\' | translate}}</template><template [ngSwitchWhen]="3">{{\'notification.RequireAuthorizationLabel\' | translate}}</template><template [ngSwitchWhen]="4">{{\'notification.WaitingForOpponentLabel\' | translate}}</template><template [ngSwitchWhen]="6"><div>{{\'notification.ConnectionClosedLabel\' | translate}}</div><div><ul class="text-left"><li>{{ \'notification.ConnectionClosedReason1\' | translate }}</li><li>{{ \'notification.ConnectionClosedReason2\' | translate }}</li></ul></div><div><button class="btn btn-default" (click)="reconnect()">{{ \'notification.ReconnectButton\' | translate }}</button></div></template><template [ngSwitchWhen]="8">{{\'notification.GameStartingLabel\' | translate : { seconds: gameStartSeconds } }}</template></div></div>'
                    }), 
                    __metadata('design:paramtypes', [])
                ], UINotification);
                return UINotification;
            }());
            exports_78("UINotification", UINotification);
        }
    }
});
System.register("Modules/JapJoker/game", ['angular2/core', 'angular2/router', 'Jok/Cards', 'Jok/Chat', "Common/ignoreContextMenu", "Common/Components/All", "Common/Providers/All", "Modules/JapJoker/game.model", "Modules/JapJoker/viewmodel.provider", "Modules/JapJoker/game.provider", "Modules/JapJoker/finishinfo", "Modules/JapJoker/infopanel", "Modules/JapJoker/notification"], function(exports_79, context_79) {
    "use strict";
    var __moduleName = context_79 && context_79.id;
    var core_57, router_11, Cards_6, Chat_4, ignoreContextMenu_2, All_15, All_16, game_model_3, viewmodel_provider_2, game_provider_2, finishinfo_2, infopanel_2, notification_2;
    var UIGame;
    return {
        setters:[
            function (core_57_1) {
                core_57 = core_57_1;
            },
            function (router_11_1) {
                router_11 = router_11_1;
            },
            function (Cards_6_1) {
                Cards_6 = Cards_6_1;
            },
            function (Chat_4_1) {
                Chat_4 = Chat_4_1;
            },
            function (ignoreContextMenu_2_1) {
                ignoreContextMenu_2 = ignoreContextMenu_2_1;
            },
            function (All_15_1) {
                All_15 = All_15_1;
            },
            function (All_16_1) {
                All_16 = All_16_1;
            },
            function (game_model_3_1) {
                game_model_3 = game_model_3_1;
            },
            function (viewmodel_provider_2_1) {
                viewmodel_provider_2 = viewmodel_provider_2_1;
            },
            function (game_provider_2_1) {
                game_provider_2 = game_provider_2_1;
            },
            function (finishinfo_2_1) {
                finishinfo_2 = finishinfo_2_1;
            },
            function (infopanel_2_1) {
                infopanel_2 = infopanel_2_1;
            },
            function (notification_2_1) {
                notification_2 = notification_2_1;
            }],
        execute: function() {
            UIGame = (function () {
                function UIGame(viewModelProvider, chat, gameProvider, currentUser, routeParams, config) {
                    var _this = this;
                    this.viewModelProvider = viewModelProvider;
                    this.chat = chat;
                    this.gameProvider = gameProvider;
                    this.currentUser = currentUser;
                    this.routeParams = routeParams;
                    this.config = config;
                    this.chatOnlyEmotions = false;
                    this.AccountCallbacks = {
                        onChangeAudioOption: function (isOn) { return _this.config.changeAudioOption(isOn); },
                        onExit: function () { return _this.gameProvider.uiExit(); },
                        onClearChat: function () { return _this.chat.reset(); }
                    };
                    this.CardsCallbacks = {
                        onClick: function (card) { return _this.gameProvider.uiCardClick(card); }
                    };
                    this.OpenCardsCallbacks = {
                        onClick: function (card) { return _this.gameProvider.uiCardClick(card); }
                    };
                    this.ColorSelectionCallbacks = {
                        onSelectDominatedColor: function (color) { return _this.gameProvider.uiDominatedColorSelect(color); },
                        onSelectWantColor: function (color) { return _this.gameProvider.uiWantColorSelect(color); },
                        onSelectTakeColor: function (color) { return _this.gameProvider.uiTakeColorSelect(color); },
                        onWantTakeClick: function (isWant) { return _this.gameProvider.uiWantTakeClick(isWant); },
                        onDeclarationClick: function (want) { }
                    };
                    this.ProfileCallbacks = {
                        onClick: function (ev, position, userid) {
                            if (userid != _this.Game.CurrentPlayer.UserID)
                                return;
                            _this.showSmiles = !_this.showSmiles;
                            ev.stopPropagation();
                        },
                        onSendFriendRequest: function (userid) { return _this.gameProvider.sendFriendRequest(userid); },
                        onBlock: function (userid) { return _this.gameProvider.blockUser(userid); },
                        onUnblock: function (userid) { return _this.gameProvider.unblockUser(userid); },
                        onListenChannel: function (channel) { return _this.gameProvider.uiListenChannel(channel); }
                    };
                    this.Game = viewModelProvider.VM;
                }
                UIGame.prototype.ngOnInit = function () {
                    var _this = this;
                    this.config.channel = this.routeParams.get('channel') || '';
                    this.config.mode = parseInt(this.routeParams.get('mode')) || 0;
                    this.chat.on('HideSmilesBox', function () { return _this.showSmiles = false; });
                    this.gameProvider.start();
                    this.chatOnlyEmotions = !this.config.channel;
                };
                UIGame.prototype.ngOnDestroy = function () {
                    this.gameProvider.stop();
                };
                UIGame.prototype.onGlobalKeyUp = function (ev) {
                    this.isLastTakenCardsVisible = false;
                };
                UIGame.prototype.onGlobalClick = function (ev) {
                    this.isLastTakenCardsVisible = false;
                    this.showSmiles = false;
                };
                UIGame.prototype.isPositionSelection = function () {
                    return !this.Game.IsConnectionClosed && (this.Game.Status == game_model_3.TableStatuses.New);
                };
                UIGame.prototype.isGameStarted = function () {
                    return !this.Game.IsConnectionClosed && (this.Game.Status == game_model_3.TableStatuses.Started || this.Game.Status == game_model_3.TableStatuses.Stopped);
                };
                UIGame.prototype.isFinished = function () {
                    return !this.Game.IsConnectionClosed && (this.Game.Status == game_model_3.TableStatuses.Finished);
                };
                UIGame.prototype.isLoaded = function () {
                    return this.isPositionSelection() || this.isGameStarted() || this.isFinished();
                };
                UIGame.prototype.showLastTakenCards = function (ev, isClick) {
                    this.isLastTakenCardsVisible = true;
                    if (isClick && this.config.isCompact)
                        return;
                    if (ev) {
                        ev.stopPropagation();
                        ev.preventDefault();
                    }
                };
                UIGame.prototype.hideLastTakenCards = function () {
                    this.isLastTakenCardsVisible = false;
                };
                UIGame = __decorate([
                    core_57.Component({
                        host: {
                            '(document:keyup)': 'onGlobalKeyUp($event)',
                            '(document:click)': 'onGlobalClick($event)',
                            'style': 'overflow: hidden'
                        },
                        selector: 'game',
                        styles: [".game {  background: #27ae60;  color: white;  min-height: 700px; }  .game .inner {    position: absolute;    top: 0;    bottom: 0;    right: 0;    width: 760px;    min-height: 450px;    left: 50%;    margin-left: -380px; }  .game #Player1 {    position: absolute;    bottom: 10px;    left: 50%;    margin-left: -60px;    z-index: 510; }  .game account {    position: fixed;    top: 10px;    left: 10px;    z-index: 3000; }  .game #CurrentPlayerOpenCards {    position: absolute;    bottom: 110px;    right: 10px; }    .game #CurrentPlayerOpenCards card {      margin-left: -50px; }  .game #OpponentPlayerOpenCards {    position: absolute;    top: 20px;    right: 10px; }    .game #OpponentPlayerOpenCards card {      margin-left: -50px; }  .game chatbox {    position: fixed;    left: 3px;    bottom: 3px;    top: 3px;    width: 300px;    border-right: 1px dashed rgba(255, 255, 255, 0.25);    background: transparent;    z-index: 100; }  .game chatsmiles {    position: absolute;    z-index: 10002;    bottom: -20px;    left: 50%;    margin-left: -140px; }  .game #Player2 {    position: absolute;    top: 50%;    left: 10px;    margin-top: -80px;    z-index: 200; }  .game #Player3 {    position: absolute;    top: 10px;    left: 50%;    margin-left: -65px; }  .game #Player4 {    position: absolute;    top: 50%;    right: 10px;    margin-top: -80px; }  .game cards#CurrentPlayerCards {    position: absolute;    left: 50%;    right: 0;    text-align: center;    bottom: 50px;    margin-left: -88px;    z-index: 500; }  .game .player2cards {    position: absolute;    left: 50px;    top: 50%;    padding-top: 80px;    width: 70px; }    .game .player2cards cards {      position: absolute;      -webkit-transform: rotate(90deg);      -moz-transform: rotate(90deg);      -ms-transform: rotate(90deg);      -o-transform: rotate(90deg);      transform: rotate(90deg);      left: 0; }  .game .player3cards {    position: absolute;    left: 50%;    top: 100px;    width: 200px;    height: 21px;    text-align: left;    margin-left: 33px; }    .game .player3cards cards {      position: absolute;      -moz-transform: rotate(10deg) rotateY(180deg);      -ms-transform: rotate(10deg) rotateY(180deg);      -o-transform: rotate(10deg) rotateY(180deg);      -webkit-transform: rotate(10deg) rotateY(180deg);      transform: rotate(180deg) rotateY(180deg); }  .game .player4cards {    position: absolute;    right: 50px;    top: 50%;    width: 70px;    margin-top: 80px; }    .game .player4cards cards {      position: absolute;      -webkit-transform: rotate(90deg) rotateX(180deg);      -moz-transform: rotate(90deg) rotateX(180deg);      -ms-transform: rotate(90deg) rotateX(180deg);      -o-transform: rotate(90deg) rotateX(180deg);      transform: rotate(90deg) rotateX(180deg);      right: 0; }  .game #LastTakenCards {    position: absolute;    right: 13px;    bottom: 20px;    z-index: 2000;    width: 210px;    height: 272px;    background: #34495e;    padding-left: 60px;    padding-top: 90px;    border-radius: 5px;    border: 1px solid #20374D; }  .game #ShowLastTakenCards {    position: absolute;    right: 75px;    bottom: 15px;    cursor: pointer;    font-size: 28px;    z-index: 100;    color: rgba(255, 255, 255, 0.5);    padding: 8px; }    .game #ShowLastTakenCards:hover {      color: rgba(255, 255, 255, 0.8); }  .game #GameTable {    position: absolute;    top: 100px;    bottom: 100px;    left: 70px;    right: 70px;    border: 1px solid #188670;    background: #16a085;    border-radius: 55px; }    .game #GameTable.started {      /*bottom: 40px;*/ }    .game #GameTable downcards {      position: absolute;      left: 50%;      top: 50%;      margin-top: -10px;      margin-left: -47px; }    .game #GameTable declaration {      position: absolute;      left: -1px;      right: -1px;      bottom: 200px;      z-index: 200; }    .game #GameTable colorselection {      position: absolute;      left: 50%;      margin-left: -100px;      bottom: 50%;      margin-bottom: -100px;      z-index: 10001; }  .game results {    position: absolute;    right: 3px;    top: 3px;    width: 300px;    z-index: 10000; }  .game finishinfo {    position: absolute;    left: 50%;    top: 50%;    margin-left: -170px;    margin-top: -170px;    z-index: 50000;    box-shadow: 0 0 20px black;    border-radius: 5px; }  .game infopanel {    position: absolute;    left: 2px;    top: -24px; }.game.compact {  min-height: 0; }  .game.compact #CurrentPlayerOpenCards {    bottom: 20px; }  .game.compact.gameStarted cards#CurrentPlayerCards {    bottom: -60px; }  .game.compact.gameStarted .player2cards,  .game.compact.gameStarted .player3cards,  .game.compact.gameStarted .player4cards {    display: none; }  .game.compact.gameStarted #GameTable {    top: 60px; }    .game.compact.gameStarted #GameTable declaration {      bottom: 90px; }  .game.compact.gameStarted #Player2, .game.compact.gameStarted #Player4 {    margin-top: -52px; }  .game.compact.gameStarted #ShowLastTakenCards {    right: 5px; }  .game.compact.gameStarted #LastTakenCards {    right: 0; }"],
                        template: '<div class="game" [class.compact]="config.isCompact" [class.gameStarted]="isGameStarted()"><account *ngIf="Game.CurrentPlayer.Nick" [nick]="Game.CurrentPlayer.Nick" [info]="currentUser.getPlayerLevelName() | translate" [avatarUrl]="Game.CurrentPlayer.AvatarUri" [isAudioEffectsEnabled]="config.isAudioEffectsEnabled" [mode]="2" [isMobile]="config.isMobile()" [callbacks]="AccountCallbacks"></account><chatbox *ngIf="isLoaded() && !config.isCompact" [isVIPMember]="Game.CurrentPlayer && Game.CurrentPlayer.IsVIP" [onlyEmotions]="chatOnlyEmotions" class="visible-lg"></chatbox><div class="inner"><profile *ngIf="isPositionSelection() || isGameStarted() || (isFinished() && !config.isCompact)" id="Player1" [mini]="isGameStarted() ? true : false" [callbacks]="ProfileCallbacks" [currentUserId]="Game.CurrentPlayer.UserID" [player]="Game.CurrentPlayer" [isActive]="Game.CurrentPlayer && (Game.ActivePlayerUserID == Game.CurrentPlayer.UserID)" [position]="1"></profile><profile *ngIf="isPositionSelection() || isGameStarted() || (isFinished() && !config.isCompact)" id="Player3" [mini]="isGameStarted() ? config.isCompact : false" [callbacks]="ProfileCallbacks" [currentUserId]="Game.CurrentPlayer.UserID" [player]="Game.OpponentPlayer" [isActive]="Game.OpponentPlayer && (Game.ActivePlayerUserID == Game.OpponentPlayer.UserID)" [position]="3" [enablePositionSelection]="false"></profile><downcards id="LastTakenCards" ignoreContextMenu *ngIf="isGameStarted() && Game.LastTakenCards && isLastTakenCardsVisible" [source]="Game.LastTakenCards" [lastActivePlayerPosition]="0"></downcards><div id="ShowLastTakenCards" ignoreContextMenu *ngIf="isGameStarted() && Game.LastTakenCards" (click)="showLastTakenCards($event, true)" (touchstart)="showLastTakenCards($event)" (touchend)="hideLastTakenCards()"><i class="fa fa-history"></i></div><cards id="CurrentPlayerCards" *ngIf="isGameStarted()" [source]="Game.CurrentPlayerCards" [isSelectionAllowed]="Game.IsCardSelectionEnabled" [isVisible]="true" [isCompact]="config.isCompact" [enableShadows]="true" [callbacks]="CardsCallbacks"></cards><div id="GameTable" [class.started]="isGameStarted()" *ngIf="(isPositionSelection() || isGameStarted())"><downcards [source]="Game.DownCards" [lastActivePlayerPosition]="Game.LastActivePlayerPosition" [mode2cards]="true"></downcards><downcards [source]="Game.DownCardsAnimated" [lastActivePlayerPosition]="Game.LastActivePlayerPosition" [mode2cards]="true" [isAnimationEnabled]="true"></downcards><colorselection [mode]="Game.ColorSelectionMode" [callbacks]="ColorSelectionCallbacks"></colorselection><infopanel *ngIf="Game.IsTableInfoReceived" [channel]="Game.TableChannel" [dominatedcolor]="Game.DominatedColor" [balanceNumber]="Game.BalanceNumber"></infopanel><chatsmiles *ngIf="showSmiles && !Game.IsConnectionClosed" [isVIPMember]="Game.CurrentPlayer && Game.CurrentPlayer.IsVIP"></chatsmiles><div class="player3cards" [title]="\'common.OpponentCardsTooltip\' | translate : { count: Game.OpponentCardsCount }"><cards [miniCardsCount]="Game.OpponentCardsCount" [isVisible]="true"></cards></div><div id="CurrentPlayerOpenCards"><card *ngFor="#item of Game.CurrentPlayerOpenCards" [card]="item" [isCompact]="config.isCompact" [isSelectionAllowed]="Game.IsCardSelectionEnabled" [enableShadows]="true" [callbacks]="OpenCardsCallbacks" [forceHideTitle]="true" [mini]="true"></card></div><div id="OpponentPlayerOpenCards"><card *ngFor="#item of Game.OpponentPlayerOpenCards" [card]="item" [isCompact]="config.isCompact" [isSelectionAllowed]="Game.IsCardSelectionEnabled" [enableShadows]="true" [callbacks]="OpenCardsCallbacks" [forceHideTitle]="true" [mini]="true"></card></div></div><finishinfo *ngIf="isFinished()" [source]="Game.FinishInfo"></finishinfo><notification id="Notification" [type]="Game.NotificationType" [inviteLink]="Game.InviteLink" [playerNick]="Game.CurrentPlayer.Nick" [gameStartSeconds]="Game.GameStartSeconds"></notification></div></div>',
                        directives: [
                            All_15.UIProfile,
                            Cards_6.UICard,
                            Cards_6.UICards,
                            notification_2.UINotification,
                            Cards_6.UIDownCards,
                            Cards_6.UIColorSelection,
                            finishinfo_2.UIFinishInfo,
                            All_15.UIAccount,
                            Chat_4.UIChatBox,
                            Chat_4.UIChatSmiles,
                            infopanel_2.UIInfoPanel,
                            ignoreContextMenu_2.IgnoreContextMenu],
                        providers: [
                            game_provider_2.GameProvider,
                            Cards_6.DownCardsProvider,
                            All_16.ProfileProvider
                        ]
                    }), 
                    __metadata('design:paramtypes', [viewmodel_provider_2.ViewModelProvider, Chat_4.ChatProvider, game_provider_2.GameProvider, All_16.CurrentUserProvider, router_11.RouteParams, All_16.ConfigProvider])
                ], UIGame);
                return UIGame;
            }());
            exports_79("UIGame", UIGame);
        }
    }
});
System.register("Modules/JapJoker/Pages/play", ['angular2/core', 'Jok/Communication', "Modules/JapJoker/game", "Modules/JapJoker/viewmodel.provider"], function(exports_80, context_80) {
    "use strict";
    var __moduleName = context_80 && context_80.id;
    var core_58, Communication_5, game_3, viewmodel_provider_3;
    var UIPlay;
    return {
        setters:[
            function (core_58_1) {
                core_58 = core_58_1;
            },
            function (Communication_5_1) {
                Communication_5 = Communication_5_1;
            },
            function (game_3_1) {
                game_3 = game_3_1;
            },
            function (viewmodel_provider_3_1) {
                viewmodel_provider_3 = viewmodel_provider_3_1;
            }],
        execute: function() {
            UIPlay = (function () {
                function UIPlay() {
                }
                UIPlay = __decorate([
                    core_58.Component({
                        selector: 'play',
                        styles: ["game {  position: absolute;  left: 0;  right: 0;  top: 0;  bottom: 0; }"],
                        template: '<game></game>',
                        directives: [game_3.UIGame],
                        providers: [
                            viewmodel_provider_3.ViewModelProvider,
                            core_58.provide(Communication_5.CommunicationClientProvider, { useClass: Communication_5.SignalRClientProvider }),
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], UIPlay);
                return UIPlay;
            }());
            exports_80("UIPlay", UIPlay);
        }
    }
});
System.register("Modules/JapJoker/Pages/mock", ['angular2/core', 'Jok/Communication', "Modules/JapJoker/game", "Modules/JapJoker/viewmodel.provider"], function(exports_81, context_81) {
    "use strict";
    var __moduleName = context_81 && context_81.id;
    var core_59, Communication_6, game_4, viewmodel_provider_4;
    var UIMock;
    return {
        setters:[
            function (core_59_1) {
                core_59 = core_59_1;
            },
            function (Communication_6_1) {
                Communication_6 = Communication_6_1;
            },
            function (game_4_1) {
                game_4 = game_4_1;
            },
            function (viewmodel_provider_4_1) {
                viewmodel_provider_4 = viewmodel_provider_4_1;
            }],
        execute: function() {
            UIMock = (function () {
                function UIMock() {
                }
                UIMock = __decorate([
                    core_59.Component({
                        selector: 'mock',
                        styles: ["game {  position: absolute;  left: 0;  right: 0;  top: 0;  bottom: 0; }"],
                        template: '<game></game>',
                        directives: [game_4.UIGame],
                        providers: [
                            core_59.provide(viewmodel_provider_4.ViewModelProvider, { useClass: viewmodel_provider_4.MockViewModelProvider }),
                            core_59.provide(Communication_6.CommunicationClientProvider, { useClass: Communication_6.MockClientProvider }),
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], UIMock);
                return UIMock;
            }());
            exports_81("UIMock", UIMock);
        }
    }
});
System.register("Modules/JapJoker/Pages/route", ['angular2/core', 'angular2/router', "Modules/JapJoker/Pages/play", "Modules/JapJoker/Pages/mock"], function(exports_82, context_82) {
    "use strict";
    var __moduleName = context_82 && context_82.id;
    var core_60, router_12, play_2, mock_2;
    var Route;
    return {
        setters:[
            function (core_60_1) {
                core_60 = core_60_1;
            },
            function (router_12_1) {
                router_12 = router_12_1;
            },
            function (play_2_1) {
                play_2 = play_2_1;
            },
            function (mock_2_1) {
                mock_2 = mock_2_1;
            }],
        execute: function() {
            Route = (function () {
                function Route() {
                }
                Route = __decorate([
                    core_60.Component({
                        selector: 'jap-joker',
                        template: '<router-outlet></router-outlet>',
                        directives: [router_12.ROUTER_DIRECTIVES]
                    }),
                    router_12.RouteConfig([
                        { path: '/', name: 'Public', component: play_2.UIPlay, useAsDefault: true },
                        { path: '/mock', name: 'Mock', component: mock_2.UIMock },
                        { path: '/:channel', name: 'Private', component: play_2.UIPlay },
                    ]), 
                    __metadata('design:paramtypes', [])
                ], Route);
                return Route;
            }());
            exports_82("Route", Route);
        }
    }
});
System.register("Pages/Layouts/page", ['angular2/core', 'angular2/router', 'Jok/Platforms', "Common/Providers/ConfigProvider", "Common/Providers/CurrentUserProvider", "Common/Components/All"], function(exports_83, context_83) {
    "use strict";
    var __moduleName = context_83 && context_83.id;
    var core_61, router_13, Platforms_7, ConfigProvider_7, CurrentUserProvider_8, All_17;
    var UIPageLayout;
    return {
        setters:[
            function (core_61_1) {
                core_61 = core_61_1;
            },
            function (router_13_1) {
                router_13 = router_13_1;
            },
            function (Platforms_7_1) {
                Platforms_7 = Platforms_7_1;
            },
            function (ConfigProvider_7_1) {
                ConfigProvider_7 = ConfigProvider_7_1;
            },
            function (CurrentUserProvider_8_1) {
                CurrentUserProvider_8 = CurrentUserProvider_8_1;
            },
            function (All_17_1) {
                All_17 = All_17_1;
            }],
        execute: function() {
            UIPageLayout = (function () {
                function UIPageLayout(currentUser, config, platform) {
                    var _this = this;
                    this.currentUser = currentUser;
                    this.config = config;
                    this.platform = platform;
                    this.showLogin = true;
                    this.homeClick = new core_61.EventEmitter();
                    this.AccountCallbacks = {
                        onViewProfile: function () { return _this.platform.viewProfile(_this.currentUser.UserId); },
                        onExit: function () { return _this.currentUser.logout(); }
                    };
                }
                UIPageLayout.prototype.onHomeClick = function () {
                    this.homeClick.emit(null);
                };
                UIPageLayout.prototype.onLogin = function () {
                    this.platform.login();
                };
                __decorate([
                    core_61.Input(), 
                    __metadata('design:type', Boolean)
                ], UIPageLayout.prototype, "showLogin", void 0);
                __decorate([
                    core_61.Input(), 
                    __metadata('design:type', Boolean)
                ], UIPageLayout.prototype, "enableHomeButton", void 0);
                __decorate([
                    core_61.Output(), 
                    __metadata('design:type', Object)
                ], UIPageLayout.prototype, "homeClick", void 0);
                UIPageLayout = __decorate([
                    core_61.Component({
                        selector: 'page-layout',
                        styles: [".page-layout {  text-align: center;  margin-left: auto;  margin-right: auto;  max-width: 1000px; }  .page-layout languages {    position: fixed;    top: 10px;    right: 10px;    z-index: 100; }  .page-layout account {    position: fixed;    top: 10px;    left: 10px;    z-index: 120; }  .page-layout #SignIn {    position: fixed;    top: 10px;    left: 10px;    z-index: 120;    background: #34495E;    overflow: hidden;    cursor: pointer;    border-color: #34495E;    font-size: 13px;    text-align: center;    color: white;    height: 54px;    padding-top: 17px;    padding-left: 30px;    padding-right: 30px; }    .page-layout #SignIn span {      margin-left: -10px; }    .page-layout #SignIn i.fa {      opacity: .4;      margin-right: 5px; }  .page-layout nav {    margin-top: 20px; }    .page-layout nav img {      width: 80px; }    .page-layout nav a > img:hover {      -moz-transform: translateY(-2px);      -ms-transform: translateY(-2px);      -o-transform: translateY(-2px);      -webkit-transform: translateY(-2px);      transform: translateY(-2px); }  .page-layout footer {    position: fixed;    bottom: 10px;    left: 10px;    color: rgba(255, 255, 255, 0.6); }    .page-layout footer.bigger {      font-size: 35px;      bottom: 20px;      left: 30px; }    .page-layout footer span {      color: rgba(255, 255, 255, 0.2); }    .page-layout footer a {      color: rgba(255, 255, 255, 0.6); }      .page-layout footer a:hover {        color: rgba(255, 255, 255, 0.9);        text-decoration: none; }      .page-layout footer a:focus {        text-decoration: none; }  .page-layout /deep/ > section {    text-align: center;    margin-top: 30px;    position: relative;    width: 650px;    margin-left: auto;    margin-right: auto; }  .page-layout /deep/ h2, .page-layout /deep/ h4, .page-layout /deep/ h5 {    color: white;    text-shadow: 0 0 1px #484848; }  .page-layout /deep/ h4 {    opacity: .6; }  .page-layout /deep/ hr {    border-top-color: rgba(255, 255, 255, 0.1); }"],
                        template: '<div class="page-layout"><account *ngIf="currentUser.Data" [nick]="currentUser.Data.Nick" [info]="currentUser.getPlayerLevelName() | translate" [avatarUrl]="currentUser.Data.AvatarUrl" [isAudioEffectsEnabled]="config.isAudioEffectsEnabled" [isAdmin]="currentUser.isAdmin()" [mode]="1" [isMobile]="config.isMobile()" [callbacks]="AccountCallbacks"></account><a *ngIf="!currentUser.Data && showLogin" (click)="onLogin()" id="SignIn" class="btn btn-default"><span><i class="fa fa-sign-in" aria-hidden="true"></i> Login</span></a><languages></languages><nav><img *ngIf="!enableHomeButton" src="/images/joklogo.png" alt="jok"> <a *ngIf="enableHomeButton" (click)="onHomeClick()" href="javascript:void(0)"><img src="/images/joklogo.png" alt="jok"></a></nav><ng-content></ng-content><footer *ngIf="!config.isCompact && !config.isSocialPlatform()">Jok.GE <span>|</span> <a href="http://jok.io/games" target="_blank">{{\'home.MoreGames\' | translate}}</a></footer><footer *ngIf="config.isSocialPlatform()" class="bigger"><a href="https://jok.ge" target="_blank" class="coolfont">Jok.GE</a></footer></div>',
                        directives: [router_13.ROUTER_DIRECTIVES, All_17.UIAccount, All_17.UILanguages]
                    }), 
                    __metadata('design:paramtypes', [CurrentUserProvider_8.CurrentUserProvider, ConfigProvider_7.ConfigProvider, Platforms_7.PlatformProvider])
                ], UIPageLayout);
                return UIPageLayout;
            }());
            exports_83("UIPageLayout", UIPageLayout);
        }
    }
});
System.register("Pages/lobby", ['angular2/core', 'angular2/http', 'angular2/router', 'ng2-translate', 'Jok/Platforms', "Common/Components/All", "Common/Providers/ConfigProvider", "Common/Providers/CurrentUserProvider", "Common/Providers/PortalProvider", "Pages/Layouts/page"], function(exports_84, context_84) {
    "use strict";
    var __moduleName = context_84 && context_84.id;
    var core_62, http_8, router_14, ng2_translate_6, Platforms_8, All_18, ConfigProvider_8, CurrentUserProvider_9, PortalProvider_2, page_1;
    var UILobby, ServerGameModes, GameMode, DringOptions;
    return {
        setters:[
            function (core_62_1) {
                core_62 = core_62_1;
            },
            function (http_8_1) {
                http_8 = http_8_1;
            },
            function (router_14_1) {
                router_14 = router_14_1;
            },
            function (ng2_translate_6_1) {
                ng2_translate_6 = ng2_translate_6_1;
            },
            function (Platforms_8_1) {
                Platforms_8 = Platforms_8_1;
            },
            function (All_18_1) {
                All_18 = All_18_1;
            },
            function (ConfigProvider_8_1) {
                ConfigProvider_8 = ConfigProvider_8_1;
            },
            function (CurrentUserProvider_9_1) {
                CurrentUserProvider_9 = CurrentUserProvider_9_1;
            },
            function (PortalProvider_2_1) {
                PortalProvider_2 = PortalProvider_2_1;
            },
            function (page_1_1) {
                page_1 = page_1_1;
            }],
        execute: function() {
            UILobby = (function () {
                function UILobby(currentUser, portal, config, translate, http, router, routeParams, zone, platform) {
                    this.currentUser = currentUser;
                    this.portal = portal;
                    this.config = config;
                    this.translate = translate;
                    this.http = http;
                    this.router = router;
                    this.routeParams = routeParams;
                    this.zone = zone;
                    this.platform = platform;
                    this.JokerGameId = 1;
                    this.activeTab = 3;
                    this.newRoomLevel = 0;
                    this.newRoomGameMode = GameMode.Standard;
                    this.newRoomDring = DringOptions._200;
                    this.mode = GameMode.Standard;
                    this.dringOption = DringOptions._200;
                    this.joinChannel = '';
                    this.showDringSelection = true;
                }
                UILobby.prototype.ngOnInit = function () {
                    this.portal.on(PortalProvider_2.ClientCommands.RoomConfirmationFinish, this.onPortalRoomConfirmationFinish.bind(this));
                    this.portal.startReceivingRoomEvents(this.config.gameId);
                    this.portal.startReceivingRoomEvents(this.JokerGameId);
                };
                UILobby.prototype.ngOnDestroy = function () {
                    this.portal.off(PortalProvider_2.ClientCommands.RoomConfirmationFinish, this.onPortalRoomConfirmationFinish);
                    this.portal.stopReceivingRoomEvents(this.config.gameId);
                    this.portal.stopReceivingRoomEvents(this.JokerGameId);
                };
                UILobby.prototype.onPlay = function () {
                    this.platform.checkInternetConnection();
                    var returnUrl = location.protocol + '//' + location.host + '/' + this.router.generate(['/Play']).toRootUrl();
                    if (!this.currentUser.UserId) {
                        this.platform.login(returnUrl);
                        return;
                    }
                    this.router.navigate(['Play']);
                };
                UILobby.prototype.onPlay9 = function () {
                    this.platform.checkInternetConnection();
                    var returnUrl = location.protocol + '//' + location.host + '/' + this.router.generate(['/Play', 'PublicWithMode', { mode: 1 }]).toRootUrl();
                    if (!this.currentUser.UserId) {
                        this.platform.login(returnUrl);
                        return;
                    }
                    this.router.navigate(['/Play', 'PublicWithMode', { mode: 1 }]);
                };
                UILobby.prototype.onHomeClick = function () {
                    this.router.navigate(['Home']);
                };
                UILobby.prototype.onCreate = function () {
                    var type = parseInt(this.newRoomGameMode.toString());
                    var dring = parseInt(this.newRoomDring.toString());
                    var gameOption = this.getGameOption(type, dring);
                    this.portal.createRoom(this.newRoomLevel, gameOption, this.newRoomLevel == 0 ? this.config.gameId : this.JokerGameId);
                };
                UILobby.prototype.onJoin = function (room) {
                    this.portal.joinRoom(room.Id, room.GameId);
                };
                UILobby.prototype.onLeave = function (room) {
                    this.portal.leaveRoom(room.Id, room.GameId);
                };
                UILobby.prototype.onKick = function (room, player) {
                    if (this.currentUser.Data && this.currentUser.UserId == player.UserId) {
                        this.onLeave(room);
                        return;
                    }
                    this.portal.kickPlayer(room.Id, player.UserId, room.GameId);
                };
                UILobby.prototype.onViewProfile = function (player) {
                    if (!player || !player.UserId)
                        return;
                    this.platform.viewProfile(player.UserId);
                };
                UILobby.prototype.onConfirmationReady = function () {
                    var _this = this;
                    var currentRoom = this.portal.Rooms.filter(function (x) { return x.Players.some(function (p) { return p.UserId == _this.currentUser.UserId; }); })[0];
                    if (!currentRoom) {
                        this.onConfirmationHide();
                        return;
                    }
                    this.portal.confirmationAnswer(currentRoom.Id, true, currentRoom.GameId);
                };
                UILobby.prototype.onConfirmationNotReady = function () {
                    var _this = this;
                    var currentRoom = this.portal.Rooms.filter(function (x) { return x.Players.some(function (p) { return p.UserId == _this.currentUser.UserId; }); })[0];
                    if (!currentRoom) {
                        this.onConfirmationHide();
                        return;
                    }
                    this.portal.confirmationAnswer(currentRoom.Id, false, currentRoom.GameId);
                };
                UILobby.prototype.onConfirmationHide = function () {
                    this.portal.confirmationHide();
                };
                UILobby.prototype.onPortalRoomConfirmationFinish = function (data) {
                    var roomid = data.RoomID;
                    var gameOption = data.GameOption;
                    var isSuccess = data.IsGameStarting;
                    if (!isSuccess)
                        return;
                    var room = this.portal.Rooms.filter(function (x) { return x.Id == roomid; })[0];
                    if (!room)
                        return;
                    this.router.navigate(['Play', 'PrivateWithMode', { channel: roomid, mode: gameOption, stars: room.LevelControl }]);
                };
                UILobby.prototype.isJoinAllowed = function (room) {
                    if (!this.currentUser.Data)
                        return false;
                    if (room.GameId == this.JokerGameId) {
                        return (room.Players.length < 4) && !this.isRoomMember(room) && (this.currentUser.getPlayerLevel(room.LevelControl) <= this.currentUser.getPlayerLevel());
                    }
                    return (room.Players.length < 4) && !this.isHighLevel(room.LevelControl) && !this.isRoomMember(room);
                };
                UILobby.prototype.isLeaveAllowed = function (room) {
                    if (!this.isRoomMember(room))
                        return false;
                    return (room.Players.length < 4);
                };
                UILobby.prototype.isRoomMaster = function (room) {
                    return room && this.currentUser.Data && (room.Players[0].UserId == this.currentUser.UserId);
                };
                UILobby.prototype.isRoomMember = function (room, userId) {
                    var _this = this;
                    var inRoom = room && this.currentUser.Data && room.Players.filter(function (x) { return x.UserId == _this.currentUser.UserId; }).length;
                    if (!inRoom)
                        return false;
                    if (userId)
                        return (this.currentUser.UserId == userId);
                    return true;
                };
                UILobby.prototype.isKicked = function (room) {
                    var _this = this;
                    return room && this.currentUser.Data && room.KickedUsers.filter(function (x) { return x == _this.currentUser.UserId; }).length;
                };
                UILobby.prototype.isHighLevel = function (rating) {
                    if (!this.currentUser.Data)
                        return false;
                    if (!this.currentUser.Data.Game)
                        return false;
                    if (typeof this.currentUser.Data.Game.FromRating == 'undefined')
                        return false;
                    return this.currentUser.Data.Game.FromRating < rating;
                };
                UILobby.prototype.isConfirmationFinished = function () {
                    return this.portal.RoomConfirmations && this.portal.RoomConfirmations.every(function (x) { return x.Answer != PortalProvider_2.RoomConfirmationPlayerAnswer.Waiting; });
                };
                UILobby.prototype.isInAnyRoom = function () {
                    var _this = this;
                    return this.portal.Rooms.filter(function (x) { return x.Players.some(function (p) { return p.UserId == _this.currentUser.UserId; }); }).length;
                };
                UILobby.prototype.getRooms = function () {
                    var _this = this;
                    return this.portal.Rooms.filter(function (x) { return x.GameId == _this.JokerGameId || !_this.isHighLevel(x.LevelControl); });
                };
                UILobby.prototype.getRoomLevelsList = function () {
                    var _this = this;
                    return this.currentUser.AllLevels.filter(function (x) { return x.Stars > 0 && x.Stars <= _this.currentUser.RatingStars; });
                };
                UILobby.prototype.getLevel = function (rating) {
                    var levelInfo = this.currentUser.AllLevels.filter(function (x) { return x.Stars == rating; })[0];
                    if (!levelInfo)
                        return 'Unknown';
                    return levelInfo.Name;
                };
                UILobby.prototype.getModeInt = function (mode) {
                    switch (mode) {
                        case ServerGameModes.Normal_200:
                        case ServerGameModes.Normal_Spec:
                        case ServerGameModes.Normal_500:
                        case ServerGameModes.Normal_1000:
                            return GameMode.Standard;
                        case ServerGameModes.Only9_200:
                        case ServerGameModes.Only9_Spec:
                        case ServerGameModes.Only9_500:
                        case ServerGameModes.Only9_1000:
                            return GameMode.Only9;
                    }
                    return 0;
                };
                UILobby.prototype.getMode = function (mode) {
                    switch (mode) {
                        case ServerGameModes.Normal_200:
                        case ServerGameModes.Normal_Spec:
                        case ServerGameModes.Normal_500:
                        case ServerGameModes.Normal_1000:
                            return 'rooms.ModeStandard';
                        case ServerGameModes.Only9_200:
                        case ServerGameModes.Only9_Spec:
                        case ServerGameModes.Only9_500:
                        case ServerGameModes.Only9_1000:
                            return 'rooms.ModeOnly9';
                    }
                    return '';
                };
                UILobby.prototype.getDring = function (mode) {
                    switch (mode) {
                        case ServerGameModes.Normal_200:
                        case ServerGameModes.Only9_200:
                            return '-200';
                        case ServerGameModes.Normal_Spec:
                        case ServerGameModes.Only9_Spec:
                            return 'rooms.DringSpecial';
                        case ServerGameModes.Normal_500:
                        case ServerGameModes.Only9_500:
                            return '-500';
                        case ServerGameModes.Normal_1000:
                        case ServerGameModes.Only9_1000:
                            return '-1000';
                    }
                    return '';
                };
                UILobby.prototype.onCreateClick = function () {
                    if (this.mode == GameMode.Japanese) {
                        this.router.navigate(['PlayJap', 'Private', { channel: this.getNewChannel(true) }]);
                        return;
                    }
                    var serverMode = ServerGameModes.Normal_200;
                    var mode = parseInt(this.mode.toString());
                    switch (parseInt(this.dringOption.toString())) {
                        case DringOptions.Special:
                            serverMode = (mode == GameMode.Standard) ? ServerGameModes.Normal_Spec : ServerGameModes.Only9_Spec;
                            break;
                        case DringOptions._1000:
                            serverMode = (mode == GameMode.Standard) ? ServerGameModes.Normal_1000 : ServerGameModes.Only9_1000;
                            break;
                        case DringOptions._200:
                            serverMode = (mode == GameMode.Standard) ? ServerGameModes.Normal_200 : ServerGameModes.Only9_200;
                            break;
                        case DringOptions._500:
                            serverMode = (mode == GameMode.Standard) ? ServerGameModes.Normal_500 : ServerGameModes.Only9_500;
                            break;
                    }
                    this.router.navigate(['Play', 'PrivateWithMode', { channel: this.getNewChannel(false), mode: serverMode }]);
                };
                UILobby.prototype.onJoinClick = function () {
                    if (!this.isValid(this.joinChannel)) {
                        this.joinChannel = '';
                        return;
                    }
                    var isJap = parseInt(this.joinChannel[0]) % 2 == 1;
                    if (isJap) {
                        this.router.navigate(['PlayJap', 'Private', { channel: this.joinChannel }]);
                        return;
                    }
                    this.router.navigate(['Play', 'Private', { channel: this.joinChannel }]);
                };
                UILobby.prototype.joinKeyPress = function (e) {
                    if (e.keyCode == 13) {
                        this.onJoinClick();
                    }
                };
                UILobby.prototype.selectMode = function (mode) {
                    this.mode = mode;
                    this.showDringSelection = !!~[1, 2].indexOf(mode);
                };
                UILobby.prototype.isValid = function (channel) {
                    return !!parseInt(channel) && (channel.length >= 5);
                };
                UILobby.prototype.getNewChannel = function (isJap) {
                    var dateString = Date.now().toString();
                    var firstDigit = parseInt(dateString[dateString.length - 7]);
                    if ((isJap && firstDigit % 2 == 0) || (!isJap && firstDigit % 2 == 1))
                        firstDigit++;
                    firstDigit = firstDigit % 10;
                    var middleDigit = parseInt(dateString[dateString.length - 5]);
                    if (middleDigit == 6)
                        middleDigit++;
                    var userID = this.currentUser.Data ? this.currentUser.Data.UserID : 0;
                    var channel = firstDigit.toString() + dateString[dateString.length - 6] + middleDigit.toString() + dateString[dateString.length - 4];
                    channel += this.generateCheckDigit(channel + userID.toString()).toString();
                    return channel;
                };
                UILobby.prototype.generateCheckDigit = function (value) {
                    if (/[^0-9-\s]+/.test(value))
                        return 0;
                    var nCheck = 0, nDigit = 0, bEven = true;
                    value = value.replace(/\D/g, "");
                    for (var n = value.length - 1; n >= 0; n--) {
                        var cDigit = value.charAt(n), nDigit = parseInt(cDigit, 10);
                        if (bEven) {
                            if ((nDigit *= 2) > 9)
                                nDigit -= 9;
                        }
                        nCheck += nDigit;
                        bEven = !bEven;
                    }
                    return (1000 - nCheck) % 10;
                };
                UILobby.prototype.getGameOption = function (type, dring) {
                    switch (dring) {
                        case DringOptions.Special:
                            return (type == GameMode.Standard) ? ServerGameModes.Normal_Spec : ServerGameModes.Only9_Spec;
                        case DringOptions._1000:
                            return (type == GameMode.Standard) ? ServerGameModes.Normal_1000 : ServerGameModes.Only9_1000;
                        case DringOptions._200:
                            return (type == GameMode.Standard) ? ServerGameModes.Normal_200 : ServerGameModes.Only9_200;
                        case DringOptions._500:
                            return (type == GameMode.Standard) ? ServerGameModes.Normal_500 : ServerGameModes.Only9_500;
                    }
                };
                UILobby = __decorate([
                    core_62.Component({
                        selector: 'lobby',
                        styles: [".lobby section.nav {  width: auto; }  .lobby section.nav ul.nav {    text-align: center;    border-color: #67c68f; }    .lobby section.nav ul.nav li {      display: inline-block;      background: transparent;      min-width: 200px;      float: none; }      .lobby section.nav ul.nav li a {        background: #239d57;        border-color: #67c68f;        color: white;        text-shadow: 0 0 1px #484848;        cursor: pointer;        font-size: 16px; }        .lobby section.nav ul.nav li a span {          font-size: 14px;          opacity: .7; }      .lobby section.nav ul.nav li a:hover {        background: #27a35c; }    .lobby section.nav ul.nav li.active a {      border-color: #67c68f;      border-bottom: 1px solid #27AE60;      cursor: default;      background: transparent; }    .lobby section.nav ul.nav li.active a:hover {      background: transparent; }.lobby section.title {  min-height: 20px; }  .lobby section.title h4 {    float: left;    opacity: .9;    margin-left: -20px; }  .lobby section.title h5 {    float: right;    opacity: .7;    margin-right: -20px;    margin-top: 15px;    margin-bottom: 0; }.lobby section.quickmodes {  margin-top: 40px; }  .lobby section.quickmodes .standard,  .lobby section.quickmodes .only9 {    min-width: 300px;    font-size: 18px;    position: relative;    min-height: 81px;    padding-top: 14px; }    .lobby section.quickmodes .standard span.dring,    .lobby section.quickmodes .only9 span.dring {      opacity: .6;      font-size: 13px; }    .lobby section.quickmodes .standard .modename,    .lobby section.quickmodes .only9 .modename {      margin-top: 5px; }  .lobby section.quickmodes a.ranking_link {    font-size: 18px;    color: white;    opacity: 0.7; }    .lobby section.quickmodes a.ranking_link:hover {      opacity: 1; }.lobby section.rooms {  width: 690px; }  .lobby section.rooms.centerAlign {    text-align: center !important; }  .lobby section.rooms.leftAlign {    text-align: left !important; }  .lobby section.rooms room {    background: #34495E;    border-radius: 5px;    display: inline-block;    color: white;    padding: 10px;    vertical-align: top;    min-width: 160px;    margin-left: 11px;    margin-right: 0;    min-height: 195px;    margin-bottom: 20px;    position: relative;    text-align: left; }    .lobby section.rooms room.isPractice {      background: #1b7340;      border: 1px solid #186338; }    .lobby section.rooms room header {      border-bottom: 1px solid #91989F;      padding-bottom: 8px;      font-size: 13px;      padding-top: 2px;      color: lightcyan; }      .lobby section.rooms room header.highlevel {        color: lightpink; }    .lobby section.rooms room gameoptions {      padding: 3px 0;      border-bottom: 1px solid #91989F;      display: block;      font-size: 13px; }      .lobby section.rooms room gameoptions .mode.standard {        color: lightskyblue; }      .lobby section.rooms room gameoptions .mode.only9 {        color: lightgreen; }    .lobby section.rooms room players {      text-align: center; }      .lobby section.rooms room players item {        display: block;        position: relative; }        .lobby section.rooms room players item a {          cursor: pointer; }        .lobby section.rooms room players item a.info {          display: none;          color: rgba(255, 255, 255, 0.5);          margin-left: 5px;          position: absolute;          left: 1px;          top: 5px; }          .lobby section.rooms room players item a.info:hover {            color: rgba(255, 255, 255, 0.9); }        .lobby section.rooms room players item a.remove {          color: lightcoral;          margin-right: 1px; }          .lobby section.rooms room players item a.remove:hover {            color: #B36E75; }        .lobby section.rooms room players item:hover {          background: rgba(255, 255, 255, 0.1); }          .lobby section.rooms room players item:hover a.info {            display: block; }        .lobby section.rooms room players item > div {          padding: 5px 0; }    .lobby section.rooms room actions {      position: absolute;      left: 4px;      right: 4px;      bottom: 4px; }  .lobby section.rooms room.newroom header {    color: lightgoldenrodyellow; }  .lobby section.rooms room.newroom select {    background: transparent;    padding: 4px 8px;    border-radius: 4px;    width: 100%;    margin-top: 5px;    margin-bottom: 0;    font-size: 13px;    border: 1px solid rgba(145, 152, 159, 0.41); }    .lobby section.rooms room.newroom select.notselected {      color: silver; }    .lobby section.rooms room.newroom select option {      background: #5A7C9E;      color: lightgoldenrodyellow; }    .lobby section.rooms room.newroom select optgroup {      background: #34495E; }.lobby section.confirmations {  width: 200px;  text-align: left; }  .lobby section.confirmations .answer {    margin-top: -4px; }    .lobby section.confirmations .answer .item {      font-size: 20px;      display: inline-block;      vertical-align: middle; }      .lobby section.confirmations .answer .item span {        font-size: 12px; }      .lobby section.confirmations .answer .item.waiting {        color: silver; }      .lobby section.confirmations .answer .item.ready {        color: green; }      .lobby section.confirmations .answer .item.notready {        color: lightcoral; }      .lobby section.confirmations .answer .item.timeout {        color: dimgray; }  .lobby section.confirmations #HideConfirmation,  .lobby section.confirmations #ReadyButton {    position: absolute;    top: 60px;    left: 100%;    width: 140px;    margin-left: 20px; }  .lobby section.confirmations #NotReadyButton {    position: absolute;    top: 60px;    right: 100%;    width: 140px;    margin-right: 20px; }.lobby section.freinds section.search,.lobby section.freinds section.new {  padding-left: 20px;  padding-right: 20px;  width: 320px;  background: #1b7340;  border-radius: 5px;  padding-top: 15px;  padding-bottom: 20px;  display: inline-block;  vertical-align: top;  margin-left: 5px;  margin-right: 5px;  margin-bottom: 10px; }  .lobby section.freinds section.search i.fa,  .lobby section.freinds section.new i.fa {    margin-left: 4px;    margin-right: 6px;    margin-top: 1px; }  .lobby section.freinds section.search .btn-lg,  .lobby section.freinds section.new .btn-lg {    min-width: 130px; }.lobby section.freinds section.search > div {  max-width: 200px;  margin-left: auto;  margin-right: auto; }.lobby section.freinds section.search input {  padding: 22px 20px;  margin-top: 30px;  margin-bottom: 22px; }.lobby section.freinds section.search .btn-lg {  margin-bottom: 2px; }.lobby section.freinds section.new > div {  max-width: 400px;  margin-left: auto;  margin-right: auto; }.lobby section.freinds section.new button {  min-width: 120px; }.lobby section.freinds section.new .ratinginfo {  color: silver;  margin-top: 20px;  text-align: center;  border-top: 1px solid #368457;  padding: 5px;  font-size: 13px; }.lobby section.freinds section.new .btn-group a {  height: 60px; }  .lobby section.freinds section.new .btn-group a span {    opacity: .5;    font-size: 12px; }.lobby.compact section.rooms {  width: 530px; }"],
                        template: '<page-layout class="lobby" [enableHomeButton]="true" (homeClick)="onHomeClick()" [class.compact]="config.isCompact"><section><h2>{{\'lobby.MainTitle\' | translate}}</h2><h4 *ngIf="portal.RoomConfirmations">Game starts, when all players will be ready.</h4></section><section class="currentLevel" *ngIf="false && currentUser.UserId"><hr><levelprogress [stars]="currentUser.RatingStars"></levelprogress><hr></section><section *ngIf="portal.RoomConfirmations" class="confirmations"><ul class="list-group"><li *ngFor="#item of portal.RoomConfirmations" class="list-group-item"><div class="pull-right answer" [ngSwitch]="item.Answer"><template [ngSwitchWhen]="0"><span class="item waiting"><i class="fa fa-spinner fa-spin"></i></span></template><template [ngSwitchWhen]="1"><span class="item ready"><span>ready</span> <i class="fa fa-check-circle-o"></i></span></template><template [ngSwitchWhen]="2"><span class="item notready"><span>not ready</span> <i class="fa fa-times-circle-o"></i></span></template><template [ngSwitchWhen]="3"><span class="item timeout"><span>no answer</span> <i class="fa fa-clock-o"></i></span></template></div>{{item.Nick}}</li></ul><button id="ReadyButton" *ngIf="!isConfirmationFinished() && portal.IsConfirmationButtonsAllowed" (click)="onConfirmationReady()" class="btn btn-lg btn-primary"><i class="fa fa-check"></i> Ready</button> <button id="NotReadyButton" *ngIf="!isConfirmationFinished() && portal.IsConfirmationButtonsAllowed" (click)="onConfirmationNotReady()" class="btn btn-lg btn-danger"><i class="fa fa-times"></i> Not Ready</button> <button id="HideConfirmation" *ngIf="isConfirmationFinished()" (click)="onConfirmationHide()" class="btn btn-lg btn-primary">Hide</button></section><section class="nav" *ngIf="!portal.RoomConfirmations"><ul class="nav nav-tabs"><li role="presentation" [class.active]="activeTab == 1"><a (click)="activeTab = 1">{{\'lobby.PublicRooms\' | translate}}</a></li><li role="presentation" [class.active]="activeTab == 3"><a (click)="activeTab = 3">{{\'lobby.RankedModes\' | translate}}</a></li><li role="presentation" [class.active]="activeTab == 2"><a (click)="activeTab = 2">{{\'lobby.WithFriends\' | translate}}</a></li></ul></section><section class="quickmodes" *ngIf="!portal.RoomConfirmations && activeTab == 3"><a class="btn btn-primary btn-lg standard coolfont" (click)="onPlay()"><div class="modename">{{\'lobby.Standard\' | translate}}</div><span class="dring">{{\'lobby.Dring\' | translate}}: -200</span></a><br><br><a class="btn btn-primary btn-lg only9 coolfont" (click)="onPlay9()"><div class="modename">{{\'lobby.Only9\' | translate}}</div><span class="dring">{{\'lobby.Dring\' | translate}}: -200</span></a><div *ngIf="config.isSocialPlatform()"><br><br><hr><a class="coolfont btn btn-link ranking_link" [routerLink]="[\'/Ratings\']"><i class="fa fa-angle-right" aria-hidden="true"></i> {{\'lobby.HowRankingWork\' | translate}}</a></div></section><section *ngIf="!portal.RoomConfirmations && activeTab == 1" class="rooms" [class.centerAlign]="getRooms().length <= 3" [class.leftAlign]="getRooms().length > 3"><div *ngIf="!portal.Rooms.length && !currentUser.UserId" class="alert alert-warning">{{\'rooms.NoPublicRoomsInfo\' | translate}}</div><room *ngFor="#room of getRooms()" class="room" [class.isPractice]="room.GameId != JokerGameId"><header *ngIf="room.GameId != JokerGameId && !isHighLevel(room.LevelControl)" class="text-center" data-toggle="tooltip" data-placement="top" [title]="\'rooms.PracticeDescription\' | translate">{{\'rooms.Practice\' | translate}}</header><header *ngIf="room.GameId == JokerGameId" class="text-center" [class.highlevel]="currentUser.getPlayerLevel(room.LevelControl) > currentUser.getPlayerLevel()">{{getLevel(room.LevelControl) | translate}}</header><gameoptions><div class="pull-right">{{getDring(room.GameOption) | translate}}</div><div class="mode" [class.standard]="getModeInt(room.GameOption) == 1" [class.only9]="getModeInt(room.GameOption) == 2">{{getMode(room.GameOption) | translate}}</div></gameoptions><players><item *ngFor="#player of room.Players"><a class="info" (click)="onViewProfile(player)"><i class="fa fa-info-circle"></i></a><div class="player-actions pull-right"><a class="remove" (click)="onKick(room, player)" *ngIf="isRoomMaster(room) || isRoomMember(room, player.UserId)"><i class="fa fa-minus-circle" aria-hidden="true"></i></a></div><div>{{player.Nick}}</div></item></players><actions><button *ngIf="isJoinAllowed(room)" (click)="onJoin(room)" class="btn btn-block btn-primary" [class.disabled]="isKicked(room)">{{\'rooms.JoinButton\' | translate}}</button> <button *ngIf="isLeaveAllowed(room)" (click)="onLeave(room)" class="btn btn-block btn-danger">{{\'rooms.LeaveButton\' | translate}}</button></actions></room><room *ngIf="currentUser.UserId && !isInAnyRoom()" class="room newroom" [class.isPractice]="newRoomLevel == 0"><header class="text-center">{{\'rooms.NewRoom\' | translate}}</header><div class="text-center"><select [class.notselected]="newRoomLevel == 0" [(ngModel)]="newRoomLevel"><optgroup label="{{\'rooms.NotRankedMode\' | translate}}"><option value="0">{{\'rooms.Practice\' | translate}}</option></optgroup><optgroup label="{{\'rooms.RankedMode\' | translate}}" *ngIf="getRoomLevelsList().length"><option *ngFor="#level of getRoomLevelsList()" [value]="level.Stars">{{level.Name | translate}}</option></optgroup></select></div><div class="text-center"><select [(ngModel)]="newRoomGameMode"><option value="1">{{\'rooms.ModeStandard\' | translate}}</option><option value="2">{{\'rooms.ModeOnly9\' | translate}}</option></select></div><div class="text-center"><select [(ngModel)]="newRoomDring"><option value="2">{{\'rooms.DringSpecial\' | translate}}</option><option value="1">-200</option><option value="3">-500</option><option value="4">-1000</option></select></div><actions><button class="btn btn-block btn-primary" (click)="onCreate()">{{\'rooms.CreateButton\' | translate}}</button></actions></room></section><br><br><div *ngIf="activeTab == 2"><section class="freinds" *ngIf="!portal.RoomConfirmations"><section class="new"><h4><i class="fa fa-plus" aria-hidden="true"></i> {{\'rooms.FriendsNewRoomTitle\' | translate}}</h4><hr><div class="inputs"><div class="btn-group btn-group-justified" role="group"><a role="button" class="btn" [class.btn-default]="mode!=1" [class.btn-primary]="mode==1" (click)="selectMode(1)">{{\'rooms.FriendsModeStandard\' | translate}}<br><span>{{\'rooms.FriendsModeStandardDescription\' | translate}}</span></a> <a role="button" class="btn" [class.btn-default]="mode!=2" [class.btn-primary]="mode==2" (click)="selectMode(2)">{{\'rooms.FriendsModeOnly9\' | translate}}<br><span>{{\'rooms.FriendsModeOnly9Description\' | translate}}</span></a> <a role="button" class="btn" [class.btn-default]="mode!=3" [class.btn-primary]="mode==3" (click)="selectMode(3)">{{\'rooms.FriendsModeJapanese\' | translate}}<br><span>{{\'rooms.FriendsModeJapaneseDescription\' | translate}}</span></a></div><br><div *ngIf="showDringSelection"><select class="form-control" [(ngModel)]="dringOption"><option value="2">{{\'rooms.FriendsDringSpecial\' | translate}}</option><option value="1">-200</option><option value="3">-500</option><option value="4">-1000</option></select></div></div><br><div class="text-center"><button type="button" (click)="onCreateClick()" class="btn btn-lg btn-primary">{{\'rooms.FriendsCreateButton\' | translate}}</button></div><div class="ratinginfo">{{\'lobby.PlayWithFriendNote\' | translate}}</div></section><section class="search"><h4><i class="fa fa-search" aria-hidden="true"></i> {{\'rooms.FriendsSearchTitle\' | translate}}</h4><hr><div><input [(ngModel)]="joinChannel" (keypress)="joinKeyPress($event)" type="text" class="form-control" placeholder="{{\'rooms.FriendsRoomNumber\' | translate}}"></div><br><div class="text-center"><button type="button" (click)="onJoinClick()" [class.disabled]="!isValid(joinChannel)" class="btn btn-lg btn-primary">{{\'rooms.FriendsJoinButton\' | translate}}</button></div></section></section></div></page-layout>',
                        directives: [router_14.ROUTER_DIRECTIVES, page_1.UIPageLayout, All_18.UILevelProgress]
                    }), 
                    __metadata('design:paramtypes', [CurrentUserProvider_9.CurrentUserProvider, PortalProvider_2.PortalProvider, ConfigProvider_8.ConfigProvider, ng2_translate_6.TranslateService, http_8.Http, router_14.Router, router_14.RouteParams, core_62.NgZone, Platforms_8.PlatformProvider])
                ], UILobby);
                return UILobby;
            }());
            exports_84("UILobby", UILobby);
            (function (ServerGameModes) {
                ServerGameModes[ServerGameModes["Normal_200"] = 0] = "Normal_200";
                ServerGameModes[ServerGameModes["Only9_200"] = 1] = "Only9_200";
                ServerGameModes[ServerGameModes["Normal_Spec"] = 2] = "Normal_Spec";
                ServerGameModes[ServerGameModes["Only9_Spec"] = 3] = "Only9_Spec";
                ServerGameModes[ServerGameModes["Normal_500"] = 4] = "Normal_500";
                ServerGameModes[ServerGameModes["Only9_500"] = 5] = "Only9_500";
                ServerGameModes[ServerGameModes["Normal_1000"] = 6] = "Normal_1000";
                ServerGameModes[ServerGameModes["Only9_1000"] = 7] = "Only9_1000";
            })(ServerGameModes || (ServerGameModes = {}));
            (function (GameMode) {
                GameMode[GameMode["Standard"] = 1] = "Standard";
                GameMode[GameMode["Only9"] = 2] = "Only9";
                GameMode[GameMode["Japanese"] = 3] = "Japanese";
            })(GameMode || (GameMode = {}));
            (function (DringOptions) {
                DringOptions[DringOptions["Special"] = 2] = "Special";
                DringOptions[DringOptions["_200"] = 1] = "_200";
                DringOptions[DringOptions["_500"] = 3] = "_500";
                DringOptions[DringOptions["_1000"] = 4] = "_1000";
            })(DringOptions || (DringOptions = {}));
        }
    }
});
System.register("Pages/home", ['angular2/core', 'angular2/router', 'Jok/Cards', 'Jok/Platforms', "Common/Providers/ConfigProvider", "Common/Providers/CurrentUserProvider", "Common/Providers/PortalProvider", "Pages/Layouts/page"], function(exports_85, context_85) {
    "use strict";
    var __moduleName = context_85 && context_85.id;
    var core_63, router_15, Cards_7, Platforms_9, ConfigProvider_9, CurrentUserProvider_10, PortalProvider_3, page_2;
    var UIHome;
    return {
        setters:[
            function (core_63_1) {
                core_63 = core_63_1;
            },
            function (router_15_1) {
                router_15 = router_15_1;
            },
            function (Cards_7_1) {
                Cards_7 = Cards_7_1;
            },
            function (Platforms_9_1) {
                Platforms_9 = Platforms_9_1;
            },
            function (ConfigProvider_9_1) {
                ConfigProvider_9 = ConfigProvider_9_1;
            },
            function (CurrentUserProvider_10_1) {
                CurrentUserProvider_10 = CurrentUserProvider_10_1;
            },
            function (PortalProvider_3_1) {
                PortalProvider_3 = PortalProvider_3_1;
            },
            function (page_2_1) {
                page_2 = page_2_1;
            }],
        execute: function() {
            UIHome = (function () {
                function UIHome(currentUser, portal, config, router, zone, platform) {
                    var _this = this;
                    this.currentUser = currentUser;
                    this.portal = portal;
                    this.config = config;
                    this.router = router;
                    this.zone = zone;
                    this.platform = platform;
                    this.cards = [
                        Cards_7.CardType.Create(Cards_7.CardColor.Purple, Cards_7.CardLevel._6),
                        Cards_7.CardType.Create(Cards_7.CardColor.Purple, Cards_7.CardLevel._9),
                        Cards_7.CardType.Create(Cards_7.CardColor.Purple, Cards_7.CardLevel.King, true),
                        Cards_7.CardType.Create(Cards_7.CardColor.Blue, Cards_7.CardLevel._8, true),
                        Cards_7.CardType.Create(Cards_7.CardColor.Blue, Cards_7.CardLevel.Ace),
                        Cards_7.CardType.Create(Cards_7.CardColor.Orange, Cards_7.CardLevel._10),
                        Cards_7.CardType.Create(Cards_7.CardColor.Red, Cards_7.CardLevel.Queen),
                    ];
                    this.CardsCallbacks = {
                        onClick: function (card) { return _this.router.navigate(['Lobby']); }
                    };
                }
                UIHome.prototype.ngOnInit = function () {
                };
                UIHome = __decorate([
                    core_63.Component({
                        selector: 'home',
                        styles: [".home {  /*#HQ {\n        position: absolute;\n        left: 0px;\n        bottom: 40px;\n        height: 400px;\n        width: 292px;\n        background: url('/images/quinn/8.png') no-repeat;\n        background-size: contain;\n\n        &:hover {\n            background: url('/images/quinn/8.png') no-repeat;\n            background-size: contain;\n        }\n    }*/  /*.news_container{\n        position: relative;\n        height: 300px;\n        overflow: hidden;\n    }\n    #HQ {\n        position: absolute;\n        height: 400px;\n        width: 292px;\n        background: url(\"/images/quinn/s6.png\") no-repeat;\n        background-size: contain;\n        transition: all linear 0.2s;\n\n        &:hover {\n            background: url('/images/quinn/s7.png') no-repeat;\n            background-size: contain;\n        }\n    }*/ }  .home section.cards {    margin-top: 40px;    margin-bottom: 40px; }    .home section.cards > div {      min-height: 230px;      position: relative;      margin-top: 40px;      margin-bottom: 40px; }    .home section.cards cards {      left: 50%;      position: absolute;      bottom: 20px;      margin-left: -70px; }  .home section.quinn img {    height: 400px;    opacity: .4; }  .home section.buttons a {    min-width: 180px;    font-size: 15px;    padding-top: 15px;    padding-bottom: 12px;    position: relative; }    .home section.buttons a span {      font-size: 13px;      opacity: .6; }    .home section.buttons a i.fa {      position: absolute;      left: 7px;      top: 7px;      opacity: .5;      color: #34495E;      display: none; }  .home section.buttons a.play {    min-width: 200px;    min-height: 81px;    padding-top: 18px;    font-size: 18px; }    .home section.buttons a.play i.fa {      display: none; }  .home section.buttons a.mobile {    min-width: 190px; }  .home section.buttons .first_layer {    margin-top: 40px;    margin-bottom: 20px; }  .home section.buttons .second_layer a {    font-size: 14px;    min-width: 200px;    padding-top: 10px;    padding-bottom: 10px; }  .home section.buttons .second_layer .mobile_logo {    height: 30px;    -moz-transform: rotate(-20deg);    -ms-transform: rotate(-20deg);    -o-transform: rotate(-20deg);    -webkit-transform: rotate(-20deg);    transform: rotate(-20deg);    float: left;    margin-top: -5px;    margin-left: -14px;    margin-bottom: -10px; }  .home section.stores {    max-width: 600px;    margin-left: auto;    margin-right: auto; }    .home section.stores a {      min-width: 180px;      background: rgba(0, 0, 0, 0.23);      border-width: 0;      color: white;      font-size: 16px;      padding: 8px 22px;      -moz-transition: all linear 50ms;      -o-transition: all linear 50ms;      -webkit-transition: all linear 50ms;      transition: all linear 50ms;      margin-left: 2px;      margin-right: 2px;      font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Segoe UI Light','Helvetica Neue','Arial','Helvetica'; }      .home section.stores a .fa {        margin-right: 5px; }      .home section.stores a:hover {        -moz-transform: translateY(-2px);        -ms-transform: translateY(-2px);        -o-transform: translateY(-2px);        -webkit-transform: translateY(-2px);        transform: translateY(-2px); }  .home #CompactCards {    position: absolute;    bottom: -70px;    left: 20px;    -moz-transform: rotate(10deg);    -ms-transform: rotate(10deg);    -o-transform: rotate(10deg);    -webkit-transform: rotate(10deg);    transform: rotate(10deg);    z-index: 100; }  .home #HQ {    display: none;    width: 270px;    height: 400px;    position: absolute;    bottom: 30px;    left: 30px;    background: url(\"/images/quinn/Harley.svg\");    background-size: 610px;    background-position: -520px -330px;    background-repeat: no-repeat; }    .home #HQ:hover {      background: url(\"/images/quinn/Harley.svg\");      background-size: 610px;      background-position: 0 -332px;      background-repeat: no-repeat; }.home.compact {  position: absolute;  left: 0;  right: 0;  top: 0;  bottom: 0;  max-width: none;  overflow: hidden; }"],
                        template: '<page-layout class="home" [showLogin]="false" [enableHomeButton]="false" [class.compact]="config.isCompact"><cards *ngIf="config.isCompact" id="CompactCards" [source]="cards" [isSelectionAllowed]="true" [isVisible]="true" [callbacks]="CardsCallbacks" [isCompact]="config.isCompact"></cards><section class="title"><h2>{{ \'home.MainTitle\' | translate }}</h2><h4 *ngIf="!portal.OnlineUsersCount">{{ \'home.MainSubTitle\' | translate }}</h4><h4 *ngIf="portal.OnlineUsersCount">{{ \'home.MainSubTitle2\' | translate: {count: portal.OnlineUsersCount} }}</h4></section><section *ngIf="!config.isCompact" class="cards"><hr><div class="news_container"><cards [source]="cards" [isSelectionAllowed]="true" [isVisible]="true" [callbacks]="CardsCallbacks"></cards></div></section><section class="buttons"><hr><div class="first_layer"><a class="btn btn-primary btn-lg" [routerLink]="[\'Ratings\']"><i class="fa fa-lock" aria-hidden="true"></i> {{ \'home.PlayWithFriends\' | translate }}<br><span class="coolfont">{{ \'home.PlayWithFriendsDescription\' | translate }}</span></a> <a class="btn btn-primary btn-lg play" [routerLink]="[\'Lobby\']"><i class="fa fa-globe" aria-hidden="true"></i> {{ \'home.Play\' | translate }}<br><span class="coolfont">{{ \'home.PlayDescription\' | translate }}</span></a> <a class="btn btn-primary btn-lg" [routerLink]="[\'TopPlayers\']"><i class="fa fa-users" aria-hidden="true"></i> {{ \'home.TopPlayers\' | translate }}<br><span class="coolfont">{{ \'home.TopPlayersDescription\' | translate }}</span></a></div><br><div class="second_layer"><a *ngIf="!config.isMobile()" class="btn btn-primary mobile" [routerLink]="[\'Mobile\']">{{ \'home.MobileApp\' | translate }}<br></a></div></section><div id="HQ"></div></page-layout>',
                        directives: [router_15.ROUTER_DIRECTIVES, Cards_7.UICards, page_2.UIPageLayout]
                    }), 
                    __metadata('design:paramtypes', [CurrentUserProvider_10.CurrentUserProvider, PortalProvider_3.PortalProvider, ConfigProvider_9.ConfigProvider, router_15.Router, core_63.NgZone, Platforms_9.PlatformProvider])
                ], UIHome);
                return UIHome;
            }());
            exports_85("UIHome", UIHome);
        }
    }
});
System.register("Pages/login", ['angular2/core', 'angular2/router', 'angular2/http', 'Jok/Platforms', "Common/Providers/CurrentUserProvider", "Common/Providers/ConfigProvider", "Pages/Layouts/page"], function(exports_86, context_86) {
    "use strict";
    var __moduleName = context_86 && context_86.id;
    var core_64, router_16, http_9, Platforms_10, CurrentUserProvider_11, ConfigProvider_10, page_3;
    var UILogin;
    return {
        setters:[
            function (core_64_1) {
                core_64 = core_64_1;
            },
            function (router_16_1) {
                router_16 = router_16_1;
            },
            function (http_9_1) {
                http_9 = http_9_1;
            },
            function (Platforms_10_1) {
                Platforms_10 = Platforms_10_1;
            },
            function (CurrentUserProvider_11_1) {
                CurrentUserProvider_11 = CurrentUserProvider_11_1;
            },
            function (ConfigProvider_10_1) {
                ConfigProvider_10 = ConfigProvider_10_1;
            },
            function (page_3_1) {
                page_3 = page_3_1;
            }],
        execute: function() {
            UILogin = (function () {
                function UILogin(currentUser, http, router, routeParams, platform, config) {
                    this.currentUser = currentUser;
                    this.http = http;
                    this.router = router;
                    this.routeParams = routeParams;
                    this.platform = platform;
                    this.config = config;
                    this.isSubmitting = false;
                    this.isSubmitEnabled = false;
                }
                UILogin.prototype.ngOnInit = function () {
                    var _this = this;
                    this.platform.on('DeviceRegistrationResult', function (a, b) { return _this.loginDeviceCallback(a, b); });
                };
                UILogin.prototype.ngOnDestroy = function () {
                    this.platform.removeAllListeners('DeviceRegistrationResult');
                };
                UILogin.prototype.onHomeClick = function () {
                    if (!this.hideMenu) {
                        this.router.navigate(['Home']);
                    }
                    else {
                        this.hideMenu = this.showJokAccount = this.showSocial = false;
                    }
                };
                UILogin.prototype.checkSubmitEnabled = function (username, password) {
                    this.isSubmitEnabled = username && password;
                };
                UILogin.prototype.showDeviceRegistration = function () {
                    return this.config.isMobile() && (this.config.platform != Platforms_10.Platforms.WindowsPhone);
                };
                UILogin.prototype.loginCredentials = function (username, password) {
                    var _this = this;
                    if (!username || !password)
                        return;
                    this.isSubmitting = true;
                    this.errorMessage = null;
                    var params = '?Username=' + username + '&Password=' + password + '&ReturnUrl=';
                    this.http.get('https://jok.io/portal/UserLogin' + params).subscribe(function (res) {
                        try {
                            var json = res.json();
                            if (!json || !json.IsSuccess || !json.Sid) {
                                _this.errorMessage = 'login.InvalidCredentials';
                                return;
                            }
                            _this.success(json.Sid);
                        }
                        catch (err) {
                            _this.errorMessage = err;
                        }
                    }, function (err) { return _this.errorMessage = err; }, function () { return _this.isSubmitting = false; });
                };
                UILogin.prototype.loginSocial = function (urlPart) {
                    var url = 'https://jok.io' + urlPart + '?returnUrl=' + this.getReturnUrl();
                    location.assign(url);
                };
                UILogin.prototype.loginDevice = function () {
                    this.platform.deviceRegistration();
                };
                UILogin.prototype.loginDeviceCallback = function (isSuccess, sid) {
                    if (!isSuccess) {
                        alert("Mobile login failed, please check your internet connection & try again later");
                        return;
                    }
                    this.success(sid);
                };
                UILogin.prototype.success = function (sid) {
                    var _this = this;
                    sid && this.currentUser.refreshUserData(sid, function() {
                        
                    var returnUrl = _this.getReturnUrl();
                    if (returnUrl)
                        location.assign(returnUrl);
                    _this.router.navigate(['/Lobby']);
                    
                    });
                };
                UILogin.prototype.getReturnUrl = function (skipHome) {
                    if (skipHome === void 0) { skipHome = false; }
                    if (skipHome)
                        return this.routeParams.get('returnUrl');
                    return this.routeParams.get('returnUrl') || location.protocol + '//' + location.host + '/' + this.router.generate(['/Lobby']).toRootUrl();
                };
                UILogin = __decorate([
                    core_64.Component({
                        selector: 'lobby',
                        styles: [".login section .main {  height: 30px;  float: left;  margin: -30px;  margin-top: -3px;  margin-left: 0;  font-size: 30px; }  .login section .main.v2 {    font-size: 22px;    margin-top: 3px;    margin-left: -2px; }.login section.login > div {  margin-top: 10px;  margin-bottom: 20px;  margin-left: auto;  margin-right: auto;  width: 300px;  position: relative; }  .login section.login > div .error-message {    position: absolute;    left: 100%;    top: 29px;    margin-left: 10px;    min-width: 210px;    max-width: 300px;    max-height: 400px; }.login section ul {  list-style-type: none;  padding-left: 0;  margin-left: -35px; }  .login section ul li {    margin-left: 0; }    .login section ul li i {      font-size: 20px;      color: rgba(255, 255, 255, 0.7);      margin-right: 10px; }    .login section ul li a {      color: white;      min-width: 200px;      display: inline-block;      padding: 10px;      text-align: center;      font-size: 14px;      background: rgba(0, 0, 0, 0.32);      border-radius: 5px;      margin-bottom: 10px;      cursor: pointer; }    .login section ul li a:hover {      text-decoration: none;      background: rgba(0, 0, 0, 0.22); }.login .combined a {  width: 220px;  min-height: 150px;  text-align: center;  overflow: hidden;  padding-top: 40px; }  .login .combined a i.fa {    font-size: 40px;    margin-bottom: 30px; }  .login .combined a span {    margin-top: 15px;    margin-bottom: 20px;    opacity: .6;    font-size: 14px; }.login .combined a:nth-child(3) {  min-height: 180px;  padding-top: 50px; }  .login .combined a:nth-child(3) i.fa {    margin-bottom: 40px; }"],
                        template: '<page-layout class="login" [enableHomeButton]="true" [showLogin]="false" (homeClick)="onHomeClick()"><section><h2>{{\'login.MainTitle\' | translate}}</h2><h4>{{ \'login.MainSubTitle\' | translate }}</h4></section><div *ngIf="config.isMobile() && !hideMenu" class="combined"><hr><a *ngIf="showDeviceRegistration()" class="btn btn-primary btn-lg" (click)="loginDevice()"><i class="fa fa-mobile" aria-hidden="true"></i><br>{{\'login.DeviceRegistration\' | translate}}<br><span>{{\'login.DeviceRegistrationDescriptionMini\' | translate}}</span></a> <a class="btn btn-primary btn-lg" (click)="hideMenu = showJokAccount = 1"><i class="fa fa-user" aria-hidden="true"></i><br>{{\'login.JokAccount\' | translate}}<br><span>{{\'login.JokAccountNoteMini\' | translate}}</span></a> <a class="btn btn-primary btn-lg" (click)="hideMenu = showSocial = 1"><i class="fa fa-share-alt-square" aria-hidden="true"></i><br>{{\'login.SocialNetworks\' | translate}}<br><span>{{\'login.SocialNetworksNoteMini\' | translate}}</span></a></div><section class="login" *ngIf="!config.isMobile() || showJokAccount"><hr><div><h4>{{\'login.JokAccount\' | translate}}</h4><form method="post" (submit)="loginCredentials(username.value, password.value)"><div class="form-group"><input #username (keyup)="checkSubmitEnabled(username.value, password.value)" class="form-control input-large" placeholder="{{\'login.UsernamePlaceholder\' | translate}}" type="text"></div><div class="form-group"><input #password (keyup)="checkSubmitEnabled(username.value, password.value)" class="form-control input-large" placeholder="{{\'login.PasswordPlaceholder\' | translate}}" type="password"></div><button type="submit" [class.disabled]="!isSubmitEnabled || isSubmitting" class="btn btn-primary pull-right">{{\'login.Login\' | translate}}</button><br><br></form><div *ngIf="errorMessage" class="alert alert-danger error-message">{{errorMessage | translate}}<br><br><div><a href="http://jok.io/portal/PasswordRecovery" target="_blank">Reset Password</a></div></div></div></section><section class="social" *ngIf="!config.isMobile() || showSocial"><hr><h4>{{\'login.SocialNetworks\' | translate}}</h4><ul class="social_connect"><li><i class="fa fa-facebook-official"></i> <a (click)="loginSocial(\'/portal/joinus/facebook\')">Facebook</a></li><li><i class="fa fa-twitter-square"></i> <a (click)="loginSocial(\'/portal/joinus/twitter\')">Twitter</a></li><li><i class="fa fa-odnoklassniki-square"></i> <a (click)="loginSocial(\'/portal/joinus/odnoklasniki\')">Однокласники</a></li><li><i class="fa fa-vk"></i> <a (click)="loginSocial(\'/portal/joinus/vkontaqte\')">Вконтакте</a></li><li><i class="fa fa-google-plus-square"></i> <a (click)="loginSocial(\'/portal/joinus/google\')">Google Plus</a></li></ul><h5>{{\'login.SocialNetworksNote\' | translate}}</h5></section></page-layout>',
                        directives: [router_16.ROUTER_DIRECTIVES, page_3.UIPageLayout]
                    }), 
                    __metadata('design:paramtypes', [CurrentUserProvider_11.CurrentUserProvider, http_9.Http, router_16.Router, router_16.RouteParams, Platforms_10.PlatformProvider, ConfigProvider_10.ConfigProvider])
                ], UILogin);
                return UILogin;
            }());
            exports_86("UILogin", UILogin);
        }
    }
});
System.register("Pages/mobile", ['angular2/core', 'angular2/router', "Common/Providers/ConfigProvider", "Pages/Layouts/page"], function(exports_87, context_87) {
    "use strict";
    var __moduleName = context_87 && context_87.id;
    var core_65, router_17, ConfigProvider_11, page_4;
    var UIMobile;
    return {
        setters:[
            function (core_65_1) {
                core_65 = core_65_1;
            },
            function (router_17_1) {
                router_17 = router_17_1;
            },
            function (ConfigProvider_11_1) {
                ConfigProvider_11 = ConfigProvider_11_1;
            },
            function (page_4_1) {
                page_4 = page_4_1;
            }],
        execute: function() {
            UIMobile = (function () {
                function UIMobile(router, config) {
                    this.router = router;
                    this.config = config;
                    this.screen = Date.now() % 4 + 1;
                }
                UIMobile.prototype.onHomeClick = function () {
                    this.router.navigate(['Home']);
                };
                UIMobile = __decorate([
                    core_65.Component({
                        selector: 'mobile',
                        styles: [".mobile section.screenshot .carousel {  min-height: 380px; }  .mobile section.screenshot .carousel .item {    text-align: center; }  .mobile section.screenshot .carousel ol.carousel-indicators li {    margin-left: 5px;    margin-right: 5px;    width: 8px;    height: 8px;    border-color: #99D6B2; }  .mobile section.screenshot .carousel ol.carousel-indicators li.active {    background: #99D6B2;    width: 10px;    height: 10px; }.mobile section.screenshot img {  width: 500px;  margin-top: 30px;  margin-bottom: 30px;  margin-left: auto;  margin-right: auto; }.mobile section.buttons {  margin-top: 0; }  .mobile section.buttons a {    min-width: 200px;    font-size: 16px; }    .mobile section.buttons a span {      font-size: 13px;      opacity: .6; }"],
                        template: '<page-layout class="mobile" [showLogin]="false" [enableHomeButton]="true" (homeClick)="onHomeClick()" [class.compact]="config.isCompact"><section class="title"><h2>{{\'mobile.MainTitle\' | translate}}</h2><h4>{{\'mobile.MainSubTitle\' | translate}}</h4></section><section class="screenshot"><div id="carousel-example-generic" class="carousel slide" data-ride="carousel"><ol class="carousel-indicators"><li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li><li data-target="#carousel-example-generic" data-slide-to="1"></li><li data-target="#carousel-example-generic" data-slide-to="2"></li><li data-target="#carousel-example-generic" data-slide-to="3"></li></ol><div class="carousel-inner" role="listbox"><div class="item active"><img class="ipod" src="/images/mobile_screenshot1.png" alt="mobile screenshot"><div class="carousel-caption"></div></div><div class="item"><img class="wp" src="/images/mobile_screenshot2.png" alt="mobile screenshot"><div class="carousel-caption"></div></div><div class="item"><img class="android" src="/images/mobile_screenshot3.png" alt="mobile screenshot"><div class="carousel-caption"></div></div><div class="item"><img class="android" src="/images/mobile_screenshot4.png" alt="mobile screenshot"><div class="carousel-caption"></div></div></div></div></section><section class="buttons"><h4>{{\'mobile.ChoosePlatform\' | translate}}</h4><br><a class="btn btn-primary btn-lg coolfont" href="https://itunes.apple.com/us/app/online-joker/id1109734625" target="_blank"><i _ngcontent-bpf-4 aria-hidden="true" class="fa fa-apple"></i> App Store</a> <a class="btn btn-primary btn-lg coolfont" href="https://play.google.com/store/apps/details?id=io.jok.matrix" target="_blank"><i _ngcontent-bpf-4 aria-hidden="true" class="fa fa-android"></i> Play Store</a> <a class="btn btn-primary btn-lg coolfont" href="https://www.microsoft.com/store/apps/9nblggh4vdtf" target="_blank"><i _ngcontent-bpf-4 aria-hidden="true" class="fa fa-windows"></i> Windows Phone</a></section></page-layout>',
                        directives: [page_4.UIPageLayout]
                    }), 
                    __metadata('design:paramtypes', [router_17.Router, ConfigProvider_11.ConfigProvider])
                ], UIMobile);
                return UIMobile;
            }());
            exports_87("UIMobile", UIMobile);
        }
    }
});
System.register("Pages/ratings", ['angular2/core', 'angular2/router', "Common/Components/All", "Common/Providers/CurrentUserProvider", "Common/Providers/ConfigProvider", "Common/Pipes/PastDatePipe", "Pages/Layouts/page"], function(exports_88, context_88) {
    "use strict";
    var __moduleName = context_88 && context_88.id;
    var core_66, router_18, All_19, CurrentUserProvider_12, ConfigProvider_12, PastDatePipe_2, page_5;
    var UIRatings;
    return {
        setters:[
            function (core_66_1) {
                core_66 = core_66_1;
            },
            function (router_18_1) {
                router_18 = router_18_1;
            },
            function (All_19_1) {
                All_19 = All_19_1;
            },
            function (CurrentUserProvider_12_1) {
                CurrentUserProvider_12 = CurrentUserProvider_12_1;
            },
            function (ConfigProvider_12_1) {
                ConfigProvider_12 = ConfigProvider_12_1;
            },
            function (PastDatePipe_2_1) {
                PastDatePipe_2 = PastDatePipe_2_1;
            },
            function (page_5_1) {
                page_5 = page_5_1;
            }],
        execute: function() {
            UIRatings = (function () {
                function UIRatings(router, config, currentUser) {
                    this.router = router;
                    this.config = config;
                    this.currentUser = currentUser;
                    this.activeTab = 1;
                    this.histroryItemsBatchCount = 20;
                    this.refreshGameHistory();
                    if (currentUser.RatingStars > 0)
                        this.activeTab = 3;
                }
                UIRatings.prototype.onHomeClick = function () {
                    this.router.navigate(['Home']);
                };
                UIRatings.prototype.getLevelActiveStatus = function (level) {
                    if (!this.currentUser.RatingStars)
                        return false;
                    return (this.currentUser.getPlayerLevel() >= level);
                };
                UIRatings.prototype.getLevelProgressPercentage = function () {
                    if (!this.currentUser.RatingStars)
                        return 0;
                    var levelsCount = 6;
                    var maxLimit = 4 * (levelsCount - 1);
                    var result = Math.floor((100 * this.currentUser.RatingStars) / maxLimit);
                    return result > 100 ? 100 : result;
                };
                UIRatings.prototype.getPeriodCount = function (dateString) {
                    return PastDatePipe_2.PastDatePipe.GetPeriodCount(dateString).Count;
                };
                UIRatings.prototype.getGameHistoryItems = function () {
                    return this.currentUser.GamesHistory;
                };
                UIRatings.prototype.isGameHistoryFullyLoaded = function () {
                    return (this.currentUser.GamesHistoryLastGetItemsCount < this.histroryItemsBatchCount) || !this.currentUser.GamesHistoryLastGetItemsCount;
                };
                UIRatings.prototype.refreshGameHistory = function () {
                    this.currentUser.refreshGamesHistory(0, this.histroryItemsBatchCount);
                };
                UIRatings.prototype.viewMoreGameHistory = function () {
                    this.currentUser.refreshGamesHistory(this.currentUser.GamesHistory.length, this.histroryItemsBatchCount);
                };
                UIRatings = __decorate([
                    core_66.Component({
                        selector: 'ratings',
                        styles: [".ratings {  color: white; }  .ratings section.nav {    width: auto;    margin-left: 35px;    margin-right: 35px; }    .ratings section.nav ul.nav {      text-align: center;      border-color: #67c68f; }      .ratings section.nav ul.nav li {        display: inline-block;        background: transparent;        min-width: 200px;        float: none; }        .ratings section.nav ul.nav li a {          background: #239d57;          border-color: #67c68f;          color: white;          text-shadow: 0 0 1px #484848;          cursor: pointer;          font-size: 16px; }          .ratings section.nav ul.nav li a span {            font-size: 14px;            opacity: .7; }        .ratings section.nav ul.nav li a:hover {          background: #27a35c; }      .ratings section.nav ul.nav li.active a {        border-color: #67c68f;        border-bottom: 1px solid #27AE60;        cursor: default;        background: transparent; }      .ratings section.nav ul.nav li.active a:hover {        background: transparent; }  .ratings section.achievements {    width: 560px; }    .ratings section.achievements achievement {      display: inline-block;      margin-left: 20px;      margin-right: 20px;      margin-bottom: 40px; }    .ratings section.achievements ul {      text-align: justify; }      .ratings section.achievements ul li {        margin-bottom: 30px; }  .ratings section.currentLevel {    width: 560px;    font-size: 20px;    text-shadow: 0 0 1px black; }    .ratings section.currentLevel hr {      margin-top: 30px;      margin-bottom: 26px; }    .ratings section.currentLevel span {      margin-right: 10px; }    .ratings section.currentLevel i.fa {      color: #F4CB37;      margin-left: 3px;      margin-right: 3px; }  .ratings section.levelup {    width: 560px;    margin-top: 40px;    font-size: 20px;    text-shadow: 0 0 1px black; }    .ratings section.levelup hr {      margin-bottom: 26px; }    .ratings section.levelup i.fa {      color: #F4CB37; }  .ratings section.levels {    position: relative;    margin-top: 40px;    width: auto;    margin-left: 55px;    margin-right: 55px;    padding-bottom: 15px; }    .ratings section.levels hr.currentProgress {      position: absolute;      top: -20px;      border-top-color: rgba(52, 73, 94, 0.84);      left: 0;      box-shadow: 0 0 10px white; }    .ratings section.levels .level-title {      position: absolute;      top: 0;      width: 100px;      height: 10px;      margin-left: -50px;      margin-top: 8px;      color: white;      text-shadow: 0 0 1px black;      opacity: 0.8; }      .ratings section.levels .level-title::before {        position: absolute;        left: 50%;        background-color: rgba(255, 255, 255, 0.43);        width: 5px;        height: 5px;        border-radius: 100%;        top: -10px;        content: ' '; }      .ratings section.levels .level-title.active::before {        background-color: rgba(52, 73, 94, 0.84);        box-shadow: 0 0 15px white; }      .ratings section.levels .level-title.level1 {        left: 0; }      .ratings section.levels .level-title.level2 {        left: 20%; }      .ratings section.levels .level-title.level3 {        left: 40%; }      .ratings section.levels .level-title.level4 {        left: 60%; }      .ratings section.levels .level-title.level5 {        left: 80%; }      .ratings section.levels .level-title.level6 {        left: 100%; }      .ratings section.levels .level-title.active {        color: white;        opacity: 1; }  .ratings section.gamehistory {    text-align: left;    font-size: 14px; }    .ratings section.gamehistory .stars {      min-width: 70px;      margin-right: 20px;      display: inline-block;      text-align: center; }    .ratings section.gamehistory .date {      float: right;      opacity: 0.5; }    .ratings section.gamehistory .level {      opacity: .7; }    .ratings section.gamehistory levelprogress {      display: inline-block; }    .ratings section.gamehistory .list-group-item {      background: rgba(52, 73, 94, 0.84);      border: 0; }    .ratings section.gamehistory .premias {      margin-left: 20px;      color: #7ab9c3; }  .ratings .progress-step-5 {    width: 5%; }  .ratings .progress-step-10 {    width: 10%; }  .ratings .progress-step-15 {    width: 15%; }  .ratings .progress-step-20 {    width: 20%; }  .ratings .progress-step-25 {    width: 25%; }  .ratings .progress-step-30 {    width: 30%; }  .ratings .progress-step-35 {    width: 35%; }  .ratings .progress-step-40 {    width: 40%; }  .ratings .progress-step-45 {    width: 45%; }  .ratings .progress-step-50 {    width: 50%; }  .ratings .progress-step-55 {    width: 55%; }  .ratings .progress-step-60 {    width: 60%; }  .ratings .progress-step-65 {    width: 65%; }  .ratings .progress-step-70 {    width: 70%; }  .ratings .progress-step-75 {    width: 75%; }  .ratings .progress-step-80 {    width: 80%; }  .ratings .progress-step-85 {    width: 85%; }  .ratings .progress-step-90 {    width: 90%; }  .ratings .progress-step-95 {    width: 95%; }  .ratings .progress-step-100 {    width: 100%; }"],
                        template: '<page-layout class="ratings" [enableHomeButton]="true" (homeClick)="onHomeClick()" [class.compact]="config.isCompact"><section class="title"><h2>{{\'ratings.MainTitle\' | translate}}</h2></section><section class="currentLevel" *ngIf="currentUser.UserId"><hr><levelprogress [stars]="currentUser.RatingStars"></levelprogress><hr></section><section class="nav"><ul class="nav nav-tabs"><li role="presentation" [class.active]="activeTab == 1"><a (click)="activeTab = 1">{{\'ratings.HowItWorks\' | translate}}</a></li><li role="presentation" [class.active]="activeTab == 2"><a (click)="activeTab = 2">{{\'ratings.TopPlayers\' | translate}}</a></li><li *ngIf="currentUser.UserId" role="presentation" [class.active]="activeTab == 3"><a (click)="refreshGameHistory(); activeTab = 3">{{\'ratings.GamesHistory\' | translate}}</a></li></ul></section><section class="levels" *ngIf="activeTab == 2"><hr><hr class="currentProgress progress-step-{{getLevelProgressPercentage()}}"><div class="level-title level1" [class.active]="getLevelActiveStatus(0)">{{\'playerLevels.Level1\' | translate}}</div><div class="level-title level2" [class.active]="getLevelActiveStatus(1)">{{\'playerLevels.Level2\' | translate}}</div><div class="level-title level3" [class.active]="getLevelActiveStatus(2)">{{\'playerLevels.Level3\' | translate}}</div><div class="level-title level4" [class.active]="getLevelActiveStatus(3)">{{\'playerLevels.Level4\' | translate}}</div><div class="level-title level5" [class.active]="getLevelActiveStatus(4)">{{\'playerLevels.Level5\' | translate}}</div><div class="level-title level6" [class.active]="getLevelActiveStatus(5)">{{\'playerLevels.Level6\' | translate}}</div></section><section class="levelup" *ngIf="activeTab == 1"><i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i> <span>=</span> <span>{{\'ratings.LevelUp\' | translate}}</span></section><section class="achievements" *ngIf="activeTab == 1"><hr><achievement [title]="\'achievements.TitlePlace\' | translate"><span logo>1</span> <span bonusinfo>+2 <i class="fa fa-star" aria-hidden="true"></i></span></achievement><achievement [title]="\'achievements.TitlePlace\' | translate"><span logo>2</span> <span bonusinfo>+1 <i class="fa fa-star" aria-hidden="true"></i></span></achievement><achievement [title]="\'achievements.TitlePlace\' | translate"><span logo>3</span> <span bonusinfo>-1 <i class="fa fa-star" aria-hidden="true"></i></span></achievement><achievement [title]="\'achievements.TitlePlace\' | translate"><span logo>4</span> <span bonusinfo>-2 <i class="fa fa-star" aria-hidden="true"></i></span></achievement><achievement [title]="\'achievements.TitlePremia\' | translate" [description]="\'achievements.DescriptionPremia\' | translate"><span logo><i class="fa fa-diamond" aria-hidden="true"></i></span> <span bonusinfo>+1 <i class="fa fa-star" aria-hidden="true"></i></span></achievement><achievement [title]="\'achievements.Title9From9\' | translate"><span logo>9/9</span> <span bonusinfo>+2 <i class="fa fa-star" aria-hidden="true"></i></span></achievement><achievement [title]="\'achievements.TitleLeaveGame\' | translate" [description]="\'achievements.DescriptionLeaveGame\' | translate"><span logo>X</span> <span bonusinfo><i class="fa fa-pied-piper-alt" aria-hidden="true"></i></span></achievement><hr><ul><li>{{\'ratings.RuleDescription1\' | translate}}</li><li>{{\'ratings.RuleDescription2\' | translate}}</li></ul></section><section class="gamehistory" *ngIf="activeTab == 3 && currentUser.UserId"><ul class="list-group"><li class="list-group-item" *ngFor="#item of getGameHistoryItems()"><span class="date">{{ item.CreateDate | pastdate | translate: { count: getPeriodCount(item.CreateDate) } }}</span> <span class="stars"><span *ngIf="!item.IsIgnored" class="label" [class.label-success]="item.AddedStars >= 0" [class.label-danger]="item.AddedStars < 0">{{(item.AddedStars > 0 ? \'+\' : \'\') + item.AddedStars}} <i class="fa fa-star"></i></span> <span *ngIf="item.IsIgnored" class="label label-primary">{{ \'common.Practice\' | translate }}</span></span> <span class="text-center">{{item.Place}} <span>{{ \'common.Place\' | translate }}</span> <span *ngIf="!item.IsIgnored" class="level" data-toggle="tooltip" data-placement="top" [title]="\'ratings.LabelLevelAfterGame\' | translate">(<levelprogress [stars]="item.Stars"></levelprogress>)</span></span> <span class="premias" *ngIf="!item.IsIgnored && item.PremiaCount > 0"><span>{{item.PremiaCount}}x</span> <i class="fa fa-diamond"></i></span></li></ul><div *ngIf="currentUser.GamesHistoryInProgress" class="text-center"><i class="fa fa-spin fa-spinner"></i></div><div *ngIf="!currentUser.GamesHistoryInProgress && !isGameHistoryFullyLoaded()" class="text-center"><button class="btn btn-primary" (click)="viewMoreGameHistory()">{{ \'ratings.ViewMore\' | translate }}</button></div></section></page-layout>',
                        directives: [page_5.UIPageLayout, All_19.UIAchievement, All_19.UILevelProgress],
                        pipes: [PastDatePipe_2.PastDatePipe]
                    }), 
                    __metadata('design:paramtypes', [router_18.Router, ConfigProvider_12.ConfigProvider, CurrentUserProvider_12.CurrentUserProvider])
                ], UIRatings);
                return UIRatings;
            }());
            exports_88("UIRatings", UIRatings);
        }
    }
});
System.register("Common/ListReader", [], function(exports_89, context_89) {
    "use strict";
    var __moduleName = context_89 && context_89.id;
    var ListReader;
    return {
        setters:[],
        execute: function() {
            ListReader = (function () {
                function ListReader(url, token, batchCount, http, loadFirstBatch) {
                    if (batchCount === void 0) { batchCount = 10; }
                    if (loadFirstBatch === void 0) { loadFirstBatch = false; }
                    this.url = url;
                    this.token = token;
                    this.batchCount = batchCount;
                    this.http = http;
                    this.items = [];
                    if (loadFirstBatch)
                        this.load();
                }
                ListReader.prototype.load = function (skip) {
                    var _this = this;
                    if (!skip)
                        this.items = [];
                    this.inProgress = true;
                    this.http.get(this.url + '?skip=' + skip + '&take=' + this.batchCount + '&sid=' + this.token).subscribe(function (x) {
                        _this.inProgress = false;
                        var res = x.json();
                        if (!res || !res.IsSuccess || !res.Data)
                            return;
                        _this.lastGetItemsCount = res.Data.length;
                        _this.items = _this.items.concat(res.Data);
                    });
                };
                ListReader.prototype.isLoaded = function () {
                    return !this.inProgress && this.items.length > 0;
                };
                return ListReader;
            }());
            exports_89("ListReader", ListReader);
        }
    }
});
System.register("Pages/statistics", ['angular2/core', 'angular2/http', 'angular2/router', 'ng2-translate', 'Jok/Platforms', "Common/ListReader", "Common/Components/All", "Common/Providers/ConfigProvider", "Common/Providers/CurrentUserProvider", "Common/Providers/PortalProvider", "Pages/Layouts/page"], function(exports_90, context_90) {
    "use strict";
    var __moduleName = context_90 && context_90.id;
    var core_67, http_10, router_19, ng2_translate_7, Platforms_11, ListReader_1, All_20, ConfigProvider_13, CurrentUserProvider_13, PortalProvider_4, page_6;
    var UIStatistics;
    return {
        setters:[
            function (core_67_1) {
                core_67 = core_67_1;
            },
            function (http_10_1) {
                http_10 = http_10_1;
            },
            function (router_19_1) {
                router_19 = router_19_1;
            },
            function (ng2_translate_7_1) {
                ng2_translate_7 = ng2_translate_7_1;
            },
            function (Platforms_11_1) {
                Platforms_11 = Platforms_11_1;
            },
            function (ListReader_1_1) {
                ListReader_1 = ListReader_1_1;
            },
            function (All_20_1) {
                All_20 = All_20_1;
            },
            function (ConfigProvider_13_1) {
                ConfigProvider_13 = ConfigProvider_13_1;
            },
            function (CurrentUserProvider_13_1) {
                CurrentUserProvider_13 = CurrentUserProvider_13_1;
            },
            function (PortalProvider_4_1) {
                PortalProvider_4 = PortalProvider_4_1;
            },
            function (page_6_1) {
                page_6 = page_6_1;
            }],
        execute: function() {
            UIStatistics = (function () {
                function UIStatistics(currentUser, portal, config, translate, http, router, routeParams, zone, platform) {
                    this.currentUser = currentUser;
                    this.portal = portal;
                    this.config = config;
                    this.translate = translate;
                    this.http = http;
                    this.router = router;
                    this.routeParams = routeParams;
                    this.zone = zone;
                    this.platform = platform;
                    this.activeTab = 1;
                    this.topPlayersOverall = new ListReader_1.ListReader(config.apiUrl + '/Joker/TopPlayersOverall/All', config.sid, 10, http, true);
                    this.topFriendsOverall = new ListReader_1.ListReader(config.apiUrl + '/Joker/TopPlayersOverall/Friends', config.sid, 10, http, true);
                    this.topPlayersGrowing = new ListReader_1.ListReader(config.apiUrl + '/Joker/TopPlayersGrowing/All', config.sid, 10, http, true);
                    this.topFriendsGrowing = new ListReader_1.ListReader(config.apiUrl + '/Joker/TopPlayersGrowing/Friends', config.sid, 10, http, true);
                    this.topPlayersActive = new ListReader_1.ListReader(config.apiUrl + '/Joker/TopPlayersActive/All', config.sid, 10, http, true);
                    this.topFriendsActive = new ListReader_1.ListReader(config.apiUrl + '/Joker/TopPlayersActive/Friends', config.sid, 10, http, true);
                }
                UIStatistics.prototype.onHomeClick = function () {
                    this.router.navigate(['Home']);
                };
                UIStatistics.prototype.getOverallPosition = function () {
                    var _this = this;
                    if (!this.topFriendsOverall.isLoaded())
                        return;
                    var item = this.topFriendsOverall.items.filter(function (x) { return x.UserId == _this.currentUser.UserId; })[0];
                    if (!item)
                        return;
                    return item.Position;
                };
                UIStatistics.prototype.getGrowingPosition = function () {
                    var _this = this;
                    if (!this.topFriendsGrowing.isLoaded())
                        return;
                    var item = this.topFriendsGrowing.items.filter(function (x) { return x.UserId == _this.currentUser.UserId; })[0];
                    if (!item)
                        return;
                    return item.Position;
                };
                UIStatistics.prototype.getActivePosition = function () {
                    var _this = this;
                    if (!this.topFriendsActive.isLoaded())
                        return;
                    var item = this.topFriendsActive.items.filter(function (x) { return x.UserId == _this.currentUser.UserId; })[0];
                    if (!item)
                        return;
                    return item.Position;
                };
                UIStatistics.prototype.viewProfile = function (userid) {
                    this.platform.viewProfile(userid);
                };
                UIStatistics = __decorate([
                    core_67.Component({
                        selector: 'statistics',
                        styles: [".statistics section.nav {  width: auto; }  .statistics section.nav ul.nav {    text-align: center;    border-color: #67c68f; }    .statistics section.nav ul.nav li {      display: inline-block;      background: transparent;      min-width: 200px;      float: none; }      .statistics section.nav ul.nav li a {        background: #239d57;        border-color: #67c68f;        color: white;        text-shadow: 0 0 1px #484848;        cursor: pointer;        font-size: 16px; }        .statistics section.nav ul.nav li a span {          font-size: 14px;          opacity: .7; }      .statistics section.nav ul.nav li a:hover {        background: #27a35c; }    .statistics section.nav ul.nav li.active a {      border-color: #67c68f;      border-bottom: 1px solid #27AE60;      cursor: default;      background: transparent; }    .statistics section.nav ul.nav li.active a:hover {      background: transparent; }.statistics section.overall,.statistics section.growing,.statistics section.active {  width: 800px;  text-align: center;  color: white; }  .statistics section.overall .list-group,  .statistics section.growing .list-group,  .statistics section.active .list-group {    display: inline-block;    vertical-align: top;    margin-left: 50px;    margin-right: 50px;    text-align: left; }  .statistics section.overall .list-group-item,  .statistics section.growing .list-group-item,  .statistics section.active .list-group-item {    background: rgba(52, 73, 94, 0.84);    border: 0;    padding-top: 20px;    padding-bottom: 20px;    color: white;    cursor: pointer; }    .statistics section.overall .list-group-item:hover,    .statistics section.growing .list-group-item:hover,    .statistics section.active .list-group-item:hover {      background: rgba(52, 73, 94, 0.89); }  .statistics section.overall .place,  .statistics section.growing .place,  .statistics section.active .place {    opacity: .5;    width: 20px;    text-align: center;    float: left;    margin-top: 15px; }  .statistics section.overall .avatar,  .statistics section.growing .avatar,  .statistics section.active .avatar {    float: left;    opacity: 0.8;    margin-top: -10px;    margin-left: 10px; }    .statistics section.overall .avatar img,    .statistics section.growing .avatar img,    .statistics section.active .avatar img {      max-height: 70px; }  .statistics section.overall .nick,  .statistics section.growing .nick,  .statistics section.active .nick {    min-width: 240px;    display: block;    text-align: right;    font-size: 18px;    margin-bottom: 5px; }  .statistics section.overall .level,  .statistics section.growing .level,  .statistics section.active .level {    opacity: 0.5;    display: block;    text-align: right; }"],
                        template: '<page-layout class="statistics" [enableHomeButton]="true" (homeClick)="onHomeClick()" [class.compact]="config.isCompact"><section><h2>{{\'statistics.MainTitle\' | translate}}</h2></section><section class="nav"><ul class="nav nav-tabs"><li role="presentation" [class.active]="activeTab == 1"><a (click)="activeTab = 1" class="coolfont">{{\'statistics.MainOverall\' | translate}}<br><span *ngIf="topFriendsOverall.isLoaded() && getOverallPosition()">#{{getOverallPosition()}}</span></a></li><li role="presentation" [class.active]="activeTab == 2"><a (click)="activeTab = 2" class="coolfont">{{\'statistics.MainFastGrowing\' | translate}}<br><span *ngIf="topFriendsGrowing.isLoaded() && getGrowingPosition()">#{{getGrowingPosition()}}</span></a></li><li role="presentation" [class.active]="activeTab == 3"><a (click)="activeTab = 3" class="coolfont">{{\'statistics.MainMostActive\' | translate}}<br><span *ngIf="topFriendsActive.isLoaded() && getActivePosition()">#{{getActivePosition()}}</span></a></li></ul></section><section class="overall" *ngIf="activeTab == 1"><ul class="list-group" *ngIf="topPlayersOverall.isLoaded()"><h4>{{\'statistics.Global\' | translate}}</h4><li type="button" class="list-group-item" *ngFor="#item of topPlayersOverall.items" (click)="viewProfile(item.UserId)"><span class="place">{{item.Position}}</span> <span class="avatar"><img [src]="item.AvatarUrl"></span> <span class="nick">{{item.Nick}}</span> <span class="level"><levelprogress [stars]="item.Stars" [nameOnly]="true"></levelprogress></span></li></ul><div *ngIf="topPlayersOverall.inProgress" class="text-center"><i class="fa fa-spin fa-spinner"></i></div><ul class="list-group" *ngIf="topFriendsOverall.isLoaded()"><h4>{{\'statistics.YouWithFriends\' | translate}}</h4><li type="button" class="list-group-item" *ngFor="#item of topFriendsOverall.items" (click)="viewProfile(item.UserId)"><span class="place">{{item.Position}}</span> <span class="avatar"><img [src]="item.AvatarUrl"></span> <span class="nick">{{item.Nick}}</span> <span class="level"><levelprogress [stars]="item.Stars" [nameOnly]="true"></levelprogress></span></li></ul></section><section class="growing" *ngIf="activeTab == 2"><ul class="list-group" *ngIf="topPlayersGrowing.isLoaded()"><h4>{{\'statistics.Global\' | translate}}</h4><li type="button" class="list-group-item" *ngFor="#item of topPlayersGrowing.items" (click)="viewProfile(item.UserId)"><span class="place">{{item.Position}}</span> <span class="avatar"><img [src]="item.AvatarUrl"></span> <span class="nick">{{item.Nick}}</span> <span class="level">+{{item.AddedStars}} <i class="fa fa-star"></i></span></li></ul><div *ngIf="topPlayersGrowing.inProgress" class="text-center"><i class="fa fa-spin fa-spinner"></i></div><ul class="list-group" *ngIf="topFriendsGrowing.isLoaded()"><h4>{{\'statistics.YouWithFriends\' | translate}}</h4><li type="button" class="list-group-item" *ngFor="#item of topFriendsGrowing.items" (click)="viewProfile(item.UserId)"><span class="place">{{item.Position}}</span> <span class="avatar"><img [src]="item.AvatarUrl"></span> <span class="nick">{{item.Nick}}</span> <span class="level">+{{item.AddedStars}} <i class="fa fa-star"></i></span></li></ul></section><section class="active" *ngIf="activeTab == 3"><ul class="list-group" *ngIf="topPlayersActive.isLoaded()"><h4>{{\'statistics.Global\' | translate}}</h4><li type="button" class="list-group-item" *ngFor="#item of topPlayersActive.items" (click)="viewProfile(item.UserId)"><span class="place">{{item.Position}}</span> <span class="avatar"><img [src]="item.AvatarUrl"></span> <span class="nick">{{item.Nick}}</span> <span class="level">{{item.GamesCount}} {{\'statistics.Games\' | translate}}</span></li></ul><div *ngIf="topPlayersActive.inProgress" class="text-center"><i class="fa fa-spin fa-spinner"></i></div><ul class="list-group" *ngIf="topFriendsActive.isLoaded()"><h4>{{\'statistics.YouWithFriends\' | translate}}</h4><li type="button" class="list-group-item" *ngFor="#item of topFriendsActive.items" (click)="viewProfile(item.UserId)"><span class="place">{{item.Position}}</span> <span class="avatar"><img [src]="item.AvatarUrl"></span> <span class="nick">{{item.Nick}}</span> <span class="level">{{item.GamesCount}} {{\'statistics.Games\' | translate}}</span></li></ul></section></page-layout>',
                        directives: [router_19.ROUTER_DIRECTIVES, page_6.UIPageLayout, All_20.UILevelProgress]
                    }), 
                    __metadata('design:paramtypes', [CurrentUserProvider_13.CurrentUserProvider, PortalProvider_4.PortalProvider, ConfigProvider_13.ConfigProvider, ng2_translate_7.TranslateService, http_10.Http, router_19.Router, router_19.RouteParams, core_67.NgZone, Platforms_11.PlatformProvider])
                ], UIStatistics);
                return UIStatistics;
            }());
            exports_90("UIStatistics", UIStatistics);
        }
    }
});
System.register("app", ['angular2/core', 'angular2/router', "Common/Components/playerinfo", "Common/Providers/CurrentUserProvider", "Common/Providers/ConfigProvider", 'Jok/Music', 'Jok/Platforms', 'Jok/Joker', 'Jok/JapJoker', "Pages/lobby", "Pages/home", "Pages/login", "Pages/mobile", "Pages/ratings", "Pages/statistics"], function(exports_91, context_91) {
    "use strict";
    var __moduleName = context_91 && context_91.id;
    var core_68, router_20, playerinfo_1, CurrentUserProvider_14, ConfigProvider_14, Music_2, Platforms_12, Joker, JapJoker, lobby_1, home_1, login_1, mobile_1, ratings_1, statistics_1;
    var AppComponent;
    return {
        setters:[
            function (core_68_1) {
                core_68 = core_68_1;
            },
            function (router_20_1) {
                router_20 = router_20_1;
            },
            function (playerinfo_1_1) {
                playerinfo_1 = playerinfo_1_1;
            },
            function (CurrentUserProvider_14_1) {
                CurrentUserProvider_14 = CurrentUserProvider_14_1;
            },
            function (ConfigProvider_14_1) {
                ConfigProvider_14 = ConfigProvider_14_1;
            },
            function (Music_2_1) {
                Music_2 = Music_2_1;
            },
            function (Platforms_12_1) {
                Platforms_12 = Platforms_12_1;
            },
            function (Joker_1) {
                Joker = Joker_1;
            },
            function (JapJoker_1) {
                JapJoker = JapJoker_1;
            },
            function (lobby_1_1) {
                lobby_1 = lobby_1_1;
            },
            function (home_1_1) {
                home_1 = home_1_1;
            },
            function (login_1_1) {
                login_1 = login_1_1;
            },
            function (mobile_1_1) {
                mobile_1 = mobile_1_1;
            },
            function (ratings_1_1) {
                ratings_1 = ratings_1_1;
            },
            function (statistics_1_1) {
                statistics_1 = statistics_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(currentUser, platform, config) {
                    var _this = this;
                    this.currentUser = currentUser;
                    this.platform = platform;
                    this.config = config;
                    this.PlayerInfoCallbacks = {
                        onClose: function () { return _this.profileUserId = null; },
                        onSendFriendRequest: function (userid) { },
                        onBlock: function (userid) { },
                        onUnblock: function (userid) { },
                        onListenChannel: function (channel) { }
                    };
                }
                AppComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (window.querySid)
                        this.currentUser.refreshUserData(window.querySid);
                    
                    this.platform.initStore(true);
                    setTimeout(function () { return _this.loaded = true; }, 10);
                    this.platform.on(Platforms_12.PlatformProvider.VIEW_PROFILE_EVENT, this.onViewProfile.bind(this));
                    this.platform.on('GlobalPurchaseError', this.onGlobalPurchaseError.bind(this));
                    this.platform.on('StoreInitializationFailed', this.onStoreInitializationFailed.bind(this));
                    this.platform.on('PurchaseSuccess', this.onPurchaseSuccess.bind(this));
                    this.platform.on('PurchaseFailed', this.onPurchaseFailed.bind(this));
                    
                    this.platform.saveToken('1');
                    this.platform.saveToken('2');
                    this.platform.saveToken('');
                };
                AppComponent.prototype.onGlobalClick = function (e) {
                    this.profileUserId = null;
                };
                AppComponent.prototype.onViewProfile = function (userid) {
                    var _this = this;
                    setTimeout(function () { return _this.profileUserId = userid; }, 40);
                };
                AppComponent.prototype.onGlobalPurchaseError = function (error) {
                    console.warn(error);
                };
                AppComponent.prototype.onStoreInitializationFailed = function (error) {
                    console.warn(error);
                };
                AppComponent.prototype.onPurchaseSuccess = function (productId, result) {
                    this.purchaseResult = 1;
                    this.profileUserId = null;
                };
                AppComponent.prototype.onPurchaseFailed = function (productId, error) {
                    this.purchaseResult = -1;
                    this.profileUserId = null;
                };
                AppComponent = __decorate([
                    core_68.Component({
                        host: {
                            '(document:click)': 'onGlobalClick($event)',
                        },
                        selector: 'app',
                        template: '<div class="app" [class.animate]="loaded"><router-outlet></router-outlet><player-info *ngIf="profileUserId" [userid]="profileUserId" [isCompact]="config.isCompact" [callbacks]="PlayerInfoCallbacks"></player-info><musicplayer *ngIf="!config.isCompact"></musicplayer><div class="purchase-result" *ngIf="purchaseResult"><div *ngIf="purchaseResult == 1" class="icon"><i class="fa fa-check-circle"></i></div><div *ngIf="purchaseResult == 1" class="title">Purchase Completed Successfully!</div><div *ngIf="purchaseResult == -1" class="icon"><i class="fa fa-times-circle"></i></div><div *ngIf="purchaseResult == -1" class="title">Purchase Cancelled</div><button class="btn btn-primary" (click)="purchaseResult = null">Okey</button></div></div>',
                        styles: [".app {  opacity: 0;  -moz-transition: all linear .1s;  -o-transition: all linear .1s;  -webkit-transition: all linear .1s;  transition: all linear .1s; }  .app.animate {    opacity: 1; }  .app musicplayer {    position: fixed;    bottom: 20px;    right: 20px;    z-index: 100; }  .app player-info {    z-index: 30000;    position: relative; }  .app .purchase-result {    z-index: 31000;    position: relative;    position: absolute;    width: 300px;    left: 50%;    margin-left: -150px;    top: 140px;    text-align: center;    background: #34495e;    border: 1px solid #2b3c4e;    padding: 10px;    border-radius: 10px;    box-shadow: 0 0 90px black;    text-align: center;    color: white; }    .app .purchase-result div.icon {      font-size: 40px; }    .app .purchase-result div.title {      margin-top: 10px;      margin-bottom: 30px; }"],
                        directives: [router_20.ROUTER_DIRECTIVES, Music_2.UIMusicPlayer, playerinfo_1.UIPlayerInfo]
                    }),
                    router_20.RouteConfig([
                        { path: '/', name: 'Home', component: home_1.UIHome, useAsDefault: true },
                        { path: '/play/...', name: 'Play', component: Joker.Route },
                        { path: '/quickplay/...', name: 'PlayJap', component: JapJoker.Route },
                        { path: '/lobby', name: 'Lobby', component: lobby_1.UILobby },
                        { path: '/login', name: 'Login', component: login_1.UILogin },
                        { path: '/mobile', name: 'Mobile', component: mobile_1.UIMobile },
                        { path: '/ratings', name: 'Ratings', component: ratings_1.UIRatings },
                        { path: '/topplayers', name: 'TopPlayers', component: statistics_1.UIStatistics },
                        { path: '/:other', name: 'Other', component: home_1.UIHome },
                    ]), 
                    __metadata('design:paramtypes', [CurrentUserProvider_14.CurrentUserProvider, Platforms_12.PlatformProvider, ConfigProvider_14.ConfigProvider])
                ], AppComponent);
                return AppComponent;
            }());
            exports_91("AppComponent", AppComponent);
        }
    }
});
System.register("Common/JokExceptionHandler", ['angular2/core', "Common/Cookie", "Common/Providers/ConfigProvider", 'angular2/http'], function(exports_92, context_92) {
    "use strict";
    var __moduleName = context_92 && context_92.id;
    var core_69, Cookie_2, ConfigProvider_15, http_11;
    var JokExceptionHandler;
    return {
        setters:[
            function (core_69_1) {
                core_69 = core_69_1;
            },
            function (Cookie_2_1) {
                Cookie_2 = Cookie_2_1;
            },
            function (ConfigProvider_15_1) {
                ConfigProvider_15 = ConfigProvider_15_1;
            },
            function (http_11_1) {
                http_11 = http_11_1;
            }],
        execute: function() {
            JokExceptionHandler = (function () {
                function JokExceptionHandler() {
                    this.savedErrors = [];
                    this.hashCodes = [];
                    window.Errors = this.savedErrors;
                    var injector = core_69.Injector.resolveAndCreate([
                        http_11.HTTP_PROVIDERS,
                        ConfigProvider_15.ConfigProvider
                    ]);
                    this.config = injector.get(ConfigProvider_15.ConfigProvider);
                    this.http = injector.get(http_11.Http);
                }
                JokExceptionHandler.prototype.call = function (exception, stackTrace, reason) {
                    var logEx = exception.originalException || exception;
                    try {
                        var userAgent;
                        var info = new UAParser().getResult();
                        if (info) {
                            userAgent = {
                                BrowserName: info.browser.name,
                                BrowserVersion: info.browser.version,
                                OSName: info.os.name,
                                OSVersion: info.os.version,
                                CPUArchitecture: info.cpu.architecture,
                                DeviceModel: info.device.model,
                                DeviceType: info.device.type,
                                DeviceVendor: info.device.vendor
                            };
                        }
                        var logObj = {
                            GameID: this.config.gameId,
                            GameClientVersion: this.config.gameClientVersion,
                            HTMLBody: document.body ? (document.body.outerHTML || document.body.innerHTML) : '',
                            ErrorMessage: logEx.message,
                            ErrorStack: logEx.stack,
                            Reason: reason,
                            UserAgent: userAgent,
                            SID: localStorage['sid'] || Cookie_2.Cookie.getCookie('sid'),
                            ViewModel: JSON.stringify(window.VM),
                            Language: this.config.activeLang
                        };
                        var hashCode = this.hashCode(logEx.message);
                        if (~this.hashCodes.indexOf(hashCode))
                            return;
                        this.hashCodes.push(hashCode);
                        this.savedErrors.push(logObj);
                        if (this.lastSendDate && (Date.now() - this.lastSendDate) < 1000)
                            return;
                        this.http.post(this.config.apiUrl + '/Game/LogError?sid=' + (localStorage['sid'] || Cookie_2.Cookie.getCookie('sid')), JSON.stringify(logObj)).subscribe();
                        this.lastSendDate = Date.now();
                    }
                    catch (err) {
                        alert('Unhandled: ' + err);
                    }
                    finally {
                        console.warn(logEx);
                        console.error(exception, stackTrace, reason);
                    }
                };
                JokExceptionHandler.prototype.hashCode = function (s) {
                    if (!s)
                        return null;
                    var hash = 0, i, chr, len;
                    if (s.length === 0)
                        return hash;
                    for (i = 0, len = s.length; i < len; i++) {
                        chr = s.charCodeAt(i);
                        hash = ((hash << 5) - hash) + chr;
                        hash |= 0;
                    }
                    return hash;
                };
                ;
                return JokExceptionHandler;
            }());
            exports_92("JokExceptionHandler", JokExceptionHandler);
        }
    }
});
System.register("Common/Welcome", [], function(exports_93, context_93) {
    "use strict";
    var __moduleName = context_93 && context_93.id;
    var Welcome;
    return {
        setters:[],
        execute: function() {
            Welcome = (function () {
                function Welcome() {
                }
                Welcome.Show = function () {
                    console.log(Welcome.message);
                };
                Welcome.message = "                                                                                                           \n             ,''+++                                                                                                       \n           ;''''''+#                                                                                                      \n         .''''''''''#                                                                                                     \n        '''''''''''''+                                                                                                    \n     ` '''''++++''''''#                                                                                                   \n  '@@@@ +###+'@#+''''''+++''+'+#.                                                                                         \n .@@@@@;.`     #+'''''''+''''''+#@@`                                                                                      \n ;@@@@@@       .#+'''''''''''''''@@@@                                                                                     \n ;@@@@@@        #+'''''''''''''''+@@@@     .;+:`                                                                          \n ,@@@@@@        ,++'''''''''''''''@@@@@+@@@@@@@#@                                                                         \n  #@@@@          #+'''''''''''''''#@@@@@@@@@@@@@@@                                                                        \n                 ##'''''''''''''''+@@@@@@@@@@@@@@@                                                                        \n                +##+'''''''''''''''@@@@@@@@@@@@@@@'                                                                       \n                @+'''''''''''''''''#@@@@@@@@@@@@@@@                                                                       \n               `#+''''''';;;''''''+@@@@@@@@@@@@@@@@                                                                       \n               ,@+'''''         `;#@@@@@@@@@@+  +@@                                                                       \n               ;#''''';            .@@@#@@@.    ,@@                                                                       \n               '#''''',   `           '@@`     @@@@@                                                                      \n               +#'''''  ,@@@@+          +      @@@@@;                                                                     \n               '#+'''' #@@@@@@@`       `:      @@@@@`                                                                     \n               :#+'''' @@@,'@@@@,     ``       `@@@@                                                                      \n               ,#++''..@@@#` @@@@@,    ;                                                                                  \n               `+++''  @@ `++`@@@@@@@#@`                                                                                  \n                '++'+  @@#:, @+@@@@@@#@                         @@@            @@@              @@@@@'   +@@@@@@@@        \n                '+++;  :#@@,.:@@@@@#,:;`                        @@@            @@@            +@@@@@@@#  +@@@@@@@@        \n                .+++:   @#@@@@@@#@@:``@                         @@@            @@@           `@@@' '@@@  +@@@@@@@@        \n                 '++,    @@@@##@ '@#`;@                         @@@    @@@@:   @@@  @@@,     #@@'        +@@'             \n                 ,+':     :##;`   '@@@#                         @@@   @@@@@@#  @@@ @@@       @@@         +@@@@@@@:        \n                  ++;    .      ,,`'@@..                        @@@  @@@  @@@  @@@@@@        @@@  ,@@@@: +@@@@@@@:        \n                  ;#'    ;+,`   ```    `                        @@@  @@@  ,@@, @@@@@@        @@@  ,@@@@: +@@'             \n                  `##     +  ,+@@#,  `,                    @@@  @@@  @@@  ,@@, @@@@@@@       #@@'    @@: +@@'             \n                   ##;    @.     @`   ;                    @@@,,@@@  @@@  @@@  @@@ #@@` :@@' `@@@+ .@@@: +@@@@@@@@        \n                   ##@, ` ;##`  ,   `'                     ,@@@@@@'  `@@@@@@#  @@@  @@@ :@@'  +@@@@@@@@  +@@@@@@@@        \n                   ##@@:  `; #@@@ ` ;                       `@@@@,     @@@@,   @@@  +@@+:@@'    @@@@@.   +@@@@@@@@        \n                   ###@#'    .';   ;                                                                                        \n                   #####@#:      :                                                                                     \n                  ,+######@#;. ;`                                                                                         \n            ;@@@##` ######@@  `     ,:.                                                                                   \n           @@@@@@#@` ,+###@@    `:#+'+#+                                                                                  \n          @@@@@@@@@@    `,.``;     .#'++'                                                                                   \n";
                return Welcome;
            }());
            exports_93("Welcome", Welcome);
        }
    }
});
System.register("boot", ['angular2/core', 'angular2/http', 'angular2/platform/browser', 'angular2/router', 'ng2-translate', 'Jok/Chat', 'Jok/Platforms', 'Jok/Music', "app", "Common/Providers/All", "Common/JokExceptionHandler", "Common/Welcome"], function(exports_94, context_94) {
    "use strict";
    var __moduleName = context_94 && context_94.id;
    var core_70, http_12, browser_3, router_21, ng2_translate_8, Chat_5, Platforms_13, Music_3, app_1, All_21, JokExceptionHandler_1, Welcome_1;
    return {
        setters:[
            function (core_70_1) {
                core_70 = core_70_1;
            },
            function (http_12_1) {
                http_12 = http_12_1;
            },
            function (browser_3_1) {
                browser_3 = browser_3_1;
            },
            function (router_21_1) {
                router_21 = router_21_1;
            },
            function (ng2_translate_8_1) {
                ng2_translate_8 = ng2_translate_8_1;
            },
            function (Chat_5_1) {
                Chat_5 = Chat_5_1;
            },
            function (Platforms_13_1) {
                Platforms_13 = Platforms_13_1;
            },
            function (Music_3_1) {
                Music_3 = Music_3_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            },
            function (All_21_1) {
                All_21 = All_21_1;
            },
            function (JokExceptionHandler_1_1) {
                JokExceptionHandler_1 = JokExceptionHandler_1_1;
            },
            function (Welcome_1_1) {
                Welcome_1 = Welcome_1_1;
            }],
        execute: function() {
            core_70.enableProdMode();
            browser_3.bootstrap(app_1.AppComponent, [
                http_12.HTTP_PROVIDERS,
                router_21.ROUTER_PROVIDERS,
                All_21.UsersProvider,
                All_21.PortalProvider,
                All_21.ConfigProvider,
                Chat_5.ChatProvider,
                ng2_translate_8.TranslateService,
                All_21.CurrentUserProvider,
                Music_3.MusicProvider,
                browser_3.Title,
                core_70.provide(Platforms_13.PlatformProvider, { useClass: Platforms_13.Platform.GetPlatform() }),
                core_70.provide(ng2_translate_8.TranslateLoader, { useFactory: function (http) { return new ng2_translate_8.TranslateStaticLoader(http, 'lang', '.json?version=' + window.ClientVersion); }, deps: [http_12.Http] }),
                core_70.provide(core_70.PLATFORM_PIPES, { useValue: [ng2_translate_8.TranslatePipe, Chat_5.EmotionsPipe], multi: true }),
                core_70.provide(core_70.ExceptionHandler, { useClass: JokExceptionHandler_1.JokExceptionHandler })
            ]);
            Welcome_1.Welcome.Show();
        }
    }
});
System.register("Jok/Cards", ["Modules/Cards/card.model", "Modules/Cards/card", "Modules/Cards/cards", "Modules/Cards/colorselection.model", "Modules/Cards/colorselection", "Modules/Cards/downcards.provider", "Modules/Cards/downcards"], function(exports_95, context_95) {
    "use strict";
    var __moduleName = context_95 && context_95.id;
    function exportStar_4(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_95(exports);
    }
    return {
        setters:[
            function (card_model_2_1) {
                exportStar_4(card_model_2_1);
            },
            function (card_3_1) {
                exportStar_4(card_3_1);
            },
            function (cards_1_1) {
                exportStar_4(cards_1_1);
            },
            function (colorselection_model_2_1) {
                exportStar_4(colorselection_model_2_1);
            },
            function (colorselection_1_1) {
                exportStar_4(colorselection_1_1);
            },
            function (downcards_provider_2_1) {
                exportStar_4(downcards_provider_2_1);
            },
            function (downcards_1_1) {
                exportStar_4(downcards_1_1);
            }],
        execute: function() {
        }
    }
});
System.register("Jok/Chat", ["Modules/Chat/chat.provider", "Modules/Chat/emotions.pipe", "Modules/Chat/chatbox", "Modules/Chat/chatsmiles", "Modules/Chat/chat.model"], function(exports_96, context_96) {
    "use strict";
    var __moduleName = context_96 && context_96.id;
    function exportStar_5(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_96(exports);
    }
    return {
        setters:[
            function (chat_provider_4_1) {
                exportStar_5(chat_provider_4_1);
            },
            function (emotions_pipe_2_1) {
                exportStar_5(emotions_pipe_2_1);
            },
            function (chatbox_1_1) {
                exportStar_5(chatbox_1_1);
            },
            function (chatsmiles_2_1) {
                exportStar_5(chatsmiles_2_1);
            },
            function (chat_model_2_1) {
                exportStar_5(chat_model_2_1);
            }],
        execute: function() {
        }
    }
});
System.register("Jok/Communication", ["Modules/CommunicationClient/communication.provider", "Modules/CommunicationClient/mock.provider", "Modules/CommunicationClient/signalr.provider", "Modules/CommunicationClient/socketio.provider"], function(exports_97, context_97) {
    "use strict";
    var __moduleName = context_97 && context_97.id;
    function exportStar_6(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_97(exports);
    }
    return {
        setters:[
            function (communication_provider_4_1) {
                exportStar_6(communication_provider_4_1);
            },
            function (mock_provider_1_1) {
                exportStar_6(mock_provider_1_1);
            },
            function (signalr_provider_1_1) {
                exportStar_6(signalr_provider_1_1);
            },
            function (socketio_provider_1_1) {
                exportStar_6(socketio_provider_1_1);
            }],
        execute: function() {
        }
    }
});
System.register("Jok/JapJoker", ["Modules/JapJoker/finishinfo.model", "Modules/JapJoker/finishinfo", "Modules/JapJoker/game.model", "Modules/JapJoker/game.provider", "Modules/JapJoker/game", "Modules/JapJoker/infopanel", "Modules/JapJoker/notification", "Modules/JapJoker/viewmodel.provider", "Modules/JapJoker/Pages/route"], function(exports_98, context_98) {
    "use strict";
    var __moduleName = context_98 && context_98.id;
    function exportStar_7(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_98(exports);
    }
    return {
        setters:[
            function (finishinfo_model_4_1) {
                exportStar_7(finishinfo_model_4_1);
            },
            function (finishinfo_3_1) {
                exportStar_7(finishinfo_3_1);
            },
            function (game_model_4_1) {
                exportStar_7(game_model_4_1);
            },
            function (game_provider_3_1) {
                exportStar_7(game_provider_3_1);
            },
            function (game_5_1) {
                exportStar_7(game_5_1);
            },
            function (infopanel_3_1) {
                exportStar_7(infopanel_3_1);
            },
            function (notification_3_1) {
                exportStar_7(notification_3_1);
            },
            function (viewmodel_provider_5_1) {
                exportStar_7(viewmodel_provider_5_1);
            },
            function (route_1_1) {
                exportStar_7(route_1_1);
            }],
        execute: function() {
        }
    }
});
System.register("Jok/Joker", ["Modules/Joker/Models/All", "Modules/Joker/Pipes/EscapeWantZero", "Modules/Joker/Pipes/Result", "Modules/Joker/Pipes/TotalResult", "Modules/Joker/Providers/GameProvider", "Modules/Joker/Providers/ViewModelProvider", "Modules/Joker/declaration", "Modules/Joker/finishinfo", "Modules/Joker/infopanel", "Modules/Joker/game", "Modules/Joker/notification", "Modules/Joker/results", "Modules/Joker/Pages/route"], function(exports_99, context_99) {
    "use strict";
    var __moduleName = context_99 && context_99.id;
    function exportStar_8(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_99(exports);
    }
    return {
        setters:[
            function (All_22_1) {
                exportStar_8(All_22_1);
            },
            function (EscapeWantZero_2_1) {
                exportStar_8(EscapeWantZero_2_1);
            },
            function (Result_2_1) {
                exportStar_8(Result_2_1);
            },
            function (TotalResult_2_1) {
                exportStar_8(TotalResult_2_1);
            },
            function (GameProvider_3_1) {
                exportStar_8(GameProvider_3_1);
            },
            function (ViewModelProvider_5_1) {
                exportStar_8(ViewModelProvider_5_1);
            },
            function (declaration_2_1) {
                exportStar_8(declaration_2_1);
            },
            function (finishinfo_4_1) {
                exportStar_8(finishinfo_4_1);
            },
            function (infopanel_4_1) {
                exportStar_8(infopanel_4_1);
            },
            function (game_6_1) {
                exportStar_8(game_6_1);
            },
            function (notification_4_1) {
                exportStar_8(notification_4_1);
            },
            function (results_2_1) {
                exportStar_8(results_2_1);
            },
            function (route_2_1) {
                exportStar_8(route_2_1);
            }],
        execute: function() {
        }
    }
});
System.register("Jok/Music", ["Modules/Music/music.provider", "Modules/Music/player.component"], function(exports_100, context_100) {
    "use strict";
    var __moduleName = context_100 && context_100.id;
    function exportStar_9(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_100(exports);
    }
    return {
        setters:[
            function (music_provider_2_1) {
                exportStar_9(music_provider_2_1);
            },
            function (player_component_1_1) {
                exportStar_9(player_component_1_1);
            }],
        execute: function() {
        }
    }
});
System.register("Jok/Platforms", ["Modules/Platforms/Common/platform.provider", "Modules/Platforms/browser.provider", "Modules/Platforms/ios.provider", "Modules/Platforms/android.provider", "Modules/Platforms/wp.provider", "Modules/Platforms/facebook.provider", "Modules/Platforms/Common/platform"], function(exports_101, context_101) {
    "use strict";
    var __moduleName = context_101 && context_101.id;
    function exportStar_10(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_101(exports);
    }
    return {
        setters:[
            function (platform_provider_6_1) {
                exportStar_10(platform_provider_6_1);
            },
            function (browser_provider_2_1) {
                exportStar_10(browser_provider_2_1);
            },
            function (ios_provider_2_1) {
                exportStar_10(ios_provider_2_1);
            },
            function (android_provider_2_1) {
                exportStar_10(android_provider_2_1);
            },
            function (wp_provider_2_1) {
                exportStar_10(wp_provider_2_1);
            },
            function (facebook_provider_2_1) {
                exportStar_10(facebook_provider_2_1);
            },
            function (platform_1_1) {
                exportStar_10(platform_1_1);
            }],
        execute: function() {
        }
    }
});
System.register("Pages/slide", ['angular2/core'], function(exports_102, context_102) {
    "use strict";
    var __moduleName = context_102 && context_102.id;
    var core_71;
    var UISlide, UISlideChild;
    return {
        setters:[
            function (core_71_1) {
                core_71 = core_71_1;
            }],
        execute: function() {
            UISlide = (function () {
                function UISlide() {
                }
                UISlide = __decorate([
                    core_71.Component({
                        selector: 'slide',
                        styles: [".slide {  position: fixed;  top: 0;  bottom: 0;  left: 0;  right: 0;  background: #4389AB; }  .slide header {    background: #43AB4D;    color: white;    text-shadow: 0 0 4px black;    font-size: 80px;    position: absolute;    left: 0;    right: 0;    top: 50px;    text-align: center;    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Segoe UI Light','Helvetica Neue','Arial','Helvetica';    padding-top: 15px;    padding-bottom: 15px; }  .slide img {    width: 800px;    position: absolute;    bottom: 0; }"],
                        template: "\n        <div class=\"slide\" (click)=\"onClick()\">\n            <slidechild></slidechild>\n        </div>\n    ",
                        directives: [UISlideChild]
                    }), 
                    __metadata('design:paramtypes', [])
                ], UISlide);
                return UISlide;
            }());
            exports_102("UISlide", UISlide);
            UISlideChild = (function () {
                function UISlideChild() {
                }
                UISlideChild = __decorate([
                    core_71.Component({
                        selector: 'slidechild',
                        styleUrls: ['slidechild.ts.scss'],
                        template: "\n        <div class=\"slidechild\">\n            Just Child Element\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], UISlideChild);
                return UISlideChild;
            }());
            exports_102("UISlideChild", UISlideChild);
        }
    }
});
System.register("Common/Providers/HttpProvider", ['angular2/core', 'angular2/http', 'rxjs/Rx'], function(exports_103, context_103) {
    "use strict";
    var __moduleName = context_103 && context_103.id;
    var core_72, http_13, Rx_1;
    var HttpProvider;
    return {
        setters:[
            function (core_72_1) {
                core_72 = core_72_1;
            },
            function (http_13_1) {
                http_13 = http_13_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            HttpProvider = (function (_super) {
                __extends(HttpProvider, _super);
                function HttpProvider(_backend, _defaultOptions) {
                    _super.call(this, _backend, _defaultOptions);
                    this._backend = _backend;
                    this._defaultOptions = _defaultOptions;
                    this.onRequestStart = new Rx_1.Observable().share();
                    this.onRequestSuccess = new Rx_1.Observable().share();
                    this.onRequestError = new Rx_1.Observable().share();
                    this.onRequestComplete = new Rx_1.Observable().share();
                }
                HttpProvider.prototype.get = function (url, options) {
                    console.log(['Request Start'], url);
                    var response = _super.prototype.get.call(this, url, options).share();
                    response.subscribe(function () { return console.log(['Request Success'], url); }, function () { return console.log(['Request Fail'], url); }, function () { return console.log(['Request Complete'], url); });
                    return response;
                };
                HttpProvider = __decorate([
                    core_72.Injectable(), 
                    __metadata('design:paramtypes', [http_13.ConnectionBackend, http_13.RequestOptions])
                ], HttpProvider);
                return HttpProvider;
            }(http_13.Http));
            exports_103("HttpProvider", HttpProvider);
        }
    }
});
System.register("Modules/Joker/Models/Old/Card_Type", [], function(exports_104, context_104) {
    "use strict";
    var __moduleName = context_104 && context_104.id;
    var Card_Type;
    return {
        setters:[],
        execute: function() {
            Card_Type = (function () {
                function Card_Type() {
                }
                Card_Type.prototype.Clone = function () {
                    var item = new Card_Type();
                    item.ID = this.ID;
                    item.Value = this.Value;
                    item.Color = this.Color;
                    item.Level = this.Level;
                    item.Avable = this.Avable;
                    item.LeftClick = this.LeftClick;
                    item.Special = this.Special;
                    item.IsJoker = this.IsJoker;
                    return item;
                };
                return Card_Type;
            }());
            exports_104("Card_Type", Card_Type);
        }
    }
});
System.register("Modules/Joker/Models/Old/JF", [], function(exports_105, context_105) {
    "use strict";
    var __moduleName = context_105 && context_105.id;
    var JF;
    return {
        setters:[],
        execute: function() {
            JF = (function () {
                function JF() {
                }
                JF.SetInRange = function (i, minRange, maxRange) {
                    if (i < minRange)
                        i = minRange;
                    if (i > maxRange)
                        i = maxRange;
                    return i;
                };
                JF.Next = function (i, min, max) {
                    if ((i >= min) && (i < max))
                        return ++i;
                    return min;
                };
                JF.Previous = function (i, min, max) {
                    if ((i > min) && (i <= max))
                        return --i;
                    return max;
                };
                return JF;
            }());
            exports_105("JF", JF);
        }
    }
});
System.register("Modules/Joker/Models/Old/JokerTableResultType", [], function(exports_106, context_106) {
    "use strict";
    var __moduleName = context_106 && context_106.id;
    var JokerTableResultType;
    return {
        setters:[],
        execute: function() {
            (function (JokerTableResultType) {
                JokerTableResultType[JokerTableResultType["Result"] = 0] = "Result";
                JokerTableResultType[JokerTableResultType["SectionResult"] = 1] = "SectionResult";
                JokerTableResultType[JokerTableResultType["Bonus"] = 2] = "Bonus";
                JokerTableResultType[JokerTableResultType["Raiting"] = 3] = "Raiting";
                JokerTableResultType[JokerTableResultType["Total"] = 4] = "Total";
            })(JokerTableResultType || (JokerTableResultType = {}));
            exports_106("JokerTableResultType", JokerTableResultType);
        }
    }
});
System.register("Modules/Joker/Models/Old/TableBonusStruct2", [], function(exports_107, context_107) {
    "use strict";
    var __moduleName = context_107 && context_107.id;
    var TableBonusStruct2;
    return {
        setters:[],
        execute: function() {
            TableBonusStruct2 = (function () {
                function TableBonusStruct2() {
                }
                return TableBonusStruct2;
            }());
            exports_107("TableBonusStruct2", TableBonusStruct2);
        }
    }
});
System.register("Modules/Joker/Models/Old/TableResults2", [], function(exports_108, context_108) {
    "use strict";
    var __moduleName = context_108 && context_108.id;
    var TableResults2, TableminiResult2, TableJokerTableResults;
    return {
        setters:[],
        execute: function() {
            TableResults2 = (function () {
                function TableResults2() {
                    this.SectionResult = [0, 0, 0, 0];
                    this.Total = 0;
                    this.BigestResult = 0;
                    this.BigestLineNo = 0;
                    this.SmallestResult = 0;
                    this.SmallestLineNo = 0;
                }
                return TableResults2;
            }());
            exports_108("TableResults2", TableResults2);
            TableminiResult2 = (function () {
                function TableminiResult2() {
                }
                TableminiResult2.prototype.Reset = function () {
                    this.Have = 0;
                    this.Need = 0;
                };
                TableminiResult2.prototype.SetNeed = function (need) {
                    this.Need = need;
                };
                TableminiResult2.prototype.SetHave = function (have) {
                    this.Have = have;
                };
                return TableminiResult2;
            }());
            exports_108("TableminiResult2", TableminiResult2);
            TableJokerTableResults = (function () {
                function TableJokerTableResults(ResultType, SectionNo, LineNo, PlayerScore, Position, PlayerWant, PlayerTook) {
                    this.ResultType = ResultType;
                    this.SectionNo = SectionNo;
                    this.LineNo = LineNo;
                    this.PlayerScore = PlayerScore;
                    this.Position = Position;
                    this.PlayerWant = PlayerWant;
                    this.PlayerTook = PlayerTook;
                }
                return TableJokerTableResults;
            }());
            exports_108("TableJokerTableResults", TableJokerTableResults);
        }
    }
});
System.register("Modules/Joker/Models/Old/table_state", [], function(exports_109, context_109) {
    "use strict";
    var __moduleName = context_109 && context_109.id;
    var table_state;
    return {
        setters:[],
        execute: function() {
            (function (table_state) {
                table_state[table_state["none"] = 0] = "none";
                table_state[table_state["WaitingStart"] = 1] = "WaitingStart";
                table_state[table_state["ProcessingStart"] = 2] = "ProcessingStart";
                table_state[table_state["WaitingWantRequest"] = 3] = "WaitingWantRequest";
                table_state[table_state["ProcessingWantRequest"] = 4] = "ProcessingWantRequest";
                table_state[table_state["WaitingCardRequest"] = 5] = "WaitingCardRequest";
                table_state[table_state["ProcessingCardRequest"] = 6] = "ProcessingCardRequest";
                table_state[table_state["WaitingkozirRequest"] = 7] = "WaitingkozirRequest";
                table_state[table_state["ProcessingkozirRequest"] = 8] = "ProcessingkozirRequest";
            })(table_state || (table_state = {}));
            exports_109("table_state", table_state);
        }
    }
});
