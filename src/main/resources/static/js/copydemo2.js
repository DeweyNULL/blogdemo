/*! handsome 2018-07-18 */

$.fn.extend({
	animateCss: function(a, b) {
		var c = function(a) {
			var b = {
				animation: "animationend",
				OAnimation: "oAnimationEnd",
				MozAnimation: "mozAnimationEnd",
				WebkitAnimation: "webkitAnimationEnd"
			};
			for(var c in b)
				if(void 0 !== a.style[c]) return b[c]
		}(document.createElement("div"));
		return this.addClass("animated " + a).one(c, function() {
			$(this).removeClass("animated " + a), "function" == typeof b && b()
		}), this
	}
});
var cssSupport = function(a, b) {
		var c = document.createElement("div");
		return a in c.style && (c.style[a] = b, c.style[a] === b)
	},
	initTheme = function() {
		$("#search_input").bind("input porpertychange", function() {
			-1 != $("#search_input").val().indexOf("自杀") && $.message({
				message: "含有您正在搜索的字词或标签的信息，通常会鼓吹可能造成伤害甚至导致死亡的行为。如果您目前遭遇难关，我们非常乐意<a href='./'>伸出援手</a>。",
				title: "需要协助吗？",
				type: "warning",
				autoHide: !1,
				time: "30000"
			})
		}), $(document).on("click", "[ui-toggle-class]", function(a) {
			a.preventDefault();
			var b = $(a.target);
			b.attr("ui-toggle-class") || (b = b.closest("[ui-toggle-class]"));
			var c = b.attr("ui-toggle-class").split(","),
				d = b.attr("target") && b.attr("target").split(",") || Array(b),
				e = 0;
			$.each(c, function(a, b) {
				var f = d[d.length && e];
				$(f).toggleClass(c[a]), e++
			}), b.toggleClass("active clicked")
		}), $(document).on("click", "[data-toggle-class]", function(a) {
			a.preventDefault();
			var b = $(this),
				c = b.data("toggle-class"),
				d = {};
			$.each(c.split(","), function() {
				var a = $.trim(this);
				if(a) {
					var b = a.split("="),
						c = b[0],
						e = b[1];
					d[c] = e
				}
			}), $.each(d, function(a, b) {
				$(a).toggleClass(b)
			})
		});
		var a;
		$(document).on("click", "[ui-nav] a", function(b) {
			a && a.trigger("mouseleave.nav");
			var c = $(this);
			c.parent().siblings(".active").toggleClass("active"), c.next().is("ul") && c.parent().toggleClass("active") && b.preventDefault(), c.next().is("ul") || $(window).width() < 768 && $(".off-screen").removeClass("show off-screen")
		}), $(document).on("mouseenter", "[ui-nav] a", function(b) {
			if(a && a.trigger("mouseleave.nav"), $("> .nav", $(".app-aside")).remove(), $(".app-aside-fixed.app-aside-folded").length && !($(window).width() < 768)) {
				var c, d = $(b.target),
					e = $(window).height();
				!d.is("a") && (d = d.closest("a")), d.next().is("ul") && (a = d.next(), d.parent().addClass("active"), c = d.parent().position().top + 50, a.css("top", c), c + a.height() > e && a.css("bottom", 0), c + 150 > e && a.css("bottom", e - c - 50).css("top", "auto"), a.appendTo(".app-aside"), a.on("mouseleave.nav", function(b) {
					a.appendTo(d.parent()), a.off("mouseleave.nav").css("top", "auto").css("bottom", "auto"), d.parent().removeClass("active")
				}), $(".smart").length && $('<div class="dropdown-backdrop"/>').insertAfter(".app-aside").on("click", function(a) {
					a && a.trigger("mouseleave.nav")
				}))
			}
		}), $(document).on("mouseleave", ".app-aside", function(b) {
			a && a.trigger("mouseleave.nav"), $("> .nav", $(".app-aside")).remove()
		}), (!!navigator.userAgent.match(/MSIE/i) || !!navigator.userAgent.match(/Trident.*rv:11\./)) && $("html").addClass("ie")
	}; + function(a) {
	"use strict";
	a(function() {
		initTheme(), b(), l(), q(), a(".skPlayer-list-switch").bind("click", function() {
			player.toggleList()
		}), a("#searchform").submit(function() {
			a.pjax.submit(event, "#content", {
				fragment: "#content",
				timeout: 6e3
			})
		})
	});
	var b = function() {
			d(), a(".off-screen-toggle").click(function() {
				a("#aside").toggleClass("off-screen")
			}), a('[data-toggle="tooltip"]').tooltip(), LocalConst.COMMENT_SYSTEM == LocalConst.COMMENT_SYSTEM_ROOT ? (m(), a(function() {
				a("#comment").blur(function() {
					a(this).attr("placeholder", LocalConst.COMMENT_REJECT_PLACEHOLDER)
				}), a("#comment").focus(function() {
					a(this).attr("placeholder", LocalConst.COMMENT_PLACEHOLDER)
				})
			})) : LocalConst.COMMENT_SYSTEM == LocalConst.COMMENT_SYSTEM_CHANGYAN && n(), LocalConst.IS_PAJX_COMMENT ? p() : r(), o(), "function" == typeof registCommentEvent && registCommentEvent(), LocalConst.THEME_HEADER_FIX && t(), LocalConst.THEME_TOC && j(), g(), h(), k(), e(), i(), a("#post-content table").wrap("<div class='table-responsive'></div>"), LocalConst.THEME_HIGHLIGHT_CODE && s(), c()
		},
		c = function() {
			a("#generateShareImg").click(function() {
				a.message({
					title: LocalConst.OPERATION_NOTICE,
					message: LocalConst.SCREENSHOT_BEGIN,
					type: "info",
					autoClose: !1
				}), html2canvas(document.getElementById("mdx-share-img"), {
					allowTaint: !0,
					useCORS: !0,
					scale: 3,
					onrendered: function(b) {
						try {
							var c = new Image;
							c.setAttribute("crossOrigin", "Anonymous");
							var d = b.toDataURL("image/png");
							c.src = d, a.message({
								title: LocalConst.OPERATION_NOTICE,
								message: LocalConst.SCREENSHORT_SUCCESS,
								type: "success"
							}), a.fancybox.open([{
								src: d,
								opts: {
									caption: LocalConst.SCREENSHOT_NOTICE,
									thumb: d
								}
							}], {
								loop: !1
							})
						} catch(b) {
							a.message({
								title: LocalConst.OPERATION_NOTICE,
								message: LocalConst.SCREENSHORT_ERROR,
								type: "error"
							}), console.log("截图失败")
						}
					}
				})
			})
		},
		d = function() {
			a('input[name = "mail"]').blur(function() {
				var b = a(this).val();
				return "" != b && a.ajax({
					type: "GET",
					data: {
						action: "ajax_avatar_get",
						form: LocalConst.BLOG_URL,
						email: b
					},
					success: function(b) {
						a(".author-avatar").attr("src", b)
					}
				}), !1
			})
		},
		e = function() {
			var b = document.getElementById("comment");
			a("#imageInsertOk").bind("click", function() {
				var c = a("input[ name='imageInsertModal']").val();
				c = '<img src="' + c + '">', f(b, c, "#imageInsertModal")
			}), a("#videoInsertOk").bind("click", function() {
				var c = a("input[ name='videoInsertModal']").val();
				c = '<video src="' + c + '"></video>', f(b, c, "#videoInsertModal")
			}), a("#musicInsertOk").bind("click", function() {
				var c = a("input[ name='musicInsertModal']").val();
				a.ajax({
					type: "POST",
					url: LocalConst.BASE_SCRIPT_URL + "libs/Get.php",
					data: {
						data: c,
						size: "small"
					},
					async: !1,
					success: function(a) {
						c = a, f(b, c, "#musicInsertModal")
					}
				})
			})
		},
		f = function(b, c, d) {
			if(a(d).modal("hide"), document.selection) {
				b.focus();
				document.selection.createRange().text = c, b.focus()
			} else if(b.selectionStart || "0" == b.selectionStart) {
				var e = b.selectionStart,
					f = b.selectionEnd,
					g = e;
				b.value = b.value.substring(0, e) + c + b.value.substring(f, b.value.length), g += c.length, b.selectionStart = g, b.selectionEnd = g, b.focus()
			} else b.value += c, b.focus()
		},
		g = function() {
			a("#post-content video, #comments video").each(function() {
				a(this).hasClass("dplayer-video") || (void 0 !== a(this).attr("controls") && a(this).removeAttr("controls"), void 0 === a(this).attr("preload") && a(this).attr("preload", "preload"), a(this).wrap('<div class="kyt-player"></div>'), a(this).parent().append('<div class="play-button"></div>').css("height", .6 * a(this).width()), a(this).bind("click", function() {
					a(this).next(".play-button").is(":hidden") && (a(this).next(".play-button").css("display", "block"), a(this).removeAttr("controls"), a(this).get(0).pause())
				}))
			}), a(window).resize(function() {
				a(".kyt-player").each(function() {
					a(this).css("height", .6 * a(this).width())
				})
			}), a("#post-content,#comments").delegate(".play-button", "click", function(b) {
				a(this).is(":visible") ? (a(this).css("display", "none"), a(this).parent().children("video").attr("controls", "controls"), a(this).parent().children("video")[0].play()) : (a(this).css("display", "block"), a(this).parent().children("video").attr("controls", "controls"), a(this).parent().children("video")[0].play())
			})
		},
		h = function() {
			a(".weixinAudio").each(function() {
				var b = a(this),
					c = b.children("audio"),
					d = b.find(".audio_title"),
					e = b.find(".audio_source"),
					f = b.children("input[ name='url']").attr("value");
				"" !== f ? a.ajax({
					type: "GET",
					url: f,
					error: function(a) {},
					success: function(b) {
						var f = a.parseJSON(b);
						c.children("source").attr("src", f.url), c.load(), d.text(f.name), e.text(f.author)
					}
				}) : (console.log(b.children("input[ name='mp3']").attr("value")), c.attr("src", b.children("input[ name='mp3']").attr("value")), c.init(), d.text(b.children("input[ name='title']").attr("value")), e.text(b.children("input[ name='tips']").attr("value")))
			});
			var b = a(".weixinAudio").weixinAudio();
			a(".weixinAudio").on("click", function(c) {
				var d = a(this),
					e = d.index(".weixinAudio");
				a.each(b, function(a, b) {
					a != "weixinAudio" + e && b.pause()
				})
			})
		},
		i = function() {
			a.fancybox.defaults.buttons = ["zoom", "download", "thumbs", "close"], a("#post-content img, #comments img").each(function() {
				var b = a(this);
				if(void 0 !== b.attr("alt")) var c = b.attr("alt");
				else var c = "";
				var d = b.parent("a"),
					e = typeof b.attr("noGallery");
				if(void 0 !== b.attr("max") && b.wrap('<div class="max-img"></div>'), "undefined" === e) {
					if(d.size() < 1) {
						var f;
						f = void 0 === this.getAttribute("data-original") || "" === this.getAttribute("data-original") || null === this.getAttribute("data-original") ? this.getAttribute("src") : this.getAttribute("data-original"), f = f.replace(/(.*?)!\/.*/, "$1"), d = b.wrap('<a data-fancybox="gallery" no-pjax data-type="image" data-caption="' + c + '" href="' + f + '"></a>').parent("a")
					}
					d.addClass("light-link")
				}
			})
		},
		j = function() {
			a("#toc").tocify({
				context: "#postpage",
				selectors: "h2,h3,h4",
				extendPage: !1,
				hideEffect: "slidUp",
				scrollTo: LocalConst.OFF_SCROLL_HEIGHT,
				showAndHide: !0
			}).find("li").length || a("#tag_toc").hide();
			var b = a("#tag_toc");
			if(b.length > 0) {
				var c = Number(b.offset().top) - Number(LocalConst.OFF_SCROLL_HEIGHT);
				b.css("top", Number(LocalConst.OFF_SCROLL_HEIGHT)), a(window).scroll(function() {
					a(window).scrollTop() > c ? a("#tag_toc").addClass("fixed") : a("#tag_toc").removeClass("fixed")
				})
			}
		},
		k = function() {
			a(".show_hide_div").bind("click", function() {
				a("#author_info").toggleClass("hide")
			})
		},
		l = function() {
			var b = a("#goToTop");
			a(b).click(function() {
				a("body,html").animate({
					scrollTop: 0
				}, 600)
			}), a(window).scroll(function() {
				a(window).scrollTop() > 200 ? b.removeClass("hide") : b.addClass("hide")
			})
		},
		m = function() {
			var a = document.getElementsByClassName("OwO")[0],
				b = document.getElementsByClassName("OwO-textarea")[0];
			if(void 0 != a && void 0 != b) {
				new OwO({
					logo: LocalConst.EMOJI,
					container: a,
					target: b,
					api: LocalConst.BASE_SCRIPT_URL + "usr/OwO.json?v=" + LocalConst.THEME_VERSION,
					position: "down",
					width: "100%",
					maxHeight: "220px"
				})
			}
		},
		n = function() {
			window.changyan = void 0, window.cyan = void 0, 1 == a("#SOHUCS").length && (a("#spin_comment_changyan").addClass("show inline"), a.getScript("https://changyan.sohu.com/upload/changyan.js", function() {
				window.changyan.api.config({
					appid: LocalConst.ChANGYAN_APP_KEY,
					conf: LocalConst.CHANGYAN_CONF
				}), a("#spin_comment_changyan").removeClass("show inline")
			}))
		},
		o = function() {
			a("#secret_comment_checkbox").change(function() {
				a(this).is(":checked") ? (a("#comment").addClass("secret_comment_textarea"), a(this).attr("placeholder", "")) : a("#comment").removeClass("secret_comment_textarea")
			})
		},
		p = function() {
			function b() {
				a(f + " a").click(function() {
					j = a(this).parent().parent().parent().parent().attr("id"), a(g).focus()
				}), a("#cancel-comment-reply-link").click(function() {
					j = ""
				})
			}

			function c(b) {
				a(h).attr("disabled", !1).fadeTo("", 1)
			}
			var d = a(window.opera ? "CSS1Compat" == document.compatMode ? "html" : "body" : "html,body"),
				e = "#comments .comments-title",
				f = ".comment-reply",
				g = "#comment",
				h = "#submit",
				i = "",
				j = "";
			b(), a("#comment_form").submit(function() {
				if(a(h).attr("disabled", !0).fadeTo("slow", .5), a("#comment_form").find("#author")[0]) {
					if("" == a("#comment_form").find("#author").val()) return a.message({
						title: LocalConst.COMMENT_TITLE,
						message: LocalConst.COMMENT_NAME_INFO,
						type: "warning"
					}), c("#error"), !1;
					if("" == a("#comment_form").find("#mail").val()) return a.message({
						title: LocalConst.COMMENT_TITLE,
						message: LocalConst.COMMENT_EMAIL_INFO,
						type: "warning"
					}), c("#error"), !1;
					if(!/^[^@\s<&>]+@([a-z0-9]+\.)+[a-z]{2,4}$/i.test(a("#comment_form").find("#mail").val())) return a.message({
						title: LocalConst.COMMENT_TITLE,
						message: LocalConst.COMMENT_EMAIL_LEGAL_INFO,
						type: "warning"
					}), c("#error"), !1
				}
				var k = a("#comment_form").find(g).val().replace(/(^\s*)|(\s*$)/g, "");
				if(null == k || "" === k) return a.message({
					title: LocalConst.COMMENT_TITLE,
					message: LocalConst.COMMENT_CONTENT_INFO,
					type: "warning"
				}), c("#error"), !1;
				var l = a(this).serializeArray();
				return a("#secret_comment_checkbox").is(":checked") && (l[0].value = "[secret]" + l[0].value + "[/secret]"), a(h).addClass("active"), a("#spin").addClass("show inline"), console.log(a(this).serializeArray()), a.ajax({
					url: a(this).attr("action"),
					type: a(this).attr("method"),
					data: l,
					error: function() {
						return a.message({
							title: LocalConst.COMMENT_TITLE,
							message: "评论失败，检查网络问题",
							type: "warning"
						}), a(h).removeClass("active"), a("#spin").removeClass("show inline"), c("#error"), !1
					},
					success: function(k) {
						a(h).removeClass("active"), a("#spin").removeClass("show inline");
						try {
							if(!a(".comment-list", k).length) return a.message({
								title: LocalConst.COMMENT_TITLE,
								message: LocalConst.COMMENT_CONTENT_LEGAL_INFO,
								type: "error"
							}), a(h).removeClass("active"), a("#spin").removeClass("show inline"), c("#error"), !1;
							i = a(".comment-list", k).html().match(/id=\"?comment-\d+/g).join().match(/\d+/g).sort(function(a, b) {
								return a - b
							}).pop(), a(".page-navigator .prev").length && "" == j && (i = ""), c("#success"), j ? (k = a("#comment-" + i, k).hide(), a("#" + j).find(".comment-children").length <= 0 && a("#" + j).append("<div class='comment-children list-unstyled m-l-xxl'><ol class='comment-list'></ol></div>"), i && a("#" + j + " .comment-children .comment-list").prepend(k), j = "") : (k = a("#comment-" + i, k).hide(), a(".comment-list").length || a("#comments").prepend('<h4 class="comments-title m-t-lg m-b special"> 0 条评论</h4><ol class="comment-list"></ol>'), a(".comment-list").prepend(k)), a("#comment-" + i).fadeIn();
							var l;
							a(e).length && (l = parseInt(a(e).text().match(/\d+/)), a(e).html(a(e).html().replace(l, l + 1))), TypechoComment.cancelReply(), a(g).val(""), a(f + " a, #cancel-comment-reply-link").unbind("click"), b(), a(h).attr("disabled", !1).fadeTo("slow", 1), i ? d.animate({
								scrollTop: a("#comment-" + i).offset().top - LocalConst.OFF_SCROLL_HEIGHT
							}, 500) : d.animate({
								scrollTop: a("#comments").offset().top - LocalConst.OFF_SCROLL_HEIGHT
							}, 500)
						} catch(a) {
							window.location.reload()
						}
					}
				}), !1
			})
		},
		q = function() {
			function b() {
				a("#login-submit").attr("disabled", !1).fadeTo("", 1)
			}
			a("form.protected").submit(function() {
				return a.ajax({
					url: a(this).attr("action"),
					type: a(this).attr("method"),
					data: a(this).serializeArray(),
					error: function() {
						return a.message({
							title: "提交通知",
							message: "提交失败，检查网络问题",
							type: "warning"
						}), !1
					},
					success: function(b) {
						try {
							if(a("#post-content", b).length <= 0) return a.message({
								title: "提交通知",
								message: LocalConst.SUBMIT_PASSWORD_INFO,
								type: "warning"
							}), !1;
							var c = a("#post-content", b).html(),
								d = a("#comments", b).html(),
								e = a("#small_widgets h1", b).html();
							a("#post-content").html(c), a("#comments").html(d), a("#small_widgets h1").html(e)
						} catch(a) {
							window.location.reload()
						}
					}
				}), !1
			}), a("#Login_form").submit(function() {
				if(a(this).hasClass("banLogin")) return location.reload(), !1;
				a("#login-submit").attr("disabled", !0).fadeTo("slow", .5);
				var c = a("#navbar-login-user").val(),
					d = a("#navbar-login-password").val();
				return "" == c ? (a.message({
					title: LocalConst.LOGIN_TITLE,
					message: LocalConst.LOGIN_USERNAME_INFO,
					type: "warning"
				}), a("#navbar-login-user").focus(), b(), !1) : "" == d ? (a.message({
					title: LocalConst.LOGIN_TITLE,
					message: LocalConst.LOGIN_PASSWORD_INFO,
					type: "warning"
				}), a("#navbar-login-password").focus(), b(), !1) : (a("#login-submit").addClass("active"), a("#spin-login").addClass("show inline"), a.ajax({
					url: a(this).attr("action"),
					type: a(this).attr("method"),
					data: a(this).serializeArray(),
					error: function() {
						return a.message({
							title: LocalConst.LOGIN_TITLE,
							message: LocalConst.LOGIN_SUBMIT_ERROR,
							type: "error"
						}), b(), !1
					},
					success: function(c) {
						c = a.parseHTML(c), a("#login-submit").removeClass("active"), a("#spin-login").removeClass("show inline");
						try {
							if(a("#Logged-in", c).length <= 0) return a.message({
								title: LocalConst.LOGIN_TITLE,
								message: LocalConst.LOGIN_SUBMIT_INFO,
								type: "error"
							}), b(), !1;
							c = a("#easyLogin", c).html(), a("#easyLogin").html(c), a.message({
								title: LocalConst.LOGIN_TITLE,
								message: LocalConst.LOGIN_SUBMIT_SUCCESS + '&nbsp;<a onclick="location.reload();">' + LocalConst.CLICK_TO_REFRESH + "</a>",
								type: "success"
							})
						} catch(a) {
							alert("按下F12，查看输出错误信息"), console.log("error!\n" + a)
						}
					}
				}), !1)
			})
		},
		r = function() {
			a("#submit").bind("click", function() {
				var b = a("#author").val(),
					c = a("#mail").val();
				return "" === a("#comment").val() ? (a.message({
					title: LocalConst.COMMENT_TITLE,
					message: LocalConst.COMMENT_CONTENT_INFO,
					type: "warning"
				}), a("#comment").focus(), !1) : "" === b ? (a.message({
					title: LocalConst.COMMENT_TITLE,
					message: LocalConst.COMMENT_NAME_INFO,
					type: "warning"
				}), a("#author").focus(), !1) : "" === c ? (a.message({
					title: LocalConst.COMMENT_TITLE,
					message: LocalConst.COMMENT_EMAIL_INFO,
					type: "warning"
				}), a("#mail").focus(), !1) : (a(this).addClass("active"), a("#spin").addClass("show inline"), void a("#comment_form").submit())
			})
		},
		s = function() {
			a("pre code").each(function(a, b) {
				hljs.highlightBlock(b)
			})
		},
		t = function() {
			a("#comments,#small_widgets").delegate("a[href^=\\#][href!=\\#]", "click", function() {
				var b = document.getElementById(this.hash.slice(1));
				if(b) {
					var c = a(b).offset().top - LocalConst.OFF_SCROLL_HEIGHT;
					return a("html,body").animate({
						scrollTop: c
					}, 300), !1
				}
			});
			var b = decodeURIComponent(window.location.hash);
			window.location.hash.indexOf("#") >= 0 && a(b).length && setTimeout(function() {
				a("html,body").animate({
					scrollTop: a(b).offset().top - LocalConst.OFF_SCROLL_HEIGHT + "px"
				}, 400)
			}, 700)
		};
	window.Page = {
		reInitAPlayer: function() {
			if("undefined" != typeof APlayerOptions && "undefined" != typeof APlayers)
				for(var a = APlayerOptions.length, b = 0; b < a; b++) APlayers[b] = new APlayer({
					element: document.getElementById("player" + APlayerOptions[b].id),
					narrow: !1,
					preload: APlayerOptions[b].preload,
					mutex: APlayerOptions[b].mutex,
					autoplay: APlayerOptions[b].autoplay,
					showlrc: APlayerOptions[b].showlrc,
					music: APlayerOptions[b].music,
					theme: APlayerOptions[b].theme
				}), APlayers[b].init()
		},
		doPJAXClickAction: function() {},
		doPJAXCompleteAction: function() {
			a("#Login_form").hasClass("banLogin") || (a("#Login_form").addClass("banLogin"), a("#navbar-login-user").attr("disabled", "disabled"), a("#navbar-login-password").attr("disabled", "disabled")), b()
		}
	}
}(jQuery), console.log("\n %c handsome v4.4 Pro %c by友人C | www.ihewro.com", "color:#444;background:#eee;padding:5px 0;", "color:#eee;background:#444;padding:5px 0;");