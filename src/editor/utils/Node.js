/** @module b3e */
(function () {
  'use strict';

  /**
   * A node specification.
   *
   * @class Node
   * @param {Boolean} isDefault Whether the node is provided by default or not.
   * @constructor
   */
  b3e.Node = function (isDefault) {
    this.spec = null;
    this.name = null;
    this.title = null;
    this.icon = {};
    this.category = null;
    this.description = null;
    this.properties = {};
    this.isDefault = !!isDefault;

    var scheme = b3e.Node.scheme
    var updateNodeObj = b3e.Node.updateNodeObj

    /**
     * Copy this node.
     *
     * @method copy
     * @returns {b3e.Node} A copy of this node
     */
    this.copy = function () {
      var n = new b3e.Node(this.isDefault);
      updateNodeObj(n, this);
      return n;
    };

    this.update = function (data) {
      updateNodeObj(this, data)
    }
  };

  b3e.Node.scheme = {
    spec: null,
    name: null,
    title: null,
    icon: null,
    isStealthy: null,
    category: null,
    description: null,
    properties: null,
    isDefault: null
  }

  b3e.Node.updateNodeObj = function (nodeA, nodeB) {
    for (var key in b3e.Node.scheme) {
      if (b3e.Node.scheme.hasOwnProperty(key) && typeof nodeB[key] !== 'undefined') {
        nodeA[key] = nodeB[key]
      }
    }
  }

  b3e.Node.copyNodeObj = function (node) {
    var obj = {}
    b3e.Node.updateNodeObj(obj, node)
    return obj
  }
})();