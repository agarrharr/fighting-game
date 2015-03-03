// This creates an array of all the files that Karma finds with a suffix of
// Test.js (eg utilsTest.js) to be added to the Require JS config below
var tests = [],
    file;
for (file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if(/Test\.js$/.test(file)) {
            tests.push(file);
        }
    }
}
console.log(tests);
requirejs.config({
    baseUrl: '/base',  // Karma serves files from /base/<your-base-path>
    paths: {
	  game: 'game.js',
	  qunit: 'bower_components/qunit/qunit/qunit.js'
    },
    deps: tests,  // add tests array to load our tests

    callback: window.__karma__.start  // start tests once Require.js is done
});
