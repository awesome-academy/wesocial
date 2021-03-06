"use strict";
! function(e) {
    e.extend(mejs.MepDefaults, {
        loopText: "Repeat On/Off",
        shuffleText: "Shuffle On/Off",
        nextText: "Next Track",
        prevText: "Previous Track",
        playlistText: "Show/Hide Playlist",
        fullscreenText: "Show/Hide Fullscreen"
    }), e.extend(MediaElementPlayer.prototype, {
        buildloop: function(t, s, i, l) {
            var a = this,
                n = e('<div class="mejs-button mejs-loop-button ' + (t.options.loopplaylist ? "mejs-loop-on" : "mejs-loop-off") + '"><button type="button" aria-controls="' + t.id + '" title="' + t.options.loopText + '"></button></div>').appendTo(s).click(function() {
                    t.options.loopplaylist = !t.options.loopplaylist, e(l).trigger("mep-looptoggle", [t.options.loopplaylist]), t.options.loopplaylist ? n.removeClass("mejs-loop-off").addClass("mejs-loop-on") : n.removeClass("mejs-loop-on").addClass("mejs-loop-off")
                });
            a.loopToggle = a.controls.find(".mejs-loop-button")
        },
        loopToggleClick: function() {
            this.loopToggle.trigger("click")
        },
        buildshuffle: function(t, s, i, l) {
            var a = this,
                n = e('<div class="mejs-button mejs-playlist-plugin-button mejs-shuffle-button ' + (t.options.shuffle ? "mejs-shuffle-on" : "mejs-shuffle-off") + '"><button type="button" aria-controls="' + t.id + '" title="' + t.options.shuffleText + '"></button></div>').appendTo(s).click(function() {
                    t.options.shuffle = !t.options.shuffle, e(l).trigger("mep-shuffletoggle", [t.options.shuffle]), t.options.shuffle ? n.removeClass("mejs-shuffle-off").addClass("mejs-shuffle-on") : n.removeClass("mejs-shuffle-on").addClass("mejs-shuffle-off")
                });
            a.shuffleToggle = a.controls.find(".mejs-shuffle-button")
        },
        shuffleToggleClick: function() {
            this.shuffleToggle.trigger("click")
        },
        buildprevtrack: function(t, s, i, l) {
            var a = this;
            e('<div class="mejs-button mejs-playlist-plugin-button mejs-prevtrack-button mejs-prevtrack"><button type="button" aria-controls="' + t.id + '" title="' + t.options.prevText + '"></button></div>').appendTo(s).click(function() {
                e(l).trigger("mep-playprevtrack"), t.playPrevTrack()
            }), a.prevTrack = a.controls.find(".mejs-prevtrack-button")
        },
        prevTrackClick: function() {
            this.prevTrack.trigger("click")
        },
        buildnexttrack: function(t, s, i, l) {
            var a = this;
            e('<div class="mejs-button mejs-playlist-plugin-button mejs-nexttrack-button mejs-nexttrack"><button type="button" aria-controls="' + t.id + '" title="' + t.options.nextText + '"></button></div>').appendTo(s).click(function() {
                e(l).trigger("mep-playnexttrack"), t.playNextTrack()
            }), a.nextTrack = a.controls.find(".mejs-nexttrack-button")
        },
        nextTrackClick: function() {
            this.nextTrack.trigger("click")
        },
        buildplaylist: function(t, s, i, l) {
            var a = this;
            e('<div class="mejs-button mejs-playlist-plugin-button mejs-playlist-button ' + (t.options.playlist ? "mejs-hide-playlist" : "mejs-show-playlist") + '"><button type="button" aria-controls="' + t.id + '" title="' + t.options.playlistText + '"></button></div>').appendTo(s).click(function() {
                a.togglePlaylistDisplay(t, i, l)
            }), a.playlistToggle = a.controls.find(".mejs-playlist-button")
        },
        playlistToggleClick: function() {
            this.playlistToggle.trigger("click")
        },
        buildaudiofullscreen: function(t, s, i, l) {
            if (!t.isVideo) {
                var a = this;
                a.fullscreenBtn = e('<div class="mejs-button mejs-fullscreen-button"><button type="button" aria-controls="' + a.id + '" title="' + a.options.fullscreenText + '" aria-label="' + a.options.fullscreenText + '"></button></div>'), a.fullscreenBtn.appendTo(s);
                var n = !mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.hasSemiNativeFullScreen && !a.media.webkitEnterFullscreen;
                if ("native" === a.media.pluginType && !n || !a.options.usePluginFullScreen && !mejs.MediaFeatures.isFirefox) a.fullscreenBtn.click(function() {
                    mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen() || t.isFullScreen ? t.exitFullScreen() : t.enterFullScreen()
                });
                else {
                    var o = "manual-fullscreen";
                    a.fullscreenBtn.click(function() {
                        t.container.hasClass(o) ? (e(document.body).removeClass(o), t.container.removeClass(o), t.resetSize(), a.isFullScreen = !1) : (a.normalHeight = a.container.height(), a.normalWidth = a.container.width(), e(document.body).addClass(o), t.container.addClass(o), a.container.css({
                            width: "100%",
                            height: "100%"
                        }), t.layers.children().css("width", "100%").css("height", "100%"), a.containerSizeTimeout = setTimeout(function() {
                            a.container.css({
                                width: "100%",
                                height: "100%"
                            }), t.layers.children().css("width", "100%").css("height", "100%"), a.setControlsSize()
                        }, 500), t.setControlsSize(), a.isFullScreen = !0)
                    })
                }
            }
        },
        buildplaylistfeature: function(t, s, i, l) {
            var a = this,
                n = e('<div class="mejs-playlist mejs-layer"><ul class="mejs"></ul></div>').appendTo(i);
            e(l).data("showplaylist") && (t.options.playlist = !0, e("#" + t.id).find(".mejs-overlay-play").hide()), t.options.playlist || n.hide();
            var o, r = function(e) {
                    var t = e.split("/");
                    return t.length > 0 ? decodeURIComponent(t[t.length - 1]) : ""
                },
                d = [],
                p = "";
            e("#" + t.id).find(".mejs-mediaelement source").each(function() {
                if (e(this).parent()[0] && e(this).parent()[0].canPlayType ? o = e(this).parent()[0].canPlayType(this.type) : e(this).parent()[0] && e(this).parent()[0].player && e(this).parent()[0].player.media && e(this).parent()[0].player.media.canPlayType ? o = e(this).parent()[0].player.media.canPlayType(this.type) : console.error("Cannot determine if we can play this media (no canPlayType()) on" + e(this).toString()), p || "maybe" !== o && "probably" !== o || (p = this.type), p && this.type === p && "" !== e.trim(this.src)) {
                    var t = {};
                    t.source = e.trim(this.src), "" !== e.trim(this.title) ? t.name = e.trim(this.title) : t.name = r(t.source), t.poster = e(this).data("poster"), d.push(t)
                }
            });
            for (var c in d) {
                var u = e('<li data-url="' + d[c].source + '" data-poster="' + d[c].poster + '" title="' + d[c].name + '"><span>' + d[c].name + "</span></li>");
                i.find(".mejs-playlist > ul").append(u), e(t.media).hasClass("mep-slider") && u.css({
                    "background-image": 'url("' + u.data("poster") + '")'
                })
            }
            t.videoSliderTracks = d.length, i.find("li:first").addClass("current played"), t.isVideo || t.changePoster(i.find("li:first").data("poster"));
            var f = e('<a class="mep-prev">'),
                m = e('<a class="mep-next">');
            t.videoSliderIndex = 0, i.find(".mejs-playlist").append(f), i.find(".mejs-playlist").append(m), e("#" + t.id + ".mejs-container.mep-slider").find(".mejs-playlist ul li").css({
                transform: "translate3d(0, -20px, 0) scale3d(0.75, 0.75, 1)"
            }), f.click(function() {
                var s = !0;
                t.videoSliderIndex -= 1, t.videoSliderIndex < 0 && (t.videoSliderIndex = 0, s = !1), t.videoSliderIndex === t.videoSliderTracks - 1 ? m.fadeOut() : m.fadeIn(), 0 === t.videoSliderIndex ? f.fadeOut() : f.fadeIn(), !0 === s && (t.sliderWidth = e("#" + t.id).width(), e("#" + t.id + ".mejs-container.mep-slider").find(".mejs-playlist ul li").css({
                    transform: "translate3d(-" + Math.ceil(t.sliderWidth * t.videoSliderIndex) + "px, -20px, 0) scale3d(0.75, 0.75, 1)"
                }))
            }).hide(), m.click(function() {
                var s = !0;
                t.videoSliderIndex += 1, t.videoSliderIndex > t.videoSliderTracks - 1 && (t.videoSliderIndex = t.videoSliderTracks - 1, s = !1), t.videoSliderIndex === t.videoSliderTracks - 1 ? m.fadeOut() : m.fadeIn(), 0 === t.videoSliderIndex ? f.fadeOut() : f.fadeIn(), !0 === s && (t.sliderWidth = e("#" + t.id).width(), e("#" + t.id + ".mejs-container.mep-slider").find(".mejs-playlist ul li").css({
                    transform: "translate3d(-" + Math.ceil(t.sliderWidth * t.videoSliderIndex) + "px, -20px, 0) scale3d(0.75, 0.75, 1)"
                }))
            }), i.find(".mejs-playlist > ul li").click(function() {
                e(this).hasClass("current") ? t.media.paused ? t.play() : t.pause() : (e(this).addClass("played"), t.playTrack(e(this)))
            }), l.addEventListener("ended", function() {
                t.playNextTrack()
            }, !1), l.addEventListener("playing", function() {
                t.container.removeClass("mep-paused").addClass("mep-playing"), t.isVideo && a.togglePlaylistDisplay(t, i, l, "hide")
            }, !1), l.addEventListener("play", function() {
                t.isVideo || i.find(".mejs-poster").show()
            }, !1), l.addEventListener("pause", function() {
                t.container.removeClass("mep-playing").addClass("mep-paused")
            }, !1)
        },
        playNextTrack: function() {
            var e, t = this,
                s = t.layers.find(".mejs-playlist > ul > li"),
                i = s.filter(".current"),
                l = s.not(".played");
            l.length < 1 && (i.removeClass("played").siblings().removeClass("played"), l = s.not(".current"));
            var a = !1;
            if (t.options.shuffle) {
                var n = Math.floor(Math.random() * l.length);
                e = l.eq(n)
            } else(e = i.next()).length < 1 && (t.options.loopplaylist || t.options.autoRewind) && (e = i.siblings().first(), a = !0);
            t.options.loop = !1, 1 == e.length && (e.addClass("played"), t.playTrack(e), t.options.loop = t.options.loopplaylist || t.options.continuous && !a)
        },
        playPrevTrack: function() {
            var e, t = this,
                s = t.layers.find(".mejs-playlist > ul > li"),
                i = s.filter(".current"),
                l = s.filter(".played").not(".current");
            if (l.length < 1 && (i.removeClass("played"), l = s.not(".current")), t.options.shuffle) {
                var a = Math.floor(Math.random() * l.length);
                e = l.eq(a)
            } else(e = i.prev()).length < 1 && t.options.loopplaylist && (e = i.siblings().last());
            1 == e.length && (i.removeClass("played"), t.playTrack(e))
        },
        changePoster: function(e) {
            var t = this;
            t.layers.find(".mejs-playlist").css("background-image", 'url("' + e + '")'), t.setPoster(e), t.layers.find(".mejs-poster").show()
        },
        playTrack: function(e) {
            var t = this;
            t.pause(), t.setSrc(e.data("url")), t.load(), t.changePoster(e.data("poster")), t.play(), e.addClass("current").siblings().removeClass("current")
        },
        playTrackURL: function(e) {
            var t = this,
                s = t.layers.find(".mejs-playlist > ul > li").filter('[data-url="' + e + '"]');
            t.playTrack(s)
        },
        togglePlaylistDisplay: function(t, s, i, l) {
            var a = this;
            t.options.playlist = l ? "show" === l : !t.options.playlist, e(i).trigger("mep-playlisttoggle", [t.options.playlist]), t.options.playlist ? (s.children(".mejs-playlist").fadeIn(), a.playlistToggle.removeClass("mejs-show-playlist").addClass("mejs-hide-playlist")) : (s.children(".mejs-playlist").fadeOut(), a.playlistToggle.removeClass("mejs-hide-playlist").addClass("mejs-show-playlist"))
        },
        oldSetPlayerSize: MediaElementPlayer.prototype.setPlayerSize,
        setPlayerSize: function(e, t) {
            var s = this.isVideo;
            this.isVideo = !0, this.oldSetPlayerSize(e, t), this.isVideo = s
        }
    })
}(mejs.$);
