webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/announcement/announcement.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "a{\n  text-decoration: none;\n  display: block;\n  margin-top:20px;\n  border-radius: 50px;\n  background: transparent;\n  padding: 10px 50px;\n  border: 2px solid #DC6180;\n  color: #DC6180;\n  text-transform: uppercase;\n  font-size: 11px;\n  transition-property: background,color;\n  transition-duration: .2s;\n}\n a:focus {\n  box-shadow: none;\n  outline: none;\n}\n a:hover {\n  color: white;\n  background: #DC6180;\n  cursor: pointer;\n  transition-property: background,color;\n  transition-duration: .2s;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/announcement/announcement.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class='login'>\n  <div class='login_title'>\n    <span>Post an Announcement</span>\n  </div>\n  <div class='login_fields'>\n    <div class='login_fields__user'>\n      <div class='icon'>\n        <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/user_icon_copy.png'>\n      </div>\n      <input placeholder='Semester-Eg.(4)' type='number' [(ngModel)]=\"announcement.sem\" maxlength=\"1\" required >\n        <div class='validation'>\n          <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/tick.png'>\n        </div>\n    </div>\n    <div class='login_fields__user'>\n      <div class='icon'>\n        <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/lock_icon_copy.png'>\n      </div>\n      <input placeholder='Class-Eg.(I4)' type='text' [(ngModel)]=\"announcement.group\" maxlength=\"2\" required>\n      <div class='validation'>\n        <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/tick.png'>\n      </div>\n    </div>\n    <div class='login_fields__user'>\n      <div class='icon'>\n        <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/lock_icon_copy.png'>\n      </div>\n      <input placeholder='Announcement' type='text' [(ngModel)]=\"announcement.message\" required>\n      <div class='validation'>\n        <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/tick.png'>\n      </div>\n    </div>\n    <div class='login_fields__submit'>\n      <input type='submit' value='Post' (click)=\"post()\">\n      <a routerLink=\"/success\">Go Back</a>\n    </div>\n  </div>\n"

/***/ }),

/***/ "../../../../../src/app/announcement/announcement.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ipu_go_service__ = __webpack_require__("../../../../../src/app/ipu-go.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnnouncementComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AnnouncementComponent = (function () {
    function AnnouncementComponent(ipuService) {
        this.ipuService = ipuService;
        this.announcement = { name: '', sem: '', group: '', message: '' };
    }
    AnnouncementComponent.prototype.ngOnInit = function () {
    };
    AnnouncementComponent.prototype.post = function () {
        var success = false;
        this.ipuService.postAnnouncement(this.announcement).then(function (res) { return alert('Announcement posted successfully'); }, function (err) { return alert('Announcement could not be posted'); });
    };
    return AnnouncementComponent;
}());
AnnouncementComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-announcement',
        template: __webpack_require__("../../../../../src/app/announcement/announcement.component.html"),
        styles: [__webpack_require__("../../../../../src/app/announcement/announcement.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ipu_go_service__["a" /* IpuGoService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ipu_go_service__["a" /* IpuGoService */]) === "function" && _a || Object])
], AnnouncementComponent);

