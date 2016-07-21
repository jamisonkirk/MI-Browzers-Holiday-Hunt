/*
 * 
 */
mi.Browzers_Holiday_Hunt = function (_config) {
	mi.App.apply(this, arguments);
	
	//Properties
	this._isInitialized = false;
	
	//Methods
	this._init = function () {

		if (mi.control && mi.control.bhh != undefined) {
			this.setConf("enabled", mi.control.bhh);
		} else {
			this.setConf("enabled",0);
			console.warn("Browzers Holiday Hunt is disabled because mi.control.bhh is not defined.");
			return false;
		}

		if ( this.getConf("enabled") != 0 ) {
			// explicit test for fully_init to not be false, otherwise true by default.
			if ( this.getConf("fully_init") != false ) {
				this._addParenttoChildConfs(this.getConf("child_confs"));

				if ( (mi.pageInfo.type == "story-detail" || mi.pageInfo.type == "section-front") &&
						(this.huntCookie = new mi.Cookie(document, "mi_hunt", this._expMidnight(), "/", this.getConf("cookie_domain"))) &&
						this._cookieInit() &&
						(this.gift = new this.Gift(this.getConf("gift"))) &&
						(this.huntBoard = new this.HuntBoard(this.getConf("huntBoard")))
				){
					this._loadStyles();
					return true;
				}
				else {
					return false;
				}
			}
			else {
				if (( this.huntCookie = new mi.Cookie(document, "mi_hunt", this._expMidnight(), "/")) &&
						this._cookieInit()
				){
					return true;
				}
				else {
					return false;
				}
			}
		}
		else {return false}
	};

	/* Give child objects access to parent (hunt app) members.
	 * 
	 */
	this._addParenttoChildConfs = function (child_confs) {

		/* Grab the gift object from hunt app config.
		 * add the hunt app object as a property.
		 * setConf "gift" with included new property
		 */ 
		for (var x in child_confs) {
			child_confs[x].hunt = this;
			this.setConf(x, child_confs[x]);
		}
	};

	this._loadStyles = function () {
		var css = document.createElement("link");
		var first_script = jQuery("script").get(0);
		
		css.rel = "stylesheet";
		css.href = this.getConf("css_url");
		jQuery( first_script ).before(css);
		
		return css;
	};
	
	this._isPageExempt  = function (cur_href) {
		var exempt_pages = this.getConf("exempt_urls");
		var exempt = false;
		for (var x = 0; x < exempt_pages.length; x++) {
			if ( exempt_pages[x] == cur_href ) {
				exempt = true;
			}
		}
		return exempt;
	};
	
	this._randomPage = function () {
		var freq = this.getConf("page_frequency");
		var random = Math.random();
		if (freq == undefined) {
			freq = 1/1;
		}
		if (random < freq) {
			return true;
		}
		else {return false}
	};
	
	this._getNumGiftsFound = function () {
		return this.huntCookie.gifts;
	};
	
	this._setNumGiftsFound = function ( found ) {
		this.huntCookie.gifts = found;
		this.huntCookie.store();
	};
	
	this._addFoundGift = function () {
		this.huntCookie.gifts++;
		this.huntCookie.store();
	};
	
	this._emptyBag = function() {
		this.huntCookie.gifts = 0;
		this.huntCookie.store();
	};
	
	this._getOptInStatus = function () {
		return this.huntCookie.optIn;
	};
	
	this._setOptInStatus = function (option) {
		if (option == 0 || option == 1) {
			this.huntCookie.optIn = option;
			this.huntCookie.store();
		}
	};

	this._expMidnight = function () {
		var midnight = new Date();
		midnight.setHours(24, 0, 0, 0);
		
		var now = new Date();
		now = now.getTime();
		exp_in_minutes = (midnight - now) / 60000;
		
		return exp_in_minutes;
	}

	this._getElemPosition = function (selector) {
		var elem = {};

		elem.top = Math.floor(jQuery(selector).offset().top);
		elem.left = Math.floor(jQuery(selector).offset().left);

		return elem;
	}

	this._cookieInit = function () {
		this.huntCookie.load();
		this._setOptInStatus((this._getOptInStatus() != undefined ) ? this._getOptInStatus() : 1);
		if (this.huntCookie.gifts == undefined) {
			this.huntCookie.gifts = 0;
		}
		else if (this.huntCookie.gifts >= 5) {
			this.huntCookie.gifts = 5;
		}
		
		this.huntCookie.store();
		return true;
	}

	this._isInitialized = this._init();

};

