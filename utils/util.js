var t = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

module.exports = {
    formatTime: function(e) {
        var n = e.getFullYear(), r = e.getMonth() + 1, o = e.getDate(), u = e.getHours(), i = e.getMinutes(), a = e.getSeconds();
        return [ n, r, o ].map(t).join("/") + " " + [ u, i, a ].map(t).join(":");
    },
    throttle: function(t, e) {
        var n = 0, r = e || 300;
        return function() {
            var e = new Date();
            e - n > r && (t.call(this, arguments), n = e);
        };
    },
    debounce: function(t, e) {
        var n, r = e || 1e3;
        return function() {
            clearTimeout(n);
            var e = this, o = arguments;
            n = setTimeout(function() {
                t.call(e, o);
            }, r);
        };
    }
};