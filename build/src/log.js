"use strict";
/**
 * Vega-Lite's singleton logger utility.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var vega_util_1 = require("vega-util");
/**
 * Main (default) Vega Logger instance for Vega-Lite
 */
var main = vega_util_1.logger(vega_util_1.Warn);
var current = main;
/**
 * Logger tool for checking if the code throws correct warning
 */
var LocalLogger = (function () {
    function LocalLogger() {
        this.warns = [];
        this.infos = [];
        this.debugs = [];
    }
    LocalLogger.prototype.level = function () {
        return this;
    };
    LocalLogger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.warns).push.apply(_a, args);
        return this;
        var _a;
    };
    LocalLogger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.infos).push.apply(_a, args);
        return this;
        var _a;
    };
    LocalLogger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.debugs).push.apply(_a, args);
        return this;
        var _a;
    };
    return LocalLogger;
}());
exports.LocalLogger = LocalLogger;
function runLocalLogger(f) {
    var localLogger = current = new LocalLogger();
    f(localLogger);
    reset();
}
exports.runLocalLogger = runLocalLogger;
function wrap(f) {
    return function () {
        var logger = current = new LocalLogger();
        f(logger);
        reset();
    };
}
exports.wrap = wrap;
/**
 * Set the singleton logger to be a custom logger
 */
function set(logger) {
    current = logger;
    return current;
}
exports.set = set;
/**
 * Reset the main logger to use the default Vega Logger
 */
function reset() {
    current = main;
    return current;
}
exports.reset = reset;
function warn() {
    var _ = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _[_i] = arguments[_i];
    }
    current.warn.apply(current, arguments);
}
exports.warn = warn;
function info() {
    var _ = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _[_i] = arguments[_i];
    }
    current.info.apply(current, arguments);
}
exports.info = info;
function debug() {
    var _ = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _[_i] = arguments[_i];
    }
    current.debug.apply(current, arguments);
}
exports.debug = debug;
/**
 * Collection of all Vega-Lite Error Messages
 */
