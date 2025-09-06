import { a as s } from "./chunk-M2JW2GFW.js";
import { d as Ha, f as Ya } from "./chunk-SXMPUQ6M.js";
var Ec = Ha((ja, Ga) => {
	s();
	(function (t, e) {
		typeof ja == "object" && typeof Ga < "u"
			? (Ga.exports = e())
			: typeof define == "function" && define.amd
				? define(e)
				: ((t = typeof globalThis < "u" ? globalThis : t || self).dayjs = e());
	})(ja, function () {
		"use strict";
		var t = 1e3,
			e = 6e4,
			r = 36e5,
			i = "millisecond",
			o = "second",
			n = "minute",
			a = "hour",
			l = "day",
			c = "week",
			u = "month",
			p = "quarter",
			d = "year",
			h = "date",
			m = "Invalid Date",
			_ =
				/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
			b =
				/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
			v = {
				name: "en",
				weekdays:
					"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
				months:
					"January_February_March_April_May_June_July_August_September_October_November_December".split(
						"_",
					),
				ordinal: function (L) {
					var y = ["th", "st", "nd", "rd"],
						C = L % 100;
					return "[" + L + (y[(C - 20) % 10] || y[C] || y[0]) + "]";
				},
			},
			F = function (L, y, C) {
				var N = String(L);
				return !N || N.length >= y
					? L
					: "" + Array(y + 1 - N.length).join(C) + L;
			},
			T = {
				s: F,
				z: function (L) {
					var y = -L.utcOffset(),
						C = Math.abs(y),
						N = Math.floor(C / 60),
						w = C % 60;
					return (y <= 0 ? "+" : "-") + F(N, 2, "0") + ":" + F(w, 2, "0");
				},
				m: function L(y, C) {
					if (y.date() < C.date()) return -L(C, y);
					var N = 12 * (C.year() - y.year()) + (C.month() - y.month()),
						w = y.clone().add(N, u),
						q = C - w < 0,
						$ = y.clone().add(N + (q ? -1 : 1), u);
					return +(-(N + (C - w) / (q ? w - $ : $ - w)) || 0);
				},
				a: function (L) {
					return L < 0 ? Math.ceil(L) || 0 : Math.floor(L);
				},
				p: function (L) {
					return (
						{ M: u, y: d, w: c, d: l, D: h, h: a, m: n, s: o, ms: i, Q: p }[
							L
						] ||
						String(L || "")
							.toLowerCase()
							.replace(/s$/, "")
					);
				},
				u: function (L) {
					return L === void 0;
				},
			},
			O = "en",
			A = {};
		A[O] = v;
		var R = "$isDayjsObject",
			k = function (L) {
				return L instanceof J || !(!L || !L[R]);
			},
			D = function L(y, C, N) {
				var w;
				if (!y) return O;
				if (typeof y == "string") {
					var q = y.toLowerCase();
					A[q] && (w = q), C && ((A[q] = C), (w = q));
					var $ = y.split("-");
					if (!w && $.length > 1) return L($[0]);
				} else {
					var H = y.name;
					(A[H] = y), (w = H);
				}
				return !N && w && (O = w), w || (!N && O);
			},
			M = function (L, y) {
				if (k(L)) return L.clone();
				var C = typeof y == "object" ? y : {};
				return (C.date = L), (C.args = arguments), new J(C);
			},
			K = T;
		(K.l = D),
			(K.i = k),
			(K.w = function (L, y) {
				return M(L, { locale: y.$L, utc: y.$u, x: y.$x, $offset: y.$offset });
			});
		var J = (function () {
				function L(C) {
					(this.$L = D(C.locale, null, !0)),
						this.parse(C),
						(this.$x = this.$x || C.x || {}),
						(this[R] = !0);
				}
				var y = L.prototype;
				return (
					(y.parse = function (C) {
						(this.$d = (function (N) {
							var w = N.date,
								q = N.utc;
							if (w === null) return new Date(NaN);
							if (K.u(w)) return new Date();
							if (w instanceof Date) return new Date(w);
							if (typeof w == "string" && !/Z$/i.test(w)) {
								var $ = w.match(_);
								if ($) {
									var H = $[2] - 1 || 0,
										rt = ($[7] || "0").substring(0, 3);
									return q
										? new Date(
												Date.UTC(
													$[1],
													H,
													$[3] || 1,
													$[4] || 0,
													$[5] || 0,
													$[6] || 0,
													rt,
												),
											)
										: new Date(
												$[1],
												H,
												$[3] || 1,
												$[4] || 0,
												$[5] || 0,
												$[6] || 0,
												rt,
											);
								}
							}
							return new Date(w);
						})(C)),
							this.init();
					}),
					(y.init = function () {
						var C = this.$d;
						(this.$y = C.getFullYear()),
							(this.$M = C.getMonth()),
							(this.$D = C.getDate()),
							(this.$W = C.getDay()),
							(this.$H = C.getHours()),
							(this.$m = C.getMinutes()),
							(this.$s = C.getSeconds()),
							(this.$ms = C.getMilliseconds());
					}),
					(y.$utils = function () {
						return K;
					}),
					(y.isValid = function () {
						return this.$d.toString() !== m;
					}),
					(y.isSame = function (C, N) {
						var w = M(C);
						return this.startOf(N) <= w && w <= this.endOf(N);
					}),
					(y.isAfter = function (C, N) {
						return M(C) < this.startOf(N);
					}),
					(y.isBefore = function (C, N) {
						return this.endOf(N) < M(C);
					}),
					(y.$g = function (C, N, w) {
						return K.u(C) ? this[N] : this.set(w, C);
					}),
					(y.unix = function () {
						return Math.floor(this.valueOf() / 1e3);
					}),
					(y.valueOf = function () {
						return this.$d.getTime();
					}),
					(y.startOf = function (C, N) {
						var w = this,
							q = !!K.u(N) || N,
							$ = K.p(C),
							H = function (Pt, pt) {
								var I = K.w(
									w.$u ? Date.UTC(w.$y, pt, Pt) : new Date(w.$y, pt, Pt),
									w,
								);
								return q ? I : I.endOf(l);
							},
							rt = function (Pt, pt) {
								return K.w(
									w
										.toDate()
										[Pt].apply(
											w.toDate("s"),
											(q ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(pt),
										),
									w,
								);
							},
							at = this.$W,
							st = this.$M,
							gt = this.$D,
							jt = "set" + (this.$u ? "UTC" : "");
						switch ($) {
							case d:
								return q ? H(1, 0) : H(31, 11);
							case u:
								return q ? H(1, st) : H(0, st + 1);
							case c:
								var dt = this.$locale().weekStart || 0,
									Jt = (at < dt ? at + 7 : at) - dt;
								return H(q ? gt - Jt : gt + (6 - Jt), st);
							case l:
							case h:
								return rt(jt + "Hours", 0);
							case a:
								return rt(jt + "Minutes", 1);
							case n:
								return rt(jt + "Seconds", 2);
							case o:
								return rt(jt + "Milliseconds", 3);
							default:
								return this.clone();
						}
					}),
					(y.endOf = function (C) {
						return this.startOf(C, !1);
					}),
					(y.$set = function (C, N) {
						var w,
							q = K.p(C),
							$ = "set" + (this.$u ? "UTC" : ""),
							H = ((w = {}),
							(w[l] = $ + "Date"),
							(w[h] = $ + "Date"),
							(w[u] = $ + "Month"),
							(w[d] = $ + "FullYear"),
							(w[a] = $ + "Hours"),
							(w[n] = $ + "Minutes"),
							(w[o] = $ + "Seconds"),
							(w[i] = $ + "Milliseconds"),
							w)[q],
							rt = q === l ? this.$D + (N - this.$W) : N;
						if (q === u || q === d) {
							var at = this.clone().set(h, 1);
							at.$d[H](rt),
								at.init(),
								(this.$d = at.set(h, Math.min(this.$D, at.daysInMonth())).$d);
						} else H && this.$d[H](rt);
						return this.init(), this;
					}),
					(y.set = function (C, N) {
						return this.clone().$set(C, N);
					}),
					(y.get = function (C) {
						return this[K.p(C)]();
					}),
					(y.add = function (C, N) {
						var w,
							q = this;
						C = Number(C);
						var $ = K.p(N),
							H = function (st) {
								var gt = M(q);
								return K.w(gt.date(gt.date() + Math.round(st * C)), q);
							};
						if ($ === u) return this.set(u, this.$M + C);
						if ($ === d) return this.set(d, this.$y + C);
						if ($ === l) return H(1);
						if ($ === c) return H(7);
						var rt = ((w = {}), (w[n] = e), (w[a] = r), (w[o] = t), w)[$] || 1,
							at = this.$d.getTime() + C * rt;
						return K.w(at, this);
					}),
					(y.subtract = function (C, N) {
						return this.add(-1 * C, N);
					}),
					(y.format = function (C) {
						var N = this,
							w = this.$locale();
						if (!this.isValid()) return w.invalidDate || m;
						var q = C || "YYYY-MM-DDTHH:mm:ssZ",
							$ = K.z(this),
							H = this.$H,
							rt = this.$m,
							at = this.$M,
							st = w.weekdays,
							gt = w.months,
							jt = w.meridiem,
							dt = function (pt, I, Z, Q) {
								return (pt && (pt[I] || pt(N, q))) || Z[I].slice(0, Q);
							},
							Jt = function (pt) {
								return K.s(H % 12 || 12, pt, "0");
							},
							Pt =
								jt ||
								function (pt, I, Z) {
									var Q = pt < 12 ? "AM" : "PM";
									return Z ? Q.toLowerCase() : Q;
								};
						return q.replace(b, function (pt, I) {
							return (
								I ||
								(function (Z) {
									switch (Z) {
										case "YY":
											return String(N.$y).slice(-2);
										case "YYYY":
											return K.s(N.$y, 4, "0");
										case "M":
											return at + 1;
										case "MM":
											return K.s(at + 1, 2, "0");
										case "MMM":
											return dt(w.monthsShort, at, gt, 3);
										case "MMMM":
											return dt(gt, at);
										case "D":
											return N.$D;
										case "DD":
											return K.s(N.$D, 2, "0");
										case "d":
											return String(N.$W);
										case "dd":
											return dt(w.weekdaysMin, N.$W, st, 2);
										case "ddd":
											return dt(w.weekdaysShort, N.$W, st, 3);
										case "dddd":
											return st[N.$W];
										case "H":
											return String(H);
										case "HH":
											return K.s(H, 2, "0");
										case "h":
											return Jt(1);
										case "hh":
											return Jt(2);
										case "a":
											return Pt(H, rt, !0);
										case "A":
											return Pt(H, rt, !1);
										case "m":
											return String(rt);
										case "mm":
											return K.s(rt, 2, "0");
										case "s":
											return String(N.$s);
										case "ss":
											return K.s(N.$s, 2, "0");
										case "SSS":
											return K.s(N.$ms, 3, "0");
										case "Z":
											return $;
									}
									return null;
								})(pt) ||
								$.replace(":", "")
							);
						});
					}),
					(y.utcOffset = function () {
						return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
					}),
					(y.diff = function (C, N, w) {
						var q,
							$ = this,
							H = K.p(N),
							rt = M(C),
							at = (rt.utcOffset() - this.utcOffset()) * e,
							st = this - rt,
							gt = function () {
								return K.m($, rt);
							};
						switch (H) {
							case d:
								q = gt() / 12;
								break;
							case u:
								q = gt();
								break;
							case p:
								q = gt() / 3;
								break;
							case c:
								q = (st - at) / 6048e5;
								break;
							case l:
								q = (st - at) / 864e5;
								break;
							case a:
								q = st / r;
								break;
							case n:
								q = st / e;
								break;
							case o:
								q = st / t;
								break;
							default:
								q = st;
						}
						return w ? q : K.a(q);
					}),
					(y.daysInMonth = function () {
						return this.endOf(u).$D;
					}),
					(y.$locale = function () {
						return A[this.$L];
					}),
					(y.locale = function (C, N) {
						if (!C) return this.$L;
						var w = this.clone(),
							q = D(C, N, !0);
						return q && (w.$L = q), w;
					}),
					(y.clone = function () {
						return K.w(this.$d, this);
					}),
					(y.toDate = function () {
						return new Date(this.valueOf());
					}),
					(y.toJSON = function () {
						return this.isValid() ? this.toISOString() : null;
					}),
					(y.toISOString = function () {
						return this.$d.toISOString();
					}),
					(y.toString = function () {
						return this.$d.toUTCString();
					}),
					L
				);
			})(),
			P = J.prototype;
		return (
			(M.prototype = P),
			[
				["$ms", i],
				["$s", o],
				["$m", n],
				["$H", a],
				["$W", l],
				["$M", u],
				["$y", d],
				["$D", h],
			].forEach(function (L) {
				P[L[1]] = function (y) {
					return this.$g(y, L[0], L[1]);
				};
			}),
			(M.extend = function (L, y) {
				return L.$i || (L(y, J, M), (L.$i = !0)), M;
			}),
			(M.locale = D),
			(M.isDayjs = k),
			(M.unix = function (L) {
				return M(1e3 * L);
			}),
			(M.en = A[O]),
			(M.Ls = A),
			(M.p = {}),
			M
		);
	});
});
var Ic = Ha((Ae) => {
	"use strict";
	s();
	Object.defineProperty(Ae, "__esModule", { value: !0 });
	Ae.sanitizeUrl = Ae.BLANK_URL = void 0;
	var l0 = /^([^\w]*)(javascript|data|vbscript)/im,
		c0 = /&#(\w+)(^\w|;)?/g,
		u0 = /&(newline|tab);/gi,
		Oc = /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim,
		h0 = /^.+(:|&colon;)/gim,
		f0 = [".", "/"];
	Ae.BLANK_URL = "about:blank";
	function p0(t) {
		return f0.indexOf(t[0]) > -1;
	}
	function d0(t) {
		var e = t.replace(Oc, "");
		return e.replace(c0, function (r, i) {
			return String.fromCharCode(i);
		});
	}
	function m0(t) {
		if (!t) return Ae.BLANK_URL;
		var e = d0(t).replace(u0, "").replace(Oc, "").trim();
		if (!e) return Ae.BLANK_URL;
		if (p0(e)) return e;
		var r = e.match(h0);
		if (!r) return e;
		var i = r[0];
		return l0.test(i) ? Ae.BLANK_URL : e;
	}
	Ae.sanitizeUrl = m0;
});
var ap = Ha((ml, gl) => {
	s();
	(function (t, e) {
		typeof ml == "object" && typeof gl < "u"
			? (gl.exports = e())
			: typeof define == "function" && define.amd
				? define(e)
				: ((t = typeof globalThis < "u" ? globalThis : t || self),
					(t.DOMPurify = e()));
	})(ml, function () {
		"use strict";
		let {
				entries: t,
				setPrototypeOf: e,
				isFrozen: r,
				getPrototypeOf: i,
				getOwnPropertyDescriptor: o,
			} = Object,
			{ freeze: n, seal: a, create: l } = Object,
			{ apply: c, construct: u } = typeof Reflect < "u" && Reflect;
		n ||
			(n = function (Y) {
				return Y;
			}),
			a ||
				(a = function (Y) {
					return Y;
				}),
			c ||
				(c = function (Y, ot, tt) {
					return Y.apply(ot, tt);
				}),
			u ||
				(u = function (Y, ot) {
					return new Y(...ot);
				});
		let p = k(Array.prototype.forEach),
			d = k(Array.prototype.pop),
			h = k(Array.prototype.push),
			m = k(String.prototype.toLowerCase),
			_ = k(String.prototype.toString),
			b = k(String.prototype.match),
			v = k(String.prototype.replace),
			F = k(String.prototype.indexOf),
			T = k(String.prototype.trim),
			O = k(Object.prototype.hasOwnProperty),
			A = k(RegExp.prototype.test),
			R = D(TypeError);
		function k(et) {
			return function (Y) {
				for (
					var ot = arguments.length,
						tt = new Array(ot > 1 ? ot - 1 : 0),
						It = 1;
					It < ot;
					It++
				)
					tt[It - 1] = arguments[It];
				return c(et, Y, tt);
			};
		}
		function D(et) {
			return function () {
				for (var Y = arguments.length, ot = new Array(Y), tt = 0; tt < Y; tt++)
					ot[tt] = arguments[tt];
				return u(et, ot);
			};
		}
		function M(et, Y) {
			let ot =
				arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : m;
			e && e(et, null);
			let tt = Y.length;
			for (; tt--; ) {
				let It = Y[tt];
				if (typeof It == "string") {
					let ke = ot(It);
					ke !== It && (r(Y) || (Y[tt] = ke), (It = ke));
				}
				et[It] = !0;
			}
			return et;
		}
		function K(et) {
			for (let Y = 0; Y < et.length; Y++) O(et, Y) || (et[Y] = null);
			return et;
		}
		function J(et) {
			let Y = l(null);
			for (let [ot, tt] of t(et))
				O(et, ot) &&
					(Array.isArray(tt)
						? (Y[ot] = K(tt))
						: tt && typeof tt == "object" && tt.constructor === Object
							? (Y[ot] = J(tt))
							: (Y[ot] = tt));
			return Y;
		}
		function P(et, Y) {
			for (; et !== null; ) {
				let tt = o(et, Y);
				if (tt) {
					if (tt.get) return k(tt.get);
					if (typeof tt.value == "function") return k(tt.value);
				}
				et = i(et);
			}
			function ot() {
				return null;
			}
			return ot;
		}
		let L = n([
				"a",
				"abbr",
				"acronym",
				"address",
				"area",
				"article",
				"aside",
				"audio",
				"b",
				"bdi",
				"bdo",
				"big",
				"blink",
				"blockquote",
				"body",
				"br",
				"button",
				"canvas",
				"caption",
				"center",
				"cite",
				"code",
				"col",
				"colgroup",
				"content",
				"data",
				"datalist",
				"dd",
				"decorator",
				"del",
				"details",
				"dfn",
				"dialog",
				"dir",
				"div",
				"dl",
				"dt",
				"element",
				"em",
				"fieldset",
				"figcaption",
				"figure",
				"font",
				"footer",
				"form",
				"h1",
				"h2",
				"h3",
				"h4",
				"h5",
				"h6",
				"head",
				"header",
				"hgroup",
				"hr",
				"html",
				"i",
				"img",
				"input",
				"ins",
				"kbd",
				"label",
				"legend",
				"li",
				"main",
				"map",
				"mark",
				"marquee",
				"menu",
				"menuitem",
				"meter",
				"nav",
				"nobr",
				"ol",
				"optgroup",
				"option",
				"output",
				"p",
				"picture",
				"pre",
				"progress",
				"q",
				"rp",
				"rt",
				"ruby",
				"s",
				"samp",
				"section",
				"select",
				"shadow",
				"small",
				"source",
				"spacer",
				"span",
				"strike",
				"strong",
				"style",
				"sub",
				"summary",
				"sup",
				"table",
				"tbody",
				"td",
				"template",
				"textarea",
				"tfoot",
				"th",
				"thead",
				"time",
				"tr",
				"track",
				"tt",
				"u",
				"ul",
				"var",
				"video",
				"wbr",
			]),
			y = n([
				"svg",
				"a",
				"altglyph",
				"altglyphdef",
				"altglyphitem",
				"animatecolor",
				"animatemotion",
				"animatetransform",
				"circle",
				"clippath",
				"defs",
				"desc",
				"ellipse",
				"filter",
				"font",
				"g",
				"glyph",
				"glyphref",
				"hkern",
				"image",
				"line",
				"lineargradient",
				"marker",
				"mask",
				"metadata",
				"mpath",
				"path",
				"pattern",
				"polygon",
				"polyline",
				"radialgradient",
				"rect",
				"stop",
				"style",
				"switch",
				"symbol",
				"text",
				"textpath",
				"title",
				"tref",
				"tspan",
				"view",
				"vkern",
			]),
			C = n([
				"feBlend",
				"feColorMatrix",
				"feComponentTransfer",
				"feComposite",
				"feConvolveMatrix",
				"feDiffuseLighting",
				"feDisplacementMap",
				"feDistantLight",
				"feDropShadow",
				"feFlood",
				"feFuncA",
				"feFuncB",
				"feFuncG",
				"feFuncR",
				"feGaussianBlur",
				"feImage",
				"feMerge",
				"feMergeNode",
				"feMorphology",
				"feOffset",
				"fePointLight",
				"feSpecularLighting",
				"feSpotLight",
				"feTile",
				"feTurbulence",
			]),
			N = n([
				"animate",
				"color-profile",
				"cursor",
				"discard",
				"font-face",
				"font-face-format",
				"font-face-name",
				"font-face-src",
				"font-face-uri",
				"foreignobject",
				"hatch",
				"hatchpath",
				"mesh",
				"meshgradient",
				"meshpatch",
				"meshrow",
				"missing-glyph",
				"script",
				"set",
				"solidcolor",
				"unknown",
				"use",
			]),
			w = n([
				"math",
				"menclose",
				"merror",
				"mfenced",
				"mfrac",
				"mglyph",
				"mi",
				"mlabeledtr",
				"mmultiscripts",
				"mn",
				"mo",
				"mover",
				"mpadded",
				"mphantom",
				"mroot",
				"mrow",
				"ms",
				"mspace",
				"msqrt",
				"mstyle",
				"msub",
				"msup",
				"msubsup",
				"mtable",
				"mtd",
				"mtext",
				"mtr",
				"munder",
				"munderover",
				"mprescripts",
			]),
			q = n([
				"maction",
				"maligngroup",
				"malignmark",
				"mlongdiv",
				"mscarries",
				"mscarry",
				"msgroup",
				"mstack",
				"msline",
				"msrow",
				"semantics",
				"annotation",
				"annotation-xml",
				"mprescripts",
				"none",
			]),
			$ = n(["#text"]),
			H = n([
				"accept",
				"action",
				"align",
				"alt",
				"autocapitalize",
				"autocomplete",
				"autopictureinpicture",
				"autoplay",
				"background",
				"bgcolor",
				"border",
				"capture",
				"cellpadding",
				"cellspacing",
				"checked",
				"cite",
				"class",
				"clear",
				"color",
				"cols",
				"colspan",
				"controls",
				"controlslist",
				"coords",
				"crossorigin",
				"datetime",
				"decoding",
				"default",
				"dir",
				"disabled",
				"disablepictureinpicture",
				"disableremoteplayback",
				"download",
				"draggable",
				"enctype",
				"enterkeyhint",
				"face",
				"for",
				"headers",
				"height",
				"hidden",
				"high",
				"href",
				"hreflang",
				"id",
				"inputmode",
				"integrity",
				"ismap",
				"kind",
				"label",
				"lang",
				"list",
				"loading",
				"loop",
				"low",
				"max",
				"maxlength",
				"media",
				"method",
				"min",
				"minlength",
				"multiple",
				"muted",
				"name",
				"nonce",
				"noshade",
				"novalidate",
				"nowrap",
				"open",
				"optimum",
				"pattern",
				"placeholder",
				"playsinline",
				"popover",
				"popovertarget",
				"popovertargetaction",
				"poster",
				"preload",
				"pubdate",
				"radiogroup",
				"readonly",
				"rel",
				"required",
				"rev",
				"reversed",
				"role",
				"rows",
				"rowspan",
				"spellcheck",
				"scope",
				"selected",
				"shape",
				"size",
				"sizes",
				"span",
				"srclang",
				"start",
				"src",
				"srcset",
				"step",
				"style",
				"summary",
				"tabindex",
				"title",
				"translate",
				"type",
				"usemap",
				"valign",
				"value",
				"width",
				"wrap",
				"xmlns",
				"slot",
			]),
			rt = n([
				"accent-height",
				"accumulate",
				"additive",
				"alignment-baseline",
				"ascent",
				"attributename",
				"attributetype",
				"azimuth",
				"basefrequency",
				"baseline-shift",
				"begin",
				"bias",
				"by",
				"class",
				"clip",
				"clippathunits",
				"clip-path",
				"clip-rule",
				"color",
				"color-interpolation",
				"color-interpolation-filters",
				"color-profile",
				"color-rendering",
				"cx",
				"cy",
				"d",
				"dx",
				"dy",
				"diffuseconstant",
				"direction",
				"display",
				"divisor",
				"dur",
				"edgemode",
				"elevation",
				"end",
				"fill",
				"fill-opacity",
				"fill-rule",
				"filter",
				"filterunits",
				"flood-color",
				"flood-opacity",
				"font-family",
				"font-size",
				"font-size-adjust",
				"font-stretch",
				"font-style",
				"font-variant",
				"font-weight",
				"fx",
				"fy",
				"g1",
				"g2",
				"glyph-name",
				"glyphref",
				"gradientunits",
				"gradienttransform",
				"height",
				"href",
				"id",
				"image-rendering",
				"in",
				"in2",
				"k",
				"k1",
				"k2",
				"k3",
				"k4",
				"kerning",
				"keypoints",
				"keysplines",
				"keytimes",
				"lang",
				"lengthadjust",
				"letter-spacing",
				"kernelmatrix",
				"kernelunitlength",
				"lighting-color",
				"local",
				"marker-end",
				"marker-mid",
				"marker-start",
				"markerheight",
				"markerunits",
				"markerwidth",
				"maskcontentunits",
				"maskunits",
				"max",
				"mask",
				"media",
				"method",
				"mode",
				"min",
				"name",
				"numoctaves",
				"offset",
				"operator",
				"opacity",
				"order",
				"orient",
				"orientation",
				"origin",
				"overflow",
				"paint-order",
				"path",
				"pathlength",
				"patterncontentunits",
				"patterntransform",
				"patternunits",
				"points",
				"preservealpha",
				"preserveaspectratio",
				"primitiveunits",
				"r",
				"rx",
				"ry",
				"radius",
				"refx",
				"refy",
				"repeatcount",
				"repeatdur",
				"restart",
				"result",
				"rotate",
				"scale",
				"seed",
				"shape-rendering",
				"specularconstant",
				"specularexponent",
				"spreadmethod",
				"startoffset",
				"stddeviation",
				"stitchtiles",
				"stop-color",
				"stop-opacity",
				"stroke-dasharray",
				"stroke-dashoffset",
				"stroke-linecap",
				"stroke-linejoin",
				"stroke-miterlimit",
				"stroke-opacity",
				"stroke",
				"stroke-width",
				"style",
				"surfacescale",
				"systemlanguage",
				"tabindex",
				"targetx",
				"targety",
				"transform",
				"transform-origin",
				"text-anchor",
				"text-decoration",
				"text-rendering",
				"textlength",
				"type",
				"u1",
				"u2",
				"unicode",
				"values",
				"viewbox",
				"visibility",
				"version",
				"vert-adv-y",
				"vert-origin-x",
				"vert-origin-y",
				"width",
				"word-spacing",
				"wrap",
				"writing-mode",
				"xchannelselector",
				"ychannelselector",
				"x",
				"x1",
				"x2",
				"xmlns",
				"y",
				"y1",
				"y2",
				"z",
				"zoomandpan",
			]),
			at = n([
				"accent",
				"accentunder",
				"align",
				"bevelled",
				"close",
				"columnsalign",
				"columnlines",
				"columnspan",
				"denomalign",
				"depth",
				"dir",
				"display",
				"displaystyle",
				"encoding",
				"fence",
				"frame",
				"height",
				"href",
				"id",
				"largeop",
				"length",
				"linethickness",
				"lspace",
				"lquote",
				"mathbackground",
				"mathcolor",
				"mathsize",
				"mathvariant",
				"maxsize",
				"minsize",
				"movablelimits",
				"notation",
				"numalign",
				"open",
				"rowalign",
				"rowlines",
				"rowspacing",
				"rowspan",
				"rspace",
				"rquote",
				"scriptlevel",
				"scriptminsize",
				"scriptsizemultiplier",
				"selection",
				"separator",
				"separators",
				"stretchy",
				"subscriptshift",
				"supscriptshift",
				"symmetric",
				"voffset",
				"width",
				"xmlns",
			]),
			st = n([
				"xlink:href",
				"xml:id",
				"xlink:title",
				"xml:space",
				"xmlns:xlink",
			]),
			gt = a(/\{\{[\w\W]*|[\w\W]*\}\}/gm),
			jt = a(/<%[\w\W]*|[\w\W]*%>/gm),
			dt = a(/\${[\w\W]*}/gm),
			Jt = a(/^data-[\-\w.\u00B7-\uFFFF]/),
			Pt = a(/^aria-[\-\w]+$/),
			pt = a(
				/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
			),
			I = a(/^(?:\w+script|data):/i),
			Z = a(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
			Q = a(/^html$/i),
			S = a(/^[a-z][.\w]*(-[.\w]+)+$/i);
		var Bt = Object.freeze({
			__proto__: null,
			MUSTACHE_EXPR: gt,
			ERB_EXPR: jt,
			TMPLIT_EXPR: dt,
			DATA_ATTR: Jt,
			ARIA_ATTR: Pt,
			IS_ALLOWED_URI: pt,
			IS_SCRIPT_OR_DATA: I,
			ATTR_WHITESPACE: Z,
			DOCTYPE_NAME: Q,
			CUSTOM_ELEMENT: S,
		});
		let it = {
				element: 1,
				attribute: 2,
				text: 3,
				cdataSection: 4,
				entityReference: 5,
				entityNode: 6,
				progressingInstruction: 7,
				comment: 8,
				document: 9,
				documentType: 10,
				documentFragment: 11,
				notation: 12,
			},
			$t = function () {
				return typeof window > "u" ? null : window;
			},
			zt = function (Y, ot) {
				if (typeof Y != "object" || typeof Y.createPolicy != "function")
					return null;
				let tt = null,
					It = "data-tt-policy-suffix";
				ot && ot.hasAttribute(It) && (tt = ot.getAttribute(It));
				let ke = "dompurify" + (tt ? "#" + tt : "");
				try {
					return Y.createPolicy(ke, {
						createHTML(zr) {
							return zr;
						},
						createScriptURL(zr) {
							return zr;
						},
					});
				} catch {
					return (
						console.warn(
							"TrustedTypes policy " + ke + " could not be created.",
						),
						null
					);
				}
			};
		function he() {
			let et =
					arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : $t(),
				Y = (j) => he(j);
			if (
				((Y.version = "3.1.6"),
				(Y.removed = []),
				!et || !et.document || et.document.nodeType !== it.document)
			)
				return (Y.isSupported = !1), Y;
			let { document: ot } = et,
				tt = ot,
				It = tt.currentScript,
				{
					DocumentFragment: ke,
					HTMLTemplateElement: zr,
					Node: Fa,
					Element: rc,
					NodeFilter: Ei,
					NamedNodeMap: $g = et.NamedNodeMap || et.MozNamedAttrMap,
					HTMLFormElement: zg,
					DOMParser: qg,
					trustedTypes: Eo,
				} = et,
				Oi = rc.prototype,
				Wg = P(Oi, "cloneNode"),
				Ug = P(Oi, "remove"),
				Hg = P(Oi, "nextSibling"),
				Yg = P(Oi, "childNodes"),
				Oo = P(Oi, "parentNode");
			if (typeof zr == "function") {
				let j = ot.createElement("template");
				j.content && j.content.ownerDocument && (ot = j.content.ownerDocument);
			}
			let qt,
				Ii = "",
				{
					implementation: La,
					createNodeIterator: jg,
					createDocumentFragment: Gg,
					getElementsByTagName: Vg,
				} = ot,
				{ importNode: Xg } = tt,
				fe = {};
			Y.isSupported =
				typeof t == "function" &&
				typeof Oo == "function" &&
				La &&
				La.createHTMLDocument !== void 0;
			let {
					MUSTACHE_EXPR: Ma,
					ERB_EXPR: Ea,
					TMPLIT_EXPR: Oa,
					DATA_ATTR: Kg,
					ARIA_ATTR: Zg,
					IS_SCRIPT_OR_DATA: Qg,
					ATTR_WHITESPACE: ic,
					CUSTOM_ELEMENT: Jg,
				} = Bt,
				{ IS_ALLOWED_URI: oc } = Bt,
				vt = null,
				nc = M({}, [...L, ...y, ...C, ...w, ...$]),
				kt = null,
				ac = M({}, [...H, ...rt, ...at, ...st]),
				mt = Object.seal(
					l(null, {
						tagNameCheck: {
							writable: !0,
							configurable: !1,
							enumerable: !0,
							value: null,
						},
						attributeNameCheck: {
							writable: !0,
							configurable: !1,
							enumerable: !0,
							value: null,
						},
						allowCustomizedBuiltInElements: {
							writable: !0,
							configurable: !1,
							enumerable: !0,
							value: !1,
						},
					}),
				),
				Di = null,
				Ia = null,
				sc = !0,
				Da = !0,
				lc = !1,
				cc = !0,
				qr = !1,
				Na = !0,
				cr = !1,
				Ra = !1,
				Pa = !1,
				Wr = !1,
				Io = !1,
				Do = !1,
				uc = !0,
				hc = !1,
				t0 = "user-content-",
				$a = !0,
				Ni = !1,
				Ur = {},
				Hr = null,
				fc = M({}, [
					"annotation-xml",
					"audio",
					"colgroup",
					"desc",
					"foreignobject",
					"head",
					"iframe",
					"math",
					"mi",
					"mn",
					"mo",
					"ms",
					"mtext",
					"noembed",
					"noframes",
					"noscript",
					"plaintext",
					"script",
					"style",
					"svg",
					"template",
					"thead",
					"title",
					"video",
					"xmp",
				]),
				pc = null,
				dc = M({}, ["audio", "video", "img", "source", "image", "track"]),
				za = null,
				mc = M({}, [
					"alt",
					"class",
					"for",
					"id",
					"label",
					"name",
					"pattern",
					"placeholder",
					"role",
					"summary",
					"title",
					"value",
					"style",
					"xmlns",
				]),
				No = "http://www.w3.org/1998/Math/MathML",
				Ro = "http://www.w3.org/2000/svg",
				Se = "http://www.w3.org/1999/xhtml",
				Yr = Se,
				qa = !1,
				Wa = null,
				e0 = M({}, [No, Ro, Se], _),
				Ri = null,
				r0 = ["application/xhtml+xml", "text/html"],
				i0 = "text/html",
				St = null,
				jr = null,
				o0 = ot.createElement("form"),
				gc = function (g) {
					return g instanceof RegExp || g instanceof Function;
				},
				Ua = function () {
					let g =
						arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
					if (!(jr && jr === g)) {
						if (
							((!g || typeof g != "object") && (g = {}),
							(g = J(g)),
							(Ri =
								r0.indexOf(g.PARSER_MEDIA_TYPE) === -1
									? i0
									: g.PARSER_MEDIA_TYPE),
							(St = Ri === "application/xhtml+xml" ? _ : m),
							(vt = O(g, "ALLOWED_TAGS") ? M({}, g.ALLOWED_TAGS, St) : nc),
							(kt = O(g, "ALLOWED_ATTR") ? M({}, g.ALLOWED_ATTR, St) : ac),
							(Wa = O(g, "ALLOWED_NAMESPACES")
								? M({}, g.ALLOWED_NAMESPACES, _)
								: e0),
							(za = O(g, "ADD_URI_SAFE_ATTR")
								? M(J(mc), g.ADD_URI_SAFE_ATTR, St)
								: mc),
							(pc = O(g, "ADD_DATA_URI_TAGS")
								? M(J(dc), g.ADD_DATA_URI_TAGS, St)
								: dc),
							(Hr = O(g, "FORBID_CONTENTS")
								? M({}, g.FORBID_CONTENTS, St)
								: fc),
							(Di = O(g, "FORBID_TAGS") ? M({}, g.FORBID_TAGS, St) : {}),
							(Ia = O(g, "FORBID_ATTR") ? M({}, g.FORBID_ATTR, St) : {}),
							(Ur = O(g, "USE_PROFILES") ? g.USE_PROFILES : !1),
							(sc = g.ALLOW_ARIA_ATTR !== !1),
							(Da = g.ALLOW_DATA_ATTR !== !1),
							(lc = g.ALLOW_UNKNOWN_PROTOCOLS || !1),
							(cc = g.ALLOW_SELF_CLOSE_IN_ATTR !== !1),
							(qr = g.SAFE_FOR_TEMPLATES || !1),
							(Na = g.SAFE_FOR_XML !== !1),
							(cr = g.WHOLE_DOCUMENT || !1),
							(Wr = g.RETURN_DOM || !1),
							(Io = g.RETURN_DOM_FRAGMENT || !1),
							(Do = g.RETURN_TRUSTED_TYPE || !1),
							(Pa = g.FORCE_BODY || !1),
							(uc = g.SANITIZE_DOM !== !1),
							(hc = g.SANITIZE_NAMED_PROPS || !1),
							($a = g.KEEP_CONTENT !== !1),
							(Ni = g.IN_PLACE || !1),
							(oc = g.ALLOWED_URI_REGEXP || pt),
							(Yr = g.NAMESPACE || Se),
							(mt = g.CUSTOM_ELEMENT_HANDLING || {}),
							g.CUSTOM_ELEMENT_HANDLING &&
								gc(g.CUSTOM_ELEMENT_HANDLING.tagNameCheck) &&
								(mt.tagNameCheck = g.CUSTOM_ELEMENT_HANDLING.tagNameCheck),
							g.CUSTOM_ELEMENT_HANDLING &&
								gc(g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) &&
								(mt.attributeNameCheck =
									g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),
							g.CUSTOM_ELEMENT_HANDLING &&
								typeof g.CUSTOM_ELEMENT_HANDLING
									.allowCustomizedBuiltInElements == "boolean" &&
								(mt.allowCustomizedBuiltInElements =
									g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),
							qr && (Da = !1),
							Io && (Wr = !0),
							Ur &&
								((vt = M({}, $)),
								(kt = []),
								Ur.html === !0 && (M(vt, L), M(kt, H)),
								Ur.svg === !0 && (M(vt, y), M(kt, rt), M(kt, st)),
								Ur.svgFilters === !0 && (M(vt, C), M(kt, rt), M(kt, st)),
								Ur.mathMl === !0 && (M(vt, w), M(kt, at), M(kt, st))),
							g.ADD_TAGS && (vt === nc && (vt = J(vt)), M(vt, g.ADD_TAGS, St)),
							g.ADD_ATTR && (kt === ac && (kt = J(kt)), M(kt, g.ADD_ATTR, St)),
							g.ADD_URI_SAFE_ATTR && M(za, g.ADD_URI_SAFE_ATTR, St),
							g.FORBID_CONTENTS &&
								(Hr === fc && (Hr = J(Hr)), M(Hr, g.FORBID_CONTENTS, St)),
							$a && (vt["#text"] = !0),
							cr && M(vt, ["html", "head", "body"]),
							vt.table && (M(vt, ["tbody"]), delete Di.tbody),
							g.TRUSTED_TYPES_POLICY)
						) {
							if (typeof g.TRUSTED_TYPES_POLICY.createHTML != "function")
								throw R(
									'TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.',
								);
							if (typeof g.TRUSTED_TYPES_POLICY.createScriptURL != "function")
								throw R(
									'TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.',
								);
							(qt = g.TRUSTED_TYPES_POLICY), (Ii = qt.createHTML(""));
						} else
							qt === void 0 && (qt = zt(Eo, It)),
								qt !== null &&
									typeof Ii == "string" &&
									(Ii = qt.createHTML(""));
						n && n(g), (jr = g);
					}
				},
				xc = M({}, ["mi", "mo", "mn", "ms", "mtext"]),
				yc = M({}, ["foreignobject", "annotation-xml"]),
				n0 = M({}, ["title", "style", "font", "a", "script"]),
				_c = M({}, [...y, ...C, ...N]),
				Cc = M({}, [...w, ...q]),
				a0 = function (g) {
					let B = Oo(g);
					(!B || !B.tagName) && (B = { namespaceURI: Yr, tagName: "template" });
					let z = m(g.tagName),
						ct = m(B.tagName);
					return Wa[g.namespaceURI]
						? g.namespaceURI === Ro
							? B.namespaceURI === Se
								? z === "svg"
								: B.namespaceURI === No
									? z === "svg" && (ct === "annotation-xml" || xc[ct])
									: !!_c[z]
							: g.namespaceURI === No
								? B.namespaceURI === Se
									? z === "math"
									: B.namespaceURI === Ro
										? z === "math" && yc[ct]
										: !!Cc[z]
								: g.namespaceURI === Se
									? (B.namespaceURI === Ro && !yc[ct]) ||
										(B.namespaceURI === No && !xc[ct])
										? !1
										: !Cc[z] && (n0[z] || !_c[z])
									: !!(Ri === "application/xhtml+xml" && Wa[g.namespaceURI])
						: !1;
				},
				pe = function (g) {
					h(Y.removed, { element: g });
					try {
						Oo(g).removeChild(g);
					} catch {
						Ug(g);
					}
				},
				Po = function (g, B) {
					try {
						h(Y.removed, { attribute: B.getAttributeNode(g), from: B });
					} catch {
						h(Y.removed, { attribute: null, from: B });
					}
					if ((B.removeAttribute(g), g === "is" && !kt[g]))
						if (Wr || Io)
							try {
								pe(B);
							} catch {}
						else
							try {
								B.setAttribute(g, "");
							} catch {}
				},
				bc = function (g) {
					let B = null,
						z = null;
					if (Pa) g = "<remove></remove>" + g;
					else {
						let Ft = b(g, /^[\r\n\t ]+/);
						z = Ft && Ft[0];
					}
					Ri === "application/xhtml+xml" &&
						Yr === Se &&
						(g =
							'<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' +
							g +
							"</body></html>");
					let ct = qt ? qt.createHTML(g) : g;
					if (Yr === Se)
						try {
							B = new qg().parseFromString(ct, Ri);
						} catch {}
					if (!B || !B.documentElement) {
						B = La.createDocument(Yr, "template", null);
						try {
							B.documentElement.innerHTML = qa ? Ii : ct;
						} catch {}
					}
					let Dt = B.body || B.documentElement;
					return (
						g &&
							z &&
							Dt.insertBefore(ot.createTextNode(z), Dt.childNodes[0] || null),
						Yr === Se
							? Vg.call(B, cr ? "html" : "body")[0]
							: cr
								? B.documentElement
								: Dt
					);
				},
				Tc = function (g) {
					return jg.call(
						g.ownerDocument || g,
						g,
						Ei.SHOW_ELEMENT |
							Ei.SHOW_COMMENT |
							Ei.SHOW_TEXT |
							Ei.SHOW_PROCESSING_INSTRUCTION |
							Ei.SHOW_CDATA_SECTION,
						null,
					);
				},
				vc = function (g) {
					return (
						g instanceof zg &&
						(typeof g.nodeName != "string" ||
							typeof g.textContent != "string" ||
							typeof g.removeChild != "function" ||
							!(g.attributes instanceof $g) ||
							typeof g.removeAttribute != "function" ||
							typeof g.setAttribute != "function" ||
							typeof g.namespaceURI != "string" ||
							typeof g.insertBefore != "function" ||
							typeof g.hasChildNodes != "function")
					);
				},
				kc = function (g) {
					return typeof Fa == "function" && g instanceof Fa;
				},
				we = function (g, B, z) {
					fe[g] &&
						p(fe[g], (ct) => {
							ct.call(Y, B, z, jr);
						});
				},
				Sc = function (g) {
					let B = null;
					if ((we("beforeSanitizeElements", g, null), vc(g))) return pe(g), !0;
					let z = St(g.nodeName);
					if (
						(we("uponSanitizeElement", g, { tagName: z, allowedTags: vt }),
						(g.hasChildNodes() &&
							!kc(g.firstElementChild) &&
							A(/<[/\w]/g, g.innerHTML) &&
							A(/<[/\w]/g, g.textContent)) ||
							g.nodeType === it.progressingInstruction ||
							(Na && g.nodeType === it.comment && A(/<[/\w]/g, g.data)))
					)
						return pe(g), !0;
					if (!vt[z] || Di[z]) {
						if (
							!Di[z] &&
							Ac(z) &&
							((mt.tagNameCheck instanceof RegExp && A(mt.tagNameCheck, z)) ||
								(mt.tagNameCheck instanceof Function && mt.tagNameCheck(z)))
						)
							return !1;
						if ($a && !Hr[z]) {
							let ct = Oo(g) || g.parentNode,
								Dt = Yg(g) || g.childNodes;
							if (Dt && ct) {
								let Ft = Dt.length;
								for (let Gt = Ft - 1; Gt >= 0; --Gt) {
									let de = Wg(Dt[Gt], !0);
									(de.__removalCount = (g.__removalCount || 0) + 1),
										ct.insertBefore(de, Hg(g));
								}
							}
						}
						return pe(g), !0;
					}
					return (g instanceof rc && !a0(g)) ||
						((z === "noscript" || z === "noembed" || z === "noframes") &&
							A(/<\/no(script|embed|frames)/i, g.innerHTML))
						? (pe(g), !0)
						: (qr &&
								g.nodeType === it.text &&
								((B = g.textContent),
								p([Ma, Ea, Oa], (ct) => {
									B = v(B, ct, " ");
								}),
								g.textContent !== B &&
									(h(Y.removed, { element: g.cloneNode() }),
									(g.textContent = B))),
							we("afterSanitizeElements", g, null),
							!1);
				},
				wc = function (g, B, z) {
					if (uc && (B === "id" || B === "name") && (z in ot || z in o0))
						return !1;
					if (!(Da && !Ia[B] && A(Kg, B))) {
						if (!(sc && A(Zg, B))) {
							if (!kt[B] || Ia[B]) {
								if (
									!(
										(Ac(g) &&
											((mt.tagNameCheck instanceof RegExp &&
												A(mt.tagNameCheck, g)) ||
												(mt.tagNameCheck instanceof Function &&
													mt.tagNameCheck(g))) &&
											((mt.attributeNameCheck instanceof RegExp &&
												A(mt.attributeNameCheck, B)) ||
												(mt.attributeNameCheck instanceof Function &&
													mt.attributeNameCheck(B)))) ||
										(B === "is" &&
											mt.allowCustomizedBuiltInElements &&
											((mt.tagNameCheck instanceof RegExp &&
												A(mt.tagNameCheck, z)) ||
												(mt.tagNameCheck instanceof Function &&
													mt.tagNameCheck(z))))
									)
								)
									return !1;
							} else if (!za[B]) {
								if (!A(oc, v(z, ic, ""))) {
									if (
										!(
											(B === "src" || B === "xlink:href" || B === "href") &&
											g !== "script" &&
											F(z, "data:") === 0 &&
											pc[g]
										)
									) {
										if (!(lc && !A(Qg, v(z, ic, "")))) {
											if (z) return !1;
										}
									}
								}
							}
						}
					}
					return !0;
				},
				Ac = function (g) {
					return g !== "annotation-xml" && b(g, Jg);
				},
				Bc = function (g) {
					we("beforeSanitizeAttributes", g, null);
					let { attributes: B } = g;
					if (!B) return;
					let z = {
							attrName: "",
							attrValue: "",
							keepAttr: !0,
							allowedAttributes: kt,
						},
						ct = B.length;
					for (; ct--; ) {
						let Dt = B[ct],
							{ name: Ft, namespaceURI: Gt, value: de } = Dt,
							Pi = St(Ft),
							Wt = Ft === "value" ? de : T(de);
						if (
							((z.attrName = Pi),
							(z.attrValue = Wt),
							(z.keepAttr = !0),
							(z.forceKeepAttr = void 0),
							we("uponSanitizeAttribute", g, z),
							(Wt = z.attrValue),
							Na && A(/((--!?|])>)|<\/(style|title)/i, Wt))
						) {
							Po(Ft, g);
							continue;
						}
						if (z.forceKeepAttr || (Po(Ft, g), !z.keepAttr)) continue;
						if (!cc && A(/\/>/i, Wt)) {
							Po(Ft, g);
							continue;
						}
						qr &&
							p([Ma, Ea, Oa], (Lc) => {
								Wt = v(Wt, Lc, " ");
							});
						let Fc = St(g.nodeName);
						if (wc(Fc, Pi, Wt)) {
							if (
								(hc &&
									(Pi === "id" || Pi === "name") &&
									(Po(Ft, g), (Wt = t0 + Wt)),
								qt &&
									typeof Eo == "object" &&
									typeof Eo.getAttributeType == "function" &&
									!Gt)
							)
								switch (Eo.getAttributeType(Fc, Pi)) {
									case "TrustedHTML": {
										Wt = qt.createHTML(Wt);
										break;
									}
									case "TrustedScriptURL": {
										Wt = qt.createScriptURL(Wt);
										break;
									}
								}
							try {
								Gt ? g.setAttributeNS(Gt, Ft, Wt) : g.setAttribute(Ft, Wt),
									vc(g) ? pe(g) : d(Y.removed);
							} catch {}
						}
					}
					we("afterSanitizeAttributes", g, null);
				},
				s0 = function j(g) {
					let B = null,
						z = Tc(g);
					for (we("beforeSanitizeShadowDOM", g, null); (B = z.nextNode()); )
						we("uponSanitizeShadowNode", B, null),
							!Sc(B) && (B.content instanceof ke && j(B.content), Bc(B));
					we("afterSanitizeShadowDOM", g, null);
				};
			return (
				(Y.sanitize = function (j) {
					let g =
							arguments.length > 1 && arguments[1] !== void 0
								? arguments[1]
								: {},
						B = null,
						z = null,
						ct = null,
						Dt = null;
					if (((qa = !j), qa && (j = "<!-->"), typeof j != "string" && !kc(j)))
						if (typeof j.toString == "function") {
							if (((j = j.toString()), typeof j != "string"))
								throw R("dirty is not a string, aborting");
						} else throw R("toString is not a function");
					if (!Y.isSupported) return j;
					if (
						(Ra || Ua(g),
						(Y.removed = []),
						typeof j == "string" && (Ni = !1),
						Ni)
					) {
						if (j.nodeName) {
							let de = St(j.nodeName);
							if (!vt[de] || Di[de])
								throw R(
									"root node is forbidden and cannot be sanitized in-place",
								);
						}
					} else if (j instanceof Fa)
						(B = bc("<!---->")),
							(z = B.ownerDocument.importNode(j, !0)),
							(z.nodeType === it.element && z.nodeName === "BODY") ||
							z.nodeName === "HTML"
								? (B = z)
								: B.appendChild(z);
					else {
						if (!Wr && !qr && !cr && j.indexOf("<") === -1)
							return qt && Do ? qt.createHTML(j) : j;
						if (((B = bc(j)), !B)) return Wr ? null : Do ? Ii : "";
					}
					B && Pa && pe(B.firstChild);
					let Ft = Tc(Ni ? j : B);
					for (; (ct = Ft.nextNode()); )
						Sc(ct) || (ct.content instanceof ke && s0(ct.content), Bc(ct));
					if (Ni) return j;
					if (Wr) {
						if (Io)
							for (Dt = Gg.call(B.ownerDocument); B.firstChild; )
								Dt.appendChild(B.firstChild);
						else Dt = B;
						return (
							(kt.shadowroot || kt.shadowrootmode) &&
								(Dt = Xg.call(tt, Dt, !0)),
							Dt
						);
					}
					let Gt = cr ? B.outerHTML : B.innerHTML;
					return (
						cr &&
							vt["!doctype"] &&
							B.ownerDocument &&
							B.ownerDocument.doctype &&
							B.ownerDocument.doctype.name &&
							A(Q, B.ownerDocument.doctype.name) &&
							(Gt =
								"<!DOCTYPE " +
								B.ownerDocument.doctype.name +
								`>
` +
								Gt),
						qr &&
							p([Ma, Ea, Oa], (de) => {
								Gt = v(Gt, de, " ");
							}),
						qt && Do ? qt.createHTML(Gt) : Gt
					);
				}),
				(Y.setConfig = function () {
					let j =
						arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
					Ua(j), (Ra = !0);
				}),
				(Y.clearConfig = function () {
					(jr = null), (Ra = !1);
				}),
				(Y.isValidAttribute = function (j, g, B) {
					jr || Ua({});
					let z = St(j),
						ct = St(g);
					return wc(z, ct, B);
				}),
				(Y.addHook = function (j, g) {
					typeof g == "function" && ((fe[j] = fe[j] || []), h(fe[j], g));
				}),
				(Y.removeHook = function (j) {
					if (fe[j]) return d(fe[j]);
				}),
				(Y.removeHooks = function (j) {
					fe[j] && (fe[j] = []);
				}),
				(Y.removeAllHooks = function () {
					fe = {};
				}),
				Y
			);
		}
		var Mo = he();
		return Mo;
	});
});
s();
function Mc(t) {
	for (var e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
	var i = Array.from(typeof t == "string" ? [t] : t);
	i[i.length - 1] = i[i.length - 1].replace(/\r?\n([\t ]*)$/, "");
	var o = i.reduce(function (l, c) {
		var u = c.match(/\n([\t ]+|(?!\s).)/g);
		return u
			? l.concat(
					u.map(function (p) {
						var d, h;
						return (h =
							(d = p.match(/[\t ]/g)) === null || d === void 0
								? void 0
								: d.length) !== null && h !== void 0
							? h
							: 0;
					}),
				)
			: l;
	}, []);
	if (o.length) {
		var n = new RegExp(
			`
[	 ]{` +
				Math.min.apply(Math, o) +
				"}",
			"g",
		);
		i = i.map(function (l) {
			return l.replace(
				n,
				`
`,
			);
		});
	}
	i[0] = i[0].replace(/^\r?\n/, "");
	var a = i[0];
	return (
		e.forEach(function (l, c) {
			var u = a.match(/(?:^|\n)( *)$/),
				p = u ? u[1] : "",
				d = l;
			typeof l == "string" &&
				l.includes(`
`) &&
				(d = String(l)
					.split(`
`)
					.map(function (h, m) {
						return m === 0 ? h : "" + p + h;
					})
					.join(`
`)),
				(a += d + i[c + 1]);
		}),
		a
	);
}
s();
function Dc(t, e) {
	let r;
	if (e === void 0)
		for (let i of t)
			i != null && (r < i || (r === void 0 && i >= i)) && (r = i);
	else {
		let i = -1;
		for (let o of t)
			(o = e(o, ++i, t)) != null &&
				(r < o || (r === void 0 && o >= o)) &&
				(r = o);
	}
	return r;
}
s();
function Nc(t, e) {
	let r;
	if (e === void 0)
		for (let i of t)
			i != null && (r > i || (r === void 0 && i >= i)) && (r = i);
	else {
		let i = -1;
		for (let o of t)
			(o = e(o, ++i, t)) != null &&
				(r > o || (r === void 0 && o >= o)) &&
				(r = o);
	}
	return r;
}
s();
s();
s();
function ur(t, e) {
	return t == null || e == null
		? NaN
		: t < e
			? -1
			: t > e
				? 1
				: t >= e
					? 0
					: NaN;
}
s();
s();
function Va(t, e) {
	return t == null || e == null
		? NaN
		: e < t
			? -1
			: e > t
				? 1
				: e >= t
					? 0
					: NaN;
}
function hr(t) {
	let e, r, i;
	t.length !== 2
		? ((e = ur), (r = (l, c) => ur(t(l), c)), (i = (l, c) => t(l) - c))
		: ((e = t === ur || t === Va ? t : g0), (r = t), (i = t));
	function o(l, c, u = 0, p = l.length) {
		if (u < p) {
			if (e(c, c) !== 0) return p;
			do {
				let d = (u + p) >>> 1;
				r(l[d], c) < 0 ? (u = d + 1) : (p = d);
			} while (u < p);
		}
		return u;
	}
	function n(l, c, u = 0, p = l.length) {
		if (u < p) {
			if (e(c, c) !== 0) return p;
			do {
				let d = (u + p) >>> 1;
				r(l[d], c) <= 0 ? (u = d + 1) : (p = d);
			} while (u < p);
		}
		return u;
	}
	function a(l, c, u = 0, p = l.length) {
		let d = o(l, c, u, p - 1);
		return d > u && i(l[d - 1], c) > -i(l[d], c) ? d - 1 : d;
	}
	return { left: o, center: a, right: n };
}
function g0() {
	return 0;
}
s();
function Xa(t) {
	return t === null ? NaN : +t;
}
var Rc = hr(ur),
	Pc = Rc.right,
	x0 = Rc.left,
	y0 = hr(Xa).center,
	Ka = Pc;
s();
var Gr = class extends Map {
	constructor(e, r = b0) {
		if (
			(super(),
			Object.defineProperties(this, {
				_intern: { value: new Map() },
				_key: { value: r },
			}),
			e != null)
		)
			for (let [i, o] of e) this.set(i, o);
	}
	get(e) {
		return super.get($c(this, e));
	}
	has(e) {
		return super.has($c(this, e));
	}
	set(e, r) {
		return super.set(_0(this, e), r);
	}
	delete(e) {
		return super.delete(C0(this, e));
	}
};
function $c({ _intern: t, _key: e }, r) {
	let i = e(r);
	return t.has(i) ? t.get(i) : r;
}
function _0({ _intern: t, _key: e }, r) {
	let i = e(r);
	return t.has(i) ? t.get(i) : (t.set(i, r), r);
}
function C0({ _intern: t, _key: e }, r) {
	let i = e(r);
	return t.has(i) && ((r = t.get(i)), t.delete(i)), r;
}
function b0(t) {
	return t !== null && typeof t == "object" ? t.valueOf() : t;
}
s();
var T0 = Math.sqrt(50),
	v0 = Math.sqrt(10),
	k0 = Math.sqrt(2);
function $o(t, e, r) {
	let i = (e - t) / Math.max(0, r),
		o = Math.floor(Math.log10(i)),
		n = i / Math.pow(10, o),
		a = n >= T0 ? 10 : n >= v0 ? 5 : n >= k0 ? 2 : 1,
		l,
		c,
		u;
	return (
		o < 0
			? ((u = Math.pow(10, -o) / a),
				(l = Math.round(t * u)),
				(c = Math.round(e * u)),
				l / u < t && ++l,
				c / u > e && --c,
				(u = -u))
			: ((u = Math.pow(10, o) * a),
				(l = Math.round(t / u)),
				(c = Math.round(e / u)),
				l * u < t && ++l,
				c * u > e && --c),
		c < l && 0.5 <= r && r < 2 ? $o(t, e, r * 2) : [l, c, u]
	);
}
function zo(t, e, r) {
	if (((e = +e), (t = +t), (r = +r), !(r > 0))) return [];
	if (t === e) return [t];
	let i = e < t,
		[o, n, a] = i ? $o(e, t, r) : $o(t, e, r);
	if (!(n >= o)) return [];
	let l = n - o + 1,
		c = new Array(l);
	if (i)
		if (a < 0) for (let u = 0; u < l; ++u) c[u] = (n - u) / -a;
		else for (let u = 0; u < l; ++u) c[u] = (n - u) * a;
	else if (a < 0) for (let u = 0; u < l; ++u) c[u] = (o + u) / -a;
	else for (let u = 0; u < l; ++u) c[u] = (o + u) * a;
	return c;
}
function $i(t, e, r) {
	return (e = +e), (t = +t), (r = +r), $o(t, e, r)[2];
}
function Vr(t, e, r) {
	(e = +e), (t = +t), (r = +r);
	let i = e < t,
		o = i ? $i(e, t, r) : $i(t, e, r);
	return (i ? -1 : 1) * (o < 0 ? 1 / -o : o);
}
s();
function qo(t, e, r) {
	(t = +t),
		(e = +e),
		(r = (o = arguments.length) < 2 ? ((e = t), (t = 0), 1) : o < 3 ? 1 : +r);
	for (
		var i = -1, o = Math.max(0, Math.ceil((e - t) / r)) | 0, n = new Array(o);
		++i < o;
	)
		n[i] = t + i * r;
	return n;
}
s();
s();
function zc(t) {
	return t;
}
var Uo = 1,
	Za = 2,
	Qa = 3,
	Wo = 4,
	qc = 1e-6;
function S0(t) {
	return "translate(" + t + ",0)";
}
function w0(t) {
	return "translate(0," + t + ")";
}
function A0(t) {
	return (e) => +t(e);
}
function B0(t, e) {
	return (
		(e = Math.max(0, t.bandwidth() - e * 2) / 2),
		t.round() && (e = Math.round(e)),
		(r) => +t(r) + e
	);
}
function F0() {
	return !this.__axis;
}
function Wc(t, e) {
	var r = [],
		i = null,
		o = null,
		n = 6,
		a = 6,
		l = 3,
		c = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5,
		u = t === Uo || t === Wo ? -1 : 1,
		p = t === Wo || t === Za ? "x" : "y",
		d = t === Uo || t === Qa ? S0 : w0;
	function h(m) {
		var _ = i ?? (e.ticks ? e.ticks.apply(e, r) : e.domain()),
			b = o ?? (e.tickFormat ? e.tickFormat.apply(e, r) : zc),
			v = Math.max(n, 0) + l,
			F = e.range(),
			T = +F[0] + c,
			O = +F[F.length - 1] + c,
			A = (e.bandwidth ? B0 : A0)(e.copy(), c),
			R = m.selection ? m.selection() : m,
			k = R.selectAll(".domain").data([null]),
			D = R.selectAll(".tick").data(_, e).order(),
			M = D.exit(),
			K = D.enter().append("g").attr("class", "tick"),
			J = D.select("line"),
			P = D.select("text");
		(k = k.merge(
			k
				.enter()
				.insert("path", ".tick")
				.attr("class", "domain")
				.attr("stroke", "currentColor"),
		)),
			(D = D.merge(K)),
			(J = J.merge(
				K.append("line")
					.attr("stroke", "currentColor")
					.attr(p + "2", u * n),
			)),
			(P = P.merge(
				K.append("text")
					.attr("fill", "currentColor")
					.attr(p, u * v)
					.attr("dy", t === Uo ? "0em" : t === Qa ? "0.71em" : "0.32em"),
			)),
			m !== R &&
				((k = k.transition(m)),
				(D = D.transition(m)),
				(J = J.transition(m)),
				(P = P.transition(m)),
				(M = M.transition(m)
					.attr("opacity", qc)
					.attr("transform", function (L) {
						return isFinite((L = A(L)))
							? d(L + c)
							: this.getAttribute("transform");
					})),
				K.attr("opacity", qc).attr("transform", function (L) {
					var y = this.parentNode.__axis;
					return d((y && isFinite((y = y(L))) ? y : A(L)) + c);
				})),
			M.remove(),
			k.attr(
				"d",
				t === Wo || t === Za
					? a
						? "M" + u * a + "," + T + "H" + c + "V" + O + "H" + u * a
						: "M" + c + "," + T + "V" + O
					: a
						? "M" + T + "," + u * a + "V" + c + "H" + O + "V" + u * a
						: "M" + T + "," + c + "H" + O,
			),
			D.attr("opacity", 1).attr("transform", function (L) {
				return d(A(L) + c);
			}),
			J.attr(p + "2", u * n),
			P.attr(p, u * v).text(b),
			R.filter(F0)
				.attr("fill", "none")
				.attr("font-size", 10)
				.attr("font-family", "sans-serif")
				.attr("text-anchor", t === Za ? "start" : t === Wo ? "end" : "middle"),
			R.each(function () {
				this.__axis = A;
			});
	}
	return (
		(h.scale = function (m) {
			return arguments.length ? ((e = m), h) : e;
		}),
		(h.ticks = function () {
			return (r = Array.from(arguments)), h;
		}),
		(h.tickArguments = function (m) {
			return arguments.length
				? ((r = m == null ? [] : Array.from(m)), h)
				: r.slice();
		}),
		(h.tickValues = function (m) {
			return arguments.length
				? ((i = m == null ? null : Array.from(m)), h)
				: i && i.slice();
		}),
		(h.tickFormat = function (m) {
			return arguments.length ? ((o = m), h) : o;
		}),
		(h.tickSize = function (m) {
			return arguments.length ? ((n = a = +m), h) : n;
		}),
		(h.tickSizeInner = function (m) {
			return arguments.length ? ((n = +m), h) : n;
		}),
		(h.tickSizeOuter = function (m) {
			return arguments.length ? ((a = +m), h) : a;
		}),
		(h.tickPadding = function (m) {
			return arguments.length ? ((l = +m), h) : l;
		}),
		(h.offset = function (m) {
			return arguments.length ? ((c = +m), h) : c;
		}),
		h
	);
}
function L0(t) {
	return Wc(Uo, t);
}
function M0(t) {
	return Wc(Qa, t);
}
s();
s();
s();
s();
s();
function E0() {}
function fr(t) {
	return t == null
		? E0
		: function () {
				return this.querySelector(t);
			};
}
function Uc(t) {
	typeof t != "function" && (t = fr(t));
	for (var e = this._groups, r = e.length, i = new Array(r), o = 0; o < r; ++o)
		for (
			var n = e[o], a = n.length, l = (i[o] = new Array(a)), c, u, p = 0;
			p < a;
			++p
		)
			(c = n[p]) &&
				(u = t.call(c, c.__data__, p, n)) &&
				("__data__" in c && (u.__data__ = c.__data__), (l[p] = u));
	return new ut(i, this._parents);
}
s();
s();
function zi(t) {
	return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
s();
function O0() {
	return [];
}
function qi(t) {
	return t == null
		? O0
		: function () {
				return this.querySelectorAll(t);
			};
}
function I0(t) {
	return function () {
		return zi(t.apply(this, arguments));
	};
}
function Hc(t) {
	typeof t == "function" ? (t = I0(t)) : (t = qi(t));
	for (var e = this._groups, r = e.length, i = [], o = [], n = 0; n < r; ++n)
		for (var a = e[n], l = a.length, c, u = 0; u < l; ++u)
			(c = a[u]) && (i.push(t.call(c, c.__data__, u, a)), o.push(c));
	return new ut(i, o);
}
s();
s();
function Wi(t) {
	return function () {
		return this.matches(t);
	};
}
function Ho(t) {
	return function (e) {
		return e.matches(t);
	};
}
var D0 = Array.prototype.find;
function N0(t) {
	return function () {
		return D0.call(this.children, t);
	};
}
function R0() {
	return this.firstElementChild;
}
function Yc(t) {
	return this.select(t == null ? R0 : N0(typeof t == "function" ? t : Ho(t)));
}
s();
var P0 = Array.prototype.filter;
function $0() {
	return Array.from(this.children);
}
function z0(t) {
	return function () {
		return P0.call(this.children, t);
	};
}
function jc(t) {
	return this.selectAll(
		t == null ? $0 : z0(typeof t == "function" ? t : Ho(t)),
	);
}
s();
function Gc(t) {
	typeof t != "function" && (t = Wi(t));
	for (var e = this._groups, r = e.length, i = new Array(r), o = 0; o < r; ++o)
		for (var n = e[o], a = n.length, l = (i[o] = []), c, u = 0; u < a; ++u)
			(c = n[u]) && t.call(c, c.__data__, u, n) && l.push(c);
	return new ut(i, this._parents);
}
s();
s();
s();
function Yo(t) {
	return new Array(t.length);
}
function Vc() {
	return new ut(this._enter || this._groups.map(Yo), this._parents);
}
function Ui(t, e) {
	(this.ownerDocument = t.ownerDocument),
		(this.namespaceURI = t.namespaceURI),
		(this._next = null),
		(this._parent = t),
		(this.__data__ = e);
}
Ui.prototype = {
	constructor: Ui,
	appendChild: function (t) {
		return this._parent.insertBefore(t, this._next);
	},
	insertBefore: function (t, e) {
		return this._parent.insertBefore(t, e);
	},
	querySelector: function (t) {
		return this._parent.querySelector(t);
	},
	querySelectorAll: function (t) {
		return this._parent.querySelectorAll(t);
	},
};
s();
function Xc(t) {
	return function () {
		return t;
	};
}
function q0(t, e, r, i, o, n) {
	for (var a = 0, l, c = e.length, u = n.length; a < u; ++a)
		(l = e[a]) ? ((l.__data__ = n[a]), (i[a] = l)) : (r[a] = new Ui(t, n[a]));
	for (; a < c; ++a) (l = e[a]) && (o[a] = l);
}
function W0(t, e, r, i, o, n, a) {
	var l,
		c,
		u = new Map(),
		p = e.length,
		d = n.length,
		h = new Array(p),
		m;
	for (l = 0; l < p; ++l)
		(c = e[l]) &&
			((h[l] = m = a.call(c, c.__data__, l, e) + ""),
			u.has(m) ? (o[l] = c) : u.set(m, c));
	for (l = 0; l < d; ++l)
		(m = a.call(t, n[l], l, n) + ""),
			(c = u.get(m))
				? ((i[l] = c), (c.__data__ = n[l]), u.delete(m))
				: (r[l] = new Ui(t, n[l]));
	for (l = 0; l < p; ++l) (c = e[l]) && u.get(h[l]) === c && (o[l] = c);
}
function U0(t) {
	return t.__data__;
}
function Kc(t, e) {
	if (!arguments.length) return Array.from(this, U0);
	var r = e ? W0 : q0,
		i = this._parents,
		o = this._groups;
	typeof t != "function" && (t = Xc(t));
	for (
		var n = o.length,
			a = new Array(n),
			l = new Array(n),
			c = new Array(n),
			u = 0;
		u < n;
		++u
	) {
		var p = i[u],
			d = o[u],
			h = d.length,
			m = H0(t.call(p, p && p.__data__, u, i)),
			_ = m.length,
			b = (l[u] = new Array(_)),
			v = (a[u] = new Array(_)),
			F = (c[u] = new Array(h));
		r(p, d, b, v, F, m, e);
		for (var T = 0, O = 0, A, R; T < _; ++T)
			if ((A = b[T])) {
				for (T >= O && (O = T + 1); !(R = v[O]) && ++O < _; );
				A._next = R || null;
			}
	}
	return (a = new ut(a, i)), (a._enter = l), (a._exit = c), a;
}
function H0(t) {
	return typeof t == "object" && "length" in t ? t : Array.from(t);
}
s();
function Zc() {
	return new ut(this._exit || this._groups.map(Yo), this._parents);
}
s();
function Qc(t, e, r) {
	var i = this.enter(),
		o = this,
		n = this.exit();
	return (
		typeof t == "function"
			? ((i = t(i)), i && (i = i.selection()))
			: (i = i.append(t + "")),
		e != null && ((o = e(o)), o && (o = o.selection())),
		r == null ? n.remove() : r(n),
		i && o ? i.merge(o).order() : o
	);
}
s();
function Jc(t) {
	for (
		var e = t.selection ? t.selection() : t,
			r = this._groups,
			i = e._groups,
			o = r.length,
			n = i.length,
			a = Math.min(o, n),
			l = new Array(o),
			c = 0;
		c < a;
		++c
	)
		for (
			var u = r[c], p = i[c], d = u.length, h = (l[c] = new Array(d)), m, _ = 0;
			_ < d;
			++_
		)
			(m = u[_] || p[_]) && (h[_] = m);
	for (; c < o; ++c) l[c] = r[c];
	return new ut(l, this._parents);
}
s();
function tu() {
	for (var t = this._groups, e = -1, r = t.length; ++e < r; )
		for (var i = t[e], o = i.length - 1, n = i[o], a; --o >= 0; )
			(a = i[o]) &&
				(n &&
					a.compareDocumentPosition(n) ^ 4 &&
					n.parentNode.insertBefore(a, n),
				(n = a));
	return this;
}
s();
function eu(t) {
	t || (t = Y0);
	function e(d, h) {
		return d && h ? t(d.__data__, h.__data__) : !d - !h;
	}
	for (
		var r = this._groups, i = r.length, o = new Array(i), n = 0;
		n < i;
		++n
	) {
		for (
			var a = r[n], l = a.length, c = (o[n] = new Array(l)), u, p = 0;
			p < l;
			++p
		)
			(u = a[p]) && (c[p] = u);
		c.sort(e);
	}
	return new ut(o, this._parents).order();
}
function Y0(t, e) {
	return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
s();
function ru() {
	var t = arguments[0];
	return (arguments[0] = this), t.apply(null, arguments), this;
}
s();
function iu() {
	return Array.from(this);
}
s();
function ou() {
	for (var t = this._groups, e = 0, r = t.length; e < r; ++e)
		for (var i = t[e], o = 0, n = i.length; o < n; ++o) {
			var a = i[o];
			if (a) return a;
		}
	return null;
}
s();
function nu() {
	let t = 0;
	for (let e of this) ++t;
	return t;
}
s();
function au() {
	return !this.node();
}
s();
function su(t) {
	for (var e = this._groups, r = 0, i = e.length; r < i; ++r)
		for (var o = e[r], n = 0, a = o.length, l; n < a; ++n)
			(l = o[n]) && t.call(l, l.__data__, n, o);
	return this;
}
s();
s();
s();
var jo = "http://www.w3.org/1999/xhtml",
	Ja = {
		svg: "http://www.w3.org/2000/svg",
		xhtml: jo,
		xlink: "http://www.w3.org/1999/xlink",
		xml: "http://www.w3.org/XML/1998/namespace",
		xmlns: "http://www.w3.org/2000/xmlns/",
	};
function Be(t) {
	var e = (t += ""),
		r = e.indexOf(":");
	return (
		r >= 0 && (e = t.slice(0, r)) !== "xmlns" && (t = t.slice(r + 1)),
		Ja.hasOwnProperty(e) ? { space: Ja[e], local: t } : t
	);
}
function j0(t) {
	return function () {
		this.removeAttribute(t);
	};
}
function G0(t) {
	return function () {
		this.removeAttributeNS(t.space, t.local);
	};
}
function V0(t, e) {
	return function () {
		this.setAttribute(t, e);
	};
}
function X0(t, e) {
	return function () {
		this.setAttributeNS(t.space, t.local, e);
	};
}
function K0(t, e) {
	return function () {
		var r = e.apply(this, arguments);
		r == null ? this.removeAttribute(t) : this.setAttribute(t, r);
	};
}
function Z0(t, e) {
	return function () {
		var r = e.apply(this, arguments);
		r == null
			? this.removeAttributeNS(t.space, t.local)
			: this.setAttributeNS(t.space, t.local, r);
	};
}
function lu(t, e) {
	var r = Be(t);
	if (arguments.length < 2) {
		var i = this.node();
		return r.local ? i.getAttributeNS(r.space, r.local) : i.getAttribute(r);
	}
	return this.each(
		(e == null
			? r.local
				? G0
				: j0
			: typeof e == "function"
				? r.local
					? Z0
					: K0
				: r.local
					? X0
					: V0)(r, e),
	);
}
s();
s();
function Go(t) {
	return (
		(t.ownerDocument && t.ownerDocument.defaultView) ||
		(t.document && t) ||
		t.defaultView
	);
}
function Q0(t) {
	return function () {
		this.style.removeProperty(t);
	};
}
function J0(t, e, r) {
	return function () {
		this.style.setProperty(t, e, r);
	};
}
function tx(t, e, r) {
	return function () {
		var i = e.apply(this, arguments);
		i == null ? this.style.removeProperty(t) : this.style.setProperty(t, i, r);
	};
}
function cu(t, e, r) {
	return arguments.length > 1
		? this.each(
				(e == null ? Q0 : typeof e == "function" ? tx : J0)(t, e, r ?? ""),
			)
		: We(this.node(), t);
}
function We(t, e) {
	return (
		t.style.getPropertyValue(e) ||
		Go(t).getComputedStyle(t, null).getPropertyValue(e)
	);
}
s();
function ex(t) {
	return function () {
		delete this[t];
	};
}
function rx(t, e) {
	return function () {
		this[t] = e;
	};
}
function ix(t, e) {
	return function () {
		var r = e.apply(this, arguments);
		r == null ? delete this[t] : (this[t] = r);
	};
}
function uu(t, e) {
	return arguments.length > 1
		? this.each((e == null ? ex : typeof e == "function" ? ix : rx)(t, e))
		: this.node()[t];
}
s();
function hu(t) {
	return t.trim().split(/^|\s+/);
}
function ts(t) {
	return t.classList || new fu(t);
}
function fu(t) {
	(this._node = t), (this._names = hu(t.getAttribute("class") || ""));
}
fu.prototype = {
	add: function (t) {
		var e = this._names.indexOf(t);
		e < 0 &&
			(this._names.push(t),
			this._node.setAttribute("class", this._names.join(" ")));
	},
	remove: function (t) {
		var e = this._names.indexOf(t);
		e >= 0 &&
			(this._names.splice(e, 1),
			this._node.setAttribute("class", this._names.join(" ")));
	},
	contains: function (t) {
		return this._names.indexOf(t) >= 0;
	},
};
function pu(t, e) {
	for (var r = ts(t), i = -1, o = e.length; ++i < o; ) r.add(e[i]);
}
function du(t, e) {
	for (var r = ts(t), i = -1, o = e.length; ++i < o; ) r.remove(e[i]);
}
function ox(t) {
	return function () {
		pu(this, t);
	};
}
function nx(t) {
	return function () {
		du(this, t);
	};
}
function ax(t, e) {
	return function () {
		(e.apply(this, arguments) ? pu : du)(this, t);
	};
}
function mu(t, e) {
	var r = hu(t + "");
	if (arguments.length < 2) {
		for (var i = ts(this.node()), o = -1, n = r.length; ++o < n; )
			if (!i.contains(r[o])) return !1;
		return !0;
	}
	return this.each((typeof e == "function" ? ax : e ? ox : nx)(r, e));
}
s();
function sx() {
	this.textContent = "";
}
function lx(t) {
	return function () {
		this.textContent = t;
	};
}
function cx(t) {
	return function () {
		var e = t.apply(this, arguments);
		this.textContent = e ?? "";
	};
}
function gu(t) {
	return arguments.length
		? this.each(t == null ? sx : (typeof t == "function" ? cx : lx)(t))
		: this.node().textContent;
}
s();
function ux() {
	this.innerHTML = "";
}
function hx(t) {
	return function () {
		this.innerHTML = t;
	};
}
function fx(t) {
	return function () {
		var e = t.apply(this, arguments);
		this.innerHTML = e ?? "";
	};
}
function xu(t) {
	return arguments.length
		? this.each(t == null ? ux : (typeof t == "function" ? fx : hx)(t))
		: this.node().innerHTML;
}
s();
function px() {
	this.nextSibling && this.parentNode.appendChild(this);
}
function yu() {
	return this.each(px);
}
s();
function dx() {
	this.previousSibling &&
		this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function _u() {
	return this.each(dx);
}
s();
s();
function mx(t) {
	return function () {
		var e = this.ownerDocument,
			r = this.namespaceURI;
		return r === jo && e.documentElement.namespaceURI === jo
			? e.createElement(t)
			: e.createElementNS(r, t);
	};
}
function gx(t) {
	return function () {
		return this.ownerDocument.createElementNS(t.space, t.local);
	};
}
function Vo(t) {
	var e = Be(t);
	return (e.local ? gx : mx)(e);
}
function Cu(t) {
	var e = typeof t == "function" ? t : Vo(t);
	return this.select(function () {
		return this.appendChild(e.apply(this, arguments));
	});
}
s();
function xx() {
	return null;
}
function bu(t, e) {
	var r = typeof t == "function" ? t : Vo(t),
		i = e == null ? xx : typeof e == "function" ? e : fr(e);
	return this.select(function () {
		return this.insertBefore(
			r.apply(this, arguments),
			i.apply(this, arguments) || null,
		);
	});
}
s();
function yx() {
	var t = this.parentNode;
	t && t.removeChild(this);
}
function Tu() {
	return this.each(yx);
}
s();
function _x() {
	var t = this.cloneNode(!1),
		e = this.parentNode;
	return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Cx() {
	var t = this.cloneNode(!0),
		e = this.parentNode;
	return e ? e.insertBefore(t, this.nextSibling) : t;
}
function vu(t) {
	return this.select(t ? Cx : _x);
}
s();
function ku(t) {
	return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
s();
function bx(t) {
	return function (e) {
		t.call(this, e, this.__data__);
	};
}
function Tx(t) {
	return t
		.trim()
		.split(/^|\s+/)
		.map(function (e) {
			var r = "",
				i = e.indexOf(".");
			return (
				i >= 0 && ((r = e.slice(i + 1)), (e = e.slice(0, i))),
				{ type: e, name: r }
			);
		});
}
function vx(t) {
	return function () {
		var e = this.__on;
		if (e) {
			for (var r = 0, i = -1, o = e.length, n; r < o; ++r)
				(n = e[r]),
					(!t.type || n.type === t.type) && n.name === t.name
						? this.removeEventListener(n.type, n.listener, n.options)
						: (e[++i] = n);
			++i ? (e.length = i) : delete this.__on;
		}
	};
}
function kx(t, e, r) {
	return function () {
		var i = this.__on,
			o,
			n = bx(e);
		if (i) {
			for (var a = 0, l = i.length; a < l; ++a)
				if ((o = i[a]).type === t.type && o.name === t.name) {
					this.removeEventListener(o.type, o.listener, o.options),
						this.addEventListener(o.type, (o.listener = n), (o.options = r)),
						(o.value = e);
					return;
				}
		}
		this.addEventListener(t.type, n, r),
			(o = { type: t.type, name: t.name, value: e, listener: n, options: r }),
			i ? i.push(o) : (this.__on = [o]);
	};
}
function Su(t, e, r) {
	var i = Tx(t + ""),
		o,
		n = i.length,
		a;
	if (arguments.length < 2) {
		var l = this.node().__on;
		if (l) {
			for (var c = 0, u = l.length, p; c < u; ++c)
				for (o = 0, p = l[c]; o < n; ++o)
					if ((a = i[o]).type === p.type && a.name === p.name) return p.value;
		}
		return;
	}
	for (l = e ? kx : vx, o = 0; o < n; ++o) this.each(l(i[o], e, r));
	return this;
}
s();
function wu(t, e, r) {
	var i = Go(t),
		o = i.CustomEvent;
	typeof o == "function"
		? (o = new o(e, r))
		: ((o = i.document.createEvent("Event")),
			r
				? (o.initEvent(e, r.bubbles, r.cancelable), (o.detail = r.detail))
				: o.initEvent(e, !1, !1)),
		t.dispatchEvent(o);
}
function Sx(t, e) {
	return function () {
		return wu(this, t, e);
	};
}
function wx(t, e) {
	return function () {
		return wu(this, t, e.apply(this, arguments));
	};
}
function Au(t, e) {
	return this.each((typeof e == "function" ? wx : Sx)(t, e));
}
s();
function* Bu() {
	for (var t = this._groups, e = 0, r = t.length; e < r; ++e)
		for (var i = t[e], o = 0, n = i.length, a; o < n; ++o)
			(a = i[o]) && (yield a);
}
var Hi = [null];
function ut(t, e) {
	(this._groups = t), (this._parents = e);
}
function Fu() {
	return new ut([[document.documentElement]], Hi);
}
function Ax() {
	return this;
}
ut.prototype = Fu.prototype = {
	constructor: ut,
	select: Uc,
	selectAll: Hc,
	selectChild: Yc,
	selectChildren: jc,
	filter: Gc,
	data: Kc,
	enter: Vc,
	exit: Zc,
	join: Qc,
	merge: Jc,
	selection: Ax,
	order: tu,
	sort: eu,
	call: ru,
	nodes: iu,
	node: ou,
	size: nu,
	empty: au,
	each: su,
	attr: lu,
	style: cu,
	property: uu,
	classed: mu,
	text: gu,
	html: xu,
	raise: yu,
	lower: _u,
	append: Cu,
	insert: bu,
	remove: Tu,
	clone: vu,
	datum: ku,
	on: Su,
	dispatch: Au,
	[Symbol.iterator]: Bu,
};
var Fe = Fu;
function Vt(t) {
	return typeof t == "string"
		? new ut([[document.querySelector(t)]], [document.documentElement])
		: new ut([[t]], Hi);
}
s();
function Bx(t) {
	return typeof t == "string"
		? new ut([document.querySelectorAll(t)], [document.documentElement])
		: new ut([zi(t)], Hi);
}
s();
s();
s();
s();
s();
function pr(t, e, r) {
	(t.prototype = e.prototype = r), (r.constructor = t);
}
function Xr(t, e) {
	var r = Object.create(t.prototype);
	for (var i in e) r[i] = e[i];
	return r;
}
function Ue() {}
var Yi = 0.7,
	Zo = 1 / Yi,
	Kr = "\\s*([+-]?\\d+)\\s*",
	ji = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
	me = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
	Fx = /^#([0-9a-f]{3,8})$/,
	Lx = new RegExp(`^rgb\\(${Kr},${Kr},${Kr}\\)$`),
	Mx = new RegExp(`^rgb\\(${me},${me},${me}\\)$`),
	Ex = new RegExp(`^rgba\\(${Kr},${Kr},${Kr},${ji}\\)$`),
	Ox = new RegExp(`^rgba\\(${me},${me},${me},${ji}\\)$`),
	Ix = new RegExp(`^hsl\\(${ji},${me},${me}\\)$`),
	Dx = new RegExp(`^hsla\\(${ji},${me},${me},${ji}\\)$`),
	Lu = {
		aliceblue: 15792383,
		antiquewhite: 16444375,
		aqua: 65535,
		aquamarine: 8388564,
		azure: 15794175,
		beige: 16119260,
		bisque: 16770244,
		black: 0,
		blanchedalmond: 16772045,
		blue: 255,
		blueviolet: 9055202,
		brown: 10824234,
		burlywood: 14596231,
		cadetblue: 6266528,
		chartreuse: 8388352,
		chocolate: 13789470,
		coral: 16744272,
		cornflowerblue: 6591981,
		cornsilk: 16775388,
		crimson: 14423100,
		cyan: 65535,
		darkblue: 139,
		darkcyan: 35723,
		darkgoldenrod: 12092939,
		darkgray: 11119017,
		darkgreen: 25600,
		darkgrey: 11119017,
		darkkhaki: 12433259,
		darkmagenta: 9109643,
		darkolivegreen: 5597999,
		darkorange: 16747520,
		darkorchid: 10040012,
		darkred: 9109504,
		darksalmon: 15308410,
		darkseagreen: 9419919,
		darkslateblue: 4734347,
		darkslategray: 3100495,
		darkslategrey: 3100495,
		darkturquoise: 52945,
		darkviolet: 9699539,
		deeppink: 16716947,
		deepskyblue: 49151,
		dimgray: 6908265,
		dimgrey: 6908265,
		dodgerblue: 2003199,
		firebrick: 11674146,
		floralwhite: 16775920,
		forestgreen: 2263842,
		fuchsia: 16711935,
		gainsboro: 14474460,
		ghostwhite: 16316671,
		gold: 16766720,
		goldenrod: 14329120,
		gray: 8421504,
		green: 32768,
		greenyellow: 11403055,
		grey: 8421504,
		honeydew: 15794160,
		hotpink: 16738740,
		indianred: 13458524,
		indigo: 4915330,
		ivory: 16777200,
		khaki: 15787660,
		lavender: 15132410,
		lavenderblush: 16773365,
		lawngreen: 8190976,
		lemonchiffon: 16775885,
		lightblue: 11393254,
		lightcoral: 15761536,
		lightcyan: 14745599,
		lightgoldenrodyellow: 16448210,
		lightgray: 13882323,
		lightgreen: 9498256,
		lightgrey: 13882323,
		lightpink: 16758465,
		lightsalmon: 16752762,
		lightseagreen: 2142890,
		lightskyblue: 8900346,
		lightslategray: 7833753,
		lightslategrey: 7833753,
		lightsteelblue: 11584734,
		lightyellow: 16777184,
		lime: 65280,
		limegreen: 3329330,
		linen: 16445670,
		magenta: 16711935,
		maroon: 8388608,
		mediumaquamarine: 6737322,
		mediumblue: 205,
		mediumorchid: 12211667,
		mediumpurple: 9662683,
		mediumseagreen: 3978097,
		mediumslateblue: 8087790,
		mediumspringgreen: 64154,
		mediumturquoise: 4772300,
		mediumvioletred: 13047173,
		midnightblue: 1644912,
		mintcream: 16121850,
		mistyrose: 16770273,
		moccasin: 16770229,
		navajowhite: 16768685,
		navy: 128,
		oldlace: 16643558,
		olive: 8421376,
		olivedrab: 7048739,
		orange: 16753920,
		orangered: 16729344,
		orchid: 14315734,
		palegoldenrod: 15657130,
		palegreen: 10025880,
		paleturquoise: 11529966,
		palevioletred: 14381203,
		papayawhip: 16773077,
		peachpuff: 16767673,
		peru: 13468991,
		pink: 16761035,
		plum: 14524637,
		powderblue: 11591910,
		purple: 8388736,
		rebeccapurple: 6697881,
		red: 16711680,
		rosybrown: 12357519,
		royalblue: 4286945,
		saddlebrown: 9127187,
		salmon: 16416882,
		sandybrown: 16032864,
		seagreen: 3050327,
		seashell: 16774638,
		sienna: 10506797,
		silver: 12632256,
		skyblue: 8900331,
		slateblue: 6970061,
		slategray: 7372944,
		slategrey: 7372944,
		snow: 16775930,
		springgreen: 65407,
		steelblue: 4620980,
		tan: 13808780,
		teal: 32896,
		thistle: 14204888,
		tomato: 16737095,
		turquoise: 4251856,
		violet: 15631086,
		wheat: 16113331,
		white: 16777215,
		whitesmoke: 16119285,
		yellow: 16776960,
		yellowgreen: 10145074,
	};
pr(Ue, se, {
	copy(t) {
		return Object.assign(new this.constructor(), this, t);
	},
	displayable() {
		return this.rgb().displayable();
	},
	hex: Mu,
	formatHex: Mu,
	formatHex8: Nx,
	formatHsl: Rx,
	formatRgb: Eu,
	toString: Eu,
});
function Mu() {
	return this.rgb().formatHex();
}
function Nx() {
	return this.rgb().formatHex8();
}
function Rx() {
	return Pu(this).formatHsl();
}
function Eu() {
	return this.rgb().formatRgb();
}
function se(t) {
	var e, r;
	return (
		(t = (t + "").trim().toLowerCase()),
		(e = Fx.exec(t))
			? ((r = e[1].length),
				(e = parseInt(e[1], 16)),
				r === 6
					? Ou(e)
					: r === 3
						? new Lt(
								((e >> 8) & 15) | ((e >> 4) & 240),
								((e >> 4) & 15) | (e & 240),
								((e & 15) << 4) | (e & 15),
								1,
							)
						: r === 8
							? Xo(
									(e >> 24) & 255,
									(e >> 16) & 255,
									(e >> 8) & 255,
									(e & 255) / 255,
								)
							: r === 4
								? Xo(
										((e >> 12) & 15) | ((e >> 8) & 240),
										((e >> 8) & 15) | ((e >> 4) & 240),
										((e >> 4) & 15) | (e & 240),
										(((e & 15) << 4) | (e & 15)) / 255,
									)
								: null)
			: (e = Lx.exec(t))
				? new Lt(e[1], e[2], e[3], 1)
				: (e = Mx.exec(t))
					? new Lt(
							(e[1] * 255) / 100,
							(e[2] * 255) / 100,
							(e[3] * 255) / 100,
							1,
						)
					: (e = Ex.exec(t))
						? Xo(e[1], e[2], e[3], e[4])
						: (e = Ox.exec(t))
							? Xo(
									(e[1] * 255) / 100,
									(e[2] * 255) / 100,
									(e[3] * 255) / 100,
									e[4],
								)
							: (e = Ix.exec(t))
								? Nu(e[1], e[2] / 100, e[3] / 100, 1)
								: (e = Dx.exec(t))
									? Nu(e[1], e[2] / 100, e[3] / 100, e[4])
									: Lu.hasOwnProperty(t)
										? Ou(Lu[t])
										: t === "transparent"
											? new Lt(NaN, NaN, NaN, 0)
											: null
	);
}
function Ou(t) {
	return new Lt((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function Xo(t, e, r, i) {
	return i <= 0 && (t = e = r = NaN), new Lt(t, e, r, i);
}
function rs(t) {
	return (
		t instanceof Ue || (t = se(t)),
		t ? ((t = t.rgb()), new Lt(t.r, t.g, t.b, t.opacity)) : new Lt()
	);
}
function Zr(t, e, r, i) {
	return arguments.length === 1 ? rs(t) : new Lt(t, e, r, i ?? 1);
}
function Lt(t, e, r, i) {
	(this.r = +t), (this.g = +e), (this.b = +r), (this.opacity = +i);
}
pr(
	Lt,
	Zr,
	Xr(Ue, {
		brighter(t) {
			return (
				(t = t == null ? Zo : Math.pow(Zo, t)),
				new Lt(this.r * t, this.g * t, this.b * t, this.opacity)
			);
		},
		darker(t) {
			return (
				(t = t == null ? Yi : Math.pow(Yi, t)),
				new Lt(this.r * t, this.g * t, this.b * t, this.opacity)
			);
		},
		rgb() {
			return this;
		},
		clamp() {
			return new Lt(mr(this.r), mr(this.g), mr(this.b), Qo(this.opacity));
		},
		displayable() {
			return (
				-0.5 <= this.r &&
				this.r < 255.5 &&
				-0.5 <= this.g &&
				this.g < 255.5 &&
				-0.5 <= this.b &&
				this.b < 255.5 &&
				0 <= this.opacity &&
				this.opacity <= 1
			);
		},
		hex: Iu,
		formatHex: Iu,
		formatHex8: Px,
		formatRgb: Du,
		toString: Du,
	}),
);
function Iu() {
	return `#${dr(this.r)}${dr(this.g)}${dr(this.b)}`;
}
function Px() {
	return `#${dr(this.r)}${dr(this.g)}${dr(this.b)}${dr((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Du() {
	let t = Qo(this.opacity);
	return `${t === 1 ? "rgb(" : "rgba("}${mr(this.r)}, ${mr(this.g)}, ${mr(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Qo(t) {
	return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function mr(t) {
	return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function dr(t) {
	return (t = mr(t)), (t < 16 ? "0" : "") + t.toString(16);
}
function Nu(t, e, r, i) {
	return (
		i <= 0
			? (t = e = r = NaN)
			: r <= 0 || r >= 1
				? (t = e = NaN)
				: e <= 0 && (t = NaN),
		new ae(t, e, r, i)
	);
}
function Pu(t) {
	if (t instanceof ae) return new ae(t.h, t.s, t.l, t.opacity);
	if ((t instanceof Ue || (t = se(t)), !t)) return new ae();
	if (t instanceof ae) return t;
	t = t.rgb();
	var e = t.r / 255,
		r = t.g / 255,
		i = t.b / 255,
		o = Math.min(e, r, i),
		n = Math.max(e, r, i),
		a = NaN,
		l = n - o,
		c = (n + o) / 2;
	return (
		l
			? (e === n
					? (a = (r - i) / l + (r < i) * 6)
					: r === n
						? (a = (i - e) / l + 2)
						: (a = (e - r) / l + 4),
				(l /= c < 0.5 ? n + o : 2 - n - o),
				(a *= 60))
			: (l = c > 0 && c < 1 ? 0 : a),
		new ae(a, l, c, t.opacity)
	);
}
function $u(t, e, r, i) {
	return arguments.length === 1 ? Pu(t) : new ae(t, e, r, i ?? 1);
}
function ae(t, e, r, i) {
	(this.h = +t), (this.s = +e), (this.l = +r), (this.opacity = +i);
}
pr(
	ae,
	$u,
	Xr(Ue, {
		brighter(t) {
			return (
				(t = t == null ? Zo : Math.pow(Zo, t)),
				new ae(this.h, this.s, this.l * t, this.opacity)
			);
		},
		darker(t) {
			return (
				(t = t == null ? Yi : Math.pow(Yi, t)),
				new ae(this.h, this.s, this.l * t, this.opacity)
			);
		},
		rgb() {
			var t = (this.h % 360) + (this.h < 0) * 360,
				e = isNaN(t) || isNaN(this.s) ? 0 : this.s,
				r = this.l,
				i = r + (r < 0.5 ? r : 1 - r) * e,
				o = 2 * r - i;
			return new Lt(
				es(t >= 240 ? t - 240 : t + 120, o, i),
				es(t, o, i),
				es(t < 120 ? t + 240 : t - 120, o, i),
				this.opacity,
			);
		},
		clamp() {
			return new ae(Ru(this.h), Ko(this.s), Ko(this.l), Qo(this.opacity));
		},
		displayable() {
			return (
				((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
				0 <= this.l &&
				this.l <= 1 &&
				0 <= this.opacity &&
				this.opacity <= 1
			);
		},
		formatHsl() {
			let t = Qo(this.opacity);
			return `${t === 1 ? "hsl(" : "hsla("}${Ru(this.h)}, ${Ko(this.s) * 100}%, ${Ko(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
		},
	}),
);
function Ru(t) {
	return (t = (t || 0) % 360), t < 0 ? t + 360 : t;
}
function Ko(t) {
	return Math.max(0, Math.min(1, t || 0));
}
function es(t, e, r) {
	return (
		(t < 60
			? e + ((r - e) * t) / 60
			: t < 180
				? r
				: t < 240
					? e + ((r - e) * (240 - t)) / 60
					: e) * 255
	);
}
s();
s();
var zu = Math.PI / 180,
	qu = 180 / Math.PI;
var Jo = 18,
	Wu = 0.96422,
	Uu = 1,
	Hu = 0.82521,
	Yu = 4 / 29,
	Qr = 6 / 29,
	ju = 3 * Qr * Qr,
	$x = Qr * Qr * Qr;
function Gu(t) {
	if (t instanceof ge) return new ge(t.l, t.a, t.b, t.opacity);
	if (t instanceof Le) return Vu(t);
	t instanceof Lt || (t = rs(t));
	var e = as(t.r),
		r = as(t.g),
		i = as(t.b),
		o = is((0.2225045 * e + 0.7168786 * r + 0.0606169 * i) / Uu),
		n,
		a;
	return (
		e === r && r === i
			? (n = a = o)
			: ((n = is((0.4360747 * e + 0.3850649 * r + 0.1430804 * i) / Wu)),
				(a = is((0.0139322 * e + 0.0971045 * r + 0.7141733 * i) / Hu))),
		new ge(116 * o - 16, 500 * (n - o), 200 * (o - a), t.opacity)
	);
}
function ss(t, e, r, i) {
	return arguments.length === 1 ? Gu(t) : new ge(t, e, r, i ?? 1);
}
function ge(t, e, r, i) {
	(this.l = +t), (this.a = +e), (this.b = +r), (this.opacity = +i);
}
pr(
	ge,
	ss,
	Xr(Ue, {
		brighter(t) {
			return new ge(this.l + Jo * (t ?? 1), this.a, this.b, this.opacity);
		},
		darker(t) {
			return new ge(this.l - Jo * (t ?? 1), this.a, this.b, this.opacity);
		},
		rgb() {
			var t = (this.l + 16) / 116,
				e = isNaN(this.a) ? t : t + this.a / 500,
				r = isNaN(this.b) ? t : t - this.b / 200;
			return (
				(e = Wu * os(e)),
				(t = Uu * os(t)),
				(r = Hu * os(r)),
				new Lt(
					ns(3.1338561 * e - 1.6168667 * t - 0.4906146 * r),
					ns(-0.9787684 * e + 1.9161415 * t + 0.033454 * r),
					ns(0.0719453 * e - 0.2289914 * t + 1.4052427 * r),
					this.opacity,
				)
			);
		},
	}),
);
function is(t) {
	return t > $x ? Math.pow(t, 1 / 3) : t / ju + Yu;
}
function os(t) {
	return t > Qr ? t * t * t : ju * (t - Yu);
}
function ns(t) {
	return (
		255 * (t <= 0.0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055)
	);
}
function as(t) {
	return (t /= 255) <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
}
function zx(t) {
	if (t instanceof Le) return new Le(t.h, t.c, t.l, t.opacity);
	if ((t instanceof ge || (t = Gu(t)), t.a === 0 && t.b === 0))
		return new Le(NaN, 0 < t.l && t.l < 100 ? 0 : NaN, t.l, t.opacity);
	var e = Math.atan2(t.b, t.a) * qu;
	return new Le(
		e < 0 ? e + 360 : e,
		Math.sqrt(t.a * t.a + t.b * t.b),
		t.l,
		t.opacity,
	);
}
function Gi(t, e, r, i) {
	return arguments.length === 1 ? zx(t) : new Le(t, e, r, i ?? 1);
}
function Le(t, e, r, i) {
	(this.h = +t), (this.c = +e), (this.l = +r), (this.opacity = +i);
}
function Vu(t) {
	if (isNaN(t.h)) return new ge(t.l, 0, 0, t.opacity);
	var e = t.h * zu;
	return new ge(t.l, Math.cos(e) * t.c, Math.sin(e) * t.c, t.opacity);
}
pr(
	Le,
	Gi,
	Xr(Ue, {
		brighter(t) {
			return new Le(this.h, this.c, this.l + Jo * (t ?? 1), this.opacity);
		},
		darker(t) {
			return new Le(this.h, this.c, this.l - Jo * (t ?? 1), this.opacity);
		},
		rgb() {
			return Vu(this).rgb();
		},
	}),
);
s();
s();
var Jr = (t) => () => t;
function Xu(t, e) {
	return function (r) {
		return t + r * e;
	};
}
function qx(t, e, r) {
	return (
		(t = Math.pow(t, r)),
		(e = Math.pow(e, r) - t),
		(r = 1 / r),
		function (i) {
			return Math.pow(t + i * e, r);
		}
	);
}
function Ku(t, e) {
	var r = e - t;
	return r
		? Xu(t, r > 180 || r < -180 ? r - 360 * Math.round(r / 360) : r)
		: Jr(isNaN(t) ? e : t);
}
function Zu(t) {
	return (t = +t) == 1
		? Me
		: function (e, r) {
				return r - e ? qx(e, r, t) : Jr(isNaN(e) ? r : e);
			};
}
function Me(t, e) {
	var r = e - t;
	return r ? Xu(t, r) : Jr(isNaN(t) ? e : t);
}
function Qu(t) {
	return function (e, r) {
		var i = t((e = Gi(e)).h, (r = Gi(r)).h),
			o = Me(e.c, r.c),
			n = Me(e.l, r.l),
			a = Me(e.opacity, r.opacity);
		return function (l) {
			return (
				(e.h = i(l)), (e.c = o(l)), (e.l = n(l)), (e.opacity = a(l)), e + ""
			);
		};
	};
}
var Wx = Qu(Ku),
	Ux = Qu(Me);
s();
s();
s();
s();
function ls(t, e, r, i, o) {
	var n = t * t,
		a = n * t;
	return (
		((1 - 3 * t + 3 * n - a) * e +
			(4 - 6 * n + 3 * a) * r +
			(1 + 3 * t + 3 * n - 3 * a) * i +
			a * o) /
		6
	);
}
function Ju(t) {
	var e = t.length - 1;
	return function (r) {
		var i = r <= 0 ? (r = 0) : r >= 1 ? ((r = 1), e - 1) : Math.floor(r * e),
			o = t[i],
			n = t[i + 1],
			a = i > 0 ? t[i - 1] : 2 * o - n,
			l = i < e - 1 ? t[i + 2] : 2 * n - o;
		return ls((r - i / e) * e, a, o, n, l);
	};
}
s();
function th(t) {
	var e = t.length;
	return function (r) {
		var i = Math.floor(((r %= 1) < 0 ? ++r : r) * e),
			o = t[(i + e - 1) % e],
			n = t[i % e],
			a = t[(i + 1) % e],
			l = t[(i + 2) % e];
		return ls((r - i / e) * e, o, n, a, l);
	};
}
var gr = (function t(e) {
	var r = Zu(e);
	function i(o, n) {
		var a = r((o = Zr(o)).r, (n = Zr(n)).r),
			l = r(o.g, n.g),
			c = r(o.b, n.b),
			u = Me(o.opacity, n.opacity);
		return function (p) {
			return (
				(o.r = a(p)), (o.g = l(p)), (o.b = c(p)), (o.opacity = u(p)), o + ""
			);
		};
	}
	return (i.gamma = t), i;
})(1);
function eh(t) {
	return function (e) {
		var r = e.length,
			i = new Array(r),
			o = new Array(r),
			n = new Array(r),
			a,
			l;
		for (a = 0; a < r; ++a)
			(l = Zr(e[a])), (i[a] = l.r || 0), (o[a] = l.g || 0), (n[a] = l.b || 0);
		return (
			(i = t(i)),
			(o = t(o)),
			(n = t(n)),
			(l.opacity = 1),
			function (c) {
				return (l.r = i(c)), (l.g = o(c)), (l.b = n(c)), l + "";
			}
		);
	};
}
var Hx = eh(Ju),
	Yx = eh(th);
s();
s();
function rh(t, e) {
	e || (e = []);
	var r = t ? Math.min(e.length, t.length) : 0,
		i = e.slice(),
		o;
	return function (n) {
		for (o = 0; o < r; ++o) i[o] = t[o] * (1 - n) + e[o] * n;
		return i;
	};
}
function ih(t) {
	return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function oh(t, e) {
	var r = e ? e.length : 0,
		i = t ? Math.min(r, t.length) : 0,
		o = new Array(i),
		n = new Array(r),
		a;
	for (a = 0; a < i; ++a) o[a] = xr(t[a], e[a]);
	for (; a < r; ++a) n[a] = e[a];
	return function (l) {
		for (a = 0; a < i; ++a) n[a] = o[a](l);
		return n;
	};
}
s();
function nh(t, e) {
	var r = new Date();
	return (
		(t = +t),
		(e = +e),
		function (i) {
			return r.setTime(t * (1 - i) + e * i), r;
		}
	);
}
s();
function Mt(t, e) {
	return (
		(t = +t),
		(e = +e),
		function (r) {
			return t * (1 - r) + e * r;
		}
	);
}
s();
function ah(t, e) {
	var r = {},
		i = {},
		o;
	(t === null || typeof t != "object") && (t = {}),
		(e === null || typeof e != "object") && (e = {});
	for (o in e) o in t ? (r[o] = xr(t[o], e[o])) : (i[o] = e[o]);
	return function (n) {
		for (o in r) i[o] = r[o](n);
		return i;
	};
}
s();
var us = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
	cs = new RegExp(us.source, "g");
function jx(t) {
	return function () {
		return t;
	};
}
function Gx(t) {
	return function (e) {
		return t(e) + "";
	};
}
function Vi(t, e) {
	var r = (us.lastIndex = cs.lastIndex = 0),
		i,
		o,
		n,
		a = -1,
		l = [],
		c = [];
	for (t = t + "", e = e + ""; (i = us.exec(t)) && (o = cs.exec(e)); )
		(n = o.index) > r &&
			((n = e.slice(r, n)), l[a] ? (l[a] += n) : (l[++a] = n)),
			(i = i[0]) === (o = o[0])
				? l[a]
					? (l[a] += o)
					: (l[++a] = o)
				: ((l[++a] = null), c.push({ i: a, x: Mt(i, o) })),
			(r = cs.lastIndex);
	return (
		r < e.length && ((n = e.slice(r)), l[a] ? (l[a] += n) : (l[++a] = n)),
		l.length < 2
			? c[0]
				? Gx(c[0].x)
				: jx(e)
			: ((e = c.length),
				function (u) {
					for (var p = 0, d; p < e; ++p) l[(d = c[p]).i] = d.x(u);
					return l.join("");
				})
	);
}
function xr(t, e) {
	var r = typeof e,
		i;
	return e == null || r === "boolean"
		? Jr(e)
		: (r === "number"
				? Mt
				: r === "string"
					? (i = se(e))
						? ((e = i), gr)
						: Vi
					: e instanceof se
						? gr
						: e instanceof Date
							? nh
							: ih(e)
								? rh
								: Array.isArray(e)
									? oh
									: (typeof e.valueOf != "function" &&
												typeof e.toString != "function") ||
											isNaN(e)
										? ah
										: Mt)(t, e);
}
s();
function hs(t, e) {
	return (
		(t = +t),
		(e = +e),
		function (r) {
			return Math.round(t * (1 - r) + e * r);
		}
	);
}
s();
s();
s();
var sh = 180 / Math.PI,
	tn = {
		translateX: 0,
		translateY: 0,
		rotate: 0,
		skewX: 0,
		scaleX: 1,
		scaleY: 1,
	};
function fs(t, e, r, i, o, n) {
	var a, l, c;
	return (
		(a = Math.sqrt(t * t + e * e)) && ((t /= a), (e /= a)),
		(c = t * r + e * i) && ((r -= t * c), (i -= e * c)),
		(l = Math.sqrt(r * r + i * i)) && ((r /= l), (i /= l), (c /= l)),
		t * i < e * r && ((t = -t), (e = -e), (c = -c), (a = -a)),
		{
			translateX: o,
			translateY: n,
			rotate: Math.atan2(e, t) * sh,
			skewX: Math.atan(c) * sh,
			scaleX: a,
			scaleY: l,
		}
	);
}
var en;
function lh(t) {
	let e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
		t + "",
	);
	return e.isIdentity ? tn : fs(e.a, e.b, e.c, e.d, e.e, e.f);
}
function ch(t) {
	return t == null
		? tn
		: (en || (en = document.createElementNS("http://www.w3.org/2000/svg", "g")),
			en.setAttribute("transform", t),
			(t = en.transform.baseVal.consolidate())
				? ((t = t.matrix), fs(t.a, t.b, t.c, t.d, t.e, t.f))
				: tn);
}
function uh(t, e, r, i) {
	function o(u) {
		return u.length ? u.pop() + " " : "";
	}
	function n(u, p, d, h, m, _) {
		if (u !== d || p !== h) {
			var b = m.push("translate(", null, e, null, r);
			_.push({ i: b - 4, x: Mt(u, d) }, { i: b - 2, x: Mt(p, h) });
		} else (d || h) && m.push("translate(" + d + e + h + r);
	}
	function a(u, p, d, h) {
		u !== p
			? (u - p > 180 ? (p += 360) : p - u > 180 && (u += 360),
				h.push({ i: d.push(o(d) + "rotate(", null, i) - 2, x: Mt(u, p) }))
			: p && d.push(o(d) + "rotate(" + p + i);
	}
	function l(u, p, d, h) {
		u !== p
			? h.push({ i: d.push(o(d) + "skewX(", null, i) - 2, x: Mt(u, p) })
			: p && d.push(o(d) + "skewX(" + p + i);
	}
	function c(u, p, d, h, m, _) {
		if (u !== d || p !== h) {
			var b = m.push(o(m) + "scale(", null, ",", null, ")");
			_.push({ i: b - 4, x: Mt(u, d) }, { i: b - 2, x: Mt(p, h) });
		} else (d !== 1 || h !== 1) && m.push(o(m) + "scale(" + d + "," + h + ")");
	}
	return function (u, p) {
		var d = [],
			h = [];
		return (
			(u = t(u)),
			(p = t(p)),
			n(u.translateX, u.translateY, p.translateX, p.translateY, d, h),
			a(u.rotate, p.rotate, d, h),
			l(u.skewX, p.skewX, d, h),
			c(u.scaleX, u.scaleY, p.scaleX, p.scaleY, d, h),
			(u = p = null),
			function (m) {
				for (var _ = -1, b = h.length, v; ++_ < b; ) d[(v = h[_]).i] = v.x(m);
				return d.join("");
			}
		);
	};
}
var ps = uh(lh, "px, ", "px)", "deg)"),
	ds = uh(ch, ", ", ")", ")");
s();
s();
function He(t, e) {
	switch (arguments.length) {
		case 0:
			break;
		case 1:
			this.range(t);
			break;
		default:
			this.range(e).domain(t);
			break;
	}
	return this;
}
var ms = Symbol("implicit");
function Xi() {
	var t = new Gr(),
		e = [],
		r = [],
		i = ms;
	function o(n) {
		let a = t.get(n);
		if (a === void 0) {
			if (i !== ms) return i;
			t.set(n, (a = e.push(n) - 1));
		}
		return r[a % r.length];
	}
	return (
		(o.domain = function (n) {
			if (!arguments.length) return e.slice();
			(e = []), (t = new Gr());
			for (let a of n) t.has(a) || t.set(a, e.push(a) - 1);
			return o;
		}),
		(o.range = function (n) {
			return arguments.length ? ((r = Array.from(n)), o) : r.slice();
		}),
		(o.unknown = function (n) {
			return arguments.length ? ((i = n), o) : i;
		}),
		(o.copy = function () {
			return Xi(e, r).unknown(i);
		}),
		He.apply(o, arguments),
		o
	);
}
s();
function gs() {
	var t = Xi().unknown(void 0),
		e = t.domain,
		r = t.range,
		i = 0,
		o = 1,
		n,
		a,
		l = !1,
		c = 0,
		u = 0,
		p = 0.5;
	delete t.unknown;
	function d() {
		var h = e().length,
			m = o < i,
			_ = m ? o : i,
			b = m ? i : o;
		(n = (b - _) / Math.max(1, h - c + u * 2)),
			l && (n = Math.floor(n)),
			(_ += (b - _ - n * (h - c)) * p),
			(a = n * (1 - c)),
			l && ((_ = Math.round(_)), (a = Math.round(a)));
		var v = qo(h).map(function (F) {
			return _ + n * F;
		});
		return r(m ? v.reverse() : v);
	}
	return (
		(t.domain = function (h) {
			return arguments.length ? (e(h), d()) : e();
		}),
		(t.range = function (h) {
			return arguments.length
				? (([i, o] = h), (i = +i), (o = +o), d())
				: [i, o];
		}),
		(t.rangeRound = function (h) {
			return ([i, o] = h), (i = +i), (o = +o), (l = !0), d();
		}),
		(t.bandwidth = function () {
			return a;
		}),
		(t.step = function () {
			return n;
		}),
		(t.round = function (h) {
			return arguments.length ? ((l = !!h), d()) : l;
		}),
		(t.padding = function (h) {
			return arguments.length ? ((c = Math.min(1, (u = +h))), d()) : c;
		}),
		(t.paddingInner = function (h) {
			return arguments.length ? ((c = Math.min(1, h)), d()) : c;
		}),
		(t.paddingOuter = function (h) {
			return arguments.length ? ((u = +h), d()) : u;
		}),
		(t.align = function (h) {
			return arguments.length ? ((p = Math.max(0, Math.min(1, h))), d()) : p;
		}),
		(t.copy = function () {
			return gs(e(), [i, o]).round(l).paddingInner(c).paddingOuter(u).align(p);
		}),
		He.apply(d(), arguments)
	);
}
s();
s();
s();
function xs(t) {
	return function () {
		return t;
	};
}
s();
function ys(t) {
	return +t;
}
var hh = [0, 1];
function ti(t) {
	return t;
}
function _s(t, e) {
	return (e -= t = +t)
		? function (r) {
				return (r - t) / e;
			}
		: xs(isNaN(e) ? NaN : 0.5);
}
function Vx(t, e) {
	var r;
	return (
		t > e && ((r = t), (t = e), (e = r)),
		function (i) {
			return Math.max(t, Math.min(e, i));
		}
	);
}
function Xx(t, e, r) {
	var i = t[0],
		o = t[1],
		n = e[0],
		a = e[1];
	return (
		o < i ? ((i = _s(o, i)), (n = r(a, n))) : ((i = _s(i, o)), (n = r(n, a))),
		function (l) {
			return n(i(l));
		}
	);
}
function Kx(t, e, r) {
	var i = Math.min(t.length, e.length) - 1,
		o = new Array(i),
		n = new Array(i),
		a = -1;
	for (
		t[i] < t[0] && ((t = t.slice().reverse()), (e = e.slice().reverse()));
		++a < i;
	)
		(o[a] = _s(t[a], t[a + 1])), (n[a] = r(e[a], e[a + 1]));
	return function (l) {
		var c = Ka(t, l, 1, i) - 1;
		return n[c](o[c](l));
	};
}
function rn(t, e) {
	return e
		.domain(t.domain())
		.range(t.range())
		.interpolate(t.interpolate())
		.clamp(t.clamp())
		.unknown(t.unknown());
}
function Zx() {
	var t = hh,
		e = hh,
		r = xr,
		i,
		o,
		n,
		a = ti,
		l,
		c,
		u;
	function p() {
		var h = Math.min(t.length, e.length);
		return (
			a !== ti && (a = Vx(t[0], t[h - 1])),
			(l = h > 2 ? Kx : Xx),
			(c = u = null),
			d
		);
	}
	function d(h) {
		return h == null || isNaN((h = +h))
			? n
			: (c || (c = l(t.map(i), e, r)))(i(a(h)));
	}
	return (
		(d.invert = function (h) {
			return a(o((u || (u = l(e, t.map(i), Mt)))(h)));
		}),
		(d.domain = function (h) {
			return arguments.length ? ((t = Array.from(h, ys)), p()) : t.slice();
		}),
		(d.range = function (h) {
			return arguments.length ? ((e = Array.from(h)), p()) : e.slice();
		}),
		(d.rangeRound = function (h) {
			return (e = Array.from(h)), (r = hs), p();
		}),
		(d.clamp = function (h) {
			return arguments.length ? ((a = h ? !0 : ti), p()) : a !== ti;
		}),
		(d.interpolate = function (h) {
			return arguments.length ? ((r = h), p()) : r;
		}),
		(d.unknown = function (h) {
			return arguments.length ? ((n = h), d) : n;
		}),
		function (h, m) {
			return (i = h), (o = m), p();
		}
	);
}
function Ki() {
	return Zx()(ti, ti);
}
s();
s();
s();
s();
s();
s();
function fh(t) {
	return Math.abs((t = Math.round(t))) >= 1e21
		? t.toLocaleString("en").replace(/,/g, "")
		: t.toString(10);
}
function yr(t, e) {
	if (
		(r = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0
	)
		return null;
	var r,
		i = t.slice(0, r);
	return [i.length > 1 ? i[0] + i.slice(2) : i, +t.slice(r + 1)];
}
function xe(t) {
	return (t = yr(Math.abs(t))), t ? t[1] : NaN;
}
s();
function ph(t, e) {
	return function (r, i) {
		for (
			var o = r.length, n = [], a = 0, l = t[0], c = 0;
			o > 0 &&
			l > 0 &&
			(c + l + 1 > i && (l = Math.max(1, i - c)),
			n.push(r.substring((o -= l), o + l)),
			!((c += l + 1) > i));
		)
			l = t[(a = (a + 1) % t.length)];
		return n.reverse().join(e);
	};
}
s();
function dh(t) {
	return function (e) {
		return e.replace(/[0-9]/g, function (r) {
			return t[+r];
		});
	};
}
s();
var Qx =
	/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Ye(t) {
	if (!(e = Qx.exec(t))) throw new Error("invalid format: " + t);
	var e;
	return new on({
		fill: e[1],
		align: e[2],
		sign: e[3],
		symbol: e[4],
		zero: e[5],
		width: e[6],
		comma: e[7],
		precision: e[8] && e[8].slice(1),
		trim: e[9],
		type: e[10],
	});
}
Ye.prototype = on.prototype;
function on(t) {
	(this.fill = t.fill === void 0 ? " " : t.fill + ""),
		(this.align = t.align === void 0 ? ">" : t.align + ""),
		(this.sign = t.sign === void 0 ? "-" : t.sign + ""),
		(this.symbol = t.symbol === void 0 ? "" : t.symbol + ""),
		(this.zero = !!t.zero),
		(this.width = t.width === void 0 ? void 0 : +t.width),
		(this.comma = !!t.comma),
		(this.precision = t.precision === void 0 ? void 0 : +t.precision),
		(this.trim = !!t.trim),
		(this.type = t.type === void 0 ? "" : t.type + "");
}
on.prototype.toString = function () {
	return (
		this.fill +
		this.align +
		this.sign +
		this.symbol +
		(this.zero ? "0" : "") +
		(this.width === void 0 ? "" : Math.max(1, this.width | 0)) +
		(this.comma ? "," : "") +
		(this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) +
		(this.trim ? "~" : "") +
		this.type
	);
};
s();
function mh(t) {
	t: for (var e = t.length, r = 1, i = -1, o; r < e; ++r)
		switch (t[r]) {
			case ".":
				i = o = r;
				break;
			case "0":
				i === 0 && (i = r), (o = r);
				break;
			default:
				if (!+t[r]) break t;
				i > 0 && (i = 0);
				break;
		}
	return i > 0 ? t.slice(0, i) + t.slice(o + 1) : t;
}
s();
s();
var Cs;
function gh(t, e) {
	var r = yr(t, e);
	if (!r) return t + "";
	var i = r[0],
		o = r[1],
		n = o - (Cs = Math.max(-8, Math.min(8, Math.floor(o / 3))) * 3) + 1,
		a = i.length;
	return n === a
		? i
		: n > a
			? i + new Array(n - a + 1).join("0")
			: n > 0
				? i.slice(0, n) + "." + i.slice(n)
				: "0." + new Array(1 - n).join("0") + yr(t, Math.max(0, e + n - 1))[0];
}
s();
function bs(t, e) {
	var r = yr(t, e);
	if (!r) return t + "";
	var i = r[0],
		o = r[1];
	return o < 0
		? "0." + new Array(-o).join("0") + i
		: i.length > o + 1
			? i.slice(0, o + 1) + "." + i.slice(o + 1)
			: i + new Array(o - i.length + 2).join("0");
}
var Ts = {
	"%": (t, e) => (t * 100).toFixed(e),
	b: (t) => Math.round(t).toString(2),
	c: (t) => t + "",
	d: fh,
	e: (t, e) => t.toExponential(e),
	f: (t, e) => t.toFixed(e),
	g: (t, e) => t.toPrecision(e),
	o: (t) => Math.round(t).toString(8),
	p: (t, e) => bs(t * 100, e),
	r: bs,
	s: gh,
	X: (t) => Math.round(t).toString(16).toUpperCase(),
	x: (t) => Math.round(t).toString(16),
};
s();
function vs(t) {
	return t;
}
var xh = Array.prototype.map,
	yh = [
		"y",
		"z",
		"a",
		"f",
		"p",
		"n",
		"\xB5",
		"m",
		"",
		"k",
		"M",
		"G",
		"T",
		"P",
		"E",
		"Z",
		"Y",
	];
function _h(t) {
	var e =
			t.grouping === void 0 || t.thousands === void 0
				? vs
				: ph(xh.call(t.grouping, Number), t.thousands + ""),
		r = t.currency === void 0 ? "" : t.currency[0] + "",
		i = t.currency === void 0 ? "" : t.currency[1] + "",
		o = t.decimal === void 0 ? "." : t.decimal + "",
		n = t.numerals === void 0 ? vs : dh(xh.call(t.numerals, String)),
		a = t.percent === void 0 ? "%" : t.percent + "",
		l = t.minus === void 0 ? "\u2212" : t.minus + "",
		c = t.nan === void 0 ? "NaN" : t.nan + "";
	function u(d) {
		d = Ye(d);
		var h = d.fill,
			m = d.align,
			_ = d.sign,
			b = d.symbol,
			v = d.zero,
			F = d.width,
			T = d.comma,
			O = d.precision,
			A = d.trim,
			R = d.type;
		R === "n"
			? ((T = !0), (R = "g"))
			: Ts[R] || (O === void 0 && (O = 12), (A = !0), (R = "g")),
			(v || (h === "0" && m === "=")) && ((v = !0), (h = "0"), (m = "="));
		var k =
				b === "$"
					? r
					: b === "#" && /[boxX]/.test(R)
						? "0" + R.toLowerCase()
						: "",
			D = b === "$" ? i : /[%p]/.test(R) ? a : "",
			M = Ts[R],
			K = /[defgprs%]/.test(R);
		O =
			O === void 0
				? 6
				: /[gprs]/.test(R)
					? Math.max(1, Math.min(21, O))
					: Math.max(0, Math.min(20, O));
		function J(P) {
			var L = k,
				y = D,
				C,
				N,
				w;
			if (R === "c") (y = M(P) + y), (P = "");
			else {
				P = +P;
				var q = P < 0 || 1 / P < 0;
				if (
					((P = isNaN(P) ? c : M(Math.abs(P), O)),
					A && (P = mh(P)),
					q && +P == 0 && _ !== "+" && (q = !1),
					(L = (q ? (_ === "(" ? _ : l) : _ === "-" || _ === "(" ? "" : _) + L),
					(y =
						(R === "s" ? yh[8 + Cs / 3] : "") +
						y +
						(q && _ === "(" ? ")" : "")),
					K)
				) {
					for (C = -1, N = P.length; ++C < N; )
						if (((w = P.charCodeAt(C)), 48 > w || w > 57)) {
							(y = (w === 46 ? o + P.slice(C + 1) : P.slice(C)) + y),
								(P = P.slice(0, C));
							break;
						}
				}
			}
			T && !v && (P = e(P, 1 / 0));
			var $ = L.length + P.length + y.length,
				H = $ < F ? new Array(F - $ + 1).join(h) : "";
			switch (
				(T && v && ((P = e(H + P, H.length ? F - y.length : 1 / 0)), (H = "")),
				m)
			) {
				case "<":
					P = L + P + y + H;
					break;
				case "=":
					P = L + H + P + y;
					break;
				case "^":
					P = H.slice(0, ($ = H.length >> 1)) + L + P + y + H.slice($);
					break;
				default:
					P = H + L + P + y;
					break;
			}
			return n(P);
		}
		return (
			(J.toString = function () {
				return d + "";
			}),
			J
		);
	}
	function p(d, h) {
		var m = u(((d = Ye(d)), (d.type = "f"), d)),
			_ = Math.max(-8, Math.min(8, Math.floor(xe(h) / 3))) * 3,
			b = Math.pow(10, -_),
			v = yh[8 + _ / 3];
		return function (F) {
			return m(b * F) + v;
		};
	}
	return { format: u, formatPrefix: p };
}
var nn, an, sn;
ks({ thousands: ",", grouping: [3], currency: ["$", ""] });
function ks(t) {
	return (nn = _h(t)), (an = nn.format), (sn = nn.formatPrefix), nn;
}
s();
function Ss(t) {
	return Math.max(0, -xe(Math.abs(t)));
}
s();
function ws(t, e) {
	return Math.max(
		0,
		Math.max(-8, Math.min(8, Math.floor(xe(e) / 3))) * 3 - xe(Math.abs(t)),
	);
}
s();
function As(t, e) {
	return (
		(t = Math.abs(t)), (e = Math.abs(e) - t), Math.max(0, xe(e) - xe(t)) + 1
	);
}
function Bs(t, e, r, i) {
	var o = Vr(t, e, r),
		n;
	switch (((i = Ye(i ?? ",f")), i.type)) {
		case "s": {
			var a = Math.max(Math.abs(t), Math.abs(e));
			return (
				i.precision == null && !isNaN((n = ws(o, a))) && (i.precision = n),
				sn(i, a)
			);
		}
		case "":
		case "e":
		case "g":
		case "p":
		case "r": {
			i.precision == null &&
				!isNaN((n = As(o, Math.max(Math.abs(t), Math.abs(e))))) &&
				(i.precision = n - (i.type === "e"));
			break;
		}
		case "f":
		case "%": {
			i.precision == null &&
				!isNaN((n = Ss(o))) &&
				(i.precision = n - (i.type === "%") * 2);
			break;
		}
	}
	return an(i);
}
function Jx(t) {
	var e = t.domain;
	return (
		(t.ticks = function (r) {
			var i = e();
			return zo(i[0], i[i.length - 1], r ?? 10);
		}),
		(t.tickFormat = function (r, i) {
			var o = e();
			return Bs(o[0], o[o.length - 1], r ?? 10, i);
		}),
		(t.nice = function (r) {
			r == null && (r = 10);
			var i = e(),
				o = 0,
				n = i.length - 1,
				a = i[o],
				l = i[n],
				c,
				u,
				p = 10;
			for (
				l < a && ((u = a), (a = l), (l = u), (u = o), (o = n), (n = u));
				p-- > 0;
			) {
				if (((u = $i(a, l, r)), u === c)) return (i[o] = a), (i[n] = l), e(i);
				if (u > 0) (a = Math.floor(a / u) * u), (l = Math.ceil(l / u) * u);
				else if (u < 0) (a = Math.ceil(a * u) / u), (l = Math.floor(l * u) / u);
				else break;
				c = u;
			}
			return t;
		}),
		t
	);
}
function Fs() {
	var t = Ki();
	return (
		(t.copy = function () {
			return rn(t, Fs());
		}),
		He.apply(t, arguments),
		Jx(t)
	);
}
s();
s();
var Ls = new Date(),
	Ms = new Date();
function lt(t, e, r, i) {
	function o(n) {
		return t((n = arguments.length === 0 ? new Date() : new Date(+n))), n;
	}
	return (
		(o.floor = (n) => (t((n = new Date(+n))), n)),
		(o.ceil = (n) => (t((n = new Date(n - 1))), e(n, 1), t(n), n)),
		(o.round = (n) => {
			let a = o(n),
				l = o.ceil(n);
			return n - a < l - n ? a : l;
		}),
		(o.offset = (n, a) => (
			e((n = new Date(+n)), a == null ? 1 : Math.floor(a)), n
		)),
		(o.range = (n, a, l) => {
			let c = [];
			if (
				((n = o.ceil(n)),
				(l = l == null ? 1 : Math.floor(l)),
				!(n < a) || !(l > 0))
			)
				return c;
			let u;
			do c.push((u = new Date(+n))), e(n, l), t(n);
			while (u < n && n < a);
			return c;
		}),
		(o.filter = (n) =>
			lt(
				(a) => {
					if (a >= a) for (; t(a), !n(a); ) a.setTime(a - 1);
				},
				(a, l) => {
					if (a >= a)
						if (l < 0) for (; ++l <= 0; ) for (; e(a, -1), !n(a); );
						else for (; --l >= 0; ) for (; e(a, 1), !n(a); );
				},
			)),
		r &&
			((o.count = (n, a) => (
				Ls.setTime(+n), Ms.setTime(+a), t(Ls), t(Ms), Math.floor(r(Ls, Ms))
			)),
			(o.every = (n) => (
				(n = Math.floor(n)),
				!isFinite(n) || !(n > 0)
					? null
					: n > 1
						? o.filter(
								i ? (a) => i(a) % n === 0 : (a) => o.count(0, a) % n === 0,
							)
						: o
			))),
		o
	);
}
var _r = lt(
	() => {},
	(t, e) => {
		t.setTime(+t + e);
	},
	(t, e) => e - t,
);
_r.every = (t) => (
	(t = Math.floor(t)),
	!isFinite(t) || !(t > 0)
		? null
		: t > 1
			? lt(
					(e) => {
						e.setTime(Math.floor(e / t) * t);
					},
					(e, r) => {
						e.setTime(+e + r * t);
					},
					(e, r) => (r - e) / t,
				)
			: _r
);
var Ch = _r.range;
s();
var ye = lt(
		(t) => {
			t.setTime(t - t.getMilliseconds());
		},
		(t, e) => {
			t.setTime(+t + e * 1e3);
		},
		(t, e) => (e - t) / 1e3,
		(t) => t.getUTCSeconds(),
	),
	bh = ye.range;
s();
var ei = lt(
		(t) => {
			t.setTime(t - t.getMilliseconds() - t.getSeconds() * 1e3);
		},
		(t, e) => {
			t.setTime(+t + e * 6e4);
		},
		(t, e) => (e - t) / 6e4,
		(t) => t.getMinutes(),
	),
	ty = ei.range,
	ln = lt(
		(t) => {
			t.setUTCSeconds(0, 0);
		},
		(t, e) => {
			t.setTime(+t + e * 6e4);
		},
		(t, e) => (e - t) / 6e4,
		(t) => t.getUTCMinutes(),
	),
	ey = ln.range;
s();
var ri = lt(
		(t) => {
			t.setTime(
				t - t.getMilliseconds() - t.getSeconds() * 1e3 - t.getMinutes() * 6e4,
			);
		},
		(t, e) => {
			t.setTime(+t + e * 36e5);
		},
		(t, e) => (e - t) / 36e5,
		(t) => t.getHours(),
	),
	ry = ri.range,
	cn = lt(
		(t) => {
			t.setUTCMinutes(0, 0, 0);
		},
		(t, e) => {
			t.setTime(+t + e * 36e5);
		},
		(t, e) => (e - t) / 36e5,
		(t) => t.getUTCHours(),
	),
	iy = cn.range;
s();
var Ee = lt(
		(t) => t.setHours(0, 0, 0, 0),
		(t, e) => t.setDate(t.getDate() + e),
		(t, e) =>
			(e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * 6e4) / 864e5,
		(t) => t.getDate() - 1,
	),
	oy = Ee.range,
	Qi = lt(
		(t) => {
			t.setUTCHours(0, 0, 0, 0);
		},
		(t, e) => {
			t.setUTCDate(t.getUTCDate() + e);
		},
		(t, e) => (e - t) / 864e5,
		(t) => t.getUTCDate() - 1,
	),
	ny = Qi.range,
	un = lt(
		(t) => {
			t.setUTCHours(0, 0, 0, 0);
		},
		(t, e) => {
			t.setUTCDate(t.getUTCDate() + e);
		},
		(t, e) => (e - t) / 864e5,
		(t) => Math.floor(t / 864e5),
	),
	ay = un.range;
s();
function Tr(t) {
	return lt(
		(e) => {
			e.setDate(e.getDate() - ((e.getDay() + 7 - t) % 7)),
				e.setHours(0, 0, 0, 0);
		},
		(e, r) => {
			e.setDate(e.getDate() + r * 7);
		},
		(e, r) =>
			(r - e - (r.getTimezoneOffset() - e.getTimezoneOffset()) * 6e4) / 6048e5,
	);
}
var Oe = Tr(0),
	ii = Tr(1),
	vh = Tr(2),
	kh = Tr(3),
	je = Tr(4),
	Sh = Tr(5),
	wh = Tr(6),
	Ah = Oe.range,
	sy = ii.range,
	ly = vh.range,
	cy = kh.range,
	uy = je.range,
	hy = Sh.range,
	fy = wh.range;
function vr(t) {
	return lt(
		(e) => {
			e.setUTCDate(e.getUTCDate() - ((e.getUTCDay() + 7 - t) % 7)),
				e.setUTCHours(0, 0, 0, 0);
		},
		(e, r) => {
			e.setUTCDate(e.getUTCDate() + r * 7);
		},
		(e, r) => (r - e) / 6048e5,
	);
}
var kr = vr(0),
	oi = vr(1),
	Bh = vr(2),
	Fh = vr(3),
	Ge = vr(4),
	Lh = vr(5),
	Mh = vr(6),
	Eh = kr.range,
	py = oi.range,
	dy = Bh.range,
	my = Fh.range,
	gy = Ge.range,
	xy = Lh.range,
	yy = Mh.range;
s();
var ni = lt(
		(t) => {
			t.setDate(1), t.setHours(0, 0, 0, 0);
		},
		(t, e) => {
			t.setMonth(t.getMonth() + e);
		},
		(t, e) =>
			e.getMonth() - t.getMonth() + (e.getFullYear() - t.getFullYear()) * 12,
		(t) => t.getMonth(),
	),
	_y = ni.range,
	hn = lt(
		(t) => {
			t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0);
		},
		(t, e) => {
			t.setUTCMonth(t.getUTCMonth() + e);
		},
		(t, e) =>
			e.getUTCMonth() -
			t.getUTCMonth() +
			(e.getUTCFullYear() - t.getUTCFullYear()) * 12,
		(t) => t.getUTCMonth(),
	),
	Cy = hn.range;
s();
s();
var te = lt(
	(t) => {
		t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
	},
	(t, e) => {
		t.setFullYear(t.getFullYear() + e);
	},
	(t, e) => e.getFullYear() - t.getFullYear(),
	(t) => t.getFullYear(),
);
te.every = (t) =>
	!isFinite((t = Math.floor(t))) || !(t > 0)
		? null
		: lt(
				(e) => {
					e.setFullYear(Math.floor(e.getFullYear() / t) * t),
						e.setMonth(0, 1),
						e.setHours(0, 0, 0, 0);
				},
				(e, r) => {
					e.setFullYear(e.getFullYear() + r * t);
				},
			);
var by = te.range,
	le = lt(
		(t) => {
			t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
		},
		(t, e) => {
			t.setUTCFullYear(t.getUTCFullYear() + e);
		},
		(t, e) => e.getUTCFullYear() - t.getUTCFullYear(),
		(t) => t.getUTCFullYear(),
	);
le.every = (t) =>
	!isFinite((t = Math.floor(t))) || !(t > 0)
		? null
		: lt(
				(e) => {
					e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t),
						e.setUTCMonth(0, 1),
						e.setUTCHours(0, 0, 0, 0);
				},
				(e, r) => {
					e.setUTCFullYear(e.getUTCFullYear() + r * t);
				},
			);
var Ty = le.range;
s();
function Ih(t, e, r, i, o, n) {
	let a = [
		[ye, 1, 1e3],
		[ye, 5, 5 * 1e3],
		[ye, 15, 15 * 1e3],
		[ye, 30, 30 * 1e3],
		[n, 1, 6e4],
		[n, 5, 5 * 6e4],
		[n, 15, 15 * 6e4],
		[n, 30, 30 * 6e4],
		[o, 1, 36e5],
		[o, 3, 3 * 36e5],
		[o, 6, 6 * 36e5],
		[o, 12, 12 * 36e5],
		[i, 1, 864e5],
		[i, 2, 2 * 864e5],
		[r, 1, 6048e5],
		[e, 1, 2592e6],
		[e, 3, 3 * 2592e6],
		[t, 1, 31536e6],
	];
	function l(u, p, d) {
		let h = p < u;
		h && ([u, p] = [p, u]);
		let m = d && typeof d.range == "function" ? d : c(u, p, d),
			_ = m ? m.range(u, +p + 1) : [];
		return h ? _.reverse() : _;
	}
	function c(u, p, d) {
		let h = Math.abs(p - u) / d,
			m = hr(([, , v]) => v).right(a, h);
		if (m === a.length) return t.every(Vr(u / 31536e6, p / 31536e6, d));
		if (m === 0) return _r.every(Math.max(Vr(u, p, d), 1));
		let [_, b] = a[h / a[m - 1][2] < a[m][2] / h ? m - 1 : m];
		return _.every(b);
	}
	return [l, c];
}
var [ky, Sy] = Ih(le, hn, kr, un, cn, ln),
	[Es, Os] = Ih(te, ni, Oe, Ee, ri, ei);
s();
s();
function Is(t) {
	if (0 <= t.y && t.y < 100) {
		var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
		return e.setFullYear(t.y), e;
	}
	return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
}
function Ds(t) {
	if (0 <= t.y && t.y < 100) {
		var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
		return e.setUTCFullYear(t.y), e;
	}
	return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
}
function Ji(t, e, r) {
	return { y: t, m: e, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function Ns(t) {
	var e = t.dateTime,
		r = t.date,
		i = t.time,
		o = t.periods,
		n = t.days,
		a = t.shortDays,
		l = t.months,
		c = t.shortMonths,
		u = to(o),
		p = eo(o),
		d = to(n),
		h = eo(n),
		m = to(a),
		_ = eo(a),
		b = to(l),
		v = eo(l),
		F = to(c),
		T = eo(c),
		O = {
			a: q,
			A: $,
			b: H,
			B: rt,
			c: null,
			d: zh,
			e: zh,
			f: Vy,
			g: o_,
			G: a_,
			H: Yy,
			I: jy,
			j: Gy,
			L: Yh,
			m: Xy,
			M: Ky,
			p: at,
			q: st,
			Q: Uh,
			s: Hh,
			S: Zy,
			u: Qy,
			U: Jy,
			V: t_,
			w: e_,
			W: r_,
			x: null,
			X: null,
			y: i_,
			Y: n_,
			Z: s_,
			"%": Wh,
		},
		A = {
			a: gt,
			A: jt,
			b: dt,
			B: Jt,
			c: null,
			d: qh,
			e: qh,
			f: h_,
			g: b_,
			G: v_,
			H: l_,
			I: c_,
			j: u_,
			L: Gh,
			m: f_,
			M: p_,
			p: Pt,
			q: pt,
			Q: Uh,
			s: Hh,
			S: d_,
			u: m_,
			U: g_,
			V: x_,
			w: y_,
			W: __,
			x: null,
			X: null,
			y: C_,
			Y: T_,
			Z: k_,
			"%": Wh,
		},
		R = {
			a: J,
			A: P,
			b: L,
			B: y,
			c: C,
			d: Ph,
			e: Ph,
			f: qy,
			g: Rh,
			G: Nh,
			H: $h,
			I: $h,
			j: Ry,
			L: zy,
			m: Ny,
			M: Py,
			p: K,
			q: Dy,
			Q: Uy,
			s: Hy,
			S: $y,
			u: Ly,
			U: My,
			V: Ey,
			w: Fy,
			W: Oy,
			x: N,
			X: w,
			y: Rh,
			Y: Nh,
			Z: Iy,
			"%": Wy,
		};
	(O.x = k(r, O)),
		(O.X = k(i, O)),
		(O.c = k(e, O)),
		(A.x = k(r, A)),
		(A.X = k(i, A)),
		(A.c = k(e, A));
	function k(I, Z) {
		return function (Q) {
			var S = [],
				Bt = -1,
				it = 0,
				$t = I.length,
				zt,
				he,
				Mo;
			for (Q instanceof Date || (Q = new Date(+Q)); ++Bt < $t; )
				I.charCodeAt(Bt) === 37 &&
					(S.push(I.slice(it, Bt)),
					(he = Dh[(zt = I.charAt(++Bt))]) != null
						? (zt = I.charAt(++Bt))
						: (he = zt === "e" ? " " : "0"),
					(Mo = Z[zt]) && (zt = Mo(Q, he)),
					S.push(zt),
					(it = Bt + 1));
			return S.push(I.slice(it, Bt)), S.join("");
		};
	}
	function D(I, Z) {
		return function (Q) {
			var S = Ji(1900, void 0, 1),
				Bt = M(S, I, (Q += ""), 0),
				it,
				$t;
			if (Bt != Q.length) return null;
			if ("Q" in S) return new Date(S.Q);
			if ("s" in S) return new Date(S.s * 1e3 + ("L" in S ? S.L : 0));
			if (
				(Z && !("Z" in S) && (S.Z = 0),
				"p" in S && (S.H = (S.H % 12) + S.p * 12),
				S.m === void 0 && (S.m = "q" in S ? S.q : 0),
				"V" in S)
			) {
				if (S.V < 1 || S.V > 53) return null;
				"w" in S || (S.w = 1),
					"Z" in S
						? ((it = Ds(Ji(S.y, 0, 1))),
							($t = it.getUTCDay()),
							(it = $t > 4 || $t === 0 ? oi.ceil(it) : oi(it)),
							(it = Qi.offset(it, (S.V - 1) * 7)),
							(S.y = it.getUTCFullYear()),
							(S.m = it.getUTCMonth()),
							(S.d = it.getUTCDate() + ((S.w + 6) % 7)))
						: ((it = Is(Ji(S.y, 0, 1))),
							($t = it.getDay()),
							(it = $t > 4 || $t === 0 ? ii.ceil(it) : ii(it)),
							(it = Ee.offset(it, (S.V - 1) * 7)),
							(S.y = it.getFullYear()),
							(S.m = it.getMonth()),
							(S.d = it.getDate() + ((S.w + 6) % 7)));
			} else
				("W" in S || "U" in S) &&
					("w" in S || (S.w = "u" in S ? S.u % 7 : "W" in S ? 1 : 0),
					($t =
						"Z" in S
							? Ds(Ji(S.y, 0, 1)).getUTCDay()
							: Is(Ji(S.y, 0, 1)).getDay()),
					(S.m = 0),
					(S.d =
						"W" in S
							? ((S.w + 6) % 7) + S.W * 7 - (($t + 5) % 7)
							: S.w + S.U * 7 - (($t + 6) % 7)));
			return "Z" in S
				? ((S.H += (S.Z / 100) | 0), (S.M += S.Z % 100), Ds(S))
				: Is(S);
		};
	}
	function M(I, Z, Q, S) {
		for (var Bt = 0, it = Z.length, $t = Q.length, zt, he; Bt < it; ) {
			if (S >= $t) return -1;
			if (((zt = Z.charCodeAt(Bt++)), zt === 37)) {
				if (
					((zt = Z.charAt(Bt++)),
					(he = R[zt in Dh ? Z.charAt(Bt++) : zt]),
					!he || (S = he(I, Q, S)) < 0)
				)
					return -1;
			} else if (zt != Q.charCodeAt(S++)) return -1;
		}
		return S;
	}
	function K(I, Z, Q) {
		var S = u.exec(Z.slice(Q));
		return S ? ((I.p = p.get(S[0].toLowerCase())), Q + S[0].length) : -1;
	}
	function J(I, Z, Q) {
		var S = m.exec(Z.slice(Q));
		return S ? ((I.w = _.get(S[0].toLowerCase())), Q + S[0].length) : -1;
	}
	function P(I, Z, Q) {
		var S = d.exec(Z.slice(Q));
		return S ? ((I.w = h.get(S[0].toLowerCase())), Q + S[0].length) : -1;
	}
	function L(I, Z, Q) {
		var S = F.exec(Z.slice(Q));
		return S ? ((I.m = T.get(S[0].toLowerCase())), Q + S[0].length) : -1;
	}
	function y(I, Z, Q) {
		var S = b.exec(Z.slice(Q));
		return S ? ((I.m = v.get(S[0].toLowerCase())), Q + S[0].length) : -1;
	}
	function C(I, Z, Q) {
		return M(I, e, Z, Q);
	}
	function N(I, Z, Q) {
		return M(I, r, Z, Q);
	}
	function w(I, Z, Q) {
		return M(I, i, Z, Q);
	}
	function q(I) {
		return a[I.getDay()];
	}
	function $(I) {
		return n[I.getDay()];
	}
	function H(I) {
		return c[I.getMonth()];
	}
	function rt(I) {
		return l[I.getMonth()];
	}
	function at(I) {
		return o[+(I.getHours() >= 12)];
	}
	function st(I) {
		return 1 + ~~(I.getMonth() / 3);
	}
	function gt(I) {
		return a[I.getUTCDay()];
	}
	function jt(I) {
		return n[I.getUTCDay()];
	}
	function dt(I) {
		return c[I.getUTCMonth()];
	}
	function Jt(I) {
		return l[I.getUTCMonth()];
	}
	function Pt(I) {
		return o[+(I.getUTCHours() >= 12)];
	}
	function pt(I) {
		return 1 + ~~(I.getUTCMonth() / 3);
	}
	return {
		format: function (I) {
			var Z = k((I += ""), O);
			return (
				(Z.toString = function () {
					return I;
				}),
				Z
			);
		},
		parse: function (I) {
			var Z = D((I += ""), !1);
			return (
				(Z.toString = function () {
					return I;
				}),
				Z
			);
		},
		utcFormat: function (I) {
			var Z = k((I += ""), A);
			return (
				(Z.toString = function () {
					return I;
				}),
				Z
			);
		},
		utcParse: function (I) {
			var Z = D((I += ""), !0);
			return (
				(Z.toString = function () {
					return I;
				}),
				Z
			);
		},
	};
}
var Dh = { "-": "", _: " ", 0: "0" },
	wt = /^\s*\d+/,
	wy = /^%/,
	Ay = /[\\^$*+?|[\]().{}]/g;
function nt(t, e, r) {
	var i = t < 0 ? "-" : "",
		o = (i ? -t : t) + "",
		n = o.length;
	return i + (n < r ? new Array(r - n + 1).join(e) + o : o);
}
function By(t) {
	return t.replace(Ay, "\\$&");
}
function to(t) {
	return new RegExp("^(?:" + t.map(By).join("|") + ")", "i");
}
function eo(t) {
	return new Map(t.map((e, r) => [e.toLowerCase(), r]));
}
function Fy(t, e, r) {
	var i = wt.exec(e.slice(r, r + 1));
	return i ? ((t.w = +i[0]), r + i[0].length) : -1;
}
function Ly(t, e, r) {
	var i = wt.exec(e.slice(r, r + 1));
	return i ? ((t.u = +i[0]), r + i[0].length) : -1;
}
function My(t, e, r) {
	var i = wt.exec(e.slice(r, r + 2));
	return i ? ((t.U = +i[0]), r + i[0].length) : -1;
}
function Ey(t, e, r) {
	var i = wt.exec(e.slice(r, r + 2));
	return i ? ((t.V = +i[0]), r + i[0].length) : -1;
}
function Oy(t, e, r) {
	var i = wt.exec(e.slice(r, r + 2));
	return i ? ((t.W = +i[0]), r + i[0].length) : -1;
}
function Nh(t, e, r) {
	var i = wt.exec(e.slice(r, r + 4));
	return i ? ((t.y = +i[0]), r + i[0].length) : -1;
}
function Rh(t, e, r) {
	var i = wt.exec(e.slice(r, r + 2));
	return i ? ((t.y = +i[0] + (+i[0] > 68 ? 1900 : 2e3)), r + i[0].length) : -1;
}
function Iy(t, e, r) {
	var i = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(r, r + 6));
	return i
		? ((t.Z = i[1] ? 0 : -(i[2] + (i[3] || "00"))), r + i[0].length)
		: -1;
}
function Dy(t, e, r) {
	var i = wt.exec(e.slice(r, r + 1));
	return i ? ((t.q = i[0] * 3 - 3), r + i[0].length) : -1;
}
function Ny(t, e, r) {
	var i = wt.exec(e.slice(r, r + 2));
	return i ? ((t.m = i[0] - 1), r + i[0].length) : -1;
}
function Ph(t, e, r) {
	var i = wt.exec(e.slice(r, r + 2));
	return i ? ((t.d = +i[0]), r + i[0].length) : -1;
}
function Ry(t, e, r) {
	var i = wt.exec(e.slice(r, r + 3));
	return i ? ((t.m = 0), (t.d = +i[0]), r + i[0].length) : -1;
}
function $h(t, e, r) {
	var i = wt.exec(e.slice(r, r + 2));
	return i ? ((t.H = +i[0]), r + i[0].length) : -1;
}
function Py(t, e, r) {
	var i = wt.exec(e.slice(r, r + 2));
	return i ? ((t.M = +i[0]), r + i[0].length) : -1;
}
function $y(t, e, r) {
	var i = wt.exec(e.slice(r, r + 2));
	return i ? ((t.S = +i[0]), r + i[0].length) : -1;
}
function zy(t, e, r) {
	var i = wt.exec(e.slice(r, r + 3));
	return i ? ((t.L = +i[0]), r + i[0].length) : -1;
}
function qy(t, e, r) {
	var i = wt.exec(e.slice(r, r + 6));
	return i ? ((t.L = Math.floor(i[0] / 1e3)), r + i[0].length) : -1;
}
function Wy(t, e, r) {
	var i = wy.exec(e.slice(r, r + 1));
	return i ? r + i[0].length : -1;
}
function Uy(t, e, r) {
	var i = wt.exec(e.slice(r));
	return i ? ((t.Q = +i[0]), r + i[0].length) : -1;
}
function Hy(t, e, r) {
	var i = wt.exec(e.slice(r));
	return i ? ((t.s = +i[0]), r + i[0].length) : -1;
}
function zh(t, e) {
	return nt(t.getDate(), e, 2);
}
function Yy(t, e) {
	return nt(t.getHours(), e, 2);
}
function jy(t, e) {
	return nt(t.getHours() % 12 || 12, e, 2);
}
function Gy(t, e) {
	return nt(1 + Ee.count(te(t), t), e, 3);
}
function Yh(t, e) {
	return nt(t.getMilliseconds(), e, 3);
}
function Vy(t, e) {
	return Yh(t, e) + "000";
}
function Xy(t, e) {
	return nt(t.getMonth() + 1, e, 2);
}
function Ky(t, e) {
	return nt(t.getMinutes(), e, 2);
}
function Zy(t, e) {
	return nt(t.getSeconds(), e, 2);
}
function Qy(t) {
	var e = t.getDay();
	return e === 0 ? 7 : e;
}
function Jy(t, e) {
	return nt(Oe.count(te(t) - 1, t), e, 2);
}
function jh(t) {
	var e = t.getDay();
	return e >= 4 || e === 0 ? je(t) : je.ceil(t);
}
function t_(t, e) {
	return (t = jh(t)), nt(je.count(te(t), t) + (te(t).getDay() === 4), e, 2);
}
function e_(t) {
	return t.getDay();
}
function r_(t, e) {
	return nt(ii.count(te(t) - 1, t), e, 2);
}
function i_(t, e) {
	return nt(t.getFullYear() % 100, e, 2);
}
function o_(t, e) {
	return (t = jh(t)), nt(t.getFullYear() % 100, e, 2);
}
function n_(t, e) {
	return nt(t.getFullYear() % 1e4, e, 4);
}
function a_(t, e) {
	var r = t.getDay();
	return (
		(t = r >= 4 || r === 0 ? je(t) : je.ceil(t)),
		nt(t.getFullYear() % 1e4, e, 4)
	);
}
function s_(t) {
	var e = t.getTimezoneOffset();
	return (
		(e > 0 ? "-" : ((e *= -1), "+")) +
		nt((e / 60) | 0, "0", 2) +
		nt(e % 60, "0", 2)
	);
}
function qh(t, e) {
	return nt(t.getUTCDate(), e, 2);
}
function l_(t, e) {
	return nt(t.getUTCHours(), e, 2);
}
function c_(t, e) {
	return nt(t.getUTCHours() % 12 || 12, e, 2);
}
function u_(t, e) {
	return nt(1 + Qi.count(le(t), t), e, 3);
}
function Gh(t, e) {
	return nt(t.getUTCMilliseconds(), e, 3);
}
function h_(t, e) {
	return Gh(t, e) + "000";
}
function f_(t, e) {
	return nt(t.getUTCMonth() + 1, e, 2);
}
function p_(t, e) {
	return nt(t.getUTCMinutes(), e, 2);
}
function d_(t, e) {
	return nt(t.getUTCSeconds(), e, 2);
}
function m_(t) {
	var e = t.getUTCDay();
	return e === 0 ? 7 : e;
}
function g_(t, e) {
	return nt(kr.count(le(t) - 1, t), e, 2);
}
function Vh(t) {
	var e = t.getUTCDay();
	return e >= 4 || e === 0 ? Ge(t) : Ge.ceil(t);
}
function x_(t, e) {
	return (t = Vh(t)), nt(Ge.count(le(t), t) + (le(t).getUTCDay() === 4), e, 2);
}
function y_(t) {
	return t.getUTCDay();
}
function __(t, e) {
	return nt(oi.count(le(t) - 1, t), e, 2);
}
function C_(t, e) {
	return nt(t.getUTCFullYear() % 100, e, 2);
}
function b_(t, e) {
	return (t = Vh(t)), nt(t.getUTCFullYear() % 100, e, 2);
}
function T_(t, e) {
	return nt(t.getUTCFullYear() % 1e4, e, 4);
}
function v_(t, e) {
	var r = t.getUTCDay();
	return (
		(t = r >= 4 || r === 0 ? Ge(t) : Ge.ceil(t)),
		nt(t.getUTCFullYear() % 1e4, e, 4)
	);
}
function k_() {
	return "+0000";
}
function Wh() {
	return "%";
}
function Uh(t) {
	return +t;
}
function Hh(t) {
	return Math.floor(+t / 1e3);
}
var ai, fn, Xh, Kh, Zh;
Rs({
	dateTime: "%x, %X",
	date: "%-m/%-d/%Y",
	time: "%-I:%M:%S %p",
	periods: ["AM", "PM"],
	days: [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	],
	shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	months: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	],
	shortMonths: [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	],
});
function Rs(t) {
	return (
		(ai = Ns(t)),
		(fn = ai.format),
		(Xh = ai.parse),
		(Kh = ai.utcFormat),
		(Zh = ai.utcParse),
		ai
	);
}
s();
s();
s();
function Ps(t, e) {
	t = t.slice();
	var r = 0,
		i = t.length - 1,
		o = t[r],
		n = t[i],
		a;
	return (
		n < o && ((a = r), (r = i), (i = a), (a = o), (o = n), (n = a)),
		(t[r] = e.floor(o)),
		(t[i] = e.ceil(n)),
		t
	);
}
function S_(t) {
	return new Date(t);
}
function w_(t) {
	return t instanceof Date ? +t : +new Date(+t);
}
function Qh(t, e, r, i, o, n, a, l, c, u) {
	var p = Ki(),
		d = p.invert,
		h = p.domain,
		m = u(".%L"),
		_ = u(":%S"),
		b = u("%I:%M"),
		v = u("%I %p"),
		F = u("%a %d"),
		T = u("%b %d"),
		O = u("%B"),
		A = u("%Y");
	function R(k) {
		return (
			c(k) < k
				? m
				: l(k) < k
					? _
					: a(k) < k
						? b
						: n(k) < k
							? v
							: i(k) < k
								? o(k) < k
									? F
									: T
								: r(k) < k
									? O
									: A
		)(k);
	}
	return (
		(p.invert = function (k) {
			return new Date(d(k));
		}),
		(p.domain = function (k) {
			return arguments.length ? h(Array.from(k, w_)) : h().map(S_);
		}),
		(p.ticks = function (k) {
			var D = h();
			return t(D[0], D[D.length - 1], k ?? 10);
		}),
		(p.tickFormat = function (k, D) {
			return D == null ? R : u(D);
		}),
		(p.nice = function (k) {
			var D = h();
			return (
				(!k || typeof k.range != "function") &&
					(k = e(D[0], D[D.length - 1], k ?? 10)),
				k ? h(Ps(D, k)) : p
			);
		}),
		(p.copy = function () {
			return rn(p, Qh(t, e, r, i, o, n, a, l, c, u));
		}),
		p
	);
}
function Jh() {
	return He.apply(
		Qh(Es, Os, te, ni, Oe, Ee, ri, ei, ye, fn).domain([
			new Date(2e3, 0, 1),
			new Date(2e3, 0, 2),
		]),
		arguments,
	);
}
s();
s();
s();
function tf(t) {
	for (var e = (t.length / 6) | 0, r = new Array(e), i = 0; i < e; )
		r[i] = "#" + t.slice(i * 6, ++i * 6);
	return r;
}
var A_ = tf("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");
s();
s();
s();
function ft(t) {
	return function () {
		return t;
	};
}
s();
var $s = Math.abs,
	Et = Math.atan2,
	Ve = Math.cos,
	ef = Math.max,
	pn = Math.min,
	ce = Math.sin,
	Sr = Math.sqrt,
	At = 1e-12,
	si = Math.PI,
	ro = si / 2,
	li = 2 * si;
function rf(t) {
	return t > 1 ? 0 : t < -1 ? si : Math.acos(t);
}
function zs(t) {
	return t >= 1 ? ro : t <= -1 ? -ro : Math.asin(t);
}
s();
s();
s();
var qs = Math.PI,
	Ws = 2 * qs,
	wr = 1e-6,
	B_ = Ws - wr;
function of(t) {
	this._ += t[0];
	for (let e = 1, r = t.length; e < r; ++e) this._ += arguments[e] + t[e];
}
function F_(t) {
	let e = Math.floor(t);
	if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
	if (e > 15) return of;
	let r = 10 ** e;
	return function (i) {
		this._ += i[0];
		for (let o = 1, n = i.length; o < n; ++o)
			this._ += Math.round(arguments[o] * r) / r + i[o];
	};
}
var Ar = class {
	constructor(e) {
		(this._x0 = this._y0 = this._x1 = this._y1 = null),
			(this._ = ""),
			(this._append = e == null ? of : F_(e));
	}
	moveTo(e, r) {
		this._append`M${(this._x0 = this._x1 = +e)},${(this._y0 = this._y1 = +r)}`;
	}
	closePath() {
		this._x1 !== null &&
			((this._x1 = this._x0), (this._y1 = this._y0), this._append`Z`);
	}
	lineTo(e, r) {
		this._append`L${(this._x1 = +e)},${(this._y1 = +r)}`;
	}
	quadraticCurveTo(e, r, i, o) {
		this._append`Q${+e},${+r},${(this._x1 = +i)},${(this._y1 = +o)}`;
	}
	bezierCurveTo(e, r, i, o, n, a) {
		this
			._append`C${+e},${+r},${+i},${+o},${(this._x1 = +n)},${(this._y1 = +a)}`;
	}
	arcTo(e, r, i, o, n) {
		if (((e = +e), (r = +r), (i = +i), (o = +o), (n = +n), n < 0))
			throw new Error(`negative radius: ${n}`);
		let a = this._x1,
			l = this._y1,
			c = i - e,
			u = o - r,
			p = a - e,
			d = l - r,
			h = p * p + d * d;
		if (this._x1 === null) this._append`M${(this._x1 = e)},${(this._y1 = r)}`;
		else if (h > wr)
			if (!(Math.abs(d * c - u * p) > wr) || !n)
				this._append`L${(this._x1 = e)},${(this._y1 = r)}`;
			else {
				let m = i - a,
					_ = o - l,
					b = c * c + u * u,
					v = m * m + _ * _,
					F = Math.sqrt(b),
					T = Math.sqrt(h),
					O = n * Math.tan((qs - Math.acos((b + h - v) / (2 * F * T))) / 2),
					A = O / T,
					R = O / F;
				Math.abs(A - 1) > wr && this._append`L${e + A * p},${r + A * d}`,
					this
						._append`A${n},${n},0,0,${+(d * m > p * _)},${(this._x1 = e + R * c)},${(this._y1 = r + R * u)}`;
			}
	}
	arc(e, r, i, o, n, a) {
		if (((e = +e), (r = +r), (i = +i), (a = !!a), i < 0))
			throw new Error(`negative radius: ${i}`);
		let l = i * Math.cos(o),
			c = i * Math.sin(o),
			u = e + l,
			p = r + c,
			d = 1 ^ a,
			h = a ? o - n : n - o;
		this._x1 === null
			? this._append`M${u},${p}`
			: (Math.abs(this._x1 - u) > wr || Math.abs(this._y1 - p) > wr) &&
				this._append`L${u},${p}`,
			i &&
				(h < 0 && (h = (h % Ws) + Ws),
				h > B_
					? this
							._append`A${i},${i},0,1,${d},${e - l},${r - c}A${i},${i},0,1,${d},${(this._x1 = u)},${(this._y1 = p)}`
					: h > wr &&
						this
							._append`A${i},${i},0,${+(h >= qs)},${d},${(this._x1 = e + i * Math.cos(n))},${(this._y1 = r + i * Math.sin(n))}`);
	}
	rect(e, r, i, o) {
		this
			._append`M${(this._x0 = this._x1 = +e)},${(this._y0 = this._y1 = +r)}h${(i = +i)}v${+o}h${-i}Z`;
	}
	toString() {
		return this._;
	}
};
function nf() {
	return new Ar();
}
nf.prototype = Ar.prototype;
function dn(t) {
	let e = 3;
	return (
		(t.digits = function (r) {
			if (!arguments.length) return e;
			if (r == null) e = null;
			else {
				let i = Math.floor(r);
				if (!(i >= 0)) throw new RangeError(`invalid digits: ${r}`);
				e = i;
			}
			return t;
		}),
		() => new Ar(e)
	);
}
function L_(t) {
	return t.innerRadius;
}
function M_(t) {
	return t.outerRadius;
}
function E_(t) {
	return t.startAngle;
}
function O_(t) {
	return t.endAngle;
}
function I_(t) {
	return t && t.padAngle;
}
function D_(t, e, r, i, o, n, a, l) {
	var c = r - t,
		u = i - e,
		p = a - o,
		d = l - n,
		h = d * c - p * u;
	if (!(h * h < At))
		return (h = (p * (e - n) - d * (t - o)) / h), [t + h * c, e + h * u];
}
function mn(t, e, r, i, o, n, a) {
	var l = t - r,
		c = e - i,
		u = (a ? n : -n) / Sr(l * l + c * c),
		p = u * c,
		d = -u * l,
		h = t + p,
		m = e + d,
		_ = r + p,
		b = i + d,
		v = (h + _) / 2,
		F = (m + b) / 2,
		T = _ - h,
		O = b - m,
		A = T * T + O * O,
		R = o - n,
		k = h * b - _ * m,
		D = (O < 0 ? -1 : 1) * Sr(ef(0, R * R * A - k * k)),
		M = (k * O - T * D) / A,
		K = (-k * T - O * D) / A,
		J = (k * O + T * D) / A,
		P = (-k * T + O * D) / A,
		L = M - v,
		y = K - F,
		C = J - v,
		N = P - F;
	return (
		L * L + y * y > C * C + N * N && ((M = J), (K = P)),
		{
			cx: M,
			cy: K,
			x01: -p,
			y01: -d,
			x11: M * (o / R - 1),
			y11: K * (o / R - 1),
		}
	);
}
function N_() {
	var t = L_,
		e = M_,
		r = ft(0),
		i = null,
		o = E_,
		n = O_,
		a = I_,
		l = null,
		c = dn(u);
	function u() {
		var p,
			d,
			h = +t.apply(this, arguments),
			m = +e.apply(this, arguments),
			_ = o.apply(this, arguments) - ro,
			b = n.apply(this, arguments) - ro,
			v = $s(b - _),
			F = b > _;
		if ((l || (l = p = c()), m < h && ((d = m), (m = h), (h = d)), !(m > At)))
			l.moveTo(0, 0);
		else if (v > li - At)
			l.moveTo(m * Ve(_), m * ce(_)),
				l.arc(0, 0, m, _, b, !F),
				h > At && (l.moveTo(h * Ve(b), h * ce(b)), l.arc(0, 0, h, b, _, F));
		else {
			var T = _,
				O = b,
				A = _,
				R = b,
				k = v,
				D = v,
				M = a.apply(this, arguments) / 2,
				K = M > At && (i ? +i.apply(this, arguments) : Sr(h * h + m * m)),
				J = pn($s(m - h) / 2, +r.apply(this, arguments)),
				P = J,
				L = J,
				y,
				C;
			if (K > At) {
				var N = zs((K / h) * ce(M)),
					w = zs((K / m) * ce(M));
				(k -= N * 2) > At
					? ((N *= F ? 1 : -1), (A += N), (R -= N))
					: ((k = 0), (A = R = (_ + b) / 2)),
					(D -= w * 2) > At
						? ((w *= F ? 1 : -1), (T += w), (O -= w))
						: ((D = 0), (T = O = (_ + b) / 2));
			}
			var q = m * Ve(T),
				$ = m * ce(T),
				H = h * Ve(R),
				rt = h * ce(R);
			if (J > At) {
				var at = m * Ve(O),
					st = m * ce(O),
					gt = h * Ve(A),
					jt = h * ce(A),
					dt;
				if (v < si)
					if ((dt = D_(q, $, gt, jt, at, st, H, rt))) {
						var Jt = q - dt[0],
							Pt = $ - dt[1],
							pt = at - dt[0],
							I = st - dt[1],
							Z =
								1 /
								ce(
									rf(
										(Jt * pt + Pt * I) /
											(Sr(Jt * Jt + Pt * Pt) * Sr(pt * pt + I * I)),
									) / 2,
								),
							Q = Sr(dt[0] * dt[0] + dt[1] * dt[1]);
						(P = pn(J, (h - Q) / (Z - 1))), (L = pn(J, (m - Q) / (Z + 1)));
					} else P = L = 0;
			}
			D > At
				? L > At
					? ((y = mn(gt, jt, q, $, m, L, F)),
						(C = mn(at, st, H, rt, m, L, F)),
						l.moveTo(y.cx + y.x01, y.cy + y.y01),
						L < J
							? l.arc(y.cx, y.cy, L, Et(y.y01, y.x01), Et(C.y01, C.x01), !F)
							: (l.arc(y.cx, y.cy, L, Et(y.y01, y.x01), Et(y.y11, y.x11), !F),
								l.arc(
									0,
									0,
									m,
									Et(y.cy + y.y11, y.cx + y.x11),
									Et(C.cy + C.y11, C.cx + C.x11),
									!F,
								),
								l.arc(C.cx, C.cy, L, Et(C.y11, C.x11), Et(C.y01, C.x01), !F)))
					: (l.moveTo(q, $), l.arc(0, 0, m, T, O, !F))
				: l.moveTo(q, $),
				!(h > At) || !(k > At)
					? l.lineTo(H, rt)
					: P > At
						? ((y = mn(H, rt, at, st, h, -P, F)),
							(C = mn(q, $, gt, jt, h, -P, F)),
							l.lineTo(y.cx + y.x01, y.cy + y.y01),
							P < J
								? l.arc(y.cx, y.cy, P, Et(y.y01, y.x01), Et(C.y01, C.x01), !F)
								: (l.arc(y.cx, y.cy, P, Et(y.y01, y.x01), Et(y.y11, y.x11), !F),
									l.arc(
										0,
										0,
										h,
										Et(y.cy + y.y11, y.cx + y.x11),
										Et(C.cy + C.y11, C.cx + C.x11),
										F,
									),
									l.arc(C.cx, C.cy, P, Et(C.y11, C.x11), Et(C.y01, C.x01), !F)))
						: l.arc(0, 0, h, R, A, F);
		}
		if ((l.closePath(), p)) return (l = null), p + "" || null;
	}
	return (
		(u.centroid = function () {
			var p = (+t.apply(this, arguments) + +e.apply(this, arguments)) / 2,
				d =
					(+o.apply(this, arguments) + +n.apply(this, arguments)) / 2 - si / 2;
			return [Ve(d) * p, ce(d) * p];
		}),
		(u.innerRadius = function (p) {
			return arguments.length
				? ((t = typeof p == "function" ? p : ft(+p)), u)
				: t;
		}),
		(u.outerRadius = function (p) {
			return arguments.length
				? ((e = typeof p == "function" ? p : ft(+p)), u)
				: e;
		}),
		(u.cornerRadius = function (p) {
			return arguments.length
				? ((r = typeof p == "function" ? p : ft(+p)), u)
				: r;
		}),
		(u.padRadius = function (p) {
			return arguments.length
				? ((i = p == null ? null : typeof p == "function" ? p : ft(+p)), u)
				: i;
		}),
		(u.startAngle = function (p) {
			return arguments.length
				? ((o = typeof p == "function" ? p : ft(+p)), u)
				: o;
		}),
		(u.endAngle = function (p) {
			return arguments.length
				? ((n = typeof p == "function" ? p : ft(+p)), u)
				: n;
		}),
		(u.padAngle = function (p) {
			return arguments.length
				? ((a = typeof p == "function" ? p : ft(+p)), u)
				: a;
		}),
		(u.context = function (p) {
			return arguments.length ? ((l = p ?? null), u) : l;
		}),
		u
	);
}
s();
function af(t) {
	this._context = t;
}
af.prototype = {
	areaStart: function () {
		this._line = 0;
	},
	areaEnd: function () {
		this._line = NaN;
	},
	lineStart: function () {
		this._point = 0;
	},
	lineEnd: function () {
		(this._line || (this._line !== 0 && this._point === 1)) &&
			this._context.closePath(),
			(this._line = 1 - this._line);
	},
	point: function (t, e) {
		switch (((t = +t), (e = +e), this._point)) {
			case 0:
				(this._point = 1),
					this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
				break;
			case 1:
				this._point = 2;
			default:
				this._context.lineTo(t, e);
				break;
		}
	},
};
function io(t) {
	return new af(t);
}
s();
s();
var f6 = Array.prototype.slice;
function gn(t) {
	return typeof t == "object" && "length" in t ? t : Array.from(t);
}
s();
function sf(t) {
	return t[0];
}
function lf(t) {
	return t[1];
}
function R_(t, e) {
	var r = ft(!0),
		i = null,
		o = io,
		n = null,
		a = dn(l);
	(t = typeof t == "function" ? t : t === void 0 ? sf : ft(t)),
		(e = typeof e == "function" ? e : e === void 0 ? lf : ft(e));
	function l(c) {
		var u,
			p = (c = gn(c)).length,
			d,
			h = !1,
			m;
		for (i == null && (n = o((m = a()))), u = 0; u <= p; ++u)
			!(u < p && r((d = c[u]), u, c)) === h &&
				((h = !h) ? n.lineStart() : n.lineEnd()),
				h && n.point(+t(d, u, c), +e(d, u, c));
		if (m) return (n = null), m + "" || null;
	}
	return (
		(l.x = function (c) {
			return arguments.length
				? ((t = typeof c == "function" ? c : ft(+c)), l)
				: t;
		}),
		(l.y = function (c) {
			return arguments.length
				? ((e = typeof c == "function" ? c : ft(+c)), l)
				: e;
		}),
		(l.defined = function (c) {
			return arguments.length
				? ((r = typeof c == "function" ? c : ft(!!c)), l)
				: r;
		}),
		(l.curve = function (c) {
			return arguments.length ? ((o = c), i != null && (n = o(i)), l) : o;
		}),
		(l.context = function (c) {
			return arguments.length
				? (c == null ? (i = n = null) : (n = o((i = c))), l)
				: i;
		}),
		l
	);
}
s();
s();
function cf(t, e) {
	return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
s();
function uf(t) {
	return t;
}
function P_() {
	var t = uf,
		e = cf,
		r = null,
		i = ft(0),
		o = ft(li),
		n = ft(0);
	function a(l) {
		var c,
			u = (l = gn(l)).length,
			p,
			d,
			h = 0,
			m = new Array(u),
			_ = new Array(u),
			b = +i.apply(this, arguments),
			v = Math.min(li, Math.max(-li, o.apply(this, arguments) - b)),
			F,
			T = Math.min(Math.abs(v) / u, n.apply(this, arguments)),
			O = T * (v < 0 ? -1 : 1),
			A;
		for (c = 0; c < u; ++c)
			(A = _[(m[c] = c)] = +t(l[c], c, l)) > 0 && (h += A);
		for (
			e != null
				? m.sort(function (R, k) {
						return e(_[R], _[k]);
					})
				: r != null &&
					m.sort(function (R, k) {
						return r(l[R], l[k]);
					}),
				c = 0,
				d = h ? (v - u * O) / h : 0;
			c < u;
			++c, b = F
		)
			(p = m[c]),
				(A = _[p]),
				(F = b + (A > 0 ? A * d : 0) + O),
				(_[p] = {
					data: l[p],
					index: c,
					value: A,
					startAngle: b,
					endAngle: F,
					padAngle: T,
				});
		return _;
	}
	return (
		(a.value = function (l) {
			return arguments.length
				? ((t = typeof l == "function" ? l : ft(+l)), a)
				: t;
		}),
		(a.sortValues = function (l) {
			return arguments.length ? ((e = l), (r = null), a) : e;
		}),
		(a.sort = function (l) {
			return arguments.length ? ((r = l), (e = null), a) : r;
		}),
		(a.startAngle = function (l) {
			return arguments.length
				? ((i = typeof l == "function" ? l : ft(+l)), a)
				: i;
		}),
		(a.endAngle = function (l) {
			return arguments.length
				? ((o = typeof l == "function" ? l : ft(+l)), a)
				: o;
		}),
		(a.padAngle = function (l) {
			return arguments.length
				? ((n = typeof l == "function" ? l : ft(+l)), a)
				: n;
		}),
		a
	);
}
s();
function ci(t, e, r) {
	t._context.bezierCurveTo(
		(2 * t._x0 + t._x1) / 3,
		(2 * t._y0 + t._y1) / 3,
		(t._x0 + 2 * t._x1) / 3,
		(t._y0 + 2 * t._y1) / 3,
		(t._x0 + 4 * t._x1 + e) / 6,
		(t._y0 + 4 * t._y1 + r) / 6,
	);
}
function oo(t) {
	this._context = t;
}
oo.prototype = {
	areaStart: function () {
		this._line = 0;
	},
	areaEnd: function () {
		this._line = NaN;
	},
	lineStart: function () {
		(this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0);
	},
	lineEnd: function () {
		switch (this._point) {
			case 3:
				ci(this, this._x1, this._y1);
			case 2:
				this._context.lineTo(this._x1, this._y1);
				break;
		}
		(this._line || (this._line !== 0 && this._point === 1)) &&
			this._context.closePath(),
			(this._line = 1 - this._line);
	},
	point: function (t, e) {
		switch (((t = +t), (e = +e), this._point)) {
			case 0:
				(this._point = 1),
					this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				(this._point = 3),
					this._context.lineTo(
						(5 * this._x0 + this._x1) / 6,
						(5 * this._y0 + this._y1) / 6,
					);
			default:
				ci(this, t, e);
				break;
		}
		(this._x0 = this._x1),
			(this._x1 = t),
			(this._y0 = this._y1),
			(this._y1 = e);
	},
};
function Us(t) {
	return new oo(t);
}
s();
s();
var xn = class {
	constructor(e, r) {
		(this._context = e), (this._x = r);
	}
	areaStart() {
		this._line = 0;
	}
	areaEnd() {
		this._line = NaN;
	}
	lineStart() {
		this._point = 0;
	}
	lineEnd() {
		(this._line || (this._line !== 0 && this._point === 1)) &&
			this._context.closePath(),
			(this._line = 1 - this._line);
	}
	point(e, r) {
		switch (((e = +e), (r = +r), this._point)) {
			case 0: {
				(this._point = 1),
					this._line ? this._context.lineTo(e, r) : this._context.moveTo(e, r);
				break;
			}
			case 1:
				this._point = 2;
			default: {
				this._x
					? this._context.bezierCurveTo(
							(this._x0 = (this._x0 + e) / 2),
							this._y0,
							this._x0,
							r,
							e,
							r,
						)
					: this._context.bezierCurveTo(
							this._x0,
							(this._y0 = (this._y0 + r) / 2),
							e,
							this._y0,
							e,
							r,
						);
				break;
			}
		}
		(this._x0 = e), (this._y0 = r);
	}
};
function Hs(t) {
	return new xn(t, !0);
}
function Ys(t) {
	return new xn(t, !1);
}
s();
s();
function ee() {}
function hf(t) {
	this._context = t;
}
hf.prototype = {
	areaStart: ee,
	areaEnd: ee,
	lineStart: function () {
		(this._x0 =
			this._x1 =
			this._x2 =
			this._x3 =
			this._x4 =
			this._y0 =
			this._y1 =
			this._y2 =
			this._y3 =
			this._y4 =
				NaN),
			(this._point = 0);
	},
	lineEnd: function () {
		switch (this._point) {
			case 1: {
				this._context.moveTo(this._x2, this._y2), this._context.closePath();
				break;
			}
			case 2: {
				this._context.moveTo(
					(this._x2 + 2 * this._x3) / 3,
					(this._y2 + 2 * this._y3) / 3,
				),
					this._context.lineTo(
						(this._x3 + 2 * this._x2) / 3,
						(this._y3 + 2 * this._y2) / 3,
					),
					this._context.closePath();
				break;
			}
			case 3: {
				this.point(this._x2, this._y2),
					this.point(this._x3, this._y3),
					this.point(this._x4, this._y4);
				break;
			}
		}
	},
	point: function (t, e) {
		switch (((t = +t), (e = +e), this._point)) {
			case 0:
				(this._point = 1), (this._x2 = t), (this._y2 = e);
				break;
			case 1:
				(this._point = 2), (this._x3 = t), (this._y3 = e);
				break;
			case 2:
				(this._point = 3),
					(this._x4 = t),
					(this._y4 = e),
					this._context.moveTo(
						(this._x0 + 4 * this._x1 + t) / 6,
						(this._y0 + 4 * this._y1 + e) / 6,
					);
				break;
			default:
				ci(this, t, e);
				break;
		}
		(this._x0 = this._x1),
			(this._x1 = t),
			(this._y0 = this._y1),
			(this._y1 = e);
	},
};
function js(t) {
	return new hf(t);
}
s();
function ff(t) {
	this._context = t;
}
ff.prototype = {
	areaStart: function () {
		this._line = 0;
	},
	areaEnd: function () {
		this._line = NaN;
	},
	lineStart: function () {
		(this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0);
	},
	lineEnd: function () {
		(this._line || (this._line !== 0 && this._point === 3)) &&
			this._context.closePath(),
			(this._line = 1 - this._line);
	},
	point: function (t, e) {
		switch (((t = +t), (e = +e), this._point)) {
			case 0:
				this._point = 1;
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				this._point = 3;
				var r = (this._x0 + 4 * this._x1 + t) / 6,
					i = (this._y0 + 4 * this._y1 + e) / 6;
				this._line ? this._context.lineTo(r, i) : this._context.moveTo(r, i);
				break;
			case 3:
				this._point = 4;
			default:
				ci(this, t, e);
				break;
		}
		(this._x0 = this._x1),
			(this._x1 = t),
			(this._y0 = this._y1),
			(this._y1 = e);
	},
};
function Gs(t) {
	return new ff(t);
}
s();
function pf(t, e) {
	(this._basis = new oo(t)), (this._beta = e);
}
pf.prototype = {
	lineStart: function () {
		(this._x = []), (this._y = []), this._basis.lineStart();
	},
	lineEnd: function () {
		var t = this._x,
			e = this._y,
			r = t.length - 1;
		if (r > 0)
			for (
				var i = t[0], o = e[0], n = t[r] - i, a = e[r] - o, l = -1, c;
				++l <= r;
			)
				(c = l / r),
					this._basis.point(
						this._beta * t[l] + (1 - this._beta) * (i + c * n),
						this._beta * e[l] + (1 - this._beta) * (o + c * a),
					);
		(this._x = this._y = null), this._basis.lineEnd();
	},
	point: function (t, e) {
		this._x.push(+t), this._y.push(+e);
	},
};
var Vs = (function t(e) {
	function r(i) {
		return e === 1 ? new oo(i) : new pf(i, e);
	}
	return (
		(r.beta = function (i) {
			return t(+i);
		}),
		r
	);
})(0.85);
s();
s();
function ui(t, e, r) {
	t._context.bezierCurveTo(
		t._x1 + t._k * (t._x2 - t._x0),
		t._y1 + t._k * (t._y2 - t._y0),
		t._x2 + t._k * (t._x1 - e),
		t._y2 + t._k * (t._y1 - r),
		t._x2,
		t._y2,
	);
}
function yn(t, e) {
	(this._context = t), (this._k = (1 - e) / 6);
}
yn.prototype = {
	areaStart: function () {
		this._line = 0;
	},
	areaEnd: function () {
		this._line = NaN;
	},
	lineStart: function () {
		(this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
			(this._point = 0);
	},
	lineEnd: function () {
		switch (this._point) {
			case 2:
				this._context.lineTo(this._x2, this._y2);
				break;
			case 3:
				ui(this, this._x1, this._y1);
				break;
		}
		(this._line || (this._line !== 0 && this._point === 1)) &&
			this._context.closePath(),
			(this._line = 1 - this._line);
	},
	point: function (t, e) {
		switch (((t = +t), (e = +e), this._point)) {
			case 0:
				(this._point = 1),
					this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
				break;
			case 1:
				(this._point = 2), (this._x1 = t), (this._y1 = e);
				break;
			case 2:
				this._point = 3;
			default:
				ui(this, t, e);
				break;
		}
		(this._x0 = this._x1),
			(this._x1 = this._x2),
			(this._x2 = t),
			(this._y0 = this._y1),
			(this._y1 = this._y2),
			(this._y2 = e);
	},
};
var Xs = (function t(e) {
	function r(i) {
		return new yn(i, e);
	}
	return (
		(r.tension = function (i) {
			return t(+i);
		}),
		r
	);
})(0);
function _n(t, e) {
	(this._context = t), (this._k = (1 - e) / 6);
}
_n.prototype = {
	areaStart: ee,
	areaEnd: ee,
	lineStart: function () {
		(this._x0 =
			this._x1 =
			this._x2 =
			this._x3 =
			this._x4 =
			this._x5 =
			this._y0 =
			this._y1 =
			this._y2 =
			this._y3 =
			this._y4 =
			this._y5 =
				NaN),
			(this._point = 0);
	},
	lineEnd: function () {
		switch (this._point) {
			case 1: {
				this._context.moveTo(this._x3, this._y3), this._context.closePath();
				break;
			}
			case 2: {
				this._context.lineTo(this._x3, this._y3), this._context.closePath();
				break;
			}
			case 3: {
				this.point(this._x3, this._y3),
					this.point(this._x4, this._y4),
					this.point(this._x5, this._y5);
				break;
			}
		}
	},
	point: function (t, e) {
		switch (((t = +t), (e = +e), this._point)) {
			case 0:
				(this._point = 1), (this._x3 = t), (this._y3 = e);
				break;
			case 1:
				(this._point = 2), this._context.moveTo((this._x4 = t), (this._y4 = e));
				break;
			case 2:
				(this._point = 3), (this._x5 = t), (this._y5 = e);
				break;
			default:
				ui(this, t, e);
				break;
		}
		(this._x0 = this._x1),
			(this._x1 = this._x2),
			(this._x2 = t),
			(this._y0 = this._y1),
			(this._y1 = this._y2),
			(this._y2 = e);
	},
};
var Ks = (function t(e) {
	function r(i) {
		return new _n(i, e);
	}
	return (
		(r.tension = function (i) {
			return t(+i);
		}),
		r
	);
})(0);
s();
function Cn(t, e) {
	(this._context = t), (this._k = (1 - e) / 6);
}
Cn.prototype = {
	areaStart: function () {
		this._line = 0;
	},
	areaEnd: function () {
		this._line = NaN;
	},
	lineStart: function () {
		(this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
			(this._point = 0);
	},
	lineEnd: function () {
		(this._line || (this._line !== 0 && this._point === 3)) &&
			this._context.closePath(),
			(this._line = 1 - this._line);
	},
	point: function (t, e) {
		switch (((t = +t), (e = +e), this._point)) {
			case 0:
				this._point = 1;
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				(this._point = 3),
					this._line
						? this._context.lineTo(this._x2, this._y2)
						: this._context.moveTo(this._x2, this._y2);
				break;
			case 3:
				this._point = 4;
			default:
				ui(this, t, e);
				break;
		}
		(this._x0 = this._x1),
			(this._x1 = this._x2),
			(this._x2 = t),
			(this._y0 = this._y1),
			(this._y1 = this._y2),
			(this._y2 = e);
	},
};
var Zs = (function t(e) {
	function r(i) {
		return new Cn(i, e);
	}
	return (
		(r.tension = function (i) {
			return t(+i);
		}),
		r
	);
})(0);
s();
s();
function no(t, e, r) {
	var i = t._x1,
		o = t._y1,
		n = t._x2,
		a = t._y2;
	if (t._l01_a > At) {
		var l = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a,
			c = 3 * t._l01_a * (t._l01_a + t._l12_a);
		(i = (i * l - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / c),
			(o = (o * l - t._y0 * t._l12_2a + t._y2 * t._l01_2a) / c);
	}
	if (t._l23_a > At) {
		var u = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a,
			p = 3 * t._l23_a * (t._l23_a + t._l12_a);
		(n = (n * u + t._x1 * t._l23_2a - e * t._l12_2a) / p),
			(a = (a * u + t._y1 * t._l23_2a - r * t._l12_2a) / p);
	}
	t._context.bezierCurveTo(i, o, n, a, t._x2, t._y2);
}
function df(t, e) {
	(this._context = t), (this._alpha = e);
}
df.prototype = {
	areaStart: function () {
		this._line = 0;
	},
	areaEnd: function () {
		this._line = NaN;
	},
	lineStart: function () {
		(this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
			(this._l01_a =
				this._l12_a =
				this._l23_a =
				this._l01_2a =
				this._l12_2a =
				this._l23_2a =
				this._point =
					0);
	},
	lineEnd: function () {
		switch (this._point) {
			case 2:
				this._context.lineTo(this._x2, this._y2);
				break;
			case 3:
				this.point(this._x2, this._y2);
				break;
		}
		(this._line || (this._line !== 0 && this._point === 1)) &&
			this._context.closePath(),
			(this._line = 1 - this._line);
	},
	point: function (t, e) {
		if (((t = +t), (e = +e), this._point)) {
			var r = this._x2 - t,
				i = this._y2 - e;
			this._l23_a = Math.sqrt(
				(this._l23_2a = Math.pow(r * r + i * i, this._alpha)),
			);
		}
		switch (this._point) {
			case 0:
				(this._point = 1),
					this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				this._point = 3;
			default:
				no(this, t, e);
				break;
		}
		(this._l01_a = this._l12_a),
			(this._l12_a = this._l23_a),
			(this._l01_2a = this._l12_2a),
			(this._l12_2a = this._l23_2a),
			(this._x0 = this._x1),
			(this._x1 = this._x2),
			(this._x2 = t),
			(this._y0 = this._y1),
			(this._y1 = this._y2),
			(this._y2 = e);
	},
};
var Qs = (function t(e) {
	function r(i) {
		return e ? new df(i, e) : new yn(i, 0);
	}
	return (
		(r.alpha = function (i) {
			return t(+i);
		}),
		r
	);
})(0.5);
function mf(t, e) {
	(this._context = t), (this._alpha = e);
}
mf.prototype = {
	areaStart: ee,
	areaEnd: ee,
	lineStart: function () {
		(this._x0 =
			this._x1 =
			this._x2 =
			this._x3 =
			this._x4 =
			this._x5 =
			this._y0 =
			this._y1 =
			this._y2 =
			this._y3 =
			this._y4 =
			this._y5 =
				NaN),
			(this._l01_a =
				this._l12_a =
				this._l23_a =
				this._l01_2a =
				this._l12_2a =
				this._l23_2a =
				this._point =
					0);
	},
	lineEnd: function () {
		switch (this._point) {
			case 1: {
				this._context.moveTo(this._x3, this._y3), this._context.closePath();
				break;
			}
			case 2: {
				this._context.lineTo(this._x3, this._y3), this._context.closePath();
				break;
			}
			case 3: {
				this.point(this._x3, this._y3),
					this.point(this._x4, this._y4),
					this.point(this._x5, this._y5);
				break;
			}
		}
	},
	point: function (t, e) {
		if (((t = +t), (e = +e), this._point)) {
			var r = this._x2 - t,
				i = this._y2 - e;
			this._l23_a = Math.sqrt(
				(this._l23_2a = Math.pow(r * r + i * i, this._alpha)),
			);
		}
		switch (this._point) {
			case 0:
				(this._point = 1), (this._x3 = t), (this._y3 = e);
				break;
			case 1:
				(this._point = 2), this._context.moveTo((this._x4 = t), (this._y4 = e));
				break;
			case 2:
				(this._point = 3), (this._x5 = t), (this._y5 = e);
				break;
			default:
				no(this, t, e);
				break;
		}
		(this._l01_a = this._l12_a),
			(this._l12_a = this._l23_a),
			(this._l01_2a = this._l12_2a),
			(this._l12_2a = this._l23_2a),
			(this._x0 = this._x1),
			(this._x1 = this._x2),
			(this._x2 = t),
			(this._y0 = this._y1),
			(this._y1 = this._y2),
			(this._y2 = e);
	},
};
var Js = (function t(e) {
	function r(i) {
		return e ? new mf(i, e) : new _n(i, 0);
	}
	return (
		(r.alpha = function (i) {
			return t(+i);
		}),
		r
	);
})(0.5);
s();
function gf(t, e) {
	(this._context = t), (this._alpha = e);
}
gf.prototype = {
	areaStart: function () {
		this._line = 0;
	},
	areaEnd: function () {
		this._line = NaN;
	},
	lineStart: function () {
		(this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
			(this._l01_a =
				this._l12_a =
				this._l23_a =
				this._l01_2a =
				this._l12_2a =
				this._l23_2a =
				this._point =
					0);
	},
	lineEnd: function () {
		(this._line || (this._line !== 0 && this._point === 3)) &&
			this._context.closePath(),
			(this._line = 1 - this._line);
	},
	point: function (t, e) {
		if (((t = +t), (e = +e), this._point)) {
			var r = this._x2 - t,
				i = this._y2 - e;
			this._l23_a = Math.sqrt(
				(this._l23_2a = Math.pow(r * r + i * i, this._alpha)),
			);
		}
		switch (this._point) {
			case 0:
				this._point = 1;
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				(this._point = 3),
					this._line
						? this._context.lineTo(this._x2, this._y2)
						: this._context.moveTo(this._x2, this._y2);
				break;
			case 3:
				this._point = 4;
			default:
				no(this, t, e);
				break;
		}
		(this._l01_a = this._l12_a),
			(this._l12_a = this._l23_a),
			(this._l01_2a = this._l12_2a),
			(this._l12_2a = this._l23_2a),
			(this._x0 = this._x1),
			(this._x1 = this._x2),
			(this._x2 = t),
			(this._y0 = this._y1),
			(this._y1 = this._y2),
			(this._y2 = e);
	},
};
var tl = (function t(e) {
	function r(i) {
		return e ? new gf(i, e) : new Cn(i, 0);
	}
	return (
		(r.alpha = function (i) {
			return t(+i);
		}),
		r
	);
})(0.5);
s();
function xf(t) {
	this._context = t;
}
xf.prototype = {
	areaStart: ee,
	areaEnd: ee,
	lineStart: function () {
		this._point = 0;
	},
	lineEnd: function () {
		this._point && this._context.closePath();
	},
	point: function (t, e) {
		(t = +t),
			(e = +e),
			this._point
				? this._context.lineTo(t, e)
				: ((this._point = 1), this._context.moveTo(t, e));
	},
};
function el(t) {
	return new xf(t);
}
s();
function yf(t) {
	return t < 0 ? -1 : 1;
}
function _f(t, e, r) {
	var i = t._x1 - t._x0,
		o = e - t._x1,
		n = (t._y1 - t._y0) / (i || (o < 0 && -0)),
		a = (r - t._y1) / (o || (i < 0 && -0)),
		l = (n * o + a * i) / (i + o);
	return (
		(yf(n) + yf(a)) * Math.min(Math.abs(n), Math.abs(a), 0.5 * Math.abs(l)) || 0
	);
}
function Cf(t, e) {
	var r = t._x1 - t._x0;
	return r ? ((3 * (t._y1 - t._y0)) / r - e) / 2 : e;
}
function rl(t, e, r) {
	var i = t._x0,
		o = t._y0,
		n = t._x1,
		a = t._y1,
		l = (n - i) / 3;
	t._context.bezierCurveTo(i + l, o + l * e, n - l, a - l * r, n, a);
}
function bn(t) {
	this._context = t;
}
bn.prototype = {
	areaStart: function () {
		this._line = 0;
	},
	areaEnd: function () {
		this._line = NaN;
	},
	lineStart: function () {
		(this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN),
			(this._point = 0);
	},
	lineEnd: function () {
		switch (this._point) {
			case 2:
				this._context.lineTo(this._x1, this._y1);
				break;
			case 3:
				rl(this, this._t0, Cf(this, this._t0));
				break;
		}
		(this._line || (this._line !== 0 && this._point === 1)) &&
			this._context.closePath(),
			(this._line = 1 - this._line);
	},
	point: function (t, e) {
		var r = NaN;
		if (((t = +t), (e = +e), !(t === this._x1 && e === this._y1))) {
			switch (this._point) {
				case 0:
					(this._point = 1),
						this._line
							? this._context.lineTo(t, e)
							: this._context.moveTo(t, e);
					break;
				case 1:
					this._point = 2;
					break;
				case 2:
					(this._point = 3), rl(this, Cf(this, (r = _f(this, t, e))), r);
					break;
				default:
					rl(this, this._t0, (r = _f(this, t, e)));
					break;
			}
			(this._x0 = this._x1),
				(this._x1 = t),
				(this._y0 = this._y1),
				(this._y1 = e),
				(this._t0 = r);
		}
	},
};
function bf(t) {
	this._context = new Tf(t);
}
(bf.prototype = Object.create(bn.prototype)).point = function (t, e) {
	bn.prototype.point.call(this, e, t);
};
function Tf(t) {
	this._context = t;
}
Tf.prototype = {
	moveTo: function (t, e) {
		this._context.moveTo(e, t);
	},
	closePath: function () {
		this._context.closePath();
	},
	lineTo: function (t, e) {
		this._context.lineTo(e, t);
	},
	bezierCurveTo: function (t, e, r, i, o, n) {
		this._context.bezierCurveTo(e, t, i, r, n, o);
	},
};
function il(t) {
	return new bn(t);
}
function ol(t) {
	return new bf(t);
}
s();
function kf(t) {
	this._context = t;
}
kf.prototype = {
	areaStart: function () {
		this._line = 0;
	},
	areaEnd: function () {
		this._line = NaN;
	},
	lineStart: function () {
		(this._x = []), (this._y = []);
	},
	lineEnd: function () {
		var t = this._x,
			e = this._y,
			r = t.length;
		if (r)
			if (
				(this._line
					? this._context.lineTo(t[0], e[0])
					: this._context.moveTo(t[0], e[0]),
				r === 2)
			)
				this._context.lineTo(t[1], e[1]);
			else
				for (var i = vf(t), o = vf(e), n = 0, a = 1; a < r; ++n, ++a)
					this._context.bezierCurveTo(
						i[0][n],
						o[0][n],
						i[1][n],
						o[1][n],
						t[a],
						e[a],
					);
		(this._line || (this._line !== 0 && r === 1)) && this._context.closePath(),
			(this._line = 1 - this._line),
			(this._x = this._y = null);
	},
	point: function (t, e) {
		this._x.push(+t), this._y.push(+e);
	},
};
function vf(t) {
	var e,
		r = t.length - 1,
		i,
		o = new Array(r),
		n = new Array(r),
		a = new Array(r);
	for (o[0] = 0, n[0] = 2, a[0] = t[0] + 2 * t[1], e = 1; e < r - 1; ++e)
		(o[e] = 1), (n[e] = 4), (a[e] = 4 * t[e] + 2 * t[e + 1]);
	for (
		o[r - 1] = 2, n[r - 1] = 7, a[r - 1] = 8 * t[r - 1] + t[r], e = 1;
		e < r;
		++e
	)
		(i = o[e] / n[e - 1]), (n[e] -= i), (a[e] -= i * a[e - 1]);
	for (o[r - 1] = a[r - 1] / n[r - 1], e = r - 2; e >= 0; --e)
		o[e] = (a[e] - o[e + 1]) / n[e];
	for (n[r - 1] = (t[r] + o[r - 1]) / 2, e = 0; e < r - 1; ++e)
		n[e] = 2 * t[e + 1] - o[e + 1];
	return [o, n];
}
function nl(t) {
	return new kf(t);
}
s();
function Tn(t, e) {
	(this._context = t), (this._t = e);
}
Tn.prototype = {
	areaStart: function () {
		this._line = 0;
	},
	areaEnd: function () {
		this._line = NaN;
	},
	lineStart: function () {
		(this._x = this._y = NaN), (this._point = 0);
	},
	lineEnd: function () {
		0 < this._t &&
			this._t < 1 &&
			this._point === 2 &&
			this._context.lineTo(this._x, this._y),
			(this._line || (this._line !== 0 && this._point === 1)) &&
				this._context.closePath(),
			this._line >= 0 &&
				((this._t = 1 - this._t), (this._line = 1 - this._line));
	},
	point: function (t, e) {
		switch (((t = +t), (e = +e), this._point)) {
			case 0:
				(this._point = 1),
					this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
				break;
			case 1:
				this._point = 2;
			default: {
				if (this._t <= 0)
					this._context.lineTo(this._x, e), this._context.lineTo(t, e);
				else {
					var r = this._x * (1 - this._t) + t * this._t;
					this._context.lineTo(r, this._y), this._context.lineTo(r, e);
				}
				break;
			}
		}
		(this._x = t), (this._y = e);
	},
};
function al(t) {
	return new Tn(t, 0.5);
}
function sl(t) {
	return new Tn(t, 0);
}
function ll(t) {
	return new Tn(t, 1);
}
s();
s();
s();
s();
s();
var $_ = { value: () => {} };
function wf() {
	for (var t = 0, e = arguments.length, r = {}, i; t < e; ++t) {
		if (!(i = arguments[t] + "") || i in r || /[\s.]/.test(i))
			throw new Error("illegal type: " + i);
		r[i] = [];
	}
	return new vn(r);
}
function vn(t) {
	this._ = t;
}
function z_(t, e) {
	return t
		.trim()
		.split(/^|\s+/)
		.map(function (r) {
			var i = "",
				o = r.indexOf(".");
			if (
				(o >= 0 && ((i = r.slice(o + 1)), (r = r.slice(0, o))),
				r && !e.hasOwnProperty(r))
			)
				throw new Error("unknown type: " + r);
			return { type: r, name: i };
		});
}
vn.prototype = wf.prototype = {
	constructor: vn,
	on: function (t, e) {
		var r = this._,
			i = z_(t + "", r),
			o,
			n = -1,
			a = i.length;
		if (arguments.length < 2) {
			for (; ++n < a; )
				if ((o = (t = i[n]).type) && (o = q_(r[o], t.name))) return o;
			return;
		}
		if (e != null && typeof e != "function")
			throw new Error("invalid callback: " + e);
		for (; ++n < a; )
			if ((o = (t = i[n]).type)) r[o] = Sf(r[o], t.name, e);
			else if (e == null) for (o in r) r[o] = Sf(r[o], t.name, null);
		return this;
	},
	copy: function () {
		var t = {},
			e = this._;
		for (var r in e) t[r] = e[r].slice();
		return new vn(t);
	},
	call: function (t, e) {
		if ((o = arguments.length - 2) > 0)
			for (var r = new Array(o), i = 0, o, n; i < o; ++i)
				r[i] = arguments[i + 2];
		if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
		for (n = this._[t], i = 0, o = n.length; i < o; ++i) n[i].value.apply(e, r);
	},
	apply: function (t, e, r) {
		if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
		for (var i = this._[t], o = 0, n = i.length; o < n; ++o)
			i[o].value.apply(e, r);
	},
};
function q_(t, e) {
	for (var r = 0, i = t.length, o; r < i; ++r)
		if ((o = t[r]).name === e) return o.value;
}
function Sf(t, e, r) {
	for (var i = 0, o = t.length; i < o; ++i)
		if (t[i].name === e) {
			(t[i] = $_), (t = t.slice(0, i).concat(t.slice(i + 1)));
			break;
		}
	return r != null && t.push({ name: e, value: r }), t;
}
var cl = wf;
s();
s();
s();
s();
s();
s();
s();
var hi = 0,
	so = 0,
	ao = 0,
	Bf = 1e3,
	kn,
	lo,
	Sn = 0,
	Br = 0,
	wn = 0,
	co = typeof performance == "object" && performance.now ? performance : Date,
	Ff =
		typeof window == "object" && window.requestAnimationFrame
			? window.requestAnimationFrame.bind(window)
			: function (t) {
					setTimeout(t, 17);
				};
function ho() {
	return Br || (Ff(W_), (Br = co.now() + wn));
}
function W_() {
	Br = 0;
}
function uo() {
	this._call = this._time = this._next = null;
}
uo.prototype = An.prototype = {
	constructor: uo,
	restart: function (t, e, r) {
		if (typeof t != "function")
			throw new TypeError("callback is not a function");
		(r = (r == null ? ho() : +r) + (e == null ? 0 : +e)),
			!this._next &&
				lo !== this &&
				(lo ? (lo._next = this) : (kn = this), (lo = this)),
			(this._call = t),
			(this._time = r),
			ul();
	},
	stop: function () {
		this._call && ((this._call = null), (this._time = 1 / 0), ul());
	},
};
function An(t, e, r) {
	var i = new uo();
	return i.restart(t, e, r), i;
}
function Lf() {
	ho(), ++hi;
	for (var t = kn, e; t; )
		(e = Br - t._time) >= 0 && t._call.call(void 0, e), (t = t._next);
	--hi;
}
function Af() {
	(Br = (Sn = co.now()) + wn), (hi = so = 0);
	try {
		Lf();
	} finally {
		(hi = 0), H_(), (Br = 0);
	}
}
function U_() {
	var t = co.now(),
		e = t - Sn;
	e > Bf && ((wn -= e), (Sn = t));
}
function H_() {
	for (var t, e = kn, r, i = 1 / 0; e; )
		e._call
			? (i > e._time && (i = e._time), (t = e), (e = e._next))
			: ((r = e._next), (e._next = null), (e = t ? (t._next = r) : (kn = r)));
	(lo = t), ul(i);
}
function ul(t) {
	if (!hi) {
		so && (so = clearTimeout(so));
		var e = t - Br;
		e > 24
			? (t < 1 / 0 && (so = setTimeout(Af, t - co.now() - wn)),
				ao && (ao = clearInterval(ao)))
			: (ao || ((Sn = co.now()), (ao = setInterval(U_, Bf))), (hi = 1), Ff(Af));
	}
}
s();
function Bn(t, e, r) {
	var i = new uo();
	return (
		(e = e == null ? 0 : +e),
		i.restart(
			(o) => {
				i.stop(), t(o + e);
			},
			e,
			r,
		),
		i
	);
}
var Y_ = cl("start", "end", "cancel", "interrupt"),
	j_ = [],
	Of = 0,
	Mf = 1,
	Ln = 2,
	Fn = 3,
	Ef = 4,
	Mn = 5,
	fo = 6;
function Xe(t, e, r, i, o, n) {
	var a = t.__transition;
	if (!a) t.__transition = {};
	else if (r in a) return;
	G_(t, r, {
		name: e,
		index: i,
		group: o,
		on: Y_,
		tween: j_,
		time: n.time,
		delay: n.delay,
		duration: n.duration,
		ease: n.ease,
		timer: null,
		state: Of,
	});
}
function po(t, e) {
	var r = Ct(t, e);
	if (r.state > Of) throw new Error("too late; already scheduled");
	return r;
}
function Ot(t, e) {
	var r = Ct(t, e);
	if (r.state > Fn) throw new Error("too late; already running");
	return r;
}
function Ct(t, e) {
	var r = t.__transition;
	if (!r || !(r = r[e])) throw new Error("transition not found");
	return r;
}
function G_(t, e, r) {
	var i = t.__transition,
		o;
	(i[e] = r), (r.timer = An(n, 0, r.time));
	function n(u) {
		(r.state = Mf),
			r.timer.restart(a, r.delay, r.time),
			r.delay <= u && a(u - r.delay);
	}
	function a(u) {
		var p, d, h, m;
		if (r.state !== Mf) return c();
		for (p in i)
			if (((m = i[p]), m.name === r.name)) {
				if (m.state === Fn) return Bn(a);
				m.state === Ef
					? ((m.state = fo),
						m.timer.stop(),
						m.on.call("interrupt", t, t.__data__, m.index, m.group),
						delete i[p])
					: +p < e &&
						((m.state = fo),
						m.timer.stop(),
						m.on.call("cancel", t, t.__data__, m.index, m.group),
						delete i[p]);
			}
		if (
			(Bn(function () {
				r.state === Fn &&
					((r.state = Ef), r.timer.restart(l, r.delay, r.time), l(u));
			}),
			(r.state = Ln),
			r.on.call("start", t, t.__data__, r.index, r.group),
			r.state === Ln)
		) {
			for (
				r.state = Fn, o = new Array((h = r.tween.length)), p = 0, d = -1;
				p < h;
				++p
			)
				(m = r.tween[p].value.call(t, t.__data__, r.index, r.group)) &&
					(o[++d] = m);
			o.length = d + 1;
		}
	}
	function l(u) {
		for (
			var p =
					u < r.duration
						? r.ease.call(null, u / r.duration)
						: (r.timer.restart(c), (r.state = Mn), 1),
				d = -1,
				h = o.length;
			++d < h;
		)
			o[d].call(t, p);
		r.state === Mn && (r.on.call("end", t, t.__data__, r.index, r.group), c());
	}
	function c() {
		(r.state = fo), r.timer.stop(), delete i[e];
		for (var u in i) return;
		delete t.__transition;
	}
}
function En(t, e) {
	var r = t.__transition,
		i,
		o,
		n = !0,
		a;
	if (r) {
		e = e == null ? null : e + "";
		for (a in r) {
			if ((i = r[a]).name !== e) {
				n = !1;
				continue;
			}
			(o = i.state > Ln && i.state < Mn),
				(i.state = fo),
				i.timer.stop(),
				i.on.call(o ? "interrupt" : "cancel", t, t.__data__, i.index, i.group),
				delete r[a];
		}
		n && delete t.__transition;
	}
}
function If(t) {
	return this.each(function () {
		En(this, t);
	});
}
s();
s();
s();
s();
function V_(t, e) {
	var r, i;
	return function () {
		var o = Ot(this, t),
			n = o.tween;
		if (n !== r) {
			i = r = n;
			for (var a = 0, l = i.length; a < l; ++a)
				if (i[a].name === e) {
					(i = i.slice()), i.splice(a, 1);
					break;
				}
		}
		o.tween = i;
	};
}
function X_(t, e, r) {
	var i, o;
	if (typeof r != "function") throw new Error();
	return function () {
		var n = Ot(this, t),
			a = n.tween;
		if (a !== i) {
			o = (i = a).slice();
			for (var l = { name: e, value: r }, c = 0, u = o.length; c < u; ++c)
				if (o[c].name === e) {
					o[c] = l;
					break;
				}
			c === u && o.push(l);
		}
		n.tween = o;
	};
}
function Df(t, e) {
	var r = this._id;
	if (((t += ""), arguments.length < 2)) {
		for (var i = Ct(this.node(), r).tween, o = 0, n = i.length, a; o < n; ++o)
			if ((a = i[o]).name === t) return a.value;
		return null;
	}
	return this.each((e == null ? V_ : X_)(r, t, e));
}
function fi(t, e, r) {
	var i = t._id;
	return (
		t.each(function () {
			var o = Ot(this, i);
			(o.value || (o.value = {}))[e] = r.apply(this, arguments);
		}),
		function (o) {
			return Ct(o, i).value[e];
		}
	);
}
s();
function On(t, e) {
	var r;
	return (
		typeof e == "number"
			? Mt
			: e instanceof se
				? gr
				: (r = se(e))
					? ((e = r), gr)
					: Vi
	)(t, e);
}
function K_(t) {
	return function () {
		this.removeAttribute(t);
	};
}
function Z_(t) {
	return function () {
		this.removeAttributeNS(t.space, t.local);
	};
}
function Q_(t, e, r) {
	var i,
		o = r + "",
		n;
	return function () {
		var a = this.getAttribute(t);
		return a === o ? null : a === i ? n : (n = e((i = a), r));
	};
}
function J_(t, e, r) {
	var i,
		o = r + "",
		n;
	return function () {
		var a = this.getAttributeNS(t.space, t.local);
		return a === o ? null : a === i ? n : (n = e((i = a), r));
	};
}
function tC(t, e, r) {
	var i, o, n;
	return function () {
		var a,
			l = r(this),
			c;
		return l == null
			? void this.removeAttribute(t)
			: ((a = this.getAttribute(t)),
				(c = l + ""),
				a === c
					? null
					: a === i && c === o
						? n
						: ((o = c), (n = e((i = a), l))));
	};
}
function eC(t, e, r) {
	var i, o, n;
	return function () {
		var a,
			l = r(this),
			c;
		return l == null
			? void this.removeAttributeNS(t.space, t.local)
			: ((a = this.getAttributeNS(t.space, t.local)),
				(c = l + ""),
				a === c
					? null
					: a === i && c === o
						? n
						: ((o = c), (n = e((i = a), l))));
	};
}
function Nf(t, e) {
	var r = Be(t),
		i = r === "transform" ? ds : On;
	return this.attrTween(
		t,
		typeof e == "function"
			? (r.local ? eC : tC)(r, i, fi(this, "attr." + t, e))
			: e == null
				? (r.local ? Z_ : K_)(r)
				: (r.local ? J_ : Q_)(r, i, e),
	);
}
s();
function rC(t, e) {
	return function (r) {
		this.setAttribute(t, e.call(this, r));
	};
}
function iC(t, e) {
	return function (r) {
		this.setAttributeNS(t.space, t.local, e.call(this, r));
	};
}
function oC(t, e) {
	var r, i;
	function o() {
		var n = e.apply(this, arguments);
		return n !== i && (r = (i = n) && iC(t, n)), r;
	}
	return (o._value = e), o;
}
function nC(t, e) {
	var r, i;
	function o() {
		var n = e.apply(this, arguments);
		return n !== i && (r = (i = n) && rC(t, n)), r;
	}
	return (o._value = e), o;
}
function Rf(t, e) {
	var r = "attr." + t;
	if (arguments.length < 2) return (r = this.tween(r)) && r._value;
	if (e == null) return this.tween(r, null);
	if (typeof e != "function") throw new Error();
	var i = Be(t);
	return this.tween(r, (i.local ? oC : nC)(i, e));
}
s();
function aC(t, e) {
	return function () {
		po(this, t).delay = +e.apply(this, arguments);
	};
}
function sC(t, e) {
	return (
		(e = +e),
		function () {
			po(this, t).delay = e;
		}
	);
}
function Pf(t) {
	var e = this._id;
	return arguments.length
		? this.each((typeof t == "function" ? aC : sC)(e, t))
		: Ct(this.node(), e).delay;
}
s();
function lC(t, e) {
	return function () {
		Ot(this, t).duration = +e.apply(this, arguments);
	};
}
function cC(t, e) {
	return (
		(e = +e),
		function () {
			Ot(this, t).duration = e;
		}
	);
}
function $f(t) {
	var e = this._id;
	return arguments.length
		? this.each((typeof t == "function" ? lC : cC)(e, t))
		: Ct(this.node(), e).duration;
}
s();
function uC(t, e) {
	if (typeof e != "function") throw new Error();
	return function () {
		Ot(this, t).ease = e;
	};
}
function zf(t) {
	var e = this._id;
	return arguments.length ? this.each(uC(e, t)) : Ct(this.node(), e).ease;
}
s();
function hC(t, e) {
	return function () {
		var r = e.apply(this, arguments);
		if (typeof r != "function") throw new Error();
		Ot(this, t).ease = r;
	};
}
function qf(t) {
	if (typeof t != "function") throw new Error();
	return this.each(hC(this._id, t));
}
s();
function Wf(t) {
	typeof t != "function" && (t = Wi(t));
	for (var e = this._groups, r = e.length, i = new Array(r), o = 0; o < r; ++o)
		for (var n = e[o], a = n.length, l = (i[o] = []), c, u = 0; u < a; ++u)
			(c = n[u]) && t.call(c, c.__data__, u, n) && l.push(c);
	return new Ut(i, this._parents, this._name, this._id);
}
s();
function Uf(t) {
	if (t._id !== this._id) throw new Error();
	for (
		var e = this._groups,
			r = t._groups,
			i = e.length,
			o = r.length,
			n = Math.min(i, o),
			a = new Array(i),
			l = 0;
		l < n;
		++l
	)
		for (
			var c = e[l], u = r[l], p = c.length, d = (a[l] = new Array(p)), h, m = 0;
			m < p;
			++m
		)
			(h = c[m] || u[m]) && (d[m] = h);
	for (; l < i; ++l) a[l] = e[l];
	return new Ut(a, this._parents, this._name, this._id);
}
s();
function fC(t) {
	return (t + "")
		.trim()
		.split(/^|\s+/)
		.every(function (e) {
			var r = e.indexOf(".");
			return r >= 0 && (e = e.slice(0, r)), !e || e === "start";
		});
}
function pC(t, e, r) {
	var i,
		o,
		n = fC(e) ? po : Ot;
	return function () {
		var a = n(this, t),
			l = a.on;
		l !== i && (o = (i = l).copy()).on(e, r), (a.on = o);
	};
}
function Hf(t, e) {
	var r = this._id;
	return arguments.length < 2
		? Ct(this.node(), r).on.on(t)
		: this.each(pC(r, t, e));
}
s();
function dC(t) {
	return function () {
		var e = this.parentNode;
		for (var r in this.__transition) if (+r !== t) return;
		e && e.removeChild(this);
	};
}
function Yf() {
	return this.on("end.remove", dC(this._id));
}
s();
function jf(t) {
	var e = this._name,
		r = this._id;
	typeof t != "function" && (t = fr(t));
	for (var i = this._groups, o = i.length, n = new Array(o), a = 0; a < o; ++a)
		for (
			var l = i[a], c = l.length, u = (n[a] = new Array(c)), p, d, h = 0;
			h < c;
			++h
		)
			(p = l[h]) &&
				(d = t.call(p, p.__data__, h, l)) &&
				("__data__" in p && (d.__data__ = p.__data__),
				(u[h] = d),
				Xe(u[h], e, r, h, u, Ct(p, r)));
	return new Ut(n, this._parents, e, r);
}
s();
function Gf(t) {
	var e = this._name,
		r = this._id;
	typeof t != "function" && (t = qi(t));
	for (var i = this._groups, o = i.length, n = [], a = [], l = 0; l < o; ++l)
		for (var c = i[l], u = c.length, p, d = 0; d < u; ++d)
			if ((p = c[d])) {
				for (
					var h = t.call(p, p.__data__, d, c),
						m,
						_ = Ct(p, r),
						b = 0,
						v = h.length;
					b < v;
					++b
				)
					(m = h[b]) && Xe(m, e, r, b, h, _);
				n.push(h), a.push(p);
			}
	return new Ut(n, a, e, r);
}
s();
var mC = Fe.prototype.constructor;
function Vf() {
	return new mC(this._groups, this._parents);
}
s();
function gC(t, e) {
	var r, i, o;
	return function () {
		var n = We(this, t),
			a = (this.style.removeProperty(t), We(this, t));
		return n === a ? null : n === r && a === i ? o : (o = e((r = n), (i = a)));
	};
}
function Xf(t) {
	return function () {
		this.style.removeProperty(t);
	};
}
function xC(t, e, r) {
	var i,
		o = r + "",
		n;
	return function () {
		var a = We(this, t);
		return a === o ? null : a === i ? n : (n = e((i = a), r));
	};
}
function yC(t, e, r) {
	var i, o, n;
	return function () {
		var a = We(this, t),
			l = r(this),
			c = l + "";
		return (
			l == null && (c = l = (this.style.removeProperty(t), We(this, t))),
			a === c ? null : a === i && c === o ? n : ((o = c), (n = e((i = a), l)))
		);
	};
}
function _C(t, e) {
	var r,
		i,
		o,
		n = "style." + e,
		a = "end." + n,
		l;
	return function () {
		var c = Ot(this, t),
			u = c.on,
			p = c.value[n] == null ? l || (l = Xf(e)) : void 0;
		(u !== r || o !== p) && (i = (r = u).copy()).on(a, (o = p)), (c.on = i);
	};
}
function Kf(t, e, r) {
	var i = (t += "") == "transform" ? ps : On;
	return e == null
		? this.styleTween(t, gC(t, i)).on("end.style." + t, Xf(t))
		: typeof e == "function"
			? this.styleTween(t, yC(t, i, fi(this, "style." + t, e))).each(
					_C(this._id, t),
				)
			: this.styleTween(t, xC(t, i, e), r).on("end.style." + t, null);
}
s();
function CC(t, e, r) {
	return function (i) {
		this.style.setProperty(t, e.call(this, i), r);
	};
}
function bC(t, e, r) {
	var i, o;
	function n() {
		var a = e.apply(this, arguments);
		return a !== o && (i = (o = a) && CC(t, a, r)), i;
	}
	return (n._value = e), n;
}
function Zf(t, e, r) {
	var i = "style." + (t += "");
	if (arguments.length < 2) return (i = this.tween(i)) && i._value;
	if (e == null) return this.tween(i, null);
	if (typeof e != "function") throw new Error();
	return this.tween(i, bC(t, e, r ?? ""));
}
s();
function TC(t) {
	return function () {
		this.textContent = t;
	};
}
function vC(t) {
	return function () {
		var e = t(this);
		this.textContent = e ?? "";
	};
}
function Qf(t) {
	return this.tween(
		"text",
		typeof t == "function"
			? vC(fi(this, "text", t))
			: TC(t == null ? "" : t + ""),
	);
}
s();
function kC(t) {
	return function (e) {
		this.textContent = t.call(this, e);
	};
}
function SC(t) {
	var e, r;
	function i() {
		var o = t.apply(this, arguments);
		return o !== r && (e = (r = o) && kC(o)), e;
	}
	return (i._value = t), i;
}
function Jf(t) {
	var e = "text";
	if (arguments.length < 1) return (e = this.tween(e)) && e._value;
	if (t == null) return this.tween(e, null);
	if (typeof t != "function") throw new Error();
	return this.tween(e, SC(t));
}
s();
function tp() {
	for (
		var t = this._name,
			e = this._id,
			r = In(),
			i = this._groups,
			o = i.length,
			n = 0;
		n < o;
		++n
	)
		for (var a = i[n], l = a.length, c, u = 0; u < l; ++u)
			if ((c = a[u])) {
				var p = Ct(c, e);
				Xe(c, t, r, u, a, {
					time: p.time + p.delay + p.duration,
					delay: 0,
					duration: p.duration,
					ease: p.ease,
				});
			}
	return new Ut(i, this._parents, t, r);
}
s();
function ep() {
	var t,
		e,
		r = this,
		i = r._id,
		o = r.size();
	return new Promise(function (n, a) {
		var l = { value: a },
			c = {
				value: function () {
					--o === 0 && n();
				},
			};
		r.each(function () {
			var u = Ot(this, i),
				p = u.on;
			p !== t &&
				((e = (t = p).copy()),
				e._.cancel.push(l),
				e._.interrupt.push(l),
				e._.end.push(c)),
				(u.on = e);
		}),
			o === 0 && n();
	});
}
var wC = 0;
function Ut(t, e, r, i) {
	(this._groups = t), (this._parents = e), (this._name = r), (this._id = i);
}
function rp(t) {
	return Fe().transition(t);
}
function In() {
	return ++wC;
}
var Ie = Fe.prototype;
Ut.prototype = rp.prototype = {
	constructor: Ut,
	select: jf,
	selectAll: Gf,
	selectChild: Ie.selectChild,
	selectChildren: Ie.selectChildren,
	filter: Wf,
	merge: Uf,
	selection: Vf,
	transition: tp,
	call: Ie.call,
	nodes: Ie.nodes,
	node: Ie.node,
	size: Ie.size,
	empty: Ie.empty,
	each: Ie.each,
	on: Hf,
	attr: Nf,
	attrTween: Rf,
	style: Kf,
	styleTween: Zf,
	text: Qf,
	textTween: Jf,
	remove: Yf,
	tween: Df,
	delay: Pf,
	duration: $f,
	ease: zf,
	easeVarying: qf,
	end: ep,
	[Symbol.iterator]: Ie[Symbol.iterator],
};
s();
s();
function Dn(t) {
	return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var AC = { time: null, delay: 0, duration: 250, ease: Dn };
function BC(t, e) {
	for (var r; !(r = t.__transition) || !(r = r[e]); )
		if (!(t = t.parentNode)) throw new Error(`transition ${e} not found`);
	return r;
}
function ip(t) {
	var e, r;
	t instanceof Ut
		? ((e = t._id), (t = t._name))
		: ((e = In()), ((r = AC).time = ho()), (t = t == null ? null : t + ""));
	for (var i = this._groups, o = i.length, n = 0; n < o; ++n)
		for (var a = i[n], l = a.length, c, u = 0; u < l; ++u)
			(c = a[u]) && Xe(c, t, e, u, a, r || BC(c, e));
	return new Ut(i, this._parents, t, e);
}
Fe.prototype.interrupt = If;
Fe.prototype.transition = ip;
s();
s();
s();
var { abs: WR, max: UR, min: HR } = Math;
function op(t) {
	return [+t[0], +t[1]];
}
function FC(t) {
	return [op(t[0]), op(t[1])];
}
var YR = {
		name: "x",
		handles: ["w", "e"].map(hl),
		input: function (t, e) {
			return t == null
				? null
				: [
						[+t[0], e[0][1]],
						[+t[1], e[1][1]],
					];
		},
		output: function (t) {
			return t && [t[0][0], t[1][0]];
		},
	},
	jR = {
		name: "y",
		handles: ["n", "s"].map(hl),
		input: function (t, e) {
			return t == null
				? null
				: [
						[e[0][0], +t[0]],
						[e[1][0], +t[1]],
					];
		},
		output: function (t) {
			return t && [t[0][1], t[1][1]];
		},
	},
	GR = {
		name: "xy",
		handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(hl),
		input: function (t) {
			return t == null ? null : FC(t);
		},
		output: function (t) {
			return t;
		},
	};
function hl(t) {
	return { type: t };
}
s();
s();
function LC(t) {
	if (!t.ok) throw new Error(t.status + " " + t.statusText);
	return t.text();
}
function np(t, e) {
	return fetch(t, e).then(LC);
}
s();
function fl(t) {
	return (e, r) => np(e, r).then((i) => new DOMParser().parseFromString(i, t));
}
var MC = fl("application/xml"),
	EC = fl("text/html"),
	OC = fl("image/svg+xml");
s();
s();
s();
s();
s();
function Ke(t, e, r) {
	(this.k = t), (this.x = e), (this.y = r);
}
Ke.prototype = {
	constructor: Ke,
	scale: function (t) {
		return t === 1 ? this : new Ke(this.k * t, this.x, this.y);
	},
	translate: function (t, e) {
		return (t === 0) & (e === 0)
			? this
			: new Ke(this.k, this.x + this.k * t, this.y + this.k * e);
	},
	apply: function (t) {
		return [t[0] * this.k + this.x, t[1] * this.k + this.y];
	},
	applyX: function (t) {
		return t * this.k + this.x;
	},
	applyY: function (t) {
		return t * this.k + this.y;
	},
	invert: function (t) {
		return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
	},
	invertX: function (t) {
		return (t - this.x) / this.k;
	},
	invertY: function (t) {
		return (t - this.y) / this.k;
	},
	rescaleX: function (t) {
		return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
	},
	rescaleY: function (t) {
		return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
	},
	toString: function () {
		return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
	},
};
var pl = new Ke(1, 0, 0);
dl.prototype = Ke.prototype;
function dl(t) {
	for (; !t.__zoom; ) if (!(t = t.parentNode)) return pl;
	return t.__zoom;
}
s();
s();
s();
s();
var Nn = {
		min: { r: 0, g: 0, b: 0, s: 0, l: 0, a: 0 },
		max: { r: 255, g: 255, b: 255, h: 360, s: 100, l: 100, a: 1 },
		clamp: {
			r: (t) => (t >= 255 ? 255 : t < 0 ? 0 : t),
			g: (t) => (t >= 255 ? 255 : t < 0 ? 0 : t),
			b: (t) => (t >= 255 ? 255 : t < 0 ? 0 : t),
			h: (t) => t % 360,
			s: (t) => (t >= 100 ? 100 : t < 0 ? 0 : t),
			l: (t) => (t >= 100 ? 100 : t < 0 ? 0 : t),
			a: (t) => (t >= 1 ? 1 : t < 0 ? 0 : t),
		},
		toLinear: (t) => {
			let e = t / 255;
			return t > 0.03928 ? Math.pow((e + 0.055) / 1.055, 2.4) : e / 12.92;
		},
		hue2rgb: (t, e, r) => (
			r < 0 && (r += 1),
			r > 1 && (r -= 1),
			r < 0.16666666666666666
				? t + (e - t) * 6 * r
				: r < 0.5
					? e
					: r < 0.6666666666666666
						? t + (e - t) * (0.6666666666666666 - r) * 6
						: t
		),
		hsl2rgb: ({ h: t, s: e, l: r }, i) => {
			if (!e) return r * 2.55;
			(t /= 360), (e /= 100), (r /= 100);
			let o = r < 0.5 ? r * (1 + e) : r + e - r * e,
				n = 2 * r - o;
			switch (i) {
				case "r":
					return Nn.hue2rgb(n, o, t + 0.3333333333333333) * 255;
				case "g":
					return Nn.hue2rgb(n, o, t) * 255;
				case "b":
					return Nn.hue2rgb(n, o, t - 0.3333333333333333) * 255;
			}
		},
		rgb2hsl: ({ r: t, g: e, b: r }, i) => {
			(t /= 255), (e /= 255), (r /= 255);
			let o = Math.max(t, e, r),
				n = Math.min(t, e, r),
				a = (o + n) / 2;
			if (i === "l") return a * 100;
			if (o === n) return 0;
			let l = o - n,
				c = a > 0.5 ? l / (2 - o - n) : l / (o + n);
			if (i === "s") return c * 100;
			switch (o) {
				case t:
					return ((e - r) / l + (e < r ? 6 : 0)) * 60;
				case e:
					return ((r - t) / l + 2) * 60;
				case r:
					return ((t - e) / l + 4) * 60;
				default:
					return -1;
			}
		},
	},
	sp = Nn;
s();
var IC = {
		clamp: (t, e, r) =>
			e > r ? Math.min(e, Math.max(r, t)) : Math.min(r, Math.max(e, t)),
		round: (t) => Math.round(t * 1e10) / 1e10,
	},
	lp = IC;
s();
var DC = {
		dec2hex: (t) => {
			let e = Math.round(t).toString(16);
			return e.length > 1 ? e : `0${e}`;
		},
	},
	cp = DC;
var NC = { channel: sp, lang: lp, unit: cp },
	U = NC;
s();
s();
s();
s();
var De = {};
for (let t = 0; t <= 255; t++) De[t] = U.unit.dec2hex(t);
var bt = { ALL: 0, RGB: 1, HSL: 2 };
var xl = class {
		constructor() {
			this.type = bt.ALL;
		}
		get() {
			return this.type;
		}
		set(e) {
			if (this.type && this.type !== e)
				throw new Error(
					"Cannot change both RGB and HSL channels at the same time",
				);
			this.type = e;
		}
		reset() {
			this.type = bt.ALL;
		}
		is(e) {
			return this.type === e;
		}
	},
	up = xl;
var yl = class {
		constructor(e, r) {
			(this.color = r),
				(this.changed = !1),
				(this.data = e),
				(this.type = new up());
		}
		set(e, r) {
			return (
				(this.color = r),
				(this.changed = !1),
				(this.data = e),
				(this.type.type = bt.ALL),
				this
			);
		}
		_ensureHSL() {
			let e = this.data,
				{ h: r, s: i, l: o } = e;
			r === void 0 && (e.h = U.channel.rgb2hsl(e, "h")),
				i === void 0 && (e.s = U.channel.rgb2hsl(e, "s")),
				o === void 0 && (e.l = U.channel.rgb2hsl(e, "l"));
		}
		_ensureRGB() {
			let e = this.data,
				{ r, g: i, b: o } = e;
			r === void 0 && (e.r = U.channel.hsl2rgb(e, "r")),
				i === void 0 && (e.g = U.channel.hsl2rgb(e, "g")),
				o === void 0 && (e.b = U.channel.hsl2rgb(e, "b"));
		}
		get r() {
			let e = this.data,
				r = e.r;
			return !this.type.is(bt.HSL) && r !== void 0
				? r
				: (this._ensureHSL(), U.channel.hsl2rgb(e, "r"));
		}
		get g() {
			let e = this.data,
				r = e.g;
			return !this.type.is(bt.HSL) && r !== void 0
				? r
				: (this._ensureHSL(), U.channel.hsl2rgb(e, "g"));
		}
		get b() {
			let e = this.data,
				r = e.b;
			return !this.type.is(bt.HSL) && r !== void 0
				? r
				: (this._ensureHSL(), U.channel.hsl2rgb(e, "b"));
		}
		get h() {
			let e = this.data,
				r = e.h;
			return !this.type.is(bt.RGB) && r !== void 0
				? r
				: (this._ensureRGB(), U.channel.rgb2hsl(e, "h"));
		}
		get s() {
			let e = this.data,
				r = e.s;
			return !this.type.is(bt.RGB) && r !== void 0
				? r
				: (this._ensureRGB(), U.channel.rgb2hsl(e, "s"));
		}
		get l() {
			let e = this.data,
				r = e.l;
			return !this.type.is(bt.RGB) && r !== void 0
				? r
				: (this._ensureRGB(), U.channel.rgb2hsl(e, "l"));
		}
		get a() {
			return this.data.a;
		}
		set r(e) {
			this.type.set(bt.RGB), (this.changed = !0), (this.data.r = e);
		}
		set g(e) {
			this.type.set(bt.RGB), (this.changed = !0), (this.data.g = e);
		}
		set b(e) {
			this.type.set(bt.RGB), (this.changed = !0), (this.data.b = e);
		}
		set h(e) {
			this.type.set(bt.HSL), (this.changed = !0), (this.data.h = e);
		}
		set s(e) {
			this.type.set(bt.HSL), (this.changed = !0), (this.data.s = e);
		}
		set l(e) {
			this.type.set(bt.HSL), (this.changed = !0), (this.data.l = e);
		}
		set a(e) {
			(this.changed = !0), (this.data.a = e);
		}
	},
	hp = yl;
var RC = new hp({ r: 0, g: 0, b: 0, a: 0 }, "transparent"),
	Ze = RC;
s();
s();
var fp = {
		re: /^#((?:[a-f0-9]{2}){2,4}|[a-f0-9]{3})$/i,
		parse: (t) => {
			if (t.charCodeAt(0) !== 35) return;
			let e = t.match(fp.re);
			if (!e) return;
			let r = e[1],
				i = parseInt(r, 16),
				o = r.length,
				n = o % 4 === 0,
				a = o > 4,
				l = a ? 1 : 17,
				c = a ? 8 : 4,
				u = n ? 0 : -1,
				p = a ? 255 : 15;
			return Ze.set(
				{
					r: ((i >> (c * (u + 3))) & p) * l,
					g: ((i >> (c * (u + 2))) & p) * l,
					b: ((i >> (c * (u + 1))) & p) * l,
					a: n ? ((i & p) * l) / 255 : 1,
				},
				t,
			);
		},
		stringify: (t) => {
			let { r: e, g: r, b: i, a: o } = t;
			return o < 1
				? `#${De[Math.round(e)]}${De[Math.round(r)]}${De[Math.round(i)]}${De[Math.round(o * 255)]}`
				: `#${De[Math.round(e)]}${De[Math.round(r)]}${De[Math.round(i)]}`;
		},
	},
	Fr = fp;
s();
var Rn = {
		re: /^hsla?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(?:deg|grad|rad|turn)?)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(%)?))?\s*?\)$/i,
		hueRe: /^(.+?)(deg|grad|rad|turn)$/i,
		_hue2deg: (t) => {
			let e = t.match(Rn.hueRe);
			if (e) {
				let [, r, i] = e;
				switch (i) {
					case "grad":
						return U.channel.clamp.h(parseFloat(r) * 0.9);
					case "rad":
						return U.channel.clamp.h((parseFloat(r) * 180) / Math.PI);
					case "turn":
						return U.channel.clamp.h(parseFloat(r) * 360);
				}
			}
			return U.channel.clamp.h(parseFloat(t));
		},
		parse: (t) => {
			let e = t.charCodeAt(0);
			if (e !== 104 && e !== 72) return;
			let r = t.match(Rn.re);
			if (!r) return;
			let [, i, o, n, a, l] = r;
			return Ze.set(
				{
					h: Rn._hue2deg(i),
					s: U.channel.clamp.s(parseFloat(o)),
					l: U.channel.clamp.l(parseFloat(n)),
					a: a ? U.channel.clamp.a(l ? parseFloat(a) / 100 : parseFloat(a)) : 1,
				},
				t,
			);
		},
		stringify: (t) => {
			let { h: e, s: r, l: i, a: o } = t;
			return o < 1
				? `hsla(${U.lang.round(e)}, ${U.lang.round(r)}%, ${U.lang.round(i)}%, ${o})`
				: `hsl(${U.lang.round(e)}, ${U.lang.round(r)}%, ${U.lang.round(i)}%)`;
		},
	},
	mo = Rn;
s();
var Pn = {
		colors: {
			aliceblue: "#f0f8ff",
			antiquewhite: "#faebd7",
			aqua: "#00ffff",
			aquamarine: "#7fffd4",
			azure: "#f0ffff",
			beige: "#f5f5dc",
			bisque: "#ffe4c4",
			black: "#000000",
			blanchedalmond: "#ffebcd",
			blue: "#0000ff",
			blueviolet: "#8a2be2",
			brown: "#a52a2a",
			burlywood: "#deb887",
			cadetblue: "#5f9ea0",
			chartreuse: "#7fff00",
			chocolate: "#d2691e",
			coral: "#ff7f50",
			cornflowerblue: "#6495ed",
			cornsilk: "#fff8dc",
			crimson: "#dc143c",
			cyanaqua: "#00ffff",
			darkblue: "#00008b",
			darkcyan: "#008b8b",
			darkgoldenrod: "#b8860b",
			darkgray: "#a9a9a9",
			darkgreen: "#006400",
			darkgrey: "#a9a9a9",
			darkkhaki: "#bdb76b",
			darkmagenta: "#8b008b",
			darkolivegreen: "#556b2f",
			darkorange: "#ff8c00",
			darkorchid: "#9932cc",
			darkred: "#8b0000",
			darksalmon: "#e9967a",
			darkseagreen: "#8fbc8f",
			darkslateblue: "#483d8b",
			darkslategray: "#2f4f4f",
			darkslategrey: "#2f4f4f",
			darkturquoise: "#00ced1",
			darkviolet: "#9400d3",
			deeppink: "#ff1493",
			deepskyblue: "#00bfff",
			dimgray: "#696969",
			dimgrey: "#696969",
			dodgerblue: "#1e90ff",
			firebrick: "#b22222",
			floralwhite: "#fffaf0",
			forestgreen: "#228b22",
			fuchsia: "#ff00ff",
			gainsboro: "#dcdcdc",
			ghostwhite: "#f8f8ff",
			gold: "#ffd700",
			goldenrod: "#daa520",
			gray: "#808080",
			green: "#008000",
			greenyellow: "#adff2f",
			grey: "#808080",
			honeydew: "#f0fff0",
			hotpink: "#ff69b4",
			indianred: "#cd5c5c",
			indigo: "#4b0082",
			ivory: "#fffff0",
			khaki: "#f0e68c",
			lavender: "#e6e6fa",
			lavenderblush: "#fff0f5",
			lawngreen: "#7cfc00",
			lemonchiffon: "#fffacd",
			lightblue: "#add8e6",
			lightcoral: "#f08080",
			lightcyan: "#e0ffff",
			lightgoldenrodyellow: "#fafad2",
			lightgray: "#d3d3d3",
			lightgreen: "#90ee90",
			lightgrey: "#d3d3d3",
			lightpink: "#ffb6c1",
			lightsalmon: "#ffa07a",
			lightseagreen: "#20b2aa",
			lightskyblue: "#87cefa",
			lightslategray: "#778899",
			lightslategrey: "#778899",
			lightsteelblue: "#b0c4de",
			lightyellow: "#ffffe0",
			lime: "#00ff00",
			limegreen: "#32cd32",
			linen: "#faf0e6",
			magenta: "#ff00ff",
			maroon: "#800000",
			mediumaquamarine: "#66cdaa",
			mediumblue: "#0000cd",
			mediumorchid: "#ba55d3",
			mediumpurple: "#9370db",
			mediumseagreen: "#3cb371",
			mediumslateblue: "#7b68ee",
			mediumspringgreen: "#00fa9a",
			mediumturquoise: "#48d1cc",
			mediumvioletred: "#c71585",
			midnightblue: "#191970",
			mintcream: "#f5fffa",
			mistyrose: "#ffe4e1",
			moccasin: "#ffe4b5",
			navajowhite: "#ffdead",
			navy: "#000080",
			oldlace: "#fdf5e6",
			olive: "#808000",
			olivedrab: "#6b8e23",
			orange: "#ffa500",
			orangered: "#ff4500",
			orchid: "#da70d6",
			palegoldenrod: "#eee8aa",
			palegreen: "#98fb98",
			paleturquoise: "#afeeee",
			palevioletred: "#db7093",
			papayawhip: "#ffefd5",
			peachpuff: "#ffdab9",
			peru: "#cd853f",
			pink: "#ffc0cb",
			plum: "#dda0dd",
			powderblue: "#b0e0e6",
			purple: "#800080",
			rebeccapurple: "#663399",
			red: "#ff0000",
			rosybrown: "#bc8f8f",
			royalblue: "#4169e1",
			saddlebrown: "#8b4513",
			salmon: "#fa8072",
			sandybrown: "#f4a460",
			seagreen: "#2e8b57",
			seashell: "#fff5ee",
			sienna: "#a0522d",
			silver: "#c0c0c0",
			skyblue: "#87ceeb",
			slateblue: "#6a5acd",
			slategray: "#708090",
			slategrey: "#708090",
			snow: "#fffafa",
			springgreen: "#00ff7f",
			tan: "#d2b48c",
			teal: "#008080",
			thistle: "#d8bfd8",
			transparent: "#00000000",
			turquoise: "#40e0d0",
			violet: "#ee82ee",
			wheat: "#f5deb3",
			white: "#ffffff",
			whitesmoke: "#f5f5f5",
			yellow: "#ffff00",
			yellowgreen: "#9acd32",
		},
		parse: (t) => {
			t = t.toLowerCase();
			let e = Pn.colors[t];
			if (e) return Fr.parse(e);
		},
		stringify: (t) => {
			let e = Fr.stringify(t);
			for (let r in Pn.colors) if (Pn.colors[r] === e) return r;
		},
	},
	_l = Pn;
s();
var pp = {
		re: /^rgba?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?)))?\s*?\)$/i,
		parse: (t) => {
			let e = t.charCodeAt(0);
			if (e !== 114 && e !== 82) return;
			let r = t.match(pp.re);
			if (!r) return;
			let [, i, o, n, a, l, c, u, p] = r;
			return Ze.set(
				{
					r: U.channel.clamp.r(o ? parseFloat(i) * 2.55 : parseFloat(i)),
					g: U.channel.clamp.g(a ? parseFloat(n) * 2.55 : parseFloat(n)),
					b: U.channel.clamp.b(c ? parseFloat(l) * 2.55 : parseFloat(l)),
					a: u ? U.channel.clamp.a(p ? parseFloat(u) / 100 : parseFloat(u)) : 1,
				},
				t,
			);
		},
		stringify: (t) => {
			let { r: e, g: r, b: i, a: o } = t;
			return o < 1
				? `rgba(${U.lang.round(e)}, ${U.lang.round(r)}, ${U.lang.round(i)}, ${U.lang.round(o)})`
				: `rgb(${U.lang.round(e)}, ${U.lang.round(r)}, ${U.lang.round(i)})`;
		},
	},
	go = pp;
var PC = {
		format: { keyword: _l, hex: Fr, rgb: go, rgba: go, hsl: mo, hsla: mo },
		parse: (t) => {
			if (typeof t != "string") return t;
			let e = Fr.parse(t) || go.parse(t) || mo.parse(t) || _l.parse(t);
			if (e) return e;
			throw new Error(`Unsupported color format: "${t}"`);
		},
		stringify: (t) =>
			!t.changed && t.color
				? t.color
				: t.type.is(bt.HSL) || t.data.r === void 0
					? mo.stringify(t)
					: t.a < 1 ||
							!Number.isInteger(t.r) ||
							!Number.isInteger(t.g) ||
							!Number.isInteger(t.b)
						? go.stringify(t)
						: Fr.stringify(t),
	},
	Tt = PC;
s();
var $C = (t, e) => {
		let r = Tt.parse(t);
		for (let i in e) r[i] = U.channel.clamp[i](e[i]);
		return Tt.stringify(r);
	},
	$n = $C;
var zC = (t, e, r = 0, i = 1) => {
		if (typeof t != "number") return $n(t, { a: e });
		let o = Ze.set({
			r: U.channel.clamp.r(t),
			g: U.channel.clamp.g(e),
			b: U.channel.clamp.b(r),
			a: U.channel.clamp.a(i),
		});
		return Tt.stringify(o);
	},
	Qe = zC;
s();
var qC = (t, e) => U.lang.round(Tt.parse(t)[e]),
	WC = qC;
s();
s();
s();
var UC = (t) => {
		let { r: e, g: r, b: i } = Tt.parse(t),
			o =
				0.2126 * U.channel.toLinear(e) +
				0.7152 * U.channel.toLinear(r) +
				0.0722 * U.channel.toLinear(i);
		return U.lang.round(o);
	},
	dp = UC;
var HC = (t) => dp(t) >= 0.5,
	mp = HC;
var YC = (t) => !mp(t),
	Lr = YC;
s();
s();
var jC = (t, e, r) => {
		let i = Tt.parse(t),
			o = i[e],
			n = U.channel.clamp[e](o + r);
		return o !== n && (i[e] = n), Tt.stringify(i);
	},
	zn = jC;
var GC = (t, e) => zn(t, "l", e),
	W = GC;
s();
var VC = (t, e) => zn(t, "l", -e),
	V = VC;
s();
s();
var XC = (t, e) => {
		let r = Tt.parse(t),
			i = {};
		for (let o in e) e[o] && (i[o] = r[o] + e[o]);
		return $n(t, i);
	},
	x = XC;
s();
s();
var KC = (t, e, r = 50) => {
		let { r: i, g: o, b: n, a } = Tt.parse(t),
			{ r: l, g: c, b: u, a: p } = Tt.parse(e),
			d = r / 100,
			h = d * 2 - 1,
			m = a - p,
			b = ((h * m === -1 ? h : (h + m) / (1 + h * m)) + 1) / 2,
			v = 1 - b,
			F = i * b + l * v,
			T = o * b + c * v,
			O = n * b + u * v,
			A = a * d + p * (1 - d);
		return Qe(F, T, O, A);
	},
	gp = KC;
var ZC = (t, e = 100) => {
		let r = Tt.parse(t);
		return (r.r = 255 - r.r), (r.g = 255 - r.g), (r.b = 255 - r.b), gp(r, t, e);
	},
	E = ZC;
s();
s();
s();
s();
s();
s();
s();
s();
s();
s();
s();
s();
s();
var QC =
		typeof global == "object" && global && global.Object === Object && global,
	qn = QC;
var JC = typeof self == "object" && self && self.Object === Object && self,
	t1 = qn || JC || Function("return this")(),
	xt = t1;
var e1 = xt.Symbol,
	pi = e1;
s();
var xp = Object.prototype,
	r1 = xp.hasOwnProperty,
	i1 = xp.toString,
	xo = pi ? pi.toStringTag : void 0;
function o1(t) {
	var e = r1.call(t, xo),
		r = t[xo];
	try {
		t[xo] = void 0;
		var i = !0;
	} catch {}
	var o = i1.call(t);
	return i && (e ? (t[xo] = r) : delete t[xo]), o;
}
var yp = o1;
s();
var n1 = Object.prototype,
	a1 = n1.toString;
function s1(t) {
	return a1.call(t);
}
var _p = s1;
var l1 = "[object Null]",
	c1 = "[object Undefined]",
	Cp = pi ? pi.toStringTag : void 0;
function u1(t) {
	return t == null
		? t === void 0
			? c1
			: l1
		: Cp && Cp in Object(t)
			? yp(t)
			: _p(t);
}
var ue = u1;
s();
function h1(t) {
	var e = typeof t;
	return t != null && (e == "object" || e == "function");
}
var Xt = h1;
var f1 = "[object AsyncFunction]",
	p1 = "[object Function]",
	d1 = "[object GeneratorFunction]",
	m1 = "[object Proxy]";
function g1(t) {
	if (!Xt(t)) return !1;
	var e = ue(t);
	return e == p1 || e == d1 || e == f1 || e == m1;
}
var di = g1;
s();
s();
var x1 = xt["__core-js_shared__"],
	Wn = x1;
var bp = (function () {
	var t = /[^.]+$/.exec((Wn && Wn.keys && Wn.keys.IE_PROTO) || "");
	return t ? "Symbol(src)_1." + t : "";
})();
function y1(t) {
	return !!bp && bp in t;
}
var Tp = y1;
s();
var _1 = Function.prototype,
	C1 = _1.toString;
function b1(t) {
	if (t != null) {
		try {
			return C1.call(t);
		} catch {}
		try {
			return t + "";
		} catch {}
	}
	return "";
}
var Ne = b1;
var T1 = /[\\^$.*+?()[\]{}|]/g,
	v1 = /^\[object .+?Constructor\]$/,
	k1 = Function.prototype,
	S1 = Object.prototype,
	w1 = k1.toString,
	A1 = S1.hasOwnProperty,
	B1 = RegExp(
		"^" +
			w1
				.call(A1)
				.replace(T1, "\\$&")
				.replace(
					/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
					"$1.*?",
				) +
			"$",
	);
function F1(t) {
	if (!Xt(t) || Tp(t)) return !1;
	var e = di(t) ? B1 : v1;
	return e.test(Ne(t));
}
var vp = F1;
s();
function L1(t, e) {
	return t?.[e];
}
var kp = L1;
function M1(t, e) {
	var r = kp(t, e);
	return vp(r) ? r : void 0;
}
var Kt = M1;
var E1 = Kt(Object, "create"),
	Re = E1;
function O1() {
	(this.__data__ = Re ? Re(null) : {}), (this.size = 0);
}
var Sp = O1;
s();
function I1(t) {
	var e = this.has(t) && delete this.__data__[t];
	return (this.size -= e ? 1 : 0), e;
}
var wp = I1;
s();
var D1 = "__lodash_hash_undefined__",
	N1 = Object.prototype,
	R1 = N1.hasOwnProperty;
function P1(t) {
	var e = this.__data__;
	if (Re) {
		var r = e[t];
		return r === D1 ? void 0 : r;
	}
	return R1.call(e, t) ? e[t] : void 0;
}
var Ap = P1;
s();
var $1 = Object.prototype,
	z1 = $1.hasOwnProperty;
function q1(t) {
	var e = this.__data__;
	return Re ? e[t] !== void 0 : z1.call(e, t);
}
var Bp = q1;
s();
var W1 = "__lodash_hash_undefined__";
function U1(t, e) {
	var r = this.__data__;
	return (
		(this.size += this.has(t) ? 0 : 1),
		(r[t] = Re && e === void 0 ? W1 : e),
		this
	);
}
var Fp = U1;
function mi(t) {
	var e = -1,
		r = t == null ? 0 : t.length;
	for (this.clear(); ++e < r; ) {
		var i = t[e];
		this.set(i[0], i[1]);
	}
}
mi.prototype.clear = Sp;
mi.prototype.delete = wp;
mi.prototype.get = Ap;
mi.prototype.has = Bp;
mi.prototype.set = Fp;
var Cl = mi;
s();
s();
function H1() {
	(this.__data__ = []), (this.size = 0);
}
var Lp = H1;
s();
s();
s();
function Y1(t, e) {
	return t === e || (t !== t && e !== e);
}
var Je = Y1;
function j1(t, e) {
	for (var r = t.length; r--; ) if (Je(t[r][0], e)) return r;
	return -1;
}
var tr = j1;
var G1 = Array.prototype,
	V1 = G1.splice;
function X1(t) {
	var e = this.__data__,
		r = tr(e, t);
	if (r < 0) return !1;
	var i = e.length - 1;
	return r == i ? e.pop() : V1.call(e, r, 1), --this.size, !0;
}
var Mp = X1;
s();
function K1(t) {
	var e = this.__data__,
		r = tr(e, t);
	return r < 0 ? void 0 : e[r][1];
}
var Ep = K1;
s();
function Z1(t) {
	return tr(this.__data__, t) > -1;
}
var Op = Z1;
s();
function Q1(t, e) {
	var r = this.__data__,
		i = tr(r, t);
	return i < 0 ? (++this.size, r.push([t, e])) : (r[i][1] = e), this;
}
var Ip = Q1;
function gi(t) {
	var e = -1,
		r = t == null ? 0 : t.length;
	for (this.clear(); ++e < r; ) {
		var i = t[e];
		this.set(i[0], i[1]);
	}
}
gi.prototype.clear = Lp;
gi.prototype.delete = Mp;
gi.prototype.get = Ep;
gi.prototype.has = Op;
gi.prototype.set = Ip;
var er = gi;
s();
var J1 = Kt(xt, "Map"),
	rr = J1;
function tb() {
	(this.size = 0),
		(this.__data__ = {
			hash: new Cl(),
			map: new (rr || er)(),
			string: new Cl(),
		});
}
var Dp = tb;
s();
s();
s();
function eb(t) {
	var e = typeof t;
	return e == "string" || e == "number" || e == "symbol" || e == "boolean"
		? t !== "__proto__"
		: t === null;
}
var Np = eb;
function rb(t, e) {
	var r = t.__data__;
	return Np(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
}
var ir = rb;
function ib(t) {
	var e = ir(this, t).delete(t);
	return (this.size -= e ? 1 : 0), e;
}
var Rp = ib;
s();
function ob(t) {
	return ir(this, t).get(t);
}
var Pp = ob;
s();
function nb(t) {
	return ir(this, t).has(t);
}
var $p = nb;
s();
function ab(t, e) {
	var r = ir(this, t),
		i = r.size;
	return r.set(t, e), (this.size += r.size == i ? 0 : 1), this;
}
var zp = ab;
function xi(t) {
	var e = -1,
		r = t == null ? 0 : t.length;
	for (this.clear(); ++e < r; ) {
		var i = t[e];
		this.set(i[0], i[1]);
	}
}
xi.prototype.clear = Dp;
xi.prototype.delete = Rp;
xi.prototype.get = Pp;
xi.prototype.has = $p;
xi.prototype.set = zp;
var yo = xi;
var sb = "Expected a function";
function bl(t, e) {
	if (typeof t != "function" || (e != null && typeof e != "function"))
		throw new TypeError(sb);
	var r = function () {
		var i = arguments,
			o = e ? e.apply(this, i) : i[0],
			n = r.cache;
		if (n.has(o)) return n.get(o);
		var a = t.apply(this, i);
		return (r.cache = n.set(o, a) || n), a;
	};
	return (r.cache = new (bl.Cache || yo)()), r;
}
bl.Cache = yo;
var Un = bl;
s();
s();
s();
s();
function lb() {
	(this.__data__ = new er()), (this.size = 0);
}
var qp = lb;
s();
function cb(t) {
	var e = this.__data__,
		r = e.delete(t);
	return (this.size = e.size), r;
}
var Wp = cb;
s();
function ub(t) {
	return this.__data__.get(t);
}
var Up = ub;
s();
function hb(t) {
	return this.__data__.has(t);
}
var Hp = hb;
s();
var fb = 200;
function pb(t, e) {
	var r = this.__data__;
	if (r instanceof er) {
		var i = r.__data__;
		if (!rr || i.length < fb - 1)
			return i.push([t, e]), (this.size = ++r.size), this;
		r = this.__data__ = new yo(i);
	}
	return r.set(t, e), (this.size = r.size), this;
}
var Yp = pb;
function yi(t) {
	var e = (this.__data__ = new er(t));
	this.size = e.size;
}
yi.prototype.clear = qp;
yi.prototype.delete = Wp;
yi.prototype.get = Up;
yi.prototype.has = Hp;
yi.prototype.set = Yp;
var jp = yi;
s();
s();
s();
var db = (function () {
		try {
			var t = Kt(Object, "defineProperty");
			return t({}, "", {}), t;
		} catch {}
	})(),
	_i = db;
function mb(t, e, r) {
	e == "__proto__" && _i
		? _i(t, e, { configurable: !0, enumerable: !0, value: r, writable: !0 })
		: (t[e] = r);
}
var Ci = mb;
function gb(t, e, r) {
	((r !== void 0 && !Je(t[e], r)) || (r === void 0 && !(e in t))) &&
		Ci(t, e, r);
}
var _o = gb;
s();
s();
function xb(t) {
	return function (e, r, i) {
		for (var o = -1, n = Object(e), a = i(e), l = a.length; l--; ) {
			var c = a[t ? l : ++o];
			if (r(n[c], c, n) === !1) break;
		}
		return e;
	};
}
var Gp = xb;
var yb = Gp(),
	Vp = yb;
s();
s();
var Qp = typeof exports == "object" && exports && !exports.nodeType && exports,
	Xp = Qp && typeof module == "object" && module && !module.nodeType && module,
	_b = Xp && Xp.exports === Qp,
	Kp = _b ? xt.Buffer : void 0,
	Zp = Kp ? Kp.allocUnsafe : void 0;
function Cb(t, e) {
	if (e) return t.slice();
	var r = t.length,
		i = Zp ? Zp(r) : new t.constructor(r);
	return t.copy(i), i;
}
var Jp = Cb;
s();
s();
s();
var bb = xt.Uint8Array,
	Tl = bb;
function Tb(t) {
	var e = new t.constructor(t.byteLength);
	return new Tl(e).set(new Tl(t)), e;
}
var td = Tb;
function vb(t, e) {
	var r = e ? td(t.buffer) : t.buffer;
	return new t.constructor(r, t.byteOffset, t.length);
}
var ed = vb;
s();
function kb(t, e) {
	var r = -1,
		i = t.length;
	for (e || (e = Array(i)); ++r < i; ) e[r] = t[r];
	return e;
}
var rd = kb;
s();
s();
var id = Object.create,
	Sb = (function () {
		function t() {}
		return function (e) {
			if (!Xt(e)) return {};
			if (id) return id(e);
			t.prototype = e;
			var r = new t();
			return (t.prototype = void 0), r;
		};
	})(),
	od = Sb;
s();
s();
function wb(t, e) {
	return function (r) {
		return t(e(r));
	};
}
var Hn = wb;
var Ab = Hn(Object.getPrototypeOf, Object),
	Yn = Ab;
s();
var Bb = Object.prototype;
function Fb(t) {
	var e = t && t.constructor,
		r = (typeof e == "function" && e.prototype) || Bb;
	return t === r;
}
var or = Fb;
function Lb(t) {
	return typeof t.constructor == "function" && !or(t) ? od(Yn(t)) : {};
}
var nd = Lb;
s();
s();
s();
function Mb(t) {
	return t != null && typeof t == "object";
}
var Ce = Mb;
var Eb = "[object Arguments]";
function Ob(t) {
	return Ce(t) && ue(t) == Eb;
}
var vl = Ob;
var ad = Object.prototype,
	Ib = ad.hasOwnProperty,
	Db = ad.propertyIsEnumerable,
	Nb = vl(
		(function () {
			return arguments;
		})(),
	)
		? vl
		: function (t) {
				return Ce(t) && Ib.call(t, "callee") && !Db.call(t, "callee");
			},
	Mr = Nb;
s();
var Rb = Array.isArray,
	Er = Rb;
s();
s();
s();
var Pb = 9007199254740991;
function $b(t) {
	return typeof t == "number" && t > -1 && t % 1 == 0 && t <= Pb;
}
var jn = $b;
function zb(t) {
	return t != null && jn(t.length) && !di(t);
}
var nr = zb;
function qb(t) {
	return Ce(t) && nr(t);
}
var sd = qb;
s();
s();
function Wb() {
	return !1;
}
var ld = Wb;
var hd = typeof exports == "object" && exports && !exports.nodeType && exports,
	cd = hd && typeof module == "object" && module && !module.nodeType && module,
	Ub = cd && cd.exports === hd,
	ud = Ub ? xt.Buffer : void 0,
	Hb = ud ? ud.isBuffer : void 0,
	Yb = Hb || ld,
	bi = Yb;
s();
var jb = "[object Object]",
	Gb = Function.prototype,
	Vb = Object.prototype,
	fd = Gb.toString,
	Xb = Vb.hasOwnProperty,
	Kb = fd.call(Object);
function Zb(t) {
	if (!Ce(t) || ue(t) != jb) return !1;
	var e = Yn(t);
	if (e === null) return !0;
	var r = Xb.call(e, "constructor") && e.constructor;
	return typeof r == "function" && r instanceof r && fd.call(r) == Kb;
}
var pd = Zb;
s();
s();
var Qb = "[object Arguments]",
	Jb = "[object Array]",
	tT = "[object Boolean]",
	eT = "[object Date]",
	rT = "[object Error]",
	iT = "[object Function]",
	oT = "[object Map]",
	nT = "[object Number]",
	aT = "[object Object]",
	sT = "[object RegExp]",
	lT = "[object Set]",
	cT = "[object String]",
	uT = "[object WeakMap]",
	hT = "[object ArrayBuffer]",
	fT = "[object DataView]",
	pT = "[object Float32Array]",
	dT = "[object Float64Array]",
	mT = "[object Int8Array]",
	gT = "[object Int16Array]",
	xT = "[object Int32Array]",
	yT = "[object Uint8Array]",
	_T = "[object Uint8ClampedArray]",
	CT = "[object Uint16Array]",
	bT = "[object Uint32Array]",
	ht = {};
ht[pT] =
	ht[dT] =
	ht[mT] =
	ht[gT] =
	ht[xT] =
	ht[yT] =
	ht[_T] =
	ht[CT] =
	ht[bT] =
		!0;
ht[Qb] =
	ht[Jb] =
	ht[hT] =
	ht[tT] =
	ht[fT] =
	ht[eT] =
	ht[rT] =
	ht[iT] =
	ht[oT] =
	ht[nT] =
	ht[aT] =
	ht[sT] =
	ht[lT] =
	ht[cT] =
	ht[uT] =
		!1;
function TT(t) {
	return Ce(t) && jn(t.length) && !!ht[ue(t)];
}
var dd = TT;
s();
function vT(t) {
	return function (e) {
		return t(e);
	};
}
var md = vT;
s();
var gd = typeof exports == "object" && exports && !exports.nodeType && exports,
	Co = gd && typeof module == "object" && module && !module.nodeType && module,
	kT = Co && Co.exports === gd,
	kl = kT && qn.process,
	ST = (function () {
		try {
			var t = Co && Co.require && Co.require("util").types;
			return t || (kl && kl.binding && kl.binding("util"));
		} catch {}
	})(),
	Sl = ST;
var xd = Sl && Sl.isTypedArray,
	wT = xd ? md(xd) : dd,
	Ti = wT;
s();
function AT(t, e) {
	if (!(e === "constructor" && typeof t[e] == "function") && e != "__proto__")
		return t[e];
}
var bo = AT;
s();
s();
s();
var BT = Object.prototype,
	FT = BT.hasOwnProperty;
function LT(t, e, r) {
	var i = t[e];
	(!(FT.call(t, e) && Je(i, r)) || (r === void 0 && !(e in t))) && Ci(t, e, r);
}
var yd = LT;
function MT(t, e, r, i) {
	var o = !r;
	r || (r = {});
	for (var n = -1, a = e.length; ++n < a; ) {
		var l = e[n],
			c = i ? i(r[l], t[l], l, r, t) : void 0;
		c === void 0 && (c = t[l]), o ? Ci(r, l, c) : yd(r, l, c);
	}
	return r;
}
var _d = MT;
s();
s();
s();
function ET(t, e) {
	for (var r = -1, i = Array(t); ++r < t; ) i[r] = e(r);
	return i;
}
var Cd = ET;
s();
var OT = 9007199254740991,
	IT = /^(?:0|[1-9]\d*)$/;
function DT(t, e) {
	var r = typeof t;
	return (
		(e = e ?? OT),
		!!e &&
			(r == "number" || (r != "symbol" && IT.test(t))) &&
			t > -1 &&
			t % 1 == 0 &&
			t < e
	);
}
var Gn = DT;
var NT = Object.prototype,
	RT = NT.hasOwnProperty;
function PT(t, e) {
	var r = Er(t),
		i = !r && Mr(t),
		o = !r && !i && bi(t),
		n = !r && !i && !o && Ti(t),
		a = r || i || o || n,
		l = a ? Cd(t.length, String) : [],
		c = l.length;
	for (var u in t)
		(e || RT.call(t, u)) &&
			!(
				a &&
				(u == "length" ||
					(o && (u == "offset" || u == "parent")) ||
					(n && (u == "buffer" || u == "byteLength" || u == "byteOffset")) ||
					Gn(u, c))
			) &&
			l.push(u);
	return l;
}
var bd = PT;
s();
s();
function $T(t) {
	var e = [];
	if (t != null) for (var r in Object(t)) e.push(r);
	return e;
}
var Td = $T;
var zT = Object.prototype,
	qT = zT.hasOwnProperty;
function WT(t) {
	if (!Xt(t)) return Td(t);
	var e = or(t),
		r = [];
	for (var i in t) (i == "constructor" && (e || !qT.call(t, i))) || r.push(i);
	return r;
}
var vd = WT;
function UT(t) {
	return nr(t) ? bd(t, !0) : vd(t);
}
var Vn = UT;
function HT(t) {
	return _d(t, Vn(t));
}
var kd = HT;
function YT(t, e, r, i, o, n, a) {
	var l = bo(t, r),
		c = bo(e, r),
		u = a.get(c);
	if (u) {
		_o(t, r, u);
		return;
	}
	var p = n ? n(l, c, r + "", t, e, a) : void 0,
		d = p === void 0;
	if (d) {
		var h = Er(c),
			m = !h && bi(c),
			_ = !h && !m && Ti(c);
		(p = c),
			h || m || _
				? Er(l)
					? (p = l)
					: sd(l)
						? (p = rd(l))
						: m
							? ((d = !1), (p = Jp(c, !0)))
							: _
								? ((d = !1), (p = ed(c, !0)))
								: (p = [])
				: pd(c) || Mr(c)
					? ((p = l), Mr(l) ? (p = kd(l)) : (!Xt(l) || di(l)) && (p = nd(c)))
					: (d = !1);
	}
	d && (a.set(c, p), o(p, c, i, n, a), a.delete(c)), _o(t, r, p);
}
var Sd = YT;
function wd(t, e, r, i, o) {
	t !== e &&
		Vp(
			e,
			function (n, a) {
				if ((o || (o = new jp()), Xt(n))) Sd(t, e, a, r, wd, i, o);
				else {
					var l = i ? i(bo(t, a), n, a + "", t, e, o) : void 0;
					l === void 0 && (l = n), _o(t, a, l);
				}
			},
			Vn,
		);
}
var Ad = wd;
s();
s();
s();
function jT(t) {
	return t;
}
var Xn = jT;
s();
s();
function GT(t, e, r) {
	switch (r.length) {
		case 0:
			return t.call(e);
		case 1:
			return t.call(e, r[0]);
		case 2:
			return t.call(e, r[0], r[1]);
		case 3:
			return t.call(e, r[0], r[1], r[2]);
	}
	return t.apply(e, r);
}
var Bd = GT;
var Fd = Math.max;
function VT(t, e, r) {
	return (
		(e = Fd(e === void 0 ? t.length - 1 : e, 0)),
		function () {
			for (
				var i = arguments, o = -1, n = Fd(i.length - e, 0), a = Array(n);
				++o < n;
			)
				a[o] = i[e + o];
			o = -1;
			for (var l = Array(e + 1); ++o < e; ) l[o] = i[o];
			return (l[e] = r(a)), Bd(t, this, l);
		}
	);
}
var Ld = VT;
s();
s();
s();
function XT(t) {
	return function () {
		return t;
	};
}
var Md = XT;
var KT = _i
		? function (t, e) {
				return _i(t, "toString", {
					configurable: !0,
					enumerable: !1,
					value: Md(e),
					writable: !0,
				});
			}
		: Xn,
	Ed = KT;
s();
var ZT = 800,
	QT = 16,
	JT = Date.now;
function tv(t) {
	var e = 0,
		r = 0;
	return function () {
		var i = JT(),
			o = QT - (i - r);
		if (((r = i), o > 0)) {
			if (++e >= ZT) return arguments[0];
		} else e = 0;
		return t.apply(void 0, arguments);
	};
}
var Od = tv;
var ev = Od(Ed),
	Id = ev;
function rv(t, e) {
	return Id(Ld(t, e, Xn), t + "");
}
var Dd = rv;
s();
function iv(t, e, r) {
	if (!Xt(r)) return !1;
	var i = typeof e;
	return (i == "number" ? nr(r) && Gn(e, r.length) : i == "string" && e in r)
		? Je(r[e], t)
		: !1;
}
var Nd = iv;
function ov(t) {
	return Dd(function (e, r) {
		var i = -1,
			o = r.length,
			n = o > 1 ? r[o - 1] : void 0,
			a = o > 2 ? r[2] : void 0;
		for (
			n = t.length > 3 && typeof n == "function" ? (o--, n) : void 0,
				a && Nd(r[0], r[1], a) && ((n = o < 3 ? void 0 : n), (o = 1)),
				e = Object(e);
			++i < o;
		) {
			var l = r[i];
			l && t(e, l, i, n);
		}
		return e;
	});
}
var Rd = ov;
var nv = Rd(function (t, e, r) {
		Ad(t, e, r);
	}),
	Pd = nv;
s();
s();
s();
var av = Hn(Object.keys, Object),
	$d = av;
var sv = Object.prototype,
	lv = sv.hasOwnProperty;
function cv(t) {
	if (!or(t)) return $d(t);
	var e = [];
	for (var r in Object(t)) lv.call(t, r) && r != "constructor" && e.push(r);
	return e;
}
var zd = cv;
s();
s();
var uv = Kt(xt, "DataView"),
	Kn = uv;
s();
var hv = Kt(xt, "Promise"),
	Zn = hv;
s();
var fv = Kt(xt, "Set"),
	Qn = fv;
s();
var pv = Kt(xt, "WeakMap"),
	Jn = pv;
var qd = "[object Map]",
	dv = "[object Object]",
	Wd = "[object Promise]",
	Ud = "[object Set]",
	Hd = "[object WeakMap]",
	Yd = "[object DataView]",
	mv = Ne(Kn),
	gv = Ne(rr),
	xv = Ne(Zn),
	yv = Ne(Qn),
	_v = Ne(Jn),
	Or = ue;
((Kn && Or(new Kn(new ArrayBuffer(1))) != Yd) ||
	(rr && Or(new rr()) != qd) ||
	(Zn && Or(Zn.resolve()) != Wd) ||
	(Qn && Or(new Qn()) != Ud) ||
	(Jn && Or(new Jn()) != Hd)) &&
	(Or = function (t) {
		var e = ue(t),
			r = e == dv ? t.constructor : void 0,
			i = r ? Ne(r) : "";
		if (i)
			switch (i) {
				case mv:
					return Yd;
				case gv:
					return qd;
				case xv:
					return Wd;
				case yv:
					return Ud;
				case _v:
					return Hd;
			}
		return e;
	});
var jd = Or;
var Cv = "[object Map]",
	bv = "[object Set]",
	Tv = Object.prototype,
	vv = Tv.hasOwnProperty;
function kv(t) {
	if (t == null) return !0;
	if (
		nr(t) &&
		(Er(t) ||
			typeof t == "string" ||
			typeof t.splice == "function" ||
			bi(t) ||
			Ti(t) ||
			Mr(t))
	)
		return !t.length;
	var e = jd(t);
	if (e == Cv || e == bv) return !t.size;
	if (or(t)) return !zd(t).length;
	for (var r in t) if (vv.call(t, r)) return !1;
	return !0;
}
var ta = kv;
s();
var Lm = Ya(Ec(), 1),
	Mm = Ya(Ic(), 1);
var Pr = Ya(ap(), 1);
s();
var ea = "comm",
	ra = "rule",
	ia = "decl";
var Gd = "@import";
var Vd = "@keyframes";
var Xd = "@layer";
s();
var wl = Math.abs,
	To = String.fromCharCode;
function oa(t) {
	return t.trim();
}
function vo(t, e, r) {
	return t.replace(e, r);
}
function Kd(t, e, r) {
	return t.indexOf(e, r);
}
function Ir(t, e) {
	return t.charCodeAt(e) | 0;
}
function Dr(t, e, r) {
	return t.slice(e, r);
}
function re(t) {
	return t.length;
}
function Zd(t) {
	return t.length;
}
function vi(t, e) {
	return e.push(t), t;
}
s();
s();
var na = 1,
	ki = 1,
	Qd = 0,
	ie = 0,
	yt = 0,
	Si = "";
function aa(t, e, r, i, o, n, a, l) {
	return {
		value: t,
		root: e,
		parent: r,
		type: i,
		props: o,
		children: n,
		line: na,
		column: ki,
		length: a,
		return: "",
		siblings: l,
	};
}
function Jd() {
	return yt;
}
function tm() {
	return (
		(yt = ie > 0 ? Ir(Si, --ie) : 0), ki--, yt === 10 && ((ki = 1), na--), yt
	);
}
function oe() {
	return (
		(yt = ie < Qd ? Ir(Si, ie++) : 0), ki++, yt === 10 && ((ki = 1), na++), yt
	);
}
function ar() {
	return Ir(Si, ie);
}
function ko() {
	return ie;
}
function sa(t, e) {
	return Dr(Si, t, e);
}
function Al(t) {
	switch (t) {
		case 0:
		case 9:
		case 10:
		case 13:
		case 32:
			return 5;
		case 33:
		case 43:
		case 44:
		case 47:
		case 62:
		case 64:
		case 126:
		case 59:
		case 123:
		case 125:
			return 4;
		case 58:
			return 3;
		case 34:
		case 39:
		case 40:
		case 91:
			return 2;
		case 41:
		case 93:
			return 1;
	}
	return 0;
}
function em(t) {
	return (na = ki = 1), (Qd = re((Si = t))), (ie = 0), [];
}
function rm(t) {
	return (Si = ""), t;
}
function la(t) {
	return oa(sa(ie - 1, Bl(t === 91 ? t + 2 : t === 40 ? t + 1 : t)));
}
function im(t) {
	for (; (yt = ar()) && yt < 33; ) oe();
	return Al(t) > 2 || Al(yt) > 3 ? "" : " ";
}
function om(t, e) {
	for (
		;
		--e &&
		oe() &&
		!(yt < 48 || yt > 102 || (yt > 57 && yt < 65) || (yt > 70 && yt < 97));
	);
	return sa(t, ko() + (e < 6 && ar() == 32 && oe() == 32));
}
function Bl(t) {
	for (; oe(); )
		switch (yt) {
			case t:
				return ie;
			case 34:
			case 39:
				t !== 34 && t !== 39 && Bl(yt);
				break;
			case 40:
				t === 41 && Bl(t);
				break;
			case 92:
				oe();
				break;
		}
	return ie;
}
function nm(t, e) {
	for (; oe() && t + yt !== 57; ) if (t + yt === 84 && ar() === 47) break;
	return "/*" + sa(e, ie - 1) + "*" + To(t === 47 ? t : oe());
}
function am(t) {
	for (; !Al(ar()); ) oe();
	return sa(t, ie);
}
function cm(t) {
	return rm(ca("", null, null, null, [""], (t = em(t)), 0, [0], t));
}
function ca(t, e, r, i, o, n, a, l, c) {
	for (
		var u = 0,
			p = 0,
			d = a,
			h = 0,
			m = 0,
			_ = 0,
			b = 1,
			v = 1,
			F = 1,
			T = 0,
			O = "",
			A = o,
			R = n,
			k = i,
			D = O;
		v;
	)
		switch (((_ = T), (T = oe()))) {
			case 40:
				if (_ != 108 && Ir(D, d - 1) == 58) {
					Kd((D += vo(la(T), "&", "&\f")), "&\f", wl(u ? l[u - 1] : 0)) != -1 &&
						(F = -1);
					break;
				}
			case 34:
			case 39:
			case 91:
				D += la(T);
				break;
			case 9:
			case 10:
			case 13:
			case 32:
				D += im(_);
				break;
			case 92:
				D += om(ko() - 1, 7);
				continue;
			case 47:
				switch (ar()) {
					case 42:
					case 47:
						vi(Sv(nm(oe(), ko()), e, r, c), c);
						break;
					default:
						D += "/";
				}
				break;
			case 123 * b:
				l[u++] = re(D) * F;
			case 125 * b:
			case 59:
			case 0:
				switch (T) {
					case 0:
					case 125:
						v = 0;
					case 59 + p:
						F == -1 && (D = vo(D, /\f/g, "")),
							m > 0 &&
								re(D) - d &&
								vi(
									m > 32
										? lm(D + ";", i, r, d - 1, c)
										: lm(vo(D, " ", "") + ";", i, r, d - 2, c),
									c,
								);
						break;
					case 59:
						D += ";";
					default:
						if (
							(vi(
								(k = sm(D, e, r, u, p, o, l, O, (A = []), (R = []), d, n)),
								n,
							),
							T === 123)
						)
							if (p === 0) ca(D, e, k, k, A, n, d, l, R);
							else
								switch (h === 99 && Ir(D, 3) === 110 ? 100 : h) {
									case 100:
									case 108:
									case 109:
									case 115:
										ca(
											t,
											k,
											k,
											i && vi(sm(t, k, k, 0, 0, o, l, O, o, (A = []), d, R), R),
											o,
											R,
											d,
											l,
											i ? A : R,
										);
										break;
									default:
										ca(D, k, k, k, [""], R, 0, l, R);
								}
				}
				(u = p = m = 0), (b = F = 1), (O = D = ""), (d = a);
				break;
			case 58:
				(d = 1 + re(D)), (m = _);
			default:
				if (b < 1) {
					if (T == 123) --b;
					else if (T == 125 && b++ == 0 && tm() == 125) continue;
				}
				switch (((D += To(T)), T * b)) {
					case 38:
						F = p > 0 ? 1 : ((D += "\f"), -1);
						break;
					case 44:
						(l[u++] = (re(D) - 1) * F), (F = 1);
						break;
					case 64:
						ar() === 45 && (D += la(oe())),
							(h = ar()),
							(p = d = re((O = D += am(ko())))),
							T++;
						break;
					case 45:
						_ === 45 && re(D) == 2 && (b = 0);
				}
		}
	return n;
}
function sm(t, e, r, i, o, n, a, l, c, u, p, d) {
	for (
		var h = o - 1, m = o === 0 ? n : [""], _ = Zd(m), b = 0, v = 0, F = 0;
		b < i;
		++b
	)
		for (var T = 0, O = Dr(t, h + 1, (h = wl((v = a[b])))), A = t; T < _; ++T)
			(A = oa(v > 0 ? m[T] + " " + O : vo(O, /&\f/g, m[T]))) && (c[F++] = A);
	return aa(t, e, r, o === 0 ? ra : l, c, u, p, d);
}
function Sv(t, e, r, i) {
	return aa(t, e, r, ea, To(Jd()), Dr(t, 2, -2), 0, i);
}
function lm(t, e, r, i, o) {
	return aa(t, e, r, ia, Dr(t, 0, i), Dr(t, i + 1, -1), i, o);
}
s();
function ua(t, e) {
	for (var r = "", i = 0; i < t.length; i++) r += e(t[i], i, t, e) || "";
	return r;
}
function um(t, e, r, i) {
	switch (t.type) {
		case Xd:
			if (t.children.length) break;
		case Gd:
		case ia:
			return (t.return = t.return || t.value);
		case ea:
			return "";
		case Vd:
			return (t.return = t.value + "{" + ua(t.children, i) + "}");
		case ra:
			if (!re((t.value = t.props.join(",")))) return "";
	}
	return re((r = ua(t.children, i)))
		? (t.return = t.value + "{" + r + "}")
		: "";
}
var Pe = { trace: 0, debug: 1, info: 2, warn: 3, error: 4, fatal: 5 },
	X = {
		trace: (...t) => {},
		debug: (...t) => {},
		info: (...t) => {},
		warn: (...t) => {},
		error: (...t) => {},
		fatal: (...t) => {},
	},
	zl = function (t = "fatal") {
		let e = Pe.fatal;
		typeof t == "string"
			? ((t = t.toLowerCase()), t in Pe && (e = Pe[t]))
			: typeof t == "number" && (e = t),
			(X.trace = () => {}),
			(X.debug = () => {}),
			(X.info = () => {}),
			(X.warn = () => {}),
			(X.error = () => {}),
			(X.fatal = () => {}),
			e <= Pe.fatal &&
				(X.fatal = console.error
					? console.error.bind(console, ne("FATAL"), "color: orange")
					: console.log.bind(console, "\x1B[35m", ne("FATAL"))),
			e <= Pe.error &&
				(X.error = console.error
					? console.error.bind(console, ne("ERROR"), "color: orange")
					: console.log.bind(console, "\x1B[31m", ne("ERROR"))),
			e <= Pe.warn &&
				(X.warn = console.warn
					? console.warn.bind(console, ne("WARN"), "color: orange")
					: console.log.bind(console, "\x1B[33m", ne("WARN"))),
			e <= Pe.info &&
				(X.info = console.info
					? console.info.bind(console, ne("INFO"), "color: lightblue")
					: console.log.bind(console, "\x1B[34m", ne("INFO"))),
			e <= Pe.debug &&
				(X.debug = console.debug
					? console.debug.bind(console, ne("DEBUG"), "color: lightgreen")
					: console.log.bind(console, "\x1B[32m", ne("DEBUG"))),
			e <= Pe.trace &&
				(X.trace = console.debug
					? console.debug.bind(console, ne("TRACE"), "color: lightgreen")
					: console.log.bind(console, "\x1B[32m", ne("TRACE")));
	},
	ne = (t) => `%c${(0, Lm.default)().format("ss.SSS")} : ${t} : `,
	Lo = /<br\s*\/?>/gi,
	wv = (t) => (t ? Om(t).replace(/\\n/g, "#br#").split("#br#") : [""]),
	Av = (() => {
		let t = !1;
		return () => {
			t || (Bv(), (t = !0));
		};
	})();
function Bv() {
	let t = "data-temp-href-target";
	Pr.default.addHook("beforeSanitizeAttributes", (e) => {
		e.tagName === "A" &&
			e.hasAttribute("target") &&
			e.setAttribute(t, e.getAttribute("target") || "");
	}),
		Pr.default.addHook("afterSanitizeAttributes", (e) => {
			e.tagName === "A" &&
				e.hasAttribute(t) &&
				(e.setAttribute("target", e.getAttribute(t) || ""),
				e.removeAttribute(t),
				e.getAttribute("target") === "_blank" &&
					e.setAttribute("rel", "noopener"));
		});
}
var Em = (t) => (Av(), Pr.default.sanitize(t)),
	hm = (t, e) => {
		var r;
		if (((r = e.flowchart) == null ? void 0 : r.htmlLabels) !== !1) {
			let i = e.securityLevel;
			i === "antiscript" || i === "strict"
				? (t = Em(t))
				: i !== "loose" &&
					((t = Om(t)),
					(t = t.replace(/</g, "&lt;").replace(/>/g, "&gt;")),
					(t = t.replace(/=/g, "&equals;")),
					(t = Ev(t)));
		}
		return t;
	},
	Bo = (t, e) =>
		t &&
		(e.dompurifyConfig
			? (t = Pr.default.sanitize(hm(t, e), e.dompurifyConfig).toString())
			: (t = Pr.default
					.sanitize(hm(t, e), { FORBID_TAGS: ["style"] })
					.toString()),
		t),
	Fv = (t, e) =>
		typeof t == "string" ? Bo(t, e) : t.flat().map((r) => Bo(r, e)),
	Lv = (t) => Lo.test(t),
	Mv = (t) => t.split(Lo),
	Ev = (t) => t.replace(/#br#/g, "<br/>"),
	Om = (t) => t.replace(Lo, "#br#"),
	Ov = (t) => {
		let e = "";
		return (
			t &&
				((e =
					window.location.protocol +
					"//" +
					window.location.host +
					window.location.pathname +
					window.location.search),
				(e = e.replaceAll(/\(/g, "\\(")),
				(e = e.replaceAll(/\)/g, "\\)"))),
			e
		);
	},
	Im = (t) =>
		!(
			t === !1 ||
			["false", "null", "0"].includes(String(t).trim().toLowerCase())
		),
	Iv = function (...t) {
		let e = t.filter((r) => !isNaN(r));
		return Math.max(...e);
	},
	Dv = function (...t) {
		let e = t.filter((r) => !isNaN(r));
		return Math.min(...e);
	},
	UY = function (t) {
		let e = t.split(/(,)/),
			r = [];
		for (let i = 0; i < e.length; i++) {
			let o = e[i];
			if (o === "," && i > 0 && i + 1 < e.length) {
				let n = e[i - 1],
					a = e[i + 1];
				Nv(n, a) && ((o = n + "," + a), i++, r.pop());
			}
			r.push(Rv(o));
		}
		return r.join("");
	},
	Ol = (t, e) => Math.max(0, t.split(e).length - 1),
	Nv = (t, e) => {
		let r = Ol(t, "~"),
			i = Ol(e, "~");
		return r === 1 && i === 1;
	},
	Rv = (t) => {
		let e = Ol(t, "~"),
			r = !1;
		if (e <= 1) return t;
		e % 2 !== 0 && t.startsWith("~") && ((t = t.substring(1)), (r = !0));
		let i = [...t],
			o = i.indexOf("~"),
			n = i.lastIndexOf("~");
		for (; o !== -1 && n !== -1 && o !== n; )
			(i[o] = "<"),
				(i[n] = ">"),
				(o = i.indexOf("~")),
				(n = i.lastIndexOf("~"));
		return r && i.unshift("~"), i.join("");
	},
	fm = () => window.MathMLElement !== void 0,
	Il = /\$\$(.*)\$\$/g,
	pm = (t) => {
		var e;
		return (((e = t.match(Il)) == null ? void 0 : e.length) ?? 0) > 0;
	},
	HY = async (t, e) => {
		t = await Pv(t, e);
		let r = document.createElement("div");
		(r.innerHTML = t),
			(r.id = "katex-temp"),
			(r.style.visibility = "hidden"),
			(r.style.position = "absolute"),
			(r.style.top = "0");
		let i = document.querySelector("body");
		i?.insertAdjacentElement("beforeend", r);
		let o = { width: r.clientWidth, height: r.clientHeight };
		return r.remove(), o;
	},
	Pv = async (t, e) => {
		if (!pm(t)) return t;
		if (!fm() && !e.legacyMathML)
			return t.replace(Il, "MathML is unsupported in this environment.");
		let { default: r } = await import("./katex-TOPNKHH3.js");
		return t
			.split(Lo)
			.map((i) =>
				pm(i)
					? `
            <div style="display: flex; align-items: center; justify-content: center; white-space: nowrap;">
              ${i}
            </div>
          `
					: `<div>${i}</div>`,
			)
			.join("")
			.replace(Il, (i, o) =>
				r
					.renderToString(o, {
						throwOnError: !0,
						displayMode: !0,
						output: fm() ? "mathml" : "htmlAndMathml",
					})
					.replace(/\n/g, " ")
					.replace(/<annotation.*<\/annotation>/g, ""),
			);
	},
	ql = {
		getRows: wv,
		sanitizeText: Bo,
		sanitizeTextOrArray: Fv,
		hasBreaks: Lv,
		splitBreaks: Mv,
		lineBreakRegex: Lo,
		removeScript: Em,
		getUrl: Ov,
		evaluate: Im,
		getMax: Iv,
		getMin: Dv,
	},
	Yt = (t, e) => (e ? x(t, { s: -40, l: 10 }) : x(t, { s: -40, l: -10 })),
	ka = "#ffffff",
	Sa = "#f2f2f2",
	$v = class {
		constructor() {
			(this.background = "#f4f4f4"),
				(this.primaryColor = "#fff4dd"),
				(this.noteBkgColor = "#fff5ad"),
				(this.noteTextColor = "#333"),
				(this.THEME_COLOR_LIMIT = 12),
				(this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif'),
				(this.fontSize = "16px");
		}
		updateColors() {
			var e, r, i, o, n, a, l, c, u, p, d;
			if (
				((this.primaryTextColor =
					this.primaryTextColor || (this.darkMode ? "#eee" : "#333")),
				(this.secondaryColor =
					this.secondaryColor || x(this.primaryColor, { h: -120 })),
				(this.tertiaryColor =
					this.tertiaryColor || x(this.primaryColor, { h: 180, l: 5 })),
				(this.primaryBorderColor =
					this.primaryBorderColor || Yt(this.primaryColor, this.darkMode)),
				(this.secondaryBorderColor =
					this.secondaryBorderColor || Yt(this.secondaryColor, this.darkMode)),
				(this.tertiaryBorderColor =
					this.tertiaryBorderColor || Yt(this.tertiaryColor, this.darkMode)),
				(this.noteBorderColor =
					this.noteBorderColor || Yt(this.noteBkgColor, this.darkMode)),
				(this.noteBkgColor = this.noteBkgColor || "#fff5ad"),
				(this.noteTextColor = this.noteTextColor || "#333"),
				(this.secondaryTextColor =
					this.secondaryTextColor || E(this.secondaryColor)),
				(this.tertiaryTextColor =
					this.tertiaryTextColor || E(this.tertiaryColor)),
				(this.lineColor = this.lineColor || E(this.background)),
				(this.arrowheadColor = this.arrowheadColor || E(this.background)),
				(this.textColor = this.textColor || this.primaryTextColor),
				(this.border2 = this.border2 || this.tertiaryBorderColor),
				(this.nodeBkg = this.nodeBkg || this.primaryColor),
				(this.mainBkg = this.mainBkg || this.primaryColor),
				(this.nodeBorder = this.nodeBorder || this.primaryBorderColor),
				(this.clusterBkg = this.clusterBkg || this.tertiaryColor),
				(this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor),
				(this.defaultLinkColor = this.defaultLinkColor || this.lineColor),
				(this.titleColor = this.titleColor || this.tertiaryTextColor),
				(this.edgeLabelBackground =
					this.edgeLabelBackground ||
					(this.darkMode ? V(this.secondaryColor, 30) : this.secondaryColor)),
				(this.nodeTextColor = this.nodeTextColor || this.primaryTextColor),
				(this.actorBorder = this.actorBorder || this.primaryBorderColor),
				(this.actorBkg = this.actorBkg || this.mainBkg),
				(this.actorTextColor = this.actorTextColor || this.primaryTextColor),
				(this.actorLineColor = this.actorLineColor || "grey"),
				(this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg),
				(this.signalColor = this.signalColor || this.textColor),
				(this.signalTextColor = this.signalTextColor || this.textColor),
				(this.labelBoxBorderColor =
					this.labelBoxBorderColor || this.actorBorder),
				(this.labelTextColor = this.labelTextColor || this.actorTextColor),
				(this.loopTextColor = this.loopTextColor || this.actorTextColor),
				(this.activationBorderColor =
					this.activationBorderColor || V(this.secondaryColor, 10)),
				(this.activationBkgColor =
					this.activationBkgColor || this.secondaryColor),
				(this.sequenceNumberColor =
					this.sequenceNumberColor || E(this.lineColor)),
				(this.sectionBkgColor = this.sectionBkgColor || this.tertiaryColor),
				(this.altSectionBkgColor = this.altSectionBkgColor || "white"),
				(this.sectionBkgColor = this.sectionBkgColor || this.secondaryColor),
				(this.sectionBkgColor2 = this.sectionBkgColor2 || this.primaryColor),
				(this.excludeBkgColor = this.excludeBkgColor || "#eeeeee"),
				(this.taskBorderColor =
					this.taskBorderColor || this.primaryBorderColor),
				(this.taskBkgColor = this.taskBkgColor || this.primaryColor),
				(this.activeTaskBorderColor =
					this.activeTaskBorderColor || this.primaryColor),
				(this.activeTaskBkgColor =
					this.activeTaskBkgColor || W(this.primaryColor, 23)),
				(this.gridColor = this.gridColor || "lightgrey"),
				(this.doneTaskBkgColor = this.doneTaskBkgColor || "lightgrey"),
				(this.doneTaskBorderColor = this.doneTaskBorderColor || "grey"),
				(this.critBorderColor = this.critBorderColor || "#ff8888"),
				(this.critBkgColor = this.critBkgColor || "red"),
				(this.todayLineColor = this.todayLineColor || "red"),
				(this.taskTextColor = this.taskTextColor || this.textColor),
				(this.taskTextOutsideColor =
					this.taskTextOutsideColor || this.textColor),
				(this.taskTextLightColor = this.taskTextLightColor || this.textColor),
				(this.taskTextColor = this.taskTextColor || this.primaryTextColor),
				(this.taskTextDarkColor = this.taskTextDarkColor || this.textColor),
				(this.taskTextClickableColor =
					this.taskTextClickableColor || "#003163"),
				(this.personBorder = this.personBorder || this.primaryBorderColor),
				(this.personBkg = this.personBkg || this.mainBkg),
				(this.transitionColor = this.transitionColor || this.lineColor),
				(this.transitionLabelColor =
					this.transitionLabelColor || this.textColor),
				(this.stateLabelColor =
					this.stateLabelColor || this.stateBkg || this.primaryTextColor),
				(this.stateBkg = this.stateBkg || this.mainBkg),
				(this.labelBackgroundColor =
					this.labelBackgroundColor || this.stateBkg),
				(this.compositeBackground =
					this.compositeBackground || this.background || this.tertiaryColor),
				(this.altBackground = this.altBackground || this.tertiaryColor),
				(this.compositeTitleBackground =
					this.compositeTitleBackground || this.mainBkg),
				(this.compositeBorder = this.compositeBorder || this.nodeBorder),
				(this.innerEndBackground = this.nodeBorder),
				(this.errorBkgColor = this.errorBkgColor || this.tertiaryColor),
				(this.errorTextColor = this.errorTextColor || this.tertiaryTextColor),
				(this.transitionColor = this.transitionColor || this.lineColor),
				(this.specialStateColor = this.lineColor),
				(this.cScale0 = this.cScale0 || this.primaryColor),
				(this.cScale1 = this.cScale1 || this.secondaryColor),
				(this.cScale2 = this.cScale2 || this.tertiaryColor),
				(this.cScale3 = this.cScale3 || x(this.primaryColor, { h: 30 })),
				(this.cScale4 = this.cScale4 || x(this.primaryColor, { h: 60 })),
				(this.cScale5 = this.cScale5 || x(this.primaryColor, { h: 90 })),
				(this.cScale6 = this.cScale6 || x(this.primaryColor, { h: 120 })),
				(this.cScale7 = this.cScale7 || x(this.primaryColor, { h: 150 })),
				(this.cScale8 =
					this.cScale8 || x(this.primaryColor, { h: 210, l: 150 })),
				(this.cScale9 = this.cScale9 || x(this.primaryColor, { h: 270 })),
				(this.cScale10 = this.cScale10 || x(this.primaryColor, { h: 300 })),
				(this.cScale11 = this.cScale11 || x(this.primaryColor, { h: 330 })),
				this.darkMode)
			)
				for (let m = 0; m < this.THEME_COLOR_LIMIT; m++)
					this["cScale" + m] = V(this["cScale" + m], 75);
			else
				for (let m = 0; m < this.THEME_COLOR_LIMIT; m++)
					this["cScale" + m] = V(this["cScale" + m], 25);
			for (let m = 0; m < this.THEME_COLOR_LIMIT; m++)
				this["cScaleInv" + m] = this["cScaleInv" + m] || E(this["cScale" + m]);
			for (let m = 0; m < this.THEME_COLOR_LIMIT; m++)
				this.darkMode
					? (this["cScalePeer" + m] =
							this["cScalePeer" + m] || W(this["cScale" + m], 10))
					: (this["cScalePeer" + m] =
							this["cScalePeer" + m] || V(this["cScale" + m], 10));
			this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
			for (let m = 0; m < this.THEME_COLOR_LIMIT; m++)
				this["cScaleLabel" + m] =
					this["cScaleLabel" + m] || this.scaleLabelColor;
			let h = this.darkMode ? -4 : -1;
			for (let m = 0; m < 5; m++)
				(this["surface" + m] =
					this["surface" + m] ||
					x(this.mainBkg, { h: 180, s: -15, l: h * (5 + m * 3) })),
					(this["surfacePeer" + m] =
						this["surfacePeer" + m] ||
						x(this.mainBkg, { h: 180, s: -15, l: h * (8 + m * 3) }));
			(this.classText = this.classText || this.textColor),
				(this.fillType0 = this.fillType0 || this.primaryColor),
				(this.fillType1 = this.fillType1 || this.secondaryColor),
				(this.fillType2 = this.fillType2 || x(this.primaryColor, { h: 64 })),
				(this.fillType3 = this.fillType3 || x(this.secondaryColor, { h: 64 })),
				(this.fillType4 = this.fillType4 || x(this.primaryColor, { h: -64 })),
				(this.fillType5 = this.fillType5 || x(this.secondaryColor, { h: -64 })),
				(this.fillType6 = this.fillType6 || x(this.primaryColor, { h: 128 })),
				(this.fillType7 = this.fillType7 || x(this.secondaryColor, { h: 128 })),
				(this.pie1 = this.pie1 || this.primaryColor),
				(this.pie2 = this.pie2 || this.secondaryColor),
				(this.pie3 = this.pie3 || this.tertiaryColor),
				(this.pie4 = this.pie4 || x(this.primaryColor, { l: -10 })),
				(this.pie5 = this.pie5 || x(this.secondaryColor, { l: -10 })),
				(this.pie6 = this.pie6 || x(this.tertiaryColor, { l: -10 })),
				(this.pie7 = this.pie7 || x(this.primaryColor, { h: 60, l: -10 })),
				(this.pie8 = this.pie8 || x(this.primaryColor, { h: -60, l: -10 })),
				(this.pie9 = this.pie9 || x(this.primaryColor, { h: 120, l: 0 })),
				(this.pie10 = this.pie10 || x(this.primaryColor, { h: 60, l: -20 })),
				(this.pie11 = this.pie11 || x(this.primaryColor, { h: -60, l: -20 })),
				(this.pie12 = this.pie12 || x(this.primaryColor, { h: 120, l: -10 })),
				(this.pieTitleTextSize = this.pieTitleTextSize || "25px"),
				(this.pieTitleTextColor =
					this.pieTitleTextColor || this.taskTextDarkColor),
				(this.pieSectionTextSize = this.pieSectionTextSize || "17px"),
				(this.pieSectionTextColor = this.pieSectionTextColor || this.textColor),
				(this.pieLegendTextSize = this.pieLegendTextSize || "17px"),
				(this.pieLegendTextColor =
					this.pieLegendTextColor || this.taskTextDarkColor),
				(this.pieStrokeColor = this.pieStrokeColor || "black"),
				(this.pieStrokeWidth = this.pieStrokeWidth || "2px"),
				(this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px"),
				(this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black"),
				(this.pieOpacity = this.pieOpacity || "0.7"),
				(this.quadrant1Fill = this.quadrant1Fill || this.primaryColor),
				(this.quadrant2Fill =
					this.quadrant2Fill || x(this.primaryColor, { r: 5, g: 5, b: 5 })),
				(this.quadrant3Fill =
					this.quadrant3Fill || x(this.primaryColor, { r: 10, g: 10, b: 10 })),
				(this.quadrant4Fill =
					this.quadrant4Fill || x(this.primaryColor, { r: 15, g: 15, b: 15 })),
				(this.quadrant1TextFill =
					this.quadrant1TextFill || this.primaryTextColor),
				(this.quadrant2TextFill =
					this.quadrant2TextFill ||
					x(this.primaryTextColor, { r: -5, g: -5, b: -5 })),
				(this.quadrant3TextFill =
					this.quadrant3TextFill ||
					x(this.primaryTextColor, { r: -10, g: -10, b: -10 })),
				(this.quadrant4TextFill =
					this.quadrant4TextFill ||
					x(this.primaryTextColor, { r: -15, g: -15, b: -15 })),
				(this.quadrantPointFill =
					this.quadrantPointFill || Lr(this.quadrant1Fill)
						? W(this.quadrant1Fill)
						: V(this.quadrant1Fill)),
				(this.quadrantPointTextFill =
					this.quadrantPointTextFill || this.primaryTextColor),
				(this.quadrantXAxisTextFill =
					this.quadrantXAxisTextFill || this.primaryTextColor),
				(this.quadrantYAxisTextFill =
					this.quadrantYAxisTextFill || this.primaryTextColor),
				(this.quadrantInternalBorderStrokeFill =
					this.quadrantInternalBorderStrokeFill || this.primaryBorderColor),
				(this.quadrantExternalBorderStrokeFill =
					this.quadrantExternalBorderStrokeFill || this.primaryBorderColor),
				(this.quadrantTitleFill =
					this.quadrantTitleFill || this.primaryTextColor),
				(this.xyChart = {
					backgroundColor:
						((e = this.xyChart) == null ? void 0 : e.backgroundColor) ||
						this.background,
					titleColor:
						((r = this.xyChart) == null ? void 0 : r.titleColor) ||
						this.primaryTextColor,
					xAxisTitleColor:
						((i = this.xyChart) == null ? void 0 : i.xAxisTitleColor) ||
						this.primaryTextColor,
					xAxisLabelColor:
						((o = this.xyChart) == null ? void 0 : o.xAxisLabelColor) ||
						this.primaryTextColor,
					xAxisTickColor:
						((n = this.xyChart) == null ? void 0 : n.xAxisTickColor) ||
						this.primaryTextColor,
					xAxisLineColor:
						((a = this.xyChart) == null ? void 0 : a.xAxisLineColor) ||
						this.primaryTextColor,
					yAxisTitleColor:
						((l = this.xyChart) == null ? void 0 : l.yAxisTitleColor) ||
						this.primaryTextColor,
					yAxisLabelColor:
						((c = this.xyChart) == null ? void 0 : c.yAxisLabelColor) ||
						this.primaryTextColor,
					yAxisTickColor:
						((u = this.xyChart) == null ? void 0 : u.yAxisTickColor) ||
						this.primaryTextColor,
					yAxisLineColor:
						((p = this.xyChart) == null ? void 0 : p.yAxisLineColor) ||
						this.primaryTextColor,
					plotColorPalette:
						((d = this.xyChart) == null ? void 0 : d.plotColorPalette) ||
						"#FFF4DD,#FFD8B1,#FFA07A,#ECEFF1,#D6DBDF,#C3E0A8,#FFB6A4,#FFD74D,#738FA7,#FFFFF0",
				}),
				(this.requirementBackground =
					this.requirementBackground || this.primaryColor),
				(this.requirementBorderColor =
					this.requirementBorderColor || this.primaryBorderColor),
				(this.requirementBorderSize = this.requirementBorderSize || "1"),
				(this.requirementTextColor =
					this.requirementTextColor || this.primaryTextColor),
				(this.relationColor = this.relationColor || this.lineColor),
				(this.relationLabelBackground =
					this.relationLabelBackground ||
					(this.darkMode ? V(this.secondaryColor, 30) : this.secondaryColor)),
				(this.relationLabelColor =
					this.relationLabelColor || this.actorTextColor),
				(this.git0 = this.git0 || this.primaryColor),
				(this.git1 = this.git1 || this.secondaryColor),
				(this.git2 = this.git2 || this.tertiaryColor),
				(this.git3 = this.git3 || x(this.primaryColor, { h: -30 })),
				(this.git4 = this.git4 || x(this.primaryColor, { h: -60 })),
				(this.git5 = this.git5 || x(this.primaryColor, { h: -90 })),
				(this.git6 = this.git6 || x(this.primaryColor, { h: 60 })),
				(this.git7 = this.git7 || x(this.primaryColor, { h: 120 })),
				this.darkMode
					? ((this.git0 = W(this.git0, 25)),
						(this.git1 = W(this.git1, 25)),
						(this.git2 = W(this.git2, 25)),
						(this.git3 = W(this.git3, 25)),
						(this.git4 = W(this.git4, 25)),
						(this.git5 = W(this.git5, 25)),
						(this.git6 = W(this.git6, 25)),
						(this.git7 = W(this.git7, 25)))
					: ((this.git0 = V(this.git0, 25)),
						(this.git1 = V(this.git1, 25)),
						(this.git2 = V(this.git2, 25)),
						(this.git3 = V(this.git3, 25)),
						(this.git4 = V(this.git4, 25)),
						(this.git5 = V(this.git5, 25)),
						(this.git6 = V(this.git6, 25)),
						(this.git7 = V(this.git7, 25))),
				(this.gitInv0 = this.gitInv0 || E(this.git0)),
				(this.gitInv1 = this.gitInv1 || E(this.git1)),
				(this.gitInv2 = this.gitInv2 || E(this.git2)),
				(this.gitInv3 = this.gitInv3 || E(this.git3)),
				(this.gitInv4 = this.gitInv4 || E(this.git4)),
				(this.gitInv5 = this.gitInv5 || E(this.git5)),
				(this.gitInv6 = this.gitInv6 || E(this.git6)),
				(this.gitInv7 = this.gitInv7 || E(this.git7)),
				(this.branchLabelColor =
					this.branchLabelColor ||
					(this.darkMode ? "black" : this.labelTextColor)),
				(this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor),
				(this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor),
				(this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor),
				(this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor),
				(this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor),
				(this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor),
				(this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor),
				(this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor),
				(this.tagLabelColor = this.tagLabelColor || this.primaryTextColor),
				(this.tagLabelBackground =
					this.tagLabelBackground || this.primaryColor),
				(this.tagLabelBorder = this.tagBorder || this.primaryBorderColor),
				(this.tagLabelFontSize = this.tagLabelFontSize || "10px"),
				(this.commitLabelColor =
					this.commitLabelColor || this.secondaryTextColor),
				(this.commitLabelBackground =
					this.commitLabelBackground || this.secondaryColor),
				(this.commitLabelFontSize = this.commitLabelFontSize || "10px"),
				(this.attributeBackgroundColorOdd =
					this.attributeBackgroundColorOdd || ka),
				(this.attributeBackgroundColorEven =
					this.attributeBackgroundColorEven || Sa);
		}
		calculate(e) {
			if (typeof e != "object") {
				this.updateColors();
				return;
			}
			let r = Object.keys(e);
			r.forEach((i) => {
				this[i] = e[i];
			}),
				this.updateColors(),
				r.forEach((i) => {
					this[i] = e[i];
				});
		}
	},
	zv = (t) => {
		let e = new $v();
		return e.calculate(t), e;
	},
	qv = class {
		constructor() {
			(this.background = "#333"),
				(this.primaryColor = "#1f2020"),
				(this.secondaryColor = W(this.primaryColor, 16)),
				(this.tertiaryColor = x(this.primaryColor, { h: -160 })),
				(this.primaryBorderColor = E(this.background)),
				(this.secondaryBorderColor = Yt(this.secondaryColor, this.darkMode)),
				(this.tertiaryBorderColor = Yt(this.tertiaryColor, this.darkMode)),
				(this.primaryTextColor = E(this.primaryColor)),
				(this.secondaryTextColor = E(this.secondaryColor)),
				(this.tertiaryTextColor = E(this.tertiaryColor)),
				(this.lineColor = E(this.background)),
				(this.textColor = E(this.background)),
				(this.mainBkg = "#1f2020"),
				(this.secondBkg = "calculated"),
				(this.mainContrastColor = "lightgrey"),
				(this.darkTextColor = W(E("#323D47"), 10)),
				(this.lineColor = "calculated"),
				(this.border1 = "#81B1DB"),
				(this.border2 = Qe(255, 255, 255, 0.25)),
				(this.arrowheadColor = "calculated"),
				(this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif'),
				(this.fontSize = "16px"),
				(this.labelBackground = "#181818"),
				(this.textColor = "#ccc"),
				(this.THEME_COLOR_LIMIT = 12),
				(this.nodeBkg = "calculated"),
				(this.nodeBorder = "calculated"),
				(this.clusterBkg = "calculated"),
				(this.clusterBorder = "calculated"),
				(this.defaultLinkColor = "calculated"),
				(this.titleColor = "#F9FFFE"),
				(this.edgeLabelBackground = "calculated"),
				(this.actorBorder = "calculated"),
				(this.actorBkg = "calculated"),
				(this.actorTextColor = "calculated"),
				(this.actorLineColor = "calculated"),
				(this.signalColor = "calculated"),
				(this.signalTextColor = "calculated"),
				(this.labelBoxBkgColor = "calculated"),
				(this.labelBoxBorderColor = "calculated"),
				(this.labelTextColor = "calculated"),
				(this.loopTextColor = "calculated"),
				(this.noteBorderColor = "calculated"),
				(this.noteBkgColor = "#fff5ad"),
				(this.noteTextColor = "calculated"),
				(this.activationBorderColor = "calculated"),
				(this.activationBkgColor = "calculated"),
				(this.sequenceNumberColor = "black"),
				(this.sectionBkgColor = V("#EAE8D9", 30)),
				(this.altSectionBkgColor = "calculated"),
				(this.sectionBkgColor2 = "#EAE8D9"),
				(this.excludeBkgColor = V(this.sectionBkgColor, 10)),
				(this.taskBorderColor = Qe(255, 255, 255, 70)),
				(this.taskBkgColor = "calculated"),
				(this.taskTextColor = "calculated"),
				(this.taskTextLightColor = "calculated"),
				(this.taskTextOutsideColor = "calculated"),
				(this.taskTextClickableColor = "#003163"),
				(this.activeTaskBorderColor = Qe(255, 255, 255, 50)),
				(this.activeTaskBkgColor = "#81B1DB"),
				(this.gridColor = "calculated"),
				(this.doneTaskBkgColor = "calculated"),
				(this.doneTaskBorderColor = "grey"),
				(this.critBorderColor = "#E83737"),
				(this.critBkgColor = "#E83737"),
				(this.taskTextDarkColor = "calculated"),
				(this.todayLineColor = "#DB5757"),
				(this.personBorder = this.primaryBorderColor),
				(this.personBkg = this.mainBkg),
				(this.labelColor = "calculated"),
				(this.errorBkgColor = "#a44141"),
				(this.errorTextColor = "#ddd");
		}
		updateColors() {
			var e, r, i, o, n, a, l, c, u, p, d;
			(this.secondBkg = W(this.mainBkg, 16)),
				(this.lineColor = this.mainContrastColor),
				(this.arrowheadColor = this.mainContrastColor),
				(this.nodeBkg = this.mainBkg),
				(this.nodeBorder = this.border1),
				(this.clusterBkg = this.secondBkg),
				(this.clusterBorder = this.border2),
				(this.defaultLinkColor = this.lineColor),
				(this.edgeLabelBackground = W(this.labelBackground, 25)),
				(this.actorBorder = this.border1),
				(this.actorBkg = this.mainBkg),
				(this.actorTextColor = this.mainContrastColor),
				(this.actorLineColor = this.mainContrastColor),
				(this.signalColor = this.mainContrastColor),
				(this.signalTextColor = this.mainContrastColor),
				(this.labelBoxBkgColor = this.actorBkg),
				(this.labelBoxBorderColor = this.actorBorder),
				(this.labelTextColor = this.mainContrastColor),
				(this.loopTextColor = this.mainContrastColor),
				(this.noteBorderColor = this.secondaryBorderColor),
				(this.noteBkgColor = this.secondBkg),
				(this.noteTextColor = this.secondaryTextColor),
				(this.activationBorderColor = this.border1),
				(this.activationBkgColor = this.secondBkg),
				(this.altSectionBkgColor = this.background),
				(this.taskBkgColor = W(this.mainBkg, 23)),
				(this.taskTextColor = this.darkTextColor),
				(this.taskTextLightColor = this.mainContrastColor),
				(this.taskTextOutsideColor = this.taskTextLightColor),
				(this.gridColor = this.mainContrastColor),
				(this.doneTaskBkgColor = this.mainContrastColor),
				(this.taskTextDarkColor = this.darkTextColor),
				(this.transitionColor = this.transitionColor || this.lineColor),
				(this.transitionLabelColor =
					this.transitionLabelColor || this.textColor),
				(this.stateLabelColor =
					this.stateLabelColor || this.stateBkg || this.primaryTextColor),
				(this.stateBkg = this.stateBkg || this.mainBkg),
				(this.labelBackgroundColor =
					this.labelBackgroundColor || this.stateBkg),
				(this.compositeBackground =
					this.compositeBackground || this.background || this.tertiaryColor),
				(this.altBackground = this.altBackground || "#555"),
				(this.compositeTitleBackground =
					this.compositeTitleBackground || this.mainBkg),
				(this.compositeBorder = this.compositeBorder || this.nodeBorder),
				(this.innerEndBackground = this.primaryBorderColor),
				(this.specialStateColor = "#f4f4f4"),
				(this.errorBkgColor = this.errorBkgColor || this.tertiaryColor),
				(this.errorTextColor = this.errorTextColor || this.tertiaryTextColor),
				(this.fillType0 = this.primaryColor),
				(this.fillType1 = this.secondaryColor),
				(this.fillType2 = x(this.primaryColor, { h: 64 })),
				(this.fillType3 = x(this.secondaryColor, { h: 64 })),
				(this.fillType4 = x(this.primaryColor, { h: -64 })),
				(this.fillType5 = x(this.secondaryColor, { h: -64 })),
				(this.fillType6 = x(this.primaryColor, { h: 128 })),
				(this.fillType7 = x(this.secondaryColor, { h: 128 })),
				(this.cScale1 = this.cScale1 || "#0b0000"),
				(this.cScale2 = this.cScale2 || "#4d1037"),
				(this.cScale3 = this.cScale3 || "#3f5258"),
				(this.cScale4 = this.cScale4 || "#4f2f1b"),
				(this.cScale5 = this.cScale5 || "#6e0a0a"),
				(this.cScale6 = this.cScale6 || "#3b0048"),
				(this.cScale7 = this.cScale7 || "#995a01"),
				(this.cScale8 = this.cScale8 || "#154706"),
				(this.cScale9 = this.cScale9 || "#161722"),
				(this.cScale10 = this.cScale10 || "#00296f"),
				(this.cScale11 = this.cScale11 || "#01629c"),
				(this.cScale12 = this.cScale12 || "#010029"),
				(this.cScale0 = this.cScale0 || this.primaryColor),
				(this.cScale1 = this.cScale1 || this.secondaryColor),
				(this.cScale2 = this.cScale2 || this.tertiaryColor),
				(this.cScale3 = this.cScale3 || x(this.primaryColor, { h: 30 })),
				(this.cScale4 = this.cScale4 || x(this.primaryColor, { h: 60 })),
				(this.cScale5 = this.cScale5 || x(this.primaryColor, { h: 90 })),
				(this.cScale6 = this.cScale6 || x(this.primaryColor, { h: 120 })),
				(this.cScale7 = this.cScale7 || x(this.primaryColor, { h: 150 })),
				(this.cScale8 = this.cScale8 || x(this.primaryColor, { h: 210 })),
				(this.cScale9 = this.cScale9 || x(this.primaryColor, { h: 270 })),
				(this.cScale10 = this.cScale10 || x(this.primaryColor, { h: 300 })),
				(this.cScale11 = this.cScale11 || x(this.primaryColor, { h: 330 }));
			for (let h = 0; h < this.THEME_COLOR_LIMIT; h++)
				this["cScaleInv" + h] = this["cScaleInv" + h] || E(this["cScale" + h]);
			for (let h = 0; h < this.THEME_COLOR_LIMIT; h++)
				this["cScalePeer" + h] =
					this["cScalePeer" + h] || W(this["cScale" + h], 10);
			for (let h = 0; h < 5; h++)
				(this["surface" + h] =
					this["surface" + h] ||
					x(this.mainBkg, { h: 30, s: -30, l: -(-10 + h * 4) })),
					(this["surfacePeer" + h] =
						this["surfacePeer" + h] ||
						x(this.mainBkg, { h: 30, s: -30, l: -(-7 + h * 4) }));
			this.scaleLabelColor =
				this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor);
			for (let h = 0; h < this.THEME_COLOR_LIMIT; h++)
				this["cScaleLabel" + h] =
					this["cScaleLabel" + h] || this.scaleLabelColor;
			for (let h = 0; h < this.THEME_COLOR_LIMIT; h++)
				this["pie" + h] = this["cScale" + h];
			(this.pieTitleTextSize = this.pieTitleTextSize || "25px"),
				(this.pieTitleTextColor =
					this.pieTitleTextColor || this.taskTextDarkColor),
				(this.pieSectionTextSize = this.pieSectionTextSize || "17px"),
				(this.pieSectionTextColor = this.pieSectionTextColor || this.textColor),
				(this.pieLegendTextSize = this.pieLegendTextSize || "17px"),
				(this.pieLegendTextColor =
					this.pieLegendTextColor || this.taskTextDarkColor),
				(this.pieStrokeColor = this.pieStrokeColor || "black"),
				(this.pieStrokeWidth = this.pieStrokeWidth || "2px"),
				(this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px"),
				(this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black"),
				(this.pieOpacity = this.pieOpacity || "0.7"),
				(this.quadrant1Fill = this.quadrant1Fill || this.primaryColor),
				(this.quadrant2Fill =
					this.quadrant2Fill || x(this.primaryColor, { r: 5, g: 5, b: 5 })),
				(this.quadrant3Fill =
					this.quadrant3Fill || x(this.primaryColor, { r: 10, g: 10, b: 10 })),
				(this.quadrant4Fill =
					this.quadrant4Fill || x(this.primaryColor, { r: 15, g: 15, b: 15 })),
				(this.quadrant1TextFill =
					this.quadrant1TextFill || this.primaryTextColor),
				(this.quadrant2TextFill =
					this.quadrant2TextFill ||
					x(this.primaryTextColor, { r: -5, g: -5, b: -5 })),
				(this.quadrant3TextFill =
					this.quadrant3TextFill ||
					x(this.primaryTextColor, { r: -10, g: -10, b: -10 })),
				(this.quadrant4TextFill =
					this.quadrant4TextFill ||
					x(this.primaryTextColor, { r: -15, g: -15, b: -15 })),
				(this.quadrantPointFill =
					this.quadrantPointFill || Lr(this.quadrant1Fill)
						? W(this.quadrant1Fill)
						: V(this.quadrant1Fill)),
				(this.quadrantPointTextFill =
					this.quadrantPointTextFill || this.primaryTextColor),
				(this.quadrantXAxisTextFill =
					this.quadrantXAxisTextFill || this.primaryTextColor),
				(this.quadrantYAxisTextFill =
					this.quadrantYAxisTextFill || this.primaryTextColor),
				(this.quadrantInternalBorderStrokeFill =
					this.quadrantInternalBorderStrokeFill || this.primaryBorderColor),
				(this.quadrantExternalBorderStrokeFill =
					this.quadrantExternalBorderStrokeFill || this.primaryBorderColor),
				(this.quadrantTitleFill =
					this.quadrantTitleFill || this.primaryTextColor),
				(this.xyChart = {
					backgroundColor:
						((e = this.xyChart) == null ? void 0 : e.backgroundColor) ||
						this.background,
					titleColor:
						((r = this.xyChart) == null ? void 0 : r.titleColor) ||
						this.primaryTextColor,
					xAxisTitleColor:
						((i = this.xyChart) == null ? void 0 : i.xAxisTitleColor) ||
						this.primaryTextColor,
					xAxisLabelColor:
						((o = this.xyChart) == null ? void 0 : o.xAxisLabelColor) ||
						this.primaryTextColor,
					xAxisTickColor:
						((n = this.xyChart) == null ? void 0 : n.xAxisTickColor) ||
						this.primaryTextColor,
					xAxisLineColor:
						((a = this.xyChart) == null ? void 0 : a.xAxisLineColor) ||
						this.primaryTextColor,
					yAxisTitleColor:
						((l = this.xyChart) == null ? void 0 : l.yAxisTitleColor) ||
						this.primaryTextColor,
					yAxisLabelColor:
						((c = this.xyChart) == null ? void 0 : c.yAxisLabelColor) ||
						this.primaryTextColor,
					yAxisTickColor:
						((u = this.xyChart) == null ? void 0 : u.yAxisTickColor) ||
						this.primaryTextColor,
					yAxisLineColor:
						((p = this.xyChart) == null ? void 0 : p.yAxisLineColor) ||
						this.primaryTextColor,
					plotColorPalette:
						((d = this.xyChart) == null ? void 0 : d.plotColorPalette) ||
						"#3498db,#2ecc71,#e74c3c,#f1c40f,#bdc3c7,#ffffff,#34495e,#9b59b6,#1abc9c,#e67e22",
				}),
				(this.classText = this.primaryTextColor),
				(this.requirementBackground =
					this.requirementBackground || this.primaryColor),
				(this.requirementBorderColor =
					this.requirementBorderColor || this.primaryBorderColor),
				(this.requirementBorderSize = this.requirementBorderSize || "1"),
				(this.requirementTextColor =
					this.requirementTextColor || this.primaryTextColor),
				(this.relationColor = this.relationColor || this.lineColor),
				(this.relationLabelBackground =
					this.relationLabelBackground ||
					(this.darkMode ? V(this.secondaryColor, 30) : this.secondaryColor)),
				(this.relationLabelColor =
					this.relationLabelColor || this.actorTextColor),
				(this.git0 = W(this.secondaryColor, 20)),
				(this.git1 = W(this.pie2 || this.secondaryColor, 20)),
				(this.git2 = W(this.pie3 || this.tertiaryColor, 20)),
				(this.git3 = W(this.pie4 || x(this.primaryColor, { h: -30 }), 20)),
				(this.git4 = W(this.pie5 || x(this.primaryColor, { h: -60 }), 20)),
				(this.git5 = W(this.pie6 || x(this.primaryColor, { h: -90 }), 10)),
				(this.git6 = W(this.pie7 || x(this.primaryColor, { h: 60 }), 10)),
				(this.git7 = W(this.pie8 || x(this.primaryColor, { h: 120 }), 20)),
				(this.gitInv0 = this.gitInv0 || E(this.git0)),
				(this.gitInv1 = this.gitInv1 || E(this.git1)),
				(this.gitInv2 = this.gitInv2 || E(this.git2)),
				(this.gitInv3 = this.gitInv3 || E(this.git3)),
				(this.gitInv4 = this.gitInv4 || E(this.git4)),
				(this.gitInv5 = this.gitInv5 || E(this.git5)),
				(this.gitInv6 = this.gitInv6 || E(this.git6)),
				(this.gitInv7 = this.gitInv7 || E(this.git7)),
				(this.gitBranchLabel0 = this.gitBranchLabel0 || E(this.labelTextColor)),
				(this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor),
				(this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor),
				(this.gitBranchLabel3 = this.gitBranchLabel3 || E(this.labelTextColor)),
				(this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor),
				(this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor),
				(this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor),
				(this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor),
				(this.tagLabelColor = this.tagLabelColor || this.primaryTextColor),
				(this.tagLabelBackground =
					this.tagLabelBackground || this.primaryColor),
				(this.tagLabelBorder = this.tagBorder || this.primaryBorderColor),
				(this.tagLabelFontSize = this.tagLabelFontSize || "10px"),
				(this.commitLabelColor =
					this.commitLabelColor || this.secondaryTextColor),
				(this.commitLabelBackground =
					this.commitLabelBackground || this.secondaryColor),
				(this.commitLabelFontSize = this.commitLabelFontSize || "10px"),
				(this.attributeBackgroundColorOdd =
					this.attributeBackgroundColorOdd || W(this.background, 12)),
				(this.attributeBackgroundColorEven =
					this.attributeBackgroundColorEven || W(this.background, 2));
		}
		calculate(e) {
			if (typeof e != "object") {
				this.updateColors();
				return;
			}
			let r = Object.keys(e);
			r.forEach((i) => {
				this[i] = e[i];
			}),
				this.updateColors(),
				r.forEach((i) => {
					this[i] = e[i];
				});
		}
	},
	Wv = (t) => {
		let e = new qv();
		return e.calculate(t), e;
	},
	Uv = class {
		constructor() {
			(this.background = "#f4f4f4"),
				(this.primaryColor = "#ECECFF"),
				(this.secondaryColor = x(this.primaryColor, { h: 120 })),
				(this.secondaryColor = "#ffffde"),
				(this.tertiaryColor = x(this.primaryColor, { h: -160 })),
				(this.primaryBorderColor = Yt(this.primaryColor, this.darkMode)),
				(this.secondaryBorderColor = Yt(this.secondaryColor, this.darkMode)),
				(this.tertiaryBorderColor = Yt(this.tertiaryColor, this.darkMode)),
				(this.primaryTextColor = E(this.primaryColor)),
				(this.secondaryTextColor = E(this.secondaryColor)),
				(this.tertiaryTextColor = E(this.tertiaryColor)),
				(this.lineColor = E(this.background)),
				(this.textColor = E(this.background)),
				(this.background = "white"),
				(this.mainBkg = "#ECECFF"),
				(this.secondBkg = "#ffffde"),
				(this.lineColor = "#333333"),
				(this.border1 = "#9370DB"),
				(this.border2 = "#aaaa33"),
				(this.arrowheadColor = "#333333"),
				(this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif'),
				(this.fontSize = "16px"),
				(this.labelBackground = "#e8e8e8"),
				(this.textColor = "#333"),
				(this.THEME_COLOR_LIMIT = 12),
				(this.nodeBkg = "calculated"),
				(this.nodeBorder = "calculated"),
				(this.clusterBkg = "calculated"),
				(this.clusterBorder = "calculated"),
				(this.defaultLinkColor = "calculated"),
				(this.titleColor = "calculated"),
				(this.edgeLabelBackground = "calculated"),
				(this.actorBorder = "calculated"),
				(this.actorBkg = "calculated"),
				(this.actorTextColor = "black"),
				(this.actorLineColor = "grey"),
				(this.signalColor = "calculated"),
				(this.signalTextColor = "calculated"),
				(this.labelBoxBkgColor = "calculated"),
				(this.labelBoxBorderColor = "calculated"),
				(this.labelTextColor = "calculated"),
				(this.loopTextColor = "calculated"),
				(this.noteBorderColor = "calculated"),
				(this.noteBkgColor = "#fff5ad"),
				(this.noteTextColor = "calculated"),
				(this.activationBorderColor = "#666"),
				(this.activationBkgColor = "#f4f4f4"),
				(this.sequenceNumberColor = "white"),
				(this.sectionBkgColor = "calculated"),
				(this.altSectionBkgColor = "calculated"),
				(this.sectionBkgColor2 = "calculated"),
				(this.excludeBkgColor = "#eeeeee"),
				(this.taskBorderColor = "calculated"),
				(this.taskBkgColor = "calculated"),
				(this.taskTextLightColor = "calculated"),
				(this.taskTextColor = this.taskTextLightColor),
				(this.taskTextDarkColor = "calculated"),
				(this.taskTextOutsideColor = this.taskTextDarkColor),
				(this.taskTextClickableColor = "calculated"),
				(this.activeTaskBorderColor = "calculated"),
				(this.activeTaskBkgColor = "calculated"),
				(this.gridColor = "calculated"),
				(this.doneTaskBkgColor = "calculated"),
				(this.doneTaskBorderColor = "calculated"),
				(this.critBorderColor = "calculated"),
				(this.critBkgColor = "calculated"),
				(this.todayLineColor = "calculated"),
				(this.sectionBkgColor = Qe(102, 102, 255, 0.49)),
				(this.altSectionBkgColor = "white"),
				(this.sectionBkgColor2 = "#fff400"),
				(this.taskBorderColor = "#534fbc"),
				(this.taskBkgColor = "#8a90dd"),
				(this.taskTextLightColor = "white"),
				(this.taskTextColor = "calculated"),
				(this.taskTextDarkColor = "black"),
				(this.taskTextOutsideColor = "calculated"),
				(this.taskTextClickableColor = "#003163"),
				(this.activeTaskBorderColor = "#534fbc"),
				(this.activeTaskBkgColor = "#bfc7ff"),
				(this.gridColor = "lightgrey"),
				(this.doneTaskBkgColor = "lightgrey"),
				(this.doneTaskBorderColor = "grey"),
				(this.critBorderColor = "#ff8888"),
				(this.critBkgColor = "red"),
				(this.todayLineColor = "red"),
				(this.personBorder = this.primaryBorderColor),
				(this.personBkg = this.mainBkg),
				(this.labelColor = "black"),
				(this.errorBkgColor = "#552222"),
				(this.errorTextColor = "#552222"),
				this.updateColors();
		}
		updateColors() {
			var e, r, i, o, n, a, l, c, u, p, d;
			(this.cScale0 = this.cScale0 || this.primaryColor),
				(this.cScale1 = this.cScale1 || this.secondaryColor),
				(this.cScale2 = this.cScale2 || this.tertiaryColor),
				(this.cScale3 = this.cScale3 || x(this.primaryColor, { h: 30 })),
				(this.cScale4 = this.cScale4 || x(this.primaryColor, { h: 60 })),
				(this.cScale5 = this.cScale5 || x(this.primaryColor, { h: 90 })),
				(this.cScale6 = this.cScale6 || x(this.primaryColor, { h: 120 })),
				(this.cScale7 = this.cScale7 || x(this.primaryColor, { h: 150 })),
				(this.cScale8 = this.cScale8 || x(this.primaryColor, { h: 210 })),
				(this.cScale9 = this.cScale9 || x(this.primaryColor, { h: 270 })),
				(this.cScale10 = this.cScale10 || x(this.primaryColor, { h: 300 })),
				(this.cScale11 = this.cScale11 || x(this.primaryColor, { h: 330 })),
				(this.cScalePeer1 = this.cScalePeer1 || V(this.secondaryColor, 45)),
				(this.cScalePeer2 = this.cScalePeer2 || V(this.tertiaryColor, 40));
			for (let h = 0; h < this.THEME_COLOR_LIMIT; h++)
				(this["cScale" + h] = V(this["cScale" + h], 10)),
					(this["cScalePeer" + h] =
						this["cScalePeer" + h] || V(this["cScale" + h], 25));
			for (let h = 0; h < this.THEME_COLOR_LIMIT; h++)
				this["cScaleInv" + h] =
					this["cScaleInv" + h] || x(this["cScale" + h], { h: 180 });
			for (let h = 0; h < 5; h++)
				(this["surface" + h] =
					this["surface" + h] || x(this.mainBkg, { h: 30, l: -(5 + h * 5) })),
					(this["surfacePeer" + h] =
						this["surfacePeer" + h] ||
						x(this.mainBkg, { h: 30, l: -(7 + h * 5) }));
			if (
				((this.scaleLabelColor =
					this.scaleLabelColor !== "calculated" && this.scaleLabelColor
						? this.scaleLabelColor
						: this.labelTextColor),
				this.labelTextColor !== "calculated")
			) {
				(this.cScaleLabel0 = this.cScaleLabel0 || E(this.labelTextColor)),
					(this.cScaleLabel3 = this.cScaleLabel3 || E(this.labelTextColor));
				for (let h = 0; h < this.THEME_COLOR_LIMIT; h++)
					this["cScaleLabel" + h] =
						this["cScaleLabel" + h] || this.labelTextColor;
			}
			(this.nodeBkg = this.mainBkg),
				(this.nodeBorder = this.border1),
				(this.clusterBkg = this.secondBkg),
				(this.clusterBorder = this.border2),
				(this.defaultLinkColor = this.lineColor),
				(this.titleColor = this.textColor),
				(this.edgeLabelBackground = this.labelBackground),
				(this.actorBorder = W(this.border1, 23)),
				(this.actorBkg = this.mainBkg),
				(this.labelBoxBkgColor = this.actorBkg),
				(this.signalColor = this.textColor),
				(this.signalTextColor = this.textColor),
				(this.labelBoxBorderColor = this.actorBorder),
				(this.labelTextColor = this.actorTextColor),
				(this.loopTextColor = this.actorTextColor),
				(this.noteBorderColor = this.border2),
				(this.noteTextColor = this.actorTextColor),
				(this.taskTextColor = this.taskTextLightColor),
				(this.taskTextOutsideColor = this.taskTextDarkColor),
				(this.transitionColor = this.transitionColor || this.lineColor),
				(this.transitionLabelColor =
					this.transitionLabelColor || this.textColor),
				(this.stateLabelColor =
					this.stateLabelColor || this.stateBkg || this.primaryTextColor),
				(this.stateBkg = this.stateBkg || this.mainBkg),
				(this.labelBackgroundColor =
					this.labelBackgroundColor || this.stateBkg),
				(this.compositeBackground =
					this.compositeBackground || this.background || this.tertiaryColor),
				(this.altBackground = this.altBackground || "#f0f0f0"),
				(this.compositeTitleBackground =
					this.compositeTitleBackground || this.mainBkg),
				(this.compositeBorder = this.compositeBorder || this.nodeBorder),
				(this.innerEndBackground = this.nodeBorder),
				(this.specialStateColor = this.lineColor),
				(this.errorBkgColor = this.errorBkgColor || this.tertiaryColor),
				(this.errorTextColor = this.errorTextColor || this.tertiaryTextColor),
				(this.transitionColor = this.transitionColor || this.lineColor),
				(this.classText = this.primaryTextColor),
				(this.fillType0 = this.primaryColor),
				(this.fillType1 = this.secondaryColor),
				(this.fillType2 = x(this.primaryColor, { h: 64 })),
				(this.fillType3 = x(this.secondaryColor, { h: 64 })),
				(this.fillType4 = x(this.primaryColor, { h: -64 })),
				(this.fillType5 = x(this.secondaryColor, { h: -64 })),
				(this.fillType6 = x(this.primaryColor, { h: 128 })),
				(this.fillType7 = x(this.secondaryColor, { h: 128 })),
				(this.pie1 = this.pie1 || this.primaryColor),
				(this.pie2 = this.pie2 || this.secondaryColor),
				(this.pie3 = this.pie3 || x(this.tertiaryColor, { l: -40 })),
				(this.pie4 = this.pie4 || x(this.primaryColor, { l: -10 })),
				(this.pie5 = this.pie5 || x(this.secondaryColor, { l: -30 })),
				(this.pie6 = this.pie6 || x(this.tertiaryColor, { l: -20 })),
				(this.pie7 = this.pie7 || x(this.primaryColor, { h: 60, l: -20 })),
				(this.pie8 = this.pie8 || x(this.primaryColor, { h: -60, l: -40 })),
				(this.pie9 = this.pie9 || x(this.primaryColor, { h: 120, l: -40 })),
				(this.pie10 = this.pie10 || x(this.primaryColor, { h: 60, l: -40 })),
				(this.pie11 = this.pie11 || x(this.primaryColor, { h: -90, l: -40 })),
				(this.pie12 = this.pie12 || x(this.primaryColor, { h: 120, l: -30 })),
				(this.pieTitleTextSize = this.pieTitleTextSize || "25px"),
				(this.pieTitleTextColor =
					this.pieTitleTextColor || this.taskTextDarkColor),
				(this.pieSectionTextSize = this.pieSectionTextSize || "17px"),
				(this.pieSectionTextColor = this.pieSectionTextColor || this.textColor),
				(this.pieLegendTextSize = this.pieLegendTextSize || "17px"),
				(this.pieLegendTextColor =
					this.pieLegendTextColor || this.taskTextDarkColor),
				(this.pieStrokeColor = this.pieStrokeColor || "black"),
				(this.pieStrokeWidth = this.pieStrokeWidth || "2px"),
				(this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px"),
				(this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black"),
				(this.pieOpacity = this.pieOpacity || "0.7"),
				(this.quadrant1Fill = this.quadrant1Fill || this.primaryColor),
				(this.quadrant2Fill =
					this.quadrant2Fill || x(this.primaryColor, { r: 5, g: 5, b: 5 })),
				(this.quadrant3Fill =
					this.quadrant3Fill || x(this.primaryColor, { r: 10, g: 10, b: 10 })),
				(this.quadrant4Fill =
					this.quadrant4Fill || x(this.primaryColor, { r: 15, g: 15, b: 15 })),
				(this.quadrant1TextFill =
					this.quadrant1TextFill || this.primaryTextColor),
				(this.quadrant2TextFill =
					this.quadrant2TextFill ||
					x(this.primaryTextColor, { r: -5, g: -5, b: -5 })),
				(this.quadrant3TextFill =
					this.quadrant3TextFill ||
					x(this.primaryTextColor, { r: -10, g: -10, b: -10 })),
				(this.quadrant4TextFill =
					this.quadrant4TextFill ||
					x(this.primaryTextColor, { r: -15, g: -15, b: -15 })),
				(this.quadrantPointFill =
					this.quadrantPointFill || Lr(this.quadrant1Fill)
						? W(this.quadrant1Fill)
						: V(this.quadrant1Fill)),
				(this.quadrantPointTextFill =
					this.quadrantPointTextFill || this.primaryTextColor),
				(this.quadrantXAxisTextFill =
					this.quadrantXAxisTextFill || this.primaryTextColor),
				(this.quadrantYAxisTextFill =
					this.quadrantYAxisTextFill || this.primaryTextColor),
				(this.quadrantInternalBorderStrokeFill =
					this.quadrantInternalBorderStrokeFill || this.primaryBorderColor),
				(this.quadrantExternalBorderStrokeFill =
					this.quadrantExternalBorderStrokeFill || this.primaryBorderColor),
				(this.quadrantTitleFill =
					this.quadrantTitleFill || this.primaryTextColor),
				(this.xyChart = {
					backgroundColor:
						((e = this.xyChart) == null ? void 0 : e.backgroundColor) ||
						this.background,
					titleColor:
						((r = this.xyChart) == null ? void 0 : r.titleColor) ||
						this.primaryTextColor,
					xAxisTitleColor:
						((i = this.xyChart) == null ? void 0 : i.xAxisTitleColor) ||
						this.primaryTextColor,
					xAxisLabelColor:
						((o = this.xyChart) == null ? void 0 : o.xAxisLabelColor) ||
						this.primaryTextColor,
					xAxisTickColor:
						((n = this.xyChart) == null ? void 0 : n.xAxisTickColor) ||
						this.primaryTextColor,
					xAxisLineColor:
						((a = this.xyChart) == null ? void 0 : a.xAxisLineColor) ||
						this.primaryTextColor,
					yAxisTitleColor:
						((l = this.xyChart) == null ? void 0 : l.yAxisTitleColor) ||
						this.primaryTextColor,
					yAxisLabelColor:
						((c = this.xyChart) == null ? void 0 : c.yAxisLabelColor) ||
						this.primaryTextColor,
					yAxisTickColor:
						((u = this.xyChart) == null ? void 0 : u.yAxisTickColor) ||
						this.primaryTextColor,
					yAxisLineColor:
						((p = this.xyChart) == null ? void 0 : p.yAxisLineColor) ||
						this.primaryTextColor,
					plotColorPalette:
						((d = this.xyChart) == null ? void 0 : d.plotColorPalette) ||
						"#ECECFF,#8493A6,#FFC3A0,#DCDDE1,#B8E994,#D1A36F,#C3CDE6,#FFB6C1,#496078,#F8F3E3",
				}),
				(this.requirementBackground =
					this.requirementBackground || this.primaryColor),
				(this.requirementBorderColor =
					this.requirementBorderColor || this.primaryBorderColor),
				(this.requirementBorderSize = this.requirementBorderSize || "1"),
				(this.requirementTextColor =
					this.requirementTextColor || this.primaryTextColor),
				(this.relationColor = this.relationColor || this.lineColor),
				(this.relationLabelBackground =
					this.relationLabelBackground || this.labelBackground),
				(this.relationLabelColor =
					this.relationLabelColor || this.actorTextColor),
				(this.git0 = this.git0 || this.primaryColor),
				(this.git1 = this.git1 || this.secondaryColor),
				(this.git2 = this.git2 || this.tertiaryColor),
				(this.git3 = this.git3 || x(this.primaryColor, { h: -30 })),
				(this.git4 = this.git4 || x(this.primaryColor, { h: -60 })),
				(this.git5 = this.git5 || x(this.primaryColor, { h: -90 })),
				(this.git6 = this.git6 || x(this.primaryColor, { h: 60 })),
				(this.git7 = this.git7 || x(this.primaryColor, { h: 120 })),
				this.darkMode
					? ((this.git0 = W(this.git0, 25)),
						(this.git1 = W(this.git1, 25)),
						(this.git2 = W(this.git2, 25)),
						(this.git3 = W(this.git3, 25)),
						(this.git4 = W(this.git4, 25)),
						(this.git5 = W(this.git5, 25)),
						(this.git6 = W(this.git6, 25)),
						(this.git7 = W(this.git7, 25)))
					: ((this.git0 = V(this.git0, 25)),
						(this.git1 = V(this.git1, 25)),
						(this.git2 = V(this.git2, 25)),
						(this.git3 = V(this.git3, 25)),
						(this.git4 = V(this.git4, 25)),
						(this.git5 = V(this.git5, 25)),
						(this.git6 = V(this.git6, 25)),
						(this.git7 = V(this.git7, 25))),
				(this.gitInv0 = this.gitInv0 || V(E(this.git0), 25)),
				(this.gitInv1 = this.gitInv1 || E(this.git1)),
				(this.gitInv2 = this.gitInv2 || E(this.git2)),
				(this.gitInv3 = this.gitInv3 || E(this.git3)),
				(this.gitInv4 = this.gitInv4 || E(this.git4)),
				(this.gitInv5 = this.gitInv5 || E(this.git5)),
				(this.gitInv6 = this.gitInv6 || E(this.git6)),
				(this.gitInv7 = this.gitInv7 || E(this.git7)),
				(this.gitBranchLabel0 = this.gitBranchLabel0 || E(this.labelTextColor)),
				(this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor),
				(this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor),
				(this.gitBranchLabel3 = this.gitBranchLabel3 || E(this.labelTextColor)),
				(this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor),
				(this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor),
				(this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor),
				(this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor),
				(this.tagLabelColor = this.tagLabelColor || this.primaryTextColor),
				(this.tagLabelBackground =
					this.tagLabelBackground || this.primaryColor),
				(this.tagLabelBorder = this.tagBorder || this.primaryBorderColor),
				(this.tagLabelFontSize = this.tagLabelFontSize || "10px"),
				(this.commitLabelColor =
					this.commitLabelColor || this.secondaryTextColor),
				(this.commitLabelBackground =
					this.commitLabelBackground || this.secondaryColor),
				(this.commitLabelFontSize = this.commitLabelFontSize || "10px"),
				(this.attributeBackgroundColorOdd =
					this.attributeBackgroundColorOdd || ka),
				(this.attributeBackgroundColorEven =
					this.attributeBackgroundColorEven || Sa);
		}
		calculate(e) {
			if (typeof e != "object") {
				this.updateColors();
				return;
			}
			let r = Object.keys(e);
			r.forEach((i) => {
				this[i] = e[i];
			}),
				this.updateColors(),
				r.forEach((i) => {
					this[i] = e[i];
				});
		}
	},
	Hv = (t) => {
		let e = new Uv();
		return e.calculate(t), e;
	},
	Yv = class {
		constructor() {
			(this.background = "#f4f4f4"),
				(this.primaryColor = "#cde498"),
				(this.secondaryColor = "#cdffb2"),
				(this.background = "white"),
				(this.mainBkg = "#cde498"),
				(this.secondBkg = "#cdffb2"),
				(this.lineColor = "green"),
				(this.border1 = "#13540c"),
				(this.border2 = "#6eaa49"),
				(this.arrowheadColor = "green"),
				(this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif'),
				(this.fontSize = "16px"),
				(this.tertiaryColor = W("#cde498", 10)),
				(this.primaryBorderColor = Yt(this.primaryColor, this.darkMode)),
				(this.secondaryBorderColor = Yt(this.secondaryColor, this.darkMode)),
				(this.tertiaryBorderColor = Yt(this.tertiaryColor, this.darkMode)),
				(this.primaryTextColor = E(this.primaryColor)),
				(this.secondaryTextColor = E(this.secondaryColor)),
				(this.tertiaryTextColor = E(this.primaryColor)),
				(this.lineColor = E(this.background)),
				(this.textColor = E(this.background)),
				(this.THEME_COLOR_LIMIT = 12),
				(this.nodeBkg = "calculated"),
				(this.nodeBorder = "calculated"),
				(this.clusterBkg = "calculated"),
				(this.clusterBorder = "calculated"),
				(this.defaultLinkColor = "calculated"),
				(this.titleColor = "#333"),
				(this.edgeLabelBackground = "#e8e8e8"),
				(this.actorBorder = "calculated"),
				(this.actorBkg = "calculated"),
				(this.actorTextColor = "black"),
				(this.actorLineColor = "grey"),
				(this.signalColor = "#333"),
				(this.signalTextColor = "#333"),
				(this.labelBoxBkgColor = "calculated"),
				(this.labelBoxBorderColor = "#326932"),
				(this.labelTextColor = "calculated"),
				(this.loopTextColor = "calculated"),
				(this.noteBorderColor = "calculated"),
				(this.noteBkgColor = "#fff5ad"),
				(this.noteTextColor = "calculated"),
				(this.activationBorderColor = "#666"),
				(this.activationBkgColor = "#f4f4f4"),
				(this.sequenceNumberColor = "white"),
				(this.sectionBkgColor = "#6eaa49"),
				(this.altSectionBkgColor = "white"),
				(this.sectionBkgColor2 = "#6eaa49"),
				(this.excludeBkgColor = "#eeeeee"),
				(this.taskBorderColor = "calculated"),
				(this.taskBkgColor = "#487e3a"),
				(this.taskTextLightColor = "white"),
				(this.taskTextColor = "calculated"),
				(this.taskTextDarkColor = "black"),
				(this.taskTextOutsideColor = "calculated"),
				(this.taskTextClickableColor = "#003163"),
				(this.activeTaskBorderColor = "calculated"),
				(this.activeTaskBkgColor = "calculated"),
				(this.gridColor = "lightgrey"),
				(this.doneTaskBkgColor = "lightgrey"),
				(this.doneTaskBorderColor = "grey"),
				(this.critBorderColor = "#ff8888"),
				(this.critBkgColor = "red"),
				(this.todayLineColor = "red"),
				(this.personBorder = this.primaryBorderColor),
				(this.personBkg = this.mainBkg),
				(this.labelColor = "black"),
				(this.errorBkgColor = "#552222"),
				(this.errorTextColor = "#552222");
		}
		updateColors() {
			var e, r, i, o, n, a, l, c, u, p, d;
			(this.actorBorder = V(this.mainBkg, 20)),
				(this.actorBkg = this.mainBkg),
				(this.labelBoxBkgColor = this.actorBkg),
				(this.labelTextColor = this.actorTextColor),
				(this.loopTextColor = this.actorTextColor),
				(this.noteBorderColor = this.border2),
				(this.noteTextColor = this.actorTextColor),
				(this.cScale0 = this.cScale0 || this.primaryColor),
				(this.cScale1 = this.cScale1 || this.secondaryColor),
				(this.cScale2 = this.cScale2 || this.tertiaryColor),
				(this.cScale3 = this.cScale3 || x(this.primaryColor, { h: 30 })),
				(this.cScale4 = this.cScale4 || x(this.primaryColor, { h: 60 })),
				(this.cScale5 = this.cScale5 || x(this.primaryColor, { h: 90 })),
				(this.cScale6 = this.cScale6 || x(this.primaryColor, { h: 120 })),
				(this.cScale7 = this.cScale7 || x(this.primaryColor, { h: 150 })),
				(this.cScale8 = this.cScale8 || x(this.primaryColor, { h: 210 })),
				(this.cScale9 = this.cScale9 || x(this.primaryColor, { h: 270 })),
				(this.cScale10 = this.cScale10 || x(this.primaryColor, { h: 300 })),
				(this.cScale11 = this.cScale11 || x(this.primaryColor, { h: 330 })),
				(this.cScalePeer1 = this.cScalePeer1 || V(this.secondaryColor, 45)),
				(this.cScalePeer2 = this.cScalePeer2 || V(this.tertiaryColor, 40));
			for (let h = 0; h < this.THEME_COLOR_LIMIT; h++)
				(this["cScale" + h] = V(this["cScale" + h], 10)),
					(this["cScalePeer" + h] =
						this["cScalePeer" + h] || V(this["cScale" + h], 25));
			for (let h = 0; h < this.THEME_COLOR_LIMIT; h++)
				this["cScaleInv" + h] =
					this["cScaleInv" + h] || x(this["cScale" + h], { h: 180 });
			this.scaleLabelColor =
				this.scaleLabelColor !== "calculated" && this.scaleLabelColor
					? this.scaleLabelColor
					: this.labelTextColor;
			for (let h = 0; h < this.THEME_COLOR_LIMIT; h++)
				this["cScaleLabel" + h] =
					this["cScaleLabel" + h] || this.scaleLabelColor;
			for (let h = 0; h < 5; h++)
				(this["surface" + h] =
					this["surface" + h] ||
					x(this.mainBkg, { h: 30, s: -30, l: -(5 + h * 5) })),
					(this["surfacePeer" + h] =
						this["surfacePeer" + h] ||
						x(this.mainBkg, { h: 30, s: -30, l: -(8 + h * 5) }));
			(this.nodeBkg = this.mainBkg),
				(this.nodeBorder = this.border1),
				(this.clusterBkg = this.secondBkg),
				(this.clusterBorder = this.border2),
				(this.defaultLinkColor = this.lineColor),
				(this.taskBorderColor = this.border1),
				(this.taskTextColor = this.taskTextLightColor),
				(this.taskTextOutsideColor = this.taskTextDarkColor),
				(this.activeTaskBorderColor = this.taskBorderColor),
				(this.activeTaskBkgColor = this.mainBkg),
				(this.transitionColor = this.transitionColor || this.lineColor),
				(this.transitionLabelColor =
					this.transitionLabelColor || this.textColor),
				(this.stateLabelColor =
					this.stateLabelColor || this.stateBkg || this.primaryTextColor),
				(this.stateBkg = this.stateBkg || this.mainBkg),
				(this.labelBackgroundColor =
					this.labelBackgroundColor || this.stateBkg),
				(this.compositeBackground =
					this.compositeBackground || this.background || this.tertiaryColor),
				(this.altBackground = this.altBackground || "#f0f0f0"),
				(this.compositeTitleBackground =
					this.compositeTitleBackground || this.mainBkg),
				(this.compositeBorder = this.compositeBorder || this.nodeBorder),
				(this.innerEndBackground = this.primaryBorderColor),
				(this.specialStateColor = this.lineColor),
				(this.errorBkgColor = this.errorBkgColor || this.tertiaryColor),
				(this.errorTextColor = this.errorTextColor || this.tertiaryTextColor),
				(this.transitionColor = this.transitionColor || this.lineColor),
				(this.classText = this.primaryTextColor),
				(this.fillType0 = this.primaryColor),
				(this.fillType1 = this.secondaryColor),
				(this.fillType2 = x(this.primaryColor, { h: 64 })),
				(this.fillType3 = x(this.secondaryColor, { h: 64 })),
				(this.fillType4 = x(this.primaryColor, { h: -64 })),
				(this.fillType5 = x(this.secondaryColor, { h: -64 })),
				(this.fillType6 = x(this.primaryColor, { h: 128 })),
				(this.fillType7 = x(this.secondaryColor, { h: 128 })),
				(this.pie1 = this.pie1 || this.primaryColor),
				(this.pie2 = this.pie2 || this.secondaryColor),
				(this.pie3 = this.pie3 || this.tertiaryColor),
				(this.pie4 = this.pie4 || x(this.primaryColor, { l: -30 })),
				(this.pie5 = this.pie5 || x(this.secondaryColor, { l: -30 })),
				(this.pie6 = this.pie6 || x(this.tertiaryColor, { h: 40, l: -40 })),
				(this.pie7 = this.pie7 || x(this.primaryColor, { h: 60, l: -10 })),
				(this.pie8 = this.pie8 || x(this.primaryColor, { h: -60, l: -10 })),
				(this.pie9 = this.pie9 || x(this.primaryColor, { h: 120, l: 0 })),
				(this.pie10 = this.pie10 || x(this.primaryColor, { h: 60, l: -50 })),
				(this.pie11 = this.pie11 || x(this.primaryColor, { h: -60, l: -50 })),
				(this.pie12 = this.pie12 || x(this.primaryColor, { h: 120, l: -50 })),
				(this.pieTitleTextSize = this.pieTitleTextSize || "25px"),
				(this.pieTitleTextColor =
					this.pieTitleTextColor || this.taskTextDarkColor),
				(this.pieSectionTextSize = this.pieSectionTextSize || "17px"),
				(this.pieSectionTextColor = this.pieSectionTextColor || this.textColor),
				(this.pieLegendTextSize = this.pieLegendTextSize || "17px"),
				(this.pieLegendTextColor =
					this.pieLegendTextColor || this.taskTextDarkColor),
				(this.pieStrokeColor = this.pieStrokeColor || "black"),
				(this.pieStrokeWidth = this.pieStrokeWidth || "2px"),
				(this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px"),
				(this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black"),
				(this.pieOpacity = this.pieOpacity || "0.7"),
				(this.quadrant1Fill = this.quadrant1Fill || this.primaryColor),
				(this.quadrant2Fill =
					this.quadrant2Fill || x(this.primaryColor, { r: 5, g: 5, b: 5 })),
				(this.quadrant3Fill =
					this.quadrant3Fill || x(this.primaryColor, { r: 10, g: 10, b: 10 })),
				(this.quadrant4Fill =
					this.quadrant4Fill || x(this.primaryColor, { r: 15, g: 15, b: 15 })),
				(this.quadrant1TextFill =
					this.quadrant1TextFill || this.primaryTextColor),
				(this.quadrant2TextFill =
					this.quadrant2TextFill ||
					x(this.primaryTextColor, { r: -5, g: -5, b: -5 })),
				(this.quadrant3TextFill =
					this.quadrant3TextFill ||
					x(this.primaryTextColor, { r: -10, g: -10, b: -10 })),
				(this.quadrant4TextFill =
					this.quadrant4TextFill ||
					x(this.primaryTextColor, { r: -15, g: -15, b: -15 })),
				(this.quadrantPointFill =
					this.quadrantPointFill || Lr(this.quadrant1Fill)
						? W(this.quadrant1Fill)
						: V(this.quadrant1Fill)),
				(this.quadrantPointTextFill =
					this.quadrantPointTextFill || this.primaryTextColor),
				(this.quadrantXAxisTextFill =
					this.quadrantXAxisTextFill || this.primaryTextColor),
				(this.quadrantYAxisTextFill =
					this.quadrantYAxisTextFill || this.primaryTextColor),
				(this.quadrantInternalBorderStrokeFill =
					this.quadrantInternalBorderStrokeFill || this.primaryBorderColor),
				(this.quadrantExternalBorderStrokeFill =
					this.quadrantExternalBorderStrokeFill || this.primaryBorderColor),
				(this.quadrantTitleFill =
					this.quadrantTitleFill || this.primaryTextColor),
				(this.xyChart = {
					backgroundColor:
						((e = this.xyChart) == null ? void 0 : e.backgroundColor) ||
						this.background,
					titleColor:
						((r = this.xyChart) == null ? void 0 : r.titleColor) ||
						this.primaryTextColor,
					xAxisTitleColor:
						((i = this.xyChart) == null ? void 0 : i.xAxisTitleColor) ||
						this.primaryTextColor,
					xAxisLabelColor:
						((o = this.xyChart) == null ? void 0 : o.xAxisLabelColor) ||
						this.primaryTextColor,
					xAxisTickColor:
						((n = this.xyChart) == null ? void 0 : n.xAxisTickColor) ||
						this.primaryTextColor,
					xAxisLineColor:
						((a = this.xyChart) == null ? void 0 : a.xAxisLineColor) ||
						this.primaryTextColor,
					yAxisTitleColor:
						((l = this.xyChart) == null ? void 0 : l.yAxisTitleColor) ||
						this.primaryTextColor,
					yAxisLabelColor:
						((c = this.xyChart) == null ? void 0 : c.yAxisLabelColor) ||
						this.primaryTextColor,
					yAxisTickColor:
						((u = this.xyChart) == null ? void 0 : u.yAxisTickColor) ||
						this.primaryTextColor,
					yAxisLineColor:
						((p = this.xyChart) == null ? void 0 : p.yAxisLineColor) ||
						this.primaryTextColor,
					plotColorPalette:
						((d = this.xyChart) == null ? void 0 : d.plotColorPalette) ||
						"#CDE498,#FF6B6B,#A0D2DB,#D7BDE2,#F0F0F0,#FFC3A0,#7FD8BE,#FF9A8B,#FAF3E0,#FFF176",
				}),
				(this.requirementBackground =
					this.requirementBackground || this.primaryColor),
				(this.requirementBorderColor =
					this.requirementBorderColor || this.primaryBorderColor),
				(this.requirementBorderSize = this.requirementBorderSize || "1"),
				(this.requirementTextColor =
					this.requirementTextColor || this.primaryTextColor),
				(this.relationColor = this.relationColor || this.lineColor),
				(this.relationLabelBackground =
					this.relationLabelBackground || this.edgeLabelBackground),
				(this.relationLabelColor =
					this.relationLabelColor || this.actorTextColor),
				(this.git0 = this.git0 || this.primaryColor),
				(this.git1 = this.git1 || this.secondaryColor),
				(this.git2 = this.git2 || this.tertiaryColor),
				(this.git3 = this.git3 || x(this.primaryColor, { h: -30 })),
				(this.git4 = this.git4 || x(this.primaryColor, { h: -60 })),
				(this.git5 = this.git5 || x(this.primaryColor, { h: -90 })),
				(this.git6 = this.git6 || x(this.primaryColor, { h: 60 })),
				(this.git7 = this.git7 || x(this.primaryColor, { h: 120 })),
				this.darkMode
					? ((this.git0 = W(this.git0, 25)),
						(this.git1 = W(this.git1, 25)),
						(this.git2 = W(this.git2, 25)),
						(this.git3 = W(this.git3, 25)),
						(this.git4 = W(this.git4, 25)),
						(this.git5 = W(this.git5, 25)),
						(this.git6 = W(this.git6, 25)),
						(this.git7 = W(this.git7, 25)))
					: ((this.git0 = V(this.git0, 25)),
						(this.git1 = V(this.git1, 25)),
						(this.git2 = V(this.git2, 25)),
						(this.git3 = V(this.git3, 25)),
						(this.git4 = V(this.git4, 25)),
						(this.git5 = V(this.git5, 25)),
						(this.git6 = V(this.git6, 25)),
						(this.git7 = V(this.git7, 25))),
				(this.gitInv0 = this.gitInv0 || E(this.git0)),
				(this.gitInv1 = this.gitInv1 || E(this.git1)),
				(this.gitInv2 = this.gitInv2 || E(this.git2)),
				(this.gitInv3 = this.gitInv3 || E(this.git3)),
				(this.gitInv4 = this.gitInv4 || E(this.git4)),
				(this.gitInv5 = this.gitInv5 || E(this.git5)),
				(this.gitInv6 = this.gitInv6 || E(this.git6)),
				(this.gitInv7 = this.gitInv7 || E(this.git7)),
				(this.gitBranchLabel0 = this.gitBranchLabel0 || E(this.labelTextColor)),
				(this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor),
				(this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor),
				(this.gitBranchLabel3 = this.gitBranchLabel3 || E(this.labelTextColor)),
				(this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor),
				(this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor),
				(this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor),
				(this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor),
				(this.tagLabelColor = this.tagLabelColor || this.primaryTextColor),
				(this.tagLabelBackground =
					this.tagLabelBackground || this.primaryColor),
				(this.tagLabelBorder = this.tagBorder || this.primaryBorderColor),
				(this.tagLabelFontSize = this.tagLabelFontSize || "10px"),
				(this.commitLabelColor =
					this.commitLabelColor || this.secondaryTextColor),
				(this.commitLabelBackground =
					this.commitLabelBackground || this.secondaryColor),
				(this.commitLabelFontSize = this.commitLabelFontSize || "10px"),
				(this.attributeBackgroundColorOdd =
					this.attributeBackgroundColorOdd || ka),
				(this.attributeBackgroundColorEven =
					this.attributeBackgroundColorEven || Sa);
		}
		calculate(e) {
			if (typeof e != "object") {
				this.updateColors();
				return;
			}
			let r = Object.keys(e);
			r.forEach((i) => {
				this[i] = e[i];
			}),
				this.updateColors(),
				r.forEach((i) => {
					this[i] = e[i];
				});
		}
	},
	jv = (t) => {
		let e = new Yv();
		return e.calculate(t), e;
	},
	Dl = class {
		constructor() {
			(this.primaryColor = "#eee"),
				(this.contrast = "#707070"),
				(this.secondaryColor = W(this.contrast, 55)),
				(this.background = "#ffffff"),
				(this.tertiaryColor = x(this.primaryColor, { h: -160 })),
				(this.primaryBorderColor = Yt(this.primaryColor, this.darkMode)),
				(this.secondaryBorderColor = Yt(this.secondaryColor, this.darkMode)),
				(this.tertiaryBorderColor = Yt(this.tertiaryColor, this.darkMode)),
				(this.primaryTextColor = E(this.primaryColor)),
				(this.secondaryTextColor = E(this.secondaryColor)),
				(this.tertiaryTextColor = E(this.tertiaryColor)),
				(this.lineColor = E(this.background)),
				(this.textColor = E(this.background)),
				(this.mainBkg = "#eee"),
				(this.secondBkg = "calculated"),
				(this.lineColor = "#666"),
				(this.border1 = "#999"),
				(this.border2 = "calculated"),
				(this.note = "#ffa"),
				(this.text = "#333"),
				(this.critical = "#d42"),
				(this.done = "#bbb"),
				(this.arrowheadColor = "#333333"),
				(this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif'),
				(this.fontSize = "16px"),
				(this.THEME_COLOR_LIMIT = 12),
				(this.nodeBkg = "calculated"),
				(this.nodeBorder = "calculated"),
				(this.clusterBkg = "calculated"),
				(this.clusterBorder = "calculated"),
				(this.defaultLinkColor = "calculated"),
				(this.titleColor = "calculated"),
				(this.edgeLabelBackground = "white"),
				(this.actorBorder = "calculated"),
				(this.actorBkg = "calculated"),
				(this.actorTextColor = "calculated"),
				(this.actorLineColor = "calculated"),
				(this.signalColor = "calculated"),
				(this.signalTextColor = "calculated"),
				(this.labelBoxBkgColor = "calculated"),
				(this.labelBoxBorderColor = "calculated"),
				(this.labelTextColor = "calculated"),
				(this.loopTextColor = "calculated"),
				(this.noteBorderColor = "calculated"),
				(this.noteBkgColor = "calculated"),
				(this.noteTextColor = "calculated"),
				(this.activationBorderColor = "#666"),
				(this.activationBkgColor = "#f4f4f4"),
				(this.sequenceNumberColor = "white"),
				(this.sectionBkgColor = "calculated"),
				(this.altSectionBkgColor = "white"),
				(this.sectionBkgColor2 = "calculated"),
				(this.excludeBkgColor = "#eeeeee"),
				(this.taskBorderColor = "calculated"),
				(this.taskBkgColor = "calculated"),
				(this.taskTextLightColor = "white"),
				(this.taskTextColor = "calculated"),
				(this.taskTextDarkColor = "calculated"),
				(this.taskTextOutsideColor = "calculated"),
				(this.taskTextClickableColor = "#003163"),
				(this.activeTaskBorderColor = "calculated"),
				(this.activeTaskBkgColor = "calculated"),
				(this.gridColor = "calculated"),
				(this.doneTaskBkgColor = "calculated"),
				(this.doneTaskBorderColor = "calculated"),
				(this.critBkgColor = "calculated"),
				(this.critBorderColor = "calculated"),
				(this.todayLineColor = "calculated"),
				(this.personBorder = this.primaryBorderColor),
				(this.personBkg = this.mainBkg),
				(this.labelColor = "black"),
				(this.errorBkgColor = "#552222"),
				(this.errorTextColor = "#552222");
		}
		updateColors() {
			var e, r, i, o, n, a, l, c, u, p, d;
			(this.secondBkg = W(this.contrast, 55)),
				(this.border2 = this.contrast),
				(this.actorBorder = W(this.border1, 23)),
				(this.actorBkg = this.mainBkg),
				(this.actorTextColor = this.text),
				(this.actorLineColor = this.lineColor),
				(this.signalColor = this.text),
				(this.signalTextColor = this.text),
				(this.labelBoxBkgColor = this.actorBkg),
				(this.labelBoxBorderColor = this.actorBorder),
				(this.labelTextColor = this.text),
				(this.loopTextColor = this.text),
				(this.noteBorderColor = "#999"),
				(this.noteBkgColor = "#666"),
				(this.noteTextColor = "#fff"),
				(this.cScale0 = this.cScale0 || "#555"),
				(this.cScale1 = this.cScale1 || "#F4F4F4"),
				(this.cScale2 = this.cScale2 || "#555"),
				(this.cScale3 = this.cScale3 || "#BBB"),
				(this.cScale4 = this.cScale4 || "#777"),
				(this.cScale5 = this.cScale5 || "#999"),
				(this.cScale6 = this.cScale6 || "#DDD"),
				(this.cScale7 = this.cScale7 || "#FFF"),
				(this.cScale8 = this.cScale8 || "#DDD"),
				(this.cScale9 = this.cScale9 || "#BBB"),
				(this.cScale10 = this.cScale10 || "#999"),
				(this.cScale11 = this.cScale11 || "#777");
			for (let h = 0; h < this.THEME_COLOR_LIMIT; h++)
				this["cScaleInv" + h] = this["cScaleInv" + h] || E(this["cScale" + h]);
			for (let h = 0; h < this.THEME_COLOR_LIMIT; h++)
				this.darkMode
					? (this["cScalePeer" + h] =
							this["cScalePeer" + h] || W(this["cScale" + h], 10))
					: (this["cScalePeer" + h] =
							this["cScalePeer" + h] || V(this["cScale" + h], 10));
			(this.scaleLabelColor =
				this.scaleLabelColor ||
				(this.darkMode ? "black" : this.labelTextColor)),
				(this.cScaleLabel0 = this.cScaleLabel0 || this.cScale1),
				(this.cScaleLabel2 = this.cScaleLabel2 || this.cScale1);
			for (let h = 0; h < this.THEME_COLOR_LIMIT; h++)
				this["cScaleLabel" + h] =
					this["cScaleLabel" + h] || this.scaleLabelColor;
			for (let h = 0; h < 5; h++)
				(this["surface" + h] =
					this["surface" + h] || x(this.mainBkg, { l: -(5 + h * 5) })),
					(this["surfacePeer" + h] =
						this["surfacePeer" + h] || x(this.mainBkg, { l: -(8 + h * 5) }));
			(this.nodeBkg = this.mainBkg),
				(this.nodeBorder = this.border1),
				(this.clusterBkg = this.secondBkg),
				(this.clusterBorder = this.border2),
				(this.defaultLinkColor = this.lineColor),
				(this.titleColor = this.text),
				(this.sectionBkgColor = W(this.contrast, 30)),
				(this.sectionBkgColor2 = W(this.contrast, 30)),
				(this.taskBorderColor = V(this.contrast, 10)),
				(this.taskBkgColor = this.contrast),
				(this.taskTextColor = this.taskTextLightColor),
				(this.taskTextDarkColor = this.text),
				(this.taskTextOutsideColor = this.taskTextDarkColor),
				(this.activeTaskBorderColor = this.taskBorderColor),
				(this.activeTaskBkgColor = this.mainBkg),
				(this.gridColor = W(this.border1, 30)),
				(this.doneTaskBkgColor = this.done),
				(this.doneTaskBorderColor = this.lineColor),
				(this.critBkgColor = this.critical),
				(this.critBorderColor = V(this.critBkgColor, 10)),
				(this.todayLineColor = this.critBkgColor),
				(this.transitionColor = this.transitionColor || "#000"),
				(this.transitionLabelColor =
					this.transitionLabelColor || this.textColor),
				(this.stateLabelColor =
					this.stateLabelColor || this.stateBkg || this.primaryTextColor),
				(this.stateBkg = this.stateBkg || this.mainBkg),
				(this.labelBackgroundColor =
					this.labelBackgroundColor || this.stateBkg),
				(this.compositeBackground =
					this.compositeBackground || this.background || this.tertiaryColor),
				(this.altBackground = this.altBackground || "#f4f4f4"),
				(this.compositeTitleBackground =
					this.compositeTitleBackground || this.mainBkg),
				(this.stateBorder = this.stateBorder || "#000"),
				(this.innerEndBackground = this.primaryBorderColor),
				(this.specialStateColor = "#222"),
				(this.errorBkgColor = this.errorBkgColor || this.tertiaryColor),
				(this.errorTextColor = this.errorTextColor || this.tertiaryTextColor),
				(this.classText = this.primaryTextColor),
				(this.fillType0 = this.primaryColor),
				(this.fillType1 = this.secondaryColor),
				(this.fillType2 = x(this.primaryColor, { h: 64 })),
				(this.fillType3 = x(this.secondaryColor, { h: 64 })),
				(this.fillType4 = x(this.primaryColor, { h: -64 })),
				(this.fillType5 = x(this.secondaryColor, { h: -64 })),
				(this.fillType6 = x(this.primaryColor, { h: 128 })),
				(this.fillType7 = x(this.secondaryColor, { h: 128 }));
			for (let h = 0; h < this.THEME_COLOR_LIMIT; h++)
				this["pie" + h] = this["cScale" + h];
			(this.pie12 = this.pie0),
				(this.pieTitleTextSize = this.pieTitleTextSize || "25px"),
				(this.pieTitleTextColor =
					this.pieTitleTextColor || this.taskTextDarkColor),
				(this.pieSectionTextSize = this.pieSectionTextSize || "17px"),
				(this.pieSectionTextColor = this.pieSectionTextColor || this.textColor),
				(this.pieLegendTextSize = this.pieLegendTextSize || "17px"),
				(this.pieLegendTextColor =
					this.pieLegendTextColor || this.taskTextDarkColor),
				(this.pieStrokeColor = this.pieStrokeColor || "black"),
				(this.pieStrokeWidth = this.pieStrokeWidth || "2px"),
				(this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px"),
				(this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black"),
				(this.pieOpacity = this.pieOpacity || "0.7"),
				(this.quadrant1Fill = this.quadrant1Fill || this.primaryColor),
				(this.quadrant2Fill =
					this.quadrant2Fill || x(this.primaryColor, { r: 5, g: 5, b: 5 })),
				(this.quadrant3Fill =
					this.quadrant3Fill || x(this.primaryColor, { r: 10, g: 10, b: 10 })),
				(this.quadrant4Fill =
					this.quadrant4Fill || x(this.primaryColor, { r: 15, g: 15, b: 15 })),
				(this.quadrant1TextFill =
					this.quadrant1TextFill || this.primaryTextColor),
				(this.quadrant2TextFill =
					this.quadrant2TextFill ||
					x(this.primaryTextColor, { r: -5, g: -5, b: -5 })),
				(this.quadrant3TextFill =
					this.quadrant3TextFill ||
					x(this.primaryTextColor, { r: -10, g: -10, b: -10 })),
				(this.quadrant4TextFill =
					this.quadrant4TextFill ||
					x(this.primaryTextColor, { r: -15, g: -15, b: -15 })),
				(this.quadrantPointFill =
					this.quadrantPointFill || Lr(this.quadrant1Fill)
						? W(this.quadrant1Fill)
						: V(this.quadrant1Fill)),
				(this.quadrantPointTextFill =
					this.quadrantPointTextFill || this.primaryTextColor),
				(this.quadrantXAxisTextFill =
					this.quadrantXAxisTextFill || this.primaryTextColor),
				(this.quadrantYAxisTextFill =
					this.quadrantYAxisTextFill || this.primaryTextColor),
				(this.quadrantInternalBorderStrokeFill =
					this.quadrantInternalBorderStrokeFill || this.primaryBorderColor),
				(this.quadrantExternalBorderStrokeFill =
					this.quadrantExternalBorderStrokeFill || this.primaryBorderColor),
				(this.quadrantTitleFill =
					this.quadrantTitleFill || this.primaryTextColor),
				(this.xyChart = {
					backgroundColor:
						((e = this.xyChart) == null ? void 0 : e.backgroundColor) ||
						this.background,
					titleColor:
						((r = this.xyChart) == null ? void 0 : r.titleColor) ||
						this.primaryTextColor,
					xAxisTitleColor:
						((i = this.xyChart) == null ? void 0 : i.xAxisTitleColor) ||
						this.primaryTextColor,
					xAxisLabelColor:
						((o = this.xyChart) == null ? void 0 : o.xAxisLabelColor) ||
						this.primaryTextColor,
					xAxisTickColor:
						((n = this.xyChart) == null ? void 0 : n.xAxisTickColor) ||
						this.primaryTextColor,
					xAxisLineColor:
						((a = this.xyChart) == null ? void 0 : a.xAxisLineColor) ||
						this.primaryTextColor,
					yAxisTitleColor:
						((l = this.xyChart) == null ? void 0 : l.yAxisTitleColor) ||
						this.primaryTextColor,
					yAxisLabelColor:
						((c = this.xyChart) == null ? void 0 : c.yAxisLabelColor) ||
						this.primaryTextColor,
					yAxisTickColor:
						((u = this.xyChart) == null ? void 0 : u.yAxisTickColor) ||
						this.primaryTextColor,
					yAxisLineColor:
						((p = this.xyChart) == null ? void 0 : p.yAxisLineColor) ||
						this.primaryTextColor,
					plotColorPalette:
						((d = this.xyChart) == null ? void 0 : d.plotColorPalette) ||
						"#EEE,#6BB8E4,#8ACB88,#C7ACD6,#E8DCC2,#FFB2A8,#FFF380,#7E8D91,#FFD8B1,#FAF3E0",
				}),
				(this.requirementBackground =
					this.requirementBackground || this.primaryColor),
				(this.requirementBorderColor =
					this.requirementBorderColor || this.primaryBorderColor),
				(this.requirementBorderSize = this.requirementBorderSize || "1"),
				(this.requirementTextColor =
					this.requirementTextColor || this.primaryTextColor),
				(this.relationColor = this.relationColor || this.lineColor),
				(this.relationLabelBackground =
					this.relationLabelBackground || this.edgeLabelBackground),
				(this.relationLabelColor =
					this.relationLabelColor || this.actorTextColor),
				(this.git0 = V(this.pie1, 25) || this.primaryColor),
				(this.git1 = this.pie2 || this.secondaryColor),
				(this.git2 = this.pie3 || this.tertiaryColor),
				(this.git3 = this.pie4 || x(this.primaryColor, { h: -30 })),
				(this.git4 = this.pie5 || x(this.primaryColor, { h: -60 })),
				(this.git5 = this.pie6 || x(this.primaryColor, { h: -90 })),
				(this.git6 = this.pie7 || x(this.primaryColor, { h: 60 })),
				(this.git7 = this.pie8 || x(this.primaryColor, { h: 120 })),
				(this.gitInv0 = this.gitInv0 || E(this.git0)),
				(this.gitInv1 = this.gitInv1 || E(this.git1)),
				(this.gitInv2 = this.gitInv2 || E(this.git2)),
				(this.gitInv3 = this.gitInv3 || E(this.git3)),
				(this.gitInv4 = this.gitInv4 || E(this.git4)),
				(this.gitInv5 = this.gitInv5 || E(this.git5)),
				(this.gitInv6 = this.gitInv6 || E(this.git6)),
				(this.gitInv7 = this.gitInv7 || E(this.git7)),
				(this.branchLabelColor = this.branchLabelColor || this.labelTextColor),
				(this.gitBranchLabel0 = this.branchLabelColor),
				(this.gitBranchLabel1 = "white"),
				(this.gitBranchLabel2 = this.branchLabelColor),
				(this.gitBranchLabel3 = "white"),
				(this.gitBranchLabel4 = this.branchLabelColor),
				(this.gitBranchLabel5 = this.branchLabelColor),
				(this.gitBranchLabel6 = this.branchLabelColor),
				(this.gitBranchLabel7 = this.branchLabelColor),
				(this.tagLabelColor = this.tagLabelColor || this.primaryTextColor),
				(this.tagLabelBackground =
					this.tagLabelBackground || this.primaryColor),
				(this.tagLabelBorder = this.tagBorder || this.primaryBorderColor),
				(this.tagLabelFontSize = this.tagLabelFontSize || "10px"),
				(this.commitLabelColor =
					this.commitLabelColor || this.secondaryTextColor),
				(this.commitLabelBackground =
					this.commitLabelBackground || this.secondaryColor),
				(this.commitLabelFontSize = this.commitLabelFontSize || "10px"),
				(this.attributeBackgroundColorOdd =
					this.attributeBackgroundColorOdd || ka),
				(this.attributeBackgroundColorEven =
					this.attributeBackgroundColorEven || Sa);
		}
		calculate(e) {
			if (typeof e != "object") {
				this.updateColors();
				return;
			}
			let r = Object.keys(e);
			r.forEach((i) => {
				this[i] = e[i];
			}),
				this.updateColors(),
				r.forEach((i) => {
					this[i] = e[i];
				});
		}
	},
	Gv = (t) => {
		let e = new Dl();
		return e.calculate(t), e;
	},
	qe = {
		base: { getThemeVariables: zv },
		dark: { getThemeVariables: Wv },
		default: { getThemeVariables: Hv },
		forest: { getThemeVariables: jv },
		neutral: { getThemeVariables: Gv },
	},
	$e = {
		flowchart: {
			useMaxWidth: !0,
			titleTopMargin: 25,
			subGraphTitleMargin: { top: 0, bottom: 0 },
			diagramPadding: 8,
			htmlLabels: !0,
			nodeSpacing: 50,
			rankSpacing: 50,
			curve: "basis",
			padding: 15,
			defaultRenderer: "dagre-wrapper",
			wrappingWidth: 200,
		},
		sequence: {
			useMaxWidth: !0,
			hideUnusedParticipants: !1,
			activationWidth: 10,
			diagramMarginX: 50,
			diagramMarginY: 10,
			actorMargin: 50,
			width: 150,
			height: 65,
			boxMargin: 10,
			boxTextMargin: 5,
			noteMargin: 10,
			messageMargin: 35,
			messageAlign: "center",
			mirrorActors: !0,
			forceMenus: !1,
			bottomMarginAdj: 1,
			rightAngles: !1,
			showSequenceNumbers: !1,
			actorFontSize: 14,
			actorFontFamily: '"Open Sans", sans-serif',
			actorFontWeight: 400,
			noteFontSize: 14,
			noteFontFamily: '"trebuchet ms", verdana, arial, sans-serif',
			noteFontWeight: 400,
			noteAlign: "center",
			messageFontSize: 16,
			messageFontFamily: '"trebuchet ms", verdana, arial, sans-serif',
			messageFontWeight: 400,
			wrap: !1,
			wrapPadding: 10,
			labelBoxWidth: 50,
			labelBoxHeight: 20,
		},
		gantt: {
			useMaxWidth: !0,
			titleTopMargin: 25,
			barHeight: 20,
			barGap: 4,
			topPadding: 50,
			rightPadding: 75,
			leftPadding: 75,
			gridLineStartPadding: 35,
			fontSize: 11,
			sectionFontSize: 11,
			numberSectionStyles: 4,
			axisFormat: "%Y-%m-%d",
			topAxis: !1,
			displayMode: "",
			weekday: "sunday",
		},
		journey: {
			useMaxWidth: !0,
			diagramMarginX: 50,
			diagramMarginY: 10,
			leftMargin: 150,
			width: 150,
			height: 50,
			boxMargin: 10,
			boxTextMargin: 5,
			noteMargin: 10,
			messageMargin: 35,
			messageAlign: "center",
			bottomMarginAdj: 1,
			rightAngles: !1,
			taskFontSize: 14,
			taskFontFamily: '"Open Sans", sans-serif',
			taskMargin: 50,
			activationWidth: 10,
			textPlacement: "fo",
			actorColours: [
				"#8FBC8F",
				"#7CFC00",
				"#00FFFF",
				"#20B2AA",
				"#B0E0E6",
				"#FFFFE0",
			],
			sectionFills: [
				"#191970",
				"#8B008B",
				"#4B0082",
				"#2F4F4F",
				"#800000",
				"#8B4513",
				"#00008B",
			],
			sectionColours: ["#fff"],
		},
		class: {
			useMaxWidth: !0,
			titleTopMargin: 25,
			arrowMarkerAbsolute: !1,
			dividerMargin: 10,
			padding: 5,
			textHeight: 10,
			defaultRenderer: "dagre-wrapper",
			htmlLabels: !1,
		},
		state: {
			useMaxWidth: !0,
			titleTopMargin: 25,
			dividerMargin: 10,
			sizeUnit: 5,
			padding: 8,
			textHeight: 10,
			titleShift: -15,
			noteMargin: 10,
			forkWidth: 70,
			forkHeight: 7,
			miniPadding: 2,
			fontSizeFactor: 5.02,
			fontSize: 24,
			labelHeight: 16,
			edgeLengthFactor: "20",
			compositTitleSize: 35,
			radius: 5,
			defaultRenderer: "dagre-wrapper",
		},
		er: {
			useMaxWidth: !0,
			titleTopMargin: 25,
			diagramPadding: 20,
			layoutDirection: "TB",
			minEntityWidth: 100,
			minEntityHeight: 75,
			entityPadding: 15,
			stroke: "gray",
			fill: "honeydew",
			fontSize: 12,
		},
		pie: { useMaxWidth: !0, textPosition: 0.75 },
		quadrantChart: {
			useMaxWidth: !0,
			chartWidth: 500,
			chartHeight: 500,
			titleFontSize: 20,
			titlePadding: 10,
			quadrantPadding: 5,
			xAxisLabelPadding: 5,
			yAxisLabelPadding: 5,
			xAxisLabelFontSize: 16,
			yAxisLabelFontSize: 16,
			quadrantLabelFontSize: 16,
			quadrantTextTopPadding: 5,
			pointTextPadding: 5,
			pointLabelFontSize: 12,
			pointRadius: 5,
			xAxisPosition: "top",
			yAxisPosition: "left",
			quadrantInternalBorderStrokeWidth: 1,
			quadrantExternalBorderStrokeWidth: 2,
		},
		xyChart: {
			useMaxWidth: !0,
			width: 700,
			height: 500,
			titleFontSize: 20,
			titlePadding: 10,
			showTitle: !0,
			xAxis: {
				$ref: "#/$defs/XYChartAxisConfig",
				showLabel: !0,
				labelFontSize: 14,
				labelPadding: 5,
				showTitle: !0,
				titleFontSize: 16,
				titlePadding: 5,
				showTick: !0,
				tickLength: 5,
				tickWidth: 2,
				showAxisLine: !0,
				axisLineWidth: 2,
			},
			yAxis: {
				$ref: "#/$defs/XYChartAxisConfig",
				showLabel: !0,
				labelFontSize: 14,
				labelPadding: 5,
				showTitle: !0,
				titleFontSize: 16,
				titlePadding: 5,
				showTick: !0,
				tickLength: 5,
				tickWidth: 2,
				showAxisLine: !0,
				axisLineWidth: 2,
			},
			chartOrientation: "vertical",
			plotReservedSpacePercent: 50,
		},
		requirement: {
			useMaxWidth: !0,
			rect_fill: "#f9f9f9",
			text_color: "#333",
			rect_border_size: "0.5px",
			rect_border_color: "#bbb",
			rect_min_width: 200,
			rect_min_height: 200,
			fontSize: 14,
			rect_padding: 10,
			line_height: 20,
		},
		mindmap: { useMaxWidth: !0, padding: 10, maxNodeWidth: 200 },
		timeline: {
			useMaxWidth: !0,
			diagramMarginX: 50,
			diagramMarginY: 10,
			leftMargin: 150,
			width: 150,
			height: 50,
			boxMargin: 10,
			boxTextMargin: 5,
			noteMargin: 10,
			messageMargin: 35,
			messageAlign: "center",
			bottomMarginAdj: 1,
			rightAngles: !1,
			taskFontSize: 14,
			taskFontFamily: '"Open Sans", sans-serif',
			taskMargin: 50,
			activationWidth: 10,
			textPlacement: "fo",
			actorColours: [
				"#8FBC8F",
				"#7CFC00",
				"#00FFFF",
				"#20B2AA",
				"#B0E0E6",
				"#FFFFE0",
			],
			sectionFills: [
				"#191970",
				"#8B008B",
				"#4B0082",
				"#2F4F4F",
				"#800000",
				"#8B4513",
				"#00008B",
			],
			sectionColours: ["#fff"],
			disableMulticolor: !1,
		},
		gitGraph: {
			useMaxWidth: !0,
			titleTopMargin: 25,
			diagramPadding: 8,
			nodeLabel: { width: 75, height: 100, x: -25, y: 0 },
			mainBranchName: "main",
			mainBranchOrder: 0,
			showCommitLabel: !0,
			showBranches: !0,
			rotateCommitLabel: !0,
			parallelCommits: !1,
			arrowMarkerAbsolute: !1,
		},
		c4: {
			useMaxWidth: !0,
			diagramMarginX: 50,
			diagramMarginY: 10,
			c4ShapeMargin: 50,
			c4ShapePadding: 20,
			width: 216,
			height: 60,
			boxMargin: 10,
			c4ShapeInRow: 4,
			nextLinePaddingX: 0,
			c4BoundaryInRow: 2,
			personFontSize: 14,
			personFontFamily: '"Open Sans", sans-serif',
			personFontWeight: "normal",
			external_personFontSize: 14,
			external_personFontFamily: '"Open Sans", sans-serif',
			external_personFontWeight: "normal",
			systemFontSize: 14,
			systemFontFamily: '"Open Sans", sans-serif',
			systemFontWeight: "normal",
			external_systemFontSize: 14,
			external_systemFontFamily: '"Open Sans", sans-serif',
			external_systemFontWeight: "normal",
			system_dbFontSize: 14,
			system_dbFontFamily: '"Open Sans", sans-serif',
			system_dbFontWeight: "normal",
			external_system_dbFontSize: 14,
			external_system_dbFontFamily: '"Open Sans", sans-serif',
			external_system_dbFontWeight: "normal",
			system_queueFontSize: 14,
			system_queueFontFamily: '"Open Sans", sans-serif',
			system_queueFontWeight: "normal",
			external_system_queueFontSize: 14,
			external_system_queueFontFamily: '"Open Sans", sans-serif',
			external_system_queueFontWeight: "normal",
			boundaryFontSize: 14,
			boundaryFontFamily: '"Open Sans", sans-serif',
			boundaryFontWeight: "normal",
			messageFontSize: 12,
			messageFontFamily: '"Open Sans", sans-serif',
			messageFontWeight: "normal",
			containerFontSize: 14,
			containerFontFamily: '"Open Sans", sans-serif',
			containerFontWeight: "normal",
			external_containerFontSize: 14,
			external_containerFontFamily: '"Open Sans", sans-serif',
			external_containerFontWeight: "normal",
			container_dbFontSize: 14,
			container_dbFontFamily: '"Open Sans", sans-serif',
			container_dbFontWeight: "normal",
			external_container_dbFontSize: 14,
			external_container_dbFontFamily: '"Open Sans", sans-serif',
			external_container_dbFontWeight: "normal",
			container_queueFontSize: 14,
			container_queueFontFamily: '"Open Sans", sans-serif',
			container_queueFontWeight: "normal",
			external_container_queueFontSize: 14,
			external_container_queueFontFamily: '"Open Sans", sans-serif',
			external_container_queueFontWeight: "normal",
			componentFontSize: 14,
			componentFontFamily: '"Open Sans", sans-serif',
			componentFontWeight: "normal",
			external_componentFontSize: 14,
			external_componentFontFamily: '"Open Sans", sans-serif',
			external_componentFontWeight: "normal",
			component_dbFontSize: 14,
			component_dbFontFamily: '"Open Sans", sans-serif',
			component_dbFontWeight: "normal",
			external_component_dbFontSize: 14,
			external_component_dbFontFamily: '"Open Sans", sans-serif',
			external_component_dbFontWeight: "normal",
			component_queueFontSize: 14,
			component_queueFontFamily: '"Open Sans", sans-serif',
			component_queueFontWeight: "normal",
			external_component_queueFontSize: 14,
			external_component_queueFontFamily: '"Open Sans", sans-serif',
			external_component_queueFontWeight: "normal",
			wrap: !0,
			wrapPadding: 10,
			person_bg_color: "#08427B",
			person_border_color: "#073B6F",
			external_person_bg_color: "#686868",
			external_person_border_color: "#8A8A8A",
			system_bg_color: "#1168BD",
			system_border_color: "#3C7FC0",
			system_db_bg_color: "#1168BD",
			system_db_border_color: "#3C7FC0",
			system_queue_bg_color: "#1168BD",
			system_queue_border_color: "#3C7FC0",
			external_system_bg_color: "#999999",
			external_system_border_color: "#8A8A8A",
			external_system_db_bg_color: "#999999",
			external_system_db_border_color: "#8A8A8A",
			external_system_queue_bg_color: "#999999",
			external_system_queue_border_color: "#8A8A8A",
			container_bg_color: "#438DD5",
			container_border_color: "#3C7FC0",
			container_db_bg_color: "#438DD5",
			container_db_border_color: "#3C7FC0",
			container_queue_bg_color: "#438DD5",
			container_queue_border_color: "#3C7FC0",
			external_container_bg_color: "#B3B3B3",
			external_container_border_color: "#A6A6A6",
			external_container_db_bg_color: "#B3B3B3",
			external_container_db_border_color: "#A6A6A6",
			external_container_queue_bg_color: "#B3B3B3",
			external_container_queue_border_color: "#A6A6A6",
			component_bg_color: "#85BBF0",
			component_border_color: "#78A8D8",
			component_db_bg_color: "#85BBF0",
			component_db_border_color: "#78A8D8",
			component_queue_bg_color: "#85BBF0",
			component_queue_border_color: "#78A8D8",
			external_component_bg_color: "#CCCCCC",
			external_component_border_color: "#BFBFBF",
			external_component_db_bg_color: "#CCCCCC",
			external_component_db_border_color: "#BFBFBF",
			external_component_queue_bg_color: "#CCCCCC",
			external_component_queue_border_color: "#BFBFBF",
		},
		sankey: {
			useMaxWidth: !0,
			width: 600,
			height: 400,
			linkColor: "gradient",
			nodeAlignment: "justify",
			showValues: !0,
			prefix: "",
			suffix: "",
		},
		block: { useMaxWidth: !0, padding: 8 },
		theme: "default",
		maxTextSize: 5e4,
		maxEdges: 500,
		darkMode: !1,
		fontFamily: '"trebuchet ms", verdana, arial, sans-serif;',
		logLevel: 5,
		securityLevel: "strict",
		startOnLoad: !0,
		arrowMarkerAbsolute: !1,
		secure: [
			"secure",
			"securityLevel",
			"startOnLoad",
			"maxTextSize",
			"maxEdges",
		],
		legacyMathML: !1,
		deterministicIds: !1,
		fontSize: 16,
	},
	Dm = {
		...$e,
		deterministicIDSeed: void 0,
		themeCSS: void 0,
		themeVariables: qe.default.getThemeVariables(),
		sequence: {
			...$e.sequence,
			messageFont: function () {
				return {
					fontFamily: this.messageFontFamily,
					fontSize: this.messageFontSize,
					fontWeight: this.messageFontWeight,
				};
			},
			noteFont: function () {
				return {
					fontFamily: this.noteFontFamily,
					fontSize: this.noteFontSize,
					fontWeight: this.noteFontWeight,
				};
			},
			actorFont: function () {
				return {
					fontFamily: this.actorFontFamily,
					fontSize: this.actorFontSize,
					fontWeight: this.actorFontWeight,
				};
			},
		},
		gantt: { ...$e.gantt, tickInterval: void 0, useWidth: void 0 },
		c4: {
			...$e.c4,
			useWidth: void 0,
			personFont: function () {
				return {
					fontFamily: this.personFontFamily,
					fontSize: this.personFontSize,
					fontWeight: this.personFontWeight,
				};
			},
			external_personFont: function () {
				return {
					fontFamily: this.external_personFontFamily,
					fontSize: this.external_personFontSize,
					fontWeight: this.external_personFontWeight,
				};
			},
			systemFont: function () {
				return {
					fontFamily: this.systemFontFamily,
					fontSize: this.systemFontSize,
					fontWeight: this.systemFontWeight,
				};
			},
			external_systemFont: function () {
				return {
					fontFamily: this.external_systemFontFamily,
					fontSize: this.external_systemFontSize,
					fontWeight: this.external_systemFontWeight,
				};
			},
			system_dbFont: function () {
				return {
					fontFamily: this.system_dbFontFamily,
					fontSize: this.system_dbFontSize,
					fontWeight: this.system_dbFontWeight,
				};
			},
			external_system_dbFont: function () {
				return {
					fontFamily: this.external_system_dbFontFamily,
					fontSize: this.external_system_dbFontSize,
					fontWeight: this.external_system_dbFontWeight,
				};
			},
			system_queueFont: function () {
				return {
					fontFamily: this.system_queueFontFamily,
					fontSize: this.system_queueFontSize,
					fontWeight: this.system_queueFontWeight,
				};
			},
			external_system_queueFont: function () {
				return {
					fontFamily: this.external_system_queueFontFamily,
					fontSize: this.external_system_queueFontSize,
					fontWeight: this.external_system_queueFontWeight,
				};
			},
			containerFont: function () {
				return {
					fontFamily: this.containerFontFamily,
					fontSize: this.containerFontSize,
					fontWeight: this.containerFontWeight,
				};
			},
			external_containerFont: function () {
				return {
					fontFamily: this.external_containerFontFamily,
					fontSize: this.external_containerFontSize,
					fontWeight: this.external_containerFontWeight,
				};
			},
			container_dbFont: function () {
				return {
					fontFamily: this.container_dbFontFamily,
					fontSize: this.container_dbFontSize,
					fontWeight: this.container_dbFontWeight,
				};
			},
			external_container_dbFont: function () {
				return {
					fontFamily: this.external_container_dbFontFamily,
					fontSize: this.external_container_dbFontSize,
					fontWeight: this.external_container_dbFontWeight,
				};
			},
			container_queueFont: function () {
				return {
					fontFamily: this.container_queueFontFamily,
					fontSize: this.container_queueFontSize,
					fontWeight: this.container_queueFontWeight,
				};
			},
			external_container_queueFont: function () {
				return {
					fontFamily: this.external_container_queueFontFamily,
					fontSize: this.external_container_queueFontSize,
					fontWeight: this.external_container_queueFontWeight,
				};
			},
			componentFont: function () {
				return {
					fontFamily: this.componentFontFamily,
					fontSize: this.componentFontSize,
					fontWeight: this.componentFontWeight,
				};
			},
			external_componentFont: function () {
				return {
					fontFamily: this.external_componentFontFamily,
					fontSize: this.external_componentFontSize,
					fontWeight: this.external_componentFontWeight,
				};
			},
			component_dbFont: function () {
				return {
					fontFamily: this.component_dbFontFamily,
					fontSize: this.component_dbFontSize,
					fontWeight: this.component_dbFontWeight,
				};
			},
			external_component_dbFont: function () {
				return {
					fontFamily: this.external_component_dbFontFamily,
					fontSize: this.external_component_dbFontSize,
					fontWeight: this.external_component_dbFontWeight,
				};
			},
			component_queueFont: function () {
				return {
					fontFamily: this.component_queueFontFamily,
					fontSize: this.component_queueFontSize,
					fontWeight: this.component_queueFontWeight,
				};
			},
			external_component_queueFont: function () {
				return {
					fontFamily: this.external_component_queueFontFamily,
					fontSize: this.external_component_queueFontSize,
					fontWeight: this.external_component_queueFontWeight,
				};
			},
			boundaryFont: function () {
				return {
					fontFamily: this.boundaryFontFamily,
					fontSize: this.boundaryFontSize,
					fontWeight: this.boundaryFontWeight,
				};
			},
			messageFont: function () {
				return {
					fontFamily: this.messageFontFamily,
					fontSize: this.messageFontSize,
					fontWeight: this.messageFontWeight,
				};
			},
		},
		pie: { ...$e.pie, useWidth: 984 },
		xyChart: { ...$e.xyChart, useWidth: void 0 },
		requirement: { ...$e.requirement, useWidth: void 0 },
		gitGraph: { ...$e.gitGraph, useMaxWidth: !1 },
		sankey: { ...$e.sankey, useMaxWidth: !1 },
	},
	Nm = (t, e = "") =>
		Object.keys(t).reduce(
			(r, i) =>
				Array.isArray(t[i])
					? r
					: typeof t[i] == "object" && t[i] !== null
						? [...r, e + i, ...Nm(t[i], "")]
						: [...r, e + i],
			[],
		),
	Vv = new Set(Nm(Dm, "")),
	Xv = Dm,
	pa = (t) => {
		if (
			(X.debug("sanitizeDirective called with", t),
			!(typeof t != "object" || t == null))
		) {
			if (Array.isArray(t)) {
				t.forEach((e) => pa(e));
				return;
			}
			for (let e of Object.keys(t)) {
				if (
					(X.debug("Checking key", e),
					e.startsWith("__") ||
						e.includes("proto") ||
						e.includes("constr") ||
						!Vv.has(e) ||
						t[e] == null)
				) {
					X.debug("sanitize deleting key: ", e), delete t[e];
					continue;
				}
				if (typeof t[e] == "object") {
					X.debug("sanitizing object", e), pa(t[e]);
					continue;
				}
				let r = ["themeCSS", "fontFamily", "altFontFamily"];
				for (let i of r)
					e.includes(i) &&
						(X.debug("sanitizing css option", e), (t[e] = Kv(t[e])));
			}
			if (t.themeVariables)
				for (let e of Object.keys(t.themeVariables)) {
					let r = t.themeVariables[e];
					r?.match &&
						!r.match(/^[\d "#%(),.;A-Za-z]+$/) &&
						(t.themeVariables[e] = "");
				}
			X.debug("After sanitization", t);
		}
	},
	Kv = (t) => {
		let e = 0,
			r = 0;
		for (let i of t) {
			if (e < r) return "{ /* ERROR: Unbalanced CSS */ }";
			i === "{" ? e++ : i === "}" && r++;
		}
		return e !== r ? "{ /* ERROR: Unbalanced CSS */ }" : t;
	},
	Rm = /^-{3}\s*[\n\r](.*?)[\n\r]-{3}\s*[\n\r]+/s,
	So =
		/%{2}{\s*(?:(\w+)\s*:|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi,
	Zv = /\s*%%.*\n/gm,
	da = class extends Error {
		constructor(e) {
			super(e), (this.name = "UnknownDiagramError");
		}
	},
	Bi = {},
	wa = function (t, e) {
		t = t
			.replace(Rm, "")
			.replace(So, "")
			.replace(
				Zv,
				`
`,
			);
		for (let [r, { detector: i }] of Object.entries(Bi)) if (i(t, e)) return r;
		throw new da(
			`No diagram type detected matching given configuration for text: ${t}`,
		);
	},
	Pm = (...t) => {
		for (let { id: e, detector: r, loader: i } of t) $m(e, r, i);
	},
	$m = (t, e, r) => {
		Bi[t]
			? X.error(`Detector with key ${t} already exists`)
			: (Bi[t] = { detector: e, loader: r }),
			X.debug(`Detector with key ${t} added${r ? " with loader" : ""}`);
	},
	Qv = (t) => Bi[t].loader,
	Nl = (t, e, { depth: r = 2, clobber: i = !1 } = {}) => {
		let o = { depth: r, clobber: i };
		return Array.isArray(e) && !Array.isArray(t)
			? (e.forEach((n) => Nl(t, n, o)), t)
			: Array.isArray(e) && Array.isArray(t)
				? (e.forEach((n) => {
						t.includes(n) || t.push(n);
					}),
					t)
				: t === void 0 || r <= 0
					? t != null && typeof t == "object" && typeof e == "object"
						? Object.assign(t, e)
						: e
					: (e !== void 0 &&
							typeof t == "object" &&
							typeof e == "object" &&
							Object.keys(e).forEach((n) => {
								typeof e[n] == "object" &&
								(t[n] === void 0 || typeof t[n] == "object")
									? (t[n] === void 0 && (t[n] = Array.isArray(e[n]) ? [] : {}),
										(t[n] = Nl(t[n], e[n], { depth: r - 1, clobber: i })))
									: (i ||
											(typeof t[n] != "object" && typeof e[n] != "object")) &&
										(t[n] = e[n]);
							}),
						t);
	},
	Nt = Nl,
	Jv = "\u200B",
	tk = {
		curveBasis: Us,
		curveBasisClosed: js,
		curveBasisOpen: Gs,
		curveBumpX: Hs,
		curveBumpY: Ys,
		curveBundle: Vs,
		curveCardinalClosed: Ks,
		curveCardinalOpen: Zs,
		curveCardinal: Xs,
		curveCatmullRomClosed: Js,
		curveCatmullRomOpen: tl,
		curveCatmullRom: Qs,
		curveLinear: io,
		curveLinearClosed: el,
		curveMonotoneX: il,
		curveMonotoneY: ol,
		curveNatural: nl,
		curveStep: al,
		curveStepAfter: ll,
		curveStepBefore: sl,
	},
	ek =
		/\s*(?:(\w+)(?=:):|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi,
	rk = function (t, e) {
		let r = zm(t, /(?:init\b)|(?:initialize\b)/),
			i = {};
		if (Array.isArray(r)) {
			let a = r.map((l) => l.args);
			pa(a), (i = Nt(i, [...a]));
		} else i = r.args;
		if (!i) return;
		let o = wa(t, e),
			n = "config";
		return (
			i[n] !== void 0 &&
				(o === "flowchart-v2" && (o = "flowchart"), (i[o] = i[n]), delete i[n]),
			i
		);
	},
	zm = function (t, e = null) {
		try {
			let r = new RegExp(
				`[%]{2}(?![{]${ek.source})(?=[}][%]{2}).*
`,
				"ig",
			);
			(t = t.trim().replace(r, "").replace(/'/gm, '"')),
				X.debug(
					`Detecting diagram directive${e !== null ? " type:" + e : ""} based on the text:${t}`,
				);
			let i,
				o = [];
			for (; (i = So.exec(t)) !== null; )
				if (
					(i.index === So.lastIndex && So.lastIndex++,
					(i && !e) ||
						(e && i[1] && i[1].match(e)) ||
						(e && i[2] && i[2].match(e)))
				) {
					let n = i[1] ? i[1] : i[2],
						a = i[3] ? i[3].trim() : i[4] ? JSON.parse(i[4].trim()) : null;
					o.push({ type: n, args: a });
				}
			return o.length === 0
				? { type: t, args: null }
				: o.length === 1
					? o[0]
					: o;
		} catch (r) {
			return (
				X.error(
					`ERROR: ${r.message} - Unable to parse directive type: '${e}' based on the text: '${t}'`,
				),
				{ type: void 0, args: null }
			);
		}
	},
	ik = function (t) {
		return t.replace(So, "");
	},
	ok = function (t, e) {
		for (let [r, i] of e.entries()) if (i.match(t)) return r;
		return -1;
	};
function nk(t, e) {
	if (!t) return e;
	let r = `curve${t.charAt(0).toUpperCase() + t.slice(1)}`;
	return tk[r] ?? e;
}
function ak(t, e) {
	let r = t.trim();
	if (r) return e.securityLevel !== "loose" ? (0, Mm.sanitizeUrl)(r) : r;
}
var sk = (t, ...e) => {
	let r = t.split("."),
		i = r.length - 1,
		o = r[i],
		n = window;
	for (let a = 0; a < i; a++)
		if (((n = n[r[a]]), !n)) {
			X.error(`Function name: ${t} not found in window`);
			return;
		}
	n[o](...e);
};
function qm(t, e) {
	return !t || !e
		? 0
		: Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
function lk(t) {
	let e,
		r = 0;
	t.forEach((o) => {
		(r += qm(o, e)), (e = o);
	});
	let i = r / 2;
	return Wl(t, i);
}
function ck(t) {
	return t.length === 1 ? t[0] : lk(t);
}
var dm = (t, e = 2) => {
		let r = Math.pow(10, e);
		return Math.round(t * r) / r;
	},
	Wl = (t, e) => {
		let r,
			i = e;
		for (let o of t) {
			if (r) {
				let n = qm(o, r);
				if (n < i) i -= n;
				else {
					let a = i / n;
					if (a <= 0) return r;
					if (a >= 1) return { x: o.x, y: o.y };
					if (a > 0 && a < 1)
						return {
							x: dm((1 - a) * r.x + a * o.x, 5),
							y: dm((1 - a) * r.y + a * o.y, 5),
						};
				}
			}
			r = o;
		}
		throw new Error("Could not find a suitable point for the given distance");
	},
	uk = (t, e, r) => {
		X.info(`our points ${JSON.stringify(e)}`), e[0] !== r && (e = e.reverse());
		let o = Wl(e, 25),
			n = t ? 10 : 5,
			a = Math.atan2(e[0].y - o.y, e[0].x - o.x),
			l = { x: 0, y: 0 };
		return (
			(l.x = Math.sin(a) * n + (e[0].x + o.x) / 2),
			(l.y = -Math.cos(a) * n + (e[0].y + o.y) / 2),
			l
		);
	};
function hk(t, e, r) {
	let i = structuredClone(r);
	X.info("our points", i),
		e !== "start_left" && e !== "start_right" && i.reverse();
	let o = 25 + t,
		n = Wl(i, o),
		a = 10 + t * 0.5,
		l = Math.atan2(i[0].y - n.y, i[0].x - n.x),
		c = { x: 0, y: 0 };
	return (
		e === "start_left"
			? ((c.x = Math.sin(l + Math.PI) * a + (i[0].x + n.x) / 2),
				(c.y = -Math.cos(l + Math.PI) * a + (i[0].y + n.y) / 2))
			: e === "end_right"
				? ((c.x = Math.sin(l - Math.PI) * a + (i[0].x + n.x) / 2 - 5),
					(c.y = -Math.cos(l - Math.PI) * a + (i[0].y + n.y) / 2 - 5))
				: e === "end_left"
					? ((c.x = Math.sin(l) * a + (i[0].x + n.x) / 2 - 5),
						(c.y = -Math.cos(l) * a + (i[0].y + n.y) / 2 - 5))
					: ((c.x = Math.sin(l) * a + (i[0].x + n.x) / 2),
						(c.y = -Math.cos(l) * a + (i[0].y + n.y) / 2)),
		c
	);
}
function fk(t) {
	let e = "",
		r = "";
	for (let i of t)
		i !== void 0 &&
			(i.startsWith("color:") || i.startsWith("text-align:")
				? (r = r + i + ";")
				: (e = e + i + ";"));
	return { style: e, labelStyle: r };
}
var mm = 0,
	pk = () => (
		mm++, "id-" + Math.random().toString(36).substr(2, 12) + "-" + mm
	);
function dk(t) {
	let e = "",
		r = "0123456789abcdef",
		i = r.length;
	for (let o = 0; o < t; o++) e += r.charAt(Math.floor(Math.random() * i));
	return e;
}
var mk = (t) => dk(t.length),
	gk = function () {
		return {
			x: 0,
			y: 0,
			fill: void 0,
			anchor: "start",
			style: "#666",
			width: 100,
			height: 100,
			textMargin: 0,
			rx: 0,
			ry: 0,
			valign: void 0,
			text: "",
		};
	},
	xk = function (t, e) {
		let r = e.text.replace(ql.lineBreakRegex, " "),
			[, i] = Hl(e.fontSize),
			o = t.append("text");
		o.attr("x", e.x),
			o.attr("y", e.y),
			o.style("text-anchor", e.anchor),
			o.style("font-family", e.fontFamily),
			o.style("font-size", i),
			o.style("font-weight", e.fontWeight),
			o.attr("fill", e.fill),
			e.class !== void 0 && o.attr("class", e.class);
		let n = o.append("tspan");
		return (
			n.attr("x", e.x + e.textMargin * 2), n.attr("fill", e.fill), n.text(r), o
		);
	},
	yk = Un(
		(t, e, r) => {
			if (
				!t ||
				((r = Object.assign(
					{
						fontSize: 12,
						fontWeight: 400,
						fontFamily: "Arial",
						joinWith: "<br/>",
					},
					r,
				)),
				ql.lineBreakRegex.test(t))
			)
				return t;
			let i = t.split(" "),
				o = [],
				n = "";
			return (
				i.forEach((a, l) => {
					let c = ma(`${a} `, r),
						u = ma(n, r);
					if (c > e) {
						let { hyphenatedStrings: h, remainingWord: m } = _k(a, e, "-", r);
						o.push(n, ...h), (n = m);
					} else
						u + c >= e
							? (o.push(n), (n = a))
							: (n = [n, a].filter(Boolean).join(" "));
					l + 1 === i.length && o.push(n);
				}),
				o.filter((a) => a !== "").join(r.joinWith)
			);
		},
		(t, e, r) =>
			`${t}${e}${r.fontSize}${r.fontWeight}${r.fontFamily}${r.joinWith}`,
	),
	_k = Un(
		(t, e, r = "-", i) => {
			i = Object.assign(
				{ fontSize: 12, fontWeight: 400, fontFamily: "Arial", margin: 0 },
				i,
			);
			let o = [...t],
				n = [],
				a = "";
			return (
				o.forEach((l, c) => {
					let u = `${a}${l}`;
					if (ma(u, i) >= e) {
						let d = c + 1,
							h = o.length === d,
							m = `${u}${r}`;
						n.push(h ? u : m), (a = "");
					} else a = u;
				}),
				{ hyphenatedStrings: n, remainingWord: a }
			);
		},
		(t, e, r = "-", i) =>
			`${t}${e}${r}${i.fontSize}${i.fontWeight}${i.fontFamily}`,
	);
function Ck(t, e) {
	return Ul(t, e).height;
}
function ma(t, e) {
	return Ul(t, e).width;
}
var Ul = Un(
		(t, e) => {
			let {
				fontSize: r = 12,
				fontFamily: i = "Arial",
				fontWeight: o = 400,
			} = e;
			if (!t) return { width: 0, height: 0 };
			let [, n] = Hl(r),
				a = ["sans-serif", i],
				l = t.split(ql.lineBreakRegex),
				c = [],
				u = Vt("body");
			if (!u.remove) return { width: 0, height: 0, lineHeight: 0 };
			let p = u.append("svg");
			for (let h of a) {
				let m = 0,
					_ = { width: 0, height: 0, lineHeight: 0 };
				for (let b of l) {
					let v = gk();
					v.text = b || Jv;
					let F = xk(p, v)
							.style("font-size", n)
							.style("font-weight", o)
							.style("font-family", h),
						T = (F._groups || F)[0][0].getBBox();
					if (T.width === 0 && T.height === 0)
						throw new Error("svg element not in render tree");
					(_.width = Math.round(Math.max(_.width, T.width))),
						(m = Math.round(T.height)),
						(_.height += m),
						(_.lineHeight = Math.round(Math.max(_.lineHeight, m)));
				}
				c.push(_);
			}
			p.remove();
			let d =
				isNaN(c[1].height) ||
				isNaN(c[1].width) ||
				isNaN(c[1].lineHeight) ||
				(c[0].height > c[1].height &&
					c[0].width > c[1].width &&
					c[0].lineHeight > c[1].lineHeight)
					? 0
					: 1;
			return c[d];
		},
		(t, e) => `${t}${e.fontSize}${e.fontWeight}${e.fontFamily}`,
	),
	Rl = class {
		constructor(e = !1, r) {
			(this.count = 0),
				(this.count = r ? r.length : 0),
				(this.next = e ? () => this.count++ : () => Date.now());
		}
	},
	ha,
	bk = function (t) {
		return (
			(ha = ha || document.createElement("div")),
			(t = escape(t)
				.replace(/%26/g, "&")
				.replace(/%23/g, "#")
				.replace(/%3B/g, ";")),
			(ha.innerHTML = t),
			unescape(ha.textContent)
		);
	};
function Wm(t) {
	return "str" in t;
}
var Tk = (t, e, r, i) => {
		var o;
		if (!i) return;
		let n = (o = t.node()) == null ? void 0 : o.getBBox();
		n &&
			t
				.append("text")
				.text(i)
				.attr("x", n.x + n.width / 2)
				.attr("y", -r)
				.attr("class", e);
	},
	Hl = (t) => {
		if (typeof t == "number") return [t, t + "px"];
		let e = parseInt(t ?? "", 10);
		return Number.isNaN(e)
			? [void 0, void 0]
			: t === String(e)
				? [e, t + "px"]
				: [e, t];
	};
function Um(t, e) {
	return Pd({}, t, e);
}
var wo = {
		assignWithDepth: Nt,
		wrapLabel: yk,
		calculateTextHeight: Ck,
		calculateTextWidth: ma,
		calculateTextDimensions: Ul,
		cleanAndMerge: Um,
		detectInit: rk,
		detectDirective: zm,
		isSubstringInArray: ok,
		interpolateToCurve: nk,
		calcLabelPosition: ck,
		calcCardinalityPosition: uk,
		calcTerminalLabelPosition: hk,
		formatUrl: ak,
		getStylesFromArray: fk,
		generateId: pk,
		random: mk,
		runFunc: sk,
		entityDecode: bk,
		insertTitle: Tk,
		parseFontSize: Hl,
		InitIDGenerator: Rl,
	},
	vk = function (t) {
		let e = t;
		return (
			(e = e.replace(/style.*:\S*#.*;/g, function (r) {
				return r.substring(0, r.length - 1);
			})),
			(e = e.replace(/classDef.*:\S*#.*;/g, function (r) {
				return r.substring(0, r.length - 1);
			})),
			(e = e.replace(/#\w+;/g, function (r) {
				let i = r.substring(1, r.length - 1);
				return /^\+?\d+$/.test(i)
					? "\uFB02\xB0\xB0" + i + "\xB6\xDF"
					: "\uFB02\xB0" + i + "\xB6\xDF";
			})),
			e
		);
	},
	kk = function (t) {
		return t.replace(/ﬂ°°/g, "&#").replace(/ﬂ°/g, "&").replace(/¶ß/g, ";");
	},
	gm = "10.9.3",
	Fi = Object.freeze(Xv),
	Zt = Nt({}, Fi),
	Hm,
	Li = [],
	Ao = Nt({}, Fi),
	Aa = (t, e) => {
		let r = Nt({}, t),
			i = {};
		for (let o of e) Gm(o), (i = Nt(i, o));
		if (((r = Nt(r, i)), i.theme && i.theme in qe)) {
			let o = Nt({}, Hm),
				n = Nt(o.themeVariables || {}, i.themeVariables);
			r.theme &&
				r.theme in qe &&
				(r.themeVariables = qe[r.theme].getThemeVariables(n));
		}
		return (Ao = r), Vm(Ao), Ao;
	},
	Sk = (t) => (
		(Zt = Nt({}, Fi)),
		(Zt = Nt(Zt, t)),
		t.theme &&
			qe[t.theme] &&
			(Zt.themeVariables = qe[t.theme].getThemeVariables(t.themeVariables)),
		Aa(Zt, Li),
		Zt
	),
	wk = (t) => {
		Hm = Nt({}, t);
	},
	Ak = (t) => ((Zt = Nt(Zt, t)), Aa(Zt, Li), Zt),
	Ym = () => Nt({}, Zt),
	jm = (t) => (Vm(t), Nt(Ao, t), Te()),
	Te = () => Nt({}, Ao),
	Gm = (t) => {
		t &&
			(["secure", ...(Zt.secure ?? [])].forEach((e) => {
				Object.hasOwn(t, e) &&
					(X.debug(`Denied attempt to modify a secure key ${e}`, t[e]),
					delete t[e]);
			}),
			Object.keys(t).forEach((e) => {
				e.startsWith("__") && delete t[e];
			}),
			Object.keys(t).forEach((e) => {
				typeof t[e] == "string" &&
					(t[e].includes("<") ||
						t[e].includes(">") ||
						t[e].includes("url(data:")) &&
					delete t[e],
					typeof t[e] == "object" && Gm(t[e]);
			}));
	},
	Bk = (t) => {
		pa(t),
			t.fontFamily &&
				(!t.themeVariables || !t.themeVariables.fontFamily) &&
				(t.themeVariables = { fontFamily: t.fontFamily }),
			Li.push(t),
			Aa(Zt, Li);
	},
	ga = (t = Zt) => {
		(Li = []), Aa(t, Li);
	},
	Fk = {
		LAZY_LOAD_DEPRECATED:
			"The configuration options lazyLoadedDiagrams and loadExternalDiagramsAtStartup are deprecated. Please use registerExternalDiagrams instead.",
	},
	xm = {},
	Lk = (t) => {
		xm[t] || (X.warn(Fk[t]), (xm[t] = !0));
	},
	Vm = (t) => {
		t &&
			(t.lazyLoadedDiagrams || t.loadExternalDiagramsAtStartup) &&
			Lk("LAZY_LOAD_DEPRECATED");
	},
	Xm = "c4",
	Mk = (t) =>
		/^\s*C4Context|C4Container|C4Component|C4Dynamic|C4Deployment/.test(t),
	Ek = async () => {
		let { diagram: t } = await import("./c4Diagram-3d4e48cf-GWXJYM3X.js");
		return { id: Xm, diagram: t };
	},
	Ok = { id: Xm, detector: Mk, loader: Ek },
	Ik = Ok,
	Km = "flowchart",
	Dk = (t, e) => {
		var r, i;
		return ((r = e?.flowchart) == null ? void 0 : r.defaultRenderer) ===
			"dagre-wrapper" ||
			((i = e?.flowchart) == null ? void 0 : i.defaultRenderer) === "elk"
			? !1
			: /^\s*graph/.test(t);
	},
	Nk = async () => {
		let { diagram: t } = await import("./flowDiagram-66a62f08-53XGD2UC.js");
		return { id: Km, diagram: t };
	},
	Rk = { id: Km, detector: Dk, loader: Nk },
	Pk = Rk,
	Zm = "flowchart-v2",
	$k = (t, e) => {
		var r, i, o;
		return ((r = e?.flowchart) == null ? void 0 : r.defaultRenderer) ===
			"dagre-d3" ||
			((i = e?.flowchart) == null ? void 0 : i.defaultRenderer) === "elk"
			? !1
			: /^\s*graph/.test(t) &&
					((o = e?.flowchart) == null ? void 0 : o.defaultRenderer) ===
						"dagre-wrapper"
				? !0
				: /^\s*flowchart/.test(t);
	},
	zk = async () => {
		let { diagram: t } = await import("./flowDiagram-v2-96b9c2cf-QP4VXMCE.js");
		return { id: Zm, diagram: t };
	},
	qk = { id: Zm, detector: $k, loader: zk },
	Wk = qk,
	Qm = "er",
	Uk = (t) => /^\s*erDiagram/.test(t),
	Hk = async () => {
		let { diagram: t } = await import("./erDiagram-9861fffd-PL4E2VQG.js");
		return { id: Qm, diagram: t };
	},
	Yk = { id: Qm, detector: Uk, loader: Hk },
	jk = Yk,
	Jm = "gitGraph",
	Gk = (t) => /^\s*gitGraph/.test(t),
	Vk = async () => {
		let { diagram: t } = await import("./gitGraphDiagram-72cf32ee-DFTP2VEU.js");
		return { id: Jm, diagram: t };
	},
	Xk = { id: Jm, detector: Gk, loader: Vk },
	Kk = Xk,
	tg = "gantt",
	Zk = (t) => /^\s*gantt/.test(t),
	Qk = async () => {
		let { diagram: t } = await import("./ganttDiagram-c361ad54-T4G6RD6M.js");
		return { id: tg, diagram: t };
	},
	Jk = { id: tg, detector: Zk, loader: Qk },
	tS = Jk,
	eg = "info",
	eS = (t) => /^\s*info/.test(t),
	rS = async () => {
		let { diagram: t } = await import("./infoDiagram-f8f76790-HEEOUZYR.js");
		return { id: eg, diagram: t };
	},
	iS = { id: eg, detector: eS, loader: rS },
	rg = "pie",
	oS = (t) => /^\s*pie/.test(t),
	nS = async () => {
		let { diagram: t } = await import("./pieDiagram-8a3498a8-OEVJQC36.js");
		return { id: rg, diagram: t };
	},
	aS = { id: rg, detector: oS, loader: nS },
	ig = "quadrantChart",
	sS = (t) => /^\s*quadrantChart/.test(t),
	lS = async () => {
		let { diagram: t } = await import("./quadrantDiagram-120e2f19-EBQU7QMR.js");
		return { id: ig, diagram: t };
	},
	cS = { id: ig, detector: sS, loader: lS },
	uS = cS,
	og = "xychart",
	hS = (t) => /^\s*xychart-beta/.test(t),
	fS = async () => {
		let { diagram: t } = await import("./xychartDiagram-e933f94c-XCCM5CDL.js");
		return { id: og, diagram: t };
	},
	pS = { id: og, detector: hS, loader: fS },
	dS = pS,
	ng = "requirement",
	mS = (t) => /^\s*requirement(Diagram)?/.test(t),
	gS = async () => {
		let { diagram: t } = await import(
			"./requirementDiagram-deff3bca-3H7VHSX2.js"
		);
		return { id: ng, diagram: t };
	},
	xS = { id: ng, detector: mS, loader: gS },
	yS = xS,
	ag = "sequence",
	_S = (t) => /^\s*sequenceDiagram/.test(t),
	CS = async () => {
		let { diagram: t } = await import("./sequenceDiagram-704730f1-Z72EPO3Q.js");
		return { id: ag, diagram: t };
	},
	bS = { id: ag, detector: _S, loader: CS },
	TS = bS,
	sg = "class",
	vS = (t, e) => {
		var r;
		return ((r = e?.class) == null ? void 0 : r.defaultRenderer) ===
			"dagre-wrapper"
			? !1
			: /^\s*classDiagram/.test(t);
	},
	kS = async () => {
		let { diagram: t } = await import("./classDiagram-70f12bd4-RRH3N57A.js");
		return { id: sg, diagram: t };
	},
	SS = { id: sg, detector: vS, loader: kS },
	wS = SS,
	lg = "classDiagram",
	AS = (t, e) => {
		var r;
		return /^\s*classDiagram/.test(t) &&
			((r = e?.class) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper"
			? !0
			: /^\s*classDiagram-v2/.test(t);
	},
	BS = async () => {
		let { diagram: t } = await import("./classDiagram-v2-f2320105-WOYL2ARA.js");
		return { id: lg, diagram: t };
	},
	FS = { id: lg, detector: AS, loader: BS },
	LS = FS,
	cg = "state",
	MS = (t, e) => {
		var r;
		return ((r = e?.state) == null ? void 0 : r.defaultRenderer) ===
			"dagre-wrapper"
			? !1
			: /^\s*stateDiagram/.test(t);
	},
	ES = async () => {
		let { diagram: t } = await import("./stateDiagram-587899a1-7BLZ7EZK.js");
		return { id: cg, diagram: t };
	},
	OS = { id: cg, detector: MS, loader: ES },
	IS = OS,
	ug = "stateDiagram",
	DS = (t, e) => {
		var r;
		return !!(
			/^\s*stateDiagram-v2/.test(t) ||
			(/^\s*stateDiagram/.test(t) &&
				((r = e?.state) == null ? void 0 : r.defaultRenderer) ===
					"dagre-wrapper")
		);
	},
	NS = async () => {
		let { diagram: t } = await import("./stateDiagram-v2-d93cdb3a-3IPLCPT6.js");
		return { id: ug, diagram: t };
	},
	RS = { id: ug, detector: DS, loader: NS },
	PS = RS,
	hg = "journey",
	$S = (t) => /^\s*journey/.test(t),
	zS = async () => {
		let { diagram: t } = await import("./journeyDiagram-49397b02-6Q73OYMM.js");
		return { id: hg, diagram: t };
	},
	qS = { id: hg, detector: $S, loader: zS },
	WS = qS,
	US = function (t, e) {
		for (let r of e) t.attr(r[0], r[1]);
	},
	HS = function (t, e, r) {
		let i = new Map();
		return (
			r
				? (i.set("width", "100%"), i.set("style", `max-width: ${e}px;`))
				: (i.set("height", t), i.set("width", e)),
			i
		);
	},
	fg = function (t, e, r, i) {
		let o = HS(e, r, i);
		US(t, o);
	},
	YS = function (t, e, r, i) {
		let o = e.node().getBBox(),
			n = o.width,
			a = o.height;
		X.info(`SVG bounds: ${n}x${a}`, o);
		let l = 0,
			c = 0;
		X.info(`Graph bounds: ${l}x${c}`, t),
			(l = n + r * 2),
			(c = a + r * 2),
			X.info(`Calculated bounds: ${l}x${c}`),
			fg(e, c, l, i);
		let u = `${o.x - r} ${o.y - r} ${o.width + 2 * r} ${o.height + 2 * r}`;
		e.attr("viewBox", u);
	},
	fa = {},
	jS = (t, e, r) => {
		let i = "";
		return (
			t in fa && fa[t] ? (i = fa[t](r)) : X.warn(`No theme found for ${t}`),
			` & {
    font-family: ${r.fontFamily};
    font-size: ${r.fontSize};
    fill: ${r.textColor}
  }

  /* Classes common for multiple diagrams */

  & .error-icon {
    fill: ${r.errorBkgColor};
  }
  & .error-text {
    fill: ${r.errorTextColor};
    stroke: ${r.errorTextColor};
  }

  & .edge-thickness-normal {
    stroke-width: 2px;
  }
  & .edge-thickness-thick {
    stroke-width: 3.5px
  }
  & .edge-pattern-solid {
    stroke-dasharray: 0;
  }

  & .edge-pattern-dashed{
    stroke-dasharray: 3;
  }
  .edge-pattern-dotted {
    stroke-dasharray: 2;
  }

  & .marker {
    fill: ${r.lineColor};
    stroke: ${r.lineColor};
  }
  & .marker.cross {
    stroke: ${r.lineColor};
  }

  & svg {
    font-family: ${r.fontFamily};
    font-size: ${r.fontSize};
  }

  ${i}

  ${e}
`
		);
	},
	GS = (t, e) => {
		e !== void 0 && (fa[t] = e);
	},
	VS = jS,
	Yl = "",
	jl = "",
	Gl = "",
	Vl = (t) => Bo(t, Te()),
	XS = () => {
		(Yl = ""), (Gl = ""), (jl = "");
	},
	KS = (t) => {
		Yl = Vl(t).replace(/^\s+/g, "");
	},
	ZS = () => Yl,
	QS = (t) => {
		Gl = Vl(t).replace(
			/\n\s+/g,
			`
`,
		);
	},
	JS = () => Gl,
	tw = (t) => {
		jl = Vl(t);
	},
	ew = () => jl,
	rw = Object.freeze(
		Object.defineProperty(
			{
				__proto__: null,
				clear: XS,
				getAccDescription: JS,
				getAccTitle: ZS,
				getDiagramTitle: ew,
				setAccDescription: QS,
				setAccTitle: KS,
				setDiagramTitle: tw,
			},
			Symbol.toStringTag,
			{ value: "Module" },
		),
	),
	iw = X,
	ow = zl,
	Xl = Te,
	XY = jm,
	KY = Fi,
	nw = (t) => Bo(t, Xl()),
	aw = YS,
	sw = () => rw,
	xa = {},
	ya = (t, e, r) => {
		var i;
		if (xa[t]) throw new Error(`Diagram ${t} already registered.`);
		(xa[t] = e),
			r && $m(t, r),
			GS(t, e.styles),
			(i = e.injectUtils) == null ||
				i.call(e, iw, ow, Xl, nw, aw, sw(), () => {});
	},
	Kl = (t) => {
		if (t in xa) return xa[t];
		throw new Pl(t);
	},
	Pl = class extends Error {
		constructor(e) {
			super(`Diagram ${e} not found.`);
		}
	},
	lw = (t) => {
		var e;
		let { securityLevel: r } = Xl(),
			i = Vt("body");
		if (r === "sandbox") {
			let a =
				((e = Vt(`#i${t}`).node()) == null ? void 0 : e.contentDocument) ??
				document;
			i = Vt(a.body);
		}
		return i.select(`#${t}`);
	},
	cw = (t, e, r) => {
		X.debug(`rendering svg for syntax error
`);
		let i = lw(e),
			o = i.append("g");
		i.attr("viewBox", "0 0 2412 512"),
			fg(i, 100, 512, !0),
			o
				.append("path")
				.attr("class", "error-icon")
				.attr(
					"d",
					"m411.313,123.313c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32-9.375,9.375-20.688-20.688c-12.484-12.5-32.766-12.5-45.25,0l-16,16c-1.261,1.261-2.304,2.648-3.31,4.051-21.739-8.561-45.324-13.426-70.065-13.426-105.867,0-192,86.133-192,192s86.133,192 192,192 192-86.133 192-192c0-24.741-4.864-48.327-13.426-70.065 1.402-1.007 2.79-2.049 4.051-3.31l16-16c12.5-12.492 12.5-32.758 0-45.25l-20.688-20.688 9.375-9.375 32.001-31.999zm-219.313,100.687c-52.938,0-96,43.063-96,96 0,8.836-7.164,16-16,16s-16-7.164-16-16c0-70.578 57.422-128 128-128 8.836,0 16,7.164 16,16s-7.164,16-16,16z",
				),
			o
				.append("path")
				.attr("class", "error-icon")
				.attr(
					"d",
					"m459.02,148.98c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l16,16c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16.001-16z",
				),
			o
				.append("path")
				.attr("class", "error-icon")
				.attr(
					"d",
					"m340.395,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16-16c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l15.999,16z",
				),
			o
				.append("path")
				.attr("class", "error-icon")
				.attr(
					"d",
					"m400,64c8.844,0 16-7.164 16-16v-32c0-8.836-7.156-16-16-16-8.844,0-16,7.164-16,16v32c0,8.836 7.156,16 16,16z",
				),
			o
				.append("path")
				.attr("class", "error-icon")
				.attr(
					"d",
					"m496,96.586h-32c-8.844,0-16,7.164-16,16 0,8.836 7.156,16 16,16h32c8.844,0 16-7.164 16-16 0-8.836-7.156-16-16-16z",
				),
			o
				.append("path")
				.attr("class", "error-icon")
				.attr(
					"d",
					"m436.98,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688l32-32c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32c-6.251,6.25-6.251,16.375-0.001,22.625z",
				),
			o
				.append("text")
				.attr("class", "error-text")
				.attr("x", 1440)
				.attr("y", 250)
				.attr("font-size", "150px")
				.style("text-anchor", "middle")
				.text("Syntax error in text"),
			o
				.append("text")
				.attr("class", "error-text")
				.attr("x", 1250)
				.attr("y", 400)
				.attr("font-size", "100px")
				.style("text-anchor", "middle")
				.text(`mermaid version ${r}`);
	},
	pg = { draw: cw },
	uw = pg,
	hw = {
		db: {},
		renderer: pg,
		parser: { parser: { yy: {} }, parse: () => {} },
	},
	fw = hw,
	dg = "flowchart-elk",
	pw = (t, e) => {
		var r;
		return !!(
			/^\s*flowchart-elk/.test(t) ||
			(/^\s*flowchart|graph/.test(t) &&
				((r = e?.flowchart) == null ? void 0 : r.defaultRenderer) === "elk")
		);
	},
	dw = async () => {
		let { diagram: t } = await import(
			"./flowchart-elk-definition-4a651766-TIOS3RGE.js"
		);
		return { id: dg, diagram: t };
	},
	mw = { id: dg, detector: pw, loader: dw },
	gw = mw,
	mg = "timeline",
	xw = (t) => /^\s*timeline/.test(t),
	yw = async () => {
		let { diagram: t } = await import(
			"./timeline-definition-85554ec2-I3BGCORO.js"
		);
		return { id: mg, diagram: t };
	},
	_w = { id: mg, detector: xw, loader: yw },
	Cw = _w,
	gg = "mindmap",
	bw = (t) => /^\s*mindmap/.test(t),
	Tw = async () => {
		let { diagram: t } = await import(
			"./mindmap-definition-fc14e90a-W43VX3F5.js"
		);
		return { id: gg, diagram: t };
	},
	vw = { id: gg, detector: bw, loader: Tw },
	kw = vw,
	xg = "sankey",
	Sw = (t) => /^\s*sankey-beta/.test(t),
	ww = async () => {
		let { diagram: t } = await import("./sankeyDiagram-04a897e0-6L4ECYH3.js");
		return { id: xg, diagram: t };
	},
	Aw = { id: xg, detector: Sw, loader: ww },
	Bw = Aw,
	yg = "block",
	Fw = (t) => /^\s*block-beta/.test(t),
	Lw = async () => {
		let { diagram: t } = await import("./blockDiagram-38ab4fdb-BZAK6O75.js");
		return { id: yg, diagram: t };
	},
	Mw = { id: yg, detector: Fw, loader: Lw },
	Ew = Mw,
	ym = !1,
	Zl = () => {
		ym ||
			((ym = !0),
			ya("error", fw, (t) => t.toLowerCase().trim() === "error"),
			ya(
				"---",
				{
					db: { clear: () => {} },
					styles: {},
					renderer: { draw: () => {} },
					parser: {
						parser: { yy: {} },
						parse: () => {
							throw new Error(
								"Diagrams beginning with --- are not valid. If you were trying to use a YAML front-matter, please ensure that you've correctly opened and closed the YAML front-matter with un-indented `---` blocks",
							);
						},
					},
					init: () => null,
				},
				(t) => t.toLowerCase().trimStart().startsWith("---"),
			),
			Pm(
				Ik,
				LS,
				wS,
				jk,
				tS,
				iS,
				aS,
				yS,
				TS,
				gw,
				Wk,
				Pk,
				kw,
				Cw,
				Kk,
				PS,
				IS,
				WS,
				uS,
				Bw,
				dS,
				Ew,
			));
	},
	_a = class {
		constructor(e, r = {}) {
			(this.text = e),
				(this.metadata = r),
				(this.type = "graph"),
				(this.text = vk(e)),
				(this.text += `
`);
			let i = Te();
			try {
				this.type = wa(e, i);
			} catch (n) {
				(this.type = "error"), (this.detectError = n);
			}
			let o = Kl(this.type);
			X.debug("Type " + this.type),
				(this.db = o.db),
				(this.renderer = o.renderer),
				(this.parser = o.parser),
				(this.parser.parser.yy = this.db),
				(this.init = o.init),
				this.parse();
		}
		parse() {
			var e, r, i, o, n;
			if (this.detectError) throw this.detectError;
			(r = (e = this.db).clear) == null || r.call(e);
			let a = Te();
			(i = this.init) == null || i.call(this, a),
				this.metadata.title &&
					((n = (o = this.db).setDiagramTitle) == null ||
						n.call(o, this.metadata.title)),
				this.parser.parse(this.text);
		}
		async render(e, r) {
			await this.renderer.draw(this.text, e, r, this);
		}
		getParser() {
			return this.parser;
		}
		getType() {
			return this.type;
		}
	},
	Ow = async (t, e = {}) => {
		let r = wa(t, Te());
		try {
			Kl(r);
		} catch {
			let o = Qv(r);
			if (!o) throw new da(`Diagram ${r} not found.`);
			let { id: n, diagram: a } = await o();
			ya(n, a);
		}
		return new _a(t, e);
	},
	_m = [],
	Iw = () => {
		_m.forEach((t) => {
			t();
		}),
			(_m = []);
	},
	Dw = "graphics-document document";
function Nw(t, e) {
	t.attr("role", Dw), e !== "" && t.attr("aria-roledescription", e);
}
function Rw(t, e, r, i) {
	if (t.insert !== void 0) {
		if (r) {
			let o = `chart-desc-${i}`;
			t.attr("aria-describedby", o),
				t.insert("desc", ":first-child").attr("id", o).text(r);
		}
		if (e) {
			let o = `chart-title-${i}`;
			t.attr("aria-labelledby", o),
				t.insert("title", ":first-child").attr("id", o).text(e);
		}
	}
}
var Pw = (t) => t.replace(/^\s*%%(?!{)[^\n]+\n?/gm, "").trimStart();
function _g(t) {
	return typeof t > "u" || t === null;
}
function $w(t) {
	return typeof t == "object" && t !== null;
}
function zw(t) {
	return Array.isArray(t) ? t : _g(t) ? [] : [t];
}
function qw(t, e) {
	var r, i, o, n;
	if (e)
		for (n = Object.keys(e), r = 0, i = n.length; r < i; r += 1)
			(o = n[r]), (t[o] = e[o]);
	return t;
}
function Ww(t, e) {
	var r = "",
		i;
	for (i = 0; i < e; i += 1) r += t;
	return r;
}
function Uw(t) {
	return t === 0 && Number.NEGATIVE_INFINITY === 1 / t;
}
var Hw = _g,
	Yw = $w,
	jw = zw,
	Gw = Ww,
	Vw = Uw,
	Xw = qw,
	Ht = {
		isNothing: Hw,
		isObject: Yw,
		toArray: jw,
		repeat: Gw,
		isNegativeZero: Vw,
		extend: Xw,
	};
function Cg(t, e) {
	var r = "",
		i = t.reason || "(unknown reason)";
	return t.mark
		? (t.mark.name && (r += 'in "' + t.mark.name + '" '),
			(r += "(" + (t.mark.line + 1) + ":" + (t.mark.column + 1) + ")"),
			!e &&
				t.mark.snippet &&
				(r +=
					`

` + t.mark.snippet),
			i + " " + r)
		: i;
}
function Fo(t, e) {
	Error.call(this),
		(this.name = "YAMLException"),
		(this.reason = t),
		(this.mark = e),
		(this.message = Cg(this, !1)),
		Error.captureStackTrace
			? Error.captureStackTrace(this, this.constructor)
			: (this.stack = new Error().stack || "");
}
Fo.prototype = Object.create(Error.prototype);
Fo.prototype.constructor = Fo;
Fo.prototype.toString = function (e) {
	return this.name + ": " + Cg(this, e);
};
var ze = Fo;
function Fl(t, e, r, i, o) {
	var n = "",
		a = "",
		l = Math.floor(o / 2) - 1;
	return (
		i - e > l && ((n = " ... "), (e = i - l + n.length)),
		r - i > l && ((a = " ..."), (r = i + l - a.length)),
		{
			str: n + t.slice(e, r).replace(/\t/g, "\u2192") + a,
			pos: i - e + n.length,
		}
	);
}
function Ll(t, e) {
	return Ht.repeat(" ", e - t.length) + t;
}
function Kw(t, e) {
	if (((e = Object.create(e || null)), !t.buffer)) return null;
	e.maxLength || (e.maxLength = 79),
		typeof e.indent != "number" && (e.indent = 1),
		typeof e.linesBefore != "number" && (e.linesBefore = 3),
		typeof e.linesAfter != "number" && (e.linesAfter = 2);
	for (
		var r = /\r?\n|\r|\0/g, i = [0], o = [], n, a = -1;
		(n = r.exec(t.buffer));
	)
		o.push(n.index),
			i.push(n.index + n[0].length),
			t.position <= n.index && a < 0 && (a = i.length - 2);
	a < 0 && (a = i.length - 1);
	var l = "",
		c,
		u,
		p = Math.min(t.line + e.linesAfter, o.length).toString().length,
		d = e.maxLength - (e.indent + p + 3);
	for (c = 1; c <= e.linesBefore && !(a - c < 0); c++)
		(u = Fl(t.buffer, i[a - c], o[a - c], t.position - (i[a] - i[a - c]), d)),
			(l =
				Ht.repeat(" ", e.indent) +
				Ll((t.line - c + 1).toString(), p) +
				" | " +
				u.str +
				`
` +
				l);
	for (
		u = Fl(t.buffer, i[a], o[a], t.position, d),
			l +=
				Ht.repeat(" ", e.indent) +
				Ll((t.line + 1).toString(), p) +
				" | " +
				u.str +
				`
`,
			l +=
				Ht.repeat("-", e.indent + p + 3 + u.pos) +
				`^
`,
			c = 1;
		c <= e.linesAfter && !(a + c >= o.length);
		c++
	)
		(u = Fl(t.buffer, i[a + c], o[a + c], t.position - (i[a] - i[a + c]), d)),
			(l +=
				Ht.repeat(" ", e.indent) +
				Ll((t.line + c + 1).toString(), p) +
				" | " +
				u.str +
				`
`);
	return l.replace(/\n$/, "");
}
var Zw = Kw,
	Qw = [
		"kind",
		"multi",
		"resolve",
		"construct",
		"instanceOf",
		"predicate",
		"represent",
		"representName",
		"defaultStyle",
		"styleAliases",
	],
	Jw = ["scalar", "sequence", "mapping"];
function tA(t) {
	var e = {};
	return (
		t !== null &&
			Object.keys(t).forEach(function (r) {
				t[r].forEach(function (i) {
					e[String(i)] = r;
				});
			}),
		e
	);
}
function eA(t, e) {
	if (
		((e = e || {}),
		Object.keys(e).forEach(function (r) {
			if (Qw.indexOf(r) === -1)
				throw new ze(
					'Unknown option "' +
						r +
						'" is met in definition of "' +
						t +
						'" YAML type.',
				);
		}),
		(this.options = e),
		(this.tag = t),
		(this.kind = e.kind || null),
		(this.resolve =
			e.resolve ||
			function () {
				return !0;
			}),
		(this.construct =
			e.construct ||
			function (r) {
				return r;
			}),
		(this.instanceOf = e.instanceOf || null),
		(this.predicate = e.predicate || null),
		(this.represent = e.represent || null),
		(this.representName = e.representName || null),
		(this.defaultStyle = e.defaultStyle || null),
		(this.multi = e.multi || !1),
		(this.styleAliases = tA(e.styleAliases || null)),
		Jw.indexOf(this.kind) === -1)
	)
		throw new ze(
			'Unknown kind "' +
				this.kind +
				'" is specified for "' +
				t +
				'" YAML type.',
		);
}
var Rt = eA;
function Cm(t, e) {
	var r = [];
	return (
		t[e].forEach(function (i) {
			var o = r.length;
			r.forEach(function (n, a) {
				n.tag === i.tag && n.kind === i.kind && n.multi === i.multi && (o = a);
			}),
				(r[o] = i);
		}),
		r
	);
}
function rA() {
	var t = {
			scalar: {},
			sequence: {},
			mapping: {},
			fallback: {},
			multi: { scalar: [], sequence: [], mapping: [], fallback: [] },
		},
		e,
		r;
	function i(o) {
		o.multi
			? (t.multi[o.kind].push(o), t.multi.fallback.push(o))
			: (t[o.kind][o.tag] = t.fallback[o.tag] = o);
	}
	for (e = 0, r = arguments.length; e < r; e += 1) arguments[e].forEach(i);
	return t;
}
function $l(t) {
	return this.extend(t);
}
$l.prototype.extend = function (e) {
	var r = [],
		i = [];
	if (e instanceof Rt) i.push(e);
	else if (Array.isArray(e)) i = i.concat(e);
	else if (e && (Array.isArray(e.implicit) || Array.isArray(e.explicit)))
		e.implicit && (r = r.concat(e.implicit)),
			e.explicit && (i = i.concat(e.explicit));
	else
		throw new ze(
			"Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })",
		);
	r.forEach(function (n) {
		if (!(n instanceof Rt))
			throw new ze(
				"Specified list of YAML types (or a single Type object) contains a non-Type object.",
			);
		if (n.loadKind && n.loadKind !== "scalar")
			throw new ze(
				"There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.",
			);
		if (n.multi)
			throw new ze(
				"There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.",
			);
	}),
		i.forEach(function (n) {
			if (!(n instanceof Rt))
				throw new ze(
					"Specified list of YAML types (or a single Type object) contains a non-Type object.",
				);
		});
	var o = Object.create($l.prototype);
	return (
		(o.implicit = (this.implicit || []).concat(r)),
		(o.explicit = (this.explicit || []).concat(i)),
		(o.compiledImplicit = Cm(o, "implicit")),
		(o.compiledExplicit = Cm(o, "explicit")),
		(o.compiledTypeMap = rA(o.compiledImplicit, o.compiledExplicit)),
		o
	);
};
var iA = $l,
	oA = new Rt("tag:yaml.org,2002:str", {
		kind: "scalar",
		construct: function (t) {
			return t !== null ? t : "";
		},
	}),
	nA = new Rt("tag:yaml.org,2002:seq", {
		kind: "sequence",
		construct: function (t) {
			return t !== null ? t : [];
		},
	}),
	aA = new Rt("tag:yaml.org,2002:map", {
		kind: "mapping",
		construct: function (t) {
			return t !== null ? t : {};
		},
	}),
	sA = new iA({ explicit: [oA, nA, aA] });
function lA(t) {
	if (t === null) return !0;
	var e = t.length;
	return (
		(e === 1 && t === "~") ||
		(e === 4 && (t === "null" || t === "Null" || t === "NULL"))
	);
}
function cA() {
	return null;
}
function uA(t) {
	return t === null;
}
var hA = new Rt("tag:yaml.org,2002:null", {
	kind: "scalar",
	resolve: lA,
	construct: cA,
	predicate: uA,
	represent: {
		canonical: function () {
			return "~";
		},
		lowercase: function () {
			return "null";
		},
		uppercase: function () {
			return "NULL";
		},
		camelcase: function () {
			return "Null";
		},
		empty: function () {
			return "";
		},
	},
	defaultStyle: "lowercase",
});
function fA(t) {
	if (t === null) return !1;
	var e = t.length;
	return (
		(e === 4 && (t === "true" || t === "True" || t === "TRUE")) ||
		(e === 5 && (t === "false" || t === "False" || t === "FALSE"))
	);
}
function pA(t) {
	return t === "true" || t === "True" || t === "TRUE";
}
function dA(t) {
	return Object.prototype.toString.call(t) === "[object Boolean]";
}
var mA = new Rt("tag:yaml.org,2002:bool", {
	kind: "scalar",
	resolve: fA,
	construct: pA,
	predicate: dA,
	represent: {
		lowercase: function (t) {
			return t ? "true" : "false";
		},
		uppercase: function (t) {
			return t ? "TRUE" : "FALSE";
		},
		camelcase: function (t) {
			return t ? "True" : "False";
		},
	},
	defaultStyle: "lowercase",
});
function gA(t) {
	return (48 <= t && t <= 57) || (65 <= t && t <= 70) || (97 <= t && t <= 102);
}
function xA(t) {
	return 48 <= t && t <= 55;
}
function yA(t) {
	return 48 <= t && t <= 57;
}
function _A(t) {
	if (t === null) return !1;
	var e = t.length,
		r = 0,
		i = !1,
		o;
	if (!e) return !1;
	if (((o = t[r]), (o === "-" || o === "+") && (o = t[++r]), o === "0")) {
		if (r + 1 === e) return !0;
		if (((o = t[++r]), o === "b")) {
			for (r++; r < e; r++)
				if (((o = t[r]), o !== "_")) {
					if (o !== "0" && o !== "1") return !1;
					i = !0;
				}
			return i && o !== "_";
		}
		if (o === "x") {
			for (r++; r < e; r++)
				if (((o = t[r]), o !== "_")) {
					if (!gA(t.charCodeAt(r))) return !1;
					i = !0;
				}
			return i && o !== "_";
		}
		if (o === "o") {
			for (r++; r < e; r++)
				if (((o = t[r]), o !== "_")) {
					if (!xA(t.charCodeAt(r))) return !1;
					i = !0;
				}
			return i && o !== "_";
		}
	}
	if (o === "_") return !1;
	for (; r < e; r++)
		if (((o = t[r]), o !== "_")) {
			if (!yA(t.charCodeAt(r))) return !1;
			i = !0;
		}
	return !(!i || o === "_");
}
function CA(t) {
	var e = t,
		r = 1,
		i;
	if (
		(e.indexOf("_") !== -1 && (e = e.replace(/_/g, "")),
		(i = e[0]),
		(i === "-" || i === "+") &&
			(i === "-" && (r = -1), (e = e.slice(1)), (i = e[0])),
		e === "0")
	)
		return 0;
	if (i === "0") {
		if (e[1] === "b") return r * parseInt(e.slice(2), 2);
		if (e[1] === "x") return r * parseInt(e.slice(2), 16);
		if (e[1] === "o") return r * parseInt(e.slice(2), 8);
	}
	return r * parseInt(e, 10);
}
function bA(t) {
	return (
		Object.prototype.toString.call(t) === "[object Number]" &&
		t % 1 === 0 &&
		!Ht.isNegativeZero(t)
	);
}
var TA = new Rt("tag:yaml.org,2002:int", {
		kind: "scalar",
		resolve: _A,
		construct: CA,
		predicate: bA,
		represent: {
			binary: function (t) {
				return t >= 0 ? "0b" + t.toString(2) : "-0b" + t.toString(2).slice(1);
			},
			octal: function (t) {
				return t >= 0 ? "0o" + t.toString(8) : "-0o" + t.toString(8).slice(1);
			},
			decimal: function (t) {
				return t.toString(10);
			},
			hexadecimal: function (t) {
				return t >= 0
					? "0x" + t.toString(16).toUpperCase()
					: "-0x" + t.toString(16).toUpperCase().slice(1);
			},
		},
		defaultStyle: "decimal",
		styleAliases: {
			binary: [2, "bin"],
			octal: [8, "oct"],
			decimal: [10, "dec"],
			hexadecimal: [16, "hex"],
		},
	}),
	vA = new RegExp(
		"^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$",
	);
function kA(t) {
	return !(t === null || !vA.test(t) || t[t.length - 1] === "_");
}
function SA(t) {
	var e, r;
	return (
		(e = t.replace(/_/g, "").toLowerCase()),
		(r = e[0] === "-" ? -1 : 1),
		"+-".indexOf(e[0]) >= 0 && (e = e.slice(1)),
		e === ".inf"
			? r === 1
				? Number.POSITIVE_INFINITY
				: Number.NEGATIVE_INFINITY
			: e === ".nan"
				? NaN
				: r * parseFloat(e, 10)
	);
}
var wA = /^[-+]?[0-9]+e/;
function AA(t, e) {
	var r;
	if (isNaN(t))
		switch (e) {
			case "lowercase":
				return ".nan";
			case "uppercase":
				return ".NAN";
			case "camelcase":
				return ".NaN";
		}
	else if (Number.POSITIVE_INFINITY === t)
		switch (e) {
			case "lowercase":
				return ".inf";
			case "uppercase":
				return ".INF";
			case "camelcase":
				return ".Inf";
		}
	else if (Number.NEGATIVE_INFINITY === t)
		switch (e) {
			case "lowercase":
				return "-.inf";
			case "uppercase":
				return "-.INF";
			case "camelcase":
				return "-.Inf";
		}
	else if (Ht.isNegativeZero(t)) return "-0.0";
	return (r = t.toString(10)), wA.test(r) ? r.replace("e", ".e") : r;
}
function BA(t) {
	return (
		Object.prototype.toString.call(t) === "[object Number]" &&
		(t % 1 !== 0 || Ht.isNegativeZero(t))
	);
}
var FA = new Rt("tag:yaml.org,2002:float", {
		kind: "scalar",
		resolve: kA,
		construct: SA,
		predicate: BA,
		represent: AA,
		defaultStyle: "lowercase",
	}),
	bg = sA.extend({ implicit: [hA, mA, TA, FA] }),
	LA = bg,
	Tg = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),
	vg = new RegExp(
		"^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$",
	);
function MA(t) {
	return t === null ? !1 : Tg.exec(t) !== null || vg.exec(t) !== null;
}
function EA(t) {
	var e,
		r,
		i,
		o,
		n,
		a,
		l,
		c = 0,
		u = null,
		p,
		d,
		h;
	if (((e = Tg.exec(t)), e === null && (e = vg.exec(t)), e === null))
		throw new Error("Date resolve error");
	if (((r = +e[1]), (i = +e[2] - 1), (o = +e[3]), !e[4]))
		return new Date(Date.UTC(r, i, o));
	if (((n = +e[4]), (a = +e[5]), (l = +e[6]), e[7])) {
		for (c = e[7].slice(0, 3); c.length < 3; ) c += "0";
		c = +c;
	}
	return (
		e[9] &&
			((p = +e[10]),
			(d = +(e[11] || 0)),
			(u = (p * 60 + d) * 6e4),
			e[9] === "-" && (u = -u)),
		(h = new Date(Date.UTC(r, i, o, n, a, l, c))),
		u && h.setTime(h.getTime() - u),
		h
	);
}
function OA(t) {
	return t.toISOString();
}
var IA = new Rt("tag:yaml.org,2002:timestamp", {
	kind: "scalar",
	resolve: MA,
	construct: EA,
	instanceOf: Date,
	represent: OA,
});
function DA(t) {
	return t === "<<" || t === null;
}
var NA = new Rt("tag:yaml.org,2002:merge", { kind: "scalar", resolve: DA }),
	Ql = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function RA(t) {
	if (t === null) return !1;
	var e,
		r,
		i = 0,
		o = t.length,
		n = Ql;
	for (r = 0; r < o; r++)
		if (((e = n.indexOf(t.charAt(r))), !(e > 64))) {
			if (e < 0) return !1;
			i += 6;
		}
	return i % 8 === 0;
}
function PA(t) {
	var e,
		r,
		i = t.replace(/[\r\n=]/g, ""),
		o = i.length,
		n = Ql,
		a = 0,
		l = [];
	for (e = 0; e < o; e++)
		e % 4 === 0 &&
			e &&
			(l.push((a >> 16) & 255), l.push((a >> 8) & 255), l.push(a & 255)),
			(a = (a << 6) | n.indexOf(i.charAt(e)));
	return (
		(r = (o % 4) * 6),
		r === 0
			? (l.push((a >> 16) & 255), l.push((a >> 8) & 255), l.push(a & 255))
			: r === 18
				? (l.push((a >> 10) & 255), l.push((a >> 2) & 255))
				: r === 12 && l.push((a >> 4) & 255),
		new Uint8Array(l)
	);
}
function $A(t) {
	var e = "",
		r = 0,
		i,
		o,
		n = t.length,
		a = Ql;
	for (i = 0; i < n; i++)
		i % 3 === 0 &&
			i &&
			((e += a[(r >> 18) & 63]),
			(e += a[(r >> 12) & 63]),
			(e += a[(r >> 6) & 63]),
			(e += a[r & 63])),
			(r = (r << 8) + t[i]);
	return (
		(o = n % 3),
		o === 0
			? ((e += a[(r >> 18) & 63]),
				(e += a[(r >> 12) & 63]),
				(e += a[(r >> 6) & 63]),
				(e += a[r & 63]))
			: o === 2
				? ((e += a[(r >> 10) & 63]),
					(e += a[(r >> 4) & 63]),
					(e += a[(r << 2) & 63]),
					(e += a[64]))
				: o === 1 &&
					((e += a[(r >> 2) & 63]),
					(e += a[(r << 4) & 63]),
					(e += a[64]),
					(e += a[64])),
		e
	);
}
function zA(t) {
	return Object.prototype.toString.call(t) === "[object Uint8Array]";
}
var qA = new Rt("tag:yaml.org,2002:binary", {
		kind: "scalar",
		resolve: RA,
		construct: PA,
		predicate: zA,
		represent: $A,
	}),
	WA = Object.prototype.hasOwnProperty,
	UA = Object.prototype.toString;
function HA(t) {
	if (t === null) return !0;
	var e = [],
		r,
		i,
		o,
		n,
		a,
		l = t;
	for (r = 0, i = l.length; r < i; r += 1) {
		if (((o = l[r]), (a = !1), UA.call(o) !== "[object Object]")) return !1;
		for (n in o)
			if (WA.call(o, n))
				if (!a) a = !0;
				else return !1;
		if (!a) return !1;
		if (e.indexOf(n) === -1) e.push(n);
		else return !1;
	}
	return !0;
}
function YA(t) {
	return t !== null ? t : [];
}
var jA = new Rt("tag:yaml.org,2002:omap", {
		kind: "sequence",
		resolve: HA,
		construct: YA,
	}),
	GA = Object.prototype.toString;
function VA(t) {
	if (t === null) return !0;
	var e,
		r,
		i,
		o,
		n,
		a = t;
	for (n = new Array(a.length), e = 0, r = a.length; e < r; e += 1) {
		if (
			((i = a[e]),
			GA.call(i) !== "[object Object]" ||
				((o = Object.keys(i)), o.length !== 1))
		)
			return !1;
		n[e] = [o[0], i[o[0]]];
	}
	return !0;
}
function XA(t) {
	if (t === null) return [];
	var e,
		r,
		i,
		o,
		n,
		a = t;
	for (n = new Array(a.length), e = 0, r = a.length; e < r; e += 1)
		(i = a[e]), (o = Object.keys(i)), (n[e] = [o[0], i[o[0]]]);
	return n;
}
var KA = new Rt("tag:yaml.org,2002:pairs", {
		kind: "sequence",
		resolve: VA,
		construct: XA,
	}),
	ZA = Object.prototype.hasOwnProperty;
function QA(t) {
	if (t === null) return !0;
	var e,
		r = t;
	for (e in r) if (ZA.call(r, e) && r[e] !== null) return !1;
	return !0;
}
function JA(t) {
	return t !== null ? t : {};
}
var tB = new Rt("tag:yaml.org,2002:set", {
		kind: "mapping",
		resolve: QA,
		construct: JA,
	}),
	eB = LA.extend({ implicit: [IA, NA], explicit: [qA, jA, KA, tB] }),
	lr = Object.prototype.hasOwnProperty,
	Ca = 1,
	kg = 2,
	Sg = 3,
	ba = 4,
	Ml = 1,
	rB = 2,
	bm = 3,
	iB =
		/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
	oB = /[\x85\u2028\u2029]/,
	nB = /[,\[\]\{\}]/,
	wg = /^(?:!|!!|![a-z\-]+!)$/i,
	Ag =
		/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function Tm(t) {
	return Object.prototype.toString.call(t);
}
function be(t) {
	return t === 10 || t === 13;
}
function Rr(t) {
	return t === 9 || t === 32;
}
function Qt(t) {
	return t === 9 || t === 32 || t === 10 || t === 13;
}
function wi(t) {
	return t === 44 || t === 91 || t === 93 || t === 123 || t === 125;
}
function aB(t) {
	var e;
	return 48 <= t && t <= 57
		? t - 48
		: ((e = t | 32), 97 <= e && e <= 102 ? e - 97 + 10 : -1);
}
function sB(t) {
	return t === 120 ? 2 : t === 117 ? 4 : t === 85 ? 8 : 0;
}
function lB(t) {
	return 48 <= t && t <= 57 ? t - 48 : -1;
}
function vm(t) {
	return t === 48
		? "\0"
		: t === 97
			? "\x07"
			: t === 98
				? "\b"
				: t === 116 || t === 9
					? "	"
					: t === 110
						? `
`
						: t === 118
							? "\v"
							: t === 102
								? "\f"
								: t === 114
									? "\r"
									: t === 101
										? "\x1B"
										: t === 32
											? " "
											: t === 34
												? '"'
												: t === 47
													? "/"
													: t === 92
														? "\\"
														: t === 78
															? "\x85"
															: t === 95
																? "\xA0"
																: t === 76
																	? "\u2028"
																	: t === 80
																		? "\u2029"
																		: "";
}
function cB(t) {
	return t <= 65535
		? String.fromCharCode(t)
		: String.fromCharCode(
				((t - 65536) >> 10) + 55296,
				((t - 65536) & 1023) + 56320,
			);
}
var Bg = new Array(256),
	Fg = new Array(256);
for (Nr = 0; Nr < 256; Nr++) (Bg[Nr] = vm(Nr) ? 1 : 0), (Fg[Nr] = vm(Nr));
var Nr;
function uB(t, e) {
	(this.input = t),
		(this.filename = e.filename || null),
		(this.schema = e.schema || eB),
		(this.onWarning = e.onWarning || null),
		(this.legacy = e.legacy || !1),
		(this.json = e.json || !1),
		(this.listener = e.listener || null),
		(this.implicitTypes = this.schema.compiledImplicit),
		(this.typeMap = this.schema.compiledTypeMap),
		(this.length = t.length),
		(this.position = 0),
		(this.line = 0),
		(this.lineStart = 0),
		(this.lineIndent = 0),
		(this.firstTabInLine = -1),
		(this.documents = []);
}
function Lg(t, e) {
	var r = {
		name: t.filename,
		buffer: t.input.slice(0, -1),
		position: t.position,
		line: t.line,
		column: t.position - t.lineStart,
	};
	return (r.snippet = Zw(r)), new ze(e, r);
}
function G(t, e) {
	throw Lg(t, e);
}
function Ta(t, e) {
	t.onWarning && t.onWarning.call(null, Lg(t, e));
}
var km = {
	YAML: function (e, r, i) {
		var o, n, a;
		e.version !== null && G(e, "duplication of %YAML directive"),
			i.length !== 1 && G(e, "YAML directive accepts exactly one argument"),
			(o = /^([0-9]+)\.([0-9]+)$/.exec(i[0])),
			o === null && G(e, "ill-formed argument of the YAML directive"),
			(n = parseInt(o[1], 10)),
			(a = parseInt(o[2], 10)),
			n !== 1 && G(e, "unacceptable YAML version of the document"),
			(e.version = i[0]),
			(e.checkLineBreaks = a < 2),
			a !== 1 && a !== 2 && Ta(e, "unsupported YAML version of the document");
	},
	TAG: function (e, r, i) {
		var o, n;
		i.length !== 2 && G(e, "TAG directive accepts exactly two arguments"),
			(o = i[0]),
			(n = i[1]),
			wg.test(o) ||
				G(e, "ill-formed tag handle (first argument) of the TAG directive"),
			lr.call(e.tagMap, o) &&
				G(
					e,
					'there is a previously declared suffix for "' + o + '" tag handle',
				),
			Ag.test(n) ||
				G(e, "ill-formed tag prefix (second argument) of the TAG directive");
		try {
			n = decodeURIComponent(n);
		} catch {
			G(e, "tag prefix is malformed: " + n);
		}
		e.tagMap[o] = n;
	},
};
function sr(t, e, r, i) {
	var o, n, a, l;
	if (e < r) {
		if (((l = t.input.slice(e, r)), i))
			for (o = 0, n = l.length; o < n; o += 1)
				(a = l.charCodeAt(o)),
					a === 9 ||
						(32 <= a && a <= 1114111) ||
						G(t, "expected valid JSON character");
		else iB.test(l) && G(t, "the stream contains non-printable characters");
		t.result += l;
	}
}
function Sm(t, e, r, i) {
	var o, n, a, l;
	for (
		Ht.isObject(r) ||
			G(t, "cannot merge mappings; the provided source object is unacceptable"),
			o = Object.keys(r),
			a = 0,
			l = o.length;
		a < l;
		a += 1
	)
		(n = o[a]), lr.call(e, n) || ((e[n] = r[n]), (i[n] = !0));
}
function Ai(t, e, r, i, o, n, a, l, c) {
	var u, p;
	if (Array.isArray(o))
		for (o = Array.prototype.slice.call(o), u = 0, p = o.length; u < p; u += 1)
			Array.isArray(o[u]) &&
				G(t, "nested arrays are not supported inside keys"),
				typeof o == "object" &&
					Tm(o[u]) === "[object Object]" &&
					(o[u] = "[object Object]");
	if (
		(typeof o == "object" &&
			Tm(o) === "[object Object]" &&
			(o = "[object Object]"),
		(o = String(o)),
		e === null && (e = {}),
		i === "tag:yaml.org,2002:merge")
	)
		if (Array.isArray(n))
			for (u = 0, p = n.length; u < p; u += 1) Sm(t, e, n[u], r);
		else Sm(t, e, n, r);
	else
		!t.json &&
			!lr.call(r, o) &&
			lr.call(e, o) &&
			((t.line = a || t.line),
			(t.lineStart = l || t.lineStart),
			(t.position = c || t.position),
			G(t, "duplicated mapping key")),
			o === "__proto__"
				? Object.defineProperty(e, o, {
						configurable: !0,
						enumerable: !0,
						writable: !0,
						value: n,
					})
				: (e[o] = n),
			delete r[o];
	return e;
}
function Jl(t) {
	var e;
	(e = t.input.charCodeAt(t.position)),
		e === 10
			? t.position++
			: e === 13
				? (t.position++, t.input.charCodeAt(t.position) === 10 && t.position++)
				: G(t, "a line break is expected"),
		(t.line += 1),
		(t.lineStart = t.position),
		(t.firstTabInLine = -1);
}
function _t(t, e, r) {
	for (var i = 0, o = t.input.charCodeAt(t.position); o !== 0; ) {
		for (; Rr(o); )
			o === 9 && t.firstTabInLine === -1 && (t.firstTabInLine = t.position),
				(o = t.input.charCodeAt(++t.position));
		if (e && o === 35)
			do o = t.input.charCodeAt(++t.position);
			while (o !== 10 && o !== 13 && o !== 0);
		if (be(o))
			for (
				Jl(t), o = t.input.charCodeAt(t.position), i++, t.lineIndent = 0;
				o === 32;
			)
				t.lineIndent++, (o = t.input.charCodeAt(++t.position));
		else break;
	}
	return (
		r !== -1 && i !== 0 && t.lineIndent < r && Ta(t, "deficient indentation"), i
	);
}
function Ba(t) {
	var e = t.position,
		r;
	return (
		(r = t.input.charCodeAt(e)),
		!!(
			(r === 45 || r === 46) &&
			r === t.input.charCodeAt(e + 1) &&
			r === t.input.charCodeAt(e + 2) &&
			((e += 3), (r = t.input.charCodeAt(e)), r === 0 || Qt(r))
		)
	);
}
function tc(t, e) {
	e === 1
		? (t.result += " ")
		: e > 1 &&
			(t.result += Ht.repeat(
				`
`,
				e - 1,
			));
}
function hB(t, e, r) {
	var i,
		o,
		n,
		a,
		l,
		c,
		u,
		p,
		d = t.kind,
		h = t.result,
		m;
	if (
		((m = t.input.charCodeAt(t.position)),
		Qt(m) ||
			wi(m) ||
			m === 35 ||
			m === 38 ||
			m === 42 ||
			m === 33 ||
			m === 124 ||
			m === 62 ||
			m === 39 ||
			m === 34 ||
			m === 37 ||
			m === 64 ||
			m === 96 ||
			((m === 63 || m === 45) &&
				((o = t.input.charCodeAt(t.position + 1)), Qt(o) || (r && wi(o)))))
	)
		return !1;
	for (
		t.kind = "scalar", t.result = "", n = a = t.position, l = !1;
		m !== 0;
	) {
		if (m === 58) {
			if (((o = t.input.charCodeAt(t.position + 1)), Qt(o) || (r && wi(o))))
				break;
		} else if (m === 35) {
			if (((i = t.input.charCodeAt(t.position - 1)), Qt(i))) break;
		} else {
			if ((t.position === t.lineStart && Ba(t)) || (r && wi(m))) break;
			if (be(m))
				if (
					((c = t.line),
					(u = t.lineStart),
					(p = t.lineIndent),
					_t(t, !1, -1),
					t.lineIndent >= e)
				) {
					(l = !0), (m = t.input.charCodeAt(t.position));
					continue;
				} else {
					(t.position = a), (t.line = c), (t.lineStart = u), (t.lineIndent = p);
					break;
				}
		}
		l && (sr(t, n, a, !1), tc(t, t.line - c), (n = a = t.position), (l = !1)),
			Rr(m) || (a = t.position + 1),
			(m = t.input.charCodeAt(++t.position));
	}
	return sr(t, n, a, !1), t.result ? !0 : ((t.kind = d), (t.result = h), !1);
}
function fB(t, e) {
	var r, i, o;
	if (((r = t.input.charCodeAt(t.position)), r !== 39)) return !1;
	for (
		t.kind = "scalar", t.result = "", t.position++, i = o = t.position;
		(r = t.input.charCodeAt(t.position)) !== 0;
	)
		if (r === 39)
			if (
				(sr(t, i, t.position, !0),
				(r = t.input.charCodeAt(++t.position)),
				r === 39)
			)
				(i = t.position), t.position++, (o = t.position);
			else return !0;
		else
			be(r)
				? (sr(t, i, o, !0), tc(t, _t(t, !1, e)), (i = o = t.position))
				: t.position === t.lineStart && Ba(t)
					? G(t, "unexpected end of the document within a single quoted scalar")
					: (t.position++, (o = t.position));
	G(t, "unexpected end of the stream within a single quoted scalar");
}
function pB(t, e) {
	var r, i, o, n, a, l;
	if (((l = t.input.charCodeAt(t.position)), l !== 34)) return !1;
	for (
		t.kind = "scalar", t.result = "", t.position++, r = i = t.position;
		(l = t.input.charCodeAt(t.position)) !== 0;
	) {
		if (l === 34) return sr(t, r, t.position, !0), t.position++, !0;
		if (l === 92) {
			if (
				(sr(t, r, t.position, !0),
				(l = t.input.charCodeAt(++t.position)),
				be(l))
			)
				_t(t, !1, e);
			else if (l < 256 && Bg[l]) (t.result += Fg[l]), t.position++;
			else if ((a = sB(l)) > 0) {
				for (o = a, n = 0; o > 0; o--)
					(l = t.input.charCodeAt(++t.position)),
						(a = aB(l)) >= 0
							? (n = (n << 4) + a)
							: G(t, "expected hexadecimal character");
				(t.result += cB(n)), t.position++;
			} else G(t, "unknown escape sequence");
			r = i = t.position;
		} else
			be(l)
				? (sr(t, r, i, !0), tc(t, _t(t, !1, e)), (r = i = t.position))
				: t.position === t.lineStart && Ba(t)
					? G(t, "unexpected end of the document within a double quoted scalar")
					: (t.position++, (i = t.position));
	}
	G(t, "unexpected end of the stream within a double quoted scalar");
}
function dB(t, e) {
	var r = !0,
		i,
		o,
		n,
		a = t.tag,
		l,
		c = t.anchor,
		u,
		p,
		d,
		h,
		m,
		_ = Object.create(null),
		b,
		v,
		F,
		T;
	if (((T = t.input.charCodeAt(t.position)), T === 91))
		(p = 93), (m = !1), (l = []);
	else if (T === 123) (p = 125), (m = !0), (l = {});
	else return !1;
	for (
		t.anchor !== null && (t.anchorMap[t.anchor] = l),
			T = t.input.charCodeAt(++t.position);
		T !== 0;
	) {
		if ((_t(t, !0, e), (T = t.input.charCodeAt(t.position)), T === p))
			return (
				t.position++,
				(t.tag = a),
				(t.anchor = c),
				(t.kind = m ? "mapping" : "sequence"),
				(t.result = l),
				!0
			);
		r
			? T === 44 && G(t, "expected the node content, but found ','")
			: G(t, "missed comma between flow collection entries"),
			(v = b = F = null),
			(d = h = !1),
			T === 63 &&
				((u = t.input.charCodeAt(t.position + 1)),
				Qt(u) && ((d = h = !0), t.position++, _t(t, !0, e))),
			(i = t.line),
			(o = t.lineStart),
			(n = t.position),
			Mi(t, e, Ca, !1, !0),
			(v = t.tag),
			(b = t.result),
			_t(t, !0, e),
			(T = t.input.charCodeAt(t.position)),
			(h || t.line === i) &&
				T === 58 &&
				((d = !0),
				(T = t.input.charCodeAt(++t.position)),
				_t(t, !0, e),
				Mi(t, e, Ca, !1, !0),
				(F = t.result)),
			m
				? Ai(t, l, _, v, b, F, i, o, n)
				: d
					? l.push(Ai(t, null, _, v, b, F, i, o, n))
					: l.push(b),
			_t(t, !0, e),
			(T = t.input.charCodeAt(t.position)),
			T === 44 ? ((r = !0), (T = t.input.charCodeAt(++t.position))) : (r = !1);
	}
	G(t, "unexpected end of the stream within a flow collection");
}
function mB(t, e) {
	var r,
		i,
		o = Ml,
		n = !1,
		a = !1,
		l = e,
		c = 0,
		u = !1,
		p,
		d;
	if (((d = t.input.charCodeAt(t.position)), d === 124)) i = !1;
	else if (d === 62) i = !0;
	else return !1;
	for (t.kind = "scalar", t.result = ""; d !== 0; )
		if (((d = t.input.charCodeAt(++t.position)), d === 43 || d === 45))
			Ml === o
				? (o = d === 43 ? bm : rB)
				: G(t, "repeat of a chomping mode identifier");
		else if ((p = lB(d)) >= 0)
			p === 0
				? G(
						t,
						"bad explicit indentation width of a block scalar; it cannot be less than one",
					)
				: a
					? G(t, "repeat of an indentation width identifier")
					: ((l = e + p - 1), (a = !0));
		else break;
	if (Rr(d)) {
		do d = t.input.charCodeAt(++t.position);
		while (Rr(d));
		if (d === 35)
			do d = t.input.charCodeAt(++t.position);
			while (!be(d) && d !== 0);
	}
	for (; d !== 0; ) {
		for (
			Jl(t), t.lineIndent = 0, d = t.input.charCodeAt(t.position);
			(!a || t.lineIndent < l) && d === 32;
		)
			t.lineIndent++, (d = t.input.charCodeAt(++t.position));
		if ((!a && t.lineIndent > l && (l = t.lineIndent), be(d))) {
			c++;
			continue;
		}
		if (t.lineIndent < l) {
			o === bm
				? (t.result += Ht.repeat(
						`
`,
						n ? 1 + c : c,
					))
				: o === Ml &&
					n &&
					(t.result += `
`);
			break;
		}
		for (
			i
				? Rr(d)
					? ((u = !0),
						(t.result += Ht.repeat(
							`
`,
							n ? 1 + c : c,
						)))
					: u
						? ((u = !1),
							(t.result += Ht.repeat(
								`
`,
								c + 1,
							)))
						: c === 0
							? n && (t.result += " ")
							: (t.result += Ht.repeat(
									`
`,
									c,
								))
				: (t.result += Ht.repeat(
						`
`,
						n ? 1 + c : c,
					)),
				n = !0,
				a = !0,
				c = 0,
				r = t.position;
			!be(d) && d !== 0;
		)
			d = t.input.charCodeAt(++t.position);
		sr(t, r, t.position, !1);
	}
	return !0;
}
function wm(t, e) {
	var r,
		i = t.tag,
		o = t.anchor,
		n = [],
		a,
		l = !1,
		c;
	if (t.firstTabInLine !== -1) return !1;
	for (
		t.anchor !== null && (t.anchorMap[t.anchor] = n),
			c = t.input.charCodeAt(t.position);
		c !== 0 &&
		(t.firstTabInLine !== -1 &&
			((t.position = t.firstTabInLine),
			G(t, "tab characters must not be used in indentation")),
		!(c !== 45 || ((a = t.input.charCodeAt(t.position + 1)), !Qt(a))));
	) {
		if (((l = !0), t.position++, _t(t, !0, -1) && t.lineIndent <= e)) {
			n.push(null), (c = t.input.charCodeAt(t.position));
			continue;
		}
		if (
			((r = t.line),
			Mi(t, e, Sg, !1, !0),
			n.push(t.result),
			_t(t, !0, -1),
			(c = t.input.charCodeAt(t.position)),
			(t.line === r || t.lineIndent > e) && c !== 0)
		)
			G(t, "bad indentation of a sequence entry");
		else if (t.lineIndent < e) break;
	}
	return l
		? ((t.tag = i), (t.anchor = o), (t.kind = "sequence"), (t.result = n), !0)
		: !1;
}
function gB(t, e, r) {
	var i,
		o,
		n,
		a,
		l,
		c,
		u = t.tag,
		p = t.anchor,
		d = {},
		h = Object.create(null),
		m = null,
		_ = null,
		b = null,
		v = !1,
		F = !1,
		T;
	if (t.firstTabInLine !== -1) return !1;
	for (
		t.anchor !== null && (t.anchorMap[t.anchor] = d),
			T = t.input.charCodeAt(t.position);
		T !== 0;
	) {
		if (
			(!v &&
				t.firstTabInLine !== -1 &&
				((t.position = t.firstTabInLine),
				G(t, "tab characters must not be used in indentation")),
			(i = t.input.charCodeAt(t.position + 1)),
			(n = t.line),
			(T === 63 || T === 58) && Qt(i))
		)
			T === 63
				? (v && (Ai(t, d, h, m, _, null, a, l, c), (m = _ = b = null)),
					(F = !0),
					(v = !0),
					(o = !0))
				: v
					? ((v = !1), (o = !0))
					: G(
							t,
							"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line",
						),
				(t.position += 1),
				(T = i);
		else {
			if (
				((a = t.line),
				(l = t.lineStart),
				(c = t.position),
				!Mi(t, r, kg, !1, !0))
			)
				break;
			if (t.line === n) {
				for (T = t.input.charCodeAt(t.position); Rr(T); )
					T = t.input.charCodeAt(++t.position);
				if (T === 58)
					(T = t.input.charCodeAt(++t.position)),
						Qt(T) ||
							G(
								t,
								"a whitespace character is expected after the key-value separator within a block mapping",
							),
						v && (Ai(t, d, h, m, _, null, a, l, c), (m = _ = b = null)),
						(F = !0),
						(v = !1),
						(o = !1),
						(m = t.tag),
						(_ = t.result);
				else if (F)
					G(t, "can not read an implicit mapping pair; a colon is missed");
				else return (t.tag = u), (t.anchor = p), !0;
			} else if (F)
				G(
					t,
					"can not read a block mapping entry; a multiline key may not be an implicit key",
				);
			else return (t.tag = u), (t.anchor = p), !0;
		}
		if (
			((t.line === n || t.lineIndent > e) &&
				(v && ((a = t.line), (l = t.lineStart), (c = t.position)),
				Mi(t, e, ba, !0, o) && (v ? (_ = t.result) : (b = t.result)),
				v || (Ai(t, d, h, m, _, b, a, l, c), (m = _ = b = null)),
				_t(t, !0, -1),
				(T = t.input.charCodeAt(t.position))),
			(t.line === n || t.lineIndent > e) && T !== 0)
		)
			G(t, "bad indentation of a mapping entry");
		else if (t.lineIndent < e) break;
	}
	return (
		v && Ai(t, d, h, m, _, null, a, l, c),
		F && ((t.tag = u), (t.anchor = p), (t.kind = "mapping"), (t.result = d)),
		F
	);
}
function xB(t) {
	var e,
		r = !1,
		i = !1,
		o,
		n,
		a;
	if (((a = t.input.charCodeAt(t.position)), a !== 33)) return !1;
	if (
		(t.tag !== null && G(t, "duplication of a tag property"),
		(a = t.input.charCodeAt(++t.position)),
		a === 60
			? ((r = !0), (a = t.input.charCodeAt(++t.position)))
			: a === 33
				? ((i = !0), (o = "!!"), (a = t.input.charCodeAt(++t.position)))
				: (o = "!"),
		(e = t.position),
		r)
	) {
		do a = t.input.charCodeAt(++t.position);
		while (a !== 0 && a !== 62);
		t.position < t.length
			? ((n = t.input.slice(e, t.position)),
				(a = t.input.charCodeAt(++t.position)))
			: G(t, "unexpected end of the stream within a verbatim tag");
	} else {
		for (; a !== 0 && !Qt(a); )
			a === 33 &&
				(i
					? G(t, "tag suffix cannot contain exclamation marks")
					: ((o = t.input.slice(e - 1, t.position + 1)),
						wg.test(o) ||
							G(t, "named tag handle cannot contain such characters"),
						(i = !0),
						(e = t.position + 1))),
				(a = t.input.charCodeAt(++t.position));
		(n = t.input.slice(e, t.position)),
			nB.test(n) && G(t, "tag suffix cannot contain flow indicator characters");
	}
	n && !Ag.test(n) && G(t, "tag name cannot contain such characters: " + n);
	try {
		n = decodeURIComponent(n);
	} catch {
		G(t, "tag name is malformed: " + n);
	}
	return (
		r
			? (t.tag = n)
			: lr.call(t.tagMap, o)
				? (t.tag = t.tagMap[o] + n)
				: o === "!"
					? (t.tag = "!" + n)
					: o === "!!"
						? (t.tag = "tag:yaml.org,2002:" + n)
						: G(t, 'undeclared tag handle "' + o + '"'),
		!0
	);
}
function yB(t) {
	var e, r;
	if (((r = t.input.charCodeAt(t.position)), r !== 38)) return !1;
	for (
		t.anchor !== null && G(t, "duplication of an anchor property"),
			r = t.input.charCodeAt(++t.position),
			e = t.position;
		r !== 0 && !Qt(r) && !wi(r);
	)
		r = t.input.charCodeAt(++t.position);
	return (
		t.position === e &&
			G(t, "name of an anchor node must contain at least one character"),
		(t.anchor = t.input.slice(e, t.position)),
		!0
	);
}
function _B(t) {
	var e, r, i;
	if (((i = t.input.charCodeAt(t.position)), i !== 42)) return !1;
	for (
		i = t.input.charCodeAt(++t.position), e = t.position;
		i !== 0 && !Qt(i) && !wi(i);
	)
		i = t.input.charCodeAt(++t.position);
	return (
		t.position === e &&
			G(t, "name of an alias node must contain at least one character"),
		(r = t.input.slice(e, t.position)),
		lr.call(t.anchorMap, r) || G(t, 'unidentified alias "' + r + '"'),
		(t.result = t.anchorMap[r]),
		_t(t, !0, -1),
		!0
	);
}
function Mi(t, e, r, i, o) {
	var n,
		a,
		l,
		c = 1,
		u = !1,
		p = !1,
		d,
		h,
		m,
		_,
		b,
		v;
	if (
		(t.listener !== null && t.listener("open", t),
		(t.tag = null),
		(t.anchor = null),
		(t.kind = null),
		(t.result = null),
		(n = a = l = ba === r || Sg === r),
		i &&
			_t(t, !0, -1) &&
			((u = !0),
			t.lineIndent > e
				? (c = 1)
				: t.lineIndent === e
					? (c = 0)
					: t.lineIndent < e && (c = -1)),
		c === 1)
	)
		for (; xB(t) || yB(t); )
			_t(t, !0, -1)
				? ((u = !0),
					(l = n),
					t.lineIndent > e
						? (c = 1)
						: t.lineIndent === e
							? (c = 0)
							: t.lineIndent < e && (c = -1))
				: (l = !1);
	if (
		(l && (l = u || o),
		(c === 1 || ba === r) &&
			(Ca === r || kg === r ? (b = e) : (b = e + 1),
			(v = t.position - t.lineStart),
			c === 1
				? (l && (wm(t, v) || gB(t, v, b))) || dB(t, b)
					? (p = !0)
					: ((a && mB(t, b)) || fB(t, b) || pB(t, b)
							? (p = !0)
							: _B(t)
								? ((p = !0),
									(t.tag !== null || t.anchor !== null) &&
										G(t, "alias node should not have any properties"))
								: hB(t, b, Ca === r) &&
									((p = !0), t.tag === null && (t.tag = "?")),
						t.anchor !== null && (t.anchorMap[t.anchor] = t.result))
				: c === 0 && (p = l && wm(t, v))),
		t.tag === null)
	)
		t.anchor !== null && (t.anchorMap[t.anchor] = t.result);
	else if (t.tag === "?") {
		for (
			t.result !== null &&
				t.kind !== "scalar" &&
				G(
					t,
					'unacceptable node kind for !<?> tag; it should be "scalar", not "' +
						t.kind +
						'"',
				),
				d = 0,
				h = t.implicitTypes.length;
			d < h;
			d += 1
		)
			if (((_ = t.implicitTypes[d]), _.resolve(t.result))) {
				(t.result = _.construct(t.result)),
					(t.tag = _.tag),
					t.anchor !== null && (t.anchorMap[t.anchor] = t.result);
				break;
			}
	} else if (t.tag !== "!") {
		if (lr.call(t.typeMap[t.kind || "fallback"], t.tag))
			_ = t.typeMap[t.kind || "fallback"][t.tag];
		else
			for (
				_ = null,
					m = t.typeMap.multi[t.kind || "fallback"],
					d = 0,
					h = m.length;
				d < h;
				d += 1
			)
				if (t.tag.slice(0, m[d].tag.length) === m[d].tag) {
					_ = m[d];
					break;
				}
		_ || G(t, "unknown tag !<" + t.tag + ">"),
			t.result !== null &&
				_.kind !== t.kind &&
				G(
					t,
					"unacceptable node kind for !<" +
						t.tag +
						'> tag; it should be "' +
						_.kind +
						'", not "' +
						t.kind +
						'"',
				),
			_.resolve(t.result, t.tag)
				? ((t.result = _.construct(t.result, t.tag)),
					t.anchor !== null && (t.anchorMap[t.anchor] = t.result))
				: G(t, "cannot resolve a node with !<" + t.tag + "> explicit tag");
	}
	return (
		t.listener !== null && t.listener("close", t),
		t.tag !== null || t.anchor !== null || p
	);
}
function CB(t) {
	var e = t.position,
		r,
		i,
		o,
		n = !1,
		a;
	for (
		t.version = null,
			t.checkLineBreaks = t.legacy,
			t.tagMap = Object.create(null),
			t.anchorMap = Object.create(null);
		(a = t.input.charCodeAt(t.position)) !== 0 &&
		(_t(t, !0, -1),
		(a = t.input.charCodeAt(t.position)),
		!(t.lineIndent > 0 || a !== 37));
	) {
		for (
			n = !0, a = t.input.charCodeAt(++t.position), r = t.position;
			a !== 0 && !Qt(a);
		)
			a = t.input.charCodeAt(++t.position);
		for (
			i = t.input.slice(r, t.position),
				o = [],
				i.length < 1 &&
					G(t, "directive name must not be less than one character in length");
			a !== 0;
		) {
			for (; Rr(a); ) a = t.input.charCodeAt(++t.position);
			if (a === 35) {
				do a = t.input.charCodeAt(++t.position);
				while (a !== 0 && !be(a));
				break;
			}
			if (be(a)) break;
			for (r = t.position; a !== 0 && !Qt(a); )
				a = t.input.charCodeAt(++t.position);
			o.push(t.input.slice(r, t.position));
		}
		a !== 0 && Jl(t),
			lr.call(km, i)
				? km[i](t, i, o)
				: Ta(t, 'unknown document directive "' + i + '"');
	}
	if (
		(_t(t, !0, -1),
		t.lineIndent === 0 &&
		t.input.charCodeAt(t.position) === 45 &&
		t.input.charCodeAt(t.position + 1) === 45 &&
		t.input.charCodeAt(t.position + 2) === 45
			? ((t.position += 3), _t(t, !0, -1))
			: n && G(t, "directives end mark is expected"),
		Mi(t, t.lineIndent - 1, ba, !1, !0),
		_t(t, !0, -1),
		t.checkLineBreaks &&
			oB.test(t.input.slice(e, t.position)) &&
			Ta(t, "non-ASCII line breaks are interpreted as content"),
		t.documents.push(t.result),
		t.position === t.lineStart && Ba(t))
	) {
		t.input.charCodeAt(t.position) === 46 && ((t.position += 3), _t(t, !0, -1));
		return;
	}
	if (t.position < t.length - 1)
		G(t, "end of the stream or a document separator is expected");
	else return;
}
function Mg(t, e) {
	(t = String(t)),
		(e = e || {}),
		t.length !== 0 &&
			(t.charCodeAt(t.length - 1) !== 10 &&
				t.charCodeAt(t.length - 1) !== 13 &&
				(t += `
`),
			t.charCodeAt(0) === 65279 && (t = t.slice(1)));
	var r = new uB(t, e),
		i = t.indexOf("\0");
	for (
		i !== -1 && ((r.position = i), G(r, "null byte is not allowed in input")),
			r.input += "\0";
		r.input.charCodeAt(r.position) === 32;
	)
		(r.lineIndent += 1), (r.position += 1);
	for (; r.position < r.length - 1; ) CB(r);
	return r.documents;
}
function bB(t, e, r) {
	e !== null && typeof e == "object" && typeof r > "u" && ((r = e), (e = null));
	var i = Mg(t, r);
	if (typeof e != "function") return i;
	for (var o = 0, n = i.length; o < n; o += 1) e(i[o]);
}
function TB(t, e) {
	var r = Mg(t, e);
	if (r.length !== 0) {
		if (r.length === 1) return r[0];
		throw new ze("expected a single document in the stream, but found more");
	}
}
var vB = bB,
	kB = TB,
	SB = { loadAll: vB, load: kB },
	wB = bg,
	AB = SB.load;
function BB(t) {
	let e = t.match(Rm);
	if (!e) return { text: t, metadata: {} };
	let r = AB(e[1], { schema: wB }) ?? {};
	r = typeof r == "object" && !Array.isArray(r) ? r : {};
	let i = {};
	return (
		r.displayMode && (i.displayMode = r.displayMode.toString()),
		r.title && (i.title = r.title.toString()),
		r.config && (i.config = r.config),
		{ text: t.slice(e[0].length), metadata: i }
	);
}
var FB = (t) =>
		t
			.replace(
				/\r\n?/g,
				`
`,
			)
			.replace(
				/<(\w+)([^>]*)>/g,
				(e, r, i) => "<" + r + i.replace(/="([^"]*)"/g, "='$1'") + ">",
			),
	LB = (t) => {
		let { text: e, metadata: r } = BB(t),
			{ displayMode: i, title: o, config: n = {} } = r;
		return (
			i && (n.gantt || (n.gantt = {}), (n.gantt.displayMode = i)),
			{ title: o, config: n, text: e }
		);
	},
	MB = (t) => {
		let e = wo.detectInit(t) ?? {},
			r = wo.detectDirective(t, "wrap");
		return (
			Array.isArray(r)
				? (e.wrap = r.some(({ type: i }) => {}))
				: r?.type === "wrap" && (e.wrap = !0),
			{ text: ik(t), directive: e }
		);
	};
function Eg(t) {
	let e = FB(t),
		r = LB(e),
		i = MB(r.text),
		o = Um(r.config, i.directive);
	return (t = Pw(i.text)), { code: t, title: r.title, config: o };
}
var EB = 5e4,
	OB = "graph TB;a[Maximum text size in diagram exceeded];style a fill:#faa",
	IB = "sandbox",
	DB = "loose",
	NB = "http://www.w3.org/2000/svg",
	RB = "http://www.w3.org/1999/xlink",
	PB = "http://www.w3.org/1999/xhtml",
	$B = "100%",
	zB = "100%",
	qB = "border:0;margin:0;",
	WB = "margin:0",
	UB = "allow-top-navigation-by-user-activation allow-popups",
	HB = 'The "iframe" tag is not supported by your browser.',
	YB = ["foreignobject"],
	jB = ["dominant-baseline"];
function Og(t) {
	let e = Eg(t);
	return ga(), Bk(e.config ?? {}), e;
}
async function GB(t, e) {
	Zl(), (t = Og(t).code);
	try {
		await ec(t);
	} catch (r) {
		if (e?.suppressErrors) return !1;
		throw r;
	}
	return !0;
}
var Am = (t, e, r = []) => `
.${t} ${e} { ${r.join(" !important; ")} !important; }`,
	VB = (t, e = {}) => {
		var r;
		let i = "";
		if (
			(t.themeCSS !== void 0 &&
				(i += `
${t.themeCSS}`),
			t.fontFamily !== void 0 &&
				(i += `
:root { --mermaid-font-family: ${t.fontFamily}}`),
			t.altFontFamily !== void 0 &&
				(i += `
:root { --mermaid-alt-font-family: ${t.altFontFamily}}`),
			!ta(e))
		) {
			let l =
				t.htmlLabels || ((r = t.flowchart) == null ? void 0 : r.htmlLabels)
					? ["> *", "span"]
					: ["rect", "polygon", "ellipse", "circle", "path"];
			for (let c in e) {
				let u = e[c];
				ta(u.styles) ||
					l.forEach((p) => {
						i += Am(u.id, p, u.styles);
					}),
					ta(u.textStyles) || (i += Am(u.id, "tspan", u.textStyles));
			}
		}
		return i;
	},
	XB = (t, e, r, i) => {
		let o = VB(t, r),
			n = VS(e, o, t.themeVariables);
		return ua(cm(`${i}{${n}}`), um);
	},
	KB = (t = "", e, r) => {
		let i = t;
		return (
			!r &&
				!e &&
				(i = i.replace(
					/marker-end="url\([\d+./:=?A-Za-z-]*?#/g,
					'marker-end="url(#',
				)),
			(i = kk(i)),
			(i = i.replace(/<br>/g, "<br/>")),
			i
		);
	},
	ZB = (t = "", e) => {
		var r, i;
		let o =
				(i = (r = e?.viewBox) == null ? void 0 : r.baseVal) != null && i.height
					? e.viewBox.baseVal.height + "px"
					: zB,
			n = btoa('<body style="' + WB + '">' + t + "</body>");
		return `<iframe style="width:${$B};height:${o};${qB}" src="data:text/html;base64,${n}" sandbox="${UB}">
  ${HB}
</iframe>`;
	},
	Bm = (t, e, r, i, o) => {
		let n = t.append("div");
		n.attr("id", r), i && n.attr("style", i);
		let a = n
			.append("svg")
			.attr("id", e)
			.attr("width", "100%")
			.attr("xmlns", NB);
		return o && a.attr("xmlns:xlink", o), a.append("g"), t;
	};
function Fm(t, e) {
	return t
		.append("iframe")
		.attr("id", e)
		.attr("style", "width: 100%; height: 100%;")
		.attr("sandbox", "");
}
var QB = (t, e, r, i) => {
		var o, n, a;
		(o = t.getElementById(e)) == null || o.remove(),
			(n = t.getElementById(r)) == null || n.remove(),
			(a = t.getElementById(i)) == null || a.remove();
	},
	JB = async function (t, e, r) {
		var i, o, n, a, l, c;
		Zl();
		let u = Og(e);
		e = u.code;
		let p = Te();
		X.debug(p), e.length > (p?.maxTextSize ?? EB) && (e = OB);
		let d = "#" + t,
			h = "i" + t,
			m = "#" + h,
			_ = "d" + t,
			b = "#" + _,
			v = Vt("body"),
			F = p.securityLevel === IB,
			T = p.securityLevel === DB,
			O = p.fontFamily;
		if (r !== void 0) {
			if ((r && (r.innerHTML = ""), F)) {
				let H = Fm(Vt(r), h);
				(v = Vt(H.nodes()[0].contentDocument.body)),
					(v.node().style.margin = 0);
			} else v = Vt(r);
			Bm(v, t, _, `font-family: ${O}`, RB);
		} else {
			if ((QB(document, t, _, h), F)) {
				let H = Fm(Vt("body"), h);
				(v = Vt(H.nodes()[0].contentDocument.body)),
					(v.node().style.margin = 0);
			} else v = Vt("body");
			Bm(v, t, _);
		}
		let A, R;
		try {
			A = await ec(e, { title: u.title });
		} catch (H) {
			(A = new _a("error")), (R = H);
		}
		let k = v.select(b).node(),
			D = A.type,
			M = k.firstChild,
			K = M.firstChild,
			J = (o = (i = A.renderer).getClasses) == null ? void 0 : o.call(i, e, A),
			P = XB(p, D, J, d),
			L = document.createElement("style");
		(L.innerHTML = P), M.insertBefore(L, K);
		try {
			await A.renderer.draw(e, t, gm, A);
		} catch (H) {
			throw (uw.draw(e, t, gm), H);
		}
		let y = v.select(`${b} svg`),
			C = (a = (n = A.db).getAccTitle) == null ? void 0 : a.call(n),
			N = (c = (l = A.db).getAccDescription) == null ? void 0 : c.call(l);
		eF(D, y, C, N),
			v.select(`[id="${t}"]`).selectAll("foreignobject > *").attr("xmlns", PB);
		let w = v.select(b).node().innerHTML;
		if (
			(X.debug("config.arrowMarkerAbsolute", p.arrowMarkerAbsolute),
			(w = KB(w, F, Im(p.arrowMarkerAbsolute))),
			F)
		) {
			let H = v.select(b + " svg").node();
			w = ZB(w, H);
		} else T || (w = Pr.default.sanitize(w, { ADD_TAGS: YB, ADD_ATTR: jB }));
		if ((Iw(), R)) throw R;
		let $ = Vt(F ? m : b).node();
		return (
			$ && "remove" in $ && $.remove(),
			{ svg: w, bindFunctions: A.db.bindFunctions }
		);
	};
function tF(t = {}) {
	var e;
	t?.fontFamily &&
		!((e = t.themeVariables) != null && e.fontFamily) &&
		(t.themeVariables || (t.themeVariables = {}),
		(t.themeVariables.fontFamily = t.fontFamily)),
		wk(t),
		t?.theme && t.theme in qe
			? (t.themeVariables = qe[t.theme].getThemeVariables(t.themeVariables))
			: t &&
				(t.themeVariables = qe.default.getThemeVariables(t.themeVariables));
	let r = typeof t == "object" ? Sk(t) : Ym();
	zl(r.logLevel), Zl();
}
var ec = (t, e = {}) => {
	let { code: r } = Eg(t);
	return Ow(r, e);
};
function eF(t, e, r, i) {
	Nw(e, t), Rw(e, r, i, e.attr("id"));
}
var $r = Object.freeze({
	render: JB,
	parse: GB,
	getDiagramFromText: ec,
	initialize: tF,
	getConfig: Te,
	setConfig: jm,
	getSiteConfig: Ym,
	updateSiteConfig: Ak,
	reset: () => {
		ga();
	},
	globalReset: () => {
		ga(Fi);
	},
	defaultConfig: Fi,
});
zl(Te().logLevel);
ga(Te());
var rF = async () => {
		X.debug("Loading registered diagrams");
		let e = (
			await Promise.allSettled(
				Object.entries(Bi).map(async ([r, { detector: i, loader: o }]) => {
					if (o)
						try {
							Kl(r);
						} catch {
							try {
								let { diagram: a, id: l } = await o();
								ya(l, a, i);
							} catch (a) {
								throw (
									(X.error(
										`Failed to load external diagram with key ${r}. Removing from detectors.`,
									),
									delete Bi[r],
									a)
								);
							}
						}
				}),
			)
		).filter((r) => r.status === "rejected");
		if (e.length > 0) {
			X.error(`Failed to load ${e.length} external diagrams`);
			for (let r of e) X.error(r);
			throw new Error(`Failed to load ${e.length} external diagrams`);
		}
	},
	iF = (t, e, r) => {
		X.warn(t),
			Wm(t)
				? (r && r(t.str, t.hash), e.push({ ...t, message: t.str, error: t }))
				: (r && r(t),
					t instanceof Error &&
						e.push({
							str: t.message,
							message: t.message,
							hash: t.name,
							error: t,
						}));
	},
	Ig = async function (t = { querySelector: ".mermaid" }) {
		try {
			await oF(t);
		} catch (e) {
			if (
				(Wm(e) && X.error(e.str),
				ve.parseError && ve.parseError(e),
				!t.suppressErrors)
			)
				throw (
					(X.error("Use the suppressErrors option to suppress these errors"), e)
				);
		}
	},
	oF = async function (
		{ postRenderCallback: t, querySelector: e, nodes: r } = {
			querySelector: ".mermaid",
		},
	) {
		let i = $r.getConfig();
		X.debug(`${t ? "" : "No "}Callback function found`);
		let o;
		if (r) o = r;
		else if (e) o = document.querySelectorAll(e);
		else throw new Error("Nodes and querySelector are both undefined");
		X.debug(`Found ${o.length} diagrams`),
			i?.startOnLoad !== void 0 &&
				(X.debug("Start On Load: " + i?.startOnLoad),
				$r.updateSiteConfig({ startOnLoad: i?.startOnLoad }));
		let n = new wo.InitIDGenerator(i.deterministicIds, i.deterministicIDSeed),
			a,
			l = [];
		for (let c of Array.from(o)) {
			X.info("Rendering diagram: " + c.id);
			if (c.getAttribute("data-processed")) continue;
			c.setAttribute("data-processed", "true");
			let u = `mermaid-${n.next()}`;
			(a = c.innerHTML),
				(a = Mc(wo.entityDecode(a))
					.trim()
					.replace(/<br\s*\/?>/gi, "<br/>"));
			let p = wo.detectInit(a);
			p && X.debug("Detected early reinit: ", p);
			try {
				let { svg: d, bindFunctions: h } = await Pg(u, a, c);
				(c.innerHTML = d), t && (await t(u)), h && h(c);
			} catch (d) {
				iF(d, l, ve.parseError);
			}
		}
		if (l.length > 0) throw l[0];
	},
	Dg = function (t) {
		$r.initialize(t);
	},
	nF = async function (t, e, r) {
		X.warn("mermaid.init is deprecated. Please use run instead."), t && Dg(t);
		let i = { postRenderCallback: r, querySelector: ".mermaid" };
		typeof e == "string"
			? (i.querySelector = e)
			: e && (e instanceof HTMLElement ? (i.nodes = [e]) : (i.nodes = e)),
			await Ig(i);
	},
	aF = async (t, { lazyLoad: e = !0 } = {}) => {
		Pm(...t), e === !1 && (await rF());
	},
	Ng = function () {
		if (ve.startOnLoad) {
			let { startOnLoad: t } = $r.getConfig();
			t && ve.run().catch((e) => X.error("Mermaid failed to initialize", e));
		}
	};
if (typeof document < "u") {
	window.addEventListener("load", Ng, !1);
}
var sF = function (t) {
		ve.parseError = t;
	},
	va = [],
	El = !1,
	Rg = async () => {
		if (!El) {
			for (El = !0; va.length > 0; ) {
				let t = va.shift();
				if (t)
					try {
						await t();
					} catch (e) {
						X.error("Error executing queue", e);
					}
			}
			El = !1;
		}
	},
	lF = async (t, e) =>
		new Promise((r, i) => {
			let o = () =>
				new Promise((n, a) => {
					$r.parse(t, e).then(
						(l) => {
							n(l), r(l);
						},
						(l) => {
							var c;
							X.error("Error parsing", l),
								(c = ve.parseError) == null || c.call(ve, l),
								a(l),
								i(l);
						},
					);
				});
			va.push(o), Rg().catch(i);
		}),
	Pg = (t, e, r) =>
		new Promise((i, o) => {
			let n = () =>
				new Promise((a, l) => {
					$r.render(t, e, r).then(
						(c) => {
							a(c), i(c);
						},
						(c) => {
							var u;
							X.error("Error parsing", c),
								(u = ve.parseError) == null || u.call(ve, c),
								l(c),
								o(c);
						},
					);
				});
			va.push(n), Rg().catch(o);
		}),
	ve = {
		startOnLoad: !0,
		mermaidAPI: $r,
		parse: lF,
		render: Pg,
		init: nF,
		run: Ig,
		registerExternalDiagrams: aF,
		initialize: Dg,
		parseError: void 0,
		contentLoaded: Ng,
		setParseErrorHandler: sF,
		detectType: wa,
	};
export {
	Mc as a,
	Ec as b,
	Ic as c,
	Dc as d,
	Nc as e,
	L0 as f,
	M0 as g,
	Vt as h,
	Bx as i,
	Wx as j,
	OC as k,
	Xi as l,
	gs as m,
	Fs as n,
	_r as o,
	ye as p,
	ei as q,
	ri as r,
	Ee as s,
	Oe as t,
	ii as u,
	vh as v,
	kh as w,
	je as x,
	Sh as y,
	wh as z,
	ni as A,
	fn as B,
	Jh as C,
	A_ as D,
	N_ as E,
	io as F,
	R_ as G,
	P_ as H,
	Us as I,
	ap as J,
	Qe as K,
	WC as L,
	Lr as M,
	W as N,
	V as O,
	xt as P,
	pi as Q,
	ue as R,
	Xt as S,
	di as T,
	Je as U,
	yo as V,
	Un as W,
	jp as X,
	Ci as Y,
	Vp as Z,
	Jp as _,
	Tl as $,
	td as aa,
	ed as ba,
	rd as ca,
	Yn as da,
	nd as ea,
	Ce as fa,
	Mr as ga,
	Er as ha,
	jn as ia,
	nr as ja,
	sd as ka,
	bi as la,
	pd as ma,
	md as na,
	Sl as oa,
	Ti as pa,
	yd as qa,
	_d as ra,
	Gn as sa,
	bd as ta,
	Vn as ua,
	Xn as va,
	Ld as wa,
	Md as xa,
	Id as ya,
	Dd as za,
	Nd as Aa,
	Pd as Ba,
	zd as Ca,
	Qn as Da,
	jd as Ea,
	ta as Fa,
	X as Ga,
	Lo as Ha,
	Bo as Ia,
	Im as Ja,
	UY as Ka,
	pm as La,
	HY as Ma,
	Pv as Na,
	ql as Oa,
	Hv as Pa,
	Xv as Qa,
	Nt as Ra,
	Jv as Sa,
	nk as Ta,
	fk as Ua,
	pk as Va,
	mk as Wa,
	yk as Xa,
	Ck as Ya,
	ma as Za,
	Hl as _a,
	Um as $a,
	wo as ab,
	kk as bb,
	Te as cb,
	fg as db,
	YS as eb,
	XS as fb,
	KS as gb,
	ZS as hb,
	QS as ib,
	JS as jb,
	tw as kb,
	ew as lb,
	rw as mb,
	Xl as nb,
	XY as ob,
	KY as pb,
	aw as qb,
	lw as rb,
	ve as sb,
};
/*! Bundled license information:

dompurify/dist/purify.js:
  (*! @license DOMPurify 3.1.6 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.1.6/LICENSE *)

mermaid/dist/mermaid-b5860b54.js:
  (*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT *)
  (*! Check if previously processed *)
  (*!
   * Wait for document loaded before starting the execution
   *)
*/
