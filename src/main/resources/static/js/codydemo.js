/*! handsome 2018-07-18 */

"use strict";

        window['LocalConst'] = {
            COMMENT_NAME_INFO: '必须填写昵称或姓名',
            COMMENT_EMAIL_INFO: '必须填写电子邮箱地址',
            COMMENT_EMAIL_LEGAL_INFO: '邮箱地址不合法',
            COMMENT_CONTENT_INFO: '必须填写评论内容',
            COMMENT_SUBMIT_ERROR: '提交失败，请重试！',
            COMMENT_CONTENT_LEGAL_INFO: '提交失败,您的输入内容不符合规则！',

            LOGIN_USERNAME_INFO: '必须填写用户名',
            LOGIN_PASSWORD_INFO: '请填写密码',
            LOGIN_SUBMIT_ERROR: '登录失败，请重新登录',
            LOGIN_SUBMIT_INFO: '用户名或者密码错误，请重试',
            LOGIN_SUBMIT_SUCCESS: '登录成功',
            CLICK_TO_REFRESH: '点击以刷新页面',
            LOGOUT_SUCCESS_REFRESH: '退出成功，正在刷新当前页面',

            LOGOUT_ERROR: '退出失败，请重试',
            LOGOUT_SUCCESS: '退出成功',

            SUBMIT_PASSWORD_INFO: '密码错误，请重试',
            COMMENT_TITLE: '评论通知',
            LOGIN_TITLE: '登录通知',
            ChANGYAN_APP_KEY: '',
            CHANGYAN_CONF: '',

            COMMENT_SYSTEM: '0',
            COMMENT_SYSTEM_ROOT: '0',
            COMMENT_SYSTEM_CHANGYAN: '1',
            COMMENT_SYSTEM_OTHERS: '2',
            EMOJI: '表情',
            IS_PJAX: '1',
            IS_PAJX_COMMENT: '1',
            BASE_SCRIPT_URL: 'https://www.moerats.com/usr/themes/handsome/',
            BLOG_URL: 'https://www.moerats.com',
            THEME_COLOR: '9',
            THEME_HEADER_FIX: '1',
            THEME_ASIDE_FIX: '1',
            THEME_ASIDE_FOLDED: '',
            THEME_ASIDE_DOCK: '',
            THEME_CONTAINER_BOX: '1',
            THEME_HIGHLIGHT_CODE: '1',
            THEME_TOC: '1',
            TOC_TITLE: '文章目录',
            HEADER_FIX: '固定头部',
            ASIDE_FIX: '固定导航',
            ASIDE_FOLDED: '折叠导航',
            ASIDE_DOCK: '置顶导航',
            CONTAINER_BOX: '盒子模型',
            OFF_SCROLL_HEIGHT: '50',
            COMMENT_REJECT_PLACEHOLDER: '居然什么也不说，哼',
            COMMENT_PLACEHOLDER: '说点什么吧……',
            SHOW_SETTING_BUTTON: '',
            THEME_VERSION: '4.4.120180702101',

            OPERATION_NOTICE: '操作通知',
            SCREENSHOT_BEGIN: '正在生成当前页面截图……',
            SCREENSHOT_NOTICE: '点击顶部下载按钮保存当前卡片',
            SCREENSHORT_ERROR: '由于图片跨域原因导致截图失败',
            SCREENSHORT_SUCCESS: '截图成功',
            MUSIC_NOTICE: '播放通知',
            MUSIC_FAILE: '当前音乐地址无效，自动为您播放下一首',
            MUSIC_FAILE_END: '当前音乐地址无效',
            MUSIC_LIST_SUCCESS: '歌单歌曲加载成功',
            CDN_NAME: ''
        };

    
