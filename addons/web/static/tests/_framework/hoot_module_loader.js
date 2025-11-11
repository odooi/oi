// @oi-module ignore
// ! WARNING: this module must be loaded after `module_loader` but cannot have dependencies !

(function (oi) {
    "use strict";

    if (oi.define.name.endsWith("(hoot)")) {
        return;
    }

    const name = `${oi.define.name} (hoot)`;
    oi.define = {
        [name](name, dependencies, factory) {
            return oi.loader.define(name, dependencies, factory, !name.endsWith(".hoot"));
        },
    }[name];
})(globalThis.oi);
