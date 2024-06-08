/**
 * Root node specification.
 */
b3e.Root = {
  name: 'Root',
  category: 'root',
  title: 'A behavior tree',
  description: "Every tree should start with this node."
};

b3e.Random = {
  name: "Random",
  category: "composite",
  title: "Random",
  icon: { className: "fas fa-dice" },
  description: "Randomly picks one of the child tasks and runs it."
};

b3e.AlwaysSucceed = {
  name: "AlwaysSucceed",
  category: "decorator",
  title: "Always Succeed",
  icon: { className: "fas fa-check" },
  description: "When the child task finishes - will return success, no matter what value the child task returned."
};

b3e.AlwaysFail = {
  name: "AlwaysFail",
  category: "decorator",
  title: "Always Fail",
  icon: { className: "fas fa-times" },
  description: "When the child task finishes - will return failure, no matter what value the child task returned."
};

b3e.Cooldown = {
  name: "Cooldown",
  category: "decorator",
  title: "Cooldown",
  icon: { className: "fas fa-hourglass-half" },
  description: "Will run the child task only once in specified amount of time ('milliseconds' parameter)",
  properties: { "milliseconds": 0 }
};




// Create extensions for each b3.something
b3e.Sequence = $.extend(b3.Sequence.prototype, {
  icon: { className: "fas fa-arrow-right" },
  description: "Runs every child tasks one after another, until one fails or all of them succeed"
});
b3e.Priority = $.extend(b3.Priority.prototype, {
  icon: { className: "fas fa-question" },
  description: "Runs every child tasks one after another, until one of them succeeds or all of them fail"
});
b3e.MemSequence = $.extend(b3.MemSequence.prototype, {
  icon: { className: "fas fa-arrow-right" }
});
b3e.MemPriority = $.extend(b3.MemPriority.prototype, {
  icon: { className: "fas fa-question" }
});
b3e.Repeater = $.extend(b3.Repeater.prototype, {
  icon: { className: "fas fa-redo" },
  description: "Repeats the child task specified amount of time ('maxLoop' parameter, -1 = no limit).",
  properties: { "maxLoop": -1 }
});
b3e.RepeatUntilFailure = $.extend(b3.RepeatUntilFailure.prototype, {
  icon: { className: "fas fa-redo" },
  description: "Repeats the child task specified amount of time ('maxLoop' parameter, -1 = no limit). Will stop after the first child task failure.",
  properties: { "maxLoop": -1 }
});
b3e.RepeatUntilSuccess = $.extend(b3.RepeatUntilSuccess.prototype, {
  icon: { className: "fas fa-redo" },
  description: "Repeats the child task specified amount of time ('maxLoop' parameter, -1 = no limit). Will stop after the first child task success.",
  properties: { "maxLoop": -1 }
});
b3e.MaxTime = $.extend(b3.MaxTime.prototype, {
  icon: { className: "fas fa-stopwatch" },
});
b3e.Inverter = $.extend(b3.Inverter.prototype, {
  icon: { className: "fas fa-yin-yang" },
  description: "Inverts the result of the child node. If the child node returns success this decorator will return failure and vice versa.",
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
  description: "This task will run indefinitely. Can be stopped by some parent decorators, e.g Continuous Condition."
});
b3e.Wait = $.extend(b3.Wait.prototype, {
  icon: { className: "far fa-clock" },
  description: "Wait for the specified duration ('milliseconds' parameter)."
});
b3e.Error = $.extend(b3.Error.prototype, {
  icon: { className: "fas fa-exclamation-triangle" }
});
