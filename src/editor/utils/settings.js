/**
 * Default settings of the editor.
 *
 * @constant {Object} DEFAULT_SETTINGS
 * @memberOf b3e
 */

(function () {
  "use strict";

  var DEFAULT_SETTINGS = {
    // CAMERA
    zoom_initial: 1.0,
    zoom_min: 0.25,
    zoom_max: 2.0,
    zoom_step: 0.05,

    // EDITOR
    snap_x: 12,
    snap_y: 12,
    snap_offset_x: 0,
    snap_offset_y: 0,
    layout: 'vertical', // horizontal or vertical
    max_history: 100,

    // COLORS
    background_color: '#171717',
    selection_color: '#4BB2FD',
    block_border_color: 'black',
    block_symbol_color: '#333333',
    anchor_background_color: '#F5F5F5',

    connection_color: '#6D6D6D',
    root_color: '#F5F5F5',
    decorator_color: '#F5F5F5',
    composite_color: '#F5F5F5',
    interrupt_color: "#555555",
    interrupt_symbol_color: "#CECECE",
    tree_color: '#F5F5F5',
    action_color: '#F5F5F5',
    condition_color: '#F5F5F5',

    // CONNECTION
    connection_width: 2,

    // ANCHOR
    anchor_border_width: 1,
    anchor_radius: 5,
    anchor_offset_x: 2,
    anchor_offset_y: 0,

    // BLOCK
    block_border_width: 1,
    block_root_width: 40,
    block_root_height: 40,
    block_tree_width: 120,
    block_tree_height: 40,
    block_composite_width: 40,
    block_composite_height: 40,
    block_decorator_width: 120,
    block_decorator_height: 60,
    block_interrupt_width: 120,
    block_interrupt_height: 60,
    block_action_width: 120,
    block_action_height: 40,
    block_condition_width: 120,
    block_condition_height: 40,
  };

  b3e.DEFAULT_SETTINGS = DEFAULT_SETTINGS;
})();