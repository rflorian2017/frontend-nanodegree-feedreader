/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
		 
		 it('each feed has a URL', function() {
			 for(var feed of allFeeds) {
				expect(feed.url).toBeDefined();
				expect(feed.url.length).not.toBe(0);
			 }
		 });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
		 it('each feed has a name', function() {
			 for(var feed of allFeeds) {
				expect(feed.name).toBeDefined();
				expect(feed.name.length).not.toBe(0);
			 }
		 });
    });


    /* TODO: Write a new test suite named "The menu" */
	describe('The menu', function() {
		//get the body element
		var body = document.getElementsByTagName("body")[0];

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
		 it('menu element hidden by default' , function() {
			 expect(body.classList.contains("menu-hidden")).toEqual(true);
		 });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
		  it('menu changes visibilty', function() {
			  var btnMenu = document.getElementsByClassName("icon-list")[0];
			  //trigger a click
			  btnMenu.click();
			  //now it should be visible
			  expect(body.classList.contains("menu-hidden")).toEqual(false);
			  btnMenu.click();
			  //this time it is hidden
			  expect(body.classList.contains("menu-hidden")).toEqual(true);
		  });
	});

    /* TODO: Write a new test suite named "Initial Entries" */
	describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
		 beforeEach(function(done) {
			 loadFeed(0, function() {
				 done();
			 });
		 });
		 it('contains at least one entry', function(done) {
			 //get the elements of "feed"
			 var container = $('.feed');
			 //get all the child elements of feed with the class name entry
			 expect(container[0].getElementsByClassName('entry').length).toBeGreaterThan(0);
			 done();
		 });
	});

    /* TODO: Write a new test suite named "New Feed Selection" */
	describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
		 var initialContent;
		 beforeEach(function(done) {
			 loadFeed(0, function() {
				 //run initially the load feed for 0 and save the inner HTML
				 initialContent = $('.feed')[0].innerHTML;
				 //then load feed for 1 and check in the test that they are equal
				 loadFeed(1, function() {
					 done();
				 });
			 });
		 });
		 
		 it("Content is changed", function(done) {
			 //they should not be equal
			 expect(initialContent).not.toBe($('.feed')[0].innerHTML);
			 done();
		 });
	});
}());
