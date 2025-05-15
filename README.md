# context detector

this was useful to be able to detect how to load various packages
where they could be running in different contexts, such as electron apps,
web extensions, browser context or test environment.

This facilitates instantiating various utility classes without having
to pass context information and do if/else checks in other places