/* Gift Object
 * 
 */
mi.Browzers_Holiday_Hunt.prototype.Gift = function (_config) {
	mi.App.apply(this, arguments);
	var self = this;
	//create object link to app methods.
	this.hunt = this.getConf("hunt");
	
	//Properties
	this.giftImgHTMLobj = {};
	
	//Methods

	this._init = function () {
		this.cache.gift_config = this.getConf("gift_image");
		
		if ( !this.hunt._isPageExempt(window.location.origin + window.location.pathname) &&
				this.hunt._randomPage() &&
				this.hunt._getNumGiftsFound() != 5 )
		{
			
			this.giftImgHTMLobj = this._createGiftImage();
			
			if (this.hunt._getNumGiftsFound() < 5 &&
					this.hunt.huntCookie.optIn == 1) {
				this._displayGiftImage();
			} else {
				return false;
			}	
			
		} else {
			return false;
		}
		

		return true;
	}
	
	this._createGiftImage = function () {
		this._randomSelectGiftLocation();
		this.cache.gi_config = this.getConf("gift_image");
		var gi = document.createElement("img");
		gi.id = "hunt-gift-img";
		gi.src = this._getNextGiftImage();
		gi.style.display = "none";
		jQuery(gi).bind("click", function (event) {
			event.stopPropagation();
			self.hunt._addFoundGift();
			self.hunt.huntBoard._boardAnimateOpen();
			self._transportGift();
			
			});
		
		if ( this.cache.gift_location !=  "") {
			jQuery(gi).insertBefore(this.cache.gift_location);
		}
		else {
			console.warn("Browzers Holiday Hunt could not use the configured image url.");
		}
		return gi;
	};

	this._displayGiftImage = function() {
		setTimeout(function() {
			jQuery(self.giftImgHTMLobj).fadeIn(500);
		}, 1000);
	};

	this._hideGiftImage = function() {
		jQuery(self.giftImgHTMLobj).fadeOut(500);
		return this;
	};

	this._getNextGiftImage = function () {
		var gi_config = this.getConf("gift_image");

		var base_url = gi_config.url_path;

		//We want the next gift so we add 1 on the gifts found.
		var num = parseInt(this.hunt._getNumGiftsFound()) + 1;
		var image = base_url + 'bhh' + num + "." + gi_config.file_type;
		return image;
	};

	this._randomSelectGiftLocation = function () {
		var gift_loc_selector = this.getConf("gift_loc_selector");
		this.cache.gift_location = "";
		
		for (var x = 0; this.cache.gift_location == "" && x < 500; x++ ) {
			var selector = gift_loc_selector[Math.floor(Math.random() * (gift_loc_selector.length))];
			
			if ( jQuery(selector).get(0) != undefined ) {
				this.cache.gift_location = selector;
			}
		}
	};

	this._transportGift = function () {
		var board = jQuery(this.hunt.huntBoard.browzerDivHTMLobj);
		
		var origin = this.hunt._getElemPosition("#hunt-gift-img");
		var waypoint = this.hunt._getElemPosition(".imageBrowzer img");
		
		
		var y = waypoint.top - origin.top;
		var x = waypoint.left - origin.left;
		
		// We need to make adjustments for the waypoint as it moves around
		// and is likely bigger than the gift image.
		if ( this.hunt.huntBoard.boardState.open == 0) {
			//numberfy openStateAdustment 
			var openStateAdjustment = Math.round(this.hunt.huntBoard.cache.tab.distance.match(/(.*)px/)[1]);
			
			//Let waypoint.left's sign determine openStateAdustments sign
			openStateAdjustment = openStateAdjustment * (waypoint.left < 0 ? -1 : 1);
			
			//add it's pos or neg value to waypoint.left + centering the gift on the bag.
			waypoint.left = waypoint.left + openStateAdjustment + 26;
			
		}
		else {
			//just center the gift on the bag.
			waypoint.left = waypoint.left + 26;
		}
		
		var arctan_deg = Math.atan2(y, x) * (180/Math.PI);
		
		var angle = "";
		if (arctan_deg < 0) {
			angle = Math.abs(arctan_deg) + 90;
		}

		else {
			angle = (90 - arctan_deg);
		}
		
		var bezier_params = {
							start: {
								x: origin.left, 
								y: origin.top, 
								angle: 0,
								length: 0.33
							},
							end: {
								x:waypoint.left,
								y:waypoint.top, 
								angle: angle,
								length: 0.33
							}
						};
		
		this.giftImgHTMLobj.style.position = "absolute";
		this.giftImgHTMLobj.style.top = origin.top + "px";
		this.hunt.gift.giftImgHTMLobj.style.left = origin.left + "px";
		
		jQuery("body").append(this.giftImgHTMLobj);
		
		if ( this.getConf("use_path_plugin") == 1 && jQuery.path ) {
			jQuery(this.giftImgHTMLobj).animate(
				{path : new $.path.bezier(bezier_params)}
				, 2000, function () {
					self._hideGiftImage();
					self.hunt.huntBoard._syncBoardInfo();
					setTimeout( function () {self.hunt.huntBoard._boardAnimateClose();}, 2500);
				});
		} else {
			jQuery(this.giftImgHTMLobj).animate(
				{
					left: (waypoint.left - origin.left).toString().replace("-","-=").replace(/^([0-9])/,"+=$1") + "px",
					top: (waypoint.top - origin.top).toString().replace("-","-=").replace(/^([0-9])/,"+=$1") + "px"
				}
				, 2000, function () {
					self._hideGiftImage();
					self.hunt.huntBoard._syncBoardInfo();
					setTimeout( function () {self.hunt.huntBoard._boardAnimateClose();}, 2500);
				}
			);
		}
	};

	this._init();
};

