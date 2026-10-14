'use strict';
(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [61157],
  {
    774765: (e) => {
      var r = String.prototype.replace,
        t = /%20/g,
        o = 'RFC3986';
      e.exports = {
        default: o,
        formatters: {
          RFC1738: function (e) {
            return r.call(e, t, '+');
          },
          RFC3986: function (e) {
            return String(e);
          },
        },
        RFC1738: 'RFC1738',
        RFC3986: o,
      };
    },
    755373: (e, r, t) => {
      var o = t(498636),
        n = t(162642),
        i = t(774765);
      e.exports = { formats: i, parse: n, stringify: o };
    },
    162642: (e, r, t) => {
      var o = t(237720),
        n = Object.prototype.hasOwnProperty,
        i = Array.isArray,
        a = {
          allowDots: !1,
          allowEmptyArrays: !1,
          allowPrototypes: !1,
          allowSparse: !1,
          arrayLimit: 20,
          charset: 'utf-8',
          charsetSentinel: !1,
          comma: !1,
          decodeDotInKeys: !1,
          decoder: o.decode,
          delimiter: '&',
          depth: 5,
          duplicates: 'combine',
          ignoreQueryPrefix: !1,
          interpretNumericEntities: !1,
          parameterLimit: 1e3,
          parseArrays: !0,
          plainObjects: !1,
          strictDepth: !1,
          strictMerge: !0,
          strictNullHandling: !1,
          throwOnLimitExceeded: !1,
        },
        l = function (e) {
          return e.replace(/&#(\d+);/g, function (e, r) {
            return String.fromCharCode(parseInt(r, 10));
          });
        },
        c = function (e, r, t) {
          if (e && 'string' == typeof e && r.comma && e.indexOf(',') > -1) {
            if (r.throwOnLimitExceeded)
              for (var o = 0, n = e.indexOf(','); n > -1;) {
                if ((o += 1) >= r.arrayLimit)
                  throw new RangeError(
                    'Array limit exceeded. Only ' +
                      r.arrayLimit +
                      ' element' +
                      (1 === r.arrayLimit ? '' : 's') +
                      ' allowed in an array.',
                  );
                n = e.indexOf(',', n + 1);
              }
            return e.split(',');
          }
          if (r.throwOnLimitExceeded && t >= r.arrayLimit)
            throw new RangeError(
              'Array limit exceeded. Only ' +
                r.arrayLimit +
                ' element' +
                (1 === r.arrayLimit ? '' : 's') +
                ' allowed in an array.',
            );
          return e;
        },
        s = function (e, r, t, i) {
          if (e) {
            var a = (function (e, r) {
              var t = r.allowDots ? e.replace(/\.([^.[]+)/g, '[$1]') : e;
              if (r.depth <= 0) {
                if (!r.plainObjects && n.call(Object.prototype, t) && !r.allowPrototypes) return;
                return [t];
              }
              var o = [],
                i = t.indexOf('['),
                a = i >= 0 ? t.slice(0, i) : t;
              if (a) {
                if (!r.plainObjects && n.call(Object.prototype, a) && !r.allowPrototypes) return;
                o[o.length] = a;
              }
              for (var l = t.length, c = i, s = 0; c >= 0 && s < r.depth;) {
                for (var f = 1, p = c + 1, u = -1; p < l && u < 0;) {
                  var d = t.charCodeAt(p);
                  (91 === d ? (f += 1) : 93 === d && 0 == (f -= 1) && (u = p), (p += 1));
                }
                if (u < 0) return ((o[o.length] = '[' + t.slice(c) + ']'), o);
                var y = t.slice(c, u + 1),
                  m = y.slice(1, -1);
                if (!r.plainObjects && n.call(Object.prototype, m) && !r.allowPrototypes) return;
                ((o[o.length] = y), (s += 1), (c = t.indexOf('[', u + 1)));
              }
              if (c >= 0) {
                if (!0 === r.strictDepth)
                  throw new RangeError(
                    'Input depth exceeded depth option of ' + r.depth + ' and strictDepth is true',
                  );
                o[o.length] = '[' + t.slice(c) + ']';
              }
              return o;
            })(e, t);
            if (a)
              return (function (e, r, t, n) {
                var i = 0;
                if (e.length > 0 && '[]' === e[e.length - 1]) {
                  var a = e.slice(0, -1).join('');
                  i = Array.isArray(r) && r[a] ? r[a].length : 0;
                }
                for (var l = n ? r : c(r, t, i), s = e.length - 1; s >= 0; --s) {
                  var f,
                    p = e[s];
                  if ('[]' === p && t.parseArrays)
                    f = o.isOverflow(l)
                      ? l
                      : t.allowEmptyArrays && ('' === l || (t.strictNullHandling && null === l))
                        ? []
                        : o.combine([], l, t.arrayLimit, t.plainObjects, t.throwOnLimitExceeded);
                  else {
                    f = t.plainObjects ? { __proto__: null } : {};
                    var u =
                        '[' === p.charAt(0) && ']' === p.charAt(p.length - 1) ? p.slice(1, -1) : p,
                      d = t.decodeDotInKeys ? u.replace(/%2E/g, '.') : u,
                      y = parseInt(d, 10),
                      m = !isNaN(y) && p !== d && String(y) === d && y >= 0 && t.parseArrays;
                    if (t.parseArrays || '' !== d)
                      if (m && y < t.arrayLimit) (f = [])[y] = l;
                      else {
                        if (m && t.throwOnLimitExceeded)
                          throw new RangeError(
                            'Array limit exceeded. Only ' +
                              t.arrayLimit +
                              ' element' +
                              (1 === t.arrayLimit ? '' : 's') +
                              ' allowed in an array.',
                          );
                        m ? ((f[y] = l), o.markOverflow(f, y)) : '__proto__' !== d && (f[d] = l);
                      }
                    else f = { 0: l };
                  }
                  l = f;
                }
                return l;
              })(a, r, t, i);
          }
        };
      e.exports = function (e, r) {
        var t = (function (e) {
          if (!e) return a;
          if (void 0 !== e.allowEmptyArrays && 'boolean' != typeof e.allowEmptyArrays)
            throw new TypeError(
              '`allowEmptyArrays` option can only be `true` or `false`, when provided',
            );
          if (void 0 !== e.decodeDotInKeys && 'boolean' != typeof e.decodeDotInKeys)
            throw new TypeError(
              '`decodeDotInKeys` option can only be `true` or `false`, when provided',
            );
          if (null !== e.decoder && void 0 !== e.decoder && 'function' != typeof e.decoder)
            throw new TypeError('Decoder has to be a function.');
          if (void 0 !== e.charset && 'utf-8' !== e.charset && 'iso-8859-1' !== e.charset)
            throw new TypeError(
              'The charset option must be either utf-8, iso-8859-1, or undefined',
            );
          if (void 0 !== e.throwOnLimitExceeded && 'boolean' != typeof e.throwOnLimitExceeded)
            throw new TypeError('`throwOnLimitExceeded` option must be a boolean');
          var r = void 0 === e.charset ? a.charset : e.charset,
            t = void 0 === e.duplicates ? a.duplicates : e.duplicates;
          if ('combine' !== t && 'first' !== t && 'last' !== t)
            throw new TypeError('The duplicates option must be either combine, first, or last');
          return {
            allowDots:
              void 0 === e.allowDots ? !0 === e.decodeDotInKeys || a.allowDots : !!e.allowDots,
            allowEmptyArrays:
              'boolean' == typeof e.allowEmptyArrays ? !!e.allowEmptyArrays : a.allowEmptyArrays,
            allowPrototypes:
              'boolean' == typeof e.allowPrototypes ? e.allowPrototypes : a.allowPrototypes,
            allowSparse: 'boolean' == typeof e.allowSparse ? e.allowSparse : a.allowSparse,
            arrayLimit: 'number' == typeof e.arrayLimit ? e.arrayLimit : a.arrayLimit,
            charset: r,
            charsetSentinel:
              'boolean' == typeof e.charsetSentinel ? e.charsetSentinel : a.charsetSentinel,
            comma: 'boolean' == typeof e.comma ? e.comma : a.comma,
            decodeDotInKeys:
              'boolean' == typeof e.decodeDotInKeys ? e.decodeDotInKeys : a.decodeDotInKeys,
            decoder: 'function' == typeof e.decoder ? e.decoder : a.decoder,
            delimiter:
              'string' == typeof e.delimiter || o.isRegExp(e.delimiter) ? e.delimiter : a.delimiter,
            depth: 'number' == typeof e.depth || !1 === e.depth ? +e.depth : a.depth,
            duplicates: t,
            ignoreQueryPrefix: !0 === e.ignoreQueryPrefix,
            interpretNumericEntities:
              'boolean' == typeof e.interpretNumericEntities
                ? e.interpretNumericEntities
                : a.interpretNumericEntities,
            parameterLimit:
              'number' == typeof e.parameterLimit ? e.parameterLimit : a.parameterLimit,
            parseArrays: !1 !== e.parseArrays,
            plainObjects: 'boolean' == typeof e.plainObjects ? e.plainObjects : a.plainObjects,
            strictDepth: 'boolean' == typeof e.strictDepth ? !!e.strictDepth : a.strictDepth,
            strictMerge: 'boolean' == typeof e.strictMerge ? !!e.strictMerge : a.strictMerge,
            strictNullHandling:
              'boolean' == typeof e.strictNullHandling
                ? e.strictNullHandling
                : a.strictNullHandling,
            throwOnLimitExceeded:
              'boolean' == typeof e.throwOnLimitExceeded && e.throwOnLimitExceeded,
          };
        })(r);
        if ('' === e || null == e) return t.plainObjects ? { __proto__: null } : {};
        for (
          var f =
              'string' == typeof e
                ? (function (e, r) {
                    var t = { __proto__: null },
                      s = r.ignoreQueryPrefix ? e.replace(/^\?/, '') : e;
                    s = s.replace(/%5B/gi, '[').replace(/%5D/gi, ']');
                    var f = r.parameterLimit === 1 / 0 ? void 0 : r.parameterLimit,
                      p = s.split(r.delimiter, r.throwOnLimitExceeded && void 0 !== f ? f + 1 : f);
                    if (r.throwOnLimitExceeded && void 0 !== f && p.length > f)
                      throw new RangeError(
                        'Parameter limit exceeded. Only ' +
                          f +
                          ' parameter' +
                          (1 === f ? '' : 's') +
                          ' allowed.',
                      );
                    var u,
                      d = -1,
                      y = r.charset;
                    if (r.charsetSentinel)
                      for (u = 0; u < p.length; ++u)
                        0 === p[u].indexOf('utf8=') &&
                          ('utf8=%E2%9C%93' === p[u]
                            ? (y = 'utf-8')
                            : 'utf8=%26%2310003%3B' === p[u] && (y = 'iso-8859-1'),
                          (d = u),
                          (u = p.length));
                    for (u = 0; u < p.length; ++u)
                      if (u !== d) {
                        var m,
                          h,
                          g = p[u],
                          b = g.indexOf(']='),
                          w = -1 === b ? g.indexOf('=') : b + 1;
                        if (
                          (-1 === w
                            ? ((m = r.decoder(g, a.decoder, y, 'key')),
                              (h = r.strictNullHandling ? null : ''))
                            : null !== (m = r.decoder(g.slice(0, w), a.decoder, y, 'key')) &&
                              (h = o.maybeMap(
                                c(g.slice(w + 1), r, i(t[m]) ? t[m].length : 0),
                                function (e) {
                                  return r.decoder(e, a.decoder, y, 'value');
                                },
                              )),
                          h &&
                            r.interpretNumericEntities &&
                            'iso-8859-1' === y &&
                            (h = l(String(h))),
                          g.indexOf('[]=') > -1 && (h = i(h) ? [h] : h),
                          r.comma &&
                            i(h) &&
                            h.length > r.arrayLimit &&
                            (h = o.combine(
                              [],
                              h,
                              r.arrayLimit,
                              r.plainObjects,
                              r.throwOnLimitExceeded,
                            )),
                          null !== m)
                        ) {
                          var v = n.call(t, m);
                          v && ('combine' === r.duplicates || g.indexOf('[]=') > -1)
                            ? (t[m] = o.combine(
                                t[m],
                                h,
                                r.arrayLimit,
                                r.plainObjects,
                                r.throwOnLimitExceeded,
                              ))
                            : (v && 'last' !== r.duplicates) || (t[m] = h);
                        }
                      }
                    return t;
                  })(e, t)
                : e,
            p = t.plainObjects ? { __proto__: null } : {},
            u = Object.keys(f),
            d = 0;
          d < u.length;
          ++d
        ) {
          var y = u[d],
            m = s(y, f[y], t, 'string' == typeof e);
          p = o.merge(p, m, t);
        }
        return !0 === t.allowSparse ? p : o.compact(p);
      };
    },
    498636: (e, r, t) => {
      var o = t(200920),
        n = t(237720),
        i = t(774765),
        a = Object.prototype.hasOwnProperty,
        l = {
          brackets: function (e) {
            return e + '[]';
          },
          comma: 'comma',
          indices: function (e, r) {
            return e + '[' + r + ']';
          },
          repeat: function (e) {
            return e;
          },
        },
        c = Array.isArray,
        s = Array.prototype.push,
        f = function (e, r) {
          s.apply(e, c(r) ? r : [r]);
        },
        p = Date.prototype.toISOString,
        u = i.default,
        d = {
          addQueryPrefix: !1,
          allowDots: !1,
          allowEmptyArrays: !1,
          arrayFormat: 'indices',
          charset: 'utf-8',
          charsetSentinel: !1,
          commaRoundTrip: !1,
          delimiter: '&',
          depth: 1 / 0,
          encode: !0,
          encodeDotInKeys: !1,
          encoder: n.encode,
          encodeValuesOnly: !1,
          filter: void 0,
          format: u,
          formatter: i.formatters[u],
          indices: !1,
          serializeDate: function (e) {
            return p.call(e);
          },
          skipNulls: !1,
          strictNullHandling: !1,
        },
        y = {},
        m = function e(r, t, i, a, l, s, p, u, m, h, g, b, w, v, O, j, E, x, L, A) {
          var D = r;
          if (A > L) throw new RangeError('Input depth exceeded depth option of ' + L);
          for (var S, k = x, N = 0, I = !1; void 0 !== (k = k.get(y)) && !I;) {
            var _ = k.get(r);
            if (((N += 1), void 0 !== _)) {
              if (_ === N) throw new RangeError('Cyclic object value');
              I = !0;
            }
            void 0 === k.get(y) && (N = 0);
          }
          if (
            ((D = 'function' == typeof h ? h(t, D) : D) instanceof Date
              ? (D = w(D))
              : 'comma' === i &&
                c(D) &&
                (D = n.maybeMap(D, function (e) {
                  return e instanceof Date ? w(e) : e;
                })),
            null === D)
          ) {
            if (s) return O(m && !j ? m(t, d.encoder, E, 'key', v) : t);
            D = '';
          }
          if (
            'string' == typeof (S = D) ||
            'number' == typeof S ||
            'boolean' == typeof S ||
            'symbol' == typeof S ||
            'bigint' == typeof S ||
            n.isBuffer(D)
          )
            return m
              ? [O(j ? t : m(t, d.encoder, E, 'key', v)) + '=' + O(m(D, d.encoder, E, 'value', v))]
              : [O(t) + '=' + O(String(D))];
          var R,
            F = [];
          if (void 0 === D) return F;
          if ('comma' === i && c(D))
            (j &&
              m &&
              (D = n.maybeMap(D, function (e) {
                return null == e ? e : m(e);
              })),
              (R = [{ value: D.length > 0 ? D.join(',') || null : void 0 }]));
          else if (c(h)) R = h;
          else {
            var C = Object.keys(D);
            R = g ? C.sort(g) : C;
          }
          var T = u ? String(t).replace(/\./g, '%2E') : String(t),
            P = a && c(D) && 1 === D.length ? T + '[]' : T;
          if (l && c(D) && 0 === D.length && 0 === Object.keys(D).length) return P + '[]';
          for (var K = 0; K < R.length; ++K) {
            var H = R[K],
              B = 'object' == typeof H && H && void 0 !== H.value ? H.value : D[H];
            if (!p || null !== B) {
              var M = b && u ? String(H).replace(/\./g, '%2E') : String(H),
                Q = c(D)
                  ? 'function' == typeof i
                    ? i(P, M)
                    : P
                  : P + (b ? '.' + M : '[' + M + ']');
              x.set(r, N);
              var $ = o();
              ($.set(y, x),
                f(
                  F,
                  e(
                    B,
                    Q,
                    i,
                    a,
                    l,
                    s,
                    p,
                    u,
                    'comma' === i && j && c(D) ? null : m,
                    h,
                    g,
                    b,
                    w,
                    v,
                    O,
                    j,
                    E,
                    $,
                    L,
                    A + 1,
                  ),
                ));
            }
          }
          return F;
        };
      e.exports = function (e, r) {
        var t,
          n = e,
          s = (function (e) {
            if (!e) return d;
            if (void 0 !== e.allowEmptyArrays && 'boolean' != typeof e.allowEmptyArrays)
              throw new TypeError(
                '`allowEmptyArrays` option can only be `true` or `false`, when provided',
              );
            if (void 0 !== e.encodeDotInKeys && 'boolean' != typeof e.encodeDotInKeys)
              throw new TypeError(
                '`encodeDotInKeys` option can only be `true` or `false`, when provided',
              );
            if (null !== e.encoder && void 0 !== e.encoder && 'function' != typeof e.encoder)
              throw new TypeError('Encoder has to be a function.');
            var r = e.charset || d.charset;
            if (void 0 !== e.charset && 'utf-8' !== e.charset && 'iso-8859-1' !== e.charset)
              throw new TypeError(
                'The charset option must be either utf-8, iso-8859-1, or undefined',
              );
            var t = i.default;
            if (void 0 !== e.format) {
              if (!a.call(i.formatters, e.format))
                throw new TypeError('Unknown format option provided.');
              t = e.format;
            }
            var o,
              n = i.formatters[t],
              s = d.filter;
            if (
              (('function' == typeof e.filter || c(e.filter)) && (s = e.filter),
              (o =
                e.arrayFormat in l
                  ? e.arrayFormat
                  : 'indices' in e
                    ? e.indices
                      ? 'indices'
                      : 'repeat'
                    : d.arrayFormat),
              'commaRoundTrip' in e && 'boolean' != typeof e.commaRoundTrip)
            )
              throw new TypeError('`commaRoundTrip` must be a boolean, or absent');
            var f =
              void 0 === e.allowDots ? !0 === e.encodeDotInKeys || d.allowDots : !!e.allowDots;
            return {
              addQueryPrefix:
                'boolean' == typeof e.addQueryPrefix ? e.addQueryPrefix : d.addQueryPrefix,
              allowDots: f,
              allowEmptyArrays:
                'boolean' == typeof e.allowEmptyArrays ? !!e.allowEmptyArrays : d.allowEmptyArrays,
              arrayFormat: o,
              charset: r,
              charsetSentinel:
                'boolean' == typeof e.charsetSentinel ? e.charsetSentinel : d.charsetSentinel,
              commaRoundTrip: !!e.commaRoundTrip,
              delimiter: void 0 === e.delimiter ? d.delimiter : e.delimiter,
              depth: 'number' == typeof e.depth ? e.depth : d.depth,
              encode: 'boolean' == typeof e.encode ? e.encode : d.encode,
              encodeDotInKeys:
                'boolean' == typeof e.encodeDotInKeys ? e.encodeDotInKeys : d.encodeDotInKeys,
              encoder: 'function' == typeof e.encoder ? e.encoder : d.encoder,
              encodeValuesOnly:
                'boolean' == typeof e.encodeValuesOnly ? e.encodeValuesOnly : d.encodeValuesOnly,
              filter: s,
              format: t,
              formatter: n,
              serializeDate:
                'function' == typeof e.serializeDate ? e.serializeDate : d.serializeDate,
              skipNulls: 'boolean' == typeof e.skipNulls ? e.skipNulls : d.skipNulls,
              sort: 'function' == typeof e.sort ? e.sort : null,
              strictNullHandling:
                'boolean' == typeof e.strictNullHandling
                  ? e.strictNullHandling
                  : d.strictNullHandling,
            };
          })(r);
        'function' == typeof s.filter ? (n = (0, s.filter)('', n)) : c(s.filter) && (t = s.filter);
        var p = [];
        if ('object' != typeof n || null === n) return '';
        var u = l[s.arrayFormat],
          y = 'comma' === u && s.commaRoundTrip;
        (t || (t = Object.keys(n)), s.sort && t.sort(s.sort));
        for (var h = o(), g = 0; g < t.length; ++g) {
          var b = t[g];
          if (null != b) {
            var w = n[b];
            if (!s.skipNulls || null !== w) {
              var v = s.encodeDotInKeys ? String(b).replace(/\./g, '%2E') : String(b);
              f(
                p,
                m(
                  w,
                  v,
                  u,
                  y,
                  s.allowEmptyArrays,
                  s.strictNullHandling,
                  s.skipNulls,
                  s.encodeDotInKeys,
                  s.encode ? s.encoder : null,
                  s.filter,
                  s.sort,
                  s.allowDots,
                  s.serializeDate,
                  s.format,
                  s.formatter,
                  s.encodeValuesOnly,
                  s.charset,
                  h,
                  s.depth,
                  0,
                ),
              );
            }
          }
        }
        var O = p.join(s.delimiter),
          j = !0 === s.addQueryPrefix ? '?' : '';
        return (
          s.charsetSentinel &&
            ('iso-8859-1' === s.charset
              ? (j += 'utf8=%26%2310003%3B' + s.delimiter)
              : (j += 'utf8=%E2%9C%93' + s.delimiter)),
          O.length > 0 ? j + O : ''
        );
      };
    },
    237720: (e, r, t) => {
      var o = t(774765),
        n = t(200920),
        i = t(730655),
        a = Object.prototype.hasOwnProperty,
        l = Array.isArray,
        c = n(),
        s = function (e, r) {
          return (c.set(e, r), e);
        },
        f = function (e) {
          return c.has(e);
        },
        p = function (e) {
          return c.get(e);
        },
        u = function (e, r) {
          c.set(e, r);
        },
        d = (function () {
          for (var e = [], r = 0; r < 256; ++r)
            e[e.length] = '%' + ((r < 16 ? '0' : '') + r.toString(16)).toUpperCase();
          return e;
        })(),
        y = function (e, r) {
          for (var t = r && r.plainObjects ? { __proto__: null } : {}, o = 0; o < e.length; ++o)
            void 0 !== e[o] && (t[o] = e[o]);
          return t;
        },
        m = function (e, r, t) {
          '__proto__' === r && i
            ? i(e, r, { configurable: !0, enumerable: !0, value: t, writable: !0 })
            : (e[r] = t);
        },
        h = 1024;
      e.exports = {
        arrayToObject: y,
        assign: function (e, r) {
          return Object.keys(r).reduce(function (e, t) {
            return (m(e, t, r[t]), e);
          }, e);
        },
        combine: function (e, r, t, o, n) {
          if (f(e)) {
            if (n)
              throw new RangeError(
                'Array limit exceeded. Only ' +
                  t +
                  ' element' +
                  (1 === t ? '' : 's') +
                  ' allowed in an array.',
              );
            for (var i = l(r) ? r : [r], a = p(e), c = 0; c < i.length; ++c) e[(a += 1)] = i[c];
            return (u(e, a), e);
          }
          var d = [].concat(e, r);
          if (d.length > t) {
            if (n)
              throw new RangeError(
                'Array limit exceeded. Only ' +
                  t +
                  ' element' +
                  (1 === t ? '' : 's') +
                  ' allowed in an array.',
              );
            return s(y(d, { plainObjects: o }), d.length - 1);
          }
          return d;
        },
        compact: function (e) {
          for (var r = [{ obj: { o: e }, prop: 'o' }], t = n(), o = 0; o < r.length; ++o)
            for (var i = r[o], a = i.obj[i.prop], c = Object.keys(a), s = 0; s < c.length; ++s) {
              var f = c[s],
                p = a[f];
              'object' != typeof p ||
                null === p ||
                t.has(p) ||
                ((r[r.length] = { obj: a, prop: f }), t.set(p, !0));
            }
          return (
            (function (e) {
              for (; e.length > 1;) {
                var r = e.pop(),
                  t = r.obj[r.prop];
                if (l(t)) {
                  for (var o = [], n = 0; n < t.length; ++n)
                    void 0 !== t[n] && (o[o.length] = t[n]);
                  r.obj[r.prop] = o;
                }
              }
            })(r),
            e
          );
        },
        decode: function (e, r, t) {
          var o = e.replace(/\+/g, ' ');
          if ('iso-8859-1' === t) return o.replace(/%[0-9a-f]{2}/gi, unescape);
          try {
            return decodeURIComponent(o);
          } catch (e) {
            return o;
          }
        },
        encode: function (e, r, t, n, i) {
          if (0 === e.length) return e;
          var a = e;
          if (
            ('symbol' == typeof e
              ? (a = Symbol.prototype.toString.call(e))
              : 'string' != typeof e && (a = String(e)),
            'iso-8859-1' === t)
          )
            return escape(a).replace(/%u[0-9a-f]{4}/gi, function (e) {
              return '%26%23' + parseInt(e.slice(2), 16) + '%3B';
            });
          for (var l = '', c = 0; c < a.length; c += h) {
            var s = a.length >= h ? a.slice(c, c + h) : a;
            if (c + h < a.length) {
              var f = s.charCodeAt(s.length - 1);
              f >= 55296 && f <= 56319 && ((s = s.slice(0, -1)), (c -= 1));
            }
            for (var p = [], u = 0; u < s.length; ++u) {
              var y = s.charCodeAt(u);
              45 === y ||
              46 === y ||
              95 === y ||
              126 === y ||
              (y >= 48 && y <= 57) ||
              (y >= 65 && y <= 90) ||
              (y >= 97 && y <= 122) ||
              (i === o.RFC1738 && (40 === y || 41 === y))
                ? (p[p.length] = s.charAt(u))
                : y < 128
                  ? (p[p.length] = d[y])
                  : y < 2048
                    ? (p[p.length] = d[192 | (y >> 6)] + d[128 | (63 & y)])
                    : y < 55296 || y >= 57344
                      ? (p[p.length] =
                          d[224 | (y >> 12)] + d[128 | ((y >> 6) & 63)] + d[128 | (63 & y)])
                      : ((u += 1),
                        (y = 65536 + (((1023 & y) << 10) | (1023 & s.charCodeAt(u)))),
                        (p[p.length] =
                          d[240 | (y >> 18)] +
                          d[128 | ((y >> 12) & 63)] +
                          d[128 | ((y >> 6) & 63)] +
                          d[128 | (63 & y)]));
            }
            l += p.join('');
          }
          return l;
        },
        isBuffer: function (e) {
          return !(
            !e ||
            'object' != typeof e ||
            !e.constructor ||
            'function' != typeof e.constructor.isBuffer ||
            !e.constructor.isBuffer(e)
          );
        },
        isOverflow: f,
        isRegExp: function (e) {
          return '[object RegExp]' === Object.prototype.toString.call(e);
        },
        markOverflow: s,
        maybeMap: function (e, r) {
          if (l(e)) {
            for (var t = [], o = 0; o < e.length; o += 1) t[t.length] = r(e[o]);
            return t;
          }
          return r(e);
        },
        merge: function e(r, t, o) {
          if (!t) return r;
          if ('object' != typeof t && 'function' != typeof t) {
            if (l(r)) {
              var n = r.length;
              if (o && 'number' == typeof o.arrayLimit && n >= o.arrayLimit) {
                if (o.throwOnLimitExceeded)
                  throw new RangeError(
                    'Array limit exceeded. Only ' +
                      o.arrayLimit +
                      ' element' +
                      (1 === o.arrayLimit ? '' : 's') +
                      ' allowed in an array.',
                  );
                return s(y(r.concat(t), o), n);
              }
              r[n] = t;
            } else {
              if (!r || 'object' != typeof r) return [r, t];
              if (f(r)) {
                var i = p(r) + 1;
                ((r[i] = t), u(r, i));
              } else {
                if (o && o.strictMerge) return [r, t];
                ((o && (o.plainObjects || o.allowPrototypes)) || !a.call(Object.prototype, t)) &&
                  (r[t] = !0);
              }
            }
            return r;
          }
          if (!r || 'object' != typeof r) {
            if (f(t)) {
              for (
                var c = Object.keys(t),
                  d = o && o.plainObjects ? { __proto__: null, 0: r } : { 0: r },
                  h = 0;
                h < c.length;
                h++
              )
                d[parseInt(c[h], 10) + 1] = t[c[h]];
              return s(d, p(t) + 1);
            }
            var g = [r].concat(t);
            if (o && 'number' == typeof o.arrayLimit && g.length > o.arrayLimit) {
              if (o.throwOnLimitExceeded)
                throw new RangeError(
                  'Array limit exceeded. Only ' +
                    o.arrayLimit +
                    ' element' +
                    (1 === o.arrayLimit ? '' : 's') +
                    ' allowed in an array.',
                );
              return s(y(g, o), g.length - 1);
            }
            return g;
          }
          var b = r;
          if ((l(r) && !l(t) && (b = y(r, o)), l(r) && l(t))) {
            if (
              (t.forEach(function (t, n) {
                if (a.call(r, n)) {
                  var i = r[n];
                  i && 'object' == typeof i && t && 'object' == typeof t
                    ? (r[n] = e(i, t, o))
                    : (r[r.length] = t);
                } else r[n] = t;
              }),
              o && 'number' == typeof o.arrayLimit && r.length > o.arrayLimit)
            ) {
              if (o.throwOnLimitExceeded)
                throw new RangeError(
                  'Array limit exceeded. Only ' +
                    o.arrayLimit +
                    ' element' +
                    (1 === o.arrayLimit ? '' : 's') +
                    ' allowed in an array.',
                );
              return s(y(r, o), r.length - 1);
            }
            return r;
          }
          return Object.keys(t).reduce(function (r, n) {
            var i = t[n];
            if (
              (a.call(r, n) ? m(r, n, e(r[n], i, o)) : m(r, n, i),
              f(t) && !f(r) && s(r, p(t)),
              f(r))
            ) {
              var l = parseInt(n, 10);
              String(l) === n && l >= 0 && l > p(r) && u(r, l);
            }
            return r;
          }, b);
        },
      };
    },
    686663: (e, r, t) => {
      const o = t(224280),
        n = t(530454),
        i = t(300528),
        a = t(473055);
      function l(e) {
        if ('string' != typeof e || 1 !== e.length)
          throw new TypeError('arrayFormatSeparator must be single character string');
      }
      function c(e, r) {
        return r.encode ? (r.strict ? o(e) : encodeURIComponent(e)) : e;
      }
      function s(e, r) {
        return r.decode ? n(e) : e;
      }
      function f(e) {
        return Array.isArray(e)
          ? e.sort()
          : 'object' == typeof e
            ? f(Object.keys(e))
                .sort((e, r) => Number(e) - Number(r))
                .map((r) => e[r])
            : e;
      }
      function p(e) {
        const r = e.indexOf('#');
        return (-1 !== r && (e = e.slice(0, r)), e);
      }
      function u(e) {
        const r = (e = p(e)).indexOf('?');
        return -1 === r ? '' : e.slice(r + 1);
      }
      function d(e, r) {
        return (
          r.parseNumbers && !Number.isNaN(Number(e)) && 'string' == typeof e && '' !== e.trim()
            ? (e = Number(e))
            : !r.parseBooleans ||
              null === e ||
              ('true' !== e.toLowerCase() && 'false' !== e.toLowerCase()) ||
              (e = 'true' === e.toLowerCase()),
          e
        );
      }
      function y(e, r) {
        l(
          (r = Object.assign(
            {
              decode: !0,
              sort: !0,
              arrayFormat: 'none',
              arrayFormatSeparator: ',',
              parseNumbers: !1,
              parseBooleans: !1,
            },
            r,
          )).arrayFormatSeparator,
        );
        const t = (function (e) {
            let r;
            switch (e.arrayFormat) {
              case 'index':
                return (e, t, o) => {
                  ((r = /\[(\d*)\]$/.exec(e)),
                    (e = e.replace(/\[\d*\]$/, '')),
                    r ? (void 0 === o[e] && (o[e] = {}), (o[e][r[1]] = t)) : (o[e] = t));
                };
              case 'bracket':
                return (e, t, o) => {
                  ((r = /(\[\])$/.exec(e)),
                    (e = e.replace(/\[\]$/, '')),
                    r
                      ? void 0 !== o[e]
                        ? (o[e] = [].concat(o[e], t))
                        : (o[e] = [t])
                      : (o[e] = t));
                };
              case 'comma':
              case 'separator':
                return (r, t, o) => {
                  const n = 'string' == typeof t && t.includes(e.arrayFormatSeparator),
                    i = 'string' == typeof t && !n && s(t, e).includes(e.arrayFormatSeparator);
                  t = i ? s(t, e) : t;
                  const a =
                    n || i
                      ? t.split(e.arrayFormatSeparator).map((r) => s(r, e))
                      : null === t
                        ? t
                        : s(t, e);
                  o[r] = a;
                };
              default:
                return (e, r, t) => {
                  void 0 !== t[e] ? (t[e] = [].concat(t[e], r)) : (t[e] = r);
                };
            }
          })(r),
          o = Object.create(null);
        if ('string' != typeof e) return o;
        if (!(e = e.trim().replace(/^[?#&]/, ''))) return o;
        for (const n of e.split('&')) {
          if ('' === n) continue;
          let [e, a] = i(r.decode ? n.replace(/\+/g, ' ') : n, '=');
          ((a = void 0 === a ? null : ['comma', 'separator'].includes(r.arrayFormat) ? a : s(a, r)),
            t(s(e, r), a, o));
        }
        for (const e of Object.keys(o)) {
          const t = o[e];
          if ('object' == typeof t && null !== t) for (const e of Object.keys(t)) t[e] = d(t[e], r);
          else o[e] = d(t, r);
        }
        return !1 === r.sort
          ? o
          : (!0 === r.sort ? Object.keys(o).sort() : Object.keys(o).sort(r.sort)).reduce((e, r) => {
              const t = o[r];
              return (
                Boolean(t) && 'object' == typeof t && !Array.isArray(t)
                  ? (e[r] = f(t))
                  : (e[r] = t),
                e
              );
            }, Object.create(null));
      }
      ((r.extract = u),
        (r.parse = y),
        (r.stringify = (e, r) => {
          if (!e) return '';
          l(
            (r = Object.assign(
              { encode: !0, strict: !0, arrayFormat: 'none', arrayFormatSeparator: ',' },
              r,
            )).arrayFormatSeparator,
          );
          const t = (t) => (r.skipNull && null == e[t]) || (r.skipEmptyString && '' === e[t]),
            o = (function (e) {
              switch (e.arrayFormat) {
                case 'index':
                  return (r) => (t, o) => {
                    const n = t.length;
                    return void 0 === o ||
                      (e.skipNull && null === o) ||
                      (e.skipEmptyString && '' === o)
                      ? t
                      : null === o
                        ? [...t, [c(r, e), '[', n, ']'].join('')]
                        : [...t, [c(r, e), '[', c(n, e), ']=', c(o, e)].join('')];
                  };
                case 'bracket':
                  return (r) => (t, o) =>
                    void 0 === o || (e.skipNull && null === o) || (e.skipEmptyString && '' === o)
                      ? t
                      : null === o
                        ? [...t, [c(r, e), '[]'].join('')]
                        : [...t, [c(r, e), '[]=', c(o, e)].join('')];
                case 'comma':
                case 'separator':
                  return (r) => (t, o) =>
                    null == o || 0 === o.length
                      ? t
                      : 0 === t.length
                        ? [[c(r, e), '=', c(o, e)].join('')]
                        : [[t, c(o, e)].join(e.arrayFormatSeparator)];
                default:
                  return (r) => (t, o) =>
                    void 0 === o || (e.skipNull && null === o) || (e.skipEmptyString && '' === o)
                      ? t
                      : null === o
                        ? [...t, c(r, e)]
                        : [...t, [c(r, e), '=', c(o, e)].join('')];
              }
            })(r),
            n = {};
          for (const r of Object.keys(e)) t(r) || (n[r] = e[r]);
          const i = Object.keys(n);
          return (
            !1 !== r.sort && i.sort(r.sort),
            i
              .map((t) => {
                const n = e[t];
                return void 0 === n
                  ? ''
                  : null === n
                    ? c(t, r)
                    : Array.isArray(n)
                      ? n.reduce(o(t), []).join('&')
                      : c(t, r) + '=' + c(n, r);
              })
              .filter((e) => e.length > 0)
              .join('&')
          );
        }),
        (r.parseUrl = (e, r) => {
          r = Object.assign({ decode: !0 }, r);
          const [t, o] = i(e, '#');
          return Object.assign(
            { url: t.split('?')[0] || '', query: y(u(e), r) },
            r && r.parseFragmentIdentifier && o ? { fragmentIdentifier: s(o, r) } : {},
          );
        }),
        (r.stringifyUrl = (e, t) => {
          t = Object.assign({ encode: !0, strict: !0 }, t);
          const o = p(e.url).split('?')[0] || '',
            n = r.extract(e.url),
            i = r.parse(n, { sort: !1 }),
            a = Object.assign(i, e.query);
          let l = r.stringify(a, t);
          l && (l = `?${l}`);
          let s = (function (e) {
            let r = '';
            const t = e.indexOf('#');
            return (-1 !== t && (r = e.slice(t)), r);
          })(e.url);
          return (e.fragmentIdentifier && (s = `#${c(e.fragmentIdentifier, t)}`), `${o}${l}${s}`);
        }),
        (r.pick = (e, t, o) => {
          o = Object.assign({ parseFragmentIdentifier: !0 }, o);
          const { url: n, query: i, fragmentIdentifier: l } = r.parseUrl(e, o);
          return r.stringifyUrl({ url: n, query: a(i, t), fragmentIdentifier: l }, o);
        }),
        (r.exclude = (e, t, o) => {
          const n = Array.isArray(t) ? (e) => !t.includes(e) : (e, r) => !t(e, r);
          return r.pick(e, n, o);
        }));
    },
  },
]);
