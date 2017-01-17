/** MI_Browzers_Holiday_Hunt.js **********************************************************

 *
 * Browzers_Holiday_Hunt object constructor.
 * 
 * <p>Requirements to implement Browzers_Holiday_Hunt on a page are:</p>
 * <ol>
 *   <li>jQuery 1.4+</li>
 *   <li>jQuery.path.js (included in package)</li>
 * </ol>
 * <pre>
 * </pre>
 *
 * <h3>Configuration options</h3>
 * <ul>
 *     <li>
 *         child_confs - object
 *         <ul>
 *             <li>
 *                 gift - object. Configures the Gift object.
 *                 <ul>
 *                     <li>
 *                         gift_image - object. Label for the gift_image configuration object.
 *                         <ul>
 *                             <li>url_path - string. URL path to gift image locations. NOTE: does not include the image name(s).</li>
 *                             <li>num_images - number. Number of images to be cycled through through game progression.</li>
 *                             <li>file_type - string. Three letter image file type. png and gif are recommended.</li>
 *                         </ul>
 *                     </li>
 *                     <li>gift_loc_selector - array. Any number of jQuery style selectors for gift object page placement.</li>
 *                     <li>use_path_plugin - boolean. Numeric 1 or 0 turning on the jquery.path.js plugin which produces bezier curved gift flight.</li>
 *                 </ul>
 *             </li>
 *             <li>
 *                 huntBoard - object. Configures the HuntBoard object.
 *                 <ul>
 *                     <li>sponsor - string. A message indicating contest sponsors. HTML is allowed. Be cautious of how you use apostrophes and double-quotes. See example.</li>
 *                     <li>info_link - string. URL to market desired contest rules and information page.</li>
 *                     <li>
 *                         board_messages - array. An index of the messages to be displayed on the huntBoard through game progression. HTML is allowed. Be cautious of how you use apostrophes and double-quotes. See example.
 *                         <ul>
 *                             <li>index[0 - n] - string</li>
 *                         </ul>
 *                     </li>
 *                     <li>
 *                         bag_images - array. An index of urls to the png image locations.
 *                         <ul>
 *                             <li>index[0 - n] - string</li>
 *                         </ul>
 *                     </li>
 *                     <li>
 *                         board_loc_selector - array. Orientation, [0], and target, [1], for the huntBoard to be displayed.
 *                         <ul>
 *                             <li>[0] - string. A jQuery method string. Allowed values are "before", "after", and "append". If anything other than one of these are placed in index [0], "append" will be used.</li>
 *                             <li>[1] - string. Any jQuery compliant selector. Be careful to be specific.</li>
 *                         </ul>
 *                     </li>
 *                     <li>
 *                         board_position_css - object. Used to position the board on the page.
 *                         <ul>
 *                             <li>position - string. Valid CSS style position.</li>
 *                             <li>right/left - string. Valid CSS style value in px.</li>
 *                         </ul>
 *                     </li>
 *                 </ul>
 *             </li>
 *         </ul>
 *     </li>
 *     <li>
 *         exempt_urls - array. An index of page url's that should not activate the hunt.
 *         <ul>
 *             <li>index[0 - n] - string</li>
 *         </ul>
 *     </li>
 *     <li>css_url - string. URL to style css for any hunt related styles.</li>
 *     <li>page_frequency - string. For ease of reading, use a fraction such as "1/3". This will display a gift every 1 out of 3 pages. Incidentally, "2/3" will work as well.</li>
 *     <li>cookie_domain - string. Used for the market's contest signup landing page, this needs to be set to domain.com.</li>
 *     <li>fully_init - boolean. Turn false to give market's contest signup landing page access to the mi_hunt cookie data. Default is true to fully_init.</li>
 * </ul>
 * 
 * <h3>Instantiation Options</h3>
 * <dl>
 *   <dt>Setting a variable to the configuration object and passing that when calling new</dt>	
 *   <dt>It is recommended that an aggregated file be used to hold the code, configuration, and instantiation.</dt>
 *   <dd>
  bhh_config= {
  	child_confs: {
  		gift:{
  			gift_image : {url_path: "http://media2.newsobserver.com/static/scripts/browzers_holiday_hunt/images/2013/",
  						num_images : 5,
  						file_type: "png"
  				},
  			gift_loc_selector: ["#test-gift-loc"],
  			use_path_plugin: 1
  		},
  		huntBoard: {
  			sponsor:"Sponsored by the N&O<br>and Crossroads Plaza",
  			info_link: "http://apps.newsobserver.com/nao/member_center/marketing/browzer/index.php",
  			board_messages: [
  				'<div>Collect 5 gifts to enter<br><span style="color: #B14728;">N&O $100 daily drawing.</span></div>',
  				'<p>You have found<br><span>1</span> gift!</p>',
  				'<p>You have found<br><span>2</span> gifts!</p>',
  				'<p>You have found<br><span>3</span> gifts!</p>',
  				'<p>You have found<br><span>4</span> gifts!</p>',
  				'Your bag is full!<br><a href="http://apps.newsobserver.com/nao/member_center/marketing/browzer/index.php?action=enter" target="_blank">Enter $100 drawing</a>'
  			],
  			bag_images : [
  				"http://media2.newsobserver.com/static/scripts/browzers_holiday_hunt/images/2013/0.png",
  				"http://media2.newsobserver.com/static/scripts/browzers_holiday_hunt/images/2013/1.png",
  				"http://media2.newsobserver.com/static/scripts/browzers_holiday_hunt/images/2013/2.png",
  				"http://media2.newsobserver.com/static/scripts/browzers_holiday_hunt/images/2013/3.png",
  				"http://media2.newsobserver.com/static/scripts/browzers_holiday_hunt/images/2013/4.png",
  				"http://media2.newsobserver.com/static/scripts/browzers_holiday_hunt/images/2013/5.png",
  			],
  			board_loc_selector: ["append", "body"],
  			board_position_css: {"position": "fixed",
  						"right": "-270px"}
  		}
  	},
  	exempt_urls: ["http://first",
  		    "http://someotherwebsite.com",
  		   // "http://jkirk-red-preview.apps.nandomedia.com/static/mocks/shanahan-resigns-as-secretary.html"
  		    ],
  	css_url: "http://www.newsobserver.com/static/scripts/browzers_holiday_hunt/css/browzers_holiday_hunt.css",
  	page_frequency: 1,
  	cookie_domain: "nandomedia.com",
  	fully_init: true
  };
   
   mi.hunt = new mi.Browzers_Holiday_Hunt(bhh_config);
     </dd>
 * </dl>
 * 
 * @constructor
 * @this {mi.Browzers_Holiday_Hunt}
 * @param {object} _config Configuration object literal. Recommended to be set in aggregated file. Read by MI App and applied to mi.setConf().
 * @returns {mi.Browzers_Holiday_Hunt}
 * @type Object
 */
