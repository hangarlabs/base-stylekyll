'use strict';

// Import Search
import search from "./modules/search";

// Import Forms
import forms from "./modules/forms";

// Import Selectize
import selectize from "./vendors/selectize";

// Import Slider
import slider from "./vendors/slider";

// jQuery DOM Ready
$(() => {
  'use strict';

  // Initialize Search
  search();

  // Initialize Forms
  forms();

  // Initialize Slider
  slider();

  // Initialize Selectize
  selectize();

});
