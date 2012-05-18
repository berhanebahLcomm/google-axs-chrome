// Copyright 2012 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Android-specific implementation of methods that differ
 * depending on the host platform.
 *
 * @author dmazzoni@google.com (Dominic Mazzoni)
 */

goog.provide('cvox.AndroidHost');

goog.require('cvox.AbstractHost');
goog.require('cvox.ApiImplementation');
goog.require('cvox.ChromeVoxEventWatcher');
goog.require('cvox.ChromeVoxKbHandler');
goog.require('cvox.HostFactory');

/**
 * @constructor
 * @extends {cvox.AbstractHost}
 */
cvox.AndroidHost = function() {
  cvox.AbstractHost.call(this);
};
goog.inherits(cvox.AndroidHost, cvox.AbstractHost);

cvox.AndroidHost.prototype.init = function() {
  cvox.ChromeVox.version = 'AndroidVox';
  var keyBindings = this.getStringifiedAndroidKeyBindings();
  var parsedKeyBindings = /** @type {Object} */ (
      cvox.ChromeVoxJSON.parse(keyBindings));
  cvox.ChromeVoxKbHandler.loadKeyToFunctionsTable(parsedKeyBindings);

  // Hard coded preferences in lieu of a prefs system for Android.
  cvox.ApiImplementation.siteSpecificScriptLoader =
      'https://ssl.gstatic.com/accessibility/javascript/ext/';
  cvox.ApiImplementation.siteSpecificScriptBase =
      'https://ssl.gstatic.com/accessibility/javascript/ext/loader.js';

  cvox.ChromeVox.speakInitialMessages();
};

cvox.AndroidHost.prototype.reinit = function() {
};

cvox.AndroidHost.prototype.onPageLoad = function() {
  // Remove the mouseover delay. The gesture detector will enable
  // focusFollowsMouse when a drag gesture is detected.
  cvox.ChromeVoxEventWatcher.mouseoverDelayMs = 0;
};

/**
 * @return {string} The Android key bindings as a JSON string.
 */
