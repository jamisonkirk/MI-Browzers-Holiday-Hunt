/*
 /* MI_Browzers_Holiday_Hunt Tests
 */
QUnit.setConfiguration = function () {
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

	/* Preset control to active since most tests will expect it to be active by default.
	 * Reset to 0 to actually test control functionality within the app
	 */

	return bhh_config;
};


QUnit.newHunt = function (_config) {

	mi.hunt = new mi.Browzers_Holiday_Hunt(_config);
};

mi.pageInfo = {};
mi.pageInfo.type = "section-front";

/* Instantiate a clean mi.hunt app at the beginning of each module
 * for better testing environment control.
 */
QUnit.moduleStart(function() {QUnit.newHunt( QUnit.setConfiguration() )});
QUnit.moduleDone(function() { delete mi.hunt });

QUnit.module("Initialization Tests");

	/* Properties
	 * 
	 */
	
	QUnit.test("giftImgHTMLobj property", function ( assert ) {
		var gift_image = document.getElementById("hunt-gift-img");
		assert.deepEqual(mi.hunt.gift.giftImgHTMLobj, gift_image, "giftImgHTMLobj is deepEqual to #hunt-gift-img.");
	});

/*
 * HUNT App object tests
 */
QUnit.module("HUNT APP Test.");

	QUnit.test("App Instantiation", function( assert ) {
//		assert.equal(mi.hunt._isInitialized, false, "App didn't initialize due to mi.control.bhh is set to .");

		assert.equal(typeof mi.hunt, "object", "Instance of mi.Browzers_Holiday_Hunt exists.");
		
		/*This is only checking that the constructor is executing _init.
		 *Unit tests for what the purpose of _init are done for those units elsewhere.
		 */
		assert.ok(mi.pageInfo.type == "section-front" || "story-detail", "mi.pageInfo.type is set.");
		assert.equal(typeof mi.hunt.gift, "object", "gift object exist.");
		assert.equal(typeof mi.hunt.huntCookie, "object", "hunt_cookie object exist.");
		assert.equal(typeof mi.hunt.huntBoard, "object", "huntBoard object exist.");
		assert.equal( mi.hunt._isInitialized, true, "_init returned true.");
	});
	
	QUnit.test("_addParenttoChildConfs", function( assert ) {
		
		mi.hunt._addParenttoChildConfs(mi.hunt.getConf("child_confs"));
		assert.deepEqual(mi.hunt.getConf("gift").hunt, mi.hunt,"Gift Config contains deepEqual hunt app object.");
		assert.deepEqual(mi.hunt.getConf("huntBoard").hunt, mi.hunt,"HuntBoard Config contains deepEqual hunt app object.");
	});
	
	QUnit.test("_init conditions",0, function ( assert ) {

	});
	
	QUnit.test("_loadStyles", function ( assert ) {
		var link = mi.hunt._loadStyles();
		var first_script = jQuery("script").get(0);
		assert.deepEqual( jQuery( first_script ).prev().get(0), link, "link was injected before first script tag.");
		assert.equal(link.rel, "stylesheet", "link contains rel styleshee.");
		assert.equal(link.href, mi.hunt.getConf("css_url"), "link contains href equal to config.");
	});

	QUnit.test("_isPageActive", function ( assert ) {
		
		mi.hunt.setConf("exempt_urls", [window.location.origin + window.location.pathname]);
		assert.equal(mi.hunt._isPageActive(), false, "Setting exempt_url with matching window.location returns false active status.");
		
		mi.hunt.setConf("exempt_urls", ["http://www.someotherdomain.com/path/to/a/file", window.location.origin + window.location.pathname]);
		assert.equal(mi.hunt._isPageActive(), false, "Setting exempt_url with multiple members with matching window.location returns false active status.");

		mi.hunt.setConf("exempt_urls", ["http://www.someotherdomain.com/path/to/a/file", "http://www.andanother.com"]);
		assert.equal(mi.hunt._isPageActive(), true, "Setting exempt_url with multiple members with none matching window.location returns true active status.");
		
		mi.hunt.setConf("exempt_urls", undefined);
		assert.equal(mi.hunt._isPageActive(), true, "Not setting exempt_url returns true active status.");
		
		var element = document.createElement("div");
		element.id = "no_browzer";
		//Place the #no_browzer element in the page.
		jQuery("#qunit-fixture").append(element);
		mi.hunt.setConf("exempt_urls", ["http://www.someotherdomain.com/path/to/a/file", "http://www.andanother.com"]);
		assert.equal(mi.hunt._isPageActive(), false, "#no_browzer present returns false active status.");
		
		
		
		
	});
