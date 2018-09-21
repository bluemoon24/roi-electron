## Interface architecture of the chart library

### Delegate pattern
In order to ensure maximum flexibility to cover even rare exceptions, it is helpful to have the interface implementation follow a delegate pattern. This pattern is used e.g. in swift, objective C and can also be found in a very consistent way in the d3 library.

The idea is pretty simple: let's look at a configuration item like this:<br>
> **categoriesKey** _(string)_ - key of categories in series data objects<br>
Default value - data entry's first field's key

This might work for the vast majority of use cases, but what if the categoryKey field must be changed for whatever reason on the next render. Of course as long they the render is always a full chart render, the application can set this option before the next render. But if there is a need in the future for a smarter rendering process, e.g. that does not perform unnecessary re-renders of axes and gridlines if the data changes, this might not work that way.<br>
So instead of having a static setting for the lifetime of the chart's render, we can call back to the user, if he provides a user function (or delegate) for this.
 As simple pattern within the library, when it needs the information would be like this:<br>
`key = typeof categoriesKey === 'function' ? categoriesKeys() : categoriesKeys`<br>
and for the library user, when dynamic option is needed:<br>
`categoryKeys = function () { return interval === 'month' ? 'month' : 'quarter'}`
More complex cases could require frequent calls (for instance per data point) as well as function parameters (the function signature).

The default should be that each config option supports those delegates as well as good default values or even 'overloaded' parameter types, like e.g. _string, number, function_, which in turn will be converted by the library function to fit the internal needs.