cvox.AndroidHost.prototype.getStringifiedAndroidKeyBindings = function() {
  // TODO(svetoslavganov): Change the bindings for Android
  return cvox.ChromeVoxJSON.stringify({
     // Stop TTS
    '#17' : ['stopSpeech', 'Stop speaking'], // Ctrl

    // TODO(svetoslavganov): Uncomment the key bindings below once
    // our handleTab implementation is fixed and the handeShiftTab
    // is implemented. For now we use the default browser behavior.
    // TAB/Shift+TAB
    // '#9' : 'handleTab', // Tab
    // 'Shift+#9' : 'handleShiftTab',

    // Basic navigation
    // Note that the arrows are bound this way so they
    // are consistent with the built-in accessibility support
    // in the case of disabled JavaScript.
    '#38' : ['backward', 'Navigate backward'],
    '#40' : ['forward', 'Navigate forward'],
    'Alt+#38' : ['jumpToTop', 'Jump back to the top'],
    'Alt+#40' : ['readFromHere', 'Read from here'],
    '#37' : ['previousGranularity', 'Decrease navigation granularity'],
    '#39' : ['nextGranularity', 'Increase navigation granularity'],
    'Shift+#37' : ['nop', ''], // swallow Shift + left arrow
    'Shift+#39' : ['nop', ''], // swallow Shift + right arrow
    '#13' : ['actOnCurrentItem', 'Take action on current item'], // ENTER
    'Shift+#16' : ['nop', ''], // swallow Shift

    // General commands
    'Ctrl+Alt+#191' : ['toggleSearchWidget', 'Toggle search widget'], // '/'
    'Ctrl+Alt+B' : ['showBookmarkManager', 'Open bookmark manager'],
    'Ctrl+Alt+A' : ['nextTtsEngine', 'Switch to next TTS engine'],
    'Ctrl+Alt+#189' : ['decreaseTtsRate', 'Decreaste rate of speech'], // '-'
    'Ctrl+Alt+#187' : ['increaseTtsRate', 'Increase rate of speech'], // '='
    'Ctrl+Alt+Shift+#189' : ['decreaseTtsPitch', 'Decrease pitch'], // '-'
    'Ctrl+Alt+Shift+#187' : ['increaseTtsPitch', 'Increase pitch'], // '='
    'Ctrl+Alt+#219' : ['decreaseTtsVolume', 'Decrease speech volume'], // '['
    'Ctrl+Alt+#221' : ['increaseTtsVolume', 'Increase speech volume'], // ']'

    // Jump commands
    'Ctrl+Alt+1' : ['nextHeading1', 'Next level 1 heading'],
    'Ctrl+Alt+Shift+1' : ['previousHeading1', 'Previous level 1 heading'],
    'Ctrl+Alt+2' : ['nextHeading2', 'Next level 2 heading'],
    'Ctrl+Alt+Shift+2' : ['previousHeading2', 'Previous level 2 heading'],
    'Ctrl+Alt+3' : ['nextHeading3', 'Next level 3 heading'],
    'Ctrl+Alt+Shift+3' : ['previousHeading3', 'Previous level 3 heading'],
    'Ctrl+Alt+4' : ['nextHeading4', 'Next level 4 heading'],
    'Ctrl+Alt+Shift+4' : ['previousHeading4', 'Previous level 4 heading'],
    'Ctrl+Alt+5' : ['nextHeading5', 'Next level 5 heading'],
    'Ctrl+Alt+Shift+5' : ['previousHeading5', 'Previous level 5 heading'],
    'Ctrl+Alt+6' : ['nextHeading6', 'Next level 6 heading'],
    'Ctrl+Alt+Shift+6' : ['previousHeading6', 'Previous level 6 heading'],
    'Ctrl+Alt+C' : ['nextCheckbox', 'Next checkbox'],
    'Ctrl+Alt+Shift+C' : ['previousCheckbox', 'Previous checkbox'],
    'Ctrl+Alt+E' : ['nextEditText', 'Next editable text area'],
    'Ctrl+Alt+Shift+E' : ['previousEditText', 'Previous editable text area'],
    'Ctrl+Alt+F' : ['nextFormField', 'Next form field'],
    'Ctrl+Alt+Shift+F' : ['previousFormField', 'Previous form field'],
    'Ctrl+Alt+G' : ['nextGraphic', 'Next graphic'],
    'Ctrl+Alt+Shift+G' : ['previousGraphic', 'Previous graphic'],
    'Ctrl+Alt+H' : ['nextHeading', 'Next heading'],
    'Ctrl+Alt+Shift+H' : ['previousHeading', 'Previous heading'],
    'Ctrl+Alt+I' : ['nextListItem', 'Next list item'],
    'Ctrl+Alt+Shift+I' : ['previousListItem', 'Previous list item'],
    'Ctrl+Alt+L' : ['nextLink', 'Next link'],
    'Ctrl+Alt+Shift+L' : ['previousLink', 'Previous link'],
    'Ctrl+Alt+O' : ['nextList', 'Next list'],
    'Ctrl+Alt+Shift+O' : ['previousList', 'Previous list'],
    'Ctrl+Alt+Q' : ['nextBlockquote', 'Next block quote'],
    'Ctrl+Alt+Shift+Q' : ['previousBlockquote', 'Previous block quote'],
    'Ctrl+Alt+R' : ['nextRadio', 'Next radio button'],
    'Ctrl+Alt+Shift+R' : ['previousRadio', 'Previous radio button'],
    'Ctrl+Alt+S' : ['nextSlider', 'Next slider'],
    'Ctrl+Alt+Shift+S' : ['previousSlider', 'Previous slider'],
    'Ctrl+Alt+T' : ['nextTable', 'Next table'],
    'Ctrl+Alt+Shift+T' : ['previousTable', 'Previous table'],
    'Ctrl+Alt+U' : ['nextButton', 'Next button'],
    'Ctrl+Alt+Shift+U' : ['previousButton', 'Previous button'],
    'Ctrl+Alt+X' : ['nextComboBox', 'Next combo box'],
    'Ctrl+Alt+Shift+X' : ['previousComboBox', 'Previous combo box']
  }, null, null);
};

// TODO (clchen): Implement this.
cvox.AndroidHost.prototype.getApiSrc = function(message) {
  return '';
};

cvox.AndroidHost.prototype.hasTtsCallback = function() {
  return false;
};

cvox.HostFactory.hostConstructor = cvox.AndroidHost;