function _classCallCheck(a, b) {
	if(!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
}
var _createClass = function() {
		function a(a, b) {
			for(var c = 0; c < b.length; c++) {
				var d = b[c];
				d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
			}
		}
		return function(b, c, d) {
			return c && a(b.prototype, c), d && a(b, d), b
		}
	}(),
	Util = {
		leftDistance: function(a) {
			for(var b = a.offsetLeft, c = void 0; a.offsetParent;) a = a.offsetParent, b += a.offsetLeft;
			return c = document.body.scrollLeft + document.documentElement.scrollLeft, b - c
		},
		timeFormat: function(a) {
			var b = parseInt(a / 60),
				c = parseInt(a % 60);
			return(b < 10 ? "0" + b : b) + ":" + (c < 10 ? "0" + c : c)
		},
		percentFormat: function(a) {
			return(100 * a).toFixed(2) + "%"
		},
		ajax: function(a) {
			a.beforeSend && a.beforeSend();
			var b = new XMLHttpRequest;
			b.onreadystatechange = function() {
				4 === b.readyState && (b.status >= 200 && b.status < 300 ? a.success && a.success(b.responseText) : a.fail && a.fail(b.status))
			}, b.open("GET", a.url), b.send(null)
		}
	},
	instance = !1,
	baseUrl = LocalConst.BASE_SCRIPT_URL + "libs/Get.php",
	skPlayer = function() {
		function a(b) {
			var c = this;
			if(_classCallCheck(this, a), instance) return console.error("SKPlayer只能存在一个实例！"), Object.create(null);
			instance = !0;
			var d = {
				element: document.getElementById("skPlayer"),
				autoplay: !1,
				mode: "listloop",
				listshow: !0
			};
			for(var e in d) b.hasOwnProperty(e) || (b[e] = d[e]);
			if(this.option = b, !(this.option.music && this.option.music.type && this.option.music.source)) return console.error("请正确配置对象！"), Object.create(null);
			this.root = this.option.element, this.type = this.option.music.type, this.music = this.option.music.source, this.media = this.option.music.media, this.isMobile = /mobile/i.test(window.navigator.userAgent), this.isReady = !1, this.toggle = this.toggle.bind(this), this.toggleList = this.toggleList.bind(this), this.toggleMute = this.toggleMute.bind(this), this.switchMode = this.switchMode.bind(this), "file" === this.type ? (this.root.innerHTML = this.template(), this.init(), this.bind(), this.isReady = !0) : "cloud" === this.type && (this.root.innerHTML = '<p class="skPlayer-tip-loading"><span></span> <span></span> <span></span> <span></span><span></span></p>', Util.ajax({
				url: "/getMusicList/collect/"+this.music,
				beforeSend: function() {},
				success: function(a) {
					c.music = JSON.parse(a), c.root.innerHTML = c.template(), c.init(), c.bind()
				},
				fail: function(a) {
					console.error("歌单拉取失败！ 错误码：" + a)
				}
			}))
		}
		return _createClass(a, [{
			key: "notice",
			value: function(a, b) {
				$.message({
					title: LocalConst.MUSIC_NOTICE,
					message: a,
					type: b
				})
			}
		}, {
			key: "template",
			value: function() {
				var a = '\n            <audio class="skPlayer-source" src="' + ("file" === this.type ? this.music[0].src : "") + '" preload="auto"></audio>\n            <div class="skPlayer-picture">\n                <img class="skPlayer-cover" src="' + this.music[0].cover + '" alt="">\n    \n            </div>\n            <div class="skPlayer-control">\n                <p class="skPlayer-name">' + this.music[0].name + '</p>\n                <div class="playController"><div onclick="player.prev();" class="lastMusic  music-off "><i class="glyphicon glyphicon-step-backward"></i></div> &nbsp;&nbsp;\n <div class="runMusic  music-off skPlayer-play-btn"><i class="glyphicon glyphicon-play runMusicIcon"></i></div>&nbsp;&nbsp; \n <div onclick="player.next();" class="nextMusic  music-off "><i class="glyphicon glyphicon-step-forward"></i></div></div>\n                <p class="skPlayer-author">' + this.music[0].author + '</p>\n                <div class="skPlayer-percent">\n                    <div class="skPlayer-line-loading"></div>\n                    <div class="skPlayer-line lter"></div>\n                </div>\n                <p class="skPlayer-time">\n                    <span class="skPlayer-cur">00:00</span>/<span class="skPlayer-total">00:00</span>\n                </p>\n                <div class="skPlayer-volume" style="' + (this.isMobile ? "display:none;" : "") + '">\n                    <i class="skPlayer-icon glyphicon glyphicon-volume-up"></i>\n                    <div class="skPlayer-percent">\n                        <div class="skPlayer-line"></div>\n                    </div>\n                </div>\n                <i class="' + ("singleloop" === this.option.mode ? "skPlayer-mode skPlayer-mode-loop" : "skPlayer-mode") + '"></i>\n            </div>\n            <ul class="skPlayer-list animated flipInX">\n        ';
				for(var b in this.music) a += '\n                <li data-index="' + b + '">\n                    <i class="skPlayer-list-sign"></i>\n                    <span class="skPlayer-list-index">' + (parseInt(b) + 1) + '</span>\n                    <span class="skPlayer-list-name" title="' + this.music[b].name + '">' + this.music[b].name + '</span>\n                    <span class="skPlayer-list-author" title="' + this.music[b].author + '">' + this.music[b].author + "</span>\n                </li>\n            ";
				return a += "\n            </ul>\n        "
			}
		}, {
			key: "init",
			value: function() {
				var a = this;
				this.dom = {
					cover: this.root.querySelector(".skPlayer-cover"),
					playbutton: this.root.querySelector(".skPlayer-play-btn"),
					runIcon: this.root.querySelector(".skPlayer-play-btn .runMusicIcon"),
					name: this.root.querySelector(".skPlayer-name"),
					author: this.root.querySelector(".skPlayer-author"),
					timeline_total: this.root.querySelector(".skPlayer-percent"),
					timeline_loaded: this.root.querySelector(".skPlayer-line-loading"),
					timeline_played: this.root.querySelector(".skPlayer-percent .skPlayer-line"),
					timetext_total: this.root.querySelector(".skPlayer-total"),
					timetext_played: this.root.querySelector(".skPlayer-cur"),
					volumebutton: this.root.querySelector(".skPlayer-icon"),
					volumeline_total: this.root.querySelector(".skPlayer-volume .skPlayer-percent"),
					volumeline_value: this.root.querySelector(".skPlayer-volume .skPlayer-line"),
					switchbutton: this.root.querySelector(".skPlayer-list-switch"),
					modebutton: this.root.querySelector(".skPlayer-mode"),
					musiclist: this.root.querySelector(".skPlayer-list"),
					musicitem: this.root.querySelectorAll(".skPlayer-list li")
				}, this.audio = this.root.querySelector(".skPlayer-source"), this.option.listshow && (this.root.className = "skPlayer-list-on"), "singleloop" === this.option.mode && (this.audio.loop = !0), this.dom.musicitem[0].className = "skPlayer-curMusic", "cloud" === this.type && Util.ajax({
					url: "/getMusicList/song/" + this.music[0].song_id,
					beforeSend: function() {},
					success: function(b) {
						var c = JSON.parse(b).url;
						if(null !== c) a.isReady = !0, a.audio.src = c;
						else {
							var d = parseInt(a.dom.musiclist.querySelector(".skPlayer-curMusic").getAttribute("data-index"));
							a.errorHandle(d)
						}
					},
					fail: function(a) {
						console.error("歌曲拉取失败！ 错误码：" + a)
					}
				})
			}
		}, {
			key: "bind",
			value: function() {
				var a = this;
				this.updateLine = function() {
					var b = a.audio.buffered.length ? a.audio.buffered.end(a.audio.buffered.length - 1) / a.audio.duration : 0;
					a.dom.timeline_loaded.style.width = Util.percentFormat(b)
				}, this.audio.addEventListener("durationchange", function(b) {
					a.dom.timetext_total.innerHTML = Util.timeFormat(a.audio.duration), a.updateLine()
				}), this.audio.addEventListener("progress", function(b) {
					a.updateLine()
				}), this.audio.addEventListener("canplay", function(b) {
					a.option.autoplay && !a.isMobile && a.play()
				}), this.audio.addEventListener("error", function(b) {
					if(a.isReady) {
						var c = parseInt(a.dom.musiclist.querySelector(".skPlayer-curMusic").getAttribute("data-index"));
						a.errorHandle(c)
					}
				}), this.audio.addEventListener("timeupdate", function(b) {
					var c = a.audio.currentTime / a.audio.duration;
					a.dom.timeline_played.style.width = Util.percentFormat(c), a.dom.timetext_played.innerHTML = Util.timeFormat(a.audio.currentTime)
				}), this.audio.addEventListener("seeked", function(b) {
					a.play()
				}), this.audio.addEventListener("ended", function(b) {
					a.next()
				}), this.dom.playbutton.addEventListener("click", this.toggle), this.isMobile || this.dom.volumebutton.addEventListener("click", this.toggleMute), this.dom.modebutton.addEventListener("click", this.switchMode), this.dom.musiclist.addEventListener("click", function(b) {
					var c = void 0,
						d = void 0,
						e = void 0;
					if("LI" === b.target.tagName.toUpperCase()) c = b.target;
					else {
						if("LI" !== b.target.parentElement.tagName.toUpperCase()) return;
						c = b.target.parentElement
					}
					d = parseInt(c.getAttribute("data-index")), e = parseInt(a.dom.musiclist.querySelector(".skPlayer-curMusic").getAttribute("data-index")), d === e ? a.play() : a.switchMusic(d + 1)
				}), this.dom.timeline_total.addEventListener("click", function(b) {
					var c = b || window.event,
						d = (c.clientX - Util.leftDistance(a.dom.timeline_total)) / a.dom.timeline_total.clientWidth;
					isNaN(a.audio.duration) || (a.dom.timeline_played.style.width = Util.percentFormat(d), a.dom.timetext_played.innerHTML = Util.timeFormat(d * a.audio.duration), a.audio.currentTime = d * a.audio.duration)
				}), this.isMobile || this.dom.volumeline_total.addEventListener("click", function(b) {
					var c = b || window.event,
						d = (c.clientX - Util.leftDistance(a.dom.volumeline_total)) / a.dom.volumeline_total.clientWidth;
					a.dom.volumeline_value.style.width = Util.percentFormat(d), a.audio.volume = d, a.audio.muted && a.toggleMute()
				})
			}
		}, {
			key: "prev",
			value: function() {
				var a = parseInt(this.dom.musiclist.querySelector(".skPlayer-curMusic").getAttribute("data-index"));
				0 === a ? 1 === this.music.length ? this.play() : this.switchMusic(this.music.length - 1 + 1) : this.switchMusic(a - 1 + 1)
			}
		}, {
			key: "next",
			value: function() {
				var a = parseInt(this.dom.musiclist.querySelector(".skPlayer-curMusic").getAttribute("data-index"));
				a === this.music.length - 1 ? 1 === this.music.length ? this.play() : this.switchMusic(1) : this.switchMusic(a + 1 + 1)
			}
		}, {
			key: "errorHandle",
			value: function(a) {
				this.dom.musicitem[a].classList.add("invalid-name"), $.message({
					title: LocalConst.MUSIC_NOTICE,
					message: LocalConst.MUSIC_FAILE_END,
					type: "error"
				})
			}
		}, {
			key: "sleep",
			value: function(a) {
				for(var b = Date.now(); Date.now - b <= a;);
			}
		}, {
			key: "switchMusic",
			value: function(a) {
				var b = this;
				return "number" != typeof a ? void console.error("请输入正确的歌曲序号！") : (a -= 1) < 0 || a >= this.music.length ? void console.error("请输入正确的歌曲序号！") : a == this.dom.musiclist.querySelector(".skPlayer-curMusic").getAttribute("data-index") ? void this.play() : (this.dom.musiclist.querySelector(".skPlayer-curMusic").classList.remove("skPlayer-curMusic"), this.dom.musicitem[a].classList.add("skPlayer-curMusic"), this.dom.name.innerHTML = this.music[a].name, this.dom.author.innerHTML = this.music[a].author, this.dom.cover.src = this.music[a].cover, void("file" === this.type ? void 0 !== this.music[a].src ? (this.audio.src = this.music[a].src, this.isReady = !0, this.play()) : this.errorHandle(a) : "cloud" === this.type && Util.ajax({
					url:  "getMusicList/song/" + this.music[a].song_id,
					beforeSend: function() {},
					success: function(a) {
						var c = JSON.parse(a).url;
						null !== c ? (b.audio.src = c, b.isReady = !0, b.play()) : 1 !== b.music.length && b.next()
					},
					fail: function(a) {
						console.error("歌曲拉取失败！ 错误码：" + a)
					}
				})))
			}
		}, {
			key: "play",
			value: function() {
				this.audio.paused && (this.audio.play(), this.dom.playbutton.classList.add("skPlayer-pause"), this.dom.cover.classList.add("skPlayer-pause"), this.dom.runIcon.className = "glyphicon glyphicon-pause runMusicIcon")
			}
		}, {
			key: "pause",
			value: function() {
				this.audio.paused || (this.audio.pause(), this.dom.playbutton.classList.remove("skPlayer-pause"), this.dom.cover.classList.remove("skPlayer-pause"), this.dom.runIcon.className = "glyphicon glyphicon-play runMusicIcon")
			}
		}, {
			key: "toggle",
			value: function() {
				this.audio.paused ? this.play() : this.pause()
			}
		}, {
			key: "toggleList",
			value: function() {
				this.root.classList.contains("skPlayer-list-on") ? this.root.classList.remove("skPlayer-list-on") : this.root.classList.add("skPlayer-list-on")
			}
		}, {
			key: "toggleMute",
			value: function() {
				this.audio.muted ? (this.audio.muted = !1, this.dom.volumebutton.className = "skPlayer-icon glyphicon glyphicon-volume-up", this.dom.volumeline_value.style.width = Util.percentFormat(this.audio.volume)) : (this.audio.muted = !0, this.dom.volumebutton.className = "skPlayer-icon glyphicon glyphicon-volume-off", this.dom.volumeline_value.style.width = "0%")
			}
		}, {
			key: "switchMode",
			value: function() {
				this.audio.loop ? (this.audio.loop = !1, this.dom.modebutton.classList.remove("skPlayer-mode-loop")) : (this.audio.loop = !0, this.dom.modebutton.classList.add("skPlayer-mode-loop"))
			}
		}, {
			key: "destroy",
			value: function() {
				instance = !1, this.audio.pause(), this.root.innerHTML = "";
				for(var a in this) delete this[a]
			}
		}]), a
	}();