var _a;
//# sourceMappingURL=announcement.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The whole content below can be removed with the new code.-->\n<app-login></app-login>\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__announcement_announcement_component__ = __webpack_require__("../../../../../src/app/announcement/announcement.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__assignment_assignment_component__ = __webpack_require__("../../../../../src/app/assignment/assignment.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ipu_go_service__ = __webpack_require__("../../../../../src/app/ipu-go.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__failure_failure_component__ = __webpack_require__("../../../../../src/app/failure/failure.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__success_success_component__ = __webpack_require__("../../../../../src/app/success/success.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var appRoutes = [
    { path: 'postannouncement', component: __WEBPACK_IMPORTED_MODULE_7__announcement_announcement_component__["a" /* AnnouncementComponent */] },
    { path: 'postassignment', component: __WEBPACK_IMPORTED_MODULE_8__assignment_assignment_component__["a" /* AssignmentComponent */] },
    { path: 'failure', component: __WEBPACK_IMPORTED_MODULE_10__failure_failure_component__["a" /* FailureComponent */] },
    { path: 'success', component: __WEBPACK_IMPORTED_MODULE_11__success_success_component__["a" /* SuccessComponent */] },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_6__login_login_component__["a" /* LoginComponent */] }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_6__login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_7__announcement_announcement_component__["a" /* AnnouncementComponent */],
            __WEBPACK_IMPORTED_MODULE_8__assignment_assignment_component__["a" /* AssignmentComponent */],
            __WEBPACK_IMPORTED_MODULE_10__failure_failure_component__["a" /* FailureComponent */],
            __WEBPACK_IMPORTED_MODULE_11__success_success_component__["a" /* SuccessComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* RouterModule */].forRoot(appRoutes, { enableTracing: true } // <-- debugging purposes only
            ),
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* HttpModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_9__ipu_go_service__["a" /* IpuGoService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/assignment/assignment.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "a{\n  text-decoration: none;\n  display: block;\n  margin-top:20px;\n  border-radius: 50px;\n  background: transparent;\n  padding: 10px 50px;\n  border: 2px solid #DC6180;\n  color: #DC6180;\n  text-transform: uppercase;\n  font-size: 11px;\n  transition-property: background,color;\n  transition-duration: .2s;\n}\n a:focus {\n  box-shadow: none;\n  outline: none;\n}\n a:hover {\n  color: white;\n  background: #DC6180;\n  cursor: pointer;\n  transition-property: background,color;\n  transition-duration: .2s;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/assignment/assignment.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class='login'>\n  <div class='login_title'>\n    <span>Post an assignment</span>\n  </div>\n  <div class='login_fields'>\n    <div class='login_fields__user'>\n      <div class='icon'>\n        <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/user_icon_copy.png'>\n      </div>\n      <input placeholder='Semester - Eg.(4)' type='text'[(ngModel)]=\"assignment.sem\" max=\"8\" required>\n        <div class='validation'>\n          <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/tick.png'>\n        </div>\n    </div>\n    <div class='login_fields__user'>\n      <div class='icon'>\n        <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/lock_icon_copy.png'>\n      </div>\n      <input placeholder='Class - Eg.( I4 )' type='text' [(ngModel)]=\"assignment.group\" maxlength=\"2\" required>\n      <div class='validation'>\n        <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/tick.png'>\n      </div>\n    </div>\n    <div class='login_fields__user'>\n      <div class='icon'>\n        <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/lock_icon_copy.png'>\n      </div>\n      <input placeholder='Subject - Eg.( COA )' type='text' [(ngModel)]=\"assignment.subject\" required>\n      <div class='validation'>\n        <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/tick.png'>\n      </div>\n    </div>\n    <div class='login_fields__user'>\n      <div class='icon'>\n        <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/lock_icon_copy.png'>\n      </div>\n      <input placeholder='Marks - Eg.(20)' type='number' [(ngModel)]=\"assignment.marks\" required>\n      <div class='validation'>\n        <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/tick.png'>\n      </div>\n    </div>\n    <div class='login_fields__user'>\n      <div class='icon'>\n        <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/lock_icon_copy.png'>\n      </div>\n      <input type='date' placeholder=\"Date - Eg. (04/04/2017)\" [(ngModel)]=\"assignment.last\" maxlength=\"10\" required>\n      <div class='validation'>\n        <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/tick.png'>\n      </div>\n    </div>\n    <div class='login_fields__user'>\n      <div class='icon'>\n        <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/lock_icon_copy.png'>\n      </div>\n      <input placeholder='Marks-Eg.(20)' type='file' multiple (change)=\"fileChangeEvent($event)\" placeholder=\"Upload file...\">\n      <div class='validation'>\n        <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/tick.png'>\n      </div>\n    </div>\n    <div class='login_fields__submit'>\n      <input type='submit' value='Post' (click)=\"post()\">\n      <a routerLink=\"/success\">Go Back</a>\n    </div>\n  </div>\n"

/***/ }),

/***/ "../../../../../src/app/assignment/assignment.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ipu_go_service__ = __webpack_require__("../../../../../src/app/ipu-go.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssignmentComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AssignmentComponent = (function () {
    function AssignmentComponent(ipuService) {
        this.ipuService = ipuService;
        this.assignment = { name: '', sem: '', group: '', subject: '', marks: '', last: '', files: [''] };
    }
    AssignmentComponent.prototype.ngOnInit = function () {
    };
    AssignmentComponent.prototype.uploadFile = function (file, signedRequest, url) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    _this.assignment.files.push(url);
                }
                else {
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(file);
    };
    AssignmentComponent.prototype.getSignedRequest = function (file) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "http://ec2-52-66-87-230.ap-south-1.compute.amazonaws.com/assignment/sign-s3?file-name=" + file.name + "&file-type=" + file.type);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    _this.uploadFile(file, response.signedRequest, response.url);
                }
                else {
                    alert('Could not get signed URL.');
                }
            }
        };
        xhr.send();
    };
    AssignmentComponent.prototype.post = function () {
        this.ipuService.postAssignment(this.assignment).then(function (res) {
            return alert('Assignment posted successfully');
        }, function (err) { return alert('Assignment could not be uploaded'); });
    };
    AssignmentComponent.prototype.fileChangeEvent = function (fileInput) {
        if (fileInput.target.files && fileInput.target.files[0]) {
            var files = fileInput.target.files;
            var i = void 0;
            for (i = 0; i < files.length; i++) {
                this.getSignedRequest(files[i]);
            }
            if (i == files.length)
                alert('Image Uploading is now complete');
        }
    };
    return AssignmentComponent;
}());
AssignmentComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-assignment',
        template: __webpack_require__("../../../../../src/app/assignment/assignment.component.html"),
        styles: [__webpack_require__("../../../../../src/app/assignment/assignment.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ipu_go_service__["a" /* IpuGoService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ipu_go_service__["a" /* IpuGoService */]) === "function" && _a || Object])
], AssignmentComponent);

