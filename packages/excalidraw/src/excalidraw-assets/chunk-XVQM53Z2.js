import { a as E, b as R } from "./chunk-M2JW2GFW.js";
import { d as Ue, f as Kt } from "./chunk-SXMPUQ6M.js";
var Vs = Ue((Ys) => {
	E();
	var kd;
	(function (e) {
		typeof DO_NOT_EXPORT_CRC > "u"
			? typeof Ys == "object"
				? e(Ys)
				: typeof define == "function" && define.amd
					? define(function () {
							var t = {};
							return e(t), t;
						})
					: e((kd = {}))
			: e((kd = {}));
	})(function (e) {
		e.version = "0.3.0";
		function t() {
			for (var c = 0, l = new Array(256), d = 0; d != 256; ++d)
				(c = d),
					(c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1),
					(c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1),
					(c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1),
					(c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1),
					(c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1),
					(c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1),
					(c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1),
					(c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1),
					(l[d] = c);
			return typeof Int32Array < "u" ? new Int32Array(l) : l;
		}
		var n = t(),
			r = typeof Buffer < "u";
		function o(c) {
			if (c.length > 32768 && r) return i(new Buffer(c));
			for (var l = -1, d = c.length - 1, U = 0; U < d; )
				(l = n[(l ^ c.charCodeAt(U++)) & 255] ^ (l >>> 8)),
					(l = n[(l ^ c.charCodeAt(U++)) & 255] ^ (l >>> 8));
			return (
				U === d && (l = (l >>> 8) ^ n[(l ^ c.charCodeAt(U)) & 255]), l ^ -1
			);
		}
		function a(c) {
			if (c.length > 1e4) return i(c);
			for (var l = -1, d = 0, U = c.length - 3; d < U; )
				(l = (l >>> 8) ^ n[(l ^ c[d++]) & 255]),
					(l = (l >>> 8) ^ n[(l ^ c[d++]) & 255]),
					(l = (l >>> 8) ^ n[(l ^ c[d++]) & 255]),
					(l = (l >>> 8) ^ n[(l ^ c[d++]) & 255]);
			for (; d < U + 3; ) l = (l >>> 8) ^ n[(l ^ c[d++]) & 255];
			return l ^ -1;
		}
		function i(c) {
			for (var l = -1, d = 0, U = c.length - 7; d < U; )
				(l = (l >>> 8) ^ n[(l ^ c[d++]) & 255]),
					(l = (l >>> 8) ^ n[(l ^ c[d++]) & 255]),
					(l = (l >>> 8) ^ n[(l ^ c[d++]) & 255]),
					(l = (l >>> 8) ^ n[(l ^ c[d++]) & 255]),
					(l = (l >>> 8) ^ n[(l ^ c[d++]) & 255]),
					(l = (l >>> 8) ^ n[(l ^ c[d++]) & 255]),
					(l = (l >>> 8) ^ n[(l ^ c[d++]) & 255]),
					(l = (l >>> 8) ^ n[(l ^ c[d++]) & 255]);
			for (; d < U + 7; ) l = (l >>> 8) ^ n[(l ^ c[d++]) & 255];
			return l ^ -1;
		}
		function s(c) {
			for (var l = -1, d = 0, U = c.length, u, p; d < U; )
				(u = c.charCodeAt(d++)),
					u < 128
						? (l = (l >>> 8) ^ n[(l ^ u) & 255])
						: u < 2048
							? ((l = (l >>> 8) ^ n[(l ^ (192 | ((u >> 6) & 31))) & 255]),
								(l = (l >>> 8) ^ n[(l ^ (128 | (u & 63))) & 255]))
							: u >= 55296 && u < 57344
								? ((u = (u & 1023) + 64),
									(p = c.charCodeAt(d++) & 1023),
									(l = (l >>> 8) ^ n[(l ^ (240 | ((u >> 8) & 7))) & 255]),
									(l = (l >>> 8) ^ n[(l ^ (128 | ((u >> 2) & 63))) & 255]),
									(l =
										(l >>> 8) ^
										n[(l ^ (128 | ((p >> 6) & 15) | (u & 3))) & 255]),
									(l = (l >>> 8) ^ n[(l ^ (128 | (p & 63))) & 255]))
								: ((l = (l >>> 8) ^ n[(l ^ (224 | ((u >> 12) & 15))) & 255]),
									(l = (l >>> 8) ^ n[(l ^ (128 | ((u >> 6) & 63))) & 255]),
									(l = (l >>> 8) ^ n[(l ^ (128 | (u & 63))) & 255]));
			return l ^ -1;
		}
		(e.table = n), (e.bstr = o), (e.buf = a), (e.str = s);
	});
});
var Vd = Ue((sT, Yd) => {
	E();
	var Dh = Vs();
	Yd.exports = Nh;
	var Ht = new Uint8Array(4),
		Sh = new Int32Array(Ht.buffer),
		$h = new Uint32Array(Ht.buffer);
	function Nh(e) {
		if (e[0] !== 137) throw new Error("Invalid .png file header");
		if (e[1] !== 80) throw new Error("Invalid .png file header");
		if (e[2] !== 78) throw new Error("Invalid .png file header");
		if (e[3] !== 71) throw new Error("Invalid .png file header");
		if (e[4] !== 13)
			throw new Error(
				"Invalid .png file header: possibly caused by DOS-Unix line ending conversion?",
			);
		if (e[5] !== 10)
			throw new Error(
				"Invalid .png file header: possibly caused by DOS-Unix line ending conversion?",
			);
		if (e[6] !== 26) throw new Error("Invalid .png file header");
		if (e[7] !== 10)
			throw new Error(
				"Invalid .png file header: possibly caused by DOS-Unix line ending conversion?",
			);
		for (var t = !1, n = [], r = 8; r < e.length; ) {
			(Ht[3] = e[r++]), (Ht[2] = e[r++]), (Ht[1] = e[r++]), (Ht[0] = e[r++]);
			var o = $h[0] + 4,
				a = new Uint8Array(o);
			(a[0] = e[r++]), (a[1] = e[r++]), (a[2] = e[r++]), (a[3] = e[r++]);
			var i =
				String.fromCharCode(a[0]) +
				String.fromCharCode(a[1]) +
				String.fromCharCode(a[2]) +
				String.fromCharCode(a[3]);
			if (!n.length && i !== "IHDR") throw new Error("IHDR header missing");
			if (i === "IEND") {
				(t = !0), n.push({ name: i, data: new Uint8Array(0) });
				break;
			}
			for (var s = 4; s < o; s++) a[s] = e[r++];
			(Ht[3] = e[r++]), (Ht[2] = e[r++]), (Ht[1] = e[r++]), (Ht[0] = e[r++]);
			var c = Sh[0],
				l = Dh.buf(a);
			if (l !== c)
				throw new Error(
					"CRC values for " +
						i +
						" header do not match, PNG file is likely corrupted",
				);
			var d = new Uint8Array(a.buffer.slice(4));
			n.push({ name: i, data: d });
		}
		if (!t)
			throw new Error(".png file ended prematurely: no IEND header was found");
		return n;
	}
});
var Gd = Ue((lT, qd) => {
	E();
	qd.exports = Ph;
	function Ph(e, t) {
		if (
			((e = String(e)),
			(t = String(t)),
			!/^[\x00-\xFF]+$/.test(e) || !/^[\x00-\xFF]+$/.test(t))
		)
			throw new Error(
				"Only Latin-1 characters are permitted in PNG tEXt chunks. You might want to consider base64 encoding and/or zEXt compression",
			);
		if (e.length >= 80)
			throw new Error(
				'Keyword "' +
					e +
					'" is longer than the 79-character limit imposed by the PNG specification',
			);
		for (
			var n = e.length + t.length + 1, r = new Uint8Array(n), o = 0, a, i = 0;
			i < e.length;
			i++
		) {
			if (!(a = e.charCodeAt(i)))
				throw new Error("0x00 character is not permitted in tEXt keywords");
			r[o++] = a;
		}
		r[o++] = 0;
		for (var s = 0; s < t.length; s++) {
			if (!(a = t.charCodeAt(s)))
				throw new Error("0x00 character is not permitted in tEXt content");
			r[o++] = a;
		}
		return { name: "tEXt", data: r };
	}
});
var Zd = Ue((UT, Xd) => {
	E();
	Xd.exports = Fh;
	function Fh(e) {
		e.data && e.name && (e = e.data);
		for (var t = !0, n = "", r = "", o = 0; o < e.length; o++) {
			var a = e[o];
			if (t) a ? (r += String.fromCharCode(a)) : (t = !1);
			else if (a) n += String.fromCharCode(a);
			else
				throw new Error(
					"Invalid NULL character found. 0x00 character is not permitted in tEXt content",
				);
		}
		return { keyword: r, text: n };
	}
});
var Wd = Ue((qs) => {
	E();
	qs.encode = Gd();
	qs.decode = Zd();
});
var Qd = Ue((mT, zd) => {
	E();
	zd.exports = function (e, t, n) {
		var r = [],
			o = e.length;
		if (o === 0) return r;
		var a = t < 0 ? Math.max(0, t + o) : t || 0;
		for (n !== void 0 && (o = n < 0 ? n + o : n); o-- > a; ) r[o - a] = e[o];
		return r;
	};
});
var eU = Ue((bT, jd) => {
	E();
	var Oh = Qd(),
		Ah = Vs();
	jd.exports = Kh;
	var Jt = new Uint8Array(4),
		Bh = new Int32Array(Jt.buffer),
		Ch = new Uint32Array(Jt.buffer);
	function Kh(e) {
		var t = 8,
			n = t,
			r;
		for (r = 0; r < e.length; r++) (t += e[r].data.length), (t += 12);
		var o = new Uint8Array(t);
		for (
			o[0] = 137,
				o[1] = 80,
				o[2] = 78,
				o[3] = 71,
				o[4] = 13,
				o[5] = 10,
				o[6] = 26,
				o[7] = 10,
				r = 0;
			r < e.length;
			r++
		) {
			var a = e[r],
				i = a.name,
				s = a.data,
				c = s.length,
				l = [
					i.charCodeAt(0),
					i.charCodeAt(1),
					i.charCodeAt(2),
					i.charCodeAt(3),
				];
			(Ch[0] = c),
				(o[n++] = Jt[3]),
				(o[n++] = Jt[2]),
				(o[n++] = Jt[1]),
				(o[n++] = Jt[0]),
				(o[n++] = l[0]),
				(o[n++] = l[1]),
				(o[n++] = l[2]),
				(o[n++] = l[3]);
			for (var d = 0; d < c; ) o[n++] = s[d++];
			var U = l.concat(Oh(s)),
				u = Ah.buf(U);
			(Bh[0] = u),
				(o[n++] = Jt[3]),
				(o[n++] = Jt[2]),
				(o[n++] = Jt[1]),
				(o[n++] = Jt[0]);
		}
		return o;
	}
});
var mn = Ue((He) => {
	"use strict";
	E();
	var Hh =
		typeof Uint8Array < "u" &&
		typeof Uint16Array < "u" &&
		typeof Int32Array < "u";
	function Jh(e, t) {
		return Object.prototype.hasOwnProperty.call(e, t);
	}
	He.assign = function (e) {
		for (var t = Array.prototype.slice.call(arguments, 1); t.length; ) {
			var n = t.shift();
			if (n) {
				if (typeof n != "object") throw new TypeError(n + "must be non-object");
				for (var r in n) Jh(n, r) && (e[r] = n[r]);
			}
		}
		return e;
	};
	He.shrinkBuf = function (e, t) {
		return e.length === t
			? e
			: e.subarray
				? e.subarray(0, t)
				: ((e.length = t), e);
	};
	var kh = {
			arraySet: function (e, t, n, r, o) {
				if (t.subarray && e.subarray) {
					e.set(t.subarray(n, n + r), o);
					return;
				}
				for (var a = 0; a < r; a++) e[o + a] = t[n + a];
			},
			flattenChunks: function (e) {
				var t, n, r, o, a, i;
				for (r = 0, t = 0, n = e.length; t < n; t++) r += e[t].length;
				for (i = new Uint8Array(r), o = 0, t = 0, n = e.length; t < n; t++)
					(a = e[t]), i.set(a, o), (o += a.length);
				return i;
			},
		},
		Yh = {
			arraySet: function (e, t, n, r, o) {
				for (var a = 0; a < r; a++) e[o + a] = t[n + a];
			},
			flattenChunks: function (e) {
				return [].concat.apply([], e);
			},
		};
	He.setTyped = function (e) {
		e
			? ((He.Buf8 = Uint8Array),
				(He.Buf16 = Uint16Array),
				(He.Buf32 = Int32Array),
				He.assign(He, kh))
			: ((He.Buf8 = Array),
				(He.Buf16 = Array),
				(He.Buf32 = Array),
				He.assign(He, Yh));
	};
	He.setTyped(Hh);
});
var IU = Ue((Gr) => {
	"use strict";
	E();
	var Vh = mn(),
		qh = 4,
		tU = 0,
		nU = 1,
		Gh = 2;
	function qr(e) {
		for (var t = e.length; --t >= 0; ) e[t] = 0;
	}
	var Xh = 0,
		cU = 1,
		Zh = 2,
		Wh = 3,
		zh = 258,
		js = 29,
		Po = 256,
		Do = Po + 1 + js,
		Vr = 30,
		ec = 19,
		lU = 2 * Do + 1,
		fr = 15,
		Gs = 16,
		Qh = 7,
		tc = 256,
		dU = 16,
		UU = 17,
		fU = 18,
		zs = [
			0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5,
			5, 5, 5, 0,
		],
		Ya = [
			0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10,
			11, 11, 12, 12, 13, 13,
		],
		jh = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
		uU = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
		eb = 512,
		hn = new Array((Do + 2) * 2);
	qr(hn);
	var Lo = new Array(Vr * 2);
	qr(Lo);
	var So = new Array(eb);
	qr(So);
	var $o = new Array(zh - Wh + 1);
	qr($o);
	var nc = new Array(js);
	qr(nc);
	var Va = new Array(Vr);
	qr(Va);
	function Xs(e, t, n, r, o) {
		(this.static_tree = e),
			(this.extra_bits = t),
			(this.extra_base = n),
			(this.elems = r),
			(this.max_length = o),
			(this.has_stree = e && e.length);
	}
	var pU, mU, hU;
	function Zs(e, t) {
		(this.dyn_tree = e), (this.max_code = 0), (this.stat_desc = t);
	}
	function bU(e) {
		return e < 256 ? So[e] : So[256 + (e >>> 7)];
	}
	function No(e, t) {
		(e.pending_buf[e.pending++] = t & 255),
			(e.pending_buf[e.pending++] = (t >>> 8) & 255);
	}
	function Ze(e, t, n) {
		e.bi_valid > Gs - n
			? ((e.bi_buf |= (t << e.bi_valid) & 65535),
				No(e, e.bi_buf),
				(e.bi_buf = t >> (Gs - e.bi_valid)),
				(e.bi_valid += n - Gs))
			: ((e.bi_buf |= (t << e.bi_valid) & 65535), (e.bi_valid += n));
	}
	function kt(e, t, n) {
		Ze(e, n[t * 2], n[t * 2 + 1]);
	}
	function gU(e, t) {
		var n = 0;
		do (n |= e & 1), (e >>>= 1), (n <<= 1);
		while (--t > 0);
		return n >>> 1;
	}
	function tb(e) {
		e.bi_valid === 16
			? (No(e, e.bi_buf), (e.bi_buf = 0), (e.bi_valid = 0))
			: e.bi_valid >= 8 &&
				((e.pending_buf[e.pending++] = e.bi_buf & 255),
				(e.bi_buf >>= 8),
				(e.bi_valid -= 8));
	}
	function nb(e, t) {
		var n = t.dyn_tree,
			r = t.max_code,
			o = t.stat_desc.static_tree,
			a = t.stat_desc.has_stree,
			i = t.stat_desc.extra_bits,
			s = t.stat_desc.extra_base,
			c = t.stat_desc.max_length,
			l,
			d,
			U,
			u,
			p,
			m,
			h = 0;
		for (u = 0; u <= fr; u++) e.bl_count[u] = 0;
		for (n[e.heap[e.heap_max] * 2 + 1] = 0, l = e.heap_max + 1; l < lU; l++)
			(d = e.heap[l]),
				(u = n[n[d * 2 + 1] * 2 + 1] + 1),
				u > c && ((u = c), h++),
				(n[d * 2 + 1] = u),
				!(d > r) &&
					(e.bl_count[u]++,
					(p = 0),
					d >= s && (p = i[d - s]),
					(m = n[d * 2]),
					(e.opt_len += m * (u + p)),
					a && (e.static_len += m * (o[d * 2 + 1] + p)));
		if (h !== 0) {
			do {
				for (u = c - 1; e.bl_count[u] === 0; ) u--;
				e.bl_count[u]--, (e.bl_count[u + 1] += 2), e.bl_count[c]--, (h -= 2);
			} while (h > 0);
			for (u = c; u !== 0; u--)
				for (d = e.bl_count[u]; d !== 0; )
					(U = e.heap[--l]),
						!(U > r) &&
							(n[U * 2 + 1] !== u &&
								((e.opt_len += (u - n[U * 2 + 1]) * n[U * 2]),
								(n[U * 2 + 1] = u)),
							d--);
		}
	}
	function EU(e, t, n) {
		var r = new Array(fr + 1),
			o = 0,
			a,
			i;
		for (a = 1; a <= fr; a++) r[a] = o = (o + n[a - 1]) << 1;
		for (i = 0; i <= t; i++) {
			var s = e[i * 2 + 1];
			s !== 0 && (e[i * 2] = gU(r[s]++, s));
		}
	}
	function rb() {
		var e,
			t,
			n,
			r,
			o,
			a = new Array(fr + 1);
		for (n = 0, r = 0; r < js - 1; r++)
			for (nc[r] = n, e = 0; e < 1 << zs[r]; e++) $o[n++] = r;
		for ($o[n - 1] = r, o = 0, r = 0; r < 16; r++)
			for (Va[r] = o, e = 0; e < 1 << Ya[r]; e++) So[o++] = r;
		for (o >>= 7; r < Vr; r++)
			for (Va[r] = o << 7, e = 0; e < 1 << (Ya[r] - 7); e++) So[256 + o++] = r;
		for (t = 0; t <= fr; t++) a[t] = 0;
		for (e = 0; e <= 143; ) (hn[e * 2 + 1] = 8), e++, a[8]++;
		for (; e <= 255; ) (hn[e * 2 + 1] = 9), e++, a[9]++;
		for (; e <= 279; ) (hn[e * 2 + 1] = 7), e++, a[7]++;
		for (; e <= 287; ) (hn[e * 2 + 1] = 8), e++, a[8]++;
		for (EU(hn, Do + 1, a), e = 0; e < Vr; e++)
			(Lo[e * 2 + 1] = 5), (Lo[e * 2] = gU(e, 5));
		(pU = new Xs(hn, zs, Po + 1, Do, fr)),
			(mU = new Xs(Lo, Ya, 0, Vr, fr)),
			(hU = new Xs(new Array(0), jh, 0, ec, Qh));
	}
	function xU(e) {
		var t;
		for (t = 0; t < Do; t++) e.dyn_ltree[t * 2] = 0;
		for (t = 0; t < Vr; t++) e.dyn_dtree[t * 2] = 0;
		for (t = 0; t < ec; t++) e.bl_tree[t * 2] = 0;
		(e.dyn_ltree[tc * 2] = 1),
			(e.opt_len = e.static_len = 0),
			(e.last_lit = e.matches = 0);
	}
	function yU(e) {
		e.bi_valid > 8
			? No(e, e.bi_buf)
			: e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf),
			(e.bi_buf = 0),
			(e.bi_valid = 0);
	}
	function ob(e, t, n, r) {
		yU(e),
			r && (No(e, n), No(e, ~n)),
			Vh.arraySet(e.pending_buf, e.window, t, n, e.pending),
			(e.pending += n);
	}
	function rU(e, t, n, r) {
		var o = t * 2,
			a = n * 2;
		return e[o] < e[a] || (e[o] === e[a] && r[t] <= r[n]);
	}
	function Ws(e, t, n) {
		for (
			var r = e.heap[n], o = n << 1;
			o <= e.heap_len &&
			(o < e.heap_len && rU(t, e.heap[o + 1], e.heap[o], e.depth) && o++,
			!rU(t, r, e.heap[o], e.depth));
		)
			(e.heap[n] = e.heap[o]), (n = o), (o <<= 1);
		e.heap[n] = r;
	}
	function oU(e, t, n) {
		var r,
			o,
			a = 0,
			i,
			s;
		if (e.last_lit !== 0)
			do
				(r =
					(e.pending_buf[e.d_buf + a * 2] << 8) |
					e.pending_buf[e.d_buf + a * 2 + 1]),
					(o = e.pending_buf[e.l_buf + a]),
					a++,
					r === 0
						? kt(e, o, t)
						: ((i = $o[o]),
							kt(e, i + Po + 1, t),
							(s = zs[i]),
							s !== 0 && ((o -= nc[i]), Ze(e, o, s)),
							r--,
							(i = bU(r)),
							kt(e, i, n),
							(s = Ya[i]),
							s !== 0 && ((r -= Va[i]), Ze(e, r, s)));
			while (a < e.last_lit);
		kt(e, tc, t);
	}
	function Qs(e, t) {
		var n = t.dyn_tree,
			r = t.stat_desc.static_tree,
			o = t.stat_desc.has_stree,
			a = t.stat_desc.elems,
			i,
			s,
			c = -1,
			l;
		for (e.heap_len = 0, e.heap_max = lU, i = 0; i < a; i++)
			n[i * 2] !== 0
				? ((e.heap[++e.heap_len] = c = i), (e.depth[i] = 0))
				: (n[i * 2 + 1] = 0);
		for (; e.heap_len < 2; )
			(l = e.heap[++e.heap_len] = c < 2 ? ++c : 0),
				(n[l * 2] = 1),
				(e.depth[l] = 0),
				e.opt_len--,
				o && (e.static_len -= r[l * 2 + 1]);
		for (t.max_code = c, i = e.heap_len >> 1; i >= 1; i--) Ws(e, n, i);
		l = a;
		do
			(i = e.heap[1]),
				(e.heap[1] = e.heap[e.heap_len--]),
				Ws(e, n, 1),
				(s = e.heap[1]),
				(e.heap[--e.heap_max] = i),
				(e.heap[--e.heap_max] = s),
				(n[l * 2] = n[i * 2] + n[s * 2]),
				(e.depth[l] = (e.depth[i] >= e.depth[s] ? e.depth[i] : e.depth[s]) + 1),
				(n[i * 2 + 1] = n[s * 2 + 1] = l),
				(e.heap[1] = l++),
				Ws(e, n, 1);
		while (e.heap_len >= 2);
		(e.heap[--e.heap_max] = e.heap[1]), nb(e, t), EU(n, c, e.bl_count);
	}
	function aU(e, t, n) {
		var r,
			o = -1,
			a,
			i = t[0 * 2 + 1],
			s = 0,
			c = 7,
			l = 4;
		for (
			i === 0 && ((c = 138), (l = 3)), t[(n + 1) * 2 + 1] = 65535, r = 0;
			r <= n;
			r++
		)
			(a = i),
				(i = t[(r + 1) * 2 + 1]),
				!(++s < c && a === i) &&
					(s < l
						? (e.bl_tree[a * 2] += s)
						: a !== 0
							? (a !== o && e.bl_tree[a * 2]++, e.bl_tree[dU * 2]++)
							: s <= 10
								? e.bl_tree[UU * 2]++
								: e.bl_tree[fU * 2]++,
					(s = 0),
					(o = a),
					i === 0
						? ((c = 138), (l = 3))
						: a === i
							? ((c = 6), (l = 3))
							: ((c = 7), (l = 4)));
	}
	function iU(e, t, n) {
		var r,
			o = -1,
			a,
			i = t[0 * 2 + 1],
			s = 0,
			c = 7,
			l = 4;
		for (i === 0 && ((c = 138), (l = 3)), r = 0; r <= n; r++)
			if (((a = i), (i = t[(r + 1) * 2 + 1]), !(++s < c && a === i))) {
				if (s < l)
					do kt(e, a, e.bl_tree);
					while (--s !== 0);
				else
					a !== 0
						? (a !== o && (kt(e, a, e.bl_tree), s--),
							kt(e, dU, e.bl_tree),
							Ze(e, s - 3, 2))
						: s <= 10
							? (kt(e, UU, e.bl_tree), Ze(e, s - 3, 3))
							: (kt(e, fU, e.bl_tree), Ze(e, s - 11, 7));
				(s = 0),
					(o = a),
					i === 0
						? ((c = 138), (l = 3))
						: a === i
							? ((c = 6), (l = 3))
							: ((c = 7), (l = 4));
			}
	}
	function ab(e) {
		var t;
		for (
			aU(e, e.dyn_ltree, e.l_desc.max_code),
				aU(e, e.dyn_dtree, e.d_desc.max_code),
				Qs(e, e.bl_desc),
				t = ec - 1;
			t >= 3 && e.bl_tree[uU[t] * 2 + 1] === 0;
			t--
		);
		return (e.opt_len += 3 * (t + 1) + 5 + 5 + 4), t;
	}
	function ib(e, t, n, r) {
		var o;
		for (Ze(e, t - 257, 5), Ze(e, n - 1, 5), Ze(e, r - 4, 4), o = 0; o < r; o++)
			Ze(e, e.bl_tree[uU[o] * 2 + 1], 3);
		iU(e, e.dyn_ltree, t - 1), iU(e, e.dyn_dtree, n - 1);
	}
	function sb(e) {
		var t = 4093624447,
			n;
		for (n = 0; n <= 31; n++, t >>>= 1)
			if (t & 1 && e.dyn_ltree[n * 2] !== 0) return tU;
		if (
			e.dyn_ltree[9 * 2] !== 0 ||
			e.dyn_ltree[10 * 2] !== 0 ||
			e.dyn_ltree[13 * 2] !== 0
		)
			return nU;
		for (n = 32; n < Po; n++) if (e.dyn_ltree[n * 2] !== 0) return nU;
		return tU;
	}
	var sU = !1;
	function cb(e) {
		sU || (rb(), (sU = !0)),
			(e.l_desc = new Zs(e.dyn_ltree, pU)),
			(e.d_desc = new Zs(e.dyn_dtree, mU)),
			(e.bl_desc = new Zs(e.bl_tree, hU)),
			(e.bi_buf = 0),
			(e.bi_valid = 0),
			xU(e);
	}
	function wU(e, t, n, r) {
		Ze(e, (Xh << 1) + (r ? 1 : 0), 3), ob(e, t, n, !0);
	}
	function lb(e) {
		Ze(e, cU << 1, 3), kt(e, tc, hn), tb(e);
	}
	function db(e, t, n, r) {
		var o,
			a,
			i = 0;
		e.level > 0
			? (e.strm.data_type === Gh && (e.strm.data_type = sb(e)),
				Qs(e, e.l_desc),
				Qs(e, e.d_desc),
				(i = ab(e)),
				(o = (e.opt_len + 3 + 7) >>> 3),
				(a = (e.static_len + 3 + 7) >>> 3),
				a <= o && (o = a))
			: (o = a = n + 5),
			n + 4 <= o && t !== -1
				? wU(e, t, n, r)
				: e.strategy === qh || a === o
					? (Ze(e, (cU << 1) + (r ? 1 : 0), 3), oU(e, hn, Lo))
					: (Ze(e, (Zh << 1) + (r ? 1 : 0), 3),
						ib(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, i + 1),
						oU(e, e.dyn_ltree, e.dyn_dtree)),
			xU(e),
			r && yU(e);
	}
	function Ub(e, t, n) {
		return (
			(e.pending_buf[e.d_buf + e.last_lit * 2] = (t >>> 8) & 255),
			(e.pending_buf[e.d_buf + e.last_lit * 2 + 1] = t & 255),
			(e.pending_buf[e.l_buf + e.last_lit] = n & 255),
			e.last_lit++,
			t === 0
				? e.dyn_ltree[n * 2]++
				: (e.matches++,
					t--,
					e.dyn_ltree[($o[n] + Po + 1) * 2]++,
					e.dyn_dtree[bU(t) * 2]++),
			e.last_lit === e.lit_bufsize - 1
		);
	}
	Gr._tr_init = cb;
	Gr._tr_stored_block = wU;
	Gr._tr_flush_block = db;
	Gr._tr_tally = Ub;
	Gr._tr_align = lb;
});
var rc = Ue((IT, TU) => {
	"use strict";
	E();
	function fb(e, t, n, r) {
		for (
			var o = (e & 65535) | 0, a = ((e >>> 16) & 65535) | 0, i = 0;
			n !== 0;
		) {
			(i = n > 2e3 ? 2e3 : n), (n -= i);
			do (o = (o + t[r++]) | 0), (a = (a + o) | 0);
			while (--i);
			(o %= 65521), (a %= 65521);
		}
		return o | (a << 16) | 0;
	}
	TU.exports = fb;
});
var oc = Ue((RT, RU) => {
	"use strict";
	E();
	function ub() {
		for (var e, t = [], n = 0; n < 256; n++) {
			e = n;
			for (var r = 0; r < 8; r++) e = e & 1 ? 3988292384 ^ (e >>> 1) : e >>> 1;
			t[n] = e;
		}
		return t;
	}
	var pb = ub();
	function mb(e, t, n, r) {
		var o = pb,
			a = r + n;
		e ^= -1;
		for (var i = r; i < a; i++) e = (e >>> 8) ^ o[(e ^ t[i]) & 255];
		return e ^ -1;
	}
	RU.exports = mb;
});
var qa = Ue((MT, vU) => {
	"use strict";
	E();
	vU.exports = {
		2: "need dictionary",
		1: "stream end",
		0: "",
		"-1": "file error",
		"-2": "stream error",
		"-3": "data error",
		"-4": "insufficient memory",
		"-5": "buffer error",
		"-6": "incompatible version",
	};
});
var FU = Ue((qt) => {
	"use strict";
	E();
	var Je = mn(),
		ct = IU(),
		DU = rc(),
		An = oc(),
		hb = qa(),
		hr = 0,
		bb = 1,
		gb = 3,
		Jn = 4,
		MU = 5,
		Vt = 0,
		_U = 1,
		lt = -2,
		Eb = -3,
		ac = -5,
		xb = -1,
		yb = 1,
		Ga = 2,
		wb = 3,
		Ib = 4,
		Tb = 0,
		Rb = 2,
		za = 8,
		vb = 9,
		Mb = 15,
		_b = 8,
		Lb = 29,
		Db = 256,
		sc = Db + 1 + Lb,
		Sb = 30,
		$b = 19,
		Nb = 2 * sc + 1,
		Pb = 15,
		ne = 3,
		Kn = 258,
		gt = Kn + ne + 1,
		Fb = 32,
		Qa = 42,
		cc = 69,
		Xa = 73,
		Za = 91,
		Wa = 103,
		ur = 113,
		Oo = 666,
		Le = 1,
		Ao = 2,
		pr = 3,
		Wr = 4,
		Ob = 3;
	function Hn(e, t) {
		return (e.msg = hb[t]), t;
	}
	function LU(e) {
		return (e << 1) - (e > 4 ? 9 : 0);
	}
	function Cn(e) {
		for (var t = e.length; --t >= 0; ) e[t] = 0;
	}
	function Bn(e) {
		var t = e.state,
			n = t.pending;
		n > e.avail_out && (n = e.avail_out),
			n !== 0 &&
				(Je.arraySet(e.output, t.pending_buf, t.pending_out, n, e.next_out),
				(e.next_out += n),
				(t.pending_out += n),
				(e.total_out += n),
				(e.avail_out -= n),
				(t.pending -= n),
				t.pending === 0 && (t.pending_out = 0));
	}
	function $e(e, t) {
		ct._tr_flush_block(
			e,
			e.block_start >= 0 ? e.block_start : -1,
			e.strstart - e.block_start,
			t,
		),
			(e.block_start = e.strstart),
			Bn(e.strm);
	}
	function ie(e, t) {
		e.pending_buf[e.pending++] = t;
	}
	function Fo(e, t) {
		(e.pending_buf[e.pending++] = (t >>> 8) & 255),
			(e.pending_buf[e.pending++] = t & 255);
	}
	function Ab(e, t, n, r) {
		var o = e.avail_in;
		return (
			o > r && (o = r),
			o === 0
				? 0
				: ((e.avail_in -= o),
					Je.arraySet(t, e.input, e.next_in, o, n),
					e.state.wrap === 1
						? (e.adler = DU(e.adler, t, o, n))
						: e.state.wrap === 2 && (e.adler = An(e.adler, t, o, n)),
					(e.next_in += o),
					(e.total_in += o),
					o)
		);
	}
	function SU(e, t) {
		var n = e.max_chain_length,
			r = e.strstart,
			o,
			a,
			i = e.prev_length,
			s = e.nice_match,
			c = e.strstart > e.w_size - gt ? e.strstart - (e.w_size - gt) : 0,
			l = e.window,
			d = e.w_mask,
			U = e.prev,
			u = e.strstart + Kn,
			p = l[r + i - 1],
			m = l[r + i];
		e.prev_length >= e.good_match && (n >>= 2),
			s > e.lookahead && (s = e.lookahead);
		do
			if (
				((o = t),
				!(
					l[o + i] !== m ||
					l[o + i - 1] !== p ||
					l[o] !== l[r] ||
					l[++o] !== l[r + 1]
				))
			) {
				(r += 2), o++;
				do;
				while (
					l[++r] === l[++o] &&
					l[++r] === l[++o] &&
					l[++r] === l[++o] &&
					l[++r] === l[++o] &&
					l[++r] === l[++o] &&
					l[++r] === l[++o] &&
					l[++r] === l[++o] &&
					l[++r] === l[++o] &&
					r < u
				);
				if (((a = Kn - (u - r)), (r = u - Kn), a > i)) {
					if (((e.match_start = t), (i = a), a >= s)) break;
					(p = l[r + i - 1]), (m = l[r + i]);
				}
			}
		while ((t = U[t & d]) > c && --n !== 0);
		return i <= e.lookahead ? i : e.lookahead;
	}
	function mr(e) {
		var t = e.w_size,
			n,
			r,
			o,
			a,
			i;
		do {
			if (
				((a = e.window_size - e.lookahead - e.strstart),
				e.strstart >= t + (t - gt))
			) {
				Je.arraySet(e.window, e.window, t, t, 0),
					(e.match_start -= t),
					(e.strstart -= t),
					(e.block_start -= t),
					(r = e.hash_size),
					(n = r);
				do (o = e.head[--n]), (e.head[n] = o >= t ? o - t : 0);
				while (--r);
				(r = t), (n = r);
				do (o = e.prev[--n]), (e.prev[n] = o >= t ? o - t : 0);
				while (--r);
				a += t;
			}
			if (e.strm.avail_in === 0) break;
			if (
				((r = Ab(e.strm, e.window, e.strstart + e.lookahead, a)),
				(e.lookahead += r),
				e.lookahead + e.insert >= ne)
			)
				for (
					i = e.strstart - e.insert,
						e.ins_h = e.window[i],
						e.ins_h =
							((e.ins_h << e.hash_shift) ^ e.window[i + 1]) & e.hash_mask;
					e.insert &&
					((e.ins_h =
						((e.ins_h << e.hash_shift) ^ e.window[i + ne - 1]) & e.hash_mask),
					(e.prev[i & e.w_mask] = e.head[e.ins_h]),
					(e.head[e.ins_h] = i),
					i++,
					e.insert--,
					!(e.lookahead + e.insert < ne));
				);
		} while (e.lookahead < gt && e.strm.avail_in !== 0);
	}
	function Bb(e, t) {
		var n = 65535;
		for (n > e.pending_buf_size - 5 && (n = e.pending_buf_size - 5); ; ) {
			if (e.lookahead <= 1) {
				if ((mr(e), e.lookahead === 0 && t === hr)) return Le;
				if (e.lookahead === 0) break;
			}
			(e.strstart += e.lookahead), (e.lookahead = 0);
			var r = e.block_start + n;
			if (
				((e.strstart === 0 || e.strstart >= r) &&
					((e.lookahead = e.strstart - r),
					(e.strstart = r),
					$e(e, !1),
					e.strm.avail_out === 0)) ||
				(e.strstart - e.block_start >= e.w_size - gt &&
					($e(e, !1), e.strm.avail_out === 0))
			)
				return Le;
		}
		return (
			(e.insert = 0),
			t === Jn
				? ($e(e, !0), e.strm.avail_out === 0 ? pr : Wr)
				: (e.strstart > e.block_start && ($e(e, !1), e.strm.avail_out === 0),
					Le)
		);
	}
	function ic(e, t) {
		for (var n, r; ; ) {
			if (e.lookahead < gt) {
				if ((mr(e), e.lookahead < gt && t === hr)) return Le;
				if (e.lookahead === 0) break;
			}
			if (
				((n = 0),
				e.lookahead >= ne &&
					((e.ins_h =
						((e.ins_h << e.hash_shift) ^ e.window[e.strstart + ne - 1]) &
						e.hash_mask),
					(n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
					(e.head[e.ins_h] = e.strstart)),
				n !== 0 &&
					e.strstart - n <= e.w_size - gt &&
					(e.match_length = SU(e, n)),
				e.match_length >= ne)
			)
				if (
					((r = ct._tr_tally(
						e,
						e.strstart - e.match_start,
						e.match_length - ne,
					)),
					(e.lookahead -= e.match_length),
					e.match_length <= e.max_lazy_match && e.lookahead >= ne)
				) {
					e.match_length--;
					do
						e.strstart++,
							(e.ins_h =
								((e.ins_h << e.hash_shift) ^ e.window[e.strstart + ne - 1]) &
								e.hash_mask),
							(n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
							(e.head[e.ins_h] = e.strstart);
					while (--e.match_length !== 0);
					e.strstart++;
				} else
					(e.strstart += e.match_length),
						(e.match_length = 0),
						(e.ins_h = e.window[e.strstart]),
						(e.ins_h =
							((e.ins_h << e.hash_shift) ^ e.window[e.strstart + 1]) &
							e.hash_mask);
			else
				(r = ct._tr_tally(e, 0, e.window[e.strstart])),
					e.lookahead--,
					e.strstart++;
			if (r && ($e(e, !1), e.strm.avail_out === 0)) return Le;
		}
		return (
			(e.insert = e.strstart < ne - 1 ? e.strstart : ne - 1),
			t === Jn
				? ($e(e, !0), e.strm.avail_out === 0 ? pr : Wr)
				: e.last_lit && ($e(e, !1), e.strm.avail_out === 0)
					? Le
					: Ao
		);
	}
	function Xr(e, t) {
		for (var n, r, o; ; ) {
			if (e.lookahead < gt) {
				if ((mr(e), e.lookahead < gt && t === hr)) return Le;
				if (e.lookahead === 0) break;
			}
			if (
				((n = 0),
				e.lookahead >= ne &&
					((e.ins_h =
						((e.ins_h << e.hash_shift) ^ e.window[e.strstart + ne - 1]) &
						e.hash_mask),
					(n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
					(e.head[e.ins_h] = e.strstart)),
				(e.prev_length = e.match_length),
				(e.prev_match = e.match_start),
				(e.match_length = ne - 1),
				n !== 0 &&
					e.prev_length < e.max_lazy_match &&
					e.strstart - n <= e.w_size - gt &&
					((e.match_length = SU(e, n)),
					e.match_length <= 5 &&
						(e.strategy === yb ||
							(e.match_length === ne && e.strstart - e.match_start > 4096)) &&
						(e.match_length = ne - 1)),
				e.prev_length >= ne && e.match_length <= e.prev_length)
			) {
				(o = e.strstart + e.lookahead - ne),
					(r = ct._tr_tally(
						e,
						e.strstart - 1 - e.prev_match,
						e.prev_length - ne,
					)),
					(e.lookahead -= e.prev_length - 1),
					(e.prev_length -= 2);
				do
					++e.strstart <= o &&
						((e.ins_h =
							((e.ins_h << e.hash_shift) ^ e.window[e.strstart + ne - 1]) &
							e.hash_mask),
						(n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
						(e.head[e.ins_h] = e.strstart));
				while (--e.prev_length !== 0);
				if (
					((e.match_available = 0),
					(e.match_length = ne - 1),
					e.strstart++,
					r && ($e(e, !1), e.strm.avail_out === 0))
				)
					return Le;
			} else if (e.match_available) {
				if (
					((r = ct._tr_tally(e, 0, e.window[e.strstart - 1])),
					r && $e(e, !1),
					e.strstart++,
					e.lookahead--,
					e.strm.avail_out === 0)
				)
					return Le;
			} else (e.match_available = 1), e.strstart++, e.lookahead--;
		}
		return (
			e.match_available &&
				((r = ct._tr_tally(e, 0, e.window[e.strstart - 1])),
				(e.match_available = 0)),
			(e.insert = e.strstart < ne - 1 ? e.strstart : ne - 1),
			t === Jn
				? ($e(e, !0), e.strm.avail_out === 0 ? pr : Wr)
				: e.last_lit && ($e(e, !1), e.strm.avail_out === 0)
					? Le
					: Ao
		);
	}
	function Cb(e, t) {
		for (var n, r, o, a, i = e.window; ; ) {
			if (e.lookahead <= Kn) {
				if ((mr(e), e.lookahead <= Kn && t === hr)) return Le;
				if (e.lookahead === 0) break;
			}
			if (
				((e.match_length = 0),
				e.lookahead >= ne &&
					e.strstart > 0 &&
					((o = e.strstart - 1),
					(r = i[o]),
					r === i[++o] && r === i[++o] && r === i[++o]))
			) {
				a = e.strstart + Kn;
				do;
				while (
					r === i[++o] &&
					r === i[++o] &&
					r === i[++o] &&
					r === i[++o] &&
					r === i[++o] &&
					r === i[++o] &&
					r === i[++o] &&
					r === i[++o] &&
					o < a
				);
				(e.match_length = Kn - (a - o)),
					e.match_length > e.lookahead && (e.match_length = e.lookahead);
			}
			if (
				(e.match_length >= ne
					? ((n = ct._tr_tally(e, 1, e.match_length - ne)),
						(e.lookahead -= e.match_length),
						(e.strstart += e.match_length),
						(e.match_length = 0))
					: ((n = ct._tr_tally(e, 0, e.window[e.strstart])),
						e.lookahead--,
						e.strstart++),
				n && ($e(e, !1), e.strm.avail_out === 0))
			)
				return Le;
		}
		return (
			(e.insert = 0),
			t === Jn
				? ($e(e, !0), e.strm.avail_out === 0 ? pr : Wr)
				: e.last_lit && ($e(e, !1), e.strm.avail_out === 0)
					? Le
					: Ao
		);
	}
	function Kb(e, t) {
		for (var n; ; ) {
			if (e.lookahead === 0 && (mr(e), e.lookahead === 0)) {
				if (t === hr) return Le;
				break;
			}
			if (
				((e.match_length = 0),
				(n = ct._tr_tally(e, 0, e.window[e.strstart])),
				e.lookahead--,
				e.strstart++,
				n && ($e(e, !1), e.strm.avail_out === 0))
			)
				return Le;
		}
		return (
			(e.insert = 0),
			t === Jn
				? ($e(e, !0), e.strm.avail_out === 0 ? pr : Wr)
				: e.last_lit && ($e(e, !1), e.strm.avail_out === 0)
					? Le
					: Ao
		);
	}
	function Yt(e, t, n, r, o) {
		(this.good_length = e),
			(this.max_lazy = t),
			(this.nice_length = n),
			(this.max_chain = r),
			(this.func = o);
	}
	var Zr;
	Zr = [
		new Yt(0, 0, 0, 0, Bb),
		new Yt(4, 4, 8, 4, ic),
		new Yt(4, 5, 16, 8, ic),
		new Yt(4, 6, 32, 32, ic),
		new Yt(4, 4, 16, 16, Xr),
		new Yt(8, 16, 32, 32, Xr),
		new Yt(8, 16, 128, 128, Xr),
		new Yt(8, 32, 128, 256, Xr),
		new Yt(32, 128, 258, 1024, Xr),
		new Yt(32, 258, 258, 4096, Xr),
	];
	function Hb(e) {
		(e.window_size = 2 * e.w_size),
			Cn(e.head),
			(e.max_lazy_match = Zr[e.level].max_lazy),
			(e.good_match = Zr[e.level].good_length),
			(e.nice_match = Zr[e.level].nice_length),
			(e.max_chain_length = Zr[e.level].max_chain),
			(e.strstart = 0),
			(e.block_start = 0),
			(e.lookahead = 0),
			(e.insert = 0),
			(e.match_length = e.prev_length = ne - 1),
			(e.match_available = 0),
			(e.ins_h = 0);
	}
	function Jb() {
		(this.strm = null),
			(this.status = 0),
			(this.pending_buf = null),
			(this.pending_buf_size = 0),
			(this.pending_out = 0),
			(this.pending = 0),
			(this.wrap = 0),
			(this.gzhead = null),
			(this.gzindex = 0),
			(this.method = za),
			(this.last_flush = -1),
			(this.w_size = 0),
			(this.w_bits = 0),
			(this.w_mask = 0),
			(this.window = null),
			(this.window_size = 0),
			(this.prev = null),
			(this.head = null),
			(this.ins_h = 0),
			(this.hash_size = 0),
			(this.hash_bits = 0),
			(this.hash_mask = 0),
			(this.hash_shift = 0),
			(this.block_start = 0),
			(this.match_length = 0),
			(this.prev_match = 0),
			(this.match_available = 0),
			(this.strstart = 0),
			(this.match_start = 0),
			(this.lookahead = 0),
			(this.prev_length = 0),
			(this.max_chain_length = 0),
			(this.max_lazy_match = 0),
			(this.level = 0),
			(this.strategy = 0),
			(this.good_match = 0),
			(this.nice_match = 0),
			(this.dyn_ltree = new Je.Buf16(Nb * 2)),
			(this.dyn_dtree = new Je.Buf16((2 * Sb + 1) * 2)),
			(this.bl_tree = new Je.Buf16((2 * $b + 1) * 2)),
			Cn(this.dyn_ltree),
			Cn(this.dyn_dtree),
			Cn(this.bl_tree),
			(this.l_desc = null),
			(this.d_desc = null),
			(this.bl_desc = null),
			(this.bl_count = new Je.Buf16(Pb + 1)),
			(this.heap = new Je.Buf16(2 * sc + 1)),
			Cn(this.heap),
			(this.heap_len = 0),
			(this.heap_max = 0),
			(this.depth = new Je.Buf16(2 * sc + 1)),
			Cn(this.depth),
			(this.l_buf = 0),
			(this.lit_bufsize = 0),
			(this.last_lit = 0),
			(this.d_buf = 0),
			(this.opt_len = 0),
			(this.static_len = 0),
			(this.matches = 0),
			(this.insert = 0),
			(this.bi_buf = 0),
			(this.bi_valid = 0);
	}
	function $U(e) {
		var t;
		return !e || !e.state
			? Hn(e, lt)
			: ((e.total_in = e.total_out = 0),
				(e.data_type = Rb),
				(t = e.state),
				(t.pending = 0),
				(t.pending_out = 0),
				t.wrap < 0 && (t.wrap = -t.wrap),
				(t.status = t.wrap ? Qa : ur),
				(e.adler = t.wrap === 2 ? 0 : 1),
				(t.last_flush = hr),
				ct._tr_init(t),
				Vt);
	}
	function NU(e) {
		var t = $U(e);
		return t === Vt && Hb(e.state), t;
	}
	function kb(e, t) {
		return !e || !e.state || e.state.wrap !== 2
			? lt
			: ((e.state.gzhead = t), Vt);
	}
	function PU(e, t, n, r, o, a) {
		if (!e) return lt;
		var i = 1;
		if (
			(t === xb && (t = 6),
			r < 0 ? ((i = 0), (r = -r)) : r > 15 && ((i = 2), (r -= 16)),
			o < 1 ||
				o > vb ||
				n !== za ||
				r < 8 ||
				r > 15 ||
				t < 0 ||
				t > 9 ||
				a < 0 ||
				a > Ib)
		)
			return Hn(e, lt);
		r === 8 && (r = 9);
		var s = new Jb();
		return (
			(e.state = s),
			(s.strm = e),
			(s.wrap = i),
			(s.gzhead = null),
			(s.w_bits = r),
			(s.w_size = 1 << s.w_bits),
			(s.w_mask = s.w_size - 1),
			(s.hash_bits = o + 7),
			(s.hash_size = 1 << s.hash_bits),
			(s.hash_mask = s.hash_size - 1),
			(s.hash_shift = ~~((s.hash_bits + ne - 1) / ne)),
			(s.window = new Je.Buf8(s.w_size * 2)),
			(s.head = new Je.Buf16(s.hash_size)),
			(s.prev = new Je.Buf16(s.w_size)),
			(s.lit_bufsize = 1 << (o + 6)),
			(s.pending_buf_size = s.lit_bufsize * 4),
			(s.pending_buf = new Je.Buf8(s.pending_buf_size)),
			(s.d_buf = 1 * s.lit_bufsize),
			(s.l_buf = 3 * s.lit_bufsize),
			(s.level = t),
			(s.strategy = a),
			(s.method = n),
			NU(e)
		);
	}
	function Yb(e, t) {
		return PU(e, t, za, Mb, _b, Tb);
	}
	function Vb(e, t) {
		var n, r, o, a;
		if (!e || !e.state || t > MU || t < 0) return e ? Hn(e, lt) : lt;
		if (
			((r = e.state),
			!e.output ||
				(!e.input && e.avail_in !== 0) ||
				(r.status === Oo && t !== Jn))
		)
			return Hn(e, e.avail_out === 0 ? ac : lt);
		if (((r.strm = e), (n = r.last_flush), (r.last_flush = t), r.status === Qa))
			if (r.wrap === 2)
				(e.adler = 0),
					ie(r, 31),
					ie(r, 139),
					ie(r, 8),
					r.gzhead
						? (ie(
								r,
								(r.gzhead.text ? 1 : 0) +
									(r.gzhead.hcrc ? 2 : 0) +
									(r.gzhead.extra ? 4 : 0) +
									(r.gzhead.name ? 8 : 0) +
									(r.gzhead.comment ? 16 : 0),
							),
							ie(r, r.gzhead.time & 255),
							ie(r, (r.gzhead.time >> 8) & 255),
							ie(r, (r.gzhead.time >> 16) & 255),
							ie(r, (r.gzhead.time >> 24) & 255),
							ie(
								r,
								r.level === 9 ? 2 : r.strategy >= Ga || r.level < 2 ? 4 : 0,
							),
							ie(r, r.gzhead.os & 255),
							r.gzhead.extra &&
								r.gzhead.extra.length &&
								(ie(r, r.gzhead.extra.length & 255),
								ie(r, (r.gzhead.extra.length >> 8) & 255)),
							r.gzhead.hcrc &&
								(e.adler = An(e.adler, r.pending_buf, r.pending, 0)),
							(r.gzindex = 0),
							(r.status = cc))
						: (ie(r, 0),
							ie(r, 0),
							ie(r, 0),
							ie(r, 0),
							ie(r, 0),
							ie(
								r,
								r.level === 9 ? 2 : r.strategy >= Ga || r.level < 2 ? 4 : 0,
							),
							ie(r, Ob),
							(r.status = ur));
			else {
				var i = (za + ((r.w_bits - 8) << 4)) << 8,
					s = -1;
				r.strategy >= Ga || r.level < 2
					? (s = 0)
					: r.level < 6
						? (s = 1)
						: r.level === 6
							? (s = 2)
							: (s = 3),
					(i |= s << 6),
					r.strstart !== 0 && (i |= Fb),
					(i += 31 - (i % 31)),
					(r.status = ur),
					Fo(r, i),
					r.strstart !== 0 && (Fo(r, e.adler >>> 16), Fo(r, e.adler & 65535)),
					(e.adler = 1);
			}
		if (r.status === cc)
			if (r.gzhead.extra) {
				for (
					o = r.pending;
					r.gzindex < (r.gzhead.extra.length & 65535) &&
					!(
						r.pending === r.pending_buf_size &&
						(r.gzhead.hcrc &&
							r.pending > o &&
							(e.adler = An(e.adler, r.pending_buf, r.pending - o, o)),
						Bn(e),
						(o = r.pending),
						r.pending === r.pending_buf_size)
					);
				)
					ie(r, r.gzhead.extra[r.gzindex] & 255), r.gzindex++;
				r.gzhead.hcrc &&
					r.pending > o &&
					(e.adler = An(e.adler, r.pending_buf, r.pending - o, o)),
					r.gzindex === r.gzhead.extra.length &&
						((r.gzindex = 0), (r.status = Xa));
			} else r.status = Xa;
		if (r.status === Xa)
			if (r.gzhead.name) {
				o = r.pending;
				do {
					if (
						r.pending === r.pending_buf_size &&
						(r.gzhead.hcrc &&
							r.pending > o &&
							(e.adler = An(e.adler, r.pending_buf, r.pending - o, o)),
						Bn(e),
						(o = r.pending),
						r.pending === r.pending_buf_size)
					) {
						a = 1;
						break;
					}
					r.gzindex < r.gzhead.name.length
						? (a = r.gzhead.name.charCodeAt(r.gzindex++) & 255)
						: (a = 0),
						ie(r, a);
				} while (a !== 0);
				r.gzhead.hcrc &&
					r.pending > o &&
					(e.adler = An(e.adler, r.pending_buf, r.pending - o, o)),
					a === 0 && ((r.gzindex = 0), (r.status = Za));
			} else r.status = Za;
		if (r.status === Za)
			if (r.gzhead.comment) {
				o = r.pending;
				do {
					if (
						r.pending === r.pending_buf_size &&
						(r.gzhead.hcrc &&
							r.pending > o &&
							(e.adler = An(e.adler, r.pending_buf, r.pending - o, o)),
						Bn(e),
						(o = r.pending),
						r.pending === r.pending_buf_size)
					) {
						a = 1;
						break;
					}
					r.gzindex < r.gzhead.comment.length
						? (a = r.gzhead.comment.charCodeAt(r.gzindex++) & 255)
						: (a = 0),
						ie(r, a);
				} while (a !== 0);
				r.gzhead.hcrc &&
					r.pending > o &&
					(e.adler = An(e.adler, r.pending_buf, r.pending - o, o)),
					a === 0 && (r.status = Wa);
			} else r.status = Wa;
		if (
			(r.status === Wa &&
				(r.gzhead.hcrc
					? (r.pending + 2 > r.pending_buf_size && Bn(e),
						r.pending + 2 <= r.pending_buf_size &&
							(ie(r, e.adler & 255),
							ie(r, (e.adler >> 8) & 255),
							(e.adler = 0),
							(r.status = ur)))
					: (r.status = ur)),
			r.pending !== 0)
		) {
			if ((Bn(e), e.avail_out === 0)) return (r.last_flush = -1), Vt;
		} else if (e.avail_in === 0 && LU(t) <= LU(n) && t !== Jn) return Hn(e, ac);
		if (r.status === Oo && e.avail_in !== 0) return Hn(e, ac);
		if (
			e.avail_in !== 0 ||
			r.lookahead !== 0 ||
			(t !== hr && r.status !== Oo)
		) {
			var c =
				r.strategy === Ga
					? Kb(r, t)
					: r.strategy === wb
						? Cb(r, t)
						: Zr[r.level].func(r, t);
			if (((c === pr || c === Wr) && (r.status = Oo), c === Le || c === pr))
				return e.avail_out === 0 && (r.last_flush = -1), Vt;
			if (
				c === Ao &&
				(t === bb
					? ct._tr_align(r)
					: t !== MU &&
						(ct._tr_stored_block(r, 0, 0, !1),
						t === gb &&
							(Cn(r.head),
							r.lookahead === 0 &&
								((r.strstart = 0), (r.block_start = 0), (r.insert = 0)))),
				Bn(e),
				e.avail_out === 0)
			)
				return (r.last_flush = -1), Vt;
		}
		return t !== Jn
			? Vt
			: r.wrap <= 0
				? _U
				: (r.wrap === 2
						? (ie(r, e.adler & 255),
							ie(r, (e.adler >> 8) & 255),
							ie(r, (e.adler >> 16) & 255),
							ie(r, (e.adler >> 24) & 255),
							ie(r, e.total_in & 255),
							ie(r, (e.total_in >> 8) & 255),
							ie(r, (e.total_in >> 16) & 255),
							ie(r, (e.total_in >> 24) & 255))
						: (Fo(r, e.adler >>> 16), Fo(r, e.adler & 65535)),
					Bn(e),
					r.wrap > 0 && (r.wrap = -r.wrap),
					r.pending !== 0 ? Vt : _U);
	}
	function qb(e) {
		var t;
		return !e || !e.state
			? lt
			: ((t = e.state.status),
				t !== Qa &&
				t !== cc &&
				t !== Xa &&
				t !== Za &&
				t !== Wa &&
				t !== ur &&
				t !== Oo
					? Hn(e, lt)
					: ((e.state = null), t === ur ? Hn(e, Eb) : Vt));
	}
	function Gb(e, t) {
		var n = t.length,
			r,
			o,
			a,
			i,
			s,
			c,
			l,
			d;
		if (
			!e ||
			!e.state ||
			((r = e.state),
			(i = r.wrap),
			i === 2 || (i === 1 && r.status !== Qa) || r.lookahead)
		)
			return lt;
		for (
			i === 1 && (e.adler = DU(e.adler, t, n, 0)),
				r.wrap = 0,
				n >= r.w_size &&
					(i === 0 &&
						(Cn(r.head), (r.strstart = 0), (r.block_start = 0), (r.insert = 0)),
					(d = new Je.Buf8(r.w_size)),
					Je.arraySet(d, t, n - r.w_size, r.w_size, 0),
					(t = d),
					(n = r.w_size)),
				s = e.avail_in,
				c = e.next_in,
				l = e.input,
				e.avail_in = n,
				e.next_in = 0,
				e.input = t,
				mr(r);
			r.lookahead >= ne;
		) {
			(o = r.strstart), (a = r.lookahead - (ne - 1));
			do
				(r.ins_h =
					((r.ins_h << r.hash_shift) ^ r.window[o + ne - 1]) & r.hash_mask),
					(r.prev[o & r.w_mask] = r.head[r.ins_h]),
					(r.head[r.ins_h] = o),
					o++;
			while (--a);
			(r.strstart = o), (r.lookahead = ne - 1), mr(r);
		}
		return (
			(r.strstart += r.lookahead),
			(r.block_start = r.strstart),
			(r.insert = r.lookahead),
			(r.lookahead = 0),
			(r.match_length = r.prev_length = ne - 1),
			(r.match_available = 0),
			(e.next_in = c),
			(e.input = l),
			(e.avail_in = s),
			(r.wrap = i),
			Vt
		);
	}
	qt.deflateInit = Yb;
	qt.deflateInit2 = PU;
	qt.deflateReset = NU;
	qt.deflateResetKeep = $U;
	qt.deflateSetHeader = kb;
	qt.deflate = Vb;
	qt.deflateEnd = qb;
	qt.deflateSetDictionary = Gb;
	qt.deflateInfo = "pako deflate (from Nodeca project)";
});
var lc = Ue((zr) => {
	"use strict";
	E();
	var ja = mn(),
		OU = !0,
		AU = !0;
	try {
		String.fromCharCode.apply(null, [0]);
	} catch {
		OU = !1;
	}
	try {
		String.fromCharCode.apply(null, new Uint8Array(1));
	} catch {
		AU = !1;
	}
	var Bo = new ja.Buf8(256);
	for (bn = 0; bn < 256; bn++)
		Bo[bn] =
			bn >= 252
				? 6
				: bn >= 248
					? 5
					: bn >= 240
						? 4
						: bn >= 224
							? 3
							: bn >= 192
								? 2
								: 1;
	var bn;
	Bo[254] = Bo[254] = 1;
	zr.string2buf = function (e) {
		var t,
			n,
			r,
			o,
			a,
			i = e.length,
			s = 0;
		for (o = 0; o < i; o++)
			(n = e.charCodeAt(o)),
				(n & 64512) === 55296 &&
					o + 1 < i &&
					((r = e.charCodeAt(o + 1)),
					(r & 64512) === 56320 &&
						((n = 65536 + ((n - 55296) << 10) + (r - 56320)), o++)),
				(s += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4);
		for (t = new ja.Buf8(s), a = 0, o = 0; a < s; o++)
			(n = e.charCodeAt(o)),
				(n & 64512) === 55296 &&
					o + 1 < i &&
					((r = e.charCodeAt(o + 1)),
					(r & 64512) === 56320 &&
						((n = 65536 + ((n - 55296) << 10) + (r - 56320)), o++)),
				n < 128
					? (t[a++] = n)
					: n < 2048
						? ((t[a++] = 192 | (n >>> 6)), (t[a++] = 128 | (n & 63)))
						: n < 65536
							? ((t[a++] = 224 | (n >>> 12)),
								(t[a++] = 128 | ((n >>> 6) & 63)),
								(t[a++] = 128 | (n & 63)))
							: ((t[a++] = 240 | (n >>> 18)),
								(t[a++] = 128 | ((n >>> 12) & 63)),
								(t[a++] = 128 | ((n >>> 6) & 63)),
								(t[a++] = 128 | (n & 63)));
		return t;
	};
	function BU(e, t) {
		if (t < 65534 && ((e.subarray && AU) || (!e.subarray && OU)))
			return String.fromCharCode.apply(null, ja.shrinkBuf(e, t));
		for (var n = "", r = 0; r < t; r++) n += String.fromCharCode(e[r]);
		return n;
	}
	zr.buf2binstring = function (e) {
		return BU(e, e.length);
	};
	zr.binstring2buf = function (e) {
		for (var t = new ja.Buf8(e.length), n = 0, r = t.length; n < r; n++)
			t[n] = e.charCodeAt(n);
		return t;
	};
	zr.buf2string = function (e, t) {
		var n,
			r,
			o,
			a,
			i = t || e.length,
			s = new Array(i * 2);
		for (r = 0, n = 0; n < i; ) {
			if (((o = e[n++]), o < 128)) {
				s[r++] = o;
				continue;
			}
			if (((a = Bo[o]), a > 4)) {
				(s[r++] = 65533), (n += a - 1);
				continue;
			}
			for (o &= a === 2 ? 31 : a === 3 ? 15 : 7; a > 1 && n < i; )
				(o = (o << 6) | (e[n++] & 63)), a--;
			if (a > 1) {
				s[r++] = 65533;
				continue;
			}
			o < 65536
				? (s[r++] = o)
				: ((o -= 65536),
					(s[r++] = 55296 | ((o >> 10) & 1023)),
					(s[r++] = 56320 | (o & 1023)));
		}
		return BU(s, r);
	};
	zr.utf8border = function (e, t) {
		var n;
		for (
			t = t || e.length, t > e.length && (t = e.length), n = t - 1;
			n >= 0 && (e[n] & 192) === 128;
		)
			n--;
		return n < 0 || n === 0 ? t : n + Bo[e[n]] > t ? n : t;
	};
});
var dc = Ue((NT, CU) => {
	"use strict";
	E();
	function Xb() {
		(this.input = null),
			(this.next_in = 0),
			(this.avail_in = 0),
			(this.total_in = 0),
			(this.output = null),
			(this.next_out = 0),
			(this.avail_out = 0),
			(this.total_out = 0),
			(this.msg = ""),
			(this.state = null),
			(this.data_type = 2),
			(this.adler = 0);
	}
	CU.exports = Xb;
});
var kU = Ue((Ho) => {
	"use strict";
	E();
	var Co = FU(),
		Ko = mn(),
		fc = lc(),
		uc = qa(),
		Zb = dc(),
		JU = Object.prototype.toString,
		Wb = 0,
		Uc = 4,
		Qr = 0,
		KU = 1,
		HU = 2,
		zb = -1,
		Qb = 0,
		jb = 8;
	function br(e) {
		if (!(this instanceof br)) return new br(e);
		this.options = Ko.assign(
			{
				level: zb,
				method: jb,
				chunkSize: 16384,
				windowBits: 15,
				memLevel: 8,
				strategy: Qb,
				to: "",
			},
			e || {},
		);
		var t = this.options;
		t.raw && t.windowBits > 0
			? (t.windowBits = -t.windowBits)
			: t.gzip && t.windowBits > 0 && t.windowBits < 16 && (t.windowBits += 16),
			(this.err = 0),
			(this.msg = ""),
			(this.ended = !1),
			(this.chunks = []),
			(this.strm = new Zb()),
			(this.strm.avail_out = 0);
		var n = Co.deflateInit2(
			this.strm,
			t.level,
			t.method,
			t.windowBits,
			t.memLevel,
			t.strategy,
		);
		if (n !== Qr) throw new Error(uc[n]);
		if ((t.header && Co.deflateSetHeader(this.strm, t.header), t.dictionary)) {
			var r;
			if (
				(typeof t.dictionary == "string"
					? (r = fc.string2buf(t.dictionary))
					: JU.call(t.dictionary) === "[object ArrayBuffer]"
						? (r = new Uint8Array(t.dictionary))
						: (r = t.dictionary),
				(n = Co.deflateSetDictionary(this.strm, r)),
				n !== Qr)
			)
				throw new Error(uc[n]);
			this._dict_set = !0;
		}
	}
	br.prototype.push = function (e, t) {
		var n = this.strm,
			r = this.options.chunkSize,
			o,
			a;
		if (this.ended) return !1;
		(a = t === ~~t ? t : t === !0 ? Uc : Wb),
			typeof e == "string"
				? (n.input = fc.string2buf(e))
				: JU.call(e) === "[object ArrayBuffer]"
					? (n.input = new Uint8Array(e))
					: (n.input = e),
			(n.next_in = 0),
			(n.avail_in = n.input.length);
		do {
			if (
				(n.avail_out === 0 &&
					((n.output = new Ko.Buf8(r)), (n.next_out = 0), (n.avail_out = r)),
				(o = Co.deflate(n, a)),
				o !== KU && o !== Qr)
			)
				return this.onEnd(o), (this.ended = !0), !1;
			(n.avail_out === 0 || (n.avail_in === 0 && (a === Uc || a === HU))) &&
				(this.options.to === "string"
					? this.onData(fc.buf2binstring(Ko.shrinkBuf(n.output, n.next_out)))
					: this.onData(Ko.shrinkBuf(n.output, n.next_out)));
		} while ((n.avail_in > 0 || n.avail_out === 0) && o !== KU);
		return a === Uc
			? ((o = Co.deflateEnd(this.strm)),
				this.onEnd(o),
				(this.ended = !0),
				o === Qr)
			: (a === HU && (this.onEnd(Qr), (n.avail_out = 0)), !0);
	};
	br.prototype.onData = function (e) {
		this.chunks.push(e);
	};
	br.prototype.onEnd = function (e) {
		e === Qr &&
			(this.options.to === "string"
				? (this.result = this.chunks.join(""))
				: (this.result = Ko.flattenChunks(this.chunks))),
			(this.chunks = []),
			(this.err = e),
			(this.msg = this.strm.msg);
	};
	function pc(e, t) {
		var n = new br(t);
		if ((n.push(e, !0), n.err)) throw n.msg || uc[n.err];
		return n.result;
	}
	function e7(e, t) {
		return (t = t || {}), (t.raw = !0), pc(e, t);
	}
	function t7(e, t) {
		return (t = t || {}), (t.gzip = !0), pc(e, t);
	}
	Ho.Deflate = br;
	Ho.deflate = pc;
	Ho.deflateRaw = e7;
	Ho.gzip = t7;
});
var VU = Ue((AT, YU) => {
	"use strict";
	E();
	var ei = 30,
		n7 = 12;
	YU.exports = function (t, n) {
		var r,
			o,
			a,
			i,
			s,
			c,
			l,
			d,
			U,
			u,
			p,
			m,
			h,
			g,
			x,
			y,
			w,
			T,
			I,
			_,
			L,
			M,
			N,
			$,
			S;
		(r = t.state),
			(o = t.next_in),
			($ = t.input),
			(a = o + (t.avail_in - 5)),
			(i = t.next_out),
			(S = t.output),
			(s = i - (n - t.avail_out)),
			(c = i + (t.avail_out - 257)),
			(l = r.dmax),
			(d = r.wsize),
			(U = r.whave),
			(u = r.wnext),
			(p = r.window),
			(m = r.hold),
			(h = r.bits),
			(g = r.lencode),
			(x = r.distcode),
			(y = (1 << r.lenbits) - 1),
			(w = (1 << r.distbits) - 1);
		e: do {
			h < 15 && ((m += $[o++] << h), (h += 8), (m += $[o++] << h), (h += 8)),
				(T = g[m & y]);
			t: for (;;) {
				if (
					((I = T >>> 24),
					(m >>>= I),
					(h -= I),
					(I = (T >>> 16) & 255),
					I === 0)
				)
					S[i++] = T & 65535;
				else if (I & 16) {
					(_ = T & 65535),
						(I &= 15),
						I &&
							(h < I && ((m += $[o++] << h), (h += 8)),
							(_ += m & ((1 << I) - 1)),
							(m >>>= I),
							(h -= I)),
						h < 15 &&
							((m += $[o++] << h), (h += 8), (m += $[o++] << h), (h += 8)),
						(T = x[m & w]);
					n: for (;;) {
						if (
							((I = T >>> 24),
							(m >>>= I),
							(h -= I),
							(I = (T >>> 16) & 255),
							I & 16)
						) {
							if (
								((L = T & 65535),
								(I &= 15),
								h < I &&
									((m += $[o++] << h),
									(h += 8),
									h < I && ((m += $[o++] << h), (h += 8))),
								(L += m & ((1 << I) - 1)),
								L > l)
							) {
								(t.msg = "invalid distance too far back"), (r.mode = ei);
								break e;
							}
							if (((m >>>= I), (h -= I), (I = i - s), L > I)) {
								if (((I = L - I), I > U && r.sane)) {
									(t.msg = "invalid distance too far back"), (r.mode = ei);
									break e;
								}
								if (((M = 0), (N = p), u === 0)) {
									if (((M += d - I), I < _)) {
										_ -= I;
										do S[i++] = p[M++];
										while (--I);
										(M = i - L), (N = S);
									}
								} else if (u < I) {
									if (((M += d + u - I), (I -= u), I < _)) {
										_ -= I;
										do S[i++] = p[M++];
										while (--I);
										if (((M = 0), u < _)) {
											(I = u), (_ -= I);
											do S[i++] = p[M++];
											while (--I);
											(M = i - L), (N = S);
										}
									}
								} else if (((M += u - I), I < _)) {
									_ -= I;
									do S[i++] = p[M++];
									while (--I);
									(M = i - L), (N = S);
								}
								for (; _ > 2; )
									(S[i++] = N[M++]),
										(S[i++] = N[M++]),
										(S[i++] = N[M++]),
										(_ -= 3);
								_ && ((S[i++] = N[M++]), _ > 1 && (S[i++] = N[M++]));
							} else {
								M = i - L;
								do
									(S[i++] = S[M++]),
										(S[i++] = S[M++]),
										(S[i++] = S[M++]),
										(_ -= 3);
								while (_ > 2);
								_ && ((S[i++] = S[M++]), _ > 1 && (S[i++] = S[M++]));
							}
						} else if (I & 64) {
							(t.msg = "invalid distance code"), (r.mode = ei);
							break e;
						} else {
							T = x[(T & 65535) + (m & ((1 << I) - 1))];
							continue n;
						}
						break;
					}
				} else if (I & 64)
					if (I & 32) {
						r.mode = n7;
						break e;
					} else {
						(t.msg = "invalid literal/length code"), (r.mode = ei);
						break e;
					}
				else {
					T = g[(T & 65535) + (m & ((1 << I) - 1))];
					continue t;
				}
				break;
			}
		} while (o < a && i < c);
		(_ = h >> 3),
			(o -= _),
			(h -= _ << 3),
			(m &= (1 << h) - 1),
			(t.next_in = o),
			(t.next_out = i),
			(t.avail_in = o < a ? 5 + (a - o) : 5 - (o - a)),
			(t.avail_out = i < c ? 257 + (c - i) : 257 - (i - c)),
			(r.hold = m),
			(r.bits = h);
	};
});
var QU = Ue((CT, zU) => {
	"use strict";
	E();
	var qU = mn(),
		jr = 15,
		GU = 852,
		XU = 592,
		ZU = 0,
		mc = 1,
		WU = 2,
		r7 = [
			3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59,
			67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0,
		],
		o7 = [
			16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19,
			19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78,
		],
		a7 = [
			1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513,
			769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0,
		],
		i7 = [
			16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23,
			24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64,
		];
	zU.exports = function (t, n, r, o, a, i, s, c) {
		var l = c.bits,
			d = 0,
			U = 0,
			u = 0,
			p = 0,
			m = 0,
			h = 0,
			g = 0,
			x = 0,
			y = 0,
			w = 0,
			T,
			I,
			_,
			L,
			M,
			N = null,
			$ = 0,
			S,
			P = new qU.Buf16(jr + 1),
			A = new qU.Buf16(jr + 1),
			k = null,
			K = 0,
			q,
			F,
			C;
		for (d = 0; d <= jr; d++) P[d] = 0;
		for (U = 0; U < o; U++) P[n[r + U]]++;
		for (m = l, p = jr; p >= 1 && P[p] === 0; p--);
		if ((m > p && (m = p), p === 0))
			return (
				(a[i++] = (1 << 24) | (64 << 16) | 0),
				(a[i++] = (1 << 24) | (64 << 16) | 0),
				(c.bits = 1),
				0
			);
		for (u = 1; u < p && P[u] === 0; u++);
		for (m < u && (m = u), x = 1, d = 1; d <= jr; d++)
			if (((x <<= 1), (x -= P[d]), x < 0)) return -1;
		if (x > 0 && (t === ZU || p !== 1)) return -1;
		for (A[1] = 0, d = 1; d < jr; d++) A[d + 1] = A[d] + P[d];
		for (U = 0; U < o; U++) n[r + U] !== 0 && (s[A[n[r + U]]++] = U);
		if (
			(t === ZU
				? ((N = k = s), (S = 19))
				: t === mc
					? ((N = r7), ($ -= 257), (k = o7), (K -= 257), (S = 256))
					: ((N = a7), (k = i7), (S = -1)),
			(w = 0),
			(U = 0),
			(d = u),
			(M = i),
			(h = m),
			(g = 0),
			(_ = -1),
			(y = 1 << m),
			(L = y - 1),
			(t === mc && y > GU) || (t === WU && y > XU))
		)
			return 1;
		for (;;) {
			(q = d - g),
				s[U] < S
					? ((F = 0), (C = s[U]))
					: s[U] > S
						? ((F = k[K + s[U]]), (C = N[$ + s[U]]))
						: ((F = 96), (C = 0)),
				(T = 1 << (d - g)),
				(I = 1 << h),
				(u = I);
			do (I -= T), (a[M + (w >> g) + I] = (q << 24) | (F << 16) | C | 0);
			while (I !== 0);
			for (T = 1 << (d - 1); w & T; ) T >>= 1;
			if ((T !== 0 ? ((w &= T - 1), (w += T)) : (w = 0), U++, --P[d] === 0)) {
				if (d === p) break;
				d = n[r + s[U]];
			}
			if (d > m && (w & L) !== _) {
				for (
					g === 0 && (g = m), M += u, h = d - g, x = 1 << h;
					h + g < p && ((x -= P[h + g]), !(x <= 0));
				)
					h++, (x <<= 1);
				if (((y += 1 << h), (t === mc && y > GU) || (t === WU && y > XU)))
					return 1;
				(_ = w & L), (a[_] = (m << 24) | (h << 16) | (M - i) | 0);
			}
		}
		return (
			w !== 0 && (a[M + w] = ((d - g) << 24) | (64 << 16) | 0), (c.bits = m), 0
		);
	};
});
var Pf = Ue((Et) => {
	"use strict";
	E();
	var nt = mn(),
		yc = rc(),
		Gt = oc(),
		s7 = VU(),
		Jo = QU(),
		c7 = 0,
		Rf = 1,
		vf = 2,
		jU = 4,
		l7 = 5,
		ti = 6,
		gr = 0,
		d7 = 1,
		U7 = 2,
		dt = -2,
		Mf = -3,
		wc = -4,
		f7 = -5,
		ef = 8,
		_f = 1,
		tf = 2,
		nf = 3,
		rf = 4,
		of = 5,
		af = 6,
		sf = 7,
		cf = 8,
		lf = 9,
		df = 10,
		oi = 11,
		gn = 12,
		hc = 13,
		Uf = 14,
		bc = 15,
		ff = 16,
		uf = 17,
		pf = 18,
		mf = 19,
		ni = 20,
		ri = 21,
		hf = 22,
		bf = 23,
		gf = 24,
		Ef = 25,
		xf = 26,
		gc = 27,
		yf = 28,
		wf = 29,
		ge = 30,
		Ic = 31,
		u7 = 32,
		p7 = 852,
		m7 = 592,
		h7 = 15,
		b7 = h7;
	function If(e) {
		return (
			((e >>> 24) & 255) +
			((e >>> 8) & 65280) +
			((e & 65280) << 8) +
			((e & 255) << 24)
		);
	}
	function g7() {
		(this.mode = 0),
			(this.last = !1),
			(this.wrap = 0),
			(this.havedict = !1),
			(this.flags = 0),
			(this.dmax = 0),
			(this.check = 0),
			(this.total = 0),
			(this.head = null),
			(this.wbits = 0),
			(this.wsize = 0),
			(this.whave = 0),
			(this.wnext = 0),
			(this.window = null),
			(this.hold = 0),
			(this.bits = 0),
			(this.length = 0),
			(this.offset = 0),
			(this.extra = 0),
			(this.lencode = null),
			(this.distcode = null),
			(this.lenbits = 0),
			(this.distbits = 0),
			(this.ncode = 0),
			(this.nlen = 0),
			(this.ndist = 0),
			(this.have = 0),
			(this.next = null),
			(this.lens = new nt.Buf16(320)),
			(this.work = new nt.Buf16(288)),
			(this.lendyn = null),
			(this.distdyn = null),
			(this.sane = 0),
			(this.back = 0),
			(this.was = 0);
	}
	function Lf(e) {
		var t;
		return !e || !e.state
			? dt
			: ((t = e.state),
				(e.total_in = e.total_out = t.total = 0),
				(e.msg = ""),
				t.wrap && (e.adler = t.wrap & 1),
				(t.mode = _f),
				(t.last = 0),
				(t.havedict = 0),
				(t.dmax = 32768),
				(t.head = null),
				(t.hold = 0),
				(t.bits = 0),
				(t.lencode = t.lendyn = new nt.Buf32(p7)),
				(t.distcode = t.distdyn = new nt.Buf32(m7)),
				(t.sane = 1),
				(t.back = -1),
				gr);
	}
	function Df(e) {
		var t;
		return !e || !e.state
			? dt
			: ((t = e.state), (t.wsize = 0), (t.whave = 0), (t.wnext = 0), Lf(e));
	}
	function Sf(e, t) {
		var n, r;
		return !e ||
			!e.state ||
			((r = e.state),
			t < 0 ? ((n = 0), (t = -t)) : ((n = (t >> 4) + 1), t < 48 && (t &= 15)),
			t && (t < 8 || t > 15))
			? dt
			: (r.window !== null && r.wbits !== t && (r.window = null),
				(r.wrap = n),
				(r.wbits = t),
				Df(e));
	}
	function $f(e, t) {
		var n, r;
		return e
			? ((r = new g7()),
				(e.state = r),
				(r.window = null),
				(n = Sf(e, t)),
				n !== gr && (e.state = null),
				n)
			: dt;
	}
	function E7(e) {
		return $f(e, b7);
	}
	var Tf = !0,
		Ec,
		xc;
	function x7(e) {
		if (Tf) {
			var t;
			for (Ec = new nt.Buf32(512), xc = new nt.Buf32(32), t = 0; t < 144; )
				e.lens[t++] = 8;
			for (; t < 256; ) e.lens[t++] = 9;
			for (; t < 280; ) e.lens[t++] = 7;
			for (; t < 288; ) e.lens[t++] = 8;
			for (Jo(Rf, e.lens, 0, 288, Ec, 0, e.work, { bits: 9 }), t = 0; t < 32; )
				e.lens[t++] = 5;
			Jo(vf, e.lens, 0, 32, xc, 0, e.work, { bits: 5 }), (Tf = !1);
		}
		(e.lencode = Ec), (e.lenbits = 9), (e.distcode = xc), (e.distbits = 5);
	}
	function Nf(e, t, n, r) {
		var o,
			a = e.state;
		return (
			a.window === null &&
				((a.wsize = 1 << a.wbits),
				(a.wnext = 0),
				(a.whave = 0),
				(a.window = new nt.Buf8(a.wsize))),
			r >= a.wsize
				? (nt.arraySet(a.window, t, n - a.wsize, a.wsize, 0),
					(a.wnext = 0),
					(a.whave = a.wsize))
				: ((o = a.wsize - a.wnext),
					o > r && (o = r),
					nt.arraySet(a.window, t, n - r, o, a.wnext),
					(r -= o),
					r
						? (nt.arraySet(a.window, t, n - r, r, 0),
							(a.wnext = r),
							(a.whave = a.wsize))
						: ((a.wnext += o),
							a.wnext === a.wsize && (a.wnext = 0),
							a.whave < a.wsize && (a.whave += o))),
			0
		);
	}
	function y7(e, t) {
		var n,
			r,
			o,
			a,
			i,
			s,
			c,
			l,
			d,
			U,
			u,
			p,
			m,
			h,
			g = 0,
			x,
			y,
			w,
			T,
			I,
			_,
			L,
			M,
			N = new nt.Buf8(4),
			$,
			S,
			P = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
		if (!e || !e.state || !e.output || (!e.input && e.avail_in !== 0))
			return dt;
		(n = e.state),
			n.mode === gn && (n.mode = hc),
			(i = e.next_out),
			(o = e.output),
			(c = e.avail_out),
			(a = e.next_in),
			(r = e.input),
			(s = e.avail_in),
			(l = n.hold),
			(d = n.bits),
			(U = s),
			(u = c),
			(M = gr);
		e: for (;;)
			switch (n.mode) {
				case _f:
					if (n.wrap === 0) {
						n.mode = hc;
						break;
					}
					for (; d < 16; ) {
						if (s === 0) break e;
						s--, (l += r[a++] << d), (d += 8);
					}
					if (n.wrap & 2 && l === 35615) {
						(n.check = 0),
							(N[0] = l & 255),
							(N[1] = (l >>> 8) & 255),
							(n.check = Gt(n.check, N, 2, 0)),
							(l = 0),
							(d = 0),
							(n.mode = tf);
						break;
					}
					if (
						((n.flags = 0),
						n.head && (n.head.done = !1),
						!(n.wrap & 1) || (((l & 255) << 8) + (l >> 8)) % 31)
					) {
						(e.msg = "incorrect header check"), (n.mode = ge);
						break;
					}
					if ((l & 15) !== ef) {
						(e.msg = "unknown compression method"), (n.mode = ge);
						break;
					}
					if (((l >>>= 4), (d -= 4), (L = (l & 15) + 8), n.wbits === 0))
						n.wbits = L;
					else if (L > n.wbits) {
						(e.msg = "invalid window size"), (n.mode = ge);
						break;
					}
					(n.dmax = 1 << L),
						(e.adler = n.check = 1),
						(n.mode = l & 512 ? df : gn),
						(l = 0),
						(d = 0);
					break;
				case tf:
					for (; d < 16; ) {
						if (s === 0) break e;
						s--, (l += r[a++] << d), (d += 8);
					}
					if (((n.flags = l), (n.flags & 255) !== ef)) {
						(e.msg = "unknown compression method"), (n.mode = ge);
						break;
					}
					if (n.flags & 57344) {
						(e.msg = "unknown header flags set"), (n.mode = ge);
						break;
					}
					n.head && (n.head.text = (l >> 8) & 1),
						n.flags & 512 &&
							((N[0] = l & 255),
							(N[1] = (l >>> 8) & 255),
							(n.check = Gt(n.check, N, 2, 0))),
						(l = 0),
						(d = 0),
						(n.mode = nf);
				case nf:
					for (; d < 32; ) {
						if (s === 0) break e;
						s--, (l += r[a++] << d), (d += 8);
					}
					n.head && (n.head.time = l),
						n.flags & 512 &&
							((N[0] = l & 255),
							(N[1] = (l >>> 8) & 255),
							(N[2] = (l >>> 16) & 255),
							(N[3] = (l >>> 24) & 255),
							(n.check = Gt(n.check, N, 4, 0))),
						(l = 0),
						(d = 0),
						(n.mode = rf);
				case rf:
					for (; d < 16; ) {
						if (s === 0) break e;
						s--, (l += r[a++] << d), (d += 8);
					}
					n.head && ((n.head.xflags = l & 255), (n.head.os = l >> 8)),
						n.flags & 512 &&
							((N[0] = l & 255),
							(N[1] = (l >>> 8) & 255),
							(n.check = Gt(n.check, N, 2, 0))),
						(l = 0),
						(d = 0),
						(n.mode = of);
				case of:
					if (n.flags & 1024) {
						for (; d < 16; ) {
							if (s === 0) break e;
							s--, (l += r[a++] << d), (d += 8);
						}
						(n.length = l),
							n.head && (n.head.extra_len = l),
							n.flags & 512 &&
								((N[0] = l & 255),
								(N[1] = (l >>> 8) & 255),
								(n.check = Gt(n.check, N, 2, 0))),
							(l = 0),
							(d = 0);
					} else n.head && (n.head.extra = null);
					n.mode = af;
				case af:
					if (
						n.flags & 1024 &&
						((p = n.length),
						p > s && (p = s),
						p &&
							(n.head &&
								((L = n.head.extra_len - n.length),
								n.head.extra || (n.head.extra = new Array(n.head.extra_len)),
								nt.arraySet(n.head.extra, r, a, p, L)),
							n.flags & 512 && (n.check = Gt(n.check, r, p, a)),
							(s -= p),
							(a += p),
							(n.length -= p)),
						n.length)
					)
						break e;
					(n.length = 0), (n.mode = sf);
				case sf:
					if (n.flags & 2048) {
						if (s === 0) break e;
						p = 0;
						do
							(L = r[a + p++]),
								n.head &&
									L &&
									n.length < 65536 &&
									(n.head.name += String.fromCharCode(L));
						while (L && p < s);
						if (
							(n.flags & 512 && (n.check = Gt(n.check, r, p, a)),
							(s -= p),
							(a += p),
							L)
						)
							break e;
					} else n.head && (n.head.name = null);
					(n.length = 0), (n.mode = cf);
				case cf:
					if (n.flags & 4096) {
						if (s === 0) break e;
						p = 0;
						do
							(L = r[a + p++]),
								n.head &&
									L &&
									n.length < 65536 &&
									(n.head.comment += String.fromCharCode(L));
						while (L && p < s);
						if (
							(n.flags & 512 && (n.check = Gt(n.check, r, p, a)),
							(s -= p),
							(a += p),
							L)
						)
							break e;
					} else n.head && (n.head.comment = null);
					n.mode = lf;
				case lf:
					if (n.flags & 512) {
						for (; d < 16; ) {
							if (s === 0) break e;
							s--, (l += r[a++] << d), (d += 8);
						}
						if (l !== (n.check & 65535)) {
							(e.msg = "header crc mismatch"), (n.mode = ge);
							break;
						}
						(l = 0), (d = 0);
					}
					n.head && ((n.head.hcrc = (n.flags >> 9) & 1), (n.head.done = !0)),
						(e.adler = n.check = 0),
						(n.mode = gn);
					break;
				case df:
					for (; d < 32; ) {
						if (s === 0) break e;
						s--, (l += r[a++] << d), (d += 8);
					}
					(e.adler = n.check = If(l)), (l = 0), (d = 0), (n.mode = oi);
				case oi:
					if (n.havedict === 0)
						return (
							(e.next_out = i),
							(e.avail_out = c),
							(e.next_in = a),
							(e.avail_in = s),
							(n.hold = l),
							(n.bits = d),
							U7
						);
					(e.adler = n.check = 1), (n.mode = gn);
				case gn:
					if (t === l7 || t === ti) break e;
				case hc:
					if (n.last) {
						(l >>>= d & 7), (d -= d & 7), (n.mode = gc);
						break;
					}
					for (; d < 3; ) {
						if (s === 0) break e;
						s--, (l += r[a++] << d), (d += 8);
					}
					switch (((n.last = l & 1), (l >>>= 1), (d -= 1), l & 3)) {
						case 0:
							n.mode = Uf;
							break;
						case 1:
							if ((x7(n), (n.mode = ni), t === ti)) {
								(l >>>= 2), (d -= 2);
								break e;
							}
							break;
						case 2:
							n.mode = uf;
							break;
						case 3:
							(e.msg = "invalid block type"), (n.mode = ge);
					}
					(l >>>= 2), (d -= 2);
					break;
				case Uf:
					for (l >>>= d & 7, d -= d & 7; d < 32; ) {
						if (s === 0) break e;
						s--, (l += r[a++] << d), (d += 8);
					}
					if ((l & 65535) !== ((l >>> 16) ^ 65535)) {
						(e.msg = "invalid stored block lengths"), (n.mode = ge);
						break;
					}
					if (
						((n.length = l & 65535), (l = 0), (d = 0), (n.mode = bc), t === ti)
					)
						break e;
				case bc:
					n.mode = ff;
				case ff:
					if (((p = n.length), p)) {
						if ((p > s && (p = s), p > c && (p = c), p === 0)) break e;
						nt.arraySet(o, r, a, p, i),
							(s -= p),
							(a += p),
							(c -= p),
							(i += p),
							(n.length -= p);
						break;
					}
					n.mode = gn;
					break;
				case uf:
					for (; d < 14; ) {
						if (s === 0) break e;
						s--, (l += r[a++] << d), (d += 8);
					}
					if (
						((n.nlen = (l & 31) + 257),
						(l >>>= 5),
						(d -= 5),
						(n.ndist = (l & 31) + 1),
						(l >>>= 5),
						(d -= 5),
						(n.ncode = (l & 15) + 4),
						(l >>>= 4),
						(d -= 4),
						n.nlen > 286 || n.ndist > 30)
					) {
						(e.msg = "too many length or distance symbols"), (n.mode = ge);
						break;
					}
					(n.have = 0), (n.mode = pf);
				case pf:
					for (; n.have < n.ncode; ) {
						for (; d < 3; ) {
							if (s === 0) break e;
							s--, (l += r[a++] << d), (d += 8);
						}
						(n.lens[P[n.have++]] = l & 7), (l >>>= 3), (d -= 3);
					}
					for (; n.have < 19; ) n.lens[P[n.have++]] = 0;
					if (
						((n.lencode = n.lendyn),
						(n.lenbits = 7),
						($ = { bits: n.lenbits }),
						(M = Jo(c7, n.lens, 0, 19, n.lencode, 0, n.work, $)),
						(n.lenbits = $.bits),
						M)
					) {
						(e.msg = "invalid code lengths set"), (n.mode = ge);
						break;
					}
					(n.have = 0), (n.mode = mf);
				case mf:
					for (; n.have < n.nlen + n.ndist; ) {
						for (
							;
							(g = n.lencode[l & ((1 << n.lenbits) - 1)]),
								(x = g >>> 24),
								(y = (g >>> 16) & 255),
								(w = g & 65535),
								!(x <= d);
						) {
							if (s === 0) break e;
							s--, (l += r[a++] << d), (d += 8);
						}
						if (w < 16) (l >>>= x), (d -= x), (n.lens[n.have++] = w);
						else {
							if (w === 16) {
								for (S = x + 2; d < S; ) {
									if (s === 0) break e;
									s--, (l += r[a++] << d), (d += 8);
								}
								if (((l >>>= x), (d -= x), n.have === 0)) {
									(e.msg = "invalid bit length repeat"), (n.mode = ge);
									break;
								}
								(L = n.lens[n.have - 1]),
									(p = 3 + (l & 3)),
									(l >>>= 2),
									(d -= 2);
							} else if (w === 17) {
								for (S = x + 3; d < S; ) {
									if (s === 0) break e;
									s--, (l += r[a++] << d), (d += 8);
								}
								(l >>>= x),
									(d -= x),
									(L = 0),
									(p = 3 + (l & 7)),
									(l >>>= 3),
									(d -= 3);
							} else {
								for (S = x + 7; d < S; ) {
									if (s === 0) break e;
									s--, (l += r[a++] << d), (d += 8);
								}
								(l >>>= x),
									(d -= x),
									(L = 0),
									(p = 11 + (l & 127)),
									(l >>>= 7),
									(d -= 7);
							}
							if (n.have + p > n.nlen + n.ndist) {
								(e.msg = "invalid bit length repeat"), (n.mode = ge);
								break;
							}
							for (; p--; ) n.lens[n.have++] = L;
						}
					}
					if (n.mode === ge) break;
					if (n.lens[256] === 0) {
						(e.msg = "invalid code -- missing end-of-block"), (n.mode = ge);
						break;
					}
					if (
						((n.lenbits = 9),
						($ = { bits: n.lenbits }),
						(M = Jo(Rf, n.lens, 0, n.nlen, n.lencode, 0, n.work, $)),
						(n.lenbits = $.bits),
						M)
					) {
						(e.msg = "invalid literal/lengths set"), (n.mode = ge);
						break;
					}
					if (
						((n.distbits = 6),
						(n.distcode = n.distdyn),
						($ = { bits: n.distbits }),
						(M = Jo(vf, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, $)),
						(n.distbits = $.bits),
						M)
					) {
						(e.msg = "invalid distances set"), (n.mode = ge);
						break;
					}
					if (((n.mode = ni), t === ti)) break e;
				case ni:
					n.mode = ri;
				case ri:
					if (s >= 6 && c >= 258) {
						(e.next_out = i),
							(e.avail_out = c),
							(e.next_in = a),
							(e.avail_in = s),
							(n.hold = l),
							(n.bits = d),
							s7(e, u),
							(i = e.next_out),
							(o = e.output),
							(c = e.avail_out),
							(a = e.next_in),
							(r = e.input),
							(s = e.avail_in),
							(l = n.hold),
							(d = n.bits),
							n.mode === gn && (n.back = -1);
						break;
					}
					for (
						n.back = 0;
						(g = n.lencode[l & ((1 << n.lenbits) - 1)]),
							(x = g >>> 24),
							(y = (g >>> 16) & 255),
							(w = g & 65535),
							!(x <= d);
					) {
						if (s === 0) break e;
						s--, (l += r[a++] << d), (d += 8);
					}
					if (y && !(y & 240)) {
						for (
							T = x, I = y, _ = w;
							(g = n.lencode[_ + ((l & ((1 << (T + I)) - 1)) >> T)]),
								(x = g >>> 24),
								(y = (g >>> 16) & 255),
								(w = g & 65535),
								!(T + x <= d);
						) {
							if (s === 0) break e;
							s--, (l += r[a++] << d), (d += 8);
						}
						(l >>>= T), (d -= T), (n.back += T);
					}
					if (((l >>>= x), (d -= x), (n.back += x), (n.length = w), y === 0)) {
						n.mode = xf;
						break;
					}
					if (y & 32) {
						(n.back = -1), (n.mode = gn);
						break;
					}
					if (y & 64) {
						(e.msg = "invalid literal/length code"), (n.mode = ge);
						break;
					}
					(n.extra = y & 15), (n.mode = hf);
				case hf:
					if (n.extra) {
						for (S = n.extra; d < S; ) {
							if (s === 0) break e;
							s--, (l += r[a++] << d), (d += 8);
						}
						(n.length += l & ((1 << n.extra) - 1)),
							(l >>>= n.extra),
							(d -= n.extra),
							(n.back += n.extra);
					}
					(n.was = n.length), (n.mode = bf);
				case bf:
					for (
						;
						(g = n.distcode[l & ((1 << n.distbits) - 1)]),
							(x = g >>> 24),
							(y = (g >>> 16) & 255),
							(w = g & 65535),
							!(x <= d);
					) {
						if (s === 0) break e;
						s--, (l += r[a++] << d), (d += 8);
					}
					if (!(y & 240)) {
						for (
							T = x, I = y, _ = w;
							(g = n.distcode[_ + ((l & ((1 << (T + I)) - 1)) >> T)]),
								(x = g >>> 24),
								(y = (g >>> 16) & 255),
								(w = g & 65535),
								!(T + x <= d);
						) {
							if (s === 0) break e;
							s--, (l += r[a++] << d), (d += 8);
						}
						(l >>>= T), (d -= T), (n.back += T);
					}
					if (((l >>>= x), (d -= x), (n.back += x), y & 64)) {
						(e.msg = "invalid distance code"), (n.mode = ge);
						break;
					}
					(n.offset = w), (n.extra = y & 15), (n.mode = gf);
				case gf:
					if (n.extra) {
						for (S = n.extra; d < S; ) {
							if (s === 0) break e;
							s--, (l += r[a++] << d), (d += 8);
						}
						(n.offset += l & ((1 << n.extra) - 1)),
							(l >>>= n.extra),
							(d -= n.extra),
							(n.back += n.extra);
					}
					if (n.offset > n.dmax) {
						(e.msg = "invalid distance too far back"), (n.mode = ge);
						break;
					}
					n.mode = Ef;
				case Ef:
					if (c === 0) break e;
					if (((p = u - c), n.offset > p)) {
						if (((p = n.offset - p), p > n.whave && n.sane)) {
							(e.msg = "invalid distance too far back"), (n.mode = ge);
							break;
						}
						p > n.wnext
							? ((p -= n.wnext), (m = n.wsize - p))
							: (m = n.wnext - p),
							p > n.length && (p = n.length),
							(h = n.window);
					} else (h = o), (m = i - n.offset), (p = n.length);
					p > c && (p = c), (c -= p), (n.length -= p);
					do o[i++] = h[m++];
					while (--p);
					n.length === 0 && (n.mode = ri);
					break;
				case xf:
					if (c === 0) break e;
					(o[i++] = n.length), c--, (n.mode = ri);
					break;
				case gc:
					if (n.wrap) {
						for (; d < 32; ) {
							if (s === 0) break e;
							s--, (l |= r[a++] << d), (d += 8);
						}
						if (
							((u -= c),
							(e.total_out += u),
							(n.total += u),
							u &&
								(e.adler = n.check =
									n.flags
										? Gt(n.check, o, u, i - u)
										: yc(n.check, o, u, i - u)),
							(u = c),
							(n.flags ? l : If(l)) !== n.check)
						) {
							(e.msg = "incorrect data check"), (n.mode = ge);
							break;
						}
						(l = 0), (d = 0);
					}
					n.mode = yf;
				case yf:
					if (n.wrap && n.flags) {
						for (; d < 32; ) {
							if (s === 0) break e;
							s--, (l += r[a++] << d), (d += 8);
						}
						if (l !== (n.total & 4294967295)) {
							(e.msg = "incorrect length check"), (n.mode = ge);
							break;
						}
						(l = 0), (d = 0);
					}
					n.mode = wf;
				case wf:
					M = d7;
					break e;
				case ge:
					M = Mf;
					break e;
				case Ic:
					return wc;
				case u7:
				default:
					return dt;
			}
		return (
			(e.next_out = i),
			(e.avail_out = c),
			(e.next_in = a),
			(e.avail_in = s),
			(n.hold = l),
			(n.bits = d),
			(n.wsize ||
				(u !== e.avail_out && n.mode < ge && (n.mode < gc || t !== jU))) &&
			Nf(e, e.output, e.next_out, u - e.avail_out)
				? ((n.mode = Ic), wc)
				: ((U -= e.avail_in),
					(u -= e.avail_out),
					(e.total_in += U),
					(e.total_out += u),
					(n.total += u),
					n.wrap &&
						u &&
						(e.adler = n.check =
							n.flags
								? Gt(n.check, o, u, e.next_out - u)
								: yc(n.check, o, u, e.next_out - u)),
					(e.data_type =
						n.bits +
						(n.last ? 64 : 0) +
						(n.mode === gn ? 128 : 0) +
						(n.mode === ni || n.mode === bc ? 256 : 0)),
					((U === 0 && u === 0) || t === jU) && M === gr && (M = f7),
					M)
		);
	}
	function w7(e) {
		if (!e || !e.state) return dt;
		var t = e.state;
		return t.window && (t.window = null), (e.state = null), gr;
	}
	function I7(e, t) {
		var n;
		return !e || !e.state || ((n = e.state), !(n.wrap & 2))
			? dt
			: ((n.head = t), (t.done = !1), gr);
	}
	function T7(e, t) {
		var n = t.length,
			r,
			o,
			a;
		return !e || !e.state || ((r = e.state), r.wrap !== 0 && r.mode !== oi)
			? dt
			: r.mode === oi && ((o = 1), (o = yc(o, t, n, 0)), o !== r.check)
				? Mf
				: ((a = Nf(e, t, n, n)),
					a ? ((r.mode = Ic), wc) : ((r.havedict = 1), gr));
	}
	Et.inflateReset = Df;
	Et.inflateReset2 = Sf;
	Et.inflateResetKeep = Lf;
	Et.inflateInit = E7;
	Et.inflateInit2 = $f;
	Et.inflate = y7;
	Et.inflateEnd = w7;
	Et.inflateGetHeader = I7;
	Et.inflateSetDictionary = T7;
	Et.inflateInfo = "pako inflate (from Nodeca project)";
});
var Tc = Ue((kT, Ff) => {
	"use strict";
	E();
	Ff.exports = {
		Z_NO_FLUSH: 0,
		Z_PARTIAL_FLUSH: 1,
		Z_SYNC_FLUSH: 2,
		Z_FULL_FLUSH: 3,
		Z_FINISH: 4,
		Z_BLOCK: 5,
		Z_TREES: 6,
		Z_OK: 0,
		Z_STREAM_END: 1,
		Z_NEED_DICT: 2,
		Z_ERRNO: -1,
		Z_STREAM_ERROR: -2,
		Z_DATA_ERROR: -3,
		Z_BUF_ERROR: -5,
		Z_NO_COMPRESSION: 0,
		Z_BEST_SPEED: 1,
		Z_BEST_COMPRESSION: 9,
		Z_DEFAULT_COMPRESSION: -1,
		Z_FILTERED: 1,
		Z_HUFFMAN_ONLY: 2,
		Z_RLE: 3,
		Z_FIXED: 4,
		Z_DEFAULT_STRATEGY: 0,
		Z_BINARY: 0,
		Z_TEXT: 1,
		Z_UNKNOWN: 2,
		Z_DEFLATED: 8,
	};
});
var Af = Ue((VT, Of) => {
	"use strict";
	E();
	function R7() {
		(this.text = 0),
			(this.time = 0),
			(this.xflags = 0),
			(this.os = 0),
			(this.extra = null),
			(this.extra_len = 0),
			(this.name = ""),
			(this.comment = ""),
			(this.hcrc = 0),
			(this.done = !1);
	}
	Of.exports = R7;
});
var Cf = Ue((Yo) => {
	"use strict";
	E();
	var eo = Pf(),
		ko = mn(),
		ai = lc(),
		Ie = Tc(),
		Rc = qa(),
		v7 = dc(),
		M7 = Af(),
		Bf = Object.prototype.toString;
	function Er(e) {
		if (!(this instanceof Er)) return new Er(e);
		this.options = ko.assign(
			{ chunkSize: 16384, windowBits: 0, to: "" },
			e || {},
		);
		var t = this.options;
		t.raw &&
			t.windowBits >= 0 &&
			t.windowBits < 16 &&
			((t.windowBits = -t.windowBits),
			t.windowBits === 0 && (t.windowBits = -15)),
			t.windowBits >= 0 &&
				t.windowBits < 16 &&
				!(e && e.windowBits) &&
				(t.windowBits += 32),
			t.windowBits > 15 &&
				t.windowBits < 48 &&
				(t.windowBits & 15 || (t.windowBits |= 15)),
			(this.err = 0),
			(this.msg = ""),
			(this.ended = !1),
			(this.chunks = []),
			(this.strm = new v7()),
			(this.strm.avail_out = 0);
		var n = eo.inflateInit2(this.strm, t.windowBits);
		if (n !== Ie.Z_OK) throw new Error(Rc[n]);
		if (
			((this.header = new M7()),
			eo.inflateGetHeader(this.strm, this.header),
			t.dictionary &&
				(typeof t.dictionary == "string"
					? (t.dictionary = ai.string2buf(t.dictionary))
					: Bf.call(t.dictionary) === "[object ArrayBuffer]" &&
						(t.dictionary = new Uint8Array(t.dictionary)),
				t.raw &&
					((n = eo.inflateSetDictionary(this.strm, t.dictionary)),
					n !== Ie.Z_OK)))
		)
			throw new Error(Rc[n]);
	}
	Er.prototype.push = function (e, t) {
		var n = this.strm,
			r = this.options.chunkSize,
			o = this.options.dictionary,
			a,
			i,
			s,
			c,
			l,
			d = !1;
		if (this.ended) return !1;
		(i = t === ~~t ? t : t === !0 ? Ie.Z_FINISH : Ie.Z_NO_FLUSH),
			typeof e == "string"
				? (n.input = ai.binstring2buf(e))
				: Bf.call(e) === "[object ArrayBuffer]"
					? (n.input = new Uint8Array(e))
					: (n.input = e),
			(n.next_in = 0),
			(n.avail_in = n.input.length);
		do {
			if (
				(n.avail_out === 0 &&
					((n.output = new ko.Buf8(r)), (n.next_out = 0), (n.avail_out = r)),
				(a = eo.inflate(n, Ie.Z_NO_FLUSH)),
				a === Ie.Z_NEED_DICT &&
					o &&
					(a = eo.inflateSetDictionary(this.strm, o)),
				a === Ie.Z_BUF_ERROR && d === !0 && ((a = Ie.Z_OK), (d = !1)),
				a !== Ie.Z_STREAM_END && a !== Ie.Z_OK)
			)
				return this.onEnd(a), (this.ended = !0), !1;
			n.next_out &&
				(n.avail_out === 0 ||
					a === Ie.Z_STREAM_END ||
					(n.avail_in === 0 && (i === Ie.Z_FINISH || i === Ie.Z_SYNC_FLUSH))) &&
				(this.options.to === "string"
					? ((s = ai.utf8border(n.output, n.next_out)),
						(c = n.next_out - s),
						(l = ai.buf2string(n.output, s)),
						(n.next_out = c),
						(n.avail_out = r - c),
						c && ko.arraySet(n.output, n.output, s, c, 0),
						this.onData(l))
					: this.onData(ko.shrinkBuf(n.output, n.next_out))),
				n.avail_in === 0 && n.avail_out === 0 && (d = !0);
		} while ((n.avail_in > 0 || n.avail_out === 0) && a !== Ie.Z_STREAM_END);
		return (
			a === Ie.Z_STREAM_END && (i = Ie.Z_FINISH),
			i === Ie.Z_FINISH
				? ((a = eo.inflateEnd(this.strm)),
					this.onEnd(a),
					(this.ended = !0),
					a === Ie.Z_OK)
				: (i === Ie.Z_SYNC_FLUSH && (this.onEnd(Ie.Z_OK), (n.avail_out = 0)),
					!0)
		);
	};
	Er.prototype.onData = function (e) {
		this.chunks.push(e);
	};
	Er.prototype.onEnd = function (e) {
		e === Ie.Z_OK &&
			(this.options.to === "string"
				? (this.result = this.chunks.join(""))
				: (this.result = ko.flattenChunks(this.chunks))),
			(this.chunks = []),
			(this.err = e),
			(this.msg = this.strm.msg);
	};
	function vc(e, t) {
		var n = new Er(t);
		if ((n.push(e, !0), n.err)) throw n.msg || Rc[n.err];
		return n.result;
	}
	function _7(e, t) {
		return (t = t || {}), (t.raw = !0), vc(e, t);
	}
	Yo.Inflate = Er;
	Yo.inflate = vc;
	Yo.inflateRaw = _7;
	Yo.ungzip = vc;
});
var Jf = Ue((ZT, Hf) => {
	"use strict";
	E();
	var L7 = mn().assign,
		D7 = kU(),
		S7 = Cf(),
		$7 = Tc(),
		Kf = {};
	L7(Kf, D7, S7, $7);
	Hf.exports = Kf;
});
var g1 = Ue((lv, b1) => {
	E();
	var h1 = "Expected a function",
		p1 = NaN,
		H7 = "[object Symbol]",
		J7 = /^\s+|\s+$/g,
		k7 = /^[-+]0x[0-9a-f]+$/i,
		Y7 = /^0b[01]+$/i,
		V7 = /^0o[0-7]+$/i,
		q7 = parseInt,
		G7 =
			typeof global == "object" && global && global.Object === Object && global,
		X7 = typeof self == "object" && self && self.Object === Object && self,
		Z7 = G7 || X7 || Function("return this")(),
		W7 = Object.prototype,
		z7 = W7.toString,
		Q7 = Math.max,
		j7 = Math.min,
		Nc = function () {
			return Z7.Date.now();
		};
	function eg(e, t, n) {
		var r,
			o,
			a,
			i,
			s,
			c,
			l = 0,
			d = !1,
			U = !1,
			u = !0;
		if (typeof e != "function") throw new TypeError(h1);
		(t = m1(t) || 0),
			yi(n) &&
				((d = !!n.leading),
				(U = "maxWait" in n),
				(a = U ? Q7(m1(n.maxWait) || 0, t) : a),
				(u = "trailing" in n ? !!n.trailing : u));
		function p(_) {
			var L = r,
				M = o;
			return (r = o = void 0), (l = _), (i = e.apply(M, L)), i;
		}
		function m(_) {
			return (l = _), (s = setTimeout(x, t)), d ? p(_) : i;
		}
		function h(_) {
			var L = _ - c,
				M = _ - l,
				N = t - L;
			return U ? j7(N, a - M) : N;
		}
		function g(_) {
			var L = _ - c,
				M = _ - l;
			return c === void 0 || L >= t || L < 0 || (U && M >= a);
		}
		function x() {
			var _ = Nc();
			if (g(_)) return y(_);
			s = setTimeout(x, h(_));
		}
		function y(_) {
			return (s = void 0), u && r ? p(_) : ((r = o = void 0), i);
		}
		function w() {
			s !== void 0 && clearTimeout(s), (l = 0), (r = c = o = s = void 0);
		}
		function T() {
			return s === void 0 ? i : y(Nc());
		}
		function I() {
			var _ = Nc(),
				L = g(_);
			if (((r = arguments), (o = this), (c = _), L)) {
				if (s === void 0) return m(c);
				if (U) return (s = setTimeout(x, t)), p(c);
			}
			return s === void 0 && (s = setTimeout(x, t)), i;
		}
		return (I.cancel = w), (I.flush = T), I;
	}
	function tg(e, t, n) {
		var r = !0,
			o = !0;
		if (typeof e != "function") throw new TypeError(h1);
		return (
			yi(n) &&
				((r = "leading" in n ? !!n.leading : r),
				(o = "trailing" in n ? !!n.trailing : o)),
			eg(e, t, { leading: r, maxWait: t, trailing: o })
		);
	}
	function yi(e) {
		var t = typeof e;
		return !!e && (t == "object" || t == "function");
	}
	function ng(e) {
		return !!e && typeof e == "object";
	}
	function rg(e) {
		return typeof e == "symbol" || (ng(e) && z7.call(e) == H7);
	}
	function m1(e) {
		if (typeof e == "number") return e;
		if (rg(e)) return p1;
		if (yi(e)) {
			var t = typeof e.valueOf == "function" ? e.valueOf() : e;
			e = yi(t) ? t + "" : t;
		}
		if (typeof e != "string") return e === 0 ? e : +e;
		e = e.replace(J7, "");
		var n = Y7.test(e);
		return n || V7.test(e) ? q7(e.slice(2), n ? 2 : 8) : k7.test(e) ? p1 : +e;
	}
	b1.exports = tg;
});
var x1 = Ue((Pc, E1) => {
	E();
	(function (e, t) {
		typeof define == "function" && define.amd
			? define([], t)
			: typeof Pc == "object"
				? (E1.exports = t())
				: ((e.PromisePool = t()), (e.promisePool = e.PromisePool));
	})(Pc, function () {
		"use strict";
		var e = function () {
			this._listeners = {};
		};
		(e.prototype.addEventListener = function (s, c) {
			(this._listeners[s] = this._listeners[s] || []),
				this._listeners[s].indexOf(c) < 0 && this._listeners[s].push(c);
		}),
			(e.prototype.removeEventListener = function (s, c) {
				if (this._listeners[s]) {
					var l = this._listeners[s].indexOf(c);
					l >= 0 && this._listeners[s].splice(l, 1);
				}
			}),
			(e.prototype.dispatchEvent = function (s) {
				if (this._listeners[s.type] && this._listeners[s.type].length)
					for (
						var c = this._listeners[s.type].slice(), l = 0, d = c.length;
						l < d;
						++l
					)
						c[l].call(this, s);
			});
		var t = function (s) {
				return (
					typeof s.constructor == "function" &&
					s.constructor.name === "GeneratorFunction"
				);
			},
			n = function (s) {
				return {
					next: function () {
						var c = s();
						return c ? { value: c } : { done: !0 };
					},
				};
			},
			r = function (s) {
				var c = !1;
				return {
					next: function () {
						return c ? { done: !0 } : ((c = !0), { value: s });
					},
				};
			},
			o = function (s, c) {
				var l = typeof s;
				if (l === "object") {
					if (typeof s.next == "function") return s;
					if (typeof s.then == "function") return r(s);
				}
				return l === "function" ? (t(s) ? s() : n(s)) : r(c.resolve(s));
			},
			a = function (s, c, l) {
				(this.target = s), (this.type = c), (this.data = l);
			},
			i = function (s, c, l) {
				if (
					(e.call(this), typeof c != "number" || Math.floor(c) !== c || c < 1)
				)
					throw new Error("Invalid concurrency");
				(this._concurrency = c),
					(this._options = l || {}),
					(this._options.promise = this._options.promise || Promise),
					(this._iterator = o(s, this._options.promise)),
					(this._done = !1),
					(this._size = 0),
					(this._promise = null),
					(this._callbacks = null);
			};
		return (
			(i.prototype = new e()),
			(i.prototype.constructor = i),
			(i.prototype.concurrency = function (s) {
				return (
					typeof s < "u" &&
						((this._concurrency = s), this.active() && this._proceed()),
					this._concurrency
				);
			}),
			(i.prototype.size = function () {
				return this._size;
			}),
			(i.prototype.active = function () {
				return !!this._promise;
			}),
			(i.prototype.promise = function () {
				return this._promise;
			}),
			(i.prototype.start = function () {
				var s = this,
					c = this._options.promise;
				return (
					(this._promise = new c(function (l, d) {
						(s._callbacks = { reject: d, resolve: l }), s._proceed();
					})),
					this._promise
				);
			}),
			(i.prototype._fireEvent = function (s, c) {
				this.dispatchEvent(new a(this, s, c));
			}),
			(i.prototype._settle = function (s) {
				s ? this._callbacks.reject(s) : this._callbacks.resolve(),
					(this._promise = null),
					(this._callbacks = null);
			}),
			(i.prototype._onPooledPromiseFulfilled = function (s, c) {
				this._size--,
					this.active() &&
						(this._fireEvent("fulfilled", { promise: s, result: c }),
						this._proceed());
			}),
			(i.prototype._onPooledPromiseRejected = function (s, c) {
				this._size--,
					this.active() &&
						(this._fireEvent("rejected", { promise: s, error: c }),
						this._settle(c || new Error("Unknown error")));
			}),
			(i.prototype._trackPromise = function (s) {
				var c = this;
				s.then(
					function (l) {
						c._onPooledPromiseFulfilled(s, l);
					},
					function (l) {
						c._onPooledPromiseRejected(s, l);
					},
				).catch(function (l) {
					c._settle(new Error("Promise processing failed: " + l));
				});
			}),
			(i.prototype._proceed = function () {
				if (!this._done) {
					for (
						var s = { done: !1 };
						this._size < this._concurrency && !(s = this._iterator.next()).done;
					)
						this._size++, this._trackPromise(s.value);
					this._done = s === null || !!s.done;
				}
				this._done && this._size === 0 && this._settle();
			}),
			(i.PromisePoolEvent = a),
			(i.PromisePool = i),
			i
		);
	});
});
var ol = Ue((VL, p2) => {
	E();
	p2.exports = React;
});
var g2 = Ue((Vi) => {
	"use strict";
	E();
	var Wg = ol(),
		zg = Symbol.for("react.element"),
		Qg = Symbol.for("react.fragment"),
		jg = Object.prototype.hasOwnProperty,
		e9 =
			Wg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
		t9 = { key: !0, ref: !0, __self: !0, __source: !0 };
	function b2(e, t, n) {
		var r,
			o = {},
			a = null,
			i = null;
		n !== void 0 && (a = "" + n),
			t.key !== void 0 && (a = "" + t.key),
			t.ref !== void 0 && (i = t.ref);
		for (r in t) jg.call(t, r) && !t9.hasOwnProperty(r) && (o[r] = t[r]);
		if (e && e.defaultProps)
			for (r in ((t = e.defaultProps), t)) o[r] === void 0 && (o[r] = t[r]);
		return {
			$$typeof: zg,
			type: e,
			key: a,
			ref: i,
			props: o,
			_owner: e9.current,
		};
	}
	Vi.Fragment = Qg;
	Vi.jsx = b2;
	Vi.jsxs = b2;
});
var al = Ue((zL, E2) => {
	"use strict";
	E();
	E2.exports = g2();
});
var H5 = Ue((ws) => {
	"use strict";
	E();
	Object.defineProperty(ws, "__esModule", { value: !0 });
	ws.sanitizeUrl = void 0;
	var aw = /^([^\w]*)(javascript|data|vbscript)/im,
		iw = /&#(\w+)(^\w|;)?/g,
		sw = /&(newline|tab);/gi,
		cw = /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim,
		lw = /^.+(:|&colon;)/gim,
		dw = [".", "/"];
	function Uw(e) {
		return dw.indexOf(e[0]) > -1;
	}
	function fw(e) {
		return e.replace(iw, function (t, n) {
			return String.fromCharCode(n);
		});
	}
	function uw(e) {
		var t = fw(e || "")
			.replace(sw, "")
			.replace(cw, "")
			.trim();
		if (!t) return "about:blank";
		if (Uw(t)) return t;
		var n = t.match(lw);
		if (!n) return t;
		var r = n[0];
		return aw.test(r) ? "about:blank" : t;
	}
	ws.sanitizeUrl = uw;
});
E();
var Hd = Kt(Vd(), 1),
	Jd = Kt(Wd(), 1),
	Lh = Kt(eU(), 1);
E();
var ks = Kt(Jf(), 1);
E();
E();
var kf = {};
E();
var En = {
	white: "#ffffff",
	black: "#000000",
	gray: [
		"#f8f9fa",
		"#f1f3f5",
		"#e9ecef",
		"#dee2e6",
		"#ced4da",
		"#adb5bd",
		"#868e96",
		"#495057",
		"#343a40",
		"#212529",
	],
	red: [
		"#fff5f5",
		"#ffe3e3",
		"#ffc9c9",
		"#ffa8a8",
		"#ff8787",
		"#ff6b6b",
		"#fa5252",
		"#f03e3e",
		"#e03131",
		"#c92a2a",
	],
	pink: [
		"#fff0f6",
		"#ffdeeb",
		"#fcc2d7",
		"#faa2c1",
		"#f783ac",
		"#f06595",
		"#e64980",
		"#d6336c",
		"#c2255c",
		"#a61e4d",
	],
	grape: [
		"#f8f0fc",
		"#f3d9fa",
		"#eebefa",
		"#e599f7",
		"#da77f2",
		"#cc5de8",
		"#be4bdb",
		"#ae3ec9",
		"#9c36b5",
		"#862e9c",
	],
	violet: [
		"#f3f0ff",
		"#e5dbff",
		"#d0bfff",
		"#b197fc",
		"#9775fa",
		"#845ef7",
		"#7950f2",
		"#7048e8",
		"#6741d9",
		"#5f3dc4",
	],
	indigo: [
		"#edf2ff",
		"#dbe4ff",
		"#bac8ff",
		"#91a7ff",
		"#748ffc",
		"#5c7cfa",
		"#4c6ef5",
		"#4263eb",
		"#3b5bdb",
		"#364fc7",
	],
	blue: [
		"#e7f5ff",
		"#d0ebff",
		"#a5d8ff",
		"#74c0fc",
		"#4dabf7",
		"#339af0",
		"#228be6",
		"#1c7ed6",
		"#1971c2",
		"#1864ab",
	],
	cyan: [
		"#e3fafc",
		"#c5f6fa",
		"#99e9f2",
		"#66d9e8",
		"#3bc9db",
		"#22b8cf",
		"#15aabf",
		"#1098ad",
		"#0c8599",
		"#0b7285",
	],
	teal: [
		"#e6fcf5",
		"#c3fae8",
		"#96f2d7",
		"#63e6be",
		"#38d9a9",
		"#20c997",
		"#12b886",
		"#0ca678",
		"#099268",
		"#087f5b",
	],
	green: [
		"#ebfbee",
		"#d3f9d8",
		"#b2f2bb",
		"#8ce99a",
		"#69db7c",
		"#51cf66",
		"#40c057",
		"#37b24d",
		"#2f9e44",
		"#2b8a3e",
	],
	lime: [
		"#f4fce3",
		"#e9fac8",
		"#d8f5a2",
		"#c0eb75",
		"#a9e34b",
		"#94d82d",
		"#82c91e",
		"#74b816",
		"#66a80f",
		"#5c940d",
	],
	yellow: [
		"#fff9db",
		"#fff3bf",
		"#ffec99",
		"#ffe066",
		"#ffd43b",
		"#fcc419",
		"#fab005",
		"#f59f00",
		"#f08c00",
		"#e67700",
	],
	orange: [
		"#fff4e6",
		"#ffe8cc",
		"#ffd8a8",
		"#ffc078",
		"#ffa94d",
		"#ff922b",
		"#fd7e14",
		"#f76707",
		"#e8590c",
		"#d9480f",
	],
};
var F7 = (e, t) => t.reduce((n, r) => (r in e && (n[r] = e[r]), n), {}),
	eR = 5,
	tR = 5,
	Yf = 4,
	ii = 4,
	si = 1,
	xt = [0, 2, 4, 6, 8];
var yt = (e, t) => t.map((n) => En[e][n]),
	Z = {
		transparent: "transparent",
		black: "#1e1e1e",
		white: "#ffffff",
		gray: yt("gray", xt),
		red: yt("red", xt),
		pink: yt("pink", xt),
		grape: yt("grape", xt),
		violet: yt("violet", xt),
		blue: yt("blue", xt),
		cyan: yt("cyan", xt),
		teal: yt("teal", xt),
		green: yt("green", xt),
		yellow: yt("yellow", xt),
		orange: yt("orange", xt),
		bronze: ["#f8f1ee", "#eaddd7", "#d2bab0", "#a18072", "#846358"],
	},
	Vf = F7(Z, [
		"cyan",
		"blue",
		"violet",
		"grape",
		"pink",
		"green",
		"teal",
		"yellow",
		"orange",
		"red",
	]),
	nR = [Z.black, Z.red[ii], Z.green[ii], Z.blue[ii], Z.yellow[ii]],
	rR = [Z.transparent, Z.red[si], Z.green[si], Z.blue[si], Z.yellow[si]],
	oR = [Z.white, "#f8f9fa", "#f5faff", "#fffce8", "#fdf8f6"],
	aR = {
		transparent: Z.transparent,
		white: Z.white,
		gray: Z.gray,
		black: Z.black,
		bronze: Z.bronze,
		...Vf,
	},
	iR = {
		transparent: Z.transparent,
		white: Z.white,
		gray: Z.gray,
		black: Z.black,
		bronze: Z.bronze,
		...Vf,
	},
	qf = (e) => [
		Z.cyan[e],
		Z.blue[e],
		Z.violet[e],
		Z.grape[e],
		Z.pink[e],
		Z.green[e],
		Z.teal[e],
		Z.yellow[e],
		Z.orange[e],
		Z.red[e],
	],
	sR = (e, t, n) =>
		`#${((1 << 24) + (e << 16) + (t << 8) + n).toString(16).slice(1)}`;
var ci = /Mac|iPod|iPhone|iPad/.test(navigator.platform),
	fR = /^Win/.test(navigator.platform),
	Gf = /\b(android)\b/i.test(navigator.userAgent),
	uR =
		"netscape" in window &&
		navigator.userAgent.indexOf("rv:") > 1 &&
		navigator.userAgent.indexOf("Gecko") > 1,
	O7 = navigator.userAgent.indexOf("Chrome") !== -1,
	li = !O7 && navigator.userAgent.indexOf("Safari") !== -1,
	Xf =
		/iPad|iPhone/.test(navigator.platform) ||
		(navigator.userAgent.includes("Mac") && "ontouchend" in document),
	pR = () => navigator.brave?.isBrave?.name === "isBrave",
	mR = typeof window < "u" && "ResizeObserver" in window,
	hR = "Excalidraw",
	Zf = 36,
	Wf = 10,
	zf = 8,
	bR = 5,
	gR = 1,
	ER = 30,
	Xt = Math.PI / 12,
	xR = "red",
	di = {
		TEXT: "text",
		CROSSHAIR: "crosshair",
		GRABBING: "grabbing",
		GRAB: "grab",
		POINTER: "pointer",
		MOVE: "move",
		AUTO: "",
	},
	yR = { MAIN: 0, WHEEL: 1, SECONDARY: 2, TOUCH: -1, ERASER: 5 },
	wR = {
		enabled: "all",
		disabled: "none",
		inheritFromUI: "var(--ui-pointerEvents)",
	};
var IR = {
		UNSTARTED: -1,
		ENDED: 0,
		PLAYING: 1,
		PAUSED: 2,
		BUFFERING: 3,
		CUED: 5,
	},
	We = { TEST: "test", DEVELOPMENT: "development" },
	TR = {
		SHAPE_ACTIONS_MENU: "App-menu__left",
		ZOOM_ACTIONS: "zoom-actions",
		SEARCH_MENU_INPUT_WRAPPER: "layer-ui__search-inputWrapper",
	},
	xr = "Xiaolai",
	kn = "Segoe UI Emoji",
	he = {
		Virgil: 1,
		Helvetica: 2,
		Cascadia: 3,
		Excalifont: 5,
		Nunito: 6,
		"Lilita One": 7,
		"Comic Shanns": 8,
		"Liberation Sans": 9,
		custom: "custom",
	},
	Yn = { [xr]: 100, [kn]: 1e3 },
	Ui = (e) => {
		switch (e) {
			case he.Excalifont:
				return [xr, kn];
			default:
				return [kn];
		}
	},
	ke = { LIGHT: "light", DARK: "dark" },
	Re = {
		strokeColor: "#bbb",
		strokeWidth: 2,
		strokeStyle: "solid",
		fillStyle: "solid",
		roughness: 0,
		roundness: null,
		backgroundColor: "transparent",
		radius: 8,
		nameOffsetY: 3,
		nameColorLightTheme: "#999999",
		nameColorDarkTheme: "#7a7a7a",
		nameFontSize: 14,
		nameLineHeight: 1.25,
	},
	fi = 1,
	Zt = 20,
	Wt = he.Excalifont,
	to = "left",
	ui = "top";
var Vo = 2,
	qo = 2 * Vo,
	A7 = 1e-5,
	RR = 2 * qo - A7,
	vR = "#ffffff",
	MR = "#1e1e1e",
	_R = "#a2f1a6";
var pi = 20,
	mi = 5,
	hi = {
		svg: "image/svg+xml",
		png: "image/png",
		jpg: "image/jpeg",
		gif: "image/gif",
		webp: "image/webp",
		bmp: "image/bmp",
		ico: "image/x-icon",
		avif: "image/avif",
		jfif: "image/jfif",
	},
	B = {
		text: "text/plain",
		html: "text/html",
		json: "application/json",
		excalidraw: "application/vnd.excalidraw+json",
		excalidrawlib: "application/vnd.excalidrawlib+json",
		"excalidraw.svg": "image/svg+xml",
		"excalidraw.png": "image/png",
		binary: "application/octet-stream",
		...hi,
	},
	Qf = [B.text, B.html, ...Object.values(hi)],
	LR = { png: "png", svg: "svg", clipboard: "clipboard" },
	ze = {
		excalidraw: "excalidraw",
		excalidrawClipboard: "excalidraw/clipboard",
		excalidrawLibrary: "excalidrawlib",
		excalidrawClipboardWithAPI: "excalidraw-api/clipboard",
	},
	Mc = window.EXCALIDRAW_EXPORT_SOURCE || window.location.origin,
	DR = 500,
	SR = 300,
	$R = 500;
var NR = 100,
	PR = 0.1,
	jf = 0.1,
	e1 = 30,
	FR = 300;
var bi = "invert(93%) hue-rotate(180deg)",
	OR = { addLibrary: "addLibrary" },
	AR = { addLibrary: "addLibrary" },
	BR = {
		canvasActions: {
			changeViewBackgroundColor: !0,
			clearCanvas: !0,
			export: { saveFileToDisk: !0 },
			loadScene: !0,
			saveToActiveFile: !0,
			toggleTheme: null,
			saveAsImage: !0,
		},
		tools: { image: !0 },
	},
	CR = 730,
	KR = 1e3,
	HR = 500,
	JR = 1229,
	kR = parseInt(kf.rightSidebarWidth),
	no = 2,
	t1 = [1, 2, 3],
	_c = 10,
	YR = 1440,
	VR = 4 * 1024 * 1024,
	le = "http://www.w3.org/2000/svg";
var Lc = { excalidraw: 2, excalidrawLibrary: 2 },
	ve = 5,
	n1 = 0.7,
	r1 = 11,
	xn = { TOP: "top", MIDDLE: "middle", BOTTOM: "bottom" },
	Dc = { LEFT: "left", CENTER: "center", RIGHT: "right" },
	o1 = 20,
	gi = 0.25,
	a1 = 32,
	rt = { LEGACY: 1, PROPORTIONAL_RADIUS: 2, ADAPTIVE_RADIUS: 3 },
	Sc = { architect: 0, artist: 1, cartoonist: 2 },
	qR = { thin: 1, bold: 2, extraBold: 4 },
	be = {
		strokeColor: Z.black,
		backgroundColor: Z.transparent,
		fillStyle: "solid",
		strokeWidth: 2,
		strokeStyle: "solid",
		roughness: Sc.artist,
		opacity: 100,
		locked: !1,
	},
	B7 = "library",
	GR = "search",
	i1 = { name: "default", defaultTab: B7 },
	XR = new Set(["iframe", "embeddable", "image"]),
	Vn = {
		selection: "selection",
		rectangle: "rectangle",
		diamond: "diamond",
		ellipse: "ellipse",
		arrow: "arrow",
		line: "line",
		freedraw: "freedraw",
		text: "text",
		image: "image",
		eraser: "eraser",
		hand: "hand",
		frame: "frame",
		magicframe: "magicframe",
		embeddable: "embeddable",
		laser: "laser",
	},
	ZR = {
		OAI_API_KEY: "excalidraw-oai-api-key",
		MERMAID_TO_EXCALIDRAW: "mermaid-to-excalidraw",
		PUBLISH_LIBRARY: "publish-library-data",
	},
	s1 = "Untitled",
	$c = { generalStats: 1, elementProperties: 2 },
	WR = 1,
	c1 = { sharp: "sharp", round: "round", elbow: "elbow" },
	l1 = 0.3,
	Go = "element";
E();
E();
E();
var Ei = (e = 21) =>
	crypto
		.getRandomValues(new Uint8Array(e))
		.reduce(
			(t, n) => (
				(n &= 63),
				n < 36
					? (t += n.toString(36))
					: n < 62
						? (t += (n - 26).toString(36).toUpperCase())
						: n > 62
							? (t += "-")
							: (t += "_"),
				t
			),
			"",
		);
E();
var C7 = t1.includes(devicePixelRatio) ? devicePixelRatio : 1,
	wt = () => ({
		showWelcomeScreen: !1,
		theme: ke.LIGHT,
		collaborators: new Map(),
		currentChartType: "bar",
		currentItemBackgroundColor: be.backgroundColor,
		currentItemEndArrowhead: "arrow",
		currentItemFillStyle: be.fillStyle,
		currentItemFontFamily: Wt,
		currentItemFontSize: Zt,
		currentItemOpacity: be.opacity,
		currentItemRoughness: be.roughness,
		currentItemStartArrowhead: null,
		currentItemStrokeColor: be.strokeColor,
		currentItemRoundness: "round",
		currentItemArrowType: c1.round,
		currentItemStrokeStyle: be.strokeStyle,
		currentItemStrokeWidth: be.strokeWidth,
		currentItemTextAlign: to,
		currentHoveredFontFamily: null,
		cursorButton: "up",
		activeEmbeddable: null,
		newElement: null,
		editingTextElement: null,
		editingGroupId: null,
		editingLinearElement: null,
		activeTool: {
			type: "selection",
			customType: null,
			locked: be.locked,
			lastActiveTool: null,
		},
		penMode: !1,
		penDetected: !1,
		errorMessage: null,
		exportBackground: !0,
		exportScale: C7,
		exportEmbedScene: !1,
		exportWithDarkMode: !1,
		fileHandle: null,
		gridSize: pi,
		gridStep: mi,
		gridModeEnabled: !1,
		isBindingEnabled: !0,
		defaultSidebarDockedPreference: !1,
		isLoading: !1,
		isResizing: !1,
		isRotating: !1,
		lastPointerDownWith: "mouse",
		multiElement: null,
		name: null,
		contextMenu: null,
		openMenu: null,
		openPopup: null,
		openSidebar: null,
		openDialog: null,
		pasteDialog: { shown: !1, data: null },
		previousSelectedElementIds: {},
		resizingElement: null,
		scrolledOutside: !1,
		scrollX: 0,
		scrollY: 0,
		selectedElementIds: {},
		hoveredElementIds: {},
		selectedGroupIds: {},
		selectedElementsAreBeingDragged: !1,
		selectionElement: null,
		shouldCacheIgnoreZoom: !1,
		stats: { open: !1, panels: $c.generalStats | $c.elementProperties },
		startBoundElement: null,
		suggestedBindings: [],
		frameRendering: { enabled: !0, clip: !0, name: !0, outline: !0 },
		frameToHighlight: null,
		editingFrame: null,
		elementsToHighlight: null,
		toast: null,
		viewBackgroundColor: Z.white,
		zenModeEnabled: !1,
		zoom: { value: 1 },
		viewModeEnabled: !1,
		pendingImageElementId: null,
		showHyperlinkPopup: !1,
		selectedLinearElement: null,
		snapLines: [],
		originSnapOffset: { x: 0, y: 0 },
		objectsSnapModeEnabled: !1,
		userToFollow: null,
		followedBy: new Set(),
		isCropping: !1,
		croppingElementId: null,
		searchMatches: [],
	}),
	K7 = ((e) => e)({
		showWelcomeScreen: { browser: !0, export: !1, server: !1 },
		theme: { browser: !0, export: !1, server: !1 },
		collaborators: { browser: !1, export: !1, server: !1 },
		currentChartType: { browser: !0, export: !1, server: !1 },
		currentItemBackgroundColor: { browser: !0, export: !1, server: !1 },
		currentItemEndArrowhead: { browser: !0, export: !1, server: !1 },
		currentItemFillStyle: { browser: !0, export: !1, server: !1 },
		currentItemFontFamily: { browser: !0, export: !1, server: !1 },
		currentItemFontSize: { browser: !0, export: !1, server: !1 },
		currentItemRoundness: { browser: !0, export: !1, server: !1 },
		currentItemArrowType: { browser: !0, export: !1, server: !1 },
		currentItemOpacity: { browser: !0, export: !1, server: !1 },
		currentItemRoughness: { browser: !0, export: !1, server: !1 },
		currentItemStartArrowhead: { browser: !0, export: !1, server: !1 },
		currentItemStrokeColor: { browser: !0, export: !1, server: !1 },
		currentItemStrokeStyle: { browser: !0, export: !1, server: !1 },
		currentItemStrokeWidth: { browser: !0, export: !1, server: !1 },
		currentItemTextAlign: { browser: !0, export: !1, server: !1 },
		currentHoveredFontFamily: { browser: !1, export: !1, server: !1 },
		cursorButton: { browser: !0, export: !1, server: !1 },
		activeEmbeddable: { browser: !1, export: !1, server: !1 },
		newElement: { browser: !1, export: !1, server: !1 },
		editingTextElement: { browser: !1, export: !1, server: !1 },
		editingGroupId: { browser: !0, export: !1, server: !1 },
		editingLinearElement: { browser: !1, export: !1, server: !1 },
		activeTool: { browser: !0, export: !1, server: !1 },
		penMode: { browser: !0, export: !1, server: !1 },
		penDetected: { browser: !0, export: !1, server: !1 },
		errorMessage: { browser: !1, export: !1, server: !1 },
		exportBackground: { browser: !0, export: !1, server: !1 },
		exportEmbedScene: { browser: !0, export: !1, server: !1 },
		exportScale: { browser: !0, export: !1, server: !1 },
		exportWithDarkMode: { browser: !0, export: !1, server: !1 },
		fileHandle: { browser: !1, export: !1, server: !1 },
		gridSize: { browser: !0, export: !0, server: !0 },
		gridStep: { browser: !0, export: !0, server: !0 },
		gridModeEnabled: { browser: !0, export: !0, server: !0 },
		height: { browser: !1, export: !1, server: !1 },
		isBindingEnabled: { browser: !1, export: !1, server: !1 },
		defaultSidebarDockedPreference: { browser: !0, export: !1, server: !1 },
		isLoading: { browser: !1, export: !1, server: !1 },
		isResizing: { browser: !1, export: !1, server: !1 },
		isRotating: { browser: !1, export: !1, server: !1 },
		lastPointerDownWith: { browser: !0, export: !1, server: !1 },
		multiElement: { browser: !1, export: !1, server: !1 },
		name: { browser: !0, export: !1, server: !1 },
		offsetLeft: { browser: !1, export: !1, server: !1 },
		offsetTop: { browser: !1, export: !1, server: !1 },
		contextMenu: { browser: !1, export: !1, server: !1 },
		openMenu: { browser: !0, export: !1, server: !1 },
		openPopup: { browser: !1, export: !1, server: !1 },
		openSidebar: { browser: !0, export: !1, server: !1 },
		openDialog: { browser: !1, export: !1, server: !1 },
		pasteDialog: { browser: !1, export: !1, server: !1 },
		previousSelectedElementIds: { browser: !0, export: !1, server: !1 },
		resizingElement: { browser: !1, export: !1, server: !1 },
		scrolledOutside: { browser: !0, export: !1, server: !1 },
		scrollX: { browser: !0, export: !1, server: !1 },
		scrollY: { browser: !0, export: !1, server: !1 },
		selectedElementIds: { browser: !0, export: !1, server: !1 },
		hoveredElementIds: { browser: !1, export: !1, server: !1 },
		selectedGroupIds: { browser: !0, export: !1, server: !1 },
		selectedElementsAreBeingDragged: { browser: !1, export: !1, server: !1 },
		selectionElement: { browser: !1, export: !1, server: !1 },
		shouldCacheIgnoreZoom: { browser: !0, export: !1, server: !1 },
		stats: { browser: !0, export: !1, server: !1 },
		startBoundElement: { browser: !1, export: !1, server: !1 },
		suggestedBindings: { browser: !1, export: !1, server: !1 },
		frameRendering: { browser: !1, export: !1, server: !1 },
		frameToHighlight: { browser: !1, export: !1, server: !1 },
		editingFrame: { browser: !1, export: !1, server: !1 },
		elementsToHighlight: { browser: !1, export: !1, server: !1 },
		toast: { browser: !1, export: !1, server: !1 },
		viewBackgroundColor: { browser: !0, export: !0, server: !0 },
		width: { browser: !1, export: !1, server: !1 },
		zenModeEnabled: { browser: !0, export: !1, server: !1 },
		zoom: { browser: !0, export: !1, server: !1 },
		viewModeEnabled: { browser: !1, export: !1, server: !1 },
		pendingImageElementId: { browser: !1, export: !1, server: !1 },
		showHyperlinkPopup: { browser: !1, export: !1, server: !1 },
		selectedLinearElement: { browser: !0, export: !1, server: !1 },
		snapLines: { browser: !1, export: !1, server: !1 },
		originSnapOffset: { browser: !1, export: !1, server: !1 },
		objectsSnapModeEnabled: { browser: !0, export: !1, server: !1 },
		userToFollow: { browser: !1, export: !1, server: !1 },
		followedBy: { browser: !1, export: !1, server: !1 },
		isCropping: { browser: !1, export: !1, server: !1 },
		croppingElementId: { browser: !1, export: !1, server: !1 },
		searchMatches: { browser: !1, export: !1, server: !1 },
	}),
	d1 = (e, t) => {
		let n = {};
		for (let r of Object.keys(e))
			if (K7[r]?.[t]) {
				let a = e[r];
				n[r] = a;
			}
		return n;
	};
var xi = (e) => d1(e, "export"),
	U1 = (e) => d1(e, "server"),
	f1 = ({ activeTool: e }) => e.type === "eraser",
	u1 = ({ activeTool: e }) => e.type === "hand";
E();
E();
E();
E();
var ph = Kt(g1(), 1);
E();
E();
var $1 = Kt(x1(), 1);
E();
E();
E();
E();
var Ee = (e, t, n) => Math.min(Math.max(e, t), n),
	y1 = (e, t, n = "round") => {
		let r = Math.pow(10, t);
		return Math[n]((e + Number.EPSILON) * r) / r;
	},
	fv = (e, t, n = "round") => {
		let r = 1 / t;
		return Math[n](e * r) / r;
	},
	Xo = (e, t) => (e + t) / 2,
	wi = (e) => typeof e == "number" && Number.isFinite(e),
	Fc = (e, t, n = 1e-4) => Math.abs(e - t) < n;
var Zo = (e) =>
	e < 0 ? e + 2 * Math.PI : e >= 2 * Math.PI ? e - 2 * Math.PI : e;
function Oc(e) {
	return (e * Math.PI) / 180;
}
function w1(e) {
	return (e * 180) / Math.PI;
}
function I1(e) {
	return Math.abs(Math.sin(2 * e)) < 1e-4;
}
E();
E();
E();
function De(e, t, n = 0, r = 0) {
	return [e - n, t - r];
}
function ae(e, t = [0, 0]) {
	return De(e[0] - t[0], e[1] - t[1]);
}
function Ut(e, t) {
	return e[0] * t[1] - t[0] * e[1];
}
function Iv(e, t) {
	return e[0] * t[0] + e[1] * t[1];
}
function Tt(e, t) {
	return [e[0] + t[0], e[1] + t[1]];
}
function yr(e, t) {
	return [e[0] - t[0], e[1] - t[1]];
}
function Qe(e, t) {
	return De(e[0] * t, e[1] * t);
}
function og(e) {
	return e[0] * e[0] + e[1] * e[1];
}
function ag(e) {
	return Math.sqrt(og(e));
}
var Ac = (e) => {
	let t = ag(e);
	return De(e[0] / t, e[1] / t);
};
function b(e, t) {
	return [e, t];
}
function Wo(e) {
	return e.length === 2 ? b(e[0], e[1]) : void 0;
}
function Bc(e) {
	return (
		Array.isArray(e) &&
		e.length === 2 &&
		typeof e[0] == "number" &&
		!isNaN(e[0]) &&
		typeof e[1] == "number" &&
		!isNaN(e[1])
	);
}
function wr(e, t) {
	let n = Math.abs;
	return n(e[0] - t[0]) < 1e-4 && n(e[1] - t[1]) < 1e-4;
}
function D([e, t], [n, r], o) {
	return b(
		(e - n) * Math.cos(o) - (t - r) * Math.sin(o) + n,
		(e - n) * Math.sin(o) + (t - r) * Math.cos(o) + r,
	);
}
function Ir(e, t = [0, 0]) {
	return b(e[0] + t[0], e[1] + t[1]);
}
function zt(e, t) {
	return b((e[0] + t[0]) / 2, (e[1] + t[1]) / 2);
}
function Ne(e, t) {
	return Math.hypot(t[0] - e[0], t[1] - e[1]);
}
function Cc(e, t) {
	return Math.hypot(t[0] - e[0], t[1] - e[1]);
}
var Rt = (e, t, n) => Ir(t, Qe(ae(e, t), n)),
	Ii = (e, t, n) =>
		t[0] <= Math.max(e[0], n[0]) &&
		t[0] >= Math.min(e[0], n[0]) &&
		t[1] <= Math.max(e[1], n[1]) &&
		t[1] >= Math.min(e[1], n[1]);
function T1(e, t, n, r) {
	return [e, t, n, r];
}
E();
E();
E();
function re(e, t) {
	return [e, t];
}
var v1 = (e, t) => {
		let n = ae(e[0]),
			r = ae(e[1]),
			o = ae(t[0]),
			a = ae(t[1]),
			i = yr(r, n),
			s = yr(a, o),
			c = Ut(i, s);
		if (c === 0) return null;
		let l = yr(ae(t[0]), ae(e[0])),
			d = Ut(l, i) / c,
			U = Ut(l, s) / c;
		if (d === 0) return null;
		let u = Tt(n, Qe(i, U));
		return U >= 0 && U < 1 && d >= 0 && d < 1 ? u : null;
	},
	qn = (e, t, n = 1e-4) => {
		let r = ig(e, t);
		return r === 0 ? !0 : r < n;
	},
	ig = (e, t) => {
		let [n, r] = e,
			[[o, a], [i, s]] = t,
			c = n - o,
			l = r - a,
			d = i - o,
			U = s - a,
			u = c * d + l * U,
			p = d * d + U * U,
			m = -1;
		p !== 0 && (m = u / p);
		let h, g;
		m < 0
			? ((h = o), (g = a))
			: m > 1
				? ((h = i), (g = s))
				: ((h = o + m * d), (g = a + m * U));
		let x = n - h,
			y = r - g;
		return Math.sqrt(x * x + y * y);
	};
function Kc(...e) {
	return _1(e);
}
function ro(e) {
	return _1(e);
}
var Hc = (e, t) => {
		let n = e[0],
			r = e[1],
			o = !1;
		for (let a = 0, i = t.length - 1; a < t.length; i = a++) {
			let s = t[a][0],
				c = t[a][1],
				l = t[i][0],
				d = t[i][1];
			((c > r && d <= r) || (c <= r && d > r)) &&
				n < ((l - s) * (r - c)) / (d - c) + s &&
				(o = !o);
		}
		return o;
	},
	M1 = (e, t, n = 1e-4) => {
		let r = !1;
		for (let o = 0, a = t.length - 1; o < a; o++)
			if (qn(e, re(t[o], t[o + 1]), n)) {
				r = !0;
				break;
			}
		return r;
	};
function _1(e) {
	return sg(e) ? e : [...e, e[0]];
}
function sg(e) {
	return wr(e[0], e[e.length - 1]);
}
E();
function Se(e, t) {
	return Be([e, t]);
}
var zo = ([e, t], [n, r]) => (e <= n ? t >= n : e >= n ? r >= e : !1),
	Qo = ([e, t], [n, r]) => {
		let o = Math.max(e, n),
			a = Math.min(t, r);
		return o <= a ? Be([o, a]) : null;
	},
	jo = (e, [t, n]) => e >= t && e <= n;
E();
function Tr([e, t, n], r) {
	let o = (d, U, u) =>
			(d[0] - u[0]) * (U[1] - u[1]) - (U[0] - u[0]) * (d[1] - u[1]),
		a = o(r, e, t),
		i = o(r, t, n),
		s = o(r, n, e),
		c = a < 0 || i < 0 || s < 0,
		l = a > 0 || i > 0 || s > 0;
	return !(c && l);
}
E();
var L1 = null;
var bM = () => {
		if (L1) return L1;
		let e = new Date(),
			t = e.getFullYear(),
			n = `${e.getMonth() + 1}`.padStart(2, "0"),
			r = `${e.getDate()}`.padStart(2, "0"),
			o = `${e.getHours()}`.padStart(2, "0"),
			a = `${e.getMinutes()}`.padStart(2, "0");
		return `${t}-${n}-${r}-${o}${a}`;
	},
	gM = (e) => e.charAt(0).toUpperCase() + e.slice(1),
	EM = (e) => e instanceof HTMLElement && e.className.includes("ToolIcon"),
	cg = (e) =>
		(e instanceof HTMLElement && e.dataset.type === "wysiwyg") ||
		e instanceof HTMLBRElement ||
		e instanceof HTMLInputElement ||
		e instanceof HTMLTextAreaElement ||
		e instanceof HTMLSelectElement,
	xM = (e) => cg(e) || (e instanceof Element && !!e.closest("label, button")),
	yM = (e) =>
		(e instanceof HTMLElement && e.dataset.type === "wysiwyg") ||
		e instanceof HTMLBRElement ||
		e instanceof HTMLTextAreaElement ||
		(e instanceof HTMLInputElement &&
			(e.type === "text" || e.type === "number" || e.type === "password")),
	Jc = ({ fontFamily: e }) => {
		for (let [t, n] of Object.entries(he))
			if (n === e)
				return `${t}${Ui(n)
					.map((r) => `, ${r}`)
					.join("")}`;
		return typeof e == "string" ? `${e}, ${kn}` : kn;
	},
	pe = ({ fontSize: e, fontFamily: t }) => `${e}px ${Jc({ fontFamily: t })}`,
	Ti = (e, t) => {
		let n = 0,
			r = null,
			o = (...a) => {
				(r = a),
					clearTimeout(n),
					(n = window.setTimeout(() => {
						(r = null), e(...a);
					}, t));
			};
		return (
			(o.flush = () => {
				if ((clearTimeout(n), r)) {
					let a = r;
					(r = null), e(...a);
				}
			}),
			(o.cancel = () => {
				(r = null), clearTimeout(n);
			}),
			o
		);
	},
	N1 = (e, t) => {
		let n = null,
			r = null,
			o = null,
			a = (s) => {
				n = window.requestAnimationFrame(() => {
					(n = null), e(...s), (r = null), o && ((r = o), (o = null), a(r));
				});
			},
			i = (...s) => {
				if (R.MODE === "test") {
					e(...s);
					return;
				}
				(r = s), n === null ? a(r) : t?.trailing && (o = s);
			};
		return (
			(i.flush = () => {
				n !== null && (cancelAnimationFrame(n), (n = null)),
					r && (e(...(o || r)), (r = o = null));
			}),
			(i.cancel = () => {
				(r = o = null), n !== null && (cancelAnimationFrame(n), (n = null));
			}),
			i
		);
	},
	P1 = (e) => 1 - Math.pow(1 - e, 4),
	D1 = (e, t, n) => (t - e) * P1(n) + e,
	wM = ({
		fromValues: e,
		toValues: t,
		onStep: n,
		duration: r = 250,
		interpolateValue: o,
		onStart: a,
		onEnd: i,
		onCancel: s,
	}) => {
		let c = !1,
			l = 0,
			d;
		function U(u) {
			if (c) return;
			d === void 0 && ((d = u), a?.());
			let p = Math.min(u - d, r),
				m = P1(p / r),
				h = {};
			if (
				(Object.keys(e).forEach((g) => {
					let x = g,
						y = (t[x] - e[x]) * m + e[x];
					h[x] = y;
				}),
				n(h),
				p < r)
			) {
				let g = p / r,
					x = {};
				Object.keys(e).forEach((y) => {
					let w = y,
						T = e[w],
						I = t[w],
						_;
					(_ = o ? o(T, I, g, w) : D1(T, I, g)),
						_ == null && (_ = D1(T, I, g)),
						(x[w] = _);
				}),
					n(x),
					(l = window.requestAnimationFrame(U));
			} else n(t), i?.();
		}
		return (
			(l = window.requestAnimationFrame(U)),
			() => {
				s?.(), (c = !0), window.cancelAnimationFrame(l);
			}
		);
	},
	IM = (e, t) => {
		if (!e.length || t < 1) return [];
		let n = 0,
			r = 0,
			o = Array(Math.ceil(e.length / t));
		for (; n < e.length; ) o[r++] = e.slice(n, (n += t));
		return o;
	};
var ft = (e, t) => Math.abs(e - t),
	ta = (e, t) =>
		t.type === "custom"
			? {
					...e.activeTool,
					type: "custom",
					customType: t.customType,
					locked: t.locked ?? e.activeTool.locked,
				}
			: {
					...e.activeTool,
					lastActiveTool:
						t.lastActiveToolBeforeEraser === void 0
							? e.activeTool.lastActiveTool
							: t.lastActiveToolBeforeEraser,
					type: t.type,
					customType: null,
					locked: t.locked ?? e.activeTool.locked,
				};
var TM = (e) => (
		(e = e
			.replace(/\bAlt\b/i, "Alt")
			.replace(/\bShift\b/i, "Shift")
			.replace(/\b(Enter|Return)\b/i, "Enter")),
		ci
			? e.replace(/\bCtrlOrCmd\b/gi, "Cmd").replace(/\bAlt\b/i, "Option")
			: e.replace(/\bCtrlOrCmd\b/gi, "Ctrl")
	),
	Rr = (
		{ clientX: e, clientY: t },
		{ zoom: n, offsetLeft: r, offsetTop: o, scrollX: a, scrollY: i },
	) => {
		let s = (e - r) / n.value - a,
			c = (t - o) / n.value - i;
		return { x: s, y: c };
	},
	kc = (
		{ sceneX: e, sceneY: t },
		{ zoom: n, offsetLeft: r, offsetTop: o, scrollX: a, scrollY: i },
	) => {
		let s = (e + a) * n.value + r,
			c = (t + i) * n.value + o;
		return { x: s, y: c };
	},
	RM = (e) =>
		getComputedStyle(document.documentElement).getPropertyValue(`--${e}`),
	lg =
		"A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u0300-\u0590\u0800-\u1FFF\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF",
	dg = "\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC",
	Ug = new RegExp(`^[^${lg}]*[${dg}]`),
	Ri = (e) => Ug.test(e),
	yn = (e) => {
		let [t, n] = e;
		return { x: t, y: n };
	},
	vM = (e) => {
		if (e?.name === "AbortError") {
			console.warn(e);
			return;
		}
		throw e;
	},
	MM = (e, t, n = 0) => {
		n < 0 && (n = e.length + n), (n = Math.min(e.length, Math.max(n, 0)));
		let r = n - 1;
		for (; ++r < e.length; ) if (t(e[r], r, e)) return r;
		return -1;
	},
	_M = (e, t, n = e.length - 1) => {
		n < 0 && (n = e.length + n), (n = Math.min(e.length - 1, Math.max(n, 0)));
		let r = n + 1;
		for (; --r > -1; ) if (t(e[r], r, e)) return r;
		return -1;
	},
	Gn = (e) => {
		let t = e.length === 5 && e.substr(4, 1) === "0",
			n = e.length === 9 && e.substr(7, 2) === "00";
		return t || n || e === Z.transparent;
	},
	LM = () => {
		let e,
			t,
			n = new Promise((r, o) => {
				(e = r), (t = o);
			});
		return (n.resolve = e), (n.reject = t), n;
	};
var DM = (e) => {
		let t = e.parentElement;
		for (; t; ) {
			if (t === document.body) return document;
			let { overflowY: n } = window.getComputedStyle(t);
			if (
				t.scrollHeight > t.clientHeight &&
				(n === "auto" || n === "scroll" || n === "overlay")
			)
				return t;
			t = t.parentElement;
		}
		return document;
	},
	SM = (e) => {
		let t = e.parentElement;
		for (; t; ) {
			if (t.tabIndex > -1) {
				t.focus();
				return;
			}
			t = t.parentElement;
		}
	},
	$M = (e) => {
		e.preventDefault(), (e.returnValue = "");
	},
	F1 = (e) =>
		Array.from(e)
			.map((t) => `0${t.toString(16)}`.slice(-2))
			.join(""),
	wn = () => (In() ? 1 : Date.now()),
	j = (e) =>
		e instanceof Map
			? e
			: e.reduce(
					(t, n) => (t.set(typeof n == "string" ? n : n.id, n), t),
					new Map(),
				),
	NM = (e) => e.reduce((t, n, r) => (t.set(n.id, [n, r]), t), new Map()),
	Qt = (e, t) => e.reduce((n, r) => ((n[t ? t(r) : String(r)] = r), n), {}),
	PM = (e) =>
		e.reduce((t, n, r) => {
			let o = { ...n, prev: null, next: null };
			if (r !== 0) {
				let a = t[r - 1];
				if (((o.prev = a), (a.next = o), r === e.length - 1)) {
					let i = t[0];
					(o.next = i), (i.prev = o);
				}
			}
			return t.push(o), t;
		}, []),
	In = () => R.MODE === "test",
	FM = () => R.MODE === "development",
	O1 = () => typeof process < "u" && !0,
	OM = (e, t) =>
		new CustomEvent(e, { detail: { nativeEvent: t }, cancelable: !0 }),
	AM = (e, t) => {
		let n = !1;
		for (let r in t) {
			let o = t[r];
			if (typeof o < "u") {
				if (e[r] === o && (typeof o != "object" || o === null)) continue;
				n = !0;
			}
		}
		return n ? { ...e, ...t } : e;
	};
var BM = () => {
	try {
		return window.self === window.top ? "top" : "iframe";
	} catch {
		return "iframe";
	}
};
var vi = (e) =>
		!!e &&
		typeof e == "object" &&
		"then" in e &&
		"catch" in e &&
		"finally" in e,
	CM = (e) => {
		let t = e?.querySelectorAll(
			"button, a, input, select, textarea, div[tabindex], label[tabindex]",
		);
		return t ? Array.from(t).filter((n) => n.tabIndex > -1 && !n.disabled) : [];
	},
	S1 = (e, t) =>
		Array.isArray(e) && Array.isArray(t) && e.length === 0 && t.length === 0
			? !0
			: e === t,
	Tn = (e, t, n, r = !1) => {
		let o = Object.keys(e),
			a = Object.keys(t);
		if (o.length !== a.length)
			return (
				r &&
					console.warn(
						"%cisShallowEqual: objects don't have same properties ->",
						"color: #8B4000",
						e,
						t,
					),
				!1
			);
		if (n && Array.isArray(n)) {
			for (let i of n)
				if (!(e[i] === t[i] || S1(e[i], t[i])))
					return (
						r &&
							console.warn(
								`%cisShallowEqual: ${i} not equal ->`,
								"color: #8B4000",
								e[i],
								t[i],
							),
						!1
					);
			return !0;
		}
		return o.every((i) => {
			let s = n?.[i],
				c = s ? s(e[i], t[i]) : e[i] === t[i] || S1(e[i], t[i]);
			return (
				!c &&
					r &&
					console.warn(
						`%cisShallowEqual: ${i} not equal ->`,
						"color: #8B4000",
						e[i],
						t[i],
					),
				c
			);
		});
	},
	KM = (e, t, { checkForDefaultPrevented: n = !0 } = {}) =>
		function (o) {
			if ((e?.(o), !n || !o?.defaultPrevented)) return t?.(o);
		},
	vr = (e, t, n) => {
		if (!t) return e;
		if (n) return console.error(t), e;
		throw new Error(t);
	};
function ut(e, t) {
	if (!e) throw new Error(t);
}
var HM = (e) => {
		let t,
			n,
			r = function (o) {
				let a = Object.entries(o);
				if (t) {
					let s = !0;
					for (let [c, l] of a)
						if (t.get(c) !== l) {
							s = !1;
							break;
						}
					if (s) return n;
				}
				let i = e(o);
				return (t = new Map(a)), (n = i), i;
			};
		return (
			(r.clear = () => {
				(t = void 0), (n = void 0);
			}),
			r
		);
	},
	A1 = (e, t) =>
		e instanceof Set || e instanceof Map
			? e.has(t)
			: "includes" in e
				? e.includes(t)
				: e.hasOwnProperty(t),
	JM = (e) => JSON.parse(JSON.stringify(e)),
	kM = (e, t) => (Tn(e, t) ? e : t);
function YM(e, t, n, r) {
	return e
		? (e?.addEventListener?.(t, n, r),
			() => {
				e?.removeEventListener?.(t, n, r);
			})
		: () => {};
}
function VM(e, t = !0) {
	let n = e.length;
	if (n < 4) return "";
	let r = e[0],
		o = e[1],
		a = e[2],
		i = `M${r[0].toFixed(2)},${r[1].toFixed(2)} Q${o[0].toFixed(2)},${o[1].toFixed(2)} ${Xo(o[0], a[0]).toFixed(2)},${Xo(o[1], a[1]).toFixed(2)} T`;
	for (let s = 2, c = n - 1; s < c; s++)
		(r = e[s]),
			(o = e[s + 1]),
			(i += `${Xo(r[0], o[0]).toFixed(2)},${Xo(r[1], o[1]).toFixed(2)} `);
	return t && (i += "Z"), i;
}
var B1 = (e) =>
		e.replace(
			/\r?\n|\r/g,
			`
`,
		),
	Be = (e) => e,
	Xn = async (e, ...t) =>
		new Promise((n) => {
			n(e(...t));
		}),
	C1 = (...e) => Math.max(...e.map((t) => (t ? 1 : 0))) > 0;
var ea = class {
	pool;
	entries = {};
	constructor(t, n) {
		this.pool = new $1.default(t, n);
	}
	all() {
		let t = (n) => {
			if (n.data.result) {
				let [r, o] = n.data.result;
				this.entries[r] = o;
			}
		};
		return (
			this.pool.addEventListener("fulfilled", t),
			this.pool.start().then(
				() => (
					setTimeout(() => {
						this.pool.removeEventListener("fulfilled", t);
					}),
					Object.values(this.entries)
				),
			)
		);
	}
};
var jt = (e) => !!e && e.type === "image" && !!e.fileId,
	Pe = (e) => !!e && e.type === "image",
	Mi = (e) => !!e && e.type === "embeddable",
	na = (e) => !!e && e.type === "iframe",
	vt = (e) => !!e && (e.type === "iframe" || e.type === "embeddable"),
	X = (e) => e != null && e.type === "text",
	K1 = (e) => e != null && e.type === "frame",
	H1 = (e) => e != null && e.type === "magicframe",
	de = (e) => e != null && (e.type === "frame" || e.type === "magicframe"),
	Fe = (e) => e != null && fg(e.type),
	fg = (e) => e === "freedraw",
	oe = (e) => e != null && Yc(e.type),
	Q = (e) => e != null && e.type === "arrow",
	se = (e) => Q(e) && e.elbowed,
	Yc = (e) => e === "arrow" || e === "line",
	ra = (e, t = !0) => e != null && (!e.locked || t === !0) && ug(e.type),
	ug = (e) => e === "arrow",
	en = (e, t = !0) =>
		e != null &&
		(!e.locked || t === !0) &&
		(e.type === "rectangle" ||
			e.type === "diamond" ||
			e.type === "ellipse" ||
			e.type === "image" ||
			e.type === "iframe" ||
			e.type === "embeddable" ||
			e.type === "frame" ||
			e.type === "magicframe" ||
			(e.type === "text" && !e.containerId)),
	J1 = (e) =>
		e != null &&
		(e.type === "rectangle" ||
			e.type === "diamond" ||
			e.type === "image" ||
			e.type === "iframe" ||
			e.type === "embeddable" ||
			e.type === "frame" ||
			e.type === "magicframe" ||
			(e.type === "text" && !e.containerId)),
	k1 = (e) =>
		e != null &&
		(e.type === "rectangle" ||
			e.type === "image" ||
			e.type === "text" ||
			e.type === "iframe" ||
			e.type === "embeddable" ||
			e.type === "frame" ||
			e.type === "magicframe" ||
			e.type === "freedraw"),
	pg = (e, t = !0) =>
		e != null &&
		(!e.locked || t === !0) &&
		(e.type === "rectangle" ||
			e.type === "diamond" ||
			e.type === "ellipse" ||
			Q(e)),
	Vc = (e) => {
		let t = e?.type;
		if (!t) return !1;
		switch (t) {
			case "text":
			case "diamond":
			case "rectangle":
			case "iframe":
			case "embeddable":
			case "ellipse":
			case "arrow":
			case "freedraw":
			case "line":
			case "frame":
			case "magicframe":
			case "image":
			case "selection":
				return !0;
			default:
				return vr(t, null), !1;
		}
	},
	WM = (e) =>
		e.type === "rectangle" || e.type === "ellipse" || e.type === "diamond",
	Zn = (e) => pg(e) && !!e.boundElements?.some(({ type: t }) => t === "text"),
	Me = (e) =>
		e !== null && "containerId" in e && e.containerId !== null && X(e),
	_i = (e) =>
		e === "rectangle" || e === "embeddable" || e === "iframe" || e === "image",
	Y1 = (e) => e === "line" || e === "arrow" || e === "diamond",
	zM = (e, t) =>
		!!(
			((e === rt.ADAPTIVE_RADIUS || e === rt.LEGACY) && _i(t.type)) ||
			(e === rt.PROPORTIONAL_RADIUS && Y1(t.type))
		),
	QM = (e) =>
		Y1(e.type)
			? { type: rt.PROPORTIONAL_RADIUS }
			: _i(e.type)
				? { type: rt.ADAPTIVE_RADIUS }
				: null,
	Mr = (e) => Object.hasOwn(e, "fixedPoint") && e.fixedPoint != null;
E();
E();
E();
E();
var qc,
	Li,
	Gc,
	V1 = (e) => (qc || (qc = ce.class(...Object.values(Rn))), qc.test(e)),
	mg = () => {
		if (!Li)
			try {
				Li = bg();
			} catch {
				Li = hg();
			}
		return Li;
	},
	Xc = () => (Gc || (Gc = gg()), Gc),
	pt = {
		WHITESPACE: /\s/u,
		HYPHEN: /-/u,
		OPENING: /<\(\[\{/u,
		CLOSING: />\)\]\}.,:;!\?…\//u,
	},
	Rn = {
		CHAR: /\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}｀＇＾〃〰〆＃＆＊＋－ー／＼＝｜￤〒￢￣/u,
		OPENING: /（［｛〈《｟｢「『【〖〔〘〚＜〝/u,
		CLOSING: /）］｝〉》｠｣」』】〗〕〙〛＞。．，、〟‥？！：；・〜〞/u,
		CURRENCY: /￥￦￡￠＄/u,
	},
	_r = {
		FLAG: /\p{RI}\p{RI}/u,
		JOINER:
			/(?:\p{Emoji_Modifier}|\uFE0F\u20E3?|[\u{E0020}-\u{E007E}]+\u{E007F})?/u,
		ZWJ: /\u200D/u,
		ANY: /[\p{Emoji}]/u,
		MOST: /[\p{Extended_Pictographic}\p{Emoji_Presentation}]/u,
	},
	hg = () => ce.or(Xc(), we.On(pt.HYPHEN, pt.WHITESPACE, Rn.CHAR)),
	bg = () =>
		ce.or(
			Xc(),
			we.Before(pt.WHITESPACE).Build(),
			we.After(pt.WHITESPACE, pt.HYPHEN).Build(),
			we
				.Before(Rn.CHAR, Rn.CURRENCY)
				.NotPrecededBy(pt.OPENING, Rn.OPENING)
				.Build(),
			we
				.After(Rn.CHAR)
				.NotFollowedBy(pt.HYPHEN, pt.CLOSING, Rn.CLOSING)
				.Build(),
			we.BeforeMany(Rn.OPENING).NotPrecededBy(pt.OPENING).Build(),
			we.AfterMany(Rn.CLOSING).NotFollowedBy(pt.CLOSING).Build(),
			we.AfterMany(pt.CLOSING).FollowedBy(pt.OPENING).Build(),
		),
	gg = () =>
		ce.group(
			ce.or(
				_r.FLAG,
				ce.and(
					_r.MOST,
					_r.JOINER,
					ce.build(
						`(?:${_r.ZWJ.source}(?:${_r.FLAG.source}|${_r.ANY.source}${_r.JOINER.source}))*`,
					),
				),
			),
		),
	ce = {
		build: (e) => new RegExp(e, "u"),
		join: (...e) => e.map((t) => t.source).join(""),
		and: (...e) => ce.build(ce.join(...e)),
		or: (...e) => ce.build(e.map((t) => t.source).join("|")),
		group: (...e) => ce.build(`(${ce.join(...e)})`),
		class: (...e) => ce.build(`[${ce.join(...e)}]`),
	},
	we = {
		On: (...e) => {
			let t = ce.join(...e);
			return ce.build(`([${t}])`);
		},
		Before: (...e) => {
			let t = ce.join(...e),
				n = () => ce.build(`(?=[${t}])`);
			return we.Chain(n);
		},
		After: (...e) => {
			let t = ce.join(...e),
				n = () => ce.build(`(?<=[${t}])`);
			return we.Chain(n);
		},
		BeforeMany: (...e) => {
			let t = ce.join(...e),
				n = () => ce.build(`(?<![${t}])(?=[${t}])`);
			return we.Chain(n);
		},
		AfterMany: (...e) => {
			let t = ce.join(...e),
				n = () => ce.build(`(?<=[${t}])(?![${t}])`);
			return we.Chain(n);
		},
		NotBefore: (...e) => {
			let t = ce.join(...e),
				n = () => ce.build(`(?![${t}])`);
			return we.Chain(n);
		},
		NotAfter: (...e) => {
			let t = ce.join(...e),
				n = () => ce.build(`(?<![${t}])`);
			return we.Chain(n);
		},
		Chain: (e) => ({
			Build: e,
			PreceededBy: (...t) => {
				let n = e(),
					r = we.After(...t).Build(),
					o = () => ce.and(r, n);
				return we.Chain(o);
			},
			FollowedBy: (...t) => {
				let n = e(),
					r = we.Before(...t).Build(),
					o = () => ce.and(n, r);
				return we.Chain(o);
			},
			NotPrecededBy: (...t) => {
				let n = e(),
					r = we.NotAfter(...t).Build(),
					o = () => ce.and(r, n);
				return we.Chain(o);
			},
			NotFollowedBy: (...t) => {
				let n = e(),
					r = we.NotBefore(...t).Build(),
					o = () => ce.and(n, r);
				return we.Chain(o);
			},
		}),
	},
	Eg = (e) => {
		let t = mg();
		return e.normalize("NFC").split(t).filter(Boolean);
	},
	vn = (e, t, n) => {
		if (!Number.isFinite(n) || n < 0) return e;
		let r = [],
			o = e.split(`
`);
		for (let a of o) {
			if (Wn(a, t, !0) <= n) {
				r.push(a);
				continue;
			}
			let s = xg(a, t, n);
			r.push(...s);
		}
		return r.join(`
`);
	},
	xg = (e, t, n) => {
		let r = [],
			a = Eg(e)[Symbol.iterator](),
			i = "",
			s = 0,
			c = a.next();
		for (; !c.done; ) {
			let l = c.value,
				d = i + l,
				U = Ig(l) ? s + Lr.calculate(l, t) : Wn(d, t, !0);
			if (/\s/.test(l) || U <= n) {
				(i = d), (s = U), (c = a.next());
				continue;
			}
			if (i) r.push(i.trimEnd()), (i = ""), (s = 0);
			else {
				let u = yg(l, t, n),
					p = u[u.length - 1] ?? "",
					m = u.slice(0, -1);
				r.push(...m), (i = p), (s = Wn(p, t, !0)), (c = a.next());
			}
		}
		if (i) {
			let l = wg(i, t, n);
			r.push(l);
		}
		return r;
	},
	yg = (e, t, n) => {
		if (Xc().test(e)) return [e];
		Tg(e);
		let r = [],
			o = Array.from(e),
			a = "",
			i = 0;
		for (let s of o) {
			let c = Lr.calculate(s, t),
				l = i + c;
			if (l <= n) {
				(a = a + s), (i = l);
				continue;
			}
			a && r.push(a), (a = s), (i = c);
		}
		return a && r.push(a), r;
	},
	wg = (e, t, n) => {
		if (!(Wn(e, t, !0) > n)) return e;
		let [, o, a] = e.match(/^(.+?)(\s+)$/) ?? [e, e.trimEnd(), ""],
			i = Wn(o, t, !0);
		for (let s of Array.from(a)) {
			let c = Lr.calculate(s, t),
				l = i + c;
			if (l > n) break;
			(o = o + s), (i = l);
		}
		return o;
	},
	Ig = (e) => e.codePointAt(0) !== void 0 && e.codePointAt(1) === void 0,
	Tg = (e) => {
		if ((R.MODE === We.TEST || R.DEV) && /\s/.test(e))
			throw new Error("Word should not contain any whitespaces!");
	};
E();
E();
E();
E();
E();
E();
E();
E();
E();
E();
function Zc(e, t, n) {
	if (e && e.length) {
		let [r, o] = t,
			a = (Math.PI / 180) * n,
			i = Math.cos(a),
			s = Math.sin(a);
		for (let c of e) {
			let [l, d] = c;
			(c[0] = (l - r) * i - (d - o) * s + r),
				(c[1] = (l - r) * s + (d - o) * i + o);
		}
	}
}
function Rg(e, t, n) {
	let r = [];
	e.forEach((o) => r.push(...o)), Zc(r, t, n);
}
function vg(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}
function q1(e, t, n, r = 1) {
	let o = n,
		a = Math.max(t, 0.1),
		i = e[0] && e[0][0] && typeof e[0][0] == "number" ? [e] : e,
		s = [0, 0];
	if (o) for (let l of i) Zc(l, s, o);
	let c = Mg(i, a, r);
	if (o) {
		for (let l of i) Zc(l, s, -o);
		Rg(c, s, -o);
	}
	return c;
}
function Mg(e, t, n) {
	let r = [];
	for (let l of e) {
		let d = [...l];
		vg(d[0], d[d.length - 1]) || d.push([d[0][0], d[0][1]]),
			d.length > 2 && r.push(d);
	}
	let o = [];
	t = Math.max(t, 0.1);
	let a = [];
	for (let l of r)
		for (let d = 0; d < l.length - 1; d++) {
			let U = l[d],
				u = l[d + 1];
			if (U[1] !== u[1]) {
				let p = Math.min(U[1], u[1]);
				a.push({
					ymin: p,
					ymax: Math.max(U[1], u[1]),
					x: p === U[1] ? U[0] : u[0],
					islope: (u[0] - U[0]) / (u[1] - U[1]),
				});
			}
		}
	if (
		(a.sort((l, d) =>
			l.ymin < d.ymin
				? -1
				: l.ymin > d.ymin
					? 1
					: l.x < d.x
						? -1
						: l.x > d.x
							? 1
							: l.ymax === d.ymax
								? 0
								: (l.ymax - d.ymax) / Math.abs(l.ymax - d.ymax),
		),
		!a.length)
	)
		return o;
	let i = [],
		s = a[0].ymin,
		c = 0;
	for (; i.length || a.length; ) {
		if (a.length) {
			let l = -1;
			for (let U = 0; U < a.length && !(a[U].ymin > s); U++) l = U;
			a.splice(0, l + 1).forEach((U) => {
				i.push({ s, edge: U });
			});
		}
		if (
			((i = i.filter((l) => !(l.edge.ymax <= s))),
			i.sort((l, d) =>
				l.edge.x === d.edge.x
					? 0
					: (l.edge.x - d.edge.x) / Math.abs(l.edge.x - d.edge.x),
			),
			(n !== 1 || c % t === 0) && i.length > 1)
		)
			for (let l = 0; l < i.length; l = l + 2) {
				let d = l + 1;
				if (d >= i.length) break;
				let U = i[l].edge,
					u = i[d].edge;
				o.push([
					[Math.round(U.x), s],
					[Math.round(u.x), s],
				]);
			}
		(s += n),
			i.forEach((l) => {
				l.edge.x = l.edge.x + n * l.edge.islope;
			}),
			c++;
	}
	return o;
}
function tn(e, t) {
	var n;
	let r = t.hachureAngle + 90,
		o = t.hachureGap;
	o < 0 && (o = t.strokeWidth * 4), (o = Math.max(o, 0.1));
	let a = 1;
	return (
		t.roughness >= 1 &&
			(((n = t.randomizer) === null || n === void 0 ? void 0 : n.next()) ||
				Math.random()) > 0.7 &&
			(a = o),
		q1(e, o, r, a || 1)
	);
}
var zn = class {
	constructor(t) {
		this.helper = t;
	}
	fillPolygons(t, n) {
		return this._fillPolygons(t, n);
	}
	_fillPolygons(t, n) {
		let r = tn(t, n);
		return { type: "fillSketch", ops: this.renderLines(r, n) };
	}
	renderLines(t, n) {
		let r = [];
		for (let o of t)
			r.push(
				...this.helper.doubleLineOps(o[0][0], o[0][1], o[1][0], o[1][1], n),
			);
		return r;
	}
};
E();
E();
function Qn(e) {
	let t = e[0],
		n = e[1];
	return Math.sqrt(Math.pow(t[0] - n[0], 2) + Math.pow(t[1] - n[1], 2));
}
var Di = class extends zn {
	fillPolygons(t, n) {
		let r = n.hachureGap;
		r < 0 && (r = n.strokeWidth * 4), (r = Math.max(r, 0.1));
		let o = Object.assign({}, n, { hachureGap: r }),
			a = tn(t, o),
			i = (Math.PI / 180) * n.hachureAngle,
			s = [],
			c = r * 0.5 * Math.cos(i),
			l = r * 0.5 * Math.sin(i);
		for (let [U, u] of a)
			Qn([U, u]) &&
				s.push([[U[0] - c, U[1] + l], [...u]], [[U[0] + c, U[1] - l], [...u]]);
		return { type: "fillSketch", ops: this.renderLines(s, n) };
	}
};
E();
var Si = class extends zn {
	fillPolygons(t, n) {
		let r = this._fillPolygons(t, n),
			o = Object.assign({}, n, { hachureAngle: n.hachureAngle + 90 }),
			a = this._fillPolygons(t, o);
		return (r.ops = r.ops.concat(a.ops)), r;
	}
};
E();
var $i = class {
	constructor(t) {
		this.helper = t;
	}
	fillPolygons(t, n) {
		n = Object.assign({}, n, { hachureAngle: 0 });
		let r = tn(t, n);
		return this.dotsOnLines(r, n);
	}
	dotsOnLines(t, n) {
		let r = [],
			o = n.hachureGap;
		o < 0 && (o = n.strokeWidth * 4), (o = Math.max(o, 0.1));
		let a = n.fillWeight;
		a < 0 && (a = n.strokeWidth / 2);
		let i = o / 4;
		for (let s of t) {
			let c = Qn(s),
				l = c / o,
				d = Math.ceil(l) - 1,
				U = c - d * o,
				u = (s[0][0] + s[1][0]) / 2 - o / 4,
				p = Math.min(s[0][1], s[1][1]);
			for (let m = 0; m < d; m++) {
				let h = p + U + m * o,
					g = u - i + Math.random() * 2 * i,
					x = h - i + Math.random() * 2 * i,
					y = this.helper.ellipse(g, x, a, a, n);
				r.push(...y.ops);
			}
		}
		return { type: "fillSketch", ops: r };
	}
};
E();
var Ni = class {
	constructor(t) {
		this.helper = t;
	}
	fillPolygons(t, n) {
		let r = tn(t, n);
		return { type: "fillSketch", ops: this.dashedLine(r, n) };
	}
	dashedLine(t, n) {
		let r =
				n.dashOffset < 0
					? n.hachureGap < 0
						? n.strokeWidth * 4
						: n.hachureGap
					: n.dashOffset,
			o =
				n.dashGap < 0
					? n.hachureGap < 0
						? n.strokeWidth * 4
						: n.hachureGap
					: n.dashGap,
			a = [];
		return (
			t.forEach((i) => {
				let s = Qn(i),
					c = Math.floor(s / (r + o)),
					l = (s + o - c * (r + o)) / 2,
					d = i[0],
					U = i[1];
				d[0] > U[0] && ((d = i[1]), (U = i[0]));
				let u = Math.atan((U[1] - d[1]) / (U[0] - d[0]));
				for (let p = 0; p < c; p++) {
					let m = p * (r + o),
						h = m + r,
						g = [
							d[0] + m * Math.cos(u) + l * Math.cos(u),
							d[1] + m * Math.sin(u) + l * Math.sin(u),
						],
						x = [
							d[0] + h * Math.cos(u) + l * Math.cos(u),
							d[1] + h * Math.sin(u) + l * Math.sin(u),
						];
					a.push(...this.helper.doubleLineOps(g[0], g[1], x[0], x[1], n));
				}
			}),
			a
		);
	}
};
E();
var Pi = class {
	constructor(t) {
		this.helper = t;
	}
	fillPolygons(t, n) {
		let r = n.hachureGap < 0 ? n.strokeWidth * 4 : n.hachureGap,
			o = n.zigzagOffset < 0 ? r : n.zigzagOffset;
		n = Object.assign({}, n, { hachureGap: r + o });
		let a = tn(t, n);
		return { type: "fillSketch", ops: this.zigzagLines(a, o, n) };
	}
	zigzagLines(t, n, r) {
		let o = [];
		return (
			t.forEach((a) => {
				let i = Qn(a),
					s = Math.round(i / (2 * n)),
					c = a[0],
					l = a[1];
				c[0] > l[0] && ((c = a[1]), (l = a[0]));
				let d = Math.atan((l[1] - c[1]) / (l[0] - c[0]));
				for (let U = 0; U < s; U++) {
					let u = U * 2 * n,
						p = (U + 1) * 2 * n,
						m = Math.sqrt(2 * Math.pow(n, 2)),
						h = [c[0] + u * Math.cos(d), c[1] + u * Math.sin(d)],
						g = [c[0] + p * Math.cos(d), c[1] + p * Math.sin(d)],
						x = [
							h[0] + m * Math.cos(d + Math.PI / 4),
							h[1] + m * Math.sin(d + Math.PI / 4),
						];
					o.push(
						...this.helper.doubleLineOps(h[0], h[1], x[0], x[1], r),
						...this.helper.doubleLineOps(x[0], x[1], g[0], g[1], r),
					);
				}
			}),
			o
		);
	}
};
var je = {};
function G1(e, t) {
	let n = e.fillStyle || "hachure";
	if (!je[n])
		switch (n) {
			case "zigzag":
				je[n] || (je[n] = new Di(t));
				break;
			case "cross-hatch":
				je[n] || (je[n] = new Si(t));
				break;
			case "dots":
				je[n] || (je[n] = new $i(t));
				break;
			case "dashed":
				je[n] || (je[n] = new Ni(t));
				break;
			case "zigzag-line":
				je[n] || (je[n] = new Pi(t));
				break;
			case "hachure":
			default:
				(n = "hachure"), je[n] || (je[n] = new zn(t));
				break;
		}
	return je[n];
}
E();
function X1() {
	return Math.floor(Math.random() * 2 ** 31);
}
var oo = class {
	constructor(t) {
		this.seed = t;
	}
	next() {
		return this.seed
			? ((2 ** 31 - 1) & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31
			: Math.random();
	}
};
E();
E();
var Fi = {
	A: 7,
	a: 7,
	C: 6,
	c: 6,
	H: 1,
	h: 1,
	L: 2,
	l: 2,
	M: 2,
	m: 2,
	Q: 4,
	q: 4,
	S: 4,
	s: 4,
	T: 2,
	t: 2,
	V: 1,
	v: 1,
	Z: 0,
	z: 0,
};
function _g(e) {
	let t = new Array();
	for (; e !== ""; )
		if (e.match(/^([ \t\r\n,]+)/)) e = e.substr(RegExp.$1.length);
		else if (e.match(/^([aAcChHlLmMqQsStTvVzZ])/))
			(t[t.length] = { type: 0, text: RegExp.$1 }),
				(e = e.substr(RegExp.$1.length));
		else if (
			e.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)
		)
			(t[t.length] = { type: 1, text: `${parseFloat(RegExp.$1)}` }),
				(e = e.substr(RegExp.$1.length));
		else return [];
	return (t[t.length] = { type: 2, text: "" }), t;
}
function Wc(e, t) {
	return e.type === t;
}
function ao(e) {
	let t = [],
		n = _g(e),
		r = "BOD",
		o = 0,
		a = n[o];
	for (; !Wc(a, 2); ) {
		let i = 0,
			s = [];
		if (r === "BOD")
			if (a.text === "M" || a.text === "m") o++, (i = Fi[a.text]), (r = a.text);
			else return ao("M0,0" + e);
		else Wc(a, 1) ? (i = Fi[r]) : (o++, (i = Fi[a.text]), (r = a.text));
		if (o + i < n.length) {
			for (let c = o; c < o + i; c++) {
				let l = n[c];
				if (Wc(l, 1)) s[s.length] = +l.text;
				else throw new Error("Param not a number: " + r + "," + l.text);
			}
			if (typeof Fi[r] == "number") {
				let c = { key: r, data: s };
				t.push(c),
					(o += i),
					(a = n[o]),
					r === "M" && (r = "L"),
					r === "m" && (r = "l");
			} else throw new Error("Bad segment: " + r);
		} else throw new Error("Path data ended short");
	}
	return t;
}
E();
function oa(e) {
	let t = 0,
		n = 0,
		r = 0,
		o = 0,
		a = [];
	for (let { key: i, data: s } of e)
		switch (i) {
			case "M":
				a.push({ key: "M", data: [...s] }), ([t, n] = s), ([r, o] = s);
				break;
			case "m":
				(t += s[0]),
					(n += s[1]),
					a.push({ key: "M", data: [t, n] }),
					(r = t),
					(o = n);
				break;
			case "L":
				a.push({ key: "L", data: [...s] }), ([t, n] = s);
				break;
			case "l":
				(t += s[0]), (n += s[1]), a.push({ key: "L", data: [t, n] });
				break;
			case "C":
				a.push({ key: "C", data: [...s] }), (t = s[4]), (n = s[5]);
				break;
			case "c": {
				let c = s.map((l, d) => (d % 2 ? l + n : l + t));
				a.push({ key: "C", data: c }), (t = c[4]), (n = c[5]);
				break;
			}
			case "Q":
				a.push({ key: "Q", data: [...s] }), (t = s[2]), (n = s[3]);
				break;
			case "q": {
				let c = s.map((l, d) => (d % 2 ? l + n : l + t));
				a.push({ key: "Q", data: c }), (t = c[2]), (n = c[3]);
				break;
			}
			case "A":
				a.push({ key: "A", data: [...s] }), (t = s[5]), (n = s[6]);
				break;
			case "a":
				(t += s[5]),
					(n += s[6]),
					a.push({ key: "A", data: [s[0], s[1], s[2], s[3], s[4], t, n] });
				break;
			case "H":
				a.push({ key: "H", data: [...s] }), (t = s[0]);
				break;
			case "h":
				(t += s[0]), a.push({ key: "H", data: [t] });
				break;
			case "V":
				a.push({ key: "V", data: [...s] }), (n = s[0]);
				break;
			case "v":
				(n += s[0]), a.push({ key: "V", data: [n] });
				break;
			case "S":
				a.push({ key: "S", data: [...s] }), (t = s[2]), (n = s[3]);
				break;
			case "s": {
				let c = s.map((l, d) => (d % 2 ? l + n : l + t));
				a.push({ key: "S", data: c }), (t = c[2]), (n = c[3]);
				break;
			}
			case "T":
				a.push({ key: "T", data: [...s] }), (t = s[0]), (n = s[1]);
				break;
			case "t":
				(t += s[0]), (n += s[1]), a.push({ key: "T", data: [t, n] });
				break;
			case "Z":
			case "z":
				a.push({ key: "Z", data: [] }), (t = r), (n = o);
				break;
		}
	return a;
}
E();
function ia(e) {
	let t = [],
		n = "",
		r = 0,
		o = 0,
		a = 0,
		i = 0,
		s = 0,
		c = 0;
	for (let { key: l, data: d } of e) {
		switch (l) {
			case "M":
				t.push({ key: "M", data: [...d] }), ([r, o] = d), ([a, i] = d);
				break;
			case "C":
				t.push({ key: "C", data: [...d] }),
					(r = d[4]),
					(o = d[5]),
					(s = d[2]),
					(c = d[3]);
				break;
			case "L":
				t.push({ key: "L", data: [...d] }), ([r, o] = d);
				break;
			case "H":
				(r = d[0]), t.push({ key: "L", data: [r, o] });
				break;
			case "V":
				(o = d[0]), t.push({ key: "L", data: [r, o] });
				break;
			case "S": {
				let U = 0,
					u = 0;
				n === "C" || n === "S"
					? ((U = r + (r - s)), (u = o + (o - c)))
					: ((U = r), (u = o)),
					t.push({ key: "C", data: [U, u, ...d] }),
					(s = d[0]),
					(c = d[1]),
					(r = d[2]),
					(o = d[3]);
				break;
			}
			case "T": {
				let [U, u] = d,
					p = 0,
					m = 0;
				n === "Q" || n === "T"
					? ((p = r + (r - s)), (m = o + (o - c)))
					: ((p = r), (m = o));
				let h = r + (2 * (p - r)) / 3,
					g = o + (2 * (m - o)) / 3,
					x = U + (2 * (p - U)) / 3,
					y = u + (2 * (m - u)) / 3;
				t.push({ key: "C", data: [h, g, x, y, U, u] }),
					(s = p),
					(c = m),
					(r = U),
					(o = u);
				break;
			}
			case "Q": {
				let [U, u, p, m] = d,
					h = r + (2 * (U - r)) / 3,
					g = o + (2 * (u - o)) / 3,
					x = p + (2 * (U - p)) / 3,
					y = m + (2 * (u - m)) / 3;
				t.push({ key: "C", data: [h, g, x, y, p, m] }),
					(s = U),
					(c = u),
					(r = p),
					(o = m);
				break;
			}
			case "A": {
				let U = Math.abs(d[0]),
					u = Math.abs(d[1]),
					p = d[2],
					m = d[3],
					h = d[4],
					g = d[5],
					x = d[6];
				U === 0 || u === 0
					? (t.push({ key: "C", data: [r, o, g, x, g, x] }), (r = g), (o = x))
					: (r !== g || o !== x) &&
						(Z1(r, o, g, x, U, u, p, m, h).forEach(function (w) {
							t.push({ key: "C", data: w });
						}),
						(r = g),
						(o = x));
				break;
			}
			case "Z":
				t.push({ key: "Z", data: [] }), (r = a), (o = i);
				break;
		}
		n = l;
	}
	return t;
}
function Lg(e) {
	return (Math.PI * e) / 180;
}
function aa(e, t, n) {
	let r = e * Math.cos(n) - t * Math.sin(n),
		o = e * Math.sin(n) + t * Math.cos(n);
	return [r, o];
}
function Z1(e, t, n, r, o, a, i, s, c, l) {
	let d = Lg(i),
		U = [],
		u = 0,
		p = 0,
		m = 0,
		h = 0;
	if (l) [u, p, m, h] = l;
	else {
		([e, t] = aa(e, t, -d)), ([n, r] = aa(n, r, -d));
		let P = (e - n) / 2,
			A = (t - r) / 2,
			k = (P * P) / (o * o) + (A * A) / (a * a);
		k > 1 && ((k = Math.sqrt(k)), (o = k * o), (a = k * a));
		let K = s === c ? -1 : 1,
			q = o * o,
			F = a * a,
			C = q * F - q * A * A - F * P * P,
			Y = q * A * A + F * P * P,
			te = K * Math.sqrt(Math.abs(C / Y));
		(m = (te * o * A) / a + (e + n) / 2),
			(h = (te * -a * P) / o + (t + r) / 2),
			(u = Math.asin(parseFloat(((t - h) / a).toFixed(9)))),
			(p = Math.asin(parseFloat(((r - h) / a).toFixed(9)))),
			e < m && (u = Math.PI - u),
			n < m && (p = Math.PI - p),
			u < 0 && (u = Math.PI * 2 + u),
			p < 0 && (p = Math.PI * 2 + p),
			c && u > p && (u = u - Math.PI * 2),
			!c && p > u && (p = p - Math.PI * 2);
	}
	let g = p - u;
	if (Math.abs(g) > (Math.PI * 120) / 180) {
		let P = p,
			A = n,
			k = r;
		c && p > u
			? (p = u + ((Math.PI * 120) / 180) * 1)
			: (p = u + ((Math.PI * 120) / 180) * -1),
			(n = m + o * Math.cos(p)),
			(r = h + a * Math.sin(p)),
			(U = Z1(n, r, A, k, o, a, i, 0, c, [p, P, m, h]));
	}
	g = p - u;
	let x = Math.cos(u),
		y = Math.sin(u),
		w = Math.cos(p),
		T = Math.sin(p),
		I = Math.tan(g / 4),
		_ = (4 / 3) * o * I,
		L = (4 / 3) * a * I,
		M = [e, t],
		N = [e + _ * y, t - L * x],
		$ = [n + _ * T, r - L * w],
		S = [n, r];
	if (((N[0] = 2 * M[0] - N[0]), (N[1] = 2 * M[1] - N[1]), l))
		return [N, $, S].concat(U);
	{
		U = [N, $, S].concat(U);
		let P = [];
		for (let A = 0; A < U.length; A += 3) {
			let k = aa(U[A][0], U[A][1], d),
				K = aa(U[A + 1][0], U[A + 1][1], d),
				q = aa(U[A + 2][0], U[A + 2][1], d);
			P.push([k[0], k[1], K[0], K[1], q[0], q[1]]);
		}
		return P;
	}
}
var Dg = {
	randOffset: Ng,
	randOffsetWithRange: Pg,
	ellipse: $g,
	doubleLineOps: Fg,
};
function zc(e, t, n, r, o) {
	return { type: "path", ops: Mn(e, t, n, r, o) };
}
function sa(e, t, n) {
	let r = (e || []).length;
	if (r > 2) {
		let o = [];
		for (let a = 0; a < r - 1; a++)
			o.push(...Mn(e[a][0], e[a][1], e[a + 1][0], e[a + 1][1], n));
		return (
			t && o.push(...Mn(e[r - 1][0], e[r - 1][1], e[0][0], e[0][1], n)),
			{ type: "path", ops: o }
		);
	} else if (r === 2) return zc(e[0][0], e[0][1], e[1][0], e[1][1], n);
	return { type: "path", ops: [] };
}
function Sg(e, t) {
	return sa(e, !0, t);
}
function e2(e, t, n, r, o) {
	let a = [
		[e, t],
		[e + n, t],
		[e + n, t + r],
		[e, t + r],
	];
	return Sg(a, o);
}
function Qc(e, t) {
	let n = z1(e, 1 * (1 + t.roughness * 0.2), t);
	if (!t.disableMultiStroke) {
		let r = z1(e, 1.5 * (1 + t.roughness * 0.22), Og(t));
		n = n.concat(r);
	}
	return { type: "path", ops: n };
}
function $g(e, t, n, r, o) {
	let a = jc(n, r, o);
	return Bi(e, t, o, a).opset;
}
function jc(e, t, n) {
	let r = Math.sqrt(
			Math.PI * 2 * Math.sqrt((Math.pow(e / 2, 2) + Math.pow(t / 2, 2)) / 2),
		),
		o = Math.ceil(
			Math.max(n.curveStepCount, (n.curveStepCount / Math.sqrt(200)) * r),
		),
		a = (Math.PI * 2) / o,
		i = Math.abs(e / 2),
		s = Math.abs(t / 2),
		c = 1 - n.curveFitting;
	return (i += V(i * c, n)), (s += V(s * c, n)), { increment: a, rx: i, ry: s };
}
function Bi(e, t, n, r) {
	let [o, a] = Q1(
			r.increment,
			e,
			t,
			r.rx,
			r.ry,
			1,
			r.increment * Oi(0.1, Oi(0.4, 1, n), n),
			n,
		),
		i = Ai(o, null, n);
	if (!n.disableMultiStroke && n.roughness !== 0) {
		let [s] = Q1(r.increment, e, t, r.rx, r.ry, 1.5, 0, n),
			c = Ai(s, null, n);
		i = i.concat(c);
	}
	return { estimatedPoints: a, opset: { type: "path", ops: i } };
}
function el(e, t, n, r, o, a, i, s, c) {
	let l = e,
		d = t,
		U = Math.abs(n / 2),
		u = Math.abs(r / 2);
	(U += V(U * 0.01, c)), (u += V(u * 0.01, c));
	let p = o,
		m = a;
	for (; p < 0; ) (p += Math.PI * 2), (m += Math.PI * 2);
	m - p > Math.PI * 2 && ((p = 0), (m = Math.PI * 2));
	let h = (Math.PI * 2) / c.curveStepCount,
		g = Math.min(h / 2, (m - p) / 2),
		x = j1(g, l, d, U, u, p, m, 1, c);
	if (!c.disableMultiStroke) {
		let y = j1(g, l, d, U, u, p, m, 1.5, c);
		x.push(...y);
	}
	return (
		i &&
			(s
				? x.push(
						...Mn(l, d, l + U * Math.cos(p), d + u * Math.sin(p), c),
						...Mn(l, d, l + U * Math.cos(m), d + u * Math.sin(m), c),
					)
				: x.push(
						{ op: "lineTo", data: [l, d] },
						{ op: "lineTo", data: [l + U * Math.cos(p), d + u * Math.sin(p)] },
					)),
		{ type: "path", ops: x }
	);
}
function tl(e, t) {
	let n = ia(oa(ao(e))),
		r = [],
		o = [0, 0],
		a = [0, 0];
	for (let { key: i, data: s } of n)
		switch (i) {
			case "M": {
				(a = [s[0], s[1]]), (o = [s[0], s[1]]);
				break;
			}
			case "L":
				r.push(...Mn(a[0], a[1], s[0], s[1], t)), (a = [s[0], s[1]]);
				break;
			case "C": {
				let [c, l, d, U, u, p] = s;
				r.push(...Ag(c, l, d, U, u, p, a, t)), (a = [u, p]);
				break;
			}
			case "Z":
				r.push(...Mn(a[0], a[1], o[0], o[1], t)), (a = [o[0], o[1]]);
				break;
		}
	return { type: "path", ops: r };
}
function Ci(e, t) {
	let n = [];
	for (let r of e)
		if (r.length) {
			let o = t.maxRandomnessOffset || 0,
				a = r.length;
			if (a > 2) {
				n.push({ op: "move", data: [r[0][0] + V(o, t), r[0][1] + V(o, t)] });
				for (let i = 1; i < a; i++)
					n.push({
						op: "lineTo",
						data: [r[i][0] + V(o, t), r[i][1] + V(o, t)],
					});
			}
		}
	return { type: "fillPath", ops: n };
}
function Dr(e, t) {
	return G1(t, Dg).fillPolygons(e, t);
}
function t2(e, t, n, r, o, a, i) {
	let s = e,
		c = t,
		l = Math.abs(n / 2),
		d = Math.abs(r / 2);
	(l += V(l * 0.01, i)), (d += V(d * 0.01, i));
	let U = o,
		u = a;
	for (; U < 0; ) (U += Math.PI * 2), (u += Math.PI * 2);
	u - U > Math.PI * 2 && ((U = 0), (u = Math.PI * 2));
	let p = (u - U) / i.curveStepCount,
		m = [];
	for (let h = U; h <= u; h = h + p)
		m.push([s + l * Math.cos(h), c + d * Math.sin(h)]);
	return (
		m.push([s + l * Math.cos(u), c + d * Math.sin(u)]),
		m.push([s, c]),
		Dr([m], i)
	);
}
function Ng(e, t) {
	return V(e, t);
}
function Pg(e, t, n) {
	return Oi(e, t, n);
}
function Fg(e, t, n, r, o) {
	return Mn(e, t, n, r, o, !0);
}
function Og(e) {
	let t = Object.assign({}, e);
	return (t.randomizer = void 0), e.seed && (t.seed = e.seed + 1), t;
}
function n2(e) {
	return (
		e.randomizer || (e.randomizer = new oo(e.seed || 0)), e.randomizer.next()
	);
}
function Oi(e, t, n, r = 1) {
	return n.roughness * r * (n2(n) * (t - e) + e);
}
function V(e, t, n = 1) {
	return Oi(-e, e, t, n);
}
function Mn(e, t, n, r, o, a = !1) {
	let i = a ? o.disableMultiStrokeFill : o.disableMultiStroke,
		s = W1(e, t, n, r, o, !0, !1);
	if (i) return s;
	let c = W1(e, t, n, r, o, !0, !0);
	return s.concat(c);
}
function W1(e, t, n, r, o, a, i) {
	let s = Math.pow(e - n, 2) + Math.pow(t - r, 2),
		c = Math.sqrt(s),
		l = 1;
	c < 200 ? (l = 1) : c > 500 ? (l = 0.4) : (l = -0.0016668 * c + 1.233334);
	let d = o.maxRandomnessOffset || 0;
	d * d * 100 > s && (d = c / 10);
	let U = d / 2,
		u = 0.2 + n2(o) * 0.2,
		p = (o.bowing * o.maxRandomnessOffset * (r - t)) / 200,
		m = (o.bowing * o.maxRandomnessOffset * (e - n)) / 200;
	(p = V(p, o, l)), (m = V(m, o, l));
	let h = [],
		g = () => V(U, o, l),
		x = () => V(d, o, l),
		y = o.preserveVertices;
	return (
		a &&
			(i
				? h.push({ op: "move", data: [e + (y ? 0 : g()), t + (y ? 0 : g())] })
				: h.push({
						op: "move",
						data: [e + (y ? 0 : V(d, o, l)), t + (y ? 0 : V(d, o, l))],
					})),
		i
			? h.push({
					op: "bcurveTo",
					data: [
						p + e + (n - e) * u + g(),
						m + t + (r - t) * u + g(),
						p + e + 2 * (n - e) * u + g(),
						m + t + 2 * (r - t) * u + g(),
						n + (y ? 0 : g()),
						r + (y ? 0 : g()),
					],
				})
			: h.push({
					op: "bcurveTo",
					data: [
						p + e + (n - e) * u + x(),
						m + t + (r - t) * u + x(),
						p + e + 2 * (n - e) * u + x(),
						m + t + 2 * (r - t) * u + x(),
						n + (y ? 0 : x()),
						r + (y ? 0 : x()),
					],
				}),
		h
	);
}
function z1(e, t, n) {
	let r = [];
	r.push([e[0][0] + V(t, n), e[0][1] + V(t, n)]),
		r.push([e[0][0] + V(t, n), e[0][1] + V(t, n)]);
	for (let o = 1; o < e.length; o++)
		r.push([e[o][0] + V(t, n), e[o][1] + V(t, n)]),
			o === e.length - 1 && r.push([e[o][0] + V(t, n), e[o][1] + V(t, n)]);
	return Ai(r, null, n);
}
function Ai(e, t, n) {
	let r = e.length,
		o = [];
	if (r > 3) {
		let a = [],
			i = 1 - n.curveTightness;
		o.push({ op: "move", data: [e[1][0], e[1][1]] });
		for (let s = 1; s + 2 < r; s++) {
			let c = e[s];
			(a[0] = [c[0], c[1]]),
				(a[1] = [
					c[0] + (i * e[s + 1][0] - i * e[s - 1][0]) / 6,
					c[1] + (i * e[s + 1][1] - i * e[s - 1][1]) / 6,
				]),
				(a[2] = [
					e[s + 1][0] + (i * e[s][0] - i * e[s + 2][0]) / 6,
					e[s + 1][1] + (i * e[s][1] - i * e[s + 2][1]) / 6,
				]),
				(a[3] = [e[s + 1][0], e[s + 1][1]]),
				o.push({
					op: "bcurveTo",
					data: [a[1][0], a[1][1], a[2][0], a[2][1], a[3][0], a[3][1]],
				});
		}
		if (t && t.length === 2) {
			let s = n.maxRandomnessOffset;
			o.push({ op: "lineTo", data: [t[0] + V(s, n), t[1] + V(s, n)] });
		}
	} else
		r === 3
			? (o.push({ op: "move", data: [e[1][0], e[1][1]] }),
				o.push({
					op: "bcurveTo",
					data: [e[1][0], e[1][1], e[2][0], e[2][1], e[2][0], e[2][1]],
				}))
			: r === 2 && o.push(...Mn(e[0][0], e[0][1], e[1][0], e[1][1], n));
	return o;
}
function Q1(e, t, n, r, o, a, i, s) {
	let c = s.roughness === 0,
		l = [],
		d = [];
	if (c) {
		(e = e / 4), d.push([t + r * Math.cos(-e), n + o * Math.sin(-e)]);
		for (let U = 0; U <= Math.PI * 2; U = U + e) {
			let u = [t + r * Math.cos(U), n + o * Math.sin(U)];
			l.push(u), d.push(u);
		}
		d.push([t + r * Math.cos(0), n + o * Math.sin(0)]),
			d.push([t + r * Math.cos(e), n + o * Math.sin(e)]);
	} else {
		let U = V(0.5, s) - Math.PI / 2;
		d.push([
			V(a, s) + t + 0.9 * r * Math.cos(U - e),
			V(a, s) + n + 0.9 * o * Math.sin(U - e),
		]);
		let u = Math.PI * 2 + U - 0.01;
		for (let p = U; p < u; p = p + e) {
			let m = [V(a, s) + t + r * Math.cos(p), V(a, s) + n + o * Math.sin(p)];
			l.push(m), d.push(m);
		}
		d.push([
			V(a, s) + t + r * Math.cos(U + Math.PI * 2 + i * 0.5),
			V(a, s) + n + o * Math.sin(U + Math.PI * 2 + i * 0.5),
		]),
			d.push([
				V(a, s) + t + 0.98 * r * Math.cos(U + i),
				V(a, s) + n + 0.98 * o * Math.sin(U + i),
			]),
			d.push([
				V(a, s) + t + 0.9 * r * Math.cos(U + i * 0.5),
				V(a, s) + n + 0.9 * o * Math.sin(U + i * 0.5),
			]);
	}
	return [d, l];
}
function j1(e, t, n, r, o, a, i, s, c) {
	let l = a + V(0.1, c),
		d = [];
	d.push([
		V(s, c) + t + 0.9 * r * Math.cos(l - e),
		V(s, c) + n + 0.9 * o * Math.sin(l - e),
	]);
	for (let U = l; U <= i; U = U + e)
		d.push([V(s, c) + t + r * Math.cos(U), V(s, c) + n + o * Math.sin(U)]);
	return (
		d.push([t + r * Math.cos(i), n + o * Math.sin(i)]),
		d.push([t + r * Math.cos(i), n + o * Math.sin(i)]),
		Ai(d, null, c)
	);
}
function Ag(e, t, n, r, o, a, i, s) {
	let c = [],
		l = [s.maxRandomnessOffset || 1, (s.maxRandomnessOffset || 1) + 0.3],
		d = [0, 0],
		U = s.disableMultiStroke ? 1 : 2,
		u = s.preserveVertices;
	for (let p = 0; p < U; p++)
		p === 0
			? c.push({ op: "move", data: [i[0], i[1]] })
			: c.push({
					op: "move",
					data: [i[0] + (u ? 0 : V(l[0], s)), i[1] + (u ? 0 : V(l[0], s))],
				}),
			(d = u ? [o, a] : [o + V(l[p], s), a + V(l[p], s)]),
			c.push({
				op: "bcurveTo",
				data: [
					e + V(l[p], s),
					t + V(l[p], s),
					n + V(l[p], s),
					r + V(l[p], s),
					d[0],
					d[1],
				],
			});
	return c;
}
E();
function ca(e) {
	return [...e];
}
function r2(e, t = 0) {
	let n = e.length;
	if (n < 3) throw new Error("A curve must have at least three points.");
	let r = [];
	if (n === 3) r.push(ca(e[0]), ca(e[1]), ca(e[2]), ca(e[2]));
	else {
		let o = [];
		o.push(e[0], e[0]);
		for (let s = 1; s < e.length; s++)
			o.push(e[s]), s === e.length - 1 && o.push(e[s]);
		let a = [],
			i = 1 - t;
		r.push(ca(o[0]));
		for (let s = 1; s + 2 < o.length; s++) {
			let c = o[s];
			(a[0] = [c[0], c[1]]),
				(a[1] = [
					c[0] + (i * o[s + 1][0] - i * o[s - 1][0]) / 6,
					c[1] + (i * o[s + 1][1] - i * o[s - 1][1]) / 6,
				]),
				(a[2] = [
					o[s + 1][0] + (i * o[s][0] - i * o[s + 2][0]) / 6,
					o[s + 1][1] + (i * o[s][1] - i * o[s + 2][1]) / 6,
				]),
				(a[3] = [o[s + 1][0], o[s + 1][1]]),
				r.push(a[1], a[2], a[3]);
		}
	}
	return r;
}
E();
function Bg(e, t) {
	return Math.sqrt(Ki(e, t));
}
function Ki(e, t) {
	return Math.pow(e[0] - t[0], 2) + Math.pow(e[1] - t[1], 2);
}
function Cg(e, t, n) {
	let r = Ki(t, n);
	if (r === 0) return Ki(e, t);
	let o = ((e[0] - t[0]) * (n[0] - t[0]) + (e[1] - t[1]) * (n[1] - t[1])) / r;
	return (o = Math.max(0, Math.min(1, o))), Ki(e, Sr(t, n, o));
}
function Sr(e, t, n) {
	return [e[0] + (t[0] - e[0]) * n, e[1] + (t[1] - e[1]) * n];
}
function Kg(e, t) {
	let n = e[t + 0],
		r = e[t + 1],
		o = e[t + 2],
		a = e[t + 3],
		i = 3 * r[0] - 2 * n[0] - a[0];
	i *= i;
	let s = 3 * r[1] - 2 * n[1] - a[1];
	s *= s;
	let c = 3 * o[0] - 2 * a[0] - n[0];
	c *= c;
	let l = 3 * o[1] - 2 * a[1] - n[1];
	return (l *= l), i < c && (i = c), s < l && (s = l), i + s;
}
function nl(e, t, n, r) {
	let o = r || [];
	if (Kg(e, t) < n) {
		let a = e[t + 0];
		o.length ? Bg(o[o.length - 1], a) > 1 && o.push(a) : o.push(a),
			o.push(e[t + 3]);
	} else {
		let i = e[t + 0],
			s = e[t + 1],
			c = e[t + 2],
			l = e[t + 3],
			d = Sr(i, s, 0.5),
			U = Sr(s, c, 0.5),
			u = Sr(c, l, 0.5),
			p = Sr(d, U, 0.5),
			m = Sr(U, u, 0.5),
			h = Sr(p, m, 0.5);
		nl([i, d, p, h], 0, n, o), nl([h, m, u, l], 0, n, o);
	}
	return o;
}
function o2(e, t) {
	return Hi(e, 0, e.length, t);
}
function Hi(e, t, n, r, o) {
	let a = o || [],
		i = e[t],
		s = e[n - 1],
		c = 0,
		l = 1;
	for (let d = t + 1; d < n - 1; ++d) {
		let U = Cg(e[d], i, s);
		U > c && ((c = U), (l = d));
	}
	return (
		Math.sqrt(c) > r
			? (Hi(e, t, l + 1, r, a), Hi(e, l, n, r, a))
			: (a.length || a.push(i), a.push(s)),
		a
	);
}
function io(e, t = 0.15, n) {
	let r = [],
		o = (e.length - 1) / 3;
	for (let a = 0; a < o; a++) {
		let i = a * 3;
		nl(e, i, t, r);
	}
	return n && n > 0 ? Hi(r, 0, r.length, n) : r;
}
E();
function a2(e, t, n) {
	let r = ao(e),
		o = ia(oa(r)),
		a = [],
		i = [],
		s = [0, 0],
		c = [],
		l = () => {
			c.length >= 4 && i.push(...io(c, t)), (c = []);
		},
		d = () => {
			l(), i.length && (a.push(i), (i = []));
		};
	for (let { key: u, data: p } of o)
		switch (u) {
			case "M":
				d(), (s = [p[0], p[1]]), i.push(s);
				break;
			case "L":
				l(), i.push([p[0], p[1]]);
				break;
			case "C":
				if (!c.length) {
					let m = i.length ? i[i.length - 1] : s;
					c.push([m[0], m[1]]);
				}
				c.push([p[0], p[1]]), c.push([p[2], p[3]]), c.push([p[4], p[5]]);
				break;
			case "Z":
				l(), i.push([s[0], s[1]]);
				break;
		}
	if ((d(), !n)) return a;
	let U = [];
	for (let u of a) {
		let p = o2(u, n);
		p.length && U.push(p);
	}
	return U;
}
var ot = "none",
	Mt = class {
		constructor(t) {
			(this.defaultOptions = {
				maxRandomnessOffset: 2,
				roughness: 1,
				bowing: 1,
				stroke: "#000",
				strokeWidth: 1,
				curveTightness: 0,
				curveFitting: 0.95,
				curveStepCount: 9,
				fillStyle: "hachure",
				fillWeight: -1,
				hachureAngle: -41,
				hachureGap: -1,
				dashOffset: -1,
				dashGap: -1,
				zigzagOffset: -1,
				seed: 0,
				disableMultiStroke: !1,
				disableMultiStrokeFill: !1,
				preserveVertices: !1,
				fillShapeRoughnessGain: 0.8,
			}),
				(this.config = t || {}),
				this.config.options &&
					(this.defaultOptions = this._o(this.config.options));
		}
		static newSeed() {
			return X1();
		}
		_o(t) {
			return t
				? Object.assign({}, this.defaultOptions, t)
				: this.defaultOptions;
		}
		_d(t, n, r) {
			return { shape: t, sets: n || [], options: r || this.defaultOptions };
		}
		line(t, n, r, o, a) {
			let i = this._o(a);
			return this._d("line", [zc(t, n, r, o, i)], i);
		}
		rectangle(t, n, r, o, a) {
			let i = this._o(a),
				s = [],
				c = e2(t, n, r, o, i);
			if (i.fill) {
				let l = [
					[t, n],
					[t + r, n],
					[t + r, n + o],
					[t, n + o],
				];
				i.fillStyle === "solid" ? s.push(Ci([l], i)) : s.push(Dr([l], i));
			}
			return i.stroke !== ot && s.push(c), this._d("rectangle", s, i);
		}
		ellipse(t, n, r, o, a) {
			let i = this._o(a),
				s = [],
				c = jc(r, o, i),
				l = Bi(t, n, i, c);
			if (i.fill)
				if (i.fillStyle === "solid") {
					let d = Bi(t, n, i, c).opset;
					(d.type = "fillPath"), s.push(d);
				} else s.push(Dr([l.estimatedPoints], i));
			return i.stroke !== ot && s.push(l.opset), this._d("ellipse", s, i);
		}
		circle(t, n, r, o) {
			let a = this.ellipse(t, n, r, r, o);
			return (a.shape = "circle"), a;
		}
		linearPath(t, n) {
			let r = this._o(n);
			return this._d("linearPath", [sa(t, !1, r)], r);
		}
		arc(t, n, r, o, a, i, s = !1, c) {
			let l = this._o(c),
				d = [],
				U = el(t, n, r, o, a, i, s, !0, l);
			if (s && l.fill)
				if (l.fillStyle === "solid") {
					let u = Object.assign({}, l);
					u.disableMultiStroke = !0;
					let p = el(t, n, r, o, a, i, !0, !1, u);
					(p.type = "fillPath"), d.push(p);
				} else d.push(t2(t, n, r, o, a, i, l));
			return l.stroke !== ot && d.push(U), this._d("arc", d, l);
		}
		curve(t, n) {
			let r = this._o(n),
				o = [],
				a = Qc(t, r);
			if (r.fill && r.fill !== ot && t.length >= 3)
				if (r.fillStyle === "solid") {
					let i = Qc(
						t,
						Object.assign(Object.assign({}, r), {
							disableMultiStroke: !0,
							roughness: r.roughness
								? r.roughness + r.fillShapeRoughnessGain
								: 0,
						}),
					);
					o.push({ type: "fillPath", ops: this._mergedShape(i.ops) });
				} else {
					let i = r2(t),
						s = io(i, 10, (1 + r.roughness) / 2);
					o.push(Dr([s], r));
				}
			return r.stroke !== ot && o.push(a), this._d("curve", o, r);
		}
		polygon(t, n) {
			let r = this._o(n),
				o = [],
				a = sa(t, !0, r);
			return (
				r.fill &&
					(r.fillStyle === "solid" ? o.push(Ci([t], r)) : o.push(Dr([t], r))),
				r.stroke !== ot && o.push(a),
				this._d("polygon", o, r)
			);
		}
		path(t, n) {
			let r = this._o(n),
				o = [];
			if (!t) return this._d("path", o, r);
			t = (t || "")
				.replace(/\n/g, " ")
				.replace(/(-\s)/g, "-")
				.replace("/(ss)/g", " ");
			let a = r.fill && r.fill !== "transparent" && r.fill !== ot,
				i = r.stroke !== ot,
				s = !!(r.simplification && r.simplification < 1),
				c = s ? 4 - 4 * (r.simplification || 1) : (1 + r.roughness) / 2,
				l = a2(t, 1, c),
				d = tl(t, r);
			if (a)
				if (r.fillStyle === "solid")
					if (l.length === 1) {
						let U = tl(
							t,
							Object.assign(Object.assign({}, r), {
								disableMultiStroke: !0,
								roughness: r.roughness
									? r.roughness + r.fillShapeRoughnessGain
									: 0,
							}),
						);
						o.push({ type: "fillPath", ops: this._mergedShape(U.ops) });
					} else o.push(Ci(l, r));
				else o.push(Dr(l, r));
			return (
				i &&
					(s
						? l.forEach((U) => {
								o.push(sa(U, !1, r));
							})
						: o.push(d)),
				this._d("path", o, r)
			);
		}
		opsToPath(t, n) {
			let r = "";
			for (let o of t.ops) {
				let a =
					typeof n == "number" && n >= 0
						? o.data.map((i) => +i.toFixed(n))
						: o.data;
				switch (o.op) {
					case "move":
						r += `M${a[0]} ${a[1]} `;
						break;
					case "bcurveTo":
						r += `C${a[0]} ${a[1]}, ${a[2]} ${a[3]}, ${a[4]} ${a[5]} `;
						break;
					case "lineTo":
						r += `L${a[0]} ${a[1]} `;
						break;
				}
			}
			return r.trim();
		}
		toPaths(t) {
			let n = t.sets || [],
				r = t.options || this.defaultOptions,
				o = [];
			for (let a of n) {
				let i = null;
				switch (a.type) {
					case "path":
						i = {
							d: this.opsToPath(a),
							stroke: r.stroke,
							strokeWidth: r.strokeWidth,
							fill: ot,
						};
						break;
					case "fillPath":
						i = {
							d: this.opsToPath(a),
							stroke: ot,
							strokeWidth: 0,
							fill: r.fill || ot,
						};
						break;
					case "fillSketch":
						i = this.fillSketch(a, r);
						break;
				}
				i && o.push(i);
			}
			return o;
		}
		fillSketch(t, n) {
			let r = n.fillWeight;
			return (
				r < 0 && (r = n.strokeWidth / 2),
				{ d: this.opsToPath(t), stroke: n.fill || ot, strokeWidth: r, fill: ot }
			);
		}
		_mergedShape(t) {
			return t.filter((n, r) => (r === 0 ? !0 : n.op !== "move"));
		}
	};
var Ji = class {
	constructor(t, n) {
		(this.canvas = t),
			(this.ctx = this.canvas.getContext("2d")),
			(this.gen = new Mt(n));
	}
	draw(t) {
		let n = t.sets || [],
			r = t.options || this.getDefaultOptions(),
			o = this.ctx,
			a = t.options.fixedDecimalPlaceDigits;
		for (let i of n)
			switch (i.type) {
				case "path":
					o.save(),
						(o.strokeStyle = r.stroke === "none" ? "transparent" : r.stroke),
						(o.lineWidth = r.strokeWidth),
						r.strokeLineDash && o.setLineDash(r.strokeLineDash),
						r.strokeLineDashOffset &&
							(o.lineDashOffset = r.strokeLineDashOffset),
						this._drawToContext(o, i, a),
						o.restore();
					break;
				case "fillPath": {
					o.save(), (o.fillStyle = r.fill || "");
					let s =
						t.shape === "curve" || t.shape === "polygon" || t.shape === "path"
							? "evenodd"
							: "nonzero";
					this._drawToContext(o, i, a, s), o.restore();
					break;
				}
				case "fillSketch":
					this.fillSketch(o, i, r);
					break;
			}
	}
	fillSketch(t, n, r) {
		let o = r.fillWeight;
		o < 0 && (o = r.strokeWidth / 2),
			t.save(),
			r.fillLineDash && t.setLineDash(r.fillLineDash),
			r.fillLineDashOffset && (t.lineDashOffset = r.fillLineDashOffset),
			(t.strokeStyle = r.fill || ""),
			(t.lineWidth = o),
			this._drawToContext(t, n, r.fixedDecimalPlaceDigits),
			t.restore();
	}
	_drawToContext(t, n, r, o = "nonzero") {
		t.beginPath();
		for (let a of n.ops) {
			let i =
				typeof r == "number" && r >= 0
					? a.data.map((s) => +s.toFixed(r))
					: a.data;
			switch (a.op) {
				case "move":
					t.moveTo(i[0], i[1]);
					break;
				case "bcurveTo":
					t.bezierCurveTo(i[0], i[1], i[2], i[3], i[4], i[5]);
					break;
				case "lineTo":
					t.lineTo(i[0], i[1]);
					break;
			}
		}
		n.type === "fillPath" ? t.fill(o) : t.stroke();
	}
	get generator() {
		return this.gen;
	}
	getDefaultOptions() {
		return this.gen.defaultOptions;
	}
	line(t, n, r, o, a) {
		let i = this.gen.line(t, n, r, o, a);
		return this.draw(i), i;
	}
	rectangle(t, n, r, o, a) {
		let i = this.gen.rectangle(t, n, r, o, a);
		return this.draw(i), i;
	}
	ellipse(t, n, r, o, a) {
		let i = this.gen.ellipse(t, n, r, o, a);
		return this.draw(i), i;
	}
	circle(t, n, r, o) {
		let a = this.gen.circle(t, n, r, o);
		return this.draw(a), a;
	}
	linearPath(t, n) {
		let r = this.gen.linearPath(t, n);
		return this.draw(r), r;
	}
	polygon(t, n) {
		let r = this.gen.polygon(t, n);
		return this.draw(r), r;
	}
	arc(t, n, r, o, a, i, s = !1, c) {
		let l = this.gen.arc(t, n, r, o, a, i, s, c);
		return this.draw(l), l;
	}
	curve(t, n) {
		let r = this.gen.curve(t, n);
		return this.draw(r), r;
	}
	path(t, n) {
		let r = this.gen.path(t, n);
		return this.draw(r), r;
	}
};
E();
E();
var la = "http://www.w3.org/2000/svg";
var ki = class {
	constructor(t, n) {
		(this.svg = t), (this.gen = new Mt(n));
	}
	draw(t) {
		let n = t.sets || [],
			r = t.options || this.getDefaultOptions(),
			o = this.svg.ownerDocument || window.document,
			a = o.createElementNS(la, "g"),
			i = t.options.fixedDecimalPlaceDigits;
		for (let s of n) {
			let c = null;
			switch (s.type) {
				case "path": {
					(c = o.createElementNS(la, "path")),
						c.setAttribute("d", this.opsToPath(s, i)),
						c.setAttribute("stroke", r.stroke),
						c.setAttribute("stroke-width", r.strokeWidth + ""),
						c.setAttribute("fill", "none"),
						r.strokeLineDash &&
							c.setAttribute(
								"stroke-dasharray",
								r.strokeLineDash.join(" ").trim(),
							),
						r.strokeLineDashOffset &&
							c.setAttribute("stroke-dashoffset", `${r.strokeLineDashOffset}`);
					break;
				}
				case "fillPath": {
					(c = o.createElementNS(la, "path")),
						c.setAttribute("d", this.opsToPath(s, i)),
						c.setAttribute("stroke", "none"),
						c.setAttribute("stroke-width", "0"),
						c.setAttribute("fill", r.fill || ""),
						(t.shape === "curve" || t.shape === "polygon") &&
							c.setAttribute("fill-rule", "evenodd");
					break;
				}
				case "fillSketch": {
					c = this.fillSketch(o, s, r);
					break;
				}
			}
			c && a.appendChild(c);
		}
		return a;
	}
	fillSketch(t, n, r) {
		let o = r.fillWeight;
		o < 0 && (o = r.strokeWidth / 2);
		let a = t.createElementNS(la, "path");
		return (
			a.setAttribute("d", this.opsToPath(n, r.fixedDecimalPlaceDigits)),
			a.setAttribute("stroke", r.fill || ""),
			a.setAttribute("stroke-width", o + ""),
			a.setAttribute("fill", "none"),
			r.fillLineDash &&
				a.setAttribute("stroke-dasharray", r.fillLineDash.join(" ").trim()),
			r.fillLineDashOffset &&
				a.setAttribute("stroke-dashoffset", `${r.fillLineDashOffset}`),
			a
		);
	}
	get generator() {
		return this.gen;
	}
	getDefaultOptions() {
		return this.gen.defaultOptions;
	}
	opsToPath(t, n) {
		return this.gen.opsToPath(t, n);
	}
	line(t, n, r, o, a) {
		let i = this.gen.line(t, n, r, o, a);
		return this.draw(i);
	}
	rectangle(t, n, r, o, a) {
		let i = this.gen.rectangle(t, n, r, o, a);
		return this.draw(i);
	}
	ellipse(t, n, r, o, a) {
		let i = this.gen.ellipse(t, n, r, o, a);
		return this.draw(i);
	}
	circle(t, n, r, o) {
		let a = this.gen.circle(t, n, r, o);
		return this.draw(a);
	}
	linearPath(t, n) {
		let r = this.gen.linearPath(t, n);
		return this.draw(r);
	}
	polygon(t, n) {
		let r = this.gen.polygon(t, n);
		return this.draw(r);
	}
	arc(t, n, r, o, a, i, s = !1, c) {
		let l = this.gen.arc(t, n, r, o, a, i, s, c);
		return this.draw(l);
	}
	curve(t, n) {
		let r = this.gen.curve(t, n);
		return this.draw(r);
	}
	path(t, n) {
		let r = this.gen.path(t, n);
		return this.draw(r);
	}
};
var nn = {
	canvas(e, t) {
		return new Ji(e, t);
	},
	svg(e, t) {
		return new ki(e, t);
	},
	generator(e) {
		return new Mt(e);
	},
	newSeed() {
		return Mt.newSeed();
	},
};
E();
E();
E();
function i2(e, t, n, r = (o) => o) {
	return e * r(0.5 - t * (0.5 - n));
}
function Hg(e) {
	return [-e[0], -e[1]];
}
function Lt(e, t) {
	return [e[0] + t[0], e[1] + t[1]];
}
function mt(e, t) {
	return [e[0] - t[0], e[1] - t[1]];
}
function _t(e, t) {
	return [e[0] * t, e[1] * t];
}
function Jg(e, t) {
	return [e[0] / t, e[1] / t];
}
function da(e) {
	return [e[1], -e[0]];
}
function s2(e, t) {
	return e[0] * t[0] + e[1] * t[1];
}
function kg(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}
function Yg(e) {
	return Math.hypot(e[0], e[1]);
}
function Vg(e) {
	return e[0] * e[0] + e[1] * e[1];
}
function c2(e, t) {
	return Vg(mt(e, t));
}
function U2(e) {
	return Jg(e, Yg(e));
}
function qg(e, t) {
	return Math.hypot(e[1] - t[1], e[0] - t[0]);
}
function Ua(e, t, n) {
	let r = Math.sin(n),
		o = Math.cos(n),
		a = e[0] - t[0],
		i = e[1] - t[1],
		s = a * o - i * r,
		c = a * r + i * o;
	return [s + t[0], c + t[1]];
}
function rl(e, t, n) {
	return Lt(e, _t(mt(t, e), n));
}
function l2(e, t, n) {
	return Lt(e, _t(t, n));
}
var { min: so, PI: Gg } = Math,
	d2 = 0.275,
	fa = Gg + 1e-4;
function Xg(e, t = {}) {
	let {
			size: n = 16,
			smoothing: r = 0.5,
			thinning: o = 0.5,
			simulatePressure: a = !0,
			easing: i = (F) => F,
			start: s = {},
			end: c = {},
			last: l = !1,
		} = t,
		{ cap: d = !0, easing: U = (F) => F * (2 - F) } = s,
		{ cap: u = !0, easing: p = (F) => --F * F * F + 1 } = c;
	if (e.length === 0 || n <= 0) return [];
	let m = e[e.length - 1].runningLength,
		h = s.taper === !1 ? 0 : s.taper === !0 ? Math.max(n, m) : s.taper,
		g = c.taper === !1 ? 0 : c.taper === !0 ? Math.max(n, m) : c.taper,
		x = Math.pow(n * r, 2),
		y = [],
		w = [],
		T = e.slice(0, 10).reduce((F, C) => {
			let Y = C.pressure;
			if (a) {
				let te = so(1, C.distance / n),
					un = so(1, 1 - te);
				Y = so(1, F + (un - F) * (te * d2));
			}
			return (F + Y) / 2;
		}, e[0].pressure),
		I = i2(n, o, e[e.length - 1].pressure, i),
		_,
		L = e[0].vector,
		M = e[0].point,
		N = M,
		$ = M,
		S = N,
		P = !1;
	for (let F = 0; F < e.length; F++) {
		let { pressure: C } = e[F],
			{ point: Y, vector: te, distance: un, runningLength: it } = e[F];
		if (F < e.length - 1 && m - it < 3) continue;
		if (o) {
			if (a) {
				let Ae = so(1, un / n),
					pn = so(1, 1 - Ae);
				C = so(1, T + (pn - T) * (Ae * d2));
			}
			I = i2(n, o, C, i);
		} else I = n / 2;
		_ === void 0 && (_ = I);
		let Fn = it < h ? U(it / h) : 1,
			_o = m - it < g ? p((m - it) / g) : 1;
		I = Math.max(0.01, I * Math.min(Fn, _o));
		let dr = (F < e.length - 1 ? e[F + 1] : e[F]).vector,
			Ur = F < e.length - 1 ? s2(te, dr) : 1,
			bt = s2(te, L) < 0 && !P,
			On = Ur !== null && Ur < 0;
		if (bt || On) {
			let Ae = _t(da(L), I);
			for (let pn = 1 / 13, st = 0; st <= 1; st += pn)
				($ = Ua(mt(Y, Ae), Y, fa * st)),
					y.push($),
					(S = Ua(Lt(Y, Ae), Y, fa * -st)),
					w.push(S);
			(M = $), (N = S), On && (P = !0);
			continue;
		}
		if (((P = !1), F === e.length - 1)) {
			let Ae = _t(da(te), I);
			y.push(mt(Y, Ae)), w.push(Lt(Y, Ae));
			continue;
		}
		let Yr = _t(da(rl(dr, te, Ur)), I);
		($ = mt(Y, Yr)),
			(F <= 1 || c2(M, $) > x) && (y.push($), (M = $)),
			(S = Lt(Y, Yr)),
			(F <= 1 || c2(N, S) > x) && (w.push(S), (N = S)),
			(T = C),
			(L = te);
	}
	let A = e[0].point.slice(0, 2),
		k =
			e.length > 1 ? e[e.length - 1].point.slice(0, 2) : Lt(e[0].point, [1, 1]),
		K = [],
		q = [];
	if (e.length === 1) {
		if (!(h || g) || l) {
			let F = l2(A, U2(da(mt(A, k))), -(_ || I)),
				C = [];
			for (let Y = 1 / 13, te = Y; te <= 1; te += Y)
				C.push(Ua(F, A, fa * 2 * te));
			return C;
		}
	} else {
		if (!(h || (g && e.length === 1)))
			if (d)
				for (let C = 1 / 13, Y = C; Y <= 1; Y += C) {
					let te = Ua(w[0], A, fa * Y);
					K.push(te);
				}
			else {
				let C = mt(y[0], w[0]),
					Y = _t(C, 0.5),
					te = _t(C, 0.51);
				K.push(mt(A, Y), mt(A, te), Lt(A, te), Lt(A, Y));
			}
		let F = da(Hg(e[e.length - 1].vector));
		if (g || (h && e.length === 1)) q.push(k);
		else if (u) {
			let C = l2(k, F, I);
			for (let Y = 1 / 29, te = Y; te < 1; te += Y)
				q.push(Ua(C, k, fa * 3 * te));
		} else
			q.push(
				Lt(k, _t(F, I)),
				Lt(k, _t(F, I * 0.99)),
				mt(k, _t(F, I * 0.99)),
				mt(k, _t(F, I)),
			);
	}
	return y.concat(q, w.reverse(), K);
}
function Zg(e, t = {}) {
	var n;
	let { streamline: r = 0.5, size: o = 16, last: a = !1 } = t;
	if (e.length === 0) return [];
	let i = 0.15 + (1 - r) * 0.85,
		s = Array.isArray(e[0])
			? e
			: e.map(({ x: p, y: m, pressure: h = 0.5 }) => [p, m, h]);
	if (s.length === 2) {
		let p = s[1];
		s = s.slice(0, -1);
		for (let m = 1; m < 5; m++) s.push(rl(s[0], p, m / 4));
	}
	s.length === 1 && (s = [...s, [...Lt(s[0], [1, 1]), ...s[0].slice(2)]]);
	let c = [
			{
				point: [s[0][0], s[0][1]],
				pressure: s[0][2] >= 0 ? s[0][2] : 0.25,
				vector: [1, 1],
				distance: 0,
				runningLength: 0,
			},
		],
		l = !1,
		d = 0,
		U = c[0],
		u = s.length - 1;
	for (let p = 1; p < s.length; p++) {
		let m = a && p === u ? s[p].slice(0, 2) : rl(U.point, s[p], i);
		if (kg(U.point, m)) continue;
		let h = qg(m, U.point);
		if (((d += h), p < u && !l)) {
			if (d < o) continue;
			l = !0;
		}
		(U = {
			point: m,
			pressure: s[p][2] >= 0 ? s[p][2] : 0.5,
			vector: U2(mt(U.point, m)),
			distance: h,
			runningLength: d,
		}),
			c.push(U);
	}
	return (c[0].vector = ((n = c[1]) == null ? void 0 : n.vector) || [0, 0]), c;
}
function f2(e, t = {}) {
	return Xg(Zg(e, t), t);
}
E();
var me = class e {
	static rg = new Mt();
	static cache = new WeakMap();
	static get = (t) => e.cache.get(t);
	static set = (t, n) => e.cache.set(t, n);
	static delete = (t) => e.cache.delete(t);
	static destroy = () => {
		e.cache = new WeakMap();
	};
	static generateElementShape = (t, n) => {
		let r = n?.isExporting ? void 0 : e.get(t);
		if (r !== void 0) return r;
		Yi.delete(t);
		let o = u2(
			t,
			e.rg,
			n || {
				isExporting: !1,
				canvasBackgroundColor: Z.white,
				embedsValidationStatus: null,
			},
		);
		return e.cache.set(t, o), o;
	};
};
E();
E();
E();
E();
E();
var Ye = Kt(ol(), 1);
E();
function m2(e) {
	var t,
		n,
		r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object")
		if (Array.isArray(e))
			for (t = 0; t < e.length; t++)
				e[t] && (n = m2(e[t])) && (r && (r += " "), (r += n));
		else for (t in e) e[t] && (r && (r += " "), (r += t));
	return r;
}
function h2() {
	for (var e = 0, t, n, r = ""; e < arguments.length; )
		(t = arguments[e++]) && (n = m2(t)) && (r && (r += " "), (r += n));
	return r;
}
var f = Kt(al(), 1),
	Dt = (e) => "var(--icon-fill-color)",
	x2 = (e) => (e === ke.LIGHT ? En.white : "#1e1e1e"),
	v = (e, t = 512) => {
		let {
			width: n = 512,
			height: r = n,
			mirror: o,
			style: a,
			...i
		} = typeof t == "number" ? { width: t } : t;
		return (0, f.jsx)("svg", {
			"aria-hidden": "true",
			focusable: "false",
			role: "img",
			viewBox: `0 0 ${n} ${r}`,
			className: h2({ "rtl-mirror": o }),
			style: a,
			...i,
			children:
				typeof e == "string"
					? (0, f.jsx)("path", { fill: "currentColor", d: e })
					: e,
		});
	},
	O = {
		width: 24,
		height: 24,
		fill: "none",
		strokeWidth: 2,
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
	},
	G = {
		width: 20,
		height: 20,
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
	},
	nD = v(
		(0, f.jsxs)("g", {
			strokeWidth: "1.5",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("rect", { x: 3, y: 8, width: 18, height: 4, rx: 1 }),
				(0, f.jsx)("line", { x1: 12, y1: 8, x2: 12, y2: 21 }),
				(0, f.jsx)("path", {
					d: "M19 12v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7",
				}),
				(0, f.jsx)("path", {
					d: "M7.5 8a2.5 2.5 0 0 1 0 -5a4.8 8 0 0 1 4.5 5a4.8 8 0 0 1 4.5 -5a2.5 2.5 0 0 1 0 5",
				}),
			],
		}),
		O,
	),
	rD = v(
		(0, f.jsxs)("g", {
			strokeWidth: "1.25",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" }),
				(0, f.jsx)("path", { d: "M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" }),
				(0, f.jsx)("line", { x1: "3", y1: "6", x2: "3", y2: "19" }),
				(0, f.jsx)("line", { x1: "12", y1: "6", x2: "12", y2: "19" }),
				(0, f.jsx)("line", { x1: "21", y1: "6", x2: "21", y2: "19" }),
			],
		}),
		O,
	),
	oD = v(
		(0, f.jsxs)("svg", {
			strokeWidth: "1.5",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("line", { x1: "12", y1: "5", x2: "12", y2: "19" }),
				(0, f.jsx)("line", { x1: "5", y1: "12", x2: "19", y2: "12" }),
			],
		}),
		O,
	),
	aD = v(
		(0, f.jsxs)("g", {
			strokeWidth: "1.5",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("circle", { cx: "12", cy: "12", r: "1" }),
				(0, f.jsx)("circle", { cx: "12", cy: "19", r: "1" }),
				(0, f.jsx)("circle", { cx: "12", cy: "5", r: "1" }),
			],
		}),
		O,
	),
	iD = v(
		(0, f.jsxs)("svg", {
			strokeWidth: "1.5",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M9 4v6l-2 4v2h10v-2l-2 -4v-6" }),
				(0, f.jsx)("line", { x1: "12", y1: "16", x2: "12", y2: "21" }),
				(0, f.jsx)("line", { x1: "8", y1: "4", x2: "16", y2: "4" }),
			],
		}),
		O,
	),
	sD = v(
		(0, f.jsxs)("g", {
			children: [
				(0, f.jsx)("path", {
					d: "M13.542 8.542H6.458a2.5 2.5 0 0 0-2.5 2.5v3.75a2.5 2.5 0 0 0 2.5 2.5h7.084a2.5 2.5 0 0 0 2.5-2.5v-3.75a2.5 2.5 0 0 0-2.5-2.5Z",
					stroke: "currentColor",
					strokeWidth: "1.25",
				}),
				(0, f.jsx)("path", {
					d: "M10 13.958a1.042 1.042 0 1 0 0-2.083 1.042 1.042 0 0 0 0 2.083Z",
					stroke: "currentColor",
					strokeWidth: "1.25",
				}),
				(0, f.jsx)("mask", {
					id: "UnlockedIcon",
					style: { maskType: "alpha" },
					maskUnits: "userSpaceOnUse",
					x: 6,
					y: 1,
					width: 9,
					height: 9,
					children: (0, f.jsx)("path", {
						stroke: "none",
						d: "M6.399 9.561V5.175c0-.93.401-1.823 1.116-2.48a3.981 3.981 0 0 1 2.693-1.028c1.01 0 1.98.37 2.694 1.027.715.658 1.116 1.55 1.116 2.481",
						fill: "#fff",
					}),
				}),
				(0, f.jsx)("g", {
					mask: "url(#UnlockedIcon)",
					children: (0, f.jsx)("path", {
						stroke: "none",
						d: "M5.149 9.561v1.25h2.5v-1.25h-2.5Zm5.06-7.894V.417v1.25Zm2.559 3.508v1.25h2.5v-1.25h-2.5ZM7.648 8.51V5.175h-2.5V8.51h2.5Zm0-3.334c0-.564.243-1.128.713-1.561L6.668 1.775c-.959.883-1.52 2.104-1.52 3.4h2.5Zm.713-1.561a2.732 2.732 0 0 1 1.847-.697v-2.5c-1.31 0-2.585.478-3.54 1.358L8.36 3.614Zm1.847-.697c.71 0 1.374.26 1.847.697l1.694-1.839a5.231 5.231 0 0 0-3.54-1.358v2.5Zm1.847.697c.47.433.713.997.713 1.561h2.5c0-1.296-.56-2.517-1.52-3.4l-1.693 1.839Z",
						fill: "currentColor",
					}),
				}),
			],
		}),
		G,
	),
	cD = v(
		(0, f.jsxs)("g", {
			strokeWidth: "1.25",
			children: [
				(0, f.jsx)("path", {
					d: "M13.542 8.542H6.458a2.5 2.5 0 0 0-2.5 2.5v3.75a2.5 2.5 0 0 0 2.5 2.5h7.084a2.5 2.5 0 0 0 2.5-2.5v-3.75a2.5 2.5 0 0 0-2.5-2.5Z",
				}),
				(0, f.jsx)("path", {
					d: "M10 13.958a1.042 1.042 0 1 0 0-2.083 1.042 1.042 0 0 0 0 2.083Z",
				}),
				(0, f.jsx)("path", {
					d: "M6.667 8.333V5.417C6.667 3.806 8.159 2.5 10 2.5c1.841 0 3.333 1.306 3.333 2.917v2.916",
				}),
			],
		}),
		G,
	),
	lD = v(
		(0, f.jsxs)(f.Fragment, {
			children: [
				(0, f.jsx)("path", {
					d: "M38.5 83.5c-14-2-17.833-10.473-21-22.5C14.333 48.984 12 22 12 12.5",
					stroke: "currentColor",
					strokeWidth: 2,
					strokeLinecap: "round",
				}),
				(0, f.jsx)("path", {
					fillRule: "evenodd",
					clipRule: "evenodd",
					d: "m12.005 10.478 7.905 14.423L6 25.75l6.005-15.273Z",
					fill: "currentColor",
				}),
				(0, f.jsx)("path", {
					d: "M12.005 10.478c1.92 3.495 3.838 7 7.905 14.423m-7.905-14.423c3.11 5.683 6.23 11.368 7.905 14.423m0 0c-3.68.226-7.35.455-13.91.85m13.91-.85c-5.279.33-10.566.647-13.91.85m0 0c1.936-4.931 3.882-9.86 6.005-15.273M6 25.75c2.069-5.257 4.135-10.505 6.005-15.272",
					stroke: "currentColor",
					strokeWidth: 2,
					strokeLinecap: "round",
				}),
			],
		}),
		{ width: 41, height: 94, fill: "none" },
	),
	dD = v(
		(0, f.jsxs)(f.Fragment, {
			children: [
				(0, f.jsx)("path", {
					d: "M18.026 1.232c-5.268 13.125-5.548 33.555 3.285 42.311 8.823 8.75 33.31 12.304 42.422 13.523",
					stroke: "currentColor",
					strokeWidth: 2,
					strokeLinecap: "round",
				}),
				(0, f.jsx)("path", {
					fillRule: "evenodd",
					clipRule: "evenodd",
					d: "m72.181 59.247-13.058-10-2.948 13.62 16.006-3.62Z",
					fill: "currentColor",
				}),
				(0, f.jsx)("path", {
					d: "M72.181 59.247c-3.163-2.429-6.337-4.856-13.058-10m13.058 10c-5.145-3.936-10.292-7.882-13.058-10m0 0c-.78 3.603-1.563 7.196-2.948 13.62m2.948-13.62c-1.126 5.168-2.24 10.346-2.948 13.62m0 0c5.168-1.166 10.334-2.343 16.006-3.62m-16.006 3.62c5.51-1.248 11.01-2.495 16.006-3.62",
					stroke: "currentColor",
					strokeWidth: 2,
					strokeLinecap: "round",
				}),
			],
		}),
		{ width: 85, height: 71, fill: "none" },
	),
	UD = v(
		(0, f.jsxs)(f.Fragment, {
			children: [
				(0, f.jsx)("path", {
					d: "M1 77c14-2 31.833-11.973 35-24 3.167-12.016-6-35-9.5-43.5",
					stroke: "currentColor",
					strokeWidth: 2,
					strokeLinecap: "round",
				}),
				(0, f.jsx)("path", {
					fillRule: "evenodd",
					clipRule: "evenodd",
					d: "m24.165 1.093-2.132 16.309 13.27-4.258-11.138-12.05Z",
					fill: "currentColor",
				}),
				(0, f.jsx)("path", {
					d: "M24.165 1.093c-.522 3.953-1.037 7.916-2.132 16.309m2.131-16.309c-.835 6.424-1.68 12.854-2.13 16.308m0 0c3.51-1.125 7.013-2.243 13.27-4.257m-13.27 4.257c5.038-1.608 10.08-3.232 13.27-4.257m0 0c-3.595-3.892-7.197-7.777-11.14-12.05m11.14 12.05c-3.837-4.148-7.667-8.287-11.14-12.05",
					stroke: "currentColor",
					strokeWidth: 2,
					strokeLinecap: "round",
				}),
			],
		}),
		{ width: 38, height: 78, fill: "none" },
	),
	fD = v(
		(0, f.jsx)("g", {
			fill: "currentColor",
			children: (0, f.jsx)("path", {
				d: "M39.9 32.889a.326.326 0 0 0-.279-.056c-2.094-3.083-4.774-6-7.343-8.833l-.419-.472a.212.212 0 0 0-.056-.139.586.586 0 0 0-.167-.111l-.084-.083-.056-.056c-.084-.167-.28-.278-.475-.167-.782.39-1.507.973-2.206 1.528-.92.722-1.842 1.445-2.708 2.25a8.405 8.405 0 0 0-.977 1.028c-.14.194-.028.361.14.444-.615.611-1.23 1.223-1.843 1.861a.315.315 0 0 0-.084.223c0 .083.056.166.111.194l1.09.833v.028c1.535 1.528 4.244 3.611 7.12 5.861.418.334.865.667 1.284 1 .195.223.39.473.558.695.084.11.28.139.391.055.056.056.14.111.196.167a.398.398 0 0 0 .167.056.255.255 0 0 0 .224-.111.394.394 0 0 0 .055-.167c.029 0 .028.028.056.028a.318.318 0 0 0 .224-.084l5.082-5.528a.309.309 0 0 0 0-.444Zm-14.63-1.917a.485.485 0 0 0 .111.14c.586.5 1.2 1 1.843 1.555l-2.569-1.945-.251-.166c-.056-.028-.112-.084-.168-.111l-.195-.167.056-.056.055-.055.112-.111c.866-.861 2.346-2.306 3.1-3.028-.81.805-2.43 3.167-2.095 3.944Zm8.767 6.89-2.122-1.612a44.713 44.713 0 0 0-2.625-2.5c1.145.861 2.122 1.611 2.262 1.75 1.117.972 1.06.806 1.815 1.445l.921.666a1.06 1.06 0 0 1-.251.25Zm.558.416-.056-.028c.084-.055.168-.111.252-.194l-.196.222ZM1.089 5.75c.055.361.14.722.195 1.056.335 1.833.67 3.5 1.284 4.75l.252.944c.084.361.223.806.363.917 1.424 1.25 3.602 3.11 5.947 4.889a.295.295 0 0 0 .363 0s0 .027.028.027a.254.254 0 0 0 .196.084.318.318 0 0 0 .223-.084c2.988-3.305 5.221-6.027 6.813-8.305.112-.111.14-.278.14-.417.111-.111.195-.25.307-.333.111-.111.111-.306 0-.39l-.028-.027c0-.055-.028-.139-.084-.167-.698-.666-1.2-1.138-1.731-1.638-.922-.862-1.871-1.75-3.881-3.75l-.028-.028c-.028-.028-.056-.056-.112-.056-.558-.194-1.703-.389-3.127-.639C6.087 2.223 3.21 1.723.614.944c0 0-.168 0-.196.028l-.083.084c-.028.027-.056.055-.224.11h.056-.056c.028.167.028.278.084.473 0 .055.112.5.112.555l.782 3.556Zm15.496 3.278-.335-.334c.084.112.196.195.335.334Zm-3.546 4.666-.056.056c0-.028.028-.056.056-.056Zm-2.038-10c.168.167.866.834 1.033.973-.726-.334-2.54-1.167-3.379-1.445.838.167 1.983.334 2.346.472ZM1.424 2.306c.419.722.754 3.222 1.089 5.666-.196-.778-.335-1.555-.503-2.278-.251-1.277-.503-2.416-.838-3.416.056 0 .14 0 .252.028Zm-.168-.584c-.112 0-.223-.028-.307-.028 0-.027 0-.055-.028-.055.14 0 .223.028.335.083Zm-1.089.222c0-.027 0-.027 0 0ZM39.453 1.333c.028-.11-.558-.61-.363-.639.42-.027.42-.666 0-.666-.558.028-1.144.166-1.675.25-.977.194-1.982.389-2.96.61-2.205.473-4.383.973-6.561 1.557-.67.194-1.424.333-2.066.666-.224.111-.196.333-.084.472-.056.028-.084.028-.14.056-.195.028-.363.056-.558.083-.168.028-.252.167-.224.334 0 .027.028.083.028.11-1.173 1.556-2.485 3.195-3.909 4.945-1.396 1.611-2.876 3.306-4.356 5.056-4.719 5.5-10.052 11.75-15.943 17.25a.268.268 0 0 0 0 .389c.028.027.056.055.084.055-.084.084-.168.14-.252.222-.056.056-.084.111-.084.167a.605.605 0 0 0-.111.139c-.112.111-.112.305.028.389.111.11.307.11.39-.028.029-.028.029-.056.056-.056a.44.44 0 0 1 .615 0c.335.362.67.723.977 1.028l-.698-.583c-.112-.111-.307-.083-.39.028-.113.11-.085.305.027.389l7.427 6.194c.056.056.112.056.196.056s.14-.028.195-.084l.168-.166c.028.027.083.027.111.027.084 0 .14-.027.196-.083 10.052-10.055 18.15-17.639 27.42-24.417.083-.055.111-.166.111-.25.112 0 .196-.083.251-.194 1.704-5.194 2.039-9.806 2.15-12.083v-.028c0-.028.028-.056.028-.083.028-.056.028-.084.028-.084a1.626 1.626 0 0 0-.111-1.028ZM21.472 9.5c.446-.5.893-1.028 1.34-1.5-2.876 3.778-7.65 9.583-14.408 16.5 4.607-5.083 9.242-10.333 13.068-15ZM5.193 35.778h.084-.084Zm3.462 3.194c-.027-.028-.027-.028 0-.028v.028Zm4.16-3.583c.224-.25.448-.472.699-.722 0 0 0 .027.028.027-.252.223-.475.445-.726.695Zm1.146-1.111c.14-.14.279-.334.446-.5l.028-.028c1.648-1.694 3.351-3.389 5.082-5.111l.028-.028c.419-.333.921-.694 1.368-1.028a379.003 379.003 0 0 0-6.952 6.695ZM24.794 6.472c-.921 1.195-1.954 2.778-2.82 4.028-2.736 3.944-11.532 13.583-11.727 13.75a1976.983 1976.983 0 0 1-8.042 7.639l-.167.167c-.14-.167-.14-.417.028-.556C14.49 19.861 22.03 10.167 25.074 5.917c-.084.194-.14.36-.28.555Zm4.83 5.695c-1.116-.64-1.646-1.64-1.34-2.611l.084-.334c.028-.083.084-.194.14-.277.307-.5.754-.917 1.257-1.167.027 0 .055 0 .083-.028-.028-.056-.028-.139-.028-.222.028-.167.14-.278.335-.278.335 0 1.369.306 1.76.639.111.083.223.194.335.305.14.167.363.445.474.667.056.028.112.306.196.445.056.222.111.472.084.694-.028.028 0 .194-.028.194a2.668 2.668 0 0 1-.363 1.028c-.028.028-.028.056-.056.084l-.028.027c-.14.223-.335.417-.53.556-.643.444-1.369.583-2.095.389 0 0-.195-.084-.28-.111Zm8.154-.834a39.098 39.098 0 0 1-.893 3.167c0 .028-.028.083 0 .111-.056 0-.084.028-.14.056-2.206 1.61-4.356 3.305-6.506 5.028 1.843-1.64 3.686-3.306 5.613-4.945.558-.5.949-1.139 1.06-1.861l.28-1.667v-.055c.14-.334.67-.195.586.166Z",
				fill: "currentColor",
			}),
		}),
		{ width: 40, height: 40, fill: "none" },
	),
	y2 = v(
		(0, f.jsxs)("g", {
			stroke: "currentColor",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", {
					d: "M6 6l4.153 11.793a0.365 .365 0 0 0 .331 .207a0.366 .366 0 0 0 .332 -.207l2.184 -4.793l4.787 -1.994a0.355 .355 0 0 0 .213 -.323a0.355 .355 0 0 0 -.213 -.323l-11.787 -4.36z",
				}),
				(0, f.jsx)("path", { d: "M13.5 13.5l4.5 4.5" }),
			],
		}),
		{ fill: "none", width: 22, height: 22, strokeWidth: 1.25 },
	),
	w2 = v(
		(0, f.jsxs)("g", {
			strokeWidth: "1.5",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("rect", {
					x: "4",
					y: "4",
					width: "16",
					height: "16",
					rx: "2",
				}),
			],
		}),
		O,
	),
	I2 = v(
		(0, f.jsxs)("g", {
			strokeWidth: "1.5",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", {
					d: "M10.5 20.4l-6.9 -6.9c-.781 -.781 -.781 -2.219 0 -3l6.9 -6.9c.781 -.781 2.219 -.781 3 0l6.9 6.9c.781 .781 .781 2.219 0 3l-6.9 6.9c-.781 .781 -2.219 .781 -3 0z",
				}),
			],
		}),
		O,
	),
	T2 = v(
		(0, f.jsxs)("g", {
			strokeWidth: "1.5",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("circle", { cx: "12", cy: "12", r: "9" }),
			],
		}),
		O,
	),
	R2 = v(
		(0, f.jsxs)("g", {
			strokeWidth: "1.5",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("line", { x1: "5", y1: "12", x2: "19", y2: "12" }),
				(0, f.jsx)("line", { x1: "15", y1: "16", x2: "19", y2: "12" }),
				(0, f.jsx)("line", { x1: "15", y1: "8", x2: "19", y2: "12" }),
			],
		}),
		O,
	),
	v2 = v((0, f.jsx)("path", { d: "M4.167 10h11.666", strokeWidth: "1.5" }), G),
	uD = v(
		(0, f.jsxs)("g", {
			strokeWidth: "1.25",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", {
					d: "M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z",
				}),
				(0, f.jsx)("path", { d: "M16 7h4" }),
				(0, f.jsx)("path", {
					d: "M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3",
				}),
			],
		}),
		O,
	),
	ua = v(
		(0, f.jsxs)("g", {
			strokeWidth: "1.25",
			children: [
				(0, f.jsx)("path", {
					clipRule: "evenodd",
					d: "m7.643 15.69 7.774-7.773a2.357 2.357 0 1 0-3.334-3.334L4.31 12.357a3.333 3.333 0 0 0-.977 2.357v1.953h1.953c.884 0 1.732-.352 2.357-.977Z",
				}),
				(0, f.jsx)("path", { d: "m11.25 5.417 3.333 3.333" }),
			],
		}),
		G,
	),
	M2 = v(
		(0, f.jsxs)("g", {
			strokeWidth: "1.5",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("line", { x1: "4", y1: "20", x2: "7", y2: "20" }),
				(0, f.jsx)("line", { x1: "14", y1: "20", x2: "21", y2: "20" }),
				(0, f.jsx)("line", { x1: "6.9", y1: "15", x2: "13.8", y2: "15" }),
				(0, f.jsx)("line", { x1: "10.2", y1: "6.3", x2: "16", y2: "20" }),
				(0, f.jsx)("polyline", { points: "5 20 11 4 13 4 20 20" }),
			],
		}),
		O,
	),
	_2 = v(
		(0, f.jsxs)("g", {
			strokeWidth: "1.25",
			children: [
				(0, f.jsx)("path", { d: "M12.5 6.667h.01" }),
				(0, f.jsx)("path", {
					d: "M4.91 2.625h10.18a2.284 2.284 0 0 1 2.285 2.284v10.182a2.284 2.284 0 0 1-2.284 2.284H4.909a2.284 2.284 0 0 1-2.284-2.284V4.909a2.284 2.284 0 0 1 2.284-2.284Z",
				}),
				(0, f.jsx)("path", {
					d: "m3.333 12.5 3.334-3.333c.773-.745 1.726-.745 2.5 0l4.166 4.166",
				}),
				(0, f.jsx)("path", {
					d: "m11.667 11.667.833-.834c.774-.744 1.726-.744 2.5 0l1.667 1.667",
				}),
			],
		}),
		G,
	),
	L2 = v(
		(0, f.jsxs)("g", {
			strokeWidth: "1.5",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", {
					d: "M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3",
				}),
				(0, f.jsx)("path", { d: "M18 13.3l-6.3 -6.3" }),
			],
		}),
		O,
	),
	pD = v(
		(0, f.jsx)("path", {
			strokeWidth: "1.25",
			d: "M10 4.167v11.666M4.167 10h11.666",
		}),
		G,
	),
	mD = v((0, f.jsx)("path", { d: "M5 10h10", strokeWidth: "1.25" }), G),
	hD = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.25,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M21 21l-6 -6" }),
				(0, f.jsx)("path", {
					d: "M3.268 12.043a7.017 7.017 0 0 0 6.634 4.957a7.012 7.012 0 0 0 7.043 -6.131a7 7 0 0 0 -5.314 -7.672a7.021 7.021 0 0 0 -8.241 4.403",
				}),
				(0, f.jsx)("path", { d: "M3 4v4h4" }),
			],
		}),
		O,
	),
	bD = v(
		(0, f.jsx)("path", {
			strokeWidth: "1.25",
			d: "M3.333 5.833h13.334M8.333 9.167v5M11.667 9.167v5M4.167 5.833l.833 10c0 .92.746 1.667 1.667 1.667h6.666c.92 0 1.667-.746 1.667-1.667l.833-10M7.5 5.833v-2.5c0-.46.373-.833.833-.833h3.334c.46 0 .833.373.833.833v2.5",
		}),
		G,
	),
	gD = v(
		(0, f.jsxs)("g", {
			strokeWidth: "1.25",
			children: [
				(0, f.jsx)("polyline", { points: "12 16 18 10 12 4" }),
				(0, f.jsx)("polyline", { points: "8 4 2 10 8 16" }),
			],
		}),
		G,
	),
	ED = v(
		(0, f.jsxs)("g", {
			strokeWidth: "1.25",
			children: [
				(0, f.jsx)("path", {
					d: "M14.375 6.458H8.958a2.5 2.5 0 0 0-2.5 2.5v5.417a2.5 2.5 0 0 0 2.5 2.5h5.417a2.5 2.5 0 0 0 2.5-2.5V8.958a2.5 2.5 0 0 0-2.5-2.5Z",
				}),
				(0, f.jsx)("path", {
					clipRule: "evenodd",
					d: "M11.667 3.125c.517 0 .986.21 1.325.55.34.338.55.807.55 1.325v1.458H8.333c-.485 0-.927.185-1.26.487-.343.312-.57.75-.609 1.24l-.005 5.357H5a1.87 1.87 0 0 1-1.326-.55 1.87 1.87 0 0 1-.549-1.325V5c0-.518.21-.987.55-1.326.338-.34.807-.549 1.325-.549h6.667Z",
				}),
			],
		}),
		G,
	),
	xD = v(
		(0, f.jsx)("path", {
			clipRule: "evenodd",
			d: "M10 2.5h.328a6.25 6.25 0 0 0 6.6 10.372A7.5 7.5 0 1 1 10 2.493V2.5Z",
			stroke: "currentColor",
		}),
		G,
	),
	yD = v(
		(0, f.jsx)("g", {
			stroke: "currentColor",
			strokeLinejoin: "round",
			children: (0, f.jsx)("path", {
				d: "M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM10 4.167V2.5M14.167 5.833l1.166-1.166M15.833 10H17.5M14.167 14.167l1.166 1.166M10 15.833V17.5M5.833 14.167l-1.166 1.166M5 10H3.333M5.833 5.833 4.667 4.667",
			}),
		}),
		{ ...G, strokeWidth: 1.5 },
	),
	wD = v(
		(0, f.jsxs)("g", {
			strokeWidth: "1.5",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("line", { x1: "4", y1: "6", x2: "20", y2: "6" }),
				(0, f.jsx)("line", { x1: "4", y1: "12", x2: "20", y2: "12" }),
				(0, f.jsx)("line", { x1: "4", y1: "18", x2: "20", y2: "18" }),
			],
		}),
		O,
	),
	ID = v(
		(0, f.jsx)("path", {
			strokeWidth: "1.25",
			d: "M3.333 14.167v1.666c0 .92.747 1.667 1.667 1.667h10c.92 0 1.667-.746 1.667-1.667v-1.666M5.833 9.167 10 13.333l4.167-4.166M10 3.333v10",
		}),
		G,
	),
	TD = v(
		(0, f.jsxs)("g", {
			strokeWidth: "1.5",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("circle", { cx: "12", cy: "12", r: "9" }),
				(0, f.jsx)("line", { x1: "12", y1: "17", x2: "12", y2: "17.01" }),
				(0, f.jsx)("path", {
					d: "M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4",
				}),
			],
		}),
		O,
	),
	RD = v(
		(0, f.jsxs)("g", {
			strokeWidth: "1.25",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("circle", { cx: "12", cy: "12", r: "9" }),
				(0, f.jsx)("line", { x1: "12", y1: "17", x2: "12", y2: "17.01" }),
				(0, f.jsx)("path", {
					d: "M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4",
				}),
			],
		}),
		O,
	),
	vD = v(
		(0, f.jsx)("path", {
			strokeWidth: "1.25",
			d: "M9.167 5.833H5.833c-1.254 0-2.5 1.282-2.5 2.5v5.834c0 1.283 1.252 2.5 2.5 2.5h5.834c1.251 0 2.5-1.25 2.5-2.5v-3.334M8.333 11.667l8.334-8.334M12.5 3.333h4.167V7.5",
		}),
		G,
	),
	MD = v(
		(0, f.jsx)("path", {
			d: "M7.5 15.833c-3.583 1.167-3.583-2.083-5-2.5m10 4.167v-2.917c0-.833.083-1.166-.417-1.666 2.334-.25 4.584-1.167 4.584-5a3.833 3.833 0 0 0-1.084-2.667 3.5 3.5 0 0 0-.083-2.667s-.917-.25-2.917 1.084a10.25 10.25 0 0 0-5.166 0C5.417 2.333 4.5 2.583 4.5 2.583a3.5 3.5 0 0 0-.083 2.667 3.833 3.833 0 0 0-1.084 2.667c0 3.833 2.25 4.75 4.584 5-.5.5-.5 1-.417 1.666V17.5",
			strokeWidth: "1.25",
		}),
		G,
	),
	_D = v(
		(0, f.jsxs)("g", {
			strokeWidth: "1.25",
			children: [
				(0, f.jsx)("path", {
					d: "M7.5 10.833a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666ZM12.5 10.833a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666ZM6.25 6.25c2.917-.833 4.583-.833 7.5 0M5.833 13.75c2.917.833 5.417.833 8.334 0",
				}),
				(0, f.jsx)("path", {
					d: "M12.917 14.167c0 .833 1.25 2.5 1.666 2.5 1.25 0 2.361-1.39 2.917-2.5.556-1.39.417-4.861-1.25-9.584-1.214-.846-2.5-1.116-3.75-1.25l-.833 2.084M7.083 14.167c0 .833-1.13 2.5-1.526 2.5-1.191 0-2.249-1.39-2.778-2.5-.529-1.39-.397-4.861 1.19-9.584 1.157-.846 2.318-1.116 3.531-1.25l.833 2.084",
				}),
			],
		}),
		G,
	),
	LD = v(
		(0, f.jsxs)("g", {
			strokeWidth: "1.25",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M4 4l11.733 16h4.267l-11.733 -16z" }),
				(0, f.jsx)("path", { d: "M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" }),
			],
		}),
		O,
	),
	DD = v(
		(0, f.jsx)("polyline", {
			fill: "none",
			stroke: "currentColor",
			points: "20 6 9 17 4 12",
		}),
		{ width: 24, height: 24 },
	),
	SD = v(
		(0, f.jsxs)("g", {
			strokeWidth: "1.25",
			children: [
				(0, f.jsx)("path", {
					d: "M8.333 11.667a2.917 2.917 0 0 0 4.167 0l3.333-3.334a2.946 2.946 0 1 0-4.166-4.166l-.417.416",
				}),
				(0, f.jsx)("path", {
					d: "M11.667 8.333a2.917 2.917 0 0 0-4.167 0l-3.333 3.334a2.946 2.946 0 0 0 4.166 4.166l.417-.416",
				}),
			],
		}),
		G,
	),
	$D = v(
		"M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z",
		{ width: 448, height: 512 },
	),
	ND = v(
		"M252 54L203 8a28 27 0 00-20-8H28C12 0 0 12 0 27v195c0 15 12 26 28 26h204c15 0 28-11 28-26V73a28 27 0 00-8-19zM130 213c-21 0-37-16-37-36 0-19 16-35 37-35 20 0 37 16 37 35 0 20-17 36-37 36zm56-169v56c0 4-4 6-7 6H44c-4 0-7-2-7-6V42c0-4 3-7 7-7h133l4 2 3 2a7 7 0 012 5z M296 201l87 95-188 205-78 9c-10 1-19-8-18-20l9-84zm141-14l-41-44a31 31 0 00-46 0l-38 41 87 95 38-42c13-14 13-36 0-50z",
		{ width: 448, height: 512 },
	),
	PD = v(
		(0, f.jsx)("path", {
			d: "m9.257 6.351.183.183H15.819c.34 0 .727.182 1.051.506.323.323.505.708.505 1.05v5.819c0 .316-.183.7-.52 1.035-.337.338-.723.522-1.037.522H4.182c-.352 0-.74-.181-1.058-.5-.318-.318-.499-.705-.499-1.057V5.182c0-.351.181-.736.5-1.054.32-.321.71-.503 1.057-.503H6.53l2.726 2.726Z",
			strokeWidth: "1.25",
		}),
		G,
	),
	FD = v(
		"M384 112v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h80c0-35.29 28.71-64 64-64s64 28.71 64 64h80c26.51 0 48 21.49 48 48zM192 40c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24m96 114v-20a6 6 0 0 0-6-6H102a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6h180a6 6 0 0 0 6-6z",
		{ width: 384, height: 512 },
	),
	OD = v(
		"M204.3 5C104.9 24.4 24.8 104.3 5.2 203.4c-37 187 131.7 326.4 258.8 306.7 41.2-6.4 61.4-54.6 42.5-91.7-23.1-45.4 9.9-98.4 60.9-98.4h79.7c35.8 0 64.8-29.6 64.9-65.3C511.5 97.1 368.1-26.9 204.3 5zM96 320c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm32-128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128-64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z",
	),
	AD = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.25,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", {
					d: "M5 16l1.465 1.638a2 2 0 1 1 -3.015 .099l1.55 -1.737z",
				}),
				(0, f.jsx)("path", {
					d: "M13.737 9.737c2.299 -2.3 3.23 -5.095 2.081 -6.245c-1.15 -1.15 -3.945 -.217 -6.244 2.082c-2.3 2.299 -3.231 5.095 -2.082 6.244c1.15 1.15 3.946 .218 6.245 -2.081z",
				}),
				(0, f.jsx)("path", {
					d: "M7.492 11.818c.362 .362 .768 .676 1.208 .934l6.895 4.047c1.078 .557 2.255 -.075 3.692 -1.512c1.437 -1.437 2.07 -2.614 1.512 -3.692c-.372 -.718 -1.72 -3.017 -4.047 -6.895a6.015 6.015 0 0 0 -.934 -1.208",
				}),
			],
		}),
		O,
	),
	BD = v(
		(0, f.jsxs)("g", {
			strokeWidth: "1.25",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M15 8h.01" }),
				(0, f.jsx)("path", {
					d: "M12 20h-5a3 3 0 0 1 -3 -3v-10a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v5",
				}),
				(0, f.jsx)("path", { d: "M4 15l4 -4c.928 -.893 2.072 -.893 3 0l4 4" }),
				(0, f.jsx)("path", {
					d: "M14 14l1 -1c.617 -.593 1.328 -.793 2.009 -.598",
				}),
				(0, f.jsx)("path", { d: "M19 16v6" }),
				(0, f.jsx)("path", { d: "M22 19l-3 3l-3 -3" }),
			],
		}),
		O,
	),
	CD = v(
		"M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z",
		{ width: 512, height: 512 },
	),
	KD = v(
		"M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z",
		{ width: 448, height: 512 },
	),
	HD = v(
		"M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z",
		{ width: 448, height: 512 },
	),
	JD = v(
		"M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z",
	),
	kD = v(
		"M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z",
	),
	YD = v(
		(0, f.jsx)("path", {
			d: "M7.5 10.833 4.167 7.5 7.5 4.167M4.167 7.5h9.166a3.333 3.333 0 0 1 0 6.667H12.5",
			strokeWidth: "1.25",
		}),
		G,
	),
	VD = v(
		(0, f.jsx)("path", {
			d: "M12.5 10.833 15.833 7.5 12.5 4.167M15.833 7.5H6.667a3.333 3.333 0 1 0 0 6.667H7.5",
			strokeWidth: "1.25",
		}),
		G,
	),
	qD = v(
		"M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z",
		{ mirror: !0 },
	),
	GD = v(
		(0, f.jsx)("path", {
			d: "M5 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM15 7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM15 17.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM7.25 8.917l5.5-2.834M7.25 11.083l5.5 2.834",
			strokeWidth: "1.5",
		}),
		G,
	),
	XD = v(
		"M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z",
	),
	ZD = v(
		"M16 5l-1.42 1.42-1.59-1.59V16h-1.98V4.83L9.42 6.42 8 5l4-4 4 4zm4 5v11c0 1.1-.9 2-2 2H6c-1.11 0-2-.9-2-2V10c0-1.11.89-2 2-2h3v2H6v11h12V10h-3V8h3c1.1 0 2 .89 2 2z",
		{ width: 24, height: 24 },
	),
	WD = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.25,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", {
					d: "M8 9h-1a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-8a2 2 0 0 0 -2 -2h-1",
				}),
				(0, f.jsx)("path", { d: "M12 14v-11" }),
				(0, f.jsx)("path", { d: "M9 6l3 -3l3 3" }),
			],
		}),
		O,
	),
	zD = v(
		(0, f.jsxs)(f.Fragment, {
			children: [
				(0, f.jsx)("path", {
					fill: "currentColor",
					d: "M40 5.6v6.1l-4.1.7c-8.9 1.4-16.5 6.9-20.6 15C13 32 10.9 43 12.4 43c.4 0 2.4-1.3 4.4-3 5-3.9 12.1-7 18.2-7.7l5-.6v12.8l11.2-11.3L62.5 22 51.2 10.8 40-.5v6.1zm10.2 22.6L44 34.5v-6.8l-6.9.6c-3.9.3-9.8 1.7-13.2 3.1-3.5 1.4-6.5 2.4-6.7 2.2-.9-1 3-7.5 6.4-10.8C28 18.6 34.4 16 40.1 16c3.7 0 3.9-.1 3.9-3.2V9.5l6.2 6.3 6.3 6.2-6.3 6.2z",
				}),
				(0, f.jsx)("path", {
					stroke: "currentColor",
					fill: "currentColor",
					d: "M0 36v20h48v-6.2c0-6 0-6.1-2-4.3-1.1 1-2 2.9-2 4.2V52H4V34c0-17.3-.1-18-2-18s-2 .7-2 20z",
				}),
			],
		}),
		{ width: 64, height: 64 },
	),
	QD = v(
		(0, f.jsx)("path", {
			stroke: "currentColor",
			strokeWidth: "40",
			fill: "currentColor",
			d: "M148 560a318 318 0 0 0 522 110 316 316 0 0 0 0-450 316 316 0 0 0-450 0c-11 11-21 22-30 34v4h47c25 0 46 21 46 46s-21 45-46 45H90c-13 0-25-6-33-14-9-9-14-20-14-33V156c0-25 20-45 45-45s45 20 45 45v32l1 1a401 401 0 0 1 623 509l212 212a42 42 0 0 1-59 59L698 757A401 401 0 0 1 65 570a42 42 0 0 1 83-10z",
		}),
		{ width: 1024 },
	),
	D2 = (0, f.jsxs)("g", {
		strokeWidth: 1.5,
		children: [
			(0, f.jsx)("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
			(0, f.jsx)("path", { d: "M12 10l0 10" }),
			(0, f.jsx)("path", { d: "M12 10l4 4" }),
			(0, f.jsx)("path", { d: "M12 10l-4 4" }),
			(0, f.jsx)("path", { d: "M4 4l16 0" }),
		],
	}),
	S2 = (0, f.jsxs)("g", {
		strokeWidth: 1.5,
		children: [
			(0, f.jsx)("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
			(0, f.jsx)("path", { d: "M12 5l0 14" }),
			(0, f.jsx)("path", { d: "M16 9l-4 -4" }),
			(0, f.jsx)("path", { d: "M8 9l4 -4" }),
		],
	}),
	jD = v(S2, O),
	eS = v(S2, { ...O, style: { transform: "rotate(180deg)" } }),
	tS = v(D2, O),
	nS = v(D2, { ...O, style: { transform: "rotate(180deg)" } }),
	rS = v(
		(0, f.jsxs)(f.Fragment, {
			children: [
				(0, f.jsxs)("g", {
					clipPath: "url(#a)",
					stroke: "currentColor",
					strokeWidth: "1.25",
					children: [
						(0, f.jsx)("path", {
							d: "M3.333 3.333h13.334",
							strokeLinecap: "round",
							strokeLinejoin: "round",
						}),
						(0, f.jsx)("path", {
							d: "M13.542 6.458h-.417c-.92 0-1.667.747-1.667 1.667v7.083c0 .92.746 1.667 1.667 1.667h.417c.92 0 1.666-.746 1.666-1.667V8.125c0-.92-.746-1.667-1.666-1.667ZM6.875 6.458h-.417c-.92 0-1.666.747-1.666 1.667v3.75c0 .92.746 1.667 1.666 1.667h.417c.92 0 1.667-.746 1.667-1.667v-3.75c0-.92-.747-1.667-1.667-1.667Z",
						}),
					],
				}),
				(0, f.jsx)("defs", {
					children: (0, f.jsx)("clipPath", {
						id: "a",
						children: (0, f.jsx)("path", { fill: "#fff", d: "M0 0h20v20H0z" }),
					}),
				}),
			],
		}),
		G,
	),
	oS = v(
		(0, f.jsxs)(f.Fragment, {
			children: [
				(0, f.jsxs)("g", {
					clipPath: "url(#a)",
					stroke: "currentColor",
					strokeWidth: "1.25",
					children: [
						(0, f.jsx)("path", {
							d: "M3.333 16.667h13.334",
							strokeLinecap: "round",
							strokeLinejoin: "round",
						}),
						(0, f.jsx)("path", {
							d: "M6.875 3.125h-.417c-.92 0-1.666.746-1.666 1.667v7.083c0 .92.746 1.667 1.666 1.667h.417c.92 0 1.667-.746 1.667-1.667V4.792c0-.92-.747-1.667-1.667-1.667ZM13.542 5.817h-.417c-.92 0-1.667.747-1.667 1.667v4.391c0 .92.746 1.667 1.667 1.667h.417c.92 0 1.666-.746 1.666-1.667V7.484c0-.92-.746-1.667-1.666-1.667Z",
						}),
					],
				}),
				(0, f.jsx)("defs", {
					children: (0, f.jsx)("clipPath", {
						id: "a",
						children: (0, f.jsx)("path", { fill: "#fff", d: "M0 0h20v20H0z" }),
					}),
				}),
			],
		}),
		G,
	),
	aS = v(
		(0, f.jsxs)(f.Fragment, {
			children: [
				(0, f.jsxs)("g", {
					clipPath: "url(#a)",
					stroke: "currentColor",
					strokeWidth: "1.25",
					children: [
						(0, f.jsx)("path", {
							d: "M3.333 3.333v13.334",
							strokeLinecap: "round",
							strokeLinejoin: "round",
						}),
						(0, f.jsx)("path", {
							d: "M15.208 4.792H8.125c-.92 0-1.667.746-1.667 1.666v.417c0 .92.747 1.667 1.667 1.667h7.083c.92 0 1.667-.747 1.667-1.667v-.417c0-.92-.746-1.666-1.667-1.666ZM12.516 11.458H8.125c-.92 0-1.667.746-1.667 1.667v.417c0 .92.747 1.666 1.667 1.666h4.391c.92 0 1.667-.746 1.667-1.666v-.417c0-.92-.746-1.667-1.667-1.667Z",
						}),
					],
				}),
				(0, f.jsx)("defs", {
					children: (0, f.jsx)("clipPath", {
						id: "a",
						children: (0, f.jsx)("path", { fill: "#fff", d: "M0 0h20v20H0z" }),
					}),
				}),
			],
		}),
		G,
	),
	iS = v(
		(0, f.jsxs)(f.Fragment, {
			children: [
				(0, f.jsxs)("g", {
					clipPath: "url(#a)",
					stroke: "currentColor",
					strokeWidth: "1.25",
					children: [
						(0, f.jsx)("path", {
							d: "M16.667 3.333v13.334",
							strokeLinecap: "round",
							strokeLinejoin: "round",
						}),
						(0, f.jsx)("path", {
							d: "M11.875 4.792H4.792c-.92 0-1.667.746-1.667 1.666v.417c0 .92.746 1.667 1.667 1.667h7.083c.92 0 1.667-.747 1.667-1.667v-.417c0-.92-.746-1.666-1.667-1.666ZM11.683 11.458H7.292c-.92 0-1.667.746-1.667 1.667v.417c0 .92.746 1.666 1.667 1.666h4.39c.921 0 1.667-.746 1.667-1.666v-.417c0-.92-.746-1.667-1.666-1.667Z",
						}),
					],
				}),
				(0, f.jsx)("defs", {
					children: (0, f.jsx)("clipPath", {
						id: "a",
						children: (0, f.jsx)("path", { fill: "#fff", d: "M0 0h20v20H0z" }),
					}),
				}),
			],
		}),
		G,
	),
	sS = v(
		(0, f.jsxs)(f.Fragment, {
			children: [
				(0, f.jsxs)("g", {
					clipPath: "url(#a)",
					stroke: "currentColor",
					strokeWidth: "1.25",
					children: [
						(0, f.jsx)("path", {
							d: "M16.667 3.333v13.334M3.333 3.333v13.334",
							strokeLinecap: "round",
							strokeLinejoin: "round",
						}),
						(0, f.jsx)("path", {
							d: "M14.375 10.208v-.416c0-.92-.746-1.667-1.667-1.667H7.292c-.92 0-1.667.746-1.667 1.667v.416c0 .92.746 1.667 1.667 1.667h5.416c.92 0 1.667-.746 1.667-1.667Z",
						}),
					],
				}),
				(0, f.jsx)("defs", {
					children: (0, f.jsx)("clipPath", {
						id: "a",
						children: (0, f.jsx)("path", { fill: "#fff", d: "M0 0h20v20H0z" }),
					}),
				}),
			],
		}),
		G,
	),
	cS = v(
		(0, f.jsxs)(f.Fragment, {
			children: [
				(0, f.jsxs)("g", {
					clipPath: "url(#a)",
					stroke: "currentColor",
					strokeWidth: "1.25",
					children: [
						(0, f.jsx)("path", {
							d: "M3.333 3.333h13.334M3.333 16.667h13.334",
							strokeLinecap: "round",
							strokeLinejoin: "round",
						}),
						(0, f.jsx)("path", {
							d: "M10.208 5.625h-.416c-.92 0-1.667.746-1.667 1.667v5.416c0 .92.746 1.667 1.667 1.667h.416c.92 0 1.667-.746 1.667-1.667V7.292c0-.92-.746-1.667-1.667-1.667Z",
						}),
					],
				}),
				(0, f.jsx)("defs", {
					children: (0, f.jsx)("clipPath", {
						id: "a",
						children: (0, f.jsx)("path", { fill: "#fff", d: "M0 0h20v20H0z" }),
					}),
				}),
			],
		}),
		G,
	),
	lS = v(
		(0, f.jsxs)("g", {
			stroke: "currentColor",
			strokeWidth: "1.25",
			children: [
				(0, f.jsx)("path", {
					d: "M1.667 10h2.916",
					strokeLinecap: "round",
					strokeLinejoin: "round",
				}),
				(0, f.jsx)("path", { d: "M8.333 10h3.334", strokeLinejoin: "round" }),
				(0, f.jsx)("path", {
					d: "M15.417 10h2.916",
					strokeLinecap: "round",
					strokeLinejoin: "round",
				}),
				(0, f.jsx)("path", {
					d: "M6.875 4.792h-.417c-.92 0-1.666.746-1.666 1.666v7.084c0 .92.746 1.666 1.666 1.666h.417c.92 0 1.667-.746 1.667-1.666V6.458c0-.92-.747-1.666-1.667-1.666ZM13.542 6.458h-.417c-.92 0-1.667.747-1.667 1.667v3.75c0 .92.746 1.667 1.667 1.667h.417c.92 0 1.666-.746 1.666-1.667v-3.75c0-.92-.746-1.667-1.666-1.667Z",
				}),
			],
		}),
		G,
	),
	dS = v(
		(0, f.jsxs)("g", {
			stroke: "currentColor",
			strokeWidth: "1.25",
			children: [
				(0, f.jsx)("path", {
					d: "M10 18.333v-2.916",
					strokeLinecap: "round",
					strokeLinejoin: "round",
				}),
				(0, f.jsx)("path", { d: "M10 11.667V8.333", strokeLinejoin: "round" }),
				(0, f.jsx)("path", {
					d: "M10 4.583V1.667",
					strokeLinecap: "round",
					strokeLinejoin: "round",
				}),
				(0, f.jsx)("path", {
					d: "M4.792 13.125v.417c0 .92.746 1.666 1.666 1.666h7.084c.92 0 1.666-.746 1.666-1.666v-.417c0-.92-.746-1.667-1.666-1.667H6.458c-.92 0-1.666.746-1.666 1.667ZM6.458 6.458v.417c0 .92.747 1.667 1.667 1.667h3.75c.92 0 1.667-.747 1.667-1.667v-.417c0-.92-.746-1.666-1.667-1.666h-3.75c-.92 0-1.667.746-1.667 1.666Z",
				}),
			],
		}),
		G,
	),
	US = v(
		(0, f.jsxs)("g", {
			strokeWidth: "1.5",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("circle", { cx: "9", cy: "7", r: "4" }),
				(0, f.jsx)("path", { d: "M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" }),
				(0, f.jsx)("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" }),
				(0, f.jsx)("path", { d: "M21 21v-2a4 4 0 0 0 -3 -3.85" }),
			],
		}),
		O,
	),
	fS = v(
		"M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z",
	),
	uS = v(
		"M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm96 328c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h160c8.8 0 16 7.2 16 16v160z",
	),
	pS = v(
		(0, f.jsxs)(f.Fragment, {
			children: [
				(0, f.jsx)("g", {
					clipPath: "url(#a)",
					stroke: "currentColor",
					strokeWidth: "1.25",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					children: (0, f.jsx)("path", { d: "M15 5 5 15M5 5l10 10" }),
				}),
				(0, f.jsx)("defs", {
					children: (0, f.jsx)("clipPath", {
						id: "a",
						children: (0, f.jsx)("path", { fill: "#fff", d: "M0 0h20v20H0z" }),
					}),
				}),
			],
		}),
		G,
	),
	mS = v(
		"M464 0c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48H176c-26.51 0-48-21.49-48-48V48c0-26.51 21.49-48 48-48h288M176 416c-44.112 0-80-35.888-80-80V128H48c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h288c26.51 0 48-21.49 48-48v-48H176z",
		{ mirror: !0 },
	),
	hS = v(
		"M11.553 22.894a.998.998 0 00.894 0s3.037-1.516 5.465-4.097C19.616 16.987 21 14.663 21 12V5a1 1 0 00-.649-.936l-8-3a.998.998 0 00-.702 0l-8 3A1 1 0 003 5v7c0 2.663 1.384 4.987 3.088 6.797 2.428 2.581 5.465 4.097 5.465 4.097zm-1.303-8.481l6.644-6.644a.856.856 0 111.212 1.212l-7.25 7.25a.856.856 0 01-1.212 0l-3.75-3.75a.856.856 0 111.212-1.212l3.144 3.144z",
		{ width: 24 },
	),
	bS = v(
		"M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm32-48h224V288l-23.5-23.5c-4.7-4.7-12.3-4.7-17 0L176 352l-39.5-39.5c-4.7-4.7-12.3-4.7-17 0L80 352v64zm48-240c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z",
		{ width: 384, height: 512 },
	),
	gS = Ye.default.memo(({ theme: e }) =>
		v(
			(0, f.jsxs)(f.Fragment, {
				children: [
					(0, f.jsx)("path", { d: "M25 26H111V111H25", fill: Dt(e) }),
					(0, f.jsx)("path", {
						d: "M25 111C25 80.2068 25 49.4135 25 26M25 26C48.6174 26 72.2348 26 111 26H25ZM25 26C53.3671 26 81.7343 26 111 26H25ZM111 26C111 52.303 111 78.606 111 111V26ZM111 26C111 51.2947 111 76.5893 111 111V26ZM111 111C87.0792 111 63.1585 111 25 111H111ZM111 111C87.4646 111 63.9293 111 25 111H111ZM25 111C25 81.1514 25 51.3028 25 26V111Z",
						stroke: Dt(e),
						strokeWidth: "2",
					}),
					(0, f.jsx)("path", { d: "M100 100H160V160H100", fill: Dt(e) }),
					(0, f.jsx)("path", {
						d: "M100 160C100 144.106 100 128.211 100 100M100 100C117.706 100 135.412 100 160 100H100ZM100 100C114.214 100 128.428 100 160 100H100ZM160 100C160 120.184 160 140.369 160 160V100ZM160 100C160 113.219 160 126.437 160 160V100ZM160 160C145.534 160 131.068 160 100 160H160ZM160 160C143.467 160 126.934 160 100 160H160ZM100 160C100 143.661 100 127.321 100 100V160Z",
						stroke: Dt(e),
						strokeWidth: "2",
					}),
					(0, f.jsxs)("g", {
						fill: x2(e),
						stroke: Dt(e),
						strokeWidth: "6",
						children: [
							(0, f.jsx)("rect", {
								x: "2.5",
								y: "2.5",
								width: "30",
								height: "30",
							}),
							(0, f.jsx)("rect", {
								x: "2.5",
								y: "149.5",
								width: "30",
								height: "30",
							}),
							(0, f.jsx)("rect", {
								x: "147.5",
								y: "149.5",
								width: "30",
								height: "30",
							}),
							(0, f.jsx)("rect", {
								x: "147.5",
								y: "2.5",
								width: "30",
								height: "30",
							}),
						],
					}),
				],
			}),
			{ width: 182, height: 182, mirror: !0 },
		),
	),
	ES = Ye.default.memo(({ theme: e }) =>
		v(
			(0, f.jsxs)(f.Fragment, {
				children: [
					(0, f.jsx)("path", { d: "M25 26H111V111H25", fill: Dt(e) }),
					(0, f.jsx)("path", {
						d: "M25 111C25 80.2068 25 49.4135 25 26M25 26C48.6174 26 72.2348 26 111 26H25ZM25 26C53.3671 26 81.7343 26 111 26H25ZM111 26C111 52.303 111 78.606 111 111V26ZM111 26C111 51.2947 111 76.5893 111 111V26ZM111 111C87.0792 111 63.1585 111 25 111H111ZM111 111C87.4646 111 63.9293 111 25 111H111ZM25 111C25 81.1514 25 51.3028 25 26V111Z",
						stroke: Dt(e),
						strokeWidth: "2",
					}),
					(0, f.jsx)("path", { d: "M100 100H160V160H100", fill: Dt(e) }),
					(0, f.jsx)("path", {
						d: "M100 160C100 144.106 100 128.211 100 100M100 100C117.706 100 135.412 100 160 100H100ZM100 100C114.214 100 128.428 100 160 100H100ZM160 100C160 120.184 160 140.369 160 160V100ZM160 100C160 113.219 160 126.437 160 160V100ZM160 160C145.534 160 131.068 160 100 160H160ZM160 160C143.467 160 126.934 160 100 160H160ZM100 160C100 143.661 100 127.321 100 100V160Z",
						stroke: Dt(e),
						strokeWidth: "2",
					}),
					(0, f.jsxs)("g", {
						fill: x2(e),
						stroke: Dt(e),
						strokeWidth: "6",
						children: [
							(0, f.jsx)("rect", {
								x: "2.5",
								y: "2.5",
								width: "30",
								height: "30",
							}),
							(0, f.jsx)("rect", {
								x: "78.5",
								y: "149.5",
								width: "30",
								height: "30",
							}),
							(0, f.jsx)("rect", {
								x: "147.5",
								y: "149.5",
								width: "30",
								height: "30",
							}),
							(0, f.jsx)("rect", {
								x: "147.5",
								y: "78.5",
								width: "30",
								height: "30",
							}),
							(0, f.jsx)("rect", {
								x: "105.5",
								y: "2.5",
								width: "30",
								height: "30",
							}),
							(0, f.jsx)("rect", {
								x: "2.5",
								y: "102.5",
								width: "30",
								height: "30",
							}),
						],
					}),
				],
			}),
			{ width: 182, height: 182, mirror: !0 },
		),
	),
	xS = v(
		(0, f.jsx)("g", {
			strokeWidth: 1.25,
			children: (0, f.jsx)("path", {
				d: "M5.879 2.625h8.242a3.27 3.27 0 0 1 3.254 3.254v8.242a3.27 3.27 0 0 1-3.254 3.254H5.88a3.27 3.27 0 0 1-3.254-3.254V5.88A3.27 3.27 0 0 1 5.88 2.626l-.001-.001ZM4.518 16.118l7.608-12.83m.198 13.934 5.051-9.897M2.778 9.675l9.348-6.387m-7.608 12.83 12.857-8.793",
			}),
		}),
		G,
	),
	yS = v(
		(0, f.jsxs)(f.Fragment, {
			children: [
				(0, f.jsx)("path", {
					d: "M5.879 2.625h8.242a3.254 3.254 0 0 1 3.254 3.254v8.242a3.254 3.254 0 0 1-3.254 3.254H5.88a3.254 3.254 0 0 1-3.254-3.254V5.88a3.254 3.254 0 0 1 3.254-3.254Z",
					stroke: "currentColor",
					strokeWidth: "1.25",
				}),
				(0, f.jsx)("mask", {
					id: "FillHachureIcon",
					style: { maskType: "alpha" },
					maskUnits: "userSpaceOnUse",
					x: 2,
					y: 2,
					width: 16,
					height: 16,
					children: (0, f.jsx)("path", {
						d: "M5.879 2.625h8.242a3.254 3.254 0 0 1 3.254 3.254v8.242a3.254 3.254 0 0 1-3.254 3.254H5.88a3.254 3.254 0 0 1-3.254-3.254V5.88a3.254 3.254 0 0 1 3.254-3.254Z",
						fill: "currentColor",
						stroke: "currentColor",
						strokeWidth: "1.25",
					}),
				}),
				(0, f.jsx)("g", {
					mask: "url(#FillHachureIcon)",
					children: (0, f.jsx)("path", {
						d: "M2.258 15.156 15.156 2.258M7.324 20.222 20.222 7.325m-20.444 5.35L12.675-.222m-8.157 18.34L17.416 5.22",
						stroke: "currentColor",
						strokeWidth: "1.25",
						strokeLinecap: "round",
						strokeLinejoin: "round",
					}),
				}),
			],
		}),
		G,
	),
	wS = v(
		(0, f.jsxs)(f.Fragment, {
			children: [
				(0, f.jsxs)("g", {
					clipPath: "url(#a)",
					children: [
						(0, f.jsx)("path", {
							d: "M5.879 2.625h8.242a3.254 3.254 0 0 1 3.254 3.254v8.242a3.254 3.254 0 0 1-3.254 3.254H5.88a3.254 3.254 0 0 1-3.254-3.254V5.88a3.254 3.254 0 0 1 3.254-3.254Z",
							stroke: "currentColor",
							strokeWidth: "1.25",
						}),
						(0, f.jsx)("mask", {
							id: "FillCrossHatchIcon",
							style: { maskType: "alpha" },
							maskUnits: "userSpaceOnUse",
							x: -1,
							y: -1,
							width: 22,
							height: 22,
							children: (0, f.jsx)("path", {
								d: "M2.426 15.044 15.044 2.426M7.383 20 20 7.383M0 12.617 12.617 0m-7.98 17.941L17.256 5.324m-2.211 12.25L2.426 4.956M20 12.617 7.383 0m5.234 20L0 7.383m17.941 7.98L5.324 2.745",
								stroke: "currentColor",
								strokeWidth: "1.25",
								strokeLinecap: "round",
								strokeLinejoin: "round",
							}),
						}),
						(0, f.jsx)("g", {
							mask: "url(#FillCrossHatchIcon)",
							children: (0, f.jsx)("path", {
								d: "M14.121 2H5.88A3.879 3.879 0 0 0 2 5.879v8.242A3.879 3.879 0 0 0 5.879 18h8.242A3.879 3.879 0 0 0 18 14.121V5.88A3.879 3.879 0 0 0 14.121 2Z",
								fill: "currentColor",
							}),
						}),
					],
				}),
				(0, f.jsx)("defs", {
					children: (0, f.jsx)("clipPath", {
						id: "a",
						children: (0, f.jsx)("path", { fill: "#fff", d: "M0 0h20v20H0z" }),
					}),
				}),
			],
		}),
		G,
	),
	IS = v(
		(0, f.jsxs)(f.Fragment, {
			children: [
				(0, f.jsx)("g", {
					clipPath: "url(#a)",
					children: (0, f.jsx)("path", {
						d: "M4.91 2.625h10.18a2.284 2.284 0 0 1 2.285 2.284v10.182a2.284 2.284 0 0 1-2.284 2.284H4.909a2.284 2.284 0 0 1-2.284-2.284V4.909a2.284 2.284 0 0 1 2.284-2.284Z",
						stroke: "currentColor",
						strokeWidth: "1.25",
					}),
				}),
				(0, f.jsx)("defs", {
					children: (0, f.jsx)("clipPath", {
						id: "a",
						children: (0, f.jsx)("path", { fill: "#fff", d: "M0 0h20v20H0z" }),
					}),
				}),
			],
		}),
		{ ...G, fill: "currentColor" },
	),
	TS = v(
		(0, f.jsx)(f.Fragment, {
			children: (0, f.jsx)("path", {
				d: "M4.167 10h11.666",
				stroke: "currentColor",
				strokeWidth: "1.25",
				strokeLinecap: "round",
				strokeLinejoin: "round",
			}),
		}),
		G,
	),
	RS = v(
		(0, f.jsx)("path", {
			d: "M5 10h10",
			stroke: "currentColor",
			strokeWidth: "2.5",
			strokeLinecap: "round",
			strokeLinejoin: "round",
		}),
		G,
	),
	vS = v(
		(0, f.jsx)("path", {
			d: "M5 10h10",
			stroke: "currentColor",
			strokeWidth: "3.75",
			strokeLinecap: "round",
			strokeLinejoin: "round",
		}),
		G,
	),
	MS = Ye.default.memo(({ theme: e }) =>
		v(
			(0, f.jsx)("path", {
				d: "M6 10H34",
				stroke: Dt(e),
				strokeWidth: 2,
				fill: "none",
				strokeLinecap: "round",
			}),
			{ width: 40, height: 20 },
		),
	),
	_S = v(
		(0, f.jsxs)("g", {
			strokeWidth: "2",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M5 12h2" }),
				(0, f.jsx)("path", { d: "M17 12h2" }),
				(0, f.jsx)("path", { d: "M11 12h2" }),
			],
		}),
		O,
	),
	LS = v(
		(0, f.jsxs)("g", {
			strokeWidth: "2",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M4 12v.01" }),
				(0, f.jsx)("path", { d: "M8 12v.01" }),
				(0, f.jsx)("path", { d: "M12 12v.01" }),
				(0, f.jsx)("path", { d: "M16 12v.01" }),
				(0, f.jsx)("path", { d: "M20 12v.01" }),
			],
		}),
		O,
	),
	DS = v(
		(0, f.jsx)("path", {
			d: "M2.5 12.038c1.655-.885 5.9-3.292 8.568-4.354 2.668-1.063.101 2.821 1.32 3.104 1.218.283 5.112-1.814 5.112-1.814",
			strokeWidth: "1.25",
		}),
		G,
	),
	SS = v(
		(0, f.jsx)("path", {
			d: "M2.5 12.563c1.655-.886 5.9-3.293 8.568-4.355 2.668-1.062.101 2.822 1.32 3.105 1.218.283 5.112-1.814 5.112-1.814m-13.469 2.23c2.963-1.586 6.13-5.62 7.468-4.998 1.338.623-1.153 4.11-.132 5.595 1.02 1.487 6.133-1.43 6.133-1.43",
			strokeWidth: "1.25",
		}),
		G,
	),
	$S = v(
		(0, f.jsx)("path", {
			d: "M2.5 11.936c1.737-.879 8.627-5.346 10.42-5.268 1.795.078-.418 5.138.345 5.736.763.598 3.53-1.789 4.235-2.147M2.929 9.788c1.164-.519 5.47-3.28 6.987-3.114 1.519.165 1 3.827 2.121 4.109 1.122.281 3.839-2.016 4.606-2.42",
			strokeWidth: "1.25",
		}),
		G,
	),
	NS = v(
		(0, f.jsxs)("svg", {
			strokeWidth: "1.5",
			children: [
				(0, f.jsx)("path", {
					d: "M3.33334 9.99998V6.66665C3.33334 6.04326 3.33403 4.9332 3.33539 3.33646C4.95233 3.33436 6.06276 3.33331 6.66668 3.33331H10",
				}),
				(0, f.jsx)("path", { d: "M13.3333 3.33331V3.34331" }),
				(0, f.jsx)("path", { d: "M16.6667 3.33331V3.34331" }),
				(0, f.jsx)("path", { d: "M16.6667 6.66669V6.67669" }),
				(0, f.jsx)("path", { d: "M16.6667 10V10.01" }),
				(0, f.jsx)("path", { d: "M3.33334 13.3333V13.3433" }),
				(0, f.jsx)("path", { d: "M16.6667 13.3333V13.3433" }),
				(0, f.jsx)("path", { d: "M3.33334 16.6667V16.6767" }),
				(0, f.jsx)("path", { d: "M6.66666 16.6667V16.6767" }),
				(0, f.jsx)("path", { d: "M10 16.6667V16.6767" }),
				(0, f.jsx)("path", { d: "M13.3333 16.6667V16.6767" }),
				(0, f.jsx)("path", { d: "M16.6667 16.6667V16.6767" }),
			],
		}),
		G,
	),
	PS = v(
		(0, f.jsxs)("g", {
			strokeWidth: "1.5",
			stroke: "currentColor",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M4 12v-4a4 4 0 0 1 4 -4h4" }),
				(0, f.jsx)("line", { x1: "16", y1: "4", x2: "16", y2: "4.01" }),
				(0, f.jsx)("line", { x1: "20", y1: "4", x2: "20", y2: "4.01" }),
				(0, f.jsx)("line", { x1: "20", y1: "8", x2: "20", y2: "8.01" }),
				(0, f.jsx)("line", { x1: "20", y1: "12", x2: "20", y2: "12.01" }),
				(0, f.jsx)("line", { x1: "4", y1: "16", x2: "4", y2: "16.01" }),
				(0, f.jsx)("line", { x1: "20", y1: "16", x2: "20", y2: "16.01" }),
				(0, f.jsx)("line", { x1: "4", y1: "20", x2: "4", y2: "20.01" }),
				(0, f.jsx)("line", { x1: "8", y1: "20", x2: "8", y2: "20.01" }),
				(0, f.jsx)("line", { x1: "12", y1: "20", x2: "12", y2: "20.01" }),
				(0, f.jsx)("line", { x1: "16", y1: "20", x2: "16", y2: "20.01" }),
				(0, f.jsx)("line", { x1: "20", y1: "20", x2: "20", y2: "20.01" }),
			],
		}),
		O,
	),
	FS = v(
		(0, f.jsx)("path", {
			d: "M6 10H34",
			stroke: "currentColor",
			strokeWidth: 2,
			fill: "none",
		}),
		{ width: 40, height: 20 },
	),
	OS = Ye.default.memo(({ flip: e = !1 }) =>
		v(
			(0, f.jsxs)("g", {
				transform: e ? "translate(40, 0) scale(-1, 1)" : "",
				stroke: "currentColor",
				strokeWidth: 2,
				fill: "none",
				children: [
					(0, f.jsx)("path", { d: "M34 10H6M34 10L27 5M34 10L27 15" }),
					(0, f.jsx)("path", { d: "M27.5 5L34.5 10L27.5 15" }),
				],
			}),
			{ width: 40, height: 20 },
		),
	),
	AS = Ye.default.memo(({ flip: e = !1 }) =>
		v(
			(0, f.jsxs)("g", {
				stroke: "currentColor",
				fill: "currentColor",
				transform: e ? "translate(40, 0) scale(-1, 1)" : "",
				children: [
					(0, f.jsx)("path", { d: "M32 10L6 10", strokeWidth: 2 }),
					(0, f.jsx)("circle", { r: "4", transform: "matrix(-1 0 0 1 30 10)" }),
				],
			}),
			{ width: 40, height: 20 },
		),
	),
	BS = Ye.default.memo(({ flip: e = !1 }) =>
		v(
			(0, f.jsxs)("g", {
				stroke: "currentColor",
				fill: "none",
				transform: e ? "translate(40, 0) scale(-1, 1)" : "",
				strokeWidth: 2,
				children: [
					(0, f.jsx)("path", { d: "M26 10L6 10" }),
					(0, f.jsx)("circle", { r: "4", transform: "matrix(-1 0 0 1 30 10)" }),
				],
			}),
			{ width: 40, height: 20 },
		),
	),
	CS = Ye.default.memo(({ flip: e = !1 }) =>
		v(
			(0, f.jsx)("g", {
				transform: e ? "translate(40, 0) scale(-1, 1)" : "",
				children: (0, f.jsx)("path", {
					d: "M34 10H5.99996M34 10L34 5M34 10L34 15",
					stroke: "currentColor",
					strokeWidth: 2,
					fill: "none",
				}),
			}),
			{ width: 40, height: 20 },
		),
	),
	KS = Ye.default.memo(({ flip: e = !1 }) =>
		v(
			(0, f.jsxs)("g", {
				stroke: "currentColor",
				fill: "currentColor",
				transform: e ? "translate(40, 0) scale(-1, 1)" : "",
				children: [
					(0, f.jsx)("path", { d: "M32 10L6 10", strokeWidth: 2 }),
					(0, f.jsx)("path", { d: "M27.5 5.5L34.5 10L27.5 14.5L27.5 5.5" }),
				],
			}),
			{ width: 40, height: 20 },
		),
	),
	HS = Ye.default.memo(({ flip: e = !1 }) =>
		v(
			(0, f.jsxs)("g", {
				stroke: "currentColor",
				fill: "none",
				transform: e ? "translate(40, 0) scale(-1, 1)" : "",
				strokeWidth: 2,
				strokeLinejoin: "round",
				children: [
					(0, f.jsx)("path", { d: "M6,9.5H27" }),
					(0, f.jsx)("path", { d: "M27,5L34,10L27,14Z", fill: "none" }),
				],
			}),
			{ width: 40, height: 20 },
		),
	),
	JS = Ye.default.memo(({ flip: e = !1 }) =>
		v(
			(0, f.jsxs)("g", {
				stroke: "currentColor",
				fill: "currentColor",
				transform: e ? "translate(40, 0) scale(-1, 1)" : "",
				strokeLinejoin: "round",
				strokeWidth: 2,
				children: [
					(0, f.jsx)("path", { d: "M6,9.5H20" }),
					(0, f.jsx)("path", { d: "M27,5L34,10L27,14L20,9.5Z" }),
				],
			}),
			{ width: 40, height: 20 },
		),
	),
	kS = Ye.default.memo(({ flip: e = !1 }) =>
		v(
			(0, f.jsxs)("g", {
				stroke: "currentColor",
				fill: "none",
				transform: e ? "translate(40, 0) scale(-1, 1)" : "",
				strokeLinejoin: "round",
				strokeWidth: 2,
				children: [
					(0, f.jsx)("path", { d: "M6,9.5H20" }),
					(0, f.jsx)("path", { d: "M27,5L34,10L27,14L20,9.5Z" }),
				],
			}),
			{ width: 40, height: 20 },
		),
	),
	YS = v(
		(0, f.jsxs)(f.Fragment, {
			children: [
				(0, f.jsx)("g", {
					clipPath: "url(#a)",
					children: (0, f.jsx)("path", {
						d: "M14.167 6.667a3.333 3.333 0 0 0-3.334-3.334H9.167a3.333 3.333 0 0 0 0 6.667h1.666a3.333 3.333 0 0 1 0 6.667H9.167a3.333 3.333 0 0 1-3.334-3.334",
						stroke: "currentColor",
						strokeWidth: "1.25",
						strokeLinecap: "round",
						strokeLinejoin: "round",
					}),
				}),
				(0, f.jsx)("defs", {
					children: (0, f.jsx)("clipPath", {
						id: "a",
						children: (0, f.jsx)("path", { fill: "#fff", d: "M0 0h20v20H0z" }),
					}),
				}),
			],
		}),
		G,
	),
	VS = v(
		(0, f.jsxs)(f.Fragment, {
			children: [
				(0, f.jsx)("g", {
					clipPath: "url(#a)",
					children: (0, f.jsx)("path", {
						d: "M5 16.667V3.333L10 15l5-11.667v13.334",
						stroke: "currentColor",
						strokeWidth: "1.25",
						strokeLinecap: "round",
						strokeLinejoin: "round",
					}),
				}),
				(0, f.jsx)("defs", {
					children: (0, f.jsx)("clipPath", {
						id: "a",
						children: (0, f.jsx)("path", { fill: "#fff", d: "M0 0h20v20H0z" }),
					}),
				}),
			],
		}),
		G,
	),
	qS = v(
		(0, f.jsxs)(f.Fragment, {
			children: [
				(0, f.jsx)("g", {
					clipPath: "url(#a)",
					children: (0, f.jsx)("path", {
						d: "M5.833 3.333v13.334h8.334",
						stroke: "currentColor",
						strokeWidth: "1.25",
						strokeLinecap: "round",
						strokeLinejoin: "round",
					}),
				}),
				(0, f.jsx)("defs", {
					children: (0, f.jsx)("clipPath", {
						id: "a",
						children: (0, f.jsx)("path", { fill: "#fff", d: "M0 0h20v20H0z" }),
					}),
				}),
			],
		}),
		G,
	),
	GS = v(
		(0, f.jsx)(f.Fragment, {
			children: (0, f.jsx)("path", {
				d: "m1.667 3.333 6.666 13.334M8.333 3.333 1.667 16.667M11.667 3.333v13.334h6.666",
				stroke: "currentColor",
				strokeWidth: "1.25",
				strokeLinecap: "round",
				strokeLinejoin: "round",
			}),
		}),
		G,
	),
	XS = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.25,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M3 7v-2h13v2" }),
				(0, f.jsx)("path", { d: "M10 5v14" }),
				(0, f.jsx)("path", { d: "M12 19h-4" }),
				(0, f.jsx)("path", { d: "M15 13v-1h6v1" }),
				(0, f.jsx)("path", { d: "M18 12v7" }),
				(0, f.jsx)("path", { d: "M17 19h2" }),
			],
		}),
		O,
	),
	$2 = v(
		(0, f.jsx)(f.Fragment, {
			children: (0, f.jsxs)("g", {
				stroke: "currentColor",
				strokeWidth: "1.25",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: [
					(0, f.jsx)("path", {
						stroke: "none",
						d: "M0 0h24v24H0z",
						fill: "none",
					}),
					(0, f.jsx)("path", { d: "M7 12h10" }),
					(0, f.jsx)("path", { d: "M7 5v14" }),
					(0, f.jsx)("path", { d: "M17 5v14" }),
					(0, f.jsx)("path", { d: "M15 19h4" }),
					(0, f.jsx)("path", { d: "M15 5h4" }),
					(0, f.jsx)("path", { d: "M5 19h4" }),
					(0, f.jsx)("path", { d: "M5 5h4" }),
				],
			}),
		}),
		O,
	),
	il = v(
		(0, f.jsx)(f.Fragment, {
			children: (0, f.jsx)("g", {
				stroke: "currentColor",
				strokeWidth: "1.25",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: (0, f.jsx)("path", {
					d: "M5.833 16.667v-10a3.333 3.333 0 0 1 3.334-3.334h1.666a3.333 3.333 0 0 1 3.334 3.334v10M5.833 10.833h8.334",
				}),
			}),
		}),
		G,
	),
	sl = v(
		(0, f.jsxs)(f.Fragment, {
			children: [
				(0, f.jsx)("g", {
					clipPath: "url(#a)",
					stroke: "currentColor",
					strokeWidth: "1.25",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					children: (0, f.jsx)("path", {
						d: "M5.833 6.667 2.5 10l3.333 3.333M14.167 6.667 17.5 10l-3.333 3.333M11.667 3.333 8.333 16.667",
					}),
				}),
				(0, f.jsx)("defs", {
					children: (0, f.jsx)("clipPath", {
						id: "a",
						children: (0, f.jsx)("path", { fill: "#fff", d: "M0 0h20v20H0z" }),
					}),
				}),
			],
		}),
		G,
	),
	ZS = v(
		(0, f.jsxs)("g", {
			stroke: "currentColor",
			fill: "none",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			strokeWidth: 2,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("line", { x1: "4", y1: "8", x2: "20", y2: "8" }),
				(0, f.jsx)("line", { x1: "4", y1: "12", x2: "12", y2: "12" }),
				(0, f.jsx)("line", { x1: "4", y1: "16", x2: "16", y2: "16" }),
			],
		}),
		O,
	),
	WS = v(
		(0, f.jsxs)("g", {
			stroke: "currentColor",
			fill: "none",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("line", { x1: "4", y1: "8", x2: "20", y2: "8" }),
				(0, f.jsx)("line", { x1: "8", y1: "12", x2: "16", y2: "12" }),
				(0, f.jsx)("line", { x1: "6", y1: "16", x2: "18", y2: "16" }),
			],
		}),
		O,
	),
	zS = v(
		(0, f.jsxs)("g", {
			stroke: "currentColor",
			fill: "none",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("line", { x1: "4", y1: "8", x2: "20", y2: "8" }),
				(0, f.jsx)("line", { x1: "10", y1: "12", x2: "20", y2: "12" }),
				(0, f.jsx)("line", { x1: "8", y1: "16", x2: "20", y2: "16" }),
			],
		}),
		O,
	),
	QS = Ye.default.memo(({ theme: e }) =>
		v(
			(0, f.jsxs)("g", {
				strokeWidth: "1.5",
				stroke: "currentColor",
				fill: "none",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: [
					(0, f.jsx)("path", {
						stroke: "none",
						d: "M0 0h24v24H0z",
						fill: "none",
					}),
					(0, f.jsx)("line", { x1: "4", y1: "4", x2: "20", y2: "4" }),
					(0, f.jsx)("rect", {
						x: "9",
						y: "8",
						width: "6",
						height: "12",
						rx: "2",
					}),
				],
			}),
			O,
		),
	),
	jS = Ye.default.memo(({ theme: e }) =>
		v(
			(0, f.jsxs)("g", {
				strokeWidth: "2",
				stroke: "currentColor",
				fill: "none",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: [
					(0, f.jsx)("path", {
						stroke: "none",
						d: "M0 0h24v24H0z",
						fill: "none",
					}),
					(0, f.jsx)("line", { x1: "4", y1: "20", x2: "20", y2: "20" }),
					(0, f.jsx)("rect", {
						x: "9",
						y: "4",
						width: "6",
						height: "12",
						rx: "2",
					}),
				],
			}),
			O,
		),
	),
	e$ = Ye.default.memo(({ theme: e }) =>
		v(
			(0, f.jsxs)("g", {
				strokeWidth: "1.5",
				stroke: "currentColor",
				fill: "none",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: [
					(0, f.jsx)("path", {
						stroke: "none",
						d: "M0 0h24v24H0z",
						fill: "none",
					}),
					(0, f.jsx)("line", { x1: "4", y1: "12", x2: "9", y2: "12" }),
					(0, f.jsx)("line", { x1: "15", y1: "12", x2: "20", y2: "12" }),
					(0, f.jsx)("rect", {
						x: "9",
						y: "6",
						width: "6",
						height: "12",
						rx: "2",
					}),
				],
			}),
			O,
		),
	),
	t$ = v(
		(0, f.jsxs)("g", {
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M21 19h-18l9 -15" }),
				(0, f.jsx)("path", { d: "M20.615 15.171h.015" }),
				(0, f.jsx)("path", { d: "M19.515 11.771h.015" }),
				(0, f.jsx)("path", { d: "M17.715 8.671h.015" }),
				(0, f.jsx)("path", { d: "M15.415 5.971h.015" }),
			],
		}),
		O,
	),
	n$ = v(
		(0, f.jsx)("path", {
			d: "M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z",
			fill: "currentColor",
		}),
		{ width: 640, height: 512 },
	),
	r$ = v(
		(0, f.jsx)("path", {
			d: "M480 416C497.7 416 512 430.3 512 448C512 465.7 497.7 480 480 480H150.6C133.7 480 117.4 473.3 105.4 461.3L25.37 381.3C.3786 356.3 .3786 315.7 25.37 290.7L258.7 57.37C283.7 32.38 324.3 32.38 349.3 57.37L486.6 194.7C511.6 219.7 511.6 260.3 486.6 285.3L355.9 416H480zM265.4 416L332.7 348.7L195.3 211.3L70.63 336L150.6 416L265.4 416z",
		}),
	),
	o$ = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.25,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M8 13v-7.5a1.5 1.5 0 0 1 3 0v6.5" }),
				(0, f.jsx)("path", { d: "M11 5.5v-2a1.5 1.5 0 1 1 3 0v8.5" }),
				(0, f.jsx)("path", { d: "M14 5.5a1.5 1.5 0 0 1 3 0v6.5" }),
				(0, f.jsx)("path", {
					d: "M17 7.5a1.5 1.5 0 0 1 3 0v8.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47",
				}),
			],
		}),
		O,
	),
	a$ = v(
		(0, f.jsxs)(f.Fragment, {
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" }),
				(0, f.jsx)("path", { d: "M7 11l5 5l5 -5" }),
				(0, f.jsx)("path", { d: "M12 4l0 12" }),
			],
		}),
		O,
	),
	i$ = v(
		(0, f.jsxs)(f.Fragment, {
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", {
					d: "M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z",
				}),
				(0, f.jsx)("path", {
					d: "M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2",
				}),
			],
		}),
		O,
	),
	s$ = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.25,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M7 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" }),
				(0, f.jsx)("path", { d: "M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" }),
				(0, f.jsx)("path", { d: "M9.15 14.85l8.85 -10.85" }),
				(0, f.jsx)("path", { d: "M6 4l8.85 10.85" }),
			],
		}),
		O,
	),
	c$ = v(
		(0, f.jsxs)(f.Fragment, {
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" }),
				(0, f.jsx)("path", { d: "M12 17l0 .01" }),
				(0, f.jsx)("path", {
					d: "M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4",
				}),
			],
		}),
		O,
	),
	l$ = v(
		(0, f.jsxs)(f.Fragment, {
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M7 4v16l13 -8z" }),
			],
		}),
		O,
	),
	d$ = v(
		(0, f.jsxs)(f.Fragment, {
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", {
					d: "M17 4h-10a3 3 0 0 0 -3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3 -3v-10a3 3 0 0 0 -3 -3z",
					strokeWidth: "0",
					fill: "currentColor",
				}),
			],
		}),
		O,
	),
	U$ = v(
		(0, f.jsxs)(f.Fragment, {
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M5 12l5 5l10 -10" }),
			],
		}),
		O,
	),
	f$ = v(
		(0, f.jsxs)(f.Fragment, {
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", {
					d: "M10.24 3.957l-8.422 14.06a1.989 1.989 0 0 0 1.7 2.983h16.845a1.989 1.989 0 0 0 1.7 -2.983l-8.423 -14.06a1.989 1.989 0 0 0 -3.4 0z",
				}),
				(0, f.jsx)("path", { d: "M12 9v4" }),
				(0, f.jsx)("path", { d: "M12 17h.01" }),
			],
		}),
		O,
	),
	u$ = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.25,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M11 7l6 6" }),
				(0, f.jsx)("path", {
					d: "M4 16l11.7 -11.7a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-11.7 11.7h-4v-4z",
				}),
			],
		}),
		O,
	),
	p$ = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.5,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M12 3l-4 7h8z" }),
				(0, f.jsx)("path", { d: "M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" }),
				(0, f.jsx)("path", {
					d: "M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z",
				}),
			],
		}),
		O,
	),
	m$ = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.5,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M4 7l16 0" }),
				(0, f.jsx)("path", { d: "M4 17l16 0" }),
				(0, f.jsx)("path", { d: "M7 4l0 16" }),
				(0, f.jsx)("path", { d: "M17 4l0 16" }),
			],
		}),
		O,
	),
	h$ = v(
		(0, f.jsx)("path", {
			fill: "currentColor",
			d: "M407.48,111.18C335.587,108.103 269.573,152.338 245.08,220C220.587,152.338 154.573,108.103 82.68,111.18C80.285,168.229 107.577,222.632 154.74,254.82C178.908,271.419 193.35,298.951 193.27,328.27L193.27,379.13L296.9,379.13L296.9,328.27C296.816,298.953 311.255,271.42 335.42,254.82C382.596,222.644 409.892,168.233 407.48,111.18Z",
		}),
	),
	b$ = v(
		(0, f.jsxs)("g", {
			strokeWidth: "1.25",
			children: [
				(0, f.jsx)("path", { d: "M4.16602 10H15.8327" }),
				(0, f.jsx)("path", { d: "M12.5 13.3333L15.8333 10" }),
				(0, f.jsx)("path", { d: "M12.5 6.66666L15.8333 9.99999" }),
			],
		}),
		G,
	),
	g$ = v(
		(0, f.jsxs)("g", {
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.25",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			transform: "rotate(90 10 10)",
			children: [
				(0, f.jsx)("path", {
					clipRule: "evenodd",
					d: "m9.644 13.69 7.774-7.773a2.357 2.357 0 0 0-3.334-3.334l-7.773 7.774L8 12l1.643 1.69Z",
				}),
				(0, f.jsx)("path", {
					d: "m13.25 3.417 3.333 3.333M10 10l2-2M5 15l3-3M2.156 17.894l1-1M5.453 19.029l-.144-1.407M2.377 11.887l.866 1.118M8.354 17.273l-1.194-.758M.953 14.652l1.408.13",
				}),
			],
		}),
		20,
	),
	E$ = v(
		(0, f.jsxs)("g", {
			stroke: "currentColor",
			fill: "none",
			children: [
				(0, f.jsx)("path", { stroke: "none", d: "M0 0h24v24H0z" }),
				(0, f.jsx)("path", { d: "M6 21l15 -15l-3 -3l-15 15l3 3" }),
				(0, f.jsx)("path", { d: "M15 6l3 3" }),
				(0, f.jsx)("path", {
					d: "M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2",
				}),
				(0, f.jsx)("path", {
					d: "M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2",
				}),
			],
		}),
		O,
	),
	x$ = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.25,
			children: [
				(0, f.jsx)("path", { stroke: "none", d: "M0 0h24v24H0z" }),
				(0, f.jsx)("path", { d: "M6 21l15 -15l-3 -3l-15 15l3 3" }),
				(0, f.jsx)("path", { d: "M15 6l3 3" }),
				(0, f.jsx)("path", {
					d: "M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2",
				}),
				(0, f.jsx)("path", {
					d: "M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2",
				}),
			],
		}),
		O,
	),
	y$ = v(
		(0, f.jsxs)("g", {
			stroke: "currentColor",
			fill: "none",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", {
					d: "M11.217 19.384a3.501 3.501 0 0 0 6.783 -1.217v-5.167l-6 -3.35",
				}),
				(0, f.jsx)("path", {
					d: "M5.214 15.014a3.501 3.501 0 0 0 4.446 5.266l4.34 -2.534v-6.946",
				}),
				(0, f.jsx)("path", {
					d: "M6 7.63c-1.391 -.236 -2.787 .395 -3.534 1.689a3.474 3.474 0 0 0 1.271 4.745l4.263 2.514l6 -3.348",
				}),
				(0, f.jsx)("path", {
					d: "M12.783 4.616a3.501 3.501 0 0 0 -6.783 1.217v5.067l6 3.45",
				}),
				(0, f.jsx)("path", {
					d: "M18.786 8.986a3.501 3.501 0 0 0 -4.446 -5.266l-4.34 2.534v6.946",
				}),
				(0, f.jsx)("path", {
					d: "M18 16.302c1.391 .236 2.787 -.395 3.534 -1.689a3.474 3.474 0 0 0 -1.271 -4.745l-4.308 -2.514l-5.955 3.42",
				}),
			],
		}),
		O,
	),
	w$ = v(
		(0, f.jsxs)("g", {
			stroke: "currentColor",
			fill: "none",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M4 8v-2a2 2 0 0 1 2 -2h2" }),
				(0, f.jsx)("path", { d: "M4 16v2a2 2 0 0 0 2 2h2" }),
				(0, f.jsx)("path", { d: "M16 4h2a2 2 0 0 1 2 2v2" }),
				(0, f.jsx)("path", { d: "M16 20h2a2 2 0 0 0 2 -2v-2" }),
			],
		}),
		O,
	),
	I$ = v(
		(0, f.jsxs)("g", {
			stroke: "currentColor",
			fill: "none",
			strokeWidth: 1.5,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" }),
				(0, f.jsx)("path", {
					d: "M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6",
				}),
			],
		}),
		O,
	),
	T$ = v(
		(0, f.jsxs)("g", {
			stroke: "currentColor",
			fill: "none",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M10.585 10.587a2 2 0 0 0 2.829 2.828" }),
				(0, f.jsx)("path", {
					d: "M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87",
				}),
				(0, f.jsx)("path", { d: "M3 3l18 18" }),
			],
		}),
		O,
	),
	R$ = v(
		(0, f.jsxs)("g", {
			stroke: "currentColor",
			fill: "none",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", {
					d: "M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8",
				}),
				(0, f.jsx)("path", {
					d: "M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8",
				}),
				(0, f.jsx)("path", { d: "M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" }),
				(0, f.jsx)("path", { d: "M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" }),
				(0, f.jsx)("path", { d: "M6.5 16a3.5 3.5 0 0 1 0 -7h.5" }),
				(0, f.jsx)("path", { d: "M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" }),
			],
		}),
		O,
	),
	v$ = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.25,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", {
					d: "M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8",
				}),
				(0, f.jsx)("path", {
					d: "M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8",
				}),
				(0, f.jsx)("path", { d: "M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" }),
				(0, f.jsx)("path", { d: "M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" }),
				(0, f.jsx)("path", { d: "M6.5 16a3.5 3.5 0 0 1 0 -7h.5" }),
				(0, f.jsx)("path", { d: "M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" }),
			],
		}),
		O,
	),
	M$ = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.5,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" }),
				(0, f.jsx)("path", { d: "M21 21l-6 -6" }),
			],
		}),
		O,
	),
	_$ = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.5,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M20.984 12.53a9 9 0 1 0 -7.552 8.355" }),
				(0, f.jsx)("path", { d: "M12 7v5l3 3" }),
				(0, f.jsx)("path", { d: "M19 16l-2 3h4l-2 3" }),
			],
		}),
		O,
	),
	L$ = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.5,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", {
					d: "M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z",
				}),
				(0, f.jsx)("path", { d: "M5 10a7 7 0 0 0 14 0" }),
				(0, f.jsx)("path", { d: "M8 21l8 0" }),
				(0, f.jsx)("path", { d: "M12 17l0 4" }),
			],
		}),
		O,
	),
	D$ = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.5,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M3 3l18 18" }),
				(0, f.jsx)("path", {
					d: "M9 5a3 3 0 0 1 6 0v5a3 3 0 0 1 -.13 .874m-2 2a3 3 0 0 1 -3.87 -2.872v-1",
				}),
				(0, f.jsx)("path", {
					d: "M5 10a7 7 0 0 0 10.846 5.85m2 -2a6.967 6.967 0 0 0 1.152 -3.85",
				}),
				(0, f.jsx)("path", { d: "M8 21l8 0" }),
				(0, f.jsx)("path", { d: "M12 17l0 4" }),
			],
		}),
		O,
	),
	S$ = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.25,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11" }),
			],
		}),
		O,
	),
	$$ = v(
		(0, f.jsxs)("g", {
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", {
					d: "M8 8m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z",
				}),
				(0, f.jsx)("path", { d: "M12 20v.01" }),
				(0, f.jsx)("path", { d: "M16 20v.01" }),
				(0, f.jsx)("path", { d: "M8 20v.01" }),
				(0, f.jsx)("path", { d: "M4 20v.01" }),
				(0, f.jsx)("path", { d: "M4 16v.01" }),
				(0, f.jsx)("path", { d: "M4 12v.01" }),
				(0, f.jsx)("path", { d: "M4 8v.01" }),
				(0, f.jsx)("path", { d: "M4 4v.01" }),
				(0, f.jsx)("path", { d: "M8 4v.01" }),
				(0, f.jsx)("path", { d: "M12 4v.01" }),
				(0, f.jsx)("path", { d: "M16 4v.01" }),
				(0, f.jsx)("path", { d: "M20 4v.01" }),
				(0, f.jsx)("path", { d: "M20 8v.01" }),
				(0, f.jsx)("path", { d: "M20 12v.01" }),
				(0, f.jsx)("path", { d: "M20 16v.01" }),
				(0, f.jsx)("path", { d: "M20 20v.01" }),
			],
		}),
		O,
	),
	N$ = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.25,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M5 3v18" }),
				(0, f.jsx)("path", { d: "M19 21v-18" }),
				(0, f.jsx)("path", { d: "M5 7h14" }),
				(0, f.jsx)("path", { d: "M5 15h14" }),
				(0, f.jsx)("path", { d: "M8 13v4" }),
				(0, f.jsx)("path", { d: "M11 13v4" }),
				(0, f.jsx)("path", { d: "M16 13v4" }),
				(0, f.jsx)("path", { d: "M14 5v4" }),
				(0, f.jsx)("path", { d: "M11 5v4" }),
				(0, f.jsx)("path", { d: "M8 5v4" }),
				(0, f.jsx)("path", { d: "M3 21h18" }),
			],
		}),
		O,
	),
	P$ = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.25,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M3 12l18 0" }),
				(0, f.jsx)("path", { d: "M7 16l10 0l-10 5l0 -5" }),
				(0, f.jsx)("path", { d: "M7 8l10 0l-10 -5l0 5" }),
			],
		}),
		O,
	),
	F$ = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.25,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M12 3l0 18" }),
				(0, f.jsx)("path", { d: "M16 7l0 10l5 0l-5 -10" }),
				(0, f.jsx)("path", { d: "M8 7l0 10l-5 0l5 -10" }),
			],
		}),
		O,
	),
	O$ = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.25,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", {
					d: "M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z",
				}),
				(0, f.jsx)("path", {
					d: "M19 6h1a2 2 0 0 1 2 2a5 5 0 0 1 -5 5l-5 0v2",
				}),
				(0, f.jsx)("path", {
					d: "M10 15m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z",
				}),
			],
		}),
		O,
	),
	A$ = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.25,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M15 15m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" }),
				(0, f.jsx)("path", { d: "M22 22l-3 -3" }),
				(0, f.jsx)("path", { d: "M6 18h-1a2 2 0 0 1 -2 -2v-1" }),
				(0, f.jsx)("path", { d: "M3 11v-1" }),
				(0, f.jsx)("path", { d: "M3 6v-1a2 2 0 0 1 2 -2h1" }),
				(0, f.jsx)("path", { d: "M10 3h1" }),
				(0, f.jsx)("path", { d: "M15 3h1a2 2 0 0 1 2 2v1" }),
			],
		}),
		O,
	),
	B$ = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.25,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M14 3v4a1 1 0 0 0 1 1h4" }),
				(0, f.jsx)("path", { d: "M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" }),
				(0, f.jsx)("path", {
					d: "M4 20.25c0 .414 .336 .75 .75 .75h1.25a1 1 0 0 0 1 -1v-1a1 1 0 0 0 -1 -1h-1a1 1 0 0 1 -1 -1v-1a1 1 0 0 1 1 -1h1.25a.75 .75 0 0 1 .75 .75",
				}),
				(0, f.jsx)("path", { d: "M10 15l2 6l2 -6" }),
				(0, f.jsx)("path", {
					d: "M20 15h-1a2 2 0 0 0 -2 2v2a2 2 0 0 0 2 2h1v-3",
				}),
			],
		}),
		O,
	),
	C$ = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.25,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M14 3v4a1 1 0 0 0 1 1h4" }),
				(0, f.jsx)("path", { d: "M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" }),
				(0, f.jsx)("path", {
					d: "M20 15h-1a2 2 0 0 0 -2 2v2a2 2 0 0 0 2 2h1v-3",
				}),
				(0, f.jsx)("path", { d: "M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" }),
				(0, f.jsx)("path", { d: "M11 21v-6l3 6v-6" }),
			],
		}),
		O,
	),
	K$ = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.25,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", {
					d: "M4 13v-8a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v8a2 2 0 0 0 6 0v-8a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v8a8 8 0 0 1 -16 0",
				}),
				(0, f.jsx)("path", { d: "M4 8l5 0" }),
				(0, f.jsx)("path", { d: "M15 8l4 0" }),
			],
		}),
		O,
	),
	H$ = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.25,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", {
					d: "M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1",
				}),
				(0, f.jsx)("path", { d: "M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" }),
				(0, f.jsx)("path", { d: "M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" }),
				(0, f.jsx)("path", {
					d: "M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5z",
				}),
				(0, f.jsx)("path", { d: "M16.746 16.726a3 3 0 1 0 .252 -5.555" }),
			],
		}),
		O,
	),
	J$ = v(
		(0, f.jsxs)("g", {
			stroke: "currentColor",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", {
					d: "M3 5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-16a1 1 0 0 1-1-1v-10zM7 20h10M9 16v4M15 16v4",
				}),
			],
		}),
		{ ...O, strokeWidth: 1.5 },
	),
	k$ = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.5,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", {
					d: "M15 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2",
				}),
				(0, f.jsx)("path", { d: "M21 12h-13l3 -3" }),
				(0, f.jsx)("path", { d: "M11 15l-3 -3" }),
			],
		}),
		O,
	),
	Y$ = v(
		(0, f.jsxs)("g", {
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", {
					d: "M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z",
				}),
				(0, f.jsx)("path", { d: "M10 9l5 3l-5 3z" }),
			],
		}),
		O,
	),
	V$ = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.5,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M3 6h18" }),
				(0, f.jsx)("path", { d: "M3 12h18" }),
				(0, f.jsx)("path", { d: "M3 18h18" }),
				(0, f.jsx)("path", { d: "M6 3v18" }),
				(0, f.jsx)("path", { d: "M12 3v18" }),
				(0, f.jsx)("path", { d: "M18 3v18" }),
			],
		}),
		O,
	),
	q$ = v(
		(0, f.jsxs)("g", {
			strokeWidth: 1.5,
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", {
					d: "M17 3m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z",
				}),
				(0, f.jsx)("path", {
					d: "M3 17m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z",
				}),
				(0, f.jsx)("path", { d: "M17 5c-6.627 0 -12 5.373 -12 12" }),
			],
		}),
		O,
	),
	G$ = v(
		(0, f.jsxs)("g", {
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M6 18l12 -12" }),
				(0, f.jsx)("path", { d: "M18 10v-4h-4" }),
			],
		}),
		O,
	),
	X$ = v(
		(0, f.jsxs)("g", {
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", {
					d: "M4,19L10,19C11.097,19 12,18.097 12,17L12,9C12,7.903 12.903,7 14,7L21,7",
				}),
				(0, f.jsx)("path", { d: "M18 4l3 3l-3 3" }),
			],
		}),
		O,
	),
	Z$ = v(
		(0, f.jsxs)("g", {
			children: [
				(0, f.jsx)("path", { d: "M16,12L20,9L16,6" }),
				(0, f.jsx)("path", { d: "M6 20c0 -6.075 4.925 -11 11 -11h3" }),
			],
		}),
		O,
	),
	W$ = v(
		(0, f.jsxs)("g", {
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M6 9l6 6l6 -6" }),
			],
		}),
		O,
	),
	z$ = v(
		(0, f.jsxs)("g", {
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M6 15l6 -6l6 6" }),
			],
		}),
		O,
	),
	Q$ = v(
		(0, f.jsxs)("g", {
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M6 15l6 -6l6 6" }),
			],
		}),
		O,
	),
	j$ = v(
		(0, f.jsxs)("g", {
			strokeWidth: "1.25",
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M8 5v10a1 1 0 0 0 1 1h10" }),
				(0, f.jsx)("path", { d: "M5 8h10a1 1 0 0 1 1 1v10" }),
			],
		}),
		O,
	),
	eN = v(
		(0, f.jsxs)("g", {
			children: [
				(0, f.jsx)("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none",
				}),
				(0, f.jsx)("path", { d: "M5 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" }),
				(0, f.jsx)("path", { d: "M19 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" }),
				(0, f.jsx)("path", { d: "M5 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" }),
				(0, f.jsx)("path", { d: "M19 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" }),
				(0, f.jsx)("path", { d: "M5 7l0 10" }),
				(0, f.jsx)("path", { d: "M7 5l10 0" }),
				(0, f.jsx)("path", { d: "M7 19l10 0" }),
				(0, f.jsx)("path", { d: "M19 7l0 10" }),
			],
		}),
		O,
	);
var pa = {
		[he.Excalifont]: {
			metrics: {
				unitsPerEm: 1e3,
				ascender: 886,
				descender: -374,
				lineHeight: 1.25,
			},
			icon: ua,
		},
		[he.Nunito]: {
			metrics: {
				unitsPerEm: 1e3,
				ascender: 1011,
				descender: -353,
				lineHeight: 1.35,
			},
			icon: il,
		},
		[he["Lilita One"]]: {
			metrics: {
				unitsPerEm: 1e3,
				ascender: 923,
				descender: -220,
				lineHeight: 1.15,
			},
			icon: $2,
		},
		[he["Comic Shanns"]]: {
			metrics: {
				unitsPerEm: 1e3,
				ascender: 750,
				descender: -250,
				lineHeight: 1.25,
			},
			icon: sl,
		},
		[he.Virgil]: {
			metrics: {
				unitsPerEm: 1e3,
				ascender: 886,
				descender: -374,
				lineHeight: 1.25,
			},
			icon: ua,
			deprecated: !0,
		},
		[he.Helvetica]: {
			metrics: {
				unitsPerEm: 2048,
				ascender: 1577,
				descender: -471,
				lineHeight: 1.15,
			},
			icon: il,
			deprecated: !0,
			local: !0,
		},
		[he.Cascadia]: {
			metrics: {
				unitsPerEm: 2048,
				ascender: 1900,
				descender: -480,
				lineHeight: 1.2,
			},
			icon: sl,
			deprecated: !0,
		},
		[he["Liberation Sans"]]: {
			metrics: {
				unitsPerEm: 2048,
				ascender: 1854,
				descender: -434,
				lineHeight: 1.15,
			},
			serverSide: !0,
		},
		[Yn.Xiaolai]: {
			metrics: {
				unitsPerEm: 1e3,
				ascender: 880,
				descender: -144,
				lineHeight: 1.15,
			},
			fallback: !0,
		},
		[Yn["Segoe UI Emoji"]]: {
			metrics: {
				unitsPerEm: 1e3,
				ascender: 886,
				descender: -374,
				lineHeight: 1.25,
			},
			local: !0,
			fallback: !0,
		},
	},
	_n = {
		LATIN:
			"U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
		LATIN_EXT:
			"U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
		CYRILIC_EXT:
			"U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F",
		CYRILIC: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116",
		VIETNAMESE:
			"U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB",
	},
	co = "local:";
E();
E();
E();
var qi = class extends Error {
		constructor(t = "Couldn't export canvas.", n = "CANVAS_ERROR") {
			super(), (this.name = n), (this.message = t);
		}
	},
	Gi = class extends DOMException {
		constructor(t = "Request Aborted") {
			super(t, "AbortError");
		}
	},
	Ln = class extends Error {
		code;
		constructor(t = "Image Scene Data Error", n = "IMAGE_SCENE_DATA_ERROR") {
			super(t), (this.name = "EncodingError"), (this.code = n);
		}
	},
	Xi = class extends Error {
		code = "ELEMENT_HAS_INVALID_INDEX";
	},
	lo = class extends Error {
		code;
		constructor(
			t = "Worker URL is not defined!",
			n = "WORKER_URL_NOT_DEFINED",
		) {
			super(t), (this.name = "WorkerUrlNotDefinedError"), (this.code = n);
		}
	},
	Uo = class extends Error {
		code;
		constructor(
			t = "Worker has to be in a separate chunk!",
			n = "WORKER_IN_THE_MAIN_CHUNK",
		) {
			super(t), (this.name = "WorkerInTheMainChunkError"), (this.code = n);
		}
	},
	ma = class extends Error {
		constructor(t) {
			super(t), (this.name = "ExcalidrawError");
		}
	};
var cl = class {
		instance;
		constructor(t) {
			this.instance = new Worker(t, { type: "module" });
		}
		debounceTerminate;
	},
	Zi = class e {
		idleWorkers = new Set();
		workerUrl;
		workerTTL;
		constructor(t, n) {
			(this.workerUrl = t), (this.workerTTL = n.ttl || 1e3);
		}
		static create(t, n = {}) {
			if (!t) throw new lo();
			if (!import.meta.url || t.toString() === import.meta.url) throw new Uo();
			return new e(t, n);
		}
		async postMessage(t, n) {
			let r,
				o = Array.from(this.idleWorkers).shift();
			return (
				o
					? (this.idleWorkers.delete(o), (r = o))
					: (r = await this.createWorker()),
				new Promise((a, i) => {
					(r.instance.onmessage = this.onMessageHandler(r, a)),
						(r.instance.onerror = this.onErrorHandler(r, i)),
						r.instance.postMessage(t, n),
						r.debounceTerminate(() =>
							i(
								new Error(
									`Active worker did not respond for ${this.workerTTL}ms!`,
								),
							),
						);
				})
			);
		}
		async clear() {
			for (let t of this.idleWorkers)
				t.debounceTerminate.cancel(), t.instance.terminate();
			this.idleWorkers.clear();
		}
		async createWorker() {
			let t = new cl(this.workerUrl);
			return (
				(t.debounceTerminate = Ti((n) => {
					t.instance.terminate(),
						this.idleWorkers.has(t)
							? (this.idleWorkers.delete(t),
								console.debug(
									"Job finished! Idle worker has been released from the pool.",
								))
							: n
								? n()
								: console.error("Worker has been terminated!");
				}, this.workerTTL)),
				t
			);
		}
		onMessageHandler(t, n) {
			return (r) => {
				t.debounceTerminate(), this.idleWorkers.add(t), n(r.data);
			};
		}
		onErrorHandler(t, n) {
			return (r) => {
				t.debounceTerminate(() => n(r)),
					t.debounceTerminate.flush(),
					this.clear();
			};
		}
	};
var N2 = typeof Worker < "u",
	P2 = async (e, t) => {
		let { Commands: n, subsetToBase64: r, toBase64: o } = await r9();
		return N2
			? Xn(async () => {
					try {
						let a = await o9(),
							i = e.slice(0),
							s = await a.postMessage(
								{ command: n.Subset, arrayBuffer: i, codePoints: t },
								{ transfer: [i] },
							);
						return o(s);
					} catch (a) {
						return (
							(N2 = !1),
							(O1() && (a instanceof lo || a instanceof Uo)) ||
								console.error(
									"Failed to use workers for subsetting, falling back to the main thread.",
									a,
								),
							r(e, t)
						);
					}
				})
			: r(e, t);
	},
	ll = null,
	dl = null,
	n9 = async () => (
		ll || (ll = import("./subset-worker.chunk-MYCAJIOT.js")), ll
	),
	r9 = async () => (
		dl || (dl = import("./subset-shared.chunk-KSDZU3XJ.js")), dl
	),
	Ul = null,
	o9 = () => (
		Ul ||
			(Ul = Xn(async () => {
				let { WorkerUrl: e } = await n9();
				return Zi.create(e);
			})),
		Ul
	);
var Wi = class e {
	urls;
	fontFace;
	static UNPKG_FALLBACK_URL =
		`https://unpkg.com/${R.VITE_PKG_NAME ? `${R.VITE_PKG_NAME}@${R.PKG_VERSION}` : "@excalidraw/excalidraw"}/dist/prod/`;
	constructor(t, n, r) {
		this.urls = e.createUrls(n);
		let o = this.urls.map((a) => `url(${a})`).join(", ");
		this.fontFace = new FontFace(t, o, {
			display: "swap",
			style: "normal",
			weight: "400",
			...r,
		});
	}
	toCSS(t) {
		if (!this.getUnicodeRangeRegex().test(t)) return;
		let n = Array.from(t).map((r) => r.codePointAt(0));
		return this.getContent(n).then(
			(r) =>
				`@font-face { font-family: ${this.fontFace.family}; src: url(${r}); }`,
		);
	}
	async getContent(t) {
		let n = 0,
			r = [];
		for (; n < this.urls.length; ) {
			let o = this.urls[n];
			try {
				let a = await this.fetchFont(o);
				return await P2(a, t);
			} catch (a) {
				r.push(`"${o.toString()}" returned error "${a}"`);
			}
			n++;
		}
		return (
			console.error(
				`Failed to fetch font family "${this.fontFace.family}"`,
				JSON.stringify(r, void 0, 2),
			),
			this.urls.length ? this.urls[this.urls.length - 1].toString() : ""
		);
	}
	fetchFont(t) {
		return Xn(async () => {
			let n = await fetch(t, {
				cache: "force-cache",
				headers: { Accept: "font/woff2" },
			});
			if (!n.ok) {
				let o = t instanceof URL ? t.toString() : "dataurl";
				throw new Error(`Failed to fetch "${o}": ${n.statusText}`);
			}
			return await n.arrayBuffer();
		});
	}
	getUnicodeRangeRegex() {
		let t = this.fontFace.unicodeRange
			.split(/,\s*/)
			.map((n) => {
				let [r, o] = n.replace("U+", "").split("-");
				return o ? `\\u{${r}}-\\u{${o}}` : `\\u{${r}}`;
			})
			.join("");
		return new RegExp(`[${t}]`, "u");
	}
	static createUrls(t) {
		if (t.startsWith("data")) return [t];
		if (t.startsWith(co)) return [];
		if (t.startsWith("http")) return [new URL(t)];
		let n = t.replace(/^\/+/, ""),
			r = [];
		if (typeof window.EXCALIDRAW_ASSET_PATH == "string") {
			let o = this.normalizeBaseUrl(window.EXCALIDRAW_ASSET_PATH);
			r.push(new URL(n, o));
		} else
			Array.isArray(window.EXCALIDRAW_ASSET_PATH) &&
				window.EXCALIDRAW_ASSET_PATH.forEach((o) => {
					let a = this.normalizeBaseUrl(o);
					r.push(new URL(n, a));
				});
		return r.push(new URL(n, e.UNPKG_FALLBACK_URL)), r;
	}
	static getFormat(t) {
		if (!(t instanceof URL)) return "";
		try {
			let n = new URL(t).pathname.split(".");
			return n.length === 1 ? "" : `format('${n.pop()}')`;
		} catch {
			return "";
		}
	}
	static normalizeBaseUrl(t) {
		let n = t;
		return (
			/^\.?\//.test(n) &&
				(n = new URL(
					n.replace(/^\.?\/+/, ""),
					window?.location?.origin,
				).toString()),
			(n = `${n.replace(/\/+$/, "")}/`),
			n
		);
	}
};
E();
var F2 = "./CascadiaCode-Regular-TMZI7IJ5.woff2";
var O2 = [{ uri: F2 }];
E();
var A2 =
	"./ComicShanns-Regular-279a7b317d12eb88de06167bd672b4b4-PCYYYBFF.woff2";
var B2 =
	"./ComicShanns-Regular-fcb0fc02dcbee4c9846b3e2508668039-RGRXSYA7.woff2";
var C2 =
	"./ComicShanns-Regular-dc6a8806fa96795d7b3be5026f989a17-BI6ZZE22.woff2";
var K2 =
	"./ComicShanns-Regular-6e066e8de2ac57ea9283adb9c24d7f0c-72ZDTSB5.woff2";
var H2 = [
	{
		uri: A2,
		descriptors: {
			unicodeRange:
				"U+20-7e,U+a1-a6,U+a8,U+ab-ac,U+af-b1,U+b4,U+b8,U+bb-bc,U+bf-cf,U+d1-d7,U+d9-de,U+e0-ef,U+f1-f7,U+f9-ff,U+131,U+152-153,U+2c6,U+2da,U+2dc,U+2013-2014,U+2018-201a,U+201c-201d,U+2020-2022,U+2026,U+2039-203a,U+2044,U+20ac,U+2191,U+2193,U+2212",
		},
	},
	{
		uri: B2,
		descriptors: {
			unicodeRange:
				"U+100-10f,U+112-125,U+128-130,U+134-137,U+139-13c,U+141-148,U+14c-151,U+154-161,U+164-165,U+168-17f,U+1bf,U+1f7,U+218-21b,U+237,U+1e80-1e85,U+1ef2-1ef3,U+a75b",
		},
	},
	{
		uri: C2,
		descriptors: {
			unicodeRange:
				"U+2c7,U+2d8-2d9,U+2db,U+2dd,U+315,U+2190,U+2192,U+2200,U+2203-2204,U+2264-2265,U+f6c3",
		},
	},
	{ uri: K2, descriptors: { unicodeRange: "U+3bb" } },
];
E();
var J2 = [{ uri: co }];
E();
var k2 = "./Excalifont-Regular-a88b72a24fb54c9f94e3b5fdaa7481c9-QCBECM3W.woff2";
var Y2 = "./Excalifont-Regular-be310b9bcd4f1a43f571c46df7809174-6RR2CUWT.woff2";
var V2 = "./Excalifont-Regular-b9dcf9d2e50a1eaf42fc664b50a3fd0d-E3EC3AAZ.woff2";
var q2 = "./Excalifont-Regular-41b173a47b57366892116a575a43e2b6-HWHY5DQF.woff2";
var G2 = "./Excalifont-Regular-3f2c5db56cc93c5a6873b1361d730c16-PYAELPGV.woff2";
var X2 = "./Excalifont-Regular-349fac6ca4700ffec595a7150a0d1e1d-YDYXHKKQ.woff2";
var Z2 = "./Excalifont-Regular-623ccf21b21ef6b3a0d87738f77eb071-5DDCFPYK.woff2";
var W2 = [
	{
		uri: k2,
		descriptors: {
			unicodeRange:
				"U+20-7e,U+a0-a3,U+a5-a6,U+a8-ab,U+ad-b1,U+b4,U+b6-b8,U+ba-ff,U+131,U+152-153,U+2bc,U+2c6,U+2da,U+2dc,U+304,U+308,U+2013-2014,U+2018-201a,U+201c-201e,U+2020,U+2022,U+2024-2026,U+2030,U+2039-203a,U+20ac,U+2122,U+2212",
		},
	},
	{
		uri: Y2,
		descriptors: {
			unicodeRange:
				"U+100-130,U+132-137,U+139-149,U+14c-151,U+154-17e,U+192,U+1fc-1ff,U+218-21b,U+237,U+1e80-1e85,U+1ef2-1ef3,U+2113",
		},
	},
	{ uri: V2, descriptors: { unicodeRange: "U+400-45f,U+490-491,U+2116" } },
	{
		uri: q2,
		descriptors: {
			unicodeRange:
				"U+37e,U+384-38a,U+38c,U+38e-393,U+395-3a1,U+3a3-3a8,U+3aa-3cf,U+3d7",
		},
	},
	{
		uri: G2,
		descriptors: {
			unicodeRange:
				"U+2c7,U+2d8-2d9,U+2db,U+2dd,U+302,U+306-307,U+30a-30c,U+326-328,U+212e,U+2211,U+fb01-fb02",
		},
	},
	{
		uri: X2,
		descriptors: {
			unicodeRange:
				"U+462-463,U+472-475,U+4d8-4d9,U+4e2-4e3,U+4e6-4e9,U+4ee-4ef",
		},
	},
	{ uri: Z2, descriptors: { unicodeRange: "U+300-301,U+303" } },
];
E();
var z2 = [{ uri: co }];
E();
var Q2 = "./LiberationSans-Regular-ZQD73GJM.woff2";
var j2 = [{ uri: Q2 }];
E();
var eu = "./Lilita-Regular-i7dPIFZ9Zz-WBtRtedDbYEF8RXi4EwQ-AQ4UK4L6.woff2";
var tu = "./Lilita-Regular-i7dPIFZ9Zz-WBtRtedDbYE98RXi4EwSsbg-YICRZMBJ.woff2";
var nu = [
	{ uri: tu, descriptors: { unicodeRange: _n.LATIN_EXT } },
	{ uri: eu, descriptors: { unicodeRange: _n.LATIN } },
];
E();
var ru =
	"./Nunito-Regular-XRXI3I6Li01BKofiOc5wtlZ2di8HDIkhdTQ3j6zbXWjgeg-S2BZMVTH.woff2";
var ou =
	"./Nunito-Regular-XRXI3I6Li01BKofiOc5wtlZ2di8HDIkhdTo3j6zbXWjgevT5-PWTUGLZK.woff2";
var au =
	"./Nunito-Regular-XRXI3I6Li01BKofiOc5wtlZ2di8HDIkhdTA3j6zbXWjgevT5-P2CSI5V6.woff2";
var iu =
	"./Nunito-Regular-XRXI3I6Li01BKofiOc5wtlZ2di8HDIkhdTk3j6zbXWjgevT5-F252BD3S.woff2";
var su =
	"./Nunito-Regular-XRXI3I6Li01BKofiOc5wtlZ2di8HDIkhdTs3j6zbXWjgevT5-YZLWO63P.woff2";
var cu = [
	{ uri: iu, descriptors: { unicodeRange: _n.CYRILIC_EXT, weight: "500" } },
	{ uri: au, descriptors: { unicodeRange: _n.CYRILIC, weight: "500" } },
	{ uri: su, descriptors: { unicodeRange: _n.VIETNAMESE, weight: "500" } },
	{ uri: ou, descriptors: { unicodeRange: _n.LATIN_EXT, weight: "500" } },
	{ uri: ru, descriptors: { unicodeRange: _n.LATIN, weight: "500" } },
];
E();
var lu = "./Virgil-Regular-YHAB2VGJ.woff2";
var du = [{ uri: lu }];
E();
var Uu = "./Xiaolai-Regular-09850c4077f3fffe707905872e0e2460-V6HMW7MQ.woff2";
var fu = "./Xiaolai-Regular-7eb9fffd1aa890d07d0f88cc82e6cfe4-VEQWZILM.woff2";
var uu = "./Xiaolai-Regular-60a3089806700d379f11827ee9843b6b-IYU7V3T5.woff2";
var pu = "./Xiaolai-Regular-6fe5c5973cc06f74b2387a631ea36b88-J63DDFB4.woff2";
var mu = "./Xiaolai-Regular-b96d9226ce77ec94ceca043d712182e6-OTBHPSHU.woff2";
var hu = "./Xiaolai-Regular-6ae5b42180ad70b971c91e7eefb8eba2-YPABYQLF.woff2";
var bu = "./Xiaolai-Regular-a4c34be6d42152e64b0df90bc4607f64-BGHNBIHL.woff2";
var gu = "./Xiaolai-Regular-c69f61a4ab18d0488c8d1fc12e7028e8-IHQ56TQO.woff2";
var Eu = "./Xiaolai-Regular-e3fcf5180fd466c8915c4e8069491054-I3PG6Q3O.woff2";
var xu = "./Xiaolai-Regular-c1f94158256bb1f3bf665b053d895af9-B22NYC3V.woff2";
var yu = "./Xiaolai-Regular-544fc28abe2c5c30e62383fd4dac255f-MNUWQLXP.woff2";
var wu = "./Xiaolai-Regular-7197d6fda6cba7c3874c53d6381ca239-7LUK6Z57.woff2";
var Iu = "./Xiaolai-Regular-70c2eb8d64e71a42a834eb857ea9df51-FXZQL7BU.woff2";
var Tu = "./Xiaolai-Regular-069e77aac84590e2e991d0a0176d34f2-3VKPGUS3.woff2";
var Ru = "./Xiaolai-Regular-41521fade99856108931b4768b1b2648-KW42QAVI.woff2";
var vu = "./Xiaolai-Regular-a004ddfcb26e67bd6e678c8ed19e25ce-X7VE27O2.woff2";
var Mu = "./Xiaolai-Regular-04b718e5623574919c8b0dea5f301444-LGJSFY4P.woff2";
var _u = "./Xiaolai-Regular-7e4bde7e9c7f84cd34d8a845e384c746-NIGYYSPJ.woff2";
var Lu = "./Xiaolai-Regular-23686f7f29da6e8008c36dd3a80c83d6-XJMGYKSW.woff2";
var Du = "./Xiaolai-Regular-69c09cc5fa3e55c74fc4821f76909cc3-RYFK5RDY.woff2";
var Su = "./Xiaolai-Regular-25b7f38e18f035f96cb5e547bd2bd08c-TKLOWCIL.woff2";
var $u = "./Xiaolai-Regular-ba3de316d63c7e339987b16f41a0b879-KGF5KB5R.woff2";
var Nu = "./Xiaolai-Regular-12b52b58eb3df36804b9a654ec9ee194-AOXRGNNX.woff2";
var Pu = "./Xiaolai-Regular-b1220a3c61f85cc0408deedb4c5f57a2-HVBZ3X24.woff2";
var Fu = "./Xiaolai-Regular-4535823663ad81405188a528d8f2b1a2-ZFEHIIAO.woff2";
var Ou = "./Xiaolai-Regular-3eaa538115d76932653c21d8dc28f207-6XMGSJBN.woff2";
var Au = "./Xiaolai-Regular-7e929f262f30c8ee78bf398150b1a7cd-C5SBUBJF.woff2";
var Bu = "./Xiaolai-Regular-73e309718fd16cea44b4d54a33581811-T2HITPNW.woff2";
var Cu = "./Xiaolai-Regular-9eb5a99df4e76ac3363453ac9ca288b1-27AU36Y2.woff2";
var Ku = "./Xiaolai-Regular-3e63ed8162808a9e425ed80a8bc79114-H3LR6GBS.woff2";
var Hu = "./Xiaolai-Regular-cb17fc3db95f6d139afc9d31a8e93293-BKR7WARS.woff2";
var Ju = "./Xiaolai-Regular-c8b71798409ccc126ee264a00aadcf21-SI4Z57N5.woff2";
var ku = "./Xiaolai-Regular-11c345711937f0ba4b8f7b6b919c8440-NI33UJMM.woff2";
var Yu = "./Xiaolai-Regular-e480d9c614742d05f0e78f274f1e69e6-UEELEEQY.woff2";
var Vu = "./Xiaolai-Regular-95429962233afd82db1c27df1500a28c-MZRKDRTZ.woff2";
var qu = "./Xiaolai-Regular-2cf96d082d35ea3d8106851223ad0d16-7FRB67SF.woff2";
var Gu = "./Xiaolai-Regular-2d43040e86ff03ba677f6f9c04cd0805-R34YUGJF.woff2";
var Xu = "./Xiaolai-Regular-2a26d20a23b00898ce82f09d2ee47c3f-W3JP7DFA.woff2";
var Zu = "./Xiaolai-Regular-a365e82ed54697a52f27adcea1315fe8-Y7NKRGXX.woff2";
var Wu = "./Xiaolai-Regular-f5d079153c99a25b9be5b8583c4cc8a7-ZM6YLG6T.woff2";
var zu = "./Xiaolai-Regular-10a7ae9a371830a80c3d844acf1c02d7-VPS7CLJF.woff2";
var Qu = "./Xiaolai-Regular-e4bca6cfa53e499cae0a6be4894a90e9-FNPUFVG6.woff2";
var ju = "./Xiaolai-Regular-60a41c7e1c68f22424e6d22df544bc82-EA2L76CZ.woff2";
var ep = "./Xiaolai-Regular-7ab2bed91166a9dca83a5ebfbe2a7f38-WL4JGXEO.woff2";
var tp = "./Xiaolai-Regular-670ba603758d94268e8606f240a42e12-CTZSYIK4.woff2";
var np = "./Xiaolai-Regular-e656f091b9dc4709722c9f4b84d3c797-VTS3P57U.woff2";
var rp = "./Xiaolai-Regular-15dc6d811c9cd078f9086a740d5a1038-YSHOBN24.woff2";
var op = "./Xiaolai-Regular-f0f13b5c60e0af5553bd359f5513be1b-QSLXR4BR.woff2";
var ap = "./Xiaolai-Regular-8c2f33cee3993174f7e87c28e4bf42ee-H2ERD7ZF.woff2";
var ip = "./Xiaolai-Regular-761d05e3cd968cf574166867998ef06a-6AZYHW64.woff2";
var sp = "./Xiaolai-Regular-642b26e2e5f5fb780b51b593dbc8c851-VMNFX7DK.woff2";
var cp = "./Xiaolai-Regular-5572b3513ba8df57a3d5d7303ee6b11b-5KUCBI4F.woff2";
var lp = "./Xiaolai-Regular-3c9de2ae0ea4bc91a510942dfa4be8d2-Y5ZSIP7Z.woff2";
var dp = "./Xiaolai-Regular-671a2c20b1eb9e4ef8a192833940e319-L3ZIQ25I.woff2";
var Up = "./Xiaolai-Regular-4dc6d5f188d5c96d44815cd1e81aa885-HJA7GFAX.woff2";
var fp = "./Xiaolai-Regular-ce4884f96f11589608b76b726a755803-VDQQFIHI.woff2";
var up = "./Xiaolai-Regular-8f476c4c99813d57cbe6eca4727388ad-OFLKJOOJ.woff2";
var pp = "./Xiaolai-Regular-5935a5775af3d5c6307ac667bd9ae74e-ZPGJ6LH2.woff2";
var mp = "./Xiaolai-Regular-79f007c1c6d07557120982951ea67998-F3LX7OK4.woff2";
var hp = "./Xiaolai-Regular-bafff7a14c27403dcc6cf1432e8ea836-CHG4F56P.woff2";
var bp = "./Xiaolai-Regular-543fa46ace099a7099dad69123399400-4LNSWB4E.woff2";
var gp = "./Xiaolai-Regular-4ddc14ed3eb0c3e46364317dfc0144a3-ESVSMCIZ.woff2";
var Ep = "./Xiaolai-Regular-0fa55a080fcd0f9dc2e0b0058b793df8-TTLU4XFR.woff2";
var xp = "./Xiaolai-Regular-66493ba5a8367f2928812f446f47b56a-TX27EEYV.woff2";
var yp = "./Xiaolai-Regular-57862b464a55b18c7bf234ce22907d73-UMOJSVHM.woff2";
var wp = "./Xiaolai-Regular-8d3bcabb847b56243b16afe62adaaf21-ALMD4Y7C.woff2";
var Ip = "./Xiaolai-Regular-2b77e8ebfb2367ab2662396a60e7d320-RP6YN5A4.woff2";
var Tp = "./Xiaolai-Regular-0b5d723fdc4e249c140f0909e87d03b4-ISCGMB4S.woff2";
var Rp = "./Xiaolai-Regular-cdbce89e82cc1ab53a2decbf5819278f-X6DS2X3Q.woff2";
var vp = "./Xiaolai-Regular-739bc1a567439c7cffcd1614644593d2-TN2NJTT3.woff2";
var Mp = "./Xiaolai-Regular-72252d73220fa3cd856677888cee1635-LGQD6LHU.woff2";
var _p = "./Xiaolai-Regular-08e0dc436ad0ad61ba5558db0674d762-HYJQCD2W.woff2";
var Lp = "./Xiaolai-Regular-cf6ff4e0f491ca0cf3038187a997b9b4-P2OXL2LK.woff2";
var Dp = "./Xiaolai-Regular-9cfb2a77a4e45025105ad29a1748b90d-J5PYDJ7P.woff2";
var Sp = "./Xiaolai-Regular-450da755d5bcb70906e1295e559b9602-BXHBXQFA.woff2";
var $p = "./Xiaolai-Regular-0986d134c05864f5025962eef9f994a0-OAIPCAQ5.woff2";
var Np = "./Xiaolai-Regular-1ee544f0f1dac422545c505baa788992-QUXLVHI5.woff2";
var Pp = "./Xiaolai-Regular-4806e761d750087c2d734fc64596eaff-7JKRH46I.woff2";
var Fp = "./Xiaolai-Regular-33432927cd87d40cfe393c7482bf221f-AWXP2UHP.woff2";
var Op = "./Xiaolai-Regular-be549ab72f0719d606a5c01e2c0219b6-TBWQOV72.woff2";
var Ap = "./Xiaolai-Regular-019d66dcad46dc156b162d267f981c20-OTGAJ4TV.woff2";
var Bp = "./Xiaolai-Regular-b5c1596551c256e0e9cf02028595b092-M5J4MRSD.woff2";
var Cp = "./Xiaolai-Regular-e5f453bb04da18eed01675eeebd88bf8-VP54Y4D2.woff2";
var Kp = "./Xiaolai-Regular-cf2cc71752631e579e35b0e423bf2638-R6CEHAL4.woff2";
var Hp = "./Xiaolai-Regular-6f3256af8454371776bc46670d33cc65-SIOOODJB.woff2";
var Jp = "./Xiaolai-Regular-23f228f3999c01983860012330e4be08-LQSV7RMP.woff2";
var kp = "./Xiaolai-Regular-21430ee05a1248901da8d0de08744d47-MYF65JF3.woff2";
var Yp = "./Xiaolai-Regular-5330a2119a716e4e7224ed108b085dac-CB3A6ZLY.woff2";
var Vp = "./Xiaolai-Regular-cd145ce4a0ea18469358df53c207bc1b-GPFL2V32.woff2";
var qp = "./Xiaolai-Regular-36925dfe329a45086cbb7fc5c20d45ac-CVP3L2IX.woff2";
var Gp = "./Xiaolai-Regular-4bfaa8ffa64c5ee560aa2daba7c9cbd3-6KOTBRKU.woff2";
var Xp = "./Xiaolai-Regular-112c051027b2d766c19a519f6ee1f4f7-5BJFI7HY.woff2";
var Zp = "./Xiaolai-Regular-5b0ed6971aaab9c8ad563230bd5471a7-7CM7YDUJ.woff2";
var Wp = "./Xiaolai-Regular-98f2ad84457de7f3740d9920b8fa8667-7DPNWFFB.woff2";
var zp = "./Xiaolai-Regular-733171b4ffcd17ea1fe1c0ba627173bf-QCODOL3X.woff2";
var Qp = "./Xiaolai-Regular-684d65f1793cac449dde5d59cb3c47fb-ILYKG2W4.woff2";
var jp = "./Xiaolai-Regular-cbaaefaaf326668277aa24dfa93c4d28-FPO25Y27.woff2";
var e0 = "./Xiaolai-Regular-58fd02350d0bc52cf1ca3bb32ce9766e-PPTYK6LO.woff2";
var t0 = "./Xiaolai-Regular-7ccce86603f80a099ddb0cb21d4ae3e3-PHOXCU3Z.woff2";
var n0 = "./Xiaolai-Regular-3717077e38f98d89eae729b6c14e56dc-PE5XJLYW.woff2";
var r0 = "./Xiaolai-Regular-dbea1af6dcd9860be40c3d18254338f5-CQGJYC5W.woff2";
var o0 = "./Xiaolai-Regular-4a0fdb40036e87b40aa08dd30584cb85-OONHOWQY.woff2";
var a0 = "./Xiaolai-Regular-0f626226ba1272e832aea87bafd9720e-IEWJXCTN.woff2";
var i0 = "./Xiaolai-Regular-938d90c10ff8c20386af7f242c05d6b0-HKAZCNVE.woff2";
var s0 = "./Xiaolai-Regular-b6d128682ee29e471486354d486a1b90-6C5VPYAS.woff2";
var c0 = "./Xiaolai-Regular-e51ef413167c6e14e0c0fdcc585f2fc9-LE5XIRIS.woff2";
var l0 = "./Xiaolai-Regular-9d81066dd2b337c938df6e90380a00dc-VAXXIOCK.woff2";
var d0 = "./Xiaolai-Regular-20e7bf72fa05de9adf7dbcc7bf51dde6-OLL4MN6M.woff2";
var U0 = "./Xiaolai-Regular-4095eb84ef3874e2600247bee0b04026-2P5R75DA.woff2";
var f0 = "./Xiaolai-Regular-4ee10ae43505e2e0bc62656ced49c0fa-7IG5NGAL.woff2";
var u0 = "./Xiaolai-Regular-7494dc504ae00ee9cd0505f990f88c5d-U2GA2VKS.woff2";
var p0 = "./Xiaolai-Regular-8de5b863cb50dfefdd07cb11c774d579-CZX6TZWX.woff2";
var m0 = "./Xiaolai-Regular-3e1f8f654357353bf0e04ba5c34b5f7f-Q6WE7D7O.woff2";
var h0 = "./Xiaolai-Regular-2e33e8dc771ef5e1d9127d60a6b73679-BJWH5D6L.woff2";
var b0 = "./Xiaolai-Regular-173945821411c09f70c95f98d590e697-732QOBO6.woff2";
var g0 = "./Xiaolai-Regular-b358f7a51ece39a3247942b1feabdb29-2TVYP3JI.woff2";
var E0 = "./Xiaolai-Regular-23ad2d71b280f00b1363b95b7bea94eb-7QDTWC6L.woff2";
var x0 = "./Xiaolai-Regular-5882ffa04f32584d26109137e2da4352-Z4T5YGTR.woff2";
var y0 = "./Xiaolai-Regular-a203b91dad570bf05a58c3c3ddb529bf-NCCODLVR.woff2";
var w0 = "./Xiaolai-Regular-bd77e3c7f9e0b072d96af37f73d1aa32-3CLT5IIN.woff2";
var I0 = "./Xiaolai-Regular-5a45d991244d4c7140217e1e5f5ca4f4-E32JQTED.woff2";
var T0 = "./Xiaolai-Regular-f56414bf9bced67990def8660e306759-5QS4LUFW.woff2";
var R0 = "./Xiaolai-Regular-583d166e56ba0de4b77eabb47ef67839-KPDYB3NU.woff2";
var v0 = "./Xiaolai-Regular-7f855356ab893b0d2b9c1c83b8116f0e-FQPSY3FG.woff2";
var M0 = "./Xiaolai-Regular-b57aaedfd8ebdf3931f25119dc6a5eb2-5AVOTTE4.woff2";
var _0 = "./Xiaolai-Regular-b6fd38ca30869792244804b04bc058da-IE7XN7QA.woff2";
var L0 = "./Xiaolai-Regular-452225341522a7942f0f6aab1a5c91a3-TX5WWPYV.woff2";
var D0 = "./Xiaolai-Regular-866fa7613df6b3fd272bcfd4530c0bb9-IPCNYRR2.woff2";
var S0 = "./Xiaolai-Regular-52a84a22fd1369bffeaf21da2d6158dc-HAJECEM6.woff2";
var $0 = "./Xiaolai-Regular-829615148e6357d826b9242eb7fbbd1e-XU3EORDD.woff2";
var N0 = "./Xiaolai-Regular-c99eda15fc26a2941579560f76c3a5cf-TVARELIC.woff2";
var P0 = "./Xiaolai-Regular-395c35dd584b56b0789f58a0559beaf1-454IVNBJ.woff2";
var F0 = "./Xiaolai-Regular-203b0e569e3b14aac86a003dc3fa523e-TFMHONJ2.woff2";
var O0 = "./Xiaolai-Regular-51a0e808bbc8361236ac521a119758a3-3UGMXTDF.woff2";
var A0 = "./Xiaolai-Regular-6e092f71c1e634059ada0e52abadce67-K264Z6TE.woff2";
var B0 = "./Xiaolai-Regular-0f7fb1e0d5015bb1371343153ecf7ce3-TXCUIB2R.woff2";
var C0 = "./Xiaolai-Regular-d0cf73942fea1c74edbdf0b3011f4656-VXQCFUMZ.woff2";
var K0 = "./Xiaolai-Regular-968cffdc8ee679da094e77ebf50f58ef-VA2Z4TFW.woff2";
var H0 = "./Xiaolai-Regular-7a07ddc0f0c0f5f4a9bad6ee3dda66b5-NTA5CCZC.woff2";
var J0 = "./Xiaolai-Regular-ec181b795ac1fb5a50d700b6e996d745-IQGHEQJR.woff2";
var k0 = "./Xiaolai-Regular-cfb211578629b7e8153b37240de6a9d5-XCNIA6AD.woff2";
var Y0 = "./Xiaolai-Regular-59e9ff77b0efaf684bc09274fb6908c9-OMJOS5SI.woff2";
var V0 = "./Xiaolai-Regular-2adbc89c11e65905393d3dfc468b9d5b-4SFQBEIQ.woff2";
var q0 = "./Xiaolai-Regular-70e811fd7994e61f408c923de6ddd078-QBYDJXMN.woff2";
var G0 = "./Xiaolai-Regular-c4a687ac4f0c2766eefc9f77ed99cddf-GPB56LT2.woff2";
var X0 = "./Xiaolai-Regular-51502f1206be09c565f1547c406e9558-CBSA7RVN.woff2";
var Z0 = "./Xiaolai-Regular-1fdc0c67ed57263a80fd108c1f6ccf24-H7WGCBOV.woff2";
var W0 = "./Xiaolai-Regular-e11567fd2accf9957cd0d3c2be937d87-DOQR7LKT.woff2";
var z0 = "./Xiaolai-Regular-20cc1bbf50e7efb442756cb605672c1f-3WUVKX2X.woff2";
var Q0 = "./Xiaolai-Regular-5d2898fbc097a7e24c6f38d80587621e-KBSLEFDU.woff2";
var j0 = "./Xiaolai-Regular-ac9ceb44437becc3e9c4dbfebab7fc2d-FOZUIRQD.woff2";
var e6 = "./Xiaolai-Regular-c16ed9740b85badf16e86ea782a3062f-BKBULLIN.woff2";
var t6 = "./Xiaolai-Regular-aa0d470430e6391eca720c7cfa44446f-WNXXR24F.woff2";
var n6 = "./Xiaolai-Regular-f2b54d4e7be0eaefe1c2c56836fa5368-PFGHGCQI.woff2";
var r6 = "./Xiaolai-Regular-99a16ef6a64934d5781933dbd9c46b2e-D3OH4HTA.woff2";
var o6 = "./Xiaolai-Regular-c40533fdf4cc57177b12803598af7e59-P4GNQF56.woff2";
var a6 = "./Xiaolai-Regular-91ddb2969bf2d31ba02ad82998d1314c-W6V5PJDV.woff2";
var i6 = "./Xiaolai-Regular-774d4f764a1299da5d28ec2f2ffe0d69-6R4E3UON.woff2";
var s6 = "./Xiaolai-Regular-7718fe60986d8b42b1be9c5ace5ccf25-IE3TBRPM.woff2";
var c6 = "./Xiaolai-Regular-aa5c9ca6cf4fba00433b7aa3fa10671a-RZ23J574.woff2";
var l6 = "./Xiaolai-Regular-4f50e5136e136527280bc902c5817561-TSQICLE6.woff2";
var d6 = "./Xiaolai-Regular-093b9ef39a46ceae95a1df18a0a3a326-4Q2JWQU2.woff2";
var U6 = "./Xiaolai-Regular-a0ca5df4258213d7fc9fce80f65ce760-WQD2KCIG.woff2";
var f6 = "./Xiaolai-Regular-d2666cbed13462c5dc36fa2f15c202ca-QG5J4SJG.woff2";
var u6 = "./Xiaolai-Regular-1e6fd68f1f3902ce48ce8c69df385622-LZHGHNGK.woff2";
var p6 = "./Xiaolai-Regular-87599f94b6cc129d505b375798d0d751-2XP7642X.woff2";
var m6 = "./Xiaolai-Regular-06c77b8c66e51ed6c63ccb502dd8b8af-5QMOZZUU.woff2";
var h6 = "./Xiaolai-Regular-13ae07ed2e272d26d59bc0691cd7117a-JHWVTJGS.woff2";
var b6 = "./Xiaolai-Regular-353f33792a8f60dc69323ddf635a269e-JPKVDIVL.woff2";
var g6 = "./Xiaolai-Regular-0facdf1ea213ba40261022f5d5ed4493-36M64LT6.woff2";
var E6 = "./Xiaolai-Regular-f8ee5d36068a42b51d0e4a1116cfcec1-MJSVAGRH.woff2";
var x6 = "./Xiaolai-Regular-79d494361ae093b69e74ee9dbe65bfd4-CK6BUCZY.woff2";
var y6 = "./Xiaolai-Regular-74e2263a91439c25b91d5132ce9f4d62-GX4KAFRF.woff2";
var w6 = "./Xiaolai-Regular-ee8bae97908d5147b423f77ad0d3c1bb-4CJX7R3B.woff2";
var I6 = "./Xiaolai-Regular-56467a5c8840c4d23a60b2f935114848-7D4XROXN.woff2";
var T6 = "./Xiaolai-Regular-145aa02cdd91946e67dc934e1acffe75-6LGURE7J.woff2";
var R6 = "./Xiaolai-Regular-54acdfc2166ad7fcbd074f75fd4a56ba-4EYIPYT7.woff2";
var v6 = "./Xiaolai-Regular-29cec36cd205b211da97acabaa62f055-UR62BIZS.woff2";
var M6 = "./Xiaolai-Regular-3756e81d3e149cf6099163ee79944fec-WZBA33KC.woff2";
var _6 = "./Xiaolai-Regular-8e9f97f01034820170065b2921b4fb5e-VFG2Y73S.woff2";
var L6 = "./Xiaolai-Regular-13d2887ec8ee73c43acdabc52a05af7b-2YFXJYRW.woff2";
var D6 = "./Xiaolai-Regular-72536a3d71b694a0d53dd90ddceae41e-XDUS76QT.woff2";
var S6 = "./Xiaolai-Regular-603aefd23e350ba7eb124273e3c9bcf1-45NVZEP6.woff2";
var $6 = "./Xiaolai-Regular-095c169f3314805276f603a362766abd-AEFVYQ57.woff2";
var N6 = "./Xiaolai-Regular-9544732d2e62d1a429674f8ee41b5d3a-Z7XI3HG3.woff2";
var P6 = "./Xiaolai-Regular-d3716376641d615e2995605b29bca7b6-SEAMHQ24.woff2";
var F6 = "./Xiaolai-Regular-5a1ce3117cfe90c48e8fb4a9a00f694d-DCFTYZIF.woff2";
var O6 = "./Xiaolai-Regular-b7d203b051eff504ff59ddca7576b6a9-3O7H6PYU.woff2";
var A6 = "./Xiaolai-Regular-4a38cc3e9cf104e69ba246d37f8cf135-K27DXTBV.woff2";
var B6 = "./Xiaolai-Regular-982b630266d87db93d2539affb1275c6-VQT6YHHZ.woff2";
var C6 = "./Xiaolai-Regular-9592bfc861f07bcb8d75c196b370e548-XQFVQO6I.woff2";
var K6 = "./Xiaolai-Regular-a7accba310e821da5505f71c03b76bdb-BX3IDFN6.woff2";
var H6 = "./Xiaolai-Regular-dac48066b5883d8b4551fc584f0c2a3e-BFX6O2WU.woff2";
var J6 = "./Xiaolai-Regular-a1f916d6039285c4ffb900cd654e418f-PKHZK6HG.woff2";
var k6 = "./Xiaolai-Regular-95bfd249da4902577b4b7d76ebdd0b44-GM77AZ3K.woff2";
var Y6 = "./Xiaolai-Regular-93fc8f28a33234bcadf1527cafabd502-EYCRDXXP.woff2";
var V6 = "./Xiaolai-Regular-903bb6865f3452e2fda42e3a25547bc5-KQGTPRW3.woff2";
var q6 = "./Xiaolai-Regular-4aca6a43e59aceee2166b0c7e4e85ef1-56OXA3AU.woff2";
var G6 = "./Xiaolai-Regular-24476a126f129212beb33f66853ea151-ZYE5IGO2.woff2";
var X6 = "./Xiaolai-Regular-1b611157cd46bb184d4fa4dae2d6a2b8-GGVIT6M2.woff2";
var Z6 = "./Xiaolai-Regular-56a32a7689abd0326e57c10c6c069bb4-ALI245F6.woff2";
var W6 = "./Xiaolai-Regular-3cc70dbb64df5b21f1326cc24dee2195-L25YV3JM.woff2";
var z6 = "./Xiaolai-Regular-f6032fc06eb20480f096199713f70885-U7Q4SJSX.woff2";
var Q6 = "./Xiaolai-Regular-e2ead7ea7da0437f085f42ffc05f8d13-UMGIKDJL.woff2";
var j6 = "./Xiaolai-Regular-97f7f48ce90c9429bf32ae51469db74d-4SHZ6A6O.woff2";
var e8 = "./Xiaolai-Regular-24a21c1e4449222e8d1898d69ff3a404-HKZ2SNA4.woff2";
var t8 = "./Xiaolai-Regular-726303e0774b4e678bff8c2deb6ca603-FJ3WZDFH.woff2";
var n8 = "./Xiaolai-Regular-5a7fac4b8b23a6e4e5ba0c9bf1756c91-IVRVNUE5.woff2";
var r8 = "./Xiaolai-Regular-2b7441d46298788ac94e610ffcc709b6-KLLPKBZM.woff2";
var o8 = [
	{
		uri: Uu,
		descriptors: {
			unicodeRange:
				"U+f9b8-fa6d,U+fe32,U+fe45-fe4f,U+ff02-ff0b,U+ff0d-ff1e,U+ff20-ff2a",
		},
	},
	{
		uri: fu,
		descriptors: {
			unicodeRange:
				"U+20dd-20de,U+25ef,U+ff2b-ffbe,U+ffc2-ffc7,U+ffca-ffcf,U+ffd2-ffd7,U+ffda-ffdc,U+ffe0-ffe6,U+ffe8-ffee",
		},
	},
	{ uri: uu, descriptors: { unicodeRange: "U+d7eb-d7fb,U+f900-f9b7" } },
	{
		uri: pu,
		descriptors: { unicodeRange: "U+d6f2-d7a3,U+d7b0-d7c6,U+d7cb-d7ea" },
	},
	{ uri: mu, descriptors: { unicodeRange: "U+d609-d6f1" } },
	{ uri: hu, descriptors: { unicodeRange: "U+d520-d608" } },
	{ uri: bu, descriptors: { unicodeRange: "U+d437-d51f" } },
	{ uri: gu, descriptors: { unicodeRange: "U+d34e-d436" } },
	{ uri: Eu, descriptors: { unicodeRange: "U+d265-d34d" } },
	{ uri: xu, descriptors: { unicodeRange: "U+d17c-d264" } },
	{ uri: yu, descriptors: { unicodeRange: "U+d093-d17b" } },
	{ uri: wu, descriptors: { unicodeRange: "U+cfaa-d092" } },
	{ uri: Iu, descriptors: { unicodeRange: "U+cec1-cfa9" } },
	{ uri: Tu, descriptors: { unicodeRange: "U+cdd8-cec0" } },
	{ uri: Ru, descriptors: { unicodeRange: "U+ccf1-cdd7" } },
	{ uri: vu, descriptors: { unicodeRange: "U+cc08-ccf0" } },
	{ uri: Mu, descriptors: { unicodeRange: "U+cb43-cc07" } },
	{ uri: _u, descriptors: { unicodeRange: "U+ca83-cb42" } },
	{ uri: Lu, descriptors: { unicodeRange: "U+c9a1-ca82" } },
	{ uri: Du, descriptors: { unicodeRange: "U+c8b8-c9a0" } },
	{ uri: Su, descriptors: { unicodeRange: "U+c7cf-c8b7" } },
	{ uri: $u, descriptors: { unicodeRange: "U+c6e6-c7ce" } },
	{ uri: Nu, descriptors: { unicodeRange: "U+c5fd-c6e5" } },
	{ uri: Pu, descriptors: { unicodeRange: "U+c514-c5fc" } },
	{ uri: Fu, descriptors: { unicodeRange: "U+c42b-c513" } },
	{ uri: Ou, descriptors: { unicodeRange: "U+c341-c34e,U+c350-c42a" } },
	{ uri: Au, descriptors: { unicodeRange: "U+c258-c340" } },
	{ uri: Bu, descriptors: { unicodeRange: "U+c16f-c257" } },
	{ uri: Cu, descriptors: { unicodeRange: "U+c086-c16e" } },
	{ uri: Ku, descriptors: { unicodeRange: "U+bf9d-c085" } },
	{ uri: Hu, descriptors: { unicodeRange: "U+beb4-bf9c" } },
	{ uri: Ju, descriptors: { unicodeRange: "U+bdcb-beb3" } },
	{ uri: ku, descriptors: { unicodeRange: "U+bce2-bdca" } },
	{ uri: Yu, descriptors: { unicodeRange: "U+bbf9-bce1" } },
	{ uri: Vu, descriptors: { unicodeRange: "U+bb10-bbf8" } },
	{ uri: qu, descriptors: { unicodeRange: "U+ba27-bb0f" } },
	{ uri: Gu, descriptors: { unicodeRange: "U+b93e-ba26" } },
	{ uri: Xu, descriptors: { unicodeRange: "U+b855-b93d" } },
	{ uri: Zu, descriptors: { unicodeRange: "U+b76c-b854" } },
	{ uri: Wu, descriptors: { unicodeRange: "U+b683-b76b" } },
	{ uri: zu, descriptors: { unicodeRange: "U+b59a-b682" } },
	{ uri: Qu, descriptors: { unicodeRange: "U+b4b1-b599" } },
	{ uri: ju, descriptors: { unicodeRange: "U+11fb-11ff,U+b3cd-b4b0" } },
	{ uri: ep, descriptors: { unicodeRange: "U+11e6-11fa,U+b2f9-b3cc" } },
	{ uri: tp, descriptors: { unicodeRange: "U+11d1-11e5,U+b225-b2f8" } },
	{ uri: np, descriptors: { unicodeRange: "U+11bc-11d0,U+b151-b224" } },
	{ uri: rp, descriptors: { unicodeRange: "U+11a7-11bb,U+b07d-b150" } },
	{ uri: op, descriptors: { unicodeRange: "U+1191-11a6,U+afaa-b07c" } },
	{ uri: ap, descriptors: { unicodeRange: "U+117c-1190,U+aed6-afa9" } },
	{ uri: ip, descriptors: { unicodeRange: "U+1167-117b,U+ae02-aed5" } },
	{
		uri: sp,
		descriptors: { unicodeRange: "U+1152-115e,U+1160-1166,U+ad2d-ae01" },
	},
	{ uri: cp, descriptors: { unicodeRange: "U+113d-1151,U+ac59-ad2c" } },
	{
		uri: lp,
		descriptors: {
			unicodeRange:
				"U+1100-113c,U+9f95-9f98,U+9f9c-9f9e,U+9fa1-9fce,U+9fd0,U+a960-a97c,U+ac00-ac58",
		},
	},
	{
		uri: dp,
		descriptors: {
			unicodeRange:
				"U+9771-9772,U+9775,U+9777-977b,U+977d-9784,U+9786-978a,U+978c,U+978e-9790,U+9793,U+9795-9797,U+9799-979f,U+97a1-97a2,U+97a4-97aa,U+97ac,U+97ae,U+97b0-97b1,U+97b3,U+97b5-97e5,U+97e8,U+97ee-97f2,U+97f4,U+97f7-982d",
		},
	},
	{
		uri: Up,
		descriptors: {
			unicodeRange:
				"U+9491,U+9496,U+9498,U+94c7,U+94cf,U+94d3-94d4,U+94da,U+94e6,U+94fb,U+951c,U+9520,U+9527,U+9533,U+953d,U+9543,U+9548,U+954b,U+9555,U+955a,U+9560,U+956e,U+9574-9575,U+9577-957e,U+9580-95e7,U+95ec,U+95ff,U+9607,U+9613,U+9618,U+961b,U+961e,U+9620,U+9623-9629,U+962b-962d,U+962f-9630,U+9637-963a,U+963e,U+9641,U+9643,U+964a,U+964e-964f,U+9651-9653,U+9656-965a,U+965c-965e,U+9660,U+9663,U+9665-9666,U+966b,U+966d-9671,U+9673,U+9678-9684,U+9687,U+9689-968a,U+968c,U+968e,U+9691-9693",
		},
	},
	{
		uri: fp,
		descriptors: {
			unicodeRange:
				"U+923c-9273,U+9275-928d,U+928f-92ad,U+92af-92c7,U+92c9-92ee",
		},
	},
	{
		uri: up,
		descriptors: {
			unicodeRange:
				"U+9159,U+915b-915c,U+915f-9160,U+9166-9168,U+916b,U+916d,U+9173,U+917a-917c,U+9180-9184,U+9186,U+9188,U+918a,U+918e-918f,U+9193-9199,U+919c-91a1,U+91a4-91a9,U+91ab-91ac,U+91b0-91b3,U+91b6-91b9,U+91bb-91c6,U+91c8,U+91cb,U+91d0,U+91d2-91db,U+91dd-923b",
		},
	},
	{
		uri: pp,
		descriptors: {
			unicodeRange:
				"U+902b-902c,U+9030-9034,U+9037,U+9039-903a,U+903d,U+903f-9040,U+9043,U+9045-9046,U+9048-904c,U+904e,U+9054-9056,U+9059-905a,U+905c-9061,U+9064,U+9066-9067,U+9069-906c,U+906f-9073,U+9076-907c,U+907e,U+9081,U+9084-9087,U+9089-908a,U+908c-9090,U+9092,U+9094,U+9096,U+9098,U+909a,U+909c,U+909e-90a0,U+90a4-90a5,U+90a7-90a9,U+90ab,U+90ad,U+90b2,U+90b7,U+90bc-90bd,U+90bf-90c0,U+90c2-90c3,U+90c6,U+90c8-90c9,U+90cb-90cd,U+90d2,U+90d4-90d6,U+90d8-90da,U+90de-90e0,U+90e3-90e5,U+90e9-90ea,U+90ec,U+90ee,U+90f0-90f3,U+90f5-90f7,U+90f9-90fc,U+90ff-9101,U+9103,U+9105-9118,U+911a-911d,U+911f-9121,U+9124-912e,U+9130,U+9132-9138,U+913a-9142,U+9144-9145,U+9147-9148,U+9151,U+9153-9156,U+9158",
		},
	},
	{
		uri: mp,
		descriptors: {
			unicodeRange:
				"U+8f03-8f65,U+8f6a,U+8f80,U+8f8c,U+8f92,U+8f9d,U+8fa0-8fa2,U+8fa4-8fa7,U+8faa,U+8fac-8faf,U+8fb2-8fb5,U+8fb7-8fb8,U+8fba-8fbc,U+8fbf-8fc0,U+8fc3,U+8fc6,U+8fc9-8fcd,U+8fcf,U+8fd2,U+8fd6-8fd7,U+8fda,U+8fe0-8fe1,U+8fe3,U+8fe7,U+8fec,U+8fef,U+8ff1-8ff2,U+8ff4-8ff6,U+8ffa-8ffc,U+8ffe-8fff,U+9007-9008,U+900c,U+900e,U+9013,U+9015,U+9018-9019,U+901c,U+9023-9025,U+9027-902a",
		},
	},
	{
		uri: hp,
		descriptors: {
			unicodeRange:
				"U+8d03-8d1c,U+8d20,U+8d51-8d52,U+8d57,U+8d5f,U+8d65,U+8d68-8d6a,U+8d6c,U+8d6e-8d6f,U+8d71-8d72,U+8d78-8d80,U+8d82-8d83,U+8d86-8d89,U+8d8c-8d90,U+8d92-8d93,U+8d95-8d9e,U+8da0-8da2,U+8da4-8db0,U+8db2,U+8db6-8db7,U+8db9,U+8dbb,U+8dbd,U+8dc0-8dc2,U+8dc5,U+8dc7-8dca,U+8dcd,U+8dd0,U+8dd2-8dd5,U+8dd8-8dd9,U+8ddc,U+8de0-8de2,U+8de5-8de7,U+8de9,U+8ded-8dee,U+8df0-8df2,U+8df4,U+8df6,U+8dfc,U+8dfe-8e04,U+8e06-8e08,U+8e0b,U+8e0d-8e0e,U+8e10-8e13,U+8e15-8e1c,U+8e20-8e21,U+8e24-8e28,U+8e2b,U+8e2d,U+8e30,U+8e32-8e34,U+8e36-8e38,U+8e3b-8e3c,U+8e3e-8e3f,U+8e43,U+8e45-8e46",
		},
	},
	{
		uri: bp,
		descriptors: {
			unicodeRange:
				"U+8bea,U+8c09,U+8c1e,U+8c38-8c40,U+8c42-8c45,U+8c48,U+8c4a-8c4b,U+8c4d-8c54,U+8c56-8c59,U+8c5b-8c60,U+8c63-8c69,U+8c6c-8c72,U+8c74-8c77,U+8c7b-8c81,U+8c83-8c84,U+8c86-8c88,U+8c8b,U+8c8d-8c93,U+8c95-8c97,U+8c99-8d02",
		},
	},
	{
		uri: gp,
		descriptors: {
			unicodeRange:
				"U+8a64-8a78,U+8a7a-8a88,U+8a8b-8a92,U+8a94-8b06,U+8b08-8b1b",
		},
	},
	{
		uri: Ep,
		descriptors: {
			unicodeRange:
				"U+8987-89c0,U+89c3,U+89cd,U+89d3-89d5,U+89d7-89d9,U+89db,U+89dd,U+89df-89e2,U+89e4,U+89e7-89ea,U+89ec-89ee,U+89f0-89f2,U+89f4-89ff,U+8a01-8a06,U+8a08-8a3d,U+8a3f-8a47,U+8a49-8a63",
		},
	},
	{
		uri: xp,
		descriptors: {
			unicodeRange:
				"U+87e3-87e4,U+87e6-87e9,U+87eb-87ed,U+87ef-87f8,U+87fa-87fd,U+87ff-8802,U+8804-8809,U+880b-8812,U+8814,U+8817-881a,U+881c-8820,U+8823-8831,U+8833-8838,U+883a-883b,U+883d-883f,U+8841-8843,U+8846-884b,U+884e-8853,U+8855-8856,U+8858,U+885a-8860,U+8866-8867,U+886a,U+886d,U+886f,U+8871,U+8873-8876,U+8878-887c,U+8880,U+8883,U+8886-8887,U+8889-888a,U+888c,U+888e-8891,U+8893-8895,U+8897-889b,U+889d-88a1,U+88a3,U+88a5-88aa,U+88ac,U+88ae-88b0,U+88b2-88b6,U+88b8-88bb",
		},
	},
	{
		uri: yp,
		descriptors: {
			unicodeRange:
				"U+86e7-86e8,U+86ea-86ec,U+86ef,U+86f5-86f7,U+86fa-86fd,U+86ff,U+8701,U+8704-8706,U+870b-870c,U+870e-8711,U+8714,U+8716,U+8719,U+871b,U+871d,U+871f-8720,U+8724,U+8726-8728,U+872a-872d,U+872f-8730,U+8732-8733,U+8735-8736,U+8738-873a,U+873c-873d,U+8740-8746,U+874a-874b,U+874d,U+874f-8752,U+8754-8756,U+8758,U+875a-875f,U+8761-8762,U+8766-876d,U+876f,U+8771-8773,U+8775,U+8777-877a,U+877f-8781,U+8784,U+8786-8787,U+8789-878a,U+878c,U+878e-8792,U+8794-8796,U+8798-879e,U+87a0-87a7,U+87a9-87aa,U+87ae,U+87b0-87b2,U+87b4,U+87b6-87b9,U+87bb-87bc,U+87be-87bf,U+87c1-87c5,U+87c7-87c9,U+87cc-87d0,U+87d4-87da,U+87dc-87df,U+87e1-87e2",
		},
	},
	{
		uri: wp,
		descriptors: {
			unicodeRange:
				"U+8604,U+8606-8610,U+8612-8615,U+8617-8626,U+8628,U+862a-8637,U+8639-863b,U+863d-864c,U+8652-8653,U+8655-8659,U+865b-865d,U+865f-8661,U+8663-866a,U+866d,U+866f-8670,U+8672-8678,U+8683-8689,U+868e-8692,U+8694,U+8696-869b,U+869e-86a2,U+86a5-86a6,U+86ab,U+86ad-86ae,U+86b2-86b3,U+86b7-86b9,U+86bb-86bf,U+86c1-86c3,U+86c5,U+86c8,U+86cc-86cd,U+86d2-86d3,U+86d5-86d7,U+86da,U+86dc-86dd,U+86e0-86e3,U+86e5-86e6",
		},
	},
	{
		uri: Ip,
		descriptors: {
			unicodeRange:
				"U+8456,U+8458,U+845d-8460,U+8462,U+8464-8468,U+846a,U+846e-8470,U+8472,U+8474,U+8477,U+8479,U+847b-8481,U+8483-8486,U+848a,U+848d,U+848f-8496,U+8498,U+849a-849b,U+849d-84a0,U+84a2-84ae,U+84b0-84b1,U+84b3,U+84b5-84b7,U+84bb-84bc,U+84be,U+84c0,U+84c2-84c3,U+84c5-84c8,U+84cb-84cc,U+84ce-84cf,U+84d2,U+84d4-84d5,U+84d7-84dc,U+84de,U+84e1-84e2,U+84e4,U+84e7-84eb,U+84ed-84ef,U+84f1-84fb,U+84fd-84fe,U+8500-850b,U+850d-8510,U+8512,U+8514-8516,U+8518-8519,U+851b-851e,U+8520,U+8522-852a,U+852d-8536,U+853e-8542,U+8544-8547,U+854b-854f",
		},
	},
	{
		uri: Tp,
		descriptors: {
			unicodeRange:
				"U+82c2-82c3,U+82c5-82c6,U+82c9,U+82d0,U+82d6,U+82d9-82da,U+82dd,U+82e2,U+82e7-82ea,U+82ec-82ee,U+82f0,U+82f2-82f3,U+82f5-82f6,U+82f8,U+82fa,U+82fc-8300,U+830a-830b,U+830d,U+8310,U+8312-8313,U+8316,U+8318-8319,U+831d-8326,U+8329-832a,U+832e,U+8330,U+8332,U+8337,U+833b,U+833d-833f,U+8341-8342,U+8344-8345,U+8348,U+834a-834e,U+8353,U+8355-8359,U+835d,U+8362,U+8370-8376,U+8379-837a,U+837e-8384,U+8387-8388,U+838a-838d,U+838f-8391,U+8394-8397,U+8399-839a,U+839d,U+839f,U+83a1-83a7,U+83ac-83af,U+83b5,U+83bb,U+83be-83bf,U+83c2-83c4,U+83c6,U+83c8-83c9,U+83cb,U+83cd-83ce,U+83d0-83d3,U+83d5,U+83d7,U+83d9-83db,U+83de,U+83e2-83e4,U+83e6-83e8,U+83eb-83ef,U+83f3-83f7,U+83fa-83fc,U+83fe-8400,U+8402,U+8405,U+8407-840a,U+8410,U+8412-8417,U+8419-841b,U+841e-8423,U+8429-8430,U+8432-8437,U+8439-843b,U+843e-8445,U+8447-8450,U+8452-8455",
		},
	},
	{
		uri: Rp,
		descriptors: {
			unicodeRange:
				"U+81a4-81a5,U+81a7,U+81a9,U+81ab-81b2,U+81b4-81b9,U+81bc-81bf,U+81c4-81c5,U+81c7-81c9,U+81cb,U+81cd-81e2,U+81e4-81e6,U+81e8-81e9,U+81eb,U+81ee-81f2,U+81f5-81fa,U+81fd,U+81ff,U+8203,U+8207-820b,U+820e-820f,U+8211,U+8213,U+8215-821a,U+821d,U+8220,U+8224-8227,U+8229,U+822e,U+8232,U+823a,U+823c-823d,U+823f-8243,U+8245-8246,U+8248,U+824a,U+824c-824e,U+8250-8257,U+8259,U+825b-825e,U+8260-8267,U+8269-826d,U+8271,U+8275-8278,U+827b-827c,U+8280-8281,U+8283,U+8285-8287,U+8289,U+828c,U+8290,U+8293-8296,U+829a-829b,U+829e,U+82a0,U+82a2-82a3,U+82a7,U+82b2,U+82b5-82b6,U+82ba-82bc,U+82bf-82c0",
		},
	},
	{
		uri: vp,
		descriptors: {
			unicodeRange:
				"U+8059,U+805b-8068,U+806b-8070,U+8072-807e,U+8081-8082,U+8085,U+8088,U+808a,U+808d-8092,U+8094-8095,U+8097,U+8099,U+809e,U+80a3,U+80a6-80a8,U+80ac,U+80b0,U+80b3,U+80b5-80b6,U+80b8-80b9,U+80bb,U+80c5,U+80c7-80cb,U+80cf-80d5,U+80d8,U+80df-80e0,U+80e2-80e3,U+80e6,U+80ee,U+80f5,U+80f7,U+80f9,U+80fb,U+80fe-8101,U+8103-8105,U+8107-8108,U+810b-810c,U+8115,U+8117,U+8119,U+811b-811d,U+811f-812b,U+812d-812e,U+8130,U+8133-8135,U+8137,U+8139-813d,U+813f-8145,U+8147,U+8149,U+814d-814f,U+8152,U+8156-8158,U+815b-815f,U+8161-8164,U+8166,U+8168,U+816a-816c,U+816f,U+8172-8173,U+8175-8178,U+8181,U+8183-8187,U+8189,U+818b-818e,U+8190,U+8192-8197,U+8199-819a,U+819e-81a2",
		},
	},
	{
		uri: Mp,
		descriptors: {
			unicodeRange:
				"U+7f3c-7f41,U+7f43,U+7f46-7f4f,U+7f52-7f53,U+7f56,U+7f59,U+7f5b-7f5e,U+7f60,U+7f63-7f67,U+7f6b-7f6d,U+7f6f-7f70,U+7f73,U+7f75-7f78,U+7f7a-7f7d,U+7f7f-7f80,U+7f82-7f89,U+7f8b,U+7f8d,U+7f8f-7f93,U+7f95-7f99,U+7f9b-7f9c,U+7fa0,U+7fa2-7fa3,U+7fa5-7fa6,U+7fa8-7fae,U+7fb1,U+7fb3-7fb7,U+7fba-7fbb,U+7fbe,U+7fc0,U+7fc2-7fc4,U+7fc6-7fc9,U+7fcb,U+7fcd,U+7fcf-7fd3,U+7fd6-7fd7,U+7fd9-7fde,U+7fe2-7fe4,U+7fe7-7fe8,U+7fea-7fed,U+7fef,U+7ff2,U+7ff4-7ffa,U+7ffd-7fff,U+8002,U+8007-800a,U+800e-800f,U+8011,U+8013,U+801a-801b,U+801d-801f,U+8021,U+8023-8024,U+802b-8030,U+8032,U+8034,U+8039-803a,U+803c,U+803e,U+8040-8041,U+8044-8045,U+8047-8049,U+804e-8051,U+8053,U+8055-8057",
		},
	},
	{
		uri: _p,
		descriptors: {
			unicodeRange:
				"U+7cd8,U+7cda-7cdb,U+7cdd-7cde,U+7ce1-7ce7,U+7ce9-7cee,U+7cf0-7cf7,U+7cf9-7cfa,U+7cfc-7d09,U+7d0b-7d1f,U+7d21,U+7d23-7d26,U+7d28-7d2a,U+7d2c-7d2e,U+7d30-7d6d,U+7d6f-7d76,U+7d78-7d94",
		},
	},
	{
		uri: Lp,
		descriptors: {
			unicodeRange:
				"U+7afe,U+7b00-7b02,U+7b05,U+7b07,U+7b09,U+7b0c-7b0e,U+7b10,U+7b12-7b13,U+7b16-7b18,U+7b1a,U+7b1c-7b1d,U+7b1f,U+7b21-7b23,U+7b27,U+7b29,U+7b2d,U+7b2f-7b30,U+7b32,U+7b34-7b37,U+7b39,U+7b3b,U+7b3d,U+7b3f-7b44,U+7b46,U+7b48,U+7b4a,U+7b4d-7b4e,U+7b53,U+7b55,U+7b57,U+7b59,U+7b5c,U+7b5e-7b5f,U+7b61,U+7b63-7b6d,U+7b6f-7b70,U+7b73-7b74,U+7b76,U+7b78,U+7b7a,U+7b7c-7b7d,U+7b7f,U+7b81-7b84,U+7b86-7b8c,U+7b8e-7b8f,U+7b91-7b93,U+7b96,U+7b98-7b9b,U+7b9e-7ba0,U+7ba3-7ba5,U+7bae-7bb0,U+7bb2-7bb3,U+7bb5-7bb7,U+7bb9-7bc0,U+7bc2-7bc5,U+7bc8-7bcb,U+7bcd-7bd0,U+7bd2,U+7bd4-7bd8,U+7bdb-7bdc,U+7bde-7be0,U+7be2-7be4,U+7be7-7be9,U+7beb-7bed,U+7bef-7bf0,U+7bf2-7bf6,U+7bf8-7bfb,U+7bfd,U+7bff-7c06,U+7c08-7c0a,U+7c0d-7c0e,U+7c10-7c13",
		},
	},
	{
		uri: Dp,
		descriptors: {
			unicodeRange:
				"U+7a10-7a13,U+7a15-7a16,U+7a18-7a19,U+7a1b-7a1d,U+7a1f,U+7a21-7a22,U+7a24-7a32,U+7a34-7a36,U+7a38,U+7a3a,U+7a3e,U+7a40-7a45,U+7a47-7a50,U+7a52-7a56,U+7a58-7a6f,U+7a71-7a73,U+7a75,U+7a7b-7a7e,U+7a82,U+7a85,U+7a87,U+7a89-7a8c,U+7a8e-7a90,U+7a93-7a94,U+7a99-7a9b,U+7a9e,U+7aa1-7aa4,U+7aa7,U+7aa9-7aab,U+7aae-7ab2,U+7ab4-7abe,U+7ac0-7aca,U+7acc-7ad5,U+7ad7-7ad8,U+7ada-7add,U+7ae1-7ae2,U+7ae4,U+7ae7-7aec,U+7aee,U+7af0-7af8,U+7afb-7afc",
		},
	},
	{
		uri: Sp,
		descriptors: {
			unicodeRange:
				"U+790d-7912,U+7914-791d,U+791f-7923,U+7925-7933,U+7935-7939,U+793d,U+793f,U+7942-7945,U+7947,U+794a-7952,U+7954-7955,U+7958-7959,U+7961,U+7963-7964,U+7966,U+7969-796c,U+796e,U+7970-7976,U+7979,U+797b-797f,U+7982-7983,U+7986-7989,U+798b-798e,U+7990-7999,U+799b-79a6,U+79a8-79b2,U+79b4-79b8,U+79bc,U+79bf,U+79c2,U+79c4-79c5,U+79c7-79c8,U+79ca,U+79cc,U+79ce-79d0,U+79d3-79d4,U+79d6-79d7,U+79d9-79de,U+79e0-79e2,U+79e5,U+79e8,U+79ea,U+79ec,U+79ee,U+79f1-79f7,U+79f9-79fa,U+79fc,U+79fe-79ff,U+7a01,U+7a04-7a05,U+7a07-7a0a,U+7a0c,U+7a0f",
		},
	},
	{
		uri: $p,
		descriptors: {
			unicodeRange:
				"U+77d8-77da,U+77dd-77e1,U+77e4,U+77e6,U+77e8,U+77ea,U+77ef-77f2,U+77f4-77f5,U+77f7,U+77f9-77fc,U+7803-7808,U+780a-780b,U+780e-7810,U+7813,U+7815,U+7819,U+781b,U+781e,U+7820-7822,U+7824,U+7828,U+782a-782b,U+782e-782f,U+7831-7833,U+7835-7836,U+783d,U+783f,U+7841-7844,U+7846,U+7848-784b,U+784d,U+784f,U+7851,U+7853-7854,U+7858-785c,U+785e-7869,U+786f-7876,U+7878-787b,U+787d-7886,U+7888,U+788a-788b,U+788f-7890,U+7892,U+7894-7896,U+7899,U+789d-789e,U+78a0,U+78a2,U+78a4,U+78a6,U+78a8-78af,U+78b5-78b8,U+78ba-78bd,U+78bf-78c0,U+78c2-78c4,U+78c6-78c8,U+78cc-78cf,U+78d1-78d3,U+78d6-78d8,U+78da-78e7,U+78e9-78eb,U+78ed-78f1,U+78f3,U+78f5-78f6,U+78f8-78f9,U+78fb-7900,U+7902-7904,U+7906-790c",
		},
	},
	{
		uri: Np,
		descriptors: {
			unicodeRange:
				"U+76af-76b0,U+76b3,U+76b5-76be,U+76c0-76c1,U+76c3-76c4,U+76c7,U+76c9,U+76cb-76cc,U+76d3,U+76d5,U+76d9-76da,U+76dc-76de,U+76e0-76e4,U+76e6-76ed,U+76f0,U+76f3,U+76f5-76f7,U+76fa-76fb,U+76fd,U+76ff-7703,U+7705-7706,U+770a,U+770c,U+770e-7718,U+771b-771e,U+7721,U+7723-7725,U+7727,U+772a-772c,U+772e,U+7730-7734,U+7739,U+773b,U+773d-773f,U+7742,U+7744-7746,U+7748-774f,U+7752-7759,U+775c-7760,U+7764,U+7767,U+7769-776a,U+776d-7778,U+777a-777c,U+7781-7783,U+7786-778b,U+778f-7790,U+7793-779e,U+77a1,U+77a3-77a4,U+77a6,U+77a8,U+77ab,U+77ad-77af,U+77b1-77b2,U+77b4,U+77b6-77ba,U+77bc,U+77be,U+77c0-77cc,U+77ce-77d6",
		},
	},
	{
		uri: Pp,
		descriptors: {
			unicodeRange:
				"U+7589-758a,U+758c-758e,U+7590,U+7593,U+7595,U+7598,U+759b-759c,U+759e,U+75a2,U+75a6-75aa,U+75ad,U+75b6-75b7,U+75ba-75bb,U+75bf-75c1,U+75c6,U+75cb-75cc,U+75ce-75d1,U+75d3,U+75d7,U+75d9-75da,U+75dc-75dd,U+75df-75e1,U+75e5,U+75e9,U+75ec-75ef,U+75f2-75f3,U+75f5-75f8,U+75fa-75fb,U+75fd-75fe,U+7602,U+7604,U+7606-7609,U+760b,U+760d-760f,U+7611-7614,U+7616,U+761a,U+761c-761e,U+7621,U+7623,U+7627-7628,U+762c,U+762e-762f,U+7631-7632,U+7636-7637,U+7639-763b,U+763d,U+7641-7642,U+7644-764b,U+764e-7653,U+7655,U+7657-765b,U+765d,U+765f-7662,U+7664-766a,U+766c-766e,U+7670-7677,U+7679-767a,U+767c,U+767f-7681,U+7683,U+7685,U+7689-768a,U+768c-768d,U+768f-7690,U+7692,U+7694-7695,U+7697-7698,U+769a-76a3,U+76a5-76ad",
		},
	},
	{
		uri: Fp,
		descriptors: {
			unicodeRange:
				"U+7492-749b,U+749d,U+749f-74a6,U+74aa-74b9,U+74bb-74d1,U+74d3-74db,U+74dd,U+74df,U+74e1,U+74e5,U+74e7-74ed,U+74f0-74f3,U+74f5,U+74f8-74fe,U+7500-7503,U+7505-750c,U+750e,U+7510,U+7512,U+7514-7517,U+751b,U+751d-751e,U+7520-7524,U+7526-7527,U+752a,U+752e,U+7534,U+7536,U+7539,U+753c-753d,U+753f,U+7541-7544,U+7546-7547,U+7549-754a,U+754d,U+7550-7553,U+7555-7558,U+755d-7564,U+7567-7569,U+756b-7571,U+7573,U+7575-7577,U+757a-757e,U+7580-7582,U+7584-7585,U+7587-7588",
		},
	},
	{
		uri: Op,
		descriptors: {
			unicodeRange:
				"U+7372-737d,U+737f-7383,U+7385-7386,U+7388,U+738a,U+738c-738d,U+738f-7390,U+7392-7395,U+7397-739a,U+739c-739e,U+73a0-73a1,U+73a3-73a8,U+73aa,U+73ac-73ad,U+73b1,U+73b4-73b6,U+73b8-73b9,U+73bc-73bf,U+73c1,U+73c3-73c7,U+73cb-73cc,U+73ce,U+73d2-73d8,U+73da-73dd,U+73df,U+73e1-73e4,U+73e6,U+73e8,U+73ea-73ec,U+73ee-73f1,U+73f3-7402,U+7404,U+7407-7408,U+740b-740e,U+7411-7419,U+741c-7421,U+7423-7424,U+7427,U+7429,U+742b,U+742d,U+742f,U+7431-7432,U+7437-743b,U+743d-7440,U+7442-7454,U+7456,U+7458,U+745d,U+7460-746c,U+746e-746f,U+7471-7475,U+7478-747d,U+747f,U+7482,U+7484-7486,U+7488-748a,U+748c-748d,U+748f,U+7491",
		},
	},
	{
		uri: Ap,
		descriptors: {
			unicodeRange:
				"U+7054-705d,U+705f-706a,U+706e,U+7071-7074,U+7077,U+7079-707b,U+707d,U+7081-7084,U+7086-7088,U+708b-708d,U+708f-7091,U+7093,U+7097-7098,U+709a-709b,U+709e-70aa,U+70b0,U+70b2,U+70b4-70b6,U+70ba,U+70be-70bf,U+70c4-70c7,U+70c9,U+70cb-70d7,U+70da,U+70dc-70de,U+70e0-70e3,U+70e5,U+70ea,U+70ee,U+70f0-70f6,U+70f8,U+70fa-70fc,U+70fe-7108,U+710b-710f,U+7111-7112,U+7114,U+7117,U+711b-7125,U+7127-712e,U+7132-7135,U+7137-7144,U+7146-7149,U+714b,U+714d,U+714f-715b,U+715d,U+715f-7163,U+7165,U+7169-716d,U+716f-7171,U+7174-7177",
		},
	},
	{
		uri: Bp,
		descriptors: {
			unicodeRange:
				"U+722e-722f,U+7232-7234,U+723a,U+723c,U+723e,U+7240-7246,U+7249-724b,U+724e-7251,U+7253-7255,U+7257-7258,U+725a,U+725c,U+725e,U+7260,U+7263-7265,U+7268,U+726a-726d,U+7270-7271,U+7273-7274,U+7276-7278,U+727b-727d,U+7282-7283,U+7285-7289,U+728c,U+728e,U+7290-7291,U+7293-729e,U+72a0-72ab,U+72ae,U+72b1-72b3,U+72b5,U+72ba-72c0,U+72c5-72c7,U+72c9-72cc,U+72cf,U+72d1,U+72d3-72d6,U+72d8,U+72da-72dd,U+72df,U+72e2-72e7,U+72ea-72eb,U+72f5-72f6,U+72f9,U+72fd-7300,U+7302,U+7304-7309,U+730b-730d,U+730f-7312,U+7314,U+7318-731a,U+731f-7320,U+7323-7324,U+7326-7328,U+732d,U+732f-7330,U+7332-7333,U+7335-7336,U+733a-733d,U+7340-734c,U+734e-734f,U+7351,U+7353-7356,U+7358-735f,U+7361-736b,U+736e,U+7370-7371",
		},
	},
	{
		uri: Cp,
		descriptors: {
			unicodeRange:
				"U+6ec5-6ec6,U+6ec8-6eca,U+6ecc-6ece,U+6ed0,U+6ed2,U+6ed6,U+6ed8-6ed9,U+6edb-6edd,U+6ee3,U+6ee7,U+6eea-6ef3,U+6ef5-6ef8,U+6efa-6f01,U+6f03-6f05,U+6f07-6f08,U+6f0a-6f0e,U+6f10-6f12,U+6f16-6f1f,U+6f21-6f23,U+6f25-6f28,U+6f2c,U+6f2e,U+6f30,U+6f32,U+6f34-6f35,U+6f37-6f3d,U+6f3f-6f45,U+6f48-6f4a,U+6f4c,U+6f4e-6f57,U+6f59-6f5b,U+6f5d,U+6f5f-6f61,U+6f63-6f65,U+6f67-6f6c,U+6f6f-6f71,U+6f73,U+6f75-6f77,U+6f79,U+6f7b,U+6f7d-6f83,U+6f85-6f87,U+6f8a-6f8b,U+6f8f-6f9b,U+6f9d-6fa0,U+6fa2-6fa6,U+6fa8-6fb1",
		},
	},
	{
		uri: Kp,
		descriptors: {
			unicodeRange:
				"U+6d73,U+6d75-6d76,U+6d79-6d7b,U+6d7d-6d81,U+6d83-6d84,U+6d86-6d87,U+6d8a-6d8b,U+6d8d,U+6d8f-6d90,U+6d92,U+6d96-6d9a,U+6d9c,U+6da2,U+6da5,U+6dac-6dad,U+6db0-6db1,U+6db3-6db4,U+6db6-6db7,U+6db9-6dbe,U+6dc1-6dc3,U+6dc8-6dca,U+6dcd-6dd0,U+6dd2-6dd5,U+6dd7,U+6dda-6ddc,U+6ddf,U+6de2-6de3,U+6de5,U+6de7-6dea,U+6ded,U+6def-6df0,U+6df2,U+6df4-6df6,U+6df8,U+6dfa,U+6dfd-6e04,U+6e06-6e09,U+6e0b,U+6e0f,U+6e12-6e13,U+6e15,U+6e18-6e19,U+6e1b-6e1c,U+6e1e-6e1f,U+6e22,U+6e26-6e28,U+6e2a,U+6e2c,U+6e2e,U+6e30-6e31,U+6e33,U+6e35-6e37,U+6e39,U+6e3b-6e42,U+6e45-6e4c,U+6e4f-6e52,U+6e55,U+6e57,U+6e59-6e5a,U+6e5c-6e5e,U+6e60-6e6a,U+6e6c-6e6d,U+6e6f-6e7d,U+6e80-6e82,U+6e84,U+6e87-6e88,U+6e8a-6e8e,U+6e91-6e97,U+6e99-6e9b,U+6e9d-6e9e,U+6ea0-6ea1,U+6ea3-6ea4,U+6ea6,U+6ea8-6ea9,U+6eab-6eae,U+6eb0,U+6eb3,U+6eb5,U+6eb8-6eb9,U+6ebc,U+6ebe-6ec0,U+6ec3-6ec4",
		},
	},
	{
		uri: Hp,
		descriptors: {
			unicodeRange:
				"U+6bbb-6bbe,U+6bc0,U+6bc3-6bc4,U+6bc6-6bca,U+6bcc,U+6bce,U+6bd0-6bd1,U+6bd8,U+6bda,U+6bdc-6be0,U+6be2-6be9,U+6bec-6bee,U+6bf0-6bf2,U+6bf4,U+6bf6-6bf8,U+6bfa-6bfc,U+6bfe-6c04,U+6c08-6c0c,U+6c0e,U+6c12,U+6c17,U+6c1c-6c1e,U+6c20,U+6c23,U+6c25,U+6c2b-6c2d,U+6c31,U+6c33,U+6c36-6c37,U+6c39-6c3c,U+6c3e-6c3f,U+6c43-6c45,U+6c48,U+6c4b-6c4f,U+6c51-6c53,U+6c56,U+6c58-6c5a,U+6c62-6c63,U+6c65-6c67,U+6c6b-6c6f,U+6c71,U+6c73,U+6c75,U+6c77-6c78,U+6c7a-6c7c,U+6c7f-6c80,U+6c84,U+6c87,U+6c8a-6c8b,U+6c8d-6c8e,U+6c91-6c92,U+6c95-6c98,U+6c9a,U+6c9c-6c9e,U+6ca0,U+6ca2,U+6ca8,U+6cac,U+6caf-6cb0,U+6cb4-6cb7,U+6cba,U+6cc0-6cc3,U+6cc6-6cc8,U+6ccb,U+6ccd-6ccf,U+6cd1-6cd2,U+6cd8-6cda,U+6cdc-6cdd,U+6cdf,U+6ce4,U+6ce6-6ce7,U+6ce9,U+6cec-6ced,U+6cf2,U+6cf4,U+6cf9,U+6cff-6d00,U+6d02-6d03,U+6d05-6d06,U+6d08-6d0a,U+6d0d,U+6d0f-6d11,U+6d13-6d16,U+6d18,U+6d1c-6d1d,U+6d1f-6d24,U+6d26,U+6d28-6d29,U+6d2c-6d2d,U+6d2f-6d30,U+6d34,U+6d36-6d38,U+6d3a,U+6d3f-6d40,U+6d42,U+6d44,U+6d49,U+6d4c,U+6d50,U+6d55-6d58,U+6d5b,U+6d5d,U+6d5f,U+6d61-6d62,U+6d64-6d65,U+6d67-6d68,U+6d6b-6d6d,U+6d70-6d72",
		},
	},
	{
		uri: Jp,
		descriptors: {
			unicodeRange:
				"U+6967-696a,U+696c-696d,U+696f-6970,U+6972-6976,U+697a-697b,U+697d-697f,U+6981,U+6983,U+6985,U+698a-698c,U+698e-6993,U+6996-6997,U+6999-699a,U+699d-69a6,U+69a9-69aa,U+69ac,U+69ae-69b0,U+69b2-69b3,U+69b5-69b6,U+69b8-69ba,U+69bc-69c0,U+69c2-69c9,U+69cb,U+69cd,U+69cf,U+69d1-69d3,U+69d5-69da,U+69dc-69de,U+69e1-69ec,U+69ee-69f1,U+69f3-69fc,U+69fe,U+6a00-6a09,U+6a0b-6a16,U+6a19-6a1e,U+6a20,U+6a22-6a27,U+6a29,U+6a2b-6a2e,U+6a30,U+6a32-6a34,U+6a36-6a3c,U+6a3f-6a43,U+6a45-6a46,U+6a48-6a4a",
		},
	},
	{
		uri: kp,
		descriptors: {
			unicodeRange:
				"U+6830-6831,U+6834-6836,U+683a-683b,U+683f,U+6847,U+684b,U+684d,U+684f,U+6852,U+6856-685f,U+686a,U+686c-6873,U+6875,U+6878-6880,U+6882,U+6884,U+6887-688e,U+6890-6892,U+6894-6896,U+6898-68a1,U+68a3-68a5,U+68a9-68ac,U+68ae,U+68b1-68b2,U+68b4,U+68b6-68bf,U+68c1,U+68c3-68c8,U+68ca,U+68cc,U+68ce-68d1,U+68d3-68d4,U+68d6-68d7,U+68d9,U+68db-68df,U+68e1-68e2,U+68e4-68ed,U+68ef,U+68f2-68f4,U+68f6-68f8,U+68fb,U+68fd-6900,U+6902-6904,U+6906-690a,U+690c,U+690f,U+6911,U+6913-691e,U+6921-6923,U+6925-692c,U+692e-692f,U+6931-6933,U+6935-6938,U+693a-693c,U+693e,U+6940-6941,U+6943-6953,U+6955-6956,U+6958-6959,U+695b-695c,U+695f,U+6961-6962,U+6964-6965",
		},
	},
	{
		uri: Yp,
		descriptors: {
			unicodeRange:
				"U+66b8,U+66ba-66bd,U+66bf-66d8,U+66da,U+66de-66e5,U+66e7-66e8,U+66ea-66ef,U+66f1,U+66f5-66f6,U+66f8,U+66fa-66fb,U+66fd,U+6701-6707,U+670c,U+670e-670f,U+6711-6713,U+6716,U+6718-671a,U+671c,U+671e,U+6720-6725,U+6727,U+6729,U+672e,U+6730,U+6732-6733,U+6736-6739,U+673b-673c,U+673e-673f,U+6741,U+6744-6745,U+6747,U+674a-674b,U+674d,U+6752,U+6754-6755,U+6757-675b,U+675d,U+6762-6764,U+6766-6767,U+676b-676c,U+676e,U+6771,U+6774,U+6776,U+6778-677b,U+677d,U+6780,U+6782-6783,U+6785-6786,U+6788,U+678a,U+678c-678f,U+6791-6794,U+6796,U+6799,U+679b,U+679f-67a1,U+67a4,U+67a6,U+67a9,U+67ac,U+67ae,U+67b1-67b2,U+67b4,U+67b9-67c0,U+67c2,U+67c5-67ce,U+67d5-67d7,U+67db,U+67df,U+67e1,U+67e3-67e4,U+67e6-67e8,U+67ea-67eb,U+67ed-67ee,U+67f2,U+67f5-67fc,U+67fe,U+6801-6804,U+6806,U+680d,U+6810,U+6812,U+6814-6815,U+6818-681c,U+681e-6820,U+6822-6828,U+682b-682f",
		},
	},
	{
		uri: Vp,
		descriptors: {
			unicodeRange:
				"U+6569-656a,U+656d-656f,U+6571,U+6573,U+6575-6576,U+6578-6586,U+6588-658a,U+658d-658f,U+6592,U+6594-6596,U+6598,U+659a,U+659d-659e,U+65a0,U+65a2-65a3,U+65a6,U+65a8,U+65aa,U+65ac,U+65ae,U+65b1-65b8,U+65ba-65bb,U+65be-65c0,U+65c2,U+65c7-65ca,U+65cd,U+65d0-65d1,U+65d3-65d5,U+65d8-65df,U+65e1,U+65e3-65e4,U+65ea-65eb,U+65f2-65f5,U+65f8-65f9,U+65fb-65ff,U+6601,U+6604-6605,U+6607-6609,U+660b,U+660d,U+6610-6612,U+6616-6618,U+661a-661c,U+661e,U+6621-6624,U+6626,U+6629-662c,U+662e,U+6630,U+6632-6633,U+6637-663b,U+663d,U+663f-6640,U+6642,U+6644-664a,U+664d-664e,U+6650-6651,U+6658-6659,U+665b-665e,U+6660,U+6662-6663,U+6665,U+6667,U+6669-666d,U+6671-6673,U+6675,U+6678-6679,U+667b-667d,U+667f-6681,U+6683,U+6685-6686,U+6688-668b,U+668d-6690,U+6692-6695,U+6698-669c,U+669e-66a6,U+66a9-66ad,U+66af-66b3,U+66b5-66b7",
		},
	},
	{
		uri: qp,
		descriptors: {
			unicodeRange:
				"U+5f30,U+5f32-5f38,U+5f3b,U+5f3d-5f3f,U+5f41-5f4f,U+5f51,U+5f54,U+5f59-5f5c,U+5f5e-5f60,U+5f63,U+5f65,U+5f67-5f68,U+5f6b,U+5f6e-5f6f,U+5f72,U+5f74-5f76,U+5f78,U+5f7a,U+5f7d-5f7f,U+5f83,U+5f86,U+5f8d-5f8f,U+5f91,U+5f93-5f94,U+5f96,U+5f9a-5f9b,U+5f9d-5fa0,U+5fa2-5fa7,U+5fa9,U+5fab-5fac,U+5faf-5fb4,U+5fb6,U+5fb8-5fbb,U+5fbe-5fc2,U+5fc7-5fc8,U+5fca-5fcb,U+5fce,U+5fd3-5fd5,U+5fda-5fdc,U+5fde-5fdf,U+5fe2-5fe3,U+5fe5-5fe6,U+5fe8-5fe9,U+5fec,U+5fef-5ff0,U+5ff2-5ff4,U+5ff6-5ff7,U+5ff9-5ffa,U+5ffc,U+6007-6009,U+600b-600c,U+6010-6011,U+6013,U+6017-6018,U+601a,U+601e-601f,U+6022-6024,U+602c-602e,U+6030-6034,U+6036-603a,U+603d-603e,U+6040,U+6044-604a,U+604c,U+604e-604f,U+6051,U+6053-6054,U+6056-6058,U+605b-605c,U+605e-6061,U+6065-6066,U+606e,U+6071-6072,U+6074-6075,U+6077,U+607e,U+6080-6082,U+6085-6088,U+608a-608b,U+608e-6091,U+6093,U+6095,U+6097-6099,U+609c,U+609e,U+60a1-60a2,U+60a4-60a5,U+60a7,U+60a9-60aa,U+60ae,U+60b0,U+60b3,U+60b5-60b7,U+60b9-60ba,U+60bd-60c4,U+60c7-60c9,U+60cc",
		},
	},
	{
		uri: Gp,
		descriptors: {
			unicodeRange:
				"U+635a-635d,U+6360,U+6364-6366,U+6368,U+636a-636c,U+636f-6370,U+6372-6375,U+6378-6379,U+637c-637f,U+6381,U+6383-6386,U+638b,U+638d,U+6391,U+6393-6395,U+6397,U+6399-639f,U+63a1,U+63a4,U+63a6,U+63ab,U+63af,U+63b1-63b2,U+63b5-63b6,U+63b9,U+63bb,U+63bd,U+63bf-63c3,U+63c5,U+63c7-63c8,U+63ca-63cc,U+63d1,U+63d3-63d5,U+63d7-63dd,U+63df,U+63e2,U+63e4-63e8,U+63eb-63ec,U+63ee-63f1,U+63f3,U+63f5,U+63f7,U+63f9-63fc,U+63fe,U+6403-6404,U+6406-640a,U+640d-640e,U+6411-6412,U+6415-641a,U+641d,U+641f,U+6422-6425,U+6427-6429,U+642b,U+642e-6433,U+6435-6439,U+643b-643c,U+643e,U+6440,U+6442-6443,U+6449,U+644b-6451,U+6453,U+6455-6457,U+6459-645d,U+645f-6466,U+6468,U+646a-646c,U+646e-6477,U+647b-6481,U+6483,U+6486,U+6488-648f",
		},
	},
	{
		uri: Xp,
		descriptors: {
			unicodeRange:
				"U+61c5-61c7,U+61c9,U+61cc-61d0,U+61d3,U+61d5-61e5,U+61e7-61f4,U+61f6-61fe,U+6200-6205,U+6207,U+6209,U+6213-6214,U+6219,U+621c-621e,U+6220,U+6223,U+6226-6229,U+622b,U+622d,U+622f-6232,U+6235-6236,U+6238-623c,U+6242,U+6244-6246,U+624a,U+624f-6250,U+6255-6257,U+6259-625a,U+625c-6262,U+6264-6265,U+6268,U+6271-6272,U+6274-6275,U+6277-6278,U+627a-627b,U+627d,U+6281-6283,U+6285-6288,U+628b-6290,U+6294,U+6299,U+629c-629e,U+62a3,U+62a6-62a7,U+62a9-62aa,U+62ad-62b0,U+62b2-62b4,U+62b6-62b8,U+62ba,U+62be,U+62c0-62c1,U+62c3,U+62cb,U+62cf,U+62d1,U+62d5,U+62dd-62de,U+62e0-62e1,U+62e4,U+62ea-62eb,U+62f0,U+62f2,U+62f5,U+62f8-62fb,U+6300,U+6303-6306,U+630a-630d,U+630f-6310,U+6312-6315,U+6317-6319,U+631c,U+6326-6327,U+6329,U+632c-632e,U+6330-6331,U+6333-6338,U+633b-633c,U+633e-6341,U+6344,U+6347-6348,U+634a,U+6351-6354,U+6356-6359",
		},
	},
	{
		uri: Zp,
		descriptors: {
			unicodeRange:
				"U+5dd0-5dda,U+5ddc,U+5ddf-5de0,U+5de3-5de4,U+5dea,U+5dec-5ded,U+5df0,U+5df5-5df6,U+5df8-5dfc,U+5dff-5e00,U+5e04,U+5e07,U+5e09-5e0b,U+5e0d-5e0e,U+5e12-5e13,U+5e17,U+5e1e-5e25,U+5e28-5e2c,U+5e2f-5e30,U+5e32-5e36,U+5e39-5e3a,U+5e3e-5e41,U+5e43,U+5e46-5e4b,U+5e4d-5e53,U+5e56-5e5a,U+5e5c-5e5d,U+5e5f-5e60,U+5e63-5e71,U+5e75,U+5e77,U+5e79,U+5e7e,U+5e81-5e83,U+5e85,U+5e88-5e89,U+5e8c-5e8e,U+5e92,U+5e98,U+5e9b,U+5e9d,U+5ea1-5ea4,U+5ea8-5eac,U+5eae-5eb2,U+5eb4,U+5eba-5ebd,U+5ebf-5ec8,U+5ecb-5ed0,U+5ed4-5ed5,U+5ed7-5eda,U+5edc-5ee7,U+5ee9,U+5eeb-5ef3,U+5ef5,U+5ef8-5ef9,U+5efb-5efd,U+5f05-5f07,U+5f09,U+5f0c-5f0e,U+5f10,U+5f12,U+5f14,U+5f16,U+5f19-5f1a,U+5f1c-5f1e,U+5f21-5f24,U+5f28,U+5f2b-5f2c,U+5f2e",
		},
	},
	{
		uri: Wp,
		descriptors: {
			unicodeRange:
				"U+60cd-60d0,U+60d2-60d4,U+60d6-60d7,U+60d9,U+60db,U+60de,U+60e1-60e5,U+60ea,U+60f1-60f2,U+60f5,U+60f7-60f8,U+60fb-60ff,U+6102-6105,U+6107,U+610a-610c,U+6110-6114,U+6116-6119,U+611b-611e,U+6121-6122,U+6125,U+6128-612a,U+612c-613e,U+6140-6147,U+6149,U+614b,U+614d,U+614f-6150,U+6152-6154,U+6156-615c,U+615e-6161,U+6163-6166,U+6169-616f,U+6171-6174,U+6176,U+6178-618a,U+618c-618d,U+618f-6193,U+6195-619c,U+619e-61a6,U+61aa-61ab,U+61ad-61b6,U+61b8-61bd,U+61bf-61c1,U+61c3-61c4",
		},
	},
	{
		uri: zp,
		descriptors: {
			unicodeRange:
				"U+5cf4-5cfa,U+5cfc-5d01,U+5d04-5d05,U+5d08-5d0d,U+5d0f-5d13,U+5d15,U+5d17-5d1a,U+5d1c-5d1d,U+5d1f-5d23,U+5d25,U+5d28,U+5d2a-5d2c,U+5d2f-5d33,U+5d35-5d3c,U+5d3f-5d46,U+5d48-5d49,U+5d4d-5d57,U+5d59-5d5a,U+5d5c,U+5d5e-5d68,U+5d6a,U+5d6d-5d6e,U+5d70-5d73,U+5d75-5d81,U+5d83-5d98,U+5d9a-5d9c,U+5d9e-5db6,U+5db8-5dc4,U+5dc6-5dcc,U+5dce-5dcf",
		},
	},
	{
		uri: Qp,
		descriptors: {
			unicodeRange:
				"U+5b52,U+5b56,U+5b5e,U+5b60-5b61,U+5b67-5b68,U+5b6b,U+5b6d-5b6f,U+5b72,U+5b74,U+5b76-5b79,U+5b7b-5b7c,U+5b7e-5b7f,U+5b82,U+5b86,U+5b8a,U+5b8d-5b8e,U+5b90-5b92,U+5b94,U+5b96,U+5b9f,U+5ba7-5ba9,U+5bac-5baf,U+5bb1-5bb2,U+5bb7,U+5bba-5bbc,U+5bc0-5bc1,U+5bc3,U+5bc8-5bcb,U+5bcd-5bcf,U+5bd1,U+5bd4-5bdc,U+5be0,U+5be2-5be3,U+5be6-5be7,U+5be9-5bed,U+5bef,U+5bf1-5bf7,U+5bfd-5bfe,U+5c00,U+5c02-5c03,U+5c05,U+5c07-5c08,U+5c0b-5c0e,U+5c10,U+5c12-5c13,U+5c17,U+5c19,U+5c1b,U+5c1e-5c21,U+5c23,U+5c26,U+5c28-5c2b,U+5c2d-5c30,U+5c32-5c33,U+5c35-5c37,U+5c43-5c44,U+5c46-5c47,U+5c4c-5c4d,U+5c52-5c54,U+5c56-5c58,U+5c5a-5c5d,U+5c5f,U+5c62,U+5c64,U+5c67-5c6d,U+5c70,U+5c72-5c78,U+5c7b-5c7e,U+5c80,U+5c83-5c87,U+5c89-5c8b,U+5c8e-5c8f,U+5c92-5c93,U+5c95,U+5c9d-5ca1,U+5ca4-5ca8,U+5caa,U+5cae-5cb0,U+5cb2,U+5cb4,U+5cb6,U+5cb9-5cbc,U+5cbe,U+5cc0,U+5cc2-5cc3,U+5cc5-5cca,U+5ccc-5cd1,U+5cd3-5cd8,U+5cda-5ce0,U+5ce2-5ce3,U+5ce7,U+5ce9,U+5ceb-5cec,U+5cee-5cef,U+5cf1-5cf3",
		},
	},
	{
		uri: jp,
		descriptors: {
			unicodeRange:
				"U+593b,U+593d-5940,U+5943,U+5945-5946,U+594a,U+594c-594d,U+5950,U+5952-5953,U+5959,U+595b-595f,U+5961,U+5963-5964,U+5966-5972,U+5975,U+5977,U+597a-597c,U+597e-5980,U+5985,U+5989,U+598b-598c,U+598e-5991,U+5994-5995,U+5998,U+599a-599d,U+599f-59a2,U+59a6-59a7,U+59ac-59ad,U+59b0-59b1,U+59b3-59b8,U+59ba,U+59bc-59bd,U+59bf-59c5,U+59c7-59c9,U+59cc-59cf,U+59d5-59d6,U+59d9,U+59db,U+59de-59e2,U+59e4,U+59e6-59e7,U+59e9-59eb,U+59ed-59f8,U+59fa,U+59fc-59fe,U+5a00,U+5a02,U+5a0a-5a0b,U+5a0d-5a10,U+5a12,U+5a14-5a17,U+5a19-5a1b,U+5a1d-5a1e,U+5a21-5a22,U+5a24,U+5a26-5a28,U+5a2a-5a30,U+5a33,U+5a35,U+5a37-5a3b,U+5a3d-5a3f,U+5a41-5a45,U+5a47-5a48,U+5a4b-5a54,U+5a56-5a59,U+5a5b-5a61,U+5a63-5a66,U+5a68-5a69,U+5a6b-5a73,U+5a78-5a79,U+5a7b-5a7e,U+5a80-5a90",
		},
	},
	{
		uri: e0,
		descriptors: {
			unicodeRange:
				"U+5a91,U+5a93-5a99,U+5a9c-5aa9,U+5aab-5ab1,U+5ab4,U+5ab6-5ab7,U+5ab9-5abd,U+5abf-5ac0,U+5ac3-5ac8,U+5aca-5acb,U+5acd-5ad1,U+5ad3,U+5ad5,U+5ad7,U+5ad9-5adb,U+5add-5adf,U+5ae2,U+5ae4-5ae5,U+5ae7-5ae8,U+5aea,U+5aec-5af0,U+5af2-5b08,U+5b0a-5b15,U+5b18-5b31,U+5b33,U+5b35-5b36,U+5b38-5b3f,U+5b41-5b4f",
		},
	},
	{
		uri: t0,
		descriptors: {
			unicodeRange:
				"U+5843,U+5845-584b,U+584e-5850,U+5852-5853,U+5855-5857,U+5859-585d,U+585f-5864,U+5866-586a,U+586d-587d,U+587f,U+5882,U+5884,U+5886-5888,U+588a-5891,U+5894-5898,U+589b-589d,U+58a0-58a7,U+58aa-58bb,U+58bd-58c0,U+58c2-58c4,U+58c6-58d0,U+58d2-58d4,U+58d6-58e3,U+58e5-58ea,U+58ed,U+58ef,U+58f1-58f2,U+58f4-58f5,U+58f7-58f8,U+58fa-5901,U+5903,U+5905-5906,U+5908-590c,U+590e,U+5910-5913,U+5917-5918,U+591b,U+591d-591e,U+5920-5923,U+5926,U+5928,U+592c,U+5930,U+5932-5933,U+5935-5936",
		},
	},
	{
		uri: n0,
		descriptors: {
			unicodeRange:
				"U+56d0-56d3,U+56d5-56d6,U+56d8-56d9,U+56dc,U+56e3,U+56e5-56ea,U+56ec,U+56ee-56ef,U+56f2-56f3,U+56f6-56f8,U+56fb-56fc,U+5700-5702,U+5705,U+5707,U+570b-571b,U+571d-571e,U+5720-5722,U+5724-5727,U+572b,U+5731-5732,U+5734-5738,U+573c-573d,U+573f,U+5741,U+5743-5746,U+5748-5749,U+574b,U+5752-5756,U+5758-5759,U+5762-5763,U+5765,U+5767,U+576c,U+576e,U+5770-5772,U+5774-5775,U+5778-577a,U+577d-5781,U+5787-578a,U+578d-5791,U+5794-579a,U+579c-579f,U+57a5,U+57a8,U+57aa,U+57ac,U+57af-57b1,U+57b3,U+57b5-57b7,U+57b9-57c1,U+57c4-57ca,U+57cc-57cd,U+57d0-57d1,U+57d3,U+57d6-57d7,U+57db-57dc,U+57de,U+57e1-57e3,U+57e5-57ec,U+57ee,U+57f0-57f3,U+57f5-57f7,U+57fb-57fc,U+57fe-57ff,U+5801,U+5803-5805,U+5808-580a,U+580c,U+580e-5810,U+5812-5814,U+5816-5818,U+581a-581d,U+581f,U+5822-5823,U+5825-5829,U+582b-582f,U+5831-5834,U+5836-5842",
		},
	},
	{
		uri: r0,
		descriptors: {
			unicodeRange:
				"U+55f9-55fc,U+55ff,U+5602-5607,U+560a-560b,U+560d,U+5610-5617,U+5619-561a,U+561c-561d,U+5620-5622,U+5625-5626,U+5628-562b,U+562e-5630,U+5633,U+5635,U+5637-5638,U+563a,U+563c-563e,U+5640-564b,U+564f-5653,U+5655-5656,U+565a-565b,U+565d-5661,U+5663,U+5665-5667,U+566d-5670,U+5672-5675,U+5677-567a,U+567d-5684,U+5687-568d,U+5690-5692,U+5694-56a2,U+56a4-56ae,U+56b0-56b6,U+56b8-56bb,U+56bd-56c9,U+56cb-56cf",
		},
	},
	{
		uri: o0,
		descriptors: {
			unicodeRange:
				"U+5286-5287,U+5289-528f,U+5291-5292,U+5294-529a,U+529c,U+52a4-52a7,U+52ae-52b0,U+52b4-52bd,U+52c0-52c2,U+52c4-52c6,U+52c8,U+52ca,U+52cc-52cf,U+52d1,U+52d3-52d5,U+52d7,U+52d9-52de,U+52e0-52e3,U+52e5-52ef,U+52f1-52f8,U+52fb-52fd,U+5301-5304,U+5307,U+5309-530c,U+530e,U+5311-5314,U+5318,U+531b-531c,U+531e-531f,U+5322,U+5324-5325,U+5327-5329,U+532b-532d,U+532f-5338,U+533c-533d,U+5340,U+5342,U+5344,U+5346,U+534b-534d,U+5350,U+5354,U+5358-5359,U+535b,U+535d,U+5365,U+5368,U+536a,U+536c-536d,U+5372,U+5376,U+5379,U+537b-537e,U+5380-5381,U+5383,U+5387-5388,U+538a,U+538e-5394,U+5396-5397,U+5399,U+539b-539c,U+539e,U+53a0-53a1,U+53a4,U+53a7,U+53aa-53ad,U+53af-53b5,U+53b7-53ba,U+53bc-53be,U+53c0,U+53c3-53c7,U+53ce-53d0,U+53d2-53d3,U+53d5,U+53da,U+53dc-53de,U+53e1-53e2,U+53e7,U+53f4,U+53fa,U+53fe-5400,U+5402,U+5405,U+5407,U+540b,U+5414,U+5418-541a,U+541c,U+5422,U+5424-5425,U+542a,U+5430,U+5433,U+5436-5437,U+543a",
		},
	},
	{
		uri: a0,
		descriptors: {
			unicodeRange:
				"U+5101-5105,U+5108-510a,U+510c-5111,U+5113-5120,U+5122-513e,U+5142,U+5147,U+514a,U+514c,U+514e-5150,U+5152-5153,U+5157-5159,U+515b,U+515d-5161,U+5163-5164,U+5166-5167,U+5169-516a,U+516f,U+5172,U+517a,U+517e-517f,U+5183-5184,U+5186-5187,U+518a-518b,U+518e-5191,U+5193-5194,U+5198,U+519a,U+519d-519f,U+51a1,U+51a3,U+51a6-51aa,U+51ad-51ae,U+51b4,U+51b8-51ba,U+51be-51bf,U+51c1-51c3,U+51c5,U+51c8,U+51ca,U+51cd-51ce,U+51d0,U+51d2-51da,U+51dc,U+51de-51df,U+51e2-51e3,U+51e5-51ea,U+51ec,U+51ee,U+51f1-51f2,U+51f4,U+51f7,U+51fe,U+5204-5205,U+5209,U+520b-520c,U+520f-5210,U+5213-5215,U+521c,U+521e-521f,U+5221-5223,U+5225-5227,U+522a,U+522c,U+522f,U+5231-5232,U+5234-5235,U+523c,U+523e,U+5244-5249,U+524b,U+524e-524f,U+5252-5253,U+5255,U+5257-525b,U+525d,U+525f-5260,U+5262-5264,U+5266,U+5268,U+526b-526e,U+5270-5271,U+5273-527c,U+527e,U+5280,U+5283-5285",
		},
	},
	{
		uri: i0,
		descriptors: {
			unicodeRange:
				"U+543d,U+543f,U+5441-5442,U+5444-5445,U+5447,U+5449,U+544c-544f,U+5451,U+545a,U+545d-5461,U+5463,U+5465,U+5467,U+5469-5470,U+5474,U+5479-547a,U+547e-547f,U+5481,U+5483,U+5485,U+5487-548a,U+548d,U+5491,U+5493,U+5497-5498,U+549c,U+549e-54a2,U+54a5,U+54ae,U+54b0,U+54b2,U+54b5-54b7,U+54b9-54ba,U+54bc,U+54be,U+54c3,U+54c5,U+54ca-54cb,U+54d6,U+54d8,U+54db,U+54e0-54e4,U+54eb-54ec,U+54ef-54f1,U+54f4-54f9,U+54fb,U+54fe,U+5500,U+5502-5505,U+5508,U+550a-550e,U+5512-5513,U+5515-551a,U+551c-551f,U+5521,U+5525-5526,U+5528-5529,U+552b,U+552d,U+5532,U+5534-5536,U+5538-553b,U+553d,U+5540,U+5542,U+5545,U+5547-5548,U+554b-554f,U+5551-5554,U+5557-555b,U+555d-5560,U+5562-5563,U+5568-5569,U+556b,U+556f-5574,U+5579-557a,U+557d,U+557f,U+5585-5586,U+558c-558e,U+5590,U+5592-5593,U+5595-5597,U+559a-559b,U+559e,U+55a0-55a6,U+55a8-55b0,U+55b2,U+55b4,U+55b6,U+55b8,U+55ba,U+55bc,U+55bf-55c3,U+55c6-55c8,U+55ca-55cb,U+55ce-55d0,U+55d5,U+55d7-55db,U+55de,U+55e0,U+55e2,U+55e7,U+55e9,U+55ed-55ee,U+55f0-55f1,U+55f4,U+55f6,U+55f8",
		},
	},
	{
		uri: s0,
		descriptors: {
			unicodeRange:
				"U+4fe0,U+4fe2,U+4fe4-4fe5,U+4fe7,U+4feb-4fec,U+4ff0,U+4ff2,U+4ff4-4ff7,U+4ff9,U+4ffb-4ffd,U+4fff-500b,U+500e,U+5010-5011,U+5013,U+5015-5017,U+501b,U+501d-501e,U+5020,U+5022-5024,U+5027,U+502b,U+502f-5039,U+503b,U+503d,U+503f-5042,U+5044-5046,U+5049-504b,U+504d,U+5050-5054,U+5056-5059,U+505b,U+505d-5064,U+5066-506b,U+506d-5075,U+5078-507a,U+507c-507d,U+5081-5084,U+5086-5087,U+5089-508c,U+508e-50a2,U+50a4,U+50a6,U+50aa-50ab,U+50ad-50b1,U+50b3-50b9,U+50bc-50ce,U+50d0-50d5,U+50d7-50d9,U+50db-50e5,U+50e8-50eb,U+50ef-50f2,U+50f4,U+50f6-50fa,U+50fc-5100",
		},
	},
	{ uri: c0, descriptors: { unicodeRange: "U+49d5-4a77" } },
	{
		uri: l0,
		descriptors: {
			unicodeRange:
				"U+4dac-4dad,U+4daf-4db5,U+4e02,U+4e04-4e06,U+4e0f,U+4e12,U+4e17,U+4e1f-4e21,U+4e23,U+4e26,U+4e29,U+4e2e-4e2f,U+4e31,U+4e33,U+4e35,U+4e37,U+4e3c,U+4e40-4e42,U+4e44,U+4e46,U+4e4a,U+4e51,U+4e55,U+4e57,U+4e5a-4e5b,U+4e62-4e65,U+4e67-4e68,U+4e6a-4e6f,U+4e72,U+4e74-4e7d,U+4e7f-4e85,U+4e87,U+4e8a,U+4e90,U+4e96-4e97,U+4e99,U+4e9c-4e9e,U+4ea3,U+4eaa,U+4eaf-4eb1,U+4eb4,U+4eb6-4eb9,U+4ebc-4ebe,U+4ec8,U+4ecc,U+4ecf-4ed0,U+4ed2,U+4eda-4edc,U+4ee0,U+4ee2,U+4ee6-4ee7,U+4ee9,U+4eed-4eef,U+4ef1,U+4ef4,U+4ef8-4efa,U+4efc,U+4efe,U+4f00,U+4f02-4f08,U+4f0b-4f0c,U+4f12-4f16,U+4f1c-4f1d,U+4f21,U+4f23,U+4f28-4f29,U+4f2c-4f2e,U+4f31,U+4f33,U+4f35,U+4f37,U+4f39,U+4f3b,U+4f3e-4f42,U+4f44-4f45,U+4f47-4f4c,U+4f52,U+4f54,U+4f56,U+4f61-4f62,U+4f66,U+4f68,U+4f6a-4f6b,U+4f6d-4f6e,U+4f71-4f72,U+4f75,U+4f77-4f7a,U+4f7d,U+4f80-4f82,U+4f85-4f87,U+4f8a,U+4f8c,U+4f8e,U+4f90,U+4f92-4f93,U+4f95-4f96,U+4f98-4f9a,U+4f9c,U+4f9e-4f9f,U+4fa1-4fa2,U+4fa4,U+4fab,U+4fad,U+4fb0-4fb4,U+4fb6-4fbe,U+4fc0-4fc2,U+4fc6-4fc9,U+4fcb-4fcd,U+4fd2-4fd6,U+4fd9,U+4fdb",
		},
	},
	{ uri: d0, descriptors: { unicodeRange: "U+4933-49d4" } },
	{ uri: U0, descriptors: { unicodeRange: "U+487a-4932" } },
	{
		uri: f0,
		descriptors: { unicodeRange: "U+47d2-4879,U+2ce7c,U+2ce88,U+2ce93" },
	},
	{
		uri: u0,
		descriptors: {
			unicodeRange:
				"U+4756-47d1,U+2ca02,U+2ca0e,U+2ca7d,U+2caa9,U+2cb29,U+2cb2e,U+2cb31,U+2cb38-2cb39,U+2cb3f,U+2cb41,U+2cb4e,U+2cb5a,U+2cb64,U+2cb69,U+2cb6c,U+2cb6f,U+2cb76,U+2cb78,U+2cb7c,U+2cbb1,U+2cbbf-2cbc0,U+2cbce,U+2cc5f,U+2ccf5-2ccf6,U+2ccfd,U+2ccff,U+2cd02-2cd03,U+2cd0a,U+2cd8b,U+2cd8d,U+2cd8f-2cd90,U+2cd9f-2cda0,U+2cda8,U+2cdad-2cdae,U+2cdd5,U+2ce18,U+2ce1a,U+2ce23,U+2ce26,U+2ce2a",
		},
	},
	{
		uri: p0,
		descriptors: {
			unicodeRange:
				"U+46c3-4755,U+2c488,U+2c494,U+2c497,U+2c542,U+2c613,U+2c618,U+2c621,U+2c629,U+2c62b-2c62d,U+2c62f,U+2c642,U+2c64a-2c64b,U+2c72c,U+2c72f,U+2c79f,U+2c7c1,U+2c7fd,U+2c8d9,U+2c8de,U+2c8e1,U+2c8f3,U+2c907,U+2c90a,U+2c91d",
		},
	},
	{
		uri: m0,
		descriptors: {
			unicodeRange:
				"U+4629-46c2,U+2bdf7,U+2be29,U+2c029-2c02a,U+2c0a9,U+2c0ca,U+2c1d5,U+2c1d9,U+2c1f9,U+2c27c,U+2c288,U+2c2a4,U+2c317,U+2c35b,U+2c361,U+2c364",
		},
	},
	{
		uri: h0,
		descriptors: {
			unicodeRange:
				"U+458e-4628,U+2b7a9,U+2b7c5,U+2b7e6,U+2b7f9,U+2b806,U+2b80a,U+2b81c,U+2b8b8,U+2bac7,U+2bb5f,U+2bb62,U+2bb7c,U+2bb83,U+2bc1b,U+2bd77,U+2bd87",
		},
	},
	{
		uri: b0,
		descriptors: {
			unicodeRange: "U+4449-4511,U+2afa2,U+2b127-2b128,U+2b137-2b138,U+2b1ed",
		},
	},
	{
		uri: g0,
		descriptors: {
			unicodeRange:
				"U+439b-4448,U+2a437,U+2a5f1,U+2a602,U+2a61a,U+2a6b2,U+2a7dd,U+2a8fb,U+2a917,U+2aa30,U+2aa36,U+2aa58",
		},
	},
	{
		uri: E0,
		descriptors: {
			unicodeRange:
				"U+4275-430d,U+298c6,U+29a72,U+29d98,U+29ddb,U+29e15,U+29e3d,U+29e49",
		},
	},
	{
		uri: x0,
		descriptors: {
			unicodeRange:
				"U+4132-41de,U+28bef,U+28c47,U+28c4f,U+28c51,U+28c54,U+28d10,U+28d71,U+28dfb,U+28e1f,U+28e36,U+28e89,U+28e99,U+28eeb,U+28f32,U+28ff8,U+292a0",
		},
	},
	{
		uri: y0,
		descriptors: {
			unicodeRange:
				"U+41df-4274,U+292b1,U+29490,U+295cf,U+2967f,U+296f0,U+29719,U+29750",
		},
	},
	{
		uri: w0,
		descriptors: {
			unicodeRange:
				"U+408e-4131,U+285c8-285c9,U+28678,U+28695,U+286d7,U+286fa,U+287e0,U+28946,U+28949,U+2896b,U+28987-28988,U+289ba-289bb,U+28a1e,U+28a29,U+28a43,U+28a71,U+28a99,U+28acd,U+28add,U+28ae4,U+28b49,U+28bc1",
		},
	},
	{
		uri: I0,
		descriptors: {
			unicodeRange:
				"U+3e83-3f2f,U+27139,U+273da-273db,U+273fe,U+27410,U+27449,U+27614-27615,U+27631,U+27684,U+27693,U+2770e,U+27723,U+27752",
		},
	},
	{
		uri: T0,
		descriptors: {
			unicodeRange:
				"U+3f30-3fdb,U+27985,U+27a84,U+27bb3,U+27bbe,U+27bc7,U+27cb8,U+27da0,U+27e10",
		},
	},
	{
		uri: R0,
		descriptors: {
			unicodeRange:
				"U+3fdc-408d,U+27fb7,U+27ff9,U+2808a,U+280bb,U+2815d,U+28277,U+28282,U+282e2,U+282f3,U+283cd,U+28408,U+2840c,U+28455,U+28468,U+2856b",
		},
	},
	{
		uri: v0,
		descriptors: {
			unicodeRange:
				"U+3dd2-3e82,U+26a58,U+26a8c,U+26ab7,U+26aff,U+26b5c,U+26c21,U+26c29,U+26c73,U+26cdd,U+26e40,U+26e65,U+26f94,U+26ff6-26ff8,U+270f4,U+2710d",
		},
	},
	{
		uri: M0,
		descriptors: {
			unicodeRange:
				"U+3d34-3dd1,U+2648d,U+26676,U+2667e,U+266b0,U+2671d,U+2677c,U+267cc,U+268dd,U+268ea,U+26951,U+2696f,U+269dd,U+269fa,U+26a1e",
		},
	},
	{
		uri: _0,
		descriptors: {
			unicodeRange:
				"U+3c76-3d33,U+25d0a,U+25da1,U+25e2e,U+25e56,U+25e62,U+25e65,U+25ec2,U+25ed7-25ed8,U+25ee8,U+25f23,U+25f5c,U+25fd4,U+25fe0,U+25ffb,U+2600c,U+26017,U+26060,U+260ed,U+26221,U+26270,U+26286,U+2634c,U+26402",
		},
	},
	{
		uri: L0,
		descriptors: {
			unicodeRange:
				"U+3bda-3c75,U+25771,U+257a9,U+257b4,U+259c4,U+259d4,U+25ae3-25ae4,U+25af1,U+25bb2,U+25c14,U+25c4b,U+25c64",
		},
	},
	{
		uri: D0,
		descriptors: {
			unicodeRange:
				"U+3b25-3bd9,U+2504a,U+25055,U+25122,U+2512b,U+251a9,U+251cd,U+251e5,U+2521e,U+2524c,U+2542e,U+2548e,U+254d9,U+2550e,U+25532,U+25562,U+255a7-255a8",
		},
	},
	{
		uri: S0,
		descriptors: {
			unicodeRange:
				"U+3a6b-3b24,U+24896,U+249db,U+24a4d,U+24a7d,U+24ac9,U+24b56,U+24b6f,U+24c16,U+24d14,U+24dea,U+24e0e,U+24e37,U+24e6a,U+24e8b,U+24eaa",
		},
	},
	{
		uri: $0,
		descriptors: {
			unicodeRange:
				"U+39a9-3a6a,U+24096,U+24103,U+241ac,U+241c6,U+241fe,U+243bc,U+243f8,U+244d3,U+24629,U+246a5,U+247f1",
		},
	},
	{
		uri: N0,
		descriptors: {
			unicodeRange:
				"U+38e3-39a8,U+23a98,U+23c7f,U+23c97-23c98,U+23cfe,U+23d00,U+23d0e,U+23d40,U+23dd3,U+23df9-23dfa,U+23e23,U+23f7e",
		},
	},
	{
		uri: P0,
		descriptors: {
			unicodeRange:
				"U+3760-382a,U+22ab8,U+22b43,U+22b46,U+22b4f-22b50,U+22ba6,U+22bca,U+22c1d,U+22c24,U+22c55,U+22d4c,U+22de1",
		},
	},
	{
		uri: F0,
		descriptors: {
			unicodeRange:
				"U+382b-38e2,U+231b6,U+231c3-231c4,U+231f5,U+23350,U+23372,U+233d0,U+233d2-233d3,U+233d5,U+233da,U+233df,U+233e4,U+2344a-2344b,U+23451,U+23465,U+234e4,U+2355a,U+23594,U+235c4,U+235cb,U+23638-2363a,U+23647,U+2370c,U+2371c,U+2373f,U+23763-23764,U+237e7,U+237ff,U+23824,U+2383d",
		},
	},
	{
		uri: O0,
		descriptors: {
			unicodeRange:
				"U+3698-375f,U+22218,U+2231e,U+223ad,U+224dc,U+226f3,U+2285b,U+228ab,U+2298f",
		},
	},
	{
		uri: A0,
		descriptors: {
			unicodeRange:
				"U+35e6-3697,U+21c56,U+21cde,U+21d2d,U+21d45,U+21d62,U+21d78,U+21d92,U+21d9c,U+21da1,U+21db7,U+21de0,U+21e33-21e34,U+21f1e,U+21f76,U+21ffa,U+2217b",
		},
	},
	{
		uri: B0,
		descriptors: {
			unicodeRange:
				"U+3444-350e,U+20ad3,U+20b1d,U+20b9f,U+20c41,U+20cbf,U+20cd0,U+20d45,U+20de1,U+20e64,U+20e6d,U+20e95,U+20e9d,U+20ea2,U+20f5f,U+210c1,U+21201,U+2123d,U+21255,U+21274,U+2127b",
		},
	},
	{
		uri: C0,
		descriptors: {
			unicodeRange:
				"U+350f-35e5,U+212d7,U+212e4,U+212fd,U+2131b,U+21336,U+21344,U+2139a,U+213c4,U+21413,U+2146d-2146e,U+215d7,U+21647,U+216b4,U+21706,U+21742,U+218bd,U+219c3",
		},
	},
	{
		uri: K0,
		descriptors: {
			unicodeRange:
				"U+336d-3443,U+2032b,U+20371,U+20381,U+203f9,U+2044a,U+20509,U+20547,U+205d6,U+20628,U+20676,U+2074f,U+20779,U+20807,U+2083a,U+20895,U+208b9,U+2097c,U+2099d",
		},
	},
	{
		uri: H0,
		descriptors: {
			unicodeRange:
				"U+328b-336c,U+2000b,U+20089,U+200a2,U+200a4,U+20164,U+201a2,U+20213",
		},
	},
	{
		uri: J0,
		descriptors: {
			unicodeRange:
				"U+3192-31ba,U+31c0-31e3,U+31f0-321e,U+3220-328a,U+1f250-1f251",
		},
	},
	{
		uri: k0,
		descriptors: {
			unicodeRange:
				"U+2f74-2fd5,U+3000,U+3003-3007,U+3012-3013,U+3018-301c,U+3020-3029,U+302f-303f,U+3041-3096,U+3099-30a1",
		},
	},
	{
		uri: Y0,
		descriptors: {
			unicodeRange: "U+30a2-30ff,U+3105-312f,U+3131-318e,U+3190-3191",
		},
	},
	{
		uri: V0,
		descriptors: {
			unicodeRange:
				"U+4e36,U+4ea0,U+4f74,U+4f91,U+4f94,U+4fc5,U+507e,U+50ed,U+5182,U+51f5,U+525e,U+5282,U+52f9,U+5326,U+537a,U+53a3,U+5423,U+5459,U+54b4,U+54d9,U+55c9,U+57f4,U+580b,U+5902,U+5925,U+5a08,U+5ab5,U+5b84,U+5be4,U+5c22,U+5cb5,U+5cbd,U+5d3e,U+5e31,U+5e5e,U+5e80,U+5ee8,U+5f82,U+5fc9,U+5fed,U+600a,U+605d,U+609b,U+609d,U+60dd,U+6243,U+6322,U+63ce,U+640c,U+643f,U+6445,U+64d7,U+6534,U+6549,U+656b,U+6603,U+674c,U+680a,U+6864,U+69d4,U+6a65,U+6c2a,U+6c46,U+6c5c,U+6d0e,U+6d48,U+6e2b,U+6eb2,U+6eb7,U+6f89,U+706c,U+70b1,U+7113,U+71d4,U+727f,U+72f3,U+7303,U+7321,U+736c,U+736f,U+74a9,U+74de,U+750d,U+7513,U+7592,U+75c4,U+7605,U+760a,U+761b,U+7625,U+762d,U+7643,U+7707,U+7747,U+77b5,U+7839,U+784e,U+78a5,U+7924,U+793b,U+798a,U+7a03,U+7a06,U+7a78,U+7a80,U+7aad,U+7ba8,U+7be5,U+7cc8,U+7ec1,U+7f0b,U+7f0f,U+7f12,U+7f68,U+7f9d,U+8025,U+809c,U+80ad,U+80b7,U+80e8,U+811e,U+8204,U+8223,U+822d,U+823b,U+824b,U+825a,U+827d,U+827f,U+828f,U+82c8,U+8307,U+831b,U+8347,U+837d,U+839b,U+83a9,U+83f9,U+84b9,U+8579,U+864d,U+867f,U+86b0,U+86d1,U+86d8,U+86f2,U+8764,U+8770,U+8788,U+8797,U+87ac-87ad,U+87b5,U+881b,U+8844,U+88bc,U+88fc,U+8930,U+89cf,U+89d6,U+8ba0,U+8bd4,U+8c02,U+8c2b,U+8c85,U+8e23,U+8f81-8f82,U+8fd5,U+90b6,U+90db,U+914e,U+9164,U+91ad,U+943e,U+94b7-94b8,U+94eb,U+950d,U+9514,U+9516,U+9518,U+9529,U+9538,U+953f,U+954e,U+955f,U+95fc,U+9667,U+96b3,U+9792,U+97b2,U+98a1,U+9969,U+9987,U+9998,U+9a80,U+9a92,U+9a96,U+9adf,U+9cb4,U+9cbd,U+9cd0,U+9cd4,U+9e31,U+9e3a,U+9e71,U+9ee5,U+9eea,U+9ef9,U+9fa0",
		},
	},
	{
		uri: q0,
		descriptors: {
			unicodeRange:
				"U+4e0c,U+4e28,U+4e3f,U+4ec2,U+502e,U+50ba,U+5155,U+5181,U+522d,U+5281,U+5290,U+5369,U+53b6,U+54d5,U+54dc,U+54ff,U+552a,U+553c,U+5588,U+55b5,U+5686,U+570a,U+5776,U+5786,U+57a4,U+5820,U+5865,U+58bc,U+5b32,U+5b65,U+5c1c,U+5c66,U+5c6e,U+5c8d,U+5ddb,U+5f2a,U+5f50,U+5f61,U+6067,U+614a,U+615d,U+619d,U+61d4,U+620b,U+6224-6225,U+6343,U+63ad,U+63f2,U+640b,U+6420,U+6434,U+6496,U+64d0,U+6509,U+652e,U+67a8,U+6833,U+6844,U+684a,U+6920,U+6957,U+6971,U+6a8e,U+6a91,U+6aa0,U+6b43,U+6bea,U+6bf5,U+6c15,U+6cd0,U+6ee0,U+6f24,U+6f2d,U+70c0,U+721d,U+728b,U+72c3,U+72e8,U+730a,U+7338-7339,U+734d,U+746d,U+752f,U+754e,U+770d,U+7735,U+778d,U+77a2,U+77e7,U+7857,U+786d,U+78c9,U+78f2,U+791e,U+7953,U+7b58,U+7b9d,U+7bda,U+7cd7,U+7f32-7f33,U+8022,U+8028-8029,U+8035,U+804d,U+8080,U+80c2,U+80e9,U+80ec,U+80f2,U+810e,U+8221,U+8274,U+82b0,U+82e0,U+83b0,U+8487-8488,U+848e,U+84cd,U+84d0,U+8539,U+857a,U+85a8,U+85b7,U+867c,U+871e,U+8723,U+877e,U+878b,U+8793,U+8803,U+88d2,U+8966,U+89cc,U+89eb,U+8b26,U+8c8a,U+8c98,U+8d33,U+8d47,U+8d55,U+8dbc,U+8e40,U+8e94,U+8f77,U+8f79,U+9058,U+91a2,U+91b5,U+928e,U+9494,U+94b6,U+94de,U+94f4,U+94f9,U+950a,U+950e,U+951e,U+952b,U+953c,U+953e,U+9544,U+9561,U+9564,U+9569,U+95f6,U+9603,U+960d,U+963d,U+9674,U+9794,U+97ab,U+98a5,U+9a9f,U+9ab1,U+9ad1,U+9b0f,U+9b2f,U+9c92,U+9c95,U+9cba,U+9cbc,U+9cc6,U+9ccb,U+9cd8,U+9e32,U+9e38,U+9e5b,U+9e7e,U+9eb4,U+9efb-9efc,U+9f3d",
		},
	},
	{
		uri: G0,
		descriptors: {
			unicodeRange: "U+2e3b,U+2e80-2e99,U+2e9b-2ef3,U+2f00-2f73,U+ffffd",
		},
	},
	{
		uri: X0,
		descriptors: {
			unicodeRange:
				"U+4e69,U+4f1b,U+4f67,U+4f7e,U+4fdc,U+50e6,U+5196,U+5202,U+5233,U+523f,U+52a2,U+536e,U+5476,U+54ad,U+54cf,U+5537,U+561e,U+56dd,U+56df,U+5709,U+572c,U+57cf,U+57f8,U+580d,U+5881,U+589a,U+5941,U+59b2,U+5c25,U+5d24,U+5d74,U+5e42,U+5e8b,U+5eb3,U+5ed2,U+5fad,U+6003,U+603c,U+6083,U+6100,U+6126,U+6206,U+62ca,U+638e,U+63b4,U+6426,U+646d,U+6535,U+65c4,U+66db,U+6715,U+6769,U+6798,U+67c3,U+6861,U+698d,U+69ca,U+69ed,U+69f2,U+69ff,U+6a18,U+6b39,U+6bb3,U+6c0d,U+6cb2,U+6cd6,U+6cf7,U+6cfa,U+6d33,U+6e16,U+6e53-6e54,U+6ebb,U+6fb6,U+709d,U+72ad,U+72f7,U+72fb,U+7313,U+739f,U+74ba,U+754b,U+755b,U+758b,U+75ac,U+75d6,U+7617,U+7635,U+7640,U+76a4,U+76b2,U+775a,U+77bd,U+781f,U+79b3,U+7b2b,U+7b31,U+7b3e,U+7b6e,U+7b9c,U+7c0b,U+7c9e,U+7cc1,U+7ce8,U+7ea5,U+7f21,U+7f27,U+7f74,U+7fb0,U+8031,U+8071,U+80ea,U+8114,U+8160,U+81a6,U+81c1,U+829f,U+82a4,U+82fb,U+831a,U+8333,U+836c,U+83b6,U+83f8,U+8411,U+841c,U+8489,U+848c,U+85a4,U+8627,U+8629,U+866e,U+86b5,U+872e,U+8731,U+877b,U+877d,U+87ea,U+8813,U+8816,U+8864,U+88ce,U+88e5,U+897b,U+89cb,U+89f3,U+8bfc,U+8c35,U+8d46,U+8d4d,U+8dba,U+8e3a,U+8f75,U+8f7e,U+8fd3,U+9161,U+9179,U+917e,U+91a3,U+94ac,U+94d7,U+94e5,U+952a,U+952c,U+9545,U+9565,U+9568,U+956a,U+961d,U+96e0,U+972a,U+9730,U+989f,U+98e7,U+990d,U+9967,U+9993,U+9aa3,U+9ac0,U+9ae1,U+9aeb,U+9af9,U+9c86,U+9c8b,U+9ca0-9ca1,U+9ca3,U+9ce2,U+9e48,U+9e6a,U+9e87,U+9ee2,U+9ee9,U+9f17,U+9f19,U+9f2c,U+9f80",
		},
	},
	{
		uri: Z0,
		descriptors: {
			unicodeRange:
				"U+4ef3,U+50d6,U+50ec,U+51ab,U+51b1,U+52d6,U+54a9,U+54da,U+55be,U+55cd,U+564d,U+572f,U+574c,U+576b,U+57d8,U+57fd,U+5844,U+59d2,U+5ae0,U+5b16,U+5b37,U+5b5b,U+5b80,U+5d1e,U+5d6b,U+5efe,U+5f11,U+5f56,U+5f58,U+5f73,U+5f8c,U+5fc4,U+5fe4,U+602b,U+6106,U+610d,U+63de,U+63f8,U+641b,U+64e4,U+6634,U+676a,U+67b5,U+681d,U+6883,U+69b1,U+69e0,U+6b37,U+6b9b,U+6d7c,U+6ed7,U+6f36,U+6f72,U+6f8c,U+7035,U+7039,U+7173,U+7178,U+7228,U+728f,U+72b4,U+72ef,U+72f4,U+7331,U+7481,U+74e0,U+7540,U+75c3,U+75e6,U+763c,U+764d,U+76cd,U+7704,U+7743,U+7780,U+7847,U+786a,U+78b9,U+7962,U+7a02,U+7aac,U+7ab3,U+7b0a,U+7b4c,U+7b7b,U+7bfc,U+7c0f,U+7c16,U+7c40,U+7ca2,U+7cc7,U+7cf8,U+7d77,U+7e3b,U+7ea1,U+7ea9,U+7ef2,U+7f02,U+7f07,U+7f0c,U+7f23,U+7f2f,U+7fbc,U+8016,U+8020,U+812c,U+8136,U+8182,U+822f,U+8233,U+825f,U+8268,U+8284,U+8288,U+8291,U+8308,U+8311,U+835b,U+836d,U+83dd,U+8406,U+840f,U+845c,U+84b4,U+84e3,U+850c,U+855e,U+863c,U+86ba,U+86c4,U+86de,U+86f1,U+873e,U+87bd,U+87db,U+880a,U+883c,U+887f,U+88f0,U+890a,U+892b,U+895e,U+89ef,U+8a48,U+8bdc,U+8c18,U+8c33,U+8c94,U+8db1,U+8dcf,U+8dd6,U+8de3,U+8e6f,U+8e90,U+8f7a,U+8fb6,U+902d,U+90be,U+91af,U+936a,U+948b,U+94d8,U+9513,U+953a,U+956c,U+963c,U+9654,U+966c,U+9688,U+97b4,U+996b,U+9a75,U+9a7a,U+9aba,U+9aed,U+9b08,U+9b43,U+9c8e,U+9c94,U+9c9a,U+9e2b,U+9e36,U+9e4b,U+9e4e,U+9e55,U+9e63,U+9e68-9e69,U+9ebd,U+9ec9,U+9f0d,U+9f37,U+9f51",
		},
	},
	{
		uri: W0,
		descriptors: {
			unicodeRange:
				"U+50a7,U+5240,U+5261,U+52ac,U+531a,U+5363,U+5432,U+5452,U+5456,U+5472,U+5478,U+553f,U+5575,U+5581,U+55cc,U+55fe,U+5601,U+572e,U+57d2,U+57ef,U+581e,U+5924,U+5981,U+5997,U+59a3,U+5aaa,U+5ab8,U+5b34,U+5d5d,U+5def,U+5e11,U+5e91,U+5ed1,U+5ef4,U+5f40,U+600d,U+6019,U+601b,U+605a,U+6092,U+60ab,U+6217,U+623d,U+6369,U+65d2,U+6661,U+670a,U+6753,U+67a7,U+6855,U+68f9,U+6939,U+696e,U+6980,U+6a7c,U+6aab,U+6b82,U+6bf3,U+6bf9,U+6c05,U+6c19-6c1a,U+6ca9,U+6cf6,U+6d1a,U+6dab,U+6f74,U+7085,U+7198,U+71b5,U+7256,U+725d,U+727e,U+72fa,U+7322,U+738e,U+73e5,U+750f,U+755a,U+7594,U+75b3,U+760c,U+7615,U+7630,U+763f,U+77ec,U+7817,U+78a1,U+78d9,U+7905,U+7b2a,U+7b2e,U+7b62,U+7b85,U+7bcc,U+7bea,U+7c26,U+7c74,U+7c9c-7c9d,U+7e47,U+7e9b,U+7e9f,U+7ee0,U+7ee8,U+7ef1,U+7f01,U+7f11,U+7f17,U+7f36,U+7f7e,U+7fee,U+802a,U+80cd,U+8112,U+8169,U+8234,U+8279,U+8298,U+82ca,U+82d8,U+82e1,U+83c0,U+83d4,U+83df,U+8401,U+8451,U+845a,U+8476,U+8478,U+84ba,U+84bd,U+84e0,U+851f,U+8548,U+8556,U+8585,U+868d,U+86e9,U+86f4,U+86f8,U+8765,U+8785,U+87ab,U+87ee,U+8832,U+8872,U+88b7,U+88e2-88e3,U+89da,U+8bce,U+8bd3,U+8bd6,U+8bf9,U+8c16,U+8c73,U+8d5c,U+8dde,U+8f6d,U+8f94,U+8fe8,U+9011,U+915e,U+9185,U+918c,U+94ab,U+94d1,U+94f3,U+9515,U+951d,U+9558,U+9567,U+96ce,U+96e9,U+9785,U+9878,U+987c,U+9883,U+98d1,U+9954,U+9963,U+9a93,U+9ac1,U+9acc,U+9b1f,U+9b49,U+9b4d,U+9b51,U+9ca7,U+9cae,U+9cce,U+9cd3,U+9e37,U+9e39,U+9e41,U+9e46,U+9f22,U+9f2f,U+9f39,U+9f85",
		},
	},
	{
		uri: z0,
		descriptors: {
			unicodeRange:
				"U+4e5c,U+4edf,U+4f25,U+4f32,U+4f5e,U+4f76,U+4faa,U+4fe6,U+5028,U+5048,U+5250,U+535f,U+538d,U+53c1,U+5412,U+5443,U+54d4,U+54dd,U+5541,U+5550,U+5577,U+55dd,U+55f3,U+560f,U+562c,U+5657-5658,U+5664,U+56af,U+575c,U+577c,U+57b2,U+57da,U+5800,U+5a62,U+5aeb,U+5c3b,U+5ca3,U+5d26,U+5d9d,U+5f01,U+5fb5,U+5fdd,U+5ff8,U+6029,U+6041,U+6079,U+60b1,U+6222,U+629f,U+6332,U+63bc,U+63e0,U+6485,U+65ab,U+65c3,U+65c6,U+668c,U+669d,U+66be,U+67fd,U+6800,U+68fc,U+690b,U+6924,U+6978,U+69a7,U+6a3e,U+6a50,U+6a5b,U+6a97,U+6b24,U+6b8d,U+6baa,U+6c10,U+6c54,U+6ceb,U+6d04,U+6d4d,U+6eb1,U+6ebd,U+7110,U+71b3,U+71f9,U+7230,U+728d,U+7292,U+72b8,U+72d2,U+7360,U+73a2,U+7511,U+75a0,U+75c8,U+779f,U+7826,U+7877,U+7a39,U+7aa8,U+7ae6,U+7b04,U+7b0f,U+7baa,U+7bac,U+7c1f,U+7ccd,U+7ecb,U+7ed4,U+7ed7,U+7efb,U+7f0d,U+7f5f,U+7faf,U+7fd5,U+7fe5,U+8027,U+80bc,U+80dd,U+80fc,U+8132,U+815a,U+8167,U+816d,U+81ca,U+8228,U+82a1,U+82a9,U+82ab,U+82cc,U+8351,U+8368,U+83b8,U+83d8,U+83ea,U+83f0,U+8497,U+84c1,U+858f,U+85ff,U+867b,U+86a8-86a9,U+870a,U+8722,U+876e,U+877c,U+87e5,U+8888,U+88df,U+8919,U+8bcc,U+8bdf,U+8be8,U+8bee,U+8c20,U+8c2f,U+8d36,U+8df8,U+8e05,U+8e2f,U+8f9a,U+9021,U+908b,U+90b4,U+90ba,U+90d0,U+90eb,U+90fe,U+91aa,U+933e,U+9486-9487,U+948d,U+9490,U+94ad,U+94bd,U+94d6,U+94d9,U+9507,U+9546,U+955e,U+956b,U+95e9,U+9604,U+960b,U+9612,U+9615,U+9617,U+96b9,U+989a-989b,U+989e,U+9a78,U+9a7d,U+9aa0,U+9aa2,U+9ac2,U+9b23,U+9b3b,U+9c82,U+9cca,U+9cd9,U+9e28,U+9e5a,U+9e5e,U+9e6c,U+9efe,U+9f0b",
		},
	},
	{
		uri: Q0,
		descriptors: {
			unicodeRange:
				"U+4e47,U+4e8d,U+4f65,U+4f89,U+50ee,U+520e,U+5416,U+5454,U+54bb,U+54c2,U+54d3,U+54de,U+5591,U+55e5,U+560c,U+566b,U+5769,U+578c,U+5793,U+57e4,U+5889,U+593c,U+59ab,U+5ad4,U+5ad8,U+5af1,U+5b53,U+5ba5,U+5c59,U+5c63,U+5d5b,U+5e0f,U+5e14,U+5edb,U+5fbc,U+6004,U+60ad,U+610e,U+61b7,U+624c,U+634c,U+647a,U+64ba,U+65f0,U+6600,U+66f7,U+67e2,U+67f0,U+680c,U+686b,U+6874,U+691f,U+6989,U+6a17,U+6b81,U+6b84,U+6c06-6c07,U+6c3d,U+6d07,U+6d27,U+6d2b,U+6d91,U+6e6b,U+6e8f,U+6fde,U+70bb,U+723b,U+726e,U+72b0,U+72ce,U+72f2,U+7301,U+731e,U+737e,U+7477,U+748e,U+74ff,U+7633,U+7654,U+771a,U+7726,U+7765,U+7768,U+781c,U+7829,U+78d4,U+7913,U+7957,U+79d5,U+79eb,U+7a70,U+7a86,U+7b25,U+7b38,U+7b47,U+7b72,U+7ba6-7ba7,U+7dae,U+7ee1,U+7efe,U+7f26,U+7f31,U+7f35,U+801c,U+8043,U+809f,U+80ab,U+80d7,U+8118,U+8188,U+81cc,U+823e,U+8244,U+824f,U+82b4,U+82c1,U+82e4,U+82f4,U+8306,U+833a,U+835c,U+839c,U+83b3,U+83bc,U+846d,U+867a,U+868b,U+8734,U+87ca,U+886e,U+887e,U+88a2,U+88c9,U+8921,U+8bb5,U+8bf3,U+8c04,U+8c17,U+8c1d,U+8c25,U+8c36,U+8c55,U+8c78,U+8d3d,U+8d40,U+8d59,U+8d67,U+8d91,U+8dbf,U+8deb-8dec,U+8dfd,U+8e14,U+8e41,U+8f8e,U+900b,U+9044,U+9062,U+90cf,U+9123,U+9146,U+9162,U+9172,U+918d,U+9190,U+92c8,U+93ca,U+948c,U+94aa,U+94b2,U+94c8,U+94ca,U+94d5,U+94df,U+94e9-94ea,U+94f7,U+94fc-94fd,U+951b,U+954f,U+9554,U+9559,U+9566,U+9571-9572,U+95f1,U+9608,U+960f,U+97af,U+988f,U+98d5,U+992e,U+9955,U+9ab0,U+9b32,U+9c90,U+9c9e,U+9ca5,U+9ca9,U+9cad,U+9cb1,U+9cc3,U+9e47,U+9ee7,U+9f87",
		},
	},
	{
		uri: j0,
		descriptors: {
			unicodeRange:
				"U+4e93,U+4ec4,U+4ef5,U+4f27,U+4f7b,U+4fe3,U+5080,U+5121,U+51eb,U+5208,U+52f0,U+53f5,U+5453,U+5466,U+54a6,U+54bf,U+54d0,U+5533,U+5549,U+5556,U+556d,U+558f,U+55f2,U+55f5,U+5627,U+567b,U+56d4,U+571c,U+5739,U+57b4,U+5807,U+58c5,U+59a4,U+59af,U+59d8,U+5a09,U+5a0c,U+5a4a,U+5ad2,U+5b6c,U+5ca2,U+5cac,U+5d03,U+5d6c,U+5db7,U+5ebe,U+5f2d,U+5fea,U+6042,U+6120,U+6175,U+6221,U+623e,U+6339,U+638a,U+643d,U+64b8,U+64e2,U+66e9,U+67b3,U+67c1,U+67d2,U+6832,U+6877,U+68f0,U+6934,U+6966,U+6987,U+6998,U+69c1,U+69ce,U+6a3d,U+6a84,U+6aa9,U+6b87,U+6bd6,U+6c16,U+6c18,U+6cd4,U+6cee,U+6de0,U+6e0c,U+6ecf,U+6f4b,U+70b7,U+7168,U+72d9,U+7352,U+73b3,U+73d0,U+7441,U+74d2,U+75a5,U+75e7-75e8,U+7610,U+7619,U+765e,U+772d,U+7812,U+782c,U+784c,U+7850,U+7856,U+789b,U+78f4,U+7a51,U+7b15,U+7b1e,U+7b24,U+7b5a,U+7bb8,U+7bc1,U+7bd9,U+7ed0,U+7ee6,U+7efa,U+7f1b,U+7f1f,U+7f22,U+7f45,U+7f71,U+7fa7,U+7fbf,U+7ff3,U+8052,U+80b1,U+80db,U+80f4,U+81bb,U+81ec,U+8202,U+8210,U+8249,U+828a,U+828e,U+82e3,U+8315,U+8369,U+8378,U+83a8,U+83aa,U+83b4,U+83e1,U+84fc,U+8538,U+853b,U+859c,U+85ae,U+86b4,U+86c9,U+86cf,U+8725,U+879f,U+87b3,U+887d,U+88fe,U+8a8a,U+8ba7,U+8c07,U+8c14,U+8c30,U+8c47,U+8db5,U+8dd7,U+8e1f,U+8e69,U+8e70,U+8e85,U+8f78,U+8f87,U+8f8b,U+8f8f,U+90c4,U+9143,U+917d,U+948f,U+94cd,U+94d2,U+94ef,U+954a,U+9609-960a,U+96d2,U+9708,U+9765,U+97ea,U+9880,U+98a7,U+996c,U+9980,U+9991,U+9a88,U+9ab6,U+9afb,U+9b47,U+9c87,U+9c9b,U+9cb5,U+9cc7,U+9e2c,U+9e42,U+9e58,U+9ecd,U+9ecf,U+9f8a,U+9f8c",
		},
	},
	{
		uri: e6,
		descriptors: {
			unicodeRange:
				"U+4ebb,U+4edd,U+4fa9,U+502c,U+50a5,U+51c7,U+51fc,U+523d,U+5241,U+530f,U+5464,U+549d,U+54a3,U+5514,U+5527,U+555c,U+556e,U+5576,U+55b1,U+55b9,U+55eb,U+5624,U+564c,U+5671,U+5685,U+568f,U+56d7,U+56e1,U+57a1,U+57d9,U+5942,U+5a67,U+5c50,U+5c7a,U+5c98,U+5d06,U+5d27,U+5d6f,U+5df3,U+5dfd,U+5e19,U+5ea0,U+5eb9,U+5eea,U+5ffe,U+600f,U+606b,U+6215,U+622c,U+6266,U+62bb,U+62bf,U+6308,U+6387,U+63b8,U+63c4,U+63c6,U+63f6,U+6441,U+6555,U+659b,U+6677,U+66a7,U+6775,U+678b,U+679e,U+6840,U+6849,U+6860,U+68c2,U+6910,U+6a28,U+6a2f,U+6a79,U+6b92-6b93,U+6bc2,U+6bfd,U+6c29,U+6c32,U+6c86,U+6cc5,U+6d0c,U+6d60,U+6da0,U+6ddd,U+6e86,U+6ed3,U+6edf,U+6fb9,U+6fd1,U+6fef,U+7023,U+7080,U+70ca,U+712f,U+7145,U+7284,U+732c,U+73c8,U+73d9,U+740a,U+7457,U+7596,U+759d,U+75a3,U+75d8,U+75e3-75e4,U+75ff,U+7622,U+7688,U+76b4,U+76e5,U+7818,U+7887,U+789a,U+78b2,U+7b08,U+7b33,U+7c2a,U+7ccc,U+7ea8,U+7ec0,U+7fe6,U+8012,U+8084,U+8093,U+80e4,U+80ef,U+8297,U+82a8,U+82be,U+8331,U+8366,U+83c5,U+83fd,U+8473,U+84a1,U+84ca,U+84d1,U+857b,U+85c1,U+85d3,U+8605,U+8662,U+86aa,U+86b1,U+86d4,U+86ed,U+86f3,U+8709,U+8748,U+874c,U+8763,U+89c7,U+89de,U+89e5,U+8a3e,U+8ba6,U+8c00,U+8c21,U+8c49,U+8c7a,U+8d30,U+8df9,U+8e51,U+8e59,U+8f6b,U+8f73,U+8ff3,U+9016,U+9026,U+902f,U+9099,U+909b,U+90c7,U+914a,U+91ae,U+91ba,U+9495,U+94a3,U+94af,U+94ba,U+94bf,U+94cc,U+94e1,U+94f0,U+9531,U+955d,U+95f3,U+9697,U+96bc,U+975b,U+977c,U+98a2,U+998a,U+9994-9995,U+9a9b,U+9ab7,U+9ac5,U+9c91,U+9ccf,U+9cd5,U+9e29,U+9edc,U+9edf,U+9f83,U+9f88-9f89",
		},
	},
	{
		uri: t6,
		descriptors: {
			unicodeRange:
				"U+4ee8,U+4f22,U+4f43,U+4f57,U+4f5d,U+4f6f,U+4ff8,U+502d,U+507b,U+5345,U+53df,U+53fb,U+544b,U+5482,U+54a7,U+54cc,U+550f,U+5544,U+5555,U+5594,U+55e8,U+55ec,U+55ef,U+564e,U+56f9,U+5704,U+576d,U+5785,U+57ad,U+5914,U+5958,U+599e,U+59aa,U+59be,U+5a06,U+5abe,U+5ae1,U+5b40,U+5bee,U+5cbf,U+5cc4,U+5ccb,U+5d47,U+603f,U+6078,U+607d,U+607f,U+608c,U+609a,U+60fa,U+61ff,U+621b,U+622e,U+626a,U+6371,U+63ae,U+63cd,U+63d6,U+6410,U+6414,U+6421,U+6448,U+64d8,U+6710,U+6748,U+6772,U+680e,U+6954,U+69ab,U+6c68,U+6c8f,U+6ca4,U+6d2e,U+6e4e,U+6e98,U+6fe0,U+7094,U+70e9,U+7116,U+7119,U+723f,U+73c9,U+74e4,U+753e,U+7548,U+75bd,U+75cd,U+7618,U+7634,U+76c5,U+76f1,U+7708,U+7719,U+777e,U+7791,U+77b3,U+7823,U+7827,U+7830,U+7889,U+7893,U+7949,U+795c,U+79e3,U+7a14,U+7a88,U+7a95,U+7aa0,U+7afd,U+7b90,U+7bd1,U+7bfe,U+7da6,U+7ec2,U+7eef,U+7f03-7f04,U+7f08,U+7f58,U+7f61,U+7f9f,U+8174,U+8200,U+828d,U+82c4,U+82d5,U+82dc,U+82f7,U+832d,U+835a,U+840b,U+8438,U+852b,U+869d,U+86ac,U+86d0,U+86f0,U+8782,U+87a8,U+87d1-87d2,U+87e0,U+8839,U+8913,U+891b,U+8934,U+8941,U+89ca,U+89ce,U+8a07,U+8ba3,U+8bc5,U+8bcb,U+8bdb,U+8c11,U+8c15,U+8c29,U+8c32,U+8dc4,U+8dce,U+8ddb,U+8dfa,U+8e09,U+8e1d,U+8e39,U+8e42,U+8e49,U+8e4b,U+8e8f,U+8f71-8f72,U+9004,U+9036,U+9097,U+90dc,U+90e2,U+90e6,U+90ef,U+9104,U+919a,U+91b4,U+938f,U+9497,U+950f,U+9557,U+9562-9563,U+9573,U+9606,U+9649,U+972d,U+973e,U+97a3,U+97eb,U+988c,U+9894,U+98a6,U+9974,U+9977,U+997d,U+9a90,U+9a9d,U+9aef,U+9ca2,U+9ccd,U+9cdf,U+9e20,U+9e4c,U+9e6b,U+9f3e",
		},
	},
	{
		uri: n6,
		descriptors: {
			unicodeRange:
				"U+4ede,U+4ee1,U+4eeb,U+4fda,U+4ffe,U+5025,U+506c,U+50f3,U+5106,U+520d,U+525c,U+52ad,U+530d,U+5310,U+539d,U+53a9,U+53fc,U+5421,U+5477,U+54e7,U+551b,U+5530,U+557e,U+5599,U+55c4,U+55d1,U+55d4,U+55df,U+55e4,U+55ea,U+5623,U+562d,U+5654,U+56eb,U+56f5,U+57a7,U+57d5,U+57dd,U+584d,U+5880,U+58ec,U+59dd,U+5a32,U+5a55,U+5a75,U+5b51,U+5b71,U+5b73,U+5cd2,U+5ce4,U+5e5b,U+5e96,U+5fd2,U+607b,U+61d1,U+634b,U+636d,U+63b3,U+63ff,U+64c0,U+661d,U+6657,U+66dc,U+67a5,U+6841,U+6867,U+6901,U+699b,U+6a47,U+6b46,U+6c21,U+6c24,U+6c35,U+6c4a,U+6c94,U+6ca3,U+6d39,U+6d63,U+6d6f,U+6d94,U+705e,U+71e7,U+726f,U+72cd,U+72de,U+72f0,U+7325,U+7350,U+7391,U+741a,U+757f,U+7583,U+75b1,U+75b4,U+75b8,U+75c2,U+75f1,U+766f,U+7699,U+7751,U+789c,U+7a17,U+7be6,U+7cb2,U+7ea3,U+7eb0,U+7ebe,U+7eeb,U+7f25,U+7f2c,U+7fb8,U+8026,U+8037,U+8153,U+8171,U+8191,U+8214,U+821b,U+8222,U+826e,U+82eb,U+830c,U+8314,U+8334,U+83d6,U+8418,U+843c,U+84ff,U+8564,U+8572,U+8616,U+866c,U+8693,U+86a3,U+86a7,U+86af,U+86b6,U+86c6,U+86ca,U+8708,U+870d,U+8759,U+8760,U+87af,U+87c6,U+8869,U+88c6,U+89d0,U+8b07,U+8baa-8bab,U+8bc2,U+8be4,U+8bf0,U+8c2a,U+8c62,U+8c89,U+8d49,U+8d6d,U+8d84,U+8d94,U+8db8,U+8dc6,U+8e2e,U+8e3d,U+8e47,U+8e7f,U+9005,U+9051,U+907d,U+9082,U+9088,U+90b0,U+90d3,U+9150,U+949c,U+94a4,U+94b9,U+94cb,U+94e0,U+9509,U+9512,U+951f,U+9534,U+9552-9553,U+965f,U+96b0,U+9791,U+9889,U+9990,U+9a9c,U+9aa7,U+9c88,U+9cb2-9cb3,U+9cb6-9cb7,U+9cc5,U+9cdc,U+9e22,U+9e2a,U+9e57,U+9e67,U+9e73,U+9e82,U+9eb8,U+9ee0,U+9f9b",
		},
	},
	{
		uri: r6,
		descriptors: {
			unicodeRange:
				"U+4eb5,U+4f09,U+4f5a,U+4f8f,U+4fce,U+4fdf,U+4fea,U+4ff3,U+500c,U+500f,U+504e,U+5088,U+52be,U+5420,U+5457,U+5499,U+549b,U+54c6,U+54d2,U+558b,U+559f,U+55bd,U+55d6,U+565c,U+567c,U+568e,U+5768,U+577b,U+57a9,U+57ed,U+59f9,U+5a11,U+5a40,U+5ae6,U+5b6a,U+5b93,U+5bb8,U+5c15,U+5c99,U+5c9c,U+5cc1,U+5d2e,U+5d4b,U+5d99,U+5e54,U+5e61,U+5fcf-5fd1,U+6002,U+6006,U+6014,U+60af,U+60c6,U+60da,U+60f4,U+621f,U+62c8,U+631b,U+631e,U+63e9,U+64b5,U+655d,U+6619,U+6635,U+6641,U+67ad,U+67b0,U+67b7,U+67e9,U+684e,U+688f,U+695d,U+696b,U+69b7,U+6a58,U+6c26,U+6d35,U+6d43,U+6d9e,U+6dd9,U+6dec,U+6e11,U+6e6e,U+6e9f,U+6ec2,U+6ee2,U+6ef9,U+6f09,U+6f66,U+6f8d,U+6fc2,U+6fc9,U+729f,U+72c8,U+73de,U+7430,U+7566,U+7579,U+75c9,U+75e2,U+75fc,U+762a,U+7638,U+7678,U+76c2,U+76f9,U+778c,U+77cd,U+77dc,U+7800,U+781d,U+782d,U+783b-783c,U+78a3,U+78ec,U+7980,U+7a23,U+7b95,U+7bdd,U+7c0c,U+7c41,U+7c91,U+7cb3,U+7cc5,U+7ecc,U+7f19,U+7fca,U+8006,U+8069,U+807f,U+80bd,U+80ed,U+814b,U+8198,U+82cb,U+82d2,U+834f,U+8360,U+847a,U+84d6,U+84e5,U+8537,U+85d0,U+8671,U+86a4,U+86ce,U+86f9,U+8703,U+8707,U+8737,U+873b,U+8815,U+8936,U+8bc3,U+8bcf,U+8bd2,U+8bd8,U+8be9,U+8c0c,U+8c0f,U+8c4c,U+8d45,U+8d5d,U+8d73,U+8e31,U+8e6d,U+8e76,U+8fe4,U+9041,U+90d7,U+9169,U+92ae,U+94a1,U+94c4,U+94c9,U+94db,U+94e7,U+9503,U+9506,U+9517,U+9528,U+9537,U+9542,U+9549,U+95fe,U+9616,U+961a,U+96c9,U+96f3,U+9701,U+970e,U+9739,U+9753,U+9798,U+98d2-98d3,U+98d9-98da,U+9968,U+996f,U+9984,U+9997,U+9acb,U+9b03,U+9c85,U+9ca8,U+9cab,U+9e49,U+9e51,U+9e66,U+9f10",
		},
	},
	{
		uri: o6,
		descriptors: {
			unicodeRange:
				"U+4e15,U+4e1e,U+4e2b,U+4eb3,U+4ec9,U+4f0e,U+4f64,U+501c,U+50a9,U+510b,U+51a2,U+51bc,U+527d,U+52d0,U+53fd,U+5429,U+542e,U+5486,U+54af,U+5506,U+5511,U+5522,U+552c,U+556c,U+55b3,U+55d2,U+55e6,U+55fd,U+561f,U+5639,U+5659,U+5662,U+5693,U+572a,U+5892,U+598a,U+5992,U+59a9,U+5a20,U+5ae3,U+5b17,U+5b7d,U+5d34,U+5d3d,U+5d4a,U+5d82,U+5e1a-5e1b,U+5ea5,U+5f0b,U+5f77,U+5fd6,U+5fff,U+6026,U+6035,U+6063,U+60b4,U+60bb,U+60ee,U+612b,U+6194,U+61ca,U+61e6,U+61f5,U+620a,U+6248,U+62a1,U+62d7,U+6376,U+637b,U+652b,U+65bc,U+65cc,U+65ce,U+65d6,U+664c,U+665f,U+6666,U+6684,U+66b9,U+6773,U+6777,U+6787,U+67de,U+6845,U+693d,U+6994,U+6a35,U+6d54,U+6d5c,U+6d8e,U+6dd6,U+6eb4,U+6f2a,U+6f78,U+704f,U+70ec,U+7118,U+714a,U+7172,U+71b9,U+724d,U+728a,U+7337,U+733e,U+7396,U+73b7,U+73cf,U+7428,U+742c,U+742e,U+74ee,U+74f4,U+7525,U+753a,U+7572,U+75d4,U+765c,U+768e,U+7762,U+777d,U+77fd,U+7825,U+7837,U+78b4,U+795f,U+79ed,U+7a1e,U+7b06,U+7b20,U+7ba9,U+7bab,U+7c7c,U+7cbd,U+7cdc,U+7ec9,U+7ef6,U+7f30,U+7f42,U+7f44,U+7f54,U+7f94,U+8004,U+800b,U+8019,U+809b,U+80ae,U+80c4,U+80f1,U+8146,U+816e,U+817c,U+81c0,U+81fc,U+81fe,U+822b,U+830f,U+832f,U+8340,U+8365,U+8385,U+8392,U+83a0,U+8424,U+84af,U+869c,U+8713,U+8717-8718,U+87c0,U+87cb,U+87fe,U+8821,U+8902,U+89d1,U+8bb9,U+8c12,U+8d32,U+8d53,U+8df7,U+8e7c,U+8f7c,U+8f95,U+8fab,U+9052,U+905b,U+9095,U+909d,U+90c5,U+911e,U+9122,U+916a,U+919b,U+948e,U+9492,U+949a,U+94b5,U+94bc,U+94c6,U+94f1,U+9502,U+9511,U+9536,U+956f-9570,U+9602,U+9621,U+9631,U+998b,U+99a5,U+9a81,U+9a9e,U+9ebe,U+9f8b",
		},
	},
	{
		uri: a6,
		descriptors: {
			unicodeRange:
				"U+4f2b,U+4f3d,U+4fac,U+5043,U+5055,U+5140,U+5156,U+51cb,U+5243,U+531d,U+536f,U+53a5,U+53ae,U+53f1,U+541d,U+5431,U+547b,U+5492,U+5494,U+54a4,U+54aa,U+54ce,U+54fd,U+5509,U+5520,U+553e,U+557b,U+55c5,U+55e1,U+55f7,U+5608,U+5636,U+563b,U+5773,U+57a0,U+5811,U+587e,U+58d5,U+59e3,U+5a29,U+5a6a,U+5a76,U+5a7a,U+5ac9,U+5b62,U+5b95,U+5c49,U+5c8c,U+5cab,U+5cb7,U+5d02,U+5d58,U+5e44,U+5e7a,U+5eff,U+5f29,U+5f89,U+5f9c,U+5fa8,U+6005,U+6043,U+60b8,U+60d8,U+60ec,U+60f0,U+6115,U+618e,U+630e,U+637a,U+6390,U+63ac,U+63b0,U+64de,U+6525,U+6538,U+65ee-65ef,U+6631,U+6636,U+6654,U+677c,U+67b8,U+67d8,U+683e,U+6886,U+68b5,U+692d,U+6963,U+6979,U+6988,U+6b59,U+6b9a,U+6c69,U+6c74,U+6cae,U+6ce0,U+6cef,U+6d95,U+6dc5,U+6dde,U+6de6,U+6dfc,U+6ea7,U+6f15,U+6f29,U+7096,U+70c3,U+7131,U+715c,U+7166,U+7266,U+7317,U+731d,U+7329,U+73e9,U+7425,U+7455,U+7490,U+74ef,U+7519,U+75b5,U+75b9,U+75de,U+7656,U+7663,U+7691,U+7729,U+77fe,U+783e,U+787c,U+795a,U+7a79,U+7abf,U+7b3a,U+7b4f,U+7b60,U+7b75,U+7b8d,U+7bb4,U+7bd3,U+7be1,U+7cbc,U+7edb,U+7f1c,U+7f8c,U+7fb2,U+7fb9,U+7fce,U+7ff1,U+810d,U+81c6,U+82a5,U+82aa,U+82de,U+8317,U+8343,U+835e,U+8364,U+836a,U+853a,U+8543,U+854a,U+8559,U+8568,U+85b0,U+85b9,U+864f,U+86e4,U+8715,U+8845,U+8884,U+88e8,U+88f1,U+8983,U+8be1,U+8c1f,U+8c27,U+8c5a,U+8c82,U+8d58,U+8dbe,U+8f98,U+9035,U+9074,U+90a1,U+9149,U+9157,U+93d6,U+949d,U+94c2,U+94e3-94e4,U+95eb,U+95f0,U+9611,U+9619,U+9642,U+968d,U+9706,U+970f,U+97ed,U+988a,U+9893,U+98e8,U+9a77,U+9a87,U+9aa1,U+9abc,U+9cdd,U+9e2f,U+9e33,U+9e44,U+9e5c,U+9e9d,U+9edd",
		},
	},
	{
		uri: i6,
		descriptors: {
			unicodeRange:
				"U+4f58,U+4f6c,U+4f70,U+4fd0,U+5014,U+51bd,U+524c,U+5315,U+5323,U+535e,U+540f,U+542d,U+545b,U+548e,U+549a,U+54ab,U+54fc,U+5567,U+556a,U+5600,U+5618,U+563f,U+5669,U+56f1,U+56ff,U+573b,U+574d,U+579b,U+57b8,U+57c2,U+586c,U+58f9,U+595a,U+598d,U+5993,U+5996,U+59d7,U+5b7a,U+5ba6,U+5c4e,U+5c96,U+5ce5,U+5eb6,U+5f08,U+5f99,U+602f,U+6059,U+606c,U+607a,U+60ed,U+61a9,U+620c,U+6249,U+62a8,U+62c4,U+62ed,U+62fd,U+6342,U+6345,U+6396,U+63a3,U+6402,U+6413,U+642a,U+6487,U+64a9,U+64ac,U+64ae,U+64b7,U+659f,U+65a1,U+667e,U+66f3,U+67e0,U+69db,U+69df,U+6aac,U+6b86,U+6c50,U+6c5e,U+6c76,U+6c85,U+6c8c,U+6cde,U+6d19,U+6d52,U+6da7,U+6db8,U+6e1a,U+6e25,U+6e4d,U+6e5f,U+6ec1,U+6f31,U+6f7a,U+6fa7,U+6fe1,U+701b,U+70ab,U+70f7,U+717d,U+71a8,U+7252,U+72c4,U+72e1,U+7315,U+736d,U+73ae,U+73c0,U+73c2,U+740f,U+75a4,U+7600-7601,U+768b,U+76bf,U+76d4,U+7728,U+772f,U+776c,U+77a0,U+77b0,U+77f8,U+783a,U+78d0,U+78fa,U+7977,U+7a37,U+7a92,U+7afa,U+7b71,U+7b94,U+7cef,U+7f28,U+7fe1,U+808b,U+80e5,U+80eb,U+8110,U+8113,U+812f,U+814c,U+81c3,U+8235,U+82d4,U+8309,U+83c1,U+8431,U+8469,U+84bf,U+84d3,U+84df,U+84e6,U+8511,U+8638,U+86c0,U+86db,U+86fe,U+8757,U+8822,U+8882,U+8885,U+8892,U+88f3,U+892a,U+8ba5,U+8bd9,U+8be0,U+8be7,U+8bfd,U+8c1a,U+8d4a,U+8d4e,U+8d66,U+8dda,U+8e0c,U+8e52,U+8e74,U+8e87,U+8f76,U+8fc2,U+8fe6,U+900d,U+9068,U+90ac,U+90b3,U+90b8,U+90e7,U+9119,U+9131,U+915a,U+916e,U+94b4,U+94d0,U+94e2,U+94ec,U+94ff,U+9522,U+9535,U+9556,U+965b,U+96f9,U+9774,U+9981,U+998d,U+998f,U+9a6e,U+9a7f,U+9a8a,U+9b13,U+9c9f,U+9e3e,U+9e43,U+9e6d,U+9e8b,U+9e92,U+9edb,U+9eef",
		},
	},
	{
		uri: s6,
		descriptors: {
			unicodeRange:
				"U+4e10,U+4e56,U+4e98,U+4ec3,U+4f3a,U+4f5f,U+4f88,U+4f97,U+4fa5,U+4fe8,U+504c,U+5197,U+52fa,U+5364,U+53e8,U+5406,U+543c,U+545c,U+5471,U+5480,U+5495,U+54b3,U+54df,U+54e6,U+54ee,U+557c,U+5583,U+55dc,U+55e3,U+566c,U+592f,U+5944,U+5983,U+59ca,U+59e5,U+5a13,U+5a7f,U+5b09,U+5bd0,U+5e4c,U+5eb5,U+5f1b,U+5f3c,U+608d,U+60cb,U+61a7,U+61ac,U+61cb,U+6233,U+62a0,U+62e7,U+62ee,U+62f4,U+62f7,U+634e,U+6382,U+63c9,U+63ea,U+6400,U+645e,U+6482,U+6556,U+6593,U+6615,U+664f,U+66e6,U+672d,U+675e,U+67da,U+6805,U+6808,U+6868,U+68a2,U+695e,U+69ad,U+6a80,U+6a90,U+6b83,U+6be1,U+6c30,U+6cad,U+6cb1,U+6cf1,U+6d31,U+6d93,U+6dae,U+6dbf,U+6dc6-6dc7,U+6e0d,U+6e32,U+6e3a,U+6e85,U+6eba,U+6f3e,U+6f5e,U+6f7c,U+6fee,U+71ee,U+722a,U+72b7,U+72e9,U+73ba,U+73d1,U+7409,U+7435-7436,U+7459-745a,U+747e,U+7487,U+74e2,U+7504,U+752c-752d,U+7599,U+759f,U+75a1,U+75ca,U+75f0,U+761f,U+7629,U+777f,U+7785,U+77a5,U+77bf,U+78d5,U+7934,U+7940,U+79a7,U+7b19,U+7c38,U+7c95,U+7cb1,U+7ce0,U+7eca,U+7ef7,U+7f2b,U+7f81,U+7fcc,U+8046,U+8148,U+8165,U+819b,U+81ba,U+828b,U+82ae,U+82b7,U+82d3,U+8301,U+830e,U+831c,U+8338,U+837c,U+8393,U+8398,U+83ba,U+83e0,U+83e9,U+853c,U+8654,U+86df,U+8712,U+873f,U+874e,U+8783,U+8859,U+88a4,U+8925,U+8bb7,U+8bff,U+8c19,U+8c1b,U+8c24,U+8c2c,U+8d61,U+8db4,U+8e6c,U+8f8a,U+8fe5,U+8ff8,U+901e,U+90f4,U+912f,U+9163,U+9170,U+91dc,U+949b,U+94a8,U+94b3,U+94c0,U+94e8,U+9525,U+9530,U+9539,U+954c-954d,U+9550,U+955b,U+962a,U+9685,U+96cc,U+9776,U+988d,U+9975,U+9985,U+9a6f,U+9aa5,U+9ab8,U+9c7f,U+9ca4,U+9cb8,U+9e25,U+9e35,U+9e4a",
		},
	},
	{
		uri: c6,
		descriptors: {
			unicodeRange:
				"U+4ea2,U+4ea5,U+4f36,U+4f84,U+4f8d,U+501a,U+5029,U+516e,U+51a5,U+51c4,U+51f8,U+5201,U+527f,U+5321,U+5352,U+5366,U+53e9,U+54c7,U+5632,U+5676,U+56b7,U+56bc,U+56da,U+56e4,U+5703,U+5729,U+5742,U+57a2-57a3,U+5815,U+58d1,U+5919,U+592d,U+5955,U+5a05,U+5a25,U+5a34,U+5b70,U+5b75,U+5bdd,U+5bf0,U+5c41,U+5c79,U+5c91,U+5c94,U+5ce6,U+5ced,U+5d69,U+5dc5,U+5e16,U+5e27,U+5f27,U+5f95,U+5ffb,U+6020,U+604d,U+6055,U+60e6,U+60eb,U+6123,U+618b,U+61a8,U+620d,U+62c7,U+62ce,U+62d9,U+631f,U+634d,U+6452,U+6479,U+64ce,U+64d2,U+655b,U+660a,U+6726,U+67c4,U+6809,U+6853,U+68e3,U+68f1,U+68fa,U+693f,U+6942,U+6995,U+69a8,U+69b4,U+6a71,U+6b89,U+6bcb,U+6bd3,U+6bd9,U+6c40,U+6cf8,U+6cfe,U+6d85,U+6da3,U+6daa,U+6e0e,U+6e43-6e44,U+6f88,U+7078,U+7099,U+70bd,U+70d9,U+70fd,U+7109,U+7184,U+7239,U+733f,U+73f2,U+748b,U+749c,U+749e,U+759a,U+75d2,U+75eb,U+7620,U+766b,U+7693,U+76cf,U+7738,U+773a,U+776b,U+778e,U+77aa,U+7852,U+78be,U+7948,U+795b,U+7960,U+796f,U+79ba,U+7a20,U+7a96,U+7aa5,U+7b03,U+7b28,U+7b50,U+7b77,U+7bc6,U+7bf1,U+7c27,U+7d0a,U+7ead,U+7ec5,U+7ee2,U+7ef0,U+7efd,U+7f0e,U+7f2e,U+7f79,U+7f9a,U+8098,U+80da,U+80e7,U+80f0,U+80f3,U+80fa,U+818a,U+81e7,U+8237-8238,U+8299,U+82b8,U+82ce,U+837b,U+83bd,U+83cf,U+8426,U+8475,U+85c9,U+85d5,U+85dc,U+85e9,U+871a,U+8747,U+8749,U+888d,U+8910,U+891a,U+8bb4,U+8be3,U+8bec,U+8bf2,U+8c06,U+8c0d,U+8d31,U+8d48,U+8de4,U+8e1e,U+8e4a,U+8e66,U+8f84,U+8f97,U+9083,U+90e1,U+9165,U+91c9,U+94b0,U+94f5,U+9504,U+9532,U+956d,U+95f5,U+95fa,U+9668,U+9698,U+96bd,U+9704,U+9773,U+9890,U+996a,U+997a,U+9a74,U+9a8b,U+9cc4,U+9ccc",
		},
	},
	{
		uri: l6,
		descriptors: {
			unicodeRange:
				"U+4ea8,U+4f1e,U+4f51,U+4f63,U+4f7c,U+4f83,U+4fa0,U+4fd1,U+4ffa,U+5018,U+5026,U+508d,U+50bb,U+50f5,U+50fb,U+5162,U+5319,U+5320,U+538c,U+5413,U+541f,U+5475,U+54bd,U+54d1,U+5589,U+5598,U+575f,U+57ae,U+57e0,U+5937,U+5974,U+5978,U+59ae,U+5a1f,U+5a49,U+5ab3,U+5b99,U+5b9b,U+5ba0,U+5be1,U+5be5,U+5c09,U+5c27,U+5de2,U+5e9a,U+5f26,U+5f8a,U+5f98,U+6021,U+606d,U+60bc,U+60d5,U+60e7,U+611a,U+614c,U+6254,U+626f,U+6292,U+6296,U+62b9,U+62e2,U+631a,U+631d,U+6320,U+6346,U+63ba,U+6467,U+64bc,U+658b,U+663c,U+6643,U+6652,U+6656,U+6687,U+66d9,U+66dd,U+66f0,U+673d,U+67ab,U+6816-6817,U+68a7,U+68ad,U+68cd,U+68e0,U+6986,U+69fd,U+6b47,U+6bd7,U+6c1f,U+6c2e-6c2f,U+6cbe,U+6de4,U+6e1d,U+6e83,U+6e9c,U+6ed4-6ed5,U+6f4d,U+70f9,U+7130,U+716e,U+718f,U+71ac,U+71e5,U+72fc,U+731c,U+7334,U+73ca,U+7422,U+7426,U+745f,U+7470,U+75af,U+75f4,U+762b,U+763e,U+7696,U+7737,U+7741,U+77a7,U+77bb,U+77ee,U+785d,U+788c,U+78ca,U+7901,U+796d,U+7985,U+79fd,U+7a3c,U+7a57,U+7a74,U+7b5b,U+7caa,U+7cb9,U+7cd5,U+7eac,U+7eb6,U+7ed1,U+7ee5,U+7f20,U+7f2a,U+7f38,U+7f69,U+7fa1,U+8018,U+8038,U+803f,U+804b,U+80a2,U+80be,U+80d6,U+817a,U+81fb,U+820c,U+82ad,U+82af,U+82bd,U+8327,U+8354,U+835f,U+8367,U+836b,U+840c,U+841d,U+8471,U+849c,U+84b2,U+84c9,U+8517,U+851a,U+8549,U+8681,U+8721,U+8776,U+88d9,U+88f9,U+89c5,U+8c1c,U+8c34,U+8d81,U+8d9f,U+8e0a,U+8e72,U+8eb2,U+8fed,U+901b,U+902e,U+906e,U+9091,U+90aa,U+90af,U+915d,U+9171,U+946b,U+9489,U+9499,U+94a5,U+9508,U+9524,U+952d,U+9551,U+9576,U+95f7,U+9600,U+96b6,U+96c0,U+9756,U+97f6,U+98a0,U+98a4,U+997f,U+9a73,U+9a86,U+9ad3,U+9e3d,U+9ed4",
		},
	},
	{
		uri: d6,
		descriptors: {
			unicodeRange:
				"U+4e4d,U+4e5e,U+4ec7,U+4ed5,U+50da,U+50e7,U+515c,U+51a4,U+51ff,U+5203,U+5254,U+5300,U+533e,U+5375,U+53ee,U+5435,U+543b,U+5455,U+548b,U+548f,U+54d7,U+54fa,U+5578,U+5587,U+55a7,U+560e,U+5760,U+576f,U+5777,U+5830,U+58a9,U+5962,U+59e8,U+5a07,U+5a23,U+5a3c,U+5b5a,U+5bb5,U+5bc5,U+5bde,U+5c7f,U+5cb1,U+5ce8,U+5cea,U+5d29,U+5d4c,U+5e18,U+5f57,U+5f5d,U+5f87,U+5ff1,U+6016,U+601c,U+6064,U+6177,U+61d2,U+625b,U+62e3,U+62f1,U+634f,U+63a0,U+6401,U+6405,U+6495,U+64c2,U+6512,U+6577,U+6590,U+65a7,U+65a9,U+65f7,U+6627,U+6655,U+6714,U+6795,U+67d1,U+67ff,U+68b3,U+68d5,U+68d8,U+6930,U+6960,U+6977,U+69bb,U+69d0,U+6a31,U+6b7c,U+6bb4,U+6c22,U+6c72,U+6c79,U+6c7e,U+6c81,U+6c93,U+6ca5,U+6cbc,U+6ce3,U+6cfb,U+6d3c,U+6da9,U+6df3,U+6e2d,U+6eaf,U+6ec7,U+6f13,U+6f33,U+6f62,U+6fa1,U+7011,U+707c,U+708a,U+70c1,U+70d8,U+70eb,U+711a,U+7194,U+7281,U+7316,U+7357,U+7384,U+7405,U+742a,U+745b,U+7574,U+7578,U+75ea,U+7682,U+7792,U+77d7,U+77e9,U+77eb,U+77f6,U+780c,U+78c5,U+7941,U+79e4,U+7a1a,U+7a9c,U+7ad6,U+7b5d,U+7bf7,U+7c07,U+7c3f,U+7c9f,U+7ca5,U+7cdf,U+7e82,U+7eab,U+7ece,U+7eda,U+7f09,U+7f15,U+7f9e,U+7fdf,U+7fe9,U+803b,U+803d,U+80aa,U+80b4,U+813e,U+8155,U+817b,U+819d,U+821c,U+82b9,U+82df,U+82ef,U+8304,U+83b9,U+8446,U+853d,U+85af,U+85fb,U+8650,U+865e,U+86d9,U+86ee,U+8700,U+8862,U+889c,U+88d4,U+88f8,U+895f,U+8a79,U+8bb3,U+8bb6,U+8bc0,U+8beb,U+8bf5,U+8c23,U+8c79,U+8d1e,U+8dcb,U+8e29,U+8e44,U+8e81,U+8eac,U+8eaf,U+8f8d,U+9050,U+90f8,U+914b,U+948a,U+94be,U+94ee,U+950c,U+9540,U+962e,U+9647,U+9661,U+9699,U+96cf,U+9716,U+9761,U+97a0,U+97e7,U+9a7c,U+9a8f,U+9ae6,U+9cd6,U+9e26",
		},
	},
	{
		uri: U6,
		descriptors: {
			unicodeRange:
				"U+4fa3,U+4fae,U+4fd8,U+4fef,U+50a3,U+5189,U+5195,U+51db,U+51f3,U+51f9,U+5220,U+5228,U+5288,U+52ff,U+532e,U+533f,U+5351,U+53db,U+53ed,U+5450,U+5484,U+5490,U+54c9,U+54e9,U+5501,U+5507,U+5543,U+55d3,U+56a3,U+575e,U+589f,U+5984,U+59ec,U+5a04,U+5a36,U+5a77,U+5a9a-5a9b,U+5ab2,U+5ac2,U+5ad6,U+5bc7,U+5c2c,U+5c34,U+5c51,U+5cd9,U+5d0e,U+5deb,U+5e3c,U+5e87,U+5ed3,U+5f13,U+5f64,U+5fe1,U+606a,U+6096,U+60df,U+60f6,U+60f9,U+6151,U+620e,U+6241,U+6252,U+6273,U+627c,U+6289,U+62c2,U+62cc,U+62ef,U+6361,U+6363,U+63b7,U+63e3,U+6518,U+66ae,U+6756,U+6789,U+6813,U+6829,U+6862,U+6866,U+6893,U+6897,U+690e,U+6984,U+69cc,U+6a1f,U+6a44,U+6a59,U+6ba1,U+6c13,U+6c90,U+6ca6,U+6cbd,U+6ccc,U+6cd3,U+6cd7,U+6d4a,U+6d4f,U+6d5a,U+6d9f,U+6da1,U+6dcc,U+6ea5,U+6ee4,U+6ee6,U+6f2f,U+6f8e,U+701a,U+7095,U+709c,U+70af,U+70db,U+70e8,U+714e,U+715e,U+71a0,U+71ce,U+7235,U+7280,U+72d0,U+72f8,U+73ab,U+7410,U+745c,U+7480,U+74a7-74a8,U+74e3,U+75ae,U+75f9,U+76b1,U+76ce,U+7736,U+77e2-77e3,U+781a,U+789f,U+797a,U+79be,U+79c3,U+79c6,U+79f8,U+7a8d,U+7a98,U+7aa6,U+7aff,U+7b1b,U+7cd9,U+7d6e,U+7ede,U+7eee,U+7f00,U+7f24,U+7f2d,U+7fd8,U+800d,U+8116,U+8151,U+81b3,U+8205,U+82c7,U+82db,U+832c,U+8335,U+8339,U+8386,U+846b,U+8587,U+8611,U+8682,U+868a,U+868c,U+8774,U+88d8,U+88f4,U+8912,U+8b6c,U+8bbd,U+8c0e,U+8c41,U+8d26,U+8d3b-8d3c,U+8d50,U+8dea,U+8e35,U+8f99,U+8fe2,U+8fe9,U+9017,U+914c,U+916f,U+9175-9176,U+918b,U+94a0,U+94ae,U+94ce,U+94f2,U+951a,U+952f,U+9541,U+9640,U+9672,U+968b,U+96cd,U+96ef,U+9713,U+97ec,U+9885,U+9992,U+9a6d,U+9a79,U+9a85,U+9cbb,U+9cd7,U+9cde,U+9e93,U+9f9f",
		},
	},
	{
		uri: f6,
		descriptors: {
			unicodeRange:
				"U+4e11,U+4ed7,U+4fcf,U+4fe9,U+4fed,U+50ac,U+50b2,U+5112,U+5180,U+5188,U+51f6,U+522e,U+5265,U+52cb,U+52df,U+5349,U+5367,U+5378,U+537f,U+5395,U+5398,U+53d4,U+543e,U+5440,U+5446,U+54b8,U+5565-5566,U+5580,U+55bb,U+56ca,U+572d,U+573e,U+574e,U+5782-5784,U+58f3,U+5938-5939,U+5948,U+594e,U+5a1c,U+5a74,U+5ae9,U+5b55,U+5b5c,U+5bb0,U+5bd3,U+5bf8,U+5c3f,U+5d14,U+5d2d,U+5df7,U+5dfe,U+5e05-5e06,U+5e1c,U+5e62,U+5e7b,U+5e7d,U+5ed6,U+5f2f,U+5f66,U+5f6c,U+5fa1,U+604b,U+609f,U+60a6,U+60e8,U+6101,U+6124,U+6127,U+6148,U+61be,U+6247,U+62d8,U+62da,U+633d,U+635e,U+6367,U+6380,U+638f,U+63a9,U+63fd,U+641c,U+64e6,U+655e,U+6572,U+6591,U+65a5,U+6691,U+6735,U+67a2-67a3,U+67ef,U+680b,U+6876,U+6905,U+6a0a,U+6a61,U+6b79,U+6bb7,U+6bbf,U+6c41,U+6c55,U+6c83,U+6c9b,U+6ca7,U+6cfc,U+6d46,U+6d51,U+6d74,U+6d9d,U+6daf,U+6dc0,U+6deb,U+6e17,U+6e24,U+6e89,U+6ea2,U+6ef4,U+6f6d,U+707f,U+70b3,U+70e4,U+70ef,U+710a,U+722c,U+725f,U+7261,U+72ee,U+72f1,U+730e,U+732b,U+7433,U+7538,U+75bc,U+7624,U+7709,U+7750,U+7779,U+7802,U+7898,U+78a7,U+78b1,U+78cb,U+78f7,U+7984,U+7a83,U+7aed,U+7b3c,U+7b4b,U+7c92,U+7c98,U+7ca4,U+7eb9,U+7ee3,U+7ef3,U+7ef5,U+7f05,U+7f55,U+7f62,U+7fc1,U+7fd4,U+7fe0,U+8042,U+806a,U+80a0,U+80a4,U+80c3,U+8102,U+8106,U+814a,U+8154,U+8247,U+8258,U+82cd,U+8328,U+832b,U+8389,U+83ca,U+845b,U+846c,U+84b8,U+8574,U+859b,U+8680,U+8695,U+86c7,U+8702,U+886c,U+8896,U+88b1,U+88e4,U+8bc8,U+8c10,U+8c26,U+8c28,U+8c2d,U+8d4c,U+8d63,U+8f67,U+8f74,U+8fc4,U+9006,U+9063,U+90a2,U+90b1,U+90c1,U+9177,U+9189,U+9493,U+949e,U+94fe,U+9610,U+961c,U+96a7,U+96fe,U+978d,U+97f5,U+9888,U+997c,U+9a84,U+9b3c,U+9b44-9b45,U+9b54,U+9e64,U+9f0e,U+9f9a",
		},
	},
	{
		uri: u6,
		descriptors: {
			unicodeRange:
				"U+4e19,U+4e38,U+4e53,U+4e7e,U+4e9f,U+4ec6,U+4f50,U+4fde,U+502a,U+5154,U+517d,U+51d1,U+51f0,U+5239,U+5256,U+52c9,U+52fe,U+5308,U+532a,U+535c,U+5384,U+53a2,U+53a8,U+53c9,U+53e0,U+5496,U+54ac,U+54c0,U+54c4,U+54e8,U+5561,U+5582,U+561b,U+5631,U+566a,U+5764,U+576a,U+5792,U+57ab,U+584c,U+5885,U+58f6,U+59a8,U+5acc,U+5bc2,U+5c38-5c39,U+5c60,U+5c6f,U+5c82,U+5c90,U+5d16,U+5dcd,U+5e37,U+5e90,U+5eb8,U+5f6a,U+5fcc,U+6012,U+6068,U+6073,U+607c,U+6094,U+6109,U+621a,U+626e,U+6284,U+62d0,U+62e6,U+62fe,U+6321,U+6328,U+632b,U+6349,U+6454,U+65ed,U+660f,U+6674,U+66a8,U+6749,U+674f,U+6760,U+67af,U+6850,U+6854,U+6869,U+68a8,U+68d2,U+68f5,U+6912,U+6b49,U+6b6a,U+6bef,U+6c28,U+6c5d,U+6c82,U+6cab,U+6cb8,U+6cc4,U+6cf5,U+6d47,U+6d78,U+6da4,U+6dc4,U+6dcb,U+6df9,U+6e0a,U+6e23,U+6e5b,U+6eb6,U+6f06,U+6f47,U+6f84,U+6f9c,U+6fd2,U+7076,U+70ac,U+7199,U+723d,U+72ac,U+72ed,U+7476,U+7529,U+752b,U+754f,U+7554,U+75d5,U+7626,U+76ef,U+7720,U+7766,U+7784,U+77ac,U+780d,U+7838,U+7845,U+786b,U+78b3,U+7978,U+79b9,U+79c9,U+79e7,U+7a3d,U+7a84,U+7a9f,U+7b0b,U+7b52,U+7c7d,U+7f1a,U+7fc5,U+7ff0,U+804a,U+8086-8087,U+808c,U+809a,U+80ba,U+810a,U+8180,U+818f,U+81c2,U+81ed,U+8231,U+8292,U+829c,U+82a6,U+82d1,U+8346,U+838e,U+839e,U+83c7,U+83f1,U+8403,U+840e,U+8513,U+857e,U+85e4,U+867e,U+871c,U+87ba,U+87f9,U+884d,U+8944,U+8a93,U+8c05,U+8d2c,U+8d2e,U+8d42-8d43,U+8dfb,U+8e22,U+8eba,U+8f69,U+8f9c,U+8fa3,U+8fa8,U+8fb1,U+900a,U+9038,U+903b,U+9042,U+904f,U+90b5,U+90dd,U+9102,U+9187,U+94a7,U+94c5,U+9523,U+95f8,U+95fd,U+960e,U+964b-964c,U+96c1,U+9709,U+971c,U+97ad,U+9882,U+9965,U+9976,U+9988,U+99a8,U+9a82,U+9a9a,U+9b41,U+9c8d,U+9e45,U+9e70,U+9e9f,U+9f3b,U+9f7f",
		},
	},
	{
		uri: p6,
		descriptors: {
			unicodeRange:
				"U+4e08,U+4e18,U+4e1b,U+4e22,U+4e27,U+4e32,U+4e52,U+4e73,U+4ead,U+4ed4,U+4ed9,U+4ef0,U+4fa6,U+5076,U+5179,U+51bb,U+51c9,U+51ef,U+51fd,U+524a,U+526a,U+529d,U+52ab,U+5306,U+5339,U+53d9,U+540a,U+5410,U+541e,U+5439,U+54b1,U+54ed,U+5564,U+558a,U+55b7,U+5634,U+574a,U+5751,U+57a6,U+57cb,U+57d4,U+5824,U+582a,U+5835,U+5858,U+5893,U+58e4,U+5951,U+5986,U+59da,U+59fb,U+59ff,U+5a03,U+5a46,U+5ac1,U+5b5d,U+5bfa,U+5c18,U+5c3a,U+5c48,U+5c4f,U+5c61,U+5cb3,U+5d1b,U+5e15,U+5e3d,U+5e99,U+5e9e,U+5eca,U+5f0a,U+5f17-5f18,U+5f25,U+5f7c,U+5fcd,U+6028,U+60a0,U+60ac,U+60d1,U+614e,U+6155,U+6168,U+61c8,U+6208,U+6212,U+6251,U+629a-629b,U+62ab-62ac,U+62fc,U+6323,U+632a,U+63d2,U+643a,U+6491-6492,U+649e,U+64b0,U+64c5,U+659c,U+6614,U+662d,U+6664,U+6670,U+6676,U+6746,U+67cf,U+67d4,U+682a,U+6843,U+6846,U+68da,U+6b3a,U+6b67,U+6c27,U+6c5b,U+6c64,U+6c70,U+6caa,U+6cca,U+6ce1,U+6d12,U+6d45,U+6dd1,U+6dd8,U+6e34,U+6e7f,U+6ee5,U+6f02,U+7092,U+70c2,U+70e6,U+7115,U+7237,U+7272,U+727a,U+72c2,U+739b,U+73b2,U+743c,U+751c,U+758f,U+75b2,U+7686,U+76c6,U+76d2,U+76fc,U+775b,U+77a9,U+7816,U+788e,U+7897,U+78b0,U+79bd,U+7a0d,U+7a91,U+7a9d,U+7ae3,U+7bad,U+7cca,U+7d2b,U+7eb1,U+7f06,U+7f14,U+7f1d,U+7f50,U+7ffc,U+8036,U+80bf,U+80c1,U+80ce,U+80f8,U+8109,U+810f,U+8170,U+8179,U+819c,U+821f,U+8230,U+8236,U+8273,U+829d,U+82f9,U+8305,U+8350,U+83b2,U+83cc,U+8404,U+840d,U+8427,U+8482,U+8679,U+8854,U+886b,U+8bbc,U+8be6,U+8c31,U+8c6b,U+8d4b,U+8dcc,U+8e2a,U+8e48,U+8f90,U+8fb0,U+9022,U+903c,U+903e,U+9065,U+916c,U+917f,U+94a9,U+94c3,U+94dd,U+94ed,U+9510,U+953b,U+96c7,U+970d,U+9738,U+9877,U+987d,U+989c,U+98d8,U+9a70,U+9a91,U+9aa4,U+9b42,U+9b4f,U+9e2d,U+9e3f,U+9e7f,U+9f20",
		},
	},
	{
		uri: m6,
		descriptors: {
			unicodeRange:
				"U+4e59,U+4ed3,U+4f0f,U+4f38,U+4f69,U+4fa7,U+4faf,U+4ff1,U+5077,U+5085,U+5144,U+5151,U+51af,U+51b6,U+51cc,U+523a,U+5251,U+5269,U+5272,U+52d8,U+5353,U+5389,U+53f9,U+5401,U+5415,U+541b,U+54f2,U+5524,U+554a,U+559d,U+5609,U+5740,U+575d,U+5806,U+5821,U+586b,U+5915,U+594f,U+5960,U+5999,U+59a5,U+59b9,U+59c6,U+59d1,U+59dc,U+5b5f,U+5b64,U+5b87,U+5bb4,U+5bbf,U+5c16,U+5c1d,U+5c3e,U+5c9a,U+5ca9,U+5cad,U+5cfb,U+5de1,U+5de7,U+5de9,U+5ef7,U+5f04,U+5f70,U+5f79,U+5fc6,U+602a,U+6050,U+6052,U+6070,U+6084,U+60b2,U+60dc,U+60e9,U+6167,U+6170,U+61c2,U+6270,U+6291,U+62b1,U+62bc,U+62dc,U+62df,U+62f3,U+6324,U+633a,U+6377,U+6398,U+63cf,U+640f,U+642c-642d,U+6458,U+6478,U+6500,U+654c,U+6566,U+658c,U+65c1,U+65cb,U+65e8,U+65ec,U+6696-6697,U+6734,U+679a,U+679d,U+67dc,U+67f3-67f4,U+680f,U+683d,U+684c,U+68af,U+699c,U+6bc1,U+6c0f,U+6c1b,U+6c57,U+6c6a,U+6d3d,U+6d6e,U+6d82,U+6db5,U+6dee,U+6e58,U+6eaa,U+6ecb,U+6ede,U+6ee9,U+6f0f,U+6f20,U+6f58,U+704c,U+7070,U+70b8,U+718a,U+7238,U+7262,U+7275,U+72b9,U+72d7,U+72e0,U+741b,U+7434,U+7483,U+74f6-74f7,U+75ab,U+764c,U+7761,U+7855,U+7891,U+78c1,U+79d2,U+7a00,U+7a3b,U+7c97,U+7ea4,U+7eb2,U+7ed2,U+7eea,U+7ef8,U+7f18,U+7fbd,U+8000,U+8010,U+8096,U+809d,U+80a9,U+817f,U+81e3,U+8206,U+8212,U+82ac,U+8302,U+8361,U+8377,U+83f2,U+8461,U+848b,U+84ec,U+8521,U+85aa,U+8870,U+8877,U+8881,U+888b,U+88ad,U+88c2,U+8986,U+8bd1,U+8bf1,U+8d24,U+8d2a,U+8d3e-8d3f,U+8d41,U+8d56,U+8d64,U+8d6b,U+8e0f,U+8f70,U+8f85,U+8f88,U+8fa9,U+9003,U+901d,U+90b9,U+90ce,U+94a6,U+94f8,U+9505,U+95ea,U+95ef,U+95f2,U+95f9,U+9601,U+9605,U+9634,U+966a,U+9677,U+9690,U+9694,U+96d5,U+971e,U+9896-9897,U+9972,U+9a71,U+9a76,U+9a7e,U+9e1f,U+9e23",
		},
	},
	{
		uri: h6,
		descriptors: {
			unicodeRange:
				"U+4e01,U+4e43,U+4ea6,U+4ef2,U+4eff,U+4f26,U+4f2a,U+4f2f,U+4f5b,U+4fa8,U+4fca,U+4fd7,U+5021,U+504f,U+5141,U+51c0,U+51dd,U+51e4,U+51ed,U+5200,U+5237,U+5427,U+5448,U+54a8,U+5706,U+5708,U+5723,U+575b,U+57c3,U+5899,U+58a8,U+58c1,U+5976,U+5988,U+59bb,U+59d0,U+59d3,U+5a18,U+5a31,U+5a92,U+5b54,U+5b85,U+5baa-5bab,U+5bc4,U+5bd2,U+5be8,U+5bff,U+5c65,U+5d07,U+5e1d,U+5e78,U+5e7c,U+5f03,U+5f1f,U+5f39,U+5f6d,U+5f92,U+5faa,U+5fbd,U+5fe7,U+5ffd,U+60a8,U+60ef,U+6108,U+6162,U+622a,U+6234,U+626b,U+626d,U+62c6,U+62d2,U+62d4,U+62d6,U+62e8,U+6316,U+6355,U+63ed,U+6447,U+64a4,U+65f1,U+6606,U+6628,U+664b,U+6668,U+6682,U+66f9,U+66fc,U+66ff,U+6717,U+6740,U+676d,U+67aa,U+67ec,U+67f1,U+6842,U+6851,U+695a,U+6982,U+6a2a,U+6b20,U+6b23,U+6b32,U+6b96,U+6bc5,U+6beb,U+6c60,U+6c9f,U+6cea,U+6cf3,U+6d1e,U+6d53,U+6d66,U+6d69,U+6d8c,U+6d9b,U+6db2,U+6de1,U+6dfb,U+6e14,U+6ed1,U+6eda,U+6ee8,U+6f2b,U+706d,U+7089,U+708e,U+70ad-70ae,U+70e7,U+7126,U+714c,U+71c3,U+71d5,U+7206,U+7259,U+731b,U+73a9,U+73bb,U+74dc,U+7532,U+7545,U+755c,U+75c7,U+7687,U+76d7,U+76f2,U+788d,U+78e8,U+79e6,U+79e9,U+7a3f,U+7a46,U+7a97,U+7af9,U+7bee,U+7c4d,U+7c89,U+7cd6,U+7eb5,U+7ebd,U+7ed8,U+8017,U+8033,U+80c0,U+80de,U+80f6,U+8138,U+817e,U+81a8,U+820d,U+827e,U+82b3,U+82d7,U+83b1,U+84c4,U+84dd,U+8584,U+864e,U+865a,U+866b,U+86cb,U+88d5,U+89e6,U+8bca,U+8bde,U+8bfa,U+8c0a,U+8c37,U+8c46,U+8c6a,U+8c8c,U+8d1d,U+8d29,U+8d4f,U+8d54,U+8d5a,U+8d60,U+8d62,U+8f7f,U+8f96,U+8f9e-8f9f,U+8fc1,U+8fdf,U+8fea,U+8ff7,U+9012,U+906d,U+9075,U+90a6,U+90bb,U+90ca,U+9178,U+9192,U+91ca,U+94bb,U+94dc,U+94fa,U+9501,U+950b,U+9521,U+955c,U+963b,U+9655,U+9675-9676,U+9887,U+9891,U+9971,U+9a97,U+9ece,U+9ed8",
		},
	},
	{
		uri: b6,
		descriptors: {
			unicodeRange:
				"U+4e1d,U+4e39,U+4e4c,U+4e4f,U+4e54,U+4e58,U+4e95,U+4ea1,U+4eab,U+4eae,U+4ec1,U+4f10,U+4f19,U+4f30,U+4f34,U+4fb5,U+503e,U+518c,U+5192,U+51a0,U+51ac,U+51b0,U+51e1,U+5211,U+5242,U+52a3,U+52b2,U+52c3,U+52c7,U+52d2,U+52e4,U+5377,U+539a,U+53a6,U+53e5,U+5417,U+5510,U+552f,U+5531,U+574f-5750,U+5761,U+5851,U+5854,U+58ee,U+593a,U+5949,U+5954,U+5a5a,U+5b8b,U+5bbd,U+5c04,U+5c0a,U+5c4b,U+5ce1,U+5cf0,U+5e10,U+5e8a,U+5e9f,U+5ec9,U+5f31,U+5f84,U+5fd8-5fd9,U+5fe0,U+6015,U+6062,U+6069,U+6076,U+6089,U+60a3,U+60ca,U+620f,U+624e,U+6263,U+6298,U+62a2,U+62bd,U+6311,U+6350,U+6389,U+638c,U+63f4,U+6446,U+644a,U+6469,U+64cd,U+654f,U+6562,U+656c,U+65d7,U+65e6,U+65fa,U+660c,U+6653,U+66b4,U+670b,U+672b,U+676f-6770,U+6881,U+6885,U+68a6,U+68cb,U+68ee,U+6b8a,U+6c88-6c89,U+6cc9,U+6ce5,U+6d01,U+6d17,U+6d1b,U+6d59,U+6d6a,U+6da8,U+6df7,U+6e10,U+6e20-6e21,U+6f5c,U+706f,U+70bc,U+719f,U+7267,U+732a,U+73cd,U+7518,U+756a,U+7586,U+7591,U+75db,U+76c8,U+76d0,U+76d6,U+76d8,U+76df,U+76fe,U+77db,U+7801,U+786c,U+795d,U+7965,U+79cb,U+7a77,U+7a7f,U+7aef,U+7b11,U+7bb1,U+7bc7,U+7ea0,U+7eaf,U+7ed5,U+7edc,U+7f13,U+7f29,U+7f34,U+7f8a,U+7ffb,U+8015,U+8058,U+805a,U+8083,U+80af,U+80c6,U+80cc,U+811a,U+8150,U+82e5,U+8336,U+8352,U+83ab,U+8428,U+8463,U+852c,U+8861,U+89c8,U+8bcd,U+8bd7,U+8bda,U+8be2,U+8bef,U+8bf8,U+8c0b,U+8c13,U+8d34,U+8d3a,U+8d74,U+8d76,U+8da3,U+8dd1,U+8ddd,U+8ddf,U+8df3,U+8f68,U+8f6f,U+8f7d,U+8f91,U+8f9b,U+8fbd,U+8fc8,U+8fd4,U+8feb,U+8ff9,U+900f,U+9057,U+907f-9080,U+90d1,U+90ed,U+91ce,U+9519,U+9526,U+95ed,U+9614,U+9635,U+9644,U+9686,U+96c5,U+96ea,U+9707,U+9732,U+9759,U+978b,U+9876,U+9881,U+9910,U+996e,U+9970,U+9c81,U+9e21,U+9ebb,U+9f84",
		},
	},
	{
		uri: g6,
		descriptors: {
			unicodeRange:
				"U+4e3d,U+4e4e,U+4e71,U+4e8f,U+4ed8,U+4eea,U+4f0a,U+4f0d,U+4f11,U+4f1f,U+4f24,U+4f3c,U+4f73,U+4fc4,U+500d,U+5012,U+501f,U+503a,U+505c,U+507f,U+50a8,U+514d,U+5178,U+517c,U+51b2,U+51b7,U+520a,U+5238,U+523b,U+52b1,U+535a,U+5371,U+5385,U+53eb-53ec,U+53f3,U+53f6,U+5409,U+542b,U+542f,U+5434,U+5462,U+5473,U+547c,U+54c8,U+54ea,U+56fa,U+5733,U+5757,U+5766,U+5802,U+585e,U+590f,U+591c,U+591f,U+5947,U+594b,U+5987,U+5a01,U+5b59,U+5b63,U+5b88,U+5b97,U+5b9c,U+5bbe,U+5bfb,U+5c01,U+5c1a,U+5c24,U+5c3c,U+5c97,U+5c9b,U+5cb8,U+5de6,U+5e01,U+5e2e,U+5e45,U+5e55,U+5e84,U+5ef6,U+5f02,U+5f52,U+5f69,U+5f7b,U+5f90,U+5fae,U+6000,U+600e,U+6025,U+60e0,U+6276,U+6297,U+62b5,U+62cd,U+62d3,U+62e5,U+62e9,U+62ff,U+6302,U+632f,U+63e1,U+6444,U+64ad,U+653b,U+6551,U+6563,U+65a4,U+65e7,U+6620,U+667a,U+66f2,U+671d,U+6731,U+6742,U+675f,U+6768,U+677e-677f,U+6790,U+67b6,U+67d3,U+6863,U+68b0,U+68c9,U+690d,U+6b8b,U+6bcd,U+6bd2,U+6bd5,U+6c38,U+6c61,U+6cbf,U+6cdb,U+6cf0,U+6d2a,U+6d89,U+6da6,U+6f6e,U+6fb3,U+7075,U+707e,U+70df,U+7164,U+7236,U+725b,U+7389,U+73e0,U+745e,U+74e6,U+751a,U+7537,U+75be,U+76ae,U+76db,U+793c,U+7956,U+7981,U+79d8,U+79df,U+79fb,U+7adf,U+7ae5,U+7b14,U+7b26,U+7b54,U+7b79,U+7d2f,U+7eb8,U+7eba,U+7ec6,U+7ee9,U+7eff,U+7f5a,U+7f6a,U+7f72,U+8089,U+80a5,U+80e1,U+8111,U+8131,U+821e,U+822c,U+8270,U+8499,U+8651,U+867d,U+8840,U+8857,U+8863,U+88c1,U+89c9,U+89d2,U+8a89,U+8bed,U+8bfe,U+8c01,U+8c22,U+8d21,U+8d25,U+8d2f,U+8d5e,U+8d75,U+8d8b,U+8dc3,U+8de8,U+8df5,U+8f6e,U+8f86,U+8f89,U+8fc5,U+8ff0,U+8ffd,U+9014,U+904d,U+90ae,U+9274,U+949f,U+952e,U+969c,U+96c4,U+96e8,U+96f6-96f7,U+97e9,U+987f,U+996d,U+9a7b,U+9aa8,U+9c7c,U+9c9c,U+9e4f,U+9f13,U+9f50",
		},
	},
	{
		uri: E6,
		descriptors: {
			unicodeRange:
				"U+4e13,U+4e16,U+4e1c,U+4e24,U+4e3e,U+4e49,U+4e61,U+4e66,U+4e89,U+4e8c,U+4e94,U+4e9b,U+4ea4,U+4eac,U+4ebf,U+4eca,U+4ef6-4ef7,U+4efb,U+4f18,U+4f20,U+4f46,U+4f7f,U+4fe1,U+503c,U+505a,U+5146,U+5148,U+515a,U+5171,U+5177,U+519b,U+51b3,U+51c6,U+51e0,U+5212,U+521b,U+522b,U+529e,U+52bf,U+534e-534f,U+5355,U+5357,U+5382,U+539f,U+53bb,U+53bf,U+53c2,U+53c8,U+53ca,U+53d6-53d8,U+53e3,U+53ea,U+53f0,U+540d,U+5411,U+56db,U+56de,U+56e0,U+56e2,U+578b,U+57ce,U+57fa,U+589e,U+5904,U+5934,U+5982,U+5b89,U+5b8c,U+5bfc,U+5c06,U+5c11,U+5c40,U+5c71,U+5e38,U+5e72,U+5e76,U+5e7f,U+5e94,U+5e9c,U+5f0f,U+5f15,U+5f20,U+5f3a,U+5f62,U+5f88,U+5fc5,U+5fd7,U+5feb,U+601d,U+6027,U+60c5,U+60f3,U+610f,U+6216,U+6218,U+624b,U+624d,U+6279,U+628a,U+6295,U+6301,U+6307,U+636e,U+63a5,U+63a8,U+652f,U+6536,U+653e,U+6548,U+6559,U+6570,U+65bd,U+65e0,U+6602,U+660e,U+6613,U+66f4,U+6700,U+670d,U+671f,U+672f,U+6743,U+674e,U+6751,U+6761,U+6784,U+6797,U+679c,U+67e5,U+6807,U+6837,U+683c,U+6b21,U+6b63-6b65,U+6bcf,U+6bd4,U+6c42,U+6c5f,U+6ca1,U+6cbb,U+6d3b,U+6d41,U+6d88,U+6df1,U+70b9,U+7136,U+7269,U+7279,U+7531,U+754c,U+767e,U+76ca,U+76f8,U+770b,U+7740,U+7814,U+79ef,U+7a0b,U+7a0e,U+7a76,U+7b80,U+7cbe,U+7cfb,U+7e41,U+7ea7,U+7ec4,U+7ec7,U+7ed3,U+7ed9,U+7edf,U+7f8e,U+8001,U+804c,U+8054,U+80b2,U+81f3,U+8425,U+8868,U+88ab,U+897f,U+89c1-89c2,U+89c4,U+89c6,U+89e3,U+8ba1,U+8ba4,U+8bae,U+8bb0,U+8bba,U+8bc1,U+8c03,U+8d28,U+8d39,U+8def,U+8f66,U+8f6c,U+8fd0-8fd1,U+9020,U+9053,U+90a3,U+90fd,U+91cc,U+9500,U+9547,U+95e8,U+95f4,U+961f,U+9645,U+9662,U+96be,U+96c6,U+9700,U+9769,U+97e6,U+9875,U+9879,U+9886,U+9898,U+98ce,U+9996,U+2b5af,U+2cc56,U+2e9f5,U+30edd-30ede",
		},
	},
	{
		uri: x6,
		descriptors: {
			unicodeRange:
				"U+4e03,U+4e30,U+4e34,U+4e45,U+4e60,U+4e70,U+4e88,U+4e91-4e92,U+4ea9,U+4eb2,U+4ec0,U+4ecb,U+4ecd,U+4ee4,U+4fee,U+5019,U+5047,U+50cf,U+5145,U+516d,U+5170,U+5175,U+5199,U+51cf,U+51fb,U+521a,U+5224,U+5267,U+52aa,U+5347-5348,U+534a,U+5356,U+5361,U+536b,U+5370,U+538b,U+53e4,U+53e6,U+5403,U+5426,U+5428,U+542c,U+5438,U+5668,U+56ed,U+56f4,U+56fe,U+57df,U+592a,U+5957,U+5b69,U+5b81,U+5b8f,U+5b98,U+5b9d,U+5ba1,U+5ba4,U+5bb3,U+5bc6,U+5bdf,U+5c3d,U+5c5e,U+5c81,U+5ddd,U+5de8,U+5dee,U+5e0c,U+5e86,U+5e8f,U+5e93,U+5e95,U+5e97,U+5ea7,U+5ead,U+5eb7,U+5f55,U+5f81,U+5f85,U+5ff5,U+6001,U+613f,U+6258,U+6267,U+6269,U+626c,U+627e,U+62db,U+62ec,U+6325,U+635f,U+6362,U+6388,U+6392,U+63a2,U+63a7,U+63aa,U+641e,U+6545,U+6597,U+65e2,U+65e9,U+661f,U+665a,U+666e-666f,U+66fe,U+6728,U+67d0,U+6811,U+6838,U+6865,U+697c,U+6b22,U+6b27,U+6b4c,U+6b62,U+6b66,U+6b7b,U+6bdb,U+6c47,U+6c49,U+6c7d,U+6c99,U+6cfd,U+6d0b,U+6d25,U+6d32,U+6d3e,U+6d4b,U+6e29,U+6e56,U+6e7e,U+6f14,U+6fc0,U+706b,U+70c8,U+7247,U+72af,U+72b6,U+72ec,U+732e,U+73ed,U+7403,U+7533,U+753b,U+7559,U+7565,U+7597,U+767b,U+773c,U+7763,U+77ed,U+77ff,U+7968,U+798f,U+79bb,U+79c0-79c1,U+7ad9,U+7ae0,U+7b51,U+7b7e,U+7cae,U+7d22,U+7ea2,U+7eb3,U+7eb7,U+7ec3,U+7ec8,U+7ecd,U+7edd,U+7efc,U+7f16,U+7f3a,U+7f51,U+7f57,U+7f6e,U+80dc,U+822a,U+8239,U+826f,U+82cf,U+82e6,U+8349,U+8363,U+83dc,U+8457,U+85cf,U+878d,U+8865,U+8a00,U+8b66,U+8ba2,U+8ba8,U+8bad,U+8bb2,U+8bc9,U+8bd5,U+8bfb,U+8d2b,U+8d35,U+8d37,U+8f7b,U+8f93,U+8fce,U+8fdd,U+9000-9002,U+9010,U+9047,U+9093,U+9152,U+9488,U+94a2,U+9633,U+9636,U+963f,U+9646,U+9648,U+964d,U+9664,U+9669,U+9760,U+97f3,U+987a,U+987e,U+9884,U+98de,U+9986,U+9ed1",
		},
	},
	{
		uri: y6,
		descriptors: {
			unicodeRange:
				"U+4e14,U+4e25,U+4e48,U+4e50,U+4e5d,U+4e9a,U+4ec5,U+4efd,U+4f17,U+4f4e-4f4f,U+4f55,U+4f59,U+4f60,U+4f8b,U+4f9b,U+4f9d,U+4fbf,U+4fc3,U+5065,U+513f,U+5149,U+514b,U+516b,U+5174,U+517b,U+518d,U+51b5,U+5207,U+5217-5219,U+521d,U+526f,U+529f,U+52a9,U+52b3,U+5305,U+533b,U+5343,U+5360,U+5373-5374,U+5386,U+53cb-53cd,U+53f2,U+53f7,U+544a,U+5468,U+547d,U+54cd,U+552e,U+5584,U+56f0,U+571f,U+5747,U+575a,U+57f9,U+5883,U+58eb,U+58f0,U+5907,U+590d,U+592e,U+5931,U+5956,U+5965,U+5973,U+5979,U+59cb,U+5b57-5b58,U+5b83,U+5ba2-5ba3,U+5bb9,U+5bcc,U+5c42,U+5c45,U+5c4a,U+5dde,U+5df1,U+5df4,U+5e03,U+5e08,U+5e26,U+5e2d,U+5f71,U+5f80,U+5f8b,U+5fb7,U+606f,U+611f,U+6237,U+623f,U+6253,U+627f,U+6293,U+62a4,U+62c5,U+62c9,U+6309,U+6574,U+6599,U+65ad,U+65af,U+65c5,U+65cf,U+6625,U+663e,U+671b,U+672a,U+6750,U+6781,U+6821,U+6839,U+6848,U+68c0,U+6a21,U+6b3e,U+6bb5,U+6c14,U+6cb3,U+6cb9,U+6ce8,U+6e05,U+6e2f,U+6e38,U+6e90,U+6ee1,U+70ed,U+7167,U+7231,U+7248,U+724c,U+7387,U+738b,U+73af,U+7530,U+75c5,U+767d,U+76d1,U+76f4,U+771f,U+77e5,U+77f3,U+7834,U+7840,U+786e,U+793a,U+795e,U+79f0,U+7a33,U+7a7a,U+7a81,U+7ade,U+7b56,U+7b97,U+7c73,U+7c7b,U+7d20,U+7d27,U+7ea6,U+7eaa,U+7ebf,U+7ee7,U+7eed,U+7ef4,U+7fa4,U+8003,U+80a1,U+81f4,U+8272,U+827a,U+8282,U+82b1,U+82f1,U+8303,U+836f,U+83b7,U+843d,U+88c5,U+8ba9,U+8baf,U+8bb8,U+8bbf,U+8bc4,U+8bc6,U+8bdd,U+8be5,U+8bf7,U+8c08,U+8c61,U+8d1f,U+8d22-8d23,U+8d27,U+8d2d,U+8d38,U+8d5b,U+8d70,U+8d85,U+8d8a,U+8db3,U+8eab,U+8f83,U+8fb9,U+8fdc,U+8fde,U+9009,U+901f,U+914d,U+91c7,U+94b1,U+94c1,U+94f6,U+95fb,U+9632,U+9650,U+968f,U+9752,U+975e,U+987b,U+989d,U+98df,U+9999,U+9a6c,U+9a8c,U+9ec4,U+9feb-9fec",
		},
	},
	{
		uri: w6,
		descriptors: {
			unicodeRange:
				"U+98fb-990c,U+990e-990f,U+9911-992d,U+992f-9953,U+9956-9962,U+9964,U+9966,U+9973,U+9978-9979,U+997b,U+997e,U+9982-9983,U+9989,U+998c,U+998e,U+999a-99a4,U+99a6-99a7,U+99a9-99c8",
		},
	},
	{
		uri: I6,
		descriptors: {
			unicodeRange:
				"U+8e4c-8e50,U+8e53-8e58,U+8e5a-8e65,U+8e67-8e68,U+8e6a-8e6b,U+8e6e,U+8e71,U+8e73,U+8e75,U+8e77-8e7b,U+8e7d-8e7e,U+8e80,U+8e82-8e84,U+8e86,U+8e88-8e8e,U+8e91-8e93,U+8e95-8e9b,U+8e9d,U+8e9f-8eaa,U+8ead-8eae,U+8eb0-8eb1,U+8eb3-8eb9,U+8ebb-8ecd,U+8ecf-8f02",
		},
	},
	{
		uri: T6,
		descriptors: {
			unicodeRange:
				"U+2e3a,U+3001-3002,U+3008-3011,U+3014-3017,U+301d-301f,U+4dae,U+4e00,U+4e07,U+4e09-4e0b,U+4e0d-4e0e,U+4e1a,U+4e2a,U+4e2d,U+4e3a-4e3b,U+4e4b,U+4e5f,U+4e86,U+4e8b,U+4e8e,U+4ea7,U+4eba,U+4ece,U+4ed1,U+4ed6,U+4ee3,U+4ee5,U+4eec,U+4f01,U+4f1a,U+4f4d,U+4f53,U+4f5c,U+4fdd,U+5143,U+5165,U+5168,U+516c,U+5173,U+5176,U+5185,U+519c,U+51fa,U+5206,U+5229,U+5230,U+5236,U+524d,U+529b,U+52a0-52a1,U+52a8,U+5316-5317,U+533a,U+5341,U+5362,U+53d1,U+53ef,U+53f8,U+5404,U+5408,U+540c,U+540e,U+5458,U+548c,U+54c1,U+54e5,U+5546,U+559c,U+56fd,U+5728,U+5730,U+573a,U+5916,U+591a,U+5927,U+5929,U+592b,U+597d,U+59d4,U+5b50,U+5b66,U+5b9a,U+5b9e,U+5bb6,U+5bf9,U+5c0f,U+5c14,U+5c31,U+5c55,U+5de5,U+5df2,U+5e02,U+5e73-5e74,U+5ea6,U+5efa,U+5f00,U+5f53,U+5f97,U+5fc3,U+603b,U+6210-6211,U+6240,U+6280,U+62a5,U+63d0,U+6539,U+653f,U+6587,U+65b0,U+65b9,U+65e5,U+65f6,U+662f,U+6708-6709,U+672c,U+673a,U+675c,U+6765,U+6c11,U+6c34,U+6cd5,U+6ce2,U+6d4e,U+6d77,U+73b0,U+7406,U+751f,U+7528,U+7535,U+7684,U+76ee,U+793e,U+79cd,U+79d1,U+7acb,U+7b2c,U+7b49,U+7ba1,U+7ecf,U+8005,U+800c,U+80fd,U+81ea,U+884c,U+8981,U+8bbe,U+8bf4,U+8d44,U+8d77,U+8fbe,U+8fc7,U+8fd8-8fd9,U+8fdb,U+901a,U+90e8,U+91cd,U+91cf,U+91d1,U+9485,U+957f,U+95ee,U+9762,U+9ad8,U+9ea6,U+9f99,U+9fcf,U+9fd4,U+9fed,U+fe10-fe19,U+fe30-fe31,U+fe33-fe44,U+ff01,U+ff0c,U+ff1f,U+2b4e7,U+2b7f7,U+2b7fc,U+2cb2d,U+2cb3b,U+2cb4a,U+2cb5b,U+2cb73",
		},
	},
	{
		uri: R6,
		descriptors: {
			unicodeRange:
				"U+6490,U+6493-6494,U+6497-6498,U+649a-649d,U+649f-64a3,U+64a5-64a8,U+64aa-64ab,U+64af,U+64b1-64b4,U+64b6,U+64b9,U+64bb,U+64bd-64bf,U+64c1,U+64c3-64c4,U+64c6-64cc,U+64cf,U+64d1,U+64d3-64d6,U+64d9-64dd,U+64df-64e1,U+64e3,U+64e5,U+64e7-64ff,U+6501-6508,U+650a-6511,U+6513-6517,U+6519-6524,U+6526-652a,U+652c-652d,U+6530-6533,U+6537,U+653a,U+653c-653d,U+6540-6544,U+6546-6547,U+654a-654b,U+654d-654e,U+6550,U+6552-6554,U+6557-6558,U+655a,U+655c,U+655f-6561,U+6564-6565,U+6567-6568",
		},
	},
	{
		uri: v6,
		descriptors: {
			unicodeRange:
				"U+9695-9696,U+969a-969b,U+969d-96a6,U+96a8-96af,U+96b1-96b2,U+96b4-96b5,U+96b7-96b8,U+96ba-96bb,U+96bf,U+96c2-96c3,U+96c8,U+96ca-96cb,U+96d0-96d1,U+96d3-96d4,U+96d6-96df,U+96e1-96e7,U+96eb-96ee,U+96f0-96f2,U+96f4-96f5,U+96f8,U+96fa-96fd,U+96ff,U+9702-9703,U+9705,U+970a-970c,U+9710-9712,U+9714-9715,U+9717-971b,U+971d,U+971f-9729,U+972b-972c,U+972e-972f,U+9731,U+9733-9737,U+973a-973d,U+973f-9751,U+9754-9755,U+9757-9758,U+975a,U+975c-975d,U+975f,U+9763-9764,U+9766-9768,U+976a-9770",
		},
	},
	{
		uri: M6,
		descriptors: {
			unicodeRange:
				"U+6af0-6b1f,U+6b25-6b26,U+6b28-6b31,U+6b33-6b36,U+6b38,U+6b3b-6b3d,U+6b3f-6b42,U+6b44-6b45,U+6b48,U+6b4a-6b4b,U+6b4d-6b58,U+6b5a-6b61,U+6b68-6b69,U+6b6b-6b78,U+6b7a,U+6b7d-6b80,U+6b85,U+6b88,U+6b8c,U+6b8e-6b91,U+6b94-6b95,U+6b97-6b99,U+6b9c-6ba0,U+6ba2-6ba9,U+6bab-6bb2,U+6bb6,U+6bb8-6bba",
		},
	},
	{
		uri: _6,
		descriptors: {
			unicodeRange:
				"U+430e-439a,U+29e8a,U+29ec4,U+29edb,U+29ee9,U+29f7e,U+29f83,U+29f8c,U+29fce,U+2a01a,U+2a02f,U+2a082,U+2a0f9,U+2a190,U+2a38c",
		},
	},
	{
		uri: L6,
		descriptors: { unicodeRange: "U+92ef-933d,U+933f-9369,U+936b-9388" },
	},
	{
		uri: D6,
		descriptors: {
			unicodeRange:
				"U+4512-458d,U+2b300,U+2b363,U+2b36f,U+2b372,U+2b37d,U+2b404,U+2b410,U+2b413,U+2b461,U+2b4ef,U+2b4f6,U+2b4f9,U+2b50d-2b50e,U+2b536,U+2b5ae,U+2b5b3,U+2b5e7,U+2b5f4,U+2b61c-2b61d,U+2b626-2b628,U+2b62a,U+2b62c,U+2b695-2b696,U+2b6ad,U+2b6ed",
		},
	},
	{
		uri: S6,
		descriptors: {
			unicodeRange:
				"U+88bd-88c0,U+88c3-88c4,U+88c7-88c8,U+88ca-88cd,U+88cf-88d1,U+88d3,U+88d6-88d7,U+88da-88de,U+88e0-88e1,U+88e6-88e7,U+88e9-88ef,U+88f2,U+88f5-88f7,U+88fa-88fb,U+88fd,U+88ff-8901,U+8903-8909,U+890b-890f,U+8911,U+8914-8918,U+891c-8920,U+8922-8924,U+8926-8929,U+892c-892f,U+8931-8933,U+8935,U+8937-8940,U+8942-8943,U+8945-895d,U+8960-8965,U+8967-897a,U+897c-897e,U+8980,U+8982,U+8984-8985",
		},
	},
	{ uri: $6, descriptors: { unicodeRange: "U+4b0b-4ba0" } },
	{
		uri: N6,
		descriptors: {
			unicodeRange:
				"U+7179,U+717b-717c,U+717e-7183,U+7185-7189,U+718b-718e,U+7190-7193,U+7195-7197,U+719a-719e,U+71a1-71a7,U+71a9-71ab,U+71ad-71b2,U+71b4,U+71b6-71b8,U+71ba-71c2,U+71c4-71cd,U+71cf-71d3,U+71d6-71df,U+71e1-71e4,U+71e6,U+71e8-71ed,U+71ef-71f8,U+71fa-7205,U+7207-721c,U+721e-7227,U+7229,U+722b,U+722d",
		},
	},
	{
		uri: P6,
		descriptors: {
			unicodeRange:
				"U+982e-9874,U+988b,U+988e,U+9892,U+9895,U+9899,U+98a3,U+98a8-98cd,U+98cf-98d0,U+98d4,U+98d6-98d7,U+98db-98dd,U+98e0-98e6,U+98e9-98fa",
		},
	},
	{
		uri: F6,
		descriptors: {
			unicodeRange:
				"U+7c14-7c15,U+7c17-7c1e,U+7c20-7c25,U+7c28-7c29,U+7c2b-7c37,U+7c39-7c3e,U+7c42-7c4c,U+7c4e-7c72,U+7c75-7c7a,U+7c7e-7c88,U+7c8a-7c90,U+7c93-7c94,U+7c96,U+7c99-7c9b,U+7ca0-7ca1,U+7ca3,U+7ca6-7ca9,U+7cab-7cad,U+7caf-7cb0,U+7cb4-7cb8,U+7cba-7cbb,U+7cbf-7cc0,U+7cc2-7cc4,U+7cc6,U+7cc9,U+7ccb,U+7cce-7cd4",
		},
	},
	{
		uri: O6,
		descriptors: { unicodeRange: "U+7d95-7da5,U+7da7-7dad,U+7daf-7e2a" },
	},
	{ uri: A6, descriptors: { unicodeRange: "U+4a78-4b0a" } },
	{
		uri: B6,
		descriptors: {
			unicodeRange:
				"U+9b30-9b31,U+9b33-9b3a,U+9b3d-9b40,U+9b46,U+9b4a-9b4c,U+9b4e,U+9b50,U+9b52-9b53,U+9b55-9bcf",
		},
	},
	{
		uri: C6,
		descriptors: {
			unicodeRange:
				"U+6a4b-6a4f,U+6a51-6a57,U+6a5a,U+6a5c-6a60,U+6a62-6a64,U+6a66-6a70,U+6a72-6a78,U+6a7a-6a7b,U+6a7d-6a7f,U+6a81-6a83,U+6a85-6a8d,U+6a8f,U+6a92-6a96,U+6a98-6a9f,U+6aa1-6aa8,U+6aaa,U+6aad-6aef",
		},
	},
	{ uri: K6, descriptors: { unicodeRange: "U+99c9-9a53" } },
	{
		uri: H6,
		descriptors: {
			unicodeRange:
				"U+8550-8555,U+8557-8558,U+855a-855d,U+855f-8563,U+8565-8567,U+8569-8571,U+8573,U+8575-8578,U+857c-857d,U+857f-8583,U+8586,U+8588-858e,U+8590-859a,U+859d-85a3,U+85a5-85a7,U+85a9,U+85ab-85ad,U+85b1-85b6,U+85b8,U+85ba-85c0,U+85c2-85c8,U+85ca-85ce,U+85d1-85d2,U+85d4,U+85d6-85db,U+85dd-85e3,U+85e5-85e8,U+85ea-85fa,U+85fc-85fe,U+8600-8603",
		},
	},
	{
		uri: J6,
		descriptors: {
			unicodeRange:
				"U+6fb2,U+6fb4-6fb5,U+6fb7-6fb8,U+6fba-6fbf,U+6fc1,U+6fc3-6fc8,U+6fca-6fd0,U+6fd3-6fdd,U+6fdf,U+6fe2-6fed,U+6ff0-7010,U+7012-7019,U+701c-7022,U+7024-7034,U+7036-7038,U+703a-704b,U+704d-704e,U+7050-7053",
		},
	},
	{ uri: k6, descriptors: { unicodeRange: "U+4ba1-4c2c" } },
	{
		uri: Y6,
		descriptors: {
			unicodeRange:
				"U+9a54-9a6b,U+9a72,U+9a83,U+9a89,U+9a8d-9a8e,U+9a94-9a95,U+9a99,U+9aa6,U+9aa9-9aaf,U+9ab2-9ab5,U+9ab9,U+9abb,U+9abd-9abf,U+9ac3-9ac4,U+9ac6-9aca,U+9acd-9ad0,U+9ad2,U+9ad4-9ad7,U+9ad9-9ade,U+9ae0,U+9ae2-9ae5,U+9ae7-9aea,U+9aec,U+9aee,U+9af0-9af8,U+9afa,U+9afc-9b02,U+9b04-9b07,U+9b09-9b0e,U+9b10-9b12,U+9b14-9b1e,U+9b20-9b22,U+9b24-9b2e",
		},
	},
	{ uri: V6, descriptors: { unicodeRange: "U+9d1a-9da1" } },
	{
		uri: q6,
		descriptors: {
			unicodeRange:
				"U+9e13-9e1e,U+9e24,U+9e27,U+9e2e,U+9e30,U+9e34,U+9e3b-9e3c,U+9e40,U+9e4d,U+9e50,U+9e52-9e54,U+9e56,U+9e59,U+9e5d,U+9e5f-9e62,U+9e65,U+9e6e-9e6f,U+9e72,U+9e74-9e7d,U+9e80-9e81,U+9e83-9e86,U+9e89-9e8a,U+9e8c-9e91,U+9e94-9e9c,U+9e9e,U+9ea0-9ea5,U+9ea7-9eb3,U+9eb5-9eb7,U+9eb9-9eba,U+9ebc,U+9ebf-9ec3,U+9ec5-9ec8,U+9eca-9ecc,U+9ed0,U+9ed2-9ed3,U+9ed5-9ed7,U+9ed9-9eda,U+9ede,U+9ee1,U+9ee3-9ee4,U+9ee6,U+9ee8,U+9eeb-9eee,U+9ef0-9ef8",
		},
	},
	{
		uri: G6,
		descriptors: {
			unicodeRange:
				"U+8b1c-8b25,U+8b27-8b65,U+8b67-8b6b,U+8b6d-8b9f,U+8bac,U+8bb1,U+8bbb,U+8bc7,U+8bd0",
		},
	},
	{ uri: X6, descriptors: { unicodeRange: "U+4cad-4d2f" } },
	{
		uri: Z6,
		descriptors: {
			unicodeRange:
				"U+9c4b-9c7b,U+9c7d-9c7e,U+9c80,U+9c83-9c84,U+9c89-9c8a,U+9c8c,U+9c8f,U+9c93,U+9c96-9c99,U+9c9d,U+9caa,U+9cac,U+9caf,U+9cb9,U+9cbe-9cc2,U+9cc8-9cc9,U+9cd1-9cd2,U+9cda-9cdb,U+9ce0-9ce1,U+9ce3-9d19",
		},
	},
	{
		uri: W6,
		descriptors: {
			unicodeRange: "U+9389-938e,U+9390-93c9,U+93cb-93d5,U+93d7-9410",
		},
	},
	{
		uri: z6,
		descriptors: {
			unicodeRange:
				"U+20a0-20b5,U+20b9-20ba,U+20bc-20bd,U+4e2c,U+5107,U+5216,U+5293,U+54f3,U+5523,U+5819,U+5adc,U+5c88,U+5e3b,U+5fee,U+62f6,U+63be,U+6484,U+6499,U+67d9,U+67dd,U+6d5e,U+6f46,U+717a,U+71e0,U+72c1,U+73e7,U+75b0,U+7603,U+7722,U+7809,U+7811,U+7946,U+7967,U+799a,U+7b45,U+7ba2,U+8014,U+80d9,U+8159,U+817d,U+81a3,U+81aa,U+8201,U+833c,U+836e,U+83e5,U+8459,U+84f0,U+8729,U+8753,U+87d3,U+89dc,U+8bf6,U+8c2e,U+8e2c,U+8e9c,U+8e9e,U+8ece,U+8fee,U+9139,U+914f,U+9174,U+9191,U+960c,U+9622,U+9a98,U+9b48,U+9ca6,U+9cb0,U+9da2-9e12,U+9e88,U+9f44,U+9f86",
		},
	},
	{ uri: Q6, descriptors: { unicodeRange: "U+9bd0-9c4a" } },
	{ uri: j6, descriptors: { unicodeRange: "U+4c2d-4cac" } },
	{ uri: e8, descriptors: { unicodeRange: "U+4d30-4dab" } },
	{
		uri: t8,
		descriptors: { unicodeRange: "U+9411-943d,U+943f-946a,U+946c-9484" },
	},
	{
		uri: n8,
		descriptors: {
			unicodeRange:
				"U+9efa,U+9efd,U+9eff-9f0a,U+9f0c,U+9f0f,U+9f11-9f12,U+9f14-9f16,U+9f18,U+9f1a-9f1f,U+9f21,U+9f23-9f2b,U+9f2d-9f2e,U+9f30-9f36,U+9f38,U+9f3a,U+9f3c,U+9f3f-9f43,U+9f45-9f4f,U+9f52-9f7e,U+9f81-9f82,U+9f8d-9f94",
		},
	},
	{
		uri: r8,
		descriptors: {
			unicodeRange:
				"U+7e2b-7e3a,U+7e3c-7e40,U+7e42-7e46,U+7e48-7e81,U+7e83-7e9a,U+7e9c-7e9e,U+7eae,U+7eb4,U+7ebb-7ebc,U+7ed6,U+7ee4,U+7eec,U+7ef9,U+7f0a,U+7f10,U+7f1e,U+7f37,U+7f39,U+7f3b",
		},
	},
];
var $r = class e {
		static loadedFontsCache = new Set();
		static _registered;
		static _initialized = !1;
		static get registered() {
			return (
				e._registered
					? e._initialized ||
						(e._registered = new Map([
							...e.init().entries(),
							...e._registered.entries(),
						]))
					: (e._registered = e.init()),
				e._registered
			);
		}
		get registered() {
			return e.registered;
		}
		scene;
		constructor(t) {
			this.scene = t;
		}
		getSceneFamilies = () =>
			e.getUniqueFamilies(this.scene.getNonDeletedElements());
		onLoaded = (t) => {
			let n = !0;
			for (let a of t) {
				let i = `${a.family}-${a.style}-${a.weight}-${a.unicodeRange}`;
				e.loadedFontsCache.has(i) || (e.loadedFontsCache.add(i), (n = !1));
			}
			if (n) return;
			let r = !1,
				o = this.scene.getNonDeletedElementsMap();
			for (let a of this.scene.getNonDeletedElements())
				if (X(a)) {
					(r = !0), me.delete(a), Lr.clearCache(pe(a));
					let i = Oe(a, o);
					i && me.delete(i);
				}
			r && this.scene.triggerUpdate();
		};
		loadSceneFonts = async () => {
			let t = this.getSceneFamilies(),
				n = li
					? e.getCharsPerFamily(this.scene.getNonDeletedElements())
					: void 0;
			return e.loadFontFaces(t, n);
		};
		static loadElementsFonts = async (t) => {
			let n = e.getUniqueFamilies(t),
				r = li ? e.getCharsPerFamily(t) : void 0;
			return e.loadFontFaces(n, r);
		};
		static loadAllFonts = async () => {
			let t = e.getAllFamilies();
			return e.loadFontFaces(t);
		};
		static async generateFontFaceDeclarations(t) {
			let n = e.getUniqueFamilies(t),
				r = e.getCharsPerFamily(t),
				o = n.find((c) => Ui(c).includes(xr));
			if (o) {
				let c = e.getCharacters(r, o);
				if (V1(c)) {
					let l = Yn[xr];
					(r[l] = new Set(c)), n.unshift(Yn[xr]);
				}
			}
			let a = e.fontFacesStylesGenerator(n, r),
				i = 3,
				s = await new ea(a, i).all();
			return Array.from(new Set(s));
		}
		static async loadFontFaces(t, n) {
			for (let { fontFaces: i, metadata: s } of e.registered.values())
				if (!s.local)
					for (let { fontFace: c } of i)
						window.document.fonts.has(c) || window.document.fonts.add(c);
			let r = e.fontFacesLoader(t, n),
				o = 10;
			return (await new ea(r, o).all()).flat().filter(Boolean);
		}
		static *fontFacesLoader(t, n) {
			for (let [r, o] of t.entries()) {
				let a = pe({ fontFamily: o, fontSize: 16 }),
					i = li && n ? e.getCharacters(n, o) : "";
				window.document.fonts.check(a, i) ||
					(yield Xn(async () => {
						try {
							let s = await window.document.fonts.load(a, i);
							return [r, s];
						} catch (s) {
							console.error(
								`Failed to load font "${a}" from urls "${e.registered.get(o)?.fontFaces.map((c) => c.urls)}"`,
								s,
							);
						}
					}));
			}
		}
		static *fontFacesStylesGenerator(t, n) {
			for (let [r, o] of t.entries()) {
				let { fontFaces: a, metadata: i } = e.registered.get(o) ?? {};
				if (!Array.isArray(a)) {
					console.error(
						`Couldn't find registered fonts for font-family "${o}"`,
						e.registered,
					);
					continue;
				}
				if (!i?.local)
					for (let [s, c] of a.entries())
						yield Xn(async () => {
							try {
								let l = e.getCharacters(n, o),
									d = await c.toCSS(l);
								return d ? [r * 1e4 + s, d] : void 0;
							} catch (l) {
								console.error(
									`Couldn't transform font-face to css for family "${c.fontFace.family}"`,
									l,
								);
							}
						});
			}
		}
		static register(t, n, ...r) {
			let o = he[t] ?? Yn[t] ?? t;
			return (
				this.registered.get(o) ||
					this.registered.set(o, {
						metadata: n,
						fontFaces: r.map(({ uri: i, descriptors: s }) => new Wi(t, i, s)),
					}),
				this.registered
			);
		}
		static init() {
			let t = { registered: new Map() },
				n = (r, ...o) => {
					let a = he[r] ?? Yn[r] ?? r,
						i = pa[a] ?? pa[he.Excalifont];
					e.register.call(t, r, i, ...o);
				};
			return (
				n("Cascadia", ...O2),
				n("Comic Shanns", ...H2),
				n("Excalifont", ...W2),
				n("Helvetica", ...z2),
				n("Liberation Sans", ...j2),
				n("Lilita One", ...nu),
				n("Nunito", ...cu),
				n("Virgil", ...du),
				n(xr, ...o8),
				n(kn, ...J2),
				(e._initialized = !0),
				t.registered
			);
		}
		static getUniqueFamilies(t) {
			return Array.from(
				t.reduce((n, r) => (X(r) && n.add(r.fontFamily), n), new Set()),
			);
		}
		static getCharsPerFamily(t) {
			let n = {};
			for (let r of t)
				if (X(r))
					for (let o of r.originalText)
						n[r.fontFamily] || (n[r.fontFamily] = new Set()),
							n[r.fontFamily].add(o);
			return n;
		}
		static getCharacters(t, n) {
			return t[n] ? Array.from(t[n]).join("") : "";
		}
		static getAllFamilies() {
			return Array.from(e.registered.keys());
		}
	},
	zi = (e, t, n) => {
		let {
				unitsPerEm: r,
				ascender: o,
				descender: a,
			} = $r.registered.get(e)?.metadata.metrics || pa[he.Virgil].metrics,
			i = t / r,
			s = (n - i * o + i * a) / 2;
		return i * o + s;
	},
	Qi = (e) => {
		let { lineHeight: t } =
			$r.registered.get(e)?.metadata.metrics || pa[he.Excalifont].metrics;
		return t;
	};
E();
E();
var ji = (e) => {
		let { angle: t, width: n, height: r, x: o, y: a } = e,
			i = o + n / 2,
			s = a + r / 2,
			c = b(i, s),
			l;
		return (
			e.type === "diamond"
				? (l = Kc(
						D(b(i, a), c, t),
						D(b(o + n, s), c, t),
						D(b(i, a + r), c, t),
						D(b(o, s), c, t),
					))
				: (l = Kc(
						D(b(o, a), c, t),
						D(b(o + n, a), c, t),
						D(b(o + n, a + r), c, t),
						D(b(o, a + r), c, t),
					)),
			{ type: "polygon", data: l }
		);
	},
	XJ = (e, t, n = 10) => {
		let [r, o, a, i, s, c] = H(e, t, !0);
		(r -= n), (a += n), (o -= n), (i += n);
		let l = b(s, c),
			d = D(b(r, o), l, e.angle),
			U = D(b(a, o), l, e.angle),
			u = D(b(r, i), l, e.angle),
			p = D(b(a, i), l, e.angle);
		return { type: "polygon", data: [d, U, p, u] };
	},
	a8 = (e) => {
		let { width: t, height: n, angle: r, x: o, y: a } = e;
		return {
			type: "ellipse",
			data: {
				center: b(o + t / 2, a + n / 2),
				angle: r,
				halfWidth: t / 2,
				halfHeight: n / 2,
			},
		};
	},
	es = (e) => {
		for (let t of e.sets) if (t.type === "path") return t.ops;
		return e.sets[0].ops;
	},
	i8 = (e, t = b(0, 0), n, r) => {
		let o = (c) => D(b(c[0] + t[0], c[1] + t[1]), r, n),
			a = es(e),
			i = [],
			s = b(0, 0);
		for (let c of a) {
			if (c.op === "move") {
				let l = Wo(c.data);
				ut(l != null, "Ops data is not a point"), (s = o(l));
			}
			if (c.op === "bcurveTo") {
				let l = o(b(c.data[0], c.data[1])),
					d = o(b(c.data[2], c.data[3])),
					U = o(b(c.data[4], c.data[5]));
				i.push(T1(s, l, d, U)), (s = U);
			}
		}
		return { type: "polycurve", data: i };
	},
	E4 = (e) => {
		let t = e[0],
			n = [];
		for (let r = 1; r < e.length; r++) {
			let o = e[r];
			n.push(re(t, o)), (t = o);
		}
		return n;
	},
	s8 = (e, t, n = !1) => {
		let r = (a) => D(Tt(ae(a), De(e.x, e.y)), t, e.angle),
			o = E4(e.points.map((a) => r(a)));
		return n
			? { type: "polygon", data: ro(o.flat()) }
			: { type: "polyline", data: o };
	},
	c8 = (e, t, n = b(0, 0), r, o) => {
		let a = (d) => D(b(d[0] + n[0], d[1] + n[1]), o, r);
		if (e.roundness === null)
			return { type: "polygon", data: ro(e.points.map((d) => a(d))) };
		let i = es(t),
			s = [],
			c = !1;
		for (let d of i)
			d.op === "move"
				? ((c = !c), c && s.push(b(d.data[0], d.data[1])))
				: d.op === "bcurveTo"
					? c &&
						(s.push(b(d.data[0], d.data[1])),
						s.push(b(d.data[2], d.data[3])),
						s.push(b(d.data[4], d.data[5])))
					: d.op === "lineTo" && c && s.push(b(d.data[0], d.data[1]));
		let l = io(s, 10, 5).map((d) => a(d));
		return { type: "polygon", data: ro(l) };
	},
	l8 = (e, t, n = 0) => {
		let r = [e.x - n, e.y - n, e.x + e.width + n, e.y + e.height + n],
			o = b((r[0] + r[2]) / 2, (r[1] + r[3]) / 2);
		return [
			re(D(b(r[0], r[1]), o, e.angle), D(b(r[2], r[1]), o, e.angle)),
			re(D(b(r[2], r[1]), o, e.angle), D(b(r[2], r[3]), o, e.angle)),
			re(D(b(r[2], r[3]), o, e.angle), D(b(r[0], r[3]), o, e.angle)),
			re(D(b(r[0], r[3]), o, e.angle), D(b(r[0], r[1]), o, e.angle)),
		]
			.map((a) => v1(t, a))
			.filter((a) => !!a);
	},
	x4 = (e, t) => {
		let { angle: n, halfWidth: r, halfHeight: o, center: a } = t,
			i = r,
			s = o,
			c = Tt(ae(e), Qe(ae(a), -1)),
			[l, d] = D(c, b(0, 0), -n),
			U = Math.abs(l),
			u = Math.abs(d),
			p = 0.707,
			m = 0.707;
		for (let x = 0; x < 3; x++) {
			let y = i * p,
				w = s * m,
				T = ((i * i - s * s) * p ** 3) / i,
				I = ((s * s - i * i) * m ** 3) / s,
				_ = y - T,
				L = w - I,
				M = U - T,
				N = u - I,
				$ = Math.hypot(L, _),
				S = Math.hypot(N, M);
			(p = Math.min(1, Math.max(0, ((M * $) / S + T) / i))),
				(m = Math.min(1, Math.max(0, ((N * $) / S + I) / s)));
			let P = Math.hypot(m, p);
			(p /= P), (m /= P);
		}
		let [h, g] = [i * p * Math.sign(l), s * m * Math.sign(d)];
		return Ne(b(l, d), b(h, g));
	},
	d8 = (e, t, n = 1e-4) => x4(e, t) <= n,
	U8 = (e, t) => {
		let { center: n, angle: r, halfWidth: o, halfHeight: a } = t,
			i = Tt(ae(e), Qe(ae(n), -1)),
			[s, c] = D(i, b(0, 0), -r);
		return (s / o) * (s / o) + (c / a) * (c / a) <= 1;
	};
E();
E();
var ha = (e, t, n = 0) => {
		switch (t.type) {
			case "polygon":
				return M1(e, t.data, n);
			case "ellipse":
				return d8(e, t.data, n);
			case "line":
				return qn(e, t.data, n);
			case "polyline":
				return u8(e, t.data, n);
			case "curve":
				return f8(e, t.data, n);
			case "polycurve":
				return y4(e, t.data, n);
			default:
				throw Error(`shape ${t} is not implemented`);
		}
	},
	ts = (e, t) => {
		switch (t.type) {
			case "polygon":
				return Hc(e, t.data);
			case "line":
				return !1;
			case "curve":
				return !1;
			case "ellipse":
				return U8(e, t.data);
			case "polyline": {
				let n = ro(t.data.flat());
				return Hc(e, n);
			}
			case "polycurve":
				return !1;
			default:
				throw Error(`shape ${t} is not implemented`);
		}
	};
var y4 = (e, t, n) => t.some((r) => f8(e, r, n)),
	w4 = (e) => {
		let [t, n, r, o] = e;
		return (a, i) =>
			Math.pow(1 - a, 3) * o[i] +
			3 * a * Math.pow(1 - a, 2) * r[i] +
			3 * Math.pow(a, 2) * (1 - a) * n[i] +
			t[i] * Math.pow(a, 3);
	},
	I4 = (e, t = 10) => {
		let n = w4(e),
			r = [n(0, 0), n(0, 1)],
			o = [],
			a = 0,
			i = 1 / t;
		for (let s = 0; s < t; s++)
			if (((a += i), a <= 1)) {
				let c = b(n(a, 0), n(a, 1));
				o.push(re(r, c)), (r = c);
			}
		return o;
	},
	f8 = (e, t, n) => u8(e, I4(t), n),
	u8 = (e, t, n = 1e-4) => t.some((r) => qn(e, r, n));
var ns = (e) => {
		if (e.type === "arrow") return !1;
		let t = !Gn(e.backgroundColor) || Zn(e) || vt(e) || X(e);
		return e.type === "line"
			? t && rn(e.points)
			: e.type === "freedraw"
				? t && rn(e.points)
				: t || Pe(e);
	},
	T4 = ({
		x: e,
		y: t,
		element: n,
		shape: r,
		threshold: o = 10,
		frameNameBound: a = null,
	}) => {
		let i = ns(n) ? ts(b(e, t), r) || ha(b(e, t), r, o) : ha(b(e, t), r, o);
		return (
			!i && a && (i = ts(b(e, t), { type: "polygon", data: ji(a).data })), i
		);
	},
	fl = (e, t, n, r, o = 0) => {
		let [a, i, s, c] = Ve(n, r);
		return (
			(a -= o), (i -= o), (s += o), (c += o), Ii(b(a, i), b(e, t), b(s, c))
		);
	},
	ck = (e, t) =>
		!T4(e) && !R4(e.x, e.y, p8(e.element, t)) && fl(e.x, e.y, e.element, t),
	R4 = (e, t, n) => !!n && ts(b(e, t), n);
E();
var m8 = {
		EQUAL: "Equal",
		MINUS: "Minus",
		NUM_ADD: "NumpadAdd",
		NUM_SUBTRACT: "NumpadSubtract",
		NUM_ZERO: "Numpad0",
		BRACKET_RIGHT: "BracketRight",
		BRACKET_LEFT: "BracketLeft",
		ONE: "Digit1",
		TWO: "Digit2",
		THREE: "Digit3",
		NINE: "Digit9",
		QUOTE: "Quote",
		ZERO: "Digit0",
		SLASH: "Slash",
		C: "KeyC",
		D: "KeyD",
		H: "KeyH",
		V: "KeyV",
		Z: "KeyZ",
		Y: "KeyY",
		R: "KeyR",
		S: "KeyS",
	},
	z = {
		ARROW_DOWN: "ArrowDown",
		ARROW_LEFT: "ArrowLeft",
		ARROW_RIGHT: "ArrowRight",
		ARROW_UP: "ArrowUp",
		PAGE_UP: "PageUp",
		PAGE_DOWN: "PageDown",
		BACKSPACE: "Backspace",
		ALT: "Alt",
		CTRL_OR_CMD: ci ? "metaKey" : "ctrlKey",
		DELETE: "Delete",
		ENTER: "Enter",
		ESCAPE: "Escape",
		QUESTION_MARK: "?",
		SPACE: " ",
		TAB: "Tab",
		CHEVRON_LEFT: "<",
		CHEVRON_RIGHT: ">",
		PERIOD: ".",
		COMMA: ",",
		SUBTRACT: "-",
		SLASH: "/",
		A: "a",
		C: "c",
		D: "d",
		E: "e",
		F: "f",
		G: "g",
		H: "h",
		I: "i",
		L: "l",
		O: "o",
		P: "p",
		Q: "q",
		R: "r",
		S: "s",
		T: "t",
		V: "v",
		X: "x",
		Y: "y",
		Z: "z",
		K: "k",
		W: "w",
		0: "0",
		1: "1",
		2: "2",
		3: "3",
		4: "4",
		5: "5",
		6: "6",
		7: "7",
		8: "8",
		9: "9",
	},
	v4 = new Map([
		[z.Z, m8.Z],
		[z.Y, m8.Y],
	]),
	M4 = (e) => /^[a-z]$/.test(e.toLowerCase()),
	fk = (e, t) => {
		if (t === e.key.toLowerCase()) return !0;
		let n = v4.get(t);
		return !!(n && !M4(e.key) && e.code === n);
	},
	uk = (e) =>
		e === z.ARROW_LEFT ||
		e === z.ARROW_RIGHT ||
		e === z.ARROW_DOWN ||
		e === z.ARROW_UP,
	pk = (e) => e.altKey,
	mk = (e) => e.shiftKey,
	ul = (e) => e.shiftKey;
var _4 = [
		{ icon: y2, value: "selection", key: z.V, numericKey: z[1], fillable: !0 },
		{ icon: w2, value: "rectangle", key: z.R, numericKey: z[2], fillable: !0 },
		{ icon: I2, value: "diamond", key: z.D, numericKey: z[3], fillable: !0 },
		{ icon: T2, value: "ellipse", key: z.O, numericKey: z[4], fillable: !0 },
		{ icon: R2, value: "arrow", key: z.A, numericKey: z[5], fillable: !0 },
		{ icon: v2, value: "line", key: z.L, numericKey: z[6], fillable: !0 },
		{
			icon: ua,
			value: "freedraw",
			key: [z.P, z.X],
			numericKey: z[7],
			fillable: !1,
		},
		{ icon: M2, value: "text", key: z.T, numericKey: z[8], fillable: !1 },
		{ icon: _2, value: "image", key: null, numericKey: z[9], fillable: !1 },
		{ icon: L2, value: "eraser", key: z.E, numericKey: z[0], fillable: !1 },
	],
	Lk = (e) =>
		_4.find(
			(n, r) =>
				(n.numericKey != null && e === n.numericKey.toString()) ||
				(n.key && (typeof n.key == "string" ? n.key === e : n.key.includes(e))),
		)?.value || null,
	rs = (e, t) => {
		switch (e.type) {
			case "rectangle":
			case "diamond":
			case "frame":
			case "magicframe":
			case "embeddable":
			case "image":
			case "iframe":
			case "text":
			case "selection":
				return ji(e);
			case "arrow":
			case "line": {
				let n = me.get(e)?.[0] ?? me.generateElementShape(e, null)[0],
					[, , , , r, o] = H(e, t);
				return ns(e)
					? c8(e, n, b(e.x, e.y), e.angle, b(r, o))
					: i8(n, b(e.x, e.y), e.angle, b(r, o));
			}
			case "ellipse":
				return a8(e);
			case "freedraw": {
				let [, , , , n, r] = H(e, t);
				return s8(e, b(n, r), ns(e));
			}
		}
	},
	p8 = (e, t) => {
		let n = ee(e, t);
		return n
			? e.type === "arrow"
				? rs({ ...n, ...W.getBoundTextElementPosition(e, n, t) }, t)
				: rs(n, t)
			: null;
	},
	ml = (e, t) => {
		let n = me.generateElementShape(e, null);
		if (!n) return null;
		let r = es(n[0]),
			o = b(0, 0),
			a = 0,
			i = 1 / 0,
			s = null;
		for (; a < r.length; ) {
			let { op: c, data: l } = r[a];
			if (
				(c === "move" &&
					(ut(Bc(l), "The returned ops is not compatible with a point"),
					(o = l)),
				c === "bcurveTo")
			) {
				let d = o,
					U = b(l[0], l[1]),
					u = b(l[2], l[3]),
					p = b(l[4], l[5]),
					m = Ne(p, t);
				m < i && ((i = m), (s = [d, U, u, p])), (o = p);
			}
			a++;
		}
		return s;
	},
	hl = (e, t, n, r, o) => {
		let a = (c, l) =>
				Math.pow(1 - c, 3) * r[l] +
				3 * c * Math.pow(1 - c, 2) * n[l] +
				3 * Math.pow(c, 2) * (1 - c) * t[l] +
				e[l] * Math.pow(c, 3),
			i = a(o, 0),
			s = a(o, 1);
		return b(i, s);
	},
	L4 = (e, t) => {
		let n = ml(e, t);
		if (!n) return [];
		let r = [],
			o = 1;
		for (; o > 0; ) {
			let a = hl(n[0], n[1], n[2], n[3], o);
			r.push(b(a[0], a[1])), (o -= 0.05);
		}
		return r.length && wr(r.at(-1), t) && r.push(b(t[0], t[1])), r;
	},
	h8 = (e, t) => {
		let n = [];
		n[0] = 0;
		let r = L4(e, t),
			o = 0,
			a = 0;
		for (; o < r.length - 1; ) {
			let i = Ne(r[o], r[o + 1]);
			(a += i), n.push(a), o++;
		}
		return n;
	},
	b8 = (e, t) => h8(e, t).at(-1),
	g8 = (e, t, n) => {
		let r = h8(e, t),
			o = r.length - 1,
			a = r.at(-1),
			i = n * a,
			s = 0,
			c = o,
			l = 0;
		for (; s < c; )
			(l = Math.floor(s + (c - s) / 2)), r[l] < i ? (s = l + 1) : (c = l);
		return (
			r[l] > i && l--,
			r[l] === i ? l / o : 1 - (l + (i - r[l]) / (r[l + 1] - r[l])) / o
		);
	},
	St = (e, t) => {
		let n = {
				minX: e.x,
				minY: e.y,
				maxX: e.x + e.width,
				maxY: e.y + e.height,
				midX: e.x + e.width / 2,
				midY: e.y + e.height / 2,
			},
			r = b(n.midX, n.midY),
			[o, a] = D(b(n.minX, n.minY), r, e.angle),
			[i, s] = D(b(n.maxX, n.minY), r, e.angle),
			[c, l] = D(b(n.maxX, n.maxY), r, e.angle),
			[d, U] = D(b(n.minX, n.maxY), r, e.angle),
			u = [
				Math.min(o, i, c, d),
				Math.min(a, s, l, U),
				Math.max(o, i, c, d),
				Math.max(a, s, l, U),
			];
		if (t) {
			let [p, m, h, g] = t;
			return [u[0] - g, u[1] - p, u[2] + m, u[3] + h];
		}
		return u;
	},
	jn = (e, t) => e[0] > t[0] && e[0] < t[2] && e[1] > t[1] && e[1] < t[3];
var Dn = (e, t) => {
		if (
			t.roundness?.type === rt.PROPORTIONAL_RADIUS ||
			t.roundness?.type === rt.LEGACY
		)
			return e * gi;
		if (t.roundness?.type === rt.ADAPTIVE_RADIUS) {
			let n = t.roundness?.value ?? a1,
				r = n / gi;
			return e <= r ? e * gi : n;
		}
		return 0;
	},
	rn = (e, t = 1) => {
		if (e.length >= 3) {
			let [n, r] = [e[0], e[e.length - 1]];
			return Ne(n, r) <= zf / t;
		}
		return !1;
	};
E();
var Ce = 10,
	Pk = (e, t, n, r, o, a, i) => {
		let { width: s, height: c } = fo(e),
			l = n / s,
			d = r / c,
			U = (e.crop?.x ?? 0) / l,
			u = (e.crop?.y ?? 0) / d,
			p = D(b(o, a), b(e.x + e.width / 2, e.y + e.height / 2), -e.angle);
		(o = p[0]), (a = p[1]);
		let m = e.width,
			h = e.height,
			g = e.crop ?? {
				x: 0,
				y: 0,
				width: n,
				height: r,
				naturalWidth: n,
				naturalHeight: r,
			},
			x = g.height,
			y = g.width,
			w = e.scale[0] === -1,
			T = e.scale[1] === -1,
			I = a - e.y,
			_ = o - e.x;
		t.includes("n") && (h = Ee(e.height - I, Ce, T ? c - u : e.height + u)),
			t.includes("s") &&
				((I = a - e.y - e.height),
				(h = Ee(e.height + I, Ce, T ? e.height + u : c - u))),
			t.includes("e") &&
				((_ = o - e.x - e.width),
				(m = Ee(e.width + _, Ce, w ? e.width + U : s - U))),
			t.includes("w") && (m = Ee(e.width - _, Ce, w ? s - U : e.width + U));
		let L = ($) => {
			($.height = h * d), ($.width = m * l);
		};
		L(g);
		let M = ($, S) => {
			L(S),
				$.includes("n") && (T || (S.y += x - S.height)),
				$.includes("s") && T && (S.y += x - S.height),
				$.includes("e") && w && (S.x += y - S.width),
				$.includes("w") && (w || (S.x += y - S.width));
		};
		switch (t) {
			case "n": {
				if (i) {
					let $ = U + e.width / 2,
						S = s - U - e.width / 2,
						P = Math.min($, S) * 2;
					(m = Ee(h * i, Ce, P)), (h = m / i);
				}
				M(t, g), i && (g.x += (y - g.width) / 2);
				break;
			}
			case "s": {
				if (i) {
					let $ = U + e.width / 2,
						S = s - U - e.width / 2,
						P = Math.min($, S) * 2;
					(m = Ee(h * i, Ce, P)), (h = m / i);
				}
				M(t, g), i && (g.x += (y - g.width) / 2);
				break;
			}
			case "w": {
				if (i) {
					let $ = u + e.height / 2,
						S = c - u - e.height / 2,
						P = Math.min($, S) * 2;
					(h = Ee(m / i, Ce, P)), (m = h * i);
				}
				M(t, g), i && (g.y += (x - g.height) / 2);
				break;
			}
			case "e": {
				if (i) {
					let $ = u + e.height / 2,
						S = c - u - e.height / 2,
						P = Math.min($, S) * 2;
					(h = Ee(m / i, Ce, P)), (m = h * i);
				}
				M(t, g), i && (g.y += (x - g.height) / 2);
				break;
			}
			case "ne": {
				if (i)
					if (_ > -I) {
						let $ = T ? c - u : u + e.height;
						(h = Ee(m / i, Ce, $)), (m = h * i);
					} else {
						let $ = w ? U + e.width : s - U;
						(m = Ee(h * i, Ce, $)), (h = m / i);
					}
				M(t, g);
				break;
			}
			case "nw": {
				if (i)
					if (_ < I) {
						let $ = T ? c - u : u + e.height;
						(h = Ee(m / i, Ce, $)), (m = h * i);
					} else {
						let $ = w ? s - U : U + e.width;
						(m = Ee(h * i, Ce, $)), (h = m / i);
					}
				M(t, g);
				break;
			}
			case "se": {
				if (i)
					if (_ > I) {
						let $ = T ? u + e.height : c - u;
						(h = Ee(m / i, Ce, $)), (m = h * i);
					} else {
						let $ = w ? U + e.width : s - U;
						(m = Ee(h * i, Ce, $)), (h = m / i);
					}
				M(t, g);
				break;
			}
			case "sw": {
				if (i)
					if (-_ > I) {
						let $ = T ? u + e.height : c - u;
						(h = Ee(m / i, Ce, $)), (m = h * i);
					} else {
						let $ = w ? s - U : U + e.width;
						(m = Ee(h * i, Ce, $)), (h = m / i);
					}
				M(t, g);
				break;
			}
			default:
				break;
		}
		let N = D4(e, t, m, h, !!i);
		return (
			Fc(g.width, g.naturalWidth) &&
				Fc(g.height, g.naturalHeight) &&
				(g = null),
			{ x: N[0], y: N[1], width: m, height: h, crop: g }
		);
	},
	D4 = (e, t, n, r, o) => {
		let [a, i, s, c] = $t(e, e.width, e.height, !0),
			l = b(a, i),
			d = b(s, c),
			U = zt(l, d),
			[u, p, m, h] = $t(e, n, r, !0),
			g = m - u,
			x = h - p,
			y = [...l];
		if (
			(["n", "w", "nw"].includes(t) &&
				(y = [d[0] - Math.abs(g), d[1] - Math.abs(x)]),
			t === "ne")
		) {
			let M = [l[0], d[1]];
			y = [M[0], M[1] - Math.abs(x)];
		}
		if (t === "sw") {
			let M = [d[0], l[1]];
			y = [M[0] - Math.abs(g), M[1]];
		}
		o &&
			(["s", "n"].includes(t) && (y[0] = U[0] - g / 2),
			["e", "w"].includes(t) && (y[1] = U[1] - x / 2));
		let w = e.angle,
			T = D(y, U, w),
			I = [y[0] + Math.abs(g) / 2, y[1] + Math.abs(x) / 2],
			_ = D(I, U, w);
		y = D(T, _, -w);
		let L = [...y];
		return (L[0] += e.x - u), (L[1] += e.y - p), L;
	},
	E8 = (e, t) => {
		if (e.crop) {
			let { width: n, height: r } = fo(e),
				[o, a, i, s, c, l] = H(e, t),
				d = ae(D(b(o, a), b(c, l), e.angle)),
				U = ae(D(b(i, a), b(c, l), e.angle)),
				u = Ac(yr(U, d)),
				p = ae(D(b(o, s), b(c, l), e.angle)),
				m = yr(p, d),
				h = Ac(m),
				{ cropX: g, cropY: x } = S4(e.crop, e.scale),
				y = Tt(
					Tt(d, Qe(u, (-g * n) / e.crop.naturalWidth)),
					Qe(h, (-x * r) / e.crop.naturalHeight),
				),
				w = Tt(Tt(y, Qe(u, n / 2)), Qe(h, r / 2)),
				T = D(y, w, -e.angle);
			return { ...e, x: T[0], y: T[1], width: n, height: r, crop: null };
		}
		return e;
	},
	fo = (e) => {
		if (e.crop) {
			let t = e.width / (e.crop.width / e.crop.naturalWidth),
				n = e.height / (e.crop.height / e.crop.naturalHeight);
			return { width: t, height: n };
		}
		return { width: e.width, height: e.height };
	},
	S4 = (e, t) => {
		let n = e.x,
			r = e.y,
			o = t[0] === -1,
			a = t[1] === -1;
		return (
			o && (n = e.naturalWidth - Math.abs(n) - e.width),
			a && (r = e.naturalHeight - Math.abs(r) - e.height),
			{ cropX: n, cropY: r }
		);
	},
	Fk = (e, t = !1) => {
		let n = e.crop;
		if (!n) return null;
		let r = e.scale[0] === -1,
			o = e.scale[1] === -1,
			a = n.x,
			i = n.y;
		if (
			(r && (a = n.naturalWidth - n.width - n.x),
			o && (i = n.naturalHeight - n.height - n.y),
			t)
		)
			return { x: a, y: i };
		let { width: s, height: c } = fo(e);
		return { x: a / (n.naturalWidth / s), y: i / (n.naturalHeight / c) };
	};
var gl = "invert(100%) hue-rotate(180deg) saturate(1.25)",
	$4 = wt(),
	w8 = (e, t) => jt(e) && !t.imageCache.has(e.fileId),
	I8 = (e, t, n) =>
		n.theme === ke.DARK &&
		jt(e) &&
		!w8(e, t) &&
		t.imageCache.get(e.fileId)?.mimeType !== B.svg,
	as = (e) => {
		switch (e.type) {
			case "freedraw":
				return e.strokeWidth * 12;
			case "text":
				return e.fontSize / 2;
			default:
				return 20;
		}
	},
	N4 = (e, t, n, r, o = 1) => {
		let a = (((t?.opacity ?? 100) * e.opacity) / 1e4) * o;
		return (
			(n.has(e.id) ||
				(r && r.some((i) => i.id === e.id)) ||
				(t && n.has(t.id))) &&
				(a *= o1 / 100),
			a
		);
	},
	P4 = (e, t, n) => {
		let a = as(e),
			[i, s, c, l] = H(e, t),
			d = oe(e) || Fe(e) ? ft(i, c) : e.width,
			U = oe(e) || Fe(e) ? ft(s, l) : e.height,
			u = d * window.devicePixelRatio + a * 2,
			p = U * window.devicePixelRatio + a * 2,
			m = n.value;
		return (
			(u * m > 32767 || p * m > 32767) && (m = Math.min(32767 / u, 32767 / p)),
			u * p * m * m > 16777216 && (m = Math.sqrt(16777216 / (u * p))),
			(u = Math.floor(u * m)),
			(p = Math.floor(p * m)),
			{ width: u, height: p, scale: m }
		);
	},
	T8 = (e, t, n, r, o) => {
		let a = document.createElement("canvas"),
			i = a.getContext("2d"),
			s = as(e),
			{ width: c, height: l, scale: d } = P4(e, t, n);
		if (!c || !l) return null;
		(a.width = c), (a.height = l);
		let U = -100,
			u = 0;
		if (oe(e) || Fe(e)) {
			let [x, y] = H(e, t);
			(U = e.x > x ? ft(e.x, x) * window.devicePixelRatio * d : 0),
				(u = e.y > y ? ft(e.y, y) * window.devicePixelRatio * d : 0),
				i.translate(U, u);
		}
		i.save(),
			i.translate(s * d, s * d),
			i.scale(window.devicePixelRatio * d, window.devicePixelRatio * d);
		let p = nn.canvas(a);
		I8(e, r, o) && (i.filter = gl), os(e, p, i, r, o), i.restore();
		let m = ee(e, t),
			h = document.createElement("canvas"),
			g = h.getContext("2d");
		if (Q(e) && m) {
			let [x, y, w, T] = H(e, t),
				I = Math.max(ft(x, w), ft(y, T));
			(h.width = I * window.devicePixelRatio * d + s * d * 10),
				(h.height = I * window.devicePixelRatio * d + s * d * 10),
				g.translate(h.width / 2, h.height / 2),
				g.rotate(e.angle),
				g.drawImage(a, -a.width / 2, -a.height / 2, a.width, a.height);
			let [, , , , _, L] = H(m, t);
			g.rotate(-e.angle);
			let M = (h.width - a.width) / 2,
				N = (h.height - a.height) / 2,
				$ = h.width / 2 - (_ - x) * window.devicePixelRatio * d - M - s * d,
				S = h.height / 2 - (L - y) * window.devicePixelRatio * d - N - s * d;
			g.translate(-$, -S),
				g.clearRect(
					-(m.width / 2 + ve) * window.devicePixelRatio * d,
					-(m.height / 2 + ve) * window.devicePixelRatio * d,
					(m.width + ve * 2) * window.devicePixelRatio * d,
					(m.height + ve * 2) * window.devicePixelRatio * d,
				);
		}
		return {
			element: e,
			canvas: a,
			theme: o.theme,
			scale: d,
			zoomValue: n.value,
			canvasOffsetX: U,
			canvasOffsetY: u,
			boundTextElementVersion: ee(e, t)?.version || null,
			containingFrameOpacity: et(e, t)?.opacity || 100,
			boundTextCanvas: h,
			angle: e.angle,
			imageCrop: Pe(e) ? e.crop : null,
		};
	},
	R8 = 14,
	v8 = document.createElement("img");
v8.src = `data:${B.svg},${encodeURIComponent('<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="image" class="svg-inline--fa fa-image fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#888" d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"></path></svg>')}`;
var M8 = document.createElement("img");
M8.src = `data:${B.svg},${encodeURIComponent('<svg viewBox="0 0 668 668" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"><path d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48ZM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56ZM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48Z" style="fill:#888;fill-rule:nonzero" transform="matrix(.81709 0 0 .81709 124.825 145.825)"/><path d="M256 8C119.034 8 8 119.033 8 256c0 136.967 111.034 248 248 248s248-111.034 248-248S392.967 8 256 8Zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676ZM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676Z" style="fill:#888;fill-rule:nonzero" transform="matrix(.30366 0 0 .30366 506.822 60.065)"/></svg>')}`;
var F4 = (e, t) => {
		(t.fillStyle = "#E7E7E7"), t.fillRect(0, 0, e.width, e.height);
		let n = Math.min(e.width, e.height),
			r = Math.min(n, Math.min(n * 0.4, 100));
		t.drawImage(
			e.status === "error" ? M8 : v8,
			e.width / 2 - r / 2,
			e.height / 2 - r / 2,
			r,
			r,
		);
	},
	os = (e, t, n, r, o) => {
		switch (e.type) {
			case "rectangle":
			case "iframe":
			case "embeddable":
			case "diamond":
			case "ellipse": {
				(n.lineJoin = "round"), (n.lineCap = "round"), t.draw(me.get(e));
				break;
			}
			case "arrow":
			case "line": {
				(n.lineJoin = "round"),
					(n.lineCap = "round"),
					me.get(e).forEach((a) => {
						t.draw(a);
					});
				break;
			}
			case "freedraw": {
				n.save(), (n.fillStyle = e.strokeColor);
				let a = O4(e),
					i = me.get(e);
				i && t.draw(i), (n.fillStyle = e.strokeColor), n.fill(a), n.restore();
				break;
			}
			case "image": {
				let a = jt(e) ? r.imageCache.get(e.fileId)?.image : void 0;
				if (a != null && !(a instanceof Promise)) {
					e.roundness &&
						n.roundRect &&
						(n.beginPath(),
						n.roundRect(
							0,
							0,
							e.width,
							e.height,
							Dn(Math.min(e.width, e.height), e),
						),
						n.clip());
					let {
						x: i,
						y: s,
						width: c,
						height: l,
					} = e.crop
						? e.crop
						: { x: 0, y: 0, width: a.naturalWidth, height: a.naturalHeight };
					n.drawImage(a, i, s, c, l, 0, 0, e.width, e.height);
				} else F4(e, n);
				break;
			}
			default:
				if (X(e)) {
					let a = Ri(e.text),
						i = a && !n.canvas.isConnected;
					i && document.body.appendChild(n.canvas),
						n.canvas.setAttribute("dir", a ? "rtl" : "ltr"),
						n.save(),
						(n.font = pe(e)),
						(n.fillStyle = e.strokeColor),
						(n.textAlign = e.textAlign);
					let s = e.text
							.replace(
								/\r\n?/g,
								`
`,
							)
							.split(`
`),
						c =
							e.textAlign === "center"
								? e.width / 2
								: e.textAlign === "right"
									? e.width
									: 0,
						l = uo(e.fontSize, e.lineHeight),
						d = zi(e.fontFamily, e.fontSize, l);
					for (let U = 0; U < s.length; U++) n.fillText(s[U], c, U * l + d);
					n.restore(), i && n.canvas.remove();
				} else throw new Error(`Unimplemented type ${e.type}`);
		}
	},
	Yi = new WeakMap(),
	x8 = (e, t, n, r) => {
		let o = n ? r.zoom : $4.zoom,
			a = Yi.get(e),
			i = a && a.zoomValue !== o.value && !r?.shouldCacheIgnoreZoom,
			s = ee(e, t),
			c = s?.version || null,
			l = Pe(e) ? e.crop : null,
			d = et(e, t)?.opacity || 100;
		if (
			!a ||
			i ||
			a.theme !== r.theme ||
			a.boundTextElementVersion !== c ||
			a.imageCrop !== l ||
			a.containingFrameOpacity !== d ||
			(Q(e) && s && e.angle !== a.angle)
		) {
			let U = T8(e, t, o, n, r);
			return U ? (Yi.set(e, U), U) : null;
		}
		return a;
	},
	bl = (e, t, n, r, o) => {
		let a = e.element,
			i = as(a),
			s = e.scale,
			[c, l, d, U] = H(a, o),
			u = ((c + d) / 2 + r.scrollX) * window.devicePixelRatio,
			p = ((l + U) / 2 + r.scrollY) * window.devicePixelRatio;
		t.save(), t.scale(1 / window.devicePixelRatio, 1 / window.devicePixelRatio);
		let m = ee(a, o);
		if (Q(a) && m) {
			let h = (e.boundTextCanvas.width - e.canvas.width) / 2,
				g = (e.boundTextCanvas.height - e.canvas.height) / 2;
			t.translate(u, p),
				t.drawImage(
					e.boundTextCanvas,
					(-(d - c) / 2) * window.devicePixelRatio - h / s - i,
					(-(U - l) / 2) * window.devicePixelRatio - g / s - i,
					e.boundTextCanvas.width / s,
					e.boundTextCanvas.height / s,
				);
		} else if (
			(t.translate(u, p),
			t.rotate(a.angle),
			"scale" in e.element &&
				!w8(a, n) &&
				t.scale(e.element.scale[0], e.element.scale[1]),
			t.translate(-u, -p),
			t.drawImage(
				e.canvas,
				(c + r.scrollX) * window.devicePixelRatio - (i * e.scale) / e.scale,
				(l + r.scrollY) * window.devicePixelRatio - (i * e.scale) / e.scale,
				e.canvas.width / e.scale,
				e.canvas.height / e.scale,
			),
			R.VITE_APP_DEBUG_ENABLE_TEXT_CONTAINER_BOUNDING_BOX === "true" && Zn(a))
		) {
			let h = ee(a, o),
				g = xl(a);
			(t.strokeStyle = "#c92a2a"),
				(t.lineWidth = 3),
				t.strokeRect(
					(g.x + r.scrollX) * window.devicePixelRatio,
					(g.y + r.scrollY) * window.devicePixelRatio,
					Nt(a, h) * window.devicePixelRatio,
					ba(a, h) * window.devicePixelRatio,
				);
		}
		t.restore();
	},
	jk = (e, t, n, r) => {
		t.save(),
			t.translate(e.x + n.scrollX, e.y + n.scrollY),
			(t.fillStyle = "rgba(0, 0, 200, 0.04)");
		let o = 0.5 / n.zoom.value;
		t.fillRect(o, o, e.width, e.height),
			(t.lineWidth = 1 / n.zoom.value),
			(t.strokeStyle = r),
			t.strokeRect(o, o, e.width, e.height),
			t.restore();
	},
	Nr = (e, t, n, r, o, a, i) => {
		let s =
			i.openDialog?.name === "elementLinkSelector" &&
			!i.selectedElementIds[e.id] &&
			!i.hoveredElementIds[e.id];
		switch (
			((o.globalAlpha = N4(
				e,
				et(e, t),
				a.elementsPendingErasure,
				a.pendingFlowchartNodes,
				s ? l1 : 1,
			)),
			e.type)
		) {
			case "magicframe":
			case "frame": {
				i.frameRendering.enabled &&
					i.frameRendering.outline &&
					(o.save(),
					o.translate(e.x + i.scrollX, e.y + i.scrollY),
					(o.fillStyle = "rgba(0, 0, 200, 0.04)"),
					(o.lineWidth = Re.strokeWidth / i.zoom.value),
					(o.strokeStyle = Re.strokeColor),
					H1(e) &&
						(o.strokeStyle = i.theme === ke.LIGHT ? "#7affd7" : "#1d8264"),
					Re.radius && o.roundRect
						? (o.beginPath(),
							o.roundRect(0, 0, e.width, e.height, Re.radius / i.zoom.value),
							o.stroke(),
							o.closePath())
						: o.strokeRect(0, 0, e.width, e.height),
					o.restore());
				break;
			}
			case "freedraw": {
				if ((me.generateElementShape(e, null), a.isExporting)) {
					let [c, l, d, U] = H(e, t),
						u = (c + d) / 2 + i.scrollX,
						p = (l + U) / 2 + i.scrollY,
						m = (d - c) / 2 - (e.x - c),
						h = (U - l) / 2 - (e.y - l);
					o.save(),
						o.translate(u, p),
						o.rotate(e.angle),
						o.translate(-m, -h),
						os(e, r, o, a, i),
						o.restore();
				} else {
					let c = x8(e, n, a, i);
					if (!c) return;
					bl(c, o, a, i, n);
				}
				break;
			}
			case "rectangle":
			case "diamond":
			case "ellipse":
			case "line":
			case "arrow":
			case "image":
			case "text":
			case "iframe":
			case "embeddable": {
				if ((me.generateElementShape(e, a), a.isExporting)) {
					let [c, l, d, U] = H(e, t),
						u = (c + d) / 2 + i.scrollX,
						p = (l + U) / 2 + i.scrollY,
						m = (d - c) / 2 - (e.x - c),
						h = (U - l) / 2 - (e.y - l);
					if (X(e)) {
						let x = Oe(e, t);
						if (Q(x)) {
							let y = W.getBoundTextElementPosition(x, e, t);
							(m = (d - c) / 2 - (y.x - c)), (h = (U - l) / 2 - (y.y - l));
						}
					}
					o.save(), o.translate(u, p), I8(e, a, i) && (o.filter = "none");
					let g = ee(e, t);
					if (Q(e) && g) {
						let x = document.createElement("canvas"),
							y = x.getContext("2d"),
							w = Math.max(ft(c, d), ft(l, U)),
							T = as(e);
						(x.width = w * i.exportScale + T * 10 * i.exportScale),
							(x.height = w * i.exportScale + T * 10 * i.exportScale),
							y.translate(x.width / 2, x.height / 2),
							y.scale(i.exportScale, i.exportScale),
							(m = e.width / 2 - (e.x - c)),
							(h = e.height / 2 - (e.y - l)),
							y.rotate(e.angle);
						let I = nn.canvas(x);
						y.translate(-m, -h),
							os(e, I, y, a, i),
							y.translate(m, h),
							y.rotate(-e.angle);
						let [, , , , _, L] = H(g, t),
							M = (c + d) / 2 - _,
							N = (l + U) / 2 - L;
						y.translate(-M, -N),
							y.clearRect(-g.width / 2, -g.height / 2, g.width, g.height),
							o.scale(1 / i.exportScale, 1 / i.exportScale),
							o.drawImage(x, -x.width / 2, -x.height / 2, x.width, x.height);
					} else
						o.rotate(e.angle),
							e.type === "image" && o.scale(e.scale[0], e.scale[1]),
							o.translate(-m, -h),
							os(e, r, o, a, i);
					o.restore();
				} else {
					let c = x8(e, n, a, i);
					if (!c) return;
					let l = o.imageSmoothingEnabled;
					if (
						(!i?.shouldCacheIgnoreZoom &&
							(!e.angle || I1(e.angle)) &&
							(o.imageSmoothingEnabled = !1),
						e.id === i.croppingElementId &&
							Pe(c.element) &&
							c.element.crop !== null)
					) {
						o.save(), (o.globalAlpha = 0.1);
						let d = T8(E8(c.element, t), n, i.zoom, a, i);
						d && bl(d, o, a, i, n), o.restore();
					}
					bl(c, o, a, i, n), (o.imageSmoothingEnabled = l);
				}
				break;
			}
			default:
				throw new Error(`Unimplemented type ${e.type}`);
		}
		o.globalAlpha = 1;
	},
	_8 = new WeakMap([]);
function L8(e) {
	let t = El(e),
		n = new Path2D(t);
	return _8.set(e, n), n;
}
function O4(e) {
	return _8.get(e);
}
function El(e) {
	let t = e.simulatePressure
			? e.points
			: e.points.length
				? e.points.map(([r, o], a) => [r, o, e.pressures[a]])
				: [[0, 0, 0.5]],
		n = {
			simulatePressure: e.simulatePressure,
			size: e.strokeWidth * 4.25,
			thinning: 0.6,
			smoothing: 0.5,
			streamline: 0.5,
			easing: (r) => Math.sin((r * Math.PI) / 2),
			last: !!e.lastCommittedPoint,
		};
	return B4(f2(t, n));
}
function y8(e, t) {
	return [(e[0] + t[0]) / 2, (e[1] + t[1]) / 2];
}
var A4 = /(\s?[A-Z]?,?-?[0-9]*\.[0-9]{0,2})(([0-9]|e|-)*)/g;
function B4(e) {
	if (!e.length) return "";
	let t = e.length - 1;
	return e
		.reduce(
			(n, r, o, a) => (
				o === t
					? n.push(r, y8(r, a[0]), "L", a[0], "Z")
					: n.push(r, y8(r, a[o + 1])),
				n
			),
			["M", e[0], "Q"],
		)
		.join(" ")
		.replace(A4, "$1");
}
E();
function yl(e, t) {
	return Math.pow(e[0] - t[0], 2) + Math.pow(e[1] - t[1], 2);
}
function C4(e, t, n) {
	let r = yl(t, n);
	if (r === 0) return yl(e, t);
	let o = ((e[0] - t[0]) * (n[0] - t[0]) + (e[1] - t[1]) * (n[1] - t[1])) / r;
	return (o = Math.max(0, Math.min(1, o))), yl(e, K4(t, n, o));
}
function K4(e, t, n) {
	return [e[0] + (t[0] - e[0]) * n, e[1] + (t[1] - e[1]) * n];
}
function D8(e, t) {
	return wl(e, 0, e.length, t);
}
function wl(e, t, n, r, o) {
	let a = o || [],
		i = e[t],
		s = e[n - 1],
		c = 0,
		l = 1;
	for (let d = t + 1; d < n - 1; ++d) {
		let U = C4(e[d], i, s);
		U > c && ((c = U), (l = d));
	}
	return (
		Math.sqrt(c) > r
			? (wl(e, t, l + 1, r, a), wl(e, l, n, r, a))
			: (a.length || a.push(i), a.push(s)),
		a
	);
}
E();
var H4 = (e) =>
		e === "rectangle" ||
		e === "iframe" ||
		e === "embeddable" ||
		e === "ellipse" ||
		e === "diamond" ||
		e === "line" ||
		e === "freedraw",
	aY = (e) => e !== "image" && e !== "frame" && e !== "magicframe",
	J4 = (e) =>
		e === "rectangle" ||
		e === "iframe" ||
		e === "embeddable" ||
		e === "ellipse" ||
		e === "diamond" ||
		e === "freedraw" ||
		e === "arrow" ||
		e === "line",
	k4 = (e) =>
		e === "rectangle" ||
		e === "iframe" ||
		e === "embeddable" ||
		e === "ellipse" ||
		e === "diamond" ||
		e === "arrow" ||
		e === "line",
	Il = (e) =>
		e === "rectangle" ||
		e === "iframe" ||
		e === "embeddable" ||
		e === "line" ||
		e === "diamond" ||
		e === "image",
	iY = (e) => e === "arrow",
	Y4 = (e) => e === "arrow",
	Tl = (e, t) => {
		let n = null;
		for (let r = e.length - 1; r >= 0; --r) {
			let o = e[r];
			if (!o.isDeleted && t(o)) {
				n = o;
				break;
			}
		}
		return n;
	};
var V4 = (e) => [8, 8 + e],
	N8 = (e) => [1.5, 6 + e];
function q4(e) {
	let t = e.roughness,
		n = Math.max(e.width, e.height),
		r = Math.min(e.width, e.height);
	return (r >= 20 && n >= 50) ||
		(r >= 15 && e.roundness && Il(e.type)) ||
		(oe(e) && n >= 50)
		? t
		: Math.min(t / (n < 10 ? 3 : 2), 2.5);
}
var tt = (e, t = !1) => {
		let n = {
			seed: e.seed,
			strokeLineDash:
				e.strokeStyle === "dashed"
					? V4(e.strokeWidth)
					: e.strokeStyle === "dotted"
						? N8(e.strokeWidth)
						: void 0,
			disableMultiStroke: e.strokeStyle !== "solid",
			strokeWidth:
				e.strokeStyle !== "solid" ? e.strokeWidth + 0.5 : e.strokeWidth,
			fillWeight: e.strokeWidth / 2,
			hachureGap: e.strokeWidth * 4,
			roughness: q4(e),
			stroke: e.strokeColor,
			preserveVertices: t || e.roughness < Sc.cartoonist,
		};
		switch (e.type) {
			case "rectangle":
			case "iframe":
			case "embeddable":
			case "diamond":
			case "ellipse":
				return (
					(n.fillStyle = e.fillStyle),
					(n.fill = Gn(e.backgroundColor) ? void 0 : e.backgroundColor),
					e.type === "ellipse" && (n.curveFitting = 1),
					n
				);
			case "line":
			case "freedraw":
				return (
					rn(e.points) &&
						((n.fillStyle = e.fillStyle),
						(n.fill =
							e.backgroundColor === "transparent"
								? void 0
								: e.backgroundColor)),
					n
				);
			case "arrow":
				return n;
			default:
				throw new Error(`Unimplemented type ${e.type}`);
		}
	},
	S8 = (e, t, n) =>
		vt(e) &&
		(t || (Mi(e) && n?.get(e.id) !== !0)) &&
		Gn(e.backgroundColor) &&
		Gn(e.strokeColor)
			? { ...e, roughness: 0, backgroundColor: "#d3d3d3", fillStyle: "solid" }
			: na(e)
				? {
						...e,
						strokeColor: Gn(e.strokeColor) ? "#000000" : e.strokeColor,
						backgroundColor: Gn(e.backgroundColor)
							? "#f4f4f6"
							: e.backgroundColor,
					}
				: e,
	$8 = (e, t, n, r, o, a, i) => {
		let s = vl(e, t, n, r);
		if (s === null) return [];
		switch (r) {
			case "dot":
			case "circle":
			case "circle_outline": {
				let [c, l, d] = s;
				return (
					delete a.strokeLineDash,
					[
						o.circle(c, l, d, {
							...a,
							fill: r === "circle_outline" ? i : e.strokeColor,
							fillStyle: "solid",
							stroke: e.strokeColor,
							roughness: Math.min(0.5, a.roughness || 0),
						}),
					]
				);
			}
			case "triangle":
			case "triangle_outline": {
				let [c, l, d, U, u, p] = s;
				return (
					delete a.strokeLineDash,
					[
						o.polygon(
							[
								[c, l],
								[d, U],
								[u, p],
								[c, l],
							],
							{
								...a,
								fill: r === "triangle_outline" ? i : e.strokeColor,
								fillStyle: "solid",
								roughness: Math.min(1, a.roughness || 0),
							},
						),
					]
				);
			}
			case "diamond":
			case "diamond_outline": {
				let [c, l, d, U, u, p, m, h] = s;
				return (
					delete a.strokeLineDash,
					[
						o.polygon(
							[
								[c, l],
								[d, U],
								[u, p],
								[m, h],
								[c, l],
							],
							{
								...a,
								fill: r === "diamond_outline" ? i : e.strokeColor,
								fillStyle: "solid",
								roughness: Math.min(1, a.roughness || 0),
							},
						),
					]
				);
			}
			case "bar":
			case "arrow":
			default: {
				let [c, l, d, U, u, p] = s;
				if (e.strokeStyle === "dotted") {
					let m = N8(e.strokeWidth - 1);
					a.strokeLineDash = [m[0], m[1] - 1];
				} else delete a.strokeLineDash;
				return (
					(a.roughness = Math.min(1, a.roughness || 0)),
					[o.line(d, U, c, l, a), o.line(u, p, c, l, a)]
				);
			}
		}
	},
	u2 = (
		e,
		t,
		{ isExporting: n, canvasBackgroundColor: r, embedsValidationStatus: o },
	) => {
		switch (e.type) {
			case "rectangle":
			case "iframe":
			case "embeddable": {
				let a;
				if (e.roundness) {
					let i = e.width,
						s = e.height,
						c = Dn(Math.min(i, s), e);
					a = t.path(
						`M ${c} 0 L ${i - c} 0 Q ${i} 0, ${i} ${c} L ${i} ${s - c} Q ${i} ${s}, ${i - c} ${s} L ${c} ${s} Q 0 ${s}, 0 ${s - c} L 0 ${c} Q 0 0, ${c} 0`,
						tt(S8(e, n, o), !0),
					);
				} else a = t.rectangle(0, 0, e.width, e.height, tt(S8(e, n, o), !1));
				return a;
			}
			case "diamond": {
				let a,
					[i, s, c, l, d, U, u, p] = Rl(e);
				if (e.roundness) {
					let m = Dn(Math.abs(i - u), e),
						h = Dn(Math.abs(l - s), e);
					a = t.path(
						`M ${i + m} ${s + h} L ${c - m} ${l - h}
            C ${c} ${l}, ${c} ${l}, ${c - m} ${l + h}
            L ${d + m} ${U - h}
            C ${d} ${U}, ${d} ${U}, ${d - m} ${U - h}
            L ${u + m} ${p + h}
            C ${u} ${p}, ${u} ${p}, ${u + m} ${p - h}
            L ${i - m} ${s + h}
            C ${i} ${s}, ${i} ${s}, ${i + m} ${s + h}`,
						tt(e, !0),
					);
				} else
					a = t.polygon(
						[
							[i, s],
							[c, l],
							[d, U],
							[u, p],
						],
						tt(e),
					);
				return a;
			}
			case "ellipse":
				return t.ellipse(e.width / 2, e.height / 2, e.width, e.height, tt(e));
			case "line":
			case "arrow": {
				let a,
					i = tt(e),
					s = e.points.length ? e.points : [b(0, 0)];
				if (
					(se(e)
						? (a = [t.path(G4(s, 16), tt(e, !0))])
						: e.roundness
							? (a = [t.curve(s, i)])
							: i.fill
								? (a = [t.polygon(s, i)])
								: (a = [t.linearPath(s, i)]),
					e.type === "arrow")
				) {
					let { startArrowhead: c = null, endArrowhead: l = "arrow" } = e;
					if (c !== null) {
						let d = $8(e, a, "start", c, t, i, r);
						a.push(...d);
					}
					if (l !== null) {
						let d = $8(e, a, "end", l, t, i, r);
						a.push(...d);
					}
				}
				return a;
			}
			case "freedraw": {
				let a;
				if ((L8(e), rn(e.points))) {
					let i = D8(e.points, 0.75);
					a = t.curve(i, { ...tt(e), stroke: "none" });
				} else a = null;
				return a;
			}
			case "frame":
			case "magicframe":
			case "text":
			case "image":
				return null;
			default:
				return (
					vr(e, `generateElementShape(): Unimplemented type ${e?.type}`), null
				);
		}
	},
	G4 = (e, t) => {
		let n = [];
		for (let o = 1; o < e.length - 1; o += 1) {
			let a = e[o - 1],
				i = e[o + 1],
				s = Math.min(t, Ne(e[o], i) / 2, Ne(e[o], a) / 2);
			a[0] < e[o][0] && a[1] === e[o][1]
				? n.push([e[o][0] - s, e[o][1]])
				: a[0] === e[o][0] && a[1] < e[o][1]
					? n.push([e[o][0], e[o][1] - s])
					: a[0] > e[o][0] && a[1] === e[o][1]
						? n.push([e[o][0] + s, e[o][1]])
						: n.push([e[o][0], e[o][1] + s]),
				n.push(e[o]),
				i[0] < e[o][0] && i[1] === e[o][1]
					? n.push([e[o][0] - s, e[o][1]])
					: i[0] === e[o][0] && i[1] < e[o][1]
						? n.push([e[o][0], e[o][1] - s])
						: i[0] > e[o][0] && i[1] === e[o][1]
							? n.push([e[o][0] + s, e[o][1]])
							: n.push([e[o][0], e[o][1] + s]);
		}
		let r = [`M ${e[0][0]} ${e[0][1]}`];
		for (let o = 0; o < n.length; o += 3)
			r.push(`L ${n[o][0]} ${n[o][1]}`),
				r.push(
					`Q ${n[o + 1][0]} ${n[o + 1][1]}, ${n[o + 2][0]} ${n[o + 2][1]}`,
				);
		return r.push(`L ${e[e.length - 1][0]} ${e[e.length - 1][1]}`), r.join(" ");
	};
E();
var Pr = (e) => {
		let t = e.map((r) => r[0]),
			n = e.map((r) => r[1]);
		return {
			width: Math.max(...t) - Math.min(...t),
			height: Math.max(...n) - Math.min(...n),
		};
	},
	po = (e, t, n, r) => {
		let o = n.map((p) => p[e]),
			a = Math.max(...o),
			i = Math.min(...o),
			s = a - i,
			c = s === 0 ? 1 : t / s,
			l = 1 / 0,
			d = n.map((p) => {
				let m = p[e] * c,
					h = [...p];
				return (h[e] = m), m < l && (l = m), h;
			});
		if (!r || d.length === 2) return d;
		let U = i - l;
		return d.map((p) => p.map((m, h) => (h === e ? m + U : m)));
	};
var Ml = class e {
		static boundsCache = new WeakMap();
		static getBounds(t, n) {
			let r = e.boundsCache.get(t);
			if (r?.version && r.version === t.version && !Me(t)) return r.bounds;
			let o = e.calculateBounds(t, n);
			return e.boundsCache.set(t, { version: t.version, bounds: o }), o;
		}
		static calculateBounds(t, n) {
			let r,
				[o, a, i, s, c, l] = H(t, n);
			if (Fe(t)) {
				let [d, U, u, p] = Ll(
					t.points.map(([m, h]) => D(b(m, h), b(c - t.x, l - t.y), t.angle)),
				);
				return [d + t.x, U + t.y, u + t.x, p + t.y];
			} else if (oe(t)) r = j4(t, c, l, n);
			else if (t.type === "diamond") {
				let [d, U] = D(b(c, a), b(c, l), t.angle),
					[u, p] = D(b(c, s), b(c, l), t.angle),
					[m, h] = D(b(o, l), b(c, l), t.angle),
					[g, x] = D(b(i, l), b(c, l), t.angle),
					y = Math.min(d, u, m, g),
					w = Math.min(U, p, h, x),
					T = Math.max(d, u, m, g),
					I = Math.max(U, p, h, x);
				r = [y, w, T, I];
			} else if (t.type === "ellipse") {
				let d = (i - o) / 2,
					U = (s - a) / 2,
					u = Math.cos(t.angle),
					p = Math.sin(t.angle),
					m = Math.hypot(d * u, U * p),
					h = Math.hypot(U * u, d * p);
				r = [c - m, l - h, c + m, l + h];
			} else {
				let [d, U] = D(b(o, a), b(c, l), t.angle),
					[u, p] = D(b(o, s), b(c, l), t.angle),
					[m, h] = D(b(i, s), b(c, l), t.angle),
					[g, x] = D(b(i, a), b(c, l), t.angle),
					y = Math.min(d, u, m, g),
					w = Math.min(U, p, h, x),
					T = Math.max(d, u, m, g),
					I = Math.max(U, p, h, x);
				r = [y, w, T, I];
			}
			return r;
		}
	},
	H = (e, t, n = !1) => {
		if (Fe(e)) return Z4(e);
		if (oe(e)) return W.getElementAbsoluteCoords(e, t, n);
		if (X(e)) {
			let r = t ? Oe(e, t) : null;
			if (Q(r)) {
				let { x: o, y: a } = W.getBoundTextElementPosition(r, e, t);
				return [
					o,
					a,
					o + e.width,
					a + e.height,
					o + e.width / 2,
					a + e.height / 2,
				];
			}
		}
		return [
			e.x,
			e.y,
			e.x + e.width,
			e.y + e.height,
			e.x + e.width / 2,
			e.y + e.height / 2,
		];
	},
	_l = (e, t) => {
		let [n, r, o, a, i, s] = H(e, t),
			c = b(i, s);
		if (oe(e) || Fe(e)) {
			let x = [],
				y = 0;
			for (; y < e.points.length - 1; )
				x.push(
					re(
						D(b(e.points[y][0] + e.x, e.points[y][1] + e.y), c, e.angle),
						D(
							b(e.points[y + 1][0] + e.x, e.points[y + 1][1] + e.y),
							c,
							e.angle,
						),
					),
				),
					y++;
			return x;
		}
		let [l, d, U, u, p, m, h, g] = [
			[n, r],
			[o, r],
			[n, a],
			[o, a],
			[i, r],
			[i, a],
			[n, s],
			[o, s],
		].map((x) => D(x, c, e.angle));
		return e.type === "diamond"
			? [re(p, h), re(p, g), re(m, h), re(m, g)]
			: e.type === "ellipse"
				? [
						re(p, h),
						re(p, g),
						re(m, h),
						re(m, g),
						re(p, h),
						re(p, g),
						re(m, h),
						re(m, g),
					]
				: [
						re(l, d),
						re(U, u),
						re(l, U),
						re(d, u),
						re(l, g),
						re(U, g),
						re(d, h),
						re(u, h),
					];
	};
var Rl = (e) => {
		let t = Math.floor(e.width / 2) + 1,
			n = 0,
			r = e.width,
			o = Math.floor(e.height / 2) + 1,
			a = t,
			i = e.height;
		return [t, n, r, o, a, i, 0, o];
	},
	mo = (e) => {
		for (let t of e.sets) if (t.type === "path") return t.ops;
		return e.sets[0].ops;
	},
	P8 = (e, t, n, r, o) => {
		let a = 1 - e;
		return (
			Math.pow(a, 3) * t +
			3 * Math.pow(a, 2) * e * n +
			3 * a * Math.pow(e, 2) * r +
			Math.pow(e, 3) * o
		);
	},
	F8 = (e, t, n, r) => {
		let o = t - e,
			a = n - t,
			i = r - n,
			s = 3 * o - 6 * a + 3 * i,
			c = 6 * a - 6 * o,
			l = 3 * o,
			d = c * c - 4 * s * l;
		if (!(d >= 0)) return !1;
		let u = null,
			p = null,
			m = 1 / 0,
			h = 1 / 0;
		return (
			s === 0
				? (m = h = -l / c)
				: ((m = (-c + Math.sqrt(d)) / (2 * s)),
					(h = (-c - Math.sqrt(d)) / (2 * s))),
			m >= 0 && m <= 1 && (u = P8(m, e, t, n, r)),
			h >= 0 && h <= 1 && (p = P8(h, e, t, n, r)),
			[u, p]
		);
	},
	X4 = (e, t, n, r) => {
		let o = F8(e[0], t[0], n[0], r[0]),
			a = F8(e[1], t[1], n[1], r[1]),
			i = Math.min(e[0], r[0]),
			s = Math.max(e[0], r[0]);
		if (o) {
			let d = o.filter((U) => U !== null);
			(i = Math.min(i, ...d)), (s = Math.max(s, ...d));
		}
		let c = Math.min(e[1], r[1]),
			l = Math.max(e[1], r[1]);
		if (a) {
			let d = a.filter((U) => U !== null);
			(c = Math.min(c, ...d)), (l = Math.max(l, ...d));
		}
		return [i, c, s, l];
	},
	ga = (e, t) => {
		let n = b(0, 0),
			{
				minX: r,
				minY: o,
				maxX: a,
				maxY: i,
			} = e.reduce(
				(s, { op: c, data: l }) => {
					if (c === "move") {
						let d = Wo(l);
						ut(d != null, "Op data is not a point"), (n = d);
					} else if (c === "bcurveTo") {
						let d = b(l[0], l[1]),
							U = b(l[2], l[3]),
							u = b(l[4], l[5]),
							p = t ? t(d) : d,
							m = t ? t(U) : U,
							h = t ? t(u) : u,
							g = t ? t(n) : n;
						n = u;
						let [x, y, w, T] = X4(g, p, m, h);
						(s.minX = Math.min(s.minX, x)),
							(s.minY = Math.min(s.minY, y)),
							(s.maxX = Math.max(s.maxX, w)),
							(s.maxY = Math.max(s.maxY, T));
					}
					return s;
				},
				{ minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0 },
			);
		return [r, o, a, i];
	},
	Ll = (e) => {
		let t = 1 / 0,
			n = 1 / 0,
			r = -1 / 0,
			o = -1 / 0;
		for (let [a, i] of e)
			(t = Math.min(t, a)),
				(n = Math.min(n, i)),
				(r = Math.max(r, a)),
				(o = Math.max(o, i));
		return [t, n, r, o];
	},
	Z4 = (e) => {
		let [t, n, r, o] = Ll(e.points),
			a = t + e.x,
			i = n + e.y,
			s = r + e.x,
			c = o + e.y;
		return [a, i, s, c, (a + s) / 2, (i + c) / 2];
	},
	W4 = (e) => {
		switch (e) {
			case "arrow":
				return 25;
			case "diamond":
			case "diamond_outline":
				return 12;
			default:
				return 15;
		}
	},
	z4 = (e) => {
		switch (e) {
			case "bar":
				return 90;
			case "arrow":
				return 20;
			default:
				return 25;
		}
	},
	vl = (e, t, n, r) => {
		let o = mo(t[0]);
		if (o.length < 1) return null;
		let a = n === "start" ? 1 : o.length - 1,
			i = o[a].data;
		ut(i.length === 6, "Op data length is not 6");
		let s = b(i[4], i[5]),
			c = b(i[2], i[3]),
			l = b(i[0], i[1]),
			d = o[a - 1],
			U = b(0, 0);
		if (d.op === "move") {
			let K = Wo(d.data);
			ut(K != null, "Op data is not a point"), (U = K);
		} else d.op === "bcurveTo" && (U = b(d.data[4], d.data[5]));
		let u = (K, q) =>
				Math.pow(1 - K, 3) * s[q] +
				3 * K * Math.pow(1 - K, 2) * c[q] +
				3 * Math.pow(K, 2) * (1 - K) * l[q] +
				U[q] * Math.pow(K, 3),
			[p, m] = n === "start" ? U : s,
			[h, g] = [u(0.3, 0), u(0.3, 1)],
			x = Math.hypot(p - h, m - g),
			y = (p - h) / x,
			w = (m - g) / x,
			T = W4(r),
			I = 0;
		{
			let [K, q] = n === "end" ? e.points[e.points.length - 1] : e.points[0],
				[F, C] =
					e.points.length > 1
						? n === "end"
							? e.points[e.points.length - 2]
							: e.points[1]
						: [0, 0];
			I = Math.hypot(K - F, q - C);
		}
		let L = Math.min(
				T,
				I * (r === "diamond" || r === "diamond_outline" ? 0.25 : 0.5),
			),
			M = p - y * L,
			N = m - w * L;
		if (r === "dot" || r === "circle" || r === "circle_outline") {
			let K = Math.hypot(N - m, M - p) + e.strokeWidth - 2;
			return [p, m, K];
		}
		let $ = z4(r),
			[S, P] = D(b(M, N), b(p, m), (-$ * Math.PI) / 180),
			[A, k] = D(b(M, N), b(p, m), Oc($));
		if (r === "diamond" || r === "diamond_outline") {
			let K, q;
			if (n === "start") {
				let [F, C] = e.points.length > 1 ? e.points[1] : [0, 0];
				[K, q] = D(b(p + L * 2, m), b(p, m), Math.atan2(C - m, F - p));
			} else {
				let [F, C] =
					e.points.length > 1 ? e.points[e.points.length - 2] : [0, 0];
				[K, q] = D(b(p - L * 2, m), b(p, m), Math.atan2(m - C, p - F));
			}
			return [p, m, S, P, K, q, A, k];
		}
		return [p, m, S, P, A, k];
	},
	Q4 = (e) => {
		let t = nn.generator(),
			n = tt(e),
			r = e.roundness ? "curve" : n.fill ? "polygon" : "linearPath";
		return t[r](e.points, n);
	},
	j4 = (e, t, n, r) => {
		let o = ee(e, r);
		if (e.points.length < 2) {
			let [U, u] = e.points[0],
				[p, m] = D(b(e.x + U, e.y + u), b(t, n), e.angle),
				h = [p, m, p, m];
			if (o) {
				let g = W.getMinMaxXYWithBoundText(e, r, [p, m, p, m], o);
				h = [g[0], g[1], g[2], g[3]];
			}
			return h;
		}
		let i = me.get(e)?.[0] ?? Q4(e),
			s = mo(i),
			l = ga(s, ([U, u]) => D(b(e.x + U, e.y + u), b(t, n), e.angle)),
			d = [l[0], l[1], l[2], l[3]];
		if (o) {
			let U = W.getMinMaxXYWithBoundText(e, r, d, o);
			d = [U[0], U[1], U[2], U[3]];
		}
		return d;
	},
	Ve = (e, t) => Ml.getBounds(e, t),
	Te = (e, t) => {
		if (!e.length) return [0, 0, 0, 0];
		let n = 1 / 0,
			r = -1 / 0,
			o = 1 / 0,
			a = -1 / 0,
			i = t || j(e);
		return (
			e.forEach((s) => {
				let [c, l, d, U] = Ve(s, i);
				(n = Math.min(n, c)),
					(o = Math.min(o, l)),
					(r = Math.max(r, d)),
					(a = Math.max(a, U));
			}),
			[n, o, r, a]
		);
	},
	is = (e, t) => {
		let [n, r, o, a] = Te(e);
		return [n + t.x, r + t.y, o + t.x, a + t.y];
	},
	$t = (e, t, n, r) => {
		if (!(oe(e) || Fe(e))) return [e.x, e.y, e.x + t, e.y + n];
		let o = po(0, t, po(1, n, e.points, r), r),
			a;
		if (Fe(e)) a = Ll(o);
		else {
			let d = nn.generator(),
				U = e.roundness ? d.curve(o, tt(e)) : d.linearPath(o, tt(e)),
				u = mo(U);
			a = ga(u);
		}
		let [i, s, c, l] = a;
		return [i + e.x, s + e.y, c + e.x, l + e.y];
	},
	Dl = (e, t) => {
		let n = nn.generator(),
			r = e.roundness == null ? n.linearPath(t, tt(e)) : n.curve(t, tt(e)),
			o = mo(r),
			[a, i, s, c] = ga(o);
		return [a + e.x, i + e.y, s + e.x, c + e.y];
	},
	Sl = (e, t) => {
		if (!e.length) return [0, 0, 0, 0];
		let n = 1 / 0,
			r = e[0],
			o = j(e);
		return (
			e.forEach((a) => {
				let [i, s, c, l] = Ve(a, o),
					d = Ne(b((i + c) / 2, (s + l) / 2), b(t.x, t.y));
				d < n && ((n = d), (r = a));
			}),
			Ve(r, o)
		);
	},
	$l = (e) => {
		let [t, n, r, o] = Te(e);
		return {
			minX: t,
			minY: n,
			maxX: r,
			maxY: o,
			width: r - t,
			height: o - n,
			midX: (t + r) / 2,
			midY: (n + o) / 2,
		};
	},
	$Y = ({ scrollX: e, scrollY: t, width: n, height: r, zoom: o }) => [
		-e,
		-t,
		-e + n / o.value,
		-t + r / o.value,
	],
	ss = (e) => b(e[0] + (e[2] - e[0]) / 2, e[1] + (e[3] - e[1]) / 2);
E();
E();
var Ke = (e, t) => [0, 0, 0, 0, t, e, 1, 0];
var O8 = (e, t) => [0, 0, 0, 0, t, e, 0, 0];
var Fr = (e = 0, t = 0) => {
	let n = [0, 0, 0, 0, 0, 0, 0, 0];
	if (t < 0 || t > 7)
		throw new Error(`Expected \`index\` between 0 and 7, got \`${t}\``);
	return e !== 0 && (n[t] = e), n;
};
var ho = (e) => [e[0], e[1], e[2], e[3], -e[4], -e[5], -e[6], -e[7]];
var A8 = (e, t) =>
		Al(t)
			? [e[0] + t, e[1], e[2], e[3], e[4], e[5], e[6], e[7]]
			: [
					e[0] + t[0],
					e[1] + t[1],
					e[2] + t[2],
					e[3] + t[3],
					e[4] + t[4],
					e[5] + t[5],
					e[6] + t[6],
					e[7] + t[7],
				],
	Nl = (e, t) =>
		Al(t)
			? [e[0] - t, e[1], e[2], e[3], e[4], e[5], e[6], e[7]]
			: [
					e[0] - t[0],
					e[1] - t[1],
					e[2] - t[2],
					e[3] - t[3],
					e[4] - t[4],
					e[5] - t[5],
					e[6] - t[6],
					e[7] - t[7],
				],
	er = (e, t) =>
		Al(t)
			? [
					e[0] * t,
					e[1] * t,
					e[2] * t,
					e[3] * t,
					e[4] * t,
					e[5] * t,
					e[6] * t,
					e[7] * t,
				]
			: [
					ey(e, t),
					t[1] * e[0] +
						t[0] * e[1] -
						t[4] * e[2] +
						t[5] * e[3] +
						t[2] * e[4] -
						t[3] * e[5] -
						t[7] * e[6] -
						t[6] * e[7],
					t[2] * e[0] + t[0] * e[2] - t[6] * e[3] + t[3] * e[6],
					t[3] * e[0] + t[6] * e[2] + t[0] * e[3] - t[2] * e[6],
					t[4] * e[0] +
						t[2] * e[1] -
						t[1] * e[2] +
						t[7] * e[3] +
						t[0] * e[4] +
						t[6] * e[5] -
						t[5] * e[6] +
						t[3] * e[7],
					t[5] * e[0] -
						t[3] * e[1] +
						t[7] * e[2] +
						t[1] * e[3] -
						t[6] * e[4] +
						t[0] * e[5] +
						t[4] * e[6] +
						t[2] * e[7],
					t[6] * e[0] + t[3] * e[2] - t[2] * e[3] + t[0] * e[6],
					t[7] * e[0] +
						t[6] * e[1] +
						t[5] * e[2] +
						t[4] * e[3] +
						t[3] * e[4] +
						t[2] * e[5] +
						t[1] * e[6] +
						t[0] * e[7],
				],
	ey = (e, t) => t[0] * e[0] + t[2] * e[2] + t[3] * e[3] - t[6] * e[6],
	Pl = (e, t) => [
		t[0] * e[0],
		t[1] * e[0] + t[0] * e[1],
		t[2] * e[0] + t[0] * e[2],
		t[3] * e[0] + t[0] * e[3],
		t[4] * e[0] + t[2] * e[1] - t[1] * e[2] + t[0] * e[4],
		t[5] * e[0] - t[3] * e[1] + t[1] * e[3] + t[0] * e[5],
		t[6] * e[0] + t[3] * e[2] - t[2] * e[3] + t[0] * e[6],
		t[7] * e[0] +
			t[6] * e[1] +
			t[5] * e[2] +
			t[4] * e[3] +
			t[3] * e[4] +
			t[2] * e[5] +
			t[1] * e[6],
	],
	cs = (e, t) => [
		Fl(e, t),
		e[1] * t[7] + e[4] * t[5] - e[5] * t[4] + e[7] * t[1],
		e[2] * t[7] - e[4] * t[6] + e[6] * t[4] + e[7] * t[2],
		e[3] * t[7] + e[5] * t[6] - e[6] * t[5] + e[7] * t[3],
		e[4] * t[7] + e[7] * t[4],
		e[5] * t[7] + e[7] * t[5],
		e[6] * t[7] + e[7] * t[6],
		e[7] * t[7],
	],
	Fl = (e, t) =>
		e[0] * t[7] +
		e[1] * t[6] +
		e[2] * t[5] +
		e[3] * t[4] +
		e[4] * t[3] +
		e[5] * t[2] +
		e[6] * t[1] +
		e[7] * t[0],
	B8 = (e, t) => [
		t[0] * e[0] + t[2] * e[2] + t[3] * e[3] - t[6] * e[6],
		t[1] * e[0] +
			t[0] * e[1] -
			t[4] * e[2] +
			t[5] * e[3] +
			t[2] * e[4] -
			t[3] * e[5] -
			t[7] * e[6] -
			t[6] * e[7],
		t[2] * e[0] + t[0] * e[2] - t[6] * e[3] + t[3] * e[6],
		t[3] * e[0] + t[6] * e[2] + t[0] * e[3] - t[2] * e[6],
		t[4] * e[0] + t[7] * e[3] + t[0] * e[4] + t[3] * e[7],
		t[5] * e[0] + t[7] * e[2] + t[0] * e[5] + t[2] * e[7],
		t[6] * e[0] + t[0] * e[6],
		t[7] * e[0] + t[0] * e[7],
	],
	Ol = (e) =>
		Math.sqrt(Math.abs(e[0] * e[0] - e[2] * e[2] - e[3] * e[3] + e[6] * e[6])),
	C8 = (e) =>
		Math.sqrt(Math.abs(e[7] * e[7] - e[5] * e[5] - e[4] * e[4] + e[1] * e[1])),
	Or = (e) => {
		let t = Ol(e);
		if (t === 0 || t === 1) return e;
		let n = e[6] < 0 ? -1 : 1;
		return er(e, n / t);
	},
	K8 = (e) => {
		let t = C8(e);
		return t === 0 || t === 1 ? e : er(e, 1 / t);
	},
	Al = (e) => typeof e == "number",
	FY = Fr(1, 1),
	OY = Fr(1, 2),
	AY = Fr(1, 3),
	BY = Fr(1, 4),
	CY = Fr(1, 5),
	KY = Fr(1, 6),
	HY = Fr(1, 7);
E();
E();
var ls = (e, t, n) => Or([0, n, e, t, 0, 0, 0, 0]),
	bo = (e, t) => Or(cs(t, e)),
	H8 = (e, t) => B8(e, t),
	J8 = (e, t) => H8(bo(e, t), t);
var k8 = (e) => Math.sign(e[1]);
var Ar = ([e, t]) => [0, 0, 0, 0, t, e, 1, 0],
	Br = (e) => [e[5], e[4]],
	V8 = (e) => [0, 0, 0, 0, Math.abs(e[4]), Math.abs(e[5]), 1, 0],
	q8 = (e, t) => Or(Pl(e, t));
var Bl = (e, t) => Ol(cs(e, t)),
	tr = (e, t) => Fl(e, t);
E();
var Cl = (e) => [0, 0, 0, 0, e[4], e[5], 0, 0],
	G8 = (e, t) => K8([0, 0, 0, 0, t[4] - e[4], t[5] - e[5], 0, 0]);
E();
var Kl = (e, t) => A8(er(e, Math.sin(t / 2)), Math.cos(t / 2)),
	Z8 = (e) => [1, 0, 0, 0, -(0.5 * e[5]), 0.5 * e[4], 0, 0],
	W8 = (e, t) => {
		let n = 0.5 * t;
		return [1, 0, 0, 0, n * e[4], n * e[5], 0, 0];
	};
var z8 = (e, t) => er(t, e),
	Pt = (e, t) => Or(er(er(e, t), ho(e)));
E();
E();
var ry = (e, t) => {
		let [n, r, o, a] = t,
			{ x: i, y: s } = kc({ sceneX: n, sceneY: r }, e),
			{ x: c, y: l } = kc({ sceneX: o, sceneY: a }, e);
		return c - i > e.width || l - s > e.height;
	},
	oy = ({ scenePoint: e, viewportDimensions: t, zoom: n, offsets: r }) => {
		let o = (t.width - (r?.right ?? 0)) / 2 / n.value - e.x;
		o += (r?.left ?? 0) / 2 / n.value;
		let a = (t.height - (r?.bottom ?? 0)) / 2 / n.value - e.y;
		return (a += (r?.top ?? 0) / 2 / n.value), { scrollX: o, scrollY: a };
	},
	Hl = (e, t) => {
		if (((e = Q8(e)), !e.length)) return { scrollX: 0, scrollY: 0 };
		let [n, r, o, a] = Te(e);
		ry(t, [n, r, o, a]) &&
			([n, r, o, a] = Sl(e, Rr({ clientX: t.scrollX, clientY: t.scrollY }, t)));
		let i = (n + o) / 2,
			s = (r + a) / 2;
		return oy({
			scenePoint: { x: i, y: s },
			viewportDimensions: { width: t.width, height: t.height },
			zoom: t.zoom,
		});
	};
E();
var Jl = (e) => Ee(y1(e, 6), jf, e1),
	kl = (e) => Ee(Math.round(e), 1, 100),
	Yl = (e) => Ee(Math.round(e), 1, 100);
E();
var _e = [1, 0],
	qe = [0, 1],
	Ge = [-1, 0],
	Xe = [0, -1],
	Us = (e, t) => {
		let n = w1(Math.atan2(t[1] - e[1], t[0] - e[0]));
		return n >= 315 || n < 45
			? Xe
			: n >= 45 && n < 135
				? _e
				: n >= 135 && n < 225
					? qe
					: Ge;
	},
	nr = (e) => {
		let [t, n] = e,
			r = Math.abs(t),
			o = Math.abs(n);
		return t > o ? _e : t <= -o ? Ge : n > r ? qe : Xe;
	},
	Ft = (e, t) => e[0] === t[0] && e[1] === t[1],
	Vl = (e, t, n) => {
		let o = ss(t);
		if (e.type === "diamond") {
			if (n[0] < e.x) return Ge;
			if (n[1] < e.y) return Xe;
			if (n[0] > e.x + e.width) return _e;
			if (n[1] > e.y + e.height) return qe;
			let l = D(Rt(b(e.x + e.width / 2, e.y), o, 2), o, e.angle),
				d = D(Rt(b(e.x + e.width, e.y + e.height / 2), o, 2), o, e.angle),
				U = D(Rt(b(e.x + e.width / 2, e.y + e.height), o, 2), o, e.angle),
				u = D(Rt(b(e.x, e.y + e.height / 2), o, 2), o, e.angle);
			return Tr([l, d, o], n)
				? Us(l, d)
				: Tr([d, U, o], n)
					? Us(d, U)
					: Tr([U, u, o], n)
						? Us(U, u)
						: Us(u, l);
		}
		let a = Rt(b(t[0], t[1]), o, 2),
			i = Rt(b(t[2], t[1]), o, 2),
			s = Rt(b(t[0], t[3]), o, 2),
			c = Rt(b(t[2], t[3]), o, 2);
		return Tr([a, i, o], n)
			? Xe
			: Tr([i, c, o], n)
				? _e
				: Tr([c, s, o], n)
					? qe
					: Ge;
	},
	j8 = (e) => [
		e[0] === 0 ? 0 : e[0] > 0 ? -1 : 1,
		e[1] === 0 ? 0 : e[1] > 0 ? -1 : 1,
	];
var _V = (e) => !e[z.CTRL_OR_CMD],
	Gl = (e) => e.isBindingEnabled,
	fe = 5,
	r5 = 10,
	o5 = 4,
	cy = (e, t) => {
		let n = [];
		return (
			t.forEach((r) => {
				let o = e.getNonDeletedElement(r);
				o != null && n.push(o);
			}),
			n
		);
	},
	Xl = (e, t, n, r, o) => {
		let a = new Set(),
			i = new Set();
		e5(e, t, n, "start", a, i, r), e5(e, n, t, "end", a, i, r);
		let s = Array.from(i).filter((c) => !a.has(c));
		cy(o, s).forEach((c) => {
			J(c, {
				boundElements: c.boundElements?.filter(
					(l) => l.type !== "arrow" || l.id !== e.id,
				),
			});
		});
	},
	e5 = (e, t, n, r, o, a, i) => {
		if (t !== "keep") {
			if (t === null) {
				let s = py(e, r);
				s != null && a.add(s);
				return;
			}
			s5(e)
				? (n == null ||
						(n === "keep" ? !i5(e, t, r) : r === "start" || n.id !== t.id)) &&
					(fs(e, t, r, i), o.add(t.id))
				: (fs(e, t, r, i), o.add(t.id));
		}
	},
	ly = (e, t, n, r) => {
		let o = f5(e, t, n),
			a = t === "start" ? e.startBinding?.elementId : e.endBinding?.elementId;
		if (a) {
			let i = n.get(a);
			if (en(i) && u5(i, o, n, r)) return i;
		}
		return null;
	},
	a5 = (e, t, n) => ["start", "end"].map((r) => ly(e, r, t, n)),
	dy = (e, t, n, r, o, a) => {
		let s = e.points.length - 1,
			c = n.findIndex((u) => u === 0) > -1,
			l = n.findIndex((u) => u === s) > -1,
			d = c ? (t ? go(e, "start", r, o, a) : null) : go(e, "start", r, o, a),
			U = l ? (t ? go(e, "end", r, o, a) : null) : go(e, "end", r, o, a);
		return [d, U];
	},
	Uy = (e, t, n, r, o) => {
		let [a, i] = a5(e, t, o),
			s = a && r ? go(e, "start", t, n, o) : null,
			c = i && r ? go(e, "end", t, n, o) : null;
		return [s, c];
	},
	LV = (e, t, n, r, o, a, i) => {
		e.forEach((s) => {
			let [c, l] = a?.length ? dy(s, o, a ?? [], t, n, i) : Uy(s, t, n, o, i);
			Xl(s, c, l, t, r);
		});
	},
	DV = (e, t, n) =>
		e.length > 50
			? []
			: e
					.filter(oe)
					.flatMap((r) => a5(r, t, n))
					.filter((r) => r !== null)
					.filter((r) => e.filter((o) => o.id === r?.id).length === 0),
	SV = (e, t, n, r, o) => {
		t.startBoundElement != null && fs(e, t.startBoundElement, "start", r);
		let a = ar(n, o, r, t.zoom, se(e) && se(e));
		a !== null && (i5(e, a, "end") || fs(e, a, "end", r));
	},
	fy = (e, t) => {
		let n = e.gap,
			r = hs(t, t.width, t.height);
		return n > r && (n = r5 + o5), { ...e, gap: n };
	},
	fs = (e, t, n, r) => {
		if (!Q(e)) return;
		let o = {
			elementId: t.id,
			...fy(my(e, t, n, r), t),
			...(se(e) ? U5(e, t, n, r) : { fixedPoint: null }),
		};
		J(e, { [n === "start" ? "startBinding" : "endBinding"]: o }),
			j(t.boundElements || []).has(e.id) ||
				J(t, {
					boundElements: (t.boundElements || []).concat({
						id: e.id,
						type: "arrow",
					}),
				}),
			se(e) || Ot(t, r);
	},
	i5 = (e, t, n) => {
		let r = e[n === "start" ? "endBinding" : "startBinding"];
		return uy(e, r?.elementId, t);
	},
	uy = (e, t, n) => t === n.id && s5(e),
	s5 = (e) => e.points.length < 3,
	py = (e, t) => {
		let n = t === "start" ? "startBinding" : "endBinding",
			r = e[n];
		return r == null ? null : (J(e, { [n]: null }), r.elementId);
	},
	ar = (e, t, n, r, o) => Tl(t, (i) => en(i, !1) && u5(i, e, n, r, o)),
	my = (e, t, n, r) => {
		let o = n === "start" ? -1 : 1,
			a = o === -1 ? 0 : e.points.length - 1,
			i = a - o,
			s = W.getPointAtIndexGlobalCoordinates(e, a, r),
			c = W.getPointAtIndexGlobalCoordinates(e, i, r);
		return { focus: Ry(t, c, s, r), gap: Math.max(1, Eo(t, s, r)) };
	},
	Ot = (e, t, n) => {
		let {
				newSize: r,
				simultaneouslyUpdated: o,
				changedElements: a,
				zoom: i,
			} = n ?? {},
			s = by(o);
		en(e) &&
			us(t, e, (c) => {
				if (!oe(c) || c.isDeleted || !hy(c, e)) return;
				let l = {
					startBinding: t5(e, c.startBinding, r),
					endBinding: t5(e, c.endBinding, r),
				};
				if (s.has(c.id)) {
					J(c, l);
					return;
				}
				let d = ps(t, c, (u, p) => {
					if (
						u &&
						en(u) &&
						(p === "startBinding" || p === "endBinding") &&
						e.id === c[p]?.elementId
					) {
						let m = xy(c, p, l[p], u, t);
						if (m)
							return {
								index: p === "startBinding" ? 0 : c.points.length - 1,
								point: m,
							};
					}
					return null;
				}).filter((u) => u !== null);
				W.movePoints(
					c,
					d,
					t,
					{
						...(e.id === c.startBinding?.elementId
							? { startBinding: l.startBinding }
							: {}),
						...(e.id === c.endBinding?.elementId
							? { endBinding: l.endBinding }
							: {}),
					},
					{ changedElements: a, zoom: i },
				);
				let U = ee(c, t);
				U && !U.isDeleted && Cr(c, t, !1);
			});
	},
	hy = (e, t) =>
		e.startBinding?.elementId === t.id || e.endBinding?.elementId === t.id,
	by = (e) => new Set((e || []).map((t) => t.id)),
	c5 = (e, t, n, r, o, a, i) => {
		let s = nr(ae(t, e));
		return !n || !r
			? s
			: gy(a, n, o, i)
				? Vl(n, r, e)
				: nr(ae(e, b(n.x + n.width / 2, n.y + n.height / 2)));
	},
	gy = (e, t, n, r) => {
		let o = Eo(t, e, n),
			a = hs(t, t.width, t.height, r);
		return o > a ? null : o;
	},
	Zl = (e, t, n, r) => {
		let o = n && St(n);
		if (n && o) {
			let a = Vl(n, o, e),
				i = [
					...(ql(
						n,
						b(e[0], e[1] - 2 * n.height),
						b(e[0], e[1] + 2 * n.height),
						fe,
						r,
					) ?? []),
					...(ql(
						n,
						b(e[0] - 2 * n.width, e[1]),
						b(e[0] + 2 * n.width, e[1]),
						fe,
						r,
					) ?? []),
				],
				s = Ft(a, Ge) || Ft(a, _e),
				c = Math.abs(Eo(n, e, r)),
				l = s ? c < n.width * -0.1 : c < n.height * -0.1;
			return (
				i.sort((d, U) => Cc(d, e) - Cc(U, e)),
				l
					? Ey(t, n, o)
					: (i.filter((d) =>
							s ? Math.abs(e[1] - d[1]) < 0.1 : Math.abs(e[0] - d[0]) < 0.1,
						)[0] ?? e)
			);
		}
		return e;
	},
	Ey = (e, t, n) => {
		let r = ss(n),
			o = nr(ae(e, r));
		switch (!0) {
			case Ft(o, Xe):
				return D(b((n[0] + n[2]) / 2 + 0.1, n[1]), r, t.angle);
			case Ft(o, _e):
				return D(b(n[2], (n[1] + n[3]) / 2 + 0.1), r, t.angle);
			case Ft(o, qe):
				return D(b((n[0] + n[2]) / 2 - 0.1, n[3]), r, t.angle);
			default:
				return D(b(n[0], (n[1] + n[3]) / 2 - 0.1), r, t.angle);
		}
	},
	l5 = (e, t) => {
		let n = b(e.x + e.width / 2, e.y + e.height / 2),
			r = D(t, n, -e.angle);
		return r[0] < e.x && r[1] < e.y
			? r[1] - e.y > -fe
				? D(b(e.x - fe, e.y), n, e.angle)
				: D(b(e.x, e.y - fe), n, e.angle)
			: r[0] < e.x && r[1] > e.y + e.height
				? r[0] - e.x > -fe
					? D(b(e.x, e.y + e.height + fe), n, e.angle)
					: D(b(e.x - fe, e.y + e.height), n, e.angle)
				: r[0] > e.x + e.width && r[1] > e.y + e.height
					? r[0] - e.x < e.width + fe
						? D(b(e.x + e.width, e.y + e.height + fe), n, e.angle)
						: D(b(e.x + e.width + fe, e.y + e.height), n, e.angle)
					: r[0] > e.x + e.width && r[1] < e.y
						? r[0] - e.x < e.width + fe
							? D(b(e.x + e.width, e.y - fe), n, e.angle)
							: D(b(e.x + e.width + fe, e.y), n, e.angle)
						: t;
	},
	d5 = (e, t, n = 0.05) => {
		let { x: r, y: o, width: a, height: i, angle: s } = e,
			c = b(r + a / 2 - 0.1, o + i / 2 - 0.1),
			l = D(t, c, -s),
			d = Ee(n * i, 5, 80),
			U = Ee(n * a, 5, 80);
		return l[0] <= r + a / 2 && l[1] > c[1] - d && l[1] < c[1] + d
			? D(b(r - fe, c[1]), c, s)
			: l[1] <= o + i / 2 && l[0] > c[0] - U && l[0] < c[0] + U
				? D(b(c[0], o - fe), c, s)
				: l[0] >= r + a / 2 && l[1] > c[1] - d && l[1] < c[1] + d
					? D(b(r + a + fe, c[1]), c, s)
					: l[1] >= o + i / 2 && l[0] > c[0] - U && l[0] < c[0] + U
						? D(b(c[0], o + i + fe), c, s)
						: t;
	},
	xy = (e, t, n, r, o) => {
		if (n == null || (n.elementId !== r.id && e.points.length > 2)) return null;
		let a = t === "startBinding" ? -1 : 1,
			i = a === -1 ? 0 : e.points.length - 1;
		if (se(e) && Mr(n)) {
			let U =
					ya(n.fixedPoint) ??
					U5(e, r, t === "startBinding" ? "start" : "end", o).fixedPoint,
				u = b(r.x + r.width / 2, r.y + r.height / 2),
				p = b(r.x + U[0] * r.width, r.y + U[1] * r.height),
				m = D(p, u, r.angle);
			return W.pointFromAbsoluteCoords(e, m, o);
		}
		let s = i - a,
			c = W.getPointAtIndexGlobalCoordinates(e, s, o),
			l = vy(r, n.focus, c, o),
			d;
		if (n.gap === 0) d = l;
		else {
			let U = ql(r, c, l, n.gap, o);
			!U || U.length === 0 ? (d = l) : (d = U[0]);
		}
		return W.pointFromAbsoluteCoords(e, d, o);
	},
	U5 = (e, t, n, r) => {
		let o = [t.x, t.y, t.x + t.width, t.y + t.height],
			a = n === "start" ? 0 : e.points.length - 1,
			i = W.getPointAtIndexGlobalCoordinates(e, a, r),
			s = W.getPointAtIndexGlobalCoordinates(e, a, r),
			c = Zl(i, s, t, r),
			l = b(o[0] + (o[2] - o[0]) / 2, o[1] + (o[3] - o[1]) / 2),
			d = D(c, l, -t.angle);
		return {
			fixedPoint: ya([(d[0] - t.x) / t.width, (d[1] - t.y) / t.height]),
		};
	},
	t5 = (e, t, n) => {
		if (t == null || n == null) return t;
		let { width: r, height: o } = n,
			{ width: a, height: i } = e,
			s = Math.max(1, Math.min(hs(e, r, o), t.gap * (r < o ? r / a : o / i)));
		return { ...t, gap: s };
	},
	go = (e, t, n, r, o) => ar(f5(e, t, n), r, n, o),
	f5 = (e, t, n) => {
		let r = t === "start" ? 0 : -1;
		return yn(W.getPointAtIndexGlobalCoordinates(e, r, n));
	},
	$V = (e, t, n, r) => {
		let o = new Set(),
			a = new Set(),
			i = r === "duplicatesServeAsOld",
			s = new Map([...n].map(([c, l]) => [l, c]));
		t.forEach((c) => {
			let { boundElements: l } = c;
			if (
				(l != null &&
					l.length > 0 &&
					(l.forEach((d) => {
						i && !n.has(d.id) && o.add(d.id);
					}),
					a.add(n.get(c.id))),
				ra(c))
			) {
				if (c.startBinding != null) {
					let { elementId: d } = c.startBinding;
					i && !n.has(d) && a.add(d);
				}
				if (c.endBinding != null) {
					let { elementId: d } = c.endBinding;
					i && !n.has(d) && a.add(d);
				}
				(c.startBinding != null || c.endBinding != null) && o.add(n.get(c.id));
			}
		}),
			e
				.filter(({ id: c }) => o.has(c))
				.forEach((c) => {
					let { startBinding: l, endBinding: d } = c;
					J(c, { startBinding: n5(l, n), endBinding: n5(d, n) });
				}),
			e
				.filter(({ id: c }) => a.has(c))
				.forEach((c) => {
					let l = s.get(c.id),
						d = e.find(({ id: U }) => U === l)?.boundElements;
					d &&
						d.length > 0 &&
						J(c, {
							boundElements: d.map((U) =>
								n.has(U.id) ? { id: n.get(U.id), type: U.type } : U,
							),
						});
				});
	},
	n5 = (e, t) =>
		e == null ? null : { ...e, elementId: t.get(e.elementId) ?? e.elementId },
	NV = (e, t) => {
		let n = j(e);
		for (let r of t) rr.unbindAffected(n, r, J), or.unbindAffected(n, r, J);
	},
	xa = (e, t, n = []) => {
		if (!e) return null;
		let r = e.filter((o) => !t.has(o.id));
		return r.push(...n.map((o) => ({ id: o.id, type: o.type }))), r;
	},
	u5 = (e, { x: t, y: n }, r, o, a) => {
		let i = hs(e, e.width, e.height, o),
			s = rs(e, r);
		return ha(b(t, n), s, i) || (a === !0 && jn(b(t, n), St(e)));
	},
	hs = (e, t, n, r) => {
		let o = r?.value && r.value < 1 ? r.value : 1,
			i = (e.type === "diamond" ? 1 / Math.sqrt(2) : 1) * Math.min(t, n);
		return Math.max(16, Math.min(0.25 * i, 32), r5 / o + o5);
	},
	Eo = (e, t, n) => {
		switch (e.type) {
			case "rectangle":
			case "image":
			case "text":
			case "iframe":
			case "embeddable":
			case "frame":
			case "magicframe":
				return yy(e, t, n);
			case "diamond":
				return wy(e, t, n);
			case "ellipse":
				return Iy(e, t, n);
		}
	},
	yy = (e, t, n) => {
		let [, r, o, a] = Wl(e, t, n);
		return Math.max(tr(r, ls(0, 1, -a)), tr(r, ls(1, 0, -o)));
	},
	wy = (e, t, n) => {
		let [, r, o, a] = Wl(e, t, n),
			i = ls(a, o, -a * o);
		return tr(r, i);
	},
	Iy = (e, t, n) => {
		let [r, o] = Ty(e, t, n);
		return -k8(o) * tr(r, o);
	},
	Ty = (e, t, n) => {
		let [, r, o, a] = Wl(e, t, n),
			[i, s] = Br(r),
			c = 0.707,
			l = 0.707,
			d = o,
			U = a;
		[0, 1, 2, 3].forEach((m) => {
			let h = d * c,
				g = U * l,
				x = ((d * d - U * U) * c ** 3) / d,
				y = ((U * U - d * d) * l ** 3) / U,
				w = h - x,
				T = g - y,
				I = i - x,
				_ = s - y,
				L = Math.hypot(T, w),
				M = Math.hypot(_, I);
			(c = Math.min(1, Math.max(0, ((I * L) / M + x) / d))),
				(l = Math.min(1, Math.max(0, ((_ * L) / M + y) / U)));
			let N = Math.hypot(l, c);
			(c /= N), (l /= N);
		});
		let u = Ke(d * c, U * l),
			p = J8(r, u);
		return [r, p];
	},
	Wl = (e, t, n) => {
		let r = Ar(t),
			[o, a, i, s] = H(e, n),
			c = Ql(o, a, i, s),
			l = Kl(c, e.angle),
			d = Pt(l, r),
			U = Nl(d, Cl(c)),
			u = V8(U),
			p = O8(e.x, e.y),
			m = Nl(d, p),
			h = (i - o) / 2,
			g = (s - a) / 2;
		return [m, u, h, g];
	},
	zl = (e, t) => {
		let [n, r, o, a] = H(e, t),
			i = Ql(n, r, o, a),
			s = Kl(i, e.angle),
			c = ho(Z8(Cl(i)));
		return z8(s, c);
	},
	Ql = (e, t, n, r) => Ke((e + n) / 2, (t + r) / 2),
	Ry = (e, t, n, r) => {
		let o = zl(e, r),
			a = Pt(o, Ar(t)),
			i = Pt(o, Ar(n)),
			s = bo(a, i),
			c = e.height / e.width,
			l = e.width / 2,
			d = e.height / 2,
			U = s[2],
			u = s[3],
			p = s[1],
			m = Math.abs(u),
			h = Math.abs(U),
			g;
		switch (e.type) {
			case "rectangle":
			case "image":
			case "text":
			case "iframe":
			case "embeddable":
			case "frame":
			case "magicframe":
				g = p / (l * (h + c * m));
				break;
			case "diamond":
				g = m < h ? p / (h * l) : p / (m * d);
				break;
			case "ellipse":
				g = p / (l * Math.sqrt(U ** 2 + c ** 2 * u ** 2));
				break;
		}
		return g || 0;
	},
	vy = (e, t, n, r) => {
		if (t === 0) {
			let [c, l, d, U] = H(e, r),
				u = Ql(c, l, d, U);
			return Br(u);
		}
		let o = zl(e, r),
			a = Pt(o, Ar(n)),
			i = ho(o),
			s;
		switch (e.type) {
			case "rectangle":
			case "image":
			case "text":
			case "diamond":
			case "iframe":
			case "embeddable":
			case "frame":
			case "magicframe":
				s = Ny(e, t, a);
				break;
			case "ellipse":
				s = $y(e, t, a);
				break;
		}
		return Br(Pt(i, s));
	},
	ql = (e, t, n, r = 0, o) => {
		if (k1(e)) return l8(e, re(t, n), r);
		let a = zl(e, o),
			i = Pt(a, Ar(t)),
			s = Pt(a, Ar(n)),
			c = bo(i, s),
			l = ho(a);
		return My(e, c, i, r).map((U) => Br(Pt(l, U)));
	},
	My = (e, t, n, r = 0) => {
		let o;
		switch (e.type) {
			case "rectangle":
			case "image":
			case "text":
			case "diamond":
			case "iframe":
			case "embeddable":
			case "frame":
			case "magicframe":
				let i = p5(e);
				o = i
					.flatMap((s, c) => {
						let l = [s, i[(c + 1) % 4]];
						return _y(t, Ly(l, r));
					})
					.concat(i.flatMap((s) => Sy(s, r, t)));
				break;
			case "ellipse":
				o = Dy(e, r, t);
				break;
		}
		if (o.length < 2) return [];
		let a = o.sort((i, s) => Bl(i, n) - Bl(s, n));
		return [a[0], a[a.length - 1]];
	},
	p5 = (e, t = 1) => {
		let n = (t * e.width) / 2,
			r = (t * e.height) / 2;
		switch (e.type) {
			case "rectangle":
			case "image":
			case "text":
			case "iframe":
			case "embeddable":
			case "frame":
			case "magicframe":
				return [Ke(n, r), Ke(n, -r), Ke(-n, -r), Ke(-n, r)];
			case "diamond":
				return [Ke(0, r), Ke(n, 0), Ke(0, -r), Ke(-n, 0)];
		}
	},
	_y = (e, t) => {
		let [n, r] = t,
			o = tr(n, e),
			a = tr(r, e);
		return o * a >= 0 ? [] : [q8(e, bo(n, r))];
	},
	Ly = (e, t) => {
		let [n, r] = e,
			o = W8(G8(n, r), t);
		return [Pt(o, n), Pt(o, r)];
	},
	Dy = (e, t, n) => {
		let r = e.width / 2 + t,
			o = e.height / 2 + t,
			a = n[2],
			i = n[3],
			s = n[1],
			c = r * r * a * a + o * o * i * i,
			l = c - s * s;
		if (c === 0 || l <= 0) return [];
		let d = Math.sqrt(l),
			U = -r * r * a * s,
			u = -o * o * i * s;
		return [
			Ke((U + r * o * i * d) / c, (u - r * o * a * d) / c),
			Ke((U - r * o * i * d) / c, (u + r * o * a * d) / c),
		];
	},
	Sy = (e, t, n) => {
		if (t === 0) return tr(n, e) === 0 ? [e] : [];
		let r = n[2],
			o = n[3],
			a = n[1],
			[i, s] = Br(e),
			c = t,
			l = r * r + o * o,
			d = c * c * l - (r * i + o * s + a) ** 2;
		if (l === 0 || d <= 0) return [];
		let U = Math.sqrt(d),
			u = i * o * o - s * r * o - r * a,
			p = s * r * r - i * r * o - o * a;
		return [
			Ke((u + o * U) / l, (p - r * U) / l),
			Ke((u - o * U) / l, (p + r * U) / l),
		];
	},
	$y = (e, t, n) => {
		let r = Math.abs(t),
			o = (e.width * r) / 2,
			a = (e.height * r) / 2,
			i = Math.sign(t),
			[s, c] = Br(n),
			l = c === 0 ? 1e-4 : c,
			d = s ** 2 * a ** 2 + l ** 2 * o ** 2,
			U =
				(-s * a ** 2 + i * l * Math.sqrt(Math.max(0, d - o ** 2 * a ** 2))) / d,
			u = (-U * s - 1) / l;
		u === 0 && (u = (Object.is(u, -0) ? -1 : 1) * 0.01);
		let p = -(o ** 2 * U) / (u ** 2 * a ** 2 + U ** 2 * o ** 2);
		return Ke(p, (-U * p - 1) / u);
	},
	Ny = (e, t, n) => {
		let r = Math.abs(t),
			o = Math.sign(t),
			a = p5(e, r),
			i = 0,
			s = null;
		return (
			a.forEach((c) => {
				let l = o * bo(n, c)[1];
				l > i && ((i = l), (s = c));
			}),
			s
		);
	},
	m5 = new Set([
		"boundElements",
		"frameId",
		"containerId",
		"startBinding",
		"endBinding",
	]),
	us = (e, t, n) => {
		en(t) &&
			(t.boundElements?.slice() ?? []).forEach(({ id: o }) => {
				n(e.get(o), "boundElements", o);
			});
	},
	ps = (e, t, n) => {
		let r = [];
		if (t.frameId) {
			let o = t.frameId;
			r.push(n(e.get(o), "frameId", o));
		}
		if (Me(t)) {
			let o = t.containerId;
			r.push(n(e.get(o), "containerId", o));
		}
		if (Q(t)) {
			if (t.startBinding) {
				let o = t.startBinding.elementId;
				r.push(n(e.get(o), "startBinding", o));
			}
			if (t.endBinding) {
				let o = t.endBinding.elementId;
				r.push(n(e.get(o), "endBinding", o));
			}
		}
		return r;
	},
	rr = class {
		static unbindAffected(t, n, r) {
			n &&
				ps(t, n, (o) => {
					!o ||
						o.isDeleted ||
						us(t, o, (a, i, s) => {
							s === n.id &&
								r(o, { boundElements: xa(o.boundElements, new Set([s])) });
						});
				});
		}
		static rebindAffected = (t, n, r) => {
			!n ||
				n.isDeleted ||
				ps(t, n, (o, a) => {
					if (!o || o.isDeleted) {
						r(n, { [a]: null });
						return;
					}
					a !== "frameId" &&
						(o.boundElements?.find((i) => i.id === n.id) ||
							(Q(n) &&
								r(o, {
									boundElements: xa(o.boundElements, new Set(), new Array(n)),
								}),
							X(n) &&
								(o.boundElements?.find((i) => i.type === "text")
									? r(n, { [a]: null })
									: r(o, {
											boundElements: xa(
												o.boundElements,
												new Set(),
												new Array(n),
											),
										}))));
				});
		};
	},
	or = class {
		static unbindAffected(t, n, r) {
			n &&
				us(t, n, (o) => {
					!o ||
						o.isDeleted ||
						ps(t, o, (a, i, s) => {
							s === n.id && r(o, { [i]: null });
						});
				});
		}
		static rebindAffected = (t, n, r) => {
			!n ||
				n.isDeleted ||
				us(t, n, (o, a, i) => {
					if (!o || o.isDeleted) {
						r(n, { boundElements: xa(n.boundElements, new Set([i])) });
						return;
					}
					X(o) &&
						((n.boundElements?.slice() ?? [])
							.reverse()
							.find((c) => c.type === "text")?.id === o.id
							? o.containerId !== n.id && r(o, { containerId: n.id })
							: (o.containerId !== null && r(o, { containerId: null }),
								r(n, { boundElements: xa(n.boundElements, new Set([o.id])) })));
				});
		};
	},
	ms = (e, t) => {
		let [n, r] = ya(e);
		return D(
			b(t.x + t.width * n, t.y + t.height * r),
			b(t.x + t.width / 2, t.y + t.height / 2),
			t.angle,
		);
	},
	Py = (e, t) => {
		let n = e.startBinding && t.get(e.startBinding.elementId),
			r = e.endBinding && t.get(e.endBinding.elementId),
			o =
				n && e.startBinding
					? ms(e.startBinding.fixedPoint, n)
					: b(e.x + e.points[0][0], e.y + e.points[0][1]),
			a =
				r && e.endBinding
					? ms(e.endBinding.fixedPoint, r)
					: b(
							e.x + e.points[e.points.length - 1][0],
							e.y + e.points[e.points.length - 1][1],
						);
		return [o, a];
	},
	h5 = (e, t) => {
		let [n, r] = Py(e, t);
		return [
			W.pointFromAbsoluteCoords(e, n, t),
			W.pointFromAbsoluteCoords(e, r, t),
		];
	},
	ya = (e) =>
		e && (e[0] === 0.5 || e[1] === 0.5)
			? e.map((t) => (t === 0.5 ? 0.5001 : t))
			: e;
E();
E();
var wa = class {
	constructor(t) {
		this.scoreFunction = t;
	}
	content = [];
	sinkDown(t) {
		let n = this.content[t];
		for (; t > 0; ) {
			let r = ((t + 1) >> 1) - 1,
				o = this.content[r];
			if (this.scoreFunction(n) < this.scoreFunction(o))
				(this.content[r] = n), (this.content[t] = o), (t = r);
			else break;
		}
	}
	bubbleUp(t) {
		let n = this.content.length,
			r = this.content[t],
			o = this.scoreFunction(r);
		for (;;) {
			let a = (t + 1) << 1,
				i = a - 1,
				s = null,
				c = 0;
			if (i < n) {
				let l = this.content[i];
				(c = this.scoreFunction(l)), c < o && (s = i);
			}
			if (a < n) {
				let l = this.content[a];
				this.scoreFunction(l) < (s === null ? o : c) && (s = a);
			}
			if (s !== null)
				(this.content[t] = this.content[s]), (this.content[s] = r), (t = s);
			else break;
		}
	}
	push(t) {
		this.content.push(t), this.sinkDown(this.content.length - 1);
	}
	pop() {
		if (this.content.length === 0) return null;
		let t = this.content[0],
			n = this.content.pop();
		return (
			this.content.length > 0 && ((this.content[0] = n), this.bubbleUp(0)), t
		);
	}
	remove(t) {
		if (this.content.length === 0) return;
		let n = this.content.indexOf(t),
			r = this.content.pop();
		n < this.content.length &&
			((this.content[n] = r),
			this.scoreFunction(r) < this.scoreFunction(t)
				? this.sinkDown(n)
				: this.bubbleUp(n));
	}
	size() {
		return this.content.length;
	}
	rescoreElement(t) {
		this.sinkDown(this.content.indexOf(t));
	}
};
var on = 40,
	gs = (e, t, n, r, o, a) => {
		let i = Fy(e, t, n, r, a);
		i
			? J(e, { ...o, ...i, angle: 0 }, a?.informMutation)
			: console.error("Elbow arrow cannot find a route");
	},
	Fy = (e, t, n, r, o) => {
		let a = Ir(Ir(n[0], De(e.x, e.y)), r),
			i = Ir(Ir(n[n.length - 1], De(e.x, e.y)), r),
			s = e.startBinding && g5(e.startBinding.elementId, t),
			c = e.endBinding && g5(e.endBinding.elementId, t),
			[l, d] = o?.isDragging ? Vy(a, i, t, o?.zoom) : [s, c],
			U = E5(e.startBinding?.fixedPoint, a, i, t, s, l, o?.isDragging),
			u = E5(e.endBinding?.fixedPoint, i, a, t, c, d, o?.isDragging),
			p = y5(U, u, t, l, a),
			m = y5(u, U, t, d, i),
			h = [U[0] - 2, U[1] - 2, U[0] + 2, U[1] + 2],
			g = [u[0] - 2, u[1] - 2, u[0] + 2, u[1] + 2],
			x = l ? St(l, ir(p, e.startArrowhead ? fe * 6 : fe * 2, 1)) : h,
			y = d ? St(d, ir(m, e.endArrowhead ? fe * 6 : fe * 2, 1)) : g,
			w =
				jn(U, d ? St(d, ir(m, on, on)) : g) ||
				jn(u, l ? St(l, ir(p, on, on)) : h),
			T = I5(w ? [h, g] : [x, y]),
			I = By(
				w ? h : x,
				w ? g : y,
				T,
				w
					? ir(p, !l && !d ? 0 : on, 0)
					: ir(p, !l && !d ? 0 : on - (e.startArrowhead ? fe * 6 : fe * 2), on),
				w
					? ir(m, !l && !d ? 0 : on, 0)
					: ir(m, !l && !d ? 0 : on - (e.endArrowhead ? fe * 6 : fe * 2), on),
				w,
				l && St(l),
				d && St(d),
			),
			_ = b5(I[0], p, U),
			L = b5(I[1], m, u),
			M = Cy(I, _ || U, p, L || u, m, T),
			N = _ && bs(_, M),
			$ = L && bs(L, M),
			S = bs(u, M);
		S && d && (S.closed = !0);
		let P = bs(U, M);
		P && e.startBinding && (P.closed = !0);
		let A = N && $ && (jn(N.pos, I[1]) || jn($.pos, I[0])),
			k = Oy(N || P, $ || S, M, p || _e, m || _e, A ? [] : I);
		if (k) {
			let K = k.map((q) => [q.pos[0], q.pos[1]]);
			return N && K.unshift(U), $ && K.push(u), Jy(ky(K), 0, 0);
		}
		return null;
	},
	ir = (e, t, n) => {
		switch (e) {
			case Xe:
				return [t, n, n, n];
			case _e:
				return [n, t, n, n];
			case qe:
				return [n, n, t, n];
		}
		return [n, n, n, t];
	},
	Oy = (e, t, n, r, o, a) => {
		let i = jl(e.pos, t.pos),
			s = new wa((c) => c.f);
		for (s.push(e); s.size() > 0; ) {
			let c = s.pop();
			if (!c || c.closed) continue;
			if (c === t) return Ay(e, c);
			c.closed = !0;
			let l = Hy(c.addr, n);
			for (let d = 0; d < 4; d++) {
				let U = l[d];
				if (!U || U.closed) continue;
				let u = Rt(U.pos, c.pos, 0.5);
				if (C1(...a.map((T) => jn(u, T)))) continue;
				let p = Yy(d),
					m = c.parent ? nr(ae(c.pos, c.parent.pos)) : r,
					h = j8(m);
				if (
					Ft(h, p) ||
					(w5(e.addr, U.addr) && Ft(p, r)) ||
					(w5(t.addr, U.addr) && Ft(p, o))
				)
					continue;
				let x = m !== p,
					y = c.g + jl(U.pos, c.pos) + (x ? Math.pow(i, 3) : 0),
					w = U.visited;
				if (!w || y < U.g) {
					let T = Ky(U, t, p, o);
					(U.visited = !0),
						(U.parent = c),
						(U.h = jl(t.pos, U.pos) + T * Math.pow(i, 2)),
						(U.g = y),
						(U.f = U.g + U.h),
						w ? s.rescoreElement(U) : s.push(U);
				}
			}
		}
		return null;
	},
	Ay = (e, t) => {
		let n = t,
			r = [];
		for (; n.parent; ) r.unshift(n), (n = n.parent);
		return r.unshift(e), r;
	},
	jl = (e, t) => Math.abs(e[0] - t[0]) + Math.abs(e[1] - t[1]),
	By = (e, t, n, r, o, a, i, s) => {
		let c = i ?? e,
			l = s ?? t,
			[d, U, u, p] = r ?? [0, 0, 0, 0],
			[m, h, g, x] = o ?? [0, 0, 0, 0],
			y = [
				e[0] > t[2]
					? e[1] > t[3] || e[3] < t[1]
						? Math.min((c[0] + l[2]) / 2, e[0] - p)
						: (c[0] + l[2]) / 2
					: e[0] > t[0]
						? e[0] - p
						: n[0] - p,
				e[1] > t[3]
					? e[0] > t[2] || e[2] < t[0]
						? Math.min((c[1] + l[3]) / 2, e[1] - d)
						: (c[1] + l[3]) / 2
					: e[1] > t[1]
						? e[1] - d
						: n[1] - d,
				e[2] < t[0]
					? e[1] > t[3] || e[3] < t[1]
						? Math.max((c[2] + l[0]) / 2, e[2] + U)
						: (c[2] + l[0]) / 2
					: e[2] < t[2]
						? e[2] + U
						: n[2] + U,
				e[3] < t[1]
					? e[0] > t[2] || e[2] < t[0]
						? Math.max((c[3] + l[1]) / 2, e[3] + u)
						: (c[3] + l[1]) / 2
					: e[3] < t[3]
						? e[3] + u
						: n[3] + u,
			],
			w = [
				t[0] > e[2]
					? t[1] > e[3] || t[3] < e[1]
						? Math.min((l[0] + c[2]) / 2, t[0] - x)
						: (l[0] + c[2]) / 2
					: t[0] > e[0]
						? t[0] - x
						: n[0] - x,
				t[1] > e[3]
					? t[0] > e[2] || t[2] < e[0]
						? Math.min((l[1] + c[3]) / 2, t[1] - m)
						: (l[1] + c[3]) / 2
					: t[1] > e[1]
						? t[1] - m
						: n[1] - m,
				t[2] < e[0]
					? t[1] > e[3] || t[3] < e[1]
						? Math.max((l[2] + c[0]) / 2, t[2] + h)
						: (l[2] + c[0]) / 2
					: t[2] < e[2]
						? t[2] + h
						: n[2] + h,
				t[3] < e[1]
					? t[0] > e[2] || t[2] < e[0]
						? Math.max((l[3] + c[1]) / 2, t[3] + g)
						: (l[3] + c[1]) / 2
					: t[3] < e[3]
						? t[3] + g
						: n[3] + g,
			],
			T = I5([y, w]);
		if (
			!a &&
			y[2] - y[0] + w[2] - w[0] > T[2] - T[0] + 1e-11 &&
			y[3] - y[1] + w[3] - w[1] > T[3] - T[1] + 1e-11
		) {
			let [I, _] = [(w[0] + w[2]) / 2, (w[1] + w[3]) / 2];
			if (t[0] > e[2] && e[1] > t[3]) {
				let L = y[2] + (w[0] - y[2]) / 2,
					M = w[3] + (y[1] - w[3]) / 2;
				return Ut(De(e[2] - I, e[1] - _), De(e[0] - I, e[3] - _)) > 0
					? [
							[y[0], y[1], L, y[3]],
							[L, w[1], w[2], w[3]],
						]
					: [
							[y[0], M, y[2], y[3]],
							[w[0], w[1], w[2], M],
						];
			} else if (e[2] < t[0] && e[3] < t[1]) {
				let L = y[2] + (w[0] - y[2]) / 2,
					M = y[3] + (w[1] - y[3]) / 2;
				return Ut(De(e[0] - I, e[1] - _), De(e[2] - I, e[3] - _)) > 0
					? [
							[y[0], y[1], y[2], M],
							[w[0], M, w[2], w[3]],
						]
					: [
							[y[0], y[1], L, y[3]],
							[L, w[1], w[2], w[3]],
						];
			} else if (e[0] > t[2] && e[3] < t[1]) {
				let L = w[2] + (y[0] - w[2]) / 2,
					M = y[3] + (w[1] - y[3]) / 2;
				return Ut(De(e[2] - I, e[1] - _), De(e[0] - I, e[3] - _)) > 0
					? [
							[L, y[1], y[2], y[3]],
							[w[0], w[1], L, w[3]],
						]
					: [
							[y[0], y[1], y[2], M],
							[w[0], M, w[2], w[3]],
						];
			} else if (e[0] > t[2] && e[1] > t[3]) {
				let L = w[2] + (y[0] - w[2]) / 2,
					M = w[3] + (y[1] - w[3]) / 2;
				return Ut(De(e[0] - I, e[1] - _), De(e[2] - I, e[3] - _)) > 0
					? [
							[L, y[1], y[2], y[3]],
							[w[0], w[1], L, w[3]],
						]
					: [
							[y[0], M, y[2], y[3]],
							[w[0], w[1], w[2], M],
						];
			}
		}
		return [y, w];
	},
	Cy = (e, t, n, r, o, a) => {
		let i = new Set(),
			s = new Set();
		n === Ge || n === _e ? s.add(t[1]) : i.add(t[0]),
			o === Ge || o === _e ? s.add(r[1]) : i.add(r[0]),
			e.forEach((d) => {
				i.add(d[0]), i.add(d[2]), s.add(d[1]), s.add(d[3]);
			}),
			i.add(a[0]),
			i.add(a[2]),
			s.add(a[1]),
			s.add(a[3]);
		let c = Array.from(s).sort((d, U) => d - U),
			l = Array.from(i).sort((d, U) => d - U);
		return {
			row: c.length,
			col: l.length,
			data: c.flatMap((d, U) =>
				l.map((u, p) => ({
					f: 0,
					g: 0,
					h: 0,
					closed: !1,
					visited: !1,
					parent: null,
					addr: [p, U],
					pos: [u, d],
				})),
			),
		};
	},
	b5 = (e, t, n) => {
		switch (t) {
			case Xe:
				return b(n[0], e[1]);
			case _e:
				return b(e[2], n[1]);
			case qe:
				return b(n[0], e[3]);
		}
		return b(e[0], n[1]);
	},
	Ky = (e, t, n, r) => {
		if (r === _e)
			switch (n) {
				case _e:
					return e.pos[0] >= t.pos[0] ? 4 : e.pos[1] === t.pos[1] ? 0 : 2;
				case Xe:
					return e.pos[1] > t.pos[1] && e.pos[0] < t.pos[0] ? 1 : 3;
				case qe:
					return e.pos[1] < t.pos[1] && e.pos[0] < t.pos[0] ? 1 : 3;
				case Ge:
					return e.pos[1] === t.pos[1] ? 4 : 2;
			}
		else if (r === Ge)
			switch (n) {
				case _e:
					return e.pos[1] === t.pos[1] ? 4 : 2;
				case Xe:
					return e.pos[1] > t.pos[1] && e.pos[0] > t.pos[0] ? 1 : 3;
				case qe:
					return e.pos[1] < t.pos[1] && e.pos[0] > t.pos[0] ? 1 : 3;
				case Ge:
					return e.pos[0] <= t.pos[0] ? 4 : e.pos[1] === t.pos[1] ? 0 : 2;
			}
		else if (r === Xe)
			switch (n) {
				case _e:
					return e.pos[1] > t.pos[1] && e.pos[0] < t.pos[0] ? 1 : 3;
				case Xe:
					return e.pos[1] >= t.pos[1] ? 4 : e.pos[0] === t.pos[0] ? 0 : 2;
				case qe:
					return e.pos[0] === t.pos[0] ? 4 : 2;
				case Ge:
					return e.pos[1] > t.pos[1] && e.pos[0] > t.pos[0] ? 1 : 3;
			}
		else if (r === qe)
			switch (n) {
				case _e:
					return e.pos[1] < t.pos[1] && e.pos[0] < t.pos[0] ? 1 : 3;
				case Xe:
					return e.pos[0] === t.pos[0] ? 4 : 2;
				case qe:
					return e.pos[1] <= t.pos[1] ? 4 : e.pos[0] === t.pos[0] ? 0 : 2;
				case Ge:
					return e.pos[1] < t.pos[1] && e.pos[0] > t.pos[0] ? 1 : 3;
			}
		return 0;
	},
	Hy = ([e, t], n) => [
		Ia([e, t - 1], n),
		Ia([e + 1, t], n),
		Ia([e, t + 1], n),
		Ia([e - 1, t], n),
	],
	Ia = ([e, t], n) =>
		e < 0 || e >= n.col || t < 0 || t >= n.row
			? null
			: (n.data[t * n.col + e] ?? null),
	bs = (e, t) => {
		for (let n = 0; n < t.col; n++)
			for (let r = 0; r < t.row; r++) {
				let o = Ia([n, r], t);
				if (o && e[0] === o.pos[0] && e[1] === o.pos[1]) return o;
			}
		return null;
	},
	I5 = (e) => [
		Math.min(...e.map((t) => t[0])),
		Math.min(...e.map((t) => t[1])),
		Math.max(...e.map((t) => t[2])),
		Math.max(...e.map((t) => t[3])),
	],
	g5 = (e, t) => {
		let n = t.get(e);
		return n && en(n) ? n : null;
	},
	Jy = (e, t, n) => {
		let r = e[0][0],
			o = e[0][1],
			a = e.map((i) => Ir(i, Qe(ae(e[0]), -1)));
		return { points: a, x: r + (t ?? 0), y: o + (n ?? 0), ...Pr(a) };
	},
	ky = (e) =>
		e
			.slice(2)
			.reduce(
				(t, n) =>
					Ft(
						nr(ae(t[t.length - 1], t[t.length - 2])),
						nr(ae(n, t[t.length - 1])),
					)
						? [...t.slice(0, -1), n]
						: [...t, n],
				[e[0] ?? [0, 0], e[1] ?? [1, 0]],
			),
	Yy = (e) => {
		switch (e) {
			case 0:
				return Xe;
			case 1:
				return _e;
			case 2:
				return qe;
		}
		return Ge;
	},
	E5 = (e, t, n, r, o, a, i) => {
		if (i) {
			if (a) {
				let s = x5(t, n, a, r);
				return d5(a, s);
			}
			return t;
		}
		if (o) {
			let s = ms(e || [0, 0], o);
			return Math.abs(Eo(o, s, r) - fe) > 0.01 ? x5(t, n, o, r) : s;
		}
		return t;
	},
	x5 = (e, t, n, r) => Zl(J1(n) ? l5(n, e) : e, t, n, r),
	y5 = (e, t, n, r, o) =>
		c5(e, t, r, r && St(r, Array(4).fill(Eo(r, e, n))), n, o),
	Vy = (e, t, n, r) => {
		let o = Be(new Map([...n].filter((i) => !i[1].isDeleted))),
			a = Array.from(n.values());
		return [ar(yn(e), a, o, r, !0), ar(yn(t), a, o, r, !0)];
	},
	w5 = (e, t) => e[0] === t[0] && e[1] === t[1];
E();
E();
var qy = (e, t, n) => {
		let r = n.reduce(
			(o, a) => (a.groupIds.includes(e) && (o[a.id] = !0), o),
			{},
		);
		return Object.keys(r).length < 2
			? t.selectedGroupIds[e] || t.editingGroupId === e
				? {
						selectedElementIds: t.selectedElementIds,
						selectedGroupIds: { ...t.selectedGroupIds, [e]: !1 },
						editingGroupId: null,
					}
				: t
			: {
					editingGroupId: t.editingGroupId,
					selectedGroupIds: { ...t.selectedGroupIds, [e]: !0 },
					selectedElementIds: { ...t.selectedElementIds, ...r },
				};
	},
	QV = (function () {
		let e = null,
			t = null,
			n = null,
			r = (a, i, s, c) => {
				if (
					n !== void 0 &&
					i === t &&
					a === e &&
					s.editingGroupId === n?.editingGroupId
				)
					return n;
				let l = {};
				for (let u of a) {
					let p = u.groupIds;
					if (s.editingGroupId) {
						let m = p.indexOf(s.editingGroupId);
						m > -1 && (p = p.slice(0, m));
					}
					if (p.length > 0) {
						let m = p[p.length - 1];
						l[m] = !0;
					}
				}
				let d = {},
					U = i.reduce((u, p) => {
						let m = p.groupIds.find((h) => l[h]);
						return (
							m &&
								((u[p.id] = !0),
								Array.isArray(d[m]) ? d[m].push(p.id) : (d[m] = [p.id])),
							u
						);
					}, {});
				for (let u of Object.keys(d)) d[u].length < 2 && l[u] && (l[u] = !1);
				return (
					(t = i),
					(e = a),
					(n = {
						editingGroupId: s.editingGroupId,
						selectedGroupIds: l,
						selectedElementIds: ed({ ...s.selectedElementIds, ...U }, c),
					}),
					n
				);
			},
			o = (a, i, s, c) => {
				let l = c
					? c.scene.getSelectedElements({
							selectedElementIds: a.selectedElementIds,
							elements: i,
						})
					: at(i, a);
				return l.length
					? r(l, i, a, s)
					: {
							selectedGroupIds: {},
							editingGroupId: null,
							selectedElementIds: ed(a.selectedElementIds, s),
						};
			};
		return (
			(o.clearCache = () => {
				(t = null), (e = null), (n = null);
			}),
			o
		);
	})(),
	jV = (e, t) => Gy(e, t) != null,
	Gy = (e, t) =>
		t.groupIds
			.filter((n) => n !== e.editingGroupId)
			.find((n) => e.selectedGroupIds[n]),
	eq = (e) =>
		Object.entries(e.selectedGroupIds)
			.filter(([t, n]) => n)
			.map(([t, n]) => t),
	T5 = (e, t) => {
		let n = { ...t, selectedGroupIds: {} };
		for (let r of e) {
			let o = r.groupIds;
			if (t.editingGroupId) {
				let a = o.indexOf(t.editingGroupId);
				a > -1 && (o = o.slice(0, a));
			}
			if (o.length > 0) {
				let a = o[o.length - 1];
				n = { ...n, ...qy(a, n, e) };
			}
		}
		return n.selectedGroupIds;
	},
	tq = (e, t) => ({
		...e,
		editingGroupId: t.groupIds.length ? t.groupIds[0] : null,
		selectedGroupIds: {},
		selectedElementIds: { [t.id]: !0 },
	}),
	Xy = (e, t) => e.groupIds.includes(t),
	sr = (e, t) => {
		let n = [];
		for (let r of e.values()) Xy(r, t) && n.push(r);
		return n;
	},
	nq = (e, t) => e.groupIds.find((n) => t[n]),
	R5 = (e, t, n) => {
		let r = [...e],
			o = t ? e.indexOf(t) : -1,
			a = o > -1 ? o : e.length;
		for (let i = 0; i < a; i++) r[i] = n(r[i]);
		return r;
	},
	rq = (e, t, n) => {
		let r = [...e],
			o = n ? r.indexOf(n) : -1,
			a = o > -1 ? o : r.length;
		return r.splice(a, 0, t), r;
	},
	oq = (e, t) => e.filter((n) => !t[n]),
	td = (e, t) => {
		let n = new Map();
		return (
			e.forEach((r) => {
				let o =
						r.groupIds.length === 0 ? r.id : r.groupIds[r.groupIds.length - 1],
					a = n.get(o) || [],
					i = ee(r, t);
				i && a.push(i), n.set(o, [...a, r]);
			}),
			Array.from(n.values())
		);
	},
	v5 = (e) => {
		let t = new Set();
		for (let [, n] of e)
			if (!n.isDeleted) for (let r of n.groupIds ?? []) t.add(r);
		return t;
	},
	M5 = (e) => {
		let t = e.flatMap((o) => o.groupIds),
			n = new Map(),
			r = 0;
		for (let o of t)
			n.set(o, (n.get(o) ?? 0) + 1), n.get(o) > r && (r = n.get(o));
		return r === e.length;
	},
	_5 = (e) => e.groupIds.length > 0;
var Zy = 8,
	L5 = 99999,
	xs = (e) => Zy / e,
	Es = class e {
		static referenceSnapPoints = null;
		static visibleGaps = null;
		static setReferenceSnapPoints = (t) => {
			e.referenceSnapPoints = t;
		};
		static getReferenceSnapPoints = () => e.referenceSnapPoints;
		static setVisibleGaps = (t) => {
			e.visibleGaps = t;
		};
		static getVisibleGaps = () => e.visibleGaps;
		static destroy = () => {
			(e.referenceSnapPoints = null), (e.visibleGaps = null);
		};
	},
	Wy = (e) => e.props.gridModeEnabled ?? e.state.gridModeEnabled,
	yo = ({ event: e, app: t, selectedElements: n }) =>
		e
			? (t.state.objectsSnapModeEnabled && !e[z.CTRL_OR_CMD]) ||
				(!t.state.objectsSnapModeEnabled && e[z.CTRL_OR_CMD] && !Wy(t))
			: n.length === 1 && n[0].type === "arrow"
				? !1
				: t.state.objectsSnapModeEnabled,
	zy = (e, t, n = 0.01) => Math.abs(e - t) <= n,
	Ta = (
		e,
		t,
		{ omitCenter: n, boundingBoxCorners: r, dragOffset: o } = {
			omitCenter: !1,
			boundingBoxCorners: !1,
		},
	) => {
		let a = [];
		if (e.length === 1) {
			let i = e[0],
				[s, c, l, d, U, u] = H(i, t);
			o &&
				((s += o.x),
				(l += o.x),
				(U += o.x),
				(c += o.y),
				(d += o.y),
				(u += o.y));
			let p = (l - s) / 2,
				m = (d - c) / 2;
			if ((i.type === "diamond" || i.type === "ellipse") && !r) {
				let h = D(b(s, c + m), b(U, u), i.angle),
					g = D(b(s + p, c), b(U, u), i.angle),
					x = D(b(l, c + m), b(U, u), i.angle),
					y = D(b(s + p, d), b(U, u), i.angle),
					w = b(U, u);
				a = n ? [h, g, x, y] : [h, g, x, y, w];
			} else {
				let h = D(b(s, c), b(U, u), i.angle),
					g = D(b(l, c), b(U, u), i.angle),
					x = D(b(s, d), b(U, u), i.angle),
					y = D(b(l, d), b(U, u), i.angle),
					w = b(U, u);
				a = n ? [h, g, x, y] : [h, g, x, y, w];
			}
		} else if (e.length > 1) {
			let [i, s, c, l] = is(e, o ?? { x: 0, y: 0 }),
				d = c - i,
				U = l - s,
				u = b(i, s),
				p = b(c, s),
				m = b(i, l),
				h = b(c, l),
				g = b(i + d / 2, s + U / 2);
			a = n ? [u, p, m, h] : [u, p, m, h, g];
		}
		return a.map((i) => b(xe(i[0]), xe(i[1])));
	},
	$5 = (e, t, n, r) => {
		let o = t.filter((a) => de(a)).map((a) => a.id);
		return rd(e, t, n, r).filter((a) => !(a.frameId && o.includes(a.frameId)));
	},
	pq = (e, t, n, r) => {
		let o = $5(e, t, n, r),
			a = td(o, r)
				.filter((U) => !(U.length === 1 && Me(U[0])))
				.map((U) => Te(U).map((u) => xe(u))),
			i = a.sort((U, u) => U[0] - u[0]),
			s = [],
			c = 0;
		e: for (let U = 0; U < i.length; U++) {
			let u = i[U];
			for (let p = U + 1; p < i.length; p++) {
				if (++c > L5) break e;
				let m = i[p],
					[, h, g, x] = u,
					[y, w, , T] = m;
				g < y &&
					zo(Se(h, x), Se(w, T)) &&
					s.push({
						startBounds: u,
						endBounds: m,
						startSide: [b(g, h), b(g, x)],
						endSide: [b(y, w), b(y, T)],
						length: y - g,
						overlap: Qo(Se(h, x), Se(w, T)),
					});
			}
		}
		let l = a.sort((U, u) => U[1] - u[1]),
			d = [];
		c = 0;
		e: for (let U = 0; U < l.length; U++) {
			let u = l[U];
			for (let p = U + 1; p < l.length; p++) {
				if (++c > L5) break e;
				let m = l[p],
					[h, , g, x] = u,
					[y, w, T] = m;
				x < w &&
					zo(Se(h, g), Se(y, T)) &&
					d.push({
						startBounds: u,
						endBounds: m,
						startSide: [b(h, x), b(g, x)],
						endSide: [b(y, w), b(T, w)],
						length: w - x,
						overlap: Qo(Se(h, g), Se(y, T)),
					});
			}
		}
		return { horizontalGaps: s, verticalGaps: d };
	},
	D5 = (e, t, n, r, o, a, i) => {
		if (!yo({ app: n, event: r, selectedElements: e })) return [];
		if (e.length === 0) return [];
		let s = Es.getVisibleGaps();
		if (s) {
			let { horizontalGaps: c, verticalGaps: l } = s,
				[d, U, u, p] = is(e, t).map((g) => xe(g)),
				m = (d + u) / 2,
				h = (U + p) / 2;
			for (let g of c) {
				if (!zo(Se(U, p), g.overlap)) continue;
				let x = g.startSide[0][0] + g.length / 2,
					y = xe(x - m);
				if (g.length > u - d && Math.abs(y) <= i.x) {
					Math.abs(y) < i.x && (o.length = 0), (i.x = Math.abs(y));
					let $ = {
						type: "gap",
						direction: "center_horizontal",
						gap: g,
						offset: y,
					};
					o.push($);
					continue;
				}
				let [, , T] = g.endBounds,
					I = d - T,
					_ = xe(g.length - I);
				if (Math.abs(_) <= i.x) {
					Math.abs(_) < i.x && (o.length = 0), (i.x = Math.abs(_));
					let $ = { type: "gap", direction: "side_right", gap: g, offset: _ };
					o.push($);
					continue;
				}
				let [L, , ,] = g.startBounds,
					M = L - u,
					N = xe(M - g.length);
				if (Math.abs(N) <= i.x) {
					Math.abs(N) < i.x && (o.length = 0), (i.x = Math.abs(N));
					let $ = { type: "gap", direction: "side_left", gap: g, offset: N };
					o.push($);
					continue;
				}
			}
			for (let g of l) {
				if (!zo(Se(d, u), g.overlap)) continue;
				let x = g.startSide[0][1] + g.length / 2,
					y = xe(x - h);
				if (g.length > p - U && Math.abs(y) <= i.y) {
					Math.abs(y) < i.y && (a.length = 0), (i.y = Math.abs(y));
					let $ = {
						type: "gap",
						direction: "center_vertical",
						gap: g,
						offset: y,
					};
					a.push($);
					continue;
				}
				let [, T, ,] = g.startBounds,
					I = T - p,
					_ = xe(I - g.length);
				if (Math.abs(_) <= i.y) {
					Math.abs(_) < i.y && (a.length = 0), (i.y = Math.abs(_));
					let $ = { type: "gap", direction: "side_top", gap: g, offset: _ };
					a.push($);
					continue;
				}
				let [, , , L] = g.endBounds,
					M = xe(U - L),
					N = g.length - M;
				if (Math.abs(N) <= i.y) {
					Math.abs(N) < i.y && (a.length = 0), (i.y = Math.abs(N));
					let $ = { type: "gap", direction: "side_bottom", gap: g, offset: N };
					a.push($);
					continue;
				}
			}
		}
	},
	mq = (e, t, n, r) => {
		let o = $5(e, t, n, r);
		return td(o, r)
			.filter((a) => !(a.length === 1 && Me(a[0])))
			.flatMap((a) => Ta(a, r));
	},
	xo = (e, t, n, r, o, a, i) => {
		if (
			!yo({ app: n, event: r, selectedElements: e }) ||
			(e.length === 0 && t.length === 0)
		)
			return [];
		let s = Es.getReferenceSnapPoints();
		if (s)
			for (let c of t)
				for (let l of s) {
					let d = l[0] - c[0],
						U = l[1] - c[1];
					Math.abs(d) <= i.x &&
						(Math.abs(d) < i.x && (o.length = 0),
						o.push({ type: "point", points: [c, l], offset: d }),
						(i.x = Math.abs(d))),
						Math.abs(U) <= i.y &&
							(Math.abs(U) < i.y && (a.length = 0),
							a.push({ type: "point", points: [c, l], offset: U }),
							(i.y = Math.abs(U)));
				}
	},
	hq = (e, t, n, r, o) => {
		let a = n.state,
			i = at(e, a);
		if (!yo({ app: n, event: r, selectedElements: i }) || i.length === 0)
			return { snapOffset: { x: 0, y: 0 }, snapLines: [] };
		(t.x = xe(t.x)), (t.y = xe(t.y));
		let s = [],
			c = [],
			l = xs(a.zoom.value),
			d = { x: l, y: l },
			U = Ta(i, o, { dragOffset: t });
		xo(i, U, n, r, s, c, d), D5(i, t, n, r, s, c, d);
		let u = { x: s[0]?.offset ?? 0, y: c[0]?.offset ?? 0 };
		(d.x = 0), (d.y = 0), (s.length = 0), (c.length = 0);
		let p = { x: xe(t.x + u.x), y: xe(t.y + u.y) };
		xo(i, Ta(i, o, { dragOffset: p }), n, r, s, c, d), D5(i, p, n, r, s, c, d);
		let m = nd(s, c),
			h = jy(
				i,
				p,
				[...s, ...c].filter((g) => g.type === "gap"),
			);
		return { snapOffset: u, snapLines: [...m, ...h] };
	},
	xe = (e) => Math.round(e * 10 ** 6) / 10 ** 6,
	S5 = (e) => {
		let t = new Map();
		for (let n of e) {
			let r = n.join(",");
			t.has(r) || t.set(r, n);
		}
		return Array.from(t.values());
	},
	nd = (e, t) => {
		let n = {},
			r = {};
		if (e.length > 0) {
			for (let o of e)
				if (o.type === "point") {
					let a = xe(o.points[0][0]);
					n[a] || (n[a] = []),
						n[a].push(...o.points.map((i) => b(xe(i[0]), xe(i[1]))));
				}
		}
		if (t.length > 0) {
			for (let o of t)
				if (o.type === "point") {
					let a = xe(o.points[0][1]);
					r[a] || (r[a] = []),
						r[a].push(...o.points.map((i) => b(xe(i[0]), xe(i[1]))));
				}
		}
		return Object.entries(n)
			.map(([o, a]) => ({
				type: "points",
				points: S5(
					a.map((i) => b(Number(o), i[1])).sort((i, s) => i[1] - s[1]),
				),
			}))
			.concat(
				Object.entries(r).map(([o, a]) => ({
					type: "points",
					points: S5(
						a.map((i) => b(i[0], Number(o))).sort((i, s) => i[0] - s[0]),
					),
				})),
			);
	},
	Qy = (e) => {
		let t = new Map();
		for (let n of e) {
			let r = n.points
				.flat()
				.map((o) => [xe(o)])
				.join(",");
			t.has(r) || t.set(r, n);
		}
		return Array.from(t.values());
	},
	jy = (e, t, n) => {
		let [r, o, a, i] = is(e, t),
			s = [];
		for (let c of n) {
			let [l, d, U, u] = c.gap.startBounds,
				[p, m, h, g] = c.gap.endBounds,
				x = Qo(Se(o, i), c.gap.overlap),
				y = Qo(Se(r, a), c.gap.overlap);
			switch (c.direction) {
				case "center_horizontal": {
					if (x) {
						let w = (x[0] + x[1]) / 2;
						s.push(
							{
								type: "gap",
								direction: "horizontal",
								points: [b(c.gap.startSide[0][0], w), b(r, w)],
							},
							{
								type: "gap",
								direction: "horizontal",
								points: [b(a, w), b(c.gap.endSide[0][0], w)],
							},
						);
					}
					break;
				}
				case "center_vertical": {
					if (y) {
						let w = (y[0] + y[1]) / 2;
						s.push(
							{
								type: "gap",
								direction: "vertical",
								points: [b(w, c.gap.startSide[0][1]), b(w, o)],
							},
							{
								type: "gap",
								direction: "vertical",
								points: [b(w, i), b(w, c.gap.endSide[0][1])],
							},
						);
					}
					break;
				}
				case "side_right": {
					if (x) {
						let w = (x[0] + x[1]) / 2;
						s.push(
							{
								type: "gap",
								direction: "horizontal",
								points: [b(U, w), b(p, w)],
							},
							{
								type: "gap",
								direction: "horizontal",
								points: [b(h, w), b(r, w)],
							},
						);
					}
					break;
				}
				case "side_left": {
					if (x) {
						let w = (x[0] + x[1]) / 2;
						s.push(
							{
								type: "gap",
								direction: "horizontal",
								points: [b(a, w), b(l, w)],
							},
							{
								type: "gap",
								direction: "horizontal",
								points: [b(U, w), b(p, w)],
							},
						);
					}
					break;
				}
				case "side_top": {
					if (y) {
						let w = (y[0] + y[1]) / 2;
						s.push(
							{
								type: "gap",
								direction: "vertical",
								points: [b(w, i), b(w, d)],
							},
							{
								type: "gap",
								direction: "vertical",
								points: [b(w, u), b(w, m)],
							},
						);
					}
					break;
				}
				case "side_bottom": {
					if (y) {
						let w = (y[0] + y[1]) / 2;
						s.push(
							{
								type: "gap",
								direction: "vertical",
								points: [b(w, u), b(w, m)],
							},
							{
								type: "gap",
								direction: "vertical",
								points: [b(w, g), b(w, o)],
							},
						);
					}
					break;
				}
			}
		}
		return Qy(
			s.map((c) => ({
				...c,
				points: c.points.map((l) => b(xe(l[0]), xe(l[1]))),
			})),
		);
	},
	bq = (e, t, n, r, o, a) => {
		if (
			!yo({ event: r, selectedElements: e, app: n }) ||
			e.length === 0 ||
			(e.length === 1 && !zy(e[0].angle, 0))
		)
			return { snapOffset: { x: 0, y: 0 }, snapLines: [] };
		let [i, s, c, l] = Te(t);
		a &&
			(a.includes("e") ? (c += o.x) : a.includes("w") && (i += o.x),
			a.includes("n") ? (s += o.y) : a.includes("s") && (l += o.y));
		let d = [];
		if (a)
			switch (a) {
				case "e": {
					d.push(b(c, s), b(c, l));
					break;
				}
				case "w": {
					d.push(b(i, s), b(i, l));
					break;
				}
				case "n": {
					d.push(b(i, s), b(c, s));
					break;
				}
				case "s": {
					d.push(b(i, l), b(c, l));
					break;
				}
				case "ne": {
					d.push(b(c, s));
					break;
				}
				case "nw": {
					d.push(b(i, s));
					break;
				}
				case "se": {
					d.push(b(c, l));
					break;
				}
				case "sw": {
					d.push(b(i, l));
					break;
				}
			}
		let U = xs(n.state.zoom.value),
			u = { x: U, y: U },
			p = [],
			m = [];
		xo(t, d, n, r, p, m, u);
		let h = { x: p[0]?.offset ?? 0, y: m[0]?.offset ?? 0 };
		(u.x = 0), (u.y = 0), (p.length = 0), (m.length = 0);
		let [g, x, y, w] = Te(e).map((_) => xe(_)),
			T = [b(g, x), b(g, w), b(y, x), b(y, w)];
		xo(e, T, n, r, p, m, u);
		let I = nd(p, m);
		return { snapOffset: h, snapLines: I };
	},
	gq = (e, t, n, r, o, a) => {
		if (!yo({ event: n, selectedElements: [e], app: t }))
			return { snapOffset: { x: 0, y: 0 }, snapLines: [] };
		let i = [b(r.x + o.x, r.y + o.y)],
			s = xs(t.state.zoom.value),
			c = { x: s, y: s },
			l = [],
			d = [];
		xo([e], i, t, n, l, d, c);
		let U = { x: l[0]?.offset ?? 0, y: d[0]?.offset ?? 0 };
		(c.x = 0), (c.y = 0), (l.length = 0), (d.length = 0);
		let u = Ta([e], a, { boundingBoxCorners: !0, omitCenter: !0 });
		xo([e], u, t, n, l, d, c);
		let p = nd(l, d);
		return { snapOffset: U, snapLines: p };
	},
	Eq = (e, t, n, r, o) => {
		if (!yo({ event: r, selectedElements: [], app: t }))
			return { originOffset: { x: 0, y: 0 }, snapLines: [] };
		let a = rd(e, [], t.state, o),
			i = xs(t.state.zoom.value),
			s = { x: i, y: i },
			c = [],
			l = [];
		for (let d of a) {
			let U = Ta([d], o);
			for (let u of U) {
				let p = u[0] - n.x;
				Math.abs(p) <= Math.abs(s.x) &&
					(Math.abs(p) < Math.abs(s.x) && (l.length = 0),
					l.push({
						type: "pointer",
						points: [u, b(u[0], n.y)],
						direction: "vertical",
					}),
					(s.x = p));
				let m = u[1] - n.y;
				Math.abs(m) <= Math.abs(s.y) &&
					(Math.abs(m) < Math.abs(s.y) && (c.length = 0),
					c.push({
						type: "pointer",
						points: [u, b(n.x, u[1])],
						direction: "horizontal",
					}),
					(s.y = m));
			}
		}
		return {
			originOffset: {
				x: l.length > 0 ? l[0].points[0][0] - n.x : 0,
				y: c.length > 0 ? c[0].points[0][1] - n.y : 0,
			},
			snapLines: [...l, ...c],
		};
	},
	xq = (e) =>
		e === Vn.rectangle ||
		e === Vn.ellipse ||
		e === Vn.diamond ||
		e === Vn.frame ||
		e === Vn.magicframe ||
		e === Vn.image ||
		e === Vn.text,
	Ra = (e, t, n) =>
		n ? [Math.round(e / n) * n, Math.round(t / n) * n] : [e, t];
var Sn = { version: null, points: [], zoom: null },
	W = class e {
		elementId;
		selectedPointsIndices;
		pointerDownState;
		isDragging;
		lastUncommittedPoint;
		pointerOffset;
		startBindingElement;
		endBindingElement;
		hoverPointIndex;
		segmentMidPointHoveredCoords;
		elbowed;
		constructor(t) {
			(this.elementId = t.id),
				wr(t.points[0], b(0, 0)) ||
					console.error("Linear element is not normalized", Error().stack),
				(this.selectedPointsIndices = null),
				(this.lastUncommittedPoint = null),
				(this.isDragging = !1),
				(this.pointerOffset = { x: 0, y: 0 }),
				(this.startBindingElement = "keep"),
				(this.endBindingElement = "keep"),
				(this.pointerDownState = {
					prevSelectedPointsIndices: null,
					lastClickedPoint: -1,
					lastClickedIsEndPoint: !1,
					origin: null,
					segmentMidpoint: { value: null, index: null, added: !1 },
				}),
				(this.hoverPointIndex = -1),
				(this.segmentMidPointHoveredCoords = null),
				(this.elbowed = se(t) && t.elbowed);
		}
		static POINT_HANDLE_SIZE = 10;
		static getElement(t, n) {
			let r = n.get(t);
			return r || null;
		}
		static handleBoxSelection(t, n, r, o) {
			if (!n.editingLinearElement || !n.selectionElement) return !1;
			let { editingLinearElement: a } = n,
				{ selectedPointsIndices: i, elementId: s } = a,
				c = e.getElement(s, o);
			if (!c) return !1;
			let [l, d, U, u] = H(n.selectionElement, o),
				m = e
					.getPointsGlobalCoordinates(c, o)
					.reduce(
						(h, g, x) => (
							((g[0] >= l && g[0] <= U && g[1] >= d && g[1] <= u) ||
								(t.shiftKey && i?.includes(x))) &&
								h.push(x),
							h
						),
						[],
					)
					.filter((h) => !(se(c) && h !== 0 && h !== c.points.length - 1));
			r({
				editingLinearElement: {
					...a,
					selectedPointsIndices: m.length ? m : null,
				},
			});
		}
		static handlePointDragging(t, n, r, o, a, i, s) {
			if (!i) return !1;
			let { elementId: c } = i,
				l = s.getNonDeletedElementsMap(),
				d = e.getElement(c, l);
			if (
				!d ||
				(se(d) &&
					!i.pointerDownState.lastClickedIsEndPoint &&
					i.pointerDownState.lastClickedPoint !== 0)
			)
				return !1;
			let U = se(d)
					? i.selectedPointsIndices
							?.reduce(
								(m, h) => (h === 0 ? [0, m[1]] : [m[0], d.points.length - 1]),
								[!1, !1],
							)
							.filter((m) => typeof m == "number")
					: i.selectedPointsIndices,
				u = se(d)
					? i.pointerDownState.lastClickedPoint > 0
						? d.points.length - 1
						: 0
					: i.pointerDownState.lastClickedPoint,
				p = d.points[u];
			if (U && p) {
				if (ul(t) && U.length === 1 && d.points.length > 1) {
					let h = U[0],
						g = d.points[h === 0 ? 1 : h - 1],
						[x, y] = e._getShiftLockedDelta(
							d,
							l,
							g,
							b(r, o),
							t[z.CTRL_OR_CMD] ? null : n.getEffectiveGridSize(),
						);
					e.movePoints(
						d,
						[{ index: h, point: b(x + g[0], y + g[1]), isDragging: h === u }],
						l,
					);
				} else {
					let h = e.createPointAt(
							d,
							l,
							r - i.pointerOffset.x,
							o - i.pointerOffset.y,
							t[z.CTRL_OR_CMD] ? null : n.getEffectiveGridSize(),
						),
						g = h[0] - p[0],
						x = h[1] - p[1];
					e.movePoints(
						d,
						U.map((y) => {
							let w =
								y === u
									? e.createPointAt(
											d,
											l,
											r - i.pointerOffset.x,
											o - i.pointerOffset.y,
											t[z.CTRL_OR_CMD] ? null : n.getEffectiveGridSize(),
										)
									: b(d.points[y][0] + g, d.points[y][1] + x);
							return { index: y, point: w, isDragging: y === u };
						}),
						l,
					);
				}
				if ((ee(d, l) && Cr(d, l, !1), ra(d, !1))) {
					let h = [];
					U[0] === 0 &&
						h.push(yn(e.getPointGlobalCoordinates(d, d.points[0], l)));
					let x = U[U.length - 1];
					x === d.points.length - 1 &&
						h.push(yn(e.getPointGlobalCoordinates(d, d.points[x], l))),
						h.length && a(d, h);
				}
				return !0;
			}
			return !1;
		}
		static handlePointerUp(t, n, r, o) {
			let a = o.getNonDeletedElementsMap(),
				i = o.getNonDeletedElements(),
				{
					elementId: s,
					selectedPointsIndices: c,
					isDragging: l,
					pointerDownState: d,
				} = n,
				U = e.getElement(s, a);
			if (!U) return n;
			let u = {};
			if (l && c) {
				for (let p of c)
					if (p === 0 || p === U.points.length - 1) {
						rn(U.points, r.zoom.value) &&
							e.movePoints(
								U,
								[
									{
										index: p,
										point:
											p === 0 ? U.points[U.points.length - 1] : U.points[0],
									},
								],
								a,
							);
						let m = Gl(r)
							? ar(
									yn(e.getPointAtIndexGlobalCoordinates(U, p, a)),
									i,
									a,
									r.zoom,
								)
							: null;
						u[p === 0 ? "startBindingElement" : "endBindingElement"] = m;
					}
			}
			return {
				...n,
				...u,
				selectedPointsIndices:
					l || t.shiftKey
						? !l &&
							t.shiftKey &&
							d.prevSelectedPointsIndices?.includes(d.lastClickedPoint)
							? c && c.filter((p) => p !== d.lastClickedPoint)
							: c
						: c?.includes(d.lastClickedPoint)
							? [d.lastClickedPoint]
							: c,
				isDragging: !1,
				pointerOffset: { x: 0, y: 0 },
			};
		}
		static getEditorMidPoints = (t, n, r) => {
			let o = ee(t, n);
			return !r.editingLinearElement && t.points.length > 2 && !o
				? []
				: ((Sn.version === t.version && Sn.zoom === r.zoom.value) ||
						e.updateEditorMidPointsCache(t, n, r),
					Sn.points);
		};
		static updateEditorMidPointsCache = (t, n, r) => {
			let o = e.getPointsGlobalCoordinates(t, n),
				a = 0,
				i = [];
			for (; a < o.length - 1; ) {
				if (e.isSegmentTooShort(t, t.points[a], t.points[a + 1], r.zoom)) {
					i.push(null), a++;
					continue;
				}
				let s = e.getSegmentMidPoint(t, o[a], o[a + 1], a + 1, n);
				i.push(s), a++;
			}
			(Sn.points = i), (Sn.version = t.version), (Sn.zoom = r.zoom.value);
		};
		static getSegmentMidpointHitCoords = (t, n, r, o) => {
			let { elementId: a } = t,
				i = e.getElement(a, o);
			if (
				!i ||
				e.getPointIndexUnderCursor(i, o, r.zoom, n.x, n.y) >= 0 ||
				(e.getPointsGlobalCoordinates(i, o).length >= 3 &&
					!r.editingLinearElement)
			)
				return null;
			let l = e.POINT_HANDLE_SIZE / r.zoom.value,
				d = t.segmentMidPointHoveredCoords;
			if (d && Ne(b(d[0], d[1]), b(n.x, n.y)) <= l) return d;
			let U = 0,
				u = e.getEditorMidPoints(i, o, r);
			for (; U < u.length; ) {
				if (u[U] !== null && Ne(b(u[U][0], u[U][1]), b(n.x, n.y)) <= l)
					return u[U];
				U++;
			}
			return null;
		};
		static isSegmentTooShort(t, n, r, o) {
			let a = Ne(b(n[0], n[1]), b(r[0], r[1]));
			return (
				t.points.length > 2 && t.roundness && (a = b8(t, r)),
				a * o.value < e.POINT_HANDLE_SIZE * 4
			);
		}
		static getSegmentMidPoint(t, n, r, o, a) {
			let i = zt(n, r);
			if (t.points.length > 2 && t.roundness) {
				let s = ml(t, t.points[o]);
				if (s) {
					let c = g8(t, t.points[o], 0.5);
					i = e.getPointGlobalCoordinates(t, hl(s[0], s[1], s[2], s[3], c), a);
				}
			}
			return i;
		}
		static getSegmentMidPointIndex(t, n, r, o) {
			let a = e.getElement(t.elementId, o);
			if (!a) return -1;
			let i = e.getEditorMidPoints(a, o, n),
				s = 0;
			for (; s < i.length; ) {
				if (e.arePointsEqual(r, i[s])) return s + 1;
				s++;
			}
			return -1;
		}
		static handlePointerDown(t, n, r, o, a, i) {
			let s = n.state,
				c = i.getNonDeletedElementsMap(),
				l = i.getNonDeletedElements(),
				d = { didAddPoint: !1, hitElement: null, linearElementEditor: null };
			if (!a) return d;
			let { elementId: U } = a,
				u = e.getElement(U, c);
			if (!u) return d;
			let p = e.getSegmentMidpointHitCoords(a, o, s, c),
				m = null;
			if (
				(p && (m = e.getSegmentMidPointIndex(a, s, p, c)),
				t.altKey && s.editingLinearElement)
			)
				return (
					a.lastUncommittedPoint == null &&
						!se(u) &&
						(J(u, {
							points: [
								...u.points,
								e.createPointAt(
									u,
									c,
									o.x,
									o.y,
									t[z.CTRL_OR_CMD] ? null : n.getEffectiveGridSize(),
								),
							],
						}),
						(d.didAddPoint = !0)),
					r.shouldCaptureIncrement(),
					(d.linearElementEditor = {
						...a,
						pointerDownState: {
							prevSelectedPointsIndices: a.selectedPointsIndices,
							lastClickedPoint: -1,
							lastClickedIsEndPoint: !1,
							origin: { x: o.x, y: o.y },
							segmentMidpoint: { value: p, index: m, added: !1 },
						},
						selectedPointsIndices: [u.points.length - 1],
						lastUncommittedPoint: null,
						endBindingElement: ar(o, l, c, n.state.zoom),
					}),
					(d.didAddPoint = !0),
					d
				);
			let h = e.getPointIndexUnderCursor(u, c, s.zoom, o.x, o.y);
			if (h >= 0 || p) d.hitElement = u;
			else {
				let { startBindingElement: M, endBindingElement: N } = a;
				Gl(s) && ra(u) && Xl(u, M, N, c, i);
			}
			let [g, x, y, w] = H(u, c),
				T = (g + y) / 2,
				I = (x + w) / 2,
				_ =
					h > -1 &&
					D(b(u.x + u.points[h][0], u.y + u.points[h][1]), b(T, I), u.angle),
				L =
					h > -1 || t.shiftKey
						? t.shiftKey || a.selectedPointsIndices?.includes(h)
							? ew([...(a.selectedPointsIndices || []), h])
							: [h]
						: null;
			return (
				(d.linearElementEditor = {
					...a,
					pointerDownState: {
						prevSelectedPointsIndices: a.selectedPointsIndices,
						lastClickedPoint: h,
						lastClickedIsEndPoint: h === u.points.length - 1,
						origin: { x: o.x, y: o.y },
						segmentMidpoint: { value: p, index: m, added: !1 },
					},
					selectedPointsIndices: L,
					pointerOffset: _ ? { x: o.x - _[0], y: o.y - _[1] } : { x: 0, y: 0 },
				}),
				d
			);
		}
		static arePointsEqual(t, n) {
			return !t && !n ? !0 : !t || !n ? !1 : wr(t, n);
		}
		static handlePointerMove(t, n, r, o, a) {
			let i = o.state;
			if (!i.editingLinearElement) return null;
			let { elementId: s, lastUncommittedPoint: c } = i.editingLinearElement,
				l = e.getElement(s, a);
			if (!l) return i.editingLinearElement;
			let { points: d } = l,
				U = d[d.length - 1];
			if (!t.altKey)
				return (
					U === c && e.deletePoints(l, [d.length - 1], a, o.state.zoom),
					{ ...i.editingLinearElement, lastUncommittedPoint: null }
				);
			let u;
			if (ul(t) && d.length >= 2) {
				let p = d[d.length - 2],
					[m, h] = e._getShiftLockedDelta(
						l,
						a,
						p,
						b(n, r),
						t[z.CTRL_OR_CMD] ? null : o.getEffectiveGridSize(),
					);
				u = b(m + p[0], h + p[1]);
			} else
				u = e.createPointAt(
					l,
					a,
					n - i.editingLinearElement.pointerOffset.x,
					r - i.editingLinearElement.pointerOffset.y,
					t[z.CTRL_OR_CMD] || se(l) ? null : o.getEffectiveGridSize(),
				);
			return (
				U === c
					? e.movePoints(l, [{ index: l.points.length - 1, point: u }], a)
					: e.addPoints(l, [{ point: u }], a, o.state.zoom),
				{
					...i.editingLinearElement,
					lastUncommittedPoint: l.points[l.points.length - 1],
				}
			);
		}
		static getPointGlobalCoordinates(t, n, r) {
			let [o, a, i, s] = H(t, r),
				c = (o + i) / 2,
				l = (a + s) / 2,
				{ x: d, y: U } = t;
			return D(b(d + n[0], U + n[1]), b(c, l), t.angle);
		}
		static getPointsGlobalCoordinates(t, n) {
			let [r, o, a, i] = H(t, n),
				s = (r + a) / 2,
				c = (o + i) / 2;
			return t.points.map((l) => {
				let { x: d, y: U } = t;
				return D(b(d + l[0], U + l[1]), b(s, c), t.angle);
			});
		}
		static getPointAtIndexGlobalCoordinates(t, n, r) {
			let o = n < 0 ? t.points.length + n : n,
				[a, i, s, c] = H(t, r),
				l = (a + s) / 2,
				d = (i + c) / 2,
				U = t.points[o],
				{ x: u, y: p } = t;
			return U
				? D(b(u + U[0], p + U[1]), b(l, d), t.angle)
				: D(b(u, p), b(l, d), t.angle);
		}
		static pointFromAbsoluteCoords(t, n, r) {
			if (se(t)) return b(n[0] - t.x, n[1] - t.y);
			let [o, a, i, s] = H(t, r),
				c = (o + i) / 2,
				l = (a + s) / 2,
				[d, U] = D(b(n[0], n[1]), b(c, l), -t.angle);
			return b(d - t.x, U - t.y);
		}
		static getPointIndexUnderCursor(t, n, r, o, a) {
			let i = e.getPointsGlobalCoordinates(t, n),
				s = i.length;
			for (; --s > -1; ) {
				let c = i[s];
				if (Ne(b(o, a), b(c[0], c[1])) * r.value < e.POINT_HANDLE_SIZE + 1)
					return s;
			}
			return -1;
		}
		static createPointAt(t, n, r, o, a) {
			let i = Ra(r, o, a),
				[s, c, l, d] = H(t, n),
				U = (s + l) / 2,
				u = (c + d) / 2,
				[p, m] = D(b(i[0], i[1]), b(U, u), -t.angle);
			return b(p - t.x, m - t.y);
		}
		static getNormalizedPoints(t) {
			let { points: n } = t,
				r = n[0][0],
				o = n[0][1];
			return {
				points: n.map((a) => b(a[0] - r, a[1] - o)),
				x: t.x + r,
				y: t.y + o,
			};
		}
		static normalizePoints(t) {
			J(t, e.getNormalizedPoints(t));
		}
		static duplicateSelectedPoints(t, n) {
			ut(t.editingLinearElement, "Not currently editing a linear element");
			let { selectedPointsIndices: r, elementId: o } = t.editingLinearElement,
				a = e.getElement(o, n);
			ut(a, "The linear element does not exist in the provided Scene"),
				ut(r != null, "There are no selected points to duplicate");
			let { points: i } = a,
				s = [],
				c = !1,
				l = -1,
				d = i.reduce((U, u, p) => {
					if ((++l, U.push(u), r.includes(p))) {
						let h = i[p + 1];
						h || (c = !0),
							U.push(
								h ? b((u[0] + h[0]) / 2, (u[1] + h[1]) / 2) : b(u[0], u[1]),
							),
							s.push(l + 1),
							++l;
					}
					return U;
				}, []);
			if ((J(a, { points: d }), c)) {
				let U = a.points[a.points.length - 1];
				e.movePoints(
					a,
					[{ index: a.points.length - 1, point: b(U[0] + 30, U[1] + 30) }],
					n,
				);
			}
			return {
				...t,
				editingLinearElement: {
					...t.editingLinearElement,
					selectedPointsIndices: s,
				},
			};
		}
		static deletePoints(t, n, r, o) {
			let a = 0,
				i = 0;
			if (n.includes(0)) {
				let l = t.points.find((d, U) => !n.includes(U));
				l && ((a = l[0]), (i = l[1]));
			}
			let c = t.points.reduce(
				(l, d, U) => (
					n.includes(U) || l.push(l.length ? b(d[0] - a, d[1] - i) : b(0, 0)), l
				),
				[],
			);
			e._updatePoints(t, c, a, i, r);
		}
		static addPoints(t, n, r, o) {
			let s = [...t.points, ...n.map((c) => c.point)];
			e._updatePoints(t, s, 0, 0, r);
		}
		static movePoints(t, n, r, o, a) {
			let { points: i } = t,
				s = 0,
				c = 0,
				l = n.find(({ index: U }) => U === 0);
			l && ((s = l.point[0] + i[l.index][0]), (c = l.point[1] + i[l.index][1]));
			let d = i.map((U, u) => {
				let p = n.find((m) => m.index === u);
				if (p) {
					if (p.index === 0) return U;
					let m = p.point[0] - i[p.index][0],
						h = p.point[1] - i[p.index][1];
					return b(U[0] + m - s, U[1] + h - c);
				}
				return s || c ? b(U[0] - s, U[1] - c) : U;
			});
			e._updatePoints(t, d, s, c, r, o, {
				isDragging: n.reduce((U, u) => U || u.isDragging === !0, !1),
				changedElements: a?.changedElements,
				zoom: a?.zoom,
			});
		}
		static shouldAddMidpoint(t, n, r, o) {
			let a = e.getElement(t.elementId, o);
			if ((a && se(a)) || !a) return !1;
			let { segmentMidpoint: i } = t.pointerDownState;
			if (
				i.added ||
				i.value === null ||
				i.index === null ||
				t.pointerDownState.origin === null
			)
				return !1;
			let s = t.pointerDownState.origin,
				c = Ne(b(s.x, s.y), b(n.x, n.y));
			return !(!r.editingLinearElement && c < Wf / r.zoom.value);
		}
		static addMidpoint(t, n, r, o, a) {
			let i = e.getElement(t.elementId, a);
			if (!i) return;
			let { segmentMidpoint: s } = t.pointerDownState,
				c = {
					pointerDownState: t.pointerDownState,
					selectedPointsIndices: t.selectedPointsIndices,
				},
				l = e.createPointAt(
					i,
					a,
					n.x,
					n.y,
					o && !se(i) ? r.getEffectiveGridSize() : null,
				),
				d = [...i.points.slice(0, s.index), l, ...i.points.slice(s.index)];
			return (
				J(i, { points: d }),
				(c.pointerDownState = {
					...t.pointerDownState,
					segmentMidpoint: { ...t.pointerDownState.segmentMidpoint, added: !0 },
					lastClickedPoint: s.index,
				}),
				(c.selectedPointsIndices = [s.index]),
				c
			);
		}
		static _updatePoints(t, n, r, o, a, i, s) {
			if (se(t)) {
				let c = {};
				i?.startBinding !== void 0 &&
					(c.startBinding =
						i.startBinding !== null && Mr(i.startBinding)
							? i.startBinding
							: null),
					i?.endBinding !== void 0 &&
						(c.endBinding =
							i.endBinding !== null && Mr(i.endBinding) ? i.endBinding : null);
				let l = s?.changedElements
					? Be(new Map([...a, ...s.changedElements]))
					: a;
				gs(t, l, n, De(r, o), c, { isDragging: s?.isDragging, zoom: s?.zoom });
			} else {
				let c = Dl(t, n),
					l = Dl(t, t.points),
					d = (c[0] + c[2]) / 2,
					U = (c[1] + c[3]) / 2,
					u = (l[0] + l[2]) / 2,
					p = (l[1] + l[3]) / 2,
					m = u - d,
					h = p - U,
					g = D(b(r, o), b(m, h), t.angle);
				J(t, { ...i, points: n, x: t.x + g[0], y: t.y + g[1] });
			}
		}
		static _getShiftLockedDelta(t, n, r, o, a) {
			let i = e.getPointGlobalCoordinates(t, r, n);
			if (se(t)) return [o[0] - i[0], o[1] - i[1]];
			let [s, c] = Ra(o[0], o[1], a),
				{ width: l, height: d } = od(i[0], i[1], s, c);
			return D(b(l, d), b(0, 0), -t.angle);
		}
		static getBoundTextElementPosition = (t, n, r) => {
			let o = e.getPointsGlobalCoordinates(t, r);
			o.length < 2 && J(n, { isDeleted: !0 });
			let a = 0,
				i = 0;
			if (t.points.length % 2 === 1) {
				let s = Math.floor(t.points.length / 2),
					c = e.getPointGlobalCoordinates(t, t.points[s], r);
				(a = c[0] - n.width / 2), (i = c[1] - n.height / 2);
			} else {
				let s = t.points.length / 2 - 1,
					c = Sn.points[s];
				t.points.length === 2 && (c = zt(o[0], o[1])),
					(!c || Sn.version !== t.version) &&
						(c = e.getSegmentMidPoint(t, o[s], o[s + 1], s + 1, r)),
					(a = c[0] - n.width / 2),
					(i = c[1] - n.height / 2);
			}
			return { x: a, y: i };
		};
		static getMinMaxXYWithBoundText = (t, n, r, o) => {
			let [a, i, s, c] = r,
				l = (a + s) / 2,
				d = (i + c) / 2,
				{ x: U, y: u } = e.getBoundTextElementPosition(t, o, n),
				p = U + o.width,
				m = u + o.height,
				h = b(l, d),
				g = D(b(a, i), h, t.angle),
				x = D(b(s, i), h, t.angle),
				y = D(b(U, u), h, -t.angle),
				w = D(b(p, u), h, -t.angle),
				T = D(b(U, m), h, -t.angle),
				I = D(b(p, m), h, -t.angle);
			return (
				g[0] < x[0] && g[1] >= x[1]
					? ((a = Math.min(a, T[0])),
						(s = Math.max(s, Math.max(w[0], I[0]))),
						(i = Math.min(i, y[1])),
						(c = Math.max(c, I[1])))
					: g[0] >= x[0] && g[1] > x[1]
						? ((a = Math.min(a, I[0])),
							(s = Math.max(s, Math.max(y[0], w[0]))),
							(i = Math.min(i, T[1])),
							(c = Math.max(c, w[1])))
						: g[0] >= x[0]
							? ((a = Math.min(a, w[0])),
								(s = Math.max(s, T[0])),
								(i = Math.min(i, I[1])),
								(c = Math.max(c, y[1])))
							: g[1] <= x[1] &&
								((a = Math.min(a, Math.min(w[0], y[0]))),
								(s = Math.max(s, I[0])),
								(i = Math.min(i, w[1])),
								(c = Math.max(c, T[1]))),
				[a, i, s, c, l, d]
			);
		};
		static getElementAbsoluteCoords = (t, n, r = !1) => {
			let o, a, i, s, c;
			if (t.points.length < 2 || !me.get(t)) {
				let {
					minX: u,
					minY: p,
					maxX: m,
					maxY: h,
				} = t.points.reduce(
					(g, [x, y]) => (
						(g.minY = Math.min(g.minY, y)),
						(g.minX = Math.min(g.minX, x)),
						(g.maxX = Math.max(g.maxX, x)),
						(g.maxY = Math.max(g.maxY, y)),
						g
					),
					{ minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0 },
				);
				(a = u + t.x), (i = p + t.y), (s = m + t.x), (c = h + t.y);
			} else {
				let u = me.generateElementShape(t, null),
					p = mo(u[0]),
					[m, h, g, x] = ga(p);
				(a = m + t.x), (i = h + t.y), (s = g + t.x), (c = x + t.y);
			}
			let l = (a + s) / 2,
				d = (i + c) / 2;
			if (((o = [a, i, s, c, l, d]), !r)) return o;
			let U = ee(t, n);
			return U && (o = e.getMinMaxXYWithBoundText(t, n, [a, i, s, c], U)), o;
		};
	},
	ew = (e) => {
		let t = [...new Set(e.filter((n) => n !== null && n !== -1))];
		return (t = t.sort((n, r) => n - r)), t.length ? t : null;
	};
E();
var va = {},
	N5 = (e, t) => {
		let n = va[e] || (va[e] = { height: t });
		return (n.height = t), n;
	},
	P5 = (e) => {
		va[e] && delete va[e];
	},
	Cq = (e) => va[e]?.height ?? null;
var sd = (e) => B1(e).replace(/\t/g, "        "),
	cd = (e) =>
		sd(e).split(`
`),
	ld = (e, t, n, r = !0) => {
		let o,
			a = {
				x: e.x,
				y: e.y,
				text: e.text,
				width: e.width,
				height: e.height,
				angle: t?.angle ?? e.angle,
			};
		(a.text = e.text),
			(t || !e.autoResize) &&
				((o = t ? Nt(t, e) : e.width), (a.text = vn(e.originalText, pe(e), o)));
		let i = an(a.text, pe(e), e.lineHeight);
		if ((e.autoResize && (a.width = i.width), (a.height = i.height), t)) {
			let s = ba(t, e),
				c = Nt(t, e);
			if (!Q(t) && i.height > s) {
				let u = id(i.height, t.type);
				J(t, { height: u }, r), N5(t.id, u);
			}
			if (i.width > c) {
				let u = id(i.width, t.type);
				J(t, { width: u }, r);
			}
			let l = { ...e, ...a },
				{ x: d, y: U } = F5(t, l, n);
			(a.x = d), (a.y = U);
		}
		J(e, a, r);
	},
	Wq = (e, t, n) => {
		let r = j(e);
		t.forEach((o) => {
			let a = n.get(o.id),
				i = sn(o);
			if (i) {
				let s = n.get(i);
				if (s) {
					let c = r.get(a);
					c &&
						J(c, {
							boundElements: (o.boundElements || [])
								.filter((d) => d.id !== s && d.id !== i)
								.concat({ type: "text", id: s }),
						});
					let l = r.get(s);
					l && X(l) && J(l, { containerId: c ? a : null });
				}
			}
		});
	},
	Cr = (e, t, n, r = !1) => {
		if (!sn(e)) return;
		P5(e.id);
		let a = ee(e, t);
		if (a && a.text) {
			if (!e) return;
			let i = a.text,
				s = a.height,
				c = a.width,
				l = Nt(e, a),
				d = ba(e, a),
				U = e.height;
			if (r || (n !== "n" && n !== "s")) {
				i && (i = vn(a.originalText, pe(a), l));
				let u = an(i, pe(a), a.lineHeight);
				(s = u.height), (c = u.width);
			}
			if (s > d) {
				U = id(s, e.type);
				let u = U - e.height,
					p = !Q(e) && (n === "ne" || n === "nw" || n === "n") ? e.y - u : e.y;
				J(e, { height: U, y: p });
			}
			J(a, { text: i, width: c, height: s }), Q(e) || J(a, F5(e, a, t));
		}
	},
	F5 = (e, t, n) => {
		if (Q(e)) return W.getBoundTextElementPosition(e, t, n);
		let r = xl(e),
			o = ba(e, t),
			a = Nt(e, t),
			i,
			s;
		return (
			t.verticalAlign === xn.TOP
				? (s = r.y)
				: t.verticalAlign === xn.BOTTOM
					? (s = r.y + (o - t.height))
					: (s = r.y + (o / 2 - t.height / 2)),
			t.textAlign === Dc.LEFT
				? (i = r.x)
				: t.textAlign === Dc.RIGHT
					? (i = r.x + (a - t.width))
					: (i = r.x + (a / 2 - t.width / 2)),
			{ x: i, y: s }
		);
	},
	an = (e, t, n, r) => {
		let o = e
				.split(`
`)
				.map((c) => c || " ")
				.join(`
`),
			a = parseFloat(t),
			i = tw(o, a, n);
		return { width: B5(o, t, r), height: i };
	},
	O5 = (e) => {
		let t = cd(e.text).length;
		return e.height / t / e.fontSize;
	},
	uo = (e, t) => e * t,
	A5 = (e, t) => uo(e, t) + ve * 2,
	ad,
	Wn = (e, t, n) => {
		ad || (ad = document.createElement("canvas"));
		let r = ad.getContext("2d");
		r.font = t;
		let o = r.measureText(e),
			a = o.width;
		if (
			!n &&
			window.TextMetrics &&
			"actualBoundingBoxLeft" in window.TextMetrics.prototype &&
			"actualBoundingBoxRight" in window.TextMetrics.prototype
		) {
			let i =
				Math.abs(o.actualBoundingBoxLeft) + Math.abs(o.actualBoundingBoxRight);
			return Math.max(i, a);
		}
		return In() ? a * 10 : a;
	},
	B5 = (e, t, n) => {
		let r = cd(e),
			o = 0;
		return (
			r.forEach((a) => {
				o = Math.max(o, Wn(a, t, n));
			}),
			o
		);
	},
	tw = (e, t, n) => {
		let r = cd(e).length;
		return uo(t, n) * r;
	},
	Lr = (() => {
		let e = {};
		return {
			calculate: (o, a) => {
				let i = o.charCodeAt(0);
				if ((e[a] || (e[a] = []), !e[a][i])) {
					let s = Wn(o, a, !0);
					e[a][i] = s;
				}
				return e[a][i];
			},
			getCache: (o) => e[o],
			clearCache: (o) => {
				e[o] = [];
			},
		};
	})(),
	C5 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".toLocaleUpperCase(),
	K5 = (e, t) => {
		let n = nw(e);
		return n === 0
			? an(
					C5.split("").join(`
`),
					e,
					t,
				).width +
					ve * 2
			: n + ve * 2;
	};
var nw = (e) => {
		let t = Lr.getCache(e);
		if (!t) return 0;
		let n = t.filter((r) => r !== void 0);
		return Math.max(...n);
	},
	sn = (e) =>
		(e?.boundElements?.length &&
			e?.boundElements?.find((t) => t.type === "text")?.id) ||
		null,
	ee = (e, t) => {
		if (!e) return null;
		let n = sn(e);
		return (n && t.get(n)) || null;
	},
	Oe = (e, t) => (e && e.containerId && t.get(e.containerId)) || null,
	zq = (e, t, n) => {
		if (!Q(e)) return { x: e.x + e.width / 2, y: e.y + e.height / 2 };
		let r = W.getPointsGlobalCoordinates(e, n);
		if (r.length % 2 === 1) {
			let i = Math.floor(e.points.length / 2),
				s = W.getPointGlobalCoordinates(e, e.points[i], n);
			return { x: s[0], y: s[1] };
		}
		let o = e.points.length / 2 - 1,
			a = W.getEditorMidPoints(e, n, t)[o];
		return (
			a || (a = W.getSegmentMidPoint(e, r[o], r[o + 1], o + 1, n)),
			{ x: a[0], y: a[1] }
		);
	},
	xl = (e) => {
		let t = ve,
			n = ve;
		return (
			e.type === "ellipse" &&
				((t += (e.width / 2) * (1 - Math.sqrt(2) / 2)),
				(n += (e.height / 2) * (1 - Math.sqrt(2) / 2))),
			e.type === "diamond" && ((t += e.width / 4), (n += e.height / 4)),
			{ x: e.x + t, y: e.y + n }
		);
	},
	Qq = (e, t) => (!t || Q(t) ? e.angle : t.angle);
var jq = (e, t) =>
		e.some((n) => {
			if (Me(n)) {
				let r = Oe(n, t);
				return !Q(r);
			}
			return !1;
		}),
	eG = (e, t) =>
		e.some((n) => {
			if (Me(n)) {
				let r = Oe(n, t);
				return !Q(r);
			}
			return X(n);
		}),
	rw = new Set(["rectangle", "ellipse", "diamond", "arrow"]),
	tG = (e) => rw.has(e.type),
	id = (e, t) => {
		e = Math.ceil(e);
		let n = ve * 2;
		return t === "ellipse"
			? Math.round(((e + n) / Math.sqrt(2)) * 2)
			: t === "arrow"
				? e + n * 8
				: t === "diamond"
					? 2 * (e + n)
					: e + n;
	},
	Nt = (e, t) => {
		let { width: n } = e;
		if (Q(e)) {
			let r = (t?.fontSize ?? Zt) * r1;
			return Math.max(n1 * n, r);
		}
		return e.type === "ellipse"
			? Math.round((n / 2) * Math.sqrt(2)) - ve * 2
			: e.type === "diamond"
				? Math.round(n / 2) - ve * 2
				: n - ve * 2;
	},
	ba = (e, t) => {
		let { height: n } = e;
		return Q(e)
			? n - ve * 8 * 2 <= 0
				? t.height
				: n
			: e.type === "ellipse"
				? Math.round((n / 2) * Math.sqrt(2)) - ve * 2
				: e.type === "diamond"
					? Math.round(n / 2) - ve * 2
					: n - ve * 2;
	},
	nG = () => B5(C5, pe({ fontSize: Zt, fontFamily: Wt })) > 0,
	ys = (e, t) => an("", e, t).width + ve * 2,
	ow = (
		e,
		t = `

`,
	) => e.reduce((r, o) => (X(o) && r.push(o.text), r), []).join(t);
E();
E();
E();
E();
E();
var J5 = Kt(H5(), 1),
	Ma = (e) => e.replace(/"/g, "&quot;"),
	$n = (e) => ((e = e.trim()), e && (0, J5.sanitizeUrl)(Ma(e))),
	sG = (e) => !!(e?.includes(location.origin) || e?.startsWith("/")),
	k5 = (e) => {
		if (((e = $n(e)), e.startsWith("/"))) return `${location.origin}${e}`;
		try {
			new URL(e);
		} catch {
			return "about:blank";
		}
		return e;
	};
E();
E();
var Y5 = [],
	V5 = (e) => ((Y5 = Y5.concat(e)), e);
E();
var G5 =
		'<svg viewBox="0 0 24 24" stroke-width="1" width="28" height="28" xmlns="http://www.w3.org/2000/svg">',
	pw =
		'<path d="M6.164 11.755a5.314 5.314 0 0 1-4.932-5.298 5.314 5.314 0 0 1 5.311-5.311 5.314 5.314 0 0 1 5.307 5.113l8.773 8.773a3.322 3.322 0 0 1 0 4.696l-.895.895a3.322 3.322 0 0 1-4.696 0l-8.868-8.868Z" style="fill:#fff"/>',
	X5 =
		'<path stroke="#1b1b1f" fill="#fff" d="m7.868 11.113 7.773 7.774a2.359 2.359 0 0 0 1.667.691 2.368 2.368 0 0 0 2.357-2.358c0-.625-.248-1.225-.69-1.667L11.201 7.78 9.558 9.469l-1.69 1.643v.001Zm10.273 3.606-3.333 3.333m-3.25-6.583 2 2m-7-7 3 3M3.664 3.625l1 1M2.529 6.922l1.407-.144m5.735-2.932-1.118.866M4.285 9.823l.758-1.194m1.863-6.207-.13 1.408"/>',
	mw = `data:${B.svg},${encodeURIComponent(`${G5}${X5}</svg>`)}`,
	hw = `data:${B.svg},${encodeURIComponent(`${G5}${pw}${X5}</svg>`)}`,
	bw = (e) => {
		e && (e.style.cursor = "");
	},
	gw = (e, t) => {
		e && (e.style.cursor = t);
	},
	cn,
	q5,
	Ew = (e, t) => {
		let r = () => {
			let o = t === ke.DARK;
			(cn = document.createElement("canvas")),
				(cn.theme = t),
				(cn.height = 20),
				(cn.width = 20);
			let a = cn.getContext("2d");
			(a.lineWidth = 1),
				a.beginPath(),
				a.arc(cn.width / 2, cn.height / 2, 5, 0, 2 * Math.PI),
				(a.fillStyle = o ? En.black : En.white),
				a.fill(),
				(a.strokeStyle = o ? En.white : En.black),
				a.stroke(),
				(q5 = cn.toDataURL(B.svg));
		};
		(!cn || cn.theme !== t) && r(),
			gw(e, `url(${q5}) ${20 / 2} ${20 / 2}, auto`);
	},
	Z5 = (e, t) => {
		if (e)
			if (t.activeTool.type === "selection") bw(e);
			else if (u1(t)) e.style.cursor = di.GRAB;
			else if (f1(t)) Ew(e, t.theme);
			else if (t.activeTool.type === "laser") {
				let n = t.theme === ke.LIGHT ? mw : hw;
				e.style.cursor = `url(${n}), auto`;
			} else
				["image", "custom"].includes(t.activeTool.type)
					? t.activeTool.type !== "image" && (e.style.cursor = di.AUTO)
					: (e.style.cursor = di.CROSSHAIR);
	};
E();
E();
var xw = new oo(Date.now()),
	yw = 0,
	ln = () => Math.floor(xw.next() * 2 ** 31);
var At = () => (In() ? `id${yw++}` : Ei());
var dn = (
		e,
		{
			x: t,
			y: n,
			strokeColor: r = be.strokeColor,
			backgroundColor: o = be.backgroundColor,
			fillStyle: a = be.fillStyle,
			strokeWidth: i = be.strokeWidth,
			strokeStyle: s = be.strokeStyle,
			roughness: c = be.roughness,
			opacity: l = be.opacity,
			width: d = 0,
			height: U = 0,
			angle: u = 0,
			groupIds: p = [],
			frameId: m = null,
			index: h = null,
			roundness: g = null,
			boundElements: x = null,
			link: y = null,
			locked: w = be.locked,
			...T
		},
	) => ({
		id: T.id || At(),
		type: e,
		x: t,
		y: n,
		width: d,
		height: U,
		angle: u,
		strokeColor: r,
		backgroundColor: o,
		fillStyle: a,
		strokeWidth: i,
		strokeStyle: s,
		roughness: c,
		opacity: l,
		groupIds: p,
		frameId: m,
		index: h,
		roundness: g,
		seed: T.seed ?? ln(),
		version: T.version || 1,
		versionNonce: T.versionNonce ?? 0,
		isDeleted: !1,
		boundElements: x,
		updated: wn(),
		link: y,
		locked: w,
		customData: T.customData,
	}),
	_a = (e) => dn(e.type, e),
	$G = (e) => dn("embeddable", e),
	NG = (e) => ({ ...dn("iframe", e) }),
	PG = (e) =>
		Bt({ ...dn("frame", e), type: "frame", name: e?.name || null }, {}),
	FG = (e) =>
		Bt(
			{ ...dn("magicframe", e), type: "magicframe", name: e?.name || null },
			{},
		),
	W5 = (e, t) => ({
		x:
			e.textAlign === "center"
				? t.width / 2
				: e.textAlign === "right"
					? t.width
					: 0,
		y: e.verticalAlign === "middle" ? t.height / 2 : 0,
	}),
	Un = (e) => {
		let t = e.fontFamily || Wt,
			n = e.fontSize || Zt,
			r = e.lineHeight || Qi(t),
			o = sd(e.text),
			a = an(o, pe({ fontFamily: t, fontSize: n }), r),
			i = e.textAlign || to,
			s = e.verticalAlign || ui,
			c = W5({ textAlign: i, verticalAlign: s }, a),
			l = {
				...dn("text", e),
				text: o,
				fontSize: n,
				fontFamily: t,
				textAlign: i,
				verticalAlign: s,
				x: e.x - c.x,
				y: e.y - c.y,
				width: a.width,
				height: a.height,
				containerId: e.containerId || null,
				originalText: e.originalText ?? o,
				autoResize: e.autoResize ?? !0,
				lineHeight: r,
			};
		return Bt(l, {});
	},
	ww = (e, t, n) => {
		let { width: r, height: o } = an(n, pe(e), e.lineHeight);
		e.autoResize || (r = e.width);
		let { textAlign: a, verticalAlign: i } = e,
			s,
			c;
		if (a === "center" && i === xn.MIDDLE && !e.containerId && e.autoResize) {
			let l = an(e.text, pe(e), e.lineHeight),
				d = W5(e, { width: r - l.width, height: o - l.height });
			(s = e.x - d.x), (c = e.y - d.y);
		} else {
			let [l, d, U, u] = H(e, t),
				[p, m, h, g] = $t(e, r, o, !1),
				x = (l - p) / 2,
				y = (d - m) / 2,
				w = (U - h) / 2,
				T = (u - g) / 2;
			[s, c] = Iw(
				{
					s: !0,
					e: a === "center" || a === "left",
					w: a === "center" || a === "right",
				},
				e.x,
				e.y,
				e.angle,
				x,
				y,
				w,
				T,
			);
		}
		return {
			width: r,
			height: o,
			x: Number.isFinite(s) ? s : e.x,
			y: Number.isFinite(c) ? c : e.y,
		};
	},
	Iw = (e, t, n, r, o, a, i, s) => {
		let c = Math.cos(r),
			l = Math.sin(r);
		return (
			e.e && e.w
				? (t += o + i)
				: e.e
					? ((t += o * (1 + c)),
						(n += o * l),
						(t += i * (1 - c)),
						(n += i * -l))
					: e.w &&
						((t += o * (1 - c)),
						(n += o * -l),
						(t += i * (1 + c)),
						(n += i * l)),
			e.n && e.s
				? (n += a + s)
				: e.n
					? ((t += a * l),
						(n += a * (1 - c)),
						(t += s * -l),
						(n += s * (1 + c)))
					: e.s &&
						((t += a * -l),
						(n += a * (1 + c)),
						(t += s * l),
						(n += s * (1 - c))),
			[t, n]
		);
	},
	dd = (e, t, n, r = e.text) => {
		if (e.isDeleted) return;
		(t || !e.autoResize) && (r = vn(r, pe(e), t ? Nt(t, e) : e.width));
		let o = ww(e, n, r);
		return { text: r, ...o };
	},
	OG = (e) => ({
		...dn(e.type, e),
		points: e.points || [],
		pressures: e.pressures || [],
		simulatePressure: e.simulatePressure,
		lastCommittedPoint: null,
	}),
	Kr = (e) => ({
		...dn(e.type, e),
		points: e.points || [],
		lastCommittedPoint: null,
		startBinding: null,
		endBinding: null,
		startArrowhead: null,
		endArrowhead: null,
	}),
	Tw = (e) => ({
		...dn(e.type, e),
		points: e.points || [],
		lastCommittedPoint: null,
		startBinding: null,
		endBinding: null,
		startArrowhead: e.startArrowhead || null,
		endArrowhead: e.endArrowhead || null,
		elbowed: e.elbowed || !1,
	}),
	Rw = (e) => ({
		...dn("image", e),
		strokeColor: "transparent",
		status: e.status ?? "pending",
		fileId: e.fileId ?? null,
		scale: e.scale ?? [1, 1],
		crop: e.crop ?? null,
	}),
	Is = (e, t = 0) => {
		if (e == null || typeof e != "object") return e;
		let n = Object.prototype.toString.call(e);
		if (n === "[object Object]") {
			let r =
				typeof e.constructor == "function"
					? Object.create(Object.getPrototypeOf(e))
					: {};
			for (let o in e)
				if (e.hasOwnProperty(o)) {
					if (t === 0 && (o === "shape" || o === "canvas")) continue;
					r[o] = Is(e[o], t + 1);
				}
			return r;
		}
		if (Array.isArray(e)) {
			let r = e.length,
				o = new Array(r);
			for (; r--; ) o[r] = Is(e[r], t + 1);
			return o;
		}
		return (
			R.DEV &&
				n !== "[object Object]" &&
				n !== "[object Array]" &&
				n.startsWith("[object ") &&
				console.warn(
					`_deepCloneElement: unexpected object type ${n}. This value will not be cloned!`,
				),
			e
		);
	},
	La = (e) => Is(e),
	Ts = (e) => {
		if (In() && e) {
			let t = `${e}_copy`;
			return (
				window.h?.app
					?.getSceneElementsIncludingDeleted()
					.find((n) => n.id === t) && (t += "_copy"),
				t
			);
		}
		return At();
	},
	vw = (e, t, n, r) => {
		let o = La(n);
		return (
			(o.id = Ts(o.id)),
			(o.boundElements = null),
			(o.updated = wn()),
			(o.seed = ln()),
			(o.groupIds = R5(
				o.groupIds,
				e,
				(a) => (t.has(a) || t.set(a, Ts(a)), t.get(a)),
			)),
			r && (o = Object.assign(o, r)),
			o
		);
	},
	AG = (e, t) => {
		let n = [],
			r = j(e),
			o = new Map(),
			a = (s) => {
				if (o.has(s)) return o.get(s);
				if (r.has(s)) {
					let c = Ts(s);
					return o.set(s, c), c;
				}
				return null;
			},
			i = new Map();
		for (let s of e) {
			let c = Is(s);
			if (
				((c.id = a(s.id)),
				t?.randomizeSeed && ((c.seed = ln()), Da(c)),
				c.groupIds &&
					(c.groupIds = c.groupIds.map(
						(l) => (i.has(l) || i.set(l, Ts(l)), i.get(l)),
					)),
				"containerId" in c && c.containerId)
			) {
				let l = a(c.containerId);
				c.containerId = l;
			}
			if (
				("boundElements" in c &&
					c.boundElements &&
					(c.boundElements = c.boundElements.reduce((l, d) => {
						let U = a(d.id);
						return U && l.push({ ...d, id: U }), l;
					}, [])),
				"endBinding" in c && c.endBinding)
			) {
				let l = a(c.endBinding.elementId);
				c.endBinding = l ? { ...c.endBinding, elementId: l } : null;
			}
			if ("startBinding" in c && c.startBinding) {
				let l = a(c.startBinding.elementId);
				c.startBinding = l ? { ...c.startBinding, elementId: l } : null;
			}
			c.frameId && (c.frameId = a(c.frameId)), n.push(c);
		}
		return n;
	};
E();
E();
E();
E();
var j5 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
function Io(e, t, n) {
	let r = n[0];
	if (t != null && e >= t) throw new Error(e + " >= " + t);
	if (e.slice(-1) === r || (t && t.slice(-1) === r))
		throw new Error("trailing zero");
	if (t) {
		let i = 0;
		for (; (e[i] || r) === t[i]; ) i++;
		if (i > 0) return t.slice(0, i) + Io(e.slice(i), t.slice(i), n);
	}
	let o = e ? n.indexOf(e[0]) : 0,
		a = t != null ? n.indexOf(t[0]) : n.length;
	if (a - o > 1) {
		let i = Math.round(0.5 * (o + a));
		return n[i];
	} else
		return t && t.length > 1 ? t.slice(0, 1) : n[o] + Io(e.slice(1), null, n);
}
function em(e) {
	if (e.length !== tm(e[0]))
		throw new Error("invalid integer part of order key: " + e);
}
function tm(e) {
	if (e >= "a" && e <= "z") return e.charCodeAt(0) - 97 + 2;
	if (e >= "A" && e <= "Z") return 90 - e.charCodeAt(0) + 2;
	throw new Error("invalid order key head: " + e);
}
function Sa(e) {
	let t = tm(e[0]);
	if (t > e.length) throw new Error("invalid order key: " + e);
	return e.slice(0, t);
}
function z5(e, t) {
	if (e === "A" + t[0].repeat(26)) throw new Error("invalid order key: " + e);
	let n = Sa(e);
	if (e.slice(n.length).slice(-1) === t[0])
		throw new Error("invalid order key: " + e);
}
function Q5(e, t) {
	em(e);
	let [n, ...r] = e.split(""),
		o = !0;
	for (let a = r.length - 1; o && a >= 0; a--) {
		let i = t.indexOf(r[a]) + 1;
		i === t.length ? (r[a] = t[0]) : ((r[a] = t[i]), (o = !1));
	}
	if (o) {
		if (n === "Z") return "a" + t[0];
		if (n === "z") return null;
		let a = String.fromCharCode(n.charCodeAt(0) + 1);
		return a > "a" ? r.push(t[0]) : r.pop(), a + r.join("");
	} else return n + r.join("");
}
function Mw(e, t) {
	em(e);
	let [n, ...r] = e.split(""),
		o = !0;
	for (let a = r.length - 1; o && a >= 0; a--) {
		let i = t.indexOf(r[a]) - 1;
		i === -1 ? (r[a] = t.slice(-1)) : ((r[a] = t[i]), (o = !1));
	}
	if (o) {
		if (n === "a") return "Z" + t.slice(-1);
		if (n === "A") return null;
		let a = String.fromCharCode(n.charCodeAt(0) - 1);
		return a < "Z" ? r.push(t.slice(-1)) : r.pop(), a + r.join("");
	} else return n + r.join("");
}
function wo(e, t, n = j5) {
	if (
		(e != null && z5(e, n),
		t != null && z5(t, n),
		e != null && t != null && e >= t)
	)
		throw new Error(e + " >= " + t);
	if (e == null) {
		if (t == null) return "a" + n[0];
		let c = Sa(t),
			l = t.slice(c.length);
		if (c === "A" + n[0].repeat(26)) return c + Io("", l, n);
		if (c < t) return c;
		let d = Mw(c, n);
		if (d == null) throw new Error("cannot decrement any more");
		return d;
	}
	if (t == null) {
		let c = Sa(e),
			l = e.slice(c.length),
			d = Q5(c, n);
		return d ?? c + Io(l, null, n);
	}
	let r = Sa(e),
		o = e.slice(r.length),
		a = Sa(t),
		i = t.slice(a.length);
	if (r === a) return r + Io(o, i, n);
	let s = Q5(r, n);
	if (s == null) throw new Error("cannot increment any more");
	return s < t ? s : r + Io(o, null, n);
}
function Rs(e, t, n, r = j5) {
	if (n === 0) return [];
	if (n === 1) return [wo(e, t, r)];
	if (t == null) {
		let i = wo(e, t, r),
			s = [i];
		for (let c = 0; c < n - 1; c++) (i = wo(i, t, r)), s.push(i);
		return s;
	}
	if (e == null) {
		let i = wo(e, t, r),
			s = [i];
		for (let c = 0; c < n - 1; c++) (i = wo(e, i, r)), s.push(i);
		return s.reverse(), s;
	}
	let o = Math.floor(n / 2),
		a = wo(e, t, r);
	return [...Rs(e, a, o, r), a, ...Rs(a, t, n - o - 1, r)];
}
var fd = (
		e,
		{
			shouldThrow: t = !1,
			includeBoundTextValidation: n = !1,
			ignoreLogs: r,
			reconciliationContext: o,
		},
	) => {
		let a = [],
			i = (c) =>
				`${c?.index}:${c?.id}:${c?.type}:${c?.isDeleted}:${c?.version}:${c?.versionNonce}`,
			s = e.map((c) => c.index);
		for (let [c, l] of s.entries()) {
			let d = s[c - 1],
				U = s[c + 1];
			if (
				(Ud(l, d, U) ||
					a.push(
						`Fractional indices invariant has been compromised: "${i(e[c - 1])}", "${i(e[c])}", "${i(e[c + 1])}"`,
					),
				n && Zn(e[c]))
			) {
				let u = e[c],
					p = ee(u, j(e));
				p &&
					p.index <= u.index &&
					a.push(
						`Fractional indices invariant for bound elements has been compromised: "${i(p)}", "${i(u)}"`,
					);
			}
		}
		if (a.length) {
			let c = new Xi(),
				l = [];
			if (
				(o &&
					(l.push("Additional reconciliation context:"),
					l.push(o.localElements.map((d) => i(d))),
					l.push(o.remoteElements.map((d) => i(d)))),
				r ||
					console.error(
						a.join(`

`),
						c.stack,
						e.map((d) => i(d)),
						...l,
					),
				t)
			)
				throw c;
		}
	},
	rm = (e) =>
		e.sort((t, n) =>
			nm(t) && nm(n)
				? t.index < n.index
					? -1
					: t.index > n.index
						? 1
						: t.id < n.id
							? -1
							: 1
				: 1,
		),
	$a = (e, t) => {
		try {
			let n = _w(e, t),
				r = om(e, n),
				o = e.map((a) => (r.has(a) ? { ...a, ...r.get(a) } : a));
			fd(o, {
				includeBoundTextValidation: !1,
				shouldThrow: !0,
				ignoreLogs: !0,
			});
			for (let [a, i] of r) J(a, i, !1);
		} catch {
			Hr(e);
		}
		return e;
	},
	Hr = (e) => {
		let t = Lw(e),
			n = om(e, t);
		for (let [r, o] of n) J(r, o, !1);
		return e;
	},
	_w = (e, t) => {
		let n = [],
			r = 0;
		for (; r < e.length; )
			if (t.has(e[r].id)) {
				let o = [r - 1, r];
				for (; ++r < e.length && t.has(e[r].id); ) o.push(r);
				o.push(r), n.push(o);
			} else r++;
		return n;
	},
	Lw = (e) => {
		let t = [],
			n,
			r,
			o = -1,
			a = 0,
			i = (l) => {
				let d = e[o] ? e[o].index : void 0,
					U = e[l - 1]?.index;
				return (!d && U) || (d && U && U > d) ? [U, l - 1] : [d, o];
			},
			s = (l) => {
				let d = e[a] ? e[a].index : void 0;
				if (d && l < a) return [d, a];
				let U = a;
				for (; ++U < e.length; ) {
					let u = e[U]?.index;
					if ((!d && u) || (d && u && u > d)) return [u, U];
				}
				return [void 0, U];
			},
			c = 0;
		for (; c < e.length; ) {
			let l = e[c].index;
			if ((([n, o] = i(c)), ([r, a] = s(c)), Ud(l, n, r))) c++;
			else {
				let d = [o, c];
				for (; ++c < e.length; ) {
					let U = e[c].index,
						[u, p] = i(c),
						[m, h] = s(c);
					if (Ud(U, u, m)) break;
					([n, o] = [u, p]), ([r, a] = [m, h]), d.push(c);
				}
				d.push(a), t.push(d);
			}
		}
		return t;
	},
	Ud = (e, t, n) =>
		e
			? t && n
				? t < e && e < n
				: !t && n
					? e < n
					: t && !n
						? t < e
						: !!e
			: !1,
	om = (e, t) => {
		let n = new Map();
		for (let r of t) {
			let o = r.shift(),
				a = r.pop(),
				i = Rs(e[o]?.index, e[a]?.index, r.length);
			for (let s = 0; s < r.length; s++) {
				let c = e[r[s]];
				n.set(c, { index: i[s] });
			}
		}
		return n;
	},
	nm = (e) => !!e.index;
var ye = class e {
		constructor(t, n) {
			this.deleted = t;
			this.inserted = n;
		}
		static create(t, n, r, o) {
			let a = r && o !== "inserted" ? r(t) : t,
				i = r && o !== "deleted" ? r(n) : n;
			return new e(a, i);
		}
		static calculate(t, n, r, o) {
			if (t === n) return e.empty();
			let a = {},
				i = {};
			for (let l of this.distinctKeysIterator("full", t, n))
				(a[l] = t[l]), (i[l] = n[l]);
			let [s, c] = o ? o(a, i) : [a, i];
			return e.create(s, c, r);
		}
		static empty() {
			return new e({}, {});
		}
		static isEmpty(t) {
			return !Object.keys(t.deleted).length && !Object.keys(t.inserted).length;
		}
		static mergeObjects(t, n, r) {
			let o = { ...t };
			for (let a of Object.keys(r)) delete o[a];
			return { ...o, ...n };
		}
		static mergeArrays(t, n, r, o) {
			return Object.values(
				e.mergeObjects(Qt(t ?? [], o), Qt(n ?? [], o), Qt(r ?? [], o)),
			);
		}
		static diffObjects(t, n, r, o) {
			if (
				!(!t[r] && !n[r]) &&
				(typeof t[r] == "object" || typeof n[r] == "object")
			) {
				let a = t[r] ?? {},
					i = n[r] ?? {},
					s = e
						.getLeftDifferences(a, i)
						.reduce((l, d) => ((l[d] = o(a[d])), l), {}),
					c = e
						.getRightDifferences(a, i)
						.reduce((l, d) => ((l[d] = o(i[d])), l), {});
				Object.keys(s).length || Object.keys(c).length
					? (Reflect.set(t, r, s), Reflect.set(n, r, c))
					: (Reflect.deleteProperty(t, r), Reflect.deleteProperty(n, r));
			}
		}
		static diffArrays(t, n, r, o) {
			if (!(!t[r] && !n[r]) && (Array.isArray(t[r]) || Array.isArray(n[r]))) {
				let a = Array.isArray(t[r]) ? t[r] : [],
					i = Array.isArray(n[r]) ? n[r] : [],
					s = Qt(e.getLeftDifferences(Qt(a, o), Qt(i, o))),
					c = Qt(e.getRightDifferences(Qt(a, o), Qt(i, o)));
				if (Object.keys(s).length || Object.keys(c).length) {
					let l = a.filter((U) => s[o ? o(U) : String(U)]),
						d = i.filter((U) => c[o ? o(U) : String(U)]);
					Reflect.set(t, r, l), Reflect.set(n, r, d);
				} else Reflect.deleteProperty(t, r), Reflect.deleteProperty(n, r);
			}
		}
		static isLeftDifferent(t, n, r = !1) {
			return !!this.distinctKeysIterator("left", t, n, r).next().value;
		}
		static isRightDifferent(t, n, r = !1) {
			return !!this.distinctKeysIterator("right", t, n, r).next().value;
		}
		static getLeftDifferences(t, n, r = !1) {
			return Array.from(this.distinctKeysIterator("left", t, n, r));
		}
		static getRightDifferences(t, n, r = !1) {
			return Array.from(this.distinctKeysIterator("right", t, n, r));
		}
		static *distinctKeysIterator(t, n, r, o = !1) {
			if (n === r) return;
			let a = [];
			t === "left"
				? (a = Object.keys(n))
				: t === "right"
					? (a = Object.keys(r))
					: t === "full"
						? (a = Array.from(new Set([...Object.keys(n), ...Object.keys(r)])))
						: vr(t, `Unknown distinctKeysIterator's join param "${t}"`, !0);
			for (let i of a) {
				let s = n[i],
					c = r[i];
				if (s !== c) {
					if (
						!o &&
						typeof s == "object" &&
						typeof c == "object" &&
						s !== null &&
						c !== null &&
						Tn(s, c)
					)
						continue;
					yield i;
				}
			}
		}
	},
	Na = class e {
		constructor(t) {
			this.delta = t;
		}
		static calculate(t, n) {
			let r = ye.calculate(t, n, void 0, e.postProcess);
			return new e(r);
		}
		static empty() {
			return new e(ye.create({}, {}));
		}
		inverse() {
			let t = ye.create(this.delta.inserted, this.delta.deleted);
			return new e(t);
		}
		applyTo(t, n) {
			try {
				let { selectedElementIds: r = {}, selectedGroupIds: o = {} } =
						this.delta.deleted,
					{
						selectedElementIds: a = {},
						selectedGroupIds: i = {},
						selectedLinearElementId: s,
						editingLinearElementId: c,
						...l
					} = this.delta.inserted,
					d = ye.mergeObjects(t.selectedElementIds, a, r),
					U = ye.mergeObjects(t.selectedGroupIds, i, o),
					u = s && n.has(s) ? new W(n.get(s)) : null,
					p = c && n.has(c) ? new W(n.get(c)) : null,
					m = {
						...t,
						...l,
						selectedElementIds: d,
						selectedGroupIds: U,
						selectedLinearElement: typeof s < "u" ? u : t.selectedLinearElement,
						editingLinearElement: typeof c < "u" ? p : t.editingLinearElement,
					},
					h = this.filterInvisibleChanges(t, m, n);
				return [m, h];
			} catch (r) {
				if (
					(console.error("Couldn't apply appstate change", r),
					R.DEV || R.MODE === We.TEST)
				)
					throw r;
				return [t, !1];
			}
		}
		isEmpty() {
			return ye.isEmpty(this.delta);
		}
		static postProcess(t, n) {
			try {
				ye.diffObjects(t, n, "selectedElementIds", (r) => !0),
					ye.diffObjects(t, n, "selectedGroupIds", (r) => r ?? !1);
			} catch (r) {
				if (
					(console.error("Couldn't postprocess appstate change deltas."),
					R.DEV || R.MODE === We.TEST)
				)
					throw r;
			} finally {
				return [t, n];
			}
		}
		filterInvisibleChanges(t, n, r) {
			let o = Fa(t),
				a = Fa(n),
				i = ye.isRightDifferent(
					e.stripElementsProps(o),
					e.stripElementsProps(a),
				),
				s = ye.isRightDifferent(
					e.stripStandaloneProps(o),
					e.stripStandaloneProps(a),
				);
			if (!i && !s) return !1;
			let c = { value: i };
			if (s) {
				let l = ye.getRightDifferences(
						e.stripStandaloneProps(o),
						e.stripStandaloneProps(a),
					),
					d = new Set();
				(l.includes("editingGroupId") || l.includes("selectedGroupIds")) &&
					(d = v5(r));
				for (let U of l)
					switch (U) {
						case "selectedElementIds":
							n[U] = e.filterSelectedElements(n[U], r, c);
							break;
						case "selectedGroupIds":
							n[U] = e.filterSelectedGroups(n[U], d, c);
							break;
						case "croppingElementId": {
							let h = n[U],
								g = h && r.get(h);
							g && !g.isDeleted ? (c.value = !0) : (n[U] = null);
							break;
						}
						case "editingGroupId":
							let u = n[U];
							u ? (d.has(u) ? (c.value = !0) : (n[U] = null)) : (c.value = !0);
							break;
						case "selectedLinearElementId":
						case "editingLinearElementId":
							let p = e.convertToAppStateKey(U),
								m = n[p];
							if (!m) c.value = !0;
							else {
								let h = r.get(m.elementId);
								h && !h.isDeleted ? (c.value = !0) : (n[p] = null);
							}
							break;
						default:
							vr(U, `Unknown ObservedElementsAppState's key "${U}"`, !0);
					}
			}
			return c.value;
		}
		static convertToAppStateKey(t) {
			switch (t) {
				case "selectedLinearElementId":
					return "selectedLinearElement";
				case "editingLinearElementId":
					return "editingLinearElement";
			}
		}
		static filterSelectedElements(t, n, r) {
			let o = Object.keys(t);
			if (!o.length) return (r.value = !0), t;
			let a = { ...t };
			for (let i of o) {
				let s = n.get(i);
				s && !s.isDeleted ? (r.value = !0) : delete a[i];
			}
			return a;
		}
		static filterSelectedGroups(t, n, r) {
			if (!Object.keys(t).length) return (r.value = !0), t;
			let a = { ...t };
			for (let i of Object.keys(a)) n.has(i) ? (r.value = !0) : delete a[i];
			return a;
		}
		static stripElementsProps(t) {
			let {
				editingGroupId: n,
				selectedGroupIds: r,
				selectedElementIds: o,
				editingLinearElementId: a,
				selectedLinearElementId: i,
				croppingElementId: s,
				...c
			} = t;
			return c;
		}
		static stripStandaloneProps(t) {
			let { name: n, viewBackgroundColor: r, ...o } = t;
			return o;
		}
	},
	Pa = class e {
		constructor(t, n, r) {
			this.added = t;
			this.removed = n;
			this.updated = r;
		}
		static create(t, n, r, o = { shouldRedistribute: !1 }) {
			let a;
			if (o.shouldRedistribute) {
				let i = new Map(),
					s = new Map(),
					c = new Map(),
					l = [...t, ...n, ...r];
				for (let [d, U] of l)
					this.satisfiesAddition(U)
						? i.set(d, U)
						: this.satisfiesRemoval(U)
							? s.set(d, U)
							: c.set(d, U);
				a = new e(i, s, c);
			} else a = new e(t, n, r);
			return (
				(R.DEV || R.MODE === We.TEST) &&
					(e.validate(a, "added", this.satisfiesAddition),
					e.validate(a, "removed", this.satisfiesRemoval),
					e.validate(a, "updated", this.satisfiesUpdate)),
				a
			);
		}
		static satisfiesAddition = ({ deleted: t, inserted: n }) =>
			t.isDeleted === !0 && !n.isDeleted;
		static satisfiesRemoval = ({ deleted: t, inserted: n }) =>
			!t.isDeleted && n.isDeleted === !0;
		static satisfiesUpdate = ({ deleted: t, inserted: n }) =>
			!!t.isDeleted == !!n.isDeleted;
		static validate(t, n, r) {
			for (let [o, a] of t[n].entries())
				if (!r(a))
					throw (
						(console.error(
							`Broken invariant for "${n}" delta, element "${o}", delta:`,
							a,
						),
						new Error(`ElementsChange invariant broken for element "${o}".`))
					);
		}
		static calculate(t, n) {
			if (t === n) return e.empty();
			let r = new Map(),
				o = new Map(),
				a = new Map();
			for (let i of t.values())
				if (!n.get(i.id)) {
					let c = { ...i, isDeleted: !1 },
						l = { isDeleted: !0 },
						d = ye.create(c, l, e.stripIrrelevantProps);
					o.set(i.id, d);
				}
			for (let i of n.values()) {
				let s = t.get(i.id);
				if (!s) {
					let c = { isDeleted: !0 },
						l = { ...i, isDeleted: !1 },
						d = ye.create(c, l, e.stripIrrelevantProps);
					r.set(i.id, d);
					continue;
				}
				if (s.versionNonce !== i.versionNonce) {
					let c = ye.calculate(s, i, e.stripIrrelevantProps, e.postProcess);
					if (
						typeof s.isDeleted == "boolean" &&
						typeof i.isDeleted == "boolean" &&
						s.isDeleted !== i.isDeleted
					) {
						s.isDeleted && !i.isDeleted ? r.set(i.id, c) : o.set(i.id, c);
						continue;
					}
					ye.isEmpty(c) || a.set(i.id, c);
				}
			}
			return e.create(r, o, a);
		}
		static empty() {
			return e.create(new Map(), new Map(), new Map());
		}
		inverse() {
			let t = (a) => {
					let i = new Map();
					for (let [s, c] of a.entries())
						i.set(s, ye.create(c.inserted, c.deleted));
					return i;
				},
				n = t(this.added),
				r = t(this.removed),
				o = t(this.updated);
			return e.create(r, n, o);
		}
		isEmpty() {
			return (
				this.added.size === 0 &&
				this.removed.size === 0 &&
				this.updated.size === 0
			);
		}
		applyLatestChanges(t) {
			let n = (s) => (c) => {
					let l = {};
					for (let d of Object.keys(c))
						switch (d) {
							case "boundElements":
								l[d] = c[d];
								break;
							default:
								l[d] = s[d];
						}
					return l;
				},
				r = (s) => {
					let c = new Map();
					for (let [l, d] of s.entries()) {
						let U = t.get(l);
						if (U) {
							let u = ye.create(d.deleted, d.inserted, n(U), "inserted");
							c.set(l, u);
						} else c.set(l, d);
					}
					return c;
				},
				o = r(this.added),
				a = r(this.removed),
				i = r(this.updated);
			return e.create(o, a, i, { shouldRedistribute: !0 });
		}
		applyTo(t, n) {
			let r = Be(new Map(t)),
				o,
				a = { containsVisibleDifference: !1, containsZindexDifference: !1 };
			try {
				let i = e.createApplier(r, n, a),
					s = i(this.added),
					c = i(this.removed),
					l = i(this.updated),
					d = this.resolveConflicts(t, r);
				o = new Map([...s, ...c, ...l, ...d]);
			} catch (i) {
				if (
					(console.error("Couldn't apply elements change", i),
					R.DEV || R.MODE === We.TEST)
				)
					throw i;
				return [t, !0];
			}
			try {
				e.redrawTextBoundingBoxes(r, o),
					(r = e.reorderElements(r, o, a)),
					e.redrawBoundArrows(r, o);
			} catch (i) {
				if (
					(console.error(
						"Couldn't mutate elements after applying elements change",
						i,
					),
					R.DEV || R.MODE === We.TEST)
				)
					throw i;
			} finally {
				return [r, a.containsVisibleDifference];
			}
		}
		static createApplier = (t, n, r) => {
			let o = e.createGetter(t, n, r);
			return (a) =>
				Array.from(a.entries()).reduce((i, [s, c]) => {
					let l = o(s, c.inserted);
					if (l) {
						let d = e.applyDelta(l, c, r);
						t.set(d.id, d), i.set(d.id, d);
					}
					return i;
				}, new Map());
		};
		static createGetter = (t, n, r) => (o, a) => {
			let i = t.get(o);
			return (
				i ||
					((i = n.get(o)),
					i &&
						((r.containsZindexDifference = !0),
						(a.isDeleted === !1 ||
							(a.isDeleted !== !0 && i.isDeleted === !1)) &&
							(r.containsVisibleDifference = !0))),
				i
			);
		};
		static applyDelta(
			t,
			n,
			r = { containsVisibleDifference: !0, containsZindexDifference: !0 },
		) {
			let { boundElements: o, ...a } = n.inserted;
			if (n.deleted.boundElements?.length || n.inserted.boundElements?.length) {
				let i = ye.mergeArrays(
					t.boundElements,
					n.inserted.boundElements,
					n.deleted.boundElements,
					(s) => s.id,
				);
				Object.assign(a, { boundElements: i });
			}
			if (Pe(t)) {
				let i = n;
				(i.deleted.crop || i.inserted.crop) &&
					Object.assign(a, { crop: i.inserted.crop ?? null });
			}
			if (!r.containsVisibleDifference) {
				let { index: i, ...s } = a,
					c = e.checkForVisibleDifference(t, s);
				r.containsVisibleDifference = c;
			}
			return (
				r.containsZindexDifference ||
					(r.containsZindexDifference = n.deleted.index !== n.inserted.index),
				Bt(t, a)
			);
		}
		static checkForVisibleDifference(t, n) {
			return t.isDeleted && n.isDeleted !== !1
				? !1
				: (t.isDeleted && n.isDeleted === !1) ||
						(t.isDeleted === !1 && n.isDeleted)
					? !0
					: ye.isRightDifferent(t, n);
		}
		resolveConflicts(t, n) {
			let r = new Map(),
				o = (l, d) => {
					let U = n.get(l.id);
					if (!U) return;
					let u;
					t.get(l.id) === U ? (u = Bt(U, d)) : (u = J(U, d)),
						r.set(u.id, u),
						n.set(u.id, u);
				};
			for (let [l] of this.removed) e.unbindAffected(t, n, l, o);
			for (let [l] of this.added) e.rebindAffected(t, n, l, o);
			for (let [l] of Array.from(this.updated).filter(([d, U]) =>
				Object.keys({ ...U.deleted, ...U.inserted }).find((u) => m5.has(u)),
			)) {
				let d = n.get(l);
				!d || d.isDeleted || e.rebindAffected(t, n, l, o);
			}
			let a = new Map(Array.from(t).filter(([l]) => r.has(l))),
				{ added: i, removed: s, updated: c } = e.calculate(a, r);
			for (let [l, d] of i) this.added.set(l, d);
			for (let [l, d] of s) this.removed.set(l, d);
			for (let [l, d] of c) this.updated.set(l, d);
			return r;
		}
		static unbindAffected(t, n, r, o) {
			let a = () => t.get(r),
				i = () => n.get(r);
			rr.unbindAffected(n, a(), o),
				rr.unbindAffected(n, i(), o),
				or.unbindAffected(n, a(), o),
				or.unbindAffected(n, i(), o);
		}
		static rebindAffected(t, n, r, o) {
			let a = () => t.get(r),
				i = () => n.get(r);
			rr.unbindAffected(n, a(), o),
				rr.rebindAffected(n, i(), o),
				or.unbindAffected(n, a(), (s, c) => {
					X(s) && o(s, c);
				}),
				or.rebindAffected(n, i(), o);
		}
		static redrawTextBoundingBoxes(t, n) {
			let r = new Map();
			for (let o of n.values()) {
				if (Me(o)) {
					let { containerId: a } = o,
						i = a ? t.get(a) : void 0;
					i && r.set(i.id, { container: i, boundText: o });
				}
				if (Zn(o)) {
					let a = sn(o),
						i = a ? t.get(a) : void 0;
					i && r.set(o.id, { container: o, boundText: i });
				}
			}
			for (let { container: o, boundText: a } of r.values())
				o.isDeleted || a.isDeleted || ld(a, o, t, !1);
		}
		static redrawBoundArrows(t, n) {
			for (let r of n.values())
				!r.isDeleted && en(r) && Ot(r, t, { changedElements: n });
		}
		static reorderElements(t, n, r) {
			if (!r.containsZindexDifference) return t;
			let o = Array.from(t.values()),
				a = rm([...o]),
				i = ye.getRightDifferences(o, a, !0).reduce((s, c) => {
					let l = o[Number(c)];
					return l && n.has(l.id) && s.set(l.id, l), s;
				}, new Map());
			return (
				!r.containsVisibleDifference &&
					i.size &&
					(r.containsVisibleDifference = !0),
				j($a(a, i))
			);
		}
		static postProcess(t, n) {
			try {
				ye.diffArrays(t, n, "boundElements", (r) => r.id);
			} catch (r) {
				if (
					(console.error("Couldn't postprocess elements change deltas."),
					R.DEV || R.MODE === We.TEST)
				)
					throw r;
			} finally {
				return [t, n];
			}
		}
		static stripIrrelevantProps(t) {
			let { id: n, updated: r, version: o, versionNonce: a, seed: i, ...s } = t;
			return s;
		}
	};
E();
var vs = class {
	subscribers = [];
	on(...t) {
		let n = t.flat().filter((r) => typeof r == "function");
		return this.subscribers.push(...n), () => this.off(n);
	}
	once(...t) {
		let n = t.flat().filter((o) => typeof o == "function");
		n.push(() => r());
		let r = this.on(...n);
		return r;
	}
	off(...t) {
		let n = t.flat();
		this.subscribers = this.subscribers.filter((r) => !n.includes(r));
	}
	trigger(...t) {
		for (let n of this.subscribers) n(...t);
		return this;
	}
	clear() {
		this.subscribers = [];
	}
};
var im = "__observedAppState",
	Fa = (e) => {
		let t = {
			name: e.name,
			editingGroupId: e.editingGroupId,
			viewBackgroundColor: e.viewBackgroundColor,
			selectedElementIds: e.selectedElementIds,
			selectedGroupIds: e.selectedGroupIds,
			editingLinearElementId: e.editingLinearElement?.elementId || null,
			selectedLinearElementId: e.selectedLinearElement?.elementId || null,
			croppingElementId: e.croppingElementId,
		};
		return Reflect.defineProperty(t, im, { value: !0, enumerable: !1 }), t;
	},
	Dw = (e) => !!Reflect.get(e, im),
	To = { CAPTURE: "capture", UPDATE: "update", NONE: "none" },
	ud = class {
		constructor(t, n) {
			this.elementsChange = t;
			this.appStateChange = n;
		}
	},
	am = class {
		onStoreIncrementEmitter = new vs();
		scheduledActions = new Set();
		_snapshot = Ms.empty();
		get snapshot() {
			return this._snapshot;
		}
		set snapshot(t) {
			this._snapshot = t;
		}
		shouldCaptureIncrement = () => {
			this.scheduleAction(To.CAPTURE);
		};
		shouldUpdateSnapshot = () => {
			this.scheduleAction(To.UPDATE);
		};
		scheduleAction = (t) => {
			this.scheduledActions.add(t), this.satisfiesScheduledActionsInvariant();
		};
		commit = (t, n) => {
			try {
				this.scheduledActions.has(To.CAPTURE)
					? this.captureIncrement(t, n)
					: this.scheduledActions.has(To.UPDATE) && this.updateSnapshot(t, n);
			} finally {
				this.satisfiesScheduledActionsInvariant(),
					(this.scheduledActions = new Set());
			}
		};
		captureIncrement = (t, n) => {
			let r = this.snapshot,
				o = this.snapshot.maybeClone(t, n);
			if (r !== o) {
				let a = o.meta.didElementsChange
						? Pa.calculate(r.elements, o.elements)
						: Pa.empty(),
					i = o.meta.didAppStateChange
						? Na.calculate(r.appState, o.appState)
						: Na.empty();
				(!a.isEmpty() || !i.isEmpty()) &&
					this.onStoreIncrementEmitter.trigger(new ud(a, i)),
					(this.snapshot = o);
			}
		};
		updateSnapshot = (t, n) => {
			let r = this.snapshot.maybeClone(t, n);
			this.snapshot !== r && (this.snapshot = r);
		};
		filterUncomittedElements = (t, n) => {
			for (let [r, o] of t.entries()) {
				if (!n.get(r)) continue;
				let i = this.snapshot.elements.get(r);
				i ? i.version < o.version && n.set(r, i) : n.delete(r);
			}
			return n;
		};
		clear = () => {
			(this.snapshot = Ms.empty()), (this.scheduledActions = new Set());
		};
		satisfiesScheduledActionsInvariant = () => {
			if (
				!(this.scheduledActions.size >= 0 && this.scheduledActions.size <= 3)
			) {
				let t = `There can be at most three store actions scheduled at the same time, but there are "${this.scheduledActions.size}".`;
				if (
					(console.error(t, this.scheduledActions.values()),
					R.DEV || R.MODE === We.TEST)
				)
					throw new Error(t);
			}
		};
	},
	Ms = class e {
		constructor(
			t,
			n,
			r = { didElementsChange: !1, didAppStateChange: !1, isEmpty: !1 },
		) {
			this.elements = t;
			this.appState = n;
			this.meta = r;
		}
		static empty() {
			return new e(new Map(), Fa(wt()), {
				didElementsChange: !1,
				didAppStateChange: !1,
				isEmpty: !0,
			});
		}
		isEmpty() {
			return this.meta.isEmpty;
		}
		maybeClone(t, n) {
			let r = this.maybeCreateElementsSnapshot(t),
				o = this.maybeCreateAppStateSnapshot(n),
				a = !1,
				i = !1;
			return (
				this.elements !== r && (a = !0),
				this.appState !== o && (i = !0),
				!a && !i
					? this
					: new e(r, o, { didElementsChange: a, didAppStateChange: i })
			);
		}
		maybeCreateAppStateSnapshot(t) {
			if (!t) return this.appState;
			let n = Dw(t) ? t : Fa(t);
			return this.detectChangedAppState(n) ? n : this.appState;
		}
		detectChangedAppState(t) {
			return !Tn(this.appState, t, {
				selectedElementIds: Tn,
				selectedGroupIds: Tn,
			});
		}
		maybeCreateElementsSnapshot(t) {
			return t
				? this.detectChangedElements(t)
					? this.createElementsSnapshot(t)
					: this.elements
				: this.elements;
		}
		detectChangedElements(t) {
			if (this.elements === t) return !1;
			if (this.elements.size !== t.size) return !0;
			let n = Array.from(t.keys());
			for (let r = n.length - 1; r >= 0; r--) {
				let o = this.elements.get(n[r]),
					a = t.get(n[r]);
				if (!o || !a || o.id !== a.id || o.versionNonce !== a.versionNonce)
					return !0;
			}
			return !1;
		}
		createElementsSnapshot(t) {
			let n = new Map();
			for (let [r, o] of this.elements.entries())
				t.get(r) ? n.set(r, o) : n.set(r, Bt(o, { isDeleted: !0 }));
			for (let [r, o] of t.entries()) {
				let a = n.get(r);
				(!a || (a && a.versionNonce !== o.versionNonce)) && n.set(r, La(o));
			}
			return n;
		}
	};
var fn = new Map(),
	Sw =
		/^(?:http(?:s)?:\/\/)?(?:www\.)?youtu(?:be\.com|\.be)\/(embed\/|watch\?v=|shorts\/|playlist\?list=|embed\/videoseries\?list=)?([a-zA-Z0-9_-]+)(?:\?t=|&t=|\?start=|&start=)?([a-zA-Z0-9_-]+)?[^\s]*$/,
	$w =
		/^(?:http(?:s)?:\/\/)?(?:(?:w){3}\.)?(?:player\.)?vimeo\.com\/(?:video\/)?([^?\s]+)(?:\?.*)?$/,
	Nw = /^https:\/\/(?:www\.)?figma\.com/,
	sm = /^https:\/\/gist\.github\.com\/([\w_-]+)\/([\w_-]+)/,
	Pw = /^<script[\s\S]*?\ssrc=["'](https:\/\/gist\.github\.com\/.*?)\.js["']/i,
	cm =
		/(?:https?:\/\/)?(?:(?:w){3}\.)?(?:twitter|x)\.com\/[^/]+\/status\/(\d+)/,
	Fw =
		/^<blockquote[\s\S]*?\shref=["'](https?:\/\/(?:twitter|x)\.com\/[^"']*)/i,
	Ow =
		/^https:\/\/(?:www\.)?val\.town\/(v|embed)\/[a-zA-Z_$][0-9a-zA-Z_$]+\.[a-zA-Z_$][0-9a-zA-Z_$]+/,
	Aw =
		/^<(?:iframe|blockquote)[\s\S]*?\s(?:src|href)=["']([^"']*)["'][\s\S]*?>$/i,
	lm =
		/giphy.com\/(?:clips|embed|gifs)\/[a-zA-Z0-9]*?-?([a-zA-Z0-9]+)(?:[^a-zA-Z0-9]|$)/,
	dm =
		/^(?:http(?:s)?:\/\/)?(?:www\.)?reddit\.com\/r\/([a-zA-Z0-9_]+)\/comments\/([a-zA-Z0-9_]+)\/([a-zA-Z0-9_]+)\/?(?:\?[^#\s]*)?(?:#[^\s]*)?$/,
	Bw =
		/^<blockquote[\s\S]*?\shref=["'](https?:\/\/(?:www\.)?reddit\.com\/[^"']*)/i,
	md = new Set([
		"youtube.com",
		"youtu.be",
		"vimeo.com",
		"player.vimeo.com",
		"figma.com",
		"link.excalidraw.com",
		"gist.github.com",
		"twitter.com",
		"x.com",
		"*.simplepdf.eu",
		"stackblitz.com",
		"val.town",
		"giphy.com",
		"reddit.com",
	]),
	Um = new Set([
		"youtube.com",
		"youtu.be",
		"vimeo.com",
		"player.vimeo.com",
		"figma.com",
		"twitter.com",
		"x.com",
		"*.simplepdf.eu",
		"stackblitz.com",
		"reddit.com",
	]),
	pd = (e) => `<html><body>${e}</body></html>`,
	fm = (e) => {
		if (!e) return null;
		if (fn.has(e)) return fn.get(e);
		let t = e,
			n = Um.has(hd(e, Um) || ""),
			r = "generic",
			o = { w: 560, h: 840 },
			a = e.match(Sw);
		if (a?.[2]) {
			let l = a[3] ? `&start=${a[3]}` : "",
				d = e.includes("shorts");
			switch (((r = "video"), a[1])) {
				case "embed/":
				case "watch?v=":
				case "shorts/":
					e = `https://www.youtube.com/embed/${a[2]}?enablejsapi=1${l}`;
					break;
				case "playlist?list=":
				case "embed/videoseries?list=":
					e = `https://www.youtube.com/embed/videoseries?list=${a[2]}&enablejsapi=1${l}`;
					break;
				default:
					e = `https://www.youtube.com/embed/${a[2]}?enablejsapi=1${l}`;
					break;
			}
			return (
				(o = d ? { w: 315, h: 560 } : { w: 560, h: 315 }),
				fn.set(t, {
					link: e,
					intrinsicSize: o,
					type: r,
					sandbox: { allowSameOrigin: n },
				}),
				{ link: e, intrinsicSize: o, type: r, sandbox: { allowSameOrigin: n } }
			);
		}
		let i = e.match($w);
		if (i?.[1]) {
			let l = i?.[1],
				d = /^\d+$/.test(l)
					? void 0
					: new URIError("Invalid embed link format");
			return (
				(r = "video"),
				(e = `https://player.vimeo.com/video/${l}?api=1`),
				(o = { w: 560, h: 315 }),
				fn.set(t, {
					link: e,
					intrinsicSize: o,
					type: r,
					sandbox: { allowSameOrigin: n },
				}),
				{
					link: e,
					intrinsicSize: o,
					type: r,
					error: d,
					sandbox: { allowSameOrigin: n },
				}
			);
		}
		if (e.match(Nw))
			return (
				(r = "generic"),
				(e = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(e)}`),
				(o = { w: 550, h: 550 }),
				fn.set(t, {
					link: e,
					intrinsicSize: o,
					type: r,
					sandbox: { allowSameOrigin: n },
				}),
				{ link: e, intrinsicSize: o, type: r, sandbox: { allowSameOrigin: n } }
			);
		let c = e.match(Ow);
		if (c)
			return (
				(e = c[1] === "embed" ? c[0] : c[0].replace("/v", "/embed")),
				fn.set(t, {
					link: e,
					intrinsicSize: o,
					type: r,
					sandbox: { allowSameOrigin: n },
				}),
				{ link: e, intrinsicSize: o, type: r, sandbox: { allowSameOrigin: n } }
			);
		if (cm.test(e)) {
			let l = e.match(cm)[1],
				d = Ma(`https://twitter.com/x/status/${l}`),
				U = {
					type: "document",
					srcdoc: (u) =>
						pd(
							`<blockquote class="twitter-tweet" data-dnt="true" data-theme="${u}"><a href="${d}"></a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"><\/script>`,
						),
					intrinsicSize: { w: 480, h: 480 },
					sandbox: { allowSameOrigin: n },
				};
			return fn.set(t, U), U;
		}
		if (dm.test(e)) {
			let [, l, d, U] = e.match(dm),
				u = Ma(`https://reddit.com/r/${l}/comments/${d}/${U}`),
				p = {
					type: "document",
					srcdoc: (m) =>
						pd(
							`<blockquote class="reddit-embed-bq" data-embed-theme="${m}"><a href="${u}"></a><br></blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"><\/script>`,
						),
					intrinsicSize: { w: 480, h: 480 },
					sandbox: { allowSameOrigin: n },
				};
			return fn.set(t, p), p;
		}
		if (sm.test(e)) {
			let [, l, d] = e.match(sm),
				U = Ma(`https://gist.github.com/${l}/${d}`),
				u = {
					type: "document",
					srcdoc: () =>
						pd(`
          <script src="${U}.js"><\/script>
          <style type="text/css">
            * { margin: 0px; }
            table, .gist { height: 100%; }
            .gist .gist-file { height: calc(100vh - 2px); padding: 0px; display: grid; grid-template-rows: 1fr auto; }
          </style>
        `),
					intrinsicSize: { w: 550, h: 720 },
					sandbox: { allowSameOrigin: n },
				};
			return fn.set(e, u), u;
		}
		return (
			fn.set(e, {
				link: e,
				intrinsicSize: o,
				type: r,
				sandbox: { allowSameOrigin: n },
			}),
			{ link: e, intrinsicSize: o, type: r, sandbox: { allowSameOrigin: n } }
		);
	},
	_s = (e) => {
		let t;
		na(e)
			? (t = "IFrame element")
			: (t = !e.link || e?.link === "" ? "Empty Web-Embed" : e.link);
		let n = Math.max(Math.min(e.width / 2, e.width / t.length), e.width / 30),
			r = he.Helvetica,
			o = pe({ fontSize: n, fontFamily: r });
		return Un({
			x: e.x + e.width / 2,
			y: e.y + e.height / 2,
			strokeColor: e.strokeColor !== "transparent" ? e.strokeColor : "black",
			backgroundColor: "transparent",
			fontFamily: r,
			fontSize: n,
			text: vn(t, o, e.width - 20),
			textAlign: "center",
			verticalAlign: xn.MIDDLE,
			angle: e.angle ?? 0,
		});
	},
	_X = V5({
		name: "setEmbeddableAsActiveTool",
		trackEvent: { category: "toolbar" },
		target: "Tool",
		label: "toolBar.embeddable",
		perform: (e, t, n, r) => {
			let o = ta(t, { type: "embeddable" });
			return (
				Z5(r.canvas, { ...t, activeTool: o }),
				{
					elements: e,
					appState: { ...t, activeTool: ta(t, { type: "embeddable" }) },
					storeAction: To.NONE,
				}
			);
		},
	}),
	hd = (e, t) => {
		try {
			let { hostname: n } = new URL(e),
				r = n.replace(/^www\./, "");
			if (t instanceof Set) {
				if (md.has(r)) return r;
				let a = r.replace(/^([^.]+)/, "*");
				return md.has(a) ? a : null;
			}
			let o = t.replace(/^www\./, "");
			if (r === o) return o;
		} catch {}
		return null;
	},
	LX = (e) => {
		let t = e.match(Fw);
		if (t && t.length === 2) return t[1];
		let n = e.match(Bw);
		if (n && n.length === 2) return n[1];
		let r = e.match(Pw);
		if (r && r.length === 2) return r[1];
		if (lm.test(e)) return `https://giphy.com/embed/${lm.exec(e)[1]}`;
		let o = e.match(Aw);
		return o && o.length === 2 ? o[1] : e;
	},
	DX = (e, t) => {
		if (!e) return !1;
		if (t != null)
			if (typeof t == "function") {
				let n = t(e);
				if (typeof n == "boolean") return n;
			} else {
				if (typeof t == "boolean") return t;
				if (t instanceof RegExp) return t.test(e);
				if (Array.isArray(t)) {
					for (let n of t)
						if (n instanceof RegExp) {
							if (e.match(n)) return !0;
						} else if (hd(e, n)) return !0;
					return !1;
				}
			}
		return !!hd(e, md);
	};
var Oa = (e, t, n) => {
		if (typeof n > "u") return e.draw(t);
		let r = {
			sets: t.sets,
			shape: t.shape,
			options: { ...t.options, fixedDecimalPlaceDigits: n },
		};
		return e.draw(r);
	},
	Aa = (e, t, n, r, o) => {
		if (!r.enabled || !r.clip) return null;
		let a = et(e, o);
		if (a) {
			let i = t.ownerDocument.createElementNS(le, "g");
			return (
				i.setAttributeNS(le, "clip-path", `url(#${a.id})`),
				n.forEach((s) => i.appendChild(s)),
				i
			);
		}
		return null;
	},
	Ls = (e, t, n, r, o, a, i, s) => {
		let c = { x: a, y: i },
			[l, d, U, u] = H(e, t),
			p = (U - l) / 2 - (e.x - l),
			m = (u - d) / 2 - (e.y - d);
		if (X(e)) {
			let w = Oe(e, t);
			if (Q(w)) {
				let [T, I, _, L] = H(w, t),
					M = W.getBoundTextElementPosition(w, e, t);
				(p = (_ - T) / 2 - (M.x - T)),
					(m = (L - I) / 2 - (M.y - I)),
					(a = a + M.x - e.x),
					(i = i + M.y - e.y);
			}
		}
		let h = (180 * e.angle) / Math.PI,
			g = r;
		if (e.link) {
			let w = r.ownerDocument.createElementNS(le, "a");
			w.setAttribute("href", $n(e.link)), g.appendChild(w), (g = w);
		}
		let x = (w, T) => {
				In() && w.setAttribute("data-id", T.id), g.appendChild(w);
			},
			y = ((et(e, t)?.opacity ?? 100) * e.opacity) / 1e4;
		switch (e.type) {
			case "selection":
				throw new Error("Selection rendering is not supported for SVG");
			case "rectangle":
			case "diamond":
			case "ellipse": {
				let w = me.generateElementShape(e, null),
					T = Oa(n, w, no);
				y !== 1 &&
					(T.setAttribute("stroke-opacity", `${y}`),
					T.setAttribute("fill-opacity", `${y}`)),
					T.setAttribute("stroke-linecap", "round"),
					T.setAttribute(
						"transform",
						`translate(${a || 0} ${i || 0}) rotate(${h} ${p} ${m})`,
					);
				let I = Aa(e, g, [T], s.frameRendering, t);
				x(I || T, e);
				break;
			}
			case "iframe":
			case "embeddable": {
				let w = me.generateElementShape(e, s),
					T = Oa(n, w, no),
					I = e.opacity / 100;
				I !== 1 &&
					(T.setAttribute("stroke-opacity", `${I}`),
					T.setAttribute("fill-opacity", `${I}`)),
					T.setAttribute("stroke-linecap", "round"),
					T.setAttribute(
						"transform",
						`translate(${a || 0} ${i || 0}) rotate(${h} ${p} ${m})`,
					),
					x(T, e);
				let _ = _s(e);
				Ls(_, t, n, g, o, _.x + c.x - e.x, _.y + c.y - e.y, s);
				let L = Oa(n, w, no);
				for (
					L.setAttribute("stroke-linecap", "round"),
						L.setAttribute(
							"transform",
							`translate(${a || 0} ${i || 0}) rotate(${h} ${p} ${m})`,
						);
					L.firstChild;
				)
					L.removeChild(L.firstChild);
				let M = Dn(Math.min(e.width, e.height), e),
					N = fm(k5(e.link || ""));
				if (s.renderEmbeddables === !1 || N?.type === "document") {
					let $ = r.ownerDocument.createElementNS(le, "a");
					$.setAttribute("href", $n(e.link || "")),
						$.setAttribute("target", "_blank"),
						$.setAttribute("rel", "noopener noreferrer"),
						($.style.borderRadius = `${M}px`),
						L.appendChild($);
				} else {
					let $ = r.ownerDocument.createElementNS(le, "foreignObject");
					($.style.width = `${e.width}px`),
						($.style.height = `${e.height}px`),
						($.style.border = "none");
					let S = $.ownerDocument.createElementNS(le, "div");
					S.setAttribute("xmlns", "http://www.w3.org/1999/xhtml"),
						(S.style.width = "100%"),
						(S.style.height = "100%");
					let P = S.ownerDocument.createElement("iframe");
					(P.src = N?.link ?? ""),
						(P.style.width = "100%"),
						(P.style.height = "100%"),
						(P.style.border = "none"),
						(P.style.borderRadius = `${M}px`),
						(P.style.top = "0"),
						(P.style.left = "0"),
						(P.allowFullscreen = !0),
						S.appendChild(P),
						$.appendChild(S),
						L.appendChild($);
				}
				x(L, e);
				break;
			}
			case "line":
			case "arrow": {
				let w = ee(e, t),
					T = r.ownerDocument.createElementNS(le, "mask");
				if (w) {
					T.setAttribute("id", `mask-${e.id}`);
					let M = r.ownerDocument.createElementNS(le, "rect");
					(a = a || 0),
						(i = i || 0),
						M.setAttribute("x", "0"),
						M.setAttribute("y", "0"),
						M.setAttribute("fill", "#fff"),
						M.setAttribute("width", `${e.width + 100 + a}`),
						M.setAttribute("height", `${e.height + 100 + i}`),
						T.appendChild(M);
					let N = r.ownerDocument.createElementNS(le, "rect"),
						$ = W.getBoundTextElementPosition(e, w, t),
						S = a + $.x - e.x,
						P = i + $.y - e.y;
					N.setAttribute("x", S.toString()),
						N.setAttribute("y", P.toString()),
						N.setAttribute("fill", "#000"),
						N.setAttribute("width", `${w.width}`),
						N.setAttribute("height", `${w.height}`),
						N.setAttribute("opacity", "1"),
						T.appendChild(N);
				}
				let I = r.ownerDocument.createElementNS(le, "g");
				w && I.setAttribute("mask", `url(#mask-${e.id})`),
					I.setAttribute("stroke-linecap", "round"),
					me.generateElementShape(e, s).forEach((M) => {
						let N = Oa(n, M, no);
						y !== 1 &&
							(N.setAttribute("stroke-opacity", `${y}`),
							N.setAttribute("fill-opacity", `${y}`)),
							N.setAttribute(
								"transform",
								`translate(${a || 0} ${i || 0}) rotate(${h} ${p} ${m})`,
							),
							e.type === "line" &&
								rn(e.points) &&
								e.backgroundColor !== "transparent" &&
								N.setAttribute("fill-rule", "evenodd"),
							I.appendChild(N);
					});
				let L = Aa(e, g, [I, T], s.frameRendering, t);
				L ? (x(L, e), g.appendChild(L)) : (x(I, e), g.append(T));
				break;
			}
			case "freedraw": {
				let w = me.generateElementShape(e, s),
					T = w ? Oa(n, w, no) : r.ownerDocument.createElementNS(le, "g");
				y !== 1 &&
					(T.setAttribute("stroke-opacity", `${y}`),
					T.setAttribute("fill-opacity", `${y}`)),
					T.setAttribute(
						"transform",
						`translate(${a || 0} ${i || 0}) rotate(${h} ${p} ${m})`,
					),
					T.setAttribute("stroke", "none");
				let I = r.ownerDocument.createElementNS(le, "path");
				I.setAttribute("fill", e.strokeColor),
					I.setAttribute("d", El(e)),
					T.appendChild(I);
				let _ = Aa(e, g, [T], s.frameRendering, t);
				x(_ || T, e);
				break;
			}
			case "image": {
				let w = Math.round(e.width),
					T = Math.round(e.height),
					I = jt(e) && o[e.fileId];
				if (I) {
					let { reuseImages: _ = !0 } = s,
						L = `image-${I.id}`,
						M = e.width,
						N = e.height;
					e.crop &&
						(({ width: M, height: N } = fo(e)),
						(L = `image-crop-${I.id}-${pm(`${M}x${N}`)}`)),
						_ || (L = `image-${e.id}`);
					let $ = r.querySelector(`#${L}`);
					if (!$) {
						($ = r.ownerDocument.createElementNS(le, "symbol")), ($.id = L);
						let C = r.ownerDocument.createElementNS(le, "image");
						C.setAttribute("href", I.dataURL),
							C.setAttribute("preserveAspectRatio", "none"),
							e.crop || !_
								? (C.setAttribute("width", `${M}`),
									C.setAttribute("height", `${N}`))
								: (C.setAttribute("width", "100%"),
									C.setAttribute("height", "100%")),
							$.appendChild(C),
							g.prepend($);
					}
					let S = r.ownerDocument.createElementNS(le, "use");
					S.setAttribute("href", `#${L}`),
						s.exportWithDarkMode &&
							I.mimeType !== B.svg &&
							S.setAttribute("filter", gl);
					let P = 0,
						A = 0;
					if (e.crop) {
						let { width: C, height: Y } = fo(e);
						(P = e.crop.x / (e.crop.naturalWidth / C)),
							(A = e.crop.y / (e.crop.naturalHeight / Y));
					}
					let k = p + P,
						K = m + A;
					S.setAttribute("width", `${w + P}`),
						S.setAttribute("height", `${T + A}`),
						S.setAttribute("opacity", `${y}`),
						(e.scale[0] !== 1 || e.scale[1] !== 1) &&
							S.setAttribute(
								"transform",
								`translate(${k} ${K}) scale(${e.scale[0]} ${e.scale[1]}) translate(${-k} ${-K})`,
							);
					let q = r.ownerDocument.createElementNS(le, "g");
					if (e.crop) {
						let C = r.ownerDocument.createElementNS(le, "mask");
						C.setAttribute("id", `mask-image-crop-${e.id}`),
							C.setAttribute("fill", "#fff");
						let Y = r.ownerDocument.createElementNS(le, "rect");
						Y.setAttribute("x", `${P}`),
							Y.setAttribute("y", `${A}`),
							Y.setAttribute("width", `${w}`),
							Y.setAttribute("height", `${T}`),
							C.appendChild(Y),
							g.appendChild(C),
							q.setAttribute("mask", `url(#${C.id})`);
					}
					if (
						(q.appendChild(S),
						q.setAttribute(
							"transform",
							`translate(${a - P} ${i - A}) rotate(${h} ${k} ${K})`,
						),
						e.roundness)
					) {
						let C = r.ownerDocument.createElementNS(le, "clipPath");
						C.id = `image-clipPath-${e.id}`;
						let Y = r.ownerDocument.createElementNS(le, "rect"),
							te = Dn(Math.min(e.width, e.height), e);
						Y.setAttribute("width", `${e.width}`),
							Y.setAttribute("height", `${e.height}`),
							Y.setAttribute("rx", `${te}`),
							Y.setAttribute("ry", `${te}`),
							C.appendChild(Y),
							x(C, e),
							q.setAttributeNS(le, "clip-path", `url(#${C.id})`);
					}
					let F = Aa(e, g, [q], s.frameRendering, t);
					x(F || q, e);
				}
				break;
			}
			case "frame":
			case "magicframe": {
				if (s.frameRendering.enabled && s.frameRendering.outline) {
					let w = document.createElementNS(le, "rect");
					w.setAttribute(
						"transform",
						`translate(${a || 0} ${i || 0}) rotate(${h} ${p} ${m})`,
					),
						w.setAttribute("width", `${e.width}px`),
						w.setAttribute("height", `${e.height}px`),
						w.setAttribute("rx", Re.radius.toString()),
						w.setAttribute("ry", Re.radius.toString()),
						w.setAttribute("fill", "none"),
						w.setAttribute("stroke", Re.strokeColor),
						w.setAttribute("stroke-width", Re.strokeWidth.toString()),
						x(w, e);
				}
				break;
			}
			default:
				if (X(e)) {
					let w = r.ownerDocument.createElementNS(le, "g");
					y !== 1 &&
						(w.setAttribute("stroke-opacity", `${y}`),
						w.setAttribute("fill-opacity", `${y}`)),
						w.setAttribute(
							"transform",
							`translate(${a || 0} ${i || 0}) rotate(${h} ${p} ${m})`,
						);
					let T = e.text
							.replace(
								/\r\n?/g,
								`
`,
							)
							.split(`
`),
						I = uo(e.fontSize, e.lineHeight),
						_ =
							e.textAlign === "center"
								? e.width / 2
								: e.textAlign === "right"
									? e.width
									: 0,
						L = zi(e.fontFamily, e.fontSize, I),
						M = Ri(e.text) ? "rtl" : "ltr",
						N =
							e.textAlign === "center"
								? "middle"
								: e.textAlign === "right" || M === "rtl"
									? "end"
									: "start";
					for (let S = 0; S < T.length; S++) {
						let P = r.ownerDocument.createElementNS(le, "text");
						(P.textContent = T[S]),
							P.setAttribute("x", `${_}`),
							P.setAttribute("y", `${S * I + L}`),
							P.setAttribute("font-family", Jc(e)),
							P.setAttribute("font-size", `${e.fontSize}px`),
							P.setAttribute("fill", e.strokeColor),
							P.setAttribute("text-anchor", N),
							P.setAttribute("style", "white-space: pre;"),
							P.setAttribute("direction", M),
							P.setAttribute("dominant-baseline", "alphabetic"),
							w.appendChild(P);
					}
					let $ = Aa(e, g, [w], s.frameRendering, t);
					x($ || w, e);
				} else throw new Error(`Unimplemented type ${e.type}`);
		}
	},
	um = (e, t, n, r, o, a) => {
		r &&
			(e
				.filter((i) => !vt(i))
				.forEach((i) => {
					if (!i.isDeleted) {
						if (X(i) && i.containerId && t.has(i.containerId)) return;
						try {
							Ls(i, t, n, r, o, i.x + a.offsetX, i.y + a.offsetY, a);
							let s = ee(i, t);
							s && Ls(s, t, n, r, o, s.x + a.offsetX, s.y + a.offsetY, a);
						} catch (s) {
							console.error(s);
						}
					}
				}),
			e
				.filter((i) => vt(i))
				.forEach((i) => {
					if (!i.isDeleted)
						try {
							Ls(i, t, n, r, o, i.x + a.offsetX, i.y + a.offsetY, a);
						} catch (s) {
							console.error(s);
						}
				}));
	};
E();
E();
E();
var Ro = (() => {
		if (typeof self > "u") return !1;
		if ("top" in self && self !== top)
			try {
			} catch {
				return !1;
			}
		else if ("showOpenFilePicker" in self) return "showOpenFilePicker";
		return !1;
	})(),
	Cw = Ro
		? import("./file-open-002ab408-MILJ6BM2.js")
		: import("./file-open-7c801643-BHFKUUBS.js");
async function mm(...e) {
	return (await Cw).default(...e);
}
var ZX = Ro
	? import("./directory-open-4ed118d0-57WBH3LL.js")
	: import("./directory-open-01563666-OLGZGYEQ.js");
var Kw = Ro
	? import("./file-save-745eba88-CGSHK46Y.js")
	: import("./file-save-3189631c-IHOU4DOS.js");
async function hm(...e) {
	return (await Kw).default(...e);
}
var bm = 500,
	gm = (e) => {
		let t = e.extensions?.reduce((r, o) => (r.push(B[o]), r), []),
			n = e.extensions?.reduce(
				(r, o) => (o === "jpg" ? r.concat(".jpg", ".jpeg") : r.concat(`.${o}`)),
				[],
			);
		return mm({
			description: e.description,
			extensions: n,
			mimeTypes: t,
			multiple: e.multiple ?? !1,
			legacySetup: (r, o, a) => {
				let i = Ti(o, bm),
					s = () => {
						c(),
							document.addEventListener("keyup", i),
							document.addEventListener("pointerup", i),
							i();
					},
					c = () => {
						if (a.files?.length) {
							let d = e.multiple ? [...a.files] : a.files[0];
							r(d);
						}
					};
				requestAnimationFrame(() => {
					window.addEventListener("focus", s);
				});
				let l = window.setInterval(() => {
					c();
				}, bm);
				return (d) => {
					clearInterval(l),
						i.cancel(),
						window.removeEventListener("focus", s),
						document.removeEventListener("keyup", i),
						document.removeEventListener("pointerup", i),
						d &&
							(console.warn("Opening the file was canceled (legacy-fs)."),
							d(new Gi()));
				};
			},
		});
	},
	bd = (e, t) =>
		hm(
			e,
			{
				fileName: `${t.name}.${t.extension}`,
				description: t.description,
				extensions: [`.${t.extension}`],
			},
			t.fileHandle,
		);
var Hw = (e, t) => {
		let n = {};
		for (let r of e)
			!r.isDeleted &&
				"fileId" in r &&
				r.fileId &&
				t[r.fileId] &&
				(n[r.fileId] = t[r.fileId]);
		return n;
	},
	Ba = (e, t, n, r) => {
		let o = {
			type: ze.excalidraw,
			version: Lc.excalidraw,
			source: Mc,
			elements: r === "local" ? Ds(e) : wm(e),
			appState: r === "local" ? xi(t) : U1(t),
			files: r === "local" ? Hw(e, n) : void 0,
		};
		return JSON.stringify(o, null, 2);
	},
	dZ = async (e, t, n, r = t.name || s1) => {
		let o = Ba(e, t, n, "local"),
			a = new Blob([o], { type: B.excalidraw });
		return {
			fileHandle: await bd(a, {
				name: r,
				extension: "excalidraw",
				description: "Excalidraw file",
				fileHandle: Em(t.fileHandle) ? null : t.fileHandle,
			}),
		};
	},
	UZ = async (e, t) => {
		let n = await gm({ description: "Excalidraw files" });
		return xm(await gd(n), e, t, n.handle);
	},
	ym = (e) =>
		e?.type === ze.excalidraw &&
		(!e.elements ||
			(Array.isArray(e.elements) &&
				(!e.appState || typeof e.appState == "object"))),
	Ed = (e) =>
		typeof e == "object" &&
		e &&
		e.type === ze.excalidrawLibrary &&
		(e.version === 1 || e.version === 2),
	Jw = (e) => {
		let t = {
			type: ze.excalidrawLibrary,
			version: Lc.excalidrawLibrary,
			source: Mc,
			libraryItems: e,
		};
		return JSON.stringify(t, null, 2);
	},
	fZ = async (e) => {
		let t = Jw(e);
		await bd(new Blob([t], { type: B.excalidrawlib }), {
			name: "library",
			extension: "excalidrawlib",
			description: "Excalidraw library file",
		});
	};
E();
var kw = (e) =>
		new Promise((t, n) => {
			let r = new Image();
			(r.onload = () => {
				t(r);
			}),
				(r.onerror = (o) => {
					n(o);
				}),
				(r.src = e);
		}),
	Im = async ({ fileIds: e, files: t, imageCache: n }) => {
		let r = new Map(),
			o = new Map();
		return (
			await Promise.all(
				e.reduce((a, i) => {
					let s = t[i];
					return s && !r.has(i)
						? (r.set(i, !0),
							a.concat(
								(async () => {
									try {
										if (s.mimeType === B.binary)
											throw new Error("Only images can be added to ImageCache");
										let c = kw(s.dataURL),
											l = { image: c, mimeType: s.mimeType };
										n.set(i, l);
										let d = await c;
										n.set(i, { ...l, image: d });
									} catch {
										o.set(i, !0);
									}
								})(),
							))
						: a;
				}, []),
			),
			{ imageCache: n, updatedFiles: r, erroredFiles: o }
		);
	},
	Tm = (e) => e.filter((t) => jt(t)),
	Yw = (e) => e?.nodeName.toLowerCase() === "svg",
	bZ = (e) => {
		let t = new DOMParser().parseFromString(e, B.svg),
			n = t.querySelector("svg");
		if (t.querySelector("parsererror") || !Yw(n))
			throw new Error("Invalid SVG");
		{
			n.hasAttribute("xmlns") || n.setAttribute("xmlns", le);
			let o = n.getAttribute("width"),
				a = n.getAttribute("height");
			(o?.includes("%") || o === "auto") && (o = null),
				(a?.includes("%") || a === "auto") && (a = null);
			let i = n.getAttribute("viewBox");
			if (!o || !a) {
				if (((o = o || "50"), (a = a || "50"), i)) {
					let s = i.match(/\d+ +\d+ +(\d+(?:\.\d+)?) +(\d+(?:\.\d+)?)/);
					s && ([, o, a] = s);
				}
				n.setAttribute("width", o), n.setAttribute("height", a);
			}
			return i || n.setAttribute("viewBox", `0 0 ${o} ${a}`), n.outerHTML;
		}
	};
E();
E();
var xd = document.createElement("img");
xd.src = `data:${B.svg}, ${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1971c2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>')}`;
var yd = document.createElement("img");
yd.src = `data:${B.svg}, ${encodeURIComponent('<svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="#1971c2"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-big-right-line"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 9v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-6v-6h6z" /><path d="M3 9v6" /></svg>')}`;
var wd = ([e, t, n, r], o, a) => {
		let i = R8,
			s = i / a.zoom.value,
			c = i / a.zoom.value,
			l = i / a.zoom.value,
			d = (e + n) / 2,
			U = (t + r) / 2,
			u = (i - 8) / (2 * a.zoom.value),
			p = 4 / a.zoom.value,
			m = n + p - u,
			h = t - p - l + u,
			[g, x] = D(b(m + s / 2, h + c / 2), b(d, U), o);
		return [g - s / 2, x - c / 2, s, c];
	},
	Vw = (e, t, n, [r, o]) => {
		let a = 4 / n.zoom.value,
			[i, s, c, l] = H(e, t),
			[d, U, u, p] = wd([i, s, c, l], e.angle, n);
		return r > d - a && r < d + a + u && o > U - a && o < U + p + a;
	},
	RZ = (e, t, n, [r, o], a) =>
		!e.link || n.selectedElementIds[e.id]
			? !1
			: !a && n.viewModeEnabled && fl(r, o, e, t)
				? !0
				: Vw(e, t, n, b(r, o));
E();
var LZ = (e, t, n, r, o = !0) => {
		e.beginPath(), e.arc(t, n, r, 0, Math.PI * 2), e.fill(), o && e.stroke();
	},
	Rm = (e, t) => [e.width / t, e.height / t],
	vm = ({
		canvas: e,
		scale: t,
		normalizedWidth: n,
		normalizedHeight: r,
		theme: o,
		isExporting: a,
		viewBackgroundColor: i,
	}) => {
		let s = e.getContext("2d");
		return (
			s.setTransform(1, 0, 0, 1, 0, 0),
			s.scale(t, t),
			a && o === ke.DARK && (s.filter = bi),
			typeof i == "string"
				? ((i === "transparent" ||
						i.length === 5 ||
						i.length === 9 ||
						/(hsla|rgba)\(/.test(i)) &&
						s.clearRect(0, 0, n, r),
					s.save(),
					(s.fillStyle = i),
					s.fillRect(0, 0, n, r),
					s.restore())
				: s.clearRect(0, 0, n, r),
			s
		);
	};
E();
var FZ = (e, t) => {
		let n = window.location.href;
		try {
			let r = new URL(n);
			return r.searchParams.set(Go, e), $n(r.toString());
		} catch (r) {
			console.error(r);
		}
		return $n(n);
	},
	OZ = (e, t) => {
		if (e.length > 0 && qw(e)) {
			if (e.length === 1) return { id: e[0].id, type: "element" };
			if (e.length > 1) {
				let n = Object.keys(t.selectedGroupIds)[0];
				return n
					? { id: n, type: "group" }
					: { id: e[0].groupIds[0], type: "group" };
			}
		}
		return null;
	},
	qw = (e) => !!(e.length === 1 || (e.length > 1 && M5(e))),
	Mm = (e) => {
		try {
			let t = new URL(e);
			return t.searchParams.has(Go) && t.host === window.location.host;
		} catch {
			return !1;
		}
	},
	AZ = (e) => {
		try {
			let { searchParams: t } = new URL(e);
			if (t.has(Go)) return t.get(Go);
		} catch {}
		return null;
	};
var Ss = { Bold: "#dddddd", Regular: "#e5e5e5" },
	Gw = (e, t, n, r, o, a, i, s) => {
		let c = (r % t) - t,
			l = (o % t) - t,
			d = t * a.value,
			U = 1 / a.value;
		e.save(), a.value === 1 && e.translate(c % 1 ? 0 : 0.5, l % 1 ? 0 : 0.5);
		for (let u = c; u < c + i + t * 2; u += t) {
			let p = n > 1 && Math.round(u - r) % (n * t) === 0;
			if (!p && d < 10) continue;
			let m = Math.min(1 / a.value, p ? 4 : 1);
			e.lineWidth = m;
			let h = [m * 3, U + (m + U)];
			e.beginPath(),
				e.setLineDash(p ? [] : h),
				(e.strokeStyle = p ? Ss.Bold : Ss.Regular),
				e.moveTo(u, l - t),
				e.lineTo(u, Math.ceil(l + s + t * 2)),
				e.stroke();
		}
		for (let u = l; u < l + s + t * 2; u += t) {
			let p = n > 1 && Math.round(u - o) % (n * t) === 0;
			if (!p && d < 10) continue;
			let m = Math.min(1 / a.value, p ? 4 : 1);
			e.lineWidth = m;
			let h = [m * 3, U + (m + U)];
			e.beginPath(),
				e.setLineDash(p ? [] : h),
				(e.strokeStyle = p ? Ss.Bold : Ss.Regular),
				e.moveTo(c - t, u),
				e.lineTo(Math.ceil(c + i + t * 2), u),
				e.stroke();
		}
		e.restore();
	},
	_m = (e, t, n, r) => {
		t.translate(e.x + r.scrollX, e.y + r.scrollY),
			t.beginPath(),
			t.roundRect
				? t.roundRect(0, 0, e.width, e.height, Re.radius / r.zoom.value)
				: t.rect(0, 0, e.width, e.height),
			t.clip(),
			t.translate(-(e.x + r.scrollX), -(e.y + r.scrollY));
	},
	Lm = { regularLink: null, elementLink: null },
	Dm = (e, t, n, r) => {
		if (e.link && !n.selectedElementIds[e.id]) {
			let [o, a, i, s] = H(e, r),
				[c, l, d, U] = wd([o, a, i, s], e.angle, n),
				u = c + d / 2,
				p = l + U / 2;
			t.save(), t.translate(n.scrollX + u, n.scrollY + p), t.rotate(e.angle);
			let m = Mm(e.link) ? "elementLink" : "regularLink",
				h = Lm[m];
			if (!h || h.zoom !== n.zoom.value) {
				(h = Object.assign(document.createElement("canvas"), {
					zoom: n.zoom.value,
				})),
					(h.width = d * window.devicePixelRatio * n.zoom.value),
					(h.height = U * window.devicePixelRatio * n.zoom.value),
					(Lm[m] = h);
				let g = h.getContext("2d");
				g.scale(
					window.devicePixelRatio * n.zoom.value,
					window.devicePixelRatio * n.zoom.value,
				),
					(g.fillStyle = "#fff"),
					g.fillRect(0, 0, d, U),
					m === "elementLink"
						? g.drawImage(yd, 0, 0, d, U)
						: g.drawImage(xd, 0, 0, d, U),
					g.restore();
			}
			t.drawImage(h, c - u, l - p, d, U), t.restore();
		}
	},
	Sm = ({
		canvas: e,
		rc: t,
		elementsMap: n,
		allElementsMap: r,
		visibleElements: o,
		scale: a,
		appState: i,
		renderConfig: s,
	}) => {
		if (e === null) return;
		let { renderGrid: c = !0, isExporting: l } = s,
			[d, U] = Rm(e, a),
			u = vm({
				canvas: e,
				scale: a,
				normalizedWidth: d,
				normalizedHeight: U,
				theme: i.theme,
				isExporting: l,
				viewBackgroundColor: i.viewBackgroundColor,
			});
		u.scale(i.zoom.value, i.zoom.value),
			c &&
				Gw(
					u,
					i.gridSize,
					i.gridStep,
					i.scrollX,
					i.scrollY,
					i.zoom,
					d / i.zoom.value,
					U / i.zoom.value,
				);
		let p = new Set();
		o.forEach((m) => {
			m.groupIds.length > 0 &&
				i.frameToHighlight &&
				i.selectedElementIds[m.id] &&
				(cr(m, i.frameToHighlight, n) || m.groupIds.find((h) => p.has(h))) &&
				m.groupIds.forEach((h) => p.add(h));
		}),
			o
				.filter((m) => !vt(m))
				.forEach((m) => {
					try {
						let h = m.frameId || i.frameToHighlight?.id;
						if (X(m) && m.containerId && n.has(m.containerId)) return;
						if (
							(u.save(), h && i.frameRendering.enabled && i.frameRendering.clip)
						) {
							let x = $s(m, n, i);
							x && Ns(m, n, i) && _m(x, u, s, i), Nr(m, n, r, t, u, s, i);
						} else Nr(m, n, r, t, u, s, i);
						let g = ee(m, n);
						g && Nr(g, n, r, t, u, s, i), u.restore(), l || Dm(m, u, i, n);
					} catch (h) {
						console.error(h);
					}
				}),
			o
				.filter((m) => vt(m))
				.forEach((m) => {
					try {
						let h = () => {
							if (
								(Nr(m, n, r, t, u, s, i),
								vt(m) &&
									(l || (Mi(m) && s.embedsValidationStatus.get(m.id) !== !0)) &&
									m.width &&
									m.height)
							) {
								let x = _s(m);
								Nr(x, n, r, t, u, s, i);
							}
							l || Dm(m, u, i, n);
						};
						if (
							(m.frameId || i.frameToHighlight?.id) &&
							i.frameRendering.enabled &&
							i.frameRendering.clip
						) {
							u.save();
							let x = $s(m, n, i);
							x && Ns(m, n, i) && _m(x, u, s, i), h(), u.restore();
						} else h();
					} catch (h) {
						console.error(h);
					}
				}),
			s.pendingFlowchartNodes?.forEach((m) => {
				try {
					Nr(m, n, r, t, u, s, i);
				} catch (h) {
					console.error(h);
				}
			});
	},
	Xw = N1(
		(e) => {
			Sm(e);
		},
		{ trailing: !0 },
	),
	$m = (e, t) => {
		if (t) {
			Xw(e);
			return;
		}
		Sm(e);
	};
var Zw = "<!-- svg-source:excalidraw -->",
	Ww = (e, t) => {
		if (e.width <= t) return e;
		let r = document.createElement("canvas").getContext("2d");
		r.font = pe({ fontFamily: e.fontFamily, fontSize: e.fontSize });
		let o = e.text;
		if (r.measureText(o).width > t)
			for (let i = o.length; i > 0; i--) {
				let s = `${o.slice(0, i)}...`;
				if (r.measureText(s).width <= t) {
					o = s;
					break;
				}
			}
		return Bt(e, { text: o, width: t });
	},
	zw = (e, t) => {
		let n = [];
		for (let r of e) {
			if (de(r)) {
				let o = Un({
					x: r.x,
					y: r.y - Re.nameOffsetY,
					fontFamily: he.Helvetica,
					fontSize: Re.nameFontSize,
					lineHeight: Re.nameLineHeight,
					strokeColor: t.exportWithDarkMode
						? Re.nameColorDarkTheme
						: Re.nameColorLightTheme,
					text: Am(r),
				});
				(o.y -= o.height), (o = Ww(o, r.width)), n.push(o);
			}
			n.push(r);
		}
		return n;
	},
	Nm = (e, t) => (
		(t = t || wt().frameRendering),
		{
			enabled: e ? !0 : t.enabled,
			outline: e ? !1 : t.outline,
			name: e ? !1 : t.name,
			clip: e ? !0 : t.clip,
		}
	),
	Pm = ({
		elements: e,
		exportingFrame: t,
		frameRendering: n,
		exportWithDarkMode: r,
	}) => {
		let o;
		return (
			t
				? (o = Bm(e, t))
				: n.enabled && n.name
					? (o = zw(e, { exportWithDarkMode: r }))
					: (o = e),
			o
		);
	},
	Fm = async (
		e,
		t,
		n,
		{
			exportBackground: r,
			exportPadding: o = _c,
			viewBackgroundColor: a,
			exportingFrame: i,
		},
		s = (l, d) => {
			let U = document.createElement("canvas");
			return (
				(U.width = l * t.exportScale),
				(U.height = d * t.exportScale),
				{ canvas: U, scale: t.exportScale }
			);
		},
		c = async () => {
			await $r.loadElementsFonts(e);
		},
	) => {
		await c();
		let l = Nm(i ?? null, t.frameRendering ?? null);
		i && (l.clip = !1);
		let d = Pm({
			elements: e,
			exportingFrame: i,
			exportWithDarkMode: t.exportWithDarkMode,
			frameRendering: l,
		});
		i && (o = 0);
		let [U, u, p, m] = Id(i ? [i] : Rd(d), o),
			{ canvas: h, scale: g = 1 } = s(p, m),
			x = wt(),
			{ imageCache: y } = await Im({
				imageCache: new Map(),
				fileIds: Tm(d).map((w) => w.fileId),
				files: n,
			});
		return (
			$m({
				canvas: h,
				rc: nn.canvas(h),
				elementsMap: Be(j(d)),
				allElementsMap: Be(j(Hr(e))),
				visibleElements: d,
				scale: g,
				appState: {
					...t,
					frameRendering: l,
					viewBackgroundColor: r ? a : null,
					scrollX: -U + o,
					scrollY: -u + o,
					zoom: x.zoom,
					shouldCacheIgnoreZoom: !1,
					theme: t.exportWithDarkMode ? ke.DARK : ke.LIGHT,
				},
				renderConfig: {
					canvasBackgroundColor: a,
					imageCache: y,
					renderGrid: !1,
					isExporting: !0,
					embedsValidationStatus: new Map(),
					elementsPendingErasure: new Set(),
					pendingFlowchartNodes: null,
				},
			}),
			h
		);
	},
	Om = async (e, t, n, r) => {
		let o = Nm(r?.exportingFrame ?? null, t.frameRendering ?? null),
			{
				exportPadding: a = _c,
				exportWithDarkMode: i = !1,
				viewBackgroundColor: s,
				exportScale: c = 1,
				exportEmbedScene: l,
			} = t,
			{ exportingFrame: d = null } = r || {},
			U = Pm({
				elements: e,
				exportingFrame: d,
				exportWithDarkMode: i,
				frameRendering: o,
			});
		d && (a = 0);
		let u = "";
		if (l)
			try {
				u = (await import("./image-QE4H3IIT.js")).encodeSvgMetadata({
					text: Ba(e, t, n || {}, "local"),
				});
			} catch (S) {
				console.error(S);
			}
		let [p, m, h, g] = Id(d ? [d] : Rd(U), a),
			x = document.createElementNS(le, "svg");
		x.setAttribute("version", "1.1"),
			x.setAttribute("xmlns", le),
			x.setAttribute("viewBox", `0 0 ${h} ${g}`),
			x.setAttribute("width", `${h * c}`),
			x.setAttribute("height", `${g * c}`),
			i && x.setAttribute("filter", bi);
		let y = -p + a,
			w = -m + a,
			T = Td(e),
			I = "",
			_ = j(e);
		for (let S of T) {
			let [P, A, k, K] = H(S, _),
				q = (k - P) / 2 - (S.x - P),
				F = (K - A) / 2 - (S.y - A);
			I += `<clipPath id=${S.id}>
            <rect transform="translate(${S.x + y} ${S.y + w}) rotate(${S.angle} ${q} ${F})"
          width="${S.width}"
          height="${S.height}"
          ${d ? "" : `rx=${Re.radius} ry=${Re.radius}`}
          >
          </rect>
        </clipPath>`;
		}
		let L = r?.skipInliningFonts
				? []
				: await $r.generateFontFaceDeclarations(e),
			M = `
      `;
		if (
			((x.innerHTML = `
  ${Zw}
  ${u}
  <defs>
    <style class="style-fonts">${M}${L.join(M)}
    </style>
    ${I}
  </defs>
  `),
			t.exportBackground && s)
		) {
			let S = x.ownerDocument.createElementNS(le, "rect");
			S.setAttribute("x", "0"),
				S.setAttribute("y", "0"),
				S.setAttribute("width", `${h}`),
				S.setAttribute("height", `${g}`),
				S.setAttribute("fill", s),
				x.appendChild(S);
		}
		let N = nn.svg(x),
			$ = r?.renderEmbeddables ?? !1;
		return (
			um(U, Be(j(U)), N, x, n || {}, {
				offsetX: y,
				offsetY: w,
				isExporting: !0,
				exportWithDarkMode: i,
				renderEmbeddables: $,
				frameRendering: o,
				canvasBackgroundColor: s,
				embedsValidationStatus: $
					? new Map(U.filter((S) => de(S)).map((S) => [S.id, !0]))
					: new Map(),
				reuseImages: r?.reuseImages ?? !0,
			}),
			x
		);
	},
	Id = (e, t) => {
		let [n, r, o, a] = Te(e),
			i = ft(n, o) + t * 2,
			s = ft(r, a) + t * 2;
		return [n, r, i, s];
	},
	pW = (e, t, n) => {
		let [, , r, o] = Id(e, t).map((a) => Math.trunc(a * n));
		return [r, o];
	};
E();
var Qw = {
		selection: !0,
		text: !0,
		rectangle: !0,
		diamond: !0,
		ellipse: !0,
		line: !0,
		image: !0,
		arrow: !0,
		freedraw: !0,
		eraser: !1,
		custom: !0,
		frame: !0,
		embeddable: !0,
		hand: !0,
		laser: !1,
		magicframe: !1,
	},
	jw = (e) => (Object.keys(he).includes(e) ? he[e] : Wt),
	Ps = (e, t) =>
		t
			? {
					...t,
					focus: t.focus || 0,
					...(se(e) && Mr(t) ? { fixedPoint: ya(t.fixedPoint ?? [0, 0]) } : {}),
				}
			: null,
	Jr = (e, t) => {
		let n = {
			type: t.type || e.type,
			version: e.version || 1,
			versionNonce: e.versionNonce ?? 0,
			index: e.index ?? null,
			isDeleted: e.isDeleted ?? !1,
			id: e.id || At(),
			fillStyle: e.fillStyle || be.fillStyle,
			strokeWidth: e.strokeWidth || be.strokeWidth,
			strokeStyle: e.strokeStyle ?? be.strokeStyle,
			roughness: e.roughness ?? be.roughness,
			opacity: e.opacity == null ? be.opacity : e.opacity,
			angle: e.angle || 0,
			x: t.x ?? e.x ?? 0,
			y: t.y ?? e.y ?? 0,
			strokeColor: e.strokeColor || be.strokeColor,
			backgroundColor: e.backgroundColor || be.backgroundColor,
			width: e.width || 0,
			height: e.height || 0,
			seed: e.seed ?? 1,
			groupIds: e.groupIds ?? [],
			frameId: e.frameId ?? null,
			roundness: e.roundness
				? e.roundness
				: e.strokeSharpness === "round"
					? { type: _i(e.type) ? rt.LEGACY : rt.PROPORTIONAL_RADIUS }
					: null,
			boundElements: e.boundElementIds
				? e.boundElementIds.map((r) => ({ type: "arrow", id: r }))
				: (e.boundElements ?? []),
			updated: e.updated ?? wn(),
			link: e.link ? $n(e.link) : null,
			locked: e.locked ?? !1,
		};
		return (
			("customData" in e || "customData" in t) &&
				(n.customData = "customData" in t ? t.customData : e.customData),
			{ ...e, ...n, ...vd(n), ...t }
		);
	},
	eI = (e) => {
		switch (e.type) {
			case "text":
				let t = e.fontSize,
					n = e.fontFamily;
				if ("font" in e) {
					let [d, U] = e.font.split(" ");
					(t = parseFloat(d)), (n = jw(U));
				}
				let r = (typeof e.text == "string" && e.text) || "",
					o = e.lineHeight || (e.height ? O5(e) : Qi(e.fontFamily));
				return (
					(e = Jr(e, {
						fontSize: t,
						fontFamily: n,
						text: r,
						textAlign: e.textAlign || to,
						verticalAlign: e.verticalAlign || ui,
						containerId: e.containerId ?? null,
						originalText: e.originalText || r,
						autoResize: e.autoResize ?? !0,
						lineHeight: o,
					})),
					!r &&
						!e.isDeleted &&
						((e = { ...e, originalText: r, isDeleted: !0 }), (e = Da(e))),
					e
				);
			case "freedraw":
				return Jr(e, {
					points: e.points,
					lastCommittedPoint: null,
					simulatePressure: e.simulatePressure,
					pressures: e.pressures,
				});
			case "image":
				return Jr(e, {
					status: e.status || "pending",
					fileId: e.fileId,
					scale: e.scale || [1, 1],
					crop: e.crop ?? null,
				});
			case "line":
			case "draw":
				let { startArrowhead: a = null, endArrowhead: i = null } = e,
					s = e.x,
					c = e.y,
					l =
						!Array.isArray(e.points) || e.points.length < 2
							? [b(0, 0), b(e.width, e.height)]
							: e.points;
				return (
					(l[0][0] !== 0 || l[0][1] !== 0) &&
						({ points: l, x: s, y: c } = W.getNormalizedPoints(e)),
					Jr(e, {
						type: e.type === "draw" ? "line" : e.type,
						startBinding: Ps(e, e.startBinding),
						endBinding: Ps(e, e.endBinding),
						lastCommittedPoint: null,
						startArrowhead: a,
						endArrowhead: i,
						points: l,
						x: s,
						y: c,
						...Pr(l),
					})
				);
			case "arrow": {
				let { startArrowhead: d = null, endArrowhead: U = "arrow" } = e,
					u = e.x,
					p = e.y,
					m =
						!Array.isArray(e.points) || e.points.length < 2
							? [b(0, 0), b(e.width, e.height)]
							: e.points;
				return (
					(m[0][0] !== 0 || m[0][1] !== 0) &&
						({ points: m, x: u, y: p } = W.getNormalizedPoints(e)),
					Jr(e, {
						type: e.type,
						startBinding: Ps(e, e.startBinding),
						endBinding: Ps(e, e.endBinding),
						lastCommittedPoint: null,
						startArrowhead: d,
						endArrowhead: U,
						points: m,
						x: u,
						y: p,
						elbowed: e.elbowed,
						...Pr(m),
					})
				);
			}
			case "ellipse":
			case "rectangle":
			case "diamond":
			case "iframe":
			case "embeddable":
				return Jr(e, {});
			case "magicframe":
			case "frame":
				return Jr(e, { name: e.name ?? null });
		}
		return null;
	},
	tI = (e, t) => {
		if (e.boundElements) {
			let n = e.boundElements.slice(),
				r = new Set();
			e.boundElements = n.reduce((o, a) => {
				let i = t.get(a.id);
				if (i && !r.has(a.id)) {
					if ((r.add(a.id), i.isDeleted)) return o;
					o.push(a), X(i) && !i.containerId && (i.containerId = e.id);
				}
				return o;
			}, []);
		}
	},
	nI = (e, t) => {
		let n = e.containerId ? t.get(e.containerId) : null;
		if (!n) {
			e.containerId = null;
			return;
		}
		if (
			!e.isDeleted &&
			n.boundElements &&
			!n.boundElements.find((r) => r.id === e.id)
		) {
			let r = (n.boundElements || (n.boundElements = [])).slice();
			r.push({ type: "text", id: e.id }), (n.boundElements = r);
		}
	},
	rI = (e, t) => {
		e.frameId && (t.get(e.frameId) || (e.frameId = null));
	},
	Hm = (e, t, n) => {
		let r = new Set(),
			o = t ? j(t) : null,
			a = Hr(
				(e || []).reduce((s, c) => {
					if (c.type !== "selection" && !Ka(c)) {
						let l = eI(c);
						if (l) {
							let d = o?.get(c.id);
							d && d.version > l.version && (l = Da(l, d.version)),
								r.has(l.id) && (l = { ...l, id: At() }),
								r.add(l.id),
								s.push(l);
						}
					}
					return s;
				}, []),
			);
		if (!n?.repairBindings) return a;
		let i = j(a);
		for (let s of a)
			s.frameId && rI(s, i),
				X(s) && s.containerId ? nI(s, i) : s.boundElements && tI(s, i),
				n.refreshDimensions && X(s) && Object.assign(s, dd(s, Oe(s, i), i)),
				oe(s) &&
					(s.startBinding &&
						(!i.has(s.startBinding.elementId) || !Q(s)) &&
						(s.startBinding = null),
					s.endBinding &&
						(!i.has(s.endBinding.elementId) || !Q(s)) &&
						(s.endBinding = null));
		return a;
	},
	oI = (e, t, n) => {
		let r = t[e];
		return r !== void 0 ? r : n[e];
	},
	Cm = {
		isSidebarDocked: (e, t) => [
			"defaultSidebarDockedPreference",
			e.isSidebarDocked ?? oI("defaultSidebarDockedPreference", e, t),
		],
	},
	aI = (e, t) => {
		e = e || {};
		let n = wt(),
			r = {};
		for (let o of Object.keys(Cm))
			if (o in e) {
				let [a, i] = Cm[o](e, n);
				r[a] = i;
			}
		for (let [o, a] of Object.entries(n)) {
			let i = e[o],
				s = t ? t[o] : void 0;
			r[o] = i !== void 0 ? i : s !== void 0 ? s : a;
		}
		return {
			...r,
			cursorButton: t?.cursorButton || "up",
			penDetected: t?.penDetected ?? (e.penMode ? (e.penDetected ?? !1) : !1),
			activeTool: {
				...ta(
					n,
					r.activeTool.type && Qw[r.activeTool.type]
						? r.activeTool
						: { type: "selection" },
				),
				lastActiveTool: null,
				locked: r.activeTool.locked ?? !1,
			},
			zoom: {
				value: Jl(wi(e.zoom) ? e.zoom : (e.zoom?.value ?? n.zoom.value)),
			},
			openSidebar:
				typeof e.openSidebar == "string" ? { name: i1.name } : r.openSidebar,
			gridSize: kl(wi(e.gridSize) ? e.gridSize : pi),
			gridStep: Yl(wi(e.gridStep) ? e.gridStep : mi),
			editingFrame: null,
		};
	},
	Ca = (e, t, n, r) => ({
		elements: Hm(e?.elements, n, r),
		appState: aI(e?.appState, t || null),
		files: e?.files || {},
	}),
	Km = (e) => {
		let t = Hm(Md(e.elements), null);
		return t.length ? { ...e, elements: t } : null;
	},
	Jm = (e = [], t) => {
		let n = [];
		for (let r of e)
			if (Array.isArray(r)) {
				let o = Km({ status: t, elements: r, id: At(), created: Date.now() });
				o && n.push(o);
			} else {
				let o = r,
					a = Km({
						...o,
						id: o.id || At(),
						status: o.status || t,
						created: o.created || Date.now(),
					});
				a && n.push(a);
			}
		return n;
	};
E();
E();
var Ct = 32,
	ue = 12,
	lr = 256,
	Ym = 50,
	kr = "NOT_SPREADSHEET",
	vo = "VALID_SPREADSHEET",
	Ha = (e) => {
		let t = /^([-+]?)[$€£¥₩]?([-+]?)([\d.,]+)[%]?$/.exec(e);
		return t ? parseFloat(`${(t[1] || t[2]) + t[3]}`.replace(/,/g, "")) : null;
	},
	_d = (e, t) => e.slice(1).every((n) => Ha(n[t]) !== null),
	km = (e) => {
		let t = e[0].length;
		if (t > 2) return { type: kr, reason: "More than 2 columns" };
		if (t === 1) {
			if (!_d(e, 0)) return { type: kr, reason: "Value is not numeric" };
			let c = Ha(e[0][0]) === null,
				l = (c ? e.slice(1) : e).map((d) => Ha(d[0]));
			return l.length < 2
				? { type: kr, reason: "Less than two rows" }
				: {
						type: vo,
						spreadsheet: { title: c ? e[0][0] : null, labels: null, values: l },
					};
		}
		let n = _d(e, 0),
			r = _d(e, 1);
		if (!n && !r) return { type: kr, reason: "Value is not numeric" };
		let [o, a] = r ? [0, 1] : [1, 0],
			i = Ha(e[0][a]) === null,
			s = i ? e.slice(1) : e;
		return s.length < 2
			? { type: kr, reason: "Less than 2 rows" }
			: {
					type: vo,
					spreadsheet: {
						title: i ? e[0][a] : null,
						labels: s.map((c) => c[o]),
						values: s.map((c) => Ha(c[a])),
					},
				};
	},
	iI = (e) => {
		let t = [];
		for (let n = 0; n < e[0].length; n++) {
			let r = [];
			for (let o = 0; o < e.length; o++) r.push(e[o][n]);
			t.push(r);
		}
		return t;
	},
	Vm = (e) => {
		let t = e
			.trim()
			.split(`
`)
			.map((a) => a.trim().split("	"));
		if (
			(t.length &&
				t[0].length !== 2 &&
				(t = e
					.trim()
					.split(`
`)
					.map((a) => a.trim().split(","))),
			t.length === 0)
		)
			return { type: kr, reason: "No values" };
		let n = t[0].length;
		if (!t.every((a) => a.length === n))
			return { type: kr, reason: "All rows don't have same number of columns" };
		let o = km(t);
		if (o.type !== vo) {
			let a = km(iI(t));
			if (a.type === vo) return a;
		}
		return o;
	},
	Fs = qf(Yf),
	ht = {
		fillStyle: "hachure",
		fontFamily: Wt,
		fontSize: Zt,
		opacity: 100,
		roughness: 1,
		strokeColor: Z.black,
		roundness: null,
		strokeStyle: "solid",
		strokeWidth: 1,
		verticalAlign: xn.MIDDLE,
		locked: !1,
	},
	qm = (e) => {
		let t = (Ct + ue) * e.values.length + ue,
			n = lr + ue * 2;
		return { chartWidth: t, chartHeight: n };
	},
	sI = (e, t, n, r, o) =>
		e.labels?.map((a, i) =>
			Un({
				groupIds: [r],
				backgroundColor: o,
				...ht,
				text: a.length > 8 ? `${a.slice(0, 5)}...` : a,
				x: t + i * (Ct + ue) + ue * 2,
				y: n + ue / 2,
				width: Ct,
				angle: 5.87,
				fontSize: 16,
				textAlign: "center",
				verticalAlign: "top",
			}),
		) || [],
	cI = (e, t, n, r, o) => {
		let a = Un({
				groupIds: [r],
				backgroundColor: o,
				...ht,
				x: t - ue,
				y: n - ue,
				text: "0",
				textAlign: "right",
			}),
			i = Un({
				groupIds: [r],
				backgroundColor: o,
				...ht,
				x: t - ue,
				y: n - lr - a.height / 2,
				text: Math.max(...e.values).toLocaleString(),
				textAlign: "right",
			});
		return [a, i];
	},
	lI = (e, t, n, r, o) => {
		let { chartWidth: a, chartHeight: i } = qm(e),
			s = Kr({
				backgroundColor: o,
				groupIds: [r],
				...ht,
				type: "line",
				x: t,
				y: n,
				width: a,
				points: [b(0, 0), b(a, 0)],
			}),
			c = Kr({
				backgroundColor: o,
				groupIds: [r],
				...ht,
				type: "line",
				x: t,
				y: n,
				height: i,
				points: [b(0, 0), b(0, -i)],
			}),
			l = Kr({
				backgroundColor: o,
				groupIds: [r],
				...ht,
				type: "line",
				x: t,
				y: n - lr - ue,
				strokeStyle: "dotted",
				width: a,
				opacity: Ym,
				points: [b(0, 0), b(a, 0)],
			});
		return [s, c, l];
	},
	Gm = (e, t, n, r, o, a) => {
		let { chartWidth: i, chartHeight: s } = qm(e),
			c = e.title
				? Un({
						backgroundColor: o,
						groupIds: [r],
						...ht,
						text: e.title,
						x: t + i / 2,
						y: n - lr - ue * 2 - Zt,
						roundness: null,
						textAlign: "center",
					})
				: null,
			l = a
				? _a({
						backgroundColor: o,
						groupIds: [r],
						...ht,
						type: "rectangle",
						x: t,
						y: n - s,
						width: i,
						height: s,
						strokeColor: Z.black,
						fillStyle: "solid",
						opacity: 6,
					})
				: null;
		return [
			...(l ? [l] : []),
			...(c ? [c] : []),
			...sI(e, t, n, r, o),
			...cI(e, t, n, r, o),
			...lI(e, t, n, r, o),
		];
	},
	dI = (e, t, n) => {
		let r = Math.max(...e.values),
			o = At(),
			a = Fs[Math.floor(Math.random() * Fs.length)];
		return [
			...e.values.map((s, c) => {
				let l = (s / r) * lr;
				return _a({
					backgroundColor: a,
					groupIds: [o],
					...ht,
					type: "rectangle",
					x: t + c * (Ct + ue) + ue,
					y: n - l - ue,
					width: Ct,
					height: l,
				});
			}),
			...Gm(e, t, n, o, a, R.DEV),
		];
	},
	UI = (e, t, n) => {
		let r = Math.max(...e.values),
			o = At(),
			a = Fs[Math.floor(Math.random() * Fs.length)],
			i = 0,
			s = [];
		for (let h of e.values) {
			let g = i * (Ct + ue),
				x = -(h / r) * lr;
			s.push([g, x]), i++;
		}
		let c = Math.max(...s.map((h) => h[0])),
			l = Math.max(...s.map((h) => h[1])),
			d = Math.min(...s.map((h) => h[0])),
			U = Math.min(...s.map((h) => h[1])),
			u = Kr({
				backgroundColor: a,
				groupIds: [o],
				...ht,
				type: "line",
				x: t + ue + Ct / 2,
				y: n - ue,
				height: l - U,
				width: c - d,
				strokeWidth: 2,
				points: s,
			}),
			p = e.values.map((h, g) => {
				let x = g * (Ct + ue) + ue / 2,
					y = -(h / r) * lr + ue / 2;
				return _a({
					backgroundColor: a,
					groupIds: [o],
					...ht,
					fillStyle: "solid",
					strokeWidth: 2,
					type: "ellipse",
					x: t + x + Ct / 2,
					y: n + y - ue * 2,
					width: ue,
					height: ue,
				});
			}),
			m = e.values.map((h, g) => {
				let x = g * (Ct + ue) + ue / 2,
					y = (h / r) * lr + ue / 2 + ue;
				return Kr({
					backgroundColor: a,
					groupIds: [o],
					...ht,
					type: "line",
					x: t + x + Ct / 2 + ue / 2,
					y: n - y,
					height: y,
					strokeStyle: "dotted",
					opacity: Ym,
					points: [b(0, 0), b(0, y)],
				});
			});
		return [...Gm(e, t, n, o, a, R.DEV), u, ...m, ...p];
	},
	HW = (e, t, n, r) => (e === "line" ? UI(t, n, r) : dI(t, n, r));
var jW = "clipboard" in navigator && "readText" in navigator.clipboard,
	fI = "clipboard" in navigator && "writeText" in navigator.clipboard,
	ez =
		"clipboard" in navigator &&
		"write" in navigator.clipboard &&
		"ClipboardItem" in window &&
		"toBlob" in HTMLCanvasElement.prototype,
	uI = (e) =>
		!!(
			[
				ze.excalidraw,
				ze.excalidrawClipboard,
				ze.excalidrawClipboardWithAPI,
			].includes(e?.type) && Array.isArray(e.elements)
		),
	tz = ({ types: e, files: t }) => {
		!e && !t && console.warn("createPasteEvent: no types or files provided");
		let n = new ClipboardEvent("paste", { clipboardData: new DataTransfer() });
		if (e)
			for (let [r, o] of Object.entries(e)) {
				if (typeof o != "string") {
					(t = t || []), t.push(o);
					continue;
				}
				try {
					if (
						(n.clipboardData?.setData(r, o), n.clipboardData?.getData(r) !== o)
					)
						throw new Error(`Failed to set "${r}" as clipboardData item`);
				} catch (a) {
					throw new Error(a.message);
				}
			}
		if (t) {
			let r = -1;
			for (let o of t) {
				r++;
				try {
					if ((n.clipboardData?.items.add(o), n.clipboardData?.files[r] !== o))
						throw new Error(
							`Failed to set file "${o.name}" as clipboardData item`,
						);
				} catch (a) {
					throw new Error(a.message);
				}
			}
		}
		return n;
	},
	pI = ({ elements: e, files: t }) => {
		let n = j(e),
			r = new Set(e.filter((s) => de(s))),
			o = !1,
			a = e.reduce(
				(s, c) => (
					jt(c) && ((o = !0), t && t[c.fileId] && (s[c.fileId] = t[c.fileId])),
					s
				),
				{},
			);
		o &&
			!t &&
			console.warn(
				"copyToClipboard: attempting to file element(s) without providing associated `files` object.",
			);
		let i = {
			type: ze.excalidrawClipboard,
			elements: e.map((s) => {
				if (et(s, n) && !r.has(et(s, n))) {
					let c = La(s);
					return J(c, { frameId: null }), c;
				}
				return s;
			}),
			files: t ? a : void 0,
		};
		return JSON.stringify(i);
	},
	Xm = async (e, t, n) => {
		await Dd(pI({ elements: e, files: t }), n);
	},
	mI = (e) => {
		let t = Vm(e);
		return t.type === vo ? { spreadsheet: t.spreadsheet } : null;
	};
function Zm(e) {
	let t = [];
	for (let n of e.childNodes)
		if (n.nodeType === 3) {
			let r = n.textContent?.trim();
			r && t.push({ type: "text", value: r });
		} else if (n instanceof HTMLImageElement) {
			let r = n.getAttribute("src");
			r && r.startsWith("http") && t.push({ type: "imageUrl", value: r });
		} else t = t.concat(Zm(n));
	return t;
}
var hI = (e) => {
		let t = e.clipboardData?.getData(B.html);
		if (!t) return null;
		try {
			let n = new DOMParser().parseFromString(t, B.html),
				r = Zm(n.body);
			if (r.length) return { type: "mixedContent", value: r };
		} catch (n) {
			console.error(`error in parseHTMLFromPaste: ${n.message}`);
		}
		return null;
	},
	nz = async () => {
		let e = {},
			t;
		try {
			t = await navigator.clipboard?.read();
		} catch (n) {
			try {
				if (navigator.clipboard?.readText) {
					console.warn(
						`navigator.clipboard.readText() failed (${n.message}). Failling back to navigator.clipboard.read()`,
					);
					let r = await navigator.clipboard?.readText();
					if (r) return { [B.text]: r };
				}
			} catch (r) {
				if (navigator.clipboard?.read)
					console.warn(
						`navigator.clipboard.readText() failed (${r.message}). Failling back to navigator.clipboard.read()`,
					);
				else {
					if (r.name === "DataError")
						return (
							console.warn(
								`navigator.clipboard.read() error, clipboard is probably empty: ${r.message}`,
							),
							e
						);
					throw r;
				}
			}
			throw n;
		}
		for (let n of t)
			for (let r of n.types)
				if (A1(Qf, r))
					try {
						if (r === B.text || r === B.html)
							e[r] = await (await n.getType(r)).text();
						else if (Ld(r)) {
							let o = await n.getType(r),
								a = Mo(o, r, void 0);
							e[r] = a;
						} else throw new ma(`Unsupported clipboard type: ${r}`);
					} catch (o) {
						console.warn(
							o instanceof ma
								? o.message
								: `Cannot retrieve ${r} from clipboardItem: ${o.message}`,
						);
					}
		return (
			Object.keys(e).length === 0 &&
				console.warn("No clipboard data found from clipboard.read()."),
			e
		);
	},
	bI = async (e, t = !1) => {
		try {
			let n = !t && e && hI(e);
			return n
				? n.value.every((o) => o.type === "text")
					? {
							type: "text",
							value:
								e.clipboardData?.getData(B.text) ||
								n.value
									.map((o) => o.value)
									.join(`
`)
									.trim(),
						}
					: n
				: {
						type: "text",
						value: (e.clipboardData?.getData(B.text) || "").trim(),
					};
		} catch {
			return { type: "text", value: "" };
		}
	},
	rz = async (e, t = !1) => {
		let n = await bI(e, t);
		if (n.type === "mixedContent") return { mixedContent: n.value };
		try {
			let r = !t && mI(n.value);
			if (r) return r;
		} catch (r) {
			console.error(r);
		}
		try {
			let r = JSON.parse(n.value),
				o = r.type === ze.excalidrawClipboardWithAPI;
			if (uI(r))
				return {
					elements: r.elements,
					files: r.files,
					text: t ? JSON.stringify(r.elements, null, 2) : void 0,
					programmaticAPI: o,
				};
		} catch {}
		return { text: n.value };
	},
	Wm = async (e) => {
		try {
			await navigator.clipboard.write([
				new window.ClipboardItem({ [B.png]: e }),
			]);
		} catch (t) {
			if (vi(e))
				await navigator.clipboard.write([
					new window.ClipboardItem({ [B.png]: await e }),
				]);
			else throw t;
		}
	},
	Dd = async (e, t) => {
		if (fI)
			try {
				await navigator.clipboard.writeText(e || "");
				return;
			} catch (n) {
				console.error(n);
			}
		try {
			if (t) {
				if (
					(t.clipboardData?.setData(B.text, e || ""),
					t.clipboardData?.getData(B.text) !== e)
				)
					throw new Error("Failed to setData on clipboardEvent");
				return;
			}
		} catch (n) {
			console.error(n);
		}
		if (!gI(e)) throw new Error("Error copying to clipboard.");
	},
	gI = (e) => {
		e || (e = " ");
		let t = document.documentElement.getAttribute("dir") === "rtl",
			n = document.createElement("textarea");
		(n.style.border = "0"),
			(n.style.padding = "0"),
			(n.style.margin = "0"),
			(n.style.position = "absolute"),
			(n.style[t ? "right" : "left"] = "-9999px");
		let r = window.pageYOffset || document.documentElement.scrollTop;
		(n.style.top = `${r}px`),
			(n.style.fontSize = "12pt"),
			n.setAttribute("readonly", ""),
			(n.value = e),
			document.body.appendChild(n);
		let o = !1;
		try {
			n.select(),
				n.setSelectionRange(0, n.value.length),
				(o = document.execCommand("copy"));
		} catch (a) {
			console.error(a);
		}
		return n.remove(), o;
	};
var EI = ({
		elements: e,
		appState: t,
		files: n,
		maxWidthOrHeight: r,
		getDimensions: o,
		exportPadding: a,
		exportingFrame: i,
	}) => {
		let { elements: s, appState: c } = Ca(
				{ elements: e, appState: t },
				null,
				null,
			),
			{ exportBackground: l, viewBackgroundColor: d } = c;
		return Fm(
			s,
			{ ...c, offsetTop: 0, offsetLeft: 0, width: 0, height: 0 },
			n || {},
			{
				exportBackground: l,
				exportPadding: a,
				viewBackgroundColor: d,
				exportingFrame: i,
			},
			(U, u) => {
				let p = document.createElement("canvas");
				if (r) {
					typeof o == "function" &&
						console.warn(
							"`getDimensions()` is ignored when `maxWidthOrHeight` is supplied.",
						);
					let h = Math.max(U, u),
						g = r < h ? r / h : (t?.exportScale ?? 1);
					return (p.width = U * g), (p.height = u * g), { canvas: p, scale: g };
				}
				let m = o?.(U, u) || { width: U, height: u };
				return (
					(p.width = m.width),
					(p.height = m.height),
					{ canvas: p, scale: m.scale ?? 1 }
				);
			},
		);
	},
	xI = async (e) => {
		let { mimeType: t = B.png, quality: n } = e;
		t === B.png &&
			typeof n == "number" &&
			console.warn(`"quality" will be ignored for "${B.png}" mimeType`),
			t === "image/jpg" && (t = B.jpg),
			t === B.jpg &&
				!e.appState?.exportBackground &&
				(console.warn(
					`Defaulting "exportBackground" to "true" for "${B.jpg}" mimeType`,
				),
				(e = { ...e, appState: { ...e.appState, exportBackground: !0 } }));
		let r = await EI(e);
		return (
			(n = n || (/image\/jpe?g/.test(t) ? 0.92 : 0.8)),
			new Promise((o, a) => {
				r.toBlob(
					async (i) => {
						if (!i) return a(new Error("couldn't export to blob"));
						i &&
							t === B.png &&
							e.appState?.exportEmbedScene &&
							(i = await zm({
								blob: i,
								metadata: Ba(e.elements, e.appState, e.files || {}, "local"),
							})),
							o(i);
					},
					t,
					n,
				);
			})
		);
	},
	yI = async ({
		elements: e,
		appState: t = wt(),
		files: n = {},
		exportPadding: r,
		renderEmbeddables: o,
		exportingFrame: a,
		skipInliningFonts: i,
		reuseImages: s,
	}) => {
		let { elements: c, appState: l } = Ca(
				{ elements: e, appState: t },
				null,
				null,
			),
			d = { ...l, exportPadding: r };
		return Om(c, d, n, {
			exportingFrame: a,
			renderEmbeddables: o,
			skipInliningFonts: i,
			reuseImages: s,
		});
	},
	uz = async (e) => {
		if (e.type === "svg") {
			let t = await yI(e);
			await Dd(t.outerHTML);
		} else if (e.type === "png") await Wm(xI(e));
		else if (e.type === "json") await Xm(e.elements, e.files);
		else throw new Error("Invalid export type");
	};
E();
var wI = (e) =>
		e.type === "diamond"
			? [
					b(e.width / 2, 0),
					b(e.width, e.height / 2),
					b(e.width / 2, e.height),
					b(0, e.height / 2),
				]
			: [b(0, 0), b(0 + e.width, 0), b(0 + e.width, e.height), b(0, e.height)],
	II = (e) => (oe(e) || Fe(e) ? e.points : wI(e)),
	Qm = (e) => {
		let t = e.reduce(
			(n, [r, o]) => (
				(n.minY = Math.min(n.minY, o)),
				(n.minX = Math.min(n.minX, r)),
				(n.maxX = Math.max(n.maxX, r)),
				(n.maxY = Math.max(n.maxY, o)),
				n
			),
			{ minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0, cx: 0, cy: 0 },
		);
		return (t.cx = (t.maxX + t.minX) / 2), (t.cy = (t.maxY + t.minY) / 2), t;
	},
	eh = (e) => {
		let t = II(e),
			{ cx: n, cy: r } = Qm(t),
			o = b(n, r),
			a = t.map((d) => D(d, o, e.angle)),
			{ minX: i, minY: s, maxX: c, maxY: l } = Qm(a);
		return [i + e.x, s + e.y, c + e.x, l + e.y];
	},
	jm = (e, t, n = !1) => {
		let r = eh(e),
			o = t[0] <= r[0] && t[2] >= r[2] && t[1] <= r[1] && t[3] >= r[3];
		return n
			? o
				? !0
				: r[0] <= t[0] && r[2] >= t[2] && r[1] <= t[1] && r[3] >= t[3]
			: o;
	},
	TI = (e, t) => {
		let n = eh(e);
		return (
			(jo(n[0], Se(t[0], t[2])) || jo(t[0], Se(n[0], n[2]))) &&
			(jo(n[1], Se(t[1], t[3])) || jo(t[1], Se(n[1], n[3])))
		);
	},
	th = ({ elements: e, bounds: t, type: n, errorMargin: r = 0 }) => {
		Vc(t) && (t = Ve(t, j(e)));
		let o = [t[0] - r, t[1] - r, t[2] + r, t[3] + r],
			a = new Set();
		for (let i of e) {
			if (a.has(i.id)) continue;
			if (
				n === "overlap" ? TI(i, o) : n === "inside" ? jm(i, o) : jm(i, o, !0)
			) {
				if ((a.add(i.id), i.boundElements))
					for (let c of i.boundElements) a.add(c.id);
				X(i) && i.containerId && a.add(i.containerId),
					Q(i) &&
						(i.startBinding && a.add(i.startBinding.elementId),
						i.endBinding && a.add(i.endBinding?.elementId));
			}
		}
		return e.filter((i) => a.has(i.id));
	};
E();
function nh(e) {
	return [
		Math.min(e[0][0], e[1][0]),
		Math.min(e[0][1], e[1][1]),
		Math.max(e[0][0], e[1][0]),
		Math.max(e[0][1], e[1][1]),
	];
}
function RI(e, t) {
	return e[0] <= t[2] && e[2] >= t[0] && e[1] <= t[3] && e[3] >= t[1];
}
var vI = 1e-6;
function rh(e, t) {
	let n = ae(e[1], e[0]),
		r = ae(t, e[0]),
		o = Ut(n, r);
	return Math.abs(o) < vI;
}
function Sd(e, t) {
	let n = ae(e[1], e[0]),
		r = ae(t, e[0]);
	return Ut(n, r) < 0;
}
function oh(e, t) {
	return (
		rh(e, t[0]) || rh(e, t[1]) || (Sd(e, t[0]) ? !Sd(e, t[1]) : Sd(e, t[1]))
	);
}
function ah(e, t) {
	return RI(nh(e), nh(t)) && oh(e, t) && oh(t, e);
}
var Hz = (e, t, n) => {
	let r = j(e);
	for (let o of t)
		if (o.frameId) {
			let a = n.get(o.id),
				i = n.get(o.frameId);
			if (a) {
				let s = r.get(a);
				s && J(s, { frameId: i ?? o.frameId }, !1);
			}
		}
};
function ih(e, t, n) {
	let r = _l(t, n),
		o = _l(e, n);
	return r.some((i) => o.some((s) => ah(i, s)));
}
var sh = (e, t, n) =>
		Os(ds(e, t, n, !1)).filter(
			(r) => (!de(r) && !r.frameId) || r.frameId === t.id,
		),
	ch = (e, t, n, r) => ds(e, t, r).some((o) => o.id === n.id);
var lh = (e, t, n) => {
		let [r, o, a, i] = H(t, n),
			[s, c, l, d] = Te(e);
		return r <= s && o <= c && a >= l && i >= d;
	},
	cr = (e, t, n) => lh([e], t, n) || ih(e, t, n) || ch([t], e, t, n),
	Jz = (e, t, n) => {
		let [r, o, a, i] = H(t, n);
		return Ii(b(r, o), b(e.x, e.y), b(a, i));
	};
var kz = (e) => {
		let t = new Map();
		for (let n of e) {
			let r = de(n) ? n.id : n.frameId;
			r && !t.has(r) && t.set(r, Ja(e, r));
		}
		return t;
	},
	Ja = (e, t) => {
		let n = [];
		for (let r of e.values()) r.frameId === t && n.push(r);
		return n;
	},
	Td = (e) => e.filter((t) => de(t)),
	Rd = (e) => {
		let t = j(Td(e));
		return e.filter((n) => t.has(n.id) || !n.frameId || !t.has(n.frameId));
	},
	Yz = (e, t, n, r) => {
		let o = Ja(e, t.id),
			a = new Set(o),
			i = new Set([...sh(e, t, r), ...o.filter((u) => ch(e, u, t, r))]),
			s = o.filter((u) => !i.has(u)),
			c = new Set(Array.from(i).flatMap((u) => u.groupIds));
		for (let u of s)
			if (!ih(u, t, r)) u.groupIds.length === 0 && a.delete(u);
			else if (u.groupIds.length > 0) for (let p of u.groupIds) c.add(p);
		for (let u of s)
			if (u.groupIds.length > 0) {
				let p = !0;
				for (let m of u.groupIds) c.has(m) && (p = !1);
				p && a.delete(u);
			}
		let l = Array.from(i).filter((u) => u.groupIds.length === 0);
		for (let u of l) a.add(u);
		let d = Array.from(i).filter((u) => u.groupIds.length > 0),
			U = T5(d, n);
		for (let [u, p] of Object.entries(U))
			if (p) {
				let m = sr(e, u);
				if (lh(m, t, r)) for (let h of m) a.add(h);
			}
		return [...a].filter((u) => !(X(u) && u.containerId));
	},
	Vz = (e, t, n) => Os(e, sh(e, t, n)),
	et = (e, t) => (e.frameId && t.get(e.frameId)) || null,
	qz = (e, t) => {
		let n = new Set(),
			r = j(e);
		e = Os(e);
		for (let i of e) de(i) && i.id !== t.id && n.add(i.id);
		let o = new Set(),
			a = [];
		for (let i of e)
			if (!(de(i) || (i.frameId && n.has(i.frameId))))
				if (i.groupIds.length) {
					let s = i.groupIds.at(-1);
					if (!o.has(s)) {
						o.add(s);
						let c = sr(e, s);
						if (c.some((l) => cr(l, t, r))) for (let l of c) a.push(l);
					}
				} else cr(i, t, r) && a.push(i);
		return a;
	},
	MI = (e, t, n) => {
		let r = j(e),
			o = new Map();
		for (let c of e.values()) c.frameId === n.id && o.set(c.id, !0);
		let a = new Set(t.map((c) => c.id)),
			i = [],
			s = new Set();
		for (let c of t) de(c) && c.id !== n.id && s.add(c.id);
		for (let c of Os(e, t)) {
			if (de(c) || (c.frameId && s.has(c.frameId))) continue;
			o.has(c.id) || i.push(c);
			let l = ee(c, r);
			l && !a.has(l.id) && !o.has(l.id) && i.push(l);
		}
		for (let c of i) J(c, { frameId: n.id }, !1);
		return e;
	},
	dh = (e, t) => {
		let n = new Map(),
			r = new Map();
		for (let o of e)
			if (o.frameId) {
				n.set(o.id, o);
				let a = r.get(o.frameId) || [];
				a.push(o);
				let i = ee(o, t);
				i && (n.set(i.id, i), a.push(i)), r.set(o.frameId, a);
			}
		for (let [, o] of n) J(o, { frameId: null }, !1);
	},
	_I = (e, t) => {
		let n = Ja(e, t.id);
		return dh(n, j(e)), e;
	},
	Gz = (e, t, n, r) => MI(_I(e, n), t, n).slice(),
	Xz = (e, t, n) => {
		let r = n.scene.getSelectedElements({
				selectedElementIds: t.selectedElementIds,
				elements: e,
			}),
			o = new Set(r);
		if (t.editingGroupId)
			for (let s of r)
				s.groupIds.length === 0
					? o.add(s)
					: s.groupIds.flatMap((c) => sr(e, c)).forEach((c) => o.add(c));
		let a = new Set(),
			i = j(e);
		return (
			o.forEach((s) => {
				s.frameId && !de(s) && !Ns(s, i, t) && a.add(s);
			}),
			a.size > 0 && dh(a, i),
			e
		);
	},
	Os = (e, t) => {
		let n = new Set(),
			r = t || e;
		for (let i of r.values()) {
			let s = i.groupIds[i.groupIds.length - 1];
			s && n.add(s);
		}
		let o = new Set();
		for (let i of n) sr(e, i).some((s) => de(s)) && o.add(i);
		let a = [];
		for (let i of r.values())
			o.has(i.groupIds[i.groupIds.length - 1]) || a.push(i);
		return a;
	},
	$s = (e, t, n) => {
		let r = (X(e) && Oe(e, t)) || e;
		return n.selectedElementIds[r.id] && n.selectedElementsAreBeingDragged
			? n.frameToHighlight
			: et(r, t);
	},
	Ns = (e, t, n) => {
		let r = $s(e, t, n),
			o = (X(e) && Oe(e, t)) || e;
		if (r) {
			if (!n.selectedElementIds[e.id] || !n.selectedElementsAreBeingDragged)
				return !0;
			if (o.groupIds.length === 0) return cr(o, r, t);
			let a = new Set(o.groupIds.flatMap((i) => sr(t, i)));
			if (n.editingGroupId && n.selectedElementsAreBeingDragged) {
				let i = new Set(at(t, n));
				if (n.frameToHighlight !== null) return !0;
				i.forEach((c) => {
					a.delete(c);
				});
			}
			for (let i of a) if (de(i)) return !1;
			for (let i of a) if (cr(i, r, t)) return !0;
		}
		return !1;
	},
	Am = (e) => (e.name === null ? (K1(e) ? "Frame" : "AI Frame") : e.name),
	Bm = (e, t) =>
		th({ elements: e, bounds: t, type: "overlap" }).filter(
			(n) => !n.frameId || n.frameId === t.id,
		);
var LI = (e) => {
		let t = new Set();
		return (
			e.forEach((n) => {
				de(n) && t.add(n.id);
			}),
			e.filter((n) => !(n.frameId && t.has(n.frameId)))
		);
	},
	ds = (e, t, n, r = !0) => {
		let [o, a, i, s] = H(t, n),
			c = e.filter((l) => {
				let [d, U, u, p] = Ve(l, n),
					m = et(l, n);
				if (m) {
					let [h, g, x, y] = Ve(m, n);
					(d = Math.max(h, d)),
						(U = Math.max(g, U)),
						(u = Math.min(x, u)),
						(p = Math.min(y, p));
				}
				return (
					l.locked === !1 &&
					l.type !== "selection" &&
					!Me(l) &&
					o <= d &&
					a <= U &&
					i >= u &&
					s >= p
				);
			});
		return (
			(c = r ? LI(c) : c),
			(c = c.filter((l) => {
				let d = et(l, n);
				return d ? cr(l, d, n) : !0;
			})),
			c
		);
	},
	rd = (e, t, n, r) => {
		let o = new Set(t.map((a) => a.id));
		return e.filter((a) => {
			let i = Uh(a, n.width, n.height, n, r);
			return !o.has(a.id) && i;
		});
	},
	ay = (function () {
		let e = null,
			t = null,
			n = null,
			r = (o, a) => (
				(n != null && o === e && a.selectedElementIds === t) ||
					((n = o.some((i) => a.selectedElementIds[i.id])),
					(e = o),
					(t = a.selectedElementIds)),
				n
			);
		return (
			(r.clearCache = () => {
				(e = null), (t = null), (n = null);
			}),
			r
		);
	})(),
	iy = (e, t, n) => {
		let r = Array.from(new Set(at(e, t).map((o) => n(o))));
		return r.length === 1 ? r[0] : null;
	},
	at = (e, t, n) => {
		let r = [];
		for (let o of e.values()) {
			if (t.selectedElementIds[o.id]) {
				r.push(o);
				continue;
			}
			if (
				n?.includeBoundTextElement &&
				Me(o) &&
				t.selectedElementIds[o?.containerId]
			) {
				r.push(o);
				continue;
			}
		}
		if (n?.includeElementsInFrames) {
			let o = [];
			return (
				r.forEach((a) => {
					de(a) && Ja(e, a.id).forEach((i) => o.push(i)), o.push(a);
				}),
				o
			);
		}
		return r;
	},
	sy = (e, t) =>
		t.editingTextElement
			? [t.editingTextElement]
			: t.newElement
				? [t.newElement]
				: at(e, t, { includeBoundTextElement: !0 }),
	ed = (e, t) => (Tn(t.selectedElementIds, e) ? t.selectedElementIds : e);
var fh = (e) => {
		let t = new Map(),
			n = [];
		for (let r of e) r.isDeleted || (n.push(r), t.set(r.id, r));
		return { elementsMap: t, elements: n };
	},
	DI = (0, ph.default)(
		(e) => {
			(R.DEV || R.MODE === We.TEST || window?.DEBUG_FRACTIONAL_INDICES) &&
				fd(e, {
					shouldThrow: R.DEV || R.MODE === We.TEST,
					includeBoundTextValidation: !0,
				});
		},
		1e3 * 60,
		{ leading: !0, trailing: !1 },
	),
	SI = (e) => {
		let t = ["includeBoundTextElement", "includeElementsInFrames"],
			n = "";
		for (let r of t) n += `${r}:${e[r] ? "1" : "0"}`;
		return n;
	},
	uh = (e) => typeof e == "string",
	$d = class e {
		static sceneMapByElement = new WeakMap();
		static sceneMapById = new Map();
		static mapElementToScene(t, n) {
			uh(t)
				? this.sceneMapById.set(t, n)
				: (this.sceneMapByElement.set(t, n), this.sceneMapById.set(t.id, n));
		}
		static getScene(t) {
			return uh(t)
				? this.sceneMapById.get(t) || null
				: this.sceneMapByElement.get(t) || null;
		}
		callbacks = new Set();
		nonDeletedElements = [];
		nonDeletedElementsMap = Be(new Map());
		elements = [];
		nonDeletedFramesLikes = [];
		frames = [];
		elementsMap = Be(new Map());
		selectedElementsCache = {
			selectedElementIds: null,
			elements: null,
			cache: new Map(),
		};
		sceneNonce;
		getSceneNonce() {
			return this.sceneNonce;
		}
		getNonDeletedElementsMap() {
			return this.nonDeletedElementsMap;
		}
		getElementsIncludingDeleted() {
			return this.elements;
		}
		getElementsMapIncludingDeleted() {
			return this.elementsMap;
		}
		getNonDeletedElements() {
			return this.nonDeletedElements;
		}
		getFramesIncludingDeleted() {
			return this.frames;
		}
		getSelectedElements(t) {
			let n = SI(t),
				r = t?.elements || this.nonDeletedElements;
			if (
				this.selectedElementsCache.elements === r &&
				this.selectedElementsCache.selectedElementIds === t.selectedElementIds
			) {
				let a = this.selectedElementsCache.cache.get(n);
				if (a) return a;
			} else t?.elements == null && this.selectedElementsCache.cache.clear();
			let o = at(r, { selectedElementIds: t.selectedElementIds }, t);
			return (
				t?.elements == null &&
					((this.selectedElementsCache.selectedElementIds =
						t.selectedElementIds),
					(this.selectedElementsCache.elements = this.nonDeletedElements),
					this.selectedElementsCache.cache.set(n, o)),
				o
			);
		}
		getNonDeletedFramesLikes() {
			return this.nonDeletedFramesLikes;
		}
		getElement(t) {
			return this.elementsMap.get(t) || null;
		}
		getNonDeletedElement(t) {
			let n = this.getElement(t);
			return n && hh(n) ? n : null;
		}
		mapElements(t) {
			let n = !1,
				r = this.elements.map((o) => {
					let a = t(o);
					return a !== o && (n = !0), a;
				});
			return n && this.replaceAllElements(r), n;
		}
		replaceAllElements(t) {
			let n = t instanceof Array ? t : Array.from(t.values()),
				r = [];
			DI(n),
				(this.elements = Hr(n)),
				this.elementsMap.clear(),
				this.elements.forEach((a) => {
					de(a) && r.push(a),
						this.elementsMap.set(a.id, a),
						e.mapElementToScene(a, this);
				});
			let o = fh(this.elements);
			(this.nonDeletedElements = o.elements),
				(this.nonDeletedElementsMap = o.elementsMap),
				(this.frames = r),
				(this.nonDeletedFramesLikes = fh(this.frames).elements),
				this.triggerUpdate();
		}
		triggerUpdate() {
			this.sceneNonce = ln();
			for (let t of Array.from(this.callbacks)) t();
		}
		onUpdate(t) {
			if (this.callbacks.has(t)) throw new Error();
			return (
				this.callbacks.add(t),
				() => {
					if (!this.callbacks.has(t)) throw new Error();
					this.callbacks.delete(t);
				}
			);
		}
		destroy() {
			(this.elements = []),
				(this.nonDeletedElements = []),
				(this.nonDeletedFramesLikes = []),
				(this.frames = []),
				this.elementsMap.clear(),
				(this.selectedElementsCache.selectedElementIds = null),
				(this.selectedElementsCache.elements = null),
				this.selectedElementsCache.cache.clear(),
				e.sceneMapById.forEach((t, n) => {
					t === this && e.sceneMapById.delete(n);
				}),
				this.callbacks.clear();
		}
		insertElementAtIndex(t, n) {
			if (!Number.isFinite(n) || n < 0)
				throw new Error(
					"insertElementAtIndex can only be called with index >= 0",
				);
			let r = [...this.elements.slice(0, n), t, ...this.elements.slice(n)];
			$a(r, j([t])), this.replaceAllElements(r);
		}
		insertElementsAtIndex(t, n) {
			if (!t.length) return;
			if (!Number.isFinite(n) || n < 0)
				throw new Error(
					"insertElementAtIndex can only be called with index >= 0",
				);
			let r = [...this.elements.slice(0, n), ...t, ...this.elements.slice(n)];
			$a(r, j(t)), this.replaceAllElements(r);
		}
		insertElement = (t) => {
			let n = t.frameId
				? this.getElementIndex(t.frameId)
				: this.elements.length;
			this.insertElementAtIndex(t, n);
		};
		insertElements = (t) => {
			if (!t.length) return;
			let n = t[0]?.frameId
				? this.getElementIndex(t[0].frameId)
				: this.elements.length;
			this.insertElementsAtIndex(t, n);
		};
		getElementIndex(t) {
			return this.elements.findIndex((n) => n.id === t);
		}
		getContainerElement = (t) =>
			(t && t.containerId && this.getElement(t.containerId)) || null;
		getElementsFromId = (t) => {
			let n = this.getNonDeletedElementsMap(),
				r = n.get(t);
			return r ? [r] : sr(n, t);
		};
	},
	mh = $d;
var J = (e, t, n = !0) => {
		let r = !1,
			{ points: o, fileId: a } = t;
		typeof o < "u" && (t = { ...Pr(o), ...t });
		for (let i in t) {
			let s = t[i];
			if (typeof s < "u") {
				if (
					e[i] === s &&
					(typeof s != "object" ||
						s === null ||
						i === "groupIds" ||
						i === "scale")
				)
					continue;
				if (i === "scale") {
					let c = e[i],
						l = s;
					if (c[0] === l[0] && c[1] === l[1]) continue;
				} else if (i === "points") {
					let c = e[i],
						l = s;
					if (c.length === l.length) {
						let d = !1,
							U = c.length;
						for (; --U; ) {
							let u = c[U],
								p = l[U];
							if (u[0] !== p[0] || u[1] !== p[1]) {
								d = !0;
								break;
							}
						}
						if (!d) continue;
					}
				}
				(e[i] = s), (r = !0);
			}
		}
		return (
			r &&
				((typeof t.height < "u" ||
					typeof t.width < "u" ||
					typeof a < "u" ||
					typeof o < "u") &&
					me.delete(e),
				e.version++,
				(e.versionNonce = ln()),
				(e.updated = wn()),
				n && mh.getScene(e)?.triggerUpdate()),
			e
		);
	},
	Bt = (e, t, n = !1) => {
		let r = !1;
		for (let o in t) {
			let a = t[o];
			if (typeof a < "u") {
				if (e[o] === a && (typeof a != "object" || a === null)) continue;
				r = !0;
			}
		}
		return !r && !n
			? e
			: {
					...e,
					...t,
					updated: wn(),
					version: e.version + 1,
					versionNonce: ln(),
				};
	},
	Da = (e, t) => (
		(e.version = (t ?? e.version) + 1),
		(e.versionNonce = ln()),
		(e.updated = wn()),
		e
	);
var Ka = (e) =>
		oe(e) || Fe(e) ? e.points.length < 2 : e.width === 0 && e.height === 0,
	Uh = (e, t, n, r, o) => {
		let [a, i, s, c] = Ve(e, o),
			l = Rr({ clientX: r.offsetLeft, clientY: r.offsetTop }, r),
			d = Rr({ clientX: r.offsetLeft + t, clientY: r.offsetTop + n }, r);
		return l.x <= s && l.y <= c && d.x >= a && d.y >= i;
	},
	MQ = (e, t, n, r, o, a) => {
		let [i, s, c, l] = Te(e, o),
			d = Rr(
				{
					clientX: r.offsetLeft + (a?.left || 0),
					clientY: r.offsetTop + (a?.top || 0),
				},
				r,
			),
			U = Rr(
				{
					clientX: r.offsetLeft + t - (a?.right || 0),
					clientY: r.offsetTop + n - (a?.bottom || 0),
				},
				r,
			);
		return i >= d.x && s >= d.y && c <= U.x && l <= U.y;
	},
	As = (e, t, n) => {
		let r = Math.abs(t),
			o = Math.abs(n);
		if (e === "line" || e === "arrow" || e === "freedraw") {
			let a = Math.round(Math.atan(o / r) / Xt) * Xt;
			a === 0
				? (n = 0)
				: a === Math.PI / 2
					? (t = 0)
					: (n = r * Math.tan(a) * Math.sign(n) || n);
		} else e !== "selection" && (n = r * Math.sign(n));
		return { width: t, height: n };
	},
	od = (e, t, n, r) => {
		let o = n - e,
			a = r - t,
			i = Math.round(Math.atan(a / o) / Xt) * Xt;
		if (i === 0) a = 0;
		else if (i === Math.PI / 2) o = 0;
		else {
			let s = Math.tan(i),
				c = -1,
				l = t - s * e,
				d = -1 / s,
				U = -1,
				u = r - d * n,
				p = (c * u - U * l) / (s * U - d * c),
				m = (l * d - u * s) / (s * U - d * c);
			(o = p - e), (a = m - t);
		}
		return { width: o, height: a };
	};
var vd = (e) => {
	let t = { width: e.width, height: e.height, x: e.x, y: e.y };
	if (e.width < 0) {
		let n = Math.abs(e.width);
		(t.width = n), (t.x = e.x - n);
	}
	if (e.height < 0) {
		let n = Math.abs(e.height);
		(t.height = n), (t.y = e.y - n);
	}
	return t;
};
E();
var bh = { mouse: 8, pen: 16, touch: 28 },
	$I = 16,
	Eh = { e: !0, s: !0, n: !0, w: !0 };
var gh = { e: !0, s: !0, n: !0, w: !0, nw: !0, se: !0 },
	Nd = { e: !0, s: !0, n: !0, w: !0 },
	Nn = (e, t, n, r, o, a, i) => {
		let [s, c] = D(b(e + n / 2, t + r / 2), b(o, a), i);
		return [s - n / 2, c - r / 2, n, r];
	},
	Bs = (e) => !(e.viewport.isMobile || (e.isTouchScreen && (Gf || Xf))),
	Pd = (e) => (Bs(e) ? Eh : {}),
	Cs = ([e, t, n, r, o, a], i, s, c, l = {}, d = 4, U = Vo) => {
		let u = bh[c],
			p = u / s.value,
			m = u / s.value,
			h = u / s.value,
			g = u / s.value,
			x = n - e,
			y = r - t,
			w = d / s.value,
			T = (u - U * 2) / (2 * s.value),
			I = {
				nw: l.nw ? void 0 : Nn(e - w - h + T, t - w - g + T, p, m, o, a, i),
				ne: l.ne ? void 0 : Nn(n + w - T, t - w - g + T, p, m, o, a, i),
				sw: l.sw ? void 0 : Nn(e - w - h + T, r + w - T, p, m, o, a, i),
				se: l.se ? void 0 : Nn(n + w - T, r + w - T, p, m, o, a, i),
				rotation: l.rotation
					? void 0
					: Nn(e + x / 2 - p / 2, t - w - g + T - $I / s.value, p, m, o, a, i),
			},
			_ = (5 * bh.mouse) / s.value;
		return (
			Math.abs(x) > _ &&
				(l.n || (I.n = Nn(e + x / 2 - p / 2, t - w - g + T, p, m, o, a, i)),
				l.s || (I.s = Nn(e + x / 2 - p / 2, r + w - T, p, m, o, a, i))),
			Math.abs(y) > _ &&
				(l.w || (I.w = Nn(e - w - h + T, t + y / 2 - m / 2, p, m, o, a, i)),
				l.e || (I.e = Nn(n + w - T, t + y / 2 - m / 2, p, m, o, a, i))),
			I
		);
	},
	Fd = (e, t, n, r = "mouse", o = Eh) => {
		if (e.locked || se(e)) return {};
		if (e.type === "freedraw" || oe(e)) {
			if (e.points.length === 2) {
				let [, i] = e.points;
				i[0] === 0 || i[1] === 0
					? (o = Nd)
					: i[0] > 0 && i[1] < 0
						? (o = gh)
						: i[0] > 0 && i[1] > 0
							? (o = Nd)
							: i[0] < 0 && i[1] > 0
								? (o = gh)
								: i[0] < 0 && i[1] < 0 && (o = Nd);
			}
		} else de(e) && (o = { ...o, rotation: !0 });
		let a = oe(e) ? Vo + 8 : Pe(e) ? 0 : Vo;
		return Cs(H(e, n, !0), e.angle, t, r, o, a, Pe(e) ? 0 : void 0);
	},
	PQ = (e, t) => {
		if (t.editingLinearElement) return !1;
		if (e.length > 1) return !0;
		let n = e[0];
		return se(n) ? !1 : oe(n) ? n.points.length > 2 : !0;
	};
E();
var Ad = (e, t, n) =>
		t >= e[0] && t <= e[0] + e[2] && n >= e[1] && n <= e[1] + e[3],
	xh = (e, t, n, r, o, a, i, s) => {
		if (!n.selectedElementIds[e.id]) return !1;
		let { rotation: c, ...l } = Fd(e, a, t, i, Pd(s));
		if (c && Ad(c, r, o)) return "rotation";
		let d = Object.keys(l).filter((U) => {
			let u = l[U];
			return u ? Ad(u, r, o) : !1;
		});
		if (d.length > 0) return d[0];
		if (Bs(s)) {
			let [U, u, p, m, h, g] = H(e, t);
			if (!(oe(e) && e.points.length <= 2)) {
				let x = Pe(e) ? 0 : qo / a.value,
					y = qo / a.value,
					w = yh(b(U - x, u - x), b(p + x, m + x), b(h, g), e.angle);
				for (let [T, I] of Object.entries(w)) if (qn(b(r, o), I, y)) return T;
			}
		}
		return !1;
	},
	NI = (e, t, n, r, o, a, i, s) =>
		e.reduce((c, l) => {
			if (c) return c;
			let d = xh(l, i, t, n, r, o, a, s);
			return d ? { element: l, transformHandleType: d } : null;
		}, null),
	PI = ([e, t, n, r], o, a, i, s, c) => {
		let l = Cs([e, t, n, r, (e + n) / 2, (t + r) / 2], 0, i, s, Pd(c)),
			d = Object.keys(l).find((U) => {
				let u = l[U];
				return u && Ad(u, o, a);
			});
		if (d) return d;
		if (Bs(c)) {
			let U = (e + n) / 2,
				u = (t + r) / 2,
				p = qo / i.value,
				m = yh(b(e - p, t - p), b(n + p, r + p), b(U, u), 0);
			for (let [h, g] of Object.entries(m)) if (qn(b(o, a), g, p)) return h;
		}
		return !1;
	},
	Od = ["ns", "nesw", "ew", "nwse"],
	FI = (e, t) => {
		let n = Od.indexOf(e);
		if (n >= 0) {
			let r = Math.round(t / (Math.PI / 4));
			e = Od[(n + r) % Od.length];
		}
		return e;
	},
	OI = (e) => {
		let { element: t, transformHandleType: n } = e,
			r = t && Math.sign(t.height) * Math.sign(t.width) === -1,
			o = null;
		switch (n) {
			case "n":
			case "s":
				o = "ns";
				break;
			case "w":
			case "e":
				o = "ew";
				break;
			case "nw":
			case "se":
				r ? (o = "nesw") : (o = "nwse");
				break;
			case "ne":
			case "sw":
				r ? (o = "nwse") : (o = "nesw");
				break;
			case "rotation":
				return "grab";
		}
		return o && t && (o = FI(o, t.angle)), o ? `${o}-resize` : "";
	},
	yh = ([e, t], [n, r], o, a) => {
		let i = D(b(e, t), o, a),
			s = D(b(n, t), o, a),
			c = D(b(e, r), o, a),
			l = D(b(n, r), o, a);
		return { n: [i, s], e: [s, l], s: [l, c], w: [c, i] };
	};
E();
var AI = (e, t, n, r, o, a, i, s, c, l, d, U) => {
		if (n.length === 1) {
			let [u] = n;
			if (t === "rotation") se(u) || (BI(u, r, o, c, l, a), Ot(u, r));
			else {
				if (X(u) && t) return CI(e, u, r, t, i, c, l), Ot(u, r), !0;
				if (t) {
					let p = n[0].id,
						m = r.get(p),
						h = e.get(p);
					if (m && h) {
						let { nextWidth: g, nextHeight: x } = qI(m, h, r, e, t, c, l, {
							shouldMaintainAspectRatio: s,
							shouldResizeFromCenter: i,
						});
						VI(g, x, m, h, r, e, t, {
							shouldMaintainAspectRatio: s,
							shouldResizeFromCenter: i,
						});
					}
				}
			}
			return !0;
		} else if (n.length > 1) {
			if (t === "rotation") return KI(e, n, r, o, c, l, a, d, U), !0;
			if (t) {
				let {
					nextWidth: u,
					nextHeight: p,
					flipByX: m,
					flipByY: h,
					originalBoundingBox: g,
				} = GI(n, e, r, t, c, l, {
					shouldMaintainAspectRatio: s,
					shouldResizeFromCenter: i,
				});
				return (
					XI(n, r, t, o, {
						shouldResizeFromCenter: i,
						shouldMaintainAspectRatio: s,
						originalElementsMap: e,
						flipByX: m,
						flipByY: h,
						nextWidth: u,
						nextHeight: p,
						originalBoundingBox: g,
					}),
					!0
				);
			}
		}
		return !1;
	},
	BI = (e, t, n, r, o, a) => {
		let [i, s, c, l] = H(e, t),
			d = (i + c) / 2,
			U = (s + l) / 2,
			u;
		de(e)
			? (u = 0)
			: ((u = (5 * Math.PI) / 2 + Math.atan2(o - U, r - d)),
				a && ((u = u + Xt / 2), (u = u - (u % Xt))),
				(u = Zo(u)));
		let p = sn(e);
		if ((J(e, { angle: u }), p)) {
			let m = n.getElement(p);
			m && !Q(e) && J(m, { angle: u });
		}
	},
	wh = (e, t, n, r) =>
		oe(e) || Fe(e) ? { points: po(0, t, po(1, n, e.points, r), r) } : {},
	Bd = (e, t, n) => {
		let r = e.width;
		if (Me(e)) {
			let i = Oe(e, t);
			i && (r = Nt(i, e));
		}
		let a = e.fontSize * (n / r);
		return a < fi ? null : { size: a };
	},
	CI = (e, t, n, r, o, a, i) => {
		let [s, c, l, d, U, u] = H(t, n),
			[p, m] = D(b(a, i), b(U, u), -t.angle),
			h = 0,
			g = 0;
		r !== "e" &&
			r !== "w" &&
			(r.includes("e") && (h = (p - s) / (l - s)),
			r.includes("w") && (h = (l - p) / (l - s)),
			r.includes("n") && (g = (d - m) / (d - c)),
			r.includes("s") && (g = (m - c) / (d - c)));
		let x = Math.max(h, g);
		if (x > 0) {
			let y = t.width * x,
				w = t.height * x,
				T = Bd(t, n, y);
			if (T === null) return;
			let I = [s, c],
				_ = [l, d],
				L = [U, u],
				M = b(s, c);
			if (
				(["n", "w", "nw"].includes(r) &&
					(M = b(_[0] - Math.abs(y), _[1] - Math.abs(w))),
				r === "ne")
			) {
				let K = [I[0], _[1]];
				M = b(K[0], K[1] - Math.abs(w));
			}
			if (r === "sw") {
				let K = [_[0], I[1]];
				M = b(K[0] - Math.abs(y), K[1]);
			}
			["s", "n"].includes(r) && (M[0] = L[0] - y / 2),
				["e", "w"].includes(r) && (M[1] = L[1] - w / 2),
				o && ((M[0] = L[0] - Math.abs(y) / 2), (M[1] = L[1] - Math.abs(w) / 2));
			let N = t.angle,
				$ = D(M, b(U, u), N),
				S = b(M[0] + Math.abs(y) / 2, M[1] + Math.abs(w) / 2),
				P = D(S, b(U, u), N);
			M = D($, P, -N);
			let [A, k] = M;
			J(t, { fontSize: T.size, width: y, height: w, x: A, y: k });
		}
		if (r === "e" || r === "w") {
			let y = e.get(t.id),
				[w, T, I, _] = $t(y, y.width, y.height, !0),
				L = b(w, T),
				M = b(I, _),
				N = zt(L, M),
				$ = D(b(a, i), N, -y.angle),
				[S, , P] = $t(t, t.width, t.height, !0),
				A = P - S,
				k = M[0] - L[0],
				K = ys(
					pe({ fontSize: t.fontSize, fontFamily: t.fontFamily }),
					t.lineHeight,
				),
				q = k / A;
			r.includes("e") && (q = ($[0] - L[0]) / A),
				r.includes("w") && (q = (M[0] - $[0]) / A);
			let F = t.width * q < K ? K : t.width * q,
				C = vn(t.originalText, pe(t), Math.abs(F)),
				Y = an(C, pe(t), t.lineHeight),
				te = Y.height,
				[un, it, Fn, _o] = $t(y, F, te, !0),
				dr = Fn - un,
				Ur = _o - it,
				bt = [...L];
			["n", "w", "nw"].includes(r) && (bt = [M[0] - Math.abs(dr), L[1]]);
			let On = y.angle,
				Yr = D(bt, N, On),
				Ae = b(bt[0] + Math.abs(dr) / 2, bt[1] + Math.abs(Ur) / 2),
				pn = D(Ae, N, On);
			bt = D(Yr, pn, -On);
			let st = {
				width: Math.abs(F),
				height: Math.abs(Y.height),
				x: bt[0],
				y: bt[1],
				text: C,
				autoResize: !1,
			};
			J(t, st);
		}
	},
	KI = (e, t, n, r, o, a, i, s, c) => {
		let l = (5 * Math.PI) / 2 + Math.atan2(a - c, o - s);
		i && ((l += Xt / 2), (l -= l % Xt));
		for (let d of t)
			if (!de(d)) {
				let [U, u, p, m] = H(d, n),
					h = (U + p) / 2,
					g = (u + m) / 2,
					x = e.get(d.id)?.angle ?? d.angle,
					[y, w] = D(b(h, g), b(s, c), l + x - d.angle);
				if (se(d)) {
					let I = h5(d, n);
					gs(d, n, I);
				} else
					J(d, { x: d.x + (y - h), y: d.y + (w - g), angle: Zo(l + x) }, !1);
				Ot(d, n, { simultaneouslyUpdated: t });
				let T = ee(d, n);
				T &&
					!Q(d) &&
					J(T, { x: T.x + (y - h), y: T.y + (w - g), angle: Zo(l + x) }, !1);
			}
		r.triggerUpdate();
	},
	HI = (e, t, n, r, o) => {
		let [a, i, s, c] = t.length === 1 ? H(t[0], n) : Te(t),
			l = (a + s) / 2,
			d = (i + c) / 2,
			U = t.length === 1 ? t[0].angle : 0;
		switch ((([r, o] = D(b(r, o), b(l, d), -U)), e)) {
			case "n":
				return D(b(r - (a + s) / 2, o - i), b(0, 0), U);
			case "s":
				return D(b(r - (a + s) / 2, o - c), b(0, 0), U);
			case "w":
				return D(b(r - a, o - (i + c) / 2), b(0, 0), U);
			case "e":
				return D(b(r - s, o - (i + c) / 2), b(0, 0), U);
			case "nw":
				return D(b(r - a, o - i), b(0, 0), U);
			case "ne":
				return D(b(r - s, o - i), b(0, 0), U);
			case "sw":
				return D(b(r - a, o - c), b(0, 0), U);
			case "se":
				return D(b(r - s, o - c), b(0, 0), U);
			default:
				return [0, 0];
		}
	},
	JI = (e, t) => {
		let [, [n, r]] = t.points;
		return (e === "nw" && (n < 0 || r < 0)) ||
			(e === "ne" && n >= 0) ||
			(e === "sw" && n <= 0) ||
			(e === "se" && (n > 0 || r > 0))
			? "end"
			: "origin";
	},
	kI = (e, t, n) => {
		if (n) return "center";
		if (t)
			switch (e) {
				case "n":
					return "south-side";
				case "e":
					return "west-side";
				case "s":
					return "north-side";
				case "w":
					return "east-side";
				case "ne":
					return "bottom-left";
				case "nw":
					return "bottom-right";
				case "se":
					return "top-left";
				case "sw":
					return "top-right";
			}
		return ["e", "se", "s"].includes(e)
			? "top-left"
			: ["n", "nw", "w"].includes(e)
				? "bottom-right"
				: e === "ne"
					? "bottom-left"
					: "top-right";
	},
	YI = (e, t, n, r, o, a, i, s, c) => {
		let l = kI(i, s, c),
			[d, U] = e;
		switch (l) {
			case "top-left":
				return {
					x:
						d +
						(t - r) / 2 +
						((r - t) / 2) * Math.cos(a) +
						((n - o) / 2) * Math.sin(a),
					y:
						U +
						(n - o) / 2 +
						((r - t) / 2) * Math.sin(a) +
						((o - n) / 2) * Math.cos(a),
				};
			case "top-right":
				return {
					x:
						d + ((t - r) / 2) * (Math.cos(a) + 1) + ((n - o) / 2) * Math.sin(a),
					y:
						U +
						(n - o) / 2 +
						((t - r) / 2) * Math.sin(a) +
						((o - n) / 2) * Math.cos(a),
				};
			case "bottom-left":
				return {
					x:
						d + ((t - r) / 2) * (1 - Math.cos(a)) + ((o - n) / 2) * Math.sin(a),
					y:
						U + ((n - o) / 2) * (Math.cos(a) + 1) + ((r - t) / 2) * Math.sin(a),
				};
			case "bottom-right":
				return {
					x:
						d + ((t - r) / 2) * (Math.cos(a) + 1) + ((o - n) / 2) * Math.sin(a),
					y:
						U + ((n - o) / 2) * (Math.cos(a) + 1) + ((t - r) / 2) * Math.sin(a),
				};
			case "center":
				return { x: d - (r - t) / 2, y: U - (o - n) / 2 };
			case "east-side":
				return {
					x: d + ((t - r) / 2) * (Math.cos(a) + 1),
					y: U + (o - n) / 2 + ((t - r) / 2) * Math.sin(a),
				};
			case "west-side":
				return {
					x: d + ((t - r) / 2) * (1 - Math.cos(a)),
					y: U + ((r - t) / 2) * Math.sin(a) + (n - o) / 2,
				};
			case "north-side":
				return {
					x: d + (t - r) / 2 + ((n - o) / 2) * Math.sin(a),
					y: U + ((o - n) / 2) * (Math.cos(a) - 1),
				};
			case "south-side":
				return {
					x: d + (t - r) / 2 + ((o - n) / 2) * Math.sin(a),
					y: U + ((n - o) / 2) * (Math.cos(a) + 1),
				};
		}
	},
	VI = (
		e,
		t,
		n,
		r,
		o,
		a,
		i,
		{
			shouldInformMutation: s = !0,
			shouldMaintainAspectRatio: c = !1,
			shouldResizeFromCenter: l = !1,
		} = {},
	) => {
		let d = {},
			U = ee(n, o);
		if (U) {
			let h = a.get(U.id);
			if ((h && (d = { fontSize: h.fontSize }), c)) {
				let g = { ...n, width: e, height: t },
					x = Bd(U, o, Nt(g, U));
				if (x === null) return;
				d = { fontSize: x.size };
			} else {
				let g = K5(pe(U), U.lineHeight),
					x = A5(U.fontSize, U.lineHeight);
				(e = Math.max(e, g)), (t = Math.max(t, x));
			}
		}
		let u = wh(r, e, t, !0),
			p = b(r.x, r.y);
		if (oe(r)) {
			let [h, g] = Ve(r, a);
			p = b(h, g);
		}
		let m = YI(p, r.width, r.height, e, t, r.angle, i, c, l);
		if (oe(r) && u.points) {
			let h = r.x - p[0],
				g = r.y - p[1];
			(m.x += h), (m.y += g);
			let x = u.points[0][0],
				y = u.points[0][1];
			(m.x += x),
				(m.y += y),
				(u.points = u.points.map((w) => b(w[0] - x, w[1] - y)));
		}
		if (
			(e < 0 && (m.x = m.x + e),
			t < 0 && (m.y = m.y + t),
			"scale" in n &&
				"scale" in r &&
				J(n, {
					scale: [
						(Math.sign(e) || r.scale[0]) * r.scale[0],
						(Math.sign(t) || r.scale[1]) * r.scale[1],
					],
				}),
			Q(n) && U && c)
		) {
			let h = (e / n.width) * U.fontSize;
			if (h < fi) return;
			d.fontSize = h;
		}
		if (e !== 0 && t !== 0 && Number.isFinite(m.x) && Number.isFinite(m.y)) {
			let h = { ...m, width: Math.abs(e), height: Math.abs(t), ...u };
			J(n, h, s),
				Ot(n, o, { newSize: { width: e, height: t } }),
				U && d != null && J(U, { fontSize: d.fontSize }),
				Cr(n, o, i, c);
		}
	},
	qI = (
		e,
		t,
		n,
		r,
		o,
		a,
		i,
		{ shouldMaintainAspectRatio: s = !1, shouldResizeFromCenter: c = !1 } = {},
	) => {
		let [l, d, U, u] = $t(t, t.width, t.height, !0),
			p = b(l, d),
			m = b(U, u),
			h = zt(p, m),
			g = D(b(a, i), h, -t.angle),
			[x, y, w, T] = $t(e, e.width, e.height, !0),
			I = w - x,
			_ = T - y,
			L = m[0] - p[0],
			M = m[1] - p[1],
			N = L / I,
			$ = M / _;
		o.includes("e") && (N = (g[0] - p[0]) / I),
			o.includes("s") && ($ = (g[1] - p[1]) / _),
			o.includes("w") && (N = (m[0] - g[0]) / I),
			o.includes("n") && ($ = (m[1] - g[1]) / _);
		let S = e.width * N,
			P = e.height * $;
		if ((c && ((S = 2 * S - t.width), (P = 2 * P - t.height)), s)) {
			let A = Math.abs(S) / t.width,
				k = Math.abs(P) / t.height;
			if ((o.length === 1 && ((P *= A), (S *= k)), o.length === 2)) {
				let K = Math.max(A, k);
				(S = t.width * K * Math.sign(S)), (P = t.height * K * Math.sign(P));
			}
		}
		return { nextWidth: S, nextHeight: P };
	},
	GI = (
		e,
		t,
		n,
		r,
		o,
		a,
		{ shouldMaintainAspectRatio: i = !1, shouldResizeFromCenter: s = !1 } = {},
	) => {
		let c = e.map((A) => t.get(A.id)),
			l = c.reduce((A, k) => {
				if (!oe(k)) return A;
				let K = sn(k);
				if (!K) return A;
				let q = t.get(K) ?? null;
				return Me(q)
					? [...A, { ...q, ...W.getBoundTextElementPosition(k, q, n) }]
					: A;
			}, []),
			d = $l(c.map((A) => A).concat(l)),
			{ minX: U, minY: u, maxX: p, maxY: m, midX: h, midY: g } = d,
			x = p - U,
			y = m - u,
			w = {
				ne: [U, m],
				se: [U, u],
				sw: [p, u],
				nw: [p, m],
				e: [U, u + y / 2],
				w: [p, u + y / 2],
				n: [U + x / 2, m],
				s: [U + x / 2, u],
			},
			[T, I] = s ? [h, g] : w[r],
			_ = s ? 2 : 1,
			L = Math.max(Math.abs(o - T) / x || 0, Math.abs(a - I) / y || 0) * _,
			M = r.includes("e") || r.includes("w") ? Math.abs(o - T) * _ : x,
			N = r.includes("n") || r.includes("s") ? Math.abs(a - I) * _ : y;
		i && ((M = x * L * Math.sign(o - T)), (N = y * L * Math.sign(a - I)));
		let $ = {
				ne: [o < T, a > I],
				se: [o < T, a < I],
				sw: [o > T, a < I],
				nw: [o > T, a > I],
				e: [o < T, !1],
				w: [o > T, !1],
				n: [!1, a > I],
				s: [!1, a < I],
			},
			[S, P] = $[r].map((A) => A);
		return {
			originalBoundingBox: d,
			nextWidth: M,
			nextHeight: N,
			flipByX: S,
			flipByY: P,
		};
	},
	XI = (
		e,
		t,
		n,
		r,
		{
			shouldMaintainAspectRatio: o = !1,
			shouldResizeFromCenter: a = !1,
			flipByX: i = !1,
			flipByY: s = !1,
			nextHeight: c,
			nextWidth: l,
			originalElementsMap: d,
			originalBoundingBox: U,
		} = {},
	) => {
		if (
			(l === void 0 && c === void 0 && i === void 0 && s === void 0) ||
			c === 0 ||
			l === 0
		)
			return;
		d || (d = t);
		let u = e.reduce((_, L) => {
				let M = d.get(L.id);
				return M && _.push({ orig: M, latest: L }), _;
			}, []),
			p;
		if (U) p = U;
		else {
			let _ = u.reduce((L, { orig: M }) => {
				if (!oe(M)) return L;
				let N = sn(M);
				if (!N) return L;
				let $ = d.get(N) ?? null;
				return Me($)
					? [...L, { ...$, ...W.getBoundTextElementPosition(M, $, t) }]
					: L;
			}, []);
			p = $l(u.map(({ orig: L }) => L).concat(_));
		}
		let { minX: m, minY: h, maxX: g, maxY: x, midX: y, midY: w } = p,
			T = g - m,
			I = x - h;
		if (
			(l === void 0 && c === void 0 && ((l = T), (c = I)),
			o &&
				(l === void 0
					? (l = c * (T / I))
					: c === void 0
						? (c = l * (I / T))
						: Math.abs(l / c - T / I) > 0.001 && (l = c * (T / I))),
			l && c)
		) {
			let _ = n.includes("e") || n.includes("w") ? Math.abs(l) / T : 1,
				L = n.includes("n") || n.includes("s") ? Math.abs(c) / I : 1,
				M;
			n.length === 1
				? (M = n.includes("e") || n.includes("w") ? _ : L)
				: (M = Math.max(Math.abs(l) / T || 0, Math.abs(c) / I || 0));
			let N = {
					ne: [m, x],
					se: [m, h],
					sw: [g, h],
					nw: [g, x],
					e: [m, h + I / 2],
					w: [g, h + I / 2],
					n: [m + T / 2, x],
					s: [m + T / 2, h],
				},
				[$, S] = a ? [y, w] : N[n],
				P =
					o ||
					u.some((F) => F.latest.angle !== 0 || X(F.latest) || _5(F.latest));
			P && ((_ = M), (L = M));
			let [A, k] = [i ? -1 : 1, s ? -1 : 1],
				K = [];
			for (let { orig: F, latest: C } of u) {
				if (X(F) && Me(F)) continue;
				let Y = F.width * _,
					te = F.height * L,
					un = Zo(F.angle * A * k),
					it = oe(F) || Fe(F),
					Fn = F.x - $,
					_o = F.y - S,
					dr = i && !it ? Y : 0,
					Ur = s && !it ? te : 0,
					bt = $ + A * (Fn * _ + dr),
					On = S + k * (_o * L + Ur),
					Yr = wh(F, Y * A, te * k, !1),
					Ae = { x: bt, y: On, width: Y, height: te, angle: un, ...Yr };
				if ((Pe(F) && (Ae.scale = [F.scale[0] * A, F.scale[1] * k]), X(F))) {
					let st = Bd(F, t, Y);
					if (!st) return;
					Ae.fontSize = st.size;
				}
				let pn = d.get(sn(F) ?? "");
				if (pn)
					if (P) {
						let st = pn.fontSize * M;
						if (st < fi) return;
						Ae.boundTextFontSize = st;
					} else Ae.boundTextFontSize = pn.fontSize;
				K.push({ element: C, update: Ae });
			}
			let q = K.map(({ element: F }) => F);
			for (let {
				element: F,
				update: { boundTextFontSize: C, ...Y },
			} of K) {
				let { width: te, height: un, angle: it } = Y;
				J(F, Y, !1),
					Ot(F, t, {
						simultaneouslyUpdated: q,
						newSize: { width: te, height: un },
					});
				let Fn = ee(F, t);
				Fn &&
					C &&
					(J(Fn, { fontSize: C, angle: oe(F) ? void 0 : it }, !1),
					Cr(F, t, n, !0));
			}
			r.triggerUpdate();
		}
	};
E();
var ZI = (e, t, n, r, o, a) => {
		if (t.length === 1 && se(t[0]) && (t[0].startBinding || t[0].endBinding))
			return;
		let i = t.filter((U) => !(se(U) && U.startBinding && U.endBinding)),
			s = new Set(i),
			c = i.filter((U) => de(U)).map((U) => U.id);
		if (c.length > 0)
			for (let U of r.getNonDeletedElements())
				U.frameId !== null && c.includes(U.frameId) && s.add(U);
		let l = Te(Array.from(s).map((U) => e.originalElements.get(U.id) ?? U)),
			d = WI(l, n, o, a);
		s.forEach((U) => {
			if ((Ih(e, U, d), !Q(U))) {
				let u = ee(U, r.getNonDeletedElementsMap());
				u && Ih(e, u, d);
			}
			Ot(U, r.getElementsMapIncludingDeleted(), {
				simultaneouslyUpdated: Array.from(s),
			});
		});
	},
	WI = (e, t, n, r) => {
		let [o, a] = e,
			i = o + t.x + n.x,
			s = a + t.y + n.y;
		if (n.x === 0 || n.y === 0) {
			let [c, l] = Ra(o + t.x, a + t.y, r);
			n.x === 0 && (i = c), n.y === 0 && (s = l);
		}
		return { x: i - o, y: s - a };
	},
	Ih = (e, t, n) => {
		let r = e.originalElements.get(t.id) ?? t,
			o = r.x + n.x,
			a = r.y + n.y;
		J(t, { x: o, y: a });
	},
	zI = (e, t, n) => {
		let [r, o] = Te(e);
		return [t - r, n - o];
	},
	QI = ({
		newElement: e,
		elementType: t,
		originX: n,
		originY: r,
		x: o,
		y: a,
		width: i,
		height: s,
		shouldMaintainAspectRatio: c,
		shouldResizeFromCenter: l,
		zoom: d,
		widthAspectRatio: U = null,
		originOffset: u = null,
		informMutation: p = !0,
	}) => {
		c &&
			e.type !== "selection" &&
			(U
				? (s = i / U)
				: (Math.abs(a - r) > Math.abs(o - n)
						? ({ width: i, height: s } = As(t, s, o < n ? -i : i))
						: ({ width: i, height: s } = As(t, i, a < r ? -s : s)),
					s < 0 && (s = -s)));
		let m = o < n ? n - i : n,
			h = a < r ? r - s : r;
		l && ((i += i), (s += s), (m = n - i / 2), (h = r - s / 2));
		let g = null;
		if (X(e)) {
			s = e.height;
			let x = ys(
				pe({ fontSize: e.fontSize, fontFamily: e.fontFamily }),
				e.lineHeight,
			);
			(i = Math.max(i, x)),
				Math.abs(o - n) > Zf / d && (g = { autoResize: !1 }),
				(h = r),
				l && (m = n - i / 2);
		}
		if (i !== 0 && s !== 0) {
			let x = null;
			Pe(e) && (x = { initialWidth: i, initialHeight: s }),
				J(
					e,
					{
						x: m + (u?.x ?? 0),
						y: h + (u?.y ?? 0),
						width: i,
						height: s,
						...g,
						...x,
					},
					p,
				);
		}
	};
E();
var jI = (e, t) =>
	!!(
		!e.viewModeEnabled &&
		e.openDialog?.name !== "elementLinkSelector" &&
		((e.activeTool.type !== "custom" &&
			(e.editingTextElement ||
				(e.activeTool.type !== "selection" &&
					e.activeTool.type !== "eraser" &&
					e.activeTool.type !== "hand" &&
					e.activeTool.type !== "laser"))) ||
			at(t, e).length)
	);
var Ij = (e) => e.reduce((t, n) => t + n.version, 0),
	Tj = (e) => {
		let t = 5381;
		for (let n = 0; n < e.length; n++) t = (t << 5) + t + e[n].versionNonce;
		return t >>> 0;
	},
	pm = (e) => {
		let t = 5381;
		for (let n = 0; n < e.length; n++) {
			let r = e.charCodeAt(n);
			t = (t << 5) + t + r;
		}
		return t >>> 0;
	},
	Q8 = (e) => e.filter((t) => !t.isDeleted && !Ka(t)),
	Md = (e) => e.filter((t) => !t.isDeleted),
	hh = (e) => !e.isDeleted,
	Th = (e) =>
		Md(e).map((t) => (Yc(t.type) ? { ...t, lastCommittedPoint: null } : t)),
	wm = (e) => Th(e),
	Ds = (e) => Th(e);
var vh = async (e) => {
	let t;
	if (e.type === B.png)
		try {
			return await (await import("./image-QE4H3IIT.js")).decodePngMetadata(e);
		} catch (n) {
			throw n.message === "INVALID"
				? new Ln("Image doesn't contain scene", "IMAGE_NOT_CONTAINS_SCENE_DATA")
				: new Ln("Error: cannot restore image");
		}
	else if (
		("text" in Blob
			? (t = await e.text())
			: (t = await new Promise((n) => {
					let r = new FileReader();
					r.readAsText(e, "utf8"),
						(r.onloadend = () => {
							r.readyState === FileReader.DONE && n(r.result);
						});
				})),
		e.type === B.svg)
	)
		try {
			return (await import("./image-QE4H3IIT.js")).decodeSvgMetadata({
				svg: t,
			});
		} catch (n) {
			throw n.message === "INVALID"
				? new Ln("Image doesn't contain scene", "IMAGE_NOT_CONTAINS_SCENE_DATA")
				: new Ln("Error: cannot restore image");
		}
	return t;
};
var eT = (e) =>
		(e && e.name.match(/\.(json|excalidraw|png|svg)$/)?.[1]) || null,
	Xj = (e) => e === "png" || e === "svg",
	Em = (e) => {
		let t = eT(e);
		return t === "png" || t === "svg";
	},
	Ld = (e) => !!e && Object.values(hi).includes(e),
	Js = (e) => {
		let { type: t } = e || {};
		return Ld(t);
	},
	tT = async (e, t, n, r) => {
		let o = await vh(e),
			a;
		try {
			try {
				a = JSON.parse(o);
			} catch (i) {
				throw Js(e)
					? new Ln(
							"Image doesn't contain scene",
							"IMAGE_NOT_CONTAINS_SCENE_DATA",
						)
					: i;
			}
			if (ym(a))
				return {
					type: B.excalidraw,
					data: Ca(
						{
							elements: Ds(a.elements || []),
							appState: {
								theme: t?.theme,
								fileHandle: r || e.handle || null,
								...xi(a.appState || {}),
								...(t ? Hl(a.elements || [], t) : {}),
							},
							files: a.files,
						},
						t,
						n,
						{ repairBindings: !0, refreshDimensions: !1 },
					),
				};
			if (Ed(a)) return { type: B.excalidrawlib, data: a };
			throw new Error("Error: invalid file");
		} catch (i) {
			throw i instanceof Ln ? i : new Error("Error: invalid file");
		}
	},
	xm = async (e, t, n, r) => {
		let o = await tT(e, t, n, r);
		if (o.type !== B.excalidraw) throw new Error("Error: invalid file");
		return o.data;
	},
	nT = (e, t = "unpublished") => {
		let n = JSON.parse(e);
		if (!Ed(n)) throw new Error("Invalid library");
		let r = n.libraryItems || n.library;
		return Jm(r, t);
	},
	Zj = async (e, t = "unpublished") => nT(await vh(e), t),
	Wj = async (e) =>
		new Promise(async (t, n) => {
			try {
				vi(e) && (e = await e),
					e.toBlob((r) => {
						if (!r)
							return n(
								new qi("Error: Canvas too big", "CANVAS_POSSIBLY_TOO_BIG"),
							);
						t(r);
					});
			} catch (r) {
				n(r);
			}
		}),
	zj = async (e) => {
		try {
			let t = await window.crypto.subtle.digest("SHA-1", await Pn(e));
			return F1(new Uint8Array(t));
		} catch (t) {
			return console.error(t), Ei(40);
		}
	},
	Qj = async (e) =>
		new Promise((t, n) => {
			let r = new FileReader();
			(r.onload = () => {
				let o = r.result;
				t(o);
			}),
				(r.onerror = (o) => n(o)),
				r.readAsDataURL(e);
		}),
	jj = (e, t) => `data:${t};base64,${Ks(ka(e), !0)}`,
	eee = (e, t = "") => {
		let n = e.indexOf(","),
			r = atob(e.slice(n + 1)),
			o = e.slice(0, n).split(":")[1].split(";")[0],
			a = new ArrayBuffer(r.length),
			i = new Uint8Array(a);
		for (let s = 0; s < r.length; s++) i[s] = r.charCodeAt(s);
		return new File([a], t, { type: o });
	},
	tee = (e) => Hs(e.slice(e.indexOf(",") + 1)),
	nee = async (e, t) => {
		if (e.type === B.svg) return e;
		let [n, r] = await Promise.all([
				import("./pica-GFNRRI3K.js").then((a) => a.default),
				import("./image-blob-reduce.esm-2RRQLBYF.js").then((a) => a.default),
			]),
			o = r({ pica: n({ features: ["js", "wasm"] }) });
		if (t.outputType) {
			let { outputType: a } = t;
			o._create_blob = function (i) {
				return this.pica
					.toBlob(i.out_canvas, a, 0.8)
					.then((s) => ((i.out_blob = s), i));
			};
		}
		if (!Js(e))
			throw new Error("Error: unsupported file type", { cause: "UNSUPPORTED" });
		return new File(
			[await o.toBlob(e, { max: t.maxWidthOrHeight, alpha: !0 })],
			e.name,
			{ type: t.outputType || e.type },
		);
	},
	ree = (e, t = "") =>
		new File([new TextEncoder().encode(e)], t, { type: B.svg }),
	oee = async (e, t = "") => {
		let n;
		try {
			n = await fetch(e);
		} catch {
			throw new Error("Error: failed to fetch image", { cause: "FETCH_ERROR" });
		}
		if (!n.ok)
			throw new Error("Error: failed to fetch image", { cause: "FETCH_ERROR" });
		let r = await n.blob();
		if (r.type && Js(r)) {
			let o = t || r.name || "";
			return new File([r], o, { type: r.type });
		}
		throw new Error("Error: unsupported file type", { cause: "UNSUPPORTED" });
	},
	aee = async (e) => {
		let t = e.dataTransfer.files.item(0),
			n = await rT(e);
		return { file: t ? await gd(t) : null, fileHandle: n };
	},
	rT = async (e) => {
		if (Ro)
			try {
				return (await e.dataTransfer.items[0].getAsFileSystemHandle()) || null;
			} catch (t) {
				return console.warn(t.name, t.message), null;
			}
		return null;
	},
	Rh = (e) => {
		let t = null,
			n = `${[...new Uint8Array(e).slice(0, 8)].join(" ")} `,
			r = {
				png: "137 80 78 71 13 10 26 10 ",
				jpg: "255 216 255 ",
				gif: "71 73 70 56 57 97 ",
			};
		return (
			n === r.png
				? (t = B.png)
				: n.startsWith(r.jpg)
					? (t = B.jpg)
					: n.startsWith(r.gif) && (t = B.gif),
			t
		);
	},
	Mo = (e, t, n) => new File([e], n || "", { type: t }),
	gd = async (e) => {
		if (e.type) {
			if (Js(e)) {
				let t = await Pn(e),
					n = Rh(t);
				n && n !== e.type && (e = Mo(t, n, e.name));
			}
		} else if (e?.name?.endsWith(".excalidrawlib"))
			e = Mo(await Pn(e), B.excalidrawlib, e.name);
		else if (e?.name?.endsWith(".excalidraw"))
			e = Mo(await Pn(e), B.excalidraw, e.name);
		else {
			let t = await Pn(e),
				n = Rh(t);
			n && (e = Mo(t, n, e.name));
		}
		return e;
	},
	Pn = (e) =>
		"arrayBuffer" in e
			? e.arrayBuffer()
			: new Promise((t, n) => {
					let r = new FileReader();
					(r.onload = (o) => {
						if (!o.target?.result)
							return n(new Error("Couldn't convert blob to ArrayBuffer"));
						t(o.target.result);
					}),
						r.readAsArrayBuffer(e);
				});
var ka = (e) => {
		let t =
				typeof e == "string"
					? new TextEncoder().encode(e)
					: e instanceof Uint8Array
						? e
						: new Uint8Array(e),
			n = "";
		for (let r of t) n += String.fromCharCode(r);
		return n;
	},
	Mh = (e) => {
		let t = new ArrayBuffer(e.length),
			n = new Uint8Array(t);
		for (let r = 0, o = e.length; r < o; r++) n[r] = e.charCodeAt(r);
		return t;
	},
	_h = (e) => new TextDecoder("utf-8").decode(Mh(e)),
	Ks = (e, t = !1) => (t ? window.btoa(e) : window.btoa(ka(e))),
	Hs = (e, t = !1) => (t ? window.atob(e) : _h(window.atob(e)));
var Cd = ({ text: e, compress: t }) => {
		let n;
		if (t !== !1)
			try {
				n = ka((0, ks.deflate)(e));
			} catch (r) {
				console.error("encode: cannot deflate", r);
			}
		return {
			version: "1",
			encoding: "bstring",
			compressed: !!n,
			encoded: n || ka(e),
		};
	},
	Kd = (e) => {
		let t;
		switch (e.encoding) {
			case "bstring":
				t = e.compressed ? e.encoded : _h(e.encoded);
				break;
			default:
				throw new Error(`decode: unknown encoding "${e.encoding}"`);
		}
		return e.compressed
			? (0, ks.inflate)(new Uint8Array(Mh(t)), { to: "string" })
			: t;
	};
var oT = async (e) => {
		let n = (0, Hd.default)(new Uint8Array(await Pn(e))).find(
			(r) => r.name === "tEXt",
		);
		return n ? Jd.default.decode(n.data) : null;
	},
	zm = async ({ blob: e, metadata: t }) => {
		let n = (0, Hd.default)(new Uint8Array(await Pn(e))),
			r = Jd.default.encode(
				B.excalidraw,
				JSON.stringify(Cd({ text: t, compress: !0 })),
			);
		return n.splice(-1, 0, r), new Blob([(0, Lh.default)(n)], { type: B.png });
	},
	yee = async (e) => {
		let t = await oT(e);
		if (t?.keyword === B.excalidraw)
			try {
				let n = JSON.parse(t.text);
				if (!("encoded" in n)) {
					if ("type" in n && n.type === ze.excalidraw) return t.text;
					throw new Error("FAILED");
				}
				return Kd(n);
			} catch (n) {
				throw (console.error(n), new Error("FAILED"));
			}
		throw new Error("INVALID");
	},
	wee = ({ text: e }) => {
		let t = Ks(JSON.stringify(Cd({ text: e })), !0),
			n = "";
		return (
			(n += `<!-- payload-type:${B.excalidraw} -->`),
			(n += "<!-- payload-version:2 -->"),
			(n += "<!-- payload-start -->"),
			(n += t),
			(n += "<!-- payload-end -->"),
			n
		);
	},
	Iee = ({ svg: e }) => {
		if (e.includes(`payload-type:${B.excalidraw}`)) {
			let t = e.match(/<!-- payload-start -->\s*(.+?)\s*<!-- payload-end -->/);
			if (!t) throw new Error("INVALID");
			let o = (e.match(/<!-- payload-version:(\d+) -->/)?.[1] || "1") !== "1";
			try {
				let a = Hs(t[1], o),
					i = JSON.parse(a);
				if (!("encoded" in i)) {
					if ("type" in i && i.type === ze.excalidraw) return a;
					throw new Error("FAILED");
				}
				return Kd(i);
			} catch (a) {
				throw (console.error(a), new Error("FAILED"));
			}
		}
		throw new Error("INVALID");
	};
export {
	ol as a,
	al as b,
	h2 as c,
	En as d,
	eR as e,
	tR as f,
	ii as g,
	si as h,
	Z as i,
	nR as j,
	rR as k,
	oR as l,
	aR as m,
	iR as n,
	sR as o,
	ci as p,
	fR as q,
	uR as r,
	li as s,
	Xf as t,
	pR as u,
	mR as v,
	hR as w,
	Wf as x,
	zf as y,
	bR as z,
	gR as A,
	ER as B,
	xR as C,
	di as D,
	yR as E,
	wR as F,
	IR as G,
	We as H,
	TR as I,
	he as J,
	ke as K,
	Re as L,
	Zt as M,
	Wt as N,
	to as O,
	ui as P,
	Vo as Q,
	RR as R,
	vR as S,
	MR as T,
	_R as U,
	pi as V,
	hi as W,
	B as X,
	LR as Y,
	ze as Z,
	Mc as _,
	DR as $,
	SR as aa,
	$R as ba,
	NR as ca,
	PR as da,
	jf as ea,
	e1 as fa,
	FR as ga,
	bi as ha,
	OR as ia,
	AR as ja,
	BR as ka,
	CR as la,
	KR as ma,
	HR as na,
	JR as oa,
	kR as pa,
	t1 as qa,
	_c as ra,
	YR as sa,
	VR as ta,
	le as ua,
	Lc as va,
	ve as wa,
	xn as xa,
	Dc as ya,
	rt as za,
	qR as Aa,
	B7 as Ba,
	GR as Ca,
	i1 as Da,
	XR as Ea,
	Vn as Fa,
	ZR as Ga,
	s1 as Ha,
	$c as Ia,
	WR as Ja,
	c1 as Ka,
	l1 as La,
	nn as Ma,
	Ei as Na,
	g1 as Oa,
	Ee as Pa,
	y1 as Qa,
	fv as Ra,
	wi as Sa,
	Oc as Ta,
	w1 as Ua,
	De as Va,
	ae as Wa,
	Iv as Xa,
	yr as Ya,
	Qe as Za,
	Ac as _a,
	b as $a,
	D as ab,
	Ne as bb,
	bM as cb,
	gM as db,
	EM as eb,
	cg as fb,
	xM as gb,
	yM as hb,
	Jc as ib,
	pe as jb,
	Ti as kb,
	N1 as lb,
	P1 as mb,
	wM as nb,
	IM as ob,
	ft as pb,
	ta as qb,
	TM as rb,
	Rr as sb,
	kc as tb,
	RM as ub,
	yn as vb,
	vM as wb,
	MM as xb,
	_M as yb,
	Gn as zb,
	LM as Ab,
	DM as Bb,
	SM as Cb,
	$M as Db,
	j as Eb,
	NM as Fb,
	PM as Gb,
	In as Hb,
	FM as Ib,
	OM as Jb,
	AM as Kb,
	BM as Lb,
	vi as Mb,
	CM as Nb,
	Tn as Ob,
	KM as Pb,
	vr as Qb,
	ut as Rb,
	HM as Sb,
	A1 as Tb,
	JM as Ub,
	kM as Vb,
	YM as Wb,
	VM as Xb,
	B1 as Yb,
	Be as Zb,
	Xn as _b,
	jt as $b,
	Pe as ac,
	Mi as bc,
	na as cc,
	vt as dc,
	X as ec,
	K1 as fc,
	H1 as gc,
	de as hc,
	oe as ic,
	Q as jc,
	se as kc,
	Yc as lc,
	ra as mc,
	ug as nc,
	en as oc,
	pg as pc,
	Vc as qc,
	WM as rc,
	Zn as sc,
	Me as tc,
	_i as uc,
	zM as vc,
	QM as wc,
	ln as xc,
	At as yc,
	Gi as zc,
	Ln as Ac,
	vn as Bc,
	wt as Cc,
	f1 as Dc,
	u1 as Ec,
	qy as Fc,
	QV as Gc,
	jV as Hc,
	Gy as Ic,
	eq as Jc,
	T5 as Kc,
	tq as Lc,
	Xy as Mc,
	sr as Nc,
	nq as Oc,
	rq as Pc,
	oq as Qc,
	td as Rc,
	M5 as Sc,
	_5 as Tc,
	$n as Uc,
	sG as Vc,
	k5 as Wc,
	Y5 as Xc,
	V5 as Yc,
	bw as Zc,
	gw as _c,
	Ew as $c,
	Z5 as ad,
	me as bd,
	rD as cd,
	oD as dd,
	aD as ed,
	iD as fd,
	sD as gd,
	cD as hd,
	lD as id,
	dD as jd,
	UD as kd,
	uD as ld,
	ua as md,
	M2 as nd,
	pD as od,
	mD as pd,
	hD as qd,
	bD as rd,
	gD as sd,
	ED as td,
	xD as ud,
	yD as vd,
	wD as wd,
	ID as xd,
	TD as yd,
	RD as zd,
	vD as Ad,
	MD as Bd,
	_D as Cd,
	LD as Dd,
	DD as Ed,
	SD as Fd,
	$D as Gd,
	ND as Hd,
	PD as Id,
	OD as Jd,
	AD as Kd,
	BD as Ld,
	CD as Md,
	JD as Nd,
	YD as Od,
	VD as Pd,
	qD as Qd,
	GD as Rd,
	jD as Sd,
	eS as Td,
	tS as Ud,
	nS as Vd,
	rS as Wd,
	oS as Xd,
	aS as Yd,
	iS as Zd,
	sS as _d,
	cS as $d,
	lS as ae,
	dS as be,
	US as ce,
	pS as de,
	gS as ee,
	ES as fe,
	xS as ge,
	yS as he,
	wS as ie,
	IS as je,
	TS as ke,
	RS as le,
	vS as me,
	_S as ne,
	LS as oe,
	DS as pe,
	SS as qe,
	$S as re,
	NS as se,
	PS as te,
	FS as ue,
	OS as ve,
	AS as we,
	BS as xe,
	CS as ye,
	KS as ze,
	HS as Ae,
	JS as Be,
	kS as Ce,
	YS as De,
	VS as Ee,
	qS as Fe,
	GS as Ge,
	XS as He,
	il as Ie,
	sl as Je,
	ZS as Ke,
	WS as Le,
	zS as Me,
	QS as Ne,
	jS as Oe,
	e$ as Pe,
	t$ as Qe,
	n$ as Re,
	o$ as Se,
	a$ as Te,
	i$ as Ue,
	s$ as Ve,
	c$ as We,
	U$ as Xe,
	f$ as Ye,
	u$ as Ze,
	p$ as _e,
	m$ as $e,
	h$ as af,
	b$ as bf,
	g$ as cf,
	E$ as df,
	w$ as ef,
	I$ as ff,
	T$ as gf,
	R$ as hf,
	v$ as if,
	M$ as jf,
	_$ as kf,
	L$ as lf,
	D$ as mf,
	S$ as nf,
	$$ as of,
	N$ as pf,
	P$ as qf,
	F$ as rf,
	O$ as sf,
	A$ as tf,
	B$ as uf,
	C$ as vf,
	K$ as wf,
	H$ as xf,
	J$ as yf,
	Y$ as zf,
	V$ as Af,
	q$ as Bf,
	G$ as Cf,
	X$ as Df,
	Z$ as Ef,
	W$ as Ff,
	z$ as Gf,
	Q$ as Hf,
	j$ as If,
	eN as Jf,
	pa as Kf,
	Wi as Lf,
	$r as Mf,
	Qi as Nf,
	_a as Of,
	$G as Pf,
	NG as Qf,
	PG as Rf,
	FG as Sf,
	Un as Tf,
	dd as Uf,
	OG as Vf,
	Kr as Wf,
	Tw as Xf,
	Rw as Yf,
	La as Zf,
	vw as _f,
	AG as $f,
	XJ as ag,
	ts as bg,
	m8 as cg,
	z as dg,
	fk as eg,
	uk as fg,
	pk as gg,
	mk as hg,
	ul as ig,
	T4 as jg,
	fl as kg,
	ck as lg,
	R4 as mg,
	_4 as ng,
	Lk as og,
	rs as pg,
	p8 as qg,
	St as rg,
	Dn as sg,
	rn as tg,
	_e as ug,
	qe as vg,
	Ge as wg,
	Xe as xg,
	Ft as yg,
	Vl as zg,
	_V as Ag,
	Gl as Bg,
	r5 as Cg,
	o5 as Dg,
	Xl as Eg,
	LV as Fg,
	DV as Gg,
	SV as Hg,
	fs as Ig,
	uy as Jg,
	ar as Kg,
	Ot as Lg,
	Zl as Mg,
	U5 as Ng,
	$V as Og,
	NV as Pg,
	hs as Qg,
	vs as Rg,
	To as Sg,
	am as Tg,
	pd as Ug,
	fm as Vg,
	LX as Wg,
	DX as Xg,
	Ce as Yg,
	Pk as Zg,
	fo as _g,
	Fk as $g,
	Ro as ah,
	gm as bh,
	bd as ch,
	Pr as dh,
	Hm as eh,
	aI as fh,
	Ca as gh,
	Jm as hh,
	oT as ih,
	zm as jh,
	yee as kh,
	wee as lh,
	Iee as mh,
	eT as nh,
	Xj as oh,
	Em as ph,
	Js as qh,
	tT as rh,
	xm as sh,
	nT as th,
	Zj as uh,
	Wj as vh,
	zj as wh,
	Qj as xh,
	jj as yh,
	eee as zh,
	tee as Ah,
	nee as Bh,
	ree as Ch,
	oee as Dh,
	aee as Eh,
	gd as Fh,
	Ba as Gh,
	dZ as Hh,
	UZ as Ih,
	Jw as Jh,
	fZ as Kh,
	kw as Lh,
	Im as Mh,
	Tm as Nh,
	bZ as Oh,
	wd as Ph,
	Vw as Qh,
	RZ as Rh,
	LZ as Sh,
	Rm as Th,
	vm as Uh,
	FZ as Vh,
	OZ as Wh,
	qw as Xh,
	Mm as Yh,
	AZ as Zh,
	Xw as _h,
	$m as $h,
	Fm as ai,
	Om as bi,
	pW as ci,
	HW as di,
	fI as ei,
	ez as fi,
	tz as gi,
	Xm as hi,
	nz as ii,
	rz as ji,
	Wm as ki,
	Dd as li,
	EI as mi,
	xI as ni,
	yI as oi,
	uz as pi,
	jm as qi,
	TI as ri,
	th as si,
	Hz as ti,
	lh as ui,
	cr as vi,
	Jz as wi,
	kz as xi,
	Ja as yi,
	Td as zi,
	Yz as Ai,
	Vz as Bi,
	et as Ci,
	qz as Di,
	MI as Ei,
	dh as Fi,
	_I as Gi,
	Gz as Hi,
	Xz as Ii,
	Ns as Ji,
	Am as Ki,
	Bm as Li,
	N4 as Mi,
	jk as Ni,
	Nr as Oi,
	El as Pi,
	H4 as Qi,
	aY as Ri,
	J4 as Si,
	k4 as Ti,
	Il as Ui,
	iY as Vi,
	Y4 as Wi,
	H as Xi,
	Te as Yi,
	$l as Zi,
	$Y as _i,
	gs as $i,
	Fy as aj,
	Es as bj,
	Wy as cj,
	yo as dj,
	pq as ej,
	mq as fj,
	hq as gj,
	bq as hj,
	gq as ij,
	Eq as jj,
	xq as kj,
	Ra as lj,
	W as mj,
	va as nj,
	N5 as oj,
	P5 as pj,
	Cq as qj,
	sd as rj,
	ld as sj,
	Wq as tj,
	Cr as uj,
	F5 as vj,
	an as wj,
	uo as xj,
	A5 as yj,
	B5 as zj,
	K5 as Aj,
	sn as Bj,
	ee as Cj,
	Oe as Dj,
	zq as Ej,
	Qq as Fj,
	jq as Gj,
	eG as Hj,
	tG as Ij,
	id as Jj,
	Nt as Kj,
	ba as Lj,
	nG as Mj,
	ys as Nj,
	ow as Oj,
	fd as Pj,
	rm as Qj,
	$a as Rj,
	Hr as Sj,
	mh as Tj,
	J as Uj,
	Bt as Vj,
	Da as Wj,
	Ka as Xj,
	Uh as Yj,
	MQ as Zj,
	od as _j,
	vd as $j,
	Pd as ak,
	Cs as bk,
	Fd as ck,
	PQ as dk,
	NI as ek,
	PI as fk,
	OI as gk,
	AI as hk,
	wh as ik,
	HI as jk,
	JI as kk,
	VI as lk,
	XI as mk,
	ZI as nk,
	zI as ok,
	QI as pk,
	jI as qk,
	Ij as rk,
	Tj as sk,
	pm as tk,
	Md as uk,
	hh as vk,
	LI as wk,
	ds as xk,
	ay as yk,
	iy as zk,
	at as Ak,
	sy as Bk,
	ed as Ck,
	oy as Dk,
	Hl as Ek,
	Jl as Fk,
	Yl as Gk,
};
/*! Bundled license information:

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