var message;
(function (message) {
    message.INVALID_SPEC = 'Invalid spec';
    // SELECTION
    function cannotProjectOnChannelWithoutField(channel) {
        return "Cannot project a selection on encoding channel " + channel + ", which has no field.";
    }
    message.cannotProjectOnChannelWithoutField = cannotProjectOnChannelWithoutField;
    // REPEAT
    function noSuchRepeatedValue(field) {
        return "Unknown repeated value \"" + field + "\".";
    }
    message.noSuchRepeatedValue = noSuchRepeatedValue;
    // DATA
    function unrecognizedParse(p) {
        return "Unrecognized parse " + p + ".";
    }
    message.unrecognizedParse = unrecognizedParse;
    function differentParse(field, local, ancestor) {
        return "An ancestor parsed field " + field + " as " + ancestor + " but a child wants to parse the field as " + local + ".";
    }
    message.differentParse = differentParse;
    // TRANSFORMS
    function invalidTransformIgnored(transform) {
        return "Ignoring an invalid transform: " + JSON.stringify(transform) + ".";
    }
    message.invalidTransformIgnored = invalidTransformIgnored;
    message.NO_FIELDS_NEEDS_AS = 'If `from.fields` is not specified, `as` has to be a string that specifies the key to be used for the the data from the secondary source.';
    // ENCODING & FACET
    function invalidFieldType(type) {
        return "Invalid field type \"" + type + "\"";
    }
    message.invalidFieldType = invalidFieldType;
    function invalidFieldTypeForCountAggregate(type, aggregate) {
        return "Invalid field type \"" + type + "\" for aggregate: \"" + aggregate + "\", using \"quantitative\" instead.";
    }
    message.invalidFieldTypeForCountAggregate = invalidFieldTypeForCountAggregate;
    function invalidAggregate(aggregate) {
        return "Invalid aggregation operator \"" + aggregate + "\"";
    }
    message.invalidAggregate = invalidAggregate;
    function emptyOrInvalidFieldType(type, channel, newType) {
        return "Invalid field type (" + type + ") for channel " + channel + ", using " + newType + " instead.";
    }
    message.emptyOrInvalidFieldType = emptyOrInvalidFieldType;
    function emptyFieldDef(fieldDef, channel) {
        return "Dropping " + JSON.stringify(fieldDef) + " from channel " + channel + " since it does not contain data field or value.";
    }
    message.emptyFieldDef = emptyFieldDef;
    function incompatibleChannel(channel, markOrFacet, when) {
        return channel + " dropped as it is incompatible with " + markOrFacet + (when ? " when " + when : '') + ".";
    }
    message.incompatibleChannel = incompatibleChannel;
    function facetChannelShouldBeDiscrete(channel) {
        return channel + " encoding should be discrete (ordinal / nominal / binned).";
    }
    message.facetChannelShouldBeDiscrete = facetChannelShouldBeDiscrete;
    function discreteChannelCannotEncode(channel, type) {
        return "Using discrete channel " + channel + " to encode " + type + " field can be misleading as it does not encode " + (type === 'ordinal' ? 'order' : 'magnitude') + ".";
    }
    message.discreteChannelCannotEncode = discreteChannelCannotEncode;
    // Mark
    message.BAR_WITH_POINT_SCALE_AND_RANGESTEP_NULL = 'Bar mark should not be used with point scale when rangeStep is null. Please use band scale instead.';
    function unclearOrientContinuous(mark) {
        return "Cannot clearly determine orientation for " + mark + " since both x and y channel encode continous fields. In this case, we use vertical by default";
    }
    message.unclearOrientContinuous = unclearOrientContinuous;
    function unclearOrientDiscreteOrEmpty(mark) {
        return "Cannot clearly determine orientation for " + mark + " since both x and y channel encode discrete or empty fields.";
    }
    message.unclearOrientDiscreteOrEmpty = unclearOrientDiscreteOrEmpty;
    function orientOverridden(original, actual) {
        return "Specified orient " + original + " overridden with " + actual;
    }
    message.orientOverridden = orientOverridden;
    // SCALE
    message.CANNOT_UNION_CUSTOM_DOMAIN_WITH_FIELD_DOMAIN = 'custom domain scale cannot be unioned with default field-based domain';
    function cannotUseScalePropertyWithNonColor(prop) {
        return "Cannot use " + prop + " with non-color channel.";
    }
    message.cannotUseScalePropertyWithNonColor = cannotUseScalePropertyWithNonColor;
    function unaggregateDomainHasNoEffectForRawField(fieldDef) {
        return "Using unaggregated domain with raw field has no effect (" + JSON.stringify(fieldDef) + ").";
    }
    message.unaggregateDomainHasNoEffectForRawField = unaggregateDomainHasNoEffectForRawField;
    function unaggregateDomainWithNonSharedDomainOp(aggregate) {
        return "Unaggregated domain not applicable for " + aggregate + " since it produces values outside the origin domain of the source data.";
    }
    message.unaggregateDomainWithNonSharedDomainOp = unaggregateDomainWithNonSharedDomainOp;
    function unaggregatedDomainWithLogScale(fieldDef) {
        return "Unaggregated domain is currently unsupported for log scale (" + JSON.stringify(fieldDef) + ").";
    }
    message.unaggregatedDomainWithLogScale = unaggregatedDomainWithLogScale;
    message.CANNOT_USE_RANGE_WITH_POSITION = 'Cannot use custom range with x or y channel.  Please customize width, height, padding, or rangeStep instead.';
    function cannotUseSizeFieldWithBandSize(positionChannel) {
        return "Using size field when " + positionChannel + "-channel has a band scale is not supported.";
    }
    message.cannotUseSizeFieldWithBandSize = cannotUseSizeFieldWithBandSize;
    function cannotApplySizeToNonOrientedMark(mark) {
        return "Cannot apply size to non-oriented mark " + mark + ".";
    }
    message.cannotApplySizeToNonOrientedMark = cannotApplySizeToNonOrientedMark;
    function rangeStepDropped(channel) {
        return "rangeStep for " + channel + " is dropped as top-level " + (channel === 'x' ? 'width' : 'height') + " is provided.";
    }
    message.rangeStepDropped = rangeStepDropped;
    function scaleTypeNotWorkWithChannel(channel, scaleType, defaultScaleType) {
        return "Channel " + channel + " does not work with " + scaleType + " scale. We are using " + defaultScaleType + " scale instead.";
    }
    message.scaleTypeNotWorkWithChannel = scaleTypeNotWorkWithChannel;
    function scaleTypeNotWorkWithFieldDef(scaleType, defaultScaleType) {
        return "FieldDef does not work with " + scaleType + " scale. We are using " + defaultScaleType + " scale instead.";
    }
    message.scaleTypeNotWorkWithFieldDef = scaleTypeNotWorkWithFieldDef;
    function scalePropertyNotWorkWithScaleType(scaleType, propName, channel) {
        return channel + "-scale's \"" + propName + "\" is dropped as it does not work with " + scaleType + " scale.";
    }
    message.scalePropertyNotWorkWithScaleType = scalePropertyNotWorkWithScaleType;
    function scaleTypeNotWorkWithMark(mark, scaleType) {
        return "Scale type \"" + scaleType + "\" does not work with mark " + mark + ".";
    }
    message.scaleTypeNotWorkWithMark = scaleTypeNotWorkWithMark;
    function mergeConflictingProperty(property, propertyOf, v1, v2) {
        return "Conflicting " + propertyOf + " property " + property + " (" + v1 + " and " + v2 + ").  Using " + v1 + ".";
    }
    message.mergeConflictingProperty = mergeConflictingProperty;
    function independentScaleMeansIndependentGuide(channel) {
        return "Setting the scale to be independent for " + channel + " means we also have to set the guide (axis or legend) to be independent.";
    }
    message.independentScaleMeansIndependentGuide = independentScaleMeansIndependentGuide;
    function conflictedDomain(channel) {
        return "Cannot set " + channel + "-scale's \"domain\" as it is binned. Please use \"bin\"'s \"extent\" instead.";
    }
    message.conflictedDomain = conflictedDomain;
    message.INVAID_DOMAIN = 'Invalid scale domain';
    message.UNABLE_TO_MERGE_DOMAINS = 'Unable to merge domains';
    // AXIS
    message.INVALID_CHANNEL_FOR_AXIS = 'Invalid channel for axis.';
    // STACK
    function cannotStackRangedMark(channel) {
        return "Cannot stack " + channel + " if there is already " + channel + "2";
    }
    message.cannotStackRangedMark = cannotStackRangedMark;
    function cannotStackNonLinearScale(scaleType) {
        return "Cannot stack non-linear scale (" + scaleType + ")";
    }
    message.cannotStackNonLinearScale = cannotStackNonLinearScale;
    function cannotStackNonSummativeAggregate(aggregate) {
        return "Cannot stack when the aggregate function is non-summative (" + aggregate + ")";
    }
    message.cannotStackNonSummativeAggregate = cannotStackNonSummativeAggregate;
    // TIMEUNIT
    function invalidTimeUnit(unitName, value) {
        return "Invalid " + unitName + ": " + value;
    }
    message.invalidTimeUnit = invalidTimeUnit;
    function dayReplacedWithDate(fullTimeUnit) {
        return "Time unit \"" + fullTimeUnit + "\" is not supported. We are replacing it with " + fullTimeUnit.replace('day', 'date') + ".";
    }
    message.dayReplacedWithDate = dayReplacedWithDate;
    function droppedDay(d) {
        return "Dropping day from datetime " + JSON.stringify(d) + " as day cannot be combined with other units.";
    }
    message.droppedDay = droppedDay;
})(message = exports.message || (exports.message = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgsdUNBQXdEO0FBZ0J4RDs7R0FFRztBQUNILElBQU0sSUFBSSxHQUFHLGtCQUFNLENBQUMsZ0JBQUksQ0FBQyxDQUFDO0FBQzFCLElBQUksT0FBTyxHQUFvQixJQUFJLENBQUM7QUFFcEM7O0dBRUc7QUFDSDtJQUFBO1FBQ1MsVUFBSyxHQUFVLEVBQUUsQ0FBQztRQUNsQixVQUFLLEdBQVUsRUFBRSxDQUFDO1FBQ2xCLFdBQU0sR0FBVSxFQUFFLENBQUM7SUFvQjVCLENBQUM7SUFsQlEsMkJBQUssR0FBWjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU0sMEJBQUksR0FBWDtRQUFZLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQseUJBQWM7O1FBQ3hCLENBQUEsS0FBQSxJQUFJLENBQUMsS0FBSyxDQUFBLENBQUMsSUFBSSxXQUFJLElBQUksRUFBRTtRQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDOztJQUNkLENBQUM7SUFFTSwwQkFBSSxHQUFYO1FBQVksY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCx5QkFBYzs7UUFDeEIsQ0FBQSxLQUFBLElBQUksQ0FBQyxLQUFLLENBQUEsQ0FBQyxJQUFJLFdBQUksSUFBSSxFQUFFO1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUM7O0lBQ2QsQ0FBQztJQUVNLDJCQUFLLEdBQVo7UUFBYSxjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLHlCQUFjOztRQUN6QixDQUFBLEtBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQSxDQUFDLElBQUksV0FBSSxJQUFJLEVBQUU7UUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQzs7SUFDZCxDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFD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