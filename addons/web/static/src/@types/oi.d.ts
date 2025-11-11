interface OiModuleErrors {
    cycle?: string | null;
    failed?: Set<string>;
    missing?: Set<string>;
    unloaded?: Set<string>;
}

interface OiModuleFactory {
    deps: string[];
    fn: OiModuleFactoryFn;
    ignoreMissingDeps: boolean;
}

class OiModuleLoader {
    bus: EventTarget;
    checkErrorProm: Promise<void> | null;
    /**
     * Mapping [name => factory]
     */
    factories: Map<string, OiModuleFactory>;
    /**
     * Names of failed modules
     */
    failed: Set<string>;
    /**
     * Names of modules waiting to be started
     */
    jobs: Set<string>;
    /**
     * Mapping [name => module]
     */
    modules: Map<string, OiModule>;

    constructor(root?: HTMLElement);

    addJob: (name: string) => void;

    define: (
        name: string,
        deps: string[],
        factory: OiModuleFactoryFn,
        lazy?: boolean
    ) => OiModule;

    findErrors: (jobs?: Iterable<string>) => OiModuleErrors;

    findJob: () => string | null;

    reportErrors: (errors: OiModuleErrors) => Promise<void>;

    sortFactories: () => void;

    startModule: (name: string) => OiModule;

    startModules: () => void;
}

type OiModule = Record<string, any>;

type OiModuleFactoryFn = (require: (dependency: string) => OiModule) => OiModule;

declare const oi: {
    csrf_token: string;
    debug: string;
    define: OiModuleLoader["define"];
    loader: OiModuleLoader;
};