var _a;
//# sourceMappingURL=assignment.component.js.map

/***/ }),

/***/ "../../../../../src/app/failure/failure.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".failure a{\n  text-decoration: none;\n  display: block;\n  border-radius: 50px;\n  background: transparent;\n  padding: 10px 50px;\n  border: 2px solid #DC6180;\n  color: #DC6180;\n  text-transform: uppercase;\n  font-size: 11px;\n  transition-property: background,color;\n  transition-duration: .2s;\n}\n.failure a:focus {\n  box-shadow: none;\n  outline: none;\n}\n.failure a:hover {\n  color: white;\n  background: #DC6180;\n  cursor: pointer;\n  transition-property: background,color;\n  transition-duration: .2s;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/failure/failure.component.html":
/***/ (function(module, exports) {

module.exports = "<div class='login'>\n  <div class='failure'>\n    <h2>Authentication Failed</h2>\n    <p>Please Try Again</p>\n    <a routerLink=\"/\">Log in</a>\n  </div>\n</div>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "../../../../../src/app/failure/failure.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FailureComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FailureComponent = (function () {
    function FailureComponent() {
    }
    FailureComponent.prototype.ngOnInit = function () {
    };
    return FailureComponent;
}());
FailureComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-failure',
        template: __webpack_require__("../../../../../src/app/failure/failure.component.html"),
        styles: [__webpack_require__("../../../../../src/app/failure/failure.component.css")]
    }),
    __metadata("design:paramtypes", [])
], FailureComponent);

//# sourceMappingURL=failure.component.js.map

/***/ }),

/***/ "../../../../../src/app/ipu-go.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IpuGoService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var IpuGoService = (function () {
    function IpuGoService(http) {
        this.http = http;
        this.base = 'http://ec2-52-66-87-230.ap-south-1.compute.amazonaws.com/';
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
    }
    IpuGoService.prototype.setName = function (x) {
        this.name = x;
    };
    IpuGoService.prototype.setToken = function (x) {
        this.token = x;
    };
    IpuGoService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    IpuGoService.prototype.login = function (user) {
        return this.http
            .post(this.base + 'teacher/login', user, { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    IpuGoService.prototype.postAssignment = function (assignment) {
        var _this = this;
        this.headers.append('x-access-token', this.token);
        assignment.name = this.name;
        return this.http
            .post(this.base + 'assignment', assignment, { headers: this.headers })
            .toPromise()
            .then(function (res) { return _this.headers.delete('x-access-token'); })
            .catch(this.handleError);
    };
    IpuGoService.prototype.postAnnouncement = function (announcement) {
        var _this = this;
        this.headers.append('x-access-token', this.token);
        announcement.name = this.name;
        return this.http
            .post(this.base + 'announcement', announcement, { headers: this.headers })
            .toPromise()
            .then(function (res) { return _this.headers.delete('x-access-token'); })
            .catch(this.handleError);
    };
    return IpuGoService;
}());
IpuGoService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], IpuGoService);

var _a;
//# sourceMappingURL=ipu-go.service.js.map

/***/ }),

