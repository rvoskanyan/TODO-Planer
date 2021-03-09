import { clearSlashes } from './utils';

class Router {
    routes = [];
    mode = undefined;
    root = '/';

    constructor(options) {
        this.mode = window.history.pushState ? 'history' : 'hash';

        if (options.mode) {
            this.mode = options.mode;
        }

        if (options.root) {
            this.root = options.root;
        }

        this.listen();
    }

    add = (path, cb) => {
        this.routes.push({ path, cb });

        return this;
    };

    remove = path => {
        for (let i = 0; i < this.routes.length; i++) {
            if (this.routes[i].path === path) {
                this.routes.slice(i, 1);

                return this;
            }
        }
        return this;
    };

    flush = () => {
        this.routes = [];

        return this;
    };

    getFragment = () => {
        let fragment = '';

        if (this.mode === 'history') {
            fragment = clearSlashes(decodeURI(window.location.pathname + window.location.search));
            fragment = fragment.replace(/\?(.*)$/, '');
            fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
        } else {
            const match = window.location.href.match(/#(.*)$/);

            fragment = match ? match[1] : '';
        }

        return clearSlashes(fragment);
    };

    navigate = (path = '') => {
        if (this.mode === 'history') {
            window.history.pushState(null, null, this.root + clearSlashes(path));
        } else {
            window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}`;
        }

        return this;
    };

    listen = () => {
        clearInterval(this.intervalLink);
        this.intervalLink = setInterval(this.interval, 50);
    };

    interval = () => {
        if (this.current === this.getFragment()) {
            return false;
        }

        this.current = this.getFragment();

        this.routes.some(route => {
            const match = this.current.match(route.path);

            if (match) {
                match.shift();
                route.cb.apply({}, match);
                return match;
            }

            return false;
        });
    };
}

export default Router;
