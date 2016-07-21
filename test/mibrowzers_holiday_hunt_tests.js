/*
 * MI_Browzers_Holiday_Hunt Tests
 */

mi.bhh_config= {
		child_confs: {
			gift:{
				gift_image : {url_path: "http://media2.newsobserver.com/static/scripts/browzers_holiday_hunt/images/2013/",
							num_images : 5,
							file_type: "png"
						},
gift_loc_selector: ["#qunit-fixture"],
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
		cookie_domain: "nandomedia.com"
};

QUnit.newHunt = function () {
	mi.hunt = new mi.Browzers_Holiday_Hunt(mi.bhh_config);
};
mi.control =  {};
mi.control.bhh = 1;
mi.pageInfo = {};
mi.pageInfo.type = "section-front";
QUnit.newHunt();

/*
 * HUNT App object tests
 */
module("HUNT APP Tests");

	QUnit.test("App Instantiation", function( assert ) {
//		equal(mi.hunt._isInitialized, false, "App didn't initialize due to mi.control.bhh is set to 0");

		equal(typeof mi.hunt, "object", "Instance of mi.Browzers_Holiday_Hunt exists.");
		
		/*This is only checking that the constructor is executing _init.
		 *Unit tests for what the purpose of _init are done for those units elsewhere.
		 */
		equal(mi.hunt._isInitialized, true, "_init executed with result of true.");
	});
	
	QUnit.test("_addParenttoChildConfs", function( assert ) {
		
		mi.hunt._addParenttoChildConfs();
		deepEqual(mi.hunt.getConf("gift").hunt, mi.hunt,"Gift Config contains deepEqual hunt app object");
		deepEqual(mi.hunt.getConf("huntBoard").hunt, mi.hunt,"HuntBoard Config contains deepEqual hunt app object");
	});
	
	QUnit.test("Sub Object Instantiations", function ( assert ) {
		
		equal(typeof mi.hunt.gift, "object", "gift object exists");
		equal(typeof mi.hunt.huntCookie, "object", "hunt_cookie object exists");
		equal(typeof mi.hunt.huntBoard, "object", "huntBoard object exists");
	});
	
	QUnit.test("_loadStyles", function ( assert ) {
		var link = mi.hunt._loadStyles();
		var first_script = jQuery("script").get(0);
		deepEqual( jQuery( first_script ).prev().get(0), link, "link was injected before first script tag");
		equal(link.rel, "stylesheet", "link contains rel stylesheet");
		equal(link.href, mi.hunt.getConf("css_url"), "link contains href equal to config");
	});
	
	QUnit.test("_isPageExempt", function ( assert ) {
		mi.hunt.setConf("exempt_urls", [window.location.origin + window.location.pathname]);
		
		var exempt_pages = mi.hunt.getConf("exempt_urls");
		
		var cur_href = window.location.origin + window.location.pathname;
		ok(mi.hunt._isPageExempt(cur_href), "Current test page is exempt.");
		
		mi.hunt.setConf("exempt_urls", ["something else", "another thing"]);
		cur_href = "http://www.google.com";
		ok(!mi.hunt._isPageExempt(cur_href), "With simulated current page not being in config.")

	});

/*
 * GIFT object tests
 */
module("GIFT OBJECT Tests");

	QUnit.test("Gift has copy of mi methods", function ( assert ) {
		equal( typeof mi.hunt.gift.setConf, "function", "Gift has access to mi methods");
	});
	
	QUnit.test("Gift has access to Hunt app", function ( assert ) {
		equal( mi.hunt.gift.hunt, mi.hunt, "Gift has access to parent hunt app.")
	});
	
	/* Properties
	 * 
	 */

	QUnit.test("giftImgHTMLobj", function ( assert ) {
		
		var gift_image = jQuery("#hunt-gift-img").get(0);
		
		deepEqual(mi.hunt.gift.giftImgHTMLobj, gift_image, "giftImgHTMLobj is deepEqual to #hunt-gift-img");
	});
	
	/* _init
	 * 
	 */
	QUnit.test("_init",0, function ( assert ) {
	//	mi.hunt.gift._init();
		
	});
	
	/* _createGiftImage
	 * 
	 */
	QUnit.test("_createGiftImage Element", function ( assert ) {
		
		var gi_config = mi.hunt.gift.getConf("gift_image");
		var gi = mi.hunt.gift.giftImgHTMLobj;
		
		equal(typeof mi.hunt.gift.cache.gi_config, "object", "gift cache assigned gi_config object");
		ok(gi, "element created.");
		equal( gi.id, "hunt-gift-img", "Img className is 'hunt-gift-img'." );
		var string = "([0-9])\\." + gi_config.file_type + "$";
		var image_num = gi.src.match(string)[1];
		equal( gi.src, gi_config.url_path + "bhh" + image_num + "." + gi_config.file_type, "gift image contains src string from config");
		equal( jQuery("#hunt-gift-img").get(0), jQuery(mi.hunt.gift.cache.gift_location).prev().get(0), "gift image successfully inserted into DOM")
	});
	
	QUnit.test("_randomSelectGiftLocation", function ( assert ) {
		ok(mi.hunt.gift.cache.gift_location, "mi.hunt.gift.cache.gift_location populated.");
	});
	
	QUnit.test("_toggleGiftDisplay",0, function ( assert ) {
		
	})

	QUnit.test("_transportGift", 0, function ( assert ) {
		
		
	});
	
/*
 * HUNTBOARD object Tests
 */
module("HUNTBOARD OBJECT Tests");

	QUnit.test("HuntBoard has copy of mi methods", function ( assert ) {
		equal( typeof mi.hunt.huntBoard.setConf, "function", "HuntBoard has access to mi methods");
	});

	QUnit.test("HuntBoard has access to Hunt app", function ( assert ) {
		equal( mi.hunt.huntBoard.hunt, mi.hunt, "HuntBoard has access to parent hunt app.")
	});

	QUnit.test("_createBoard", function ( assert ) {
		mi.hunt.huntBoard._createBoard();
		equal(mi.hunt.huntBoard.cache.html.length, 294, "mi.hunt.huntBoard.cache.html set to string of 294");
	});