/***/ "../../../../../src/app/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class='login'>\n  <div class='login_title'>\n    <span>Login to your account</span>\n  </div>\n  <div class='login_fields'>\n    <div class='login_fields__user'>\n      <div class='icon'>\n        <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/user_icon_copy.png'>\n      </div>\n      <input placeholder='Full Name' type='text' [(ngModel)]=\"name\">\n        <div class='validation'>\n          <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/tick.png'>\n        </div>\n    </div>\n    <div class='login_fields__user'>\n      <div class='icon'>\n        <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/user_icon_copy.png'>\n      </div>\n      <input placeholder='Username' type='text' [(ngModel)]=\"teacher.username\">\n        <div class='validation'>\n          <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/tick.png'>\n        </div>\n    </div>\n    <div class='login_fields__password'>\n      <div class='icon'>\n        <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/lock_icon_copy.png'>\n      </div>\n      <input placeholder='Password' type='password' [(ngModel)]=\"teacher.password\">\n      <div class='validation'>\n        <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/tick.png'>\n      </div>\n    </div>\n    <div class='login_fields__submit'>\n      <input type='submit' value='Log In' (click) = 'login()'>\n    </div>\n  </div>\n</div>\n<div class='authent'>\n  <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/puff.svg'>\n  <p>Authenticating...</p>\n</div>  \n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "../../../../../src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ipu_go_service__ = __webpack_require__("../../../../../src/app/ipu-go.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    function LoginComponent(ipuService, router) {
        this.ipuService = ipuService;
        this.router = router;
        this.teacher = { username: '', password: '' };
    }
    LoginComponent.prototype.ngOnInit = function () {
        $('input[type="text"],input[type="password"]').focus(function () {
            $(this).prev().animate({ 'opacity': '1' }, 200);
        });
        $('input[type="text"],input[type="password"]').blur(function () {
            $(this).prev().animate({ 'opacity': '.5' }, 200);
        });
        $('input[type="text"],input[type="password"]').keyup(function () {
            if ($(this).val() != '') {
                $(this).next().animate({ 'opacity': '1', 'right': '30' }, 200);
            }
            else {
                $(this).next().animate({ 'opacity': '0', 'right': '20' }, 200);
            }
        });
        var open = 0;
        $('.tab').click(function () {
            $(this).fadeOut(200, function () {
                $(this).parent().animate({ 'left': '0' });
            });
        });
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        var success = false;
        this.ipuService.setName(this.name);
        this.ipuService.login(this.teacher).then(function (res) { return _this.ipuService.setToken(res.token); }, function (err) {
            setTimeout(function () {
                _this.router.navigate(['/failure']);
            }, 3200);
        });
        $('.login').addClass('test');
        setTimeout(function () {
            $('.login').addClass('testtwo');
        }, 300);
        setTimeout(function () {
            $(".authent").show().animate({ right: -320 }, { easing: 'easeOutQuint', duration: 600, queue: false });
            $(".authent").animate({ opacity: 1 }, { duration: 200, queue: false }).addClass('visible');
        }, 500);
        setTimeout(function () {
            $(".authent").show().animate({ right: 90 }, { easing: 'easeOutQuint', duration: 600, queue: false });
            $(".authent").animate({ opacity: 0 }, { duration: 200, queue: false }).addClass('visible');
            $('.login').removeClass('testtwo');
        }, 2500);
        setTimeout(function () {
            $('.login').removeClass('test');
            $('.login div').fadeOut(123);
        }, 2800);
        setTimeout(function () {
            _this.router.navigate(['/success']);
        }, 3200);
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-login',
        template: __webpack_require__("../../../../../src/app/login/login.component.html"),
        styles: [__webpack_require__("../../../../../src/app/login/login.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ipu_go_service__["a" /* IpuGoService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ipu_go_service__["a" /* IpuGoService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object])
], LoginComponent);

var _a, _b;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/success/success.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".success a{\n  text-decoration: none;\n  display: block;\n  margin-bottom:10px;\n  border-radius: 50px;\n  background: transparent;\n  padding: 10px 50px;\n  border: 2px solid #DC6180;\n  color: #DC6180;\n  text-transform: uppercase;\n  font-size: 11px;\n  transition-property: background,color;\n  transition-duration: .2s;\n}\n.success a:focus {\n  box-shadow: none;\n  outline: none;\n}\n.success a:hover {\n  color: white;\n  background: #DC6180;\n  cursor: pointer;\n  transition-property: background,color;\n  transition-duration: .2s;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/success/success.component.html":
/***/ (function(module, exports) {

module.exports = "<div class='login'>\n  <div class='success'>\n      <h2>Authentication Success</h2>\n      <p>Welcome back</p>\n        <a routerLink=\"/postannouncement\" >Post an Announcement</a>\n        <a routerLink=\"/postassignment\">Post an Assignment</a>\n        <a href=\"\">Check a Result</a>\n        <a routerLink=\"/\">Log out</a>\n    </div>\n</div>\n<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/app/success/success.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SuccessComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SuccessComponent = (function () {
    function SuccessComponent() {
    }
    SuccessComponent.prototype.ngOnInit = function () {
    };
    return SuccessComponent;
}());
SuccessComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-success',
        template: __webpack_require__("../../../../../src/app/success/success.component.html"),
        styles: [__webpack_require__("../../../../../src/app/success/success.component.css")]
    }),
    __metadata("design:paramtypes", [])
], SuccessComponent);

//# sourceMappingURL=success.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map