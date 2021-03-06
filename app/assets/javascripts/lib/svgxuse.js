! function() {
    "use strict";
    if ("undefined" != typeof window && window.addEventListener) {
        var e, t, n = Object.create(null),
            o = function() {
                clearTimeout(t), t = setTimeout(e, 100)
            },
            i = function() {},
            r = function() {
                var e;
                window.addEventListener("resize", o, !1), window.addEventListener("orientationchange", o, !1), window.MutationObserver ? ((e = new MutationObserver(o)).observe(document.documentElement, {
                    childList: !0,
                    subtree: !0,
                    attributes: !0
                }), i = function() {
                    try {
                        e.disconnect(), window.removeEventListener("resize", o, !1), window.removeEventListener("orientationchange", o, !1)
                    } catch (e) {}
                }) : (document.documentElement.addEventListener("DOMSubtreeModified", o, !1), i = function() {
                    document.documentElement.removeEventListener("DOMSubtreeModified", o, !1), window.removeEventListener("resize", o, !1), window.removeEventListener("orientationchange", o, !1)
                })
            },
            u = function(e) {
                function t(e) {
                    var t;
                    return void 0 !== e.protocol ? t = e : (t = document.createElement("a")).href = e, t.protocol.replace(/:/g, "") + t.host
                }
                var n, o, i;
                return window.XMLHttpRequest && (n = new XMLHttpRequest, o = t(location), i = t(e), n = void 0 === n.withCredentials && "" !== i && i !== o ? XDomainRequest || void 0 : XMLHttpRequest), n
            },
            s = "http://www.w3.org/1999/xlink";
        e = function() {
            function e() {
                0 === (E -= 1) && (i(), r())
            }

            function t(e) {
                return function() {
                    !0 !== n[e.base] && (e.useEl.setAttributeNS(s, "xlink:href", "#" + e.hash), e.useEl.hasAttribute("href") && e.useEl.setAttribute("href", "#" + e.hash))
                }
            }

            function o(t) {
                return function() {
                    t.onerror = null, t.ontimeout = null, e()
                }
            }
            var d, a, l, c, h, f, m, v, w, b, E = 0;
            for (i(), w = document.getElementsByTagName("use"), h = 0; h < w.length; h += 1) {
                try {
                    a = w[h].getBoundingClientRect()
                } catch (e) {
                    a = !1
                }
                d = (v = (c = w[h].getAttribute("href") || w[h].getAttributeNS(s, "href") || w[h].getAttribute("xlink:href")) && c.split ? c.split("#") : ["", ""])[0], l = v[1], f = a && 0 === a.left && 0 === a.right && 0 === a.top && 0 === a.bottom, a && 0 === a.width && 0 === a.height && !f ? (w[h].hasAttribute("href") && w[h].setAttributeNS(s, "xlink:href", c), d.length && (!0 !== (b = n[d]) && setTimeout(t({
                    useEl: w[h],
                    base: d,
                    hash: l
                }), 0), void 0 === b && void 0 !== (m = u(d)) && (b = new m, n[d] = b, b.onload = function(t) {
                    return function() {
                        var n, o = document.body,
                            i = document.createElement("x");
                        t.onload = null, i.innerHTML = t.responseText, (n = i.getElementsByTagName("svg")[0]) && (n.setAttribute("aria-hidden", "true"), n.style.position = "absolute", n.style.width = 0, n.style.height = 0, n.style.overflow = "hidden", o.insertBefore(n, o.firstChild)), e()
                    }
                }(b), b.onerror = o(b), b.ontimeout = o(b), b.open("GET", d), b.send(), E += 1))) : f ? d.length && n[d] && setTimeout(t({
                    useEl: w[h],
                    base: d,
                    hash: l
                }), 0) : void 0 === n[d] ? n[d] = !0 : n[d].onload && (n[d].abort(), delete n[d].onload, n[d] = !0)
            }
            w = "", E += 1, e()
        };
        var d;
        d = function() {
            window.removeEventListener("load", d, !1), t = setTimeout(e, 0)
        }, "complete" !== document.readyState ? window.addEventListener("load", d, !1) : d()
    }
}();
