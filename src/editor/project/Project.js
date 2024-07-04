(function () {
  "use strict";

  var Project = function (editor) {
    this.Container_constructor();

    // Variables
    this._id = b3.createUUID();
    this._editor = editor;
    this._selectedTree = null;
    this._clipboard = null;
    this._nodes = {};

    // Managers
    this.trees = null;
    this.nodes = null;
    this.history = null;

    this._initialize();
  };
  var p = createjs.extend(Project, createjs.Container);

  p._initialize = function () {
    this.trees = new b3e.project.TreeManager(this._editor, this);
    this.nodes = new b3e.project.NodeManager(this._editor, this);
    this.history = new b3e.project.HistoryManager(this._editor, this);

    this.nodes.add(b3e.Root, true);
    this.nodes.add(b3e.Sequence, true);
    this.nodes.add(b3e.SequenceUntilFailure, true);
    this.nodes.add(b3e.SequenceUntilSuccess, true);
    this.nodes.add(b3e.RunRandom, true);
    this.nodes.add(b3e.Parallel, true);
    this.nodes.add(b3e.RunRandomWeight, true);
    //this.nodes.add(b3e.MemSequence, true);
    //this.nodes.add(b3e.MemPriority, true);
    this.nodes.add(b3e.Repeater, true);
    this.nodes.add(b3e.RepeatUntilFailure, true);
    this.nodes.add(b3e.RepeatUntilSuccess, true);
    this.nodes.add(b3e.StateCondition, true);
    this.nodes.add(b3e.StateInterrupt, true);
    this.nodes.add(b3e.ContinuousStateCondition, true);
    this.nodes.add(b3e.RandomThrough, true);
    this.nodes.add(b3e.LimitRunTime, true);
    //this.nodes.add(b3e.MaxTime, true);
    this.nodes.add(b3e.RunTimeOutcome, true);
    this.nodes.add(b3e.Cooldown, true);
    this.nodes.add(b3e.Inverter, true);
    this.nodes.add(b3e.AlwaysSucceed, true);
    this.nodes.add(b3e.AlwaysFail, true);

    //this.nodes.add(b3e.Limiter, true);
    this.nodes.add(b3e.Failer, true);
    this.nodes.add(b3e.Succeeder, true);
    this.nodes.add(b3e.RandomSuccess, true);
    this.nodes.add(b3e.Runner, true);
    this.nodes.add(b3e.Wait, true);
    this.nodes.add(b3e.SetState, true);
    //this.nodes.add(b3e.Error, true);


    this._applySettings(this._editor._settings);
    this.history.clear();
    this._editor.clearDirty();
  };

  p._applySettings = function (settings) {
    this.trees._applySettings(settings);
    this.nodes._applySettings(settings);
    this.history._applySettings(settings);
  };

  b3e.project.Project = createjs.promote(Project, 'Container');
})();