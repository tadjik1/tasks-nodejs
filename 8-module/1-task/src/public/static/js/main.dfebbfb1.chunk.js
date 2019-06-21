(window.webpackJsonp = window.webpackJsonp || []).push([[0], {111: function(e, t) {}, 119: function(e, t, a) {
  'use strict'; a.r(t); const n = a(0); const r = a.n(n); const o = a(52); const c = a.n(o); const s = a(3); const l = a(7); const i = a(12); Boolean('localhost' === window.location.hostname || '[::1]' === window.location.hostname || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)); const m = a(11); const u = a(54); const b = a(1); const d = a(55); const f = a.n(d).a.create(); const p = Symbol('LoginRequest'); const g = Symbol('LoginFailure'); const h = Symbol('LoginSuccess'); const v = Symbol('RegisterRequest'); const E = Symbol('RegisterFailure'); const k = Symbol('RegisterSuccess'); const y = Symbol('ConfirmRequest'); const j = Symbol('ConfirmFailure'); const O = Symbol('ConfirmSuccess'); const N = Symbol('OAuthRequest'); const S = Symbol('OAuthFailure'); const w = Symbol('OAuthCallbackRequest'); const x = Symbol('OAuthCallbackFailure'); const C = Symbol('OAuthCallbackSuccess'); const F = Symbol('FetchMeRequest'); const A = Symbol('FetchMeSuccess'); const R = Symbol('FetchMeRequest'); const W = Symbol('FetchMessagesRequest'); const q = Symbol('FetchMessagesSuccess'); const M = Symbol('FetchMessagesFailure'); function I() {
    return function(e, t) {
      e({type: W}); const a = t().token; f.get('/api/messages', {headers: {Authorization: 'Bearer '.concat(a)}}).then(function(t) {
        e({type: q, messages: t.data.messages});
      }).catch(function(t) {
        if (401 === t.response.status) return localStorage.removeItem('token'), void window.location.reload(!0); console.error(t.response.data), e({type: M});
      });
    };
  } const T = a(25); const D = a(56); const L = a.n(D); const _ = Symbol('WebsocketConnected'); const B = Symbol('WebsocketDisconnected'); const G = Symbol('NewMessage'); let J = null; Object(s.b)(function(e) {
    return {token: e.token, messages: e.messages, isWebsocketConnected: e.isWebsocketConnected};
  }, function(e) {
    return Object(b.a)({dispatch: e}, Object(m.b)({fetchMessages: I}, e));
  })(function(e) {
    const t = e.token; const a = e.messages; const o = e.isWebsocketConnected; const c = e.dispatch; const s = e.fetchMessages; const l = Object(n.useState)(''); const i = Object(T.a)(l, 2); const m = i[0]; const u = i[1]; return Object(n.useEffect)(function() {
      J = L()('http://localhost:3001?token='.concat(t)), s(), J.on('connect', function() {
        console.log('connect'), c({type: _});
      }), J.on('disconnect', function() {
        console.log('disconnect'), c({type: B});
      }), J.on('system_message', function(e) {
        console.log('system_message', e), c({type: G, message: e});
      }), J.on('user_message', function(e) {
        console.log('user_message', e), c({type: G, message: e});
      });
    }, []), r.a.createElement('main', {className: 'container'}, r.a.createElement('div', {style: {minHeight: '100vh'}, className: 'row justify-content-center'}, r.a.createElement('div', {className: 'col col-md-6', style: {display: 'flex', flexDirection: 'column'}}, r.a.createElement('div', {className: 'my-4', style: {flexGrow: 1}}, a.fetching && r.a.createElement('div', {className: 'spinner-border', role: 'status'}, r.a.createElement('span', {className: 'sr-only'}, 'Loading...')), !a.fetching && 0 === a.list.length && r.a.createElement('p', {className: 'text-muted'}, '\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0439 \u043f\u043e\u043a\u0430 \u043d\u0435\u0442'), a.list.map(function(e) {
      return r.a.createElement('div', {className: 'card'}, r.a.createElement('div', {className: 'card-body'}, r.a.createElement('p', {className: 'card-text'}, e.text), r.a.createElement('p', {className: 'card-text text-muted'}, 'Timothy, 10:29')));
    })), r.a.createElement('form', {onSubmit: function(e) {
      e.preventDefault(), o && m && (J.emit('message', m), u(''));
    }, className: 'form-inline form-row text-center my-4'}, r.a.createElement('input', {type: 'text', value: m, disabled: !o, onChange: function(e) {
      return u(e.target.value);
    }, className: 'form-control col', placeholder: 'message'}), r.a.createElement('button', {disabled: !o, type: 'submit', className: 'btn btn-info'}, 'Send')))));
  }); const V = {token: localStorage.getItem('token') || null, login: {error: null, processing: !1}, registration: {errors: null, processing: !1, complete: !1}, confirmation: {error: null, processing: !1}, oauth: {error: null, processing: !1}, oauthCallback: {error: null, processing: !1}, isWebsocketConnected: !1, messages: {fetching: !1, list: []}, me: {data: {}, fetching: !1}}; const z = Object(m.c)(function() {
    const e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : V; const t = arguments.length > 1 ? arguments[1] : void 0; switch (t.type) {
      case p: return Object(b.a)({}, e, {login: Object(b.a)({}, V.login, {processing: !0})}); case h: return localStorage.setItem('token', t.token), Object(b.a)({}, e, {login: V.login, token: t.token}); case g: return Object(b.a)({}, e, {login: Object(b.a)({}, V.login, {error: t.error, processing: !1})}); case v: return Object(b.a)({}, e, {registration: Object(b.a)({}, V.registration, {processing: !0})}); case k: return Object(b.a)({}, e, {registration: Object(b.a)({}, V.registration, {processing: !1, complete: !0})}); case E: return Object(b.a)({}, e, {registration: Object(b.a)({}, V.registration, {errors: t.errors, processing: !1})}); case y: return Object(b.a)({}, e, {confirmation: Object(b.a)({}, V.confirmation, {processing: !0})}); case O: return localStorage.setItem('token', t.token), Object(b.a)({}, e, {confirmation: V.confirmation, token: t.token}); case j: return Object(b.a)({}, e, {confirmation: Object(b.a)({}, V.confirmation, {error: t.error, processing: !1})}); case N: return Object(b.a)({}, e, {oauth: Object(b.a)({}, V.oauth, {processing: !0})}); case S: return Object(b.a)({}, e, {oauth: Object(b.a)({}, V.oauth, {error: t.error, processing: !1})}); case w: return Object(b.a)({}, e, {oauthCallback: Object(b.a)({}, V.oauthCallback, {processing: !0})}); case x: return Object(b.a)({}, e, {oauthCallback: Object(b.a)({}, V.oauthCallback, {error: t.error, processing: !1})}); case C: return localStorage.setItem('token', t.token), Object(b.a)({}, e, {oauthCallback: V.oauthCallback, token: t.token}); case W: return Object(b.a)({}, e, {messages: Object(b.a)({}, e.messages, {fetching: !0})}); case q: return Object(b.a)({}, e, {messages: Object(b.a)({}, e.messages, {list: t.messages.concat(e.messages), fetching: !1})}); case M: return Object(b.a)({}, e, {messages: Object(b.a)({}, e.messages, {fetching: !1})}); case F: return Object(b.a)({}, e, {me: Object(b.a)({}, e.me, {data: {}, fetching: !0})}); case A: return Object(b.a)({}, e, {me: Object(b.a)({}, e.me, {data: t.data, fetching: !1})}); case R: return Object(b.a)({}, e, {me: Object(b.a)({}, e.me, {data: {}, fetching: !1})}); case _: return Object(b.a)({}, e, {isWebsocketConnected: !0}); case B: return Object(b.a)({}, e, {isWebsocketConnected: !1}); default: return e;
    }
  }, Object(m.a)(u.a)); const H = a(58); function K() {
    return r.a.createElement('main', {className: 'container'}, r.a.createElement('div', {className: 'row login-form justify-content-center align-items-center'}, r.a.createElement('div', {className: 'col col-md-6'}, r.a.createElement('div', {className: 'text-center border border-light p-5'}, r.a.createElement('p', {className: 'h4 mb-4'}, '\u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c')))));
  } const P = Object(s.b)(function(e) {
    return {token: e.token};
  })(function(e) {
    const t = e.token; const a = Object(H.a)(e, ['token']); return r.a.createElement(i.b, Object.assign({}, a, {render: function() {
      return t ? r.a.createElement(K, null) : r.a.createElement(i.a, {to: '/login'});
    }}));
  }); const U = a(24); const $ = {oauthAction: function(e) {
    const t = e.provider; return function(e, a) {
      e({type: N}), f.get('/api/oauth/'.concat(t)).then(function(e) {
        window.location.href = e.data.location;
      }).catch(function(t) {
        e({type: S, error: t.response.data.error});
      });
    };
  }}; const Q = Object(s.b)(function(e) {
    return {oauth: e.oauth};
  }, $)(function(e) {
    e.oauth; const t = e.oauthAction; function a(e) {
      return function() {
        return t({provider: e});
      };
    } return r.a.createElement('div', {className: 'text-center'}, r.a.createElement('p', null, '\u0438\u043b\u0438 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 \u0441\u043e\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0435 \u0441\u0435\u0442\u0438:'), r.a.createElement('button', {className: 'btn btn-link btn-lg text-info mx-2', onClick: a('facebook')}, r.a.createElement('i', {className: 'fab fa-facebook-f'})), r.a.createElement('button', {className: 'btn btn-link btn-lg text-info mx-2', onClick: a('vkontakte')}, r.a.createElement('i', {className: 'fab fa-vk'})), r.a.createElement('button', {className: 'btn btn-link btn-lg text-info mx-2', onClick: a('github')}, r.a.createElement('i', {className: 'fab fa-github'})));
  }); function X(e) {
    const t = Object(n.useState)({}); const a = Object(T.a)(t, 2); const o = a[0]; const c = a[1]; function s(e) {
      c(Object(b.a)({}, o, Object(U.a)({}, e.target.name, e.target.value)));
    } return r.a.createElement('main', {className: 'container'}, r.a.createElement('div', {className: 'row justify-content-center align-items-center'}, r.a.createElement('div', {className: 'col col-md-6'}, r.a.createElement('form', {onSubmit: function(t) {
      return e.onSubmit(t, o);
    }, className: 'text-center border border-light p-5', noValidate: !0}, r.a.createElement('p', {className: 'h4 mb-4'}, e.title), e.error && r.a.createElement('p', {className: 'text-left text-danger'}, e.error), e.fields.map(function(t) {
      let a = 'form-control'; return e.errors && (e.errors[t.name] ? a += ' is-invalid' : a += ' is-valid'), r.a.createElement('div', {className: 'form-row mb-4', key: t.name}, r.a.createElement('input', {value: o[t.name] || '', onChange: s, type: t.type, name: t.name, required: !0, className: a, disabled: e.disabled, placeholder: t.placeholder}), e.errors && e.errors[t.name] && r.a.createElement('div', {className: 'invalid-feedback text-left'}, e.errors[t.name]));
    }), r.a.createElement('button', {disabled: e.disabled, className: 'btn btn-info btn-block my-4', type: 'submit'}, e.button), r.a.createElement(e.Footer, null)), r.a.createElement(Q, null))));
  } const Y = [{type: 'email', name: 'email', placeholder: 'email', icon: 'fa-at'}, {type: 'password', name: 'password', placeholder: '\u043f\u0430\u0440\u043e\u043b\u044c', icon: 'fa-key'}]; const Z = {loginAction: function(e) {
    const t = e.email; const a = e.password; return function(e, n) {
      e({type: p}), f.post('/api/login', {email: t, password: a}).then(function(t) {
        e({type: h, token: t.data.token});
      }).catch(function(t) {
        e({type: g, error: t.response.data.error});
      });
    };
  }}; const ee = Object(s.b)(function(e) {
    return {login: e.login, token: e.token};
  }, Z)(function(e) {
    const t = e.token; const a = e.login; const n = e.loginAction; return t ? r.a.createElement(i.a, {to: '/'}) : r.a.createElement(X, {disabled: a.processing, title: '\u0412\u0445\u043e\u0434', validated: a.errors, error: a.error, onSubmit: function(e, t) {
      e.preventDefault(), a.processing || n(t);
    }, fields: Y, button: '\u0412\u043e\u0439\u0442\u0438', Footer: function() {
      return r.a.createElement('p', null, '\u0415\u0449\u0435 \u043d\u0435\u0442 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430?\xa0', r.a.createElement(l.b, {to: '/register'}, '\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f'));
    }});
  }); const te = {vkontakte: 'VK', fb: 'Facebook', github: 'Github'}; const ae = {oauthCallbackAction: function(e) {
    const t = e.provider; const a = e.code; return function(e, n) {
      e({type: w}), f.post('/api/oauth_callback', {provider: t}, {params: {code: a}}).then(function(t) {
        e({type: C, token: t.data.token});
      }).catch(function(t) {
        e({type: x, error: t.response.data.error});
      });
    };
  }}; const ne = Object(s.b)(function(e) {
    return {oauthCallback: e.oauthCallback, token: e.token};
  }, ae)(function(e) {
    const t = e.token; const a = e.oauthCallback; const o = e.oauthCallbackAction; const c = e.match; const s = e.location; if (t) return r.a.createElement(i.a, {to: '/'}); const m = new URLSearchParams(s.search); const u = c.params.provider; return Object(n.useEffect)(function() {
      m.get('error') || o({code: m.get('code'), provider: u});
    }, []), r.a.createElement('main', {className: 'container'}, r.a.createElement('div', {className: 'row login-form justify-content-center align-items-center'}, r.a.createElement('div', {className: 'col col-md-6'}, r.a.createElement('div', {className: 'text-center border border-light p-5'}, r.a.createElement('p', {className: 'h4 mb-4'}, '\u041b\u043e\u0433\u0438\u043d \u0447\u0435\u0440\u0435\u0437 ', te[u]), a.error || m.get('error') ? r.a.createElement(r.a.Fragment, null, r.a.createElement('p', {className: 'text-danger'}, '\u041f\u0440\u0438 \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438 \u043f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430.'), r.a.createElement('p', {className: 'text-danger'}, a.error || ''), r.a.createElement(l.b, {to: '/'}, '\u0412\u0445\u043e\u0434')) : r.a.createElement(r.a.Fragment, null, r.a.createElement('p', null, '\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u043e\u0434\u043e\u0436\u0434\u0438\u0442\u0435.'), r.a.createElement('div', {className: 'spinner-border', role: 'status'}, r.a.createElement('span', {className: 'sr-only'}, '\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430...')))))));
  }); const re = [{type: 'email', name: 'email', placeholder: 'email', icon: 'fa-at'}, {type: 'text', name: 'displayName', placeholder: '\u0438\u043c\u044f', icon: 'fa-user'}, {type: 'password', name: 'password', placeholder: '\u043f\u0430\u0440\u043e\u043b\u044c', icon: 'fa-key'}]; const oe = {registerAction: function(e) {
    const t = e.email; const a = e.displayName; const n = e.password; return function(e, r) {
      e({type: v}), f.post('/api/register', {email: t, displayName: a, password: n}).then(function(t) {
        e({type: k});
      }).catch(function(t) {
        e({type: E, errors: t.response.data.errors});
      });
    };
  }}; const ce = Object(s.b)(function(e) {
    return {registration: e.registration};
  }, oe)(function(e) {
    const t = e.registration; const a = e.registerAction; return t.complete ? r.a.createElement('main', {className: 'container'}, r.a.createElement('div', {className: 'row login-form justify-content-center align-items-center'}, r.a.createElement('div', {className: 'col col-md-6'}, r.a.createElement('div', {className: 'text-center border border-light p-5'}, r.a.createElement('p', {className: 'h4 mb-4'}, '\u041f\u043e\u0437\u0434\u0440\u0430\u0432\u043b\u044f\u0435\u043c, \u0432\u044b \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u044b!'), r.a.createElement('p', null, '\u041d\u0430 \u0443\u043a\u0430\u0437\u0430\u043d\u043d\u0443\u044e \u0432\u0430\u043c\u0438 \u043f\u043e\u0447\u0442\u0443 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e \u043f\u0438\u0441\u044c\u043c\u043e.'), r.a.createElement('p', null, '\u0414\u043b\u044f \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u0438\u044f \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438, \u043f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u043f\u043e \u0441\u0441\u044b\u043b\u043a\u0435 \u0438\u0437 \u044d\u0442\u043e\u0433\u043e \u043f\u0438\u0441\u044c\u043c\u0430.'))))) : r.a.createElement(X, {disabled: t.processing, title: '\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f', validated: t.errors, errors: t.errors, onSubmit: function(e, n) {
      e.preventDefault(), t.processing || a(n);
    }, fields: re, button: '\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0430\u043a\u043a\u0430\u0443\u043d\u0442', Footer: function() {
      return r.a.createElement('p', null, '\u0423\u0436\u0435 \u0435\u0441\u0442\u044c \u0430\u043a\u043a\u0430\u0443\u043d\u0442?\xa0', r.a.createElement(l.b, {to: '/login'}, '\u0412\u0445\u043e\u0434'));
    }});
  }); const se = {confirmAction: function(e) {
    const t = e.verificationToken; return function(e, a) {
      e({type: y}), f.post('/api/confirm', {verificationToken: t}).then(function(t) {
        e({type: O, token: t.data.token});
      }).catch(function(t) {
        e({type: j, error: t.response.data.error});
      });
    };
  }}; const le = Object(s.b)(function(e) {
    return {confirmation: e.confirmation, token: e.token};
  }, se)(function(e) {
    const t = e.token; const a = e.confirmation; const o = e.confirmAction; const c = e.match; return t ? r.a.createElement(i.a, {to: '/'}) : (Object(n.useEffect)(function() {
      o({verificationToken: c.params.verificationToken});
    }, []), r.a.createElement('main', {className: 'container'}, r.a.createElement('div', {className: 'row login-form justify-content-center align-items-center'}, r.a.createElement('div', {className: 'col col-md-6'}, r.a.createElement('div', {className: 'text-center border border-light p-5'}, r.a.createElement('p', {className: 'h4 mb-4'}, '\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u0435 \u043f\u043e\u0447\u0442\u043e\u0432\u043e\u0433\u043e \u0430\u0434\u0440\u0435\u0441\u0430'), a.error ? r.a.createElement(r.a.Fragment, null, r.a.createElement('p', {className: 'text-danger'}, '\u041f\u0440\u0438 \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438 \u043f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430.'), r.a.createElement('p', {className: 'text-danger'}, a.error), r.a.createElement(l.b, {to: '/'}, '\u0412\u0445\u043e\u0434')) : r.a.createElement(r.a.Fragment, null, r.a.createElement('p', null, '\u041f\u043e\u0447\u0442\u043e\u0432\u044b\u0439 \u0430\u0434\u0440\u0435\u0441 \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u0435\u0442\u0441\u044f, \u043f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u043e\u0434\u043e\u0436\u0434\u0438\u0442\u0435.'), r.a.createElement('div', {className: 'spinner-border', role: 'status'}, r.a.createElement('span', {className: 'sr-only'}, '\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430...'))))))));
  }); c.a.render(r.a.createElement(s.a, {store: z}, r.a.createElement(l.a, null, r.a.createElement(i.b, {exact: !0, path: '/', component: P}), r.a.createElement(i.b, {path: '/login', component: ee}), r.a.createElement(i.b, {path: '/oauth/:provider', component: ne}), r.a.createElement(i.b, {path: '/register', component: ce}), r.a.createElement(i.b, {path: '/confirm/:verificationToken', component: le}))), document.getElementById('root')), 'serviceWorker' in navigator && navigator.serviceWorker.ready.then(function(e) {
    e.unregister();
  });
}, 59: function(e, t, a) {
  e.exports = a(119);
}}, [[59, 1, 2]]]);
// # sourceMappingURL=main.dfebbfb1.chunk.js.map