/*	QUnit.test("_isPageActive conf exempt_url == undefined", function ( assert ) {
		mi.hunt.setConf("exempt_urls", undefined);
		assert.equal(mi.hunt._isPageActive(), true, "Not setting exempt_url returns true active status.");
	});
	QUnit.test("_isPageActive #no_browzer is present", function ( assert ) {
		var element = document.createElement("div");
		element.id = "no_browzer";
		jQuery("qunit-fixture").append(element);
		assert.equal(mi.hunt._isPageActive(), false, "#no_browzer present returns false active status.");
	});
*/
	

/*
 * GIFT object tests
 */
QUnit.module("GIFT OBJECT Test.");

	QUnit.test("Gift has copy of mi methods", function ( assert ) {
		assert.equal( typeof mi.hunt.gift.setConf, "function", "Gift has access to mi method.");
	});
	
	QUnit.test("Gift has access to Hunt app", function ( assert ) {
		assert.equal( mi.hunt.gift.hunt, mi.hunt, "Gift has access to parent hunt app.");
	});
	
	/* _init
	 * 
	 */
	QUnit.test("_init conditions",0, function ( assert ) {
	//	mi.hunt.gift._init();
	
	});
	
	/* _createGiftImage
	 * 
	 */
	QUnit.test("_createGiftImage Element", function ( assert ) {
		
		var gi_config = mi.hunt.gift.getConf("gift_image");
		var gi = mi.hunt.gift.giftImgHTMLobj;
		
		assert.equal(typeof mi.hunt.gift.cache.gi_config, "object", "gift cache assigned gi_config object.");
		assert.ok(gi, "element created");
		assert.equal( gi.id, "hunt-gift-img", "Img className is 'hunt-gift-img'." );
		var string = "([0-9])\\." + gi_config.file_type + "$";
		var image_num = gi.src.match(string)[1];
		assert.equal( gi.src, gi_config.url_path + "bhh" + image_num + "." + gi_config.file_type, "gift image contains src string from config.");
		assert.equal( jQuery("#hunt-gift-img").get(0), jQuery(mi.hunt.gift.cache.gift_location).prev().get(0), "gift image successfully inserted into DOM.");
	});
	
	QUnit.test("_randomSelectGiftLocation", function ( assert ) {
		assert.ok(mi.hunt.gift.cache.gift_location, "mi.hunt.gift.cache.gift_location populated.");
	});
	
	QUnit.test("_toggleGiftDisplay",0, function ( assert ) {
		
	})

	QUnit.test("_transportGift", 0, function ( assert ) {
		
		
	});
	
/*
 * HUNTBOARD object Tests
 */
QUnit.module("HUNTBOARD OBJECT Tests");

	/* _init
	 * 
	 */
	QUnit.test("_init conditions",0, function ( assert ) {
	//	mi.hunt.gift._init();
		
	});

	QUnit.test("HuntBoard has copy of mi methods", function ( assert ) {
		assert.equal( typeof mi.hunt.huntBoard.setConf, "function", "HuntBoard has access to mi method.");
	});

	QUnit.test("HuntBoard has access to Hunt app", function ( assert ) {
		assert.equal( mi.hunt.huntBoard.hunt, mi.hunt, "HuntBoard has access to parent hunt app.")
	});

	QUnit.test("_createBoard", function ( assert ) {
		mi.hunt.huntBoard._createBoard();
		assert.equal(mi.hunt.huntBoard.cache.html.length, 294, "mi.hunt.huntBoard.cache.html set to string of 29.");
	});