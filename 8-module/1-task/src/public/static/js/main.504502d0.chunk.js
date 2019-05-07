(window.webpackJsonp = window.webpackJsonp || []).push([[0], {111: function(e, t) {}, 119: function(e, t, a) {
  'use strict'; a.r(t); const n = a(0); const r = a.n(n); const o = a(52); const c = a.n(o); const s = a(3); const l = a(7); const i = a(12); Boolean('localhost' === window.location.hostname || '[::1]' === window.location.hostname || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)); const m = a(11); const u = a(54); const b = a(1); const d = a(55); const p = a.n(d).a.create(); const f = Symbol('LoginRequest'); const g = Symbol('LoginFailure'); const h = Symbol('LoginSuccess'); const E = Symbol('RegisterRequest'); const v = Symbol('RegisterFailure'); const k = Symbol('RegisterSuccess'); const y = Symbol('ConfirmRequest'); const N = Symbol('ConfirmFailure'); const j = Symbol('ConfirmSuccess'); const O = Symbol('OAuthRequest'); const S = Symbol('OAuthFailure'); const w = Symbol('OAuthCallbackRequest'); const x = Symbol('OAuthCallbackFailure'); const C = Symbol('OAuthCallbackSuccess'); const A = Symbol('FetchMessagesRequest'); const F = Symbol('FetchMessagesSuccess'); function R() {
    return function(e, t) {
      e({type: A}); const a = t().token; p.get('/api/messages', {headers: {Authorization: 'Bearer '.concat(a)}}).then(function(t) {
        e({type: F, messages: t.data.messages});
      }).catch(function(e) {
        console.error(e.response.data);
      });
    };
  } const W = a(25); const q = a(56); const I = a.n(q); const L = Symbol('WebsocketConnected'); const T = Symbol('WebsocketDisconnected'); const D = Symbol('NewMessage'); let M = null; Object(s.b)(function(e) {
    return {token: e.token, messages: e.messages, isWebsocketConnected: e.isWebsocketConnected};
  }, function(e) {
    return Object(b.a)({dispatch: e}, Object(m.b)({fetchMessages: R}, e));
  })(function(e) {
    const t = e.token; const a = e.messages; const o = e.isWebsocketConnected; const c = e.dispatch; const s = e.fetchMessages; const l = Object(n.useState)(''); const i = Object(W.a)(l, 2); const m = i[0]; const u = i[1]; return Object(n.useEffect)(function() {
      M = I()('http://localhost:3001?token='.concat(t)), s(), M.on('connect', function() {
        console.log('connect'), c({type: L});
      }), M.on('disconnect', function() {
        console.log('disconnect'), c({type: T});
      }), M.on('system_message', function(e) {
        console.log('system_message', e), c({type: D, message: e});
      }), M.on('user_message', function(e) {
        console.log('user_message', e), c({type: D, message: e});
      });
    }, []), r.a.createElement('main', {className: 'container'}, r.a.createElement('div', {style: {minHeight: '100vh'}, className: 'row justify-content-center'}, r.a.createElement('div', {className: 'col col-md-6', style: {display: 'flex', flexDirection: 'column'}}, r.a.createElement('div', {className: 'my-4', style: {flexGrow: 1}}, a.fetching && r.a.createElement('div', {className: 'spinner-border', role: 'status'}, r.a.createElement('span', {className: 'sr-only'}, 'Loading...')), !a.fetching && 0 === a.list.length && r.a.createElement('p', {className: 'text-muted'}, '\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0439 \u043f\u043e\u043a\u0430 \u043d\u0435\u0442'), a.list.map(function(e) {
      return r.a.createElement('div', {className: 'card'}, r.a.createElement('div', {className: 'card-body'}, r.a.createElement('p', {className: 'card-text'}, e.text), r.a.createElement('p', {className: 'card-text text-muted'}, 'Timothy, 10:29')));
    })), r.a.createElement('form', {onSubmit: function(e) {
      e.preventDefault(), o && m && (M.emit('message', m), u(''));
    }, className: 'form-inline form-row text-center my-4'}, r.a.createElement('input', {type: 'text', value: m, disabled: !o, onChange: function(e) {
      return u(e.target.value);
    }, className: 'form-control col', placeholder: 'message'}), r.a.createElement('button', {disabled: !o, type: 'submit', className: 'btn btn-info'}, 'Send')))));
  }); const _ = {token: localStorage.getItem('token') || null, login: {error: null, processing: !1}, registration: {errors: null, processing: !1, complete: !1}, confirmation: {error: null, processing: !1}, oauth: {error: null, processing: !1}, oauthCallback: {error: null, processing: !1}, isWebsocketConnected: !1, messages: {fetching: !0, list: []}}; const B = Object(m.c)(function() {
    const e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _; const t = arguments.length > 1 ? arguments[1] : void 0; switch (t.type) {
      case f: return Object(b.a)({}, e, {login: Object(b.a)({}, _.login, {processing: !0})}); case h: return localStorage.setItem('token', t.token), Object(b.a)({}, e, {login: _.login, token: t.token}); case g: return Object(b.a)({}, e, {login: Object(b.a)({}, _.login, {error: t.error, processing: !1})}); case E: return Object(b.a)({}, e, {registration: Object(b.a)({}, _.registration, {processing: !0})}); case k: return Object(b.a)({}, e, {registration: Object(b.a)({}, _.registration, {processing: !1, complete: !0})}); case v: return Object(b.a)({}, e, {registration: Object(b.a)({}, _.registration, {errors: t.errors, processing: !1})}); case y: return Object(b.a)({}, e, {confirmation: Object(b.a)({}, _.confirmation, {processing: !0})}); case j: return localStorage.setItem('token', t.token), Object(b.a)({}, e, {confirmation: _.confirmation, token: t.token}); case N: return Object(b.a)({}, e, {confirmation: Object(b.a)({}, _.confirmation, {error: t.error, processing: !1})}); case O: return Object(b.a)({}, e, {oauth: Object(b.a)({}, _.oauth, {processing: !0})}); case S: return Object(b.a)({}, e, {oauth: Object(b.a)({}, _.oauth, {error: t.error, processing: !1})}); case w: return Object(b.a)({}, e, {oauthCallback: Object(b.a)({}, _.oauthCallback, {processing: !0})}); case x: return Object(b.a)({}, e, {oauthCallback: Object(b.a)({}, _.oauthCallback, {error: t.error, processing: !1})}); case C: return localStorage.setItem('token', t.token), Object(b.a)({}, e, {oauthCallback: _.oauthCallback, token: t.token}); case A: return Object(b.a)({}, e, {messages: Object(b.a)({}, e.messages, {fetching: !0})}); case F: return Object(b.a)({}, e, {messages: Object(b.a)({}, e.messages, {list: t.messages.concat(e.messages), fetching: !1})}); case L: return Object(b.a)({}, e, {isWebsocketConnected: !0}); case T: return Object(b.a)({}, e, {isWebsocketConnected: !1}); default: return e;
    }
  }, Object(m.a)(u.a)); const G = a(58); function J() {
    return r.a.createElement('main', {className: 'container'}, r.a.createElement('div', {className: 'row login-form justify-content-center align-items-center'}, r.a.createElement('div', {className: 'col col-md-6'}, r.a.createElement('div', {className: 'text-center border border-light p-5'}, r.a.createElement('p', {className: 'h4 mb-4'}, '\u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c, \u0432\u044b \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0432\u043e\u0448\u043b\u0438 \u043d\u0430 \u0441\u0430\u0439\u0442')))));
  } const V = Object(s.b)(function(e) {
    return {token: e.token};
  })(function(e) {
    const t = e.token; const a = Object(G.a)(e, ['token']); return r.a.createElement(i.b, Object.assign({}, a, {render: function() {
      return t ? r.a.createElement(J, null) : r.a.createElement(i.a, {to: '/login'});
    }}));
  }); const z = a(24); const H = {oauthAction: function(e) {
    const t = e.provider; return function(e, a) {
      e({type: O}), p.get('/api/oauth/'.concat(t)).then(function(e) {
        window.location.href = e.data.location;
      }).catch(function(t) {
        e({type: S, error: t.response.data.error});
      });
    };
  }}; const K = Object(s.b)(function(e) {
    return {oauth: e.oauth};
  }, H)(function(e) {
    e.oauth; const t = e.oauthAction; function a(e) {
      return function() {
        return t({provider: e});
      };
    } return r.a.createElement('div', {className: 'text-center'}, r.a.createElement('p', null, '\u0438\u043b\u0438 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 \u0441\u043e\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0435 \u0441\u0435\u0442\u0438:'), r.a.createElement('button', {className: 'btn btn-link btn-lg text-info mx-2', onClick: a('facebook')}, r.a.createElement('i', {className: 'fab fa-facebook-f'})), r.a.createElement('button', {className: 'btn btn-link btn-lg text-info mx-2', onClick: a('vkontakte')}, r.a.createElement('i', {className: 'fab fa-vk'})), r.a.createElement('button', {className: 'btn btn-link btn-lg text-info mx-2', onClick: a('github')}, r.a.createElement('i', {className: 'fab fa-github'})));
  }); function P(e) {
    const t = Object(n.useState)({}); const a = Object(W.a)(t, 2); const o = a[0]; const c = a[1]; function s(e) {
      c(Object(b.a)({}, o, Object(z.a)({}, e.target.name, e.target.value)));
    } return r.a.createElement('main', {className: 'container'}, r.a.createElement('div', {className: 'row justify-content-center align-items-center'}, r.a.createElement('div', {className: 'col col-md-6'}, r.a.createElement('form', {onSubmit: function(t) {
      return e.onSubmit(t, o);
    }, className: 'text-center border border-light p-5', noValidate: !0}, r.a.createElement('p', {className: 'h4 mb-4'}, e.title), e.error && r.a.createElement('p', {className: 'text-left text-danger'}, e.error), e.fields.map(function(t) {
      let a = 'form-control'; return e.errors && (e.errors[t.name] ? a += ' is-invalid' : a += ' is-valid'), r.a.createElement('div', {className: 'form-row mb-4'}, r.a.createElement('input', {value: o[t.name] || '', onChange: s, type: t.type, name: t.name, required: !0, className: a, disabled: e.disabled, placeholder: t.placeholder}), e.errors && e.errors[t.name] && r.a.createElement('div', {className: 'invalid-feedback text-left'}, e.errors[t.name]));
    }), r.a.createElement('button', {disabled: e.disabled, className: 'btn btn-info btn-block my-4', type: 'submit'}, e.button), r.a.createElement(e.Footer, null)), r.a.createElement(K, null))));
  } const U = [{type: 'email', name: 'email', placeholder: 'email', icon: 'fa-at'}, {type: 'password', name: 'password', placeholder: '\u043f\u0430\u0440\u043e\u043b\u044c', icon: 'fa-key'}]; const $ = {loginAction: function(e) {
    const t = e.email; const a = e.password; return function(e, n) {
      e({type: f}), p.post('/api/login', {email: t, password: a}).then(function(t) {
        e({type: h, token: t.data.token});
      }).catch(function(t) {
        e({type: g, error: t.response.data.error});
      });
    };
  }}; const Q = Object(s.b)(function(e) {
    return {login: e.login, token: e.token};
  }, $)(function(e) {
    const t = e.token; const a = e.login; const n = e.loginAction; return t ? r.a.createElement(i.a, {to: '/'}) : r.a.createElement(P, {disabled: a.processing, title: '\u0412\u0445\u043e\u0434', validated: a.errors, error: a.error, onSubmit: function(e, t) {
      e.preventDefault(), a.processing || n(t);
    }, fields: U, button: '\u0412\u043e\u0439\u0442\u0438', Footer: function() {
      return r.a.createElement('p', null, '\u0415\u0449\u0435 \u043d\u0435\u0442 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430?\xa0', r.a.createElement(l.b, {to: '/register'}, '\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f'));
    }});
  }); const X = {vkontakte: 'VK', fb: 'Facebook', github: 'Github'}; const Y = {oauthCallbackAction: function(e) {
    const t = e.provider; const a = e.code; return function(e, n) {
      e({type: w}), p.post('/api/oauth_callback', {provider: t}, {params: {code: a}}).then(function(t) {
        e({type: C, token: t.data.token});
      }).catch(function(t) {
        e({type: x, error: t.response.data.error});
      });
    };
  }}; const Z = Object(s.b)(function(e) {
    return {oauthCallback: e.oauthCallback, token: e.token};
  }, Y)(function(e) {
    const t = e.token; const a = e.oauthCallback; const o = e.oauthCallbackAction; const c = e.match; const s = e.location; if (t) return r.a.createElement(i.a, {to: '/'}); const m = new URLSearchParams(s.search); const u = c.params.provider; return Object(n.useEffect)(function() {
      m.get('error') || o({code: m.get('code'), provider: u});
    }, []), r.a.createElement('main', {className: 'container'}, r.a.createElement('div', {className: 'row login-form justify-content-center align-items-center'}, r.a.createElement('div', {className: 'col col-md-6'}, r.a.createElement('div', {className: 'text-center border border-light p-5'}, r.a.createElement('p', {className: 'h4 mb-4'}, '\u041b\u043e\u0433\u0438\u043d \u0447\u0435\u0440\u0435\u0437 ', X[u]), a.error || m.get('error') ? r.a.createElement(r.a.Fragment, null, r.a.createElement('p', {className: 'text-danger'}, '\u041f\u0440\u0438 \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438 \u043f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430.'), r.a.createElement('p', {className: 'text-danger'}, a.error || ''), r.a.createElement(l.b, {to: '/'}, 'Sign In')) : r.a.createElement(r.a.Fragment, null, r.a.createElement('p', null, '\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u043e\u0434\u043e\u0436\u0434\u0438\u0442\u0435.'), r.a.createElement('div', {className: 'spinner-border', role: 'status'}, r.a.createElement('span', {className: 'sr-only'}, 'Loading...')))))));
  }); const ee = [{type: 'email', name: 'email', placeholder: 'email', icon: 'fa-at'}, {type: 'text', name: 'displayName', placeholder: '\u0438\u043c\u044f', icon: 'fa-user'}, {type: 'password', name: 'password', placeholder: '\u043f\u0430\u0440\u043e\u043b\u044c', icon: 'fa-key'}]; const te = {registerAction: function(e) {
    const t = e.email; const a = e.displayName; const n = e.password; return function(e, r) {
      e({type: E}), p.post('/api/register', {email: t, displayName: a, password: n}).then(function(t) {
        e({type: k});
      }).catch(function(t) {
        e({type: v, errors: t.response.data.errors});
      });
    };
  }}; const ae = Object(s.b)(function(e) {
    return {registration: e.registration};
  }, te)(function(e) {
    const t = e.registration; const a = e.registerAction; return t.complete ? r.a.createElement('main', {className: 'container'}, r.a.createElement('div', {className: 'row login-form justify-content-center align-items-center'}, r.a.createElement('div', {className: 'col col-md-6'}, r.a.createElement('div', {className: 'text-center border border-light p-5'}, r.a.createElement('p', {className: 'h4 mb-4'}, '\u041f\u043e\u0437\u0434\u0440\u0430\u0432\u043b\u044f\u0435\u043c, \u0432\u044b \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u044b!'), r.a.createElement('p', null, '\u041d\u0430 \u0443\u043a\u0430\u0437\u0430\u043d\u043d\u0443\u044e \u0432\u0430\u043c\u0438 \u043f\u043e\u0447\u0442\u0443 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e \u043f\u0438\u0441\u044c\u043c\u043e.'), r.a.createElement('p', null, '\u0414\u043b\u044f \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u0438\u044f \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438, \u043f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u043f\u043e \u0441\u0441\u044b\u043b\u043a\u0435 \u0438\u0437 \u044d\u0442\u043e\u0433\u043e \u043f\u0438\u0441\u044c\u043c\u0430.'))))) : r.a.createElement(P, {disabled: t.processing, title: '\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f', validated: t.errors, errors: t.errors, onSubmit: function(e, n) {
      e.preventDefault(), t.processing || a(n);
    }, fields: ee, button: '\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0430\u043a\u043a\u0430\u0443\u043d\u0442', Footer: function() {
      return r.a.createElement('p', null, '\u0423\u0436\u0435 \u0435\u0441\u0442\u044c \u0430\u043a\u043a\u0430\u0443\u043d\u0442?\xa0', r.a.createElement(l.b, {to: '/login'}, '\u0412\u0445\u043e\u0434'));
    }});
  }); const ne = {confirmAction: function(e) {
    const t = e.verificationToken; return function(e, a) {
      e({type: y}), p.post('/api/confirm', {verificationToken: t}).then(function(t) {
        e({type: j, token: t.data.token});
      }).catch(function(t) {
        e({type: N, error: t.response.data.error});
      });
    };
  }}; const re = Object(s.b)(function(e) {
    return {confirmation: e.confirmation, token: e.token};
  }, ne)(function(e) {
    const t = e.token; const a = e.confirmation; const o = e.confirmAction; const c = e.match; return t ? r.a.createElement(i.a, {to: '/'}) : (Object(n.useEffect)(function() {
      o({verificationToken: c.params.verificationToken});
    }, []), r.a.createElement('main', {className: 'container'}, r.a.createElement('div', {className: 'row login-form justify-content-center align-items-center'}, r.a.createElement('div', {className: 'col col-md-6'}, r.a.createElement('div', {className: 'text-center border border-light p-5'}, r.a.createElement('p', {className: 'h4 mb-4'}, '\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u0435 \u043f\u043e\u0447\u0442\u043e\u0432\u043e\u0433\u043e \u0430\u0434\u0440\u0435\u0441\u0430'), a.error ? r.a.createElement(r.a.Fragment, null, r.a.createElement('p', {className: 'text-danger'}, '\u041f\u0440\u0438 \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438 \u043f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430.'), r.a.createElement('p', {className: 'text-danger'}, a.error), r.a.createElement(l.b, {to: '/'}, 'Sign In')) : r.a.createElement(r.a.Fragment, null, r.a.createElement('p', null, '\u041f\u043e\u0447\u0442\u043e\u0432\u044b\u0439 \u0430\u0434\u0440\u0435\u0441 \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u0435\u0442\u0441\u044f, \u043f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u043e\u0434\u043e\u0436\u0434\u0438\u0442\u0435.'), r.a.createElement('div', {className: 'spinner-border', role: 'status'}, r.a.createElement('span', {className: 'sr-only'}, 'Loading...'))))))));
  }); c.a.render(r.a.createElement(s.a, {store: B}, r.a.createElement(l.a, null, r.a.createElement(i.b, {exact: !0, path: '/', component: V}), r.a.createElement(i.b, {path: '/login', component: Q}), r.a.createElement(i.b, {path: '/oauth/:provider', component: Z}), r.a.createElement(i.b, {path: '/register', component: ae}), r.a.createElement(i.b, {path: '/confirm/:verificationToken', component: re}))), document.getElementById('root')), 'serviceWorker' in navigator && navigator.serviceWorker.ready.then(function(e) {
    e.unregister();
  });
}, 59: function(e, t, a) {
  e.exports = a(119);
}}, [[59, 1, 2]]]);
// # sourceMappingURL=main.504502d0.chunk.js.map
