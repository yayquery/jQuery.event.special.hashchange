/*!
 * Copyright yayQuery Peoples, 2010
 *
 * Licensed under the MIT license
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * This plugin is loosely based on Ben Almans BBQ Plugin, but without the extra fluff. Just
 * plain onhashchange cross-browser support through jQuery Special Event API.
 * 
 * http://yayquery.com/ - http://github.com/yayquery/
 */

$(function ($) {
var

	// Caching etc.
	undefined,
	w = window,
	wl = w.location,

	// Checks if the browser supports the event natively (checks all browsers except IE8,
	// which can report this as a false-positive, kudos to Ben Alman for this). We avoid using
	// $.browser, we don't want to sniff that browser, yo!
	nativeSupport = ('onhashchange' in window) && !(window.console && !$.support.style),

	// Used to keep track of the setInterval
	evtTimer,
	
	// The time, in milliseconds, we should check for hash changes
	evtPollInterval = 80,

	// Will contain the last known hash
	lastHash =wl.hash,

	// The object actually handling the simulated event, never used by the native ones.
	simulEvt = {
		start: function () {
			if (evtTimer) return;

			evtTimer = setInterval(function () {
				if (wl.hash !== lastHash) {
					$(w).trigger('hashchange');
				}
				
				lastHash = wl.hash;
			}, evtPollInterval);
		},

		stop: function () {
			if (!evtTimer) return;

			clearInterval(evtTimer);
			evtTimer = 0;
		}
	},

	hashFn = function (str) {
		if (nativeSupport) return false;

		simulEvt[str]();
	};

// Set up the special event object
$.event.special.hashchange = {
	setup:    function () { return hashFn('start'); },
	teardown: function () { return hashFn('stop');  }
}

}(jQuery));

