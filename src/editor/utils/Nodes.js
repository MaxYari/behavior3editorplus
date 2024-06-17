/**
 * Root node specification.
 */
b3e.Root = {
  name: 'Root',
  category: 'root',
  title: 'A behavior tree',
  description: "Every tree should start with this node. Change this node's title to rename the tree."
};

b3e.Random = {
  name: "Random",
  category: "composite",
  title: "Run Random",
  icon: { className: "fas fa-dice" },
  description: "Randomly picks a single child task and executes it."
};

b3e.AlwaysSucceed = {
  name: "AlwaysSucceed",
  category: "decorator",
  title: "Always Succeed",
  icon: { className: "fas fa-check" },
  description: "Returns success as soon as child task finishes."
};

b3e.AlwaysFail = {
  name: "AlwaysFail",
  category: "decorator",
  title: "Always Fail",
  icon: { className: "fas fa-times" },
  description: "Returns failure as soon as child task finishes."
};

b3e.StateCondition = {
  name: "StateCondition",
  category: "decorator",
  title: "Condition",
  icon: { className: "far fa-question-circle" },
  description: "Executes a child node only if condition is met. Condition is only evaluated when this node starts, it is not re-evaluated while the child running.",
  properties: { condition: "" }
};

b3e.RunTimeOutcome = {
  name: "RunTimeOutcome",
  category: "decorator",
  title: "Run Time Outcome",
  icon: { className: "fas fa-stopwatch" },
  description: "Outcome of this node (success/failure) depends on how long it took to run its child. After its child is done - run time is measured. If run time exceeds the specified duration ('duration' property) - this node fails, otherwise - it succeeds.",
  properties: { duration: "" }
};

b3e.StateInterrupt = {
  name: "StateInterrupt",
  category: "interrupt",
  title: "Interrupt",
  icon: { className: "fas fa-fast-forward" },
  description: "This node should be used as a child of a composite node (Sequence/Selector e.t.c). This node will not be started directly by the composite, instead it will be continuously evaluating 'condition' in the background.<br>When 'condition' becomes true - this node stops (interrupts) a currently running branch of its composite parent and starts its own child instead.<br>It will not attempt to interrupt any of its own children.",
  properties: { condition: "" },
  isStealthy: true
};

b3e.ContinuousStateCondition = {
  name: "ContinuousStateCondition",
  category: "interrupt",
  title: "Cont. Condition",
  icon: { className: "far fa-question-circle" },
  description: "Executes a child node only if condition is met. Condition is checked every frame. If condition outcome is changed while the child is still running - child will be stopped and this node will fail.",
  properties: { condition: "" }
};

b3e.LimitRunTime = {
  name: "LimitRunTime",
  category: "interrupt",
  title: "Limit Run Time",
  icon: { className: "fas fa-stopwatch" },
  description: "Executes a child until it's done or until the time runs out.<br>If time runs out - stops the child and fails.<br>'duration' property specifies the amount of time in seconds.",
  properties: { duration: 0 }
};

b3e.Cooldown = {
  name: "Cooldown",
  category: "decorator",
  title: "Cooldown",
  icon: { className: "fas fa-hourglass-half" },
  description: "This node will start its child only if the amount of time passed from the last start is bigger than the specified amount of time ('duration' property, in seconds). Otherwise it will fail.<br>In other words: it needs to cool-down for the specified amount of time, before it can be used again. If 'hotWhileRunning' property is 'true' - the cooldown countdown will start only after its children are done running.",
  properties: { duration: 0, hotWhileRunning: false }
};

b3e.RandomSuccess = {
  name: "RandomSuccess",
  category: "action",
  title: "Random Success",
  icon: { className: "fas fa-dice-five" },
  description: "This task will succeed or fail randomly based on the given probability of success ('probability' parameter, 0 - 100 range).",
  properties: { probability: 50 }
};




// Create extensions for each b3.something
b3e.Sequence = $.extend(b3.Sequence.prototype, {
  icon: { className: "fas fa-arrow-right" },
  description: "Executes child tasks one after another, until one fails or all of them succeed."
});
b3e.Priority = $.extend(b3.Priority.prototype, {
  title: "Selector",
  icon: { className: "fas fa-question" },
  description: "Executes child tasks one after another, until one succeeds or all of them fail."
});
b3e.MemSequence = $.extend(b3.MemSequence.prototype, {
  icon: { className: "fas fa-arrow-right" }
});
b3e.MemPriority = $.extend(b3.MemPriority.prototype, {
  icon: { className: "fas fa-question" }
});
b3e.Repeater = $.extend(b3.Repeater.prototype, {
  title: "Repeat",
  icon: { className: "fas fa-redo" },
  description: "Repeats a child task specified amount of times ('maxLoop' parameter, -1 = no limit).<br>Always reports success when done.",
  properties: { "maxLoop": -1 }
});
b3e.RepeatUntilFailure = $.extend(b3.RepeatUntilFailure.prototype, {
  icon: { className: "fas fa-redo" },
  description: "Repeats a child task specified amount of times ('maxLoop' parameter, -1 = no limit).<br>Stops and reports success after a first child task failure.<br>Will report failure if all repetitions were done without a single child failure.",
  properties: { "maxLoop": -1 }
});
b3e.RepeatUntilSuccess = $.extend(b3.RepeatUntilSuccess.prototype, {
  icon: { className: "fas fa-redo" },
  description: "Repeats a child task specified amount of times ('maxLoop' parameter, -1 = no limit).<br>Stops and reports success after a first child task success.<br>Will report failure if all repetitions were done without a single child success.",
  properties: { "maxLoop": -1 }
});
b3e.MaxTime = $.extend(b3.MaxTime.prototype, {
  icon: { className: "fas fa-stopwatch" },
});
b3e.Inverter = $.extend(b3.Inverter.prototype, {
  icon: { className: "fas fa-yin-yang" },
  description: "Inverts result (success/failure) of a child node.<br>If a child node returns success this decorator will return failure and vice versa.",
});
b3e.Limiter = $.extend(b3.Limiter.prototype, {
  icon: { className: "fas fa-stop-circle" },
});
b3e.Failer = $.extend(b3.Failer.prototype, {
  icon: { className: "fas fa-times" },
  description: "This task will always fail."
});
b3e.Succeeder = $.extend(b3.Succeeder.prototype, {
  icon: { className: "fas fa-check" },
  description: "This task will always succeed."
});
b3e.Runner = $.extend(b3.Runner.prototype, {
  icon: { className: "fas fa-infinity" },
  description: "This task will run indefinitely. Can still be aborted by some interrupt nodes."
});
b3e.Wait = $.extend(b3.Wait.prototype, {
  title: "Wait",
  icon: { className: "far fa-clock" },
  description: "Wait for specified length of time ('duration' property, in seconds).",
  properties: {
    duration: 0
  }
});
b3e.Error = $.extend(b3.Error.prototype, {
  icon: { className: "fas fa-exclamation-triangle" }
});