mi.Browzers_Holiday_Hunt = function (_config) {
	mi.App.apply(this, arguments);
	
	/** Properties
	 * 
	 */
	this._isInitialized = false;
	
	/** Methods
	 * 
	 */
	this._init = function () {

		if (mi.control && mi.control.bhh !== undefined) {
			this.setConf("enabled", mi.control.bhh);
		} else {
			this.setConf("enabled",0);
			console.warn("Browzers Holiday Hunt is disabled because mi.control.bhh is not defined.");
		}

		if ( this.getConf("enabled") !== 0 ) {
			// explicit test for fully_init to not be false, otherwise true by default.
			if ( this.getConf("fully_init") !== false ) {
				this._addParenttoChildConfs(this.getConf("child_confs"));
				// TODO - decouple pageInfo.type from app. Configure for limitation. Empty default to unlimited.
				if ( (mi.pageInfo.type === "story-detail" || mi.pageInfo.type === "section-front") &&
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
		else {
				return false;
			};
	};

	/**
	 * Browzers_Holiday_Hunt @_addParenttoChildConfs - Adds 'this' as a member in child_conf. 
	 * When the child ( gift, huntboard, etc.) are instantiated 'this'will be made available to those
	 * children as 'this.hunt'.
	 * @param {object} child_confs. Sub configurations that defines the huntBoard and Gift child objects.
	 */
	this._addParenttoChildConfs = function (child_confs) {

		/* Grab the gift object from hunt app config.
		 * add the hunt app object as a property.
		 * setConf "gift" with included new property
		 */ 
		for (var x in child_confs) {
			if ( child_confs.hasOwnProperty(x) ) {
				child_confs[x].hunt = this;
				this.setConf(x, child_confs[x]);
			}
		}
	};
	
	/**
	 * Browzers_Holiday_Hunt @_loadStyles - Asynchronous call to css file by creating
	 * and inserting a <link> into the head. 
	 * @returns the link style element object. 
	 * @type Object
	 */
	this._loadStyles = function () {
		var css = document.createElement("link");
		var first_script = jQuery("script").get(0);
		
		css.rel = "stylesheet";
		css.href = this.getConf("css_url");
		jQuery( first_script ).before(css);
		
		return css;
	};
	
	/**
	 * Browzers_Holiday_Hunt @_isPageActive - Returns false if id no_browzer exists in the DOM.
	 * This enables newsrooms to turn of the hunt for a specific story without contacting support.
	 * Alternatively, returns false if the page url matches an entry in the exempt_urls array.
	 * @returns true/false
	 * @type Boolean
	 */
	this._isPageActive  = function () {
		var cur_href = window.location.origin + window.location.pathname;
		// if config not set then assign an empty array.
		var exempt_pages = (this.getConf("exempt_urls")) ? this.getConf("exempt_urls") : [];
		
		if ( jQuery("#no_browzer").length !== 0 ) {
			return false;
		}
		
		for ( var x = 0; x < exempt_pages.length; x++ ) {
			if ( exempt_pages[x] == cur_href ) {
				return false;
			}
		}
		return true;
	};
	
	/**
	 * Browzers_Holiday_Hunt @_randomPage -
	 * Uses Math.random to get a number between 0 and .999.... 
	 * If the random value is less than the page_frequency value, returns true. If the page_frequency is not
	 * configured, then a frequency of 1/1 (always true) is assumed.
	 * @returns true/false
	 * @type Boolean
	 */
	this._randomPage = function () {
		var freq = this.getConf("page_frequency");
		var random = Math.random();
		if (freq === undefined) {
			freq = 1;
		}
		if (random < freq) {
			return true;
		}
		else {return false}
	};
	
	/**
	 * Browzers_Holiday_Hunt @_getNumGiftsFound - gets the number of gifts the user has found today.
	 * @returns mi.hunt.gift.huntCookie.gifts - Holds the cookie "gifts" content param value.
	 * @type Number
	 */
	this._getNumGiftsFound = function () {
		return this.huntCookie.gifts;
	};
	
	/**
	 * Browzers_Holiday_Hunt @_setNumGiftsFound - sets the number of gifts cookie param to a specific value.
	 * Stores to cookie.
	 * @param found - A positive number value.
	 * @type Number
	 */
	this._setNumGiftsFound = function ( found ) {
		this.huntCookie.gifts = found;
		this.huntCookie.store();
	};
	
	/**
	 * Browzers_Holiday_Hunt @_addFoundGift - Increments the gifts cookie param value. Stores to cookie.
	 */
	this._addFoundGift = function () {
		this.huntCookie.gifts++;
		this.huntCookie.store();
	};
	
	/**
	 * Browzers_Holiday_Hunt @_emptyBag - Sets the gifts cookie param value to 0. Stores to cookie.
	 */
	this._emptyBag = function() {
		this.huntCookie.gifts = 0;
		this.huntCookie.store();
	};
	
	/**
	 * Browzers_Holiday_Hunt @_getOptInStatus - gets the optIn cookie param value.
	 * @returns mi.hunt.huntCookie.optIn - A boolean 1 or 0.
	 */
	this._getOptInStatus = function () {
		return this.huntCookie.optIn;
	};
	
	/**
	 * Browzers_Holiday_Hunt @_setOptInStatus - sets the optIn cookie param value. This value represents the
	 * users option to see gifts on the page.
	 * @param option - can be a 1 or 0.
	 * @type Number
	 */
	this._setOptInStatus = function (option) {
		if (option == 0 || option == 1) {
			this.huntCookie.optIn = option;
			this.huntCookie.store();
		}
	};
	
	/**
	 * Browzers_Holiday_Hunt @_expMidnight - Determines the number of minutes from now until midnight.
	 * @returns exp_in_minutes - Number of minutes from now that the cookie expiration date is to be set..
	 * @type Number
	 */
	this._expMidnight = function () {
		var midnight = new Date();
		midnight.setHours(24, 0, 0, 0);
		
		var now = new Date();
		now = now.getTime();
		var exp_in_minutes = (midnight - now) / 60000;
		
		return exp_in_minutes;
	}

	/**
	 * Browzers_Holiday_Hunt @_getElemPosition
	 * @param selector
	 * @returns {___anonymous9681_9682}
	 */
	this._getElemPosition = function (selector) {
		var elem = {};

		elem.top = Math.floor(jQuery(selector).offset().top);
		elem.left = Math.floor(jQuery(selector).offset().left);

		return elem;
	}

	/**
	 * Browzers_Holiday_Hunt @_cookieInit
	 * @returns true/false
	 * @type Boolean
	 */
	this._cookieInit = function () {
		this.huntCookie.load();
		this._setOptInStatus((this._getOptInStatus() !== undefined ) ? this._getOptInStatus() : 1);
		if (this.huntCookie.gifts === undefined) {
			this.huntCookie.gifts = 0;
		}
		else if (this.huntCookie.gifts >= 5) {
			this.huntCookie.gifts = 5;
		}
		
		this.huntCookie.store();
		return true;
	}
	
	/**
	 * Browzers_Holiday_Hunt @_isInitialized - Property indicates if the App fully initialized.
	 * TODO: Used only for Unit Tests. This needs to be changed.
	 * @type Boolean
	 */
	this._isInitialized = this._init();

};

/**
 * 
 */
mi.Browzers_Holiday_Hunt.prototype.Gift = function (_config) {
	mi.App.apply(this, arguments);
	var self = this;
	//create object link to app methods.
	this.hunt = this.getConf("hunt");
	
	/** Properties
	 * Gift @giftImgHTMLobj
	 */
	this.giftImgHTMLobj = {};
	
	//Methods

	/**
	 * Gift @_init
	 * @returns true/false
	 * @type Boolean
	 */
	this._init = function () {
		this.cache.gift_config = this.getConf("gift_image");
		
		if ( this.hunt._randomPage() &&
				this.hunt._getNumGiftsFound() != 5 )
		{
			
			this.giftImgHTMLobj = this._createGiftImage();
			
			if (this.hunt._getNumGiftsFound() < 5 &&
					//Should be using this.hunt.getOptInStatus() ==1
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
	
	/**
	 * Gift @_createGiftImage
	 * @returns true/false
	 * @type Boolean
	 */
	this._createGiftImage = function () {
//		this._randomSelectGiftLocation();
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

		//if this._randomSelectGiftLocation() returns true set gift_location and Gift @
		if ( (this.cache.gift_location = this._randomSelectGiftLocation()) ) {
			// Insert the gift image element before configured location
			// and return the actual gift image object.
			return jQuery(gi).insertBefore( this.cache.gift_location ).get(0);
		}
		else {
			console.warn("Browzers Holiday Hunt could not use the configured gift_loc_selectors. Therefore, the gift could not be fully created.");
			return false;
		}
	};

	/**
	 * Gift @_displayGiftImage
	 */
	this._displayGiftImage = function() {
		setTimeout(function() {
			jQuery(self.giftImgHTMLobj).fadeIn(500);
		}, 1000);
	};

	/**
	 * Gift @_hideGiftImage
	 */
	this._hideGiftImage = function() {
		jQuery(self.giftImgHTMLobj).fadeOut(500);
	};

	/**
	 * Gift @_getNextGiftImage - return the url for the gift image based on _getNumGiftsFound().
	 * Requires the gifts follow the nameing convention "bhh<num>" with <num> being
	 * @returns image -  a url for the gift image.
	 * @type String
	 */
	this._getNextGiftImage = function () {
		var gi_config = this.getConf("gift_image");

		var base_url = gi_config.url_path;

		//We want the next gift so we add 1 on the gifts found.
		var num = parseInt(this.hunt._getNumGiftsFound()) + 1;
		var image = base_url + 'bhh' + num + "." + gi_config.file_type;
		return image;
	};

	/**
	 * Gift @_randomSelectGiftLocation - Makes, at most, 500 attempts to randomly choose a selector that exists
	 * on the page.
	 * @returns selector
	 * @type Object
	 * TODO: Verify the chosen selector is also not hidden.
	 */
	this._randomSelectGiftLocation = function () {
		var gift_loc_selectors = this.getConf("gift_loc_selector");
		
		//Randomly check selectors to be on the page.
		//Use first one found on the page.
		for (var x = 0; x < 500; x++ ) {
			var selector = ( gift_loc_selectors !== undefined ) ? gift_loc_selectors[Math.floor(Math.random() * (gift_loc_selectors.length))] : null;
			if ( jQuery(selector).get(0) !== undefined ) {
				return selector;
			}
		}
		//Return false in the event that no selectors were found on the page after trying 500 checks.
		return false;
	};

	/**
	 * Gift @_transportGift
	 */
	this._transportGift = function () {
		var board = jQuery(this.hunt.huntBoard.browzerDivHTMLobj);
		
		var origin = this.hunt._getElemPosition("#hunt-gift-img");
		var waypoint = this.hunt._getElemPosition(".imageBrowzer img");
		
		
		var y = waypoint.top - origin.top;
		var x = waypoint.left - origin.left;
		
		// We need to make adjustments for the waypoint as it moves around
		// and is likely bigger than the gift image.
		if ( this.hunt.huntBoard.boardState.open === 0) {
			//numberfy openStateAdustment Gift @
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
				{path : new jQuery.path.bezier(bezier_params)}
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

	/**
	 * Execute Gift.init() on instantiation of Gift.
	 */
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
		 * Otherwise, default "append".
		 */
		var position = (placement[0] === "before" || placement[0] === "after" || placement[0] === "append") ? placement[0] : "append" ;

		/* Place the board html into the DOM either before or after the selector or append into the selector.
		 * TODO: placement[1] should be tested for population with a default setting of "body".
		 */
		jQuery(placement[1])[position](this.cache.html);
		
		// Assign the element object to HuntBoard.browzerDivHTMLobj property
		return jQuery("#browzer_promo").get(0);
	};
	/**
	 * HuntBoard @_populateBoard
	 * @returns true/false
	 * @type Boolean
	 */
	this._populateBoard = function () {
		var board = jQuery(this.browzerDivHTMLobj);
		// Verify that the board is on the page/in the DOM
		if ( board.get(0).nodeType !== undefined) {
			jQuery(this.browzerDivHTMLobj).css( this.getConf("board_position_css") );
			board.children(".sponsor").html(this.getConf("sponsor"));
			this._syncBoardInfo();
			this._setUpOptInStatusField();
			board.children().find(".info-link").get(0).href = this.getConf("info_link");
			return true;
		}
		else {
			this.hunt.setConf("enabled",0);
			console.warn("An unknown problem occurred with HuntBoard creation. Browzer's Holiday Hunt has been disabled as a result.");
			return false;
		}
	};
	/**
	 * HuntBoard @_setUpOptInStatusField
	 */
	this._setUpOptInStatusField = function () {
		var browzer_option = jQuery(this.browzerDivHTMLobj).find(".browzer_option");
		// Veriy the gift is on the page/in the DOM
		if ( this.hunt.gift.giftImgHTMLobj.nodeType !== undefined ) {
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

	/**
	 * HuntBoard @_disableOptinStatusField
	 * @param browzer_option {object} jQuery supplied element.
	 */
	this._disableOptinStatusField = function (browzer_option) {
		if ( !browzer_option ) {
			browzer_option = jQuery(this.browzerDivHTMLobj).find(".browzer_option");
		}
		browzer_option.text("Hide Gift");
		browzer_option.css({"color":"lightgoldenrodyellow", "cursor":"default"});
		browzer_option.unbind("click.optIn").bind("click.optIn", function (event) {
			event.stopPropagation();
		});
	}
	
	/**
	 * HuntBoard @_getMessage
	 * @returns message
	 */
	this._getMessage = function () {
		var num_gifts_found = this.hunt._getNumGiftsFound();
		var messages = this.getConf("board_messages");
		var message = messages[num_gifts_found];
		
		return message;
	};
	
	/**
	 * HuntBoard @_syncMessage - Syncronizes Browzer's message per the gift count in the cookie.
	 * 
	 */
	this._syncMessage = function () {
		if ( this.browzerDivHTMLobj ) {
			jQuery(this.browzerDivHTMLobj).children(".message").html(this._getMessage());
		}
	};
	
	/**
	 * HuntBoard @_getBrowzerImage
	 * @returns
	 */
	this._getBrowzerImage = function () {
		var num_gifts_found = parseInt(this.hunt._getNumGiftsFound());
		var images = this.getConf("bag_images");
		var image = images[num_gifts_found];
		
		return image;
	};
	
	/**
	 * HuntBoard @_syncBrowzerImage
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
	
	/**
	 * HuntBoard @_syncBoardInfo
	 */
	this._syncBoardInfo = function () {
		this._syncMessage();
		this._syncBrowzerImage();
		if (this.hunt._getNumGiftsFound() == 5) {
			this._disableOptinStatusField();
		}
	}
	
	/**
	 * HuntBoard @_displayBoard
	 */
	this._displayBoard = function () {
		setTimeout(function() {
			jQuery( self.browzerDivHTMLobj ).fadeIn(1500, function () {
				self._applyBoardToggleListeners();
			});
		}, 2000);
		this.boardState.open = 0;
	}
	
	/**
	 * HuntBoard @_optInToggle
	 */
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
	
	/**
	 * HuntBoard @_cacheTabMovementParam
	 * @returns {boolean}
	 * @type Boolean
	 */
	this._cacheTabMovementParam = function () {
		var lr_param = this.getConf("board_position_css");
		
		for ( var y in lr_param ) {
			if ( y.match(/right|left/)) {
				this.cache.tab = {};
				this.cache.tab.direction = y;
				this.cache.tab.distance = lr_param[y];
				return true;
			}
		}
		return false;
	}
	
	/**
	 * HuntBoard @_boardAnimateOpen
	 * @param speed
	 */
	this._boardAnimateOpen = function (speed) {
		if ( typeof speed !== "number" ) {
			speed = 500;
		};
		var animation = {queue: "false"};
		animation[this.cache.tab.direction] = "0px";
		jQuery(self.browzerDivHTMLobj).stop().animate(animation, speed);
	};
	
	/**
	 * HuntBoard @_boardAnimateClose
	 * @param speed
	 */
	this._boardAnimateClose = function (speed) {
		if ( typeof speed !== "number" ) {
			speed = 500;
		};
		var animation = {queue: "false"};
		animation[this.cache.tab.direction] = this.cache.tab.distance;
		jQuery(this.browzerDivHTMLobj).stop().animate(animation, speed);
	};

	/**
	 * HuntBoard @_applyBoardToggleListeners
	 */
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

	/**
	 * Execute HuntBoard.init() on instantiation of HuntBoard.
	 */
	this._init();
};