/* HuntBoard Object
 * 
 */
mi.Browzers_Holiday_Hunt.prototype.HuntBoard = function (_config) {
	mi.App.apply(this, arguments);
	var self = this;
	//create object link to app methods.
	this.hunt = this.getConf("hunt");
	
	
	this._init = function () {
		this.cache.huntBoard_config = this.getConf("gift_image");
		this._cacheTabMovementParam();
		this.browzerDivHTMLobj = this._createBoard();
		this._populateBoard();
		this._displayBoard();
	};
	
	//Properties
	this.browzerDivHTMLobj = {};
	
	this.boardState = {};
	
	//Methods
	this._createBoard = function () {
		var placement = this.getConf("board_loc_selector");
		this.cache.html = '<div id="browzer_promo" style="display:none;">' +
						'<div class="sponsor"></div>' +
						'<div class="message"></div>' +
						'<div class="imageBrowzer">' +
							'<img src="">' +
						'</div>' +
						'<ul class="horizontal_list">' +
							'<li><a class="info-link" href="">Info</a></li>' +
							'<li>|</li>' +
							'<li class="browzer_option" style="cursor:pointer"></li>' +
						'</ul>' +
					'</div>';
		
		/* If config huntBoard:selector[0] = "before" or "after" then use that value.
		 * Otherwise, default "after".
		 */
		var position = (placement[0] === "before" || placement[0] === "after" || placement[0] === "append") ? placement[0] : "append" ;

		// Place the board html into the DOM either before or after the selector or append into the selector.
		jQuery(placement[1])[position](this.cache.html);
		
		// Assign the element object to HuntBoard.browzerDivHTMLobj property
		return jQuery("#browzer_promo").get(0);
	};
	
	this._populateBoard = function () {
		var board = jQuery(this.browzerDivHTMLobj);
		// Verify that the board is on the page/in the DOM
		if ( board.get(0).nodeType != undefined) {
			jQuery(this.browzerDivHTMLobj).css( this.getConf("board_position_css") );
			board.children(".sponsor").html(this.getConf("sponsor"));
			this._syncBoardInfo();
			this._setUpOptInStatusField();
			board.children().find(".info-link").get(0).href = this.getConf("info_link");
		}
		else {
			
		}
	};
	
	this._setUpOptInStatusField = function () {
		var browzer_option = jQuery(this.browzerDivHTMLobj).find(".browzer_option");
		// Veriy the gift is on the page/in the DOM
		if ( this.hunt.gift.giftImgHTMLobj.nodeType != undefined ) {
			if ( this.hunt._getOptInStatus() == 0  ) {
				browzer_option.text("Show Gift");
				browzer_option.bind("click.optIn", function (event) {
					event.stopPropagation();
					self._optInToggle();
				});
			}
			else if ( this.hunt._getOptInStatus() == 1 ){
				browzer_option.text("Hide Gift");
				browzer_option.bind("click.optIn", function (event) {
					event.stopPropagation();
					self._optInToggle();
				});
			}
		}
		else {
			this._disableOptinStatusField(browzer_option);
		}
	};

	this._disableOptinStatusField = function (browzer_option) {
		if ( !browzer_option ) {
			var browzer_option = jQuery(this.browzerDivHTMLobj).find(".browzer_option");
		}
		browzer_option.text("Hide Gift");
		browzer_option.css({"color":"lightgoldenrodyellow", "cursor":"default"});
		browzer_option.unbind("click.optIn").bind("click.optIn", function (event) {
			event.stopPropagation();
		});
	}
	
	this._getMessage = function () {
		var num_gifts_found = this.hunt._getNumGiftsFound();
		var messages = this.getConf("board_messages");
		var message = messages[num_gifts_found];
		
		return message;
	};
	
	/*
	 * Syncronizes Browzer's message per the gift count in the cookie.
	 */
	this._syncMessage = function () {
		if ( this.browzerDivHTMLobj ) {
			jQuery(this.browzerDivHTMLobj).children(".message").html(this._getMessage());
		}
		return this;
	};
	
	this._getBrowzerImage = function () {
		var num_gifts_found = parseInt(this.hunt._getNumGiftsFound());
		var images = this.getConf("bag_images");
		var image = images[num_gifts_found];
		
		return image;
	};
	
	/*
	 * Syncronizes Browzer's image per the gifts count in the cookie
	 */
	this._syncBrowzerImage = function () {
		if ( this.browzerDivHTMLobj ) {
			var image = jQuery(this.browzerDivHTMLobj).children(".imageBrowzer").children("img").get(0);
			jQuery(image).fadeOut( 1000, function () {
				image.src = self._getBrowzerImage();
			});
			jQuery(image).fadeIn(1000);
		}
		return this;
	}
	
	this._syncBoardInfo = function () {
		this._syncMessage();
		this._syncBrowzerImage();
		if (this.hunt._getNumGiftsFound() == 5) {
			this._disableOptinStatusField();
		}
	}
	
	this._displayBoard = function () {
		setTimeout(function() {
			jQuery( self.browzerDivHTMLobj ).fadeIn(1500, function () {
				self._applyBoardToggleListeners();
			});
		}, 2000);
		this.boardState.open = 0;
	}
	
	this._optInToggle = function () {
		var browzer_option = jQuery(this.browzerDivHTMLobj).find(".browzer_option");
		if ( this.hunt._getOptInStatus() == "0" ) {
			browzer_option.text("Hide Gift");
			this.hunt._setOptInStatus(1);
			this.hunt.gift._displayGiftImage();
		}
		else {
			browzer_option.text("Show Gift");
			this.hunt._setOptInStatus(0);
			this.hunt.gift._hideGiftImage();
		}
	};
	
	this._cacheTabMovementParam = function () {
		var lr_param = this.getConf("board_position_css");
		
		for ( y in lr_param ) {
			if ( y.match(/right|left/)) {
				this.cache.tab = {};
				this.cache.tab.direction = y;
				this.cache.tab.distance = lr_param[y];
				return true;
			}
		}
		return false;
	}
	
	this._boardAnimateOpen = function (speed) {
		if ( typeof speed !== "number" ) {
			speed = 500;
		};
		var animation = {queue: "false"};
		animation[this.cache.tab.direction] = "0px";
		jQuery(self.browzerDivHTMLobj).stop().animate(animation, speed);
	};
	
	this._boardAnimateClose = function (speed) {
		if ( typeof speed !== "number" ) {
			speed = 500;
		};
		var animation = {queue: "false"};
		animation[this.cache.tab.direction] = this.cache.tab.distance;
		jQuery(this.browzerDivHTMLobj).stop().animate(animation, speed);
	};

	this._applyBoardToggleListeners= function () {

		var openclick = function () {
			jQuery(self.browzerDivHTMLobj).bind("click.browzerboardopen", function (event) {
				event.stopPropagation();
				jQuery(self.browzerDivHTMLobj).unbind("click.browzerboardopen");
				self._boardAnimateOpen();
				self.boardState.open = 1;
				closeclick();
			}, false);
		}
		
		var closeclick = function () {
			jQuery("body").bind("click.browzerboardclose", function (event) {
				jQuery("body").unbind("click.browzerboardclose");
				self._boardAnimateClose();
				self.boardState.open = 0;
				openclick();
			});
		}
		
		openclick(); 
		
	}

	this._